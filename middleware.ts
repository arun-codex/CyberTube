import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { Database } from '@/types/database';
import { CANONICAL_ORIGIN, isLegacyDomain } from '@/lib/canonicalUrl';

export async function middleware(request: NextRequest) {
  // ---------------------------------------------------------------------------
  // 0. Canonical Production Host Enforcement (Legacy Domain Redirection)
  // ---------------------------------------------------------------------------
  // Detect incoming hostname (port stripped, lowercase)
  const hostHeader = request.headers.get('host') || request.nextUrl.host || '';
  const incomingHost = hostHeader.split(':')[0].trim().toLowerCase();
  const nextHost = request.nextUrl.hostname.trim().toLowerCase();

  if (isLegacyDomain(incomingHost) || isLegacyDomain(nextHost)) {
    const pathname = request.nextUrl.pathname;

    // Special OAuth callback handling:
    // If an old-domain request reaches /auth/callback, do not forward its authorization code,
    // state, error, or PKCE-related parameters to the canonical host.
    // Instead redirect to /login?reason=canonical_domain_required so the user safely restarts
    // authentication directly on the canonical host with the proper PKCE code verifier cookie.
    if (pathname === '/auth/callback' || pathname.startsWith('/auth/callback/')) {
      const canonicalLoginUrl = new URL('/login?reason=canonical_domain_required', CANONICAL_ORIGIN);
      return NextResponse.redirect(canonicalLoginUrl, 308);
    }

    // Preserve original pathname and ordinary search query parameters on canonical destination
    const targetUrl = new URL(`${pathname}${request.nextUrl.search}`, CANONICAL_ORIGIN);
    return NextResponse.redirect(targetUrl, 308);
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase credentials are not configured, allow public navigation without breaking
  if (!supabaseUrl || !supabaseKey) {
    // Only protect /admin routes if credentials or simulated access is required
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith('/admin') || pathname.startsWith('/account') || pathname.startsWith('/profile')) {
      // In offline / unconfigured mode, redirect to /login with notification
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('redirect', pathname);
      loginUrl.searchParams.set('reason', 'auth_required');
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

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
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh auth session
  let user: any = null;

  // In non-production environments (test/local dev), support simulated test user cookie for automated testing
  if (process.env.VERCEL_ENV !== 'production') {
    const testCookie = request.cookies.get('cybertube_test_user')?.value;
    if (testCookie) {
      try {
        user = JSON.parse(testCookie);
      } catch {
        user = null;
      }
    }
  }

  if (!user) {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  }

  const pathname = request.nextUrl.pathname;

  // 1. Protected User Routes (/account, /profile, /account/collections, etc.)
  if (pathname.startsWith('/account') || pathname.startsWith('/profile')) {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Protected Admin Routes (/admin, /admin/...)
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check admin allowlist
    const adminEmails = (process.env.CYBERTUBE_ADMIN_EMAILS || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    const userEmail = user.email?.toLowerCase();
    if (!userEmail || !adminEmails.includes(userEmail)) {
      // Unauthorized user accessing admin dashboard
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = '/';
      homeUrl.searchParams.set('error', 'unauthorized_admin');
      return NextResponse.redirect(homeUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
