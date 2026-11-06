# CyberTube Phase 17 — David Bombal Wireshark Course Integration & Sync Improvements

**Course Title:** Wireshark and Ethical Hacking Course  
**Instructor:** David Bombal ([@davidbombal](https://www.youtube.com/@davidbombal))  
**Playlist ID:** `PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl`  
**Playlist URL:** https://www.youtube.com/playlist?list=PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl  
**Course Slug:** `wireshark-and-ethical-hacking`  
**Course UUID:** `d6a8e001-5000-4000-a000-000000000001`  
**Track:** `cybersecurity`  
**Domains:** `network-security`, `fundamentals`, `dfir`  
**Total Runtime:** 18,297 seconds (5h 4m 57s) — 305 minutes  
**Estimated Duration Label:** `5 hours 5 mins`  

---

## 1. Executive Summary

In Phase 17, David Bombal's 20-lesson masterclass **"Wireshark and Ethical Hacking Course"** was successfully integrated into CyberTube. The curriculum is mapped across four active learning modules with all 20 videos retaining their original playlist positions, alongside a fifth dedicated destination module (`Module 5: New Playlist Additions`) configured for automated playlist synchronizations.

In addition, critical architectural improvements identified in the Phase 16 audit were implemented:
1. **Module Conflict Target Fix:** Switched `ON CONFLICT (course_id, order_index)` to primary-key target `ON CONFLICT (id)` in migration scripts, ensuring re-runnable safety without relying on non-unique composite indexes.
2. **Sync Engine Hardening:** Enhanced `src/lib/server/youtube-sync.ts` with explicit error handling on every Supabase query, strict active/embeddable status validation, configurable destination module routing via `default_module_id`, and guaranteed atomic success tracking (`last_success_at` updated only on complete success).
3. **Progress Persistence Hardening:** Resolved the Phase 16 false-success edge case in `CloudCourseProgressService`, ensuring unauthenticated users and non-UUID entities explicitly emit `'offline'` without triggering false `'Saved to account'` badge states.
4. **Dynamic Database Course Loading:** Implemented `getCourseBySlugWithDb` in `src/lib/courses.ts`, enabling playlist-managed courses to dynamically merge newly synced lessons and modules from Supabase while preserving fast static fallback for unmanaged and legacy courses.
5. **Ethical Lab Environment Notice:** Added a prominent, non-intrusive security practice disclaimer to ethical hacking courses advising learners to practice only on authorized lab systems.

---

## 2. Curriculum & Module Structure

The course is organized into four foundational modules plus a designated dynamic module for future automated additions:

### Module 1: Wireshark Foundations & Getting Started
- **UUID:** `d6a8e002-5000-4000-a000-000000000001`
- **Order:** 1
- **Runtime:** 46m 9s (2,769 seconds) | 4 lessons
- **Description:** Get started with Wireshark packet capture foundations, interface selection, live captures, and ethical hacking workflows.

| Pos | Lesson UUID | Video ID | Title | Duration |
|---:|---|---|---|---:|
| 1 | `d6a8e003-5000-4000-a000-000000000001` | `QXfaGOMT7MY` | Free Wireshark and Ethical Hacking Course: Video #0 | 12:01 (721s) |
| 2 | `d6a8e003-5000-4000-a000-000000000002` | `9CY42I04MFw` | Free Wireshark and Ethical Hacking Course: Video #1 | 16:55 (1,015s) |
| 3 | `d6a8e003-5000-4000-a000-000000000003` | `qfWSToryDos` | Free Wireshark and Ethical Hacking Course: Video #2 | 10:21 (621s) |
| 4 | `d6a8e003-5000-4000-a000-000000000004` | `IdEFDkGtcQg` | Free Wireshark and Ethical Hacking Course: Video #3 | 06:52 (412s) |

### Module 2: Display Filters & Network Protocol Security
- **UUID:** `d6a8e002-5000-4000-a000-000000000002`
- **Order:** 2
- **Runtime:** 40m 24s (2,424 seconds) | 5 lessons
- **Description:** Master Wireshark display filter syntax and dissect unencrypted legacy protocols including Telnet, TFTP, FTP, and HTTP.

| Pos | Lesson UUID | Video ID | Title | Duration |
|---:|---|---|---|---:|
| 5 | `d6a8e003-5000-4000-a000-000000000005` | `WdBBYosG-YI` | Wireshark Display Filters \| Free Wireshark and Ethical Hacking Course: Video #4 | 14:37 (877s) |
| 6 | `d6a8e003-5000-4000-a000-000000000006` | `tM2aUpll1EQ` | Too much Wireshark?! \| Free Wireshark and Ethical Hacking Course: Video #5 | 05:38 (338s) |
| 7 | `d6a8e003-5000-4000-a000-000000000007` | `nGEKnYUEPcg` | Never use Telnet | 08:31 (511s) |
| 8 | `d6a8e003-5000-4000-a000-000000000008` | `PoaOgBmWJQY` | Never use TFTP or FTP! | 06:04 (364s) |
| 9 | `d6a8e003-5000-4000-a000-000000000009` | `LfZNhf2Yc8k` | Why are you still using HTTP? | 05:34 (334s) |

### Module 3: Capture Workflows, Profiles & Command-Line Tools
- **UUID:** `d6a8e002-5000-4000-a000-000000000003`
- **Order:** 3
- **Runtime:** 1h 7m 11s (4,031 seconds) | 5 lessons
- **Description:** Capture VoIP audio, create custom Wireshark inspection profiles, install on Linux, and analyze PCAPs headlessly with tshark and termshark.

| Pos | Lesson UUID | Video ID | Title | Duration |
|---:|---|---|---|---:|
| 10 | `d6a8e003-5000-4000-a000-000000000010` | `uZI9ZnKRudg` | Wireshark VoIP call capture and replay | 23:24 (1,404s) |
| 11 | `d6a8e003-5000-4000-a000-000000000011` | `4_7A8Ikp5Cc` | Wireshark Tutorial - Installation and Password sniffing | 11:26 (686s) |
| 12 | `d6a8e003-5000-4000-a000-000000000012` | `rtm_Bofv4-8` | Wireshark Install Ubuntu 20.04 | 10:07 (607s) |
| 13 | `d6a8e003-5000-4000-a000-000000000013` | `zRk5dymfNsk` | Wireshark Tutorial - Profiles and Password captures | 09:09 (549s) |
| 14 | `d6a8e003-5000-4000-a000-000000000014` | `HoYgPlmOZgo` | tshark and Termshark tutorial: Capture and view wireshark captures in a console | 13:05 (785s) |

### Module 4: Hands-on Practice & Real-World Security Case Studies
- **UUID:** `d6a8e002-5000-4000-a000-000000000004`
- **Order:** 4
- **Runtime:** 2h 31m 13s (9,073 seconds) | 6 lessons
- **Description:** Apply packet analysis skills to CCNA challenges, keylogger traffic, TCP handshakes/flags, VoIP MITM replays, and CCTV camera security.

| Pos | Lesson UUID | Video ID | Title | Duration |
|---:|---|---|---|---:|
| 15 | `d6a8e003-5000-4000-a000-000000000015` | `D9FBjUq2J74` | Can you answer this CCNA Quiz? | 10:26 (626s) |
| 16 | `d6a8e003-5000-4000-a000-000000000016` | `-WefgSx_eKY` | Learn. Capture. Repeat. | 17:00 (1,020s) |
| 17 | `d6a8e003-5000-4000-a000-000000000017` | `keAHKO2Fc4I` | Keylogger vs Wireshark | 32:36 (1,956s) |
| 18 | `d6a8e003-5000-4000-a000-000000000018` | `Auwn3RWapRE` | How TCP really works: Top 3 things you need to know! | 29:54 (1,794s) |
| 19 | `d6a8e003-5000-4000-a000-000000000019` | `LoFoV3T17T0` | Capture and Replay Phone Calls with Kali Linux and Wireshark (MITM / VoIP replay) | 17:52 (1,072s) |
| 20 | `d6a8e003-5000-4000-a000-000000000020` | `yMAWcHP6yn8` | Hacking IP Cameras (CCTV) with Demos and Real World Examples | 43:25 (2,605s) |

### Module 5: New Playlist Additions
- **UUID:** `d6a8e002-5000-4000-a000-000000000005`
- **Order:** 5
- **Initial Lessons:** 0
- **Purpose:** Configured as `default_module_id` in `course_playlist_sources` for `PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl`. Any newly added videos synchronized via cron are placed into this module automatically without modifying the original 20-lesson module distribution.

---

## 3. Database Migration Design

File: `supabase/migrations/20261105020000_add_wireshark_course_and_sync_improvements.sql`

Key design features:
1. **Schema Extension:**
   - Adds `default_module_id UUID REFERENCES public.course_modules(id) ON DELETE SET NULL` to `course_playlist_sources`.
   - Safely adds `CONSTRAINT uq_course_modules_course_order UNIQUE (course_id, order_index)` if not already present.
2. **Deterministic UUID Primary Keys:**
   - All modules, lessons, and sources use deterministic UUIDs in the `d6a8e00...` namespace with zero collision against existing courses.
3. **Re-runnable Conflict Handling:**
   - Modules use `ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title...` ensuring 100% compatibility across PostgreSQL instances regardless of custom indexes.
   - Lessons use `ON CONFLICT (course_id, slug) DO UPDATE SET...`.
   - Playlist source uses `ON CONFLICT (playlist_id) DO UPDATE SET...`.
   - Playlist items use `ON CONFLICT (course_id, youtube_video_id) DO UPDATE SET...`.

---

## 4. Automatic Playlist Sync Engine Enhancements

File: `src/lib/server/youtube-sync.ts`

1. **Configurable Module Destination:**
   - Sync engine reads `source.default_module_id`. If configured, newly discovered lessons are inserted into that module. If not configured, searches for a module matching "New Playlist Additions" before falling back to the first module.
2. **Active & Embeddable Verification:**
   - A video is marked `is_active = true` only if `isAvailable && isEmbeddable`.
   - Unembeddable or private videos are cataloged in `course_playlist_items` with `is_active = false` and `availability_status = 'unavailable'`.
3. **Database Error Handling:**
   - Every Supabase query (`select`, `insert`, `update`, `upsert`) is verified for `.error`. Any query error immediately aborts the current source sync and triggers failure tracking.
4. **Clean Success Tracking:**
   - `last_success_at` is updated ONLY when all operations for that playlist succeed without error.
   - Overall sync result returns `success: false` if any source fails.
5. **Reactivating Reappearing Videos:**
   - Reappearing videos reactivate `is_active = true` via upsert.
   - Disappearing videos are marked `is_active = false` without deleting learner progress records in `user_lesson_progress`.

---

## 5. Verification & Test Results

All quality gates passed with zero warnings or regressions:

| Suite | Tests Run | Result | Notes |
|---|---|---|---|
| `npx tsc --noEmit` | N/A | **0 errors** | Full TypeScript project typecheck passed |
| `npm run lint` | N/A | **0 errors** | Next.js and ESLint static validation passed |
| `npm test` | 8 unit + 7 HTTP | **15/15 passed** | Catalog data integrity & route availability passed |
| `npm run build` | 83 static routes | **Success** | `/courses/[slug]` pre-rendered SSG cleanly |
| `tests/25_wireshark_course_integration.spec.ts` | 16 tests | **16/16 passed** | Full Phase 17 end-to-end verification |
| `tests/23_mern_course_integration.spec.ts` | 7 tests | **7/7 passed** | Phase 15 MERN regression suite |
| `tests/24_networking_playlist_sync_and_progress.spec.ts` | 8 tests | **8/8 passed** | Phase 16 Networking regression suite |
| `tests/03_courses_and_progress.spec.ts` | 3 tests | **3/3 passed** | Core course navigation & completion suite |
| `tests/18_phase13_9_1_typography_alias.spec.ts` | 4 tests | **4/4 passed** | Typography preview suite |

**Total Playwright Tests Executed:** 38 / 38 passed.

---

## 6. Required Production Environment Variables

The project administrator must verify the following variables in **Vercel Project Settings → Environment Variables**:

1. `CRON_SECRET`: Required to authorize Vercel daily cron executions to `/api/cron/sync-youtube-playlists`.
2. `YOUTUBE_API_KEY`: Required for YouTube Data API v3 (`playlistItems.list` and `videos.list`).
3. `SUPABASE_SERVICE_ROLE_KEY`: Required for privileged background synchronization writes.
4. `NEXT_PUBLIC_SUPABASE_URL`: Public Supabase project API URL.
5. `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public Supabase client key for authenticated user progress.

---

## 7. Remaining Manual Steps for Production Release

1. **Supabase DDL Execution:**
   - Run migration `supabase/migrations/20261105020000_add_wireshark_course_and_sync_improvements.sql` in the Supabase Production SQL Editor.
2. **Review & Merge Pull Request:**
   - Review [Draft PR #8](https://github.com/arun-codex/CyberTube/pull/8).
   - Once ready for deployment, promote PR #8 from Draft to Ready for Review and merge to `main`.
