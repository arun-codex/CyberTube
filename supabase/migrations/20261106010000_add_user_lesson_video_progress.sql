-- Migration: 20261106010000_add_user_lesson_video_progress.sql
-- Description: Creates the user_lesson_video_progress table to track independent per-video watch progress
-- with Row Level Security (RLS) policies scoped strictly to authenticated users.

CREATE TABLE IF NOT EXISTS public.user_lesson_video_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id text NOT NULL,
  module_id text,
  lesson_id text NOT NULL,
  video_id text NOT NULL,
  last_watched_seconds integer NOT NULL DEFAULT 0 CHECK (last_watched_seconds >= 0),
  duration_seconds integer NOT NULL DEFAULT 0 CHECK (duration_seconds >= 0),
  completion_percentage integer NOT NULL DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  is_completed boolean NOT NULL DEFAULT false,
  last_watched_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_lesson_video_progress_unique_user_video UNIQUE (user_id, course_id, lesson_id, video_id)
);

-- Indexing for fast lookups by user, course, and lesson
CREATE INDEX IF NOT EXISTS idx_user_lesson_video_progress_user_course
  ON public.user_lesson_video_progress (user_id, course_id);

CREATE INDEX IF NOT EXISTS idx_user_lesson_video_progress_course_lesson
  ON public.user_lesson_video_progress (course_id, lesson_id);

CREATE INDEX IF NOT EXISTS idx_user_lesson_video_progress_video
  ON public.user_lesson_video_progress (video_id);

-- Enable Row Level Security
ALTER TABLE public.user_lesson_video_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Authenticated users can only read, insert, update, or delete their own video progress
DROP POLICY IF EXISTS "Users can view own video progress" ON public.user_lesson_video_progress;
CREATE POLICY "Users can view own video progress"
  ON public.user_lesson_video_progress
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own video progress" ON public.user_lesson_video_progress;
CREATE POLICY "Users can insert own video progress"
  ON public.user_lesson_video_progress
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own video progress" ON public.user_lesson_video_progress;
CREATE POLICY "Users can update own video progress"
  ON public.user_lesson_video_progress
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own video progress" ON public.user_lesson_video_progress;
CREATE POLICY "Users can delete own video progress"
  ON public.user_lesson_video_progress
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

