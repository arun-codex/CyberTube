import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/types/database';
import { CANONICAL_ORIGIN, isLegacyDomain, getSafeRedirectPath } from '@/lib/canonicalUrl';

/**
 * Validates the `next` redirect parameter to prevent open redirect vulnerabilities.
 * Ensures the target starts with a single forward slash `/` and not `//` (protocol-relative).
 */
function getSafeRedirectUrl(nextParam: string | null, baseUrl: string): URL {
  const safePath = getSafeRedirectPath(nextParam, '/');
  return new URL(safePath, baseUrl);
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  // Defense-in-Depth: If an old-domain request reaches /auth/callback directly,
  // do NOT forward authorization codes, state, or PKCE parameters across origins.
  // Instead, redirect to /login?reason=canonical_domain_required on the canonical host.
  if (isLegacyDomain(requestUrl.hostname)) {
    const canonicalLoginUrl = new URL('/login?reason=canonical_domain_required', CANONICAL_ORIGIN);
    return NextResponse.redirect(canonicalLoginUrl, 308);
  }

  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || requestUrl.searchParams.get('redirect');
  const errorDescription = requestUrl.searchParams.get('error_description');

  // Ensure redirect stays on the exact same origin that processed the callback
  const safeRedirectUrl = getSafeRedirectUrl(next, requestUrl.origin);

  // If OAuth provider returned an error query param directly
  if (errorDescription) {
    const loginErrorUrl = new URL('/login', requestUrl.origin);
    loginErrorUrl.searchParams.set('error', errorDescription);
    return NextResponse.redirect(loginErrorUrl);
  }

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      const loginErrorUrl = new URL('/login', requestUrl.origin);
      loginErrorUrl.searchParams.set('error', 'Supabase credentials are not configured on the server.');
      return NextResponse.redirect(loginErrorUrl);
    }

    let response = NextResponse.redirect(safeRedirectUrl);

    // Initialize Supabase SSR client:
    // 1. Reads PKCE code_verifier cookie directly from incoming request cookies.
    // 2. Exchanges OAuth code on the exact same origin.
    // 3. Writes established session cookies onto the redirect response preserving options.
    const supabase = createServerClient<Database>(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.redirect(safeRedirectUrl);
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return response;
    }

    // Exchange failed (e.g. invalid/expired code or verifier mismatch)
    console.error('OAuth code exchange error:', error.message);
    const loginErrorUrl = new URL('/login', requestUrl.origin);
    loginErrorUrl.searchParams.set('error', error.message || 'Failed to exchange authorization code.');
    return NextResponse.redirect(loginErrorUrl);
  }

  // No code and no error provided
  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}
