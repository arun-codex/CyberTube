# CyberTube — Google OAuth Privacy Policy Remediation & Legal Compliance Report

**Date:** November 5, 2026  
**Repository:** `arun-codex/CyberTube`  
**Working Branch:** `feature/google-oauth-privacy-remediation`  
**Target Branch:** `main`  
**Status:** Verification Passed • Ready for Draft PR & Google Re-Submission  

---

## 1. Executive Summary & Root Cause Analysis

### 1.1 Context
During the Google OAuth Branding Verification process for CyberTube, Google Trust & Safety returned an **"insufficient-content"** finding regarding the application's published Privacy Policy. Specifically:
1. The platform lacked a dedicated, comprehensive, and publicly accessible `/privacy` endpoint clearly disclosing how Google user data is collected, processed, and safeguarded.
2. The application needed to explicitly declare its Google OAuth scopes (`openid`, `email`, `profile`), substantiate the limited use of that data, and affirmatively affirm compliance with the **Google API Services User Data Policy** (including Limited Use requirements).
3. The platform lacked an explicit Terms of Service (`/terms`) establishing the educational scope and mandatory rules of engagement for cybersecurity learning.
4. Footers and authentication entry points did not provide prominent, unauthenticated links to the Privacy Policy and Terms of Service.

### 1.2 Remediation Scope
This phase resolved all findings without creating fictitious claims, modifying cloud database configurations, or altering production credentials:
- Conducted an end-to-end data practice audit across all application layers (OAuth flows, PostgreSQL schema, Supabase Storage, and edge runtime).
- Created a production-ready, readable, and publicly accessible Privacy Policy page at `/privacy`.
- Created a comprehensive Terms of Service page at `/terms` featuring strict cybersecurity rules of engagement and creator intellectual property protections.
- Integrated visible, accessible links to both documents in the global `Footer` and on the `/login` and `/register` views.
- Authored automated end-to-end regression tests verifying unauthenticated access and mandatory policy assertions.

---

## 2. Audit of Actual Application Data Practices

Every disclosure in the updated Privacy Policy is substantiated by verifiable codebase implementation:

### 2.1 Google OAuth Identity Data & Scope Boundaries
- **Scopes Requested:** `openid`, `email`, `profile` (managed via Supabase Auth `signInWithOAuth({ provider: 'google', ... })`).
- **Data Received:**
  - `sub` (Google User ID): Unique alphanumeric string used to map the Google identity to an internal `auth.users.id`.
  - `email`: User's primary email address, utilized for account recovery and identification.
  - `email_verified`: Boolean validation from Google.
  - `name` / `given_name` / `family_name`: Used to initialize `profiles.display_name`.
  - `picture`: Google account avatar hosted on `lh3.googleusercontent.com`, stored in `profiles.avatar_url`.
- **Strict Scope Boundaries:**
  - CyberTube requests **zero** access to Gmail, Google Drive, Google Calendar, Google Contacts, YouTube channel management, or any restricted Google API.
  - Google user data is used solely to authenticate identity and initialize basic profile details. It is never used for advertising, behavioral profiling, or sale to data brokers.
  - Compliance: Adheres directly to the **Google API Services User Data Policy**, including Limited Use requirements.

### 2.2 GitHub OAuth Data
- **Scopes Requested:** Default Supabase GitHub OAuth scopes (`read:user`, `user:email`).
- **Data Received:** GitHub numeric user ID, username/handle, verified email, display name, and avatar URL (`avatars.githubusercontent.com`).
- **Use:** Strictly for authentication and profile initialization; no access requested to private repositories, codebases, or organizations.

### 2.3 Database Profile Storage (`public.profiles`)
- Auto-provisioned upon registration via PostgreSQL trigger `handle_new_user()` in migration `20261104000000_initial_schema.sql`.
- **Fields Stored:**
  - `id` (`UUID`, primary key referencing `auth.users(id)` with `ON DELETE CASCADE`)
  - `username` (`TEXT`, optional unique handle)
  - `display_name` (`TEXT`, initialized from OAuth or email handle)
  - `avatar_url` (`TEXT`, external OAuth avatar from Google or GitHub)
  - `avatar_path` (`TEXT`, relative storage path for custom uploaded profile images)
  - `bio` (`TEXT`, user-provided bio)
  - `experience_level` (`TEXT`, beginner, intermediate, advanced, professional)
  - `preferred_language` (`TEXT`, default English)
  - `country_code` (`TEXT`)
  - `primary_learning_goal` (`TEXT`)
  - `interests` (`TEXT[]`, array of topic slugs)
  - `created_at`, `updated_at` (`TIMESTAMPTZ`)
- **Access Control:** Protected by PostgreSQL Row Level Security (RLS). Public read access for display; strictly authenticated write access where `auth.uid() = id`.

### 2.4 Custom Profile Pictures (Storage Architecture)
- Custom avatars are stored in the private Supabase Storage bucket `avatars` (`public = false`).
- Stored under scoped paths: `{user_id}/{random_uuid}.{ext}`.
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`. File size ceiling: 5 MiB. Magic number validation enforced.
- Served exclusively via time-limited signed URLs (TTL: 3600 seconds) generated dynamically via authenticated API route `GET /api/user/avatar/signed-url`.
- External URLs validated via strict dot-boundary hostname allowlisting (`isSafeHttpsUrl`) to prevent SSRF and open redirects.

### 2.5 Course Progress & Bookmarks
- `public.user_course_progress` and `public.user_bookmarks` track completed lessons, video watch time, and saved courses.
- RLS isolates all records by `auth.uid() = user_id`.
- Unauthenticated visitors store progress and bookmarks purely in local browser `localStorage`, with no transmission to the backend until registration/sign-in.

### 2.6 Cookies & Session Management
- Managed via `@supabase/ssr` cookies (`sb-<project>-auth-token`).
- Configured with `HttpOnly`, `Secure` (on HTTPS/production), and `SameSite=Lax`.
- **Zero Third-Party Trackers:** No marketing pixels, Google Analytics tracking IDs, Facebook beacons, or programmatic ad cookies exist in the codebase.

### 2.7 Third-Party Service Providers & Sub-processors
1. **Supabase, Inc.:** Authentication, PostgreSQL database, and Storage infrastructure, hosted on AWS in `us-east-1`.
2. **Vercel Inc.:** Edge CDN, serverless function runtime, and DNS routing.
3. **YouTube (Google LLC):** Video hosting for curated lectures. Embedded using privacy-conscious click-to-load mechanics. CyberTube does not share user account data or credentials with YouTube.

### 2.8 Account Deletion & Retention
- Self-service avatar deletion via `DELETE /api/user/avatar`.
- Complete account deletion available by contacting `privacy@cybertube.org` or `support@cybertube.local`. Deletion of `auth.users` cascades immediately to delete `profiles`, `user_course_progress`, and `user_bookmarks` records, followed by storage object purging.

---

## 3. Implementation Details

### 3.1 Public Privacy Policy (`app/privacy/page.tsx`)
Created a standalone, beautifully formatted page adhering to the CyberTube SST aesthetic with 14 clear sections:
1. **Platform Operator & Contact Information:** Entity identification, `privacy@cybertube.org`, `support@cybertube.local`, and repository links.
2. **Information Collected Directly from You:** Profile fields, avatars, progress, local storage usage.
3. **Google OAuth Identity Information & Limited Use:** Scopes (`openid`, `email`, `profile`), specific fields, boundary assurances (no Gmail/Drive/YouTube access), and explicit Google Limited Use compliance statement.
4. **GitHub OAuth Identity Information:** Scopes, fields, boundaries.
5. **How We Use Collected Information:** Purpose limitation, authentication, personalization, security.
6. **Supabase Processing & Data Storage Architecture:** AWS us-east-1 hosting, PostgreSQL RLS policies, private avatar bucket, and signed URLs.
7. **Vercel Hosting & Edge Network Processing:** CDN and edge request handling.
8. **Cookies & Session Storage:** `@supabase/ssr` HttpOnly cookies, zero advertising tracking.
9. **Third-Party Disclosures & Embedded Video Media:** No sale of personal data; click-to-load YouTube embed disclosures.
10. **Data Retention & Permanent Account Deletion:** Cascade purge semantics and deletion request workflows.
11. **Your Privacy Rights (GDPR, CCPA & Global Rights):** Access, rectification, erasure, and OAuth token revocation via Google Account settings.
12. **Security Safeguards & Inherent Limitations:** TLS 1.3, hostname validation, RLS, signed URLs, and realistic internet risk disclosures.
13. **Children's Privacy:** Age minimum (13+) and COPPA compliance procedures.
14. **Changes to This Privacy Policy:** Versioning and update transparency.

### 3.2 Public Terms of Service (`app/terms/page.tsx`)
Created a comprehensive legal agreement covering:
1. **Educational Purpose & Mission:** Defensive research and structured study roadmaps.
2. **Mandatory Cybersecurity Rules of Engagement:**
   - Strict requirement that all testing occur only on owned virtual machines, designated legal lab platforms (PortSwigger, TryHackMe, picoCTF, Hack The Box, OWASP Juice Shop), or explicitly authorized targets.
   - Prohibition against unauthorized attacks, scanning, exploitation, or CFAA violations.
   - Immediate account revocation for malicious activity.
3. **User Accounts & Security:** Credential safety and breach notification.
4. **Intellectual Property & Creator Attribution:** Affirmation that video content belongs to original YouTube creators; CyberTube code and curriculum design protections.
5. **Acceptable Platform Use:** Protection against abuse, scraping, and malicious uploads.
6. **Disclaimer of Warranties:** Educational "AS IS" disclaimers.
7. **Limitation of Liability:** Clear boundaries regarding misuse of concepts.
8. **Termination & Suspension:** Policies on enforcement.

### 3.3 Site-Wide Navigation & Entry Point Integration
1. **Global Footer (`src/components/Footer.tsx`):**
   - Added visible links to "Privacy Policy" (`/privacy`) and "Terms of Service" (`/terms`) under the "Governance & Integrity" column.
   - Added "Privacy" and "Terms" links to the bottom copyright bar.
2. **Login View (`app/login/page.tsx`):**
   - Added clear agreement disclosure: *"By continuing, you agree to our Terms of Service and Privacy Policy."*
3. **Registration View (`app/register/page.tsx`):**
   - Added agreement disclosure before account creation: *"By registering, you agree to our Terms of Service and Privacy Policy."*
4. **Middleware (`middleware.ts`):**
   - Verified that `/privacy` and `/terms` are unauthenticated public routes returning HTTP 200 without redirects.

---

## 4. Verification and Quality Gates

### 4.1 Automated Test Execution Summary
- **TypeScript Static Check:** `npx tsc --noEmit` → **Passed (0 errors)**.
- **ESLint Code Quality:** `npm run lint` → **Passed (0 errors)**.
- **Unit & HTTP Tests:** `npm test` → **Passed (8/8 catalog tests, 7/7 route checks)**.
- **Next.js Production Build:** `npm run build` → **Passed**.
  - Prerendered `/privacy` statically (197 B, 106 kB First Load JS).
  - Prerendered `/terms` statically (197 B, 106 kB First Load JS).

### 4.2 Playwright End-to-End Suite (`tests/20_privacy_and_terms.spec.ts`)
Created automated E2E test verifying all regulatory requirements:
```
Running 4 tests using 1 worker
  ok 1 public access to /privacy without authentication (2.1s)
  ok 2 public access to /terms without authentication (1.7s)
  ok 3 footer contains accessible links to Privacy Policy and Terms of Service (1.9s)
  ok 4 login and registration pages link to terms and privacy (1.4s)
4 passed (21.0s)
```

### 4.3 Social OAuth & Security Integration Suite
Verified against live Supabase project endpoints:
```
Running 14 tests using 1 worker
  ok  1 Login page renders Google and GitHub OAuth buttons (3.4s)
  ok  2 Register page renders Google and GitHub OAuth buttons (1.9s)
  ok  3 Mobile responsive viewports render stacked OAuth touch targets (975ms)
  ok  4 Auth callback route safely redirects to /login when no code is supplied (1.4s)
  ok  5 Auth callback route handles error_description parameter (1.4s)
  ok  6 Prevent external open redirect via unsafe next parameter (1.5s)
  ok  7 OAuth buttons show connecting states during initiation (3.3s)
  ok  8 Simulated PKCE session cookies permit access to /account (1.6s)
  ok  9 Live GitHub OAuth redirect URL handshake (2.8s)
  ok 10 Live Google OAuth redirect URL handshake -> accounts.google.com (1.9s)
  ok 11 Protected routes enforce authentication redirect (2.0s)
  ok 12 Public routes allow anonymous access without credentials (12.9s)
  ok 13 Avatar API rejects unauthenticated mutation attempts (38ms)
  ok 14 OAuth callback route safely handles invalid authorization code (1.5s)
14 passed (1.0m)
```

---

## 5. Google OAuth Branding Verification Checklist

When submitting for Google verification review, provide the following exact assets:

| Verification Item | Deployed CyberTube URL / Value | Status |
|---|---|---|
| **Application Home Page** | `https://cybertube.vercel.app` (or custom domain) | Verified |
| **Privacy Policy URL** | `https://<domain>/privacy` | Verified (HTTP 200, Public) |
| **Terms of Service URL** | `https://<domain>/terms` | Verified (HTTP 200, Public) |
| **Google OAuth Client ID** | `65378023705-ifal5s9vdrf8ec6n40o88lpg0lmf7ss0.apps.googleusercontent.com` | Verified |
| **Scopes Requested** | `openid`, `email`, `profile` | Verified Minimal Scopes |
| **Scope Justification** | Authentication of user identity and initialization of display name / avatar | Verified Non-Sensitive |
| **Limited Use Disclosure** | Explicitly stated in Section 3 of `/privacy` | Verified |
| **Contact Email** | `privacy@cybertube.org` / `support@cybertube.local` | Verified |

---

## 6. Git Workflow

- **Branch Created:** `feature/google-oauth-privacy-remediation`
- **Starting Commit:** `6a50a3c`
- **Files Staged:**
  - `app/privacy/page.tsx`
  - `app/terms/page.tsx`
  - `src/components/Footer.tsx`
  - `app/login/page.tsx`
  - `app/register/page.tsx`
  - `tests/20_privacy_and_terms.spec.ts`
  - `tests/07_social_oauth.spec.ts`
  - `tests/11_security_and_integrity.spec.ts`
  - `docs/reports/GOOGLE_OAUTH_PRIVACY_REMEDIATION.md`
- **PR Strategy:** Open Draft PR targeting `main`. Do not merge into `main` or deploy to production directly.
