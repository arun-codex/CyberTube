-- =============================================================================
-- CYBERTUBE: SEED CYBERSECURITY ZERO TO ADVANCED COMPLETE COURSE
-- =============================================================================
-- Description:
-- Idempotently seeds the 30-module Cybersecurity Zero to Advanced course,
-- all 30 modules, and all 150 video lessons into the Supabase database.
-- =============================================================================

DO $$
DECLARE
  v_course_id CONSTANT UUID := 'd9c00000-0000-4000-8000-000000000001';
BEGIN
  -- 1. Insert/Update Course
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
    instructor_org,
    status,
    tags,
    prerequisites,
    learning_objectives,
    track,
    domains,
    featured
  ) VALUES (
    v_course_id,
    'cybersecurity-zero-to-advanced',
    'Cybersecurity: Zero to Advanced — Video-First Complete Learning Path',
    'A 30-module foundational-to-advanced cybersecurity curriculum covering 150 video-guided lessons, defense-in-depth, SOC operations, SIEM, threat hunting, DFIR, ethical hacking, and capstone.',
    'A comprehensive 451-hour video-first cybersecurity curriculum designed for absolute beginners, aspiring SOC analysts, defensive security engineers, and authorized ethical hackers. Spanning 30 modules and 150 structured lessons across Foundation, SOC Core, Security Engineering, and Advanced tracks, this curriculum integrates free-to-watch curated videos, official standards (NIST CSF, CISA, MITRE ATT&CK, OWASP), hands-on lab workflows, module knowledge-check quizzes, and an end-to-end incident response capstone investigation.',
    'intermediate',
    '30 modules (451 hours)',
    5250,
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    'Professor Messer, John Hammond & Open Security Community',
    'Cybersecurity Educators & Threat Researchers',
    'CompTIA, Huntress & Open Security Foundation',
    'published',
    ARRAY['cybersecurity', 'soc-analyst', 'siem', 'splunk', 'sentinel', 'mitre-attack', 'wireshark', 'dfir', 'malware-analysis', 'owasp', 'incident-response']::TEXT[],
    ARRAY['Basic familiarity with personal computing and standard operating systems', 'Commitment to ethical defensive investigation within authorized lab boundaries', 'Personal computer capable of running virtualization or browser-based labs']::TEXT[],
    ARRAY['Master foundational cybersecurity principles including CIA triad, threat modeling, and defense-in-depth', 'Analyze network security protocols, IP packet captures, and routing telemetry using Wireshark', 'Execute security hardening and incident triage across Linux, Windows endpoints, and Active Directory domains', 'Deploy and query enterprise SIEM solutions using Splunk SPL and Microsoft Sentinel KQL', 'Correlate security telemetry, endpoint detection (EDR), and threat intelligence mapped to MITRE ATT&CK', 'Conduct authorized ethical web application security assessments adhering to OWASP Top 10 standards', 'Perform digital forensics, memory analysis, safe malware triage, and automated incident response scripts in Python', 'Execute an end-to-end incident investigation capstone report with executive and technical findings']::TEXT[],
    'cybersecurity',
    ARRAY['fundamentals', 'network-security', 'soc-blue-team', 'dfir', 'application-security', 'cloud-security', 'threat-intelligence']::TEXT[],
    TRUE
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
    status = EXCLUDED.status,
    tags = EXCLUDED.tags,
    prerequisites = EXCLUDED.prerequisites,
    learning_objectives = EXCLUDED.learning_objectives,
    track = EXCLUDED.track,
    domains = EXCLUDED.domains,
    featured = EXCLUDED.featured;

  -- 2. Insert/Update 30 Modules
  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000101', v_course_id, 'Module 01 — Cybersecurity Orientation and Ethics', 'Foundation Track • Beginner Level. Workload: 6 hours. Prerequisite: None. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 1)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000102', v_course_id, 'Module 02 — Threats, Attacks, and Security Terminology', 'Foundation Track • Beginner Level. Workload: 9 hours. Prerequisite: Module 01; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 2)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000103', v_course_id, 'Module 03 — Networking for Security Analysts', 'Foundation Track • Beginner Level. Workload: 14 hours. Prerequisite: Module 02; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 3)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000104', v_course_id, 'Module 04 — Linux Security Essentials', 'Foundation Track • Beginner Level. Workload: 12 hours. Prerequisite: Module 03; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 4)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000105', v_course_id, 'Module 05 — Windows and Active Directory Security', 'Foundation Track • Beginner Level. Workload: 13 hours. Prerequisite: Module 04; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 5)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000106', v_course_id, 'Module 06 — Cryptography, Identity and Zero Trust', 'Foundation Track • Beginner Level. Workload: 10 hours. Prerequisite: Module 05; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 6)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000107', v_course_id, 'Module 07 — Security Hardening and Vulnerability Management', 'Foundation Track • Beginner Level. Workload: 12 hours. Prerequisite: Module 06; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 7)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000108', v_course_id, 'Module 08 — SOC Foundations and Alert Triage', 'SOC Core Track • Intermediate Level. Workload: 12 hours. Prerequisite: Module 07; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 8)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000109', v_course_id, 'Module 09 — Security Logging and Telemetry', 'SOC Core Track • Intermediate Level. Workload: 12 hours. Prerequisite: Module 08; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 9)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000110', v_course_id, 'Module 10 — SIEM Fundamentals: Splunk', 'SOC Core Track • Intermediate Level. Workload: 16 hours. Prerequisite: Module 09; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 10)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000111', v_course_id, 'Module 11 — SIEM Fundamentals: Sentinel and KQL', 'SOC Core Track • Intermediate Level. Workload: 15 hours. Prerequisite: Module 10; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 11)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000112', v_course_id, 'Module 12 — MITRE ATT&CK, Threat Intelligence and IOCs', 'SOC Core Track • Intermediate Level. Workload: 13 hours. Prerequisite: Module 11; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 12)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000113', v_course_id, 'Module 13 — Phishing Detection and Email Security', 'SOC Core Track • Intermediate Level. Workload: 14 hours. Prerequisite: Module 12; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 13)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000114', v_course_id, 'Module 14 — Brute Force, Password Spraying and Account Abuse', 'SOC Core Track • Intermediate Level. Workload: 12 hours. Prerequisite: Module 13; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 14)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000115', v_course_id, 'Module 15 — Malware Fundamentals and Safe Triage', 'SOC Core Track • Intermediate Level. Workload: 16 hours. Prerequisite: Module 14; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 15)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000116', v_course_id, 'Module 16 — Ransomware Detection and Recovery', 'SOC Core Track • Intermediate Level. Workload: 15 hours. Prerequisite: Module 15; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 16)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000117', v_course_id, 'Module 17 — Network Traffic Analysis and IDS', 'SOC Core Track • Intermediate Level. Workload: 17 hours. Prerequisite: Module 16; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 17)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000118', v_course_id, 'Module 18 — Endpoint Detection and Response', 'SOC Core Track • Intermediate Level. Workload: 15 hours. Prerequisite: Module 17; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 18)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000119', v_course_id, 'Module 19 — Incident Response and Evidence Handling', 'SOC Core Track • Intermediate Level. Workload: 18 hours. Prerequisite: Module 18; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 19)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000120', v_course_id, 'Module 20 — Web Application Security and OWASP Top 10', 'Security Engineering Track • Intermediate Level. Workload: 18 hours. Prerequisite: Module 19; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 20)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000121', v_course_id, 'Module 21 — Ethical Hacking Methodology in Authorized Labs', 'Security Engineering Track • Intermediate Level. Workload: 19 hours. Prerequisite: Module 20; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 21)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000122', v_course_id, 'Module 22 — Web, API and Identity Defense', 'Security Engineering Track • Intermediate Level. Workload: 15 hours. Prerequisite: Module 21; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 22)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000123', v_course_id, 'Module 23 — Cloud Security and Cloud SOC', 'Security Engineering Track • Intermediate Level. Workload: 18 hours. Prerequisite: Module 22; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 23)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000124', v_course_id, 'Module 24 — Threat Hunting and Detection Engineering', 'Advanced Track • Advanced Level. Workload: 20 hours. Prerequisite: Module 23; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 24)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000125', v_course_id, 'Module 25 — Digital Forensics Fundamentals', 'Advanced Track • Advanced Level. Workload: 20 hours. Prerequisite: Module 24; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 25)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000126', v_course_id, 'Module 26 — Advanced Malware and Behavior Analysis', 'Advanced Track • Advanced Level. Workload: 22 hours. Prerequisite: Module 25; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 26)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000127', v_course_id, 'Module 27 — Security Automation and Python for Analysts', 'Advanced Track • Advanced Level. Workload: 17 hours. Prerequisite: Module 26; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 27)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000128', v_course_id, 'Module 28 — Secure Architecture, Governance and Compliance', 'Advanced Track • Advanced Level. Workload: 15 hours. Prerequisite: Module 27; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 28)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000129', v_course_id, 'Module 29 — Capstone: End-to-End SOC Case Investigation', 'Capstone Track • Advanced Level. Workload: 25 hours. Prerequisite: Module 28; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 29)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d9c00000-0000-4000-8000-000000000130', v_course_id, 'Module 30 — Career, Portfolio, Interviews and Next Steps', 'Capstone Track • Advanced Level. Workload: 11 hours. Prerequisite: Module 29; revisit earlier gaps as needed. Delivery: Free video instruction + official standards + hands-on lab + knowledge check.', 30)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  -- 3. Insert/Update 150 Lessons
  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000010001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000101',
    'm01-l1-cia-triad-and-risk',
    'Module 01 - Lesson 1: Cia Triad And Risk',
    'Video-guided cybersecurity lesson on Cia Triad And Risk presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'KiEptGbnEBc',
    35,
    1,
    ARRAY['Explain or demonstrate **CIA triad and risk** in a security-investigation context.', 'Explain or demonstrate **blue, red and purple teams** in a security-investigation context.', 'Explain or demonstrate **authorization and scope** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-01', 'foundation']::TEXT[],
    ARRAY['Cia Triad And Risk analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000010002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000101',
    'm01-l2-blue-red-and-purple-teams',
    'Module 01 - Lesson 2: Blue, Red And Purple Teams',
    'Video-guided cybersecurity lesson on Blue, Red And Purple Teams presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'STM3EUvL7wg',
    35,
    2,
    ARRAY['Explain or demonstrate **CIA triad and risk** in a security-investigation context.', 'Explain or demonstrate **blue, red and purple teams** in a security-investigation context.', 'Explain or demonstrate **authorization and scope** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-01', 'foundation']::TEXT[],
    ARRAY['Blue, Red And Purple Teams analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000010003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000101',
    'm01-l3-authorization-and-scope',
    'Module 01 - Lesson 3: Authorization And Scope',
    'Video-guided cybersecurity lesson on Authorization And Scope presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'SBcDGb9l6yo',
    35,
    3,
    ARRAY['Explain or demonstrate **CIA triad and risk** in a security-investigation context.', 'Explain or demonstrate **blue, red and purple teams** in a security-investigation context.', 'Explain or demonstrate **authorization and scope** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-01', 'foundation']::TEXT[],
    ARRAY['Authorization And Scope analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000010004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000101',
    'm01-l4-security-job-pathways',
    'Module 01 - Lesson 4: Security Job Pathways',
    'Video-guided cybersecurity lesson on Security Job Pathways presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'XxnCxPEllMg',
    35,
    4,
    ARRAY['Explain or demonstrate **CIA triad and risk** in a security-investigation context.', 'Explain or demonstrate **blue, red and purple teams** in a security-investigation context.', 'Explain or demonstrate **authorization and scope** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-01', 'foundation']::TEXT[],
    ARRAY['Security Job Pathways analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000010005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000101',
    'm01-l5-basic-incident-lifecycle',
    'Module 01 - Lesson 5: Basic Incident Lifecycle',
    'Video-guided cybersecurity lesson on Basic Incident Lifecycle presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'AhaZtj5P2a8',
    35,
    5,
    ARRAY['Explain or demonstrate **CIA triad and risk** in a security-investigation context.', 'Explain or demonstrate **blue, red and purple teams** in a security-investigation context.', 'Explain or demonstrate **authorization and scope** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-01', 'foundation']::TEXT[],
    ARRAY['Basic Incident Lifecycle analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000020001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000102',
    'm02-l1-threat-actor-objectives',
    'Module 02 - Lesson 1: Threat Actor Objectives',
    'Video-guided cybersecurity lesson on Threat Actor Objectives presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'XxnCxPEllMg',
    35,
    1,
    ARRAY['Explain or demonstrate **threat actor objectives** in a security-investigation context.', 'Explain or demonstrate **vulnerability vs exploit vs exposure** in a security-investigation context.', 'Explain or demonstrate **malware, phishing, brute-force and ransomware** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-02', 'foundation']::TEXT[],
    ARRAY['Threat Actor Objectives analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000020002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000102',
    'm02-l2-vulnerability-vs-exploit-vs-exposure',
    'Module 02 - Lesson 2: Vulnerability Vs Exploit Vs Exposure',
    'Video-guided cybersecurity lesson on Vulnerability Vs Exploit Vs Exposure presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'AhaZtj5P2a8',
    35,
    2,
    ARRAY['Explain or demonstrate **threat actor objectives** in a security-investigation context.', 'Explain or demonstrate **vulnerability vs exploit vs exposure** in a security-investigation context.', 'Explain or demonstrate **malware, phishing, brute-force and ransomware** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-02', 'foundation']::TEXT[],
    ARRAY['Vulnerability Vs Exploit Vs Exposure analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000020003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000102',
    'm02-l3-malware-phishing-brute-force-and-ransomware',
    'Module 02 - Lesson 3: Malware, Phishing, Brute-Force And Ransomware',
    'Video-guided cybersecurity lesson on Malware, Phishing, Brute-Force And Ransomware presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'cuTVyyS5C7M',
    35,
    3,
    ARRAY['Explain or demonstrate **threat actor objectives** in a security-investigation context.', 'Explain or demonstrate **vulnerability vs exploit vs exposure** in a security-investigation context.', 'Explain or demonstrate **malware, phishing, brute-force and ransomware** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-02', 'foundation']::TEXT[],
    ARRAY['Malware, Phishing, Brute-Force And Ransomware analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000020004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000102',
    'm02-l4-ioc-vs-ioa',
    'Module 02 - Lesson 4: Ioc Vs Ioa',
    'Video-guided cybersecurity lesson on Ioc Vs Ioa presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'zC_Pndpg8-c',
    35,
    4,
    ARRAY['Explain or demonstrate **threat actor objectives** in a security-investigation context.', 'Explain or demonstrate **vulnerability vs exploit vs exposure** in a security-investigation context.', 'Explain or demonstrate **malware, phishing, brute-force and ransomware** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-02', 'foundation']::TEXT[],
    ARRAY['Ioc Vs Ioa analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000020005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000102',
    'm02-l5-kill-chain-and-detection-opportunities',
    'Module 02 - Lesson 5: Kill Chain And Detection Opportunities',
    'Video-guided cybersecurity lesson on Kill Chain And Detection Opportunities presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'YtT8q2mUM9c',
    35,
    5,
    ARRAY['Explain or demonstrate **threat actor objectives** in a security-investigation context.', 'Explain or demonstrate **vulnerability vs exploit vs exposure** in a security-investigation context.', 'Explain or demonstrate **malware, phishing, brute-force and ransomware** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-02', 'foundation']::TEXT[],
    ARRAY['Kill Chain And Detection Opportunities analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000030001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000103',
    'm03-l1-tcp-ip-and-osi-concepts',
    'Module 03 - Lesson 1: Tcp/Ip And Osi Concepts',
    'Video-guided cybersecurity lesson on Tcp/Ip And Osi Concepts presented by John Hammond / Chris Greer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jFJMt-y6ZvU',
    35,
    1,
    ARRAY['Explain or demonstrate **TCP/IP and OSI concepts** in a security-investigation context.', 'Explain or demonstrate **common service ports** in a security-investigation context.', 'Explain or demonstrate **DNS HTTP TLS DHCP** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-03', 'foundation']::TEXT[],
    ARRAY['Tcp/Ip And Osi Concepts analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000030002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000103',
    'm03-l2-common-service-ports',
    'Module 03 - Lesson 2: Common Service Ports',
    'Video-guided cybersecurity lesson on Common Service Ports presented by John Hammond / Chris Greer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jFJMt-y6ZvU',
    35,
    2,
    ARRAY['Explain or demonstrate **TCP/IP and OSI concepts** in a security-investigation context.', 'Explain or demonstrate **common service ports** in a security-investigation context.', 'Explain or demonstrate **DNS HTTP TLS DHCP** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-03', 'foundation']::TEXT[],
    ARRAY['Common Service Ports analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000030003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000103',
    'm03-l3-dns-http-tls-dhcp',
    'Module 03 - Lesson 3: Dns Http Tls Dhcp',
    'Video-guided cybersecurity lesson on Dns Http Tls Dhcp presented by John Hammond / Chris Greer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jFJMt-y6ZvU',
    35,
    3,
    ARRAY['Explain or demonstrate **TCP/IP and OSI concepts** in a security-investigation context.', 'Explain or demonstrate **common service ports** in a security-investigation context.', 'Explain or demonstrate **DNS HTTP TLS DHCP** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-03', 'foundation']::TEXT[],
    ARRAY['Dns Http Tls Dhcp analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000030004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000103',
    'm03-l4-subnets-and-network-zones',
    'Module 03 - Lesson 4: Subnets And Network Zones',
    'Video-guided cybersecurity lesson on Subnets And Network Zones presented by John Hammond / Chris Greer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jFJMt-y6ZvU',
    35,
    4,
    ARRAY['Explain or demonstrate **TCP/IP and OSI concepts** in a security-investigation context.', 'Explain or demonstrate **common service ports** in a security-investigation context.', 'Explain or demonstrate **DNS HTTP TLS DHCP** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-03', 'foundation']::TEXT[],
    ARRAY['Subnets And Network Zones analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000030005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000103',
    'm03-l5-firewalls-nat-and-segmentation',
    'Module 03 - Lesson 5: Firewalls, Nat And Segmentation',
    'Video-guided cybersecurity lesson on Firewalls, Nat And Segmentation presented by John Hammond / Chris Greer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jFJMt-y6ZvU',
    35,
    5,
    ARRAY['Explain or demonstrate **TCP/IP and OSI concepts** in a security-investigation context.', 'Explain or demonstrate **common service ports** in a security-investigation context.', 'Explain or demonstrate **DNS HTTP TLS DHCP** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-03', 'foundation']::TEXT[],
    ARRAY['Firewalls, Nat And Segmentation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000040001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000104',
    'm04-l1-terminal-and-file-navigation',
    'Module 04 - Lesson 1: Terminal And File Navigation',
    'Video-guided cybersecurity lesson on Terminal And File Navigation presented by NetworkChuck. Covers core concepts, operational defense, and hands-on laboratory application.',
    'VbEx7B_PTOE',
    35,
    1,
    ARRAY['Explain or demonstrate **terminal and file navigation** in a security-investigation context.', 'Explain or demonstrate **users groups permissions** in a security-investigation context.', 'Explain or demonstrate **processes and services** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-04', 'foundation']::TEXT[],
    ARRAY['Terminal And File Navigation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000040002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000104',
    'm04-l2-users-groups-permissions',
    'Module 04 - Lesson 2: Users Groups Permissions',
    'Video-guided cybersecurity lesson on Users Groups Permissions presented by NetworkChuck. Covers core concepts, operational defense, and hands-on laboratory application.',
    'A3G-3hp88mo',
    35,
    2,
    ARRAY['Explain or demonstrate **terminal and file navigation** in a security-investigation context.', 'Explain or demonstrate **users groups permissions** in a security-investigation context.', 'Explain or demonstrate **processes and services** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-04', 'foundation']::TEXT[],
    ARRAY['Users Groups Permissions analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000040003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000104',
    'm04-l3-processes-and-services',
    'Module 04 - Lesson 3: Processes And Services',
    'Video-guided cybersecurity lesson on Processes And Services presented by NetworkChuck. Covers core concepts, operational defense, and hands-on laboratory application.',
    'Y17KTiJLcyQ',
    35,
    3,
    ARRAY['Explain or demonstrate **terminal and file navigation** in a security-investigation context.', 'Explain or demonstrate **users groups permissions** in a security-investigation context.', 'Explain or demonstrate **processes and services** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-04', 'foundation']::TEXT[],
    ARRAY['Processes And Services analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000040004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000104',
    'm04-l4-ssh-and-package-safety',
    'Module 04 - Lesson 4: Ssh And Package Safety',
    'Video-guided cybersecurity lesson on Ssh And Package Safety presented by NetworkChuck. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jwnvKOjmtEA',
    35,
    4,
    ARRAY['Explain or demonstrate **terminal and file navigation** in a security-investigation context.', 'Explain or demonstrate **users groups permissions** in a security-investigation context.', 'Explain or demonstrate **processes and services** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-04', 'foundation']::TEXT[],
    ARRAY['Ssh And Package Safety analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000040005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000104',
    'm04-l5-auth-logs-and-journald',
    'Module 04 - Lesson 5: Auth Logs And Journald',
    'Video-guided cybersecurity lesson on Auth Logs And Journald presented by NetworkChuck. Covers core concepts, operational defense, and hands-on laboratory application.',
    'vX3krP6JmOY',
    35,
    5,
    ARRAY['Explain or demonstrate **terminal and file navigation** in a security-investigation context.', 'Explain or demonstrate **users groups permissions** in a security-investigation context.', 'Explain or demonstrate **processes and services** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-04', 'foundation']::TEXT[],
    ARRAY['Auth Logs And Journald analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000050001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000105',
    'm05-l1-windows-security-event-logs',
    'Module 05 - Lesson 1: Windows Security Event Logs',
    'Video-guided cybersecurity lesson on Windows Security Event Logs presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jpsc4c7lntw',
    35,
    1,
    ARRAY['Explain or demonstrate **Windows Security Event Logs** in a security-investigation context.', 'Explain or demonstrate **logon events and Event IDs** in a security-investigation context.', 'Explain or demonstrate **account lockout concepts** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-05', 'foundation']::TEXT[],
    ARRAY['Windows Security Event Logs analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000050002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000105',
    'm05-l2-logon-events-and-event-ids',
    'Module 05 - Lesson 2: Logon Events And Event Ids',
    'Video-guided cybersecurity lesson on Logon Events And Event Ids presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'U6BWn81P5Ec',
    35,
    2,
    ARRAY['Explain or demonstrate **Windows Security Event Logs** in a security-investigation context.', 'Explain or demonstrate **logon events and Event IDs** in a security-investigation context.', 'Explain or demonstrate **account lockout concepts** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-05', 'foundation']::TEXT[],
    ARRAY['Logon Events And Event Ids analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000050003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000105',
    'm05-l3-account-lockout-concepts',
    'Module 05 - Lesson 3: Account Lockout Concepts',
    'Video-guided cybersecurity lesson on Account Lockout Concepts presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'u61J0xR_XPU',
    35,
    3,
    ARRAY['Explain or demonstrate **Windows Security Event Logs** in a security-investigation context.', 'Explain or demonstrate **logon events and Event IDs** in a security-investigation context.', 'Explain or demonstrate **account lockout concepts** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-05', 'foundation']::TEXT[],
    ARRAY['Account Lockout Concepts analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000050004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000105',
    'm05-l4-ad-users-groups-gpo',
    'Module 05 - Lesson 4: Ad Users Groups Gpo',
    'Video-guided cybersecurity lesson on Ad Users Groups Gpo presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'LfuTMzZke4g',
    35,
    4,
    ARRAY['Explain or demonstrate **Windows Security Event Logs** in a security-investigation context.', 'Explain or demonstrate **logon events and Event IDs** in a security-investigation context.', 'Explain or demonstrate **account lockout concepts** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-05', 'foundation']::TEXT[],
    ARRAY['Ad Users Groups Gpo analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000050005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000105',
    'm05-l5-sysmon-fundamentals',
    'Module 05 - Lesson 5: Sysmon Fundamentals',
    'Video-guided cybersecurity lesson on Sysmon Fundamentals presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'EcGmQjl6XEo',
    35,
    5,
    ARRAY['Explain or demonstrate **Windows Security Event Logs** in a security-investigation context.', 'Explain or demonstrate **logon events and Event IDs** in a security-investigation context.', 'Explain or demonstrate **account lockout concepts** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-05', 'foundation']::TEXT[],
    ARRAY['Sysmon Fundamentals analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000060001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000106',
    'm06-l1-hashing-vs-encryption',
    'Module 06 - Lesson 1: Hashing Vs Encryption',
    'Video-guided cybersecurity lesson on Hashing Vs Encryption presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'LfuTMzZke4g',
    35,
    1,
    ARRAY['Explain or demonstrate **hashing vs encryption** in a security-investigation context.', 'Explain or demonstrate **symmetric vs asymmetric crypto** in a security-investigation context.', 'Explain or demonstrate **TLS and certificates** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-06', 'foundation']::TEXT[],
    ARRAY['Hashing Vs Encryption analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000060002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000106',
    'm06-l2-symmetric-vs-asymmetric-crypto',
    'Module 06 - Lesson 2: Symmetric Vs Asymmetric Crypto',
    'Video-guided cybersecurity lesson on Symmetric Vs Asymmetric Crypto presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'EcGmQjl6XEo',
    35,
    2,
    ARRAY['Explain or demonstrate **hashing vs encryption** in a security-investigation context.', 'Explain or demonstrate **symmetric vs asymmetric crypto** in a security-investigation context.', 'Explain or demonstrate **TLS and certificates** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-06', 'foundation']::TEXT[],
    ARRAY['Symmetric Vs Asymmetric Crypto analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000060003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000106',
    'm06-l3-tls-and-certificates',
    'Module 06 - Lesson 3: Tls And Certificates',
    'Video-guided cybersecurity lesson on Tls And Certificates presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '-wqU_2ToP1M',
    35,
    3,
    ARRAY['Explain or demonstrate **hashing vs encryption** in a security-investigation context.', 'Explain or demonstrate **symmetric vs asymmetric crypto** in a security-investigation context.', 'Explain or demonstrate **TLS and certificates** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-06', 'foundation']::TEXT[],
    ARRAY['Tls And Certificates analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000060004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000106',
    'm06-l4-mfa-and-identity-risks',
    'Module 06 - Lesson 4: Mfa And Identity Risks',
    'Video-guided cybersecurity lesson on Mfa And Identity Risks presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'cLa94BZH_9s',
    35,
    4,
    ARRAY['Explain or demonstrate **hashing vs encryption** in a security-investigation context.', 'Explain or demonstrate **symmetric vs asymmetric crypto** in a security-investigation context.', 'Explain or demonstrate **TLS and certificates** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-06', 'foundation']::TEXT[],
    ARRAY['Mfa And Identity Risks analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000060005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000106',
    'm06-l5-least-privilege-and-zero-trust',
    'Module 06 - Lesson 5: Least Privilege And Zero Trust',
    'Video-guided cybersecurity lesson on Least Privilege And Zero Trust presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '6xUH0t6ugIM',
    35,
    5,
    ARRAY['Explain or demonstrate **hashing vs encryption** in a security-investigation context.', 'Explain or demonstrate **symmetric vs asymmetric crypto** in a security-investigation context.', 'Explain or demonstrate **TLS and certificates** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-06', 'foundation']::TEXT[],
    ARRAY['Least Privilege And Zero Trust analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000070001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000107',
    'm07-l1-system-baselines-and-patching',
    'Module 07 - Lesson 1: System Baselines And Patching',
    'Video-guided cybersecurity lesson on System Baselines And Patching presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'cLa94BZH_9s',
    35,
    1,
    ARRAY['Explain or demonstrate **system baselines and patching** in a security-investigation context.', 'Explain or demonstrate **CVE CVSS and exposure** in a security-investigation context.', 'Explain or demonstrate **asset inventory** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-07', 'foundation']::TEXT[],
    ARRAY['System Baselines And Patching analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000070002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000107',
    'm07-l2-cve-cvss-and-exposure',
    'Module 07 - Lesson 2: Cve Cvss And Exposure',
    'Video-guided cybersecurity lesson on Cve Cvss And Exposure presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '6xUH0t6ugIM',
    35,
    2,
    ARRAY['Explain or demonstrate **system baselines and patching** in a security-investigation context.', 'Explain or demonstrate **CVE CVSS and exposure** in a security-investigation context.', 'Explain or demonstrate **asset inventory** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-07', 'foundation']::TEXT[],
    ARRAY['Cve Cvss And Exposure analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000070003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000107',
    'm07-l3-asset-inventory',
    'Module 07 - Lesson 3: Asset Inventory',
    'Video-guided cybersecurity lesson on Asset Inventory presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '4lAbGpTDZ18',
    35,
    3,
    ARRAY['Explain or demonstrate **system baselines and patching** in a security-investigation context.', 'Explain or demonstrate **CVE CVSS and exposure** in a security-investigation context.', 'Explain or demonstrate **asset inventory** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-07', 'foundation']::TEXT[],
    ARRAY['Asset Inventory analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000070004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000107',
    'm07-l4-configuration-risk',
    'Module 07 - Lesson 4: Configuration Risk',
    'Video-guided cybersecurity lesson on Configuration Risk presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '9SD6DRCKZFU',
    35,
    4,
    ARRAY['Explain or demonstrate **system baselines and patching** in a security-investigation context.', 'Explain or demonstrate **CVE CVSS and exposure** in a security-investigation context.', 'Explain or demonstrate **asset inventory** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-07', 'foundation']::TEXT[],
    ARRAY['Configuration Risk analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000070005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000107',
    'm07-l5-remediation-prioritization',
    'Module 07 - Lesson 5: Remediation Prioritization',
    'Video-guided cybersecurity lesson on Remediation Prioritization presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'X3yoNAVuKwA',
    35,
    5,
    ARRAY['Explain or demonstrate **system baselines and patching** in a security-investigation context.', 'Explain or demonstrate **CVE CVSS and exposure** in a security-investigation context.', 'Explain or demonstrate **asset inventory** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-07', 'foundation']::TEXT[],
    ARRAY['Remediation Prioritization analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000080001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000108',
    'm08-l1-soc-roles-and-workflows',
    'Module 08 - Lesson 1: Soc Roles And Workflows',
    'Video-guided cybersecurity lesson on Soc Roles And Workflows presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '9SD6DRCKZFU',
    35,
    1,
    ARRAY['Explain or demonstrate **SOC roles and workflows** in a security-investigation context.', 'Explain or demonstrate **alert fields and telemetry** in a security-investigation context.', 'Explain or demonstrate **false positive vs true positive** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-08', 'soc-core']::TEXT[],
    ARRAY['Soc Roles And Workflows analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000080002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000108',
    'm08-l2-alert-fields-and-telemetry',
    'Module 08 - Lesson 2: Alert Fields And Telemetry',
    'Video-guided cybersecurity lesson on Alert Fields And Telemetry presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'X3yoNAVuKwA',
    35,
    2,
    ARRAY['Explain or demonstrate **SOC roles and workflows** in a security-investigation context.', 'Explain or demonstrate **alert fields and telemetry** in a security-investigation context.', 'Explain or demonstrate **false positive vs true positive** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-08', 'soc-core']::TEXT[],
    ARRAY['Alert Fields And Telemetry analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000080003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000108',
    'm08-l3-false-positive-vs-true-positive',
    'Module 08 - Lesson 3: False Positive Vs True Positive',
    'Video-guided cybersecurity lesson on False Positive Vs True Positive presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'z413PV6l_Ys',
    35,
    3,
    ARRAY['Explain or demonstrate **SOC roles and workflows** in a security-investigation context.', 'Explain or demonstrate **alert fields and telemetry** in a security-investigation context.', 'Explain or demonstrate **false positive vs true positive** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-08', 'soc-core']::TEXT[],
    ARRAY['False Positive Vs True Positive analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000080004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000108',
    'm08-l4-severity-and-escalation',
    'Module 08 - Lesson 4: Severity And Escalation',
    'Video-guided cybersecurity lesson on Severity And Escalation presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'akoDmeV3LQo',
    35,
    4,
    ARRAY['Explain or demonstrate **SOC roles and workflows** in a security-investigation context.', 'Explain or demonstrate **alert fields and telemetry** in a security-investigation context.', 'Explain or demonstrate **false positive vs true positive** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-08', 'soc-core']::TEXT[],
    ARRAY['Severity And Escalation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000080005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000108',
    'm08-l5-triage-notes-and-slas',
    'Module 08 - Lesson 5: Triage Notes And Slas',
    'Video-guided cybersecurity lesson on Triage Notes And Slas presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'kBcTczu8FsM',
    35,
    5,
    ARRAY['Explain or demonstrate **SOC roles and workflows** in a security-investigation context.', 'Explain or demonstrate **alert fields and telemetry** in a security-investigation context.', 'Explain or demonstrate **false positive vs true positive** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-08', 'soc-core']::TEXT[],
    ARRAY['Triage Notes And Slas analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000090001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000109',
    'm09-l1-endpoint-network-and-cloud-log-sources',
    'Module 09 - Lesson 1: Endpoint Network And Cloud Log Sources',
    'Video-guided cybersecurity lesson on Endpoint Network And Cloud Log Sources presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'akoDmeV3LQo',
    35,
    1,
    ARRAY['Explain or demonstrate **endpoint network and cloud log sources** in a security-investigation context.', 'Explain or demonstrate **parsing normalization timestamps** in a security-investigation context.', 'Explain or demonstrate **log retention and integrity** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-09', 'soc-core']::TEXT[],
    ARRAY['Endpoint Network And Cloud Log Sources analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000090002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000109',
    'm09-l2-parsing-normalization-timestamps',
    'Module 09 - Lesson 2: Parsing Normalization Timestamps',
    'Video-guided cybersecurity lesson on Parsing Normalization Timestamps presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'kBcTczu8FsM',
    35,
    2,
    ARRAY['Explain or demonstrate **endpoint network and cloud log sources** in a security-investigation context.', 'Explain or demonstrate **parsing normalization timestamps** in a security-investigation context.', 'Explain or demonstrate **log retention and integrity** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-09', 'soc-core']::TEXT[],
    ARRAY['Parsing Normalization Timestamps analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000090003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000109',
    'm09-l3-log-retention-and-integrity',
    'Module 09 - Lesson 3: Log Retention And Integrity',
    'Video-guided cybersecurity lesson on Log Retention And Integrity presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '0-qeeI5jTqU',
    35,
    3,
    ARRAY['Explain or demonstrate **endpoint network and cloud log sources** in a security-investigation context.', 'Explain or demonstrate **parsing normalization timestamps** in a security-investigation context.', 'Explain or demonstrate **log retention and integrity** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-09', 'soc-core']::TEXT[],
    ARRAY['Log Retention And Integrity analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000090004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000109',
    'm09-l4-event-correlation',
    'Module 09 - Lesson 4: Event Correlation',
    'Video-guided cybersecurity lesson on Event Correlation presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'MKptc1lPSw8',
    35,
    4,
    ARRAY['Explain or demonstrate **endpoint network and cloud log sources** in a security-investigation context.', 'Explain or demonstrate **parsing normalization timestamps** in a security-investigation context.', 'Explain or demonstrate **log retention and integrity** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-09', 'soc-core']::TEXT[],
    ARRAY['Event Correlation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000090005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000109',
    'm09-l5-log-visibility-gaps',
    'Module 09 - Lesson 5: Log Visibility Gaps',
    'Video-guided cybersecurity lesson on Log Visibility Gaps presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'KbtUrdBy9Yo',
    35,
    5,
    ARRAY['Explain or demonstrate **endpoint network and cloud log sources** in a security-investigation context.', 'Explain or demonstrate **parsing normalization timestamps** in a security-investigation context.', 'Explain or demonstrate **log retention and integrity** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-09', 'soc-core']::TEXT[],
    ARRAY['Log Visibility Gaps analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000100001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000110',
    'm10-l1-spl-search-and-filtering',
    'Module 10 - Lesson 1: Spl Search And Filtering',
    'Video-guided cybersecurity lesson on Spl Search And Filtering presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'MKptc1lPSw8',
    35,
    1,
    ARRAY['Explain or demonstrate **SPL search and filtering** in a security-investigation context.', 'Explain or demonstrate **field extraction** in a security-investigation context.', 'Explain or demonstrate **time bins and stats** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-10', 'soc-core']::TEXT[],
    ARRAY['Spl Search And Filtering analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000100002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000110',
    'm10-l2-field-extraction',
    'Module 10 - Lesson 2: Field Extraction',
    'Video-guided cybersecurity lesson on Field Extraction presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'KbtUrdBy9Yo',
    35,
    2,
    ARRAY['Explain or demonstrate **SPL search and filtering** in a security-investigation context.', 'Explain or demonstrate **field extraction** in a security-investigation context.', 'Explain or demonstrate **time bins and stats** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-10', 'soc-core']::TEXT[],
    ARRAY['Field Extraction analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000100003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000110',
    'm10-l3-time-bins-and-stats',
    'Module 10 - Lesson 3: Time Bins And Stats',
    'Video-guided cybersecurity lesson on Time Bins And Stats presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'narir8qpGq8',
    35,
    3,
    ARRAY['Explain or demonstrate **SPL search and filtering** in a security-investigation context.', 'Explain or demonstrate **field extraction** in a security-investigation context.', 'Explain or demonstrate **time bins and stats** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-10', 'soc-core']::TEXT[],
    ARRAY['Time Bins And Stats analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000100004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000110',
    'm10-l4-dashboards-and-alert-logic',
    'Module 10 - Lesson 4: Dashboards And Alert Logic',
    'Video-guided cybersecurity lesson on Dashboards And Alert Logic presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'qFUOLkEk8AQ',
    35,
    4,
    ARRAY['Explain or demonstrate **SPL search and filtering** in a security-investigation context.', 'Explain or demonstrate **field extraction** in a security-investigation context.', 'Explain or demonstrate **time bins and stats** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-10', 'soc-core']::TEXT[],
    ARRAY['Dashboards And Alert Logic analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000100005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000110',
    'm10-l5-investigation-workflow',
    'Module 10 - Lesson 5: Investigation Workflow',
    'Video-guided cybersecurity lesson on Investigation Workflow presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'PKgw0CLZIhE',
    35,
    5,
    ARRAY['Explain or demonstrate **SPL search and filtering** in a security-investigation context.', 'Explain or demonstrate **field extraction** in a security-investigation context.', 'Explain or demonstrate **time bins and stats** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-10', 'soc-core']::TEXT[],
    ARRAY['Investigation Workflow analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000110001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000111',
    'm11-l1-kql-where-project-summarize',
    'Module 11 - Lesson 1: Kql Where Project Summarize',
    'Video-guided cybersecurity lesson on Kql Where Project Summarize presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'qFUOLkEk8AQ',
    35,
    1,
    ARRAY['Explain or demonstrate **KQL where project summarize** in a security-investigation context.', 'Explain or demonstrate **Sentinel analytic rules** in a security-investigation context.', 'Explain or demonstrate **incident entities** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-11', 'soc-core']::TEXT[],
    ARRAY['Kql Where Project Summarize analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000110002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000111',
    'm11-l2-sentinel-analytic-rules',
    'Module 11 - Lesson 2: Sentinel Analytic Rules',
    'Video-guided cybersecurity lesson on Sentinel Analytic Rules presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'PKgw0CLZIhE',
    35,
    2,
    ARRAY['Explain or demonstrate **KQL where project summarize** in a security-investigation context.', 'Explain or demonstrate **Sentinel analytic rules** in a security-investigation context.', 'Explain or demonstrate **incident entities** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-11', 'soc-core']::TEXT[],
    ARRAY['Sentinel Analytic Rules analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000110003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000111',
    'm11-l3-incident-entities',
    'Module 11 - Lesson 3: Incident Entities',
    'Video-guided cybersecurity lesson on Incident Entities presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'TaTaEvqjjDM',
    35,
    3,
    ARRAY['Explain or demonstrate **KQL where project summarize** in a security-investigation context.', 'Explain or demonstrate **Sentinel analytic rules** in a security-investigation context.', 'Explain or demonstrate **incident entities** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-11', 'soc-core']::TEXT[],
    ARRAY['Incident Entities analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000110004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000111',
    'm11-l4-workbooks-and-hunting-queries',
    'Module 11 - Lesson 4: Workbooks And Hunting Queries',
    'Video-guided cybersecurity lesson on Workbooks And Hunting Queries presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    't2JrPrzRDLA',
    35,
    4,
    ARRAY['Explain or demonstrate **KQL where project summarize** in a security-investigation context.', 'Explain or demonstrate **Sentinel analytic rules** in a security-investigation context.', 'Explain or demonstrate **incident entities** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-11', 'soc-core']::TEXT[],
    ARRAY['Workbooks And Hunting Queries analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000110005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000111',
    'm11-l5-cloud-cost-and-data-permissions',
    'Module 11 - Lesson 5: Cloud Cost And Data Permissions',
    'Video-guided cybersecurity lesson on Cloud Cost And Data Permissions presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'V2DCYO-sWRQ',
    35,
    5,
    ARRAY['Explain or demonstrate **KQL where project summarize** in a security-investigation context.', 'Explain or demonstrate **Sentinel analytic rules** in a security-investigation context.', 'Explain or demonstrate **incident entities** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-11', 'soc-core']::TEXT[],
    ARRAY['Cloud Cost And Data Permissions analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000120001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000112',
    'm12-l1-tactics-techniques-subtechniques',
    'Module 12 - Lesson 1: Tactics Techniques Subtechniques',
    'Video-guided cybersecurity lesson on Tactics Techniques Subtechniques presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    't2JrPrzRDLA',
    35,
    1,
    ARRAY['Explain or demonstrate **tactics techniques subtechniques** in a security-investigation context.', 'Explain or demonstrate **IOC reliability and expiry** in a security-investigation context.', 'Explain or demonstrate **intel source confidence** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-12', 'soc-core']::TEXT[],
    ARRAY['Tactics Techniques Subtechniques analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000120002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000112',
    'm12-l2-ioc-reliability-and-expiry',
    'Module 12 - Lesson 2: Ioc Reliability And Expiry',
    'Video-guided cybersecurity lesson on Ioc Reliability And Expiry presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'V2DCYO-sWRQ',
    35,
    2,
    ARRAY['Explain or demonstrate **tactics techniques subtechniques** in a security-investigation context.', 'Explain or demonstrate **IOC reliability and expiry** in a security-investigation context.', 'Explain or demonstrate **intel source confidence** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-12', 'soc-core']::TEXT[],
    ARRAY['Ioc Reliability And Expiry analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000120003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000112',
    'm12-l3-intel-source-confidence',
    'Module 12 - Lesson 3: Intel Source Confidence',
    'Video-guided cybersecurity lesson on Intel Source Confidence presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'WqvCJLpwExY',
    35,
    3,
    ARRAY['Explain or demonstrate **tactics techniques subtechniques** in a security-investigation context.', 'Explain or demonstrate **IOC reliability and expiry** in a security-investigation context.', 'Explain or demonstrate **intel source confidence** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-12', 'soc-core']::TEXT[],
    ARRAY['Intel Source Confidence analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000120004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000112',
    'm12-l4-campaign-mapping',
    'Module 12 - Lesson 4: Campaign Mapping',
    'Video-guided cybersecurity lesson on Campaign Mapping presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'NBKzlUqzVmE',
    35,
    4,
    ARRAY['Explain or demonstrate **tactics techniques subtechniques** in a security-investigation context.', 'Explain or demonstrate **IOC reliability and expiry** in a security-investigation context.', 'Explain or demonstrate **intel source confidence** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-12', 'soc-core']::TEXT[],
    ARRAY['Campaign Mapping analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000120005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000112',
    'm12-l5-att-ck-guided-detection-gaps',
    'Module 12 - Lesson 5: Att&Ck-Guided Detection Gaps',
    'Video-guided cybersecurity lesson on Att&Ck-Guided Detection Gaps presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'DRfAwwdzYpU',
    35,
    5,
    ARRAY['Explain or demonstrate **tactics techniques subtechniques** in a security-investigation context.', 'Explain or demonstrate **IOC reliability and expiry** in a security-investigation context.', 'Explain or demonstrate **intel source confidence** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-12', 'soc-core']::TEXT[],
    ARRAY['Att&Ck-Guided Detection Gaps analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000130001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000113',
    'm13-l1-email-headers-and-authentication',
    'Module 13 - Lesson 1: Email Headers And Authentication',
    'Video-guided cybersecurity lesson on Email Headers And Authentication presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'NBKzlUqzVmE',
    35,
    1,
    ARRAY['Explain or demonstrate **email headers and authentication** in a security-investigation context.', 'Explain or demonstrate **SPF DKIM DMARC concepts** in a security-investigation context.', 'Explain or demonstrate **attachment and URL triage** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-13', 'soc-core']::TEXT[],
    ARRAY['Email Headers And Authentication analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000130002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000113',
    'm13-l2-spf-dkim-dmarc-concepts',
    'Module 13 - Lesson 2: Spf Dkim Dmarc Concepts',
    'Video-guided cybersecurity lesson on Spf Dkim Dmarc Concepts presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'DRfAwwdzYpU',
    35,
    2,
    ARRAY['Explain or demonstrate **email headers and authentication** in a security-investigation context.', 'Explain or demonstrate **SPF DKIM DMARC concepts** in a security-investigation context.', 'Explain or demonstrate **attachment and URL triage** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-13', 'soc-core']::TEXT[],
    ARRAY['Spf Dkim Dmarc Concepts analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000130003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000113',
    'm13-l3-attachment-and-url-triage',
    'Module 13 - Lesson 3: Attachment And Url Triage',
    'Video-guided cybersecurity lesson on Attachment And Url Triage presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'FDFxGLnZtoY',
    35,
    3,
    ARRAY['Explain or demonstrate **email headers and authentication** in a security-investigation context.', 'Explain or demonstrate **SPF DKIM DMARC concepts** in a security-investigation context.', 'Explain or demonstrate **attachment and URL triage** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-13', 'soc-core']::TEXT[],
    ARRAY['Attachment And Url Triage analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000130004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000113',
    'm13-l4-business-email-compromise',
    'Module 13 - Lesson 4: Business Email Compromise',
    'Video-guided cybersecurity lesson on Business Email Compromise presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '-eZs8wjjGGE',
    35,
    4,
    ARRAY['Explain or demonstrate **email headers and authentication** in a security-investigation context.', 'Explain or demonstrate **SPF DKIM DMARC concepts** in a security-investigation context.', 'Explain or demonstrate **attachment and URL triage** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-13', 'soc-core']::TEXT[],
    ARRAY['Business Email Compromise analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000130005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000113',
    'm13-l5-user-notification-and-containment',
    'Module 13 - Lesson 5: User Notification And Containment',
    'Video-guided cybersecurity lesson on User Notification And Containment presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'Su8ANmAoerU',
    35,
    5,
    ARRAY['Explain or demonstrate **email headers and authentication** in a security-investigation context.', 'Explain or demonstrate **SPF DKIM DMARC concepts** in a security-investigation context.', 'Explain or demonstrate **attachment and URL triage** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-13', 'soc-core']::TEXT[],
    ARRAY['User Notification And Containment analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000140001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000114',
    'm14-l1-brute-force-vs-spraying-vs-stuffing',
    'Module 14 - Lesson 1: Brute-Force Vs Spraying Vs Stuffing',
    'Video-guided cybersecurity lesson on Brute-Force Vs Spraying Vs Stuffing presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '-eZs8wjjGGE',
    35,
    1,
    ARRAY['Explain or demonstrate **brute-force vs spraying vs stuffing** in a security-investigation context.', 'Explain or demonstrate **failed/successful login patterns** in a security-investigation context.', 'Explain or demonstrate **MFA events** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-14', 'soc-core']::TEXT[],
    ARRAY['Brute-Force Vs Spraying Vs Stuffing analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000140002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000114',
    'm14-l2-failed-successful-login-patterns',
    'Module 14 - Lesson 2: Failed/Successful Login Patterns',
    'Video-guided cybersecurity lesson on Failed/Successful Login Patterns presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'Su8ANmAoerU',
    35,
    2,
    ARRAY['Explain or demonstrate **brute-force vs spraying vs stuffing** in a security-investigation context.', 'Explain or demonstrate **failed/successful login patterns** in a security-investigation context.', 'Explain or demonstrate **MFA events** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-14', 'soc-core']::TEXT[],
    ARRAY['Failed/Successful Login Patterns analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000140003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000114',
    'm14-l3-mfa-events',
    'Module 14 - Lesson 3: Mfa Events',
    'Video-guided cybersecurity lesson on Mfa Events presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '-VmI3xFJw78',
    35,
    3,
    ARRAY['Explain or demonstrate **brute-force vs spraying vs stuffing** in a security-investigation context.', 'Explain or demonstrate **failed/successful login patterns** in a security-investigation context.', 'Explain or demonstrate **MFA events** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-14', 'soc-core']::TEXT[],
    ARRAY['Mfa Events analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000140004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000114',
    'm14-l4-identity-based-detections',
    'Module 14 - Lesson 4: Identity-Based Detections',
    'Video-guided cybersecurity lesson on Identity-Based Detections presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'nu27ovJ5rqw',
    35,
    4,
    ARRAY['Explain or demonstrate **brute-force vs spraying vs stuffing** in a security-investigation context.', 'Explain or demonstrate **failed/successful login patterns** in a security-investigation context.', 'Explain or demonstrate **MFA events** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-14', 'soc-core']::TEXT[],
    ARRAY['Identity-Based Detections analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000140005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000114',
    'm14-l5-response-and-lockout-tradeoffs',
    'Module 14 - Lesson 5: Response And Lockout Tradeoffs',
    'Video-guided cybersecurity lesson on Response And Lockout Tradeoffs presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'oIpOuTX2HRs',
    35,
    5,
    ARRAY['Explain or demonstrate **brute-force vs spraying vs stuffing** in a security-investigation context.', 'Explain or demonstrate **failed/successful login patterns** in a security-investigation context.', 'Explain or demonstrate **MFA events** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-14', 'soc-core']::TEXT[],
    ARRAY['Response And Lockout Tradeoffs analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000150001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000115',
    'm15-l1-malware-families-and-behavior',
    'Module 15 - Lesson 1: Malware Families And Behavior',
    'Video-guided cybersecurity lesson on Malware Families And Behavior presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    1,
    ARRAY['Explain or demonstrate **malware families and behavior** in a security-investigation context.', 'Explain or demonstrate **hash reputation and signatures** in a security-investigation context.', 'Explain or demonstrate **static metadata and strings** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-15', 'soc-core']::TEXT[],
    ARRAY['Malware Families And Behavior analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000150002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000115',
    'm15-l2-hash-reputation-and-signatures',
    'Module 15 - Lesson 2: Hash Reputation And Signatures',
    'Video-guided cybersecurity lesson on Hash Reputation And Signatures presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    2,
    ARRAY['Explain or demonstrate **malware families and behavior** in a security-investigation context.', 'Explain or demonstrate **hash reputation and signatures** in a security-investigation context.', 'Explain or demonstrate **static metadata and strings** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-15', 'soc-core']::TEXT[],
    ARRAY['Hash Reputation And Signatures analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000150003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000115',
    'm15-l3-static-metadata-and-strings',
    'Module 15 - Lesson 3: Static Metadata And Strings',
    'Video-guided cybersecurity lesson on Static Metadata And Strings presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    3,
    ARRAY['Explain or demonstrate **malware families and behavior** in a security-investigation context.', 'Explain or demonstrate **hash reputation and signatures** in a security-investigation context.', 'Explain or demonstrate **static metadata and strings** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-15', 'soc-core']::TEXT[],
    ARRAY['Static Metadata And Strings analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000150004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000115',
    'm15-l4-sandbox-safety-and-evidence',
    'Module 15 - Lesson 4: Sandbox Safety And Evidence',
    'Video-guided cybersecurity lesson on Sandbox Safety And Evidence presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    4,
    ARRAY['Explain or demonstrate **malware families and behavior** in a security-investigation context.', 'Explain or demonstrate **hash reputation and signatures** in a security-investigation context.', 'Explain or demonstrate **static metadata and strings** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-15', 'soc-core']::TEXT[],
    ARRAY['Sandbox Safety And Evidence analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000150005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000115',
    'm15-l5-execution-trees-and-persistence-concepts',
    'Module 15 - Lesson 5: Execution Trees And Persistence Concepts',
    'Video-guided cybersecurity lesson on Execution Trees And Persistence Concepts presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    5,
    ARRAY['Explain or demonstrate **malware families and behavior** in a security-investigation context.', 'Explain or demonstrate **hash reputation and signatures** in a security-investigation context.', 'Explain or demonstrate **static metadata and strings** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-15', 'soc-core']::TEXT[],
    ARRAY['Execution Trees And Persistence Concepts analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000160001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000116',
    'm16-l1-ransomware-behavior-and-precursors',
    'Module 16 - Lesson 1: Ransomware Behavior And Precursors',
    'Video-guided cybersecurity lesson on Ransomware Behavior And Precursors presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'BoxeL5ybOXI',
    35,
    1,
    ARRAY['Explain or demonstrate **ransomware behavior and precursors** in a security-investigation context.', 'Explain or demonstrate **initial access and lateral movement signals** in a security-investigation context.', 'Explain or demonstrate **backup design and isolation** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-16', 'soc-core']::TEXT[],
    ARRAY['Ransomware Behavior And Precursors analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000160002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000116',
    'm16-l2-initial-access-and-lateral-movement-signals',
    'Module 16 - Lesson 2: Initial Access And Lateral Movement Signals',
    'Video-guided cybersecurity lesson on Initial Access And Lateral Movement Signals presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'tSLqrKhUvts',
    35,
    2,
    ARRAY['Explain or demonstrate **ransomware behavior and precursors** in a security-investigation context.', 'Explain or demonstrate **initial access and lateral movement signals** in a security-investigation context.', 'Explain or demonstrate **backup design and isolation** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-16', 'soc-core']::TEXT[],
    ARRAY['Initial Access And Lateral Movement Signals analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000160003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000116',
    'm16-l3-backup-design-and-isolation',
    'Module 16 - Lesson 3: Backup Design And Isolation',
    'Video-guided cybersecurity lesson on Backup Design And Isolation presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'M_Af6_8JTuo',
    35,
    3,
    ARRAY['Explain or demonstrate **ransomware behavior and precursors** in a security-investigation context.', 'Explain or demonstrate **initial access and lateral movement signals** in a security-investigation context.', 'Explain or demonstrate **backup design and isolation** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-16', 'soc-core']::TEXT[],
    ARRAY['Backup Design And Isolation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000160004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000116',
    'm16-l4-incident-containment',
    'Module 16 - Lesson 4: Incident Containment',
    'Video-guided cybersecurity lesson on Incident Containment presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'ai6qS13gKRo',
    35,
    4,
    ARRAY['Explain or demonstrate **ransomware behavior and precursors** in a security-investigation context.', 'Explain or demonstrate **initial access and lateral movement signals** in a security-investigation context.', 'Explain or demonstrate **backup design and isolation** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-16', 'soc-core']::TEXT[],
    ARRAY['Incident Containment analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000160005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000116',
    'm16-l5-restoration-and-lessons-learned',
    'Module 16 - Lesson 5: Restoration And Lessons Learned',
    'Video-guided cybersecurity lesson on Restoration And Lessons Learned presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'xDhUBQ_lnUA',
    35,
    5,
    ARRAY['Explain or demonstrate **ransomware behavior and precursors** in a security-investigation context.', 'Explain or demonstrate **initial access and lateral movement signals** in a security-investigation context.', 'Explain or demonstrate **backup design and isolation** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-16', 'soc-core']::TEXT[],
    ARRAY['Restoration And Lessons Learned analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000170001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000117',
    'm17-l1-wireshark-filters',
    'Module 17 - Lesson 1: Wireshark Filters',
    'Video-guided cybersecurity lesson on Wireshark Filters presented by John Hammond / Chris Greer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jFJMt-y6ZvU',
    35,
    1,
    ARRAY['Explain or demonstrate **Wireshark filters** in a security-investigation context.', 'Explain or demonstrate **TCP stream interpretation** in a security-investigation context.', 'Explain or demonstrate **DNS anomalies** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-17', 'soc-core']::TEXT[],
    ARRAY['Wireshark Filters analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000170002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000117',
    'm17-l2-tcp-stream-interpretation',
    'Module 17 - Lesson 2: Tcp Stream Interpretation',
    'Video-guided cybersecurity lesson on Tcp Stream Interpretation presented by John Hammond / Chris Greer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jFJMt-y6ZvU',
    35,
    2,
    ARRAY['Explain or demonstrate **Wireshark filters** in a security-investigation context.', 'Explain or demonstrate **TCP stream interpretation** in a security-investigation context.', 'Explain or demonstrate **DNS anomalies** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-17', 'soc-core']::TEXT[],
    ARRAY['Tcp Stream Interpretation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000170003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000117',
    'm17-l3-dns-anomalies',
    'Module 17 - Lesson 3: Dns Anomalies',
    'Video-guided cybersecurity lesson on Dns Anomalies presented by John Hammond / Chris Greer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jFJMt-y6ZvU',
    35,
    3,
    ARRAY['Explain or demonstrate **Wireshark filters** in a security-investigation context.', 'Explain or demonstrate **TCP stream interpretation** in a security-investigation context.', 'Explain or demonstrate **DNS anomalies** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-17', 'soc-core']::TEXT[],
    ARRAY['Dns Anomalies analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000170004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000117',
    'm17-l4-ids-signatures-and-alerts',
    'Module 17 - Lesson 4: Ids Signatures And Alerts',
    'Video-guided cybersecurity lesson on Ids Signatures And Alerts presented by John Hammond / Chris Greer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jFJMt-y6ZvU',
    35,
    4,
    ARRAY['Explain or demonstrate **Wireshark filters** in a security-investigation context.', 'Explain or demonstrate **TCP stream interpretation** in a security-investigation context.', 'Explain or demonstrate **DNS anomalies** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-17', 'soc-core']::TEXT[],
    ARRAY['Ids Signatures And Alerts analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000170005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000117',
    'm17-l5-zeek-and-suricata-orientation',
    'Module 17 - Lesson 5: Zeek And Suricata Orientation',
    'Video-guided cybersecurity lesson on Zeek And Suricata Orientation presented by John Hammond / Chris Greer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jFJMt-y6ZvU',
    35,
    5,
    ARRAY['Explain or demonstrate **Wireshark filters** in a security-investigation context.', 'Explain or demonstrate **TCP stream interpretation** in a security-investigation context.', 'Explain or demonstrate **DNS anomalies** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-17', 'soc-core']::TEXT[],
    ARRAY['Zeek And Suricata Orientation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000180001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000118',
    'm18-l1-endpoint-telemetry-and-process-trees',
    'Module 18 - Lesson 1: Endpoint Telemetry And Process Trees',
    'Video-guided cybersecurity lesson on Endpoint Telemetry And Process Trees presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '7aJaEQy6Yoc',
    35,
    1,
    ARRAY['Explain or demonstrate **endpoint telemetry and process trees** in a security-investigation context.', 'Explain or demonstrate **EDR alert triage** in a security-investigation context.', 'Explain or demonstrate **file hashes and command-lines** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-18', 'soc-core']::TEXT[],
    ARRAY['Endpoint Telemetry And Process Trees analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000180002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000118',
    'm18-l2-edr-alert-triage',
    'Module 18 - Lesson 2: Edr Alert Triage',
    'Video-guided cybersecurity lesson on Edr Alert Triage presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '-ZfbifHwEVE',
    35,
    2,
    ARRAY['Explain or demonstrate **endpoint telemetry and process trees** in a security-investigation context.', 'Explain or demonstrate **EDR alert triage** in a security-investigation context.', 'Explain or demonstrate **file hashes and command-lines** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-18', 'soc-core']::TEXT[],
    ARRAY['Edr Alert Triage analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000180003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000118',
    'm18-l3-file-hashes-and-command-lines',
    'Module 18 - Lesson 3: File Hashes And Command-Lines',
    'Video-guided cybersecurity lesson on File Hashes And Command-Lines presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'x72hG9GvkaQ',
    35,
    3,
    ARRAY['Explain or demonstrate **endpoint telemetry and process trees** in a security-investigation context.', 'Explain or demonstrate **EDR alert triage** in a security-investigation context.', 'Explain or demonstrate **file hashes and command-lines** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-18', 'soc-core']::TEXT[],
    ARRAY['File Hashes And Command-Lines analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000180004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000118',
    'm18-l4-host-isolation-decisions',
    'Module 18 - Lesson 4: Host Isolation Decisions',
    'Video-guided cybersecurity lesson on Host Isolation Decisions presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'yDeDGCh_PDs',
    35,
    4,
    ARRAY['Explain or demonstrate **endpoint telemetry and process trees** in a security-investigation context.', 'Explain or demonstrate **EDR alert triage** in a security-investigation context.', 'Explain or demonstrate **file hashes and command-lines** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-18', 'soc-core']::TEXT[],
    ARRAY['Host Isolation Decisions analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000180005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000118',
    'm18-l5-endpoint-containment-documentation',
    'Module 18 - Lesson 5: Endpoint Containment Documentation',
    'Video-guided cybersecurity lesson on Endpoint Containment Documentation presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'Fc8ZJfmapbI',
    35,
    5,
    ARRAY['Explain or demonstrate **endpoint telemetry and process trees** in a security-investigation context.', 'Explain or demonstrate **EDR alert triage** in a security-investigation context.', 'Explain or demonstrate **file hashes and command-lines** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-18', 'soc-core']::TEXT[],
    ARRAY['Endpoint Containment Documentation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000190001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000119',
    'm19-l1-preparation-detection-analysis-containment-recovery',
    'Module 19 - Lesson 1: Preparation Detection Analysis Containment Recovery',
    'Video-guided cybersecurity lesson on Preparation Detection Analysis Containment Recovery presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'yDeDGCh_PDs',
    35,
    1,
    ARRAY['Explain or demonstrate **preparation detection analysis containment recovery** in a security-investigation context.', 'Explain or demonstrate **chain of custody** in a security-investigation context.', 'Explain or demonstrate **evidence prioritization** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-19', 'soc-core']::TEXT[],
    ARRAY['Preparation Detection Analysis Containment Recovery analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000190002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000119',
    'm19-l2-chain-of-custody',
    'Module 19 - Lesson 2: Chain Of Custody',
    'Video-guided cybersecurity lesson on Chain Of Custody presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'Fc8ZJfmapbI',
    35,
    2,
    ARRAY['Explain or demonstrate **preparation detection analysis containment recovery** in a security-investigation context.', 'Explain or demonstrate **chain of custody** in a security-investigation context.', 'Explain or demonstrate **evidence prioritization** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-19', 'soc-core']::TEXT[],
    ARRAY['Chain Of Custody analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000190003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000119',
    'm19-l3-evidence-prioritization',
    'Module 19 - Lesson 3: Evidence Prioritization',
    'Video-guided cybersecurity lesson on Evidence Prioritization presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'wXoC46Qr_9Q',
    35,
    3,
    ARRAY['Explain or demonstrate **preparation detection analysis containment recovery** in a security-investigation context.', 'Explain or demonstrate **chain of custody** in a security-investigation context.', 'Explain or demonstrate **evidence prioritization** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-19', 'soc-core']::TEXT[],
    ARRAY['Evidence Prioritization analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000190004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000119',
    'm19-l4-incident-communication',
    'Module 19 - Lesson 4: Incident Communication',
    'Video-guided cybersecurity lesson on Incident Communication presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '8qpQ8Q6xxiU',
    35,
    4,
    ARRAY['Explain or demonstrate **preparation detection analysis containment recovery** in a security-investigation context.', 'Explain or demonstrate **chain of custody** in a security-investigation context.', 'Explain or demonstrate **evidence prioritization** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-19', 'soc-core']::TEXT[],
    ARRAY['Incident Communication analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000190005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000119',
    'm19-l5-post-incident-review',
    'Module 19 - Lesson 5: Post-Incident Review',
    'Video-guided cybersecurity lesson on Post-Incident Review presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jd001Hj7XWM',
    35,
    5,
    ARRAY['Explain or demonstrate **preparation detection analysis containment recovery** in a security-investigation context.', 'Explain or demonstrate **chain of custody** in a security-investigation context.', 'Explain or demonstrate **evidence prioritization** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-19', 'soc-core']::TEXT[],
    ARRAY['Post-Incident Review analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000200001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000120',
    'm20-l1-http-request-response-security',
    'Module 20 - Lesson 1: Http Request/Response Security',
    'Video-guided cybersecurity lesson on Http Request/Response Security presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '8qpQ8Q6xxiU',
    35,
    1,
    ARRAY['Explain or demonstrate **HTTP request/response security** in a security-investigation context.', 'Explain or demonstrate **injection and access-control flaws** in a security-investigation context.', 'Explain or demonstrate **authentication and session flaws** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-20', 'security-engineering']::TEXT[],
    ARRAY['Http Request/Response Security analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000200002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000120',
    'm20-l2-injection-and-access-control-flaws',
    'Module 20 - Lesson 2: Injection And Access-Control Flaws',
    'Video-guided cybersecurity lesson on Injection And Access-Control Flaws presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'jd001Hj7XWM',
    35,
    2,
    ARRAY['Explain or demonstrate **HTTP request/response security** in a security-investigation context.', 'Explain or demonstrate **injection and access-control flaws** in a security-investigation context.', 'Explain or demonstrate **authentication and session flaws** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-20', 'security-engineering']::TEXT[],
    ARRAY['Injection And Access-Control Flaws analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000200003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000120',
    'm20-l3-authentication-and-session-flaws',
    'Module 20 - Lesson 3: Authentication And Session Flaws',
    'Video-guided cybersecurity lesson on Authentication And Session Flaws presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'HDiNPPrGhzE',
    35,
    3,
    ARRAY['Explain or demonstrate **HTTP request/response security** in a security-investigation context.', 'Explain or demonstrate **injection and access-control flaws** in a security-investigation context.', 'Explain or demonstrate **authentication and session flaws** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-20', 'security-engineering']::TEXT[],
    ARRAY['Authentication And Session Flaws analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000200004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000120',
    'm20-l4-secure-coding-guidance',
    'Module 20 - Lesson 4: Secure Coding Guidance',
    'Video-guided cybersecurity lesson on Secure Coding Guidance presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'Ap3Z_0ZdqpQ',
    35,
    4,
    ARRAY['Explain or demonstrate **HTTP request/response security** in a security-investigation context.', 'Explain or demonstrate **injection and access-control flaws** in a security-investigation context.', 'Explain or demonstrate **authentication and session flaws** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-20', 'security-engineering']::TEXT[],
    ARRAY['Secure Coding Guidance analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000200005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000120',
    'm20-l5-testing-boundaries-and-reporting',
    'Module 20 - Lesson 5: Testing Boundaries And Reporting',
    'Video-guided cybersecurity lesson on Testing Boundaries And Reporting presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'l64La1xYXL4',
    35,
    5,
    ARRAY['Explain or demonstrate **HTTP request/response security** in a security-investigation context.', 'Explain or demonstrate **injection and access-control flaws** in a security-investigation context.', 'Explain or demonstrate **authentication and session flaws** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-20', 'security-engineering']::TEXT[],
    ARRAY['Testing Boundaries And Reporting analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000210001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000121',
    'm21-l1-scope-and-rules-of-engagement',
    'Module 21 - Lesson 1: Scope And Rules Of Engagement',
    'Video-guided cybersecurity lesson on Scope And Rules Of Engagement presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'Ap3Z_0ZdqpQ',
    35,
    1,
    ARRAY['Explain or demonstrate **scope and rules of engagement** in a security-investigation context.', 'Explain or demonstrate **asset discovery concepts** in a security-investigation context.', 'Explain or demonstrate **service enumeration** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-21', 'security-engineering']::TEXT[],
    ARRAY['Scope And Rules Of Engagement analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000210002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000121',
    'm21-l2-asset-discovery-concepts',
    'Module 21 - Lesson 2: Asset Discovery Concepts',
    'Video-guided cybersecurity lesson on Asset Discovery Concepts presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'l64La1xYXL4',
    35,
    2,
    ARRAY['Explain or demonstrate **scope and rules of engagement** in a security-investigation context.', 'Explain or demonstrate **asset discovery concepts** in a security-investigation context.', 'Explain or demonstrate **service enumeration** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-21', 'security-engineering']::TEXT[],
    ARRAY['Asset Discovery Concepts analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000210003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000121',
    'm21-l3-service-enumeration',
    'Module 21 - Lesson 3: Service Enumeration',
    'Video-guided cybersecurity lesson on Service Enumeration presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '7QuYupuic3Q',
    35,
    3,
    ARRAY['Explain or demonstrate **scope and rules of engagement** in a security-investigation context.', 'Explain or demonstrate **asset discovery concepts** in a security-investigation context.', 'Explain or demonstrate **service enumeration** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-21', 'security-engineering']::TEXT[],
    ARRAY['Service Enumeration analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000210004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000121',
    'm21-l4-vulnerability-validation',
    'Module 21 - Lesson 4: Vulnerability Validation',
    'Video-guided cybersecurity lesson on Vulnerability Validation presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'WlOslEy3ztg',
    35,
    4,
    ARRAY['Explain or demonstrate **scope and rules of engagement** in a security-investigation context.', 'Explain or demonstrate **asset discovery concepts** in a security-investigation context.', 'Explain or demonstrate **service enumeration** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-21', 'security-engineering']::TEXT[],
    ARRAY['Vulnerability Validation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000210005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000121',
    'm21-l5-responsible-findings-communication',
    'Module 21 - Lesson 5: Responsible Findings Communication',
    'Video-guided cybersecurity lesson on Responsible Findings Communication presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'QhLQ6J4satw',
    35,
    5,
    ARRAY['Explain or demonstrate **scope and rules of engagement** in a security-investigation context.', 'Explain or demonstrate **asset discovery concepts** in a security-investigation context.', 'Explain or demonstrate **service enumeration** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-21', 'security-engineering']::TEXT[],
    ARRAY['Responsible Findings Communication analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000220001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000122',
    'm22-l1-api-authorization-models',
    'Module 22 - Lesson 1: Api Authorization Models',
    'Video-guided cybersecurity lesson on Api Authorization Models presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'WlOslEy3ztg',
    35,
    1,
    ARRAY['Explain or demonstrate **API authorization models** in a security-investigation context.', 'Explain or demonstrate **tokens and session security** in a security-investigation context.', 'Explain or demonstrate **rate limits and monitoring** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-22', 'security-engineering']::TEXT[],
    ARRAY['Api Authorization Models analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000220002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000122',
    'm22-l2-tokens-and-session-security',
    'Module 22 - Lesson 2: Tokens And Session Security',
    'Video-guided cybersecurity lesson on Tokens And Session Security presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'QhLQ6J4satw',
    35,
    2,
    ARRAY['Explain or demonstrate **API authorization models** in a security-investigation context.', 'Explain or demonstrate **tokens and session security** in a security-investigation context.', 'Explain or demonstrate **rate limits and monitoring** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-22', 'security-engineering']::TEXT[],
    ARRAY['Tokens And Session Security analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000220003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000122',
    'm22-l3-rate-limits-and-monitoring',
    'Module 22 - Lesson 3: Rate Limits And Monitoring',
    'Video-guided cybersecurity lesson on Rate Limits And Monitoring presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'mq1HRM-zGtQ',
    35,
    3,
    ARRAY['Explain or demonstrate **API authorization models** in a security-investigation context.', 'Explain or demonstrate **tokens and session security** in a security-investigation context.', 'Explain or demonstrate **rate limits and monitoring** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-22', 'security-engineering']::TEXT[],
    ARRAY['Rate Limits And Monitoring analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000220004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000122',
    'm22-l4-owasp-api-risks',
    'Module 22 - Lesson 4: Owasp Api Risks',
    'Video-guided cybersecurity lesson on Owasp Api Risks presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'uU3e_ntg-3g',
    35,
    4,
    ARRAY['Explain or demonstrate **API authorization models** in a security-investigation context.', 'Explain or demonstrate **tokens and session security** in a security-investigation context.', 'Explain or demonstrate **rate limits and monitoring** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-22', 'security-engineering']::TEXT[],
    ARRAY['Owasp Api Risks analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000220005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000122',
    'm22-l5-detection-of-anomalous-api-use',
    'Module 22 - Lesson 5: Detection Of Anomalous Api Use',
    'Video-guided cybersecurity lesson on Detection Of Anomalous Api Use presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'R0W0_gZCVzk',
    35,
    5,
    ARRAY['Explain or demonstrate **API authorization models** in a security-investigation context.', 'Explain or demonstrate **tokens and session security** in a security-investigation context.', 'Explain or demonstrate **rate limits and monitoring** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-22', 'security-engineering']::TEXT[],
    ARRAY['Detection Of Anomalous Api Use analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000230001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000123',
    'm23-l1-shared-responsibility',
    'Module 23 - Lesson 1: Shared Responsibility',
    'Video-guided cybersecurity lesson on Shared Responsibility presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'uU3e_ntg-3g',
    35,
    1,
    ARRAY['Explain or demonstrate **shared responsibility** in a security-investigation context.', 'Explain or demonstrate **cloud IAM** in a security-investigation context.', 'Explain or demonstrate **audit logs and storage misconfiguration** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-23', 'security-engineering']::TEXT[],
    ARRAY['Shared Responsibility analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000230002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000123',
    'm23-l2-cloud-iam',
    'Module 23 - Lesson 2: Cloud Iam',
    'Video-guided cybersecurity lesson on Cloud Iam presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'R0W0_gZCVzk',
    35,
    2,
    ARRAY['Explain or demonstrate **shared responsibility** in a security-investigation context.', 'Explain or demonstrate **cloud IAM** in a security-investigation context.', 'Explain or demonstrate **audit logs and storage misconfiguration** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-23', 'security-engineering']::TEXT[],
    ARRAY['Cloud Iam analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000230003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000123',
    'm23-l3-audit-logs-and-storage-misconfiguration',
    'Module 23 - Lesson 3: Audit Logs And Storage Misconfiguration',
    'Video-guided cybersecurity lesson on Audit Logs And Storage Misconfiguration presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '71RQaYQ4QSw',
    35,
    3,
    ARRAY['Explain or demonstrate **shared responsibility** in a security-investigation context.', 'Explain or demonstrate **cloud IAM** in a security-investigation context.', 'Explain or demonstrate **audit logs and storage misconfiguration** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-23', 'security-engineering']::TEXT[],
    ARRAY['Audit Logs And Storage Misconfiguration analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000230004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000123',
    'm23-l4-cloud-detection-strategy',
    'Module 23 - Lesson 4: Cloud Detection Strategy',
    'Video-guided cybersecurity lesson on Cloud Detection Strategy presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'leX_Qa7wqB4',
    35,
    4,
    ARRAY['Explain or demonstrate **shared responsibility** in a security-investigation context.', 'Explain or demonstrate **cloud IAM** in a security-investigation context.', 'Explain or demonstrate **audit logs and storage misconfiguration** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-23', 'security-engineering']::TEXT[],
    ARRAY['Cloud Detection Strategy analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000230005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000123',
    'm23-l5-cloud-incident-response',
    'Module 23 - Lesson 5: Cloud Incident Response',
    'Video-guided cybersecurity lesson on Cloud Incident Response presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sb0dRaQbuBA',
    35,
    5,
    ARRAY['Explain or demonstrate **shared responsibility** in a security-investigation context.', 'Explain or demonstrate **cloud IAM** in a security-investigation context.', 'Explain or demonstrate **audit logs and storage misconfiguration** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-23', 'security-engineering']::TEXT[],
    ARRAY['Cloud Incident Response analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000240001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000124',
    'm24-l1-hypothesis-driven-hunts',
    'Module 24 - Lesson 1: Hypothesis-Driven Hunts',
    'Video-guided cybersecurity lesson on Hypothesis-Driven Hunts presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'leX_Qa7wqB4',
    35,
    1,
    ARRAY['Explain or demonstrate **hypothesis-driven hunts** in a security-investigation context.', 'Explain or demonstrate **baselining and anomalies** in a security-investigation context.', 'Explain or demonstrate **Sigma and detection-as-code** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-24', 'advanced']::TEXT[],
    ARRAY['Hypothesis-Driven Hunts analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000240002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000124',
    'm24-l2-baselining-and-anomalies',
    'Module 24 - Lesson 2: Baselining And Anomalies',
    'Video-guided cybersecurity lesson on Baselining And Anomalies presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sb0dRaQbuBA',
    35,
    2,
    ARRAY['Explain or demonstrate **hypothesis-driven hunts** in a security-investigation context.', 'Explain or demonstrate **baselining and anomalies** in a security-investigation context.', 'Explain or demonstrate **Sigma and detection-as-code** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-24', 'advanced']::TEXT[],
    ARRAY['Baselining And Anomalies analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000240003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000124',
    'm24-l3-sigma-and-detection-as-code',
    'Module 24 - Lesson 3: Sigma And Detection-As-Code',
    'Video-guided cybersecurity lesson on Sigma And Detection-As-Code presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'WGlT6-gNwqY',
    35,
    3,
    ARRAY['Explain or demonstrate **hypothesis-driven hunts** in a security-investigation context.', 'Explain or demonstrate **baselining and anomalies** in a security-investigation context.', 'Explain or demonstrate **Sigma and detection-as-code** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-24', 'advanced']::TEXT[],
    ARRAY['Sigma And Detection-As-Code analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000240004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000124',
    'm24-l4-false-positive-tuning',
    'Module 24 - Lesson 4: False Positive Tuning',
    'Video-guided cybersecurity lesson on False Positive Tuning presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'IhT7Odu4xHc',
    35,
    4,
    ARRAY['Explain or demonstrate **hypothesis-driven hunts** in a security-investigation context.', 'Explain or demonstrate **baselining and anomalies** in a security-investigation context.', 'Explain or demonstrate **Sigma and detection-as-code** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-24', 'advanced']::TEXT[],
    ARRAY['False Positive Tuning analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000240005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000124',
    'm24-l5-att-ck-coverage-tracking',
    'Module 24 - Lesson 5: Att&Ck Coverage Tracking',
    'Video-guided cybersecurity lesson on Att&Ck Coverage Tracking presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '8mGSwRScqIM',
    35,
    5,
    ARRAY['Explain or demonstrate **hypothesis-driven hunts** in a security-investigation context.', 'Explain or demonstrate **baselining and anomalies** in a security-investigation context.', 'Explain or demonstrate **Sigma and detection-as-code** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-24', 'advanced']::TEXT[],
    ARRAY['Att&Ck Coverage Tracking analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000250001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000125',
    'm25-l1-evidence-preservation',
    'Module 25 - Lesson 1: Evidence Preservation',
    'Video-guided cybersecurity lesson on Evidence Preservation presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    1,
    ARRAY['Explain or demonstrate **evidence preservation** in a security-investigation context.', 'Explain or demonstrate **disk and memory triage concepts** in a security-investigation context.', 'Explain or demonstrate **timeline analysis** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-25', 'advanced']::TEXT[],
    ARRAY['Evidence Preservation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000250002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000125',
    'm25-l2-disk-and-memory-triage-concepts',
    'Module 25 - Lesson 2: Disk And Memory Triage Concepts',
    'Video-guided cybersecurity lesson on Disk And Memory Triage Concepts presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    2,
    ARRAY['Explain or demonstrate **evidence preservation** in a security-investigation context.', 'Explain or demonstrate **disk and memory triage concepts** in a security-investigation context.', 'Explain or demonstrate **timeline analysis** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-25', 'advanced']::TEXT[],
    ARRAY['Disk And Memory Triage Concepts analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000250003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000125',
    'm25-l3-timeline-analysis',
    'Module 25 - Lesson 3: Timeline Analysis',
    'Video-guided cybersecurity lesson on Timeline Analysis presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    3,
    ARRAY['Explain or demonstrate **evidence preservation** in a security-investigation context.', 'Explain or demonstrate **disk and memory triage concepts** in a security-investigation context.', 'Explain or demonstrate **timeline analysis** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-25', 'advanced']::TEXT[],
    ARRAY['Timeline Analysis analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000250004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000125',
    'm25-l4-browser-and-event-artifacts',
    'Module 25 - Lesson 4: Browser And Event Artifacts',
    'Video-guided cybersecurity lesson on Browser And Event Artifacts presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    4,
    ARRAY['Explain or demonstrate **evidence preservation** in a security-investigation context.', 'Explain or demonstrate **disk and memory triage concepts** in a security-investigation context.', 'Explain or demonstrate **timeline analysis** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-25', 'advanced']::TEXT[],
    ARRAY['Browser And Event Artifacts analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000250005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000125',
    'm25-l5-forensic-reporting',
    'Module 25 - Lesson 5: Forensic Reporting',
    'Video-guided cybersecurity lesson on Forensic Reporting presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    5,
    ARRAY['Explain or demonstrate **evidence preservation** in a security-investigation context.', 'Explain or demonstrate **disk and memory triage concepts** in a security-investigation context.', 'Explain or demonstrate **timeline analysis** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-25', 'advanced']::TEXT[],
    ARRAY['Forensic Reporting analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000260001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000126',
    'm26-l1-static-vs-dynamic-analysis',
    'Module 26 - Lesson 1: Static Vs Dynamic Analysis',
    'Video-guided cybersecurity lesson on Static Vs Dynamic Analysis presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    1,
    ARRAY['Explain or demonstrate **static vs dynamic analysis** in a security-investigation context.', 'Explain or demonstrate **sandbox instrumentation** in a security-investigation context.', 'Explain or demonstrate **behavioral indicators** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-26', 'advanced']::TEXT[],
    ARRAY['Static Vs Dynamic Analysis analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000260002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000126',
    'm26-l2-sandbox-instrumentation',
    'Module 26 - Lesson 2: Sandbox Instrumentation',
    'Video-guided cybersecurity lesson on Sandbox Instrumentation presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    2,
    ARRAY['Explain or demonstrate **static vs dynamic analysis** in a security-investigation context.', 'Explain or demonstrate **sandbox instrumentation** in a security-investigation context.', 'Explain or demonstrate **behavioral indicators** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-26', 'advanced']::TEXT[],
    ARRAY['Sandbox Instrumentation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000260003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000126',
    'm26-l3-behavioral-indicators',
    'Module 26 - Lesson 3: Behavioral Indicators',
    'Video-guided cybersecurity lesson on Behavioral Indicators presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    3,
    ARRAY['Explain or demonstrate **static vs dynamic analysis** in a security-investigation context.', 'Explain or demonstrate **sandbox instrumentation** in a security-investigation context.', 'Explain or demonstrate **behavioral indicators** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-26', 'advanced']::TEXT[],
    ARRAY['Behavioral Indicators analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000260004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000126',
    'm26-l4-persistence-and-network-activity',
    'Module 26 - Lesson 4: Persistence And Network Activity',
    'Video-guided cybersecurity lesson on Persistence And Network Activity presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    4,
    ARRAY['Explain or demonstrate **static vs dynamic analysis** in a security-investigation context.', 'Explain or demonstrate **sandbox instrumentation** in a security-investigation context.', 'Explain or demonstrate **behavioral indicators** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-26', 'advanced']::TEXT[],
    ARRAY['Persistence And Network Activity analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000260005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000126',
    'm26-l5-yara-concepts',
    'Module 26 - Lesson 5: Yara Concepts',
    'Video-guided cybersecurity lesson on Yara Concepts presented by John Hammond / David Bombal. Covers core concepts, operational defense, and hands-on laboratory application.',
    'sBuxwMAfGnI',
    35,
    5,
    ARRAY['Explain or demonstrate **static vs dynamic analysis** in a security-investigation context.', 'Explain or demonstrate **sandbox instrumentation** in a security-investigation context.', 'Explain or demonstrate **behavioral indicators** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-26', 'advanced']::TEXT[],
    ARRAY['Yara Concepts analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000270001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000127',
    'm27-l1-python-data-parsing',
    'Module 27 - Lesson 1: Python Data Parsing',
    'Video-guided cybersecurity lesson on Python Data Parsing presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'KaqKoKNEKnE',
    35,
    1,
    ARRAY['Explain or demonstrate **Python data parsing** in a security-investigation context.', 'Explain or demonstrate **CSV JSON and regex** in a security-investigation context.', 'Explain or demonstrate **log enrichment with local data** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-27', 'advanced']::TEXT[],
    ARRAY['Python Data Parsing analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000270002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000127',
    'm27-l2-csv-json-and-regex',
    'Module 27 - Lesson 2: Csv Json And Regex',
    'Video-guided cybersecurity lesson on Csv Json And Regex presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'fFvXy3WkLpA',
    35,
    2,
    ARRAY['Explain or demonstrate **Python data parsing** in a security-investigation context.', 'Explain or demonstrate **CSV JSON and regex** in a security-investigation context.', 'Explain or demonstrate **log enrichment with local data** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-27', 'advanced']::TEXT[],
    ARRAY['Csv Json And Regex analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000270003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000127',
    'm27-l3-log-enrichment-with-local-data',
    'Module 27 - Lesson 3: Log Enrichment With Local Data',
    'Video-guided cybersecurity lesson on Log Enrichment With Local Data presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'BJ2UMB4a04g',
    35,
    3,
    ARRAY['Explain or demonstrate **Python data parsing** in a security-investigation context.', 'Explain or demonstrate **CSV JSON and regex** in a security-investigation context.', 'Explain or demonstrate **log enrichment with local data** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-27', 'advanced']::TEXT[],
    ARRAY['Log Enrichment With Local Data analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000270004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000127',
    'm27-l4-safe-automation-and-audit-logs',
    'Module 27 - Lesson 4: Safe Automation And Audit Logs',
    'Video-guided cybersecurity lesson on Safe Automation And Audit Logs presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '9B0mtWk_AM0',
    35,
    4,
    ARRAY['Explain or demonstrate **Python data parsing** in a security-investigation context.', 'Explain or demonstrate **CSV JSON and regex** in a security-investigation context.', 'Explain or demonstrate **log enrichment with local data** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-27', 'advanced']::TEXT[],
    ARRAY['Safe Automation And Audit Logs analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000270005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000127',
    'm27-l5-testing-and-input-validation',
    'Module 27 - Lesson 5: Testing And Input Validation',
    'Video-guided cybersecurity lesson on Testing And Input Validation presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '86fruE9jkKk',
    35,
    5,
    ARRAY['Explain or demonstrate **Python data parsing** in a security-investigation context.', 'Explain or demonstrate **CSV JSON and regex** in a security-investigation context.', 'Explain or demonstrate **log enrichment with local data** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-27', 'advanced']::TEXT[],
    ARRAY['Testing And Input Validation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000280001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000128',
    'm28-l1-security-controls-and-risk',
    'Module 28 - Lesson 1: Security Controls And Risk',
    'Video-guided cybersecurity lesson on Security Controls And Risk presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '9B0mtWk_AM0',
    35,
    1,
    ARRAY['Explain or demonstrate **security controls and risk** in a security-investigation context.', 'Explain or demonstrate **network and identity architecture** in a security-investigation context.', 'Explain or demonstrate **third-party risk** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-28', 'advanced']::TEXT[],
    ARRAY['Security Controls And Risk analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000280002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000128',
    'm28-l2-network-and-identity-architecture',
    'Module 28 - Lesson 2: Network And Identity Architecture',
    'Video-guided cybersecurity lesson on Network And Identity Architecture presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '86fruE9jkKk',
    35,
    2,
    ARRAY['Explain or demonstrate **security controls and risk** in a security-investigation context.', 'Explain or demonstrate **network and identity architecture** in a security-investigation context.', 'Explain or demonstrate **third-party risk** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-28', 'advanced']::TEXT[],
    ARRAY['Network And Identity Architecture analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000280003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000128',
    'm28-l3-third-party-risk',
    'Module 28 - Lesson 3: Third-Party Risk',
    'Video-guided cybersecurity lesson on Third-Party Risk presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '-LevHAzXgFs',
    35,
    3,
    ARRAY['Explain or demonstrate **security controls and risk** in a security-investigation context.', 'Explain or demonstrate **network and identity architecture** in a security-investigation context.', 'Explain or demonstrate **third-party risk** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-28', 'advanced']::TEXT[],
    ARRAY['Third-Party Risk analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000280004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000128',
    'm28-l4-policies-and-audit-evidence',
    'Module 28 - Lesson 4: Policies And Audit Evidence',
    'Video-guided cybersecurity lesson on Policies And Audit Evidence presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'eyVy1gKCuAU',
    35,
    4,
    ARRAY['Explain or demonstrate **security controls and risk** in a security-investigation context.', 'Explain or demonstrate **network and identity architecture** in a security-investigation context.', 'Explain or demonstrate **third-party risk** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-28', 'advanced']::TEXT[],
    ARRAY['Policies And Audit Evidence analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000280005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000128',
    'm28-l5-security-metrics-and-reporting',
    'Module 28 - Lesson 5: Security Metrics And Reporting',
    'Video-guided cybersecurity lesson on Security Metrics And Reporting presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'P9xakfmX70c',
    35,
    5,
    ARRAY['Explain or demonstrate **security controls and risk** in a security-investigation context.', 'Explain or demonstrate **network and identity architecture** in a security-investigation context.', 'Explain or demonstrate **third-party risk** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-28', 'advanced']::TEXT[],
    ARRAY['Security Metrics And Reporting analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000290001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000129',
    'm29-l1-case-intake-and-scope',
    'Module 29 - Lesson 1: Case Intake And Scope',
    'Video-guided cybersecurity lesson on Case Intake And Scope presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'eyVy1gKCuAU',
    35,
    1,
    ARRAY['Explain or demonstrate **case intake and scope** in a security-investigation context.', 'Explain or demonstrate **multiple-log correlation** in a security-investigation context.', 'Explain or demonstrate **phishing-to-login scenario** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-29', 'capstone']::TEXT[],
    ARRAY['Case Intake And Scope analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000290002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000129',
    'm29-l2-multiple-log-correlation',
    'Module 29 - Lesson 2: Multiple-Log Correlation',
    'Video-guided cybersecurity lesson on Multiple-Log Correlation presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'P9xakfmX70c',
    35,
    2,
    ARRAY['Explain or demonstrate **case intake and scope** in a security-investigation context.', 'Explain or demonstrate **multiple-log correlation** in a security-investigation context.', 'Explain or demonstrate **phishing-to-login scenario** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-29', 'capstone']::TEXT[],
    ARRAY['Multiple-Log Correlation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000290003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000129',
    'm29-l3-phishing-to-login-scenario',
    'Module 29 - Lesson 3: Phishing-To-Login Scenario',
    'Video-guided cybersecurity lesson on Phishing-To-Login Scenario presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'np2WI_rM-Ok',
    35,
    3,
    ARRAY['Explain or demonstrate **case intake and scope** in a security-investigation context.', 'Explain or demonstrate **multiple-log correlation** in a security-investigation context.', 'Explain or demonstrate **phishing-to-login scenario** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-29', 'capstone']::TEXT[],
    ARRAY['Phishing-To-Login Scenario analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000290004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000129',
    'm29-l4-incident-report-and-evidence',
    'Module 29 - Lesson 4: Incident Report And Evidence',
    'Video-guided cybersecurity lesson on Incident Report And Evidence presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'nNiNTviiacU',
    35,
    4,
    ARRAY['Explain or demonstrate **case intake and scope** in a security-investigation context.', 'Explain or demonstrate **multiple-log correlation** in a security-investigation context.', 'Explain or demonstrate **phishing-to-login scenario** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-29', 'capstone']::TEXT[],
    ARRAY['Incident Report And Evidence analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000290005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000129',
    'm29-l5-executive-and-technical-briefing',
    'Module 29 - Lesson 5: Executive And Technical Briefing',
    'Video-guided cybersecurity lesson on Executive And Technical Briefing presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'VgNyh4HEqSU',
    35,
    5,
    ARRAY['Explain or demonstrate **case intake and scope** in a security-investigation context.', 'Explain or demonstrate **multiple-log correlation** in a security-investigation context.', 'Explain or demonstrate **phishing-to-login scenario** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-29', 'capstone']::TEXT[],
    ARRAY['Executive And Technical Briefing analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000300001',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000130',
    'm30-l1-soc-l1-vs-detection-engineering-roles',
    'Module 30 - Lesson 1: Soc L1 Vs Detection Engineering Roles',
    'Video-guided cybersecurity lesson on Soc L1 Vs Detection Engineering Roles presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'nNiNTviiacU',
    35,
    1,
    ARRAY['Explain or demonstrate **SOC L1 vs detection engineering roles** in a security-investigation context.', 'Explain or demonstrate **portfolio artifact quality** in a security-investigation context.', 'Explain or demonstrate **resume evidence** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-30', 'capstone']::TEXT[],
    ARRAY['Soc L1 Vs Detection Engineering Roles analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000300002',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000130',
    'm30-l2-portfolio-artifact-quality',
    'Module 30 - Lesson 2: Portfolio Artifact Quality',
    'Video-guided cybersecurity lesson on Portfolio Artifact Quality presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'VgNyh4HEqSU',
    35,
    2,
    ARRAY['Explain or demonstrate **SOC L1 vs detection engineering roles** in a security-investigation context.', 'Explain or demonstrate **portfolio artifact quality** in a security-investigation context.', 'Explain or demonstrate **resume evidence** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-30', 'capstone']::TEXT[],
    ARRAY['Portfolio Artifact Quality analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000300003',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000130',
    'm30-l3-resume-evidence',
    'Module 30 - Lesson 3: Resume Evidence',
    'Video-guided cybersecurity lesson on Resume Evidence presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    'I_c0D49uCwQ',
    35,
    3,
    ARRAY['Explain or demonstrate **SOC L1 vs detection engineering roles** in a security-investigation context.', 'Explain or demonstrate **portfolio artifact quality** in a security-investigation context.', 'Explain or demonstrate **resume evidence** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-30', 'capstone']::TEXT[],
    ARRAY['Resume Evidence analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000300004',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000130',
    'm30-l4-interview-incident-explanation',
    'Module 30 - Lesson 4: Interview Incident Explanation',
    'Video-guided cybersecurity lesson on Interview Incident Explanation presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '4dpTyRM6BU8',
    35,
    4,
    ARRAY['Explain or demonstrate **SOC L1 vs detection engineering roles** in a security-investigation context.', 'Explain or demonstrate **portfolio artifact quality** in a security-investigation context.', 'Explain or demonstrate **resume evidence** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-30', 'capstone']::TEXT[],
    ARRAY['Interview Incident Explanation analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd9c00000-0000-4000-8000-000000300005',
    v_course_id,
    'd9c00000-0000-4000-8000-000000000130',
    'm30-l5-professional-ethics-and-upskilling',
    'Module 30 - Lesson 5: Professional Ethics And Upskilling',
    'Video-guided cybersecurity lesson on Professional Ethics And Upskilling presented by Professor Messer. Covers core concepts, operational defense, and hands-on laboratory application.',
    '9NAKCyOtFH0',
    35,
    5,
    ARRAY['Explain or demonstrate **SOC L1 vs detection engineering roles** in a security-investigation context.', 'Explain or demonstrate **portfolio artifact quality** in a security-investigation context.', 'Explain or demonstrate **resume evidence** in a security-investigation context.']::TEXT[],
    ARRAY['cybersecurity', 'module-30', 'capstone']::TEXT[],
    ARRAY['Professional Ethics And Upskilling analysis', 'Defensive triage', 'Evidence documentation']::TEXT[]
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

END $$;