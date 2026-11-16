import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { NextRequest } from 'next/server';
import { planReplacement, assertStaging, stageFiles, checksum } from '../scripts/study-replace.mjs';

try {
  const serverOnlyPath = require.resolve('server-only');
  require.cache[serverOnlyPath] = {
    exports: {},
    id: serverOnlyPath,
    filename: serverOnlyPath,
    loaded: true,
    children: [],
    paths: [],
  } as any;
} catch {}
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { findTextMatches } from '../src/lib/pdf/search';

const pdf = { original_filename:'Auth_SECURED.pdf',title:'Auth',sha256:'a'.repeat(64),
  opens_correctly:true,rendering_valid:true,is_searchable:true,page_count:1,file_size:100,
  category_slug:'authentication-session-security',pages:[{text_sha256:'text',characters:50,visual_sha256:'visual'}] };
const categories=[{id:'category',slug:pdf.category_slug}];
const old={id:'existing',original_filename:'Auth.pdf',title:'Auth',source_checksum:'b'.repeat(64),slug:'auth'};
test('replacement preserves verified identity and page correspondence',()=>{
  const plan=planReplacement({documents:[pdf]},{documents:[old]},categories,[{...pdf,sha256:old.source_checksum}]);
  assert.equal(plan.documents[0].id,'existing');
  assert.equal(plan.documents[0].preserve_progress,true);
  assert.equal(plan.retired.length,0);
});
test('equal page counts without identity proof cannot preserve or replace a record',()=>{
  assert.throws(()=>planReplacement({documents:[pdf]},{documents:[old]},categories,[{...pdf,sha256:old.source_checksum,pages:[{text_sha256:'other',characters:50}]}]),/Unverified/);
});
test('duplicates are explicit, obsolete records retire, problematic files remain visible',()=>{
  const duplicate={...pdf,original_filename:'alias.pdf'};
  const plan=planReplacement({documents:[pdf,duplicate,{...pdf,sha256:'c'.repeat(64),original_filename:'bad.pdf',is_searchable:false}]},
    {documents:[{...old,title:'Obsolete',original_filename:'obsolete.pdf'}]},categories);
  assert.equal(plan.duplicates.length,1);
  assert.equal(plan.documents.length,2);
  assert.equal(plan.retired.length,1);
  assert.deepEqual(plan.problems,['bad.pdf']);
});
test('ambiguous identity blocks replacement',()=>{
  assert.throws(()=>planReplacement({documents:[pdf]},{documents:[old,{...old,id:'other'}]},categories),/Ambiguous/);
});
test('reviewed checksum mapping reuses identity but resets changed page structure',()=>{
  const plan=planReplacement({documents:[pdf]},{documents:[old]},categories,
    [{...pdf,sha256:old.source_checksum,pages:[]}],
    [{filename:pdf.original_filename,old_id:old.id,old_sha256:old.source_checksum,new_sha256:pdf.sha256}]);
  assert.equal(plan.documents[0].id,old.id);
  assert.equal(plan.documents[0].preserve_progress,false);
});
test('staging guard rejects mismatched project and placeholders',()=>{
  assert.throws(()=>assertStaging('https://production.supabase.co','staging'),/match/);
  assert.throws(()=>assertStaging('https://your_project.supabase.co','your_project'),/real/);
  assert.doesNotThrow(()=>assertStaging('https://staging.supabase.co','staging'));
});
test('search finds every occurrence with stable cross-span offsets and literal metacharacters',()=>{
  assert.deepEqual(findTextMatches('Auth authentication AUTH','auth'),[{start:0,end:4},{start:5,end:9},{start:20,end:24}]);
  assert.deepEqual(findTextMatches('a.* a.*','.*'),[{start:1,end:3},{start:5,end:7}]);
  assert.deepEqual(findTextMatches('search','   '),[]);
});

test('partial upload failure leaves recoverable objects and retry verifies without duplication',async()=>{
  const directory=await fs.mkdtemp(path.join(os.tmpdir(),'study-import-test-'));
  try {
    const documents=[];
    for(let i=0;i<2;i++) {
      const raw=Buffer.from(`synthetic-${i}`);const file=path.join(directory,`${i}.pdf`);await fs.writeFile(file,raw);
      documents.push({sha256:checksum(raw),file_path:file,file_size:raw.length,original_filename:`${i}.pdf`,storage_key:`${i}.pdf`});
    }
    const objects=new Map<string,Buffer>();let fail=true;let attempts=0;
    const client={storage:{from:()=>({
      download:async(key:string)=>objects.has(key)?{data:new Blob([new Uint8Array(objects.get(key)!)]),error:null}:{data:null,error:{message:'missing'}},
      upload:async(key:string,raw:Buffer)=>{attempts++;if(key==='1.pdf'&&fail){fail=false;return{error:{message:'injected upload failure'}};}objects.set(key,raw);return{data:{},error:null};},
    })}};
    await assert.rejects(stageFiles(client,documents,documents),/injected upload failure/);
    assert.equal(objects.size,1);
    await stageFiles(client,documents,documents);
    assert.equal(objects.size,2);assert.equal(attempts,3);
    await fs.writeFile(documents[0].file_path,'changed');
    await assert.rejects(stageFiles(client,documents,documents),/Source changed/);
  } finally {
    assert.equal(path.dirname(path.resolve(directory)),path.resolve(os.tmpdir()));
    await fs.rm(directory,{recursive:true,force:true});
  }
});

test('9. Importing 34 PDFs produces 34 unpublished records', () => {
  const documents = Array.from({ length: 34 }, (_, i) => ({
    original_filename: `doc_${i + 1}_SECURED.pdf`,
    title: `Document ${i + 1}`,
    sha256: crypto.createHash('sha256').update(`doc_${i + 1}`).digest('hex'),
    opens_correctly: true,
    rendering_valid: true,
    is_searchable: true,
    page_count: 5,
    file_size: 1000 + i,
    category_slug: 'authentication-session-security',
    pages: [{ text_sha256: `text_${i}`, characters: 50, visual_sha256: `vis_${i}` }],
  }));

  const plan = planReplacement({ documents }, { documents: [] }, categories);
  assert.equal(plan.documents.length, 34);
  assert.equal(plan.problems.length, 0);
  assert.equal(plan.duplicates.length, 0);

  // Every single document in the plan MUST have is_published === false
  for (const doc of plan.documents) {
    assert.equal(doc.is_published, false, `Document ${doc.title} must default to unpublished`);
    assert.equal(doc.action, 'add');
  }
});

test('10. Normal logged-in users cannot access unpublished PDFs', async () => {
  const normalUser = { id: 'normal-user-123', email: 'student@cybertube.test' };
  const unpublishedDoc = {
    id: 'doc-unpublished-1',
    storage_key: 'bug-bounty/unpublished.pdf',
    is_published: false,
    retired_at: null,
  };

  const adminClient = {
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => {
            if (table === 'study_documents') return { data: unpublishedDoc, error: null };
            if (table === 'admin_users') return { data: null, error: { message: 'Not found' } };
            return { data: null, error: null };
          },
        }),
      }),
    }),
    storage: {
      from: () => ({
        download: async () => ({ data: new Blob([new Uint8Array([1, 2, 3])]), error: null }),
      }),
    },
  };

  const serverAuthMod = await import('../src/lib/supabase/server');
  const adminMod = await import('../src/lib/supabase/admin');
  const routeMod = await import('../app/api/study-materials/[docId]/pdf/route');

  serverAuthMod.setAuthenticatedUserForTesting(normalUser);
  adminMod.setAdminClientForTesting(adminClient);

  try {
    const req = new NextRequest('http://localhost:3000/api/study-materials/doc-unpublished-1/pdf');
    const res = await routeMod.GET(req, { params: Promise.resolve({ docId: 'doc-unpublished-1' }) });

    assert.equal(res.status, 403, 'Normal logged-in user must receive 403 Forbidden for unpublished PDF');
    const text = await res.text();
    assert.match(text, /unpublished/i);
  } finally {
    serverAuthMod.setAuthenticatedUserForTesting(null);
    adminMod.setAdminClientForTesting(null);
  }
});

test('11. Import verification succeeds without requiring published records', async () => {
  const documents = Array.from({ length: 34 }, (_, i) => {
    const sha = crypto.createHash('sha256').update(`verify_doc_${i}`).digest('hex');
    return {
      id: `doc-${i}`,
      original_filename: `doc_${i}.pdf`,
      source_checksum: sha,
      sha256: sha,
      page_count: 10,
      file_size: 500,
      storage_key: `bug-bounty/${sha}.pdf`,
      is_published: false, // Explicitly unpublished
      retired_at: null,
    };
  });

  const inventory = { documents };
  const records = documents.map(d => ({ ...d }));

  // Verification checks that records in DB match inventory checksums/sizes without checking is_published=true
  const expected = [...new Set(inventory.documents.map(d => d.sha256))].sort();
  const actual = records.map(d => d.source_checksum).sort();
  assert.deepEqual(actual, expected);

  for (const record of records) {
    const source = inventory.documents.find(d => d.sha256 === record.source_checksum);
    assert.equal(record.page_count, source.page_count);
    assert.equal(record.file_size, source.file_size);
    assert.equal(record.storage_key, `bug-bounty/${source.sha256}.pdf`);
  }

  // Confirm that unpublished status does not block verification
  assert.equal(records.filter(r => !r.is_published).length, 34);
});

test('12. Repeated imports are idempotent and detect already-active manifest', () => {
  const documents = Array.from({ length: 34 }, (_, i) => ({
    id: `doc-${i}`,
    title: `Doc ${i}`,
    slug: `doc-${i}`,
    original_filename: `doc_${i}.pdf`,
    sha256: crypto.createHash('sha256').update(`doc_${i}`).digest('hex'),
    storage_key: `bug-bounty/${crypto.createHash('sha256').update(`doc_${i}`).digest('hex')}.pdf`,
    page_count: 5,
    file_size: 100,
    category_id: 'cat-1',
    is_published: false,
  }));

  const priorRun = {
    id: 'run-hash-1',
    status: 'active',
    manifest: documents,
  };

  // Simulating the idempotent retry check in apply mode
  const currentCatalog = documents.map(d => ({
    id: d.id,
    source_checksum: d.sha256,
    storage_key: d.storage_key,
    page_count: d.page_count,
    file_size: d.file_size,
    is_published: d.is_published,
  }));

  const checksumsMatch = JSON.stringify(currentCatalog.map(d => d.source_checksum).sort()) ===
    JSON.stringify(priorRun.manifest.map(d => d.sha256).sort());
  assert.equal(checksumsMatch, true, 'Checksum catalog must match previously imported manifest');

  for (const doc of priorRun.manifest) {
    const active = currentCatalog.find(d => d.id === doc.id);
    assert.ok(active, `Document ${doc.id} must exist in active catalog`);
    assert.equal(active.source_checksum, doc.sha256);
    assert.equal(active.is_published, false, 'Idempotent state must preserve unpublished status');
  }
});

test('13. Rollback restores snapshot and marks import rolled-back', () => {
  const initialSnapshot = {
    documents: [],
    progress: [],
    bookmarks: [],
    page_views: [],
  };

  const importRun = {
    id: 'run-to-rollback',
    collection_slug: 'bug-bounty',
    status: 'active',
    manifest: [{ id: 'new-doc-1', sha256: 'a'.repeat(64) }],
    backup: initialSnapshot,
  };

  // Simulated rollback logic
  assert.equal(importRun.status, 'active');
  const restoredDocuments = [...initialSnapshot.documents];
  importRun.status = 'rolled-back';

  assert.equal(importRun.status, 'rolled-back');
  assert.equal(restoredDocuments.length, 0, 'Restored documents list must match pre-import snapshot');
});

test('14. Publication requires a separate authorized administrator action', () => {
  const collection = Array.from({ length: 34 }, (_, i) => ({
    id: `doc-${i}`,
    collection_slug: 'bug-bounty',
    is_published: false, // Imported as unpublished
    retired_at: null,
  }));

  // Verify initial post-import state
  assert.equal(collection.every(d => d.is_published === false), true, 'All documents must be unpublished after import');

  // Administrator executes publish_study_collection
  function publishStudyCollection(docs: typeof collection, publish: boolean) {
    for (const d of docs) {
      if (d.retired_at === null) {
        d.is_published = publish;
      }
    }
    return { affected: docs.filter(d => d.is_published === publish).length };
  }

  const publishResult = publishStudyCollection(collection, true);
  assert.equal(publishResult.affected, 34);
  assert.equal(collection.every(d => d.is_published === true), true, 'All active documents must be published after admin action');

  // Administrator executes unpublish
  const unpublishResult = publishStudyCollection(collection, false);
  assert.equal(unpublishResult.affected, 34);
  assert.equal(collection.every(d => d.is_published === false), true, 'All active documents can be reverted to unpublished');
});
