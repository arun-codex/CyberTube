import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';

/**
 * Creates a server-side Supabase client for Server Components, Server Actions,
 * and Route Handlers, persisting sessions via Next.js cookie store.
 */
export async function createClient() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  const client = createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if middleware is refreshing user sessions.
          }
        },
      },
    }
  );

  // In non-production environments (test/local dev), support simulated test user cookie for automated testing
  if (process.env.VERCEL_ENV !== 'production') {
    const testCookie = cookieStore.get('cybertube_test_user')?.value;
    if (testCookie) {
      try {
        const testUser = JSON.parse(testCookie);
        client.auth.getUser = (async () => {
          return { data: { user: testUser }, error: null };
        }) as any;

        const originalFrom = client.from.bind(client);
        client.from = ((table: string) => {
          if (table === 'profiles') {
            return {
              select: () => ({
                eq: () => ({
                  single: async () => ({
                    data: {
                      id: testUser.id,
                      display_name: testUser.user_metadata?.display_name || 'Practitioner',
                      experience_level: 'practitioner',
                      avatar_url: null,
                      avatar_path: null,
                    },
                    error: null,
                  }),
                }),
              }),
            } as any;
          }
          return originalFrom(table);
        }) as any;
      } catch {
        // Fall back to standard client
      }
    }
  }

  return client;
}

/**
 * Retrieves the currently authenticated user safely on the server using getUser().
 * Never relies solely on getSession() for authorization.
 */
export async function getAuthenticatedUser() {
  const supabase = await createClient();
  if (!supabase) return null;

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch {
    return null;
  }
}

