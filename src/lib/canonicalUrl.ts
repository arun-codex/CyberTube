/**
 * Canonical URL and Hostname Configuration for CyberTube.
 *
 * Single Canonical Production Origin: https://cybertube-mu.vercel.app
 * Both Google and GitHub OAuth authentication flows must start and finish on this domain.
 */

export const CANONICAL_HOST = 'cybertube-mu.vercel.app';
export const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

/**
 * Legacy production hostnames that must be permanently redirected to CANONICAL_ORIGIN.
 * Strict exact matching only (never substring, prefix, or wildcard matching).
 */
export const LEGACY_DOMAINS = [
  'cybertube-codex-arun.vercel.app',
  'cybertube-git-main-codex-arun.vercel.app',
] as const;

export const LEGACY_DOMAINS_SET: ReadonlySet<string> = new Set<string>(LEGACY_DOMAINS);

/**
 * Validates whether a hostname is an exact match for one of the legacy production domains.
 * Strips port numbers if present, converts to lowercase, and compares against the exact set.
 */
export function isLegacyDomain(hostname: string | null | undefined): boolean {
  if (!hostname) return false;
  const cleanHost = hostname.split(':')[0].trim().toLowerCase();
  return LEGACY_DOMAINS_SET.has(cleanHost);
}

/**
 * Validates a redirect parameter to ensure it is a safe relative pathname.
 * Prevents open redirects by rejecting protocol-relative URLs (`//`) and external URLs.
 */
export function getSafeRedirectPath(nextParam: string | null | undefined, defaultFallback = '/account'): string {
  if (nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//')) {
    return nextParam;
  }
  return defaultFallback;
}

/**
 * Resolves the appropriate base origin for authentication callbacks and canonical routing.
 *
 * Rules:
 * 1. If NEXT_PUBLIC_SITE_URL is explicitly configured (e.g. in production Vercel to https://cybertube-mu.vercel.app),
 *    validates and returns its origin.
 * 2. If running in a browser:
 *    a. If current hostname matches a legacy domain, enforces CANONICAL_ORIGIN.
 *    b. For local development (localhost / 127.0.0.1) or Vercel Preview deployments,
 *       preserves window.location.origin.
 * 3. Server fallback: CANONICAL_ORIGIN in production, or localhost in development.
 */
export function getSiteOrigin(): string {
  // 1. Check configured NEXT_PUBLIC_SITE_URL
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredSiteUrl) {
    try {
      const parsed = new URL(configuredSiteUrl);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return parsed.origin;
      }
    } catch {
      // Invalid format; fall through to contextual detection
    }
  }

  // 2. Client-side browser runtime check
  if (typeof window !== 'undefined' && window.location) {
    const currentHostname = window.location.hostname.toLowerCase();

    // If request reached client on a legacy domain, override with canonical production origin
    if (isLegacyDomain(currentHostname)) {
      return CANONICAL_ORIGIN;
    }

    // Preserve local development origin (localhost, 127.0.0.1) or dynamic Vercel Preview URLs
    return window.location.origin;
  }

  // 3. Server-side environment fallback
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return 'http://localhost:3000';
  }

  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return CANONICAL_ORIGIN;
}

/**
 * Constructs the canonical OAuth callback URL with a validated relative destination.
 *
 * Both Google and GitHub OAuth providers must call this function so that they use
 * the exact same callback origin and path.
 */
export function getAuthCallbackUrl(nextPath = '/account'): string {
  const baseOrigin = getSiteOrigin();
  const safeNext = getSafeRedirectPath(nextPath, '/account');
  return `${baseOrigin}/auth/callback?next=${encodeURIComponent(safeNext)}`;
}
