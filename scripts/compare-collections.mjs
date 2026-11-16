import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const OLD_DIR = 'C:/Users/dutch/.gemini/antigravity/brain/0f83e2d2-eb4c-4413-9630-667d43335fff/temp_pdf/Bug_bounty_materials';
const INVENTORY_FILE = path.resolve('tmp/repaired_pdf_inventory.json');
const MANIFEST_FILE = path.resolve('tmp/replacement_manifest.json');

async function analyzeOldDoc(filePath) {
  const bytes = fs.readFileSync(filePath);
  const sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
  let pageCount = 0;
  let totalChars = 0;
  let opens = false;

  try {
    const data = new Uint8Array(bytes);
    const doc = await pdfjsLib.getDocument({ data, disableFontFace: true }).promise;
    opens = true;
    pageCount = doc.numPages;
    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const text = await page.getTextContent();
      const str = text.items.map((i) => i.str || '').join(' ').trim();
      totalChars += str.replace(/\s+/g, '').length;
    }
  } catch (e) {
    opens = false;
  }

  return {
    filename: path.basename(filePath),
    file_size: bytes.length,
    sha256,
    page_count: pageCount,
    total_chars: totalChars,
    is_searchable: totalChars > 20,
  };
}

async function run() {
  console.log('=== PHASE 2: COMPARE OLD COLLECTION WITH NEW REPAIRED COLLECTION ===');

  const newInventory = JSON.parse(fs.readFileSync(INVENTORY_FILE, 'utf8'));

  // Scan old dir
  const oldFiles = fs.readdirSync(OLD_DIR).filter((f) => f.toLowerCase().endsWith('.pdf'));
  console.log(`Found ${oldFiles.length} old PDF files in previous test extraction.`);

  const oldInventoryMap = new Map();
  for (const f of oldFiles) {
    const fullPath = path.join(OLD_DIR, f);
    const analysis = await analyzeOldDoc(fullPath);
    oldInventoryMap.set(f.toLowerCase(), analysis);
  }

  let matchedCount = 0;
  let replacedWithNewShaCount = 0;
  let addedCount = 0;
  let retiredCount = 0;
  const manifest = [];

  for (const newDoc of newInventory) {
    const key = newDoc.original_filename.toLowerCase();
    const oldDoc = oldInventoryMap.get(key);

    if (oldDoc) {
      matchedCount++;
      const isRepaired = oldDoc.sha256 !== newDoc.sha256;
      if (isRepaired) replacedWithNewShaCount++;

      manifest.push({
        status: 'REPLACED',
        original_filename: newDoc.original_filename,
        clean_title: newDoc.clean_title,
        category_slug: newDoc.category_slug,
        category_title: newDoc.category_title,
        old_page_count: oldDoc.page_count,
        new_page_count: newDoc.page_count,
        old_file_size: oldDoc.file_size,
        new_file_size: newDoc.file_size,
        old_sha256: oldDoc.sha256,
        new_sha256: newDoc.sha256,
        old_is_searchable: oldDoc.is_searchable,
        new_is_searchable: newDoc.is_searchable,
        new_char_count: newDoc.extracted_char_count,
        page_structure_preserved: oldDoc.page_count === newDoc.page_count,
      });

      oldInventoryMap.delete(key);
    } else {
      addedCount++;
      manifest.push({
        status: 'ADDED',
        original_filename: newDoc.original_filename,
        clean_title: newDoc.clean_title,
        category_slug: newDoc.category_slug,
        category_title: newDoc.category_title,
        new_page_count: newDoc.page_count,
        new_file_size: newDoc.file_size,
        new_sha256: newDoc.sha256,
        new_is_searchable: newDoc.is_searchable,
        new_char_count: newDoc.extracted_char_count,
      });
    }
  }

  // Any remaining in oldInventoryMap are retired
  for (const [key, oldDoc] of oldInventoryMap.entries()) {
    retiredCount++;
    manifest.push({
      status: 'RETIRED',
      original_filename: oldDoc.filename,
      old_page_count: oldDoc.page_count,
      old_file_size: oldDoc.file_size,
      old_sha256: oldDoc.sha256,
    });
  }

  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));

  console.log('\n=== REPLACEMENT MANIFEST SUMMARY ===');
  console.log(`Total Old PDFs analyzed: ${oldFiles.length}`);
  console.log(`Total New Repaired PDFs: ${newInventory.length}`);
  console.log(`Matched & Replaced: ${matchedCount}`);
  console.log(`Repaired with new hash/content: ${replacedWithNewShaCount}`);
  console.log(`Newly Added: ${addedCount}`);
  console.log(`Retired / Removed from active: ${retiredCount}`);
  console.log(`Manifest written to: ${MANIFEST_FILE}`);
}

run().catch(console.error);
