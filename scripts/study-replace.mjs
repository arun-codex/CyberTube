import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { spawnSync } from 'node:child_process';
import { createClient } from '@supabase/supabase-js';

export const checksum = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
export const normalize = name => name.toLowerCase().replace(/\.pdf$/,'').replace(/secured/g,'').replace(/[^a-z0-9]/g,'');

export function planReplacement(inventory, snapshot, categories, verifiedOld = []) {
  const seen = new Map(), claimed = new Set(), documents = [], duplicates = [], problems = [];
  for (const pdf of inventory.documents) {
    if (!pdf.opens_correctly || !pdf.rendering_valid || !pdf.is_searchable || pdf.error) problems.push(pdf.original_filename);
    if (seen.has(pdf.sha256)) {
      duplicates.push({ filename: pdf.original_filename, canonical: seen.get(pdf.sha256) });
      continue;
    }
    seen.set(pdf.sha256, pdf.original_filename);
    const candidates = snapshot.documents.filter(old => old.source_checksum === pdf.sha256 ||
      normalize(old.original_filename) === normalize(pdf.original_filename) || normalize(old.title) === normalize(pdf.title));
    if (candidates.length > 1) throw new Error(`Ambiguous old identity: ${pdf.original_filename}`);
    const old = candidates[0];
    if (old && claimed.has(old.id)) throw new Error(`Multiple replacements for ${old.id}`);
    if (old) claimed.add(old.id);
    const category = categories.find(c => c.slug === pdf.category_slug);
    if (!category) throw new Error(`Missing category: ${pdf.category_slug}`);
    // Names only propose identity. Compare downloaded originals before reusing IDs.
    const proof = old && verifiedOld.find(d => d.sha256 === old.source_checksum &&
      (d.sha256 === pdf.sha256 || (normalize(d.original_filename) === normalize(pdf.original_filename) &&
       d.pages.length === pdf.pages.length && d.pages.every((p,i) =>
         (p.text_sha256 === pdf.pages[i].text_sha256 && p.characters > 0) ||
         (p.visual_sha256 && p.visual_sha256 === pdf.pages[i].visual_sha256)))));
    if (old && !proof) throw new Error(`Unverified replacement identity: ${pdf.original_filename}; supply inspected old originals`);
    const id = old?.id || crypto.randomUUID();
    documents.push({ id, title: pdf.title, slug: old?.slug || `${normalize(pdf.title)}-${pdf.sha256.slice(0,12)}`,
      original_filename: pdf.original_filename, sha256: pdf.sha256, storage_key: `bug-bounty/${pdf.sha256}.pdf`,
      page_count: pdf.page_count, file_size: pdf.file_size, category_id: category.id,
      validation_status: 'verified', preserve_progress: Boolean(proof),
      action: old ? 'replace' : 'add' });
  }
  return { documents, duplicates, problems, retired: snapshot.documents.filter(d => !claimed.has(d.id)) };
}

export function assertStaging(url, project) {
  if (!project || new URL(url).hostname !== `${project}.supabase.co`) throw new Error('Explicit staging project must match Supabase URL');
  if (/your_project|placeholder/i.test(url)) throw new Error('Configure real staging credentials');
}

async function checked(operation) {
  const { data, error } = await operation;
  if (error) throw new Error(error.message);
  return data;
}

async function verifyFiles(client, documents) {
  for (const doc of documents) {
    const blob = await checked(client.storage.from('original-pdfs').download(doc.storage_key));
    if (checksum(Buffer.from(await blob.arrayBuffer())) !== doc.sha256) throw new Error(`Stored checksum mismatch: ${doc.original_filename}`);
  }
}

async function main() {
  const { values: args } = parseArgs({ options: {
    mode: { type:'string', default:'dry-run' }, zip: { type:'string' }, output: { type:'string' },
    project: { type:'string' }, run: { type:'string' }, 'old-dir': { type:'string' },
  }});
  if (!args.output) throw new Error('--output is required (private directory outside repository)');
  const output = path.resolve(args.output);
  const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const relative = path.relative(repo, output);
  if (!relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative)) throw new Error('Output must be outside the repository');
  await fs.mkdir(output, { recursive:true });
  if (args.mode === 'inventory') {
    if (!args.zip) throw new Error('--zip is required');
    const command = [path.join(repo,'scripts/study_inventory.py'),'--zip',args.zip,'--output',output];
    if (args['old-dir']) command.push('--old-dir',args['old-dir']);
    const result = spawnSync(process.env.PYTHON || 'python',command,{ stdio:'inherit' });
    if (result.status !== 0) throw new Error('Inventory failed');
    return;
  }
  if (!['dry-run','apply','verify','rollback'].includes(args.mode)) throw new Error('Unknown mode');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  assertStaging(url, args.project);
  if (!secret || /your_|placeholder/.test(secret)) throw new Error('Configure staging service credential in environment');
  const client = createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
  if (args.mode === 'rollback') {
    if (!args.run) throw new Error('--run is required');
    console.log(await checked(client.rpc('rollback_study_collection',{run_id:args.run})));
    return;
  }
  const inventory = JSON.parse(await fs.readFile(path.join(output,'inventory.json'),'utf8'));
  if (args.mode==='apply') {
    const prior=await checked(client.from('study_import_runs').select('status,manifest').eq('id',inventory.zip_sha256).maybeSingle());
    if (prior?.status==='active') {
      const current=await checked(client.from('study_documents').select('id,source_checksum').eq('collection_slug','bug-bounty').eq('is_published',true));
      if (JSON.stringify(current.map(d=>d.source_checksum).sort())!==JSON.stringify(prior.manifest.map(d=>d.sha256).sort())) throw new Error('Previously imported catalog changed');
      await verifyFiles(client,prior.manifest);
      console.log('Import already active; all files reverified');
      return;
    }
  }
  if (args.mode === 'verify') {
    const records = await checked(client.from('study_documents').select('*').eq('collection_slug','bug-bounty').eq('is_published',true));
    const expected = [...new Set(inventory.documents.map(d=>d.sha256))].sort();
    if (JSON.stringify(records.map(d=>d.source_checksum).sort()) !== JSON.stringify(expected)) throw new Error('Active collection differs from archive');
    await verifyFiles(client,records.map(d=>({...d,sha256:d.source_checksum})));
    await fs.writeFile(path.join(output,'storage-verification.json'),JSON.stringify({verified:records.length,at:new Date().toISOString()},null,2));
    console.log(`Verified ${records.length} active private PDFs`);
    return;
  }
  const snapshot = await checked(client.rpc('study_collection_snapshot'));
  const categories = await checked(client.from('study_categories').select('id,slug'));
  // Back up and independently inspect hosted originals, including unpublished entries.
  const backup = path.join(output,'hosted-backup');
  await fs.mkdir(backup,{recursive:true});
  const verifiedOld = [];
  for (const doc of snapshot.documents) {
    const raw = Buffer.from(await (await checked(client.storage.from('original-pdfs').download(doc.storage_key))).arrayBuffer());
    if (checksum(raw)!==doc.source_checksum) throw new Error(`Old backup checksum mismatch: ${doc.id}`);
    const target = path.join(backup,`${doc.id}.pdf`);
    await fs.writeFile(target,raw);
    const inspected = spawnSync(process.env.PYTHON || 'python',['-c',
      'import sys,json; from study_inventory import inspect_pdf; from pathlib import Path; print(json.dumps(inspect_pdf(Path(sys.argv[1]),sys.argv[2])))',target,doc.original_filename],
      {cwd:path.join(repo,'scripts'),encoding:'utf8'});
    if (inspected.status!==0) throw new Error(`Old PDF inspection failed: ${doc.id}`);
    verifiedOld.push(JSON.parse(inspected.stdout));
  }
  await fs.writeFile(path.join(backup,'snapshot.json'),JSON.stringify(snapshot,null,2));
  const plan = planReplacement(inventory,snapshot,categories,verifiedOld);
  // Reuse generated IDs on retries, but only if archive and expected catalog agree.
  const manifestPath=path.join(output,'replacement-manifest.json');
  let previous;
  try { previous=JSON.parse(await fs.readFile(manifestPath,'utf8')); } catch {}
  if (previous?.zip_sha256===inventory.zip_sha256 && previous?.project===args.project) {
    for (const doc of plan.documents) {
      const prior=previous.documents.find(d=>d.sha256===doc.sha256);
      if (prior && !snapshot.documents.some(d=>d.id===doc.id)) doc.id=prior.id;
    }
  }
  const runId=inventory.zip_sha256;
  const report={...plan,run_id:runId,project:args.project,zip_sha256:inventory.zip_sha256,expected_documents:snapshot.documents};
  await fs.writeFile(manifestPath,JSON.stringify(report,null,2));
  console.log(JSON.stringify({mode:args.mode,add:plan.documents.filter(d=>d.action==='add').length,
    replace:plan.documents.filter(d=>d.action==='replace').length,retire:plan.retired.length,duplicates:plan.duplicates.length,problems:plan.problems}));
  if (args.mode==='dry-run') return;
  if (plan.problems.length) throw new Error('Validation HOLD: resolve problematic PDFs before activation; manifest has exact filenames');
  for (const doc of plan.documents) {
    const source=inventory.documents.find(d=>d.sha256===doc.sha256);
    const raw=await fs.readFile(source.file_path);
    if (checksum(raw)!==doc.sha256) throw new Error(`Source changed: ${source.original_filename}`);
    const existing=await client.storage.from('original-pdfs').download(doc.storage_key);
    if (!existing.error) {
      if (checksum(Buffer.from(await existing.data.arrayBuffer()))!==doc.sha256) throw new Error('Immutable object collision');
    } else {
      await checked(client.storage.from('original-pdfs').upload(doc.storage_key,raw,{upsert:false,contentType:'application/pdf'}));
    }
  }
  await verifyFiles(client,plan.documents);
  const manifest=plan.documents.map(({action,...d})=>d);
  const activated=await checked(client.rpc('replace_study_collection',{run_id:runId,manifest,expected_documents:snapshot.documents}));
  await fs.writeFile(path.join(output,'activation.json'),JSON.stringify(activated,null,2));
  console.log(activated);
}

if (process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  main().catch(async error=>{ console.error(error.message); process.exitCode=1; });
}
