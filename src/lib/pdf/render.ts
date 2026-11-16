import fs from 'fs';
import path from 'path';
import { createCanvas } from '@napi-rs/canvas';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

export interface RenderedPdfPage {
  pageNumber: number;
  width: number;
  height: number;
  pngBuffer: Buffer;
}

/**
 * Renders all or specific pages of a PDF from a buffer to PNG buffers using pdfjs-dist and @napi-rs/canvas.
 */
export async function renderPdfPages(
  pdfBuffer: Buffer,
  scale = 1.5,
  options?: { maxPages?: number }
): Promise<{ numPages: number; pages: RenderedPdfPage[] }> {
  const data = new Uint8Array(pdfBuffer);
  const loadingTask = pdfjsLib.getDocument({
    data,
    useSystemFonts: true,
    disableFontFace: true,
  });

  const pdfDocument = await loadingTask.promise;
  const numPages = pdfDocument.numPages;
  const pagesToRender = options?.maxPages ? Math.min(numPages, options.maxPages) : numPages;

  const renderedPages: RenderedPdfPage[] = [];

  for (let i = 1; i <= pagesToRender; i++) {
    const page = await pdfDocument.getPage(i);
    const viewport = page.getViewport({ scale });
    const width = Math.round(viewport.width);
    const height = Math.round(viewport.height);

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    const renderTask = page.render({
      canvasContext: context as unknown as CanvasRenderingContext2D,
      canvas: canvas as unknown as HTMLCanvasElement,
      viewport: viewport,
    });

    await renderTask.promise;
    const pngBuffer = canvas.toBuffer('image/png');

    renderedPages.push({
      pageNumber: i,
      width,
      height,
      pngBuffer,
    });
  }

  return {
    numPages,
    pages: renderedPages,
  };
}

/**
 * Renders a single page of a PDF from a buffer.
 */
export async function renderPdfSinglePage(
  pdfBuffer: Buffer,
  pageNumber: number,
  scale = 1.5
): Promise<RenderedPdfPage> {
  const data = new Uint8Array(pdfBuffer);
  const loadingTask = pdfjsLib.getDocument({
    data,
    useSystemFonts: true,
    disableFontFace: true,
  });

  const pdfDocument = await loadingTask.promise;
  if (pageNumber < 1 || pageNumber > pdfDocument.numPages) {
    throw new Error(`Invalid page number ${pageNumber}. Total pages: ${pdfDocument.numPages}`);
  }

  const page = await pdfDocument.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const width = Math.round(viewport.width);
  const height = Math.round(viewport.height);

  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  const renderTask = page.render({
    canvasContext: context as unknown as CanvasRenderingContext2D,
    canvas: canvas as unknown as HTMLCanvasElement,
    viewport: viewport,
  });

  await renderTask.promise;
  const pngBuffer = canvas.toBuffer('image/png');

  return {
    pageNumber,
    width,
    height,
    pngBuffer,
  };
}
