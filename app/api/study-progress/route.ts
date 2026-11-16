import { checkStudyDocument } from '@/lib/pdf/access';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * GET /api/study-progress?documentId=xyz
 * Retrieves user's progress and bookmarks for a specific document.
 */
export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const documentId = req.nextUrl.searchParams.get('documentId');
  if (!documentId) {
    return NextResponse.json({ error: 'Missing documentId' }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Supabase admin unavailable' }, { status: 500 });
  }

  const accessError = await checkStudyDocument(admin, documentId);
  if (accessError) return accessError;

  const [{ data: progress }, { data: bookmarks }, { data: pageViews }] = await Promise.all([
    admin
      .from('user_study_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('document_id', documentId)
      .maybeSingle(),
    admin
      .from('user_study_bookmarks')
      .select('page_number, title, created_at')
      .eq('user_id', user.id)
      .eq('document_id', documentId)
      .order('page_number', { ascending: true }),
    admin
      .from('user_study_page_views')
      .select('page_number')
      .eq('user_id', user.id)
      .eq('document_id', documentId),
  ]);

  return NextResponse.json({
    progress: progress || null,
    bookmarks: bookmarks || [],
    viewedPages: (pageViews || []).map((pv: { page_number: number }) => pv.page_number),
  });
}

/**
 * POST /api/study-progress
 * Body: { documentId: string, page: number }
 * Updates user progress: last_page, highest_page, completion_percent, is_completed, last_read_at.
 */
export async function POST(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Supabase admin client unavailable' }, { status: 500 });
  }

  const payload = await req.json().catch(() => null);
  const { documentId, page } = payload || {};
  if (!documentId || typeof page !== 'number' || page < 1) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const accessError = await checkStudyDocument(admin, documentId, page);
  if (accessError) return accessError;

  const { data: progress, error } = await admin.rpc('save_study_progress', {
    reader_id: user.id, doc_id: documentId, page,
  });
  if (error) return NextResponse.json({ error: 'Failed to save progress' }, { status: error.code === 'P0002' ? 404 : 500 });
  return NextResponse.json({ message: 'Progress saved', progress });
}
