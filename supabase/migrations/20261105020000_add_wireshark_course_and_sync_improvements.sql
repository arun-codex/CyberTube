-- ============================================================================
-- Migration: Add Wireshark and Ethical Hacking Course & Playlist Sync Enhancements
-- Description: Registers David Bombal's Wireshark course (PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl),
--              configures a dedicated destination module for future playlist additions,
--              seeds 5 modules and 20 verified playable lessons, and maps playlist items.
-- ============================================================================

-- 1. Schema Enhancements
-- 1.1 Add default_module_id to course_playlist_sources if not present
ALTER TABLE public.course_playlist_sources
  ADD COLUMN IF NOT EXISTS default_module_id UUID REFERENCES public.course_modules(id) ON DELETE SET NULL;

-- 1.2 Safely ensure unique constraint on course_modules(course_id, order_index)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.course_modules'::regclass
      AND conname = 'uq_course_modules_course_order'
  ) THEN
    ALTER TABLE public.course_modules
      ADD CONSTRAINT uq_course_modules_course_order UNIQUE (course_id, order_index);
  END IF;
END $$;

-- 2. Course, Modules, Lessons, and Playlist Source Seeding
DO $$
DECLARE
  v_course_id CONSTANT UUID := 'd6a8e001-5000-4000-a000-000000000001';
  v_mod1_id   CONSTANT UUID := 'd6a8e002-5000-4000-a000-000000000001';
  v_mod2_id   CONSTANT UUID := 'd6a8e002-5000-4000-a000-000000000002';
  v_mod3_id   CONSTANT UUID := 'd6a8e002-5000-4000-a000-000000000003';
  v_mod4_id   CONSTANT UUID := 'd6a8e002-5000-4000-a000-000000000004';
  v_mod5_id   CONSTANT UUID := 'd6a8e002-5000-4000-a000-000000000005';
  v_source_id CONSTANT UUID := 'd6a8e004-5000-4000-a000-000000000001';
BEGIN
  -- A. Course Record
  INSERT INTO public.courses (
    id,
    slug,
    title,
    short_description,
    description,
    difficulty,
    estimated_duration,
    total_duration_minutes,
    thumbnail_url,
    instructor_name,
    instructor_title,
    instructor_organization,
    published,
    tags,
    prerequisites,
    learning_objectives,
    track,
    domains,
    source_platform,
    source_playlist_id,
    source_playlist_url
  ) VALUES (
    v_course_id,
    'wireshark-and-ethical-hacking',
    'Wireshark and Ethical Hacking Course',
    'Master Wireshark packet capture, display filters, protocol analysis, and ethical hacking workflows.',
    'A complete, hands-on Wireshark and ethical hacking masterclass curated by David Bombal. Dissect live traffic, build custom display filters, uncover credentials in cleartext legacy protocols (Telnet, FTP, HTTP), inspect VoIP call streams, run tshark/termshark in the console, and investigate real-world network attacks.',
    'beginner',
    '5 hours 5 mins',
    305,
    'https://i.ytimg.com/vi/QXfaGOMT7MY/maxresdefault.jpg',
    'David Bombal',
    'Network Engineer & Cybersecurity Educator',
    'David Bombal',
    TRUE,
    ARRAY['wireshark', 'packet-analysis', 'ethical-hacking', 'display-filters', 'tshark', 'network-forensics', 'david-bombal'],
    ARRAY[
      'Curiosity about computer networking, protocols, and ethical hacking',
      'Basic familiarity with operating systems (Windows, Linux, or macOS)'
    ],
    ARRAY[
      'Capture and dissect live network traffic using Wireshark and command-line tools',
      'Construct advanced display filters to isolate targeted security incidents and protocol anomalies',
      'Identify plaintext credentials and security risks in legacy protocols like Telnet, FTP, and HTTP',
      'Capture, analyze, and replay VoIP phone calls and investigate CCTV camera streams',
      'Execute headless network captures and packet inspections with tshark and termshark'
    ],
    'cybersecurity',
    ARRAY['network-security', 'fundamentals', 'dfir'],
    'youtube',
    'PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl',
    'https://www.youtube.com/playlist?list=PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl'
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
    instructor_organization = EXCLUDED.instructor_organization,
    published = EXCLUDED.published,
    tags = EXCLUDED.tags,
    prerequisites = EXCLUDED.prerequisites,
    learning_objectives = EXCLUDED.learning_objectives,
    track = EXCLUDED.track,
    domains = EXCLUDED.domains,
    source_platform = EXCLUDED.source_platform,
    source_playlist_id = EXCLUDED.source_playlist_id,
    source_playlist_url = EXCLUDED.source_playlist_url;

  -- B. Modules Records
  -- Module 1
  INSERT INTO public.course_modules (
    id, course_id, title, description, order_index
  ) VALUES (
    v_mod1_id, v_course_id,
    'Module 1: Wireshark Foundations & Getting Started',
    'Get started with Wireshark packet capture foundations, interface selection, live captures, and ethical hacking workflows.',
    1
  )
  ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    order_index = EXCLUDED.order_index;

  -- Module 2
  INSERT INTO public.course_modules (
    id, course_id, title, description, order_index
  ) VALUES (
    v_mod2_id, v_course_id,
    'Module 2: Display Filters & Network Protocol Security',
    'Master Wireshark display filter syntax and dissect unencrypted legacy protocols including Telnet, TFTP, FTP, and HTTP.',
    2
  )
  ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    order_index = EXCLUDED.order_index;

  -- Module 3
  INSERT INTO public.course_modules (
    id, course_id, title, description, order_index
  ) VALUES (
    v_mod3_id, v_course_id,
    'Module 3: Capture Workflows, Profiles & Command-Line Tools',
    'Capture VoIP audio, create custom Wireshark inspection profiles, install on Linux, and analyze PCAPs headlessly with tshark and termshark.',
    3
  )
  ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    order_index = EXCLUDED.order_index;

  -- Module 4
  INSERT INTO public.course_modules (
    id, course_id, title, description, order_index
  ) VALUES (
    v_mod4_id, v_course_id,
    'Module 4: Hands-on Practice & Real-World Security Case Studies',
    'Apply packet analysis skills to CCNA challenges, keylogger traffic, TCP handshakes/flags, VoIP MITM replays, and CCTV camera security.',
    4
  )
  ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    order_index = EXCLUDED.order_index;

  -- Module 5 (Default target for automated new additions)
  INSERT INTO public.course_modules (
    id, course_id, title, description, order_index
  ) VALUES (
    v_mod5_id, v_course_id,
    'Module 5: New Playlist Additions',
    'Automatically synchronized lessons added to David Bombal''s Wireshark playlist over time.',
    5
  )
  ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    order_index = EXCLUDED.order_index;

  -- Lesson 1
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000001',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000001',
    '01-free-wireshark-ethical-hacking-video-0',
    'Free Wireshark and Ethical Hacking Course: Video #0',
    'Welcome to David Bombal''s Wireshark and Ethical Hacking Course (Video #0). Overview of course objectives, lab environment recommendations, and ethical hacking scope.',
    'QXfaGOMT7MY',
    12,
    1,
    ARRAY[
      'Analyze network traffic for Free Wireshark and Ethical Hacking Course: Video #0',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 2
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000002',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000001',
    '02-free-wireshark-ethical-hacking-video-1',
    'Free Wireshark and Ethical Hacking Course: Video #1',
    'Lesson 2 of David Bombal''s Wireshark and Ethical Hacking course: Free Wireshark and Ethical Hacking Course: Video #1. Dissect packet captures and analyze network behavior.',
    '9CY42I04MFw',
    17,
    2,
    ARRAY[
      'Analyze network traffic for Free Wireshark and Ethical Hacking Course: Video #1',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 3
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000003',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000001',
    '03-free-wireshark-ethical-hacking-video-2',
    'Free Wireshark and Ethical Hacking Course: Video #2',
    'Lesson 3 of David Bombal''s Wireshark and Ethical Hacking course: Free Wireshark and Ethical Hacking Course: Video #2. Dissect packet captures and analyze network behavior.',
    'qfWSToryDos',
    10,
    3,
    ARRAY[
      'Analyze network traffic for Free Wireshark and Ethical Hacking Course: Video #2',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 4
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000004',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000001',
    '04-free-wireshark-ethical-hacking-video-3',
    'Free Wireshark and Ethical Hacking Course: Video #3',
    'Lesson 4 of David Bombal''s Wireshark and Ethical Hacking course: Free Wireshark and Ethical Hacking Course: Video #3. Dissect packet captures and analyze network behavior.',
    'IdEFDkGtcQg',
    7,
    4,
    ARRAY[
      'Analyze network traffic for Free Wireshark and Ethical Hacking Course: Video #3',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 5
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000005',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000002',
    '05-wireshark-display-filters',
    'Wireshark Display Filters | Free Wireshark and Ethical Hacking Course: Video #4',
    'Master Wireshark display filters to isolate traffic quickly. Learn filter expressions, logical operators, and protocol-specific queries.',
    'WdBBYosG-YI',
    15,
    5,
    ARRAY[
      'Analyze network traffic for Wireshark Display Filters | Free Wireshark and Ethical Hacking Course: Video #4',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 6
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000006',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000002',
    '06-too-much-wireshark',
    'Too much Wireshark?! | Free Wireshark and Ethical Hacking Course: Video #5',
    'Lesson 6 of David Bombal''s Wireshark and Ethical Hacking course: Too much Wireshark?! | Free Wireshark and Ethical Hacking Course: Video #5. Dissect packet captures and analyze network behavior.',
    'tM2aUpll1EQ',
    6,
    6,
    ARRAY[
      'Analyze network traffic for Too much Wireshark?! | Free Wireshark and Ethical Hacking Course: Video #5',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 7
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000007',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000002',
    '07-never-use-telnet',
    'Never use Telnet',
    'Demonstration of why Telnet is insecure. Observe cleartext username and password transmission in Wireshark packet captures.',
    'nGEKnYUEPcg',
    9,
    7,
    ARRAY[
      'Analyze network traffic for Never use Telnet',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 8
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000008',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000002',
    '08-never-use-tftp-or-ftp',
    'Never use TFTP or FTP!',
    'Inspect TFTP and FTP traffic in Wireshark. Understand plaintext file transfer mechanics and the security imperative to use SFTP or SCP.',
    'PoaOgBmWJQY',
    6,
    8,
    ARRAY[
      'Analyze network traffic for Never use TFTP or FTP!',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 9
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000009',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000002',
    '09-why-are-you-still-using-http',
    'Why are you still using HTTP?',
    'Why are you still using HTTP? Analyze cleartext web traffic, credentials, and cookies in Wireshark to understand the need for HTTPS/TLS.',
    'LfZNhf2Yc8k',
    6,
    9,
    ARRAY[
      'Analyze network traffic for Why are you still using HTTP?',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 10
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000010',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000003',
    '10-wireshark-voip-call-capture-and-replay',
    'Wireshark VoIP call capture and replay',
    'Capture VoIP SIP signaling and RTP audio streams in Wireshark, analyze call quality, and replay telephone conversations from packet data.',
    'uZI9ZnKRudg',
    23,
    10,
    ARRAY[
      'Analyze network traffic for Wireshark VoIP call capture and replay',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 11
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000011',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000003',
    '11-wireshark-tutorial-installation-password-sniffing',
    'Wireshark Tutorial - Installation and Password sniffing',
    'Step-by-step Wireshark installation walkthrough and credential interception demonstration in an authorized lab environment.',
    '4_7A8Ikp5Cc',
    11,
    11,
    ARRAY[
      'Analyze network traffic for Wireshark Tutorial - Installation and Password sniffing',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 12
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000012',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000003',
    '12-wireshark-install-ubuntu-20-04',
    'Wireshark Install Ubuntu 20.04',
    'Install and configure Wireshark on Ubuntu Linux 20.04 with non-root packet capture privileges using dumpcap.',
    'rtm_Bofv4-8',
    10,
    12,
    ARRAY[
      'Analyze network traffic for Wireshark Install Ubuntu 20.04',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 13
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000013',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000003',
    '13-wireshark-tutorial-profiles-password-captures',
    'Wireshark Tutorial - Profiles and Password captures',
    'Create customized Wireshark profiles, color rules, and layout preferences tailored for security analysis and password audits.',
    'zRk5dymfNsk',
    9,
    13,
    ARRAY[
      'Analyze network traffic for Wireshark Tutorial - Profiles and Password captures',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 14
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000014',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000003',
    '14-tshark-termshark-console-captures',
    'tshark and Termshark tutorial: Capture and view wireshark captures in a console',
    'Use tshark and termshark terminal tools to capture, filter, and inspect network traffic directly in a console without a GUI.',
    'HoYgPlmOZgo',
    13,
    14,
    ARRAY[
      'Analyze network traffic for tshark and Termshark tutorial: Capture and view wireshark captures in a console',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 15
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000015',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000004',
    '15-ccna-quiz-packet-analysis',
    'Can you answer this CCNA Quiz?',
    'Test your packet analysis and networking knowledge with a CCNA-focused quiz on IP addressing, routing, and protocol headers.',
    'D9FBjUq2J74',
    10,
    15,
    ARRAY[
      'Analyze network traffic for Can you answer this CCNA Quiz?',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 16
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000016',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000004',
    '16-learn-capture-repeat',
    'Learn. Capture. Repeat.',
    'Actionable strategies for effective packet analysis practice: Learn. Capture. Repeat. Build muscle memory analyzing real-world PCAPs.',
    '-WefgSx_eKY',
    17,
    16,
    ARRAY[
      'Analyze network traffic for Learn. Capture. Repeat.',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 17
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000017',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000004',
    '17-keylogger-vs-wireshark',
    'Keylogger vs Wireshark',
    'Investigate keylogger data exfiltration in Wireshark. Trace unauthorized keystroke transmissions across the network.',
    'keAHKO2Fc4I',
    33,
    17,
    ARRAY[
      'Analyze network traffic for Keylogger vs Wireshark',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 18
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000018',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000004',
    '18-how-tcp-really-works',
    'How TCP really works: Top 3 things you need to know!',
    'Deep dive into how TCP really works: three-way handshakes, sequence/acknowledgement numbers, window sizing, and flag analysis.',
    'Auwn3RWapRE',
    30,
    18,
    ARRAY[
      'Analyze network traffic for How TCP really works: Top 3 things you need to know!',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 19
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000019',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000004',
    '19-capture-replay-phone-calls-kali-wireshark',
    'Capture and Replay Phone Calls with Kali Linux and Wireshark (MITM / VoIP replay)',
    'VoIP man-in-the-middle (MITM) and call replay demonstration using Kali Linux, ARP spoofing, and Wireshark in an isolated test lab.',
    'LoFoV3T17T0',
    18,
    19,
    ARRAY[
      'Analyze network traffic for Capture and Replay Phone Calls with Kali Linux and Wireshark (MITM / VoIP replay)',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- Lesson 20
  INSERT INTO public.lessons (
    id,
    course_id,
    module_id,
    slug,
    title,
    description,
    youtube_video_id,
    duration_minutes,
    order_index,
    objectives,
    tags,
    skills_taught
  ) VALUES (
    'd6a8e003-5000-4000-a000-000000000020',
    v_course_id,
    'd6a8e002-5000-4000-a000-000000000004',
    '20-hacking-ip-cameras-cctv-demos',
    'Hacking IP Cameras (CCTV) with Demos and Real World Examples',
    'Analyze IP camera (CCTV) security risks, default credentials, RTSP streaming vulnerabilities, and network hardening strategies.',
    'yMAWcHP6yn8',
    43,
    20,
    ARRAY[
      'Analyze network traffic for Hacking IP Cameras (CCTV) with Demos and Real World Examples',
      'Practice Wireshark inspection workflows in an isolated test lab',
      'Understand protocol mechanics and defense strategies'
    ],
    ARRAY['wireshark', 'packet-analysis', 'cybersecurity', 'networking'],
    ARRAY['Wireshark Inspection', 'Network Forensics']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  -- D. Playlist Source Registration
  INSERT INTO public.course_playlist_sources (
    id,
    course_id,
    playlist_id,
    playlist_url,
    default_module_id,
    sync_enabled,
    last_synced_at,
    last_success_at,
    last_sync_status
  ) VALUES (
    v_source_id,
    v_course_id,
    'PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl',
    'https://www.youtube.com/playlist?list=PLhfrWIlLOoKMBv50Y8NH6Dtfge_MrHYnl',
    v_mod5_id,
    TRUE,
    NOW(),
    NOW(),
    'success'
  )
  ON CONFLICT (playlist_id) DO UPDATE SET
    course_id = EXCLUDED.course_id,
    playlist_url = EXCLUDED.playlist_url,
    default_module_id = EXCLUDED.default_module_id,
    sync_enabled = EXCLUDED.sync_enabled;

  -- E. Map Playlist Items
  INSERT INTO public.course_playlist_items (
    playlist_source_id,
    course_id,
    lesson_id,
    youtube_video_id,
    playlist_position,
    learning_sequence,
    video_title,
    duration_seconds,
    is_embeddable,
    availability_status,
    is_active,
    last_seen_at
  ) VALUES
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000001', 'QXfaGOMT7MY', 1, 1, 'Free Wireshark and Ethical Hacking Course: Video #0', 721, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000002', '9CY42I04MFw', 2, 2, 'Free Wireshark and Ethical Hacking Course: Video #1', 1015, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000003', 'qfWSToryDos', 3, 3, 'Free Wireshark and Ethical Hacking Course: Video #2', 621, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000004', 'IdEFDkGtcQg', 4, 4, 'Free Wireshark and Ethical Hacking Course: Video #3', 412, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000005', 'WdBBYosG-YI', 5, 5, 'Wireshark Display Filters | Free Wireshark and Ethical Hacking Course: Video #4', 877, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000006', 'tM2aUpll1EQ', 6, 6, 'Too much Wireshark?! | Free Wireshark and Ethical Hacking Course: Video #5', 338, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000007', 'nGEKnYUEPcg', 7, 7, 'Never use Telnet', 511, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000008', 'PoaOgBmWJQY', 8, 8, 'Never use TFTP or FTP!', 364, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000009', 'LfZNhf2Yc8k', 9, 9, 'Why are you still using HTTP?', 334, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000010', 'uZI9ZnKRudg', 10, 10, 'Wireshark VoIP call capture and replay', 1404, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000011', '4_7A8Ikp5Cc', 11, 11, 'Wireshark Tutorial - Installation and Password sniffing', 686, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000012', 'rtm_Bofv4-8', 12, 12, 'Wireshark Install Ubuntu 20.04', 607, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000013', 'zRk5dymfNsk', 13, 13, 'Wireshark Tutorial - Profiles and Password captures', 549, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000014', 'HoYgPlmOZgo', 14, 14, 'tshark and Termshark tutorial: Capture and view wireshark captures in a console', 785, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000015', 'D9FBjUq2J74', 15, 15, 'Can you answer this CCNA Quiz?', 626, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000016', '-WefgSx_eKY', 16, 16, 'Learn. Capture. Repeat.', 1020, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000017', 'keAHKO2Fc4I', 17, 17, 'Keylogger vs Wireshark', 1956, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000018', 'Auwn3RWapRE', 18, 18, 'How TCP really works: Top 3 things you need to know!', 1794, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000019', 'LoFoV3T17T0', 19, 19, 'Capture and Replay Phone Calls with Kali Linux and Wireshark (MITM / VoIP replay)', 1072, TRUE, 'available', TRUE, NOW()),
    (v_source_id, v_course_id, 'd6a8e003-5000-4000-a000-000000000020', 'yMAWcHP6yn8', 20, 20, 'Hacking IP Cameras (CCTV) with Demos and Real World Examples', 2605, TRUE, 'available', TRUE, NOW())
  ON CONFLICT (course_id, youtube_video_id) DO UPDATE SET
    playlist_position = EXCLUDED.playlist_position,
    learning_sequence = EXCLUDED.learning_sequence,
    video_title = EXCLUDED.video_title,
    duration_seconds = EXCLUDED.duration_seconds,
    is_embeddable = EXCLUDED.is_embeddable,
    availability_status = EXCLUDED.availability_status,
    is_active = EXCLUDED.is_active,
    last_seen_at = NOW();

END $$;
