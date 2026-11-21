# CyberTube remediation register — 21 November 2026

**Target:** https://cybertube-mu.vercel.app  
**Repository:** arun-codex/CyberTube  
**Review branch:** audit/2026-11-21-p1-p2-no-deploy  
**Change policy:** GitHub review branch only. No production release, database DDL or payment operation as part of this change set.

## Confirmed baselines

- GitHub main at audit start: `c457d4722f4e9e092261e41dce9c2ee4ff7ef3bc`.
- Latest verified READY Vercel **production** commit at audit start: `61d7ff0b6b7c627e7817f867d43913bd48f6d5d4`. Vercel project: `prj_rMDMmU1mBnqXrfRMw9smW1yrRizO`.
- Supabase project: `iwcbuvutqhwxgovkecfa`; `public.profiles` had policy `Public profiles are readable by everyone` with `USING (true)`.
- Direct site HTTP and browser-interaction tooling are not accessible to this run. An existing browser tab's page text was inspected but does not constitute an interactive audit of any route.
- Original audit enumerated 36 App Router templates and 24 API routes; this branch adds `/api/version`.

## Findings and remediation state

| Finding | Priority | Branch action / remaining acceptance |
| --- | --- | --- |
| F01 Profiles readable to anonymous visitors | P1 | **REVIEW-ONLY SQL prepared** in `docs/audit/2026-11-21-profiles-rls-REVIEW-ONLY.sql`. Not applied. Confirm profile UI compatibility and owner/non-owner/anon isolation in staging. |
| F02 PDF endpoint reflected credentialed CORS | P1 | **Code staged**: deny foreign Origin, remove Allow-Origin/Allow-Credentials even on OPTIONS, set same-origin resource policy; add API regression tests. Must verify real PDF, byte ranges and browser permissions after deployment. |
| F03 Production behind main | P1 | **Version endpoint staged**; production still behind. Build timestamp remains null unless `BUILD_TIMESTAMP` is configured by build pipeline; never substitute request timestamp. Preview, compare Git SHA, approve release, then verify production alias. |
| F04 Two dead admin links | P1 | **Code staged**: replace with actual `/admin/study-materials` action and remove fake published-count 22 fallback; confirm authorized admin flow in browser. |
| F05 Discover player sizing | P2 | **Code staged**: 100%-dimension YouTube IFrame API and aspect-video CSS based on the existing fix branch; verify desktop/mobile/Theater and real embed restrictions. |
| F06 Empty persisted discovery pipeline | P2 | **Partial code staged**: status explicitly labels runtime mode, stored item count and unknown freshness. Scheduled ingestion, source persistence, deduplication and health metrics are **NOT implemented**. |
| F07 Search index differs from Discover search | P2 | Open; agree on user-facing site/global vs live-feed scope, then implement indexing with privacy boundaries and freshness tests. |
| F08 User-editable generic quiz state | P2 | Open; retain learning-only result semantics. Any verified credential requires separate server-writable attempt ledger. |
| F09 Theme drift | P2 | Partial: admin dashboard older literals switched to semantic light/dark tokens. Other legacy forms and resource pages still require harmonization. |
| F10 Unsupported trust/conformance claims | P2 | **Code staged**: remove unverified WCAG 2.2 AA and blanket content verification copy from footer. Formal manual WCAG check still required. |
| F11 Sitemap mismatch | P2 | **Code staged**: robots.txt now matches canonical `cybertube-mu.vercel.app`. Verify deployed robots and sitemap. |
| F12 Empty published playlist module | P2 | **Code staged**: hide course modules with no lessons, quiz, lab or capstone from dynamic navigation. Verify the specific Wireshark course and course completion calculations. |
| F13 Search rate limit isolated per instance | P2 | Open; decide managed/shared limiter after measuring abuse, preserving privacy and operational cost. |
| F14 Course hydration may run N+1 requests | P2 | Open; measure actual course response times, server timings, CWV and database load before changing access paths. |
| F15 Admin authorization source mismatch | P2 | Open; agree on authoritative staff allowlist/admin_users model and test middleware, pages and APIs before unification. |
| F16 Security headers/CSP | P2 | Open; inspect actual production headers, 3rd-party scripts and YouTube frames before CSP Report-Only rollout and HSTS decision. |
| F17 Public preview/legacy routes | P3 | Partial: `/typography-preview` has noindex metadata; keep `/tryhackme-roadmap` redirect to labs. Confirm crawl behavior and update Learning Paths preview copy. |

**Interpretation:** A staged code fix is not a live verification or claim that production has changed. "Open" means no remediation is implemented in this PR.

## Required gates before any merge or release

1. Run `npm ci`, `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build` and `npx playwright test --project=chromium` in a non-production CI environment. The new workflow targets pull requests and uses local Playwright, not the production URL.
2. Test PDF endpoint: same-origin authenticated (200), byte range (206), unsigned (401), foreign Origin (403), nonexistent/retired (404), unpublished (403 for ordinary users); no wildcard or reflected credentialed CORS on any path.
3. Confirm responsive video viewport at 375px/1440px, light/dark, Theater, error state, seek and source attribution.
4. Test authorized admin action reaches a real management page; unauthorized login denied. Check counts when database unavailable.
5. Test each published course including `wireshark-and-ethical-hacking`: no empty required module or phantom completion target; quiz and progress paths intact.
6. Validate all 36 route templates, 24 original API routes plus the new version endpoint. For dynamic pages, test valid, invalid and retired records. For authentication, use **two explicitly consented test users** and a staff test account.
7. Verify the **34 published PDFs / 138 indexed document pages**, room URLs, global search, lab completion, cross-device history and account switching, accessibility tooling plus manual keyboard/screen-reader checks.
8. Audit production environment's payment flags and verified payee through **read-only checks only**. Do not send UPI money, activate flags or claim payment completion.
9. Compare `/api/version` SHA, GitHub merge SHA, Vercel deployment SHA and production alias. Null SHA/timestamp is a release-check failure until the pipeline populates it.
10. Prepare and test the F01 RLS patch on a separate staging database with owner/user/anon test matrix; back up policy definitions and obtain explicit production authorization before a scheduled migration.
11. Obtain explicit owner release approval after all applicable gates pass. Deploy a reviewed immutable production build, verify routes/headers/telemetry, then promote. Keep rollback candidate ready.

## Observability and rollback

- Record UTC time, commit, deployment URL, alias, health, response headers and errors during release.
- Validate successful authenticated PDF reading and completion synchronization after promotion.
- On regression, roll back to the last verified Vercel deployment and separately reverse any database migrations with a **reviewed compensating migration**, not an improvised rollback.
- Do not conflate GitHub merge, Vercel READY deployment, and live production alias; each is a separate proof point.

## Access/tool limitations in this run

The connected Browser tool in Chat mode can read already-open tabs, but cannot navigate, click, change viewport, capture console/network or sign in as test users. The sandbox cannot resolve github.com or the live domain for clone/HTTP testing. No 36-template interaction matrix, Web Vitals, payment handoff or full Playwright run has been represented as completed here. Use an authorized interactive Work browser or a local environment with network access to finish these tasks.
