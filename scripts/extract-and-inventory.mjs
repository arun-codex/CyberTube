import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const ZIP_PATH = 'C:\\Users\\dutch\\Documents\\Codex\\2026-11-16\\giv\\outputs\\Repaired searchable PDFs.zip';
const EXTRACT_DIR = path.resolve('tmp/repaired_searchable_pdfs');
const INVENTORY_FILE = path.resolve('tmp/repaired_pdf_inventory.json');

// Category mapping helper
function categorizeDocument(filename, textSample) {
  const f = filename.toLowerCase();
  const t = textSample.toLowerCase();

  if (f.includes('2fa') || f.includes('ato') || f.includes('authentication') || f.includes('reset_password') || f.includes('cookie') || f.includes('bypass_rate_limit')) {
    return { slug: 'authentication-session-security', title: 'Authentication & Session Security' };
  }
  if (f.includes('idor') || f.includes('authorization') || f.includes('403') || f.includes('adminpanal')) {
    return { slug: 'authorization-idor', title: 'Authorization & IDOR' };
  }
  if (f.includes('xss') || f.includes('cross site scripting') || f.includes('csrf') || f.includes('crlf')) {
    return { slug: 'xss-client-side-security', title: 'XSS & Client-Side Security' };
  }
  if (f.includes('business_logic') || f.includes('mass') || f.includes('json') || f.includes('jire')) {
    return { slug: 'business-logic-api-security', title: 'Business Logic & API Security' };
  }
  if (f.includes('file_upload') || f.includes('rce') || f.includes('command injection') || f.includes('denial_of_services')) {
    return { slug: 'file-upload-ssrf', title: 'File Upload & SSRF' };
  }
  if (f.includes('tips_twitter') || f.includes('twitter') || f.includes('host_header') || f.includes('exposed_source')) {
    return { slug: 'reconnaissance-methodology', title: 'Reconnaissance & Methodology' };
  }
  if (f.includes('checklist') || f.includes('vlnerability') || f.includes('django') || f.includes('symfony') || f.includes('meta_data')) {
    return { slug: 'other-materials', title: 'Other Materials' };
  }
  return { slug: 'bug-bounty-fundamentals', title: 'Bug Bounty Fundamentals' };
}

function cleanTitle(filename) {
  return filename
    .replace(/\.pdf$/i, '')
    .replace(/_SECURED|_secured|_/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b([a-z])/g, (match) => match.toUpperCase())
    .trim();
}

async function run() {
  console.log('=== PHASE 1: LOCATE AND SAFELY EXTRACT REPAIRED SEARCHABLE PDFS ===');

  if (!fs.existsSync(ZIP_PATH)) {
    console.error(`ERROR: ZIP file not found at: ${ZIP_PATH}`);
    process.exit(1);
  }

  const zipStats = fs.statSync(ZIP_PATH);
  console.log(`Source ZIP located: ${ZIP_PATH} (${zipStats.size} bytes)`);

  if (!fs.existsSync(EXTRACT_DIR)) {
    fs.mkdirSync(EXTRACT_DIR, { recursive: true });
  }

  console.log(`Extracting to: ${EXTRACT_DIR} ...`);
  // Use PowerShell Expand-Archive for robust Windows zip extraction
  const extractCmd = `powershell -Command "Expand-Archive -LiteralPath '${ZIP_PATH}' -DestinationPath '${EXTRACT_DIR}' -Force"`;
  execSync(extractCmd, { stdio: 'inherit' });

  // Gather all extracted PDF files recursively
  const files = [];
  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf') && !entry.name.startsWith('.')) {
        files.push(fullPath);
      }
    }
  }
  scanDir(EXTRACT_DIR);

  console.log(`Total PDF files found in extracted archive: ${files.length}`);

  const inventory = [];
  let totalPagesCount = 0;
  let searchableCount = 0;
  let unsearchableCount = 0;

  for (const filePath of files) {
    const filename = path.basename(filePath);
    const fileBytes = fs.readFileSync(filePath);
    const fileSize = fileBytes.length;
    const sha256 = crypto.createHash('sha256').update(fileBytes).digest('hex');

    let pageCount = 0;
    let opensCorrectly = false;
    let textExtractionWorks = false;
    let isSearchable = false;
    let totalChars = 0;
    let extractedSample = '';
    let errorMessage = null;

    try {
      const data = new Uint8Array(fileBytes);
      const loadingTask = pdfjsLib.getDocument({
        data,
        useSystemFonts: true,
        disableFontFace: true,
      });

      const doc = await loadingTask.promise;
      opensCorrectly = true;
      pageCount = doc.numPages;
      totalPagesCount += pageCount;

      let extractedFullText = '';
      for (let p = 1; p <= doc.numPages; p++) {
        const page = await doc.getPage(p);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => ('str' in item ? item.str : ''))
          .join(' ')
          .trim();
        extractedFullText += `\n--- Page ${p} ---\n` + pageText;
      }

      totalChars = extractedFullText.replace(/\s+/g, '').length;
      extractedSample = extractedFullText.slice(0, 300).replace(/\s+/g, ' ').trim();

      if (totalChars > 20) {
        textExtractionWorks = true;
        isSearchable = true;
        searchableCount++;
      } else {
        textExtractionWorks = false;
        isSearchable = false;
        unsearchableCount++;
      }
    } catch (err) {
      errorMessage = err?.message || String(err);
      opensCorrectly = false;
      unsearchableCount++;
    }

    const title = cleanTitle(filename);
    const category = categorizeDocument(filename, extractedSample);

    inventory.push({
      original_filename: filename,
      clean_title: title,
      file_path: filePath,
      file_size: fileSize,
      sha256,
      page_count: pageCount,
      opens_correctly: opensCorrectly,
      text_extraction_works: textExtractionWorks,
      is_searchable: isSearchable,
      extracted_char_count: totalChars,
      text_sample: extractedSample,
      category_slug: category.slug,
      category_title: category.title,
      error: errorMessage,
    });
  }

  // Save inventory to JSON
  fs.writeFileSync(INVENTORY_FILE, JSON.stringify(inventory, null, 2));

  console.log('\n=== INVENTORY SUMMARY ===');
  console.log(`Total PDFs: ${inventory.length}`);
  console.log(`Total Pages: ${totalPagesCount}`);
  console.log(`Searchable PDFs: ${searchableCount}`);
  console.log(`Unsearchable/Corrupted PDFs: ${unsearchableCount}`);
  console.log(`Inventory saved to: ${INVENTORY_FILE}`);
}

run().catch((err) => {
  console.error('Fatal error during extraction and inventory:', err);
  process.exit(1);
});
