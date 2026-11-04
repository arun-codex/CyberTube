import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database';

/**
 * Creates a client-side Supabase client using browser cookies.
 * Uses NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
 * Returns null if Supabase environment variables are unconfigured.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}

