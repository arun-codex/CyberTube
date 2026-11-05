import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

/**
 * Creates a server-only Supabase admin client using the SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY.
 * This client bypasses Row Level Security (RLS) for privileged background tasks
 * and verified administrative routes.
 *
 * CAUTION: This client must NEVER be called or imported from client components.
 */
export function createAdminClient() {
  if (typeof window !== 'undefined') {
    throw new Error('createAdminClient can only be called on the server.');
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    return null;
  }

  return createClient<Database>(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Verifies if an email address belongs to the server-only administrator allowlist.
 */
export function isAuthorizedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const allowlist = (process.env.CYBERTUBE_ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return allowlist.includes(email.toLowerCase());
}

/**
 * Server-side guard verifying whether the current authenticated user is an administrator.
 */
export async function verifyAdminStatus(userEmail?: string | null): Promise<boolean> {
  return isAuthorizedAdminEmail(userEmail);
}
