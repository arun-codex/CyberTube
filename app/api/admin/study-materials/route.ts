import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient, verifyAdminStatus } from '@/lib/supabase/admin';

async function checkAdmin(user: any, admin: any) {
  const isAllowlisted = await verifyAdminStatus(user.email);
  if (isAllowlisted) return true;

  const { data: adminRow } = await admin
    .from('admin_users')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  return !!adminRow;
}

/**
 * GET /api/admin/study-materials
 * List all study documents (including unpublished) and all categories.
 */
export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Supabase admin unavailable' }, { status: 500 });
  }

  if (!(await checkAdmin(user, admin))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const [{ data: documents }, { data: categories }] = await Promise.all([
    admin
      .from('study_documents')
      .select('*, study_categories(title, slug)')
      .order('created_at', { ascending: false }),
    admin
      .from('study_categories')
      .select('*')
      .order('sort_order', { ascending: true }),
  ]);

  return NextResponse.json({ documents: documents || [], categories: categories || [] });
}

/**
 * PATCH /api/admin/study-materials
 * Body: { id: string, is_published?: boolean, title?: string, category_id?: string }
 */
export async function PATCH(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Supabase admin unavailable' }, { status: 500 });
  }

  if (!(await checkAdmin(user, admin))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
  }

  const { data, error } = await admin
    .from('study_documents')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ document: data });
}

/**
 * DELETE /api/admin/study-materials?id=xyz
 */
export async function DELETE(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Supabase admin unavailable' }, { status: 500 });
  }

  if (!(await checkAdmin(user, admin))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
  }

  // Get storage key
  const { data: doc } = await admin
    .from('study_documents')
    .select('storage_key')
    .eq('id', id)
    .maybeSingle();

  if (doc?.storage_key) {
    await admin.storage.from('original-pdfs').remove([doc.storage_key]);
  }

  const { error } = await admin.from('study_documents').delete().eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Document deleted successfully' });
}
