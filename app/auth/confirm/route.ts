import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/types/database';
import { CANONICAL_ORIGIN, isLegacyDomain, getSafeRedirectPath } from '@/lib/canonicalUrl';
import type { EmailOtpType } from '@supabase/supabase-js';

function getSafeRedirectUrl(nextParam: string | null, baseUrl: string): URL {
  const safePath = getSafeRedirectPath(nextParam, '/reset-password');
  return new URL(safePath, baseUrl);
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  if (isLegacyDomain(requestUrl.hostname)) {
    const canonicalLoginUrl = new URL('/login?reason=canonical_domain_required', CANONICAL_ORIGIN);
    return NextResponse.redirect(canonicalLoginUrl, 308);
  }
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null;
  const next = requestUrl.searchParams.get('next') || requestUrl.searchParams.get('redirect') || '/reset-password';
  const errorDescription = requestUrl.searchParams.get('error_description');
  const errorCode = requestUrl.searchParams.get('error_code');

  const safeRedirectUrl = getSafeRedirectUrl(next, requestUrl.origin);
  const isPasswordRecovery = safeRedirectUrl.pathname === '/reset-password' || type === 'recovery';

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
    loginErrorUrl.searchParams.set('error', authError || 'Authentication failed.');
    return NextResponse.redirect(loginErrorUrl);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (isPasswordRecovery) {
      const resetErrorUrl = new URL('/reset-password', requestUrl.origin);
      resetErrorUrl.searchParams.set('error', 'Supabase credentials are not configured on the server.');
      return NextResponse.redirect(resetErrorUrl);
    }
    const loginErrorUrl = new URL('/login', requestUrl.origin);
    loginErrorUrl.searchParams.set('error', 'Supabase credentials are not configured on the server.');
    return NextResponse.redirect(loginErrorUrl);
  }

  let response = NextResponse.redirect(safeRedirectUrl);

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

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

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

    console.error('[auth/confirm] OTP verify error:', error.message);
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
    loginErrorUrl.searchParams.set('error', error.message);
    return NextResponse.redirect(loginErrorUrl);
  }

  const code = requestUrl.searchParams.get('code');
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
    loginErrorUrl.searchParams.set('error', error.message);
    return NextResponse.redirect(loginErrorUrl);
  }

  if (isPasswordRecovery) {
    return NextResponse.redirect(
      new URL('/reset-password?error_code=invalid_token', requestUrl.origin)
    );
  }
  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}
