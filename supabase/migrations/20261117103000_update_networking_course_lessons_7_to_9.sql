-- =============================================================================
-- CYBERTUBE MIGRATION: 20261117103000_update_networking_course_lessons_7_to_9.sql
-- Description:
-- Safely and idempotently adds verified lessons #7, #8, and #9 to the
-- 'Networking for Hackers 2027' course.
-- Updates course total duration to 495 minutes (8 hours 15 mins).
-- Preserves existing lessons (#1 through #6), course UUID, and student progress.
-- =============================================================================

DO $$
DECLARE
  v_course_id CONSTANT UUID := 'e7b9e001-4000-4000-a000-000000000001';
  v_module_id CONSTANT UUID := 'e7b9e002-4000-4000-a000-000000000001';
  v_source_id CONSTANT UUID := 'e7b9e004-4000-4000-a000-000000000001';
BEGIN
  -- 1. Update Course Total Duration and Metadata
  UPDATE public.courses
  SET
    estimated_duration = '8 hours 15 mins',
    total_duration_minutes = 495,
    learning_objectives = ARRAY[
      'Understand how client devices exchange data across the Internet and local networks',
      'Analyze network hardware devices, topologies, and firewall boundary rules',
      'Understand latency, throughput, bandwidth constraints, and transit delays',
      'Deconstruct the 7-layer OSI model and TCP/IP protocol suite with packet encapsulation',
      'Master Layer 2 Ethernet frames, MAC addresses, and switches with Wireshark analysis',
      'Understand IPv4 addressing, ARP resolution mechanics, and ARP poisoning attacks',
      'Perform subnetting calculations, CIDR notation analysis, and network segmentation'
    ],
    updated_at = NOW()
  WHERE id = v_course_id;

  -- 2. Insert Lessons 7, 8, and 9 (Idempotent via UNIQUE (course_id, slug))
  -- Lesson 7
  INSERT INTO public.lessons (
    id, module_id, course_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'e7b9e003-4000-4000-a000-000000000007',
    v_module_id,
    v_course_id,
    '07-mac-addresses-ethernet-and-switches',
    'Networking for Hackers #7 | MAC Addresses, Ethernet & Switches (Wireshark Lab)',
    'Examine Layer 2 data link addressing, Ethernet frame structures, CAM tables, switch forwarding, and Wireshark frame dissection.',
    'BkB4Vtvwyc0',
    71,
    7,
    ARRAY[
      'Analyze Ethernet II frame headers, preamble, and CRC/FCS validation',
      'Understand MAC table learning and Layer 2 broadcast domains',
      'Perform live Ethernet frame inspection using Wireshark'
    ],
    ARRAY['mac-addresses', 'ethernet', 'switches', 'wireshark', 'layer-2'],
    ARRAY['Layer 2 frame dissection', 'Switch CAM table analysis', 'Wireshark Ethernet capture']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index;

  -- Lesson 8
  INSERT INTO public.lessons (
    id, module_id, course_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'e7b9e003-4000-4000-a000-000000000008',
    v_module_id,
    v_course_id,
    '08-ip-addresses-arp-and-arp-poisoning',
    'Networking for Hackers #8 | IP Addresses, ARP & ARP Poisoning',
    'Understand IPv4 addressing, Address Resolution Protocol (ARP) mechanics, gratuitous ARP, and hands-on ARP cache poisoning attacks.',
    'aQCqgKIEpHA',
    46,
    8,
    ARRAY[
      'Understand logical IP to physical MAC mapping via ARP request/reply cycles',
      'Analyze ARP packet headers and gratuitous ARP broadcasts',
      'Deconstruct ARP cache poisoning and Man-in-the-Middle (MitM) mechanics'
    ],
    ARRAY['ip-addresses', 'arp', 'arp-poisoning', 'mitm', 'layer-3'],
    ARRAY['ARP protocol analysis', 'ARP poisoning detection', 'MitM attack defense']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index;

  -- Lesson 9
  INSERT INTO public.lessons (
    id, module_id, course_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'e7b9e003-4000-4000-a000-000000000009',
    v_module_id,
    v_course_id,
    '09-subnetting-cidr-and-network-segmentation',
    'Networking for Hackers #9 | Subnetting, CIDR & Network Segmentation',
    'Master binary subnetting, CIDR prefix calculations, subnet masks, network vs host bits, and offensive network segmentation analysis.',
    '7ethLpR3mMY',
    61,
    9,
    ARRAY[
      'Perform decimal-to-binary conversions and bitwise ANDing for network IDs',
      'Calculate usable host ranges, broadcast addresses, and CIDR prefix masks',
      'Design network segmentation architectures and identify pivoting paths'
    ],
    ARRAY['subnetting', 'cidr', 'network-segmentation', 'ipv4', 'binary-math'],
    ARRAY['Subnet calculation', 'CIDR mask analysis', 'Network segmentation security']
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index;

  -- 3. Upsert Playlist Items
  INSERT INTO public.course_playlist_items (
    playlist_source_id, course_id, lesson_id, youtube_video_id, playlist_position, learning_sequence, video_title, duration_seconds, is_embeddable, availability_status, is_active
  ) VALUES
    (v_source_id, v_course_id, 'e7b9e003-4000-4000-a000-000000000007', 'BkB4Vtvwyc0', 2, 7, 'Networking for Hackers #7 | MAC Addresses, Ethernet & Switches (Wireshark Lab)', 4289, TRUE, 'available', TRUE),
    (v_source_id, v_course_id, 'e7b9e003-4000-4000-a000-000000000008', 'aQCqgKIEpHA', 1, 8, 'Networking for Hackers #8 | IP Addresses, ARP & ARP Poisoning', 2776, TRUE, 'available', TRUE),
    (v_source_id, v_course_id, 'e7b9e003-4000-4000-a000-000000000009', '7ethLpR3mMY', 9, 9, 'Networking for Hackers #9 | Subnetting, CIDR & Network Segmentation', 3650, TRUE, 'available', TRUE)
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
