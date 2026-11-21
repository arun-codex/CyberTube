-- F01 REVIEW ONLY: DO NOT EXECUTE AGAINST PRODUCTION WITHOUT APPROVAL.
-- CyberTube / Supabase: private profile ownership policy.
-- Prepared after inspecting the 2026-11-21 production profile policies.
-- Review user-facing profile lookups, account/profile editing and member
-- directory behavior before applying. Test with 2 distinct authenticated
-- test users and an unauthenticated client in staging.
--
-- Existing permissive policy name: "Public profiles are readable by everyone"
-- Existing predicate: USING (true). This grants every matching role access
-- to all rows permitted by table-level grants.
--
-- Recommended controlled change:
BEGIN;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are readable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;

CREATE POLICY "Users can read their own profile"
ON public.profiles FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = id);

-- Defense in depth: keep anonymous clients from direct table SELECT.
REVOKE SELECT ON public.profiles FROM anon;

COMMIT;

-- Acceptance tests to perform in staging (not in this file):
-- 1. anon cannot SELECT any profile row or preference column.
-- 2. authenticated user A can read own profile, but not B.
-- 3. authenticated user B can read own profile, but not A.
-- 4. user A's existing INSERT/UPDATE policy still works.
-- 5. admin service operations remain server-only.
-- 6. no public UI relies on whole-row public profile SELECT.
-- 7. permissions, policies, and intended public profile fields are reviewed
--    for any separately published, narrow view.
