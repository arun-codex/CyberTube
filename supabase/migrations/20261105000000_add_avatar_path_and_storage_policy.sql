-- Migration: 20261105000000_add_avatar_path_and_storage_policy.sql
-- Description: Adds avatar_path column to profiles and documents the isolated avatars storage policies.
-- Safe, idempotent, non-destructive migration.

BEGIN;

-- 1. Add avatar_path to public.profiles if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'profiles'
      AND column_name = 'avatar_path'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN avatar_path TEXT;
  END IF;
END $$;

-- 2. Storage schema definitions and policies (Idempotent for storage-enabled environments)
-- Creates private 'avatars' bucket if storage.buckets table is present
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'storage' AND table_name = 'buckets'
  ) THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'avatars',
      'avatars',
      false, -- Private bucket: access controlled by signed URLs and RLS
      5242880, -- 5 MB limit
      ARRAY['image/jpeg', 'image/png', 'image/webp']
    )
    ON CONFLICT (id) DO UPDATE SET
      public = false,
      file_size_limit = 5242880,
      allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];
  END IF;
END $$;

-- 3. Storage Row Level Security Policies for 'avatars'
-- Ensures users can only insert, select, update, and delete their own avatars: avatars/{user_id}/*
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'storage' AND table_name = 'objects'
  ) THEN
    ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

    -- Drop existing policies if any to ensure clean replacement
    DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
    DROP POLICY IF EXISTS "Users can read their own avatar" ON storage.objects;
    DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
    DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

    -- Allow authenticated users to upload only into their own folder: avatars/{auth.uid()}/*
    CREATE POLICY "Users can upload their own avatar"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'avatars' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );

    -- Allow authenticated users to view only their own avatars
    CREATE POLICY "Users can read their own avatar"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (
      bucket_id = 'avatars' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );

    -- Allow authenticated users to update their own avatars
    CREATE POLICY "Users can update their own avatar"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
      bucket_id = 'avatars' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );

    -- Allow authenticated users to delete their own avatars
    CREATE POLICY "Users can delete their own avatar"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
      bucket_id = 'avatars' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );
  END IF;
END $$;

COMMIT;

