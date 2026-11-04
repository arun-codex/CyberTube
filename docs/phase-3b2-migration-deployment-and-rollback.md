# CyberTube Phase 3B.2: Migration Deployment & Rollback Guide

## 1. Migration Specification

- **File:** `supabase/migrations/20261104010000_add_courses_and_user_progress.sql`
- **Dependency:** `supabase/migrations/20261104000000_initial_schema.sql` (requires `public.handle_updated_at()` trigger function and `auth.users`).
- **Target Tables Created:**
  1. `public.courses`
  2. `public.course_modules`
  3. `public.lessons`
  4. `public.user_lesson_progress`

---

## 2. Pre-Deployment Checks

Before running the migration against the live Supabase project:

1. **Verify Supabase Auth & Project Connectivity:**
   ```bash
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```
2. **Verify CLI & Advisor Checks:**
   ```bash
   npx supabase db lint
   ```
3. **Verify Existing Schema State:**
   Ensure `20261104000000_initial_schema.sql` has either been applied or is applied in the same migration pipeline.

---

## 3. Deployment Procedure

### Option A: Via Supabase CLI (Recommended)
```bash
# Push pending migrations to the linked remote database
npx supabase db push
```

### Option B: Via Supabase Dashboard SQL Editor
1. Open the Supabase Management Console -> SQL Editor.
2. Paste the contents of `supabase/migrations/20261104010000_add_courses_and_user_progress.sql`.
3. Execute within a transaction block (`BEGIN; ... COMMIT;`).

---

## 4. Rollback Procedure

If a rollback is required, execute the following reversible SQL script:

```sql
BEGIN;

-- Drop RLS policies
DROP POLICY IF EXISTS "Users can delete their own lesson progress" ON public.user_lesson_progress;
DROP POLICY IF EXISTS "Users can update their own lesson progress" ON public.user_lesson_progress;
DROP POLICY IF EXISTS "Users can record their own lesson progress" ON public.user_lesson_progress;
DROP POLICY IF EXISTS "Users can view their own lesson progress" ON public.user_lesson_progress;

DROP POLICY IF EXISTS "Public can view lessons of published courses" ON public.lessons;
DROP POLICY IF EXISTS "Public can view modules of published courses" ON public.course_modules;
DROP POLICY IF EXISTS "Public can view published courses" ON public.courses;

-- Drop triggers
DROP TRIGGER IF EXISTS on_user_lesson_progress_updated ON public.user_lesson_progress;
DROP TRIGGER IF EXISTS on_course_updated ON public.courses;

-- Drop tables in reverse order of foreign key dependency
DROP TABLE IF EXISTS public.user_lesson_progress CASCADE;
DROP TABLE IF EXISTS public.lessons CASCADE;
DROP TABLE IF EXISTS public.course_modules CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;

COMMIT;
```

---

## 5. Security & Verification Post-Deployment

After deployment, verify that:
1. `SELECT * FROM public.courses WHERE status = 'published'` returns courses for anonymous (`anon`) role.
2. `SELECT * FROM public.user_lesson_progress` returns 0 rows for anonymous visitors.
3. Authenticated queries to `user_lesson_progress` only return rows matching `auth.uid() = user_id`.
4. The client `CloudCourseProgressService` connects, reads, and seamlessly syncs without error.

