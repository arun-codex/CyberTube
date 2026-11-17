-- ============================================================================
-- Migration: 20261117120000_cloud_sync_and_saved_items.sql
-- Description: Additive Cloud Synchronization & Reusable Progress Infrastructure
--
-- Provides:
--  1. public.user_saved_items: Typed bookmarks supporting resources, courses,
--     lessons, labs, and study documents with metadata and strict RLS.
--  2. public.user_generic_progress: Reusable progress tracking for future courses,
--     modules, lessons, and interactive practical labs.
--  3. RPC functions: save_generic_progress for idempotent
--     cross-device synchronization without duplication.
--
-- Safety Guarantees:
--  - Strictly ADDITIVE (IF NOT EXISTS).
--  - Zero destructive changes to existing tables (profiles, bookmarks, courses,
--    lessons, user_lesson_progress, study_documents, user_study_progress).
--  - Strict RLS ensures complete user isolation.
--  - Must NOT be executed against production without separate explicit authorization.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Table: public.user_saved_items (Additive Typed Bookmarks)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_saved_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('resource', 'course', 'lesson', 'lab', 'study_document')),
  item_id TEXT NOT NULL,
  title TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (user_id, item_type, item_id)
);

CREATE INDEX IF NOT EXISTS idx_user_saved_items_user_type
  ON public.user_saved_items (user_id, item_type);

CREATE INDEX IF NOT EXISTS idx_user_saved_items_created
  ON public.user_saved_items (user_id, created_at DESC);

-- Enable RLS
ALTER TABLE public.user_saved_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_saved_items' AND policyname = 'Users can view their own saved items'
  ) THEN
    CREATE POLICY "Users can view their own saved items"
      ON public.user_saved_items FOR SELECT TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_saved_items' AND policyname = 'Users can insert their own saved items'
  ) THEN
    CREATE POLICY "Users can insert their own saved items"
      ON public.user_saved_items FOR INSERT TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_saved_items' AND policyname = 'Users can update their own saved items'
  ) THEN
    CREATE POLICY "Users can update their own saved items"
      ON public.user_saved_items FOR UPDATE TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_saved_items' AND policyname = 'Users can delete their own saved items'
  ) THEN
    CREATE POLICY "Users can delete their own saved items"
      ON public.user_saved_items FOR DELETE TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- ----------------------------------------------------------------------------
-- 2. Table: public.user_generic_progress (Reusable Course & Lab Progress)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_generic_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('course', 'module', 'lesson', 'lab')),
  entity_id TEXT NOT NULL,
  progress_percent NUMERIC(5,2) NOT NULL DEFAULT 0.00 CHECK (progress_percent >= 0.00 AND progress_percent <= 100.00),
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  state_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (user_id, entity_type, entity_id)
);

CREATE INDEX IF NOT EXISTS idx_user_generic_progress_lookup
  ON public.user_generic_progress (user_id, entity_type, entity_id);

-- Enable RLS
ALTER TABLE public.user_generic_progress ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_generic_progress' AND policyname = 'Users can view their own generic progress'
  ) THEN
    CREATE POLICY "Users can view their own generic progress"
      ON public.user_generic_progress FOR SELECT TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_generic_progress' AND policyname = 'Users can insert their own generic progress'
  ) THEN
    CREATE POLICY "Users can insert their own generic progress"
      ON public.user_generic_progress FOR INSERT TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_generic_progress' AND policyname = 'Users can update their own generic progress'
  ) THEN
    CREATE POLICY "Users can update their own generic progress"
      ON public.user_generic_progress FOR UPDATE TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- ----------------------------------------------------------------------------
-- 3. Stored Procedure: save_generic_progress (Idempotent Progress Writer)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.save_generic_progress(
  p_entity_type TEXT,
  p_entity_id TEXT,
  p_percent NUMERIC,
  p_completed BOOLEAN,
  p_state JSONB DEFAULT '{}'::jsonb
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_result JSONB;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthenticated';
  END IF;

  -- Assessment & Certification Protection: Graded exams MUST remain server-authoritative
  IF p_entity_type IN ('assessment', 'quiz', 'capstone', 'certification') THEN
    RAISE EXCEPTION 'Assessments and quizzes require server-authoritative evaluation and cannot be self-reported.';
  END IF;

  INSERT INTO public.user_generic_progress (
    user_id,
    entity_type,
    entity_id,
    progress_percent,
    is_completed,
    state_data,
    completed_at,
    updated_at
  ) VALUES (
    v_user_id,
    p_entity_type,
    p_entity_id,
    LEAST(100.00, GREATEST(0.00, p_percent)),
    p_completed,
    COALESCE(p_state, '{}'::jsonb),
    CASE WHEN p_completed THEN timezone('utc'::text, now()) ELSE NULL END,
    timezone('utc'::text, now())
  )
  ON CONFLICT (user_id, entity_type, entity_id)
  DO UPDATE SET
    progress_percent = GREATEST(public.user_generic_progress.progress_percent, LEAST(100.00, GREATEST(0.00, EXCLUDED.progress_percent))),
    is_completed = public.user_generic_progress.is_completed OR EXCLUDED.is_completed,
    state_data = public.user_generic_progress.state_data || EXCLUDED.state_data,
    completed_at = COALESCE(public.user_generic_progress.completed_at, EXCLUDED.completed_at),
    updated_at = timezone('utc'::text, now())
  RETURNING to_jsonb(public.user_generic_progress.*) INTO v_result;

  RETURN v_result;
END;
$$;

-- Explicit Data API privileges; RLS remains the authorization boundary.
REVOKE ALL ON public.user_saved_items, public.user_generic_progress FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_saved_items TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_generic_progress TO authenticated;
REVOKE ALL ON FUNCTION public.save_generic_progress(TEXT, TEXT, NUMERIC, BOOLEAN, JSONB) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_generic_progress(TEXT, TEXT, NUMERIC, BOOLEAN, JSONB) TO authenticated;
