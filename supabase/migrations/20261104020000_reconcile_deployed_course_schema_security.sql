-- =============================================================================
-- CYBERTUBE PHASE 3B.3: RECONCILE DEPLOYED COURSE SCHEMA & SECURITY HARDENING
-- Migration: 20261104020000_reconcile_deployed_course_schema_security.sql
-- Description:
-- 1. Relational integrity hardening (composite foreign keys, module-local ordering).
-- 2. Foreign key performance indexing.
-- 3. Row Level Security policy hardening (published course status check on update).
-- 4. Explicit table ACL grants (least privilege for anon and authenticated).
-- 5. Trigger function security hardening:
--    - handle_updated_at: SECURITY INVOKER, SET search_path = pg_catalog.
--    - handle_new_user: SECURITY DEFINER, SET search_path = pg_catalog, schema-qualified public.profiles.
--    - rls_auto_enable: SET search_path = pg_catalog.
-- 6. Postgres role default privileges hardening for future public tables, functions, sequences.
-- =============================================================================

BEGIN;

-- =============================================================================
-- 1. RELATIONAL INTEGRITY & CONSTRAINTS (IDEMPOTENT)
-- =============================================================================

-- 1.1 Add UNIQUE(course_id, id) to course_modules if absent (required for composite FK)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.course_modules'::regclass
      AND conname = 'unique_course_module_pair'
  ) THEN
    ALTER TABLE public.course_modules
      ADD CONSTRAINT unique_course_module_pair UNIQUE (course_id, id);
  END IF;
END $$;

-- 1.2 Add composite FK from lessons(course_id, module_id) to course_modules(course_id, id)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.lessons'::regclass
      AND conname = 'fk_lessons_course_module'
  ) THEN
    -- Drop old single-column FK if present to clean up
    IF EXISTS (
      SELECT 1 FROM pg_constraint
      WHERE conrelid = 'public.lessons'::regclass
        AND conname = 'lessons_module_id_fkey'
    ) THEN
      ALTER TABLE public.lessons DROP CONSTRAINT lessons_module_id_fkey;
    END IF;

    ALTER TABLE public.lessons
      ADD CONSTRAINT fk_lessons_course_module
      FOREIGN KEY (course_id, module_id)
      REFERENCES public.course_modules(course_id, id)
      ON DELETE CASCADE;
  END IF;
END $$;

-- 1.3 Replace course-wide lesson ordering with module-scoped ordering
DO $$
BEGIN
  -- Drop course-wide ordering constraint if present
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.lessons'::regclass
      AND conname = 'unique_course_lesson_order'
  ) THEN
    ALTER TABLE public.lessons DROP CONSTRAINT unique_course_lesson_order;
  END IF;

  -- Add module-scoped ordering constraint if absent
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.lessons'::regclass
      AND conname = 'unique_module_lesson_order'
  ) THEN
    ALTER TABLE public.lessons
      ADD CONSTRAINT unique_module_lesson_order UNIQUE (module_id, order_index);
  END IF;
END $$;

-- 1.4 Add UNIQUE(course_id, id) to lessons if absent (required for progress composite FK)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.lessons'::regclass
      AND conname = 'unique_course_lesson_pair'
  ) THEN
    ALTER TABLE public.lessons
      ADD CONSTRAINT unique_course_lesson_pair UNIQUE (course_id, id);
  END IF;
END $$;

-- 1.5 Add composite progress-to-lesson foreign key if absent
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.user_lesson_progress'::regclass
      AND conname = 'fk_progress_course_lesson'
  ) THEN
    ALTER TABLE public.user_lesson_progress
      ADD CONSTRAINT fk_progress_course_lesson
      FOREIGN KEY (course_id, lesson_id)
      REFERENCES public.lessons(course_id, id)
      ON DELETE CASCADE;
  END IF;
END $$;

-- 1.6 Add completion timestamp consistency check constraint if absent
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.user_lesson_progress'::regclass
      AND conname = 'check_completion_timestamp'
  ) THEN
    ALTER TABLE public.user_lesson_progress
      ADD CONSTRAINT check_completion_timestamp CHECK (
        (is_completed = TRUE AND completed_at IS NOT NULL) OR
        (is_completed = FALSE AND completed_at IS NULL)
      );
  END IF;
END $$;

-- =============================================================================
-- 2. PERFORMANCE: INDEX UNINDEXED FOREIGN KEYS
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_fk_course_modules_course_id
  ON public.course_modules(course_id);

CREATE INDEX IF NOT EXISTS idx_fk_lessons_course_id
  ON public.lessons(course_id);

CREATE INDEX IF NOT EXISTS idx_fk_lessons_module_id
  ON public.lessons(module_id);

CREATE INDEX IF NOT EXISTS idx_fk_user_progress_user_id
  ON public.user_lesson_progress(user_id);

CREATE INDEX IF NOT EXISTS idx_fk_user_progress_course_id
  ON public.user_lesson_progress(course_id);

CREATE INDEX IF NOT EXISTS idx_fk_user_progress_lesson_id
  ON public.user_lesson_progress(lesson_id);

-- =============================================================================
-- 3. RLS POLICIES HARDENING (INSERT & UPDATE)
-- =============================================================================

-- Ensure RLS is enabled on all four course tables
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;

-- Recreate INSERT policy with owner check and published-course check
DROP POLICY IF EXISTS "Users can record their own lesson progress" ON public.user_lesson_progress;

CREATE POLICY "Users can record their own lesson progress"
  ON public.user_lesson_progress FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT auth.uid()) = user_id
    AND EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = user_lesson_progress.course_id
      AND courses.status = 'published'
    )
  );

-- Recreate UPDATE policy with owner check in USING and WITH CHECK + published-course check
DROP POLICY IF EXISTS "Users can update their own lesson progress" ON public.user_lesson_progress;

CREATE POLICY "Users can update their own lesson progress"
  ON public.user_lesson_progress FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK (
    (SELECT auth.uid()) = user_id
    AND EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = user_lesson_progress.course_id
      AND courses.status = 'published'
    )
  );

-- =============================================================================
-- 4. TABLE PERMISSIONS & ACLS (LEAST PRIVILEGE)
-- =============================================================================

-- Revoke dangerous and unnecessary privileges (TRUNCATE, REFERENCES, TRIGGER, ALL)
REVOKE ALL ON TABLE public.courses FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.course_modules FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.lessons FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.user_lesson_progress FROM PUBLIC, anon, authenticated;

-- Public Catalog tables: Read-only for anon and authenticated
GRANT SELECT ON TABLE public.courses TO anon, authenticated;
GRANT SELECT ON TABLE public.course_modules TO anon, authenticated;
GRANT SELECT ON TABLE public.lessons TO anon, authenticated;

-- User lesson progress: strictly authenticated only (no anon privileges)
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.user_lesson_progress TO authenticated;

-- Preserve service_role administrative capabilities if role exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
    GRANT ALL ON TABLE public.courses TO service_role;
    GRANT ALL ON TABLE public.course_modules TO service_role;
    GRANT ALL ON TABLE public.lessons TO service_role;
    GRANT ALL ON TABLE public.user_lesson_progress TO service_role;
  END IF;
END $$;

-- =============================================================================
-- 5. TRIGGER FUNCTION HARDENING (LEAST PRIVILEGE & SEARCH_PATH)
-- =============================================================================

-- 5.1 public.handle_updated_at()
-- Security: Changed to SECURITY INVOKER (runs with caller's permissions).
-- Search path pinned to pg_catalog. Trigger-only function.
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = pg_catalog
AS $$
BEGIN
  NEW.updated_at = clock_timestamp();
  RETURN NEW;
END;
$$;

-- Revoke public execution; grant execution strictly to authenticated and postgres (and service_role)
REVOKE ALL ON FUNCTION public.handle_updated_at() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.handle_updated_at() TO authenticated, postgres;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
    GRANT EXECUTE ON FUNCTION public.handle_updated_at() TO service_role;
  END IF;
END $$;

-- 5.2 public.handle_new_user()
-- Security: Retained SECURITY DEFINER because it is invoked by the auth trigger on auth.users
-- to insert a profile row into public.profiles on signup.
-- Search path pinned to pg_catalog; explicitly schema-qualifies public.profiles.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'display_name',
      split_part(NEW.email, '@', 1)
    ),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Revoke execute from untrusted roles (cannot be called via RPC/PostgREST)
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Grant execution to internal auth roles and postgres
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'supabase_auth_admin') THEN
    GRANT EXECUTE ON FUNCTION public.handle_new_user() TO supabase_auth_admin;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
    GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
  END IF;
  GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres;
END $$;

-- 5.3 public.rls_auto_enable()
-- Security: Preserves DDL event-trigger functionality; sets search_path = pg_catalog.
-- Revokes execution from untrusted API roles.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'rls_auto_enable'
  ) THEN
    EXECUTE 'ALTER FUNCTION public.rls_auto_enable() SET search_path = pg_catalog;';
    EXECUTE 'REVOKE ALL ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;';
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
      EXECUTE 'GRANT EXECUTE ON FUNCTION public.rls_auto_enable() TO service_role;';
    END IF;
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.rls_auto_enable() TO postgres;';
  END IF;
END $$;

-- =============================================================================
-- 6. DEFAULT PRIVILEGES HARDENING FOR OBJECTS CREATED BY ROLE 'postgres'
-- =============================================================================
-- Note: Default privileges for supabase_admin in public are managed by the Supabase
-- platform infrastructure and cannot generally be altered by project users.
-- We apply least-privilege default privileges strictly for role postgres.

-- 6.1 Future Tables: Revoke all by default from PUBLIC, anon, authenticated, service_role
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE ALL ON TABLES FROM PUBLIC, anon, authenticated, service_role;

-- 6.2 Future Functions: Revoke EXECUTE from PUBLIC globally for functions created by postgres
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC, anon, authenticated;

-- 6.3 Future Sequences: Revoke usage from PUBLIC, anon, authenticated
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE ALL ON SEQUENCES FROM PUBLIC, anon, authenticated;

COMMIT;
