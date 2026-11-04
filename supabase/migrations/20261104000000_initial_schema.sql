-- =============================================================================
-- CYBERTUBE PHASE 2: INITIAL POSTGRESQL SCHEMA MIGRATION
-- =============================================================================
-- Description: Creates normalized tables, indexes, constraints, triggers, and
-- comprehensive Row Level Security (RLS) policies for profiles, resources,
-- domains, tags, bookmarks, collections, and resource submissions.
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. PROFILES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'professional')),
  preferred_language TEXT DEFAULT 'English',
  country_code TEXT,
  primary_learning_goal TEXT,
  interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Trigger: auto-create profile on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: auto-update updated_at on profiles
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 2. DOMAINS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.domains (
  id TEXT PRIMARY KEY, -- Stable slug identifier (e.g. 'network-security')
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- -----------------------------------------------------------------------------
-- 3. TAGS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- -----------------------------------------------------------------------------
-- 4. RESOURCES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.resources (
  id TEXT PRIMARY KEY, -- Stable ID (e.g. 'res-portswigger-sqli')
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN (
    'video', 'course', 'article', 'documentation', 'github',
    'lab', 'ctf', 'podcast', 'research', 'certification', 'exam-prep'
  )),
  provider TEXT NOT NULL,
  creator TEXT,
  canonical_url TEXT UNIQUE NOT NULL,
  thumbnail_url TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  language TEXT DEFAULT 'English' NOT NULL,
  pricing_model TEXT NOT NULL CHECK (pricing_model IN ('free', 'freemium', 'paid')),
  estimated_duration_minutes INTEGER,
  estimated_duration_label TEXT,
  prerequisites TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  learning_outcomes TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE NOT NULL,
  publication_status TEXT DEFAULT 'published' CHECK (publication_status IN ('draft', 'published', 'archived')),
  last_verified_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE TRIGGER on_resource_updated
  BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 5. RESOURCE_DOMAINS (Many-to-Many)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.resource_domains (
  resource_id TEXT REFERENCES public.resources(id) ON DELETE CASCADE,
  domain_id TEXT REFERENCES public.domains(id) ON DELETE CASCADE,
  PRIMARY KEY (resource_id, domain_id)
);

-- -----------------------------------------------------------------------------
-- 6. RESOURCE_TAGS (Many-to-Many)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.resource_tags (
  resource_id TEXT REFERENCES public.resources(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (resource_id, tag_id)
);

-- -----------------------------------------------------------------------------
-- 7. BOOKMARKS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  resource_id TEXT REFERENCES public.resources(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (user_id, resource_id)
);

-- -----------------------------------------------------------------------------
-- 8. COLLECTIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TRIGGER on_collection_updated
  BEFORE UPDATE ON public.collections
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 9. COLLECTION_RESOURCES (Many-to-Many)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.collection_resources (
  collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
  resource_id TEXT REFERENCES public.resources(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (collection_id, resource_id)
);

-- -----------------------------------------------------------------------------
-- 10. RESOURCE_SUBMISSIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.resource_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  canonical_url TEXT NOT NULL,
  description TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN (
    'video', 'course', 'article', 'documentation', 'github',
    'lab', 'ctf', 'podcast', 'research', 'certification', 'exam-prep'
  )),
  suggested_domain TEXT,
  review_status TEXT DEFAULT 'pending' NOT NULL CHECK (review_status IN ('pending', 'approved', 'rejected')),
  moderator_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TRIGGER on_submission_updated
  BEFORE UPDATE ON public.resource_submissions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- INDEXES FOR PERFORMANCE
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_resources_slug ON public.resources(slug);
CREATE INDEX IF NOT EXISTS idx_resources_status ON public.resources(publication_status);
CREATE INDEX IF NOT EXISTS idx_resources_type ON public.resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_collections_user ON public.collections(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON public.resource_submissions(submitted_by);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.resource_submissions(review_status);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_submissions ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- RLS: PROFILES
-- -----------------------------------------------------------------------------
-- Anyone can view basic public profile info
CREATE POLICY "Public profiles are readable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

-- Authenticated users can insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update only their own profile
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- -----------------------------------------------------------------------------
-- RLS: DOMAINS & TAGS (Public Read)
-- -----------------------------------------------------------------------------
CREATE POLICY "Domains are readable by everyone"
  ON public.domains FOR SELECT
  USING (true);

CREATE POLICY "Tags are readable by everyone"
  ON public.tags FOR SELECT
  USING (true);

-- -----------------------------------------------------------------------------
-- RLS: RESOURCES
-- -----------------------------------------------------------------------------
-- Anonymous and authenticated users can only view published resources
CREATE POLICY "Published resources are readable by everyone"
  ON public.resources FOR SELECT
  USING (publication_status = 'published');

-- Resource joins readable by everyone
CREATE POLICY "Resource domains readable by everyone"
  ON public.resource_domains FOR SELECT
  USING (true);

CREATE POLICY "Resource tags readable by everyone"
  ON public.resource_tags FOR SELECT
  USING (true);

-- Administrative modifications (INSERT, UPDATE, DELETE) bypass RLS via server-side service role

-- -----------------------------------------------------------------------------
-- RLS: BOOKMARKS (Strict User Isolation)
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can view only their own bookmarks"
  ON public.bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create only their own bookmarks"
  ON public.bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete only their own bookmarks"
  ON public.bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- RLS: COLLECTIONS (Strict User Isolation)
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can view only their own collections"
  ON public.collections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own collections"
  ON public.collections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own collections"
  ON public.collections FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own collections"
  ON public.collections FOR DELETE
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- RLS: COLLECTION_RESOURCES (Strict Collection Ownership)
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can view items in their collections"
  ON public.collection_resources FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.collections
      WHERE collections.id = collection_resources.collection_id
      AND collections.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add items to their collections"
  ON public.collection_resources FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.collections
      WHERE collections.id = collection_resources.collection_id
      AND collections.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete items from their collections"
  ON public.collection_resources FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.collections
      WHERE collections.id = collection_resources.collection_id
      AND collections.user_id = auth.uid()
    )
  );

-- -----------------------------------------------------------------------------
-- RLS: RESOURCE_SUBMISSIONS
-- -----------------------------------------------------------------------------
-- Users can view their own submissions
CREATE POLICY "Users can view their own submissions"
  ON public.resource_submissions FOR SELECT
  USING (auth.uid() = submitted_by);

-- Authenticated users can insert submissions (must be 'pending')
CREATE POLICY "Authenticated users can submit resources"
  ON public.resource_submissions FOR INSERT
  WITH CHECK (
    auth.uid() = submitted_by
    AND review_status = 'pending'
  );

