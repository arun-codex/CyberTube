/**
 * Fail-Closed Storage Environment Guard.
 * Default behavior: DENY.
 *
 * Auto-initialization of storage buckets may only occur when:
 * 1. An explicit override/opt-in flag CYBERTUBE_ENABLE_STORAGE_AUTO_INIT is strictly set to 'true'.
 * 2. AND the runtime environment is explicitly verified as either:
 *    - Local development (NODE_ENV === 'development')
 *    - Vercel preview (VERCEL_ENV === 'preview')
 *
 * It is strictly FORBIDDEN and DENIED for:
 * - Vercel production (VERCEL_ENV === 'production')
 * - Custom or standalone production (NODE_ENV === 'production' without verified preview environment)
 * - Missing or ambiguous environment configurations
 */

export interface StorageEnvConfig {
  NODE_ENV?: string;
  VERCEL_ENV?: string;
  CYBERTUBE_ENABLE_STORAGE_AUTO_INIT?: string;
  [key: string]: string | undefined;
}

export function isBucketAutoInitAllowed(env: StorageEnvConfig = process.env): boolean {
  // 1. Mandatory opt-in guard: default is strictly DENY
  if (env.CYBERTUBE_ENABLE_STORAGE_AUTO_INIT !== 'true') {
    return false;
  }

  // 2. Explicit production reject
  if (env.VERCEL_ENV === 'production') {
    return false;
  }

  if (env.NODE_ENV === 'production' && env.VERCEL_ENV !== 'preview') {
    return false;
  }

  // 3. Explicit verified preview allow
  if (env.VERCEL_ENV === 'preview') {
    return true;
  }

  // 4. Explicit local development allow
  if (env.NODE_ENV === 'development') {
    return true;
  }

  // 5. Fail closed for all missing or unexpected environments
  return false;
}

