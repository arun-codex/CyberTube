-- =============================================================================
-- CYBERTUBE REMOTE COURSE SEED SCRIPT (Phase 3B.3)
-- File: supabase/remote-seed-courses.sql
-- Description:
-- Idempotent seed script to populate courses, modules, and lessons
-- into the remote CyberTube Supabase database (iwcbuvutqhwxgovkecfa).
-- Safe to execute repeatedly in the Supabase Dashboard SQL Editor or via CLI.
-- =============================================================================

BEGIN;

-- 1. Insert/Update 3 Verified Courses
INSERT INTO public.courses (
  slug, title, short_description, description, difficulty, status,
  estimated_duration, total_duration_minutes, thumbnail_url,
  instructor_name, instructor_title, instructor_org,
  prerequisites, learning_objectives, domains, tags, featured
) VALUES
  (
    'network-packet-analysis-masterclass',
    'Network Packet Analysis & Forensics Masterclass',
    'Master Wireshark, deep-dive into TCP/IP protocol handshakes, and isolate anomalous network traffic.',
    'An intensive, hands-on video curriculum designed for SOC analysts, incident responders, and network security engineers. Learn to deconstruct network conversations, detect TCP anomalies, analyze TLS session handshakes, and conduct triage on compromised endpoints using live PCAP artifacts.',
    'intermediate',
    'published',
    '1.5 hours',
    90,
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    'Chris Greer',
    'Packet Analysis Specialist',
    'Wireshark Foundation / Packet Pioneer',
    ARRAY['Basic understanding of IPv4 addressing and subnet masks', 'Familiarity with the OSI 7-Layer model and TCP/UDP port concepts'],
    ARRAY['Capture and filter packet streams with advanced Wireshark display filter syntax', 'Diagnose network latency, packet loss, and retransmissions in TCP streams', 'Trace SSL/TLS key exchanges and verify cryptographic negotiation health', 'Extract unencrypted malware payloads and anomalous HTTP/DNS artifacts'],
    ARRAY['network-security', 'soc-blue-team', 'dfir'],
    ARRAY['wireshark', 'packet-analysis', 'pcap', 'tcp-handshake', 'network-forensics'],
    TRUE
  ),
  (
    'hardware-backdoors-cpu-internals',
    'Hardware Backdoors & CPU Architecture Security',
    'Explore x86 CPU privilege rings, undocumented instructions, and hardware-level exploitation.',
    'A deep-level hardware reverse-engineering journey exploring microarchitectural backdoors, hidden processor instruction sets, and subversion of operating system security rings directly inside silicon.',
    'advanced',
    'published',
    '1 hour',
    51,
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    'Christopher Domas',
    'Security Researcher',
    'Black Hat',
    ARRAY['Solid command of x86-64 assembly instructions and processor registers', 'Understanding of OS kernel privilege boundaries (Ring 0 vs Ring 3)'],
    ARRAY['Examine ring-minus-one hardware architectural privilege models', 'Discover undocumented CPU instructions using automated decoder fuzzing', 'Understand microcode updates, shadow registers, and silicon boundary enforcement'],
    ARRAY['malware-reverse-engineering', 'iot-embedded-security'],
    ARRAY['hardware-security', 'cpu-backdoor', 'x86-assembly', 'ring-0', 'fuzzing'],
    TRUE
  ),
  (
    'networking-and-cybersecurity-foundations',
    'Cyber Security & Computer Networking Foundations (Hindi)',
    'Comprehensive foundational guide covering network topologies, IP addressing, subnetting, and defensive core concepts.',
    'Designed specifically for vernacular learners to establish rock-solid foundations in networking protocols, IP routing, subnet masks, DNS resolution, and security architecture.',
    'beginner',
    'published',
    '2 hours 15 mins',
    135,
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    'Geeky Shows',
    'Technical Educator',
    'Geeky Shows Academy',
    ARRAY['Basic familiarity with computers and operating system concepts'],
    ARRAY['Understand the architecture of computer networks and the OSI protocol stack in Hindi', 'Calculate IPv4 subnets, network boundaries, and broadcast addresses', 'Trace client-to-server connection flows over DNS, HTTP, and TCP'],
    ARRAY['fundamentals', 'network-security'],
    ARRAY['hindi', 'networking', 'ip-addressing', 'dns', 'beginner-friendly'],
    FALSE
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  difficulty = EXCLUDED.difficulty,
  status = EXCLUDED.status,
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
  featured = EXCLUDED.featured;

-- 2. Insert/Update Course Modules (UUIDs resolved via course slug)
WITH course_lookup AS (
  SELECT id, slug FROM public.courses WHERE slug IN (
    'network-packet-analysis-masterclass',
    'hardware-backdoors-cpu-internals',
    'networking-and-cybersecurity-foundations'
  )
)
INSERT INTO public.course_modules (course_id, title, description, order_index)
SELECT c.id, m.title, m.description, m.order_index
FROM (
  VALUES
    ('network-packet-analysis-masterclass', 'Module 1: Wireshark Core Fundamentals & TCP Streams', 'Understand packet architecture, capture filter logic, and complete TCP three-way handshake dissection.', 1),
    ('network-packet-analysis-masterclass', 'Module 2: Network Forensics & Anomaly Triage', 'Advanced investigation workflows for inspecting suspicious payloads, beaconing behavior, and lateral movement.', 2),
    ('hardware-backdoors-cpu-internals', 'Module 1: Silicon Exploitation & Ring Subversion', 'Analysis of undocumented MSRs, shadow instruction decoders, and bypasses of OS memory protections.', 1),
    ('networking-and-cybersecurity-foundations', 'Module 1: Network Fundamentals & Packet Addressing', 'Complete breakdown of local and wide-area networking protocols, routing mechanisms, and IP design.', 1)
) AS m(course_slug, title, description, order_index)
JOIN course_lookup c ON c.slug = m.course_slug
ON CONFLICT (course_id, order_index) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- 3. Insert/Update Lessons (UUIDs resolved via course slug + module order index)
WITH module_lookup AS (
  SELECT m.id AS module_id, c.id AS course_id, c.slug AS course_slug, m.order_index AS module_order
  FROM public.course_modules m
  JOIN public.courses c ON c.id = m.course_id
)
INSERT INTO public.lessons (
  course_id, module_id, slug, title, description,
  youtube_video_id, duration_minutes, order_index,
  objectives, tags, skills_taught
)
SELECT
  ml.course_id,
  ml.module_id,
  l.slug,
  l.title,
  l.description,
  l.youtube_video_id,
  l.duration_minutes,
  l.order_index,
  l.objectives,
  l.tags,
  l.skills_taught
FROM (
  VALUES
    (
      'network-packet-analysis-masterclass',
      1,
      'tcp-stream-analysis',
      'Deep Dive into TCP/IP Streams and Packet Analysis',
      'Comprehensive network troubleshooting and packet inspection masterclass demonstrating TCP stream reassembly, SYN-ACK verification, and anomalous beacon detection.',
      'lb1Dw0elw0Q',
      45,
      1,
      ARRAY['Navigate the Wireshark packet list, tree, and byte views', 'Follow TCP streams and calculate round-trip delta timings', 'Identify window size exhaustion and retransmission events'],
      ARRAY['wireshark', 'tcp', 'pcap', 'protocols'],
      ARRAY['TCP stream following', 'Delta time analysis', 'Display filter filtering']
    ),
    (
      'network-packet-analysis-masterclass',
      2,
      'troubleshooting-slow-networks',
      'Diagnosing Latency & Packet Loss with Wireshark',
      'Hands-on walk-through of pinpointing whether a network slowdown is caused by client delays, server processing stalls, or transit dropouts using packet timestamps.',
      'lb1Dw0elw0Q',
      45,
      1,
      ARRAY['Distinguish between client delay and server service time', 'Isolate packet loss anomalies across intermediate routers', 'Formulate actionable remediation recommendations for network teams'],
      ARRAY['troubleshooting', 'latency', 'tcp-reset', 'forensics'],
      ARRAY['Server response time evaluation', 'Zero-window investigation']
    ),
    (
      'hardware-backdoors-cpu-internals',
      1,
      'hardware-backdoors-x86',
      'GOD MODE UNLOCKED: Hardware Backdoors in x86 CPUs',
      'Black Hat technical briefing revealing architectural ring-minus-one hardware backdoors, x86 hidden instruction sets, and CPU-level security boundary subversions.',
      '_eSAF_qT_FY',
      51,
      1,
      ARRAY['Understand undocumented MSRs in x86 architectures', 'Trace privilege transitions directly from Userland to hardware backdoors', 'Evaluate silicon-level hardware mitigations'],
      ARRAY['x86', 'assembly', 'backdoors', 'fuzzing'],
      ARRAY['Instruction fuzzing', 'Ring privilege escalation auditing']
    ),
    (
      'networking-and-cybersecurity-foundations',
      1,
      'networking-complete-foundations',
      'Complete Computer Networking & Cyber Security Overview',
      'Comprehensive Hindi-language foundational session covering network topologies, IP addressing, subnet masks, DNS resolution, and essential defensive posture.',
      'IPvYjXCsTg8',
      135,
      1,
      ARRAY['Learn the role of routers, switches, and firewalls in Hindi', 'Understand IPv4 addressing, private ranges (RFC 1918), and NAT', 'Trace DNS requests from local stub resolvers to authoritative nameservers'],
      ARRAY['networking', 'ipv4', 'subnetting', 'dns'],
      ARRAY['Subnet calculation', 'Network topology mapping']
    )
) AS l(course_slug, module_order, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught)
JOIN module_lookup ml ON ml.course_slug = l.course_slug AND ml.module_order = l.module_order
ON CONFLICT (course_id, slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  youtube_video_id = EXCLUDED.youtube_video_id,
  duration_minutes = EXCLUDED.duration_minutes,
  order_index = EXCLUDED.order_index,
  objectives = EXCLUDED.objectives,
  tags = EXCLUDED.tags,
  skills_taught = EXCLUDED.skills_taught;

COMMIT;

