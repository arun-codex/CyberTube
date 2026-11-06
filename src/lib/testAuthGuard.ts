/**
 * Fail-Closed Test Auth Guard for Local Playwright Testing.
 * Default behavior: DENY.
 *
 * Test user simulation for Server Components and Middleware may ONLY occur when ALL conditions are met:
 * 1. An explicit opt-in environment variable CYBERTUBE_ENABLE_TEST_AUTH is strictly set to 'true'.
 * 2. An explicit test authentication secret CYBERTUBE_TEST_AUTH_SECRET is provided (NO default/fallback secret).
 * 3. The deployment is NOT running on any Vercel environment:
 *    - VERCEL is NOT '1'
 *    - VERCEL_ENV is undefined / empty (strictly forbids 'production', 'preview', and 'development' on Vercel)
 * 4. The cookie includes a valid HMAC-SHA256 signature matching the local test secret.
 *
 * It is strictly FORBIDDEN and DENIED for:
 * - Vercel Production (VERCEL_ENV === 'production')
 * - Vercel Preview (VERCEL_ENV === 'preview')
 * - Any Vercel deployment (VERCEL === '1')
 * - Standard production builds (NODE_ENV === 'production' without CYBERTUBE_ENABLE_TEST_AUTH === 'true')
 * - Missing CYBERTUBE_TEST_AUTH_SECRET (fails closed)
 * - Missing or ambiguous environment configurations
 */

export interface TestAuthEnvConfig {
  VERCEL?: string;
  VERCEL_ENV?: string;
  NODE_ENV?: string;
  CYBERTUBE_ENABLE_TEST_AUTH?: string;
  CYBERTUBE_TEST_AUTH_SECRET?: string;
  [key: string]: string | undefined;
}

export function isTestAuthSimulationAllowed(env: TestAuthEnvConfig = process.env): boolean {
  // 1. Mandatory opt-in guard: default is strictly DENY
  if (env.CYBERTUBE_ENABLE_TEST_AUTH !== 'true') {
    return false;
  }

  // 2. Mandatory secret guard: missing or empty secret must FAIL CLOSED (no fallback)
  if (!env.CYBERTUBE_TEST_AUTH_SECRET || env.CYBERTUBE_TEST_AUTH_SECRET.trim().length === 0) {
    return false;
  }

  // 3. Strict rejection of ANY Vercel deployment (Production, Preview, or Vercel dev)
  if (env.VERCEL === '1' || Boolean(env.VERCEL_ENV)) {
    return false;
  }

  // 4. Reject if VERCEL_ENV is any known string
  if (
    env.VERCEL_ENV === 'production' ||
    env.VERCEL_ENV === 'preview' ||
    env.VERCEL_ENV === 'development'
  ) {
    return false;
  }

  return true;
}

/**
 * Computes an HMAC-SHA256 signature using standard Web Crypto API (supported in Node & Edge).
 */
async function computeHmacSha256(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const cryptoObj = typeof crypto !== 'undefined' ? crypto : (globalThis as any).crypto;
  const key = await cryptoObj.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await cryptoObj.subtle.sign('HMAC', key, encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Constant-time string equality check.
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Signs a test user payload with HMAC-SHA256 for local test integrity.
 * Requires an explicit secret; throws if secret is missing or empty.
 */
export async function signTestUserPayload(
  payload: any,
  secret: string = process.env.CYBERTUBE_TEST_AUTH_SECRET || ''
): Promise<string> {
  if (!secret || secret.trim().length === 0) {
    throw new Error('CYBERTUBE_TEST_AUTH_SECRET must be explicitly provided; fail-closed.');
  }
  const json = JSON.stringify(payload);
  const signature = await computeHmacSha256(json, secret.trim());
  return JSON.stringify({ payload, signature });
}

/**
 * Verifies and parses a signed test user cookie value.
 * Returns null if test auth is not allowed, secret is missing, or signature is invalid.
 */
export async function verifyAndParseTestUserCookie(
  cookieValue: string | undefined | null,
  env: TestAuthEnvConfig = process.env
): Promise<any | null> {
  if (!cookieValue) return null;

  // Fail closed if not strictly in authorized local test environment
  if (!isTestAuthSimulationAllowed(env)) {
    return null;
  }

  const secret = env.CYBERTUBE_TEST_AUTH_SECRET?.trim();
  if (!secret) return null;

  try {
    const parsed = JSON.parse(cookieValue);
    if (!parsed || typeof parsed !== 'object') return null;

    // Check signed wrapper
    if (parsed.payload && typeof parsed.signature === 'string') {
      const expectedSig = await computeHmacSha256(JSON.stringify(parsed.payload), secret);

      if (!constantTimeEqual(parsed.signature, expectedSig)) {
        return null;
      }
      return parsed.payload;
    }

    // Direct JSON without signature is strictly rejected
    return null;
  } catch {
    return null;
  }
}
