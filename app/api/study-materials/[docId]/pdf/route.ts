import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import fs from 'fs';
import path from 'path';

/**
 * Authenticated PDF Streaming Endpoint with HTTP Range Support.
 * Compatible with PDF.js and standard browser viewers.
 * Requires active login session.
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ docId: string }> }
) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return new NextResponse('Unauthorized: Please log in to view study materials.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Bearer' },
    });
  }

  const { docId } = await context.params;
  if (!docId) {
    return new NextResponse('Bad Request: Missing document ID', { status: 400 });
  }

  const admin = createAdminClient();
  let doc: { storage_key: string; is_published: boolean; original_filename: string } | null = null;

  if (admin) {
    const { data, error } = await admin
      .from('study_documents')
      .select('storage_key, is_published, original_filename')
      .eq('id', docId)
      .single();

    if (!error && data) {
      doc = data;
    }
  }

  if (!admin || !doc) {
    return new NextResponse('Document not found or inaccessible', { status: 404 });
  }

  if (!doc.is_published) {
    const { data: adminRow } = await admin
      .from('admin_users')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!adminRow) {
      return new NextResponse('Forbidden: Document is unpublished', { status: 403 });
    }
  }

  let pdfBuffer: Buffer | null = null;
  const { data: fileData, error: downloadError } = await admin.storage
    .from('original-pdfs')
    .download(doc.storage_key);

  if (!downloadError && fileData) {
    pdfBuffer = Buffer.from(await fileData.arrayBuffer());
  } else {
    // Check local fallback in dev/test environment
    const candidatePaths = [
      path.resolve(process.cwd(), 'data/repaired_pdfs', doc.original_filename),
      path.resolve(process.cwd(), 'tmp/repaired_searchable_pdfs', doc.original_filename),
    ];
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        pdfBuffer = fs.readFileSync(p);
        break;
      }
    }
  }

  if (!pdfBuffer) {
    return new NextResponse('Document storage unavailable', { status: 502 });
  }

  const totalSize = pdfBuffer.length;
  const rangeHeader = req.headers.get('range');

  if (rangeHeader) {
    const match = rangeHeader.match(/^bytes=(\d+)-(\d*)$/);
    if (match) {
      const start = parseInt(match[1], 10);
      const end = match[2] ? Math.min(parseInt(match[2], 10), totalSize - 1) : totalSize - 1;

      if (start >= totalSize || end >= totalSize || start > end) {
        return new NextResponse('Requested range not satisfiable', {
          status: 416,
          headers: {
            'Content-Range': `bytes */${totalSize}`,
          },
        });
      }

      const chunk = pdfBuffer.subarray(start, end + 1);
      return new NextResponse(new Uint8Array(chunk) as unknown as BodyInit, {
        status: 206,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Range': `bytes ${start}-${end}/${totalSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': String(chunk.length),
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        },
      });
    }
    return new NextResponse('Invalid range', {
      status: 416,
      headers: { 'Content-Range': `bytes */${totalSize}` },
    });
  }

  return new NextResponse(new Uint8Array(pdfBuffer) as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': String(totalSize),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    },
  });
}
