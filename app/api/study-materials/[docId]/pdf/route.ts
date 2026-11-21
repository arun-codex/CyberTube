import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { CANONICAL_ORIGIN } from '@/lib/canonicalUrl';

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  try {
    const parsed = new URL(origin);
    const host = parsed.hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1') return true;
    if (host === 'cybertube-mu.vercel.app') return true;
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      const siteOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL).origin;
      if (parsed.origin === siteOrigin) return true;
    }
    const canonical = new URL(CANONICAL_ORIGIN).origin;
    if (parsed.origin === canonical) return true;
  } catch {
    return false;
  }
  return false;
}

function getCorsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Range, Authorization, Content-Type, Accept',
    'Access-Control-Expose-Headers': 'Accept-Ranges, Content-Range, Content-Length, Content-Type',
    'Access-Control-Max-Age': '86400',
  };
  if (origin && isAllowedOrigin(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Vary'] = 'Origin';
  }
  return headers;
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

/** Streams only the requested authorized private object; no local fallback. */
export async function GET(req: NextRequest, context: { params: Promise<{ docId: string }> }) {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  const user = await getAuthenticatedUser();
  if (!user) {
    return new NextResponse('Unauthorized: Please log in.', {
      status: 401,
      headers: corsHeaders,
    });
  }

  const { docId } = await context.params;
  const admin = createAdminClient();
  if (!admin) return new NextResponse('Storage unavailable', { status: 503, headers: corsHeaders });

  let { data: doc, error } = await admin
    .from('study_documents')
    .select('storage_key,is_published,retired_at')
    .eq('id', docId)
    .single();

  if (error || !doc) {
    const { data: slugDoc, error: slugErr } = await admin
      .from('study_documents')
      .select('storage_key,is_published,retired_at')
      .eq('slug', docId)
      .single();
    if (!slugErr && slugDoc) {
      doc = slugDoc;
      error = null;
    }
  }

  if (error || !doc || doc.retired_at) return new NextResponse('Document not found', { status: 404, headers: corsHeaders });

  if (!doc.is_published) {
    const { data: administrator } = await admin.from('admin_users').select('id').eq('user_id', user.id).single();
    if (!administrator) return new NextResponse('Forbidden: Document is unpublished', { status: 403, headers: corsHeaders });
  }

  // Support both 'study-materials' and 'original-pdfs' storage buckets with flexible path formats
  const bucketsToTry = ['study-materials', 'original-pdfs'];
  const rawKey = doc.storage_key || '';
  const bareKey = rawKey.replace(/^(?:study-materials|original-pdfs|bug-bounty)\//, '');
  const candidateKeys = [
    rawKey,
    bareKey,
    `bug-bounty/${bareKey}`,
    `study-materials/${bareKey}`,
    `original-pdfs/${bareKey}`,
  ].filter((k, idx, arr) => k && arr.indexOf(k) === idx);

  let file: Blob | null = null;
  let lastStorageError: any = null;

  for (const bucket of bucketsToTry) {
    for (const key of candidateKeys) {
      const { data, error: storageErr } = await admin.storage.from(bucket).download(key);
      if (!storageErr && data) {
        file = data;
        break;
      }
      if (storageErr) {
        lastStorageError = storageErr;
      }
    }
    if (file) break;
  }

  if (!file) {
    console.error(`Document storage unavailable for docId=${docId}, key=${doc.storage_key}:`, lastStorageError);
    return new NextResponse('Document storage unavailable', { status: 502, headers: corsHeaders });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const headers: Record<string, string> = {
    'Content-Type': 'application/pdf',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    'X-Content-Type-Options': 'nosniff',
    ...corsHeaders,
  };

  const range = req.headers.get('range');
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!match || (!match[1] && !match[2])) {
      return new NextResponse('Invalid range', {
        status: 416,
        headers: { ...headers, 'Content-Range': `bytes */${bytes.length}` },
      });
    }
    const start = match[1] ? Number(match[1]) : Math.max(0, bytes.length - Number(match[2]));
    const end = match[1] && match[2] ? Math.min(Number(match[2]), bytes.length - 1) : bytes.length - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= bytes.length) {
      return new NextResponse('Unsatisfiable range', {
        status: 416,
        headers: { ...headers, 'Content-Range': `bytes */${bytes.length}` },
      });
    }
    headers['Content-Range'] = `bytes ${start}-${end}/${bytes.length}`;
    headers['Content-Length'] = String(end - start + 1);
    return new NextResponse(bytes.slice(start, end + 1), { status: 206, headers });
  }

  headers['Content-Length'] = String(bytes.length);
  return new NextResponse(bytes, { headers });
}
