-- Migration: 20261116173000_unpublished_study_import_and_admin_publish.sql
-- Description: Enforce that replace_study_collection defaults all new and replaced
-- documents to is_published = false, and provide an explicit separate administrator
-- function to publish or unpublish collections and individual documents.

-- 1. Correct replace_study_collection so import NEVER publishes documents
CREATE OR REPLACE FUNCTION public.replace_study_collection(run_id text, manifest jsonb, expected_documents jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  item jsonb;
  previous public.study_documents;
  saved jsonb;
  prior public.study_import_runs;
BEGIN
  PERFORM pg_advisory_xact_lock(91261116);
  LOCK TABLE public.study_documents IN SHARE ROW EXCLUSIVE MODE;
  LOCK TABLE public.user_study_progress, public.user_study_bookmarks, public.user_study_page_views IN SHARE ROW EXCLUSIVE MODE;

  SELECT * INTO prior FROM public.study_import_runs WHERE id = run_id;
  IF FOUND THEN
    IF prior.status = 'active' AND prior.manifest = manifest THEN
      RETURN jsonb_build_object('status', 'already-active');
    END IF;
    RAISE EXCEPTION 'Run ID already used';
  END IF;

  IF jsonb_typeof(manifest) IS DISTINCT FROM 'array' OR jsonb_array_length(manifest) = 0 THEN
    RAISE EXCEPTION 'Empty manifest';
  END IF;

  saved := public.study_collection_snapshot();
  IF saved->'documents' IS DISTINCT FROM expected_documents THEN
    RAISE EXCEPTION 'Catalog changed; regenerate dry-run';
  END IF;

  IF (SELECT count(*) FROM jsonb_array_elements(manifest)) <> (SELECT count(DISTINCT value->>'id') FROM jsonb_array_elements(manifest))
    OR (SELECT count(*) FROM jsonb_array_elements(manifest)) <> (SELECT count(DISTINCT value->>'sha256') FROM jsonb_array_elements(manifest)) THEN
    RAISE EXCEPTION 'Duplicate document';
  END IF;

  FOR item IN SELECT value FROM jsonb_array_elements(manifest) LOOP
    IF (item->>'sha256' ~ '^[a-f0-9]{64}$') IS DISTINCT FROM true OR item->>'id' IS NULL
      OR item->>'title' IS NULL OR item->>'slug' IS NULL OR item->>'category_id' IS NULL
      OR item->>'page_count' IS NULL OR (item->>'page_count')::integer < 1
      OR item->>'file_size' IS NULL OR (item->>'file_size')::bigint < 1
      OR item->>'original_filename' IS NULL OR item->>'validation_status' IS DISTINCT FROM 'verified'
      OR item->>'storage_key' IS DISTINCT FROM ('bug-bounty/' || (item->>'sha256') || '.pdf') THEN
      RAISE EXCEPTION 'Invalid metadata';
    END IF;

    SELECT * INTO previous FROM public.study_documents WHERE id = (item->>'id')::uuid;
    IF FOUND AND previous.collection_slug <> 'bug-bounty' THEN
      RAISE EXCEPTION 'Wrong collection';
    END IF;

    -- Reset reader state on checksum change unless explicitly preserved by proof
    IF FOUND AND previous.source_checksum <> item->>'sha256' AND NOT coalesce((item->>'preserve_progress')::boolean, false) THEN
      DELETE FROM public.user_study_progress WHERE document_id = previous.id;
      DELETE FROM public.user_study_bookmarks WHERE document_id = previous.id;
      DELETE FROM public.user_study_page_views WHERE document_id = previous.id;
    END IF;

    -- CRITICAL FIX: All new or replaced documents MUST default to is_published = false.
    -- Importing and publishing are strictly separated operations.
    INSERT INTO public.study_documents(
      id, title, slug, original_filename, source_checksum, storage_key,
      page_count, file_size, category_id, collection_slug, validation_status,
      is_published, retired_at
    )
    VALUES (
      (item->>'id')::uuid, item->>'title', item->>'slug', item->>'original_filename', item->>'sha256', item->>'storage_key',
      (item->>'page_count')::integer, (item->>'file_size')::bigint, (item->>'category_id')::uuid, 'bug-bounty', 'verified',
      false, NULL
    )
    ON CONFLICT (id) DO UPDATE SET
      title = excluded.title,
      original_filename = excluded.original_filename,
      source_checksum = excluded.source_checksum,
      storage_key = excluded.storage_key,
      page_count = excluded.page_count,
      file_size = excluded.file_size,
      category_id = excluded.category_id,
      thumbnail_key = NULL,
      validation_status = 'verified',
      is_published = false,  -- Never automatically publish during replacement
      retired_at = NULL,
      updated_at = now();
  END LOOP;

  -- Retire omitted documents so old documents are never exposed
  UPDATE public.study_documents
  SET is_published = false, retired_at = now(), updated_at = now()
  WHERE collection_slug = 'bug-bounty'
    AND id NOT IN (SELECT (value->>'id')::uuid FROM jsonb_array_elements(manifest));

  INSERT INTO public.study_import_runs(id, collection_slug, status, manifest, backup)
  VALUES (run_id, 'bug-bounty', 'active', manifest, saved);

  RETURN jsonb_build_object('status', 'active', 'run_id', run_id, 'documents', jsonb_array_length(manifest));
END $$;

-- 2. Explicit administrator publication function (separate from import)
CREATE OR REPLACE FUNCTION public.publish_study_collection(target_collection text DEFAULT 'bug-bounty', should_publish boolean DEFAULT true)
RETURNS jsonb
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  affected_count integer;
BEGIN
  PERFORM pg_advisory_xact_lock(91261116);
  LOCK TABLE public.study_documents IN SHARE ROW EXCLUSIVE MODE;

  UPDATE public.study_documents
  SET is_published = should_publish, updated_at = now()
  WHERE collection_slug = target_collection AND retired_at IS NULL;

  GET DIAGNOSTICS affected_count = ROW_COUNT;

  RETURN jsonb_build_object(
    'status', 'success',
    'collection_slug', target_collection,
    'is_published', should_publish,
    'affected_documents', affected_count
  );
END $$;

-- 3. Explicit granular per-document administrator publication function
CREATE OR REPLACE FUNCTION public.publish_study_document(doc_id uuid, should_publish boolean DEFAULT true)
RETURNS jsonb
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  target_doc public.study_documents;
BEGIN
  SELECT * INTO target_doc FROM public.study_documents WHERE id = doc_id AND retired_at IS NULL FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Document not found or retired' USING ERRCODE = 'P0002';
  END IF;

  UPDATE public.study_documents
  SET is_published = should_publish, updated_at = now()
  WHERE id = doc_id;

  RETURN jsonb_build_object(
    'status', 'success',
    'document_id', doc_id,
    'is_published', should_publish
  );
END $$;

REVOKE ALL ON FUNCTION public.replace_study_collection(text, jsonb, jsonb) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.replace_study_collection(text, jsonb, jsonb) TO service_role;

REVOKE ALL ON FUNCTION public.publish_study_collection(text, boolean) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.publish_study_collection(text, boolean) TO service_role;

REVOKE ALL ON FUNCTION public.publish_study_document(uuid, boolean) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.publish_study_document(uuid, boolean) TO service_role;
