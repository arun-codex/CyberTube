# CyberTube Phase 2: Authentication Specification

---

## 1. Authentication Strategy

CyberTube implements password-based authentication via Supabase Auth, integrated with Next.js 14 App Router through `@supabase/ssr`.

### Supported Routes
- `/login`: Form for sign-in with email and password, handling error feedback and post-login redirection.
- `/register`: Registration flow with display name, email, password validation (min 8 chars), and confirmation check.
- `/forgot-password`: Password reset request handler dispatching secure recovery links.
- `/reset-password`: Form for establishing a new password from an authenticated recovery session.
- `/account`: Protected profile management and learning preferences dashboard.

---

## 2. Session Handling & SSR Cookies

1. **Cookie Synchronization**:
   - `src/lib/supabase/client.ts`: Uses `createBrowserClient` with standard cookies.
   - `src/lib/supabase/server.ts`: Uses `createServerClient` reading and writing directly to Next.js `cookies()`.
   - `middleware.ts`: Intercepts all requests (excluding static assets), calls `auth.getUser()`, refreshes expiring JWTs, and updates response headers.
2. **Server Identity Verification**:
   - Server Actions and Server Components verify identity with `auth.getUser()`.
   - `getSession()` is never used alone as an authorization check because token payloads can be spoofed or expired without re-verifying with the auth server.
3. **Graceful Fallback Mode**:
   - When running in an unconfigured environment (no `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`), all public browsing routes (`/`, `/discover`, `/domains`, `/resources/[slug]`, `/saved`) continue functioning without error.
   - Protected routes (`/account`, `/admin`) redirect cleanly to `/login` with an informational banner.

