-- =============================================================================
-- CYBERTUBE PHASE 16: PLAYLIST SYNC SCHEMA & NETWORKING FOR HACKERS COURSE SEED
-- =============================================================================
-- Description:
-- 1. Extends public.courses with track and source playlist metadata columns.
-- 2. Creates public.course_playlist_sources and public.course_playlist_items.
-- 3. Enables Row Level Security (RLS) on new sync tables.
-- 4. Idempotently seeds the 'Networking for Hackers 2027' course, module,
--    and six verified playable lessons using deterministic UUIDs.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. EXTEND COURSES SCHEMA
-- -----------------------------------------------------------------------------
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS track TEXT DEFAULT 'cybersecurity';
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS source_platform TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS source_playlist_id TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS source_playlist_url TEXT;

-- -----------------------------------------------------------------------------
-- 2. PLAYLIST SOURCES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.course_playlist_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  playlist_id TEXT UNIQUE NOT NULL,
  platform TEXT NOT NULL DEFAULT 'youtube',
  source_channel_name TEXT,
  source_playlist_url TEXT,
  sync_enabled BOOLEAN DEFAULT TRUE,
  last_synced_at TIMESTAMPTZ,
  last_success_at TIMESTAMPTZ,
  last_sync_status TEXT DEFAULT 'idle',
  last_sync_error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_playlist_sources_course ON public.course_playlist_sources(course_id);
CREATE INDEX IF NOT EXISTS idx_playlist_sources_playlist ON public.course_playlist_sources(playlist_id);

-- Trigger: auto-update updated_at
CREATE TRIGGER on_playlist_source_updated
  BEFORE UPDATE ON public.course_playlist_sources
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 3. PLAYLIST ITEMS MAPPING TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.course_playlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_source_id UUID NOT NULL REFERENCES public.course_playlist_sources(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
  youtube_video_id TEXT NOT NULL,
  playlist_position INT NOT NULL,
  learning_sequence INT,
  video_title TEXT,
  duration_seconds INT DEFAULT 0,
  is_embeddable BOOLEAN DEFAULT TRUE,
  availability_status TEXT DEFAULT 'available',
  is_active BOOLEAN DEFAULT TRUE,
  last_seen_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_course_video UNIQUE (course_id, youtube_video_id)
);

CREATE INDEX IF NOT EXISTS idx_playlist_items_course_video ON public.course_playlist_items(course_id, youtube_video_id);
CREATE INDEX IF NOT EXISTS idx_playlist_items_lesson ON public.course_playlist_items(lesson_id);
CREATE INDEX IF NOT EXISTS idx_playlist_items_active ON public.course_playlist_items(is_active);

-- Trigger: auto-update updated_at
CREATE TRIGGER on_playlist_item_updated
  BEFORE UPDATE ON public.course_playlist_items
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
ALTER TABLE public.course_playlist_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_playlist_items ENABLE ROW LEVEL SECURITY;

-- Public can read playlist sources and items (read-only)
CREATE POLICY "Public can view playlist sources"
  ON public.course_playlist_sources FOR SELECT
  USING (true);

CREATE POLICY "Public can view playlist items"
  ON public.course_playlist_items FOR SELECT
  USING (true);

-- Modifications restricted to postgres and service_role (enforced by Supabase RLS bypass)

-- -----------------------------------------------------------------------------
-- 5. IDEMPOTENT SEED: NETWORKING FOR HACKERS 2027
-- -----------------------------------------------------------------------------
DO $$
DECLARE
  v_course_id CONSTANT UUID := 'e7b9e001-4000-4000-a000-000000000001';
  v_module_id CONSTANT UUID := 'e7b9e002-4000-4000-a000-000000000001';
  v_source_id CONSTANT UUID := 'e7b9e004-4000-4000-a000-000000000001';
BEGIN
  -- A. Course Record
  INSERT INTO public.courses (
    id,
    slug,
    title,
    short_description,
    description,
    difficulty,
    status,
    estimated_duration,
    total_duration_minutes,
    thumbnail_url,
    instructor_name,
    instructor_title,
    instructor_org,
    prerequisites,
    learning_objectives,
    domains,
    tags,
    featured,
    track,
    source_platform,
    source_playlist_id,
    source_playlist_url
  ) VALUES (
    v_course_id,
    'networking-for-hackers-2027',
    'Networking for Hackers 2027',
    'Master computer networking fundamentals, TCP/IP, OSI layers, hardware topologies, and defensive packet mechanics.',
    'A comprehensive foundational networking series by Bitten Tech designed specifically for cybersecurity professionals and ethical hackers. Learn how data travels across the Internet, analyze routers and switches, understand bandwidth delays, and master packet encapsulation across the OSI and TCP/IP protocol stacks.',
    'beginner',
    'published',
    '5 hours 17 mins',
    317,
    'https://i.ytimg.com/vi/4hLax8DmQHY/maxresdefault.jpg',
    'Bitten Tech',
    'Cybersecurity & Networking Educator',
    'Bitten Tech',
    ARRAY[
      'Curiosity about computer networking and cybersecurity fundamentals',
      'Basic familiarity with operating systems and web browsers'
    ],
    ARRAY[
      'Understand how client devices exchange data across the Internet and local networks',
      'Analyze network hardware devices, topologies, and firewall boundary rules',
      'Understand latency, throughput, bandwidth constraints, and transit delays',
      'Deconstruct the 7-layer OSI model and TCP/IP protocol suite with packet encapsulation'
    ],
    ARRAY['network-security', 'fundamentals'],
    ARRAY['networking', 'tcp-ip', 'osi-model', 'packet-analysis', 'hardware-topologies', 'bitten-tech'],
    FALSE,
    'cybersecurity',
    'youtube',
    'PLITTDLtD8szA',
    'https://www.youtube.com/playlist?list=PLITTDLtD8szA'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    difficulty = EXCLUDED.difficulty,
    estimated_duration = EXCLUDED.estimated_duration,
    total_duration_minutes = EXCLUDED.total_duration_minutes,
    thumbnail_url = EXCLUDED.thumbnail_url,
    instructor_name = EXCLUDED.instructor_name,
    instructor_title = EXCLUDED.instructor_title,
    instructor_org = EXCLUDED.instructor_org,
    prerequisites = EXCLUDED.prerequisites,
    learning_objectives = EXCLUDED.learning_objectives,
    domains = EXCLUDED.domains,
    tags = EXCLUDED.tags,
    track = EXCLUDED.track,
    source_platform = EXCLUDED.source_platform,
    source_playlist_id = EXCLUDED.source_playlist_id,
    source_playlist_url = EXCLUDED.source_playlist_url,
    updated_at = NOW();

  -- B. Module Record
  INSERT INTO public.course_modules (
    id,
    course_id,
    title,
    description,
    order_index
  ) VALUES (
    v_module_id,
    v_course_id,
    'Networking Fundamentals — Playlist Sequence',
    'Core concepts of modern computer networks, physical and logical topologies, and protocol stack dissection.',
    1
  )
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  -- C. Lessons
  -- Lesson 1
  INSERT INTO public.lessons (
    id, module_id, course_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'e7b9e003-4000-4000-a000-000000000001',
    v_module_id,
    v_course_id,
    '01-networking-for-hackers-introduction',
    'Networking for Hackers #1 | Introduction',
    'Foundational overview establishing why networking mastery is the single most critical prerequisite for offensive security and ethical hacking.',
    '4hLax8DmQHY',
    36,
    1,
    ARRAY['Understand the hacker mindset regarding networking', 'Learn the course structure and core learning objectives'],
    ARRAY['networking', 'introduction', 'basics', 'cybersecurity'],
    ARRAY['Networking fundamentals', 'Security mindset']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index;

  -- Lesson 2
  INSERT INTO public.lessons (
    id, module_id, course_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'e7b9e003-4000-4000-a000-000000000002',
    v_module_id,
    v_course_id,
    '02-history-of-your-internet',
    'Networking for Hackers #2 | History of your Internet',
    'Explore the evolutionary history of ARPANET, decentralization, protocol standards, and how the modern Internet backbone operates.',
    '4-Ea5EI6LrM',
    58,
    2,
    ARRAY['Explore ARPANET and early networking standards', 'Understand DNS evolution and IP address allocation history'],
    ARRAY['internet-history', 'arpanet', 'protocols', 'standards'],
    ARRAY['Internet architecture history', 'Protocol evolution']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index;

  -- Lesson 3
  INSERT INTO public.lessons (
    id, module_id, course_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'e7b9e003-4000-4000-a000-000000000003',
    v_module_id,
    v_course_id,
    '03-how-data-travels-and-who-can-see-it',
    'Networking for Hackers #3 | How Data Travels & Who Can See It',
    'Step-by-step trace of packets traversing routers, ISPs, and submarine cables, highlighting eavesdropping risks and data visibility.',
    'A31izTClLqs',
    54,
    3,
    ARRAY['Trace packet transit paths across intermediate routers', 'Analyze intermediate visibility and ISP telemetry points'],
    ARRAY['packet-routing', 'isp', 'surveillance', 'data-transit'],
    ARRAY['Packet transit analysis', 'Network eavesdropping threat modeling']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index;

  -- Lesson 4
  INSERT INTO public.lessons (
    id, module_id, course_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'e7b9e003-4000-4000-a000-000000000004',
    v_module_id,
    v_course_id,
    '04-devices-topologies-security-rules',
    'Networking for Hackers #4 | Devices, Topologies & Security Rules',
    'Deconstruct network hardware (hubs, switches, routers, firewalls), physical vs logical topologies, and network segmentation rules.',
    'Yb48nfFBT0I',
    68,
    4,
    ARRAY['Compare Layer 2 switching vs Layer 3 routing', 'Understand Star, Mesh, and Bus topologies with security implications'],
    ARRAY['hardware', 'switches', 'routers', 'topologies', 'firewalls'],
    ARRAY['Network hardware classification', 'Topology mapping']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index;

  -- Lesson 5
  INSERT INTO public.lessons (
    id, module_id, course_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'e7b9e003-4000-4000-a000-000000000005',
    v_module_id,
    v_course_id,
    '05-bandwidth-speed-and-delays',
    'Networking for Hackers #5 | Bandwidth, Speed & Delays',
    'Master the physics and math of networking: bandwidth, throughput, propagation delay, queuing latency, and packet loss bottlenecks.',
    'e6tMigLffZc',
    56,
    5,
    ARRAY['Distinguish bandwidth capacity from real throughput', 'Calculate latency, round-trip time (RTT), and jitter'],
    ARRAY['bandwidth', 'latency', 'jitter', 'throughput', 'metrics'],
    ARRAY['Network latency diagnosis', 'Throughput calculation']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index;

  -- Lesson 6
  INSERT INTO public.lessons (
    id, module_id, course_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'e7b9e003-4000-4000-a000-000000000006',
    v_module_id,
    v_course_id,
    '06-tcp-ip-osi-and-encapsulation',
    'Networking for Hackers #6 | TCP/IP, OSI & Encapsulation',
    'Deep dive into the 7-Layer OSI model vs 4-Layer TCP/IP stack, payload encapsulation, protocol headers, and packet decapsulation mechanics.',
    'J_fUOMgl4CE',
    46,
    6,
    ARRAY['Deconstruct OSI layer boundaries from Physical to Application', 'Trace encapsulation of data into segments, packets, and frames'],
    ARRAY['osi-model', 'tcp-ip', 'encapsulation', 'headers', 'protocols'],
    ARRAY['OSI model dissection', 'Packet encapsulation tracing']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index;

  -- D. Playlist Source Record
  INSERT INTO public.course_playlist_sources (
    id,
    course_id,
    playlist_id,
    platform,
    source_channel_name,
    source_playlist_url,
    sync_enabled,
    last_synced_at,
    last_success_at,
    last_sync_status
  ) VALUES (
    v_source_id,
    v_course_id,
    'PLITTDLtD8szA',
    'youtube',
    'Bitten Tech',
    'https://www.youtube.com/playlist?list=PLITTDLtD8szA',
    TRUE,
    NOW(),
    NOW(),
    'success'
  )
  ON CONFLICT (playlist_id) DO UPDATE SET
    source_channel_name = EXCLUDED.source_channel_name,
    source_playlist_url = EXCLUDED.source_playlist_url,
    sync_enabled = EXCLUDED.sync_enabled;

  -- E. Playlist Items (Idempotent upsert)
  INSERT INTO public.course_playlist_items (
    playlist_source_id, course_id, lesson_id, youtube_video_id, playlist_position, learning_sequence, video_title, duration_seconds, is_embeddable, availability_status, is_active
  ) VALUES
    (v_source_id, v_course_id, 'e7b9e003-4000-4000-a000-000000000001', '4hLax8DmQHY', 6, 1, 'Networking for Hackers #1 | Introduction', 2162, TRUE, 'available', TRUE),
    (v_source_id, v_course_id, 'e7b9e003-4000-4000-a000-000000000002', '4-Ea5EI6LrM', 5, 2, 'Networking for Hackers #2 | History of your Internet', 3466, TRUE, 'available', TRUE),
    (v_source_id, v_course_id, 'e7b9e003-4000-4000-a000-000000000003', 'A31izTClLqs', 4, 3, 'Networking for Hackers #3 | How Data Travels & Who Can See It', 3222, TRUE, 'available', TRUE),
    (v_source_id, v_course_id, 'e7b9e003-4000-4000-a000-000000000004', 'Yb48nfFBT0I', 3, 4, 'Networking for Hackers #4 | Devices, Topologies & Security Rules', 4056, TRUE, 'available', TRUE),
    (v_source_id, v_course_id, 'e7b9e003-4000-4000-a000-000000000005', 'e6tMigLffZc', 2, 5, 'Networking for Hackers #5 | Bandwidth, Speed & Delays', 3365, TRUE, 'available', TRUE),
    (v_source_id, v_course_id, 'e7b9e003-4000-4000-a000-000000000006', 'J_fUOMgl4CE', 1, 6, 'Networking for Hackers #6 | TCP/IP, OSI & Encapsulation', 2744, TRUE, 'available', TRUE)
  ON CONFLICT (course_id, youtube_video_id) DO UPDATE SET
    lesson_id = EXCLUDED.lesson_id,
    playlist_position = EXCLUDED.playlist_position,
    learning_sequence = EXCLUDED.learning_sequence,
    video_title = EXCLUDED.video_title,
    duration_seconds = EXCLUDED.duration_seconds,
    is_embeddable = EXCLUDED.is_embeddable,
    availability_status = EXCLUDED.availability_status,
    is_active = EXCLUDED.is_active,
    last_seen_at = NOW();

END $$;
