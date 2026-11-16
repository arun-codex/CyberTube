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
-- Requires explicit boolean argument (no default) to prevent accidental publication.
CREATE OR REPLACE FUNCTION public.publish_study_collection(target_collection text, should_publish boolean)
RETURNS jsonb
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  affected_count integer;
BEGIN
  IF should_publish IS NULL THEN
    RAISE EXCEPTION 'Explicit boolean should_publish argument is required';
  END IF;

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
-- Requires explicit boolean argument (no default) to prevent accidental publication.
CREATE OR REPLACE FUNCTION public.publish_study_document(doc_id uuid, should_publish boolean)
RETURNS jsonb
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  target_doc public.study_documents;
BEGIN
  IF should_publish IS NULL THEN
    RAISE EXCEPTION 'Explicit boolean should_publish argument is required';
  END IF;
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

-- 4. Dynamic contract verification function for fail-closed preflight check.
-- The importer calls this to verify that the active database function replace_study_collection
-- genuinely enforces unpublished imports BEFORE uploading any files to storage.
-- It dynamically inspects pg_proc to verify that replace_study_collection
-- has is_published = false and NO is_published = true.
CREATE OR REPLACE FUNCTION public.verify_study_import_contract()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SET search_path = ''
AS $$
DECLARE
  func_def text;
  has_old_published_true boolean;
  has_unpublished_insert boolean;
  has_unpublished_update boolean;
BEGIN
  -- Retrieve the exact installed function definition from pg_proc
  SELECT pg_get_functiondef(p.oid) INTO func_def
  FROM pg_proc p
  JOIN pg_namespace n ON p.pronamespace = n.oid
  WHERE p.proname = 'replace_study_collection'
    AND n.nspname = 'public';

  IF func_def IS NULL THEN
    RETURN jsonb_build_object(
      'verified', false,
      'defaults_to_unpublished', false,
      'error', 'replace_study_collection function not found in public schema'
    );
  END IF;

  has_old_published_true := (func_def ~* 'is_published\s*=\s*true');
  has_unpublished_insert := (func_def ~* 'bug-bounty.*?verified.*?false.*?null');
  has_unpublished_update := (func_def ~* 'is_published\s*=\s*false');

  IF has_old_published_true OR NOT has_unpublished_insert OR NOT has_unpublished_update THEN
    RETURN jsonb_build_object(
      'verified', false,
      'defaults_to_unpublished', false,
      'has_old_published_true', has_old_published_true,
      'has_unpublished_insert', has_unpublished_insert,
      'has_unpublished_update', has_unpublished_update,
      'error', 'Installed replace_study_collection does NOT enforce unpublished default (detected is_published=true or missing is_published=false)'
    );
  END IF;

  RETURN jsonb_build_object(
    'verified', true,
    'contract_version', '2026-11-16-unpublished',
    'defaults_to_unpublished', true,
    'requires_explicit_publish', true,
    'has_old_published_true', false,
    'has_unpublished_insert', true,
    'has_unpublished_update', true
  );
END;
$$;

REVOKE ALL ON FUNCTION public.verify_study_import_contract() FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_study_import_contract() TO service_role;
