import { NextRequest, NextResponse } from 'next/server';
import { createClient, getAuthenticatedUser } from '@/lib/supabase/server';
import roadmap from '@/data/tryhackme-roadmap.json';

export const dynamic = 'force-dynamic';

const prefix = 'tryhackme:';
const freeRoomIds = new Set(
  roadmap.sections.flatMap(section => section.rooms)
    .filter(room => !('accessNote' in room && room.accessNote))
    .map(room => room.id),
);

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'private, no-store' },
  });
}

async function authenticatedDb() {
  // The cookie-backed SSR client uses the request's user JWT, never a service-role key.
  const user = await getAuthenticatedUser();
  if (!user) return null;
  const db = await createClient();
  if (!db) return null;
  return { db, user };
}

async function readProgress(db: NonNullable<Awaited<ReturnType<typeof createClient>>>, userId: string) {
  const { data, error } = await (db.from('user_generic_progress') as any)
    .select('entity_id,is_completed')
    .eq('user_id', userId)
    .eq('entity_type', 'lab')
    .like('entity_id', prefix + '%')
    .limit(1000);

  if (error) throw error;
  const knownIds: string[] = [];
  const completedIds: string[] = [];
  for (const row of data || []) {
    const roomId = String(row.entity_id).slice(prefix.length);
    if (!freeRoomIds.has(roomId)) continue;
    knownIds.push(roomId);
    if (row.is_completed === true) completedIds.push(roomId);
  }
  return { knownIds, completedIds };
}

export async function GET() {
  const session = await authenticatedDb();
  if (!session) return json({ error: 'Sign in to sync your lab progress.' }, 401);
  try {
    return json({ userId: session.user.id, ...await readProgress(session.db, session.user.id) });
  } catch {
    return json({ error: 'Unable to load server progress. Please retry.' }, 503);
  }
}

export async function POST(req: NextRequest) {
  const session = await authenticatedDb();
  if (!session) return json({ error: 'Sign in to sync your lab progress.' }, 401);

  const payload = await req.json().catch(() => null);
  const roomId: unknown = payload?.roomId;
  const completed: unknown = payload?.completed;
  if (typeof roomId !== 'string' || !freeRoomIds.has(roomId) || typeof completed !== 'boolean') {
    return json({ error: 'Invalid or unavailable TryHackMe free lab.' }, 400);
  }

  try {
    const now = new Date().toISOString();
    const { error } = await (session.db.from('user_generic_progress') as any)
      .upsert({
        user_id: session.user.id,
        entity_type: 'lab',
        entity_id: prefix + roomId,
        progress_percent: completed ? 100 : 0,
        is_completed: completed,
        completed_at: completed ? now : null,
        updated_at: now,
        state_data: { provider: 'tryhackme', selfReported: true },
      }, { onConflict: 'user_id,entity_type,entity_id' });
    if (error) throw error;
    return json({ userId: session.user.id, roomId, completed, saved: true });
  } catch {
    return json({ error: 'Unable to save completion. Your previous value is unchanged.' }, 503);
  }
}

/**
 * One-time import of pre-existing local/browser checkmarks. This only INSERTS
 * missing room records; existing server rows (including explicitly unchecked
 * rooms) are never overwritten. Intended to preserve earlier local progress.
 */
export async function PUT(req: NextRequest) {
  const session = await authenticatedDb();
  if (!session) return json({ error: 'Sign in to migrate browser progress.' }, 401);
  const payload = await req.json().catch(() => null);
  const ids: unknown = payload?.completedIds;

  if (!Array.isArray(ids) || ids.length > 500 ||
      ids.some(id => typeof id !== 'string' || !freeRoomIds.has(id))) {
    return json({ error: 'Invalid import list.' }, 400);
  }
  try {
    const unique = [...new Set(ids as string[])];
    if (unique.length) {
      const now = new Date().toISOString();
      const { error } = await (session.db.from('user_generic_progress') as any)
        .upsert(unique.map(roomId => ({
          user_id: session.user.id,
          entity_type: 'lab',
          entity_id: prefix + roomId,
          progress_percent: 100,
          is_completed: true,
          completed_at: now,
          updated_at: now,
          state_data: { provider: 'tryhackme', importedFromBrowser: true, selfReported: true },
        })), {
          onConflict: 'user_id,entity_type,entity_id',
          ignoreDuplicates: true,
        });
      if (error) throw error;
    }
    return json({ userId: session.user.id, ...await readProgress(session.db, session.user.id) });
  } catch {
    return json({ error: 'Unable to import browser progress. Your local copy is untouched.' }, 503);
  }
}
