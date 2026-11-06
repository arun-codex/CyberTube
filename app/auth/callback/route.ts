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
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next') || requestUrl.searchParams.get('redirect');
  const errorDescription = requestUrl.searchParams.get('error_description');
  const errorCode = requestUrl.searchParams.get('error_code');

  // Ensure redirect stays on the exact same origin that processed the callback
  const safeRedirectUrl = getSafeRedirectUrl(next, requestUrl.origin);
  const isPasswordRecovery = safeRedirectUrl.pathname === '/reset-password' || type === 'recovery';

  // Supabase error handling
  const authError =
    errorDescription ||
    requestUrl.searchParams.get('error') ||
    requestUrl.searchParams.get('message');

  if (authError || errorCode) {
    if (isPasswordRecovery) {
      const resetErrorUrl = new URL('/reset-password', requestUrl.origin);
      resetErrorUrl.searchParams.set('error_code', errorCode || 'otp_expired');
      resetErrorUrl.searchParams.set(
        'error',
        authError || 'This password reset link has expired or has already been used.'
      );
      return NextResponse.redirect(resetErrorUrl);
    }

    const loginErrorUrl = new URL('/login', requestUrl.origin);
    if (
      /multiple accounts with the same email address in the same linking domain/i.test(
        authError || ''
      )
    ) {
      loginErrorUrl.searchParams.set('reason', 'identity_link_conflict');
    } else {
      loginErrorUrl.searchParams.set('error', authError || 'Authentication failed.');
    }
    return NextResponse.redirect(loginErrorUrl);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (isPasswordRecovery) {
      const resetErrorUrl = new URL('/reset-password', requestUrl.origin);
      resetErrorUrl.searchParams.set(
        'error',
        'Supabase credentials are not configured on the server.'
      );
      return NextResponse.redirect(resetErrorUrl);
    }
    const loginErrorUrl = new URL('/login', requestUrl.origin);
    loginErrorUrl.searchParams.set('error', 'Supabase credentials are not configured on the server.');
    return NextResponse.redirect(loginErrorUrl);
  }

  let response = NextResponse.redirect(safeRedirectUrl);

  // Initialize Supabase SSR client:
  // 1. Reads PKCE code_verifier cookie directly from incoming request cookies.
  // 2. Exchanges OAuth/recovery code or token hash on the exact same origin.
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

  // 1. Handle token_hash verification (Token-Hash recovery flow)
  if (token_hash) {
    const { error: otpError } = await supabase.auth.verifyOtp({
      type: (type as any) || 'recovery',
      token_hash,
    });

    if (!otpError) {
      if (isPasswordRecovery) {
        response.cookies.set('cybertube_recovery_session', '1', {
          path: '/',
          httpOnly: false,
          maxAge: 600,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });
      }
      return response;
    }

    console.error('[auth/callback] OTP verify error:', otpError.message);
    if (isPasswordRecovery) {
      const resetErrorUrl = new URL('/reset-password', requestUrl.origin);
      resetErrorUrl.searchParams.set('error_code', 'otp_expired');
      resetErrorUrl.searchParams.set(
        'error',
        otpError.message || 'This password reset link has expired or has already been used.'
      );
      return NextResponse.redirect(resetErrorUrl);
    }
    const loginErrorUrl = new URL('/login', requestUrl.origin);
    loginErrorUrl.searchParams.set('error', otpError.message);
    return NextResponse.redirect(loginErrorUrl);
  }

  // 2. Handle PKCE authorization code exchange
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      if (isPasswordRecovery) {
        response.cookies.set('cybertube_recovery_session', '1', {
          path: '/',
          httpOnly: false,
          maxAge: 600,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });
      }
      return response;
    }

    // Exchange failed (e.g. invalid/expired code or verifier mismatch)
    console.error('[auth/callback] Code exchange error:', error.message);
    if (isPasswordRecovery) {
      const resetErrorUrl = new URL('/reset-password', requestUrl.origin);
      resetErrorUrl.searchParams.set('error_code', 'otp_expired');
      resetErrorUrl.searchParams.set(
        'error',
        error.message || 'This password reset link has expired or has already been used.'
      );
      return NextResponse.redirect(resetErrorUrl);
    }

    const loginErrorUrl = new URL('/login', requestUrl.origin);
    loginErrorUrl.searchParams.set(
      'error',
      error.message || 'Failed to exchange authorization code.'
    );
    return NextResponse.redirect(loginErrorUrl);
  }

  // No code, no token_hash, and no error provided
  if (isPasswordRecovery) {
    return NextResponse.redirect(
      new URL('/reset-password?error_code=invalid_token', requestUrl.origin)
    );
  }
  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}
