-- =============================================================================
-- CYBERTUBE: SEED WINDOWS SECURITY ZERO TO ADVANCED COMPLETE COURSE
-- =============================================================================
-- Description:
-- Idempotently seeds the 18-week Windows Security Zero to Advanced course,
-- all 18 modules, and all 60 video lessons into the Supabase database.
-- =============================================================================

DO $$
DECLARE
  v_course_id CONSTANT UUID := 'd8b00000-0000-4000-8000-000000000001';
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
    'windows-security-zero-to-advanced',
    'Windows Security for Cybersecurity — Zero to Advanced',
    'A 100% Windows-focused, 18-week zero-to-advanced cybersecurity curriculum with 60 video lessons, hands-on labs, Sysmon, Active Directory, event triage, forensics, and SOC capstone.',
    'An intensive, hands-on 18-week Windows-focused cybersecurity syllabus designed for aspiring SOC L1/L2 analysts, incident responders, and Windows defenders. Master Windows 11 and Server 2025 architecture, CMD/PowerShell essentials, NTFS permissions and UAC, processes and persistence mechanisms, Windows Firewall and networking, Defender AV and BitLocker, Event Viewer audit policies and key security event IDs (4624, 4625, 4688, 1102), complete TrustedSec Sysmon deployment and telemetry analysis, Active Directory DS, Kerberos ticket inspection, Group Policy security, Windows hardening baselines, Sysinternals threat hunting (Process Explorer, Autoruns), DFIR evidence extraction (MFT, Prefetch, Registry), Windows Event Forwarding (WEF), and alert triage through an end-to-end SOC capstone portfolio project.',
    'intermediate',
    '18 weeks (130–175 hours)',
    2100,
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    'TrustedSec, 13Cubed & Open Windows Security Community',
    'Windows Security & DFIR Educators',
    'TrustedSec, 13Cubed, CyberPatriot & Garage Tec',
    'published',
    ARRAY['windows-security', 'soc-analyst', 'sysmon', 'active-directory', 'powershell', 'incident-response', 'event-viewer', 'sysinternals', 'dfir', 'hardening']::TEXT[],
    ARRAY['A PC capable of running 64-bit virtualization with at least 16 GB RAM (24–32 GB recommended for Active Directory labs)', 'Basic understanding of computing and operating systems concepts', 'Commitment to ethical defensive investigation and authorized lab boundaries']::TEXT[],
    ARRAY['Build and configure an isolated Windows 11 and Windows Server 2025 defensive lab environment', 'Navigate Windows administrative consoles and extract structured system inventories using PowerShell', 'Analyze Windows access tokens, UAC integrity levels, SIDs, and NTFS discretionary access control lists (DACLs)', 'Detect persistence mechanisms across Run keys, services, scheduled tasks, and auto-start entry points', 'Investigate critical Windows Security Event IDs including 4624, 4625, 4688, 4720, and 1102 with exact caveats', 'Deploy and configure Sysmon to capture process creations, network connections, and telemetry noise filtering', 'Configure Active Directory Domain Services, analyze Kerberos ticket requests (4768/4769), and enforce Group Policy', 'Harden Windows endpoints against Microsoft Security Baselines, LAPS, and AppLocker/App Control', 'Hunt malicious process trees and anomalies using Sysinternals Process Explorer and Autoruns', 'Execute digital forensics on Windows artifacts including Prefetch, NTFS MFT, and Registry hives', 'Design detection engineering rules with Windows Event Forwarding (WEF) and build a complete SOC capstone report']::TEXT[],
    'cybersecurity',
    ARRAY['soc-blue-team', 'dfir', 'fundamentals']::TEXT[],
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

  -- 2. Insert/Update 18 Modules
  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000100', v_course_id, 'Module 00 — Home Lab Setup, Ethics, and Learning Workflow', 'Foundation level. Suggested effort: 5–7 hours. Prerequisite: None. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 1)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000101', v_course_id, 'Module 01 — Windows Architecture and Security Foundations', 'Beginner level. Suggested effort: 6–8 hours. Prerequisite: Module 00. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 2)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000102', v_course_id, 'Module 02 — Windows CMD and PowerShell Essentials', 'Beginner level. Suggested effort: 8–10 hours. Prerequisite: Module 01. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 3)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000103', v_course_id, 'Module 03 — Windows Identity, UAC, and NTFS Permissions', 'Beginner level. Suggested effort: 7–9 hours. Prerequisite: Module 02. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 4)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000104', v_course_id, 'Module 04 — Processes, Services, Registry, Startup and Persistence', 'Intermediate level. Suggested effort: 7–9 hours. Prerequisite: Module 03. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 5)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000105', v_course_id, 'Module 05 — Windows Networking, SMB, RDP and Firewall Security', 'Intermediate level. Suggested effort: 8–10 hours. Prerequisite: Module 04. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 6)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000106', v_course_id, 'Module 06 — Windows Defender, SmartScreen, BitLocker and Endpoint Protection', 'Intermediate level. Suggested effort: 8–10 hours. Prerequisite: Module 05. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 7)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000107', v_course_id, 'Module 07 — Windows Event Viewer, Audit Policy and SOC Event IDs', 'Intermediate level. Suggested effort: 10–12 hours. Prerequisite: Module 06. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 8)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000108', v_course_id, 'Module 08 — Sysmon Installation, Configuration and Security Telemetry', 'Intermediate level. Suggested effort: 10–12 hours. Prerequisite: Module 07. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 9)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000109', v_course_id, 'Module 09 — PowerShell Security, Safe Automation and Script Logging', 'Intermediate level. Suggested effort: 9–11 hours. Prerequisite: Module 08. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 10)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000110', v_course_id, 'Module 10 — Windows Server 2025 and Active Directory Lab Fundamentals', 'Intermediate level. Suggested effort: 10–12 hours. Prerequisite: Module 09. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 11)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000111', v_course_id, 'Module 11 — Active Directory, Kerberos and Group Policy Security', 'Advanced level. Suggested effort: 9–11 hours. Prerequisite: Module 10. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 12)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000112', v_course_id, 'Module 12 — Windows Hardening, Baselines, LAPS and Application Control', 'Advanced level. Suggested effort: 9–11 hours. Prerequisite: Module 11. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 13)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000113', v_course_id, 'Module 13 — Sysinternals Process Explorer, Autoruns and Threat Hunting', 'Advanced level. Suggested effort: 9–11 hours. Prerequisite: Module 12. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 14)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000114', v_course_id, 'Module 14 — Windows Forensics: Event Logs, Registry, Prefetch and NTFS', 'Advanced level. Suggested effort: 10–12 hours. Prerequisite: Module 13. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 15)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000115', v_course_id, 'Module 15 — Windows Event Forwarding and SOC Detection Engineering', 'Advanced level. Suggested effort: 10–12 hours. Prerequisite: Module 14. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 16)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000116', v_course_id, 'Module 16 — Windows Incident Response, Threat Scenarios and Triage', 'Advanced level. Suggested effort: 10–12 hours. Prerequisite: Module 15. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 17)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('d8b00000-0000-4000-8000-000000000117', v_course_id, 'Module 17 — Final Capstone: Windows SOC Analyst Portfolio and Job Readiness', 'Capstone level. Suggested effort: 12–16 hours. Prerequisite: Module 16. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.', 18)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  -- 3. Insert/Update 60 Lessons
  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000000001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000100',
    'm00-l1-windows-11-on-virtualbox',
    'Module 00 - Lesson 1: Windows 11 on VirtualBox — step-by-step (Garage Tec)',
    'Hands-on Windows security video lesson presented by Garage Tec. Covers critical concepts from Module 00 — Home Lab Setup, Ethics, and Learning Workflow. Follow in your isolated lab environment.',
    '9Z6FZisqazE',
    35,
    1,
    ARRAY['Understand Windows editions, safe virtualization, snapshots, and VM resource budgets.', 'Create a Windows 11 client VM and record an initial baseline.', 'Explain why real networks and devices must not be tested without permission.']::TEXT[],
    ARRAY['windows-security', 'module-00', 'foundation']::TEXT[],
    ARRAY['Host vs guest OS; CPU virtualization; virtual TPM and Secure Boot', 'Windows 11 editions and feature limitations', 'VM networking modes', 'Snapshots, restore points, backups, evidence hygiene']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000000002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000100',
    'm00-l2-windows-11-virtualbox-setup-and-tpm-considerations',
    'Module 00 - Lesson 2: Windows 11 VirtualBox setup and TPM considerations',
    'Hands-on Windows security video lesson presented by Windows Security Community. Covers critical concepts from Module 00 — Home Lab Setup, Ethics, and Learning Workflow. Follow in your isolated lab environment.',
    '5BC2fRWfiQ0',
    35,
    2,
    ARRAY['Understand Windows editions, safe virtualization, snapshots, and VM resource budgets.', 'Create a Windows 11 client VM and record an initial baseline.', 'Explain why real networks and devices must not be tested without permission.']::TEXT[],
    ARRAY['windows-security', 'module-00', 'foundation']::TEXT[],
    ARRAY['Host vs guest OS; CPU virtualization; virtual TPM and Secure Boot', 'Windows 11 editions and feature limitations', 'VM networking modes', 'Snapshots, restore points, backups, evidence hygiene']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000000003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000100',
    'm00-l3-cyberpatriot',
    'Module 00 - Lesson 3: CyberPatriot — Windows Basics video',
    'Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 00 — Home Lab Setup, Ethics, and Learning Workflow. Follow in your isolated lab environment.',
    '8AtEe3bOqus',
    35,
    3,
    ARRAY['Understand Windows editions, safe virtualization, snapshots, and VM resource budgets.', 'Create a Windows 11 client VM and record an initial baseline.', 'Explain why real networks and devices must not be tested without permission.']::TEXT[],
    ARRAY['windows-security', 'module-00', 'foundation']::TEXT[],
    ARRAY['Host vs guest OS; CPU virtualization; virtual TPM and Secure Boot', 'Windows 11 editions and feature limitations', 'VM networking modes', 'Snapshots, restore points, backups, evidence hygiene']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000010001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000101',
    'm01-l1-cyberpatriot',
    'Module 01 - Lesson 1: CyberPatriot — Windows Basics video',
    'Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 01 — Windows Architecture and Security Foundations. Follow in your isolated lab environment.',
    '8AtEe3bOqus',
    35,
    1,
    ARRAY['Navigate Windows administrative consoles confidently.', 'Describe local system architecture, user space, kernel, tokens and core security boundaries.', 'Identify security-related administrative tools on Windows 11.']::TEXT[],
    ARRAY['windows-security', 'module-01', 'beginner']::TEXT[],
    ARRAY['Windows processes, services, drivers and registry high-level concepts', 'NTFS, partitions, boot chain, UEFI, TPM, Secure Boot', 'Task Manager, Computer Management, Services, Settings and Control Panel', 'Windows Security app vs Microsoft Defender Antivirus vs enterprise Defender for Endpoint']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000010002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000101',
    'm01-l2-cyberpatriot',
    'Module 01 - Lesson 2: CyberPatriot — Windows Security Tools',
    'Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 01 — Windows Architecture and Security Foundations. Follow in your isolated lab environment.',
    'C_RTcErv3gU',
    35,
    2,
    ARRAY['Navigate Windows administrative consoles confidently.', 'Describe local system architecture, user space, kernel, tokens and core security boundaries.', 'Identify security-related administrative tools on Windows 11.']::TEXT[],
    ARRAY['windows-security', 'module-01', 'beginner']::TEXT[],
    ARRAY['Windows processes, services, drivers and registry high-level concepts', 'NTFS, partitions, boot chain, UEFI, TPM, Secure Boot', 'Task Manager, Computer Management, Services, Settings and Control Panel', 'Windows Security app vs Microsoft Defender Antivirus vs enterprise Defender for Endpoint']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000010003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000101',
    'm01-l3-cyberpatriot',
    'Module 01 - Lesson 3: CyberPatriot — Windows Security Configuration',
    'Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 01 — Windows Architecture and Security Foundations. Follow in your isolated lab environment.',
    'Vvv4LaCAJWQ',
    35,
    3,
    ARRAY['Navigate Windows administrative consoles confidently.', 'Describe local system architecture, user space, kernel, tokens and core security boundaries.', 'Identify security-related administrative tools on Windows 11.']::TEXT[],
    ARRAY['windows-security', 'module-01', 'beginner']::TEXT[],
    ARRAY['Windows processes, services, drivers and registry high-level concepts', 'NTFS, partitions, boot chain, UEFI, TPM, Secure Boot', 'Task Manager, Computer Management, Services, Settings and Control Panel', 'Windows Security app vs Microsoft Defender Antivirus vs enterprise Defender for Endpoint']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000020001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000102',
    'm02-l1-powershell-full-course',
    'Module 02 - Lesson 1: PowerShell Full Course — Beginner to scripting (5 hours)',
    'Hands-on Windows security video lesson presented by freeCodeCamp. Covers critical concepts from Module 02 — Windows CMD and PowerShell Essentials. Follow in your isolated lab environment.',
    'ueKFupiT2wA',
    35,
    1,
    ARRAY['Navigate Windows with Command Prompt and PowerShell.', 'Use safe read-only inventory cmdlets.', 'Export structured output to CSV without modifying system security settings.']::TEXT[],
    ARRAY['windows-security', 'module-02', 'beginner']::TEXT[],
    ARRAY['CMD vs Windows PowerShell 5.1 vs modern PowerShell 7', 'Objects, properties, cmdlets, `Get-Help`, `Get-Command`, pipelines', 'Paths, quotes, filesystem and environment variables', '`whoami /all`, `systeminfo`, `Get-Process`, `Get-Service`, `Get-ComputerInfo`']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000020002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000102',
    'm02-l2-cyberpatriot',
    'Module 02 - Lesson 2: CyberPatriot — Windows Basics video',
    'Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 02 — Windows CMD and PowerShell Essentials. Follow in your isolated lab environment.',
    '8AtEe3bOqus',
    35,
    2,
    ARRAY['Navigate Windows with Command Prompt and PowerShell.', 'Use safe read-only inventory cmdlets.', 'Export structured output to CSV without modifying system security settings.']::TEXT[],
    ARRAY['windows-security', 'module-02', 'beginner']::TEXT[],
    ARRAY['CMD vs Windows PowerShell 5.1 vs modern PowerShell 7', 'Objects, properties, cmdlets, `Get-Help`, `Get-Command`, pipelines', 'Paths, quotes, filesystem and environment variables', '`whoami /all`, `systeminfo`, `Get-Process`, `Get-Service`, `Get-ComputerInfo`']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000030001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000103',
    'm03-l1-cyberpatriot',
    'Module 03 - Lesson 1: CyberPatriot — Windows Security Configuration',
    'Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 03 — Windows Identity, UAC, and NTFS Permissions. Follow in your isolated lab environment.',
    'Vvv4LaCAJWQ',
    35,
    1,
    ARRAY['Explain local accounts, groups, SIDs, logon sessions and tokens.', 'Read NTFS permissions and understand access inheritance.', 'Practice least privilege and UAC safely with an expendable local user.']::TEXT[],
    ARRAY['windows-security', 'module-03', 'beginner']::TEXT[],
    ARRAY['Local accounts and local groups, SIDs and group membership', 'Authentication vs authorization; access tokens and privileges', 'User Account Control and elevation prompts', 'NTFS permissions, ownership, inheritance vs sharing permissions']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000030002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000103',
    'm03-l2-cyberpatriot',
    'Module 03 - Lesson 2: CyberPatriot — Windows Security Tools',
    'Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 03 — Windows Identity, UAC, and NTFS Permissions. Follow in your isolated lab environment.',
    'C_RTcErv3gU',
    35,
    2,
    ARRAY['Explain local accounts, groups, SIDs, logon sessions and tokens.', 'Read NTFS permissions and understand access inheritance.', 'Practice least privilege and UAC safely with an expendable local user.']::TEXT[],
    ARRAY['windows-security', 'module-03', 'beginner']::TEXT[],
    ARRAY['Local accounts and local groups, SIDs and group membership', 'Authentication vs authorization; access tokens and privileges', 'User Account Control and elevation prompts', 'NTFS permissions, ownership, inheritance vs sharing permissions']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000030003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000103',
    'm03-l3-powershell-full-course',
    'Module 03 - Lesson 3: PowerShell Full Course — Beginner to scripting (5 hours)',
    'Hands-on Windows security video lesson presented by freeCodeCamp. Covers critical concepts from Module 03 — Windows Identity, UAC, and NTFS Permissions. Follow in your isolated lab environment.',
    'ueKFupiT2wA',
    35,
    3,
    ARRAY['Explain local accounts, groups, SIDs, logon sessions and tokens.', 'Read NTFS permissions and understand access inheritance.', 'Practice least privilege and UAC safely with an expendable local user.']::TEXT[],
    ARRAY['windows-security', 'module-03', 'beginner']::TEXT[],
    ARRAY['Local accounts and local groups, SIDs and group membership', 'Authentication vs authorization; access tokens and privileges', 'User Account Control and elevation prompts', 'NTFS permissions, ownership, inheritance vs sharing permissions']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000040001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000104',
    'm04-l1-powershell-full-course',
    'Module 04 - Lesson 1: PowerShell Full Course — Beginner to scripting (5 hours)',
    'Hands-on Windows security video lesson presented by freeCodeCamp. Covers critical concepts from Module 04 — Processes, Services, Registry, Startup and Persistence. Follow in your isolated lab environment.',
    'ueKFupiT2wA',
    35,
    1,
    ARRAY['Distinguish expected services and auto-start entries from suspicious changes.', 'Inventory tasks, startup entries and relevant registry keys without editing unrelated items.', 'Correlate processes with users and executable locations.']::TEXT[],
    ARRAY['windows-security', 'module-04', 'intermediate']::TEXT[],
    ARRAY['Parent-child process chains and common Windows processes', 'Services, scheduled tasks, startup apps and Run keys', 'Registry hives HKLM/HKCU and safe backups', 'Digital signatures, hashes, file paths and startup persistence']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000040002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000104',
    'm04-l2-trustedsec-sysmon-6',
    'Module 04 - Lesson 2: TrustedSec Sysmon 6 — Process tracking',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 04 — Processes, Services, Registry, Startup and Persistence. Follow in your isolated lab environment.',
    '46-alN2_vlo',
    35,
    2,
    ARRAY['Distinguish expected services and auto-start entries from suspicious changes.', 'Inventory tasks, startup entries and relevant registry keys without editing unrelated items.', 'Correlate processes with users and executable locations.']::TEXT[],
    ARRAY['windows-security', 'module-04', 'intermediate']::TEXT[],
    ARRAY['Parent-child process chains and common Windows processes', 'Services, scheduled tasks, startup apps and Run keys', 'Registry hives HKLM/HKCU and safe backups', 'Digital signatures, hashes, file paths and startup persistence']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000040003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000104',
    'm04-l3-trustedsec-sysmon-22',
    'Module 04 - Lesson 3: TrustedSec Sysmon 22 — Registry actions',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 04 — Processes, Services, Registry, Startup and Persistence. Follow in your isolated lab environment.',
    'hy5s1pnaO2I',
    35,
    3,
    ARRAY['Distinguish expected services and auto-start entries from suspicious changes.', 'Inventory tasks, startup entries and relevant registry keys without editing unrelated items.', 'Correlate processes with users and executable locations.']::TEXT[],
    ARRAY['windows-security', 'module-04', 'intermediate']::TEXT[],
    ARRAY['Parent-child process chains and common Windows processes', 'Services, scheduled tasks, startup apps and Run keys', 'Registry hives HKLM/HKCU and safe backups', 'Digital signatures, hashes, file paths and startup persistence']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000050001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000105',
    'm05-l1-windows-defender-firewall-inbound-outbound-rules-tutorial',
    'Module 05 - Lesson 1: Windows Defender Firewall inbound/outbound rules tutorial',
    'Hands-on Windows security video lesson presented by Kevin Stratvert. Covers critical concepts from Module 05 — Windows Networking, SMB, RDP and Firewall Security. Follow in your isolated lab environment.',
    '5NwbGcqKTQI',
    35,
    1,
    ARRAY['Understand Windows-specific network connections and profiles.', 'Read local TCP connections, name resolution and firewall rules.', 'Explain SMB and RDP hardening without attacking any public system.']::TEXT[],
    ARRAY['windows-security', 'module-05', 'intermediate']::TEXT[],
    ARRAY['Windows network profiles, DNS client, IP config, routes', '`ipconfig`, `Get-NetIPAddress`, `Get-NetTCPConnection`, `Test-NetConnection`', 'Firewall', 'RDP, Windows Remote Management (WinRM) and SMB threat surfaces']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000050002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000105',
    'm05-l2-cyberpatriot',
    'Module 05 - Lesson 2: CyberPatriot — Windows Security Tools',
    'Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 05 — Windows Networking, SMB, RDP and Firewall Security. Follow in your isolated lab environment.',
    'C_RTcErv3gU',
    35,
    2,
    ARRAY['Understand Windows-specific network connections and profiles.', 'Read local TCP connections, name resolution and firewall rules.', 'Explain SMB and RDP hardening without attacking any public system.']::TEXT[],
    ARRAY['windows-security', 'module-05', 'intermediate']::TEXT[],
    ARRAY['Windows network profiles, DNS client, IP config, routes', '`ipconfig`, `Get-NetIPAddress`, `Get-NetTCPConnection`, `Test-NetConnection`', 'Firewall', 'RDP, Windows Remote Management (WinRM) and SMB threat surfaces']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000050003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000105',
    'm05-l3-trustedsec-sysmon-8',
    'Module 05 - Lesson 3: TrustedSec Sysmon 8 — Network connections',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 05 — Windows Networking, SMB, RDP and Firewall Security. Follow in your isolated lab environment.',
    'y4cpuliY4dk',
    35,
    3,
    ARRAY['Understand Windows-specific network connections and profiles.', 'Read local TCP connections, name resolution and firewall rules.', 'Explain SMB and RDP hardening without attacking any public system.']::TEXT[],
    ARRAY['windows-security', 'module-05', 'intermediate']::TEXT[],
    ARRAY['Windows network profiles, DNS client, IP config, routes', '`ipconfig`, `Get-NetIPAddress`, `Get-NetTCPConnection`, `Test-NetConnection`', 'Firewall', 'RDP, Windows Remote Management (WinRM) and SMB threat surfaces']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000060001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000106',
    'm06-l1-microsoft-defender-antivirus-windows-10-11-setup',
    'Module 06 - Lesson 1: Microsoft Defender Antivirus Windows 10/11 setup',
    'Hands-on Windows security video lesson presented by Windows Security Guides. Covers critical concepts from Module 06 — Windows Defender, SmartScreen, BitLocker and Endpoint Protection. Follow in your isolated lab environment.',
    'HOvRXmkW-J8',
    35,
    1,
    ARRAY['Interpret Microsoft Defender protection and detection status.', 'Differentiate endpoint AV and enterprise EDR.', 'Explain Windows encryption and safe recovery-key handling.']::TEXT[],
    ARRAY['windows-security', 'module-06', 'intermediate']::TEXT[],
    ARRAY['Microsoft Defender Antivirus protection states and scans', 'Protection history, security intelligence, exclusions and safe defaults', 'SmartScreen, reputation-based protection, ASR concept', 'BitLocker vs Device Encryption and TPM']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000060002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000106',
    'm06-l2-windows-11-bitlocker-and-recovery-key-precautions',
    'Module 06 - Lesson 2: Windows 11 BitLocker and recovery-key precautions',
    'Hands-on Windows security video lesson presented by Britec09. Covers critical concepts from Module 06 — Windows Defender, SmartScreen, BitLocker and Endpoint Protection. Follow in your isolated lab environment.',
    '3ODr_uFHD6M',
    35,
    2,
    ARRAY['Interpret Microsoft Defender protection and detection status.', 'Differentiate endpoint AV and enterprise EDR.', 'Explain Windows encryption and safe recovery-key handling.']::TEXT[],
    ARRAY['windows-security', 'module-06', 'intermediate']::TEXT[],
    ARRAY['Microsoft Defender Antivirus protection states and scans', 'Protection history, security intelligence, exclusions and safe defaults', 'SmartScreen, reputation-based protection, ASR concept', 'BitLocker vs Device Encryption and TPM']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000060003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000106',
    'm06-l3-cyberpatriot',
    'Module 06 - Lesson 3: CyberPatriot — Windows Security Tools',
    'Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 06 — Windows Defender, SmartScreen, BitLocker and Endpoint Protection. Follow in your isolated lab environment.',
    'C_RTcErv3gU',
    35,
    3,
    ARRAY['Interpret Microsoft Defender protection and detection status.', 'Differentiate endpoint AV and enterprise EDR.', 'Explain Windows encryption and safe recovery-key handling.']::TEXT[],
    ARRAY['windows-security', 'module-06', 'intermediate']::TEXT[],
    ARRAY['Microsoft Defender Antivirus protection states and scans', 'Protection history, security intelligence, exclusions and safe defaults', 'SmartScreen, reputation-based protection, ASR concept', 'BitLocker vs Device Encryption and TPM']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000070001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000107',
    'm07-l1-windows-logging-for-soc-analysts',
    'Module 07 - Lesson 1: Windows logging for SOC Analysts — Windows/Sysmon/PowerShell',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 07 — Windows Event Viewer, Audit Policy and SOC Event IDs. Follow in your isolated lab environment.',
    'svxqs_yvJIk',
    35,
    1,
    ARRAY['Navigate Security, System, Application and operational event channels.', 'Interpret common authentication, account and process-creation events.', 'Enable appropriate auditing inside a lab and export relevant EVTX evidence.']::TEXT[],
    ARRAY['windows-security', 'module-07', 'intermediate']::TEXT[],
    ARRAY['EVTX channels, Event Viewer filters, XML event fields', '4624 successful logon, 4625 failed logon, 4634 logoff, 4672 special privileges', '4688 process creation when auditing is configured', '4720 account created, 4728/4732 membership changes where applicable']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000070002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000107',
    'm07-l2-windows-event-logs-explained',
    'Module 07 - Lesson 2: Windows Event Logs explained — SOC analyst walkthrough',
    'Hands-on Windows security video lesson presented by Gerald Auger / Simply Cyber. Covers critical concepts from Module 07 — Windows Event Viewer, Audit Policy and SOC Event IDs. Follow in your isolated lab environment.',
    'gRbG-8mQce0',
    35,
    2,
    ARRAY['Navigate Security, System, Application and operational event channels.', 'Interpret common authentication, account and process-creation events.', 'Enable appropriate auditing inside a lab and export relevant EVTX evidence.']::TEXT[],
    ARRAY['windows-security', 'module-07', 'intermediate']::TEXT[],
    ARRAY['EVTX channels, Event Viewer filters, XML event fields', '4624 successful logon, 4625 failed logon, 4634 logoff, 4672 special privileges', '4688 process creation when auditing is configured', '4720 account created, 4728/4732 membership changes where applicable']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000070003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000107',
    'm07-l3-cyberpatriot',
    'Module 07 - Lesson 3: CyberPatriot — Windows Security Configuration',
    'Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 07 — Windows Event Viewer, Audit Policy and SOC Event IDs. Follow in your isolated lab environment.',
    'Vvv4LaCAJWQ',
    35,
    3,
    ARRAY['Navigate Security, System, Application and operational event channels.', 'Interpret common authentication, account and process-creation events.', 'Enable appropriate auditing inside a lab and export relevant EVTX evidence.']::TEXT[],
    ARRAY['windows-security', 'module-07', 'intermediate']::TEXT[],
    ARRAY['EVTX channels, Event Viewer filters, XML event fields', '4624 successful logon, 4625 failed logon, 4634 logoff, 4672 special privileges', '4688 process creation when auditing is configured', '4720 account created, 4728/4732 membership changes where applicable']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000080001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000108',
    'm08-l1-trustedsec-sysmon-1',
    'Module 08 - Lesson 1: TrustedSec Sysmon 1 — What is Sysmon?',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 08 — Sysmon Installation, Configuration and Security Telemetry. Follow in your isolated lab environment.',
    'kESndPO5Fig',
    35,
    1,
    ARRAY['Explain native Windows auditing vs Sysmon telemetry.', 'Install/configure Sysmon using an approach supported by your OS version.', 'Analyze Sysmon process and network events from safe activities.']::TEXT[],
    ARRAY['windows-security', 'module-08', 'intermediate']::TEXT[],
    ARRAY['Sysmon 1 process creation, 3 network connections (configuration-dependent)', 'DNS, registry and file operation telemetry', 'Sysmon XML configurations, exclusions and event noise', 'Operational channel']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000080002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000108',
    'm08-l2-trustedsec-sysmon-2',
    'Module 08 - Lesson 2: TrustedSec Sysmon 2 — Installation',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 08 — Sysmon Installation, Configuration and Security Telemetry. Follow in your isolated lab environment.',
    'MlGc44dfFBg',
    35,
    2,
    ARRAY['Explain native Windows auditing vs Sysmon telemetry.', 'Install/configure Sysmon using an approach supported by your OS version.', 'Analyze Sysmon process and network events from safe activities.']::TEXT[],
    ARRAY['windows-security', 'module-08', 'intermediate']::TEXT[],
    ARRAY['Sysmon 1 process creation, 3 network connections (configuration-dependent)', 'DNS, registry and file operation telemetry', 'Sysmon XML configurations, exclusions and event noise', 'Operational channel']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000080003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000108',
    'm08-l3-trustedsec-sysmon-4',
    'Module 08 - Lesson 3: TrustedSec Sysmon 4 — Configuration file',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 08 — Sysmon Installation, Configuration and Security Telemetry. Follow in your isolated lab environment.',
    'VKVSedPGDgY',
    35,
    3,
    ARRAY['Explain native Windows auditing vs Sysmon telemetry.', 'Install/configure Sysmon using an approach supported by your OS version.', 'Analyze Sysmon process and network events from safe activities.']::TEXT[],
    ARRAY['windows-security', 'module-08', 'intermediate']::TEXT[],
    ARRAY['Sysmon 1 process creation, 3 network connections (configuration-dependent)', 'DNS, registry and file operation telemetry', 'Sysmon XML configurations, exclusions and event noise', 'Operational channel']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000080004',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000108',
    'm08-l4-trustedsec-sysmon-5',
    'Module 08 - Lesson 4: TrustedSec Sysmon 5 — Rule/filter order',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 08 — Sysmon Installation, Configuration and Security Telemetry. Follow in your isolated lab environment.',
    'KBsEAaZFcyI',
    35,
    4,
    ARRAY['Explain native Windows auditing vs Sysmon telemetry.', 'Install/configure Sysmon using an approach supported by your OS version.', 'Analyze Sysmon process and network events from safe activities.']::TEXT[],
    ARRAY['windows-security', 'module-08', 'intermediate']::TEXT[],
    ARRAY['Sysmon 1 process creation, 3 network connections (configuration-dependent)', 'DNS, registry and file operation telemetry', 'Sysmon XML configurations, exclusions and event noise', 'Operational channel']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000080005',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000108',
    'm08-l5-trustedsec-sysmon-6',
    'Module 08 - Lesson 5: TrustedSec Sysmon 6 — Process tracking',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 08 — Sysmon Installation, Configuration and Security Telemetry. Follow in your isolated lab environment.',
    '46-alN2_vlo',
    35,
    5,
    ARRAY['Explain native Windows auditing vs Sysmon telemetry.', 'Install/configure Sysmon using an approach supported by your OS version.', 'Analyze Sysmon process and network events from safe activities.']::TEXT[],
    ARRAY['windows-security', 'module-08', 'intermediate']::TEXT[],
    ARRAY['Sysmon 1 process creation, 3 network connections (configuration-dependent)', 'DNS, registry and file operation telemetry', 'Sysmon XML configurations, exclusions and event noise', 'Operational channel']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000080006',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000108',
    'm08-l6-trustedsec-sysmon-8',
    'Module 08 - Lesson 6: TrustedSec Sysmon 8 — Network connections',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 08 — Sysmon Installation, Configuration and Security Telemetry. Follow in your isolated lab environment.',
    'y4cpuliY4dk',
    35,
    6,
    ARRAY['Explain native Windows auditing vs Sysmon telemetry.', 'Install/configure Sysmon using an approach supported by your OS version.', 'Analyze Sysmon process and network events from safe activities.']::TEXT[],
    ARRAY['windows-security', 'module-08', 'intermediate']::TEXT[],
    ARRAY['Sysmon 1 process creation, 3 network connections (configuration-dependent)', 'DNS, registry and file operation telemetry', 'Sysmon XML configurations, exclusions and event noise', 'Operational channel']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000090001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000109',
    'm09-l1-powershell-full-course',
    'Module 09 - Lesson 1: PowerShell Full Course — Beginner to scripting (5 hours)',
    'Hands-on Windows security video lesson presented by freeCodeCamp. Covers critical concepts from Module 09 — PowerShell Security, Safe Automation and Script Logging. Follow in your isolated lab environment.',
    'ueKFupiT2wA',
    35,
    1,
    ARRAY['Build read-only Windows inventory scripts for the SOC.', 'Understand script-block logging, module logging, AMSI and remoting safeguards.', 'Recognize suspicious PowerShell execution patterns from logs without reproducing payloads.']::TEXT[],
    ARRAY['windows-security', 'module-09', 'intermediate']::TEXT[],
    ARRAY['PowerShell objects, functions, exceptions and constrained output', 'Security Event 4688, PowerShell Operational 4104 if configured', 'Script Block Logging, module logging and event collection privacy', 'AMSI protection overview and code signing concepts']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000090002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000109',
    'm09-l2-windows-logging-for-soc-analysts',
    'Module 09 - Lesson 2: Windows logging for SOC Analysts — Windows/Sysmon/PowerShell',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 09 — PowerShell Security, Safe Automation and Script Logging. Follow in your isolated lab environment.',
    'svxqs_yvJIk',
    35,
    2,
    ARRAY['Build read-only Windows inventory scripts for the SOC.', 'Understand script-block logging, module logging, AMSI and remoting safeguards.', 'Recognize suspicious PowerShell execution patterns from logs without reproducing payloads.']::TEXT[],
    ARRAY['windows-security', 'module-09', 'intermediate']::TEXT[],
    ARRAY['PowerShell objects, functions, exceptions and constrained output', 'Security Event 4688, PowerShell Operational 4104 if configured', 'Script Block Logging, module logging and event collection privacy', 'AMSI protection overview and code signing concepts']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000090003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000109',
    'm09-l3-trustedsec-sysmon-6',
    'Module 09 - Lesson 3: TrustedSec Sysmon 6 — Process tracking',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 09 — PowerShell Security, Safe Automation and Script Logging. Follow in your isolated lab environment.',
    '46-alN2_vlo',
    35,
    3,
    ARRAY['Build read-only Windows inventory scripts for the SOC.', 'Understand script-block logging, module logging, AMSI and remoting safeguards.', 'Recognize suspicious PowerShell execution patterns from logs without reproducing payloads.']::TEXT[],
    ARRAY['windows-security', 'module-09', 'intermediate']::TEXT[],
    ARRAY['PowerShell objects, functions, exceptions and constrained output', 'Security Event 4688, PowerShell Operational 4104 if configured', 'Script Block Logging, module logging and event collection privacy', 'AMSI protection overview and code signing concepts']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000100001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000110',
    'm10-l1-windows-server-2025',
    'Module 10 - Lesson 1: Windows Server 2025 — AD, DNS, domain join walkthrough',
    'Hands-on Windows security video lesson presented by Travis Roberts. Covers critical concepts from Module 10 — Windows Server 2025 and Active Directory Lab Fundamentals. Follow in your isolated lab environment.',
    'Gt12Q1jB1s8',
    35,
    1,
    ARRAY['Explain the domain controller, AD DS, OU, group and DNS relationship.', 'Create a private lab domain using legitimate Windows Server evaluation software.', 'Join a Windows client to a training domain when edition supports it.']::TEXT[],
    ARRAY['windows-security', 'module-10', 'intermediate']::TEXT[],
    ARRAY['Windows Server evaluation, roles and services', 'Active Directory Domain Services and domain controller responsibilities', 'Forests, domains, OUs, users, computer objects and groups', 'DNS requirements, domain join, domain vs local accounts']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000100002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000110',
    'm10-l2-install-active-directory-on-windows-server-2025',
    'Module 10 - Lesson 2: Install Active Directory on Windows Server 2025',
    'Hands-on Windows security video lesson presented by Travis Roberts. Covers critical concepts from Module 10 — Windows Server 2025 and Active Directory Lab Fundamentals. Follow in your isolated lab environment.',
    'TYfswI9phv0',
    35,
    2,
    ARRAY['Explain the domain controller, AD DS, OU, group and DNS relationship.', 'Create a private lab domain using legitimate Windows Server evaluation software.', 'Join a Windows client to a training domain when edition supports it.']::TEXT[],
    ARRAY['windows-security', 'module-10', 'intermediate']::TEXT[],
    ARRAY['Windows Server evaluation, roles and services', 'Active Directory Domain Services and domain controller responsibilities', 'Forests, domains, OUs, users, computer objects and groups', 'DNS requirements, domain join, domain vs local accounts']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000100003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000110',
    'm10-l3-windows-server-2025',
    'Module 10 - Lesson 3: Windows Server 2025 — Group Policy fundamentals',
    'Hands-on Windows security video lesson presented by Travis Roberts. Covers critical concepts from Module 10 — Windows Server 2025 and Active Directory Lab Fundamentals. Follow in your isolated lab environment.',
    '4m3RnIfkZQ4',
    35,
    3,
    ARRAY['Explain the domain controller, AD DS, OU, group and DNS relationship.', 'Create a private lab domain using legitimate Windows Server evaluation software.', 'Join a Windows client to a training domain when edition supports it.']::TEXT[],
    ARRAY['windows-security', 'module-10', 'intermediate']::TEXT[],
    ARRAY['Windows Server evaluation, roles and services', 'Active Directory Domain Services and domain controller responsibilities', 'Forests, domains, OUs, users, computer objects and groups', 'DNS requirements, domain join, domain vs local accounts']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000110001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000111',
    'm11-l1-windows-server-2025',
    'Module 11 - Lesson 1: Windows Server 2025 — Group Policy fundamentals',
    'Hands-on Windows security video lesson presented by Travis Roberts. Covers critical concepts from Module 11 — Active Directory, Kerberos and Group Policy Security. Follow in your isolated lab environment.',
    '4m3RnIfkZQ4',
    35,
    1,
    ARRAY['Understand common AD misconfigurations from a defender standpoint.', 'Review Group Policy security settings and Windows authentication events.', 'Configure least-privilege policies on non-production lab OUs.']::TEXT[],
    ARRAY['windows-security', 'module-11', 'advanced']::TEXT[],
    ARRAY['Kerberos TGT/TGS concepts, NTLM fallback and lockout policy', 'GPO precedence', 'Password/lockout policy, privileged groups, delegation', '4768/4769/4771 ticket activity (on DCs when auditing configured)']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000110002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000111',
    'm11-l2-create-a-gpo-in-active-directory',
    'Module 11 - Lesson 2: Create a GPO in Active Directory — hands-on',
    'Hands-on Windows security video lesson presented by ITProTV / ACI Learning. Covers critical concepts from Module 11 — Active Directory, Kerberos and Group Policy Security. Follow in your isolated lab environment.',
    'nNerx5ZcU58',
    35,
    2,
    ARRAY['Understand common AD misconfigurations from a defender standpoint.', 'Review Group Policy security settings and Windows authentication events.', 'Configure least-privilege policies on non-production lab OUs.']::TEXT[],
    ARRAY['windows-security', 'module-11', 'advanced']::TEXT[],
    ARRAY['Kerberos TGT/TGS concepts, NTLM fallback and lockout policy', 'GPO precedence', 'Password/lockout policy, privileged groups, delegation', '4768/4769/4771 ticket activity (on DCs when auditing configured)']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000110003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000111',
    'm11-l3-windows-logging-for-soc-analysts',
    'Module 11 - Lesson 3: Windows logging for SOC Analysts — Windows/Sysmon/PowerShell',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 11 — Active Directory, Kerberos and Group Policy Security. Follow in your isolated lab environment.',
    'svxqs_yvJIk',
    35,
    3,
    ARRAY['Understand common AD misconfigurations from a defender standpoint.', 'Review Group Policy security settings and Windows authentication events.', 'Configure least-privilege policies on non-production lab OUs.']::TEXT[],
    ARRAY['windows-security', 'module-11', 'advanced']::TEXT[],
    ARRAY['Kerberos TGT/TGS concepts, NTLM fallback and lockout policy', 'GPO precedence', 'Password/lockout policy, privileged groups, delegation', '4768/4769/4771 ticket activity (on DCs when auditing configured)']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000120001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000112',
    'm12-l1-cyberpatriot',
    'Module 12 - Lesson 1: CyberPatriot — Windows Security Configuration',
    'Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 12 — Windows Hardening, Baselines, LAPS and Application Control. Follow in your isolated lab environment.',
    'Vvv4LaCAJWQ',
    35,
    1,
    ARRAY['Conduct before/after configuration reviews against Microsoft baselines.', 'Explain AppLocker vs App Control for Business and audit modes.', 'Prioritize hardening changes with reversibility and business impact.']::TEXT[],
    ARRAY['windows-security', 'module-12', 'advanced']::TEXT[],
    ARRAY['Windows Security Baselines and security configuration templates', 'Microsoft Security Compliance Toolkit, Policy Analyzer, LGPO', 'Windows LAPS concept and privileged local accounts', 'AppLocker/App Control for Business and audit vs enforcement']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000120002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000112',
    'm12-l2-cyberpatriot',
    'Module 12 - Lesson 2: CyberPatriot — Windows Security Tools',
    'Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 12 — Windows Hardening, Baselines, LAPS and Application Control. Follow in your isolated lab environment.',
    'C_RTcErv3gU',
    35,
    2,
    ARRAY['Conduct before/after configuration reviews against Microsoft baselines.', 'Explain AppLocker vs App Control for Business and audit modes.', 'Prioritize hardening changes with reversibility and business impact.']::TEXT[],
    ARRAY['windows-security', 'module-12', 'advanced']::TEXT[],
    ARRAY['Windows Security Baselines and security configuration templates', 'Microsoft Security Compliance Toolkit, Policy Analyzer, LGPO', 'Windows LAPS concept and privileged local accounts', 'AppLocker/App Control for Business and audit vs enforcement']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000120003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000112',
    'm12-l3-windows-server-2025',
    'Module 12 - Lesson 3: Windows Server 2025 — Group Policy fundamentals',
    'Hands-on Windows security video lesson presented by Travis Roberts. Covers critical concepts from Module 12 — Windows Hardening, Baselines, LAPS and Application Control. Follow in your isolated lab environment.',
    '4m3RnIfkZQ4',
    35,
    3,
    ARRAY['Conduct before/after configuration reviews against Microsoft baselines.', 'Explain AppLocker vs App Control for Business and audit modes.', 'Prioritize hardening changes with reversibility and business impact.']::TEXT[],
    ARRAY['windows-security', 'module-12', 'advanced']::TEXT[],
    ARRAY['Windows Security Baselines and security configuration templates', 'Microsoft Security Compliance Toolkit, Policy Analyzer, LGPO', 'Windows LAPS concept and privileged local accounts', 'AppLocker/App Control for Business and audit vs enforcement']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000130001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000113',
    'm13-l1-13cubed',
    'Module 13 - Lesson 1: 13Cubed — Introduction to Windows Forensics',
    'Hands-on Windows security video lesson presented by 13Cubed. Covers critical concepts from Module 13 — Sysinternals Process Explorer, Autoruns and Threat Hunting. Follow in your isolated lab environment.',
    'VYROU-ZwZX8',
    35,
    1,
    ARRAY['Use Sysinternals to investigate suspicious Windows behaviors safely.', 'Identify process ancestry, signature and auto-start evidence.', 'Correlate current state with Windows/Sysmon historical telemetry.']::TEXT[],
    ARRAY['windows-security', 'module-13', 'advanced']::TEXT[],
    ARRAY['Process Explorer vs Task Manager; handles, image paths, signatures', 'Autoruns as an auto-start baseline and triage tool', 'Process Monitor as high-volume evidence, filtering and capture caution', 'Hashes and publisher signatures; false positive caveats']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000130002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000113',
    'm13-l2-trustedsec-sysmon-6',
    'Module 13 - Lesson 2: TrustedSec Sysmon 6 — Process tracking',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 13 — Sysinternals Process Explorer, Autoruns and Threat Hunting. Follow in your isolated lab environment.',
    '46-alN2_vlo',
    35,
    2,
    ARRAY['Use Sysinternals to investigate suspicious Windows behaviors safely.', 'Identify process ancestry, signature and auto-start evidence.', 'Correlate current state with Windows/Sysmon historical telemetry.']::TEXT[],
    ARRAY['windows-security', 'module-13', 'advanced']::TEXT[],
    ARRAY['Process Explorer vs Task Manager; handles, image paths, signatures', 'Autoruns as an auto-start baseline and triage tool', 'Process Monitor as high-volume evidence, filtering and capture caution', 'Hashes and publisher signatures; false positive caveats']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000130003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000113',
    'm13-l3-trustedsec-sysmon-10',
    'Module 13 - Lesson 3: TrustedSec Sysmon 10 — Process access signals',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 13 — Sysinternals Process Explorer, Autoruns and Threat Hunting. Follow in your isolated lab environment.',
    '51YRHDl93f4',
    35,
    3,
    ARRAY['Use Sysinternals to investigate suspicious Windows behaviors safely.', 'Identify process ancestry, signature and auto-start evidence.', 'Correlate current state with Windows/Sysmon historical telemetry.']::TEXT[],
    ARRAY['windows-security', 'module-13', 'advanced']::TEXT[],
    ARRAY['Process Explorer vs Task Manager; handles, image paths, signatures', 'Autoruns as an auto-start baseline and triage tool', 'Process Monitor as high-volume evidence, filtering and capture caution', 'Hashes and publisher signatures; false positive caveats']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000130004',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000113',
    'm13-l4-trustedsec-sysmon-22',
    'Module 13 - Lesson 4: TrustedSec Sysmon 22 — Registry actions',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 13 — Sysinternals Process Explorer, Autoruns and Threat Hunting. Follow in your isolated lab environment.',
    'hy5s1pnaO2I',
    35,
    4,
    ARRAY['Use Sysinternals to investigate suspicious Windows behaviors safely.', 'Identify process ancestry, signature and auto-start evidence.', 'Correlate current state with Windows/Sysmon historical telemetry.']::TEXT[],
    ARRAY['windows-security', 'module-13', 'advanced']::TEXT[],
    ARRAY['Process Explorer vs Task Manager; handles, image paths, signatures', 'Autoruns as an auto-start baseline and triage tool', 'Process Monitor as high-volume evidence, filtering and capture caution', 'Hashes and publisher signatures; false positive caveats']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000140001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000114',
    'm14-l1-13cubed',
    'Module 14 - Lesson 1: 13Cubed — Introduction to Windows Forensics',
    'Hands-on Windows security video lesson presented by 13Cubed. Covers critical concepts from Module 14 — Windows Forensics: Event Logs, Registry, Prefetch and NTFS. Follow in your isolated lab environment.',
    'VYROU-ZwZX8',
    35,
    1,
    ARRAY['Explain the forensic value and limits of common Windows artifacts.', 'Build a timeline from benign execution and login events.', 'Document collection methods without damaging evidence.']::TEXT[],
    ARRAY['windows-security', 'module-14', 'advanced']::TEXT[],
    ARRAY['EVTX logs and event timestamps/time zone considerations', 'Prefetch execution traces and feature limitations', 'NTUSER.DAT, UserAssist, ShellBags, Run keys', 'LNK files, Jump Lists, RecentDocs and file interactions']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000140002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000114',
    'm14-l2-13cubed',
    'Module 14 - Lesson 2: 13Cubed — NTFS MFT and Journal Forensics',
    'Hands-on Windows security video lesson presented by 13Cubed. Covers critical concepts from Module 14 — Windows Forensics: Event Logs, Registry, Prefetch and NTFS. Follow in your isolated lab environment.',
    '_qElVZJqlGY',
    35,
    2,
    ARRAY['Explain the forensic value and limits of common Windows artifacts.', 'Build a timeline from benign execution and login events.', 'Document collection methods without damaging evidence.']::TEXT[],
    ARRAY['windows-security', 'module-14', 'advanced']::TEXT[],
    ARRAY['EVTX logs and event timestamps/time zone considerations', 'Prefetch execution traces and feature limitations', 'NTUSER.DAT, UserAssist, ShellBags, Run keys', 'LNK files, Jump Lists, RecentDocs and file interactions']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000150001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000115',
    'm15-l1-windows-event-forwarding-and-windows-log-collection',
    'Module 15 - Lesson 1: Windows Event Forwarding and Windows log collection',
    'Hands-on Windows security video lesson presented by I.T Security Labs. Covers critical concepts from Module 15 — Windows Event Forwarding and SOC Detection Engineering. Follow in your isolated lab environment.',
    'kkzAILQc9LE',
    35,
    1,
    ARRAY['Understand how Windows Event Forwarding (WEF/WEC) centralizes Windows logs.', 'Design simple Windows event rules with false-positive checks.', 'Write readable analytic logic without requiring a paid cloud SIEM.']::TEXT[],
    ARRAY['windows-security', 'module-15', 'advanced']::TEXT[],
    ARRAY['WEF sources, collectors, ForwardedEvents and subscriptions', 'Source-initiated vs collector-initiated event subscriptions', 'Audit policy and event availability vs ingestion gaps', 'Rule logic']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000150002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000115',
    'm15-l2-windows-logging-for-soc-analysts',
    'Module 15 - Lesson 2: Windows logging for SOC Analysts — Windows/Sysmon/PowerShell',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 15 — Windows Event Forwarding and SOC Detection Engineering. Follow in your isolated lab environment.',
    'svxqs_yvJIk',
    35,
    2,
    ARRAY['Understand how Windows Event Forwarding (WEF/WEC) centralizes Windows logs.', 'Design simple Windows event rules with false-positive checks.', 'Write readable analytic logic without requiring a paid cloud SIEM.']::TEXT[],
    ARRAY['windows-security', 'module-15', 'advanced']::TEXT[],
    ARRAY['WEF sources, collectors, ForwardedEvents and subscriptions', 'Source-initiated vs collector-initiated event subscriptions', 'Audit policy and event availability vs ingestion gaps', 'Rule logic']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000150003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000115',
    'm15-l3-trustedsec-sysmon-14',
    'Module 15 - Lesson 3: TrustedSec Sysmon 14 — Prioritizing coverage',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 15 — Windows Event Forwarding and SOC Detection Engineering. Follow in your isolated lab environment.',
    '5AQ19x08wHI',
    35,
    3,
    ARRAY['Understand how Windows Event Forwarding (WEF/WEC) centralizes Windows logs.', 'Design simple Windows event rules with false-positive checks.', 'Write readable analytic logic without requiring a paid cloud SIEM.']::TEXT[],
    ARRAY['windows-security', 'module-15', 'advanced']::TEXT[],
    ARRAY['WEF sources, collectors, ForwardedEvents and subscriptions', 'Source-initiated vs collector-initiated event subscriptions', 'Audit policy and event availability vs ingestion gaps', 'Rule logic']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000150004',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000115',
    'm15-l4-trustedsec-sysmon-19',
    'Module 15 - Lesson 4: TrustedSec Sysmon 19 — DNS queries',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 15 — Windows Event Forwarding and SOC Detection Engineering. Follow in your isolated lab environment.',
    'uwyiGFjPYa8',
    35,
    4,
    ARRAY['Understand how Windows Event Forwarding (WEF/WEC) centralizes Windows logs.', 'Design simple Windows event rules with false-positive checks.', 'Write readable analytic logic without requiring a paid cloud SIEM.']::TEXT[],
    ARRAY['windows-security', 'module-15', 'advanced']::TEXT[],
    ARRAY['WEF sources, collectors, ForwardedEvents and subscriptions', 'Source-initiated vs collector-initiated event subscriptions', 'Audit policy and event availability vs ingestion gaps', 'Rule logic']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000160001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000116',
    'm16-l1-windows-logging-for-soc-analysts',
    'Module 16 - Lesson 1: Windows logging for SOC Analysts — Windows/Sysmon/PowerShell',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 16 — Windows Incident Response, Threat Scenarios and Triage. Follow in your isolated lab environment.',
    'svxqs_yvJIk',
    35,
    1,
    ARRAY['Triage Windows alerts using reproducible evidence and context.', 'Assess likely Windows attack techniques using MITRE ATT&CK as a vocabulary.', 'Produce an incident report with containment recommendations.']::TEXT[],
    ARRAY['windows-security', 'module-16', 'advanced']::TEXT[],
    ARRAY['Alert triage', 'Windows login abuse, suspicious PowerShell, anomalous new service/task', 'RDP/SMB lateral-movement risk indicators from defensive telemetry', 'Privilege-change and registry-persistence indicators']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000160002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000116',
    'm16-l2-trustedsec-sysmon-20',
    'Module 16 - Lesson 2: TrustedSec Sysmon 20 — WMI permanent events',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 16 — Windows Incident Response, Threat Scenarios and Triage. Follow in your isolated lab environment.',
    'UITVJ_AozQo',
    35,
    2,
    ARRAY['Triage Windows alerts using reproducible evidence and context.', 'Assess likely Windows attack techniques using MITRE ATT&CK as a vocabulary.', 'Produce an incident report with containment recommendations.']::TEXT[],
    ARRAY['windows-security', 'module-16', 'advanced']::TEXT[],
    ARRAY['Alert triage', 'Windows login abuse, suspicious PowerShell, anomalous new service/task', 'RDP/SMB lateral-movement risk indicators from defensive telemetry', 'Privilege-change and registry-persistence indicators']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000160003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000116',
    'm16-l3-trustedsec-sysmon-21',
    'Module 16 - Lesson 3: TrustedSec Sysmon 21 — Process tampering indicators',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 16 — Windows Incident Response, Threat Scenarios and Triage. Follow in your isolated lab environment.',
    'iAJMUNt8OcY',
    35,
    3,
    ARRAY['Triage Windows alerts using reproducible evidence and context.', 'Assess likely Windows attack techniques using MITRE ATT&CK as a vocabulary.', 'Produce an incident report with containment recommendations.']::TEXT[],
    ARRAY['windows-security', 'module-16', 'advanced']::TEXT[],
    ARRAY['Alert triage', 'Windows login abuse, suspicious PowerShell, anomalous new service/task', 'RDP/SMB lateral-movement risk indicators from defensive telemetry', 'Privilege-change and registry-persistence indicators']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000160004',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000116',
    'm16-l4-13cubed',
    'Module 16 - Lesson 4: 13Cubed — Introduction to Windows Forensics',
    'Hands-on Windows security video lesson presented by 13Cubed. Covers critical concepts from Module 16 — Windows Incident Response, Threat Scenarios and Triage. Follow in your isolated lab environment.',
    'VYROU-ZwZX8',
    35,
    4,
    ARRAY['Triage Windows alerts using reproducible evidence and context.', 'Assess likely Windows attack techniques using MITRE ATT&CK as a vocabulary.', 'Produce an incident report with containment recommendations.']::TEXT[],
    ARRAY['windows-security', 'module-16', 'advanced']::TEXT[],
    ARRAY['Alert triage', 'Windows login abuse, suspicious PowerShell, anomalous new service/task', 'RDP/SMB lateral-movement risk indicators from defensive telemetry', 'Privilege-change and registry-persistence indicators']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000170001',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000117',
    'm17-l1-windows-event-logs-explained',
    'Module 17 - Lesson 1: Windows Event Logs explained — SOC analyst walkthrough',
    'Hands-on Windows security video lesson presented by Gerald Auger / Simply Cyber. Covers critical concepts from Module 17 — Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow in your isolated lab environment.',
    'gRbG-8mQce0',
    35,
    1,
    ARRAY['Demonstrate end-to-end defensive analysis of a self-created Windows event story.', 'Deliver a public-safe GitHub portfolio report with no secrets or personal data.', 'Answer SOC L1 interview questions using evidence from your lab.']::TEXT[],
    ARRAY['windows-security', 'module-17', 'capstone']::TEXT[],
    ARRAY['Case design and statement of authorized lab scope', 'Windows baseline, test scenario and alert qualification', 'Windows Security + Sysmon + PowerShell log correlation', 'Incident timeline, user/host scoping and false-positive assessment']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000170002',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000117',
    'm17-l2-windows-logging-for-soc-analysts',
    'Module 17 - Lesson 2: Windows logging for SOC Analysts — Windows/Sysmon/PowerShell',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 17 — Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow in your isolated lab environment.',
    'svxqs_yvJIk',
    35,
    2,
    ARRAY['Demonstrate end-to-end defensive analysis of a self-created Windows event story.', 'Deliver a public-safe GitHub portfolio report with no secrets or personal data.', 'Answer SOC L1 interview questions using evidence from your lab.']::TEXT[],
    ARRAY['windows-security', 'module-17', 'capstone']::TEXT[],
    ARRAY['Case design and statement of authorized lab scope', 'Windows baseline, test scenario and alert qualification', 'Windows Security + Sysmon + PowerShell log correlation', 'Incident timeline, user/host scoping and false-positive assessment']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000170003',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000117',
    'm17-l3-trustedsec-sysmon-6',
    'Module 17 - Lesson 3: TrustedSec Sysmon 6 — Process tracking',
    'Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 17 — Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow in your isolated lab environment.',
    '46-alN2_vlo',
    35,
    3,
    ARRAY['Demonstrate end-to-end defensive analysis of a self-created Windows event story.', 'Deliver a public-safe GitHub portfolio report with no secrets or personal data.', 'Answer SOC L1 interview questions using evidence from your lab.']::TEXT[],
    ARRAY['windows-security', 'module-17', 'capstone']::TEXT[],
    ARRAY['Case design and statement of authorized lab scope', 'Windows baseline, test scenario and alert qualification', 'Windows Security + Sysmon + PowerShell log correlation', 'Incident timeline, user/host scoping and false-positive assessment']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000170004',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000117',
    'm17-l4-13cubed',
    'Module 17 - Lesson 4: 13Cubed — Introduction to Windows Forensics',
    'Hands-on Windows security video lesson presented by 13Cubed. Covers critical concepts from Module 17 — Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow in your isolated lab environment.',
    'VYROU-ZwZX8',
    35,
    4,
    ARRAY['Demonstrate end-to-end defensive analysis of a self-created Windows event story.', 'Deliver a public-safe GitHub portfolio report with no secrets or personal data.', 'Answer SOC L1 interview questions using evidence from your lab.']::TEXT[],
    ARRAY['windows-security', 'module-17', 'capstone']::TEXT[],
    ARRAY['Case design and statement of authorized lab scope', 'Windows baseline, test scenario and alert qualification', 'Windows Security + Sysmon + PowerShell log correlation', 'Incident timeline, user/host scoping and false-positive assessment']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'd8b00000-0000-4000-8000-000000170005',
    v_course_id,
    'd8b00000-0000-4000-8000-000000000117',
    'm17-l5-windows-event-forwarding-and-windows-log-collection',
    'Module 17 - Lesson 5: Windows Event Forwarding and Windows log collection',
    'Hands-on Windows security video lesson presented by I.T Security Labs. Covers critical concepts from Module 17 — Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow in your isolated lab environment.',
    'kkzAILQc9LE',
    35,
    5,
    ARRAY['Demonstrate end-to-end defensive analysis of a self-created Windows event story.', 'Deliver a public-safe GitHub portfolio report with no secrets or personal data.', 'Answer SOC L1 interview questions using evidence from your lab.']::TEXT[],
    ARRAY['windows-security', 'module-17', 'capstone']::TEXT[],
    ARRAY['Case design and statement of authorized lab scope', 'Windows baseline, test scenario and alert qualification', 'Windows Security + Sysmon + PowerShell log correlation', 'Incident timeline, user/host scoping and false-positive assessment']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
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