import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('tmp/replacement_manifest.json', 'utf8'));

// Extract unique categories from manifest
const categoryMap = new Map();
for (const doc of manifest) {
  if (!categoryMap.has(doc.category_slug)) {
    categoryMap.set(doc.category_slug, doc.category_title);
  }
}

let sql = '-- Migration: 20261116093607_study_collection_replacement.sql\n';
sql += '-- Safely synchronizes all 34 repaired searchable bug bounty study materials\n\n';

sql += 'DO $$\nBEGIN\n';
sql += '  -- 1. Ensure categories exist\n';
let catOrder = 1;
for (const [slug, title] of categoryMap.entries()) {
  const safeTitle = title.replace(/'/g, "''");
  sql += `  INSERT INTO public.study_categories (id, slug, title, description, sort_order, is_published)\n`;
  sql += `  VALUES (gen_random_uuid(), '${slug}', '${safeTitle}', '${safeTitle} study guides and checklists', ${catOrder++}, true)\n`;
  sql += `  ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, is_published = EXCLUDED.is_published;\n\n`;
}

sql += '  -- 2. Insert or update documents with new SHA-256 checksums and storage keys\n';
sql += '  -- Existing user_study_progress and user_study_bookmarks are strictly preserved\n';

for (let i = 0; i < manifest.length; i++) {
  const doc = manifest[i];
  const slug = doc.original_filename.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const title = doc.clean_title.replace(/'/g, "''");
  const filename = doc.original_filename.replace(/'/g, "''");
  const storageKey = `study-materials/${doc.new_sha256}.pdf`;
  
  sql += `  -- Document: ${doc.original_filename}\n`;
  sql += `  INSERT INTO public.study_documents (\n`;
  sql += `    id, category_id, title, slug, description, original_filename, source_checksum, storage_key, page_count, sort_order, is_published\n`;
  sql += `  ) VALUES (\n`;
  sql += `    gen_random_uuid(),\n`;
  sql += `    (SELECT id FROM public.study_categories WHERE slug = '${doc.category_slug}' LIMIT 1),\n`;
  sql += `    '${title}',\n`;
  sql += `    '${slug}',\n`;
  sql += `    'Comprehensive bug bounty study guide covering ${title} with practical testing checklists.',\n`;
  sql += `    '${filename}',\n`;
  sql += `    '${doc.new_sha256}',\n`;
  sql += `    '${storageKey}',\n`;
  sql += `    ${doc.new_page_count},\n`;
  sql += `    ${i + 1},\n`;
  sql += `    false -- default unpublish on initial insertion per security requirement\n`;
  sql += `  )\n`;
  sql += `  ON CONFLICT (slug) DO UPDATE SET\n`;
  sql += `    category_id = EXCLUDED.category_id,\n`;
  sql += `    title = EXCLUDED.title,\n`;
  sql += `    description = EXCLUDED.description,\n`;
  sql += `    original_filename = EXCLUDED.original_filename,\n`;
  sql += `    source_checksum = EXCLUDED.source_checksum,\n`;
  sql += `    storage_key = EXCLUDED.storage_key,\n`;
  sql += `    page_count = EXCLUDED.page_count,\n`;
  sql += `    sort_order = EXCLUDED.sort_order,\n`;
  sql += `    updated_at = now();\n\n`;
}

sql += 'END $$;\n';

fs.writeFileSync('supabase/migrations/20261116093607_study_collection_replacement.sql', sql, 'utf8');
console.log('Regenerated migration! File written successfully.');
