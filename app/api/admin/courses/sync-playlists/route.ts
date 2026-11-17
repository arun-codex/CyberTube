import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/supabase/server';
import { createAdminClient, verifyAdminStatus } from '@/lib/supabase/admin';
import { syncAllEnabledPlaylists } from '@/lib/server/youtube-sync';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

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
 * POST /api/admin/courses/sync-playlists
 * Triggers on-demand synchronization of configured YouTube playlists.
 * Strictly restricted to verified Administrators.
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

  const isAdmin = await checkAdmin(user, admin);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Forbidden: Administrator privileges required.' }, { status: 403 });
  }

  try {
    // Strictly rely on standard environment guards in syncAllEnabledPlaylists:
    // Do NOT pass allowPreview or allowProductionWrite overrides so preview deployments
    // and unauthorized standalone environments fail closed against cloud Supabase.
    const result = await syncAllEnabledPlaylists({
      adminClient: admin,
    });

    return NextResponse.json({
      success: result.success,
      result,
    });
  } catch (err: any) {
    console.error('Manual playlist sync failed:', err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Manual playlist sync failed',
      },
      { status: 500 }
    );
  }
}
