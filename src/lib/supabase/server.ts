import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';
import { verifyAndParseTestUserCookie } from '@/lib/testAuthGuard';

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

  // In strictly authorized local test environments, allow verified test user simulation.
  // Never allowed on any Vercel deployment (Production or Preview).
  const testCookie = cookieStore.get('cybertube_test_user')?.value;
  if (testCookie) {
    const testUser = await verifyAndParseTestUserCookie(testCookie);
    if (testUser) {
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
    }
  }

  return client;
}

let testAuthenticatedUser: any = null;

export function setAuthenticatedUserForTesting(user: any) {
  testAuthenticatedUser = user;
}

/**
 * Retrieves the currently authenticated user safely on the server using getUser().
 * Never relies solely on getSession() for authorization.
 */
export async function getAuthenticatedUser() {
  if (testAuthenticatedUser !== null) {
    return testAuthenticatedUser;
  }
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

