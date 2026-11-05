# CyberTube Phase 16: Database-Backed Networking Course & Automatic YouTube Playlist Sync

## Executive Summary
Phase 16 establishes a database-backed cybersecurity course architecture in Supabase PostgreSQL, integrates the YouTube playlist `PLITTDLtD8szA` (*Networking for Hackers 2027* by Bitten Tech), introduces server-side progress persistence to `public.user_lesson_progress` using native UUID identifiers, and provisions an automated daily Vercel Cron synchronization pipeline via the YouTube Data API v3.

---

## 1. Verified Playlist Metadata & Manifest
- **Playlist Title:** `Networking for Hackers 2027`
- **Playlist ID:** `PLITTDLtD8szA`
- **Source URL:** `https://www.youtube.com/playlist?list=PLITTDLtD8szA`
- **Channel / Creator:** `Bitten Tech`
- **Classification:** Track: `cybersecurity` | Domains: `network-security`, `fundamentals`
- **Total Playlist Entries on YouTube:** 7 entries
- **Playable Lessons Imported:** 6 lessons
- **Unavailable / Removed Entries:** 1 entry (`qHkemPeWD3w`, removed by uploader on YouTube; accurately recorded in manifest and excluded from playable lessons)
- **Total Playable Duration:** 19,015 seconds (317 minutes / 5 hours 17 minutes)
- **Version-Controlled Manifest:** `src/data/manifests/networking-for-hackers-playlist-manifest.json`

### Lesson Learning Sequence vs. Source Playlist Position
| Learning Order | YouTube Video ID | Lesson Title | Duration | Original Playlist Position |
| :---: | :---: | :--- | :---: | :---: |
| **#1** | `4hLax8DmQHY` | Networking for Hackers #1 \| Introduction | 2,162s (36m) | Pos 6 |
| **#2** | `4-Ea5EI6LrM` | Networking for Hackers #2 \| History of your Internet | 3,466s (58m) | Pos 5 |
| **#3** | `A31izTClLqs` | Networking for Hackers #3 \| How Data Travels & Who Can See It | 3,222s (54m) | Pos 4 |
| **#4** | `Yb48nfFBT0I` | Networking for Hackers #4 \| Devices, Topologies & Security Rules | 4,056s (68m) | Pos 3 |
| **#5** | `e6tMigLffZc` | Networking for Hackers #5 \| Bandwidth, Speed & Delays | 3,365s (56m) | Pos 2 |
| **#6** | `J_fUOMgl4CE` | Networking for Hackers #6 \| TCP/IP, OSI & Encapsulation | 2,744s (46m) | Pos 1 |

---

## 2. Deterministic UUID Architecture
Unlike static legacy courses that used string identifiers, Phase 16 establishes native Supabase UUID foreign-key compliance:

| Entity | Slug / Key | Stable UUID |
| :--- | :--- | :--- |
| **Course** | `networking-for-hackers-2027` | `e7b9e001-4000-4000-a000-000000000001` |
| **Module** | `Networking Fundamentals — Playlist Sequence` | `e7b9e002-4000-4000-a000-000000000001` |
| **Lesson #1** | `01-networking-for-hackers-introduction` | `e7b9e003-4000-4000-a000-000000000001` |
| **Lesson #2** | `02-history-of-your-internet` | `e7b9e003-4000-4000-a000-000000000002` |
| **Lesson #3** | `03-how-data-travels-and-who-can-see-it` | `e7b9e003-4000-4000-a000-000000000003` |
| **Lesson #4** | `04-devices-topologies-security-rules` | `e7b9e003-4000-4000-a000-000000000004` |
| **Lesson #5** | `05-bandwidth-speed-and-delays` | `e7b9e003-4000-4000-a000-000000000005` |
| **Lesson #6** | `06-tcp-ip-osi-and-encapsulation` | `e7b9e003-4000-4000-a000-000000000006` |
| **Playlist Source** | `PLITTDLtD8szA` | `e7b9e004-4000-4000-a000-000000000001` |

---

## 3. Database Migration & Schema Design
Migration file: `supabase/migrations/20261105010000_add_playlist_sync_and_seed_networking_course.sql`

1. **Course Extension:**
   - Adds `track TEXT DEFAULT 'cybersecurity'`, `source_platform`, `source_playlist_id`, and `source_playlist_url`.
2. **Playlist Sync Tables:**
   - `public.course_playlist_sources`: Tracks registered playlists, sync status, and errors.
   - `public.course_playlist_items`: Maps YouTube videos to lessons with `(course_id, youtube_video_id)` unique constraint, retaining availability, position, and active status.
3. **Row Level Security (RLS):**
   - Public `SELECT` allowed on published courses, modules, lessons, and sync metadata.
   - Mutating sync tables is restricted to database owner / `service_role` client.
   - Learner progress in `public.user_lesson_progress` is strictly guarded by `auth.uid() = user_id`.
4. **Idempotent Seed:**
   - Re-running migrations executes `ON CONFLICT (slug) DO UPDATE` and `ON CONFLICT (course_id, youtube_video_id) DO UPDATE` without creating duplicate records or regenerating IDs.

---

## 4. Server-Side Progress Persistence Architecture
- **Supabase PostgreSQL Persistence:** When authenticated, learner progress (lesson completion toggle, timestamp, last accessed lesson) writes to `public.user_lesson_progress` through the user's authenticated Supabase client.
- **UUID Validation:** `CloudCourseProgressService` verifies UUID format before attempting cloud writes.
- **Local Fallback:** Unauthenticated guest learners persist to `localStorage` with zero disruption.
- **Guest-to-Cloud Merge:** On sign-in, local guest progress merges with cloud state (union of completed lessons).
- **Visual Sync Status Badge:** `SyncStatusBadge` displays real-time state:
  - `Saved to account` (green checkmark when synced to PostgreSQL)
  - `Saving...` (spinner during upsert)
  - `Offline / saved on this device` (guest mode)
  - `Could not sync` (network or DB error)

---

## 5. Automatic YouTube Playlist Synchronization & Daily Cron
- **Endpoint:** `GET /api/cron/sync-youtube-playlists`
- **Schedule:** `0 3 * * *` (Daily at 03:00 UTC, declared in `vercel.json`).
- **Security Guard:** Requires `Authorization: Bearer <CRON_SECRET>`.
- **Environment Protection:** Sync is blocked on Vercel Preview deployments (`VERCEL_ENV=preview`) to avoid modifying production database state from ephemeral environments.
- **Privileged Server Execution:** Uses `import 'server-only'` in `src/lib/server/youtube-sync.ts` and `SUPABASE_SERVICE_ROLE_KEY`.
- **Sync Algorithm:**
  1. Retrieves all items via `playlistItems.list` (handling `nextPageToken`).
  2. Batches video IDs (up to 50) to `videos.list` to retrieve embeddability, status, and ISO 8601 duration (`parseIso8601Duration`).
  3. Inserts newly discovered playable videos into `public.lessons` and `public.course_playlist_items`.
  4. Updates titles, durations, and sequence numbers on existing lessons without changing lesson UUIDs.
  5. Marks removed or unavailable videos `is_active = FALSE` in mapping without deleting lesson rows or user progress history.
- **Quota Impact:** 1 playlist list call (1 unit) + 1 video batch call (1 unit) = **2 YouTube Data API units/day** out of a 10,000 units/day free quota.

---

## 6. Required Environment Variables for Production
The repository owner must configure the following in **Vercel Project → Settings → Environment Variables**:

| Variable Name | Environment | Description |
| :--- | :--- | :--- |
| `YOUTUBE_API_KEY` | Production | Google Cloud API key restricted to YouTube Data API v3 |
| `CRON_SECRET` | Production | High-entropy secret token passed by Vercel Cron in `Authorization: Bearer <CRON_SECRET>` |
| `SUPABASE_SERVICE_ROLE_KEY` | Production | *Already present on Vercel* (used by server-side sync) |

> **Security Note:** Neither key should be shared in chat or committed to Git.

---

## 7. Automated Quality Gates & Test Results

| Test Suite / Tool | Command | Result |
| :--- | :--- | :--- |
| **TypeScript Typecheck** | `npx tsc --noEmit` | **0 errors** |
| **ESLint** | `npm run lint` | **0 errors** |
| **Production Build** | `npm run build` | **Passed** (`/courses/networking-for-hackers-2027` generated as SSG, `/api/cron/sync-youtube-playlists` generated) |
| **Catalog Unit & Route Tests** | `npm test` | **8/8 unit tests + 7/7 route checks passed** |
| **Phase 16 Playwright Suite** | `tests/24_networking_playlist_sync_and_progress.spec.ts` | **8/8 passed** |
| **Phase 15 MERN Suite** | `tests/23_mern_course_integration.spec.ts` | **7/7 passed** |
| **Core Navigation & Progress** | `tests/01_...` and `tests/03_...` | **9/9 passed** |
| **Total Automated Tests** | All Suites | **32/32 tests passed (0 regressions)** |

---

## 8. Release Details
- **Branch:** `feature/mern-full-stack-course-integration`
- **Draft Pull Request:** [#8](https://github.com/arun-codex/CyberTube/pull/8) targeting `main` (Draft, unmerged)
- **Course URL:** `https://cybertube-mu.vercel.app/courses/networking-for-hackers-2027`
