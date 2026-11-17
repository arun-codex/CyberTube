import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, createClient } from '@/lib/supabase/server';
import { checkStudyDocument } from '@/lib/pdf/access';

export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store' };
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers });
const validId = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0 && value.length <= 250;

export async function GET(_req: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return json({ authenticated: false, savedIds: [], studyBookmarks: [] });
    const db = await createClient();
    if (!db) return json({ error: 'Database service unavailable' }, 503);
    // Use the user's session so database RLS remains an independent boundary.
    const [resources, study] = await Promise.all([
      (db as any).from('bookmarks').select('resource_id').eq('user_id', user.id),
      (db as any).from('user_study_bookmarks').select('id, document_id, page_number, title, created_at')
        .eq('user_id', user.id).order('created_at', { ascending: false }),
    ]);
    if (resources.error || study.error) return json({ error: 'Unable to load saved items. Please retry.' }, 503);
    return json({ authenticated: true, userId: user.id,
      savedIds: (resources.data || []).map((b: any) => b.resource_id), studyBookmarks: study.data || [] });
  } catch {
    return json({ error: 'Unable to load saved items. Please retry.' }, 503);
  }
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin');
    if (origin && origin !== new URL(req.url).origin) return json({ error: 'Invalid origin' }, 403);
    const user = await getAuthenticatedUser();
    if (!user) return json({ error: 'Authentication required to sync bookmarks to cloud' }, 401);
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') return json({ error: 'Invalid request' }, 400);
    // An offline operation must never be replayed into a different account.
    if (body.userId !== user.id) return json({ error: 'Account changed. Refresh before syncing.' }, 409);
    const { action, resourceId } = body;
    if (!['save', 'remove'].includes(action) || !validId(resourceId)) {
      return json({ error: 'Expected save or remove with a valid resourceId' }, 400);
    }
    const db = await createClient();
    if (!db) return json({ error: 'Database service unavailable' }, 503);
    // Explicit desired state is retry-safe; a toggle would invert state on retry.
    if (resourceId.startsWith('study:')) {
      const parts = resourceId.split(':');
      const documentId = parts[1];
      const page = Number(parts[2]);
      if (parts.length !== 3 || !/^[0-9a-f-]{36}$/i.test(documentId) || !Number.isInteger(page) || page < 1) {
        return json({ error: 'Invalid PDF bookmark' }, 400);
      }
      if (action === 'save') {
        const denied = await checkStudyDocument(db, documentId, page);
        if (denied) return denied;
      }
      const result = action === 'save'
        ? await (db as any).from('user_study_bookmarks').upsert({ user_id: user.id, document_id: documentId, page_number: page },
            { onConflict: 'user_id,document_id,page_number', ignoreDuplicates: true })
        : await (db as any).from('user_study_bookmarks').delete().eq('user_id', user.id)
            .eq('document_id', documentId).eq('page_number', page);
      if (result.error) return json({ error: 'Unable to save PDF bookmark. Please retry.' }, 503);
      return json({ ok: true, userId: user.id, saved: action === 'save' });
    }
    const result = action === 'save'
      ? await (db as any).from('bookmarks').upsert({ user_id: user.id, resource_id: resourceId },
          { onConflict: 'user_id,resource_id', ignoreDuplicates: true })
      : await (db as any).from('bookmarks').delete().eq('user_id', user.id).eq('resource_id', resourceId);
    if (result.error) return json({ error: 'Unable to save changes. They remain pending on this device.' }, 503);
    return json({ ok: true, userId: user.id, saved: action === 'save' });
  } catch {
    return json({ error: 'Unable to save changes. Please retry.' }, 503);
  }
}
