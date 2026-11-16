import { NextResponse } from 'next/server';

/** Service clients bypass RLS, so every reader mutation must check the catalog. */
export async function checkStudyDocument(admin: any, documentId: string, page?: number) {
  const { data: doc, error } = await admin.from('study_documents')
    .select('page_count,is_published,retired_at').eq('id', documentId).maybeSingle();
  if (error) return NextResponse.json({ error: 'Document lookup failed' }, { status: 500 });
  if (!doc?.is_published || doc.retired_at) return NextResponse.json({ error: 'Document unavailable' }, { status: 404 });
  if (page !== undefined && (!Number.isInteger(page) || page < 1 || page > doc.page_count)) {
    return NextResponse.json({ error: 'Invalid page number' }, { status: 400 });
  }
  return null;
}
