import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

/** Streams only the requested authorized private object; no local fallback. */
export async function GET(req: NextRequest, context: { params: Promise<{ docId: string }> }) {
  const user = await getAuthenticatedUser();
  if (!user) return new NextResponse('Unauthorized: Please log in.', { status: 401 });
  const { docId } = await context.params;
  const admin = createAdminClient();
  if (!admin) return new NextResponse('Storage unavailable', { status: 503 });
  const { data: doc, error } = await admin.from('study_documents')
    .select('storage_key,is_published,retired_at').eq('id', docId).single();
  if (error || !doc || doc.retired_at) return new NextResponse('Document not found', { status: 404 });
  if (!doc.is_published) {
    const { data: administrator } = await admin.from('admin_users').select('id').eq('user_id', user.id).single();
    if (!administrator) return new NextResponse('Forbidden: Document is unpublished', { status: 403 });
  }
  const { data: file, error: storageError } = await admin.storage.from('original-pdfs').download(doc.storage_key);
  if (storageError || !file) return new NextResponse('Document storage unavailable', { status: 502 });
  const bytes = new Uint8Array(await file.arrayBuffer());
  const headers: Record<string, string> = {
    'Content-Type': 'application/pdf', 'Accept-Ranges': 'bytes',
    'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff',
  };
  const range = req.headers.get('range');
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!match || (!match[1] && !match[2])) {
      return new NextResponse('Invalid range', { status: 416, headers: { ...headers, 'Content-Range': `bytes */${bytes.length}` } });
    }
    const start = match[1] ? Number(match[1]) : Math.max(0, bytes.length - Number(match[2]));
    const end = match[1] && match[2] ? Math.min(Number(match[2]), bytes.length - 1) : bytes.length - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= bytes.length) {
      return new NextResponse('Unsatisfiable range', { status: 416, headers: { ...headers, 'Content-Range': `bytes */${bytes.length}` } });
    }
    headers['Content-Range'] = `bytes ${start}-${end}/${bytes.length}`;
    headers['Content-Length'] = String(end - start + 1);
    return new NextResponse(bytes.slice(start, end + 1), { status: 206, headers });
  }
  headers['Content-Length'] = String(bytes.length);
  return new NextResponse(bytes, { headers });
}
