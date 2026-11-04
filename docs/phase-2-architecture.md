# CyberTube Phase 2: Architecture Specification
**Backend Architecture + Supabase + Authentication + Admin CMS**

---

## 1. System Overview

CyberTube Phase 2 introduces a PostgreSQL database backend, cookie-based session authentication, Row Level Security (RLS) policies, cloud personal library synchronization, and a server-governed administrative content management system (CMS).

```
+-------------------------------------------------------------------------+
|                        Browser Client (Next.js 14)                      |
|                                                                         |
|  [Guest Browsing]      [Auth Learner]        [Allowlisted Admin]        |
|  - Statically cached   - Cloud Bookmarks     - Resource CMS             |
|  - Local Bookmarks     - Profile Onboarding  - Review Submissions       |
|  - Instant Search      - Collections         - Domain Taxonomy          |
+------------------------------------+------------------------------------+
                                     | Cookie Auth / SSR Sessions
                                     v
+-------------------------------------------------------------------------+
|                     Next.js Server & Edge Middleware                    |
|                                                                         |
|  - middleware.ts: Session refresh & path-based authorization            |
|  - Server Actions (/app/actions/auth.ts): Token verification & mutations|
|  - createServerClient (@supabase/ssr): Server component cookie store    |
|  - createAdminClient (@supabase/supabase-js): Server-only Service Role  |
|  - Admin Email Allowlist Guard: Rejects non-allowlisted credentials     |
+------------------------------------+------------------------------------+
                                     | Secure SQL API
                                     v
+-------------------------------------------------------------------------+
|                           Supabase PostgreSQL                           |
|                                                                         |
|  - Tables: profiles, resources, domains, resource_domains, tags,        |
|            resource_tags, bookmarks, collections, collection_resources, |
|            resource_submissions.                                       |
|  - Row Level Security (RLS): Strict ownership & publication status      |
|  - Extensions: uuid-ossp, pgcrypto                                      |
+-------------------------------------------------------------------------+
```

---

## 2. Core Architectural Principles

1. **Uninterrupted Guest Discovery**:
   - Public learners continue browsing, filtering, and saving resources without mandatory account registration.
   - Statically prerendered SSG routes (`/`, `/discover`, `/domains`, `/resources/[slug]`, `/saved`) remain blazing fast.
2. **Cookie-Based SSR Authentication**:
   - Replaces deprecated `@supabase/auth-helpers-nextjs` with the official `@supabase/ssr` library.
   - Sessions are managed across requests using secure HTTP cookies and refreshed automatically in `middleware.ts`.
3. **Defense-in-Depth Authorization**:
   - Authentication identity is verified server-side with `auth.getUser()`, never trusting client-supplied user IDs or unverified `getSession()`.
   - Administrative endpoints verify verified user email addresses against a server-only allowlist (`CYBERTUBE_ADMIN_EMAILS`).
4. **Air-Gapped REA Boundary**:
   - Local reverse-engineering analysis tools and MCP servers remain entirely offline developer tooling. No REA capabilities or file paths are exposed via Next.js or PostgreSQL.
