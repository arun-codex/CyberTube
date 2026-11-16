-- Migration: 20261116173100_distinct_page_completion_tracking.sql
-- Description: Reconcile save_study_progress in Postgres to calculate completion percentage
-- based on distinct viewed pages in user_study_page_views rather than highest page number reached.

CREATE OR REPLACE FUNCTION public.save_study_progress(reader_id uuid, doc_id uuid, page integer)
RETURNS jsonb
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  doc public.study_documents;
  result public.user_study_progress;
  viewed_count integer;
BEGIN
  SELECT * INTO doc FROM public.study_documents WHERE id = doc_id AND is_published AND retired_at IS NULL FOR SHARE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Document unavailable' USING ERRCODE = 'P0002'; END IF;
  IF page < 1 OR page > doc.page_count THEN RAISE EXCEPTION 'Invalid page' USING ERRCODE = '22023'; END IF;

  -- Record this page view (idempotent: PK on user_id, document_id, page_number)
  INSERT INTO public.user_study_page_views(user_id, document_id, page_number)
  VALUES (reader_id, doc_id, page)
  ON CONFLICT DO NOTHING;

  -- Count distinct pages the user has actually viewed for this document
  SELECT count(*) INTO viewed_count
  FROM public.user_study_page_views
  WHERE user_id = reader_id AND document_id = doc_id;

  -- Upsert progress: completion_percent is based on distinct viewed pages, not highest_page
  INSERT INTO public.user_study_progress(user_id, document_id, last_page, highest_page, completion_percent, is_completed)
  VALUES (reader_id, doc_id, page, page, round(viewed_count * 100.0 / doc.page_count, 2), viewed_count >= doc.page_count)
  ON CONFLICT(user_id, document_id) DO UPDATE SET
    last_page = page,
    highest_page = greatest(public.user_study_progress.highest_page, page),
    completion_percent = round(viewed_count * 100.0 / doc.page_count, 2),
    is_completed = (viewed_count >= doc.page_count),
    revision = public.user_study_progress.revision + 1,
    last_read_at = now(),
    updated_at = now()
  RETURNING * INTO result;

  RETURN to_jsonb(result);
END $$;

REVOKE ALL ON FUNCTION public.save_study_progress(uuid, uuid, integer) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.save_study_progress(uuid, uuid, integer) TO service_role;
