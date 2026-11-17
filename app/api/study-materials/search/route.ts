import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, createClient } from '@/lib/supabase/server';
import { LibrarySearchResponse, createSnippet } from '@/lib/pdf/library-search';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // 1. Strict Authentication Guard: Unauthenticated access is denied
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized: Authentication required to search study materials.' },
      { status: 401 }
    );
  }

  // 2. Query Validation
  const q = (req.nextUrl.searchParams.get('q') || '').trim();
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

  // 3. Database Search: Query Supabase using authenticated user's session
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Database service unavailable' },
      { status: 503 }
    );
  }

  try {
    // Check if study_document_page_text exists and search it
    // Only published and non-retired documents are returned via inner join or filter
    const { data: pageMatches, error: searchError } = await (supabase as any)
      .from('study_document_page_text')
      .select('page_number, page_text, study_documents!inner(id, title, slug, category_id, page_count, is_published, retired_at)')
      .ilike('page_text', `%${q}%`)
      .eq('study_documents.is_published', true)
      .is('study_documents.retired_at', null)
      .limit(200);

    if (searchError) {
      // Table may not exist yet on database or zero records
      return NextResponse.json({
        query: q,
        totalMatchingDocuments: 0,
        totalMatchingPages: 0,
        results: [],
      });
    }

    // Group matching pages by document
    const docMap = new Map<string, {
      documentId: string;
      title: string;
      slug: string;
      categoryId: string | null;
      pageCount: number;
      totalMatches: number;
      matchingPages: Array<{ pageNumber: number; snippet: string; matchCount: number }>;
    }>();

    let totalPagesCount = 0;

    for (const row of pageMatches || []) {
      const doc = row.study_documents;
      if (!doc) continue;

      let entry = docMap.get(doc.id);
      if (!entry) {
        entry = {
          documentId: doc.id,
          title: doc.title,
          slug: doc.slug,
          categoryId: doc.category_id || null,
          pageCount: doc.page_count || 0,
          totalMatches: 0,
          matchingPages: [],
        };
        docMap.set(doc.id, entry);
      }

      entry.totalMatches += 1;
      totalPagesCount += 1;

      if (entry.matchingPages.length < 5) {
        entry.matchingPages.push({
          pageNumber: row.page_number,
          snippet: createSnippet(row.page_text, q),
          matchCount: 1,
        });
      }
    }

    const results = Array.from(docMap.values())
      .sort((a, b) => b.totalMatches - a.totalMatches)
      .slice(0, limit);

    return NextResponse.json({
      query: q,
      totalMatchingDocuments: results.length,
      totalMatchingPages: totalPagesCount,
      results,
    });
  } catch (err: any) {
    console.error('Error executing study materials search:', err);
    return NextResponse.json(
      { error: 'An error occurred while searching study materials.' },
      { status: 500 }
    );
  }
}
