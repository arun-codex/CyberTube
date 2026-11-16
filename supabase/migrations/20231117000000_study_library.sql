-- Migration: Consolidated Study Library (correct timestamp)
-- Timestamp: 2023-11-17 (UTC) – replaces future‑dated duplicate migrations

-- Admin users table (service‑role protected)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now()
);

-- Study categories
CREATE TABLE IF NOT EXISTS public.study_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  sort_order integer DEFAULT 0,
  is_published boolean DEFAULT FALSE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Study documents (metadata of each PDF)
CREATE TABLE IF NOT EXISTS public.study_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.study_categories(id) ON DELETE SET NULL,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  original_filename text NOT NULL,
  source_checksum text NOT NULL,
  storage_key text NOT NULL, -- key in the `original-pdfs` bucket
  page_count integer NOT NULL,
  thumbnail_key text,
  difficulty text,
  tags jsonb,
  sort_order integer DEFAULT 0,
  is_published boolean DEFAULT FALSE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Document pages (private assets)
CREATE TABLE IF NOT EXISTS public.study_document_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES public.study_documents(id) ON DELETE CASCADE,
  page_number integer NOT NULL,
  private_asset_key text NOT NULL, -- key in the `page-assets` bucket
  width integer,
  height integer,
  UNIQUE (document_id, page_number)
);

-- User progress
CREATE TABLE IF NOT EXISTS public.user_study_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id uuid NOT NULL REFERENCES public.study_documents(id) ON DELETE CASCADE,
  last_page integer NOT NULL,
  highest_page integer NOT NULL,
  completion_percent numeric(5,2) NOT NULL DEFAULT 0,
  is_completed boolean NOT NULL DEFAULT FALSE,
  revision integer NOT NULL DEFAULT 0,
  updated_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, document_id)
);

-- Page view log (prevent duplicate counts)
CREATE TABLE IF NOT EXISTS public.user_study_page_views (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id uuid NOT NULL REFERENCES public.study_documents(id) ON DELETE CASCADE,
  page_number integer NOT NULL,
  viewed_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (user_id, document_id, page_number)
);

-- Bookmarks
CREATE TABLE IF NOT EXISTS public.user_study_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id uuid NOT NULL REFERENCES public.study_documents(id) ON DELETE CASCADE,
  page_number integer NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row‑Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_document_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_study_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_study_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_study_bookmarks ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY admin_select ON public.admin_users FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY admin_insert ON public.admin_users FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY admin_delete ON public.admin_users FOR DELETE USING (auth.role() = 'service_role');

CREATE POLICY category_read_published ON public.study_categories FOR SELECT USING (is_published = TRUE);
CREATE POLICY category_admin_write ON public.study_categories FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

CREATE POLICY document_read_published ON public.study_documents FOR SELECT USING (is_published = TRUE);
CREATE POLICY document_admin_write ON public.study_documents FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

CREATE POLICY page_read ON public.study_document_pages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.study_documents d WHERE d.id = document_id AND d.is_published = TRUE)
);
CREATE POLICY page_admin_write ON public.study_document_pages FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

CREATE POLICY progress_user_upsert ON public.user_study_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY progress_admin_read ON public.user_study_progress FOR SELECT USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

CREATE POLICY pageview_user_insert ON public.user_study_page_views FOR INSERT USING (auth.uid() = user_id);
CREATE POLICY pageview_admin_read ON public.user_study_page_views FOR SELECT USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

CREATE POLICY bookmark_user_all ON public.user_study_bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY bookmark_admin_read ON public.user_study_bookmarks FROM SELECT USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- Note: Buckets `original-pdfs` and `page-assets` must be created manually in Supabase storage with public = false.

-- Archived previous migration contents for audit purposes:
/*
--- 20231116000000_add_study_library.sql (original) ---
--- 20261121000000_create_study_library.sql (future‑dated) ---
--- 20261130000000_create_study_library.sql (future‑dated) ---
*/
