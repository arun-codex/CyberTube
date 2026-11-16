import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * POST /api/study-bookmarks
 * Body: { documentId: string, pageNumber: number, title?: string }
 * Toggles or saves a bookmark for the authenticated user.
 */
export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Supabase admin unavailable' }, { status: 500 });
  }

  const { documentId, pageNumber, title } = await req.json();
  if (!documentId || typeof pageNumber !== 'number') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // Check if bookmark already exists -> if so, delete it (toggle)
  const { data: existing } = await admin
    .from('user_study_bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('document_id', documentId)
    .eq('page_number', pageNumber)
    .maybeSingle();

  if (existing) {
    await admin
      .from('user_study_bookmarks')
      .delete()
      .eq('id', existing.id);

    return NextResponse.json({ bookmarked: false, message: 'Bookmark removed' });
  } else {
    await admin
      .from('user_study_bookmarks')
      .insert({
        user_id: user.id,
        document_id: documentId,
        page_number: pageNumber,
        title: title || `Page ${pageNumber}`,
      });

    return NextResponse.json({ bookmarked: true, message: 'Bookmark added' });
  }
}
