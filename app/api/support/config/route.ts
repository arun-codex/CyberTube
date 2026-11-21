import { NextResponse } from 'next/server';
import { getPublicChaiConfig } from '@/lib/chaikit/server-config';

export const dynamic = 'force-dynamic';

/**
 * Public, no-store support configuration.
 * Do not include API keys, banking credentials, or unapproved recipient details.
 * Never rely on NEXT_PUBLIC build-time toggles for a financial activation gate.
 */
export async function GET() {
  const config = getPublicChaiConfig();
  return NextResponse.json(config, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
