import { NextRequest, NextResponse } from 'next/server';
import { syncAllEnabledPlaylists } from '@/lib/server/youtube-sync';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 seconds allowed on Vercel Hobby

/**
 * Daily Vercel Cron handler for synchronizing enabled YouTube playlists.
 * Requires Bearer token matching CRON_SECRET.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization') || '';
  const expectedSecret = process.env.CRON_SECRET;

  // 1. Validate Cron Secret
  if (!expectedSecret) {
    return NextResponse.json(
      {
        success: false,
        error: 'CRON_SECRET is not configured on this server environment.',
      },
      { status: 500 }
    );
  }

  const expectedHeader = `Bearer ${expectedSecret}`;
  if (authHeader !== expectedHeader) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized: Invalid or missing authorization credentials.',
      },
      { status: 401 }
    );
  }

  // 2. Execute Synchronization
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
