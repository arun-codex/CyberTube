import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const buildSha =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
    process.env.GIT_COMMIT_SHA ||
    'local';

  return NextResponse.json(
    {
      name: 'CyberTube',
      version: '1.0.0',
      buildSha,
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
      deployedAt: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    }
  );
}
