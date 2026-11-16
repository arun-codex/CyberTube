import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * POST /api/study-progress
 * Body: { documentId: string, page: number }
 * Updates user progress: last_page, highest_page, completion_percent, is_completed.
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
  if (!documentId || typeof page !== 'number') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // Record page view (idempotent)
  await admin.from('user_study_page_views').upsert(
    {
      user_id: user.id,
      document_id: documentId,
      page_number: page,
      viewed_at: new Date().toISOString(),
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
      .single()
      .catch(() => ({ data: null })),
    admin
      .from('study_documents')
      .select('page_count')
      .eq('id', documentId)
      .single(),
  ]);

  if (!doc) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  const pageCount = doc.page_count || 0;
  const highest = prog ? Math.max(prog.highest_page, page) : page;
  const last = page;
  const completion = pageCount ? (highest / pageCount) * 100 : 0;
  const isCompleted = pageCount > 0 && highest >= pageCount;

  const upsertData = {
    user_id: user.id,
    document_id: documentId,
    last_page: last,
    highest_page: highest,
    completion_percent: Number(completion.toFixed(2)),
    is_completed: isCompleted,
    revision: prog ? prog.revision + 1 : 0,
    updated_at: new Date().toISOString(),
    created_at: prog ? prog.created_at : new Date().toISOString(),
  };

  const { error: upsertErr } = await admin
    .from('user_study_progress')
    .upsert(upsertData, { onConflict: 'user_id,document_id' });

  if (upsertErr) {
    return NextResponse.json({ error: 'Failed to save progress', details: upsertErr.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Progress saved', progress: upsertData });
}
