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

  const { documentId, page } = await req.json();
  if (!documentId || typeof page !== 'number' || page < 1) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const nowIso = new Date().toISOString();

  // Record page view (idempotent)
  await admin.from('user_study_page_views').upsert(
    {
      user_id: user.id,
      document_id: documentId,
      page_number: page,
      viewed_at: nowIso,
    },
    { onConflict: 'user_id,document_id,page_number' }
  );

  // Fetch current progress row (if any) and document page count
  const [{ data: prog }, { data: doc }] = await Promise.all([
    admin
      .from('user_study_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('document_id', documentId)
      .maybeSingle(),
    admin
      .from('study_documents')
      .select('page_count')
      .eq('id', documentId)
      .maybeSingle(),
  ]);

  const pageCount = doc?.page_count || 1;
  const highest = prog ? Math.max(prog.highest_page, page) : page;
  const last = page;
  const completion = Math.min(100, Number(((highest / pageCount) * 100).toFixed(2)));
  const isCompleted = pageCount > 0 && highest >= pageCount;

  const upsertData = {
    user_id: user.id,
    document_id: documentId,
    last_page: last,
    highest_page: highest,
    completion_percent: completion,
    is_completed: isCompleted,
    last_read_at: nowIso,
    revision: prog ? prog.revision + 1 : 0,
    updated_at: nowIso,
    created_at: prog ? prog.created_at : nowIso,
  };

  const { error: upsertErr } = await admin
    .from('user_study_progress')
    .upsert(upsertData, { onConflict: 'user_id,document_id' });

  if (upsertErr) {
    return NextResponse.json({ error: 'Failed to save progress', details: upsertErr.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Progress saved', progress: upsertData });
}
