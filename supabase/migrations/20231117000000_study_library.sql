-- Migration: Consolidated Bug Bounty Study Library (Simplified Architecture)
-- Timestamp: 2023-11-17 00:00:00 UTC

-- 1. Admin users table (service-role protected)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id)
);

-- 2. Study categories
CREATE TABLE IF NOT EXISTS public.study_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  sort_order integer DEFAULT 0,
  is_published boolean DEFAULT TRUE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 3. Study documents (metadata of each PDF stored in private bucket `original-pdfs`)
CREATE TABLE IF NOT EXISTS public.study_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.study_categories(id) ON DELETE SET NULL,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  original_filename text NOT NULL,
  source_checksum text NOT NULL,
  storage_key text NOT NULL,
  page_count integer NOT NULL DEFAULT 0,
  thumbnail_key text,
  difficulty text DEFAULT 'intermediate',
  tags jsonb DEFAULT '[]'::jsonb,
  sort_order integer DEFAULT 0,
  is_published boolean DEFAULT FALSE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 4. User reading progress
CREATE TABLE IF NOT EXISTS public.user_study_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id uuid NOT NULL REFERENCES public.study_documents(id) ON DELETE CASCADE,
  last_page integer NOT NULL DEFAULT 1,
  highest_page integer NOT NULL DEFAULT 1,
  completion_percent numeric(5,2) NOT NULL DEFAULT 0,
  is_completed boolean NOT NULL DEFAULT FALSE,
  last_read_at timestamp with time zone DEFAULT now(),
  revision integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, document_id)
);

-- 5. Page view logs (idempotent tracking of distinct read pages)
CREATE TABLE IF NOT EXISTS public.user_study_page_views (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id uuid NOT NULL REFERENCES public.study_documents(id) ON DELETE CASCADE,
  page_number integer NOT NULL,
  viewed_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (user_id, document_id, page_number)
);

-- 6. User study bookmarks
CREATE TABLE IF NOT EXISTS public.user_study_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id uuid NOT NULL REFERENCES public.study_documents(id) ON DELETE CASCADE,
  page_number integer NOT NULL,
  title text,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, document_id, page_number)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_study_docs_cat ON public.study_documents(category_id);
CREATE INDEX IF NOT EXISTS idx_study_docs_published ON public.study_documents(is_published);
CREATE INDEX IF NOT EXISTS idx_study_progress_user ON public.user_study_progress(user_id, document_id);
CREATE INDEX IF NOT EXISTS idx_study_bookmarks_user ON public.user_study_bookmarks(user_id, document_id);

-- Enable Row-Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_study_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_study_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_study_bookmarks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS admin_select ON public.admin_users;
DROP POLICY IF EXISTS admin_insert ON public.admin_users;
DROP POLICY IF EXISTS admin_delete ON public.admin_users;

DROP POLICY IF EXISTS category_read_published ON public.study_categories;
DROP POLICY IF EXISTS category_admin_write ON public.study_categories;

DROP POLICY IF EXISTS document_read_published ON public.study_documents;
DROP POLICY IF EXISTS document_admin_write ON public.study_documents;

DROP POLICY IF EXISTS progress_user_all ON public.user_study_progress;
DROP POLICY IF EXISTS progress_admin_read ON public.user_study_progress;

DROP POLICY IF EXISTS pageview_user_all ON public.user_study_page_views;
DROP POLICY IF EXISTS pageview_admin_read ON public.user_study_page_views;

DROP POLICY IF EXISTS bookmark_user_all ON public.user_study_bookmarks;
DROP POLICY IF EXISTS bookmark_admin_read ON public.user_study_bookmarks;

-- Policies
CREATE POLICY admin_select ON public.admin_users FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY admin_insert ON public.admin_users FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY admin_delete ON public.admin_users FOR DELETE USING (auth.role() = 'service_role');

CREATE POLICY category_read_published ON public.study_categories FOR SELECT USING (
  is_published = TRUE OR auth.uid() IN (SELECT user_id FROM public.admin_users)
);
CREATE POLICY category_admin_write ON public.study_categories FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);

CREATE POLICY document_read_published ON public.study_documents FOR SELECT USING (
  is_published = TRUE OR auth.uid() IN (SELECT user_id FROM public.admin_users)
);
CREATE POLICY document_admin_write ON public.study_documents FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);

CREATE POLICY progress_user_all ON public.user_study_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY progress_admin_read ON public.user_study_progress FOR SELECT USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);

CREATE POLICY pageview_user_all ON public.user_study_page_views FOR ALL USING (auth.uid() = user_id);
CREATE POLICY pageview_admin_read ON public.user_study_page_views FOR SELECT USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);

CREATE POLICY bookmark_user_all ON public.user_study_bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY bookmark_admin_read ON public.user_study_bookmarks FOR SELECT USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);

-- Seed Categories (Idempotent)
INSERT INTO public.study_categories (slug, title, description, sort_order, is_published)
VALUES
  ('bug-bounty-fundamentals', 'Bug Bounty Fundamentals', 'Methodology, reconnaissance basics, program selection, and vulnerability reporting standards.', 1, TRUE),
  ('authentication-session-security', 'Authentication & Session Security', '2FA/MFA bypasses, OAuth flaws, session fixation, JWT weaknesses, and password reset logic.', 2, TRUE),
  ('authorization-idor', 'Authorization & IDOR', 'Insecure Direct Object References, horizontal/vertical privilege escalation, and access control matrices.', 3, TRUE),
  ('xss-client-side-security', 'XSS & Client-Side Security', 'Cross-Site Scripting (Stored, Reflected, DOM), Content Security Policy bypasses, and CORS misconfigurations.', 4, TRUE),
  ('business-logic-api-security', 'Business Logic & API Security', 'GraphQL flaws, race conditions, mass assignment, price tampering, and API endpoint enumeration.', 5, TRUE),
  ('file-upload-ssrf', 'File Upload & SSRF', 'Malicious file execution, SVG/XML attacks, Server-Side Request Forgery, and cloud metadata leakage.', 6, TRUE),
  ('reconnaissance-methodology', 'Reconnaissance & Methodology', 'Asset discovery, subdomain enumeration, parameter mining, and active bug hunting workflows.', 7, TRUE),
  ('other-materials', 'Other Materials', 'Checklists, cheat sheets, curated notes, and specialized vulnerability deep dives.', 8, TRUE)
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;
