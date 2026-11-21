-- F01 (PROPOSED ONLY): CyberTube profiles owner-only SELECT policy.
-- DO NOT RUN IN PRODUCTION without test-account QA, dependency review and rollback approval.
-- 2026-11-21 evidence: public.profiles SELECT policy "Public profiles are readable by everyone"
-- grants anon SELECT and USING(true) to PUBLIC.
--
-- Before approval: review ALL client queries joining profiles, public display_name
-- expectations, auth account/settings, avatars, invitation flows, and external consumers.
-- Apply with the Supabase migration workflow only after security review.
BEGIN;
  DROP POLICY IF EXISTS "Public profiles are readable by everyone" ON public.profiles;
  DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
  CREATE POLICY "Users can read their own profile"
    ON public.profiles
    FOR SELECT TO authenticated
    USING ((SELECT auth.uid()) = id);
  REVOKE SELECT ON TABLE public.profiles FROM anon;
COMMIT;

-- Rollback to prior public policy ONLY if deliberately approved as an emergency
-- compatibility decision. This re-opens the original privacy concern:
-- BEGIN;
--   DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
--   CREATE POLICY "Public profiles are readable by everyone"
--     ON public.profiles FOR SELECT TO public USING (true);
--   GRANT SELECT ON TABLE public.profiles TO anon;
-- COMMIT;
--
-- Test evidence required after migration:
-- 1) anon SELECT: cannot return another user's profile
-- 2) authenticated user A SELECT own record: succeeds
-- 3) authenticated user A SELECT user B: no rows
-- 4) authenticated user A UPDATE own profile and avatar: still succeeds
-- 5) public-facing profile UI and ownership-dependent joins: graceful behavior
-- 6) service-role approved admin actions: continue to work
