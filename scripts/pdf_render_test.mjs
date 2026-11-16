import fs from 'fs';
import path from 'path';
import { createCanvas } from '@napi-rs/canvas';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

async function renderFirstPage() {
  const pdfPath = 'C:/Users/dutch/.gemini/antigravity/brain/0f83e2d2-eb4c-4413-9630-667d43335fff/temp_pdf/Bug_bounty_materials/2FA_BYPASS_SECURED.pdf';
  console.log('Loading PDF from:', pdfPath);
  
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const loadingTask = pdfjsLib.getDocument({
    data,
    useSystemFonts: true,
    disableFontFace: true,
  });

  const pdfDocument = await loadingTask.promise;
  console.log(`PDF Loaded successfully! Total pages: ${pdfDocument.numPages}`);

  const page = await pdfDocument.getPage(1);
  const viewport = page.getViewport({ scale: 1.5 });
  console.log(`Page 1 dimensions: ${viewport.width}x${viewport.height}`);

  const canvas = createCanvas(viewport.width, viewport.height);
  const context = canvas.getContext('2d');

  const renderTask = page.render({
    canvasContext: context,
    canvas: canvas,
    viewport: viewport,
  });

  await renderTask.promise;
  console.log('Page rendered successfully with @napi-rs/canvas!');

  const outputDir = path.resolve('tmp');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'test_page_1.png');
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  const stats = fs.statSync(outputPath);
  console.log(`Saved output to ${outputPath}`);
  console.log(`Output file size: ${stats.size} bytes`);
}

renderFirstPage().catch(err => {
  console.error('Render error:', err);
  process.exit(1);
});
