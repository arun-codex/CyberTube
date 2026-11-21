# CyberTube — Phases A/B controlled remediation

**Audit source:** \`CyberTube_Evidence_Based_Audit_2026-11-21.md\`.  
**Review date:** 2026-11-21.  
**Deployment policy:** NO production release or preview deployment. Work happens only on branch \`audit/remediation-phase-ab-no-deploy-20261121\`. The branch \`vercel.json\` contains an exact deployment disable rule.

## Evidence status

- **Source reviewed:** All 36 Next.js page template files and 24 API route files were inventoried in the prior audit.
- **New browser inspection:** The connected Browser tool can read a user-opened tab only. It cannot click, change viewport, switch themes, inspect DevTools, or enumerate every page. The user should use ChatGPT Work/browser automation or a local Playwright runner with authorized test accounts for this part.
- **Source clone:** The requested Windows scratch path is not accessible from the ChatGPT execution container. GitHub DNS is unavailable in the container; edits use the connected GitHub repository.
- **Production state:** GitHub main \`c457d4722f4e9e092261e41dce9c2ee4ff7ef3bc\`; Vercel production \`61d7ff0b6b7c627e7817f867d43913bd48f6d5d4\` when checked. Do not mistake source features for production features.
- **Payments:** Do not initiate real UPI transfers, issue fake receipts or claim bank confirmation.

## Remediation register

| Finding | Change | Status |
| --- | --- | --- |
| F01 | Restrict public.profiles to owner-only SELECT; revoke anon SELECT | SQL proposal staged, NOT applied |
| F02 | Same-origin private PDF route; 405 OPTIONS and no reflected credentialed CORS | Branch change |
| F03 | /api/version returns gitCommitSha, nullable buildTimestamp, deploymentEnvironment, checkedAt, no-store | Branch change; GitHub/Vercel still different |
| F04 | Replace dead /admin/resources/new and /admin/submissions actions with live /admin/study-materials action; remove fabricated 22 total | Branch change |
| F05 | Import existing Discover 16:9 responsive iframe fix, include mock-player Playwright regression | Branch change; real browser not yet proven |
| F06 | Discover status explicitly distinguishes persisted index counts from separate live source aggregation | Partial branch change; persistent ingestion still unimplemented |
| F07 | Unified global and Discover search | Pending, requires search parity acceptance tests |
| F08 | Prevent misleading verified quiz certification claims; server grading review | Pending |
| F09 | Shared light/dark design tokens and focus/contrast | Pending visual audit |
| F10 | Unverified WCAG/other trust-badge claims | Pending accessibility assessment |
| F11 | Correct robots.txt sitemap hostname | Branch change |
| F12 | Show "Planned · No lessons yet" for zero-lesson course modules instead of 0% | Branch change; DB remains unchanged |
| F13 | Shared production rate limiting for PDF search | Pending |
| F14 | DB hydration and runtime performance budgets | Pending live timing |
| F15 | Consistent administrator authorization | Pending centralized guard |
| F16 | Live CSP and security header review | Pending browser/network inspection |
| F17 | Internal typography-preview route visibility | Pending product decision |

## Release gates (all must pass before production review)

1. Verify profile SELECT migration on staging/test users, including owner and other-user cases. Audit client queries that read profiles. Approval required for DB mutation.
2. Run \`npm ci\`, \`npx tsc --noEmit\`, \`npm run build\`, then the application unit suite \`npm test\` in an isolated working copy. \`npm run lint\` must be checked against the actual Next.js CLI (the package currently defines \`next lint\`).
3. Run Chromium Playwright suite \`npx playwright test\`, across desktop 1440 and mobile 375, both light/dark themes. Each authenticated path requires dedicated authorized test users; do not reuse the owner's everyday account.
4. Verify PDF same-origin GET, 206 ranges, OPTIONS 405, cross-origin GET without permissive CORS, unauthorized 401 and unpublished 403, including PDF viewer integration.
5. Visit every page template and representative dynamic record on live/staging. Record console errors and request failures; no claims of completion until screenshots are captured.
6. Verify all external TryHackMe and YouTube links against providers, respecting rate limits.
7. Confirm /api/version git SHA matches the **exact READY Vercel deployment** and test an immutable staged release, then request explicit production approval.
8. Monitor post-release logs and add rollback criteria.
9. Do NOT enable payment gateway or perform UPI transactions in this run.

## Findings requiring operational choices

- F01: Decide whether public profiles are necessary. If so, expose an explicitly public, opt-in subset through a narrow endpoint or security-invoker view, not \`SELECT *\` on the full profile table.
- F06: Configure an ingest scheduler, source registry, moderated stale/invalid source metadata, error retries and persistent counts; do not silently replace the existing runtime live feed.
- F03: Provide \`CYBERTUBE_BUILD_TIMESTAMP\` at build time if an actual build timestamp is required. The API intentionally returns null until configured; \`checkedAt\` is request time, never mislabelled.
- F12: The zero-lesson Wireshark Module 5 remains in DB, but now has an accurate placeholder status rather than false completion.
