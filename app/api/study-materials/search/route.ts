import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, createClient } from '@/lib/supabase/server';
import { LibrarySearchResponse, DocumentSearchResult } from '@/lib/pdf/library-search';

export const dynamic = 'force-dynamic';

// In-memory sliding window rate limiter: 30 requests per 60s per user/IP
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(key, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  entry.count += 1;
  return true;
}

// Clean up stale rate limit entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

export async function GET(req: NextRequest) {
  // 1. Strict Authentication Guard: Unauthenticated access is denied
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized: Authentication required to search study materials.' },
      { status: 401 }
    );
  }

  // 2. Rate Limiting by user ID
  if (!checkRateLimit(`user:${user.id}`)) {
    return NextResponse.json(
      { error: 'Too many search requests. Please wait a moment before searching again.' },
      { status: 429, headers: { 'Retry-After': '10' } }
    );
  }

  // 3. Query Validation: Allow cybersecurity terms (dashes, quotes, dots, slashes) but clean control chars
  const rawQ = req.nextUrl.searchParams.get('q') || '';
  // Strip control characters
  const q = rawQ.replace(/[\x00-\x1F\x7F]/g, '').trim();

  const limitParam = req.nextUrl.searchParams.get('limit');
  const limit = limitParam ? Math.min(50, Math.max(1, parseInt(limitParam, 10))) : 20;

  if (!q || q.length < 2) {
    const emptyResponse: LibrarySearchResponse = {
      query: q,
      totalMatchingDocuments: 0,
      totalMatchingPages: 0,
      results: [],
    };
    return NextResponse.json(emptyResponse);
  }

  if (q.length > 100) {
    return NextResponse.json(
      { error: 'Query exceeds maximum allowed length of 100 characters.' },
      { status: 400 }
    );
  }

  // 4. Database Search: Call indexed server-authoritative RPC
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Database service unavailable. Please retry later.' },
      { status: 503 }
    );
  }

  try {
    const { data: rpcMatches, error: rpcError } = await (supabase as any).rpc(
      'search_study_page_text',
      {
        p_query: q,
        p_limit: limit,
      }
    );

    if (rpcError) {
      console.error('[study-search] Database RPC search_study_page_text failure:', rpcError);
      
      // Never turn a database failure into an empty 200 response
      const isMissingSchema = 
        rpcError.code === '42883' || // undefined_function
        rpcError.code === '42P01' || // undefined_table
        rpcError.message?.includes('does not exist');

      if (isMissingSchema) {
        return NextResponse.json(
          {
            error: 'Search index is currently uninitialized or unavailable. Please contact the administrator.',
            code: 'INDEX_UNAVAILABLE',
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          error: 'An error occurred while executing the search query. Please retry.',
          code: rpcError.code || 'SEARCH_EXECUTION_ERROR',
        },
        { status: 500 }
      );
    }

    // 5. Group matching rows by document
    const docMap = new Map<string, DocumentSearchResult>();
    let totalPagesCount = 0;

    for (const row of rpcMatches || []) {
      const docId = row.document_id;
      if (!docId) continue;

      let entry = docMap.get(docId);
      if (!entry) {
        entry = {
          documentId: docId,
          title: row.document_title || 'Untitled Document',
          slug: row.document_slug || '',
          categoryId: row.category_id || null,
          pageCount: 0,
          totalMatches: Number(row.total_matches) || 0,
          matchingPages: [],
        };
        docMap.set(docId, entry);
      }

      totalPagesCount += 1;

      // Clean snippet headline: replace StartSel/StopSel or keep safe snippet
      const cleanHeadline = (row.headline || '')
        .replace(/<<\s*/g, '')
        .replace(/\s*>>/g, '')
        .trim();

      if (entry.matchingPages.length < 5) {
        entry.matchingPages.push({
          pageNumber: row.page_number,
          snippet: cleanHeadline || `Match on page ${row.page_number}`,
          matchCount: 1,
        });
      }
    }

    const results = Array.from(docMap.values())
      .sort((a, b) => b.totalMatches - a.totalMatches)
      .slice(0, limit);

    const response: LibrarySearchResponse = {
      query: q,
      totalMatchingDocuments: results.length,
      totalMatchingPages: totalPagesCount,
      results,
    };

    return NextResponse.json(response);
  } catch (err: any) {
    console.error('[study-search] Unexpected exception during study materials search:', err);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred while searching study materials.' },
      { status: 500 }
    );
  }
}
