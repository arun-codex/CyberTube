# CyberTube Phase 17.1 — Database & Playlist Sync Hardening Report

**Repository:** `arun-codex/CyberTube`  
**Branch:** `feature/mern-full-stack-course-integration`  
**Target Pull Request:** #8 (Draft)  
**Date:** November 5, 2026  
**Status:** Completed & Certified  

---

## 1. Executive Summary

Phase 17.1 is a corrective and preventive engineering phase that hardened CyberTube's database schema consistency, dynamic database-backed course delivery, YouTube playlist synchronization engine, and cron security boundaries. All weak, self-asserting tests have been replaced with real service-level tests executing authentic function logic against controlled mock dependencies.

No production data, cloud Supabase projects, or remote migrations were touched.

---

## 2. Problems Discovered & Remediated

### A. Database Schema Mismatches
1. **`courses.instructor_organization` vs `courses.instructor_org`**:
   - *Discovery:* The Wireshark migration (`20261105020000`) and earlier loader logic attempted to query/insert `instructor_organization`. The production schema defines this column as `instructor_org TEXT`.
   - *Remediation:* Corrected migration `20261105020000` to insert and update `instructor_org`. Updated loader logic in `src/lib/courses.ts` to map `dbCourse.instructor_org || dbCourse.instructor_organization || ...`.
2. **`courses.published` vs `courses.status`**:
   - *Discovery:* The Wireshark migration and `getCourseBySlugWithDb()` referenced a boolean column `published = true`, whereas the production schema specifies `status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived'))`.
   - *Remediation:* Changed migration `20261105020000` to insert and update `status = 'published'`. Updated `src/lib/courses.ts` queries to use `.eq('status', 'published')`.
3. **`course_playlist_sources.playlist_url` vs `source_playlist_url`**:
   - *Discovery:* Migration `20261105020000` referenced `playlist_url`, but the table definition created in Phase 16 (`20261105010000`) defines the column as `source_playlist_url TEXT`.
   - *Remediation:* Corrected `20261105020000` to insert and update `source_playlist_url`.
4. **Unguarded Triggers and Policies in Migration `20261105010000`**:
   - *Discovery:* Re-running `20261105010000` failed on `CREATE TRIGGER` and `CREATE POLICY` statements when triggers/policies already existed.
   - *Remediation:* Added `DROP TRIGGER IF EXISTS` and `DROP POLICY IF EXISTS` guards to ensure idempotent execution.

### B. Dynamic Database Course Loading
1. **Directory Catalog Bypass**:
   - *Discovery:* `app/courses/page.tsx` was calling static `getAllCourses()` rather than `getAllCoursesWithDb()`.
   - *Remediation:* Converted `app/courses/page.tsx` to an async server component awaiting `getAllCoursesWithDb()`.
2. **Catalog Fallback and Error Handling**:
   - *Discovery:* Database errors were previously swallowed or masked.
   - *Remediation:* Explicit error logging (`console.error`) with clear messages was added to both `getCourseBySlugWithDb` and `getAllCoursesWithDb`. The static catalog is preserved as a deliberate, zero-downtime fallback.
3. **Filtering Inactive Playlist Items**:
   - *Discovery:* If a playlist item became unavailable or removed, `getCourseBySlugWithDb` had no mechanism to exclude it from the active course curriculum.
   - *Remediation:* Queried `course_playlist_items` for active status (`is_active`, `is_embeddable`, `availability_status`) and filtered out inactive items from displayed module lessons while preserving historical records in `lessons` and `user_lesson_progress`.

### C. Playlist Synchronization Engine Hardening
1. **Malformed Playlist Item Handling**:
   - *Discovery:* An entry missing an 11-character video ID incremented `failedItems`, but the sync engine continued to run deactivation logic and reported overall success.
   - *Remediation:* Pre-validated all playlist items. Any malformed entry triggers `sourceHasMalformedOrFailedItems = true`, increments `failedItems`, sets source status to `'error'`, preserves `last_success_at` without updating, reports overall `success: false`, and strictly aborts the deactivation routine so valid items are not accidentally deactivated.
2. **Curated Lesson Order Preservation**:
   - *Discovery:* The recurring sync engine previously overwrote `order_index: seq` on existing lessons using parsed title numbers. A video with `Video #0` could produce `order_index: 0`, violating the Postgres table constraint `CHECK (order_index > 0)`.
   - *Remediation:* 
     - Updated `parseLearningSequence` in `src/lib/youtube-utils.ts` to guarantee output is strictly positive (`>= 1`).
     - Hardened `src/lib/server/youtube-sync.ts` so recurring syncs never overwrite `order_index` on existing lessons.
     - New lessons receive a monotonically increasing `order_index >= 1` in the destination module.
3. **No Destructive Deletions**:
   - *Discovery:* Need to verify that user progress and lessons are preserved when items are removed.
   - *Remediation:* Guaranteed that removing or deactivating a playlist item only sets `is_active: false` on `course_playlist_items`. No `DELETE` queries are ever executed on `lessons` or `user_lesson_progress`.

### D. Cron and Security Protections
1. **Non-Production Fail-Closed Guard**:
   - Added an explicit check in `syncAllEnabledPlaylists`: if `NEXT_PUBLIC_SUPABASE_URL` targets cloud Supabase (`.supabase.co`) and the environment is not verified production (`VERCEL_ENV !== 'production'`), synchronization fails closed unless explicitly opted in (`options.allowProductionWrite`).
2. **Safe Cron Readiness Inspection**:
   - Added `?check=readiness` endpoint inspection in `/api/cron/sync-youtube-playlists`. Reports configuration booleans (`ready`, `cronConfigured`, `youtubeConfigured`, `supabaseConfigured`) without exposing sensitive secrets or requiring authentication.
3. **Exact HTTP Error Distinction**:
   - Missing `CRON_SECRET` on server -> returns HTTP 500.
   - Missing or invalid `Authorization: Bearer <CRON_SECRET>` -> returns HTTP 401.

---

## 3. Files Changed

| File | Change Description |
| :--- | :--- |
| [`supabase/migrations/20261105010000_add_playlist_sync_and_seed_networking_course.sql`](file:///C:/User/REA_Project/supabase/migrations/20261105010000_add_playlist_sync_and_seed_networking_course.sql) | Added `DROP TRIGGER IF EXISTS` and `DROP POLICY IF EXISTS` idempotency guards. |
| [`supabase/migrations/20261105020000_add_wireshark_course_and_sync_improvements.sql`](file:///C:/User/REA_Project/supabase/migrations/20261105020000_add_wireshark_course_and_sync_improvements.sql) | Corrected `instructor_organization` → `instructor_org`, `published` → `status = 'published'`, `playlist_url` → `source_playlist_url`. |
| [`src/lib/youtube-utils.ts`](file:///C:/User/REA_Project/src/lib/youtube-utils.ts) | Guarded `parseLearningSequence` to ensure output is strictly positive (`>= 1`), preventing zero or negative indexes. |
| [`src/lib/courses.ts`](file:///C:/User/REA_Project/src/lib/courses.ts) | Updated queries to `status = 'published'`, mapped `instructor_org`, added inactive playlist item filtering, added testing injection hook, and strengthened error logging in `getAllCoursesWithDb()`. |
| [`app/courses/page.tsx`](file:///C:/User/REA_Project/app/courses/page.tsx) | Updated to async server component awaiting `getAllCoursesWithDb()`. |
| [`src/lib/cloud-course-progress.ts`](file:///C:/User/REA_Project/src/lib/cloud-course-progress.ts) | Added constructor client injection and made progress persistence methods public for direct service invocation and testing. |
| [`src/lib/server/youtube-sync.ts`](file:///C:/User/REA_Project/src/lib/server/youtube-sync.ts) | Added fail-closed cloud Supabase guard, pre-validation for malformed items, abort of deactivation on failures, preserved existing lesson `order_index`, and added testing dependency injection options. |
| [`app/api/cron/sync-youtube-playlists/route.ts`](file:///C:/User/REA_Project/app/api/cron/sync-youtube-playlists/route.ts) | Added safe non-sensitive `?check=readiness` endpoint and strict 401 vs 500 status separation. |
| [`package.json`](file:///C:/User/REA_Project/package.json) | Registered `test/phase17-1-sync-hardening.test.ts` into `npm test`. |
| [`test/phase17-1-sync-hardening.test.ts`](file:///C:/User/REA_Project/test/phase17-1-sync-hardening.test.ts) | New test suite with 9 authentic service-level tests covering schema, loader, directory, progress, sync, ordering, deactivation, and guards. |
| [`tests/25_wireshark_course_integration.spec.ts`](file:///C:/User/REA_Project/tests/25_wireshark_course_integration.spec.ts) | Replaced mock object self-assertions in tests 10-16 with real invocations of `CloudCourseProgressService`, `syncAllEnabledPlaylists`, `getCourseBySlugWithDb`, and cron readiness. |

---

## 4. Test Coverage & Verification Results

### A. TypeScript Type Check
```bash
npx tsc --noEmit
```
- **Result:** **0 errors**. Exit code 0.

### B. ESLint
```bash
npm run lint
```
- **Result:** **0 errors**. Exit code 0.

### C. Unit & Service Tests (`npm test`)
```bash
npm test
```
1. `test/catalog.test.js` — **8 passed, 0 failed**
2. `test/phase17-1-sync-hardening.test.ts` — **9 passed, 0 failed**
   - 1. Migration SQL schema consistency & safety guards
   - 2. `getCourseBySlugWithDb` loads real database modules, lessons, and excludes inactive playlist items
   - 3. `getAllCoursesWithDb` delivers dynamic catalog and static fallbacks
   - 4. `CloudCourseProgressService` authenticates, handles guest mode, rejects invalid IDs, handles errors
   - 5. `syncAllEnabledPlaylists`: successful sync, duplicate items, order stability
   - 6. `syncAllEnabledPlaylists` handles malformed video ID without deactivating items
   - 7. `syncAllEnabledPlaylists` deactivates removed items without deleting lessons or user progress
   - 8. `parseLearningSequence` prevents zero or negative indexes
   - 9. Local environment targeting cloud Supabase fails closed without explicit opt-in
3. `test/http-check.js` — **7 passed, 0 failed**
- **Total `npm test`:** **24 passed, 0 failed**.

### D. Playwright End-to-End Suite
1. `tests/25_wireshark_course_integration.spec.ts`: **16 passed, 0 failed**
2. `tests/24_networking_playlist_sync_and_progress.spec.ts`: **8 passed, 0 failed**
3. `tests/23_mern_course_integration.spec.ts`: **7 passed, 0 failed**
4. `tests/03_courses_and_progress.spec.ts`: **3 passed, 0 failed**
5. `tests/18_phase13_9_1_typography_alias.spec.ts`: **4 passed, 0 failed**
- **Total Playwright tests:** **38 passed, 0 failed**.

### E. Next.js Production Build
```bash
npm run build
```
- **Result:** Compiled cleanly in 13.0s. All 83 static routes rendered successfully. Route `/api/cron/sync-youtube-playlists` generated as a dynamic server route.

---

## 5. Production Configuration Prerequisites

To enable automated daily playlist synchronization in Production once PR #8 is merged:

1. **Database Migrations:**
   Execute migrations in Supabase SQL Editor:
   - `supabase/migrations/20261105010000_add_playlist_sync_and_seed_networking_course.sql`
   - `supabase/migrations/20261105020000_add_wireshark_course_and_sync_improvements.sql`
2. **Vercel Environment Variables:**
   - `CRON_SECRET`: Random 32+ character string matching Vercel Cron invocation header.
   - `YOUTUBE_API_KEY`: Google Cloud YouTube Data API v3 key with `playlistItems.list` and `videos.list` quota.
   - `SUPABASE_SERVICE_ROLE_KEY`: Service-role key for server-side database writes by the sync engine.
3. **Readiness Verification:**
   Verify configuration before cron execution:
   ```bash
   curl https://cybertube-mu.vercel.app/api/cron/sync-youtube-playlists?check=readiness
   # Expected response: {"ready":true,"cronConfigured":true,"youtubeConfigured":true,"supabaseConfigured":true}
   ```

---

## 6. Safety Compliance Statement

- Working branch: `feature/mern-full-stack-course-integration`
- No migrations executed against Production Supabase.
- No Production environment variables altered.
- PR #8 remains in **Draft** state (unmerged).
- Zero secrets committed or exposed.
