# CyberTube — Canonical Production Domain & Google OAuth Remediation Report

**Date:** November 5, 2026  
**Repository:** `arun-codex/CyberTube`  
**Working Branch:** `feature/google-oauth-privacy-remediation`  
**Target Branch:** `main`  
**Pull Request:** [#6 on GitHub](https://github.com/arun-codex/CyberTube/pull/6) (Draft)  
**Status:** Verification Passed • All 32 Tests Passing • Ready for Review  

---

## 1. Executive Summary & Root Cause Analysis

### 1.1 Context
Two critical requirements were addressed in this remediation cycle:
1. **Google OAuth Branding Verification Finding:** Google Trust & Safety returned an **"insufficient-content"** finding regarding the application's published Privacy Policy. The platform required a comprehensive, publicly accessible `/privacy` endpoint disclosing exact Google OAuth scopes (`openid`, `email`, `profile`), affirming compliance with the **Google API Services User Data Policy** (including Limited Use requirements), establishing a public Terms of Service (`/terms`) with rules of engagement for cybersecurity learning, and ensuring all authentication entry points prominently link to both policies.
2. **Canonical Production Domain & OAuth Redirects:** Multiple legacy and staging domains existed (`cybertube-codex-arun.vercel.app`, `cybertube-git-main-codex-arun.vercel.app`). To prevent PKCE code-verifier cookie loss and origin mismatch during OAuth handshakes, the application must enforce **`https://cybertube-mu.vercel.app`** as the single canonical production domain. All Google and GitHub authentication flows must start and finish exclusively on this canonical host.

### 1.2 Summary of Completed Work
- **Canonical Host Enforcement (`middleware.ts`):** Implemented an exact-match allowlist redirect at the very top of middleware (before Supabase client initialization or cookie operations). Legacy hosts permanently redirect via HTTP 308 to `https://cybertube-mu.vercel.app` while preserving paths and query parameters.
- **PKCE Defense-in-Depth (`middleware.ts` & `app/auth/callback/route.ts`):** If a request reaches `/auth/callback` on a legacy domain, it does **not** forward sensitive authorization codes, state, or PKCE parameters across origins. Instead, it redirects directly to `https://cybertube-mu.vercel.app/login?reason=canonical_domain_required`, allowing the user to initiate a clean session on the canonical host.
- **Canonical Callback Construction (`src/lib/canonicalUrl.ts` & `src/components/auth/SocialAuthButtons.tsx`):** Centralized callback URL generation via `getAuthCallbackUrl()`. Both Google and GitHub providers construct identical callbacks using `NEXT_PUBLIC_SITE_URL` (resolving to `https://cybertube-mu.vercel.app/auth/callback?next=...` in production), while preserving current origins in local development and dynamic Vercel Preview deployments.
- **Public Privacy Policy (`app/privacy/page.tsx`):** 14 comprehensive sections detailing exact data practices, database RLS, AWS us-east-1 hosting, private avatar storage, zero ad trackers, and user data rights.
- **Public Terms of Service (`app/terms/page.tsx`):** Clear terms outlining ethical cybersecurity rules of engagement (authorized targets only, virtual machines, legal lab platforms), CFAA compliance, and YouTube creator intellectual property attribution.
- **Automated Regression Suite (`tests/21_canonical_domain_and_oauth_redirects.spec.ts`):** Authored 14 automated tests covering all canonical host redirections, query parameter preservation, PKCE protection, preview domain preservation, and open redirect prevention.

---

## 2. Canonical Domain & Legacy Host Strategy

### 2.1 Single Canonical Host
- **Canonical Host:** `cybertube-mu.vercel.app`
- **Canonical Origin:** `https://cybertube-mu.vercel.app`

### 2.2 Legacy Domains Allowlist
```ts
export const LEGACY_DOMAINS = [
  'cybertube-codex-arun.vercel.app',
  'cybertube-git-main-codex-arun.vercel.app',
] as const;
```
- **Matching Rule:** Exact hostname comparison (port stripped, lowercase). Substring, wildcard, or prefix matching is strictly forbidden to prevent accidental redirection of preview branches or lookalike domains.
- **Localhost Rule:** Local development (`localhost`, `127.0.0.1`, `::1`) is never redirected.
- **Preview Deployments Rule:** Vercel Preview URLs (e.g. `cybertube-git-*.vercel.app`, `cybertube-preview-*.vercel.app`) are dynamic test environments and are not redirected.
- **Untrusted Headers Rule:** Forwarded host headers are never used to compute the redirect destination; the destination is strictly hardcoded to `https://cybertube-mu.vercel.app`.

### 2.3 Special OAuth Callback & PKCE Protection
When an OAuth provider returns a code to `/auth/callback`, the browser must present the corresponding PKCE `code_verifier` cookie that was generated when authentication was initiated.
- If a legacy domain receives a request to `/auth/callback`, forwarding `?code=...` to the canonical domain will trigger a PKCE verification failure because cookies cannot cross domains.
- Furthermore, forwarding authorization codes across origins poses an interception risk.
- **Remediation:** When `/auth/callback` is requested on a legacy domain, both `middleware.ts` and `app/auth/callback/route.ts` immediately strip all query parameters (`code`, `state`, `error`, etc.) and redirect via HTTP 308 to:
  ```
  https://cybertube-mu.vercel.app/login?reason=canonical_domain_required
  ```
  This prompts the user to safely authenticate on the canonical domain where the PKCE cookie is established.

---

## 3. Audit of Actual Application Data Practices

### 3.1 Google OAuth Identity Data & Scope Boundaries
- **Scopes Requested:** `openid`, `email`, `profile` via Supabase Auth.
- **Data Received:**
  - `sub` (Google User ID): Unique alphanumeric string mapped to `auth.users.id`.
  - `email`: User's primary email address.
  - `email_verified`: Google verification status.
  - `name` / `given_name` / `family_name`: Initial display name.
  - `picture`: Google account avatar hosted on `lh3.googleusercontent.com`, stored in `profiles.avatar_url`.
- **Strict Scope Boundaries:**
  - Zero access requested to Gmail, Google Drive, Google Calendar, Google Contacts, YouTube channel management, or restricted Google APIs.
  - Google user data is used solely to authenticate identity and initialize basic profile details. It is never used for advertising, behavioral profiling, or sold to third parties.
  - Compliance: Adheres directly to the **Google API Services User Data Policy**, including Limited Use requirements.

### 3.2 GitHub OAuth Data
- **Scopes Requested:** `read:user`, `user:email`.
- **Data Received:** GitHub numeric user ID, handle, verified email, display name, avatar URL (`avatars.githubusercontent.com`).
- **Use:** Strictly for authentication and profile initialization; no access to private repositories or organizations.

### 3.3 Database Profile Storage (`public.profiles`)
- Auto-provisioned on signup via PostgreSQL trigger `handle_new_user()`.
- **Fields Stored:** `id` (references `auth.users`), `username`, `display_name`, `avatar_url`, `avatar_path`, `bio`, `experience_level`, `preferred_language`, `country_code`, `primary_learning_goal`, `interests`, `created_at`, `updated_at`.
- **Access Control:** Protected by PostgreSQL Row Level Security (RLS). Public read access; strictly authenticated write access (`auth.uid() = id`).

### 3.4 Custom Profile Pictures (Storage Architecture)
- Stored in private Supabase Storage bucket `avatars` (`public = false`).
- Scoped paths: `{user_id}/{random_uuid}.{ext}` (JPEG/PNG/WebP up to 5 MiB).
- Served exclusively via time-limited signed URLs (TTL: 3600 seconds) requested dynamically by authenticated API `GET /api/user/avatar/signed-url`.
- External URLs validated via strict dot-boundary hostname allowlisting (`isSafeHttpsUrl`) to prevent SSRF.

### 3.5 Course Progress & Bookmarks
- `public.user_course_progress` and `public.user_bookmarks` track completed lessons and saved resources.
- RLS isolates all records by `auth.uid() = user_id`.
- Unauthenticated visitors store progress purely in browser `localStorage`.

### 3.6 Cookies & Session Management
- Managed via `@supabase/ssr` cookies (`sb-<project>-auth-token`).
- Configured with `HttpOnly`, `Secure` (in production), and `SameSite=Lax`.
- **Zero Third-Party Trackers:** No marketing pixels, Google Analytics tracking IDs, Facebook beacons, or ad cookies exist in the codebase.

### 3.7 Third-Party Processors & Infrastructure
1. **Supabase, Inc.:** Authentication, PostgreSQL database, and Storage infrastructure (AWS `us-east-1`).
2. **Vercel Inc.:** Edge CDN, serverless function runtime, and DNS routing.
3. **YouTube (Google LLC):** Video hosting for curated lectures, embedded via privacy-conscious click-to-load mechanics without transmitting user account credentials.

### 3.8 Account Deletion & Data Retention
- Self-service avatar deletion via `DELETE /api/user/avatar`.
- Complete account deletion available by contacting `privacy@cybertube.org` or `support@cybertube.local`. Deletion of `auth.users` cascades immediately across `profiles`, `user_course_progress`, and `user_bookmarks`, followed by private storage object purging.

---

## 4. Architectural Implementation Details

### 4.1 Canonical URL Helper Module (`src/lib/canonicalUrl.ts`)
- Exports `CANONICAL_HOST`, `CANONICAL_ORIGIN`, `LEGACY_DOMAINS`, and `LEGACY_DOMAINS_SET`.
- `isLegacyDomain(hostname)`: Exact-match validation.
- `getSiteOrigin()`: Resolves base URL prioritizing `NEXT_PUBLIC_SITE_URL`, checking browser hostname against legacy domains, and falling back to current origin for dev/preview.
- `getAuthCallbackUrl(nextPath)`: Constructs fully qualified callback URL for both Google and GitHub OAuth providers.
- `getSafeRedirectPath(nextParam)`: Prevents open redirects by validating relative path prefixes.

### 4.2 Middleware Canonical Routing (`middleware.ts`)
- Executes before Supabase client instantiation or cookie processing.
- Inspects incoming `Host` header and `nextUrl.hostname`.
- If on a legacy domain:
  - If pathname starts with `/auth/callback`: 308 redirect to `/login?reason=canonical_domain_required`.
  - All other paths: 308 redirect to `https://cybertube-mu.vercel.app` preserving path and query string.
- Localhost and preview deployments pass through to standard routing.

### 4.3 Social Authentication Buttons (`src/components/auth/SocialAuthButtons.tsx`)
- Imports `getAuthCallbackUrl`.
- Computes `callbackUrl = getAuthCallbackUrl(safeRedirect)`.
- Guarantees both Google and GitHub OAuth handshakes initiate with the exact same canonical callback origin.

### 4.4 OAuth Callback Handler (`app/auth/callback/route.ts`)
- Defense-in-depth legacy check: immediately redirects to canonical `/login?reason=canonical_domain_required` if reached directly on a legacy host.
- Exchanges authorization code on the same origin that initiated the request.
- Preserves PKCE code verifier and writes session cookies onto the redirect response.
- Guarantees redirects remain on the exact same origin without cross-origin leaks.

### 4.5 Server Actions & Sitemaps
- `app/actions/auth.ts`: Updated `forgotPasswordAction` and `registerAction` to use `getSiteOrigin()`.
- `app/sitemap.ts`: Configured `baseUrl` fallback to `https://cybertube-mu.vercel.app` and added `/privacy` and `/terms`.
- `.env.example`: Added `NEXT_PUBLIC_SITE_URL` documentation for local (`http://localhost:3000`) and production (`https://cybertube-mu.vercel.app`).

---

## 5. Verification and Quality Gates

### 5.1 Static & Build Quality Gates
| Gate | Command | Result |
|---|---|---|
| **TypeScript Typecheck** | `npx tsc --noEmit` | **Passed (0 errors)** |
| **ESLint Code Quality** | `npm run lint` | **Passed (0 errors)** |
| **Catalog & Route Tests** | `npm test` | **Passed (8/8 catalog, 7/7 HTTP routes)** |
| **Next.js Production Build** | `npm run build` | **Passed (Static SSG for `/privacy`, `/terms`, `/sitemap.xml`)** |

### 5.2 Playwright Test Execution Summary (32 Tests Passing)
Executed full auth, security, privacy, and canonical suite:
```
Running 32 tests using 1 worker

  ok  1 [chromium] › tests\07_social_oauth.spec.ts › Login page renders Google and GitHub OAuth buttons (2.9s)
  ok  2 [chromium] › tests\07_social_oauth.spec.ts › Register page renders Google and GitHub OAuth buttons (1.2s)
  ok  3 [chromium] › tests\07_social_oauth.spec.ts › Mobile responsive viewports render stacked touch targets (697ms)
  ok  4 [chromium] › tests\07_social_oauth.spec.ts › Auth callback safely redirects to /login when no code supplied (1.2s)
  ok  5 [chromium] › tests\07_social_oauth.spec.ts › Auth callback handles error_description parameter (1.0s)
  ok  6 [chromium] › tests\07_social_oauth.spec.ts › Prevent external open redirect via unsafe next parameter (1.7s)
  ok  7 [chromium] › tests\07_social_oauth.spec.ts › OAuth buttons show connecting states during initiation (1.1s)
  ok  8 [chromium] › tests\07_social_oauth.spec.ts › Simulated PKCE session cookies permit access to /account (554ms)
  ok  9 [chromium] › tests\07_social_oauth.spec.ts › Live GitHub OAuth redirect URL handshake (1.5s)
  ok 10 [chromium] › tests\07_social_oauth.spec.ts › Live Google OAuth redirect URL handshake (843ms)
  ok 11 [chromium] › tests\11_security_and_integrity.spec.ts › Protected routes enforce authentication redirect (1.1s)
  ok 12 [chromium] › tests\11_security_and_integrity.spec.ts › Public routes allow anonymous access without credentials (20.1s)
  ok 13 [chromium] › tests\11_security_and_integrity.spec.ts › Avatar API rejects unauthenticated mutation attempts (28ms)
  ok 14 [chromium] › tests\11_security_and_integrity.spec.ts › OAuth callback route safely handles invalid authorization code (498ms)
  ok 15 [chromium] › tests\20_privacy_and_terms.spec.ts › Public access to /privacy without authentication (668ms)
  ok 16 [chromium] › tests\20_privacy_and_terms.spec.ts › Public access to /terms without authentication (665ms)
  ok 17 [chromium] › tests\20_privacy_and_terms.spec.ts › Footer contains accessible links to Privacy Policy and Terms of Service (911ms)
  ok 18 [chromium] › tests\20_privacy_and_terms.spec.ts › Login and registration pages link to terms and privacy (868ms)
  ok 19 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › Canonical domain constants match exact specifications (3ms)
  ok 20 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › isLegacyDomain performs exact matching (5ms)
  ok 21 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › 1. Google OAuth callback URL uses cybertube-mu.vercel.app in production (1ms)
  ok 22 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › 2. GitHub OAuth callback URL uses cybertube-mu.vercel.app in production (1ms)
  ok 23 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › 3. Legacy host root redirects to canonical with HTTP 308 (8ms)
  ok 24 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › 4. Legacy host /login redirects to canonical with HTTP 308 (2ms)
  ok 25 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › 5. Legacy host /courses redirects to canonical with HTTP 308 (1ms)
  ok 26 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › 6. Normal query parameters survive legacy redirects (2ms)
  ok 27 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › 7. Legacy /auth/callback never forwards an OAuth code to another domain (4ms)
  ok 28 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › 8. Canonical /auth/callback handles responses on same origin without cross-origin leaks (2ms)
  ok 29 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › 9. Localhost is not redirected by middleware (2ms)
  ok 30 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › 10. Vercel Preview URLs are not redirected by middleware (2ms)
  ok 31 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › 11. Relative next paths remain safe (2ms)
  ok 32 [chromium] › tests\21_canonical_domain_and_oauth_redirects.spec.ts › 12. External redirect attempts are rejected (4ms)

  32 passed (45.0s)
```

---

## 6. Dashboard & Production Configuration Checklist

The following settings must be verified in external dashboards:

### 6.1 Vercel Project Settings
| Setting | Recommended Value | Reason |
|---|---|---|
| **Environment Variable:** `NEXT_PUBLIC_SITE_URL` | `https://cybertube-mu.vercel.app` | Enforces production canonical base for OAuth callbacks, sitemaps, and password reset links. |
| **Domains:** Primary Domain | `cybertube-mu.vercel.app` | Production traffic destination. |
| **Domains:** Redirects | `cybertube-codex-arun.vercel.app` → `cybertube-mu.vercel.app` | DNS/Edge level redirection (mirrored by application middleware). |

### 6.2 Supabase Dashboard Authentication Settings
| Setting | Recommended Value | Reason |
|---|---|---|
| **Site URL** | `https://cybertube-mu.vercel.app` | Default base redirect for auth emails and magic links. |
| **Redirect URLs (Allowlist)** | `https://cybertube-mu.vercel.app/**`<br>`http://localhost:3000/**` | Allows OAuth and PKCE redirects on production canonical and local development. |
| **Google Provider Callback** | `https://iwcbuvutqhwxgovkecfa.supabase.co/auth/v1/callback` | Standard Supabase OAuth callback URL configured in Google Cloud Console. |
| **GitHub Provider Callback** | `https://iwcbuvutqhwxgovkecfa.supabase.co/auth/v1/callback` | Standard Supabase OAuth callback URL configured in GitHub Developer Settings. |

### 6.3 Google Cloud Console (OAuth Client & Branding)
| Setting | Value |
|---|---|
| **Application Home Page** | `https://cybertube-mu.vercel.app` |
| **Privacy Policy URL** | `https://cybertube-mu.vercel.app/privacy` |
| **Terms of Service URL** | `https://cybertube-mu.vercel.app/terms` |
| **Authorized JavaScript Origins** | `https://cybertube-mu.vercel.app`<br>`https://iwcbuvutqhwxgovkecfa.supabase.co` |
| **Authorized Redirect URIs** | `https://iwcbuvutqhwxgovkecfa.supabase.co/auth/v1/callback` |

---

## 7. Git & Pull Request Tracking

- **Branch:** `feature/google-oauth-privacy-remediation`
- **Draft PR:** [GitHub PR #6](https://github.com/arun-codex/CyberTube/pull/6)
- **Base Branch:** `main`
- **Safety Status:** Open, Draft, Unmerged. No production deployment triggered. No database schema or storage policies modified.
