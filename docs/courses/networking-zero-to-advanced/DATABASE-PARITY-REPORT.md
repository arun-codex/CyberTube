# CyberTube Networking Course — Database & Repository Parity Report

> **Target Database**: Supabase Managed PostgreSQL 17.4.1 (`iwcbuvutqhwxgovkecfa`)  
> **Target Course**: `networking-for-cybersecurity-zero-to-advanced` (`e0000000-0000-4000-8000-000000000001`)  
> **Parity Audit Date**: 2026-11-25  

---

## 1. Parity Metrics Overview

| Metric | TypeScript Definition | Supabase Target DB | Parity Status |
|---|:---:|:---:|:---:|
| **Total Modules** | 30 | 30 | **100% Match** |
| **Total Lessons** | 120 | 120 | **100% Match** |
| **Unique Video IDs** | 120 | 120 | **100% Match (0 Duplicates)** |
| **Total Video Minutes** | 2,652 mins | 2,652 mins | **100% Match** |
| **Total Video Seconds** | 159,120 s | 159,120 s | **100% Match** |
| **Practical Lab PCAPs** | 30 Local (`/pcaps/networking/`) | 30 Local (`/pcaps/networking/`) | **100% Match (0 Broken Links)** |
| **User Progress Rows** | 57 preserved | 57 preserved | **100% Match (Zero Data Loss)** |

---

## 2. Remediation Migration Details

- **Script**: `supabase/migrations/20261125000000_phase2_networking_course_remediation.sql`
- **Transactions**: Fully atomic `BEGIN ... COMMIT` block updating `public.courses` and all 120 records in `public.lessons` using immutable UUIDs.
- **User Progress Safety**: Updates only `youtube_video_id`, `duration_minutes`, `description`, and `updated_at`. Never alters `lesson_id` foreign keys or deletes rows from `public.user_lesson_progress`.