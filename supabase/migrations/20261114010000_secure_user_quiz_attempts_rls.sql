-- =============================================================================
-- CYBERTUBE: SECURE USER QUIZ ATTEMPTS RLS & REVOKE DIRECT CLIENT INSERT
-- =============================================================================
-- Migration: 20261114010000_secure_user_quiz_attempts_rls.sql
-- Description:
-- 1. Drops the client-facing INSERT policy on public.user_quiz_attempts.
-- 2. Revokes INSERT, UPDATE, DELETE privileges on public.user_quiz_attempts from 'authenticated' and 'anon'.
-- 3. Grants SELECT-only privilege to 'authenticated' users so they can read their own graded attempts.
-- 4. Ensures only the server-side service-role client (createAdminClient) can record trusted quiz results.
-- 5. Adds integrity constraint: correct_count <= total_questions.
-- =============================================================================

-- 1. Drop insecure client INSERT policy if present
DROP POLICY IF EXISTS "Users can record their own quiz attempts" ON public.user_quiz_attempts;

-- 2. Ensure SELECT policy exists so authenticated users can view their own attempt history
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'user_quiz_attempts' AND policyname = 'Users can view their own quiz attempts'
  ) THEN
    CREATE POLICY "Users can view their own quiz attempts"
      ON public.user_quiz_attempts FOR SELECT
      TO authenticated
      USING ((SELECT auth.uid()) = user_id);
  END IF;
END $$;

-- 3. Revoke all modification privileges from client roles
REVOKE INSERT, UPDATE, DELETE ON TABLE public.user_quiz_attempts FROM authenticated;
REVOKE ALL ON TABLE public.user_quiz_attempts FROM anon;

-- 4. Grant SELECT only to authenticated users
GRANT SELECT ON TABLE public.user_quiz_attempts TO authenticated;

-- 5. Explicitly grant ALL privileges on table and sequence to service_role for server grading
GRANT ALL ON TABLE public.user_quiz_attempts TO service_role;

-- 6. Add integrity check constraint if not already present
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'chk_user_quiz_attempts_correct_count_limit'
  ) THEN
    ALTER TABLE public.user_quiz_attempts
      ADD CONSTRAINT chk_user_quiz_attempts_correct_count_limit
      CHECK (correct_count <= total_questions);
  END IF;
END $$;
