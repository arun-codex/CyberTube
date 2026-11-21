import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Public operational metadata only. Does not expose secrets, user data,
 * provider keys, or the server's full environment variable set.
 * Build metadata must be injected by a trusted build step; if absent it
 * remains null rather than mislabeling request time as build time.
 */
export function GET() {
  const rawSha =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.CYBERTUBE_GIT_SHA ||
    process.env.GIT_COMMIT_SHA ||
    '';
  const sha = /^[a-f0-9]{40}$/i.test(rawSha) ? rawSha : null;
  const timestamp =
    process.env.CYBERTUBE_BUILD_TIMESTAMP ||
    process.env.BUILD_TIMESTAMP ||
    '';
  const buildTimestamp =
    timestamp && !Number.isNaN(Date.parse(timestamp))
      ? new Date(timestamp).toISOString()
      : null;
  const deploymentEnvironment =
    process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown';

  return NextResponse.json(
    {
      application: 'CyberTube',
      commitSha: sha,
      gitCommitSha: sha,
      buildTimestamp,
      deploymentEnvironment,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff',
      },
    },
  );
}
