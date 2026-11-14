-- Add a covering index for the course_id foreign key on quiz attempts.
-- The user/course composite index cannot efficiently cover course_id-only FK checks.
CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_course
  ON public.user_quiz_attempts(course_id);
