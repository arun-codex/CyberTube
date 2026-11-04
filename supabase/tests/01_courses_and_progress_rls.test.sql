-- =============================================================================
-- CYBERTUBE AUTOMATED RLS AND DATA INTEGRITY TESTS (pgTAP)
-- File: supabase/tests/01_courses_and_progress_rls.test.sql
-- =============================================================================

BEGIN;
SELECT plan(18);

-- -----------------------------------------------------------------------------
-- 1. FIXTURE SETUP
-- -----------------------------------------------------------------------------
-- Create test roles/users (simulate Supabase auth users)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define deterministic test user UUIDs
DO $$
DECLARE
  v_user_a UUID := '11111111-1111-1111-1111-111111111111'::UUID;
  v_user_b UUID := '22222222-2222-2222-2222-222222222222'::UUID;
BEGIN
  -- Insert dummy auth users if auth.users exists
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
    INSERT INTO auth.users (id, email) VALUES
      (v_user_a, 'user_a@cybertube.test'),
      (v_user_b, 'user_b@cybertube.test')
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;

-- Insert test courses (one published, one draft)
INSERT INTO public.courses (id, slug, title, short_description, description, difficulty, status, estimated_duration, instructor_name)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'test-published-course', 'Published Course', 'Short', 'Full', 'beginner', 'published', '1h', 'Tester A'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'test-draft-course', 'Draft Course', 'Short', 'Full', 'advanced', 'draft', '2h', 'Tester B')
ON CONFLICT (id) DO NOTHING;

-- Insert test module for published course
INSERT INTO public.course_modules (id, course_id, title, order_index)
VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Module 1', 1)
ON CONFLICT (id) DO NOTHING;

-- Insert test lesson for published course
INSERT INTO public.lessons (id, course_id, module_id, slug, title, description, youtube_video_id, order_index)
VALUES
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'lesson-1', 'Lesson 1', 'dQw4w9WgXcQ', 1)
ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 2. PUBLIC & ANONYMOUS ACCESS TESTS
-- -----------------------------------------------------------------------------
-- Switch to anon role
SET LOCAL ROLE anon;
SET LOCAL "request.jwt.claims" TO '{"role": "anon"}';

-- Test 1: Anonymous can view published course
SELECT results_eq(
  $$ SELECT slug FROM public.courses WHERE slug = 'test-published-course' $$,
  $$ VALUES ('test-published-course'::TEXT) $$,
  'Anonymous role can read published courses'
);

-- Test 2: Anonymous cannot view draft course
SELECT is_empty(
  $$ SELECT slug FROM public.courses WHERE slug = 'test-draft-course' $$,
  'Anonymous role cannot read draft courses'
);

-- Test 3: Anonymous can view modules of published course
SELECT results_eq(
  $$ SELECT title FROM public.course_modules WHERE id = 'cccccccc-cccc-cccc-cccc-cccccccccccc' $$,
  $$ VALUES ('Module 1'::TEXT) $$,
  'Anonymous role can read modules of published courses'
);

-- Test 4: Anonymous can view lessons of published course
SELECT results_eq(
  $$ SELECT slug FROM public.lessons WHERE id = 'dddddddd-dddd-dddd-dddd-dddddddddddd' $$,
  $$ VALUES ('lesson-1'::TEXT) $$,
  'Anonymous role can read lessons of published courses'
);

-- Test 5: Anonymous INSERT into courses is denied
SELECT throws_ok(
  $$ INSERT INTO public.courses (slug, title, short_description, description, difficulty, estimated_duration, instructor_name)
     VALUES ('anon-course', 'Anon', 'S', 'D', 'beginner', '1h', 'Hacker') $$,
  '42501', -- permission denied
  NULL,
  'Anonymous role cannot insert courses (permission denied)'
);

-- Test 6: Anonymous SELECT on user_lesson_progress is denied (object grant check)
SELECT throws_ok(
  $$ SELECT * FROM public.user_lesson_progress $$,
  '42501', -- permission denied
  NULL,
  'Anonymous role is denied SELECT on user_lesson_progress'
);

-- Test 7: Anonymous INSERT on user_lesson_progress is denied (object grant check)
SELECT throws_ok(
  $$ INSERT INTO public.user_lesson_progress (user_id, course_id, lesson_id, is_completed)
     VALUES ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'dddddddd-dddd-dddd-dddd-dddddddddddd', true) $$,
  '42501', -- permission denied
  NULL,
  'Anonymous role is denied INSERT on user_lesson_progress'
);

-- -----------------------------------------------------------------------------
-- 3. AUTHENTICATED USER PROGRESS TESTS (USER A)
-- -----------------------------------------------------------------------------
-- Switch to authenticated User A
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}';

-- Test 8: User A can record their own progress
SELECT lives_ok(
  $$ INSERT INTO public.user_lesson_progress (user_id, course_id, lesson_id, is_completed, completed_at)
     VALUES ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'dddddddd-dddd-dddd-dddd-dddddddddddd', true, NOW()) $$,
  'Authenticated User A can insert their own lesson progress'
);

-- Test 9: User A can read their own progress
SELECT results_eq(
  $$ SELECT is_completed FROM public.user_lesson_progress WHERE lesson_id = 'dddddddd-dddd-dddd-dddd-dddddddddddd' $$,
  $$ VALUES (true) $$,
  'Authenticated User A can read their own progress row'
);

-- Test 10: User A cannot insert progress for User B (RLS WITH CHECK violation)
SELECT throws_ok(
  $$ INSERT INTO public.user_lesson_progress (user_id, course_id, lesson_id, is_completed)
     VALUES ('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'dddddddd-dddd-dddd-dddd-dddddddddddd', true) $$,
  '42501', -- RLS check policy violation
  NULL,
  'User A cannot insert progress under User B user_id'
);

-- Test 11: User A cannot insert progress for a draft course
SELECT throws_ok(
  $$ INSERT INTO public.user_lesson_progress (user_id, course_id, lesson_id, is_completed)
     VALUES ('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'dddddddd-dddd-dddd-dddd-dddddddddddd', true) $$,
  '23503', -- foreign key violation (lesson belongs to aaaaaaaa, not bbbbbbbb) or RLS
  NULL,
  'Composite FK prevents logging progress for a lesson against the wrong course'
);

-- -----------------------------------------------------------------------------
-- 4. CROSS-USER ISOLATION TESTS (USER B)
-- -----------------------------------------------------------------------------
-- Switch to authenticated User B
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "22222222-2222-2222-2222-222222222222", "role": "authenticated"}';

-- Test 12: User B cannot see User A progress
SELECT is_empty(
  $$ SELECT * FROM public.user_lesson_progress WHERE user_id = '11111111-1111-1111-1111-111111111111' $$,
  'User B cannot read User A progress (RLS isolation)'
);

-- Test 13: User B cannot update User A progress
SELECT lives_ok(
  $$ UPDATE public.user_lesson_progress SET is_completed = false WHERE user_id = '11111111-1111-1111-1111-111111111111' $$,
  'User B update command executes without throwing error'
);

-- Test 14: Confirm User A progress was NOT modified by User B's update
SELECT is_empty(
  $$ SELECT * FROM public.user_lesson_progress WHERE user_id = '22222222-2222-2222-2222-222222222222' $$,
  'User B zero rows modified or visible'
);

-- Test 15: User B cannot delete User A progress
SELECT lives_ok(
  $$ DELETE FROM public.user_lesson_progress WHERE user_id = '11111111-1111-1111-1111-111111111111' $$,
  'User B delete command executes without throwing error'
);

-- -----------------------------------------------------------------------------
-- 5. REFERENTIAL INTEGRITY TESTS
-- -----------------------------------------------------------------------------
SET LOCAL ROLE postgres;

-- Test 16: Lesson cannot reference a module from a different course (Composite FK)
INSERT INTO public.courses (id, slug, title, short_description, description, difficulty, estimated_duration, instructor_name)
VALUES ('cccccccc-1111-2222-3333-444444444444', 'course-x', 'Course X', 'S', 'D', 'beginner', '1h', 'Teacher X')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.course_modules (id, course_id, title, order_index)
VALUES ('mmmmmmmm-1111-2222-3333-444444444444', 'cccccccc-1111-2222-3333-444444444444', 'Module in Course X', 1)
ON CONFLICT (id) DO NOTHING;

SELECT throws_ok(
  $$ INSERT INTO public.lessons (course_id, module_id, slug, title, description, youtube_video_id, order_index)
     VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'mmmmmmmm-1111-2222-3333-444444444444', 'mismatched-lesson', 'T', 'D', 'dQw4w9WgXcQ', 2) $$,
  '23503', -- foreign key violation
  NULL,
  'Composite FK prevents lesson from referencing a module belonging to another course'
);

-- Test 17: Unique order_index within the same module is enforced
SELECT throws_ok(
  $$ INSERT INTO public.lessons (course_id, module_id, slug, title, description, youtube_video_id, order_index)
     VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'duplicate-order-lesson', 'T', 'D', 'dQw4w9WgXcQ', 1) $$,
  '23505', -- unique violation
  NULL,
  'Unique constraint prevents duplicate lesson order_index within the same module'
);

-- Test 18: Check constraint enforces completed_at when is_completed = true
SELECT throws_ok(
  $$ INSERT INTO public.user_lesson_progress (user_id, course_id, lesson_id, is_completed, completed_at)
     VALUES ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'dddddddd-dddd-dddd-dddd-dddddddddddd', true, NULL) $$,
  '23514', -- check constraint violation
  NULL,
  'Check constraint check_completion_timestamp enforces completed_at when is_completed is true'
);

ROLLBACK;

