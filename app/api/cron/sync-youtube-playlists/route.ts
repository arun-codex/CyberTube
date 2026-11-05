import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { syncAllEnabledPlaylists } from '@/lib/server/youtube-sync';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 seconds allowed on Vercel Hobby

/**
 * Daily Vercel Cron handler for synchronizing enabled YouTube playlists.
 * Requires Bearer token matching CRON_SECRET.
 * Supports non-sensitive readiness inspection via ?check=readiness.
 */
export async function GET(request: NextRequest) {
  // Safe readiness check (does not leak secret values)
  if (request.nextUrl.searchParams.get('check') === 'readiness') {
    const isCronConfigured = Boolean(process.env.CRON_SECRET);
    const isYouTubeConfigured = Boolean(process.env.YOUTUBE_API_KEY);
    const isSupabaseConfigured = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL);

    return NextResponse.json({
      ready: isCronConfigured && isYouTubeConfigured && isSupabaseConfigured,
      cronConfigured: isCronConfigured,
      youtubeConfigured: isYouTubeConfigured,
      supabaseConfigured: isSupabaseConfigured,
    });
  }

  const expectedSecret = process.env.CRON_SECRET;

  // 1. Validate Cron Secret Configuration
  if (!expectedSecret) {
    return NextResponse.json(
      {
        success: false,
        error: 'CRON_SECRET is not configured on this server environment.',
      },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get('authorization');

  // 2. Validate Authorization Header presence
  if (!authHeader) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized: Missing authorization credentials.',
      },
      { status: 401 }
    );
  }

  // 3. Validate Bearer Token
  const expectedHeader = `Bearer ${expectedSecret}`;
  if (authHeader !== expectedHeader) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized: Invalid authorization credentials.',
      },
      { status: 401 }
    );
  }

  // 4. Execute Synchronization
  try {
    const result = await syncAllEnabledPlaylists();

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          environment: result.environment,
          error: result.error,
        },
        { status: result.error?.includes('disabled on Vercel Preview') ? 403 : 500 }
      );
    }

    // Invalidate course pages cache so newly synced lessons appear on next request
    try {
      revalidatePath('/courses');
      revalidatePath('/courses/[slug]', 'page');
    } catch (revalErr) {
      console.warn('[cron/sync-youtube-playlists] Cache revalidation warning:', revalErr);
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      environment: result.environment,
      sourcesCount: result.stats?.length || 0,
      stats: result.stats,
    });
  } catch (error: any) {
    console.error('[cron/sync-youtube-playlists] Uncaught error during playlist sync:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error during playlist sync.',
      },
      { status: 500 }
    );
  }
}
