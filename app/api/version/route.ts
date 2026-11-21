import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Public, read-only release marker. No API keys, repository tokens, or private
 * runtime configuration are ever returned. Missing build metadata stays null
 * rather than presenting request time as the build time.
 */
export async function GET() {
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_COMMIT_SHA || null;
  const buildTimestamp = process.env.BUILD_TIMESTAMP || null;

  return NextResponse.json({
    application: 'CyberTube',
    commitSha,
    buildTimestamp,
    deploymentEnvironment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
  }, {
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
