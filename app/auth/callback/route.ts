import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/types/database';

/**
 * Validates the `next` redirect parameter to prevent open redirect vulnerabilities.
 * Ensures the target starts with a forward slash `/` and not `//` (protocol-relative).
 */
function getSafeRedirectUrl(nextParam: string | null, baseUrl: string): URL {
  if (nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//')) {
    return new URL(nextParam, baseUrl);
  }
  return new URL('/', baseUrl);
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || requestUrl.searchParams.get('redirect');
  const errorDescription = requestUrl.searchParams.get('error_description');

  const safeRedirectUrl = getSafeRedirectUrl(next, requestUrl.origin);

  // Supabase can reject automatic provider linking when verified provider emails
  // resolve to more than one account. Do not expose the raw provider/Auth error to the
  // browser; send the user to the safe recovery flow instead.
  const authError =
    errorDescription ||
    requestUrl.searchParams.get('error') ||
    requestUrl.searchParams.get('message');

  if (authError) {
    const loginErrorUrl = new URL('/login', requestUrl.origin);
    if (/multiple accounts with the same email address in the same linking domain/i.test(authError)) {
      loginErrorUrl.searchParams.set('reason', 'identity_link_conflict');
    } else {
      loginErrorUrl.searchParams.set('error', authError);
    }
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

    // Exchange failed
    console.error('OAuth code exchange error:', error.message);
    const loginErrorUrl = new URL('/login', requestUrl.origin);
    loginErrorUrl.searchParams.set('error', error.message || 'Failed to exchange authorization code.');
    return NextResponse.redirect(loginErrorUrl);
  }

  // No code and no error provided
  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}

