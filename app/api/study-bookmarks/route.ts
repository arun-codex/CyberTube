import { checkStudyDocument } from '@/lib/pdf/access';
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

  const payload = await req.json().catch(() => null);
  const { documentId, pageNumber, title } = payload || {};
  if (!documentId || typeof pageNumber !== 'number') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const accessError = await checkStudyDocument(admin, documentId, pageNumber);
  if (accessError) return accessError;

  const { data: bookmarked, error } = await admin.rpc('toggle_study_bookmark', {
    reader_id: user.id, doc_id: documentId, page: pageNumber,
    bookmark_title: typeof title === 'string' ? title.slice(0, 500) : null,
  });
  if (error) return NextResponse.json({ error: 'Bookmark save failed' }, { status: error.code === 'P0002' ? 404 : 500 });
  return NextResponse.json({ bookmarked });
}
