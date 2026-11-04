# CyberTube Phase 3B: Course & Lesson Schema Design Document

## Status: Proposed / Future Architecture (Not yet deployed to Supabase)

> **Important Note:** In accordance with Phase 3B.1 safety restrictions, no DDL or database migrations have been executed against the live database. This document serves as the target normalized relational schema for course and lesson models when Supabase table migration is approved.

---

## 1. Relational Entities & ER Diagram

```
+-------------------------------------------------------------+
|                          courses                            |
+-------------------------------------------------------------+
| id                     UUID PRIMARY KEY                     |
| slug                   TEXT UNIQUE NOT NULL                 |
| title                  TEXT NOT NULL                        |
| short_description      TEXT NOT NULL                        |
| description            TEXT NOT NULL                        |
| domains                TEXT[] NOT NULL                      |
| tags                   TEXT[] NOT NULL                      |
| difficulty             TEXT CHECK (beginner/intermed/adv)   |
| thumbnail_url          TEXT                                 |
| estimated_duration     TEXT                                 |
| total_duration_minutes INT DEFAULT 0                        |
| instructor_name        TEXT NOT NULL                        |
| instructor_title       TEXT                                 |
| instructor_org         TEXT                                 |
| prerequisites          TEXT[] DEFAULT '{}'                  |
| learning_objectives    TEXT[] DEFAULT '{}'                  |
| featured               BOOLEAN DEFAULT FALSE                |
| status                 TEXT DEFAULT 'published'             |
| created_at             TIMESTAMPTZ DEFAULT NOW()            |
| updated_at             TIMESTAMPTZ DEFAULT NOW()            |
+-------------------------------------------------------------+
                               | 1
                               |
                               | has many (ordered)
                               v N
+-------------------------------------------------------------+
|                      course_modules                         |
+-------------------------------------------------------------+
| id                     UUID PRIMARY KEY                     |
| course_id              UUID REFERENCES courses(id) CASCADE  |
| title                  TEXT NOT NULL                        |
| description            TEXT                                 |
| display_order          INT NOT NULL                         |
| created_at             TIMESTAMPTZ DEFAULT NOW()            |
+-------------------------------------------------------------+
                               | 1
                               |
                               | has many (ordered)
                               v N
+-------------------------------------------------------------+
|                          lessons                            |
+-------------------------------------------------------------+
| id                     UUID PRIMARY KEY                     |
| module_id              UUID REFERENCES course_modules(id)   |
| course_id              UUID REFERENCES courses(id) CASCADE  |
| slug                   TEXT NOT NULL                        |
| title                  TEXT NOT NULL                        |
| description            TEXT NOT NULL                        |
| youtube_video_id       TEXT NOT NULL                        |
| duration_minutes       INT DEFAULT 0                        |
| display_order          INT NOT NULL                         |
| objectives             TEXT[] DEFAULT '{}'                  |
| tags                   TEXT[] DEFAULT '{}'                  |
| skills_taught          TEXT[] DEFAULT '{}'                  |
| created_at             TIMESTAMPTZ DEFAULT NOW()            |
| CONSTRAINT unique_course_lesson_slug UNIQUE(course_id, slug)|
+-------------------------------------------------------------+
                               | 1
                               |
                               | user progress tracking
                               v N
+-------------------------------------------------------------+
|                   user_lesson_progress                      |
+-------------------------------------------------------------+
| id                     UUID PRIMARY KEY                     |
| user_id                UUID REFERENCES auth.users(id) CASCADE|
| course_id              UUID REFERENCES courses(id) CASCADE  |
| lesson_id              UUID REFERENCES lessons(id) CASCADE  |
| is_completed           BOOLEAN DEFAULT FALSE                |
| last_playback_seconds  INT DEFAULT 0                        |
| completed_at           TIMESTAMPTZ                          |
| updated_at             TIMESTAMPTZ DEFAULT NOW()            |
| CONSTRAINT unique_user_lesson UNIQUE(user_id, lesson_id)    |
+-------------------------------------------------------------+
```

---

## 2. DDL Specification

```sql
-- 1. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  domains TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  thumbnail_url TEXT,
  estimated_duration TEXT,
  total_duration_minutes INT DEFAULT 0,
  instructor_name TEXT NOT NULL,
  instructor_title TEXT,
  instructor_org TEXT,
  prerequisites TEXT[] DEFAULT '{}',
  learning_objectives TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. COURSE MODULES TABLE
CREATE TABLE IF NOT EXISTS public.course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  display_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  youtube_video_id TEXT NOT NULL,
  duration_minutes INT DEFAULT 0,
  display_order INT NOT NULL DEFAULT 1,
  objectives TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  skills_taught TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_course_lesson_slug UNIQUE (course_id, slug)
);

-- 4. USER LESSON PROGRESS TABLE (Replaces provisional local adapter)
CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  last_playback_seconds INT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_user_lesson UNIQUE (user_id, lesson_id)
);
```

---

## 3. Row Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;

-- 1. Courses, Modules, Lessons: Public Read
CREATE POLICY "Public users can view published courses"
  ON public.courses FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public users can view course modules"
  ON public.course_modules FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.courses WHERE id = course_modules.course_id AND status = 'published'
  ));

CREATE POLICY "Public users can view lessons"
  ON public.lessons FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.courses WHERE id = lessons.course_id AND status = 'published'
  ));

-- 2. User Lesson Progress: Strict per-user isolation
CREATE POLICY "Users can view their own lesson progress"
  ON public.user_lesson_progress FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert their own lesson progress"
  ON public.user_lesson_progress FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own lesson progress"
  ON public.user_lesson_progress FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);
```

