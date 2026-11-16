import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { renderPdfPages } from '@/lib/pdf/render';

/**
 * Process uploaded PDF: rasterise each page to PNG, store in `page-assets` bucket,
 * create `study_document_pages` rows, update `study_documents` metadata.
 * Protected by service-role admin client.
 */
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ docId: string }> }
) {
  const params = await context.params;
  const documentId = params.docId;

  if (!documentId) {
    return NextResponse.json({ error: 'Document ID missing' }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Supabase admin client unavailable' }, { status: 500 });
  }

  // Fetch document metadata (storage_key, source_checksum)
  const { data: doc, error: fetchErr } = await admin
    .from('study_documents')
    .select('id, storage_key, source_checksum')
    .eq('id', documentId)
    .single();

  if (fetchErr || !doc) {
    return NextResponse.json({ error: 'Document not found', details: fetchErr?.message }, { status: 404 });
  }

  // Download PDF from private bucket
  const { data: pdfFile, error: downloadErr } = await admin.storage
    .from('original-pdfs')
    .download(doc.storage_key);

  if (downloadErr || !pdfFile) {
    return NextResponse.json({ error: 'Failed to download PDF', details: downloadErr?.message }, { status: 500 });
  }

  const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());

  // Render pages using pdfjs-dist & @napi-rs/canvas
  let renderResult;
  try {
    renderResult = await renderPdfPages(pdfBuffer);
  } catch (e) {
    return NextResponse.json({ error: 'Unable to render PDF pages', details: (e as Error).message }, { status: 500 });
  }

  const { numPages, pages } = renderResult;
  if (numPages === 0 || pages.length === 0) {
    return NextResponse.json({ error: 'PDF has no pages' }, { status: 400 });
  }

  // Process each page: upload to page-assets bucket
  const pageRows: {
    document_id: string;
    page_number: number;
    private_asset_key: string;
    width: number;
    height: number;
  }[] = [];

  for (const page of pages) {
    const assetKey = `doc-${documentId}/page-${page.pageNumber}.png`;
    const { error: uploadErr } = await admin.storage
      .from('page-assets')
      .upload(assetKey, page.pngBuffer, { upsert: true, contentType: 'image/png' });

    if (uploadErr) {
      return NextResponse.json(
        { error: `Failed uploading page asset for page ${page.pageNumber}`, details: uploadErr.message },
        { status: 500 }
      );
    }

    pageRows.push({
      document_id: documentId,
      page_number: page.pageNumber,
      private_asset_key: assetKey,
      width: page.width,
      height: page.height,
    });
  }

  // Upsert page metadata rows
  const { error: insertPagesErr } = await admin
    .from('study_document_pages')
    .upsert(pageRows, { onConflict: 'document_id,page_number' });

  if (insertPagesErr) {
    return NextResponse.json({ error: 'Failed inserting page rows', details: insertPagesErr.message }, { status: 500 });
  }

  // Update document record with page count and thumbnail
  const thumbnailKey = `doc-${documentId}/page-1.png`;
  const { error: updateDocErr } = await admin
    .from('study_documents')
    .update({ page_count: numPages, thumbnail_key: thumbnailKey })
    .eq('id', documentId);

  if (updateDocErr) {
    return NextResponse.json({ error: 'Failed updating document metadata', details: updateDocErr.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Processing complete', pageCount: numPages });
}
