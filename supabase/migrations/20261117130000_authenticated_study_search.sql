-- ============================================================================
-- Migration: 20261117130000_authenticated_study_search.sql
-- Description: Authenticated Server-Side Study Document Search Infrastructure
--
-- Provides:
--  1. public.study_document_page_text: Normalized page text repository
--     strictly protected by Row-Level Security (RLS).
--  2. Text search index (GIN) for fast keyword matching.
--  3. RPC search_study_page_text for server-authoritative query resolution.
--
-- Security Guarantees:
--  - Zero extracted text in public GitHub or client bundles.
--  - Public/Anonymous users CANNOT read page text (RLS denied).
--  - Only published, non-retired study documents are searchable.
--  - Strictly ADDITIVE (IF NOT EXISTS).
--  - DO NOT apply to production without separate explicit authorization.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Table: public.study_document_page_text
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.study_document_page_text (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES public.study_documents(id) ON DELETE CASCADE,
  page_number INTEGER NOT NULL CHECK (page_number >= 1),
  page_text TEXT NOT NULL,
  search_vector tsvector GENERATED ALWAYS AS (to_tsvector('english', page_text)) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (document_id, page_number)
);

CREATE INDEX IF NOT EXISTS idx_study_doc_page_text_search
  ON public.study_document_page_text USING GIN (search_vector);

CREATE INDEX IF NOT EXISTS idx_study_doc_page_text_doc_page
  ON public.study_document_page_text (document_id, page_number);

-- ----------------------------------------------------------------------------
-- 2. Row Level Security Policies
-- ----------------------------------------------------------------------------
ALTER TABLE public.study_document_page_text ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  -- Authenticated learners can ONLY read page text for published, non-retired study documents
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'study_document_page_text'
      AND policyname = 'Authenticated learners can read published study document page text'
  ) THEN
    CREATE POLICY "Authenticated learners can read published study document page text"
      ON public.study_document_page_text FOR SELECT TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM public.study_documents sd
          WHERE sd.id = study_document_page_text.document_id
            AND sd.is_published = TRUE
            AND sd.retired_at IS NULL
        )
      );
  END IF;

  -- Anon users: Completely denied (no policy granted for anon)
END $$;

-- ----------------------------------------------------------------------------
-- 3. Stored Procedure: search_study_page_text
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.search_study_page_text(
  p_query TEXT,
  p_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
  document_id UUID,
  document_title TEXT,
  document_slug TEXT,
  category_id UUID,
  page_number INTEGER,
  headline TEXT,
  total_matches BIGINT
)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_cleaned_query TEXT;
  v_tsquery tsquery;
BEGIN
  -- Strict query validation
  v_cleaned_query := trim(p_query);
  IF length(v_cleaned_query) < 2 OR length(v_cleaned_query) > 100 THEN
    RETURN;
  END IF;

  -- Build safe tsquery using websearch_to_tsquery or fallback to plainto_tsquery
  BEGIN
    v_tsquery := websearch_to_tsquery('english', v_cleaned_query);
  EXCEPTION WHEN OTHERS THEN
    v_tsquery := plainto_tsquery('english', v_cleaned_query);
  END;

  RETURN QUERY
  SELECT
    sd.id AS document_id,
    sd.title AS document_title,
    sd.slug AS document_slug,
    sd.category_id,
    pt.page_number,
    ts_headline(
      'english',
      pt.page_text,
      COALESCE(v_tsquery, plainto_tsquery('english', v_cleaned_query)),
      'StartSel=<<, StopSel=>>, MaxWords=25, MinWords=10'
    ) AS headline,
    count(*) OVER (PARTITION BY sd.id) AS total_matches
  FROM public.study_document_page_text pt
  JOIN public.study_documents sd ON sd.id = pt.document_id
  WHERE sd.is_published = TRUE
    AND sd.retired_at IS NULL
    AND (
      (v_tsquery IS NOT NULL AND pt.search_vector @@ v_tsquery)
      OR pt.page_text ILIKE '%' || v_cleaned_query || '%'
    )
  ORDER BY total_matches DESC, sd.sort_order ASC, pt.page_number ASC
  LIMIT LEAST(50, GREATEST(1, p_limit));
END;
$$;

-- Privileges
REVOKE ALL ON public.study_document_page_text FROM anon, PUBLIC;
GRANT SELECT ON public.study_document_page_text TO authenticated;
REVOKE ALL ON FUNCTION public.search_study_page_text(TEXT, INTEGER) FROM anon, PUBLIC;
GRANT EXECUTE ON FUNCTION public.search_study_page_text(TEXT, INTEGER) TO authenticated;
