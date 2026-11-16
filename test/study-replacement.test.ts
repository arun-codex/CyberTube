import test from 'node:test';
import assert from 'node:assert/strict';
import { planReplacement, assertStaging, stageFiles, checksum } from '../scripts/study-replace.mjs';
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
