import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

/**
 * Extracts the page count from a PDF buffer in pure JavaScript.
 * Does not require canvas, Poppler, Sharp, or any native binaries.
 */
export async function getPdfPageCount(pdfBuffer: Buffer): Promise<number> {
  const data = new Uint8Array(pdfBuffer);
  const loadingTask = pdfjsLib.getDocument({
    data,
    useSystemFonts: true,
    disableFontFace: true,
  });

  const pdfDocument = await loadingTask.promise;
  try { return pdfDocument.numPages || 0; } finally { await loadingTask.destroy(); }
}
