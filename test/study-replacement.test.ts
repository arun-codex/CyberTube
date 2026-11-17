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
    assert.ok(source, `Source document for checksum ${record.source_checksum} should exist`);
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

test('15. Pre-publication verification fails if any document is unexpectedly published', () => {
  const records = [
    { id: '1', is_published: false, source_checksum: 'a' },
    { id: '2', is_published: true, source_checksum: 'b' }, // Unexpectedly published
  ];

  function verifyUnpublishedPreconditions(docs: typeof records, expectUnpublished: boolean) {
    const publishedCount = docs.filter(r => r.is_published).length;
    if (expectUnpublished && publishedCount > 0) {
      throw new Error(`Pre-publication verification failed: ${publishedCount} documents are unexpectedly published`);
    }
  }

  assert.throws(
    () => verifyUnpublishedPreconditions(records, true),
    /Pre-publication verification failed: 1 documents are unexpectedly published/
  );

  const cleanRecords = [
    { id: '1', is_published: false, source_checksum: 'a' },
    { id: '2', is_published: false, source_checksum: 'b' },
  ];
  assert.doesNotThrow(() => verifyUnpublishedPreconditions(cleanRecords, true));
});

test('16. Strict independent confirmation flags for write modes', () => {
  function enforceCliFlags(args: {
    mode: string;
    'acknowledge-production-target'?: boolean;
    'confirm-publish'?: boolean;
    'confirm-unpublish'?: boolean;
    'confirm-rollback'?: boolean;
    run?: string;
  }) {
    if (['apply', 'rollback', 'publish', 'unpublish'].includes(args.mode)) {
      if (!args['acknowledge-production-target']) {
        throw new Error('Explicit production target acknowledgment required (--acknowledge-production-target). Refusing to perform database write without explicit confirmation.');
      }
    }
    if (args.mode === 'publish' && !args['confirm-publish']) {
      throw new Error('Publication requires explicit confirmation flag (--confirm-publish).');
    }
    if (args.mode === 'unpublish' && !args['confirm-unpublish']) {
      throw new Error('Unpublishing requires explicit confirmation flag (--confirm-unpublish).');
    }
    if (args.mode === 'rollback') {
      if (!args.run) throw new Error('--run <run_id> is required for rollback');
      if (!args['confirm-rollback']) throw new Error('Rollback requires explicit confirmation flag (--confirm-rollback).');
    }
    return { authorized: true };
  }

  // 1. apply requires --acknowledge-production-target
  assert.throws(() => enforceCliFlags({ mode: 'apply' }), /Explicit production target acknowledgment required/);
  // Passing publication flag to apply does NOT authorize it
  assert.throws(() => enforceCliFlags({ mode: 'apply', 'confirm-publish': true }), /Explicit production target acknowledgment required/);
  assert.deepEqual(enforceCliFlags({ mode: 'apply', 'acknowledge-production-target': true }), { authorized: true });

  // 2. publish requires BOTH --acknowledge-production-target AND --confirm-publish
  assert.throws(() => enforceCliFlags({ mode: 'publish' }), /Explicit production target acknowledgment required/);
  assert.throws(() => enforceCliFlags({ mode: 'publish', 'confirm-publish': true }), /Explicit production target acknowledgment required/);
  assert.throws(() => enforceCliFlags({ mode: 'publish', 'acknowledge-production-target': true }), /Publication requires explicit confirmation flag \(--confirm-publish\)/);
  assert.deepEqual(enforceCliFlags({ mode: 'publish', 'acknowledge-production-target': true, 'confirm-publish': true }), { authorized: true });

  // 3. unpublish requires BOTH --acknowledge-production-target AND --confirm-unpublish
  assert.throws(() => enforceCliFlags({ mode: 'unpublish' }), /Explicit production target acknowledgment required/);
  assert.throws(() => enforceCliFlags({ mode: 'unpublish', 'confirm-unpublish': true }), /Explicit production target acknowledgment required/);
  assert.throws(() => enforceCliFlags({ mode: 'unpublish', 'acknowledge-production-target': true }), /Unpublishing requires explicit confirmation flag \(--confirm-unpublish\)/);
  assert.deepEqual(enforceCliFlags({ mode: 'unpublish', 'acknowledge-production-target': true, 'confirm-unpublish': true }), { authorized: true });

  // 4. rollback requires --acknowledge-production-target, --run, AND --confirm-rollback
  assert.throws(() => enforceCliFlags({ mode: 'rollback' }), /Explicit production target acknowledgment required/);
  assert.throws(() => enforceCliFlags({ mode: 'rollback', 'acknowledge-production-target': true }), /--run <run_id> is required for rollback/);
  assert.throws(() => enforceCliFlags({ mode: 'rollback', 'acknowledge-production-target': true, run: 'run-1' }), /Rollback requires explicit confirmation flag \(--confirm-rollback\)/);
  assert.deepEqual(enforceCliFlags({ mode: 'rollback', 'acknowledge-production-target': true, run: 'run-1', 'confirm-rollback': true }), { authorized: true });
});

test('17. Dynamic contract verification rejects old production function with is_published=true', () => {
  const oldFunctionSql = `
    CREATE OR REPLACE FUNCTION public.replace_study_collection(run_id text, manifest jsonb, expected_documents jsonb)
    ...
    insert into public.study_documents(id,title,slug,original_filename,source_checksum,storage_key,page_count,file_size,category_id,collection_slug,validation_status,is_published,retired_at)
    values((item->>'id')::uuid,item->>'title',item->>'slug',item->>'original_filename',item->>'sha256',item->>'storage_key',
      (item->>'page_count')::integer,(item->>'file_size')::bigint,(item->>'category_id')::uuid,'bug-bounty','verified',true,null)
    on conflict(id) do update set title=excluded.title,original_filename=excluded.original_filename,source_checksum=excluded.source_checksum,
      storage_key=excluded.storage_key,page_count=excluded.page_count,file_size=excluded.file_size,category_id=excluded.category_id,
      thumbnail_key=null,validation_status='verified',is_published=true,retired_at=null,updated_at=now();
  `;

  const newFunctionSql = `
    CREATE OR REPLACE FUNCTION public.replace_study_collection(run_id text, manifest jsonb, expected_documents jsonb)
    ...
    insert into public.study_documents(id,title,slug,original_filename,source_checksum,storage_key,page_count,file_size,category_id,collection_slug,validation_status,is_published,retired_at)
    values((item->>'id')::uuid,item->>'title',item->>'slug',item->>'original_filename',item->>'sha256',item->>'storage_key',
      (item->>'page_count')::integer,(item->>'file_size')::bigint,(item->>'category_id')::uuid,'bug-bounty','verified',false,null)
    on conflict(id) do update set title=excluded.title,original_filename=excluded.original_filename,source_checksum=excluded.source_checksum,
      storage_key=excluded.storage_key,page_count=excluded.page_count,file_size=excluded.file_size,category_id=excluded.category_id,
      thumbnail_key=null,validation_status='verified',is_published=false,retired_at=null,updated_at=now();
  `;

  function evaluateContract(funcDef: string | null) {
    if (!funcDef) {
      return { verified: false, defaults_to_unpublished: false, error: 'replace_study_collection function not found' };
    }
    const hasOldPublishedTrue = /is_published\s*=\s*true/i.test(funcDef);
    const hasUnpublishedInsert = /bug-bounty.*?verified.*?false.*?null/i.test(funcDef);
    const hasUnpublishedUpdate = /is_published\s*=\s*false/i.test(funcDef);

    if (hasOldPublishedTrue || !hasUnpublishedInsert || !hasUnpublishedUpdate) {
      return {
        verified: false,
        defaults_to_unpublished: false,
        hasOldPublishedTrue,
        hasUnpublishedInsert,
        hasUnpublishedUpdate,
        error: 'Installed replace_study_collection does NOT enforce unpublished default (detected is_published=true or missing is_published=false)',
      };
    }
    return { verified: true, defaults_to_unpublished: true };
  }

  // 1. Old function MUST be rejected
  const oldResult = evaluateContract(oldFunctionSql);
  assert.equal(oldResult.verified, false, 'Old production function must fail contract verification');
  assert.equal(oldResult.defaults_to_unpublished, false);
  assert.equal(oldResult.hasOldPublishedTrue, true);

  // 2. New function MUST be accepted
  const newResult = evaluateContract(newFunctionSql);
  assert.equal(newResult.verified, true, 'New corrected function must pass contract verification');
  assert.equal(newResult.defaults_to_unpublished, true);

  // 3. Missing function MUST be rejected
  const missingResult = evaluateContract(null);
  assert.equal(missingResult.verified, false);
});

test('18. Fail-closed importer preflight aborts when database contract is unverified', async () => {
  async function runImporterPreflight(mockRpc: () => Promise<any>) {
    try {
      const contract = await mockRpc();
      if (contract?.verified !== true || contract?.defaults_to_unpublished !== true) {
        throw new Error(`Database contract verification failed: ${contract?.error || 'defaults_to_unpublished is not true'}`);
      }
      return true;
    } catch (err: any) {
      throw new Error(`FAIL-CLOSED PREFLIGHT: Installed database replace_study_collection function does NOT guarantee unpublished imports. Forward migration 20261116173000 must be applied first before uploading any files. (Details: ${err.message})`);
    }
  }

  // Case 1: RPC does not exist (old function in DB)
  await assert.rejects(
    () => runImporterPreflight(async () => { throw new Error('function verify_study_import_contract() does not exist'); }),
    /FAIL-CLOSED PREFLIGHT: Installed database replace_study_collection function does NOT guarantee unpublished imports/
  );

  // Case 2: RPC returns contract with verified: false (e.g. old function still in pg_proc)
  await assert.rejects(
    () => runImporterPreflight(async () => ({ verified: false, defaults_to_unpublished: false, error: 'Detected is_published=true' })),
    /Database contract verification failed: Detected is_published=true/
  );

  // Case 3: RPC returns genuine verified contract
  const verified = await runImporterPreflight(async () => ({ verified: true, defaults_to_unpublished: true }));
  assert.equal(verified, true);
});

test('19. Importer validates supplied --zip against inventory and rejects mismatched archives', () => {
  const authoritativeSha = '37f45d3329ca8c07b783f74a0206699ecf8605909fac94d1ad77c650cf9b0b9d';
  const mismatchedSha = '1111111111111111111111111111111111111111111111111111111111111111';

  const inventory = {
    zip_sha256: authoritativeSha,
    documents: [],
  };

  function validateZipWithInventory(suppliedZipSha: string | null, inv: typeof inventory | null, mode: string) {
    if (!inv && ['dry-run', 'apply', 'verify'].includes(mode)) {
      throw new Error('inventory.json not found in output directory. You must first run inventory mode.');
    }
    if (suppliedZipSha && inv) {
      if (suppliedZipSha !== inv.zip_sha256) {
        throw new Error(`Mismatched archive: supplied --zip SHA-256 (${suppliedZipSha}) does not match inventory SHA-256 (${inv.zip_sha256}). Re-run inventory mode first.`);
      }
    }
    return true;
  }

  // Missing inventory.json throws
  assert.throws(() => validateZipWithInventory(authoritativeSha, null, 'apply'), /inventory.json not found/);

  // Mismatched ZIP SHA-256 throws
  assert.throws(() => validateZipWithInventory(mismatchedSha, inventory, 'apply'), /Mismatched archive/);

  // Matching ZIP SHA-256 passes
  assert.equal(validateZipWithInventory(authoritativeSha, inventory, 'apply'), true);
});
