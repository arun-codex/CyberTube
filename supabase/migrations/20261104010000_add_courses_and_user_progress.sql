-- =============================================================================
-- CYBERTUBE PHASE 3B.2: COURSES & USER LESSON PROGRESS MIGRATION
-- =============================================================================
-- Description: Creates normalized tables, indexes, constraints, triggers, and
-- comprehensive Row Level Security (RLS) policies for:
-- 1. courses
-- 2. course_modules
-- 3. lessons
-- 4. user_lesson_progress
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. COURSES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  estimated_duration TEXT NOT NULL,
  total_duration_minutes INT NOT NULL DEFAULT 0 CHECK (total_duration_minutes >= 0),
  thumbnail_url TEXT,
  instructor_name TEXT NOT NULL,
  instructor_title TEXT,
  instructor_org TEXT,
  prerequisites TEXT[] DEFAULT '{}',
  learning_objectives TEXT[] DEFAULT '{}',
  domains TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index on courses
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_status ON public.courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_difficulty ON public.courses(difficulty);

-- Trigger: auto-update updated_at on courses
CREATE TRIGGER on_course_updated
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 2. COURSE MODULES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INT NOT NULL DEFAULT 1 CHECK (order_index > 0),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_course_module_order UNIQUE (course_id, order_index),
  CONSTRAINT unique_course_module_pair UNIQUE (course_id, id)
);

CREATE INDEX IF NOT EXISTS idx_course_modules_course_order ON public.course_modules(course_id, order_index);

-- -----------------------------------------------------------------------------
-- 3. LESSONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  youtube_video_id TEXT NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 0 CHECK (duration_minutes >= 0),
  order_index INT NOT NULL DEFAULT 1 CHECK (order_index > 0),
  objectives TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  skills_taught TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_course_lesson_slug UNIQUE (course_id, slug),
  CONSTRAINT unique_module_lesson_order UNIQUE (module_id, order_index),
  CONSTRAINT unique_course_lesson_pair UNIQUE (course_id, id),
  CONSTRAINT fk_lessons_course_module FOREIGN KEY (course_id, module_id)
    REFERENCES public.course_modules(course_id, id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_lessons_module_order ON public.lessons(module_id, order_index);
CREATE INDEX IF NOT EXISTS idx_lessons_course_order ON public.lessons(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_lessons_youtube_id ON public.lessons(youtube_video_id);

-- -----------------------------------------------------------------------------
-- 4. USER LESSON PROGRESS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_user_course_lesson UNIQUE (user_id, lesson_id),
  CONSTRAINT fk_progress_course_lesson FOREIGN KEY (course_id, lesson_id)
    REFERENCES public.lessons(course_id, id) ON DELETE CASCADE,
  CONSTRAINT check_completion_timestamp CHECK (
    (is_completed = TRUE AND completed_at IS NOT NULL) OR
    (is_completed = FALSE)
  )
);

CREATE INDEX IF NOT EXISTS idx_user_progress_user ON public.user_lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_course ON public.user_lesson_progress(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson ON public.user_lesson_progress(lesson_id);

-- Trigger: auto-update updated_at on user_lesson_progress
CREATE TRIGGER on_user_lesson_progress_updated
  BEFORE UPDATE ON public.user_lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- RLS: COURSES (Public Read, Admin Write)
-- -----------------------------------------------------------------------------
CREATE POLICY "Public can view published courses"
  ON public.courses FOR SELECT
  USING (status = 'published');

-- -----------------------------------------------------------------------------
-- RLS: COURSE_MODULES (Public Read for published courses)
-- -----------------------------------------------------------------------------
CREATE POLICY "Public can view modules of published courses"
  ON public.course_modules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = course_modules.course_id
      AND courses.status = 'published'
    )
  );

-- -----------------------------------------------------------------------------
-- RLS: LESSONS (Public Read for published courses)
-- -----------------------------------------------------------------------------
CREATE POLICY "Public can view lessons of published courses"
  ON public.lessons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = lessons.course_id
      AND courses.status = 'published'
    )
  );

-- -----------------------------------------------------------------------------
-- RLS: USER_LESSON_PROGRESS (Strict User Isolation)
-- -----------------------------------------------------------------------------
-- 1. SELECT Policy (combines TO authenticated with auth.uid() check)
CREATE POLICY "Users can view their own lesson progress"
  ON public.user_lesson_progress FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- 2. INSERT Policy (users can only insert rows where user_id matches auth.uid())
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

-- 3. UPDATE Policy (requires both USING and WITH CHECK to prevent reassigning ownership and enforce published course status)
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

-- 4. DELETE Policy (users can remove their own progress record)
CREATE POLICY "Users can delete their own lesson progress"
  ON public.user_lesson_progress FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- -----------------------------------------------------------------------------
-- EXPLICIT OBJECT-LEVEL GRANTS (Least Privilege)
-- -----------------------------------------------------------------------------
-- Revoke all by default on the new tables from public/anon
REVOKE ALL ON TABLE public.courses FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.course_modules FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.lessons FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.user_lesson_progress FROM PUBLIC, anon, authenticated;

-- Public read grants for course catalog
GRANT SELECT ON TABLE public.courses TO anon, authenticated;
GRANT SELECT ON TABLE public.course_modules TO anon, authenticated;
GRANT SELECT ON TABLE public.lessons TO anon, authenticated;

-- User lesson progress: only authenticated users have access (RLS enforces per-row isolation)
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.user_lesson_progress TO authenticated;


