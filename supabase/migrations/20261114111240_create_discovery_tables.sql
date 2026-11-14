-- 20261106040000_create_discovery_tables.sql
-- Discovery platform schema

-- Categories (reference from config, but stored for admin CRUD)
CREATE TABLE IF NOT EXISTS discovery_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  icon text,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- Topics linked to categories
CREATE TABLE IF NOT EXISTS discovery_topics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id uuid REFERENCES discovery_categories(id) ON DELETE CASCADE,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  keywords text[], -- simple array for rule‑based matching
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- Sources (RSS, ATOM, GitHub, etc.)
CREATE TABLE IF NOT EXISTS discovery_sources (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  type text NOT NULL, -- e.g., 'rss', 'github', 'cisa', 'youtube'
  url text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  fetch_interval_minutes int NOT NULL DEFAULT 60,
  last_fetched_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Items (curated content)
CREATE TABLE IF NOT EXISTS discovery_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id uuid REFERENCES discovery_sources(id) ON DELETE SET NULL,
  external_id text NOT NULL,
  title text NOT NULL,
  description text,
  url text NOT NULL,
  thumbnail_url text,
  published_at timestamp with time zone NOT NULL,
  category_id uuid REFERENCES discovery_categories(id),
  topic_id uuid REFERENCES discovery_topics(id),
  author text,
  content_type text CHECK (content_type IN ('article','video','podcast','event')),
  UNIQUE (source_id, external_id),
  created_at timestamp with time zone DEFAULT now()
);

-- User interests (personalisation)
CREATE TABLE IF NOT EXISTS user_interests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  topic_id uuid REFERENCES discovery_topics(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now()
);

-- Refresh jobs log (admin schedule tracking)
CREATE TABLE IF NOT EXISTS discovery_refresh_jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  status text CHECK (status IN ('running','success','failed')) DEFAULT 'running',
  details jsonb
);

-- Refresh logs (historical records)
CREATE TABLE IF NOT EXISTS discovery_refresh_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id uuid REFERENCES discovery_refresh_jobs(id) ON DELETE CASCADE,
  source_id uuid REFERENCES discovery_sources(id),
  fetched_at timestamp with time zone DEFAULT now(),
  new_items int NOT NULL DEFAULT 0,
  error text
);

-- Licensed videos (admin‑managed library)
CREATE TABLE IF NOT EXISTS licensed_videos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  url text NOT NULL,
  thumbnail_url text,
  license_type text NOT NULL, -- e.g., 'internal', 'partner'
  created_at timestamp with time zone DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- RLS and least-privilege Data API access
-- Admin catalog writes and refresh jobs run through trusted server-side
-- service-role code; browser roles receive read-only catalog/feed access and
-- owner-scoped writes to user_interests only.
-- ---------------------------------------------------------------------------

ALTER TABLE discovery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE licensed_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_refresh_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_refresh_logs ENABLE ROW LEVEL SECURITY;

-- Remove inherited/default privileges before granting the explicit API surface.
REVOKE ALL ON TABLE
  public.discovery_categories,
  public.discovery_topics,
  public.discovery_sources,
  public.discovery_items,
  public.user_interests,
  public.discovery_refresh_jobs,
  public.discovery_refresh_logs,
  public.licensed_videos
FROM PUBLIC, anon, authenticated;

-- Publicly readable, enabled discovery catalog and published feed.
CREATE POLICY "public_read_categories" ON public.discovery_categories
  FOR SELECT TO anon, authenticated USING (enabled = true);

CREATE POLICY "public_read_topics" ON public.discovery_topics
  FOR SELECT TO anon, authenticated USING (enabled = true);

CREATE POLICY "public_read_items" ON public.discovery_items
  FOR SELECT TO anon, authenticated USING (true);

-- Users can manage only their own interest rows.
CREATE POLICY "user_manage_interests" ON public.user_interests
  FOR ALL TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Explicit browser grants match the policies above.
GRANT SELECT ON TABLE
  public.discovery_categories,
  public.discovery_topics,
  public.discovery_items
TO anon, authenticated;

GRANT SELECT, INSERT, DELETE ON TABLE public.user_interests TO authenticated;

-- Trusted server-side jobs/admin operations only.
GRANT ALL ON TABLE
  public.discovery_categories,
  public.discovery_topics,
  public.discovery_sources,
  public.discovery_items,
  public.user_interests,
  public.discovery_refresh_jobs,
  public.discovery_refresh_logs,
  public.licensed_videos
TO service_role;

-- Seed categories (idempotent – will not duplicate on re‑run)
INSERT INTO discovery_categories (slug, name, description, icon, enabled)
SELECT slug, name, description, icon, enabled FROM (VALUES
  ('cybersecurity', 'Cybersecurity', 'Security research, advisories, tools and techniques.', 'shield', true),
  ('artificial-intelligence', 'Artificial Intelligence', 'AI breakthroughs, agents, large language models, research.', 'brain', true),
  ('machine-learning', 'Machine Learning', 'ML algorithms, frameworks, datasets, tooling.', 'cpu', true),
  ('programming', 'Programming', 'Languages, libraries, best practices, tutorials.', 'code', true),
  ('web-development', 'Web Development', 'Frontend, backend, frameworks, standards.', 'globe', true),
  ('networking', 'Networking', 'Protocols, routing, switching, analysis tools.', 'wifi', true),
  ('cloud-computing', 'Cloud Computing', 'Public clouds, services, serverless, SaaS.', 'cloud', true),
  ('devops', 'DevOps', 'CI/CD, infrastructure as code, automation.', 'gear', true),
  ('linux', 'Linux', 'Distributions, kernel, tooling, administration.', 'linux', true),
  ('open-source', 'Open Source', 'Community projects, libraries, frameworks.', 'git-pull-request', true),
  ('hardware', 'Hardware', 'Devices, components, schematics.', 'cpu', true),
  ('iot', 'IoT', 'Embedded devices, sensors, edge computing.', 'anchor', true),
  ('embedded-systems', 'Embedded Systems', 'Microcontrollers, firmware, real‑time OS.', 'chip', true),
  ('robotics', 'Robotics', 'Robotic platforms, control, perception.', 'robot', true),
  ('technology-research', 'Technology Research', 'Academic papers, whitepapers, cutting‑edge tech.', 'book-open', true),
  ('software-releases', 'Software Releases', 'Versioned releases of major software projects.', 'tag', true)
) AS v(slug, name, description, icon, enabled)
WHERE NOT EXISTS (SELECT 1 FROM discovery_categories WHERE slug = v.slug);
