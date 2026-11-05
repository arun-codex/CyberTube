import { test, expect } from '@playwright/test';
import { NextRequest } from 'next/server';
import { middleware } from '../middleware';
import {
  CANONICAL_HOST,
  CANONICAL_ORIGIN,
  LEGACY_DOMAINS,
  isLegacyDomain,
  getSafeRedirectPath,
  getAuthCallbackUrl,
  getSiteOrigin,
} from '../src/lib/canonicalUrl';
import { GET as authCallbackGet } from '../app/auth/callback/route';

test.describe('Canonical Production Domain & OAuth Redirect Certification', () => {
  // ---------------------------------------------------------------------------
  // 1. CANONICAL & LEGACY HOST AUDIT
  // ---------------------------------------------------------------------------

  test('Canonical domain constants match exact production specifications', () => {
    expect(CANONICAL_HOST).toBe('cybertube-mu.vercel.app');
    expect(CANONICAL_ORIGIN).toBe('https://cybertube-mu.vercel.app');
    expect(LEGACY_DOMAINS).toContain('cybertube-codex-arun.vercel.app');
    expect(LEGACY_DOMAINS).toContain('cybertube-git-main-codex-arun.vercel.app');
  });

  test('isLegacyDomain performs exact matching and rejects preview or lookalike domains', () => {
    // Exact legacy matches
    expect(isLegacyDomain('cybertube-codex-arun.vercel.app')).toBe(true);
    expect(isLegacyDomain('cybertube-git-main-codex-arun.vercel.app')).toBe(true);
    expect(isLegacyDomain('CYBERTUBE-CODEX-ARUN.VERCEL.APP')).toBe(true);
    expect(isLegacyDomain('cybertube-codex-arun.vercel.app:443')).toBe(true);

    // Localhost & local addresses must never match
    expect(isLegacyDomain('localhost')).toBe(false);
    expect(isLegacyDomain('localhost:3000')).toBe(false);
    expect(isLegacyDomain('127.0.0.1')).toBe(false);

    // Vercel Preview deployments must never match
    expect(isLegacyDomain('cybertube-git-feature-preview-codex-arun.vercel.app')).toBe(false);
    expect(isLegacyDomain('cybertube-preview-dcaa245.vercel.app')).toBe(false);
    expect(isLegacyDomain('cybertube-mu.vercel.app')).toBe(false); // Already canonical

    // Attacker lookalike and substring domains must never match
    expect(isLegacyDomain('cybertube-codex-arun.vercel.app.attacker.com')).toBe(false);
    expect(isLegacyDomain('attacker-cybertube-codex-arun.vercel.app')).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // 2. PRODUCTION OAUTH CALLBACK URL GENERATION
  // ---------------------------------------------------------------------------

  test('1. Google OAuth callback URL uses cybertube-mu.vercel.app in production', () => {
    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
    try {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://cybertube-mu.vercel.app';
      const callbackUrl = getAuthCallbackUrl('/account');
      expect(callbackUrl).toBe('https://cybertube-mu.vercel.app/auth/callback?next=%2Faccount');
    } finally {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    }
  });

  test('2. GitHub OAuth callback URL uses cybertube-mu.vercel.app in production', () => {
    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
    try {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://cybertube-mu.vercel.app';
      const callbackUrl = getAuthCallbackUrl('/courses');
      expect(callbackUrl).toBe('https://cybertube-mu.vercel.app/auth/callback?next=%2Fcourses');
    } finally {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    }
  });

  // ---------------------------------------------------------------------------
  // 3. MIDDLEWARE CANONICAL REDIRECTION TESTS
  // ---------------------------------------------------------------------------

  test('3. Legacy host root redirects to canonical with HTTP 308', async () => {
    const req1 = new NextRequest('http://cybertube-codex-arun.vercel.app/', {
      headers: { host: 'cybertube-codex-arun.vercel.app' },
    });
    const res1 = await middleware(req1);
    expect(res1.status).toBe(308);
    expect(res1.headers.get('location')).toBe('https://cybertube-mu.vercel.app/');

    const req2 = new NextRequest('http://cybertube-git-main-codex-arun.vercel.app/', {
      headers: { host: 'cybertube-git-main-codex-arun.vercel.app' },
    });
    const res2 = await middleware(req2);
    expect(res2.status).toBe(308);
    expect(res2.headers.get('location')).toBe('https://cybertube-mu.vercel.app/');
  });

  test('4. Legacy host /login redirects to canonical with HTTP 308', async () => {
    const req = new NextRequest('http://cybertube-codex-arun.vercel.app/login', {
      headers: { host: 'cybertube-codex-arun.vercel.app' },
    });
    const res = await middleware(req);
    expect(res.status).toBe(308);
    expect(res.headers.get('location')).toBe('https://cybertube-mu.vercel.app/login');
  });

  test('5. Legacy host /courses redirects to canonical with HTTP 308', async () => {
    const req = new NextRequest('http://cybertube-git-main-codex-arun.vercel.app/courses', {
      headers: { host: 'cybertube-git-main-codex-arun.vercel.app' },
    });
    const res = await middleware(req);
    expect(res.status).toBe(308);
    expect(res.headers.get('location')).toBe('https://cybertube-mu.vercel.app/courses');
  });

  test('6. Normal query parameters survive legacy redirects', async () => {
    const req = new NextRequest('http://cybertube-codex-arun.vercel.app/discover?domain=network-security&format=hands-on-lab', {
      headers: { host: 'cybertube-codex-arun.vercel.app' },
    });
    const res = await middleware(req);
    expect(res.status).toBe(308);
    expect(res.headers.get('location')).toBe(
      'https://cybertube-mu.vercel.app/discover?domain=network-security&format=hands-on-lab'
    );
  });

  // ---------------------------------------------------------------------------
  // 4. SPECIAL OAUTH CALLBACK HANDLING & PKCE PROTECTION
  // ---------------------------------------------------------------------------

  test('7. Legacy /auth/callback never forwards an OAuth code to another domain', async () => {
    // 7A: In Middleware
    const reqMiddleware = new NextRequest(
      'http://cybertube-codex-arun.vercel.app/auth/callback?code=sensitive_code_secret_xyz&state=state123&next=%2Faccount',
      {
        headers: { host: 'cybertube-codex-arun.vercel.app' },
      }
    );
    const resMiddleware = await middleware(reqMiddleware);
    expect(resMiddleware.status).toBe(308);

    const redirectLocation = resMiddleware.headers.get('location');
    expect(redirectLocation).toBe('https://cybertube-mu.vercel.app/login?reason=canonical_domain_required');
    // Critical security check: code and state must NOT be forwarded across domains
    expect(redirectLocation).not.toContain('sensitive_code_secret_xyz');
    expect(redirectLocation).not.toContain('state123');

    // 7B: In Callback Route Handler (Defense-in-depth)
    const reqRoute = new NextRequest(
      'http://cybertube-codex-arun.vercel.app/auth/callback?code=sensitive_code_secret_xyz&state=state123',
      {
        headers: { host: 'cybertube-codex-arun.vercel.app' },
      }
    );
    const resRoute = await authCallbackGet(reqRoute);
    expect(resRoute.status).toBe(308);
    expect(resRoute.headers.get('location')).toBe('https://cybertube-mu.vercel.app/login?reason=canonical_domain_required');
  });

  test('8. Canonical /auth/callback handles responses on the same origin without cross-origin leaks', async () => {
    // When no code is supplied, redirects to /login on the same request origin
    const req = new NextRequest('https://cybertube-mu.vercel.app/auth/callback', {
      headers: { host: 'cybertube-mu.vercel.app' },
    });
    const res = await authCallbackGet(req);
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('https://cybertube-mu.vercel.app/login');
  });

  // ---------------------------------------------------------------------------
  // 5. LOCALHOST & PREVIEW DOMAIN PRESERVATION
  // ---------------------------------------------------------------------------

  test('9. Localhost is not redirected by middleware', async () => {
    const req = new NextRequest('http://localhost:3000/courses', {
      headers: { host: 'localhost:3000' },
    });
    const res = await middleware(req);
    // Not a 308 redirect; continues to Next.js route handling
    expect(res.status).not.toBe(308);
    expect(res.headers.get('location')).toBeNull();
  });

  test('10. Vercel Preview URLs are not redirected by middleware', async () => {
    const previewHost = 'cybertube-git-preview-fix-codex-arun.vercel.app';
    const req = new NextRequest(`https://${previewHost}/library`, {
      headers: { host: previewHost },
    });
    const res = await middleware(req);
    // Preview URL must remain accessible without being forced to canonical production
    expect(res.status).not.toBe(308);
    expect(res.headers.get('location')).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // 6. REDIRECT VALIDATION & OPEN REDIRECT PREVENTION
  // ---------------------------------------------------------------------------

  test('11. Relative next paths remain safe', () => {
    expect(getSafeRedirectPath('/account')).toBe('/account');
    expect(getSafeRedirectPath('/courses/intro')).toBe('/courses/intro');
    expect(getSafeRedirectPath('/')).toBe('/');
    expect(getSafeRedirectPath('/library?filter=hands-on')).toBe('/library?filter=hands-on');
  });

  test('12. External redirect attempts are rejected', async () => {
    // Protocol-relative attempt
    expect(getSafeRedirectPath('//attacker.example.com', '/fallback')).toBe('/fallback');
    // Fully-qualified external attempt
    expect(getSafeRedirectPath('https://attacker.example.com', '/fallback')).toBe('/fallback');
    // JavaScript protocol
    expect(getSafeRedirectPath('javascript:alert(1)', '/fallback')).toBe('/fallback');
    // Empty or null
    expect(getSafeRedirectPath('', '/fallback')).toBe('/fallback');
    expect(getSafeRedirectPath(null, '/fallback')).toBe('/fallback');

    // Test in auth callback route
    const req = new NextRequest('https://cybertube-mu.vercel.app/auth/callback?error_description=Access+denied&next=https://attacker.com', {
      headers: { host: 'cybertube-mu.vercel.app' },
    });
    const res = await authCallbackGet(req);
    const location = res.headers.get('location');
    expect(location).toContain('https://cybertube-mu.vercel.app/login?error=Access+denied');
    expect(location).not.toContain('attacker.com');
  });
});
