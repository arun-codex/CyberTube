-- =============================================================================
-- CYBERTUBE: SEED PYTHON FOR CYBERSECURITY ZERO TO ADVANCED COMPLETE COURSE
-- =============================================================================
-- Description:
-- Idempotently seeds the 30-module Python for Cybersecurity course,
-- all 30 modules, and all 120 video lessons into the Supabase database.
-- =============================================================================

DO $$
DECLARE
  v_course_id CONSTANT UUID := 'df000000-0000-4000-8000-000000000001';
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
    'python-for-cybersecurity-zero-to-advanced',
    'Python for Cybersecurity — Zero to Advanced',
    'Master defensive Python scripting, log forensics, IOC extraction, PCAP analysis, and automated SOC pipelines with 30 hands-on modules and 120 video-guided lessons (70 hours structured video + 130–150 hours guided labs & coding).',
    'A comprehensive, defense-first 30-module curriculum designed for aspiring and practicing cybersecurity defenders, junior SOC analysts, and security engineers. Features 70 hours of structured video lessons across 30 modules, paired with 130–150 hours of guided hands-on coding, log forensics labs, and capstone engineering (200–220 total study hours). Learn to automate incident investigation workflows, parse EVTX and auth logs, dissect PCAPs with Scapy, enrich IOCs, correlate telemetry against MITRE ATT&CK, test Sigma rules, query SIEM APIs, and build production-grade SOC automation tools in Python.',
    'intermediate',
    '70 hours video • 200–220 study hours (with coding, reading & labs)',
    4200,
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    'CyberTube Open Cybersecurity & Python Faculty',
    'Security Automation & Defensive Engineering Instructors',
    'CyberTube Academy & Open Security Community',
    'published',
    ARRAY['python', 'cybersecurity', 'soc-automation', 'scripting', 'blue-team', 'scapy', 'log-analysis', 'mitre-attack', 'incident-response']::TEXT[],
    ARRAY['Basic computer literacy and understanding of cybersecurity core concepts', 'Python 3 installed with a code editor (VS Code, PyCharm, or similar)', 'An isolated lab workspace (virtual machine or dedicated test directory)']::TEXT[],
    ARRAY['Write clean, safe, auditable Python 3 scripts for defensive security automation', 'Parse, normalize, and extract IOCs from Linux auth logs, Windows EVTX, CSV, and JSON feeds', 'Conduct offline packet forensics and dissect protocol handshakes using Scapy', 'Enrich synthetic alerts with threat intelligence feeds, CVE/NVD data, and MITRE ATT&CK techniques', 'Build, test, and package robust CLI incident response tools and automated SOC playbooks', 'Design and deploy an end-to-end modular SOC automation pipeline in the comprehensive capstone assessment']::TEXT[],
    'cybersecurity',
    ARRAY['soc-blue-team', 'fundamentals', 'dfir']::TEXT[],
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
  VALUES ('df000000-0001-4000-8000-000000000001', v_course_id, 'Module 01: Safety, Python Setup & Security Lab', 'Foundation phase. Security scripts must run in an isolated, authorized environment. 4 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: None.', 1)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0002-4000-8000-000000000001', v_course_id, 'Module 02: Core Syntax, Variables & Data Types', 'Foundation phase. Represent alerts and investigation facts reliably. 4 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 2)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0003-4000-8000-000000000001', v_course_id, 'Module 03: Conditionals, Loops & Detection Logic', 'Foundation phase. SOC triage rules require explainable conditions and iteration. 5 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 3)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0004-4000-8000-000000000001', v_course_id, 'Module 04: Lists, Dictionaries, Sets & Collections', 'Foundation phase. Security events and IOCs often arrive as nested collections. 5 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 4)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0005-4000-8000-000000000001', v_course_id, 'Module 05: Functions, Modules & Reusable Security Code', 'Foundation phase. Reusable components simplify investigations and reduce copy/paste errors. 5 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 5)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0006-4000-8000-000000000001', v_course_id, 'Module 06: Strings, Regular Expressions & IOC Extraction', 'Foundation phase. Indicator and log text parsing is a daily SOC task. 6 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 6)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0007-4000-8000-000000000001', v_course_id, 'Module 07: Files, CSV, JSON & Evidence Handling', 'Foundation phase. SOC scripts must read and preserve evidence without corrupting it. 6 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 7)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0008-4000-8000-000000000001', v_course_id, 'Module 08: Exceptions, Logging & Troubleshooting', 'Foundation phase. Security monitoring pipelines must fail visibly rather than silently. 5 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 8)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0009-4000-8000-000000000001', v_course_id, 'Module 09: Environments, Packages & Dependency Safety', 'Foundation phase. Security automation tools depend on a traceable and controlled Python environment. 4 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 9)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-000a-4000-8000-000000000001', v_course_id, 'Module 10: Classes, Data Classes & Automated Unit Tests', 'Foundation phase. Maintainable security tooling benefits from clear event objects and tests. 6 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 10)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-000b-4000-8000-000000000001', v_course_id, 'Module 11: Command-Line Tools & Argument Validation', 'Automation phase. SOC automation is easier to operate as predictable CLI tooling. 5 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 11)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-000c-4000-8000-000000000001', v_course_id, 'Module 12: Operating System, Processes & Safe Automation', 'Automation phase. Endpoint observations and system inventory can be automated without intrusive collection. 6 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 12)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-000d-4000-8000-000000000001', v_course_id, 'Module 13: Linux Authentication Logs & SSH Investigations', 'Automation phase. Repeated SSH authentication failures are common SOC investigation scenarios. 7 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 13)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-000e-4000-8000-000000000001', v_course_id, 'Module 14: Windows Event Logs, EVTX & Authentication', 'Automation phase. SOC analysts investigate Windows sign-ins, privilege changes and process events. 7 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 14)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-000f-4000-8000-000000000001', v_course_id, 'Module 15: Sockets, IP Addressing, DNS & Authorized Checks', 'Automation phase. Networking-aware scripts support troubleshooting and narrowly scoped service checks. 7 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 15)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0010-4000-8000-000000000001', v_course_id, 'Module 16: HTTP, REST APIs & JSON Threat Data', 'Automation phase. Many SOC integrations exchange alerts and intelligence through HTTPS APIs. 7 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 16)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0011-4000-8000-000000000001', v_course_id, 'Module 17: PCAP Forensics with Scapy (Offline)', 'Automation phase. Packet captures reveal network activity when used with legal authorization. 8 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 17)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0012-4000-8000-000000000001', v_course_id, 'Module 18: Safe URL Analysis, Web Data & OSINT Ethics', 'Automation phase. SOC triage often begins with suspicious links and publicly shared indicators. 6 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 18)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0013-4000-8000-000000000001', v_course_id, 'Module 19: Pandas, Time Windows & Security Analytics', 'Automation phase. Investigators correlate large events into timelines and patterns. 7 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 19)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0014-4000-8000-000000000001', v_course_id, 'Module 20: Concurrency, Generators & Performance', 'Automation phase. A SOC helper must process many alerts without exhausting resources or overloading APIs. 7 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 20)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0015-4000-8000-000000000001', v_course_id, 'Module 21: Threat Intelligence & IOC Enrichment', 'Detection phase. SOC enrichment correlates local indicators with curated, permitted intelligence. 8 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 21)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0016-4000-8000-000000000001', v_course_id, 'Module 22: Cryptography, SHA-256 & File Integrity', 'Detection phase. File hashes detect changes but do not independently prove maliciousness. 8 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 22)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0017-4000-8000-000000000001', v_course_id, 'Module 23: Phishing Email Triage with Python', 'Detection phase. Email is a major incident intake source and requires careful evidence handling. 8 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 23)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0018-4000-8000-000000000001', v_course_id, 'Module 24: Malware Triage Metadata & YARA Basics', 'Detection phase. Static metadata analysis is an accessible way to begin defensive malware triage. 9 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 24)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-0019-4000-8000-000000000001', v_course_id, 'Module 25: Detection Engineering, Sigma & Rule Testing', 'Detection phase. Detections must be testable and explain why an event matters. 9 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 25)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-001a-4000-8000-000000000001', v_course_id, 'Module 26: MITRE ATT&CK Data & Technique Mapping', 'Detection phase. Technique mappings improve consistency, but should not be assigned from weak evidence. 8 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 26)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-001b-4000-8000-000000000001', v_course_id, 'Module 27: CVE/NVD Vulnerability Data Triage', 'Detection phase. Vulnerability alerts require metadata normalization and asset context. 8 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 27)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-001c-4000-8000-000000000001', v_course_id, 'Module 28: SIEM Query APIs & Safe SOAR Playbooks', 'Detection phase. Analysts automate repetitive querying while keeping containment decisions auditable. 9 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 28)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-001d-4000-8000-000000000001', v_course_id, 'Module 29: Secure Python Engineering & Operational Hardening', 'Advanced phase. A security script can itself become a risk if it mishandles secrets, inputs or dependencies. 9 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 29)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('df000000-001e-4000-8000-000000000001', v_course_id, 'Module 30: Final Capstone — SOC Automation Pipeline', 'Advanced phase. Combine the skills into a demonstrable SOC L1 portfolio project. 14 hours including video, practice and lab. Role focus: SOC Analyst / Defender. Prerequisite: previous module.', 30)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  -- 3. Insert/Update 120 Lessons
  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'df000000-0001-4000-8000-000000000001',
    v_course_id,
    'df000000-0001-4000-8000-000000000001',
    'm01-l1-course-orientation-and-ethics',
    'Module 01 - Lesson 1: Course orientation and ethics',
    'Direct topic demonstration. Write a scope statement: localhost, synthetic files, and owned machines only. Verification: Scope statement excludes public targets.',
    'Fxh9X3-hO4Y',
    35,
    1,
    ARRAY['Write a scope statement: localhost, synthetic files, and owned machines only.', 'Verify implementation: Scope statement excludes public targets.', 'Topic alignment: Direct topic demonstration', 'Install Python and VS Code or another editor.', 'Explain authorization and scope.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-01', 'foundation']::TEXT[],
    ARRAY['Course orientation and ethics', 'Security Python Scripting (Mod 01)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0001-4000-8000-000000000002',
    v_course_id,
    'df000000-0001-4000-8000-000000000001',
    'm01-l2-install-python-and-editor',
    'Module 01 - Lesson 2: Install Python and editor',
    'Direct topic demonstration. Install Python 3, choose an editor, record interpreter version. Verification: python --version or python3 --version works.',
    'oDOw5tB3Udw',
    35,
    2,
    ARRAY['Install Python 3, choose an editor, record interpreter version.', 'Verify implementation: python --version or python3 --version works.', 'Topic alignment: Direct topic demonstration', 'Install Python and VS Code or another editor.', 'Explain authorization and scope.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-01', 'foundation']::TEXT[],
    ARRAY['Install Python and editor', 'Security Python Scripting (Mod 01)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0001-4000-8000-000000000003',
    v_course_id,
    'df000000-0001-4000-8000-000000000001',
    'm01-l3-run-a-python-file',
    'Module 01 - Lesson 3: Run a Python file',
    'Technique bridge to this module’s security lab. Create hello_soc.py that prints a mock incident ticket. Verification: Program executes with no dependency.',
    'oDOw5tB3Udw',
    35,
    3,
    ARRAY['Create hello_soc.py that prints a mock incident ticket.', 'Verify implementation: Program executes with no dependency.', 'Topic alignment: Technique bridge to this module’s security lab', 'Install Python and VS Code or another editor.', 'Explain authorization and scope.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-01', 'foundation']::TEXT[],
    ARRAY['Run a Python file', 'Security Python Scripting (Mod 01)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0001-4000-8000-000000000004',
    v_course_id,
    'df000000-0001-4000-8000-000000000001',
    'm01-l4-vs-code-debugging',
    'Module 01 - Lesson 4: VS Code debugging',
    'Technique bridge to this module’s security lab. Place a breakpoint on a status variable; step over and inspect. Verification: Screenshot of debug variables.',
    'D2cwvpJSBX4',
    35,
    4,
    ARRAY['Place a breakpoint on a status variable; step over and inspect.', 'Verify implementation: Screenshot of debug variables.', 'Topic alignment: Technique bridge to this module’s security lab', 'Install Python and VS Code or another editor.', 'Explain authorization and scope.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-01', 'foundation']::TEXT[],
    ARRAY['VS Code debugging', 'Security Python Scripting (Mod 01)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0002-4000-8000-000000000001',
    v_course_id,
    'df000000-0002-4000-8000-000000000001',
    'm02-l1-variables-and-assignment',
    'Module 02 - Lesson 1: Variables and assignment',
    'Direct topic demonstration. Assign source_ip, alert_score and is_blocked in a sample incident. Verification: Print each variable and its type.',
    'KVmbRdwWohY',
    35,
    5,
    ARRAY['Assign source_ip, alert_score and is_blocked in a sample incident.', 'Verify implementation: Print each variable and its type.', 'Topic alignment: Direct topic demonstration', 'Explain strings, integers, booleans, None and comparison.', 'Create typed-looking event records.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-02', 'foundation']::TEXT[],
    ARRAY['Variables and assignment', 'Security Python Scripting (Mod 02)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0002-4000-8000-000000000002',
    v_course_id,
    'df000000-0002-4000-8000-000000000001',
    'm02-l2-data-types',
    'Module 02 - Lesson 2: Data types',
    'Direct topic demonstration. Build one login attempt with string, integer and boolean fields. Verification: Values keep correct types.',
    'KVmbRdwWohY',
    35,
    6,
    ARRAY['Build one login attempt with string, integer and boolean fields.', 'Verify implementation: Values keep correct types.', 'Topic alignment: Direct topic demonstration', 'Explain strings, integers, booleans, None and comparison.', 'Create typed-looking event records.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-02', 'foundation']::TEXT[],
    ARRAY['Data types', 'Security Python Scripting (Mod 02)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0002-4000-8000-000000000003',
    v_course_id,
    'df000000-0002-4000-8000-000000000001',
    'm02-l3-strings-and-safe-formatting',
    'Module 02 - Lesson 3: Strings and safe formatting',
    'Technique bridge to this module’s security lab. Format an alert summary without inserting untrusted input into shell commands. Verification: Summary uses clear labels.',
    'oDOw5tB3Udw',
    35,
    7,
    ARRAY['Format an alert summary without inserting untrusted input into shell commands.', 'Verify implementation: Summary uses clear labels.', 'Topic alignment: Technique bridge to this module’s security lab', 'Explain strings, integers, booleans, None and comparison.', 'Create typed-looking event records.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-02', 'foundation']::TEXT[],
    ARRAY['Strings and safe formatting', 'Security Python Scripting (Mod 02)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0002-4000-8000-000000000004',
    v_course_id,
    'df000000-0002-4000-8000-000000000001',
    'm02-l4-operators-and-comparisons',
    'Module 02 - Lesson 4: Operators and comparisons',
    'Technique bridge to this module’s security lab. Evaluate whether score >= 70 and account is privileged. Verification: Test both true and false examples.',
    'eWRfhZUzrAc',
    35,
    8,
    ARRAY['Evaluate whether score >= 70 and account is privileged.', 'Verify implementation: Test both true and false examples.', 'Topic alignment: Technique bridge to this module’s security lab', 'Explain strings, integers, booleans, None and comparison.', 'Create typed-looking event records.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-02', 'foundation']::TEXT[],
    ARRAY['Operators and comparisons', 'Security Python Scripting (Mod 02)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0003-4000-8000-000000000001',
    v_course_id,
    'df000000-0003-4000-8000-000000000001',
    'm03-l1-if-and-else',
    'Module 03 - Lesson 1: If and else',
    'Direct topic demonstration. Classify simulated authentication alerts as low, medium or high. Verification: Boundary inputs produce expected labels.',
    'KVmbRdwWohY',
    35,
    9,
    ARRAY['Classify simulated authentication alerts as low, medium or high.', 'Verify implementation: Boundary inputs produce expected labels.', 'Topic alignment: Direct topic demonstration', 'Write if/elif/else rules.', 'Iterate bounded event collections.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-03', 'foundation']::TEXT[],
    ARRAY['If and else', 'Security Python Scripting (Mod 03)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0003-4000-8000-000000000002',
    v_course_id,
    'df000000-0003-4000-8000-000000000001',
    'm03-l2-comparison-and-boolean-expressions',
    'Module 03 - Lesson 2: Comparison and Boolean expressions',
    'Direct topic demonstration. Combine username risk flag with failed-login count. Verification: Truth table shows four cases.',
    'KVmbRdwWohY',
    35,
    10,
    ARRAY['Combine username risk flag with failed-login count.', 'Verify implementation: Truth table shows four cases.', 'Topic alignment: Direct topic demonstration', 'Write if/elif/else rules.', 'Iterate bounded event collections.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-03', 'foundation']::TEXT[],
    ARRAY['Comparison and Boolean expressions', 'Security Python Scripting (Mod 03)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0003-4000-8000-000000000003',
    v_course_id,
    'df000000-0003-4000-8000-000000000001',
    'm03-l3-for-loops',
    'Module 03 - Lesson 3: For loops',
    'Technique bridge to this module’s security lab. Loop through a fixed list of 20 synthetic events. Verification: Each event processed once.',
    'KVmbRdwWohY',
    35,
    11,
    ARRAY['Loop through a fixed list of 20 synthetic events.', 'Verify implementation: Each event processed once.', 'Topic alignment: Technique bridge to this module’s security lab', 'Write if/elif/else rules.', 'Iterate bounded event collections.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-03', 'foundation']::TEXT[],
    ARRAY['For loops', 'Security Python Scripting (Mod 03)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0003-4000-8000-000000000004',
    v_course_id,
    'df000000-0003-4000-8000-000000000001',
    'm03-l4-while-loops-and-stopping-conditions',
    'Module 03 - Lesson 4: While loops and stopping conditions',
    'Technique bridge to this module’s security lab. Create a bounded retry/backoff demonstration with max 3 attempts. Verification: Loop always terminates.',
    'KVmbRdwWohY',
    35,
    12,
    ARRAY['Create a bounded retry/backoff demonstration with max 3 attempts.', 'Verify implementation: Loop always terminates.', 'Topic alignment: Technique bridge to this module’s security lab', 'Write if/elif/else rules.', 'Iterate bounded event collections.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-03', 'foundation']::TEXT[],
    ARRAY['While loops and stopping conditions', 'Security Python Scripting (Mod 03)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0004-4000-8000-000000000001',
    v_course_id,
    'df000000-0004-4000-8000-000000000001',
    'm04-l1-lists',
    'Module 04 - Lesson 1: Lists',
    'Direct topic demonstration. Store event IDs in a list and filter invalid ones. Verification: Retains original sequence.',
    'HGOBQPFzWKo',
    35,
    13,
    ARRAY['Store event IDs in a list and filter invalid ones.', 'Verify implementation: Retains original sequence.', 'Topic alignment: Direct topic demonstration', 'Use dictionaries and nested fields.', 'De-duplicate indicators with sets.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-04', 'foundation']::TEXT[],
    ARRAY['Lists', 'Security Python Scripting (Mod 04)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0004-4000-8000-000000000002',
    v_course_id,
    'df000000-0004-4000-8000-000000000001',
    'm04-l2-dictionaries',
    'Module 04 - Lesson 2: Dictionaries',
    'Direct topic demonstration. Represent one alert with keys time, user, ip and host. Verification: Missing key gets a safe default.',
    'HGOBQPFzWKo',
    35,
    14,
    ARRAY['Represent one alert with keys time, user, ip and host.', 'Verify implementation: Missing key gets a safe default.', 'Topic alignment: Direct topic demonstration', 'Use dictionaries and nested fields.', 'De-duplicate indicators with sets.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-04', 'foundation']::TEXT[],
    ARRAY['Dictionaries', 'Security Python Scripting (Mod 04)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0004-4000-8000-000000000003',
    v_course_id,
    'df000000-0004-4000-8000-000000000001',
    'm04-l3-sets',
    'Module 04 - Lesson 3: Sets',
    'Technique bridge to this module’s security lab. De-duplicate synthetic suspicious IP indicators. Verification: Result contains unique values.',
    'HGOBQPFzWKo',
    35,
    15,
    ARRAY['De-duplicate synthetic suspicious IP indicators.', 'Verify implementation: Result contains unique values.', 'Topic alignment: Technique bridge to this module’s security lab', 'Use dictionaries and nested fields.', 'De-duplicate indicators with sets.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-04', 'foundation']::TEXT[],
    ARRAY['Sets', 'Security Python Scripting (Mod 04)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0004-4000-8000-000000000004',
    v_course_id,
    'df000000-0004-4000-8000-000000000001',
    'm04-l4-collections-and-counter',
    'Module 04 - Lesson 4: Collections and Counter',
    'Technique bridge to this module’s security lab. Use Counter to identify the most frequent mock source addresses. Verification: Counts agree with hand tally.',
    'HGOBQPFzWKo',
    35,
    16,
    ARRAY['Use Counter to identify the most frequent mock source addresses.', 'Verify implementation: Counts agree with hand tally.', 'Topic alignment: Technique bridge to this module’s security lab', 'Use dictionaries and nested fields.', 'De-duplicate indicators with sets.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-04', 'foundation']::TEXT[],
    ARRAY['Collections and Counter', 'Security Python Scripting (Mod 04)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0005-4000-8000-000000000001',
    v_course_id,
    'df000000-0005-4000-8000-000000000001',
    'm05-l1-functions-and-parameters',
    'Module 05 - Lesson 1: Functions and parameters',
    'Direct topic demonstration. Create normalize_ip(value) and document accepted inputs. Verification: No print-only return paths.',
    'KVmbRdwWohY',
    35,
    17,
    ARRAY['Create normalize_ip(value) and document accepted inputs.', 'Verify implementation: No print-only return paths.', 'Topic alignment: Direct topic demonstration', 'Define reusable functions with input/output contracts.', 'Separate parsing from detection.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-05', 'foundation']::TEXT[],
    ARRAY['Functions and parameters', 'Security Python Scripting (Mod 05)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0005-4000-8000-000000000002',
    v_course_id,
    'df000000-0005-4000-8000-000000000001',
    'm05-l2-security-investigation-functions',
    'Module 05 - Lesson 2: Security investigation functions',
    'Direct topic demonstration. Implement suspicious_login(event, threshold). Verification: Function accepts a synthetic event.',
    'KVmbRdwWohY',
    35,
    18,
    ARRAY['Implement suspicious_login(event, threshold).', 'Verify implementation: Function accepts a synthetic event.', 'Topic alignment: Direct topic demonstration', 'Define reusable functions with input/output contracts.', 'Separate parsing from detection.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-05', 'foundation']::TEXT[],
    ARRAY['Security investigation functions', 'Security Python Scripting (Mod 05)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0005-4000-8000-000000000003',
    v_course_id,
    'df000000-0005-4000-8000-000000000001',
    'm05-l3-modules-and-imports',
    'Module 05 - Lesson 3: Modules and imports',
    'Technique bridge to this module’s security lab. Move reusable logic to a separate local module. Verification: Import succeeds from CLI.',
    'oDOw5tB3Udw',
    35,
    19,
    ARRAY['Move reusable logic to a separate local module.', 'Verify implementation: Import succeeds from CLI.', 'Topic alignment: Technique bridge to this module’s security lab', 'Define reusable functions with input/output contracts.', 'Separate parsing from detection.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-05', 'foundation']::TEXT[],
    ARRAY['Modules and imports', 'Security Python Scripting (Mod 05)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0005-4000-8000-000000000004',
    v_course_id,
    'df000000-0005-4000-8000-000000000001',
    'm05-l4-docstrings-and-type-hints',
    'Module 05 - Lesson 4: Docstrings and type hints',
    'Technique bridge to this module’s security lab. Write a docstring for one parser and define input format. Verification: Docstring describes errors.',
    'eWRfhZUzrAc',
    35,
    20,
    ARRAY['Write a docstring for one parser and define input format.', 'Verify implementation: Docstring describes errors.', 'Topic alignment: Technique bridge to this module’s security lab', 'Define reusable functions with input/output contracts.', 'Separate parsing from detection.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-05', 'foundation']::TEXT[],
    ARRAY['Docstrings and type hints', 'Security Python Scripting (Mod 05)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0006-4000-8000-000000000001',
    v_course_id,
    'df000000-0006-4000-8000-000000000001',
    'm06-l1-string-operations',
    'Module 06 - Lesson 1: String operations',
    'Direct topic demonstration. Trim and normalize mocked email subjects and hostnames. Verification: Whitespace and Unicode examples handled.',
    'KVmbRdwWohY',
    35,
    21,
    ARRAY['Trim and normalize mocked email subjects and hostnames.', 'Verify implementation: Whitespace and Unicode examples handled.', 'Topic alignment: Direct topic demonstration', 'Write bounded regex patterns.', 'Normalize and validate IPs/domains.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-06', 'foundation']::TEXT[],
    ARRAY['String operations', 'Security Python Scripting (Mod 06)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0006-4000-8000-000000000002',
    v_course_id,
    'df000000-0006-4000-8000-000000000001',
    'm06-l2-finding-suspicious-urls',
    'Module 06 - Lesson 2: Finding suspicious URLs',
    'Direct topic demonstration. Extract URLs from synthetic incident notes. Verification: No URLs requested or visited.',
    'KVmbRdwWohY',
    35,
    22,
    ARRAY['Extract URLs from synthetic incident notes.', 'Verify implementation: No URLs requested or visited.', 'Topic alignment: Direct topic demonstration', 'Write bounded regex patterns.', 'Normalize and validate IPs/domains.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-06', 'foundation']::TEXT[],
    ARRAY['Finding suspicious URLs', 'Security Python Scripting (Mod 06)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0006-4000-8000-000000000003',
    v_course_id,
    'df000000-0006-4000-8000-000000000001',
    'm06-l3-regex-essentials',
    'Module 06 - Lesson 3: Regex essentials',
    'Direct topic demonstration. Write a basic date/IP-shaped pattern and discuss validation. Verification: Pattern finds all target examples.',
    'KVmbRdwWohY',
    35,
    23,
    ARRAY['Write a basic date/IP-shaped pattern and discuss validation.', 'Verify implementation: Pattern finds all target examples.', 'Topic alignment: Direct topic demonstration', 'Write bounded regex patterns.', 'Normalize and validate IPs/domains.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-06', 'foundation']::TEXT[],
    ARRAY['Regex essentials', 'Security Python Scripting (Mod 06)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0006-4000-8000-000000000004',
    v_course_id,
    'df000000-0006-4000-8000-000000000001',
    'm06-l4-regex-log-and-ip-extraction',
    'Module 06 - Lesson 4: Regex log and IP extraction',
    'Direct topic demonstration. Extract IP-looking tokens then validate with ipaddress. Verification: Malformed values excluded.',
    'KVmbRdwWohY',
    35,
    24,
    ARRAY['Extract IP-looking tokens then validate with ipaddress.', 'Verify implementation: Malformed values excluded.', 'Topic alignment: Direct topic demonstration', 'Write bounded regex patterns.', 'Normalize and validate IPs/domains.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-06', 'foundation']::TEXT[],
    ARRAY['Regex log and IP extraction', 'Security Python Scripting (Mod 06)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0007-4000-8000-000000000001',
    v_course_id,
    'df000000-0007-4000-8000-000000000001',
    'm07-l1-read-text-files',
    'Module 07 - Lesson 1: Read text files',
    'Direct topic demonstration. Read a sample access log line-by-line. Verification: No hidden line truncation.',
    'KVmbRdwWohY',
    35,
    25,
    ARRAY['Read a sample access log line-by-line.', 'Verify implementation: No hidden line truncation.', 'Topic alignment: Direct topic demonstration', 'Read text files safely with encoding.', 'Parse JSON/CSV with schema checks.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-07', 'foundation']::TEXT[],
    ARRAY['Read text files', 'Security Python Scripting (Mod 07)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0007-4000-8000-000000000002',
    v_course_id,
    'df000000-0007-4000-8000-000000000001',
    'm07-l2-parse-file-records',
    'Module 07 - Lesson 2: Parse file records',
    'Direct topic demonstration. Split tabular synthetic events and validate field counts. Verification: Bad rows reported.',
    'KVmbRdwWohY',
    35,
    26,
    ARRAY['Split tabular synthetic events and validate field counts.', 'Verify implementation: Bad rows reported.', 'Topic alignment: Direct topic demonstration', 'Read text files safely with encoding.', 'Parse JSON/CSV with schema checks.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-07', 'foundation']::TEXT[],
    ARRAY['Parse file records', 'Security Python Scripting (Mod 07)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0007-4000-8000-000000000003',
    v_course_id,
    'df000000-0007-4000-8000-000000000001',
    'm07-l3-json-objects',
    'Module 07 - Lesson 3: JSON objects',
    'Technique bridge to this module’s security lab. Load and serialize nested event dictionaries. Verification: Round-trip keeps fields.',
    'HGOBQPFzWKo',
    35,
    27,
    ARRAY['Load and serialize nested event dictionaries.', 'Verify implementation: Round-trip keeps fields.', 'Topic alignment: Technique bridge to this module’s security lab', 'Read text files safely with encoding.', 'Parse JSON/CSV with schema checks.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-07', 'foundation']::TEXT[],
    ARRAY['JSON objects', 'Security Python Scripting (Mod 07)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0007-4000-8000-000000000004',
    v_course_id,
    'df000000-0007-4000-8000-000000000001',
    'm07-l4-safe-file-writes-and-context-managers',
    'Module 07 - Lesson 4: Safe file writes and context managers',
    'Technique bridge to this module’s security lab. Use with-open, output directory and UTF-8. Verification: File handles close after execution.',
    'eWRfhZUzrAc',
    35,
    28,
    ARRAY['Use with-open, output directory and UTF-8.', 'Verify implementation: File handles close after execution.', 'Topic alignment: Technique bridge to this module’s security lab', 'Read text files safely with encoding.', 'Parse JSON/CSV with schema checks.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-07', 'foundation']::TEXT[],
    ARRAY['Safe file writes and context managers', 'Security Python Scripting (Mod 07)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0008-4000-8000-000000000001',
    v_course_id,
    'df000000-0008-4000-8000-000000000001',
    'm08-l1-exceptions',
    'Module 08 - Lesson 1: Exceptions',
    'Direct topic demonstration. Handle missing files and malformed JSON separately. Verification: Program exits with clear message.',
    'HGOBQPFzWKo',
    35,
    29,
    ARRAY['Handle missing files and malformed JSON separately.', 'Verify implementation: Program exits with clear message.', 'Topic alignment: Direct topic demonstration', 'Handle predictable exceptions.', 'Use structured application logs.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-08', 'foundation']::TEXT[],
    ARRAY['Exceptions', 'Security Python Scripting (Mod 08)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0008-4000-8000-000000000002',
    v_course_id,
    'df000000-0008-4000-8000-000000000001',
    'm08-l2-logging',
    'Module 08 - Lesson 2: Logging',
    'Direct topic demonstration. Create INFO, WARNING and ERROR events with a run ID. Verification: Passwords never appear in logs.',
    'HGOBQPFzWKo',
    35,
    30,
    ARRAY['Create INFO, WARNING and ERROR events with a run ID.', 'Verify implementation: Passwords never appear in logs.', 'Topic alignment: Direct topic demonstration', 'Handle predictable exceptions.', 'Use structured application logs.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-08', 'foundation']::TEXT[],
    ARRAY['Logging', 'Security Python Scripting (Mod 08)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0008-4000-8000-000000000003',
    v_course_id,
    'df000000-0008-4000-8000-000000000001',
    'm08-l3-file-write-failures',
    'Module 08 - Lesson 3: File write failures',
    'Technique bridge to this module’s security lab. Catch and report I/O exceptions. Verification: Error case returns nonzero exit status.',
    'oDOw5tB3Udw',
    35,
    31,
    ARRAY['Catch and report I/O exceptions.', 'Verify implementation: Error case returns nonzero exit status.', 'Topic alignment: Technique bridge to this module’s security lab', 'Handle predictable exceptions.', 'Use structured application logs.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-08', 'foundation']::TEXT[],
    ARRAY['File write failures', 'Security Python Scripting (Mod 08)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0008-4000-8000-000000000004',
    v_course_id,
    'df000000-0008-4000-8000-000000000001',
    'm08-l4-debugging-practice',
    'Module 08 - Lesson 4: Debugging practice',
    'Technique bridge to this module’s security lab. Trigger and fix a KeyError using a malformed synthetic record. Verification: Bug and fix documented.',
    'eWRfhZUzrAc',
    35,
    32,
    ARRAY['Trigger and fix a KeyError using a malformed synthetic record.', 'Verify implementation: Bug and fix documented.', 'Topic alignment: Technique bridge to this module’s security lab', 'Handle predictable exceptions.', 'Use structured application logs.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-08', 'foundation']::TEXT[],
    ARRAY['Debugging practice', 'Security Python Scripting (Mod 08)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0009-4000-8000-000000000001',
    v_course_id,
    'df000000-0009-4000-8000-000000000001',
    'm09-l1-creating-a-virtual-environment',
    'Module 09 - Lesson 1: Creating a virtual environment',
    'Direct topic demonstration. Create .venv in a clean local folder. Verification: python points to venv interpreter.',
    '0sOvCWFmrtA',
    35,
    33,
    ARRAY['Create .venv in a clean local folder.', 'Verify implementation: python points to venv interpreter.', 'Topic alignment: Direct topic demonstration', 'Create per-project virtual environments.', 'Review package sources and versions.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-09', 'foundation']::TEXT[],
    ARRAY['Creating a virtual environment', 'Security Python Scripting (Mod 09)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0009-4000-8000-000000000002',
    v_course_id,
    'df000000-0009-4000-8000-000000000001',
    'm09-l2-package-manager-pip',
    'Module 09 - Lesson 2: Package manager pip',
    'Direct topic demonstration. List packages and check direct dependencies. Verification: pip list produces expected set.',
    'oDOw5tB3Udw',
    35,
    34,
    ARRAY['List packages and check direct dependencies.', 'Verify implementation: pip list produces expected set.', 'Topic alignment: Direct topic demonstration', 'Create per-project virtual environments.', 'Review package sources and versions.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-09', 'foundation']::TEXT[],
    ARRAY['Package manager pip', 'Security Python Scripting (Mod 09)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0009-4000-8000-000000000003',
    v_course_id,
    'df000000-0009-4000-8000-000000000001',
    'm09-l3-installing-pinned-libraries',
    'Module 09 - Lesson 3: Installing pinned libraries',
    'Technique bridge to this module’s security lab. Install from official package indexes after reviewing package names. Verification: requirements pin current tested versions.',
    '0sOvCWFmrtA',
    35,
    35,
    ARRAY['Install from official package indexes after reviewing package names.', 'Verify implementation: requirements pin current tested versions.', 'Topic alignment: Technique bridge to this module’s security lab', 'Create per-project virtual environments.', 'Review package sources and versions.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-09', 'foundation']::TEXT[],
    ARRAY['Installing pinned libraries', 'Security Python Scripting (Mod 09)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0009-4000-8000-000000000004',
    v_course_id,
    'df000000-0009-4000-8000-000000000001',
    'm09-l4-hash-checks-and-cryptographic-context',
    'Module 09 - Lesson 4: Hash checks and cryptographic context',
    'Technique bridge to this module’s security lab. Explain why reproducible installs matter to evidence workflows. Verification: Threat model includes dependency compromise.',
    'kb_scuDUHls',
    35,
    36,
    ARRAY['Explain why reproducible installs matter to evidence workflows.', 'Verify implementation: Threat model includes dependency compromise.', 'Topic alignment: Technique bridge to this module’s security lab', 'Create per-project virtual environments.', 'Review package sources and versions.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-09', 'foundation']::TEXT[],
    ARRAY['Hash checks and cryptographic context', 'Security Python Scripting (Mod 09)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000a-4000-8000-000000000001',
    v_course_id,
    'df000000-000a-4000-8000-000000000001',
    'm10-l1-objects-and-classes',
    'Module 10 - Lesson 1: Objects and classes',
    'Direct topic demonstration. Define an Alert with attributes and readable output. Verification: Instances retain independent state.',
    'eWRfhZUzrAc',
    35,
    37,
    ARRAY['Define an Alert with attributes and readable output.', 'Verify implementation: Instances retain independent state.', 'Topic alignment: Direct topic demonstration', 'Model an event as a class or dataclass.', 'Write unit tests for parsers and detectors.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-10', 'foundation']::TEXT[],
    ARRAY['Objects and classes', 'Security Python Scripting (Mod 10)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000a-4000-8000-000000000002',
    v_course_id,
    'df000000-000a-4000-8000-000000000001',
    'm10-l2-first-pytest-tests',
    'Module 10 - Lesson 2: First pytest tests',
    'Direct topic demonstration. Test a normal event and malformed input. Verification: pytest reports expected result.',
    'cHYq1MRoyI0',
    35,
    38,
    ARRAY['Test a normal event and malformed input.', 'Verify implementation: pytest reports expected result.', 'Topic alignment: Direct topic demonstration', 'Model an event as a class or dataclass.', 'Write unit tests for parsers and detectors.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-10', 'foundation']::TEXT[],
    ARRAY['First pytest tests', 'Security Python Scripting (Mod 10)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000a-4000-8000-000000000003',
    v_course_id,
    'df000000-000a-4000-8000-000000000001',
    'm10-l3-parameterized-tests',
    'Module 10 - Lesson 3: Parameterized tests',
    'Technique bridge to this module’s security lab. Test 6 threshold boundary values. Verification: All boundary cases covered.',
    'cHYq1MRoyI0',
    35,
    39,
    ARRAY['Test 6 threshold boundary values.', 'Verify implementation: All boundary cases covered.', 'Topic alignment: Technique bridge to this module’s security lab', 'Model an event as a class or dataclass.', 'Write unit tests for parsers and detectors.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-10', 'foundation']::TEXT[],
    ARRAY['Parameterized tests', 'Security Python Scripting (Mod 10)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000a-4000-8000-000000000004',
    v_course_id,
    'df000000-000a-4000-8000-000000000001',
    'm10-l4-mocking-external-inputs',
    'Module 10 - Lesson 4: Mocking external inputs',
    'Technique bridge to this module’s security lab. Mock an API function so no network access occurs. Verification: Tests run fully offline.',
    'cHYq1MRoyI0',
    35,
    40,
    ARRAY['Mock an API function so no network access occurs.', 'Verify implementation: Tests run fully offline.', 'Topic alignment: Technique bridge to this module’s security lab', 'Model an event as a class or dataclass.', 'Write unit tests for parsers and detectors.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-10', 'foundation']::TEXT[],
    ARRAY['Mocking external inputs', 'Security Python Scripting (Mod 10)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000b-4000-8000-000000000001',
    v_course_id,
    'df000000-000b-4000-8000-000000000001',
    'm11-l1-command-line-arguments',
    'Module 11 - Lesson 1: Command-line arguments',
    'Direct topic demonstration. Read command-line arguments without hardcoding filenames. Verification: Help documents usage.',
    'eWRfhZUzrAc',
    35,
    41,
    ARRAY['Read command-line arguments without hardcoding filenames.', 'Verify implementation: Help documents usage.', 'Topic alignment: Direct topic demonstration', 'Create safe CLI arguments.', 'Use exit status and help pages.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-11', 'automation']::TEXT[],
    ARRAY['Command-line arguments', 'Security Python Scripting (Mod 11)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000b-4000-8000-000000000002',
    v_course_id,
    'df000000-000b-4000-8000-000000000001',
    'm11-l2-building-a-cli',
    'Module 11 - Lesson 2: Building a CLI',
    'Technique bridge to this module’s security lab. Sketch a menu for defensive file-hash operations. Verification: No default destructive actions.',
    'kb_scuDUHls',
    35,
    42,
    ARRAY['Sketch a menu for defensive file-hash operations.', 'Verify implementation: No default destructive actions.', 'Topic alignment: Technique bridge to this module’s security lab', 'Create safe CLI arguments.', 'Use exit status and help pages.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-11', 'automation']::TEXT[],
    ARRAY['Building a CLI', 'Security Python Scripting (Mod 11)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000b-4000-8000-000000000003',
    v_course_id,
    'df000000-000b-4000-8000-000000000001',
    'm11-l3-error-messages',
    'Module 11 - Lesson 3: Error messages',
    'Technique bridge to this module’s security lab. Return useful errors for absent file paths. Verification: Exit status nonzero on failure.',
    'HGOBQPFzWKo',
    35,
    43,
    ARRAY['Return useful errors for absent file paths.', 'Verify implementation: Exit status nonzero on failure.', 'Topic alignment: Technique bridge to this module’s security lab', 'Create safe CLI arguments.', 'Use exit status and help pages.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-11', 'automation']::TEXT[],
    ARRAY['Error messages', 'Security Python Scripting (Mod 11)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000b-4000-8000-000000000004',
    v_course_id,
    'df000000-000b-4000-8000-000000000001',
    'm11-l4-first-cli-tests',
    'Module 11 - Lesson 4: First CLI tests',
    'Technique bridge to this module’s security lab. Write tests for --help, valid and missing arguments. Verification: CLI tests pass.',
    'cHYq1MRoyI0',
    35,
    44,
    ARRAY['Write tests for --help, valid and missing arguments.', 'Verify implementation: CLI tests pass.', 'Topic alignment: Technique bridge to this module’s security lab', 'Create safe CLI arguments.', 'Use exit status and help pages.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-11', 'automation']::TEXT[],
    ARRAY['First CLI tests', 'Security Python Scripting (Mod 11)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000c-4000-8000-000000000001',
    v_course_id,
    'df000000-000c-4000-8000-000000000001',
    'm12-l1-os-module',
    'Module 12 - Lesson 1: OS module',
    'Technique bridge to this module’s security lab. Read OS name and current working directory. Verification: No network or privileged access.',
    'oDOw5tB3Udw',
    35,
    45,
    ARRAY['Read OS name and current working directory.', 'Verify implementation: No network or privileged access.', 'Topic alignment: Technique bridge to this module’s security lab', 'Use pathlib and os for system facts.', 'Explain subprocess safety.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-12', 'automation']::TEXT[],
    ARRAY['OS module', 'Security Python Scripting (Mod 12)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000c-4000-8000-000000000002',
    v_course_id,
    'df000000-000c-4000-8000-000000000001',
    'm12-l2-files-and-shutil',
    'Module 12 - Lesson 2: Files and shutil',
    'Technique bridge to this module’s security lab. Copy synthetic evidence into an output staging directory. Verification: Original remains byte-identical.',
    'oDOw5tB3Udw',
    35,
    46,
    ARRAY['Copy synthetic evidence into an output staging directory.', 'Verify implementation: Original remains byte-identical.', 'Topic alignment: Technique bridge to this module’s security lab', 'Use pathlib and os for system facts.', 'Explain subprocess safety.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-12', 'automation']::TEXT[],
    ARRAY['Files and shutil', 'Security Python Scripting (Mod 12)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000c-4000-8000-000000000003',
    v_course_id,
    'df000000-000c-4000-8000-000000000001',
    'm12-l3-processes-and-file-handling-design',
    'Module 12 - Lesson 3: Processes and file-handling design',
    'Technique bridge to this module’s security lab. Explain structured objects for host inventory. Verification: Inventory schema documented.',
    'eWRfhZUzrAc',
    35,
    47,
    ARRAY['Explain structured objects for host inventory.', 'Verify implementation: Inventory schema documented.', 'Topic alignment: Technique bridge to this module’s security lab', 'Use pathlib and os for system facts.', 'Explain subprocess safety.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-12', 'automation']::TEXT[],
    ARRAY['Processes and file-handling design', 'Security Python Scripting (Mod 12)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000c-4000-8000-000000000004',
    v_course_id,
    'df000000-000c-4000-8000-000000000001',
    'm12-l4-automation-safety',
    'Module 12 - Lesson 4: Automation safety',
    'Technique bridge to this module’s security lab. Compare libraries for safe tooling; reject shell=True with untrusted input. Verification: Execution plan is allowlisted.',
    'Fxh9X3-hO4Y',
    35,
    48,
    ARRAY['Compare libraries for safe tooling; reject shell=True with untrusted input.', 'Verify implementation: Execution plan is allowlisted.', 'Topic alignment: Technique bridge to this module’s security lab', 'Use pathlib and os for system facts.', 'Explain subprocess safety.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-12', 'automation']::TEXT[],
    ARRAY['Automation safety', 'Security Python Scripting (Mod 12)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000d-4000-8000-000000000001',
    v_course_id,
    'df000000-000d-4000-8000-000000000001',
    'm13-l1-regex-log-analysis',
    'Module 13 - Lesson 1: Regex log analysis',
    'Direct topic demonstration. Extract users, source IPs and outcomes from supplied synthetic auth.log. Verification: Extracts known sample records.',
    'KVmbRdwWohY',
    35,
    49,
    ARRAY['Extract users, source IPs and outcomes from supplied synthetic auth.log.', 'Verify implementation: Extracts known sample records.', 'Topic alignment: Direct topic demonstration', 'Parse synthetic SSH auth events.', 'Aggregate by source, account and time.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-13', 'automation']::TEXT[],
    ARRAY['Regex log analysis', 'Security Python Scripting (Mod 13)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000d-4000-8000-000000000002',
    v_course_id,
    'df000000-000d-4000-8000-000000000001',
    'm13-l2-file-parsing-algorithm',
    'Module 13 - Lesson 2: File parsing algorithm',
    'Direct topic demonstration. Implement separate parse and analyze functions. Verification: Bad lines do not crash parser.',
    'KVmbRdwWohY',
    35,
    50,
    ARRAY['Implement separate parse and analyze functions.', 'Verify implementation: Bad lines do not crash parser.', 'Topic alignment: Direct topic demonstration', 'Parse synthetic SSH auth events.', 'Aggregate by source, account and time.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-13', 'automation']::TEXT[],
    ARRAY['File parsing algorithm', 'Security Python Scripting (Mod 13)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000d-4000-8000-000000000003',
    v_course_id,
    'df000000-000d-4000-8000-000000000001',
    'm13-l3-data-grouping',
    'Module 13 - Lesson 3: Data grouping',
    'Technique bridge to this module’s security lab. Count attempts per IP and username. Verification: Counts match fixture.',
    'HGOBQPFzWKo',
    35,
    51,
    ARRAY['Count attempts per IP and username.', 'Verify implementation: Counts match fixture.', 'Topic alignment: Technique bridge to this module’s security lab', 'Parse synthetic SSH auth events.', 'Aggregate by source, account and time.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-13', 'automation']::TEXT[],
    ARRAY['Data grouping', 'Security Python Scripting (Mod 13)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000d-4000-8000-000000000004',
    v_course_id,
    'df000000-000d-4000-8000-000000000001',
    'm13-l4-logging-results',
    'Module 13 - Lesson 4: Logging results',
    'Technique bridge to this module’s security lab. Output investigation audit messages. Verification: No raw secrets logged.',
    'HGOBQPFzWKo',
    35,
    52,
    ARRAY['Output investigation audit messages.', 'Verify implementation: No raw secrets logged.', 'Topic alignment: Technique bridge to this module’s security lab', 'Parse synthetic SSH auth events.', 'Aggregate by source, account and time.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-13', 'automation']::TEXT[],
    ARRAY['Logging results', 'Security Python Scripting (Mod 13)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000e-4000-8000-000000000001',
    v_course_id,
    'df000000-000e-4000-8000-000000000001',
    'm14-l1-regex-and-record-extraction',
    'Module 14 - Lesson 1: Regex and record extraction',
    'Technique bridge to this module’s security lab. Extract event IDs and usernames from synthetic XML. Verification: No guesswork from incomplete fields.',
    'KVmbRdwWohY',
    35,
    53,
    ARRAY['Extract event IDs and usernames from synthetic XML.', 'Verify implementation: No guesswork from incomplete fields.', 'Topic alignment: Technique bridge to this module’s security lab', 'Recognize relevant Windows event IDs.', 'Parse exported synthetic event XML or EVTX files offline.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-14', 'automation']::TEXT[],
    ARRAY['Regex and record extraction', 'Security Python Scripting (Mod 14)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000e-4000-8000-000000000002',
    v_course_id,
    'df000000-000e-4000-8000-000000000001',
    'm14-l2-reading-and-validating-files',
    'Module 14 - Lesson 2: Reading and validating files',
    'Technique bridge to this module’s security lab. Read an exported event record with an XML parser. Verification: No dependence on a live domain.',
    'KVmbRdwWohY',
    35,
    54,
    ARRAY['Read an exported event record with an XML parser.', 'Verify implementation: No dependence on a live domain.', 'Topic alignment: Technique bridge to this module’s security lab', 'Recognize relevant Windows event IDs.', 'Parse exported synthetic event XML or EVTX files offline.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-14', 'automation']::TEXT[],
    ARRAY['Reading and validating files', 'Security Python Scripting (Mod 14)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000e-4000-8000-000000000003',
    v_course_id,
    'df000000-000e-4000-8000-000000000001',
    'm14-l3-json-output',
    'Module 14 - Lesson 3: JSON output',
    'Technique bridge to this module’s security lab. Convert parsed events into normalized JSON objects. Verification: Output round-trips.',
    'HGOBQPFzWKo',
    35,
    55,
    ARRAY['Convert parsed events into normalized JSON objects.', 'Verify implementation: Output round-trips.', 'Topic alignment: Technique bridge to this module’s security lab', 'Recognize relevant Windows event IDs.', 'Parse exported synthetic event XML or EVTX files offline.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-14', 'automation']::TEXT[],
    ARRAY['JSON output', 'Security Python Scripting (Mod 14)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000e-4000-8000-000000000004',
    v_course_id,
    'df000000-000e-4000-8000-000000000001',
    'm14-l4-parametrized-regression-checks',
    'Module 14 - Lesson 4: Parametrized regression checks',
    'Technique bridge to this module’s security lab. Test IDs 4624 and 4625 using synthetic records. Verification: Event meanings not confused.',
    'cHYq1MRoyI0',
    35,
    56,
    ARRAY['Test IDs 4624 and 4625 using synthetic records.', 'Verify implementation: Event meanings not confused.', 'Topic alignment: Technique bridge to this module’s security lab', 'Recognize relevant Windows event IDs.', 'Parse exported synthetic event XML or EVTX files offline.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-14', 'automation']::TEXT[],
    ARRAY['Parametrized regression checks', 'Security Python Scripting (Mod 14)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000f-4000-8000-000000000001',
    v_course_id,
    'df000000-000f-4000-8000-000000000001',
    'm15-l1-python-sockets',
    'Module 15 - Lesson 1: Python sockets',
    'Direct topic demonstration. Build a connection check to a local test listener. Verification: Only 127.0.0.1 used.',
    'oDOw5tB3Udw',
    35,
    57,
    ARRAY['Build a connection check to a local test listener.', 'Verify implementation: Only 127.0.0.1 used.', 'Topic alignment: Direct topic demonstration', 'Parse IP addresses and network ranges.', 'Understand TCP socket basics.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-15', 'automation']::TEXT[],
    ARRAY['Python sockets', 'Security Python Scripting (Mod 15)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000f-4000-8000-000000000002',
    v_course_id,
    'df000000-000f-4000-8000-000000000001',
    'm15-l2-dns-lookup-principles',
    'Module 15 - Lesson 2: DNS lookup principles',
    'Technique bridge to this module’s security lab. Resolve localhost and document result. Verification: No third-party reconnaissance.',
    'oDOw5tB3Udw',
    35,
    58,
    ARRAY['Resolve localhost and document result.', 'Verify implementation: No third-party reconnaissance.', 'Topic alignment: Technique bridge to this module’s security lab', 'Parse IP addresses and network ranges.', 'Understand TCP socket basics.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-15', 'automation']::TEXT[],
    ARRAY['DNS lookup principles', 'Security Python Scripting (Mod 15)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000f-4000-8000-000000000003',
    v_course_id,
    'df000000-000f-4000-8000-000000000001',
    'm15-l3-timeout-handling',
    'Module 15 - Lesson 3: Timeout handling',
    'Technique bridge to this module’s security lab. Handle refused connection and timeout as distinct states. Verification: Script never hangs.',
    'HGOBQPFzWKo',
    35,
    59,
    ARRAY['Handle refused connection and timeout as distinct states.', 'Verify implementation: Script never hangs.', 'Topic alignment: Technique bridge to this module’s security lab', 'Parse IP addresses and network ranges.', 'Understand TCP socket basics.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-15', 'automation']::TEXT[],
    ARRAY['Timeout handling', 'Security Python Scripting (Mod 15)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-000f-4000-8000-000000000004',
    v_course_id,
    'df000000-000f-4000-8000-000000000001',
    'm15-l4-safe-security-scripting-roadmap',
    'Module 15 - Lesson 4: Safe security-scripting roadmap',
    'Technique bridge to this module’s security lab. Discuss scope and rate controls for checks. Verification: Testing stays inside owned lab.',
    'Fxh9X3-hO4Y',
    35,
    60,
    ARRAY['Discuss scope and rate controls for checks.', 'Verify implementation: Testing stays inside owned lab.', 'Topic alignment: Technique bridge to this module’s security lab', 'Parse IP addresses and network ranges.', 'Understand TCP socket basics.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-15', 'automation']::TEXT[],
    ARRAY['Safe security-scripting roadmap', 'Security Python Scripting (Mod 15)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0010-4000-8000-000000000001',
    v_course_id,
    'df000000-0010-4000-8000-000000000001',
    'm16-l1-http-requests',
    'Module 16 - Lesson 1: HTTP requests',
    'Direct topic demonstration. Identify GET status codes, headers and response bodies. Verification: Can distinguish 200, 429, 500.',
    '0sOvCWFmrtA',
    35,
    61,
    ARRAY['Identify GET status codes, headers and response bodies.', 'Verify implementation: Can distinguish 200, 429, 500.', 'Topic alignment: Direct topic demonstration', 'Explain HTTP status and JSON.', 'Apply safe timeouts and pagination.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-16', 'automation']::TEXT[],
    ARRAY['HTTP requests', 'Security Python Scripting (Mod 16)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0010-4000-8000-000000000002',
    v_course_id,
    'df000000-0010-4000-8000-000000000001',
    'm16-l2-json-normalization',
    'Module 16 - Lesson 2: JSON normalization',
    'Direct topic demonstration. Read a mock alert API response from disk. Verification: Response schema validated.',
    'HGOBQPFzWKo',
    35,
    62,
    ARRAY['Read a mock alert API response from disk.', 'Verify implementation: Response schema validated.', 'Topic alignment: Direct topic demonstration', 'Explain HTTP status and JSON.', 'Apply safe timeouts and pagination.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-16', 'automation']::TEXT[],
    ARRAY['JSON normalization', 'Security Python Scripting (Mod 16)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0010-4000-8000-000000000003',
    v_course_id,
    'df000000-0010-4000-8000-000000000001',
    'm16-l3-path-and-schema-validation',
    'Module 16 - Lesson 3: Path and schema validation',
    'Technique bridge to this module’s security lab. Define a small expected alert schema. Verification: Unexpected types flagged.',
    '0sOvCWFmrtA',
    35,
    63,
    ARRAY['Define a small expected alert schema.', 'Verify implementation: Unexpected types flagged.', 'Topic alignment: Technique bridge to this module’s security lab', 'Explain HTTP status and JSON.', 'Apply safe timeouts and pagination.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-16', 'automation']::TEXT[],
    ARRAY['Path and schema validation', 'Security Python Scripting (Mod 16)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0010-4000-8000-000000000004',
    v_course_id,
    'df000000-0010-4000-8000-000000000001',
    'm16-l4-managing-environment-variables',
    'Module 16 - Lesson 4: Managing environment variables',
    'Technique bridge to this module’s security lab. Load a local demo token from environment rather than source. Verification: Secret absent from Git history.',
    '0sOvCWFmrtA',
    35,
    64,
    ARRAY['Load a local demo token from environment rather than source.', 'Verify implementation: Secret absent from Git history.', 'Topic alignment: Technique bridge to this module’s security lab', 'Explain HTTP status and JSON.', 'Apply safe timeouts and pagination.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-16', 'automation']::TEXT[],
    ARRAY['Managing environment variables', 'Security Python Scripting (Mod 16)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0011-4000-8000-000000000001',
    v_course_id,
    'df000000-0011-4000-8000-000000000001',
    'm17-l1-scapy-environment-and-packet-parsing',
    'Module 17 - Lesson 1: Scapy environment and packet parsing',
    'Direct topic demonstration. Install Scapy and inspect a sample capture. Verification: Uses static PCAP only.',
    'ntObHsiCgkE',
    35,
    65,
    ARRAY['Install Scapy and inspect a sample capture.', 'Verify implementation: Uses static PCAP only.', 'Topic alignment: Direct topic demonstration', 'Read PCAPs without live sniffing.', 'Extract protocols and conversations.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-17', 'automation']::TEXT[],
    ARRAY['Scapy environment and packet parsing', 'Security Python Scripting (Mod 17)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0011-4000-8000-000000000002',
    v_course_id,
    'df000000-0011-4000-8000-000000000001',
    'm17-l2-traffic-and-protocol-classification',
    'Module 17 - Lesson 2: Traffic and protocol classification',
    'Direct topic demonstration. Count IP/TCP/UDP/DNS packets in sample. Verification: Counts are reproducible.',
    'ntObHsiCgkE',
    35,
    66,
    ARRAY['Count IP/TCP/UDP/DNS packets in sample.', 'Verify implementation: Counts are reproducible.', 'Topic alignment: Direct topic demonstration', 'Read PCAPs without live sniffing.', 'Extract protocols and conversations.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-17', 'automation']::TEXT[],
    ARRAY['Traffic and protocol classification', 'Security Python Scripting (Mod 17)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0011-4000-8000-000000000003',
    v_course_id,
    'df000000-0011-4000-8000-000000000001',
    'm17-l3-scapy-packet-layers',
    'Module 17 - Lesson 3: Scapy packet layers',
    'Direct topic demonstration. Observe packet fields in tutorial; adapt to rdpcap offline. Verification: No live capture in learner lab.',
    'rGVipQ1AtU8',
    35,
    67,
    ARRAY['Observe packet fields in tutorial; adapt to rdpcap offline.', 'Verify implementation: No live capture in learner lab.', 'Topic alignment: Direct topic demonstration', 'Read PCAPs without live sniffing.', 'Extract protocols and conversations.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-17', 'automation']::TEXT[],
    ARRAY['Scapy packet layers', 'Security Python Scripting (Mod 17)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0011-4000-8000-000000000004',
    v_course_id,
    'df000000-0011-4000-8000-000000000001',
    'm17-l4-collections-for-network-metrics',
    'Module 17 - Lesson 4: Collections for network metrics',
    'Technique bridge to this module’s security lab. Summarize top source and destination IPs. Verification: Ranking includes tie behavior.',
    'HGOBQPFzWKo',
    35,
    68,
    ARRAY['Summarize top source and destination IPs.', 'Verify implementation: Ranking includes tie behavior.', 'Topic alignment: Technique bridge to this module’s security lab', 'Read PCAPs without live sniffing.', 'Extract protocols and conversations.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-17', 'automation']::TEXT[],
    ARRAY['Collections for network metrics', 'Security Python Scripting (Mod 17)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0012-4000-8000-000000000001',
    v_course_id,
    'df000000-0012-4000-8000-000000000001',
    'm18-l1-url-analyzer-project',
    'Module 18 - Lesson 1: URL analyzer project',
    'Direct topic demonstration. Split sample URLs into scheme, host, path and query. Verification: Defanged examples remain offline.',
    'KVmbRdwWohY',
    35,
    69,
    ARRAY['Split sample URLs into scheme, host, path and query.', 'Verify implementation: Defanged examples remain offline.', 'Topic alignment: Direct topic demonstration', 'Parse URL structure without visiting it.', 'Classify risk indicators without declaring proof.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-18', 'automation']::TEXT[],
    ARRAY['URL analyzer project', 'Security Python Scripting (Mod 18)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0012-4000-8000-000000000002',
    v_course_id,
    'df000000-0012-4000-8000-000000000001',
    'm18-l2-string-and-regex-checks',
    'Module 18 - Lesson 2: String and regex checks',
    'Direct topic demonstration. Detect unusual encodings and URL components. Verification: Samples classified without HTTP requests.',
    'KVmbRdwWohY',
    35,
    70,
    ARRAY['Detect unusual encodings and URL components.', 'Verify implementation: Samples classified without HTTP requests.', 'Topic alignment: Direct topic demonstration', 'Parse URL structure without visiting it.', 'Classify risk indicators without declaring proof.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-18', 'automation']::TEXT[],
    ARRAY['String and regex checks', 'Security Python Scripting (Mod 18)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0012-4000-8000-000000000003',
    v_course_id,
    'df000000-0012-4000-8000-000000000001',
    'm18-l3-http-foundations',
    'Module 18 - Lesson 3: HTTP foundations',
    'Technique bridge to this module’s security lab. Explain why following a URL can cause network activity. Verification: Analyst keeps URLs unvisited.',
    '0sOvCWFmrtA',
    35,
    71,
    ARRAY['Explain why following a URL can cause network activity.', 'Verify implementation: Analyst keeps URLs unvisited.', 'Topic alignment: Technique bridge to this module’s security lab', 'Parse URL structure without visiting it.', 'Classify risk indicators without declaring proof.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-18', 'automation']::TEXT[],
    ARRAY['HTTP foundations', 'Security Python Scripting (Mod 18)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0012-4000-8000-000000000004',
    v_course_id,
    'df000000-0012-4000-8000-000000000001',
    'm18-l4-ethical-research-practices',
    'Module 18 - Lesson 4: Ethical research practices',
    'Technique bridge to this module’s security lab. Discuss authorized scope for web research and privacy. Verification: No site crawling performed.',
    'Fxh9X3-hO4Y',
    35,
    72,
    ARRAY['Discuss authorized scope for web research and privacy.', 'Verify implementation: No site crawling performed.', 'Topic alignment: Technique bridge to this module’s security lab', 'Parse URL structure without visiting it.', 'Classify risk indicators without declaring proof.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-18', 'automation']::TEXT[],
    ARRAY['Ethical research practices', 'Security Python Scripting (Mod 18)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0013-4000-8000-000000000001',
    v_course_id,
    'df000000-0013-4000-8000-000000000001',
    'm19-l1-dictionaries-and-event-records',
    'Module 19 - Lesson 1: Dictionaries and event records',
    'Technique bridge to this module’s security lab. Normalize nested log events into row-oriented records. Verification: All required fields exist.',
    'HGOBQPFzWKo',
    35,
    73,
    ARRAY['Normalize nested log events into row-oriented records.', 'Verify implementation: All required fields exist.', 'Topic alignment: Technique bridge to this module’s security lab', 'Transform events into a tabular schema.', 'Aggregate time windows safely.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-19', 'automation']::TEXT[],
    ARRAY['Dictionaries and event records', 'Security Python Scripting (Mod 19)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0013-4000-8000-000000000002',
    v_course_id,
    'df000000-0013-4000-8000-000000000001',
    'm19-l2-date-and-time-handling',
    'Module 19 - Lesson 2: Date and time handling',
    'Technique bridge to this module’s security lab. Convert synthetic timestamps to aware UTC datetimes. Verification: No naive datetime at output.',
    'oDOw5tB3Udw',
    35,
    74,
    ARRAY['Convert synthetic timestamps to aware UTC datetimes.', 'Verify implementation: No naive datetime at output.', 'Topic alignment: Technique bridge to this module’s security lab', 'Transform events into a tabular schema.', 'Aggregate time windows safely.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-19', 'automation']::TEXT[],
    ARRAY['Date and time handling', 'Security Python Scripting (Mod 19)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0013-4000-8000-000000000003',
    v_course_id,
    'df000000-0013-4000-8000-000000000001',
    'm19-l3-collections-and-aggregation',
    'Module 19 - Lesson 3: Collections and aggregation',
    'Technique bridge to this module’s security lab. Aggregate failures by 5-minute window. Verification: Counts hand-verified.',
    'HGOBQPFzWKo',
    35,
    75,
    ARRAY['Aggregate failures by 5-minute window.', 'Verify implementation: Counts hand-verified.', 'Topic alignment: Technique bridge to this module’s security lab', 'Transform events into a tabular schema.', 'Aggregate time windows safely.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-19', 'automation']::TEXT[],
    ARRAY['Collections and aggregation', 'Security Python Scripting (Mod 19)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0013-4000-8000-000000000004',
    v_course_id,
    'df000000-0013-4000-8000-000000000001',
    'm19-l4-pcap-plus-pandas-demonstration',
    'Module 19 - Lesson 4: PCAP plus Pandas demonstration',
    'Technique bridge to this module’s security lab. Adapt group-by concepts to security events. Verification: Small table matches reference output.',
    'ntObHsiCgkE',
    35,
    76,
    ARRAY['Adapt group-by concepts to security events.', 'Verify implementation: Small table matches reference output.', 'Topic alignment: Technique bridge to this module’s security lab', 'Transform events into a tabular schema.', 'Aggregate time windows safely.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-19', 'automation']::TEXT[],
    ARRAY['PCAP plus Pandas demonstration', 'Security Python Scripting (Mod 19)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0014-4000-8000-000000000001',
    v_course_id,
    'df000000-0014-4000-8000-000000000001',
    'm20-l1-generators',
    'Module 20 - Lesson 1: Generators',
    'Direct topic demonstration. Stream a file one line at a time. Verification: Memory usage bounded by a small buffer.',
    'HGOBQPFzWKo',
    35,
    77,
    ARRAY['Stream a file one line at a time.', 'Verify implementation: Memory usage bounded by a small buffer.', 'Topic alignment: Direct topic demonstration', 'Explain generators vs lists.', 'Compare threads vs processes.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-20', 'automation']::TEXT[],
    ARRAY['Generators', 'Security Python Scripting (Mod 20)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0014-4000-8000-000000000002',
    v_course_id,
    'df000000-0014-4000-8000-000000000001',
    'm20-l2-threading-vs-multiprocessing',
    'Module 20 - Lesson 2: Threading vs multiprocessing',
    'Direct topic demonstration. Choose threads for I/O-bound mock enrichment. Verification: Justification written.',
    'HGOBQPFzWKo',
    35,
    78,
    ARRAY['Choose threads for I/O-bound mock enrichment.', 'Verify implementation: Justification written.', 'Topic alignment: Direct topic demonstration', 'Explain generators vs lists.', 'Compare threads vs processes.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-20', 'automation']::TEXT[],
    ARRAY['Threading vs multiprocessing', 'Security Python Scripting (Mod 20)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0014-4000-8000-000000000003',
    v_course_id,
    'df000000-0014-4000-8000-000000000001',
    'm20-l3-multithreading',
    'Module 20 - Lesson 3: Multithreading',
    'Technique bridge to this module’s security lab. Run mock independent tasks with a small worker pool. Verification: Thread count bounded.',
    'HGOBQPFzWKo',
    35,
    79,
    ARRAY['Run mock independent tasks with a small worker pool.', 'Verify implementation: Thread count bounded.', 'Topic alignment: Technique bridge to this module’s security lab', 'Explain generators vs lists.', 'Compare threads vs processes.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-20', 'automation']::TEXT[],
    ARRAY['Multithreading', 'Security Python Scripting (Mod 20)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0014-4000-8000-000000000004',
    v_course_id,
    'df000000-0014-4000-8000-000000000001',
    'm20-l4-testing-concurrency',
    'Module 20 - Lesson 4: Testing concurrency',
    'Technique bridge to this module’s security lab. Mock delayed responses and timeouts. Verification: Network not required.',
    'cHYq1MRoyI0',
    35,
    80,
    ARRAY['Mock delayed responses and timeouts.', 'Verify implementation: Network not required.', 'Topic alignment: Technique bridge to this module’s security lab', 'Explain generators vs lists.', 'Compare threads vs processes.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-20', 'automation']::TEXT[],
    ARRAY['Testing concurrency', 'Security Python Scripting (Mod 20)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0015-4000-8000-000000000001',
    v_course_id,
    'df000000-0015-4000-8000-000000000001',
    'm21-l1-json-handling-for-ioc-feeds',
    'Module 21 - Lesson 1: JSON handling for IOC feeds',
    'Technique bridge to this module’s security lab. Parse a sample offline threat feed and retain source/time. Verification: Provenance stored.',
    'HGOBQPFzWKo',
    35,
    81,
    ARRAY['Parse a sample offline threat feed and retain source/time.', 'Verify implementation: Provenance stored.', 'Topic alignment: Technique bridge to this module’s security lab', 'Normalize IOC types.', 'Cache mock enrichment responses.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-21', 'detection']::TEXT[],
    ARRAY['JSON handling for IOC feeds', 'Security Python Scripting (Mod 21)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0015-4000-8000-000000000002',
    v_course_id,
    'df000000-0015-4000-8000-000000000001',
    'm21-l2-request-api-concepts',
    'Module 21 - Lesson 2: Request API concepts',
    'Technique bridge to this module’s security lab. Design a GET wrapper with timeout and response validation. Verification: No real API token required.',
    '0sOvCWFmrtA',
    35,
    82,
    ARRAY['Design a GET wrapper with timeout and response validation.', 'Verify implementation: No real API token required.', 'Topic alignment: Technique bridge to this module’s security lab', 'Normalize IOC types.', 'Cache mock enrichment responses.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-21', 'detection']::TEXT[],
    ARRAY['Request API concepts', 'Security Python Scripting (Mod 21)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0015-4000-8000-000000000003',
    v_course_id,
    'df000000-0015-4000-8000-000000000001',
    'm21-l3-string-matching',
    'Module 21 - Lesson 3: String matching',
    'Technique bridge to this module’s security lab. Match normalized indicators against mock alerts. Verification: Case handling explicit.',
    'KVmbRdwWohY',
    35,
    83,
    ARRAY['Match normalized indicators against mock alerts.', 'Verify implementation: Case handling explicit.', 'Topic alignment: Technique bridge to this module’s security lab', 'Normalize IOC types.', 'Cache mock enrichment responses.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-21', 'detection']::TEXT[],
    ARRAY['String matching', 'Security Python Scripting (Mod 21)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0015-4000-8000-000000000004',
    v_course_id,
    'df000000-0015-4000-8000-000000000001',
    'm21-l4-mock-driven-unit-tests',
    'Module 21 - Lesson 4: Mock-driven unit tests',
    'Technique bridge to this module’s security lab. Simulate no match, match and unavailable feed. Verification: All three states distinguished.',
    'cHYq1MRoyI0',
    35,
    84,
    ARRAY['Simulate no match, match and unavailable feed.', 'Verify implementation: All three states distinguished.', 'Topic alignment: Technique bridge to this module’s security lab', 'Normalize IOC types.', 'Cache mock enrichment responses.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-21', 'detection']::TEXT[],
    ARRAY['Mock-driven unit tests', 'Security Python Scripting (Mod 21)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0016-4000-8000-000000000001',
    v_course_id,
    'df000000-0016-4000-8000-000000000001',
    'm22-l1-hash-functions-and-integrity',
    'Module 22 - Lesson 1: Hash functions and integrity',
    'Direct topic demonstration. Hash a local synthetic text file using hashlib. Verification: Digest length is 64 hex characters.',
    'cMdgDTgxx6o',
    35,
    85,
    ARRAY['Hash a local synthetic text file using hashlib.', 'Verify implementation: Digest length is 64 hex characters.', 'Topic alignment: Direct topic demonstration', 'Compute SHA-256 safely.', 'Build a baseline/check workflow.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-22', 'detection']::TEXT[],
    ARRAY['Hash functions and integrity', 'Security Python Scripting (Mod 22)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0016-4000-8000-000000000002',
    v_course_id,
    'df000000-0016-4000-8000-000000000001',
    'm22-l2-integrity-verification-code',
    'Module 22 - Lesson 2: Integrity verification code',
    'Direct topic demonstration. Create a streaming file-hash helper. Verification: Large file read in chunks.',
    'kb_scuDUHls',
    35,
    86,
    ARRAY['Create a streaming file-hash helper.', 'Verify implementation: Large file read in chunks.', 'Topic alignment: Direct topic demonstration', 'Compute SHA-256 safely.', 'Build a baseline/check workflow.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-22', 'detection']::TEXT[],
    ARRAY['Integrity verification code', 'Security Python Scripting (Mod 22)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0016-4000-8000-000000000003',
    v_course_id,
    'df000000-0016-4000-8000-000000000001',
    'm22-l3-compare-baseline-and-altered-artifact',
    'Module 22 - Lesson 3: Compare baseline and altered artifact',
    'Direct topic demonstration. Change one byte and observe digest difference. Verification: Modified file detected.',
    'kb_scuDUHls',
    35,
    87,
    ARRAY['Change one byte and observe digest difference.', 'Verify implementation: Modified file detected.', 'Topic alignment: Direct topic demonstration', 'Compute SHA-256 safely.', 'Build a baseline/check workflow.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-22', 'detection']::TEXT[],
    ARRAY['Compare baseline and altered artifact', 'Security Python Scripting (Mod 22)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0016-4000-8000-000000000004',
    v_course_id,
    'df000000-0016-4000-8000-000000000001',
    'm22-l4-cryptography-and-passwords',
    'Module 22 - Lesson 4: Cryptography and passwords',
    'Direct topic demonstration. Explain key storage, encryption and password hash distinction. Verification: No passwords stored as plaintext in repo.',
    'kb_scuDUHls',
    35,
    88,
    ARRAY['Explain key storage, encryption and password hash distinction.', 'Verify implementation: No passwords stored as plaintext in repo.', 'Topic alignment: Direct topic demonstration', 'Compute SHA-256 safely.', 'Build a baseline/check workflow.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-22', 'detection']::TEXT[],
    ARRAY['Cryptography and passwords', 'Security Python Scripting (Mod 22)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0017-4000-8000-000000000001',
    v_course_id,
    'df000000-0017-4000-8000-000000000001',
    'm23-l1-email-and-string-parsing',
    'Module 23 - Lesson 1: Email and string parsing',
    'Direct topic demonstration. Normalize display-name and subject fields from synthetic email. Verification: Raw values preserved separately.',
    'KVmbRdwWohY',
    35,
    89,
    ARRAY['Normalize display-name and subject fields from synthetic email.', 'Verify implementation: Raw values preserved separately.', 'Topic alignment: Direct topic demonstration', 'Parse offline .eml structure.', 'Extract sender, URLs and attachments metadata.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-23', 'detection']::TEXT[],
    ARRAY['Email and string parsing', 'Security Python Scripting (Mod 23)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0017-4000-8000-000000000002',
    v_course_id,
    'df000000-0017-4000-8000-000000000001',
    'm23-l2-url-structure-analysis',
    'Module 23 - Lesson 2: URL structure analysis',
    'Direct topic demonstration. Extract and defang training URLs without fetching them. Verification: No network calls.',
    'KVmbRdwWohY',
    35,
    90,
    ARRAY['Extract and defang training URLs without fetching them.', 'Verify implementation: No network calls.', 'Topic alignment: Direct topic demonstration', 'Parse offline .eml structure.', 'Extract sender, URLs and attachments metadata.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-23', 'detection']::TEXT[],
    ARRAY['URL structure analysis', 'Security Python Scripting (Mod 23)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0017-4000-8000-000000000003',
    v_course_id,
    'df000000-0017-4000-8000-000000000001',
    'm23-l3-regex-and-iocs',
    'Module 23 - Lesson 3: Regex and IOCs',
    'Direct topic demonstration. Find candidate email addresses, then parse formally. Verification: Invalid candidates handled.',
    'KVmbRdwWohY',
    35,
    91,
    ARRAY['Find candidate email addresses, then parse formally.', 'Verify implementation: Invalid candidates handled.', 'Topic alignment: Direct topic demonstration', 'Parse offline .eml structure.', 'Extract sender, URLs and attachments metadata.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-23', 'detection']::TEXT[],
    ARRAY['Regex and IOCs', 'Security Python Scripting (Mod 23)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0017-4000-8000-000000000004',
    v_course_id,
    'df000000-0017-4000-8000-000000000001',
    'm23-l4-files-and-reports',
    'Module 23 - Lesson 4: Files and reports',
    'Direct topic demonstration. Process an offline email fixture. Verification: Original source untouched.',
    'KVmbRdwWohY',
    35,
    92,
    ARRAY['Process an offline email fixture.', 'Verify implementation: Original source untouched.', 'Topic alignment: Direct topic demonstration', 'Parse offline .eml structure.', 'Extract sender, URLs and attachments metadata.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-23', 'detection']::TEXT[],
    ARRAY['Files and reports', 'Security Python Scripting (Mod 23)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0018-4000-8000-000000000001',
    v_course_id,
    'df000000-0018-4000-8000-000000000001',
    'm24-l1-hash-and-file-analysis',
    'Module 24 - Lesson 1: Hash and file analysis',
    'Direct topic demonstration. Hash inert local sample text and compare manifests. Verification: No suspicious binary executed.',
    'cMdgDTgxx6o',
    35,
    93,
    ARRAY['Hash inert local sample text and compare manifests.', 'Verify implementation: No suspicious binary executed.', 'Topic alignment: Direct topic demonstration', 'Explain hash and file-type evidence.', 'Work with inert training samples.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-24', 'detection']::TEXT[],
    ARRAY['Hash and file analysis', 'Security Python Scripting (Mod 24)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0018-4000-8000-000000000002',
    v_course_id,
    'df000000-0018-4000-8000-000000000001',
    'm24-l2-cryptographic-file-integrity',
    'Module 24 - Lesson 2: Cryptographic file integrity',
    'Direct topic demonstration. Explain integrity versus maliciousness. Verification: Conclusions stay limited.',
    'kb_scuDUHls',
    35,
    94,
    ARRAY['Explain integrity versus maliciousness.', 'Verify implementation: Conclusions stay limited.', 'Topic alignment: Direct topic demonstration', 'Explain hash and file-type evidence.', 'Work with inert training samples.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-24', 'detection']::TEXT[],
    ARRAY['Cryptographic file integrity', 'Security Python Scripting (Mod 24)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0018-4000-8000-000000000003',
    v_course_id,
    'df000000-0018-4000-8000-000000000001',
    'm24-l3-regex-and-pattern-matching',
    'Module 24 - Lesson 3: Regex and pattern matching',
    'Direct topic demonstration. Write text patterns for suspicious-looking strings in a harmless sample. Verification: Patterns tested on benign examples.',
    'KVmbRdwWohY',
    35,
    95,
    ARRAY['Write text patterns for suspicious-looking strings in a harmless sample.', 'Verify implementation: Patterns tested on benign examples.', 'Topic alignment: Direct topic demonstration', 'Explain hash and file-type evidence.', 'Work with inert training samples.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-24', 'detection']::TEXT[],
    ARRAY['Regex and pattern matching', 'Security Python Scripting (Mod 24)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0018-4000-8000-000000000004',
    v_course_id,
    'df000000-0018-4000-8000-000000000001',
    'm24-l4-pytest-for-rules',
    'Module 24 - Lesson 4: Pytest for rules',
    'Technique bridge to this module’s security lab. Test true and false matching cases. Verification: False-positive test included.',
    'cHYq1MRoyI0',
    35,
    96,
    ARRAY['Test true and false matching cases.', 'Verify implementation: False-positive test included.', 'Topic alignment: Technique bridge to this module’s security lab', 'Explain hash and file-type evidence.', 'Work with inert training samples.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-24', 'detection']::TEXT[],
    ARRAY['Pytest for rules', 'Security Python Scripting (Mod 24)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0019-4000-8000-000000000001',
    v_course_id,
    'df000000-0019-4000-8000-000000000001',
    'm25-l1-security-log-analysis-algorithm',
    'Module 25 - Lesson 1: Security log analysis algorithm',
    'Direct topic demonstration. Turn observed failed-login pattern into pseudocode. Verification: Hypothesis is testable.',
    'KVmbRdwWohY',
    35,
    97,
    ARRAY['Turn observed failed-login pattern into pseudocode.', 'Verify implementation: Hypothesis is testable.', 'Topic alignment: Direct topic demonstration', 'Translate an investigation hypothesis into a rule.', 'Understand Sigma fields and log sources.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-25', 'detection']::TEXT[],
    ARRAY['Security log analysis algorithm', 'Security Python Scripting (Mod 25)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0019-4000-8000-000000000002',
    v_course_id,
    'df000000-0019-4000-8000-000000000001',
    'm25-l2-reusable-filtering-functions',
    'Module 25 - Lesson 2: Reusable filtering functions',
    'Direct topic demonstration. Build event filter and count functions. Verification: Inputs documented.',
    'KVmbRdwWohY',
    35,
    98,
    ARRAY['Build event filter and count functions.', 'Verify implementation: Inputs documented.', 'Topic alignment: Direct topic demonstration', 'Translate an investigation hypothesis into a rule.', 'Understand Sigma fields and log sources.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-25', 'detection']::TEXT[],
    ARRAY['Reusable filtering functions', 'Security Python Scripting (Mod 25)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0019-4000-8000-000000000003',
    v_course_id,
    'df000000-0019-4000-8000-000000000001',
    'm25-l3-parameterization',
    'Module 25 - Lesson 3: Parameterization',
    'Technique bridge to this module’s security lab. Test 4 detection thresholds. Verification: Regression suite includes boundaries.',
    'cHYq1MRoyI0',
    35,
    99,
    ARRAY['Test 4 detection thresholds.', 'Verify implementation: Regression suite includes boundaries.', 'Topic alignment: Technique bridge to this module’s security lab', 'Translate an investigation hypothesis into a rule.', 'Understand Sigma fields and log sources.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-25', 'detection']::TEXT[],
    ARRAY['Parameterization', 'Security Python Scripting (Mod 25)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-0019-4000-8000-000000000004',
    v_course_id,
    'df000000-0019-4000-8000-000000000001',
    'm25-l4-mocking-dependencies',
    'Module 25 - Lesson 4: Mocking dependencies',
    'Technique bridge to this module’s security lab. Mock log ingestion so tests run offline. Verification: No production SIEM needed.',
    'cHYq1MRoyI0',
    35,
    100,
    ARRAY['Mock log ingestion so tests run offline.', 'Verify implementation: No production SIEM needed.', 'Topic alignment: Technique bridge to this module’s security lab', 'Translate an investigation hypothesis into a rule.', 'Understand Sigma fields and log sources.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-25', 'detection']::TEXT[],
    ARRAY['Mocking dependencies', 'Security Python Scripting (Mod 25)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001a-4000-8000-000000000001',
    v_course_id,
    'df000000-001a-4000-8000-000000000001',
    'm26-l1-json-and-structured-records',
    'Module 26 - Lesson 1: JSON and structured records',
    'Technique bridge to this module’s security lab. Open a small ATT&CK-like offline JSON fixture. Verification: Schema and version recorded.',
    'HGOBQPFzWKo',
    35,
    101,
    ARRAY['Open a small ATT&CK-like offline JSON fixture.', 'Verify implementation: Schema and version recorded.', 'Topic alignment: Technique bridge to this module’s security lab', 'Explain tactics vs techniques.', 'Read structured STIX/ATT&CK JSON.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-26', 'detection']::TEXT[],
    ARRAY['JSON and structured records', 'Security Python Scripting (Mod 26)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001a-4000-8000-000000000002',
    v_course_id,
    'df000000-001a-4000-8000-000000000001',
    'm26-l2-parser-functions',
    'Module 26 - Lesson 2: Parser functions',
    'Technique bridge to this module’s security lab. Normalize technique IDs from report entries. Verification: Unknown IDs not invented.',
    'KVmbRdwWohY',
    35,
    102,
    ARRAY['Normalize technique IDs from report entries.', 'Verify implementation: Unknown IDs not invented.', 'Topic alignment: Technique bridge to this module’s security lab', 'Explain tactics vs techniques.', 'Read structured STIX/ATT&CK JSON.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-26', 'detection']::TEXT[],
    ARRAY['Parser functions', 'Security Python Scripting (Mod 26)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001a-4000-8000-000000000003',
    v_course_id,
    'df000000-001a-4000-8000-000000000001',
    'm26-l3-api-fundamentals',
    'Module 26 - Lesson 3: API fundamentals',
    'Technique bridge to this module’s security lab. Explain public CTI API data structures without an outbound call. Verification: Source metadata documented.',
    '0sOvCWFmrtA',
    35,
    103,
    ARRAY['Explain public CTI API data structures without an outbound call.', 'Verify implementation: Source metadata documented.', 'Topic alignment: Technique bridge to this module’s security lab', 'Explain tactics vs techniques.', 'Read structured STIX/ATT&CK JSON.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-26', 'detection']::TEXT[],
    ARRAY['API fundamentals', 'Security Python Scripting (Mod 26)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001a-4000-8000-000000000004',
    v_course_id,
    'df000000-001a-4000-8000-000000000001',
    'm26-l4-regression-testing',
    'Module 26 - Lesson 4: Regression testing',
    'Technique bridge to this module’s security lab. Test known technique IDs and unknown values. Verification: Unsupported mapping leaves unknown status.',
    'cHYq1MRoyI0',
    35,
    104,
    ARRAY['Test known technique IDs and unknown values.', 'Verify implementation: Unsupported mapping leaves unknown status.', 'Topic alignment: Technique bridge to this module’s security lab', 'Explain tactics vs techniques.', 'Read structured STIX/ATT&CK JSON.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-26', 'detection']::TEXT[],
    ARRAY['Regression testing', 'Security Python Scripting (Mod 26)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001b-4000-8000-000000000001',
    v_course_id,
    'df000000-001b-4000-8000-000000000001',
    'm27-l1-rest-requests-and-status',
    'Module 27 - Lesson 1: REST requests and status',
    'Technique bridge to this module’s security lab. Plan a read-only CVE API fetch with pagination. Verification: HTTP 429 accounted for.',
    '0sOvCWFmrtA',
    35,
    105,
    ARRAY['Plan a read-only CVE API fetch with pagination.', 'Verify implementation: HTTP 429 accounted for.', 'Topic alignment: Technique bridge to this module’s security lab', 'Parse CVE IDs and vulnerability metadata.', 'Explain severity vs exploitability vs exposure.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-27', 'detection']::TEXT[],
    ARRAY['REST requests and status', 'Security Python Scripting (Mod 27)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001b-4000-8000-000000000002',
    v_course_id,
    'df000000-001b-4000-8000-000000000001',
    'm27-l2-json-parsing',
    'Module 27 - Lesson 2: JSON parsing',
    'Technique bridge to this module’s security lab. Read synthetic CVE response with nested metrics. Verification: Missing score handled.',
    'HGOBQPFzWKo',
    35,
    106,
    ARRAY['Read synthetic CVE response with nested metrics.', 'Verify implementation: Missing score handled.', 'Topic alignment: Technique bridge to this module’s security lab', 'Parse CVE IDs and vulnerability metadata.', 'Explain severity vs exploitability vs exposure.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-27', 'detection']::TEXT[],
    ARRAY['JSON parsing', 'Security Python Scripting (Mod 27)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001b-4000-8000-000000000003',
    v_course_id,
    'df000000-001b-4000-8000-000000000001',
    'm27-l3-validation',
    'Module 27 - Lesson 3: Validation',
    'Technique bridge to this module’s security lab. Validate CVE ID format and source fields. Verification: Malformed identifiers rejected.',
    '0sOvCWFmrtA',
    35,
    107,
    ARRAY['Validate CVE ID format and source fields.', 'Verify implementation: Malformed identifiers rejected.', 'Topic alignment: Technique bridge to this module’s security lab', 'Parse CVE IDs and vulnerability metadata.', 'Explain severity vs exploitability vs exposure.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-27', 'detection']::TEXT[],
    ARRAY['Validation', 'Security Python Scripting (Mod 27)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001b-4000-8000-000000000004',
    v_course_id,
    'df000000-001b-4000-8000-000000000001',
    'm27-l4-unit-tests',
    'Module 27 - Lesson 4: Unit tests',
    'Technique bridge to this module’s security lab. Test known, missing and disputed severity records. Verification: No unsupported assumptions.',
    'cHYq1MRoyI0',
    35,
    108,
    ARRAY['Test known, missing and disputed severity records.', 'Verify implementation: No unsupported assumptions.', 'Topic alignment: Technique bridge to this module’s security lab', 'Parse CVE IDs and vulnerability metadata.', 'Explain severity vs exploitability vs exposure.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-27', 'detection']::TEXT[],
    ARRAY['Unit tests', 'Security Python Scripting (Mod 27)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001c-4000-8000-000000000001',
    v_course_id,
    'df000000-001c-4000-8000-000000000001',
    'm28-l1-rest-api-design',
    'Module 28 - Lesson 1: REST API design',
    'Technique bridge to this module’s security lab. Document query parameters and JSON responses. Verification: Only mock backend used.',
    '0sOvCWFmrtA',
    35,
    109,
    ARRAY['Document query parameters and JSON responses.', 'Verify implementation: Only mock backend used.', 'Topic alignment: Technique bridge to this module’s security lab', 'Design read-only SIEM query wrappers.', 'Validate alerts and paginate.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-28', 'detection']::TEXT[],
    ARRAY['REST API design', 'Security Python Scripting (Mod 28)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001c-4000-8000-000000000002',
    v_course_id,
    'df000000-001c-4000-8000-000000000001',
    'm28-l2-environment-variables-and-secrets',
    'Module 28 - Lesson 2: Environment variables and secrets',
    'Technique bridge to this module’s security lab. Store placeholder credentials outside code. Verification: No tokens in project files.',
    '0sOvCWFmrtA',
    35,
    110,
    ARRAY['Store placeholder credentials outside code.', 'Verify implementation: No tokens in project files.', 'Topic alignment: Technique bridge to this module’s security lab', 'Design read-only SIEM query wrappers.', 'Validate alerts and paginate.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-28', 'detection']::TEXT[],
    ARRAY['Environment variables and secrets', 'Security Python Scripting (Mod 28)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001c-4000-8000-000000000003',
    v_course_id,
    'df000000-001c-4000-8000-000000000001',
    'm28-l3-exception-handling',
    'Module 28 - Lesson 3: Exception handling',
    'Technique bridge to this module’s security lab. Distinguish HTTP failure, schema issue and empty results. Verification: Three states distinct.',
    'HGOBQPFzWKo',
    35,
    111,
    ARRAY['Distinguish HTTP failure, schema issue and empty results.', 'Verify implementation: Three states distinct.', 'Topic alignment: Technique bridge to this module’s security lab', 'Design read-only SIEM query wrappers.', 'Validate alerts and paginate.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-28', 'detection']::TEXT[],
    ARRAY['Exception handling', 'Security Python Scripting (Mod 28)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001c-4000-8000-000000000004',
    v_course_id,
    'df000000-001c-4000-8000-000000000001',
    'm28-l4-testing-api-clients',
    'Module 28 - Lesson 4: Testing API clients',
    'Technique bridge to this module’s security lab. Mock a SIEM search API and verify pagination. Verification: No account connection needed.',
    'cHYq1MRoyI0',
    35,
    112,
    ARRAY['Mock a SIEM search API and verify pagination.', 'Verify implementation: No account connection needed.', 'Topic alignment: Technique bridge to this module’s security lab', 'Design read-only SIEM query wrappers.', 'Validate alerts and paginate.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-28', 'detection']::TEXT[],
    ARRAY['Testing API clients', 'Security Python Scripting (Mod 28)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001d-4000-8000-000000000001',
    v_course_id,
    'df000000-001d-4000-8000-000000000001',
    'm29-l1-environment-variable-use',
    'Module 29 - Lesson 1: Environment variable use',
    'Direct topic demonstration. Move mock API token out of source file. Verification: No secrets committed.',
    '0sOvCWFmrtA',
    35,
    113,
    ARRAY['Move mock API token out of source file.', 'Verify implementation: No secrets committed.', 'Topic alignment: Direct topic demonstration', 'Design least-privilege automation.', 'Prevent command injection and secret exposure.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-29', 'advanced']::TEXT[],
    ARRAY['Environment variable use', 'Security Python Scripting (Mod 29)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001d-4000-8000-000000000002',
    v_course_id,
    'df000000-001d-4000-8000-000000000001',
    'm29-l2-pytest-and-fixtures',
    'Module 29 - Lesson 2: Pytest and fixtures',
    'Direct topic demonstration. Create tests for malformed inputs. Verification: Test suite includes negative cases.',
    'cHYq1MRoyI0',
    35,
    114,
    ARRAY['Create tests for malformed inputs.', 'Verify implementation: Test suite includes negative cases.', 'Topic alignment: Direct topic demonstration', 'Design least-privilege automation.', 'Prevent command injection and secret exposure.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-29', 'advanced']::TEXT[],
    ARRAY['Pytest and fixtures', 'Security Python Scripting (Mod 29)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001d-4000-8000-000000000003',
    v_course_id,
    'df000000-001d-4000-8000-000000000001',
    'm29-l3-testing-exceptions',
    'Module 29 - Lesson 3: Testing exceptions',
    'Technique bridge to this module’s security lab. Mock failures and verify safe defaults. Verification: No fail-open path.',
    'cHYq1MRoyI0',
    35,
    115,
    ARRAY['Mock failures and verify safe defaults.', 'Verify implementation: No fail-open path.', 'Topic alignment: Technique bridge to this module’s security lab', 'Design least-privilege automation.', 'Prevent command injection and secret exposure.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-29', 'advanced']::TEXT[],
    ARRAY['Testing exceptions', 'Security Python Scripting (Mod 29)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001d-4000-8000-000000000004',
    v_course_id,
    'df000000-001d-4000-8000-000000000001',
    'm29-l4-ci-automation-fundamentals',
    'Module 29 - Lesson 4: CI automation fundamentals',
    'Technique bridge to this module’s security lab. Plan a GitHub Actions workflow for tests and lint. Verification: No deployment credentials needed.',
    '0sOvCWFmrtA',
    35,
    116,
    ARRAY['Plan a GitHub Actions workflow for tests and lint.', 'Verify implementation: No deployment credentials needed.', 'Topic alignment: Technique bridge to this module’s security lab', 'Design least-privilege automation.', 'Prevent command injection and secret exposure.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-29', 'advanced']::TEXT[],
    ARRAY['CI automation fundamentals', 'Security Python Scripting (Mod 29)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001e-4000-8000-000000000001',
    v_course_id,
    'df000000-001e-4000-8000-000000000001',
    'm30-l1-cybersecurity-parsing-algorithms',
    'Module 30 - Lesson 1: Cybersecurity parsing algorithms',
    'Direct topic demonstration. Review reusable parsing design before capstone. Verification: Parser module contract written.',
    'KVmbRdwWohY',
    35,
    117,
    ARRAY['Review reusable parsing design before capstone.', 'Verify implementation: Parser module contract written.', 'Topic alignment: Direct topic demonstration', 'Implement a reproducible multi-source parser.', 'Correlate and prioritize synthetic events.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-30', 'advanced']::TEXT[],
    ARRAY['Cybersecurity parsing algorithms', 'Security Python Scripting (Mod 30)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001e-4000-8000-000000000002',
    v_course_id,
    'df000000-001e-4000-8000-000000000001',
    'm30-l2-logging-and-json',
    'Module 30 - Lesson 2: Logging and JSON',
    'Technique bridge to this module’s security lab. Add machine-readable audit logs for pipeline runs. Verification: No sensitive input copied unnecessarily.',
    'HGOBQPFzWKo',
    35,
    118,
    ARRAY['Add machine-readable audit logs for pipeline runs.', 'Verify implementation: No sensitive input copied unnecessarily.', 'Topic alignment: Technique bridge to this module’s security lab', 'Implement a reproducible multi-source parser.', 'Correlate and prioritize synthetic events.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-30', 'advanced']::TEXT[],
    ARRAY['Logging and JSON', 'Security Python Scripting (Mod 30)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001e-4000-8000-000000000003',
    v_course_id,
    'df000000-001e-4000-8000-000000000001',
    'm30-l3-testing-core-functions',
    'Module 30 - Lesson 3: Testing core functions',
    'Technique bridge to this module’s security lab. Write parameterized alert classification tests. Verification: Boundary cases covered.',
    'cHYq1MRoyI0',
    35,
    119,
    ARRAY['Write parameterized alert classification tests.', 'Verify implementation: Boundary cases covered.', 'Topic alignment: Technique bridge to this module’s security lab', 'Implement a reproducible multi-source parser.', 'Correlate and prioritize synthetic events.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-30', 'advanced']::TEXT[],
    ARRAY['Testing core functions', 'Security Python Scripting (Mod 30)', 'Defensive Evidence Handling']::TEXT[]
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
    'df000000-001e-4000-8000-000000000004',
    v_course_id,
    'df000000-001e-4000-8000-000000000001',
    'm30-l4-incident-workflow-planning',
    'Module 30 - Lesson 4: Incident workflow planning',
    'Technique bridge to this module’s security lab. Explain portfolio value, safe scope and operational cautions. Verification: README describes limitations.',
    'Fxh9X3-hO4Y',
    35,
    120,
    ARRAY['Explain portfolio value, safe scope and operational cautions.', 'Verify implementation: README describes limitations.', 'Topic alignment: Technique bridge to this module’s security lab', 'Implement a reproducible multi-source parser.', 'Correlate and prioritize synthetic events.']::TEXT[],
    ARRAY['python', 'cybersecurity', 'module-30', 'advanced']::TEXT[],
    ARRAY['Incident workflow planning', 'Security Python Scripting (Mod 30)', 'Defensive Evidence Handling']::TEXT[]
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