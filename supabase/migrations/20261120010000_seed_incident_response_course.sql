-- =============================================================================
-- Migration: 20261120010000_seed_incident_response_course.sql
-- Description:
-- Idempotently seeds the 30-module Incident Response Zero to Advanced course,
-- all 30 modules, and all 150 video lessons into the Supabase database.
-- =============================================================================

DO $$
DECLARE
  v_course_id UUID := 'db000000-0000-4000-8000-000000000001';
BEGIN
  -- 1. Insert or Update Course
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
    'incident-response-zero-to-advanced',
    'Incident Response: Zero to Advanced',
    'A comprehensive 30-module incident response and SOC operations curriculum aligned with NIST SP 800-61r3 and CISA playbooks, with 150 lessons, 60 video lectures, guided DFIR labs, and an end-to-end capstone portfolio.',
    'An exhaustive, hands-on 30-module cybersecurity curriculum designed for Tier 1–3 SOC analysts, incident responders, and DFIR specialists. Aligned with the current NIST SP 800-61 Revision 3 framework and CISA operational playbooks, this program covers the complete incident lifecycle: event intake and fast L1 triage; severity, prioritization, and SLAs; MITRE ATT&CK and threat intelligence; case management and chain of custody; SIEM investigations in Splunk and Microsoft Sentinel; EDR telemetry, process tree analysis, and Sysmon; email security and phishing triage; cloud identity compromise, BEC, and impossible travel; network forensics with Wireshark and Zeek; Windows artifacts (Prefetch, ShimCache, LNK) and timeline reconstruction; forensic disk imaging and Autopsy; memory forensics with Volatility 3; multi-source timeline correlation; authorized, reversible containment; ordered eradication; safe backup recovery and post-incident monitoring; ransomware response table-tops; data exfiltration and DLP; AWS CloudTrail and Azure M365 cloud DFIR; enterprise threat hunting with Velociraptor; detection engineering with Sigma and SOAR playbooks; culminating in an end-to-end multi-artifact SOC capstone portfolio project.',
    'intermediate',
    '30 modules (150 hours)',
    5250,
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    'CyberTube DFIR & Open SOC Community',
    'Senior Incident Response & DFIR Specialists',
    'NIST, CISA, 13Cubed, DFIRScience & Microsoft Community',
    'published',
    ARRAY['incident-response', 'dfir', 'soc-analyst', 'nist-sp-800-61r3', 'cisa-playbook', 'threat-hunting', 'forensics', 'wireshark', 'sysmon', 'volatility', 'splunk', 'sentinel']::TEXT[],
    ARRAY['Basic understanding of operating system architectures (Windows and Linux internals)', 'Foundational knowledge of networking protocols (TCP/IP, DNS, HTTP, TLS)', 'Commitment to authorized, defensive investigation on synthetic and owned lab environments']::TEXT[],
    ARRAY['Apply NIST SP 800-61 Revision 3 and CISA operational playbooks across the incident lifecycle', 'Perform fast, accurate Tier 1 alert triage and separate benign positives from true attacks', 'Analyze Windows Event Logs, Sysmon telemetry, and parent-child process tree anomalies', 'Investigate Linux authentication, journalctl logs, and live-response volatility', 'Conduct network forensic investigations using Wireshark display filters and Zeek logs', 'Triage phishing emails, evaluate SPF/DKIM/DMARC headers, and safely defang indicators', 'Investigate identity compromises, impossible travel, and Business Email Compromise (BEC)', 'Extract Windows forensic artifacts (Prefetch, Amcache, ShimCache, LNK) for timeline analysis', 'Perform forensic disk acquisition and analysis using Autopsy and write-blocker controls', 'Analyze volatile memory captures with Volatility 3 to detect injected code and C2 sockets', 'Plan and execute authorized, least-disruptive, reversible containment strategies', 'Coordinate eradication, clean-state rebuilds, backup validation, and post-recovery monitoring', 'Investigate cloud security incidents across AWS CloudTrail and Azure / Microsoft 365', 'Design and tune detection rules in Sigma format and build safe SOAR playbooks', 'Deliver an end-to-end, six-artifact SOC incident response capstone portfolio']::TEXT[],
    'cybersecurity',
    ARRAY['dfir', 'soc-blue-team', 'fundamentals']::TEXT[],
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
  VALUES ('db000000-0000-4000-8000-000000000101', v_course_id, 'Module 01: Incident Response Fundamentals & SOC Analyst Roles', '1 — Foundations phase (Beginner). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Classify 3 alerts without confusing an unverified event for confirmed compromise.', 1)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000102', v_course_id, 'Module 02: Modern IR Frameworks, NIST SP 800-61r3 and CISA', '1 — Foundations phase (Beginner). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Explain the current NIST framework and map legacy phase labels without claiming they are the same publication.', 2)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000103', v_course_id, 'Module 03: Computer Networks and Evidence for Incident Responders', '1 — Foundations phase (Beginner). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Extract five defensible network observations with timestamps and explain gaps.', 3)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000104', v_course_id, 'Module 04: Linux Logs, Authentication and Live-Response Fundamentals', '1 — Foundations phase (Beginner). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Differentiate normal sudo usage from a suspicious authentication cluster.', 4)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000105', v_course_id, 'Module 05: Windows Event Logs and Sysmon Essentials', '1 — Foundations phase (Beginner). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Build a correct five-event authentication/process timeline with cited event fields.', 5)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000106', v_course_id, 'Module 06: Preparation: People, Processes, Systems and Readiness', '1 — Foundations phase (Beginner). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Produce a usable, role-based readiness checklist and approval matrix.', 6)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000107', v_course_id, 'Module 07: Alert Intake, Validation and Fast SOC L1 Triage', '2 — Triage and SOC Operations phase (Beginner). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Complete 3 triage tickets with justifiable outcomes and no unsupported certainty.', 7)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000108', v_course_id, 'Module 08: Incident Severity, Priority, Escalation and SLAs', '2 — Triage and SOC Operations phase (Beginner). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Explain when an L1 analyst must escalate despite incomplete evidence.', 8)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000109', v_course_id, 'Module 09: Threat Intelligence, IOCs, Context and ATT&CK', '2 — Triage and SOC Operations phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Provide evidence-qualified IOC/TTP reasoning rather than asserting attribution.', 9)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000110', v_course_id, 'Module 10: Case Management and Investigation Documentation', '2 — Triage and SOC Operations phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: A second analyst can understand what happened, what is unknown and what to do next.', 10)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000111', v_course_id, 'Module 11: SIEM Incident Investigations with Splunk', '2 — Triage and SOC Operations phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Write an incident verdict supported by an explicit SIEM search and time window.', 11)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000112', v_course_id, 'Module 12: Microsoft Sentinel, KQL and Incident Operations', '2 — Triage and SOC Operations phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Demonstrate correct query logic and a documented decision trail without requiring a paid cloud subscription.', 12)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000113', v_course_id, 'Module 13: Endpoint Detection, EDR and Sysmon Investigation', '3 — Forensic Investigation phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Reconstruct an endpoint story using at least two telemetry types.', 13)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000114', v_course_id, 'Module 14: Phishing and Email Incident Response', '3 — Forensic Investigation phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Classify suspicious email with a clear evidence ledger and no unsafe link opening.', 14)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000115', v_course_id, 'Module 15: Identity Compromise, Account Takeover and BEC', '3 — Forensic Investigation phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Separate strong and weak signs of account compromise and propose reversible actions.', 15)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000116', v_course_id, 'Module 16: Network Forensics with Wireshark and Zeek', '3 — Forensic Investigation phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Find three network anomalies and articulate what the capture cannot tell you.', 16)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000117', v_course_id, 'Module 17: Windows Forensic Artifacts and Timeline Reconstruction', '3 — Forensic Investigation phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Produce a UTC timeline with 6 artifact-backed entries.', 17)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000118', v_course_id, 'Module 18: Disk Imaging, Hashing and Autopsy', '3 — Forensic Investigation phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Verify evidence integrity and avoid modifying source media.', 18)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000119', v_course_id, 'Module 19: Memory Forensics and Volatility 3', '3 — Forensic Investigation phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Make a defensible finding without assuming every unfamiliar process is malicious.', 19)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000120', v_course_id, 'Module 20: Evidence Correlation, Root Cause and Case Timeline', '3 — Forensic Investigation phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Show a corroborated timeline and separate observation from inference.', 20)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000121', v_course_id, 'Module 21: Containment: Scope, Approval, Reversibility and Preservation', '4 — Containment, Eradication and Recovery phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Recommend least-disruptive, authorized containment matched to severity.', 21)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000122', v_course_id, 'Module 22: Eradication, Eviction and Closing Access Paths', '4 — Containment, Eradication and Recovery phase (Intermediate). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Propose an ordered eradication plan that addresses initial access and persistence.', 22)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000123', v_course_id, 'Module 23: Recovery, Rebuild, Backups and Post-Recovery Monitoring', '4 — Containment, Eradication and Recovery phase (Advanced). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Demonstrate recovery verification rather than equating availability with safety.', 23)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000124', v_course_id, 'Module 24: Ransomware Incident Response and Tabletop Exercise', '4 — Containment, Eradication and Recovery phase (Advanced). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Handle ransomware decisions using approval boundaries and evidence preservation.', 24)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000125', v_course_id, 'Module 25: Data Exfiltration, Insider Risk and Third-Party Coordination', '4 — Containment, Eradication and Recovery phase (Advanced). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Produce an exfiltration risk summary with defensible unknowns and next steps.', 25)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000126', v_course_id, 'Module 26: AWS Cloud Incident Response and CloudTrail Evidence', '5 — Advanced Cloud and Enterprise DFIR phase (Advanced). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Identify cloud principal and risk scope from sample audit events.', 26)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000127', v_course_id, 'Module 27: Azure / Microsoft 365 Cloud & Identity Incident Response', '5 — Advanced Cloud and Enterprise DFIR phase (Advanced). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Correlate a cloud-account takeover across at least two audit sources.', 27)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000128', v_course_id, 'Module 28: Enterprise DFIR with Velociraptor and Threat Hunting', '5 — Advanced Cloud and Enterprise DFIR phase (Advanced). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Design a scoped hunt that collects only necessary evidence.', 28)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000129', v_course_id, 'Module 29: Playbooks, SOAR, Sigma and Detection Improvement', '5 — Advanced Cloud and Enterprise DFIR phase (Advanced). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Propose testable automation with approvals and explicit false-positive controls.', 29)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('db000000-0000-4000-8000-000000000130', v_course_id, 'Module 30: Final Capstone: End-to-End SOC Incident Response', '6 — Capstone and Job Readiness phase (Capstone). Planned effort: 3–5 hours, including research, video and practice. Mastery goal: Deliver the six capstone artifacts and defend key decisions in a 10-minute briefing.', 30)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  -- 3. Insert/Update 150 Lessons
  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010101',
    v_course_id,
    'db000000-0000-4000-8000-000000000101',
    'm01-l1-security-events-versus-incidents',
    'Module 01 · Lesson 1: Security events versus incidents',
    'Hands-on incident response lesson covering Security events versus incidents. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ugRlyWj-9SI',
    35,
    1,
    ARRAY['Explain security events versus incidents in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-01']::TEXT[],
    ARRAY['Incident investigation: Security events versus incidents', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010102',
    v_course_id,
    'db000000-0000-4000-8000-000000000101',
    'm01-l2-soc-l1-l2-l3-and-csirt-roles',
    'Module 01 · Lesson 2: SOC L1/L2/L3 and CSIRT roles',
    'Hands-on incident response lesson covering SOC L1/L2/L3 and CSIRT roles. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ugRlyWj-9SI',
    35,
    2,
    ARRAY['Explain soc l1/l2/l3 and csirt roles in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-01']::TEXT[],
    ARRAY['Incident investigation: SOC L1/L2/L3 and CSIRT roles', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010103',
    v_course_id,
    'db000000-0000-4000-8000-000000000101',
    'm01-l3-alert-ticket-investigation-decision-workflow',
    'Module 01 · Lesson 3: Alert → ticket → investigation → decision workflow',
    'Hands-on incident response lesson covering Alert → ticket → investigation → decision workflow. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'gWXgChC9ANg',
    35,
    3,
    ARRAY['Explain alert → ticket → investigation → decision workflow in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-01']::TEXT[],
    ARRAY['Incident investigation: Alert → ticket → investigation → decision workflow', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010104',
    v_course_id,
    'db000000-0000-4000-8000-000000000101',
    'm01-l4-false-positive-true-positive-benign-positive',
    'Module 01 · Lesson 4: False positive/true positive/benign positive',
    'Hands-on incident response lesson covering False positive/true positive/benign positive. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'gWXgChC9ANg',
    35,
    4,
    ARRAY['Explain false positive/true positive/benign positive in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-01']::TEXT[],
    ARRAY['Incident investigation: False positive/true positive/benign positive', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010105',
    v_course_id,
    'db000000-0000-4000-8000-000000000101',
    'm01-l5-defensive-authorization-and-reporting-boundaries',
    'Module 01 · Lesson 5: Defensive authorization and reporting boundaries',
    'Hands-on incident response lesson covering Defensive authorization and reporting boundaries. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'gWXgChC9ANg',
    35,
    5,
    ARRAY['Explain defensive authorization and reporting boundaries in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-01']::TEXT[],
    ARRAY['Incident investigation: Defensive authorization and reporting boundaries', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010201',
    v_course_id,
    'db000000-0000-4000-8000-000000000102',
    'm02-l1-nist-csf-2-0-govern-identify-protect-detect-respond-recover',
    'Module 02 · Lesson 1: NIST CSF 2.0: Govern, Identify, Protect, Detect, Respond, Recover',
    'Hands-on incident response lesson covering NIST CSF 2.0: Govern, Identify, Protect, Detect, Respond, Recover. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'yQA0Tr62K0k',
    35,
    1,
    ARRAY['Explain nist csf 2.0: govern, identify, protect, detect, respond, recover in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-02']::TEXT[],
    ARRAY['Incident investigation: NIST CSF 2.0: Govern, Identify, Protect, Detect, Respond, Recover', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010202',
    v_course_id,
    'db000000-0000-4000-8000-000000000102',
    'm02-l2-how-2025-rev-3-differs-from-withdrawn-rev-2',
    'Module 02 · Lesson 2: How 2025 Rev 3 differs from withdrawn Rev 2',
    'Hands-on incident response lesson covering How 2025 Rev 3 differs from withdrawn Rev 2. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'yQA0Tr62K0k',
    35,
    2,
    ARRAY['Explain how 2025 rev 3 differs from withdrawn rev 2 in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-02']::TEXT[],
    ARRAY['Incident investigation: How 2025 Rev 3 differs from withdrawn Rev 2', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010203',
    v_course_id,
    'db000000-0000-4000-8000-000000000102',
    'm02-l3-cisa-operational-playbook-and-picerl-as-teaching-models',
    'Module 02 · Lesson 3: CISA operational playbook and PICERL as teaching models',
    'Hands-on incident response lesson covering CISA operational playbook and PICERL as teaching models. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'TAqJ3LkVjyc',
    35,
    3,
    ARRAY['Explain cisa operational playbook and picerl as teaching models in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-02']::TEXT[],
    ARRAY['Incident investigation: CISA operational playbook and PICERL as teaching models', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010204',
    v_course_id,
    'db000000-0000-4000-8000-000000000102',
    'm02-l4-business-impact-and-evidence-based-decisions',
    'Module 02 · Lesson 4: Business impact and evidence-based decisions',
    'Hands-on incident response lesson covering Business impact and evidence-based decisions. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'TAqJ3LkVjyc',
    35,
    4,
    ARRAY['Explain business impact and evidence-based decisions in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-02']::TEXT[],
    ARRAY['Incident investigation: Business impact and evidence-based decisions', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010205',
    v_course_id,
    'db000000-0000-4000-8000-000000000102',
    'm02-l5-ir-lifecycle-feedback-loops',
    'Module 02 · Lesson 5: IR lifecycle feedback loops',
    'Hands-on incident response lesson covering IR lifecycle feedback loops. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'TAqJ3LkVjyc',
    35,
    5,
    ARRAY['Explain ir lifecycle feedback loops in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-02']::TEXT[],
    ARRAY['Incident investigation: IR lifecycle feedback loops', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010301',
    v_course_id,
    'db000000-0000-4000-8000-000000000103',
    'm03-l1-ip-ports-dns-dhcp-http-s-smtp',
    'Module 03 · Lesson 1: IP, ports, DNS, DHCP, HTTP(S), SMTP',
    'Hands-on incident response lesson covering IP, ports, DNS, DHCP, HTTP(S), SMTP. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ygtTDz3X8BQ',
    35,
    1,
    ARRAY['Explain ip, ports, dns, dhcp, http(s), smtp in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-03', 'network-security']::TEXT[],
    ARRAY['Incident investigation: IP, ports, DNS, DHCP, HTTP(S), SMTP', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010302',
    v_course_id,
    'db000000-0000-4000-8000-000000000103',
    'm03-l2-what-routers-firewalls-proxies-can-and-cannot-prove',
    'Module 03 · Lesson 2: What routers/firewalls/proxies can and cannot prove',
    'Hands-on incident response lesson covering What routers/firewalls/proxies can and cannot prove. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ygtTDz3X8BQ',
    35,
    2,
    ARRAY['Explain what routers/firewalls/proxies can and cannot prove in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-03', 'network-security']::TEXT[],
    ARRAY['Incident investigation: What routers/firewalls/proxies can and cannot prove', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010303',
    v_course_id,
    'db000000-0000-4000-8000-000000000103',
    'm03-l3-timestamp-timezone-source-destination-fields',
    'Module 03 · Lesson 3: Timestamp, timezone, source/destination fields',
    'Hands-on incident response lesson covering Timestamp, timezone, source/destination fields. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    3,
    ARRAY['Explain timestamp, timezone, source/destination fields in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-03', 'network-security']::TEXT[],
    ARRAY['Incident investigation: Timestamp, timezone, source/destination fields', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010304',
    v_course_id,
    'db000000-0000-4000-8000-000000000103',
    'm03-l4-flows-versus-packet-captures',
    'Module 03 · Lesson 4: Flows versus packet captures',
    'Hands-on incident response lesson covering Flows versus packet captures. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    4,
    ARRAY['Explain flows versus packet captures in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-03', 'network-security']::TEXT[],
    ARRAY['Incident investigation: Flows versus packet captures', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010305',
    v_course_id,
    'db000000-0000-4000-8000-000000000103',
    'm03-l5-normal-activity-versus-suspicious-indicators',
    'Module 03 · Lesson 5: Normal activity versus suspicious indicators',
    'Hands-on incident response lesson covering Normal activity versus suspicious indicators. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    5,
    ARRAY['Explain normal activity versus suspicious indicators in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-03', 'network-security']::TEXT[],
    ARRAY['Incident investigation: Normal activity versus suspicious indicators', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010401',
    v_course_id,
    'db000000-0000-4000-8000-000000000104',
    'm04-l1-linux-filesystem-locations-for-evidence',
    'Module 04 · Lesson 1: Linux filesystem locations for evidence',
    'Hands-on incident response lesson covering Linux filesystem locations for evidence. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '3xsIst5t23Y',
    35,
    1,
    ARRAY['Explain linux filesystem locations for evidence in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-04', 'linux']::TEXT[],
    ARRAY['Incident investigation: Linux filesystem locations for evidence', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010402',
    v_course_id,
    'db000000-0000-4000-8000-000000000104',
    'm04-l2-journalctl-auth-logs-and-auditd-concepts',
    'Module 04 · Lesson 2: journalctl, auth logs and auditd concepts',
    'Hands-on incident response lesson covering journalctl, auth logs and auditd concepts. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '3xsIst5t23Y',
    35,
    2,
    ARRAY['Explain journalctl, auth logs and auditd concepts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-04', 'linux']::TEXT[],
    ARRAY['Incident investigation: journalctl, auth logs and auditd concepts', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010403',
    v_course_id,
    'db000000-0000-4000-8000-000000000104',
    'm04-l3-users-groups-sudo-ssh-and-sessions',
    'Module 04 · Lesson 3: Users, groups, sudo, SSH and sessions',
    'Hands-on incident response lesson covering Users, groups, sudo, SSH and sessions. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'hMXMhArI8UM',
    35,
    3,
    ARRAY['Explain users, groups, sudo, ssh and sessions in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-04', 'linux']::TEXT[],
    ARRAY['Incident investigation: Users, groups, sudo, SSH and sessions', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010404',
    v_course_id,
    'db000000-0000-4000-8000-000000000104',
    'm04-l4-processes-services-timers-and-cron',
    'Module 04 · Lesson 4: Processes, services, timers and cron',
    'Hands-on incident response lesson covering Processes, services, timers and cron. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'hMXMhArI8UM',
    35,
    4,
    ARRAY['Explain processes, services, timers and cron in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-04', 'linux']::TEXT[],
    ARRAY['Incident investigation: Processes, services, timers and cron', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010405',
    v_course_id,
    'db000000-0000-4000-8000-000000000104',
    'm04-l5-read-only-triage-commands-and-volatility-concerns',
    'Module 04 · Lesson 5: Read-only triage commands and volatility concerns',
    'Hands-on incident response lesson covering Read-only triage commands and volatility concerns. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'hMXMhArI8UM',
    35,
    5,
    ARRAY['Explain read-only triage commands and volatility concerns in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-04', 'linux', 'memory-forensics']::TEXT[],
    ARRAY['Incident investigation: Read-only triage commands and volatility concerns', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010501',
    v_course_id,
    'db000000-0000-4000-8000-000000000105',
    'm05-l1-security-system-application-and-powershell-channels',
    'Module 05 · Lesson 1: Security, System, Application and PowerShell channels',
    'Hands-on incident response lesson covering Security, System, Application and PowerShell channels. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5FVjQhjj80s',
    35,
    1,
    ARRAY['Explain security, system, application and powershell channels in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-05', 'windows']::TEXT[],
    ARRAY['Incident investigation: Security, System, Application and PowerShell channels', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010502',
    v_course_id,
    'db000000-0000-4000-8000-000000000105',
    'm05-l2-event-ids-4624-4625-4688-4720-4728',
    'Module 05 · Lesson 2: Event IDs 4624, 4625, 4688, 4720, 4728',
    'Hands-on incident response lesson covering Event IDs 4624, 4625, 4688, 4720, 4728. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5FVjQhjj80s',
    35,
    2,
    ARRAY['Explain event ids 4624, 4625, 4688, 4720, 4728 in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-05', 'windows']::TEXT[],
    ARRAY['Incident investigation: Event IDs 4624, 4625, 4688, 4720, 4728', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010503',
    v_course_id,
    'db000000-0000-4000-8000-000000000105',
    'm05-l3-sysmon-1-3-7-11-and-22-configuration-dependent',
    'Module 05 · Lesson 3: Sysmon 1, 3, 7, 11 and 22 (configuration-dependent)',
    'Hands-on incident response lesson covering Sysmon 1, 3, 7, 11 and 22 (configuration-dependent). Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'VYROU-ZwZX8',
    35,
    3,
    ARRAY['Explain sysmon 1, 3, 7, 11 and 22 (configuration-dependent) in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-05', 'windows']::TEXT[],
    ARRAY['Incident investigation: Sysmon 1, 3, 7, 11 and 22 (configuration-dependent)', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010504',
    v_course_id,
    'db000000-0000-4000-8000-000000000105',
    'm05-l4-parent-child-process-relationships',
    'Module 05 · Lesson 4: Parent-child process relationships',
    'Hands-on incident response lesson covering Parent-child process relationships. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'VYROU-ZwZX8',
    35,
    4,
    ARRAY['Explain parent-child process relationships in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-05', 'windows']::TEXT[],
    ARRAY['Incident investigation: Parent-child process relationships', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010505',
    v_course_id,
    'db000000-0000-4000-8000-000000000105',
    'm05-l5-event-collection-limitations-and-baselines',
    'Module 05 · Lesson 5: Event collection limitations and baselines',
    'Hands-on incident response lesson covering Event collection limitations and baselines. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'VYROU-ZwZX8',
    35,
    5,
    ARRAY['Explain event collection limitations and baselines in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-05', 'windows']::TEXT[],
    ARRAY['Incident investigation: Event collection limitations and baselines', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010601',
    v_course_id,
    'db000000-0000-4000-8000-000000000106',
    'm06-l1-incident-charter-and-on-call-contacts',
    'Module 06 · Lesson 1: Incident charter and on-call contacts',
    'Hands-on incident response lesson covering Incident charter and on-call contacts. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'dQokmRh7430',
    35,
    1,
    ARRAY['Explain incident charter and on-call contacts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-06']::TEXT[],
    ARRAY['Incident investigation: Incident charter and on-call contacts', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010602',
    v_course_id,
    'db000000-0000-4000-8000-000000000106',
    'm06-l2-asset-and-data-classification',
    'Module 06 · Lesson 2: Asset and data classification',
    'Hands-on incident response lesson covering Asset and data classification. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'dQokmRh7430',
    35,
    2,
    ARRAY['Explain asset and data classification in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-06']::TEXT[],
    ARRAY['Incident investigation: Asset and data classification', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010603',
    v_course_id,
    'db000000-0000-4000-8000-000000000106',
    'm06-l3-evidence-retention-and-time-synchronization',
    'Module 06 · Lesson 3: Evidence retention and time synchronization',
    'Hands-on incident response lesson covering Evidence retention and time synchronization. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '75y6fdUoIgE',
    35,
    3,
    ARRAY['Explain evidence retention and time synchronization in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-06']::TEXT[],
    ARRAY['Incident investigation: Evidence retention and time synchronization', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010604',
    v_course_id,
    'db000000-0000-4000-8000-000000000106',
    'm06-l4-communication-tree-approvals-and-access-controls',
    'Module 06 · Lesson 4: Communication tree, approvals and access controls',
    'Hands-on incident response lesson covering Communication tree, approvals and access controls. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '75y6fdUoIgE',
    35,
    4,
    ARRAY['Explain communication tree, approvals and access controls in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-06']::TEXT[],
    ARRAY['Incident investigation: Communication tree, approvals and access controls', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010605',
    v_course_id,
    'db000000-0000-4000-8000-000000000106',
    'm06-l5-tabletop-exercises-and-response-readiness',
    'Module 06 · Lesson 5: Tabletop exercises and response readiness',
    'Hands-on incident response lesson covering Tabletop exercises and response readiness. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '75y6fdUoIgE',
    35,
    5,
    ARRAY['Explain tabletop exercises and response readiness in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-06']::TEXT[],
    ARRAY['Incident investigation: Tabletop exercises and response readiness', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010701',
    v_course_id,
    'db000000-0000-4000-8000-000000000107',
    'm07-l1-alert-source-rule-logic-and-context',
    'Module 07 · Lesson 1: Alert source, rule logic and context',
    'Hands-on incident response lesson covering Alert source, rule logic and context. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    1,
    ARRAY['Explain alert source, rule logic and context in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-07']::TEXT[],
    ARRAY['Incident investigation: Alert source, rule logic and context', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010702',
    v_course_id,
    'db000000-0000-4000-8000-000000000107',
    'm07-l2-validate-duplicates-timestamps-and-host-identity',
    'Module 07 · Lesson 2: Validate duplicates, timestamps and host identity',
    'Hands-on incident response lesson covering Validate duplicates, timestamps and host identity. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    2,
    ARRAY['Explain validate duplicates, timestamps and host identity in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-07']::TEXT[],
    ARRAY['Incident investigation: Validate duplicates, timestamps and host identity', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010703',
    v_course_id,
    'db000000-0000-4000-8000-000000000107',
    'm07-l3-hypothesis-first-triage',
    'Module 07 · Lesson 3: Hypothesis-first triage',
    'Hands-on incident response lesson covering Hypothesis-first triage. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5J1qLKbXGBo',
    35,
    3,
    ARRAY['Explain hypothesis-first triage in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-07']::TEXT[],
    ARRAY['Incident investigation: Hypothesis-first triage', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010704',
    v_course_id,
    'db000000-0000-4000-8000-000000000107',
    'm07-l4-false-positives-and-evidentiary-confidence',
    'Module 07 · Lesson 4: False positives and evidentiary confidence',
    'Hands-on incident response lesson covering False positives and evidentiary confidence. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5J1qLKbXGBo',
    35,
    4,
    ARRAY['Explain false positives and evidentiary confidence in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-07']::TEXT[],
    ARRAY['Incident investigation: False positives and evidentiary confidence', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010705',
    v_course_id,
    'db000000-0000-4000-8000-000000000107',
    'm07-l5-decide-close-investigate-or-escalate',
    'Module 07 · Lesson 5: Decide: close, investigate or escalate',
    'Hands-on incident response lesson covering Decide: close, investigate or escalate. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5J1qLKbXGBo',
    35,
    5,
    ARRAY['Explain decide: close, investigate or escalate in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-07']::TEXT[],
    ARRAY['Incident investigation: Decide: close, investigate or escalate', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010801',
    v_course_id,
    'db000000-0000-4000-8000-000000000108',
    'm08-l1-priority-is-not-identical-to-alert-rule-severity',
    'Module 08 · Lesson 1: Priority is not identical to alert rule severity',
    'Hands-on incident response lesson covering Priority is not identical to alert rule severity. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'J1uUSQTWskU',
    35,
    1,
    ARRAY['Explain priority is not identical to alert rule severity in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-08']::TEXT[],
    ARRAY['Incident investigation: Priority is not identical to alert rule severity', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010802',
    v_course_id,
    'db000000-0000-4000-8000-000000000108',
    'm08-l2-asset-criticality-blast-radius-and-active-exploitation',
    'Module 08 · Lesson 2: Asset criticality, blast radius and active exploitation',
    'Hands-on incident response lesson covering Asset criticality, blast radius and active exploitation. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'J1uUSQTWskU',
    35,
    2,
    ARRAY['Explain asset criticality, blast radius and active exploitation in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-08']::TEXT[],
    ARRAY['Incident investigation: Asset criticality, blast radius and active exploitation', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010803',
    v_course_id,
    'db000000-0000-4000-8000-000000000108',
    'm08-l3-escalation-trigger-and-incident-command',
    'Module 08 · Lesson 3: Escalation trigger and incident command',
    'Hands-on incident response lesson covering Escalation trigger and incident command. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'niuf8nGTzBw',
    35,
    3,
    ARRAY['Explain escalation trigger and incident command in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-08']::TEXT[],
    ARRAY['Incident investigation: Escalation trigger and incident command', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010804',
    v_course_id,
    'db000000-0000-4000-8000-000000000108',
    'm08-l4-time-sensitive-notifications-and-shift-handoff',
    'Module 08 · Lesson 4: Time-sensitive notifications and shift handoff',
    'Hands-on incident response lesson covering Time-sensitive notifications and shift handoff. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'niuf8nGTzBw',
    35,
    4,
    ARRAY['Explain time-sensitive notifications and shift handoff in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-08']::TEXT[],
    ARRAY['Incident investigation: Time-sensitive notifications and shift handoff', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010805',
    v_course_id,
    'db000000-0000-4000-8000-000000000108',
    'm08-l5-escalation-without-unauthorized-disruption',
    'Module 08 · Lesson 5: Escalation without unauthorized disruption',
    'Hands-on incident response lesson covering Escalation without unauthorized disruption. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'niuf8nGTzBw',
    35,
    5,
    ARRAY['Explain escalation without unauthorized disruption in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-08']::TEXT[],
    ARRAY['Incident investigation: Escalation without unauthorized disruption', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010901',
    v_course_id,
    'db000000-0000-4000-8000-000000000109',
    'm09-l1-ioc-versus-behavior-based-ttp',
    'Module 09 · Lesson 1: IOC versus behavior-based TTP',
    'Hands-on incident response lesson covering IOC versus behavior-based TTP. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'pgcMsv39090',
    35,
    1,
    ARRAY['Explain ioc versus behavior-based ttp in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-09']::TEXT[],
    ARRAY['Incident investigation: IOC versus behavior-based TTP', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010902',
    v_course_id,
    'db000000-0000-4000-8000-000000000109',
    'm09-l2-mitre-att-ck-tactics-and-technique-mapping',
    'Module 09 · Lesson 2: MITRE ATT&CK tactics and technique mapping',
    'Hands-on incident response lesson covering MITRE ATT&CK tactics and technique mapping. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'pgcMsv39090',
    35,
    2,
    ARRAY['Explain mitre att&ck tactics and technique mapping in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-09']::TEXT[],
    ARRAY['Incident investigation: MITRE ATT&CK tactics and technique mapping', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010903',
    v_course_id,
    'db000000-0000-4000-8000-000000000109',
    'm09-l3-ip-domain-hash-reputation-limitations',
    'Module 09 · Lesson 3: IP/domain/hash reputation limitations',
    'Hands-on incident response lesson covering IP/domain/hash reputation limitations. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'C6t5Db-kSiQ',
    35,
    3,
    ARRAY['Explain ip/domain/hash reputation limitations in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-09']::TEXT[],
    ARRAY['Incident investigation: IP/domain/hash reputation limitations', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010904',
    v_course_id,
    'db000000-0000-4000-8000-000000000109',
    'm09-l4-confidence-provenance-and-expiry',
    'Module 09 · Lesson 4: Confidence, provenance and expiry',
    'Hands-on incident response lesson covering Confidence, provenance and expiry. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'C6t5Db-kSiQ',
    35,
    4,
    ARRAY['Explain confidence, provenance and expiry in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-09']::TEXT[],
    ARRAY['Incident investigation: Confidence, provenance and expiry', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000010905',
    v_course_id,
    'db000000-0000-4000-8000-000000000109',
    'm09-l5-safe-enrichment-without-executing-samples',
    'Module 09 · Lesson 5: Safe enrichment without executing samples',
    'Hands-on incident response lesson covering Safe enrichment without executing samples. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'C6t5Db-kSiQ',
    35,
    5,
    ARRAY['Explain safe enrichment without executing samples in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-09']::TEXT[],
    ARRAY['Incident investigation: Safe enrichment without executing samples', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011001',
    v_course_id,
    'db000000-0000-4000-8000-000000000110',
    'm10-l1-incident-ids-timestamps-and-case-ownership',
    'Module 10 · Lesson 1: Incident IDs, timestamps and case ownership',
    'Hands-on incident response lesson covering Incident IDs, timestamps and case ownership. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'niuf8nGTzBw',
    35,
    1,
    ARRAY['Explain incident ids, timestamps and case ownership in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-10']::TEXT[],
    ARRAY['Incident investigation: Incident IDs, timestamps and case ownership', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011002',
    v_course_id,
    'db000000-0000-4000-8000-000000000110',
    'm10-l2-evidence-links-and-artifact-provenance',
    'Module 10 · Lesson 2: Evidence links and artifact provenance',
    'Hands-on incident response lesson covering Evidence links and artifact provenance. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'niuf8nGTzBw',
    35,
    2,
    ARRAY['Explain evidence links and artifact provenance in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-10']::TEXT[],
    ARRAY['Incident investigation: Evidence links and artifact provenance', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011003',
    v_course_id,
    'db000000-0000-4000-8000-000000000110',
    'm10-l3-analyst-notes-versus-confirmed-facts',
    'Module 10 · Lesson 3: Analyst notes versus confirmed facts',
    'Hands-on incident response lesson covering Analyst notes versus confirmed facts. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '6AVBPsTWd5A',
    35,
    3,
    ARRAY['Explain analyst notes versus confirmed facts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-10']::TEXT[],
    ARRAY['Incident investigation: Analyst notes versus confirmed facts', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011004',
    v_course_id,
    'db000000-0000-4000-8000-000000000110',
    'm10-l4-task-assignment-and-handoff-etiquette',
    'Module 10 · Lesson 4: Task assignment and handoff etiquette',
    'Hands-on incident response lesson covering Task assignment and handoff etiquette. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '6AVBPsTWd5A',
    35,
    4,
    ARRAY['Explain task assignment and handoff etiquette in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-10']::TEXT[],
    ARRAY['Incident investigation: Task assignment and handoff etiquette', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011005',
    v_course_id,
    'db000000-0000-4000-8000-000000000110',
    'm10-l5-final-disposition-and-closure-criteria',
    'Module 10 · Lesson 5: Final disposition and closure criteria',
    'Hands-on incident response lesson covering Final disposition and closure criteria. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '6AVBPsTWd5A',
    35,
    5,
    ARRAY['Explain final disposition and closure criteria in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-10']::TEXT[],
    ARRAY['Incident investigation: Final disposition and closure criteria', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011101',
    v_course_id,
    'db000000-0000-4000-8000-000000000111',
    'm11-l1-spl-search-indexes-and-event-fields',
    'Module 11 · Lesson 1: SPL search, indexes and event fields',
    'Hands-on incident response lesson covering SPL search, indexes and event fields. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'CbK9m1MYz6c',
    35,
    1,
    ARRAY['Explain spl search, indexes and event fields in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-11', 'siem']::TEXT[],
    ARRAY['Incident investigation: SPL search, indexes and event fields', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011102',
    v_course_id,
    'db000000-0000-4000-8000-000000000111',
    'm11-l2-filter-stats-and-grouping',
    'Module 11 · Lesson 2: Filter, stats and grouping',
    'Hands-on incident response lesson covering Filter, stats and grouping. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'CbK9m1MYz6c',
    35,
    2,
    ARRAY['Explain filter, stats and grouping in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-11', 'siem']::TEXT[],
    ARRAY['Incident investigation: Filter, stats and grouping', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011103',
    v_course_id,
    'db000000-0000-4000-8000-000000000111',
    'm11-l3-authentication-and-endpoint-correlation',
    'Module 11 · Lesson 3: Authentication and endpoint correlation',
    'Hands-on incident response lesson covering Authentication and endpoint correlation. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    3,
    ARRAY['Explain authentication and endpoint correlation in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-11', 'siem']::TEXT[],
    ARRAY['Incident investigation: Authentication and endpoint correlation', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011104',
    v_course_id,
    'db000000-0000-4000-8000-000000000111',
    'm11-l4-deconfliction-with-benign-admin-changes',
    'Module 11 · Lesson 4: Deconfliction with benign admin changes',
    'Hands-on incident response lesson covering Deconfliction with benign admin changes. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    4,
    ARRAY['Explain deconfliction with benign admin changes in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-11', 'siem']::TEXT[],
    ARRAY['Incident investigation: Deconfliction with benign admin changes', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011105',
    v_course_id,
    'db000000-0000-4000-8000-000000000111',
    'm11-l5-saved-investigative-queries-and-evidence-exports',
    'Module 11 · Lesson 5: Saved investigative queries and evidence exports',
    'Hands-on incident response lesson covering Saved investigative queries and evidence exports. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    5,
    ARRAY['Explain saved investigative queries and evidence exports in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-11', 'siem']::TEXT[],
    ARRAY['Incident investigation: Saved investigative queries and evidence exports', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011201',
    v_course_id,
    'db000000-0000-4000-8000-000000000112',
    'm12-l1-workspace-and-incident-concepts',
    'Module 12 · Lesson 1: Workspace and incident concepts',
    'Hands-on incident response lesson covering Workspace and incident concepts. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5J1qLKbXGBo',
    35,
    1,
    ARRAY['Explain workspace and incident concepts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-12', 'siem']::TEXT[],
    ARRAY['Incident investigation: Workspace and incident concepts', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011202',
    v_course_id,
    'db000000-0000-4000-8000-000000000112',
    'm12-l2-kql-where-summarize-project-join-basics',
    'Module 12 · Lesson 2: KQL where, summarize, project, join basics',
    'Hands-on incident response lesson covering KQL where, summarize, project, join basics. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5J1qLKbXGBo',
    35,
    2,
    ARRAY['Explain kql where, summarize, project, join basics in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-12', 'siem']::TEXT[],
    ARRAY['Incident investigation: KQL where, summarize, project, join basics', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011203',
    v_course_id,
    'db000000-0000-4000-8000-000000000112',
    'm12-l3-incident-entities-alerts-and-investigation-graph',
    'Module 12 · Lesson 3: Incident entities, alerts and investigation graph',
    'Hands-on incident response lesson covering Incident entities, alerts and investigation graph. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'pgcMsv39090',
    35,
    3,
    ARRAY['Explain incident entities, alerts and investigation graph in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-12', 'siem']::TEXT[],
    ARRAY['Incident investigation: Incident entities, alerts and investigation graph', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011204',
    v_course_id,
    'db000000-0000-4000-8000-000000000112',
    'm12-l4-evidence-context-and-analyst-comments',
    'Module 12 · Lesson 4: Evidence context and analyst comments',
    'Hands-on incident response lesson covering Evidence context and analyst comments. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'pgcMsv39090',
    35,
    4,
    ARRAY['Explain evidence context and analyst comments in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-12', 'siem']::TEXT[],
    ARRAY['Incident investigation: Evidence context and analyst comments', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011205',
    v_course_id,
    'db000000-0000-4000-8000-000000000112',
    'm12-l5-automation-rules-cost-and-access-boundaries',
    'Module 12 · Lesson 5: Automation rules, cost and access boundaries',
    'Hands-on incident response lesson covering Automation rules, cost and access boundaries. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'pgcMsv39090',
    35,
    5,
    ARRAY['Explain automation rules, cost and access boundaries in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-12', 'siem']::TEXT[],
    ARRAY['Incident investigation: Automation rules, cost and access boundaries', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011301',
    v_course_id,
    'db000000-0000-4000-8000-000000000113',
    'm13-l1-edr-detection-context-and-telemetry-gaps',
    'Module 13 · Lesson 1: EDR detection context and telemetry gaps',
    'Hands-on incident response lesson covering EDR detection context and telemetry gaps. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5FVjQhjj80s',
    35,
    1,
    ARRAY['Explain edr detection context and telemetry gaps in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-13', 'windows']::TEXT[],
    ARRAY['Incident investigation: EDR detection context and telemetry gaps', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011302',
    v_course_id,
    'db000000-0000-4000-8000-000000000113',
    'm13-l2-process-tree-and-command-line-context',
    'Module 13 · Lesson 2: Process tree and command-line context',
    'Hands-on incident response lesson covering Process tree and command-line context. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5FVjQhjj80s',
    35,
    2,
    ARRAY['Explain process tree and command-line context in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-13', 'windows']::TEXT[],
    ARRAY['Incident investigation: Process tree and command-line context', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011303',
    v_course_id,
    'db000000-0000-4000-8000-000000000113',
    'm13-l3-file-registry-network-and-dns-events',
    'Module 13 · Lesson 3: File, registry, network and DNS events',
    'Hands-on incident response lesson covering File, registry, network and DNS events. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'CbK9m1MYz6c',
    35,
    3,
    ARRAY['Explain file, registry, network and dns events in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-13', 'windows', 'network-security']::TEXT[],
    ARRAY['Incident investigation: File, registry, network and DNS events', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011304',
    v_course_id,
    'db000000-0000-4000-8000-000000000113',
    'm13-l4-persistence-indicators-and-benign-administration',
    'Module 13 · Lesson 4: Persistence indicators and benign administration',
    'Hands-on incident response lesson covering Persistence indicators and benign administration. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'CbK9m1MYz6c',
    35,
    4,
    ARRAY['Explain persistence indicators and benign administration in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-13', 'windows']::TEXT[],
    ARRAY['Incident investigation: Persistence indicators and benign administration', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011305',
    v_course_id,
    'db000000-0000-4000-8000-000000000113',
    'm13-l5-remote-isolation-decisions-require-authorization',
    'Module 13 · Lesson 5: Remote isolation decisions require authorization',
    'Hands-on incident response lesson covering Remote isolation decisions require authorization. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'CbK9m1MYz6c',
    35,
    5,
    ARRAY['Explain remote isolation decisions require authorization in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-13', 'windows']::TEXT[],
    ARRAY['Incident investigation: Remote isolation decisions require authorization', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011401',
    v_course_id,
    'db000000-0000-4000-8000-000000000114',
    'm14-l1-sender-authentication-and-email-headers',
    'Module 14 · Lesson 1: Sender, authentication and email headers',
    'Hands-on incident response lesson covering Sender, authentication and email headers. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'C6t5Db-kSiQ',
    35,
    1,
    ARRAY['Explain sender, authentication and email headers in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-14', 'email-security']::TEXT[],
    ARRAY['Incident investigation: Sender, authentication and email headers', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011402',
    v_course_id,
    'db000000-0000-4000-8000-000000000114',
    'm14-l2-links-redirects-attachment-metadata',
    'Module 14 · Lesson 2: Links, redirects, attachment metadata',
    'Hands-on incident response lesson covering Links, redirects, attachment metadata. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'C6t5Db-kSiQ',
    35,
    2,
    ARRAY['Explain links, redirects, attachment metadata in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-14', 'email-security']::TEXT[],
    ARRAY['Incident investigation: Links, redirects, attachment metadata', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011403',
    v_course_id,
    'db000000-0000-4000-8000-000000000114',
    'm14-l3-safe-url-analysis-and-reputation-limits',
    'Module 14 · Lesson 3: Safe URL analysis and reputation limits',
    'Hands-on incident response lesson covering Safe URL analysis and reputation limits. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    3,
    ARRAY['Explain safe url analysis and reputation limits in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-14', 'email-security']::TEXT[],
    ARRAY['Incident investigation: Safe URL analysis and reputation limits', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011404',
    v_course_id,
    'db000000-0000-4000-8000-000000000114',
    'm14-l4-account-risk-and-mailbox-search-scope',
    'Module 14 · Lesson 4: Account risk and mailbox search scope',
    'Hands-on incident response lesson covering Account risk and mailbox search scope. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    4,
    ARRAY['Explain account risk and mailbox search scope in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-14', 'email-security']::TEXT[],
    ARRAY['Incident investigation: Account risk and mailbox search scope', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011405',
    v_course_id,
    'db000000-0000-4000-8000-000000000114',
    'm14-l5-user-notification-and-containment-playbook',
    'Module 14 · Lesson 5: User notification and containment playbook',
    'Hands-on incident response lesson covering User notification and containment playbook. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    5,
    ARRAY['Explain user notification and containment playbook in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-14', 'email-security', 'containment']::TEXT[],
    ARRAY['Incident investigation: User notification and containment playbook', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011501',
    v_course_id,
    'db000000-0000-4000-8000-000000000115',
    'm15-l1-sign-in-anomalies-and-impossible-travel-pitfalls',
    'Module 15 · Lesson 1: Sign-in anomalies and impossible-travel pitfalls',
    'Hands-on incident response lesson covering Sign-in anomalies and impossible-travel pitfalls. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5J1qLKbXGBo',
    35,
    1,
    ARRAY['Explain sign-in anomalies and impossible-travel pitfalls in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-15']::TEXT[],
    ARRAY['Incident investigation: Sign-in anomalies and impossible-travel pitfalls', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011502',
    v_course_id,
    'db000000-0000-4000-8000-000000000115',
    'm15-l2-mfa-and-session-security-concepts',
    'Module 15 · Lesson 2: MFA and session security concepts',
    'Hands-on incident response lesson covering MFA and session security concepts. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5J1qLKbXGBo',
    35,
    2,
    ARRAY['Explain mfa and session security concepts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-15']::TEXT[],
    ARRAY['Incident investigation: MFA and session security concepts', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011503',
    v_course_id,
    'db000000-0000-4000-8000-000000000115',
    'm15-l3-inbox-rules-app-consent-and-forwarding-evidence',
    'Module 15 · Lesson 3: Inbox rules, app consent and forwarding evidence',
    'Hands-on incident response lesson covering Inbox rules, app consent and forwarding evidence. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'C6t5Db-kSiQ',
    35,
    3,
    ARRAY['Explain inbox rules, app consent and forwarding evidence in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-15']::TEXT[],
    ARRAY['Incident investigation: Inbox rules, app consent and forwarding evidence', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011504',
    v_course_id,
    'db000000-0000-4000-8000-000000000115',
    'm15-l4-privilege-changes-and-lateral-identity-impact',
    'Module 15 · Lesson 4: Privilege changes and lateral identity impact',
    'Hands-on incident response lesson covering Privilege changes and lateral identity impact. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'C6t5Db-kSiQ',
    35,
    4,
    ARRAY['Explain privilege changes and lateral identity impact in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-15']::TEXT[],
    ARRAY['Incident investigation: Privilege changes and lateral identity impact', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011505',
    v_course_id,
    'db000000-0000-4000-8000-000000000115',
    'm15-l5-revocation-reset-approvals-and-communications',
    'Module 15 · Lesson 5: Revocation/reset approvals and communications',
    'Hands-on incident response lesson covering Revocation/reset approvals and communications. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'C6t5Db-kSiQ',
    35,
    5,
    ARRAY['Explain revocation/reset approvals and communications in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-15']::TEXT[],
    ARRAY['Incident investigation: Revocation/reset approvals and communications', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011601',
    v_course_id,
    'db000000-0000-4000-8000-000000000116',
    'm16-l1-pcap-integrity-and-extraction-safety',
    'Module 16 · Lesson 1: PCAP integrity and extraction safety',
    'Hands-on incident response lesson covering PCAP integrity and extraction safety. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ygtTDz3X8BQ',
    35,
    1,
    ARRAY['Explain pcap integrity and extraction safety in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-16', 'network-security']::TEXT[],
    ARRAY['Incident investigation: PCAP integrity and extraction safety', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011602',
    v_course_id,
    'db000000-0000-4000-8000-000000000116',
    'm16-l2-display-filters-and-stream-reconstruction',
    'Module 16 · Lesson 2: Display filters and stream reconstruction',
    'Hands-on incident response lesson covering Display filters and stream reconstruction. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ygtTDz3X8BQ',
    35,
    2,
    ARRAY['Explain display filters and stream reconstruction in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-16', 'network-security']::TEXT[],
    ARRAY['Incident investigation: Display filters and stream reconstruction', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011603',
    v_course_id,
    'db000000-0000-4000-8000-000000000116',
    'm16-l3-dns-tls-metadata-http-and-smb',
    'Module 16 · Lesson 3: DNS, TLS metadata, HTTP and SMB',
    'Hands-on incident response lesson covering DNS, TLS metadata, HTTP and SMB. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    3,
    ARRAY['Explain dns, tls metadata, http and smb in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-16', 'network-security']::TEXT[],
    ARRAY['Incident investigation: DNS, TLS metadata, HTTP and SMB', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011604',
    v_course_id,
    'db000000-0000-4000-8000-000000000116',
    'm16-l4-beaconing-patterns-and-timing-limits',
    'Module 16 · Lesson 4: Beaconing patterns and timing limits',
    'Hands-on incident response lesson covering Beaconing patterns and timing limits. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    4,
    ARRAY['Explain beaconing patterns and timing limits in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-16', 'network-security']::TEXT[],
    ARRAY['Incident investigation: Beaconing patterns and timing limits', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011605',
    v_course_id,
    'db000000-0000-4000-8000-000000000116',
    'm16-l5-network-evidence-and-endpoint-correlation',
    'Module 16 · Lesson 5: Network evidence and endpoint correlation',
    'Hands-on incident response lesson covering Network evidence and endpoint correlation. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'W7I-2Nv71PY',
    35,
    5,
    ARRAY['Explain network evidence and endpoint correlation in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-16', 'network-security']::TEXT[],
    ARRAY['Incident investigation: Network evidence and endpoint correlation', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011701',
    v_course_id,
    'db000000-0000-4000-8000-000000000117',
    'm17-l1-prefetch-amcache-shimcache-overview',
    'Module 17 · Lesson 1: Prefetch, Amcache, ShimCache overview',
    'Hands-on incident response lesson covering Prefetch, Amcache, ShimCache overview. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'VYROU-ZwZX8',
    35,
    1,
    ARRAY['Explain prefetch, amcache, shimcache overview in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-17', 'windows']::TEXT[],
    ARRAY['Incident investigation: Prefetch, Amcache, ShimCache overview', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011702',
    v_course_id,
    'db000000-0000-4000-8000-000000000117',
    'm17-l2-lnk-jump-lists-and-user-activity',
    'Module 17 · Lesson 2: LNK, Jump Lists and user activity',
    'Hands-on incident response lesson covering LNK, Jump Lists and user activity. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'VYROU-ZwZX8',
    35,
    2,
    ARRAY['Explain lnk, jump lists and user activity in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-17', 'windows']::TEXT[],
    ARRAY['Incident investigation: LNK, Jump Lists and user activity', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011703',
    v_course_id,
    'db000000-0000-4000-8000-000000000117',
    'm17-l3-registry-persistence-and-startup-locations',
    'Module 17 · Lesson 3: Registry persistence and startup locations',
    'Hands-on incident response lesson covering Registry persistence and startup locations. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5FVjQhjj80s',
    35,
    3,
    ARRAY['Explain registry persistence and startup locations in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-17', 'windows']::TEXT[],
    ARRAY['Incident investigation: Registry persistence and startup locations', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011704',
    v_course_id,
    'db000000-0000-4000-8000-000000000117',
    'm17-l4-event-logs-sysmon-and-chronology',
    'Module 17 · Lesson 4: Event logs, Sysmon and chronology',
    'Hands-on incident response lesson covering Event logs, Sysmon and chronology. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5FVjQhjj80s',
    35,
    4,
    ARRAY['Explain event logs, sysmon and chronology in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-17', 'windows']::TEXT[],
    ARRAY['Incident investigation: Event logs, Sysmon and chronology', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011705',
    v_course_id,
    'db000000-0000-4000-8000-000000000117',
    'm17-l5-artifact-interpretation-caveats',
    'Module 17 · Lesson 5: Artifact interpretation caveats',
    'Hands-on incident response lesson covering Artifact interpretation caveats. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5FVjQhjj80s',
    35,
    5,
    ARRAY['Explain artifact interpretation caveats in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-17', 'windows']::TEXT[],
    ARRAY['Incident investigation: Artifact interpretation caveats', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011801',
    v_course_id,
    'db000000-0000-4000-8000-000000000118',
    'm18-l1-forensic-copy-versus-working-copy',
    'Module 18 · Lesson 1: Forensic copy versus working copy',
    'Hands-on incident response lesson covering Forensic copy versus working copy. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'gWclBdzBzDM',
    35,
    1,
    ARRAY['Explain forensic copy versus working copy in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-18', 'disk-forensics']::TEXT[],
    ARRAY['Incident investigation: Forensic copy versus working copy', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011802',
    v_course_id,
    'db000000-0000-4000-8000-000000000118',
    'm18-l2-hash-verification-write-blockers-and-chain-of-custody',
    'Module 18 · Lesson 2: Hash verification, write blockers and chain of custody',
    'Hands-on incident response lesson covering Hash verification, write blockers and chain of custody. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'gWclBdzBzDM',
    35,
    2,
    ARRAY['Explain hash verification, write blockers and chain of custody in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-18', 'disk-forensics']::TEXT[],
    ARRAY['Incident investigation: Hash verification, write blockers and chain of custody', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011803',
    v_course_id,
    'db000000-0000-4000-8000-000000000118',
    'm18-l3-filesystem-metadata-and-deleted-file-caveats',
    'Module 18 · Lesson 3: Filesystem metadata and deleted-file caveats',
    'Hands-on incident response lesson covering Filesystem metadata and deleted-file caveats. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'TAqJ3LkVjyc',
    35,
    3,
    ARRAY['Explain filesystem metadata and deleted-file caveats in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-18', 'disk-forensics']::TEXT[],
    ARRAY['Incident investigation: Filesystem metadata and deleted-file caveats', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011804',
    v_course_id,
    'db000000-0000-4000-8000-000000000118',
    'm18-l4-autopsy-indexing-and-artifact-review',
    'Module 18 · Lesson 4: Autopsy indexing and artifact review',
    'Hands-on incident response lesson covering Autopsy indexing and artifact review. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'TAqJ3LkVjyc',
    35,
    4,
    ARRAY['Explain autopsy indexing and artifact review in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-18', 'disk-forensics']::TEXT[],
    ARRAY['Incident investigation: Autopsy indexing and artifact review', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011805',
    v_course_id,
    'db000000-0000-4000-8000-000000000118',
    'm18-l5-preserve-originals-and-record-transformations',
    'Module 18 · Lesson 5: Preserve originals and record transformations',
    'Hands-on incident response lesson covering Preserve originals and record transformations. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'TAqJ3LkVjyc',
    35,
    5,
    ARRAY['Explain preserve originals and record transformations in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-18', 'disk-forensics']::TEXT[],
    ARRAY['Incident investigation: Preserve originals and record transformations', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011901',
    v_course_id,
    'db000000-0000-4000-8000-000000000119',
    'm19-l1-volatile-evidence-and-collection-authorization',
    'Module 19 · Lesson 1: Volatile evidence and collection authorization',
    'Hands-on incident response lesson covering Volatile evidence and collection authorization. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'Uk3DEgY5Ue8',
    35,
    1,
    ARRAY['Explain volatile evidence and collection authorization in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-19', 'memory-forensics']::TEXT[],
    ARRAY['Incident investigation: Volatile evidence and collection authorization', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011902',
    v_course_id,
    'db000000-0000-4000-8000-000000000119',
    'm19-l2-process-listing-versus-hidden-process-indicators',
    'Module 19 · Lesson 2: Process listing versus hidden process indicators',
    'Hands-on incident response lesson covering Process listing versus hidden process indicators. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'Uk3DEgY5Ue8',
    35,
    2,
    ARRAY['Explain process listing versus hidden process indicators in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-19', 'memory-forensics']::TEXT[],
    ARRAY['Incident investigation: Process listing versus hidden process indicators', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011903',
    v_course_id,
    'db000000-0000-4000-8000-000000000119',
    'm19-l3-connections-dlls-and-command-lines',
    'Module 19 · Lesson 3: Connections, DLLs and command lines',
    'Hands-on incident response lesson covering Connections, DLLs and command lines. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'VYROU-ZwZX8',
    35,
    3,
    ARRAY['Explain connections, dlls and command lines in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-19', 'memory-forensics']::TEXT[],
    ARRAY['Incident investigation: Connections, DLLs and command lines', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011904',
    v_course_id,
    'db000000-0000-4000-8000-000000000119',
    'm19-l4-memory-artifacts-and-limitations',
    'Module 19 · Lesson 4: Memory artifacts and limitations',
    'Hands-on incident response lesson covering Memory artifacts and limitations. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'VYROU-ZwZX8',
    35,
    4,
    ARRAY['Explain memory artifacts and limitations in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-19', 'memory-forensics']::TEXT[],
    ARRAY['Incident investigation: Memory artifacts and limitations', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000011905',
    v_course_id,
    'db000000-0000-4000-8000-000000000119',
    'm19-l5-interpretation-and-corroboration-with-logs',
    'Module 19 · Lesson 5: Interpretation and corroboration with logs',
    'Hands-on incident response lesson covering Interpretation and corroboration with logs. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'VYROU-ZwZX8',
    35,
    5,
    ARRAY['Explain interpretation and corroboration with logs in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-19', 'memory-forensics']::TEXT[],
    ARRAY['Incident investigation: Interpretation and corroboration with logs', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012001',
    v_course_id,
    'db000000-0000-4000-8000-000000000120',
    'm20-l1-utc-normalization-and-clock-skew',
    'Module 20 · Lesson 1: UTC normalization and clock skew',
    'Hands-on incident response lesson covering UTC normalization and clock skew. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'TAqJ3LkVjyc',
    35,
    1,
    ARRAY['Explain utc normalization and clock skew in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-20']::TEXT[],
    ARRAY['Incident investigation: UTC normalization and clock skew', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012002',
    v_course_id,
    'db000000-0000-4000-8000-000000000120',
    'm20-l2-event-source-confidence-scoring',
    'Module 20 · Lesson 2: Event-source confidence scoring',
    'Hands-on incident response lesson covering Event-source confidence scoring. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'TAqJ3LkVjyc',
    35,
    2,
    ARRAY['Explain event-source confidence scoring in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-20']::TEXT[],
    ARRAY['Incident investigation: Event-source confidence scoring', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012003',
    v_course_id,
    'db000000-0000-4000-8000-000000000120',
    'm20-l3-causal-versus-chronological-relationships',
    'Module 20 · Lesson 3: Causal versus chronological relationships',
    'Hands-on incident response lesson covering Causal versus chronological relationships. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'gWclBdzBzDM',
    35,
    3,
    ARRAY['Explain causal versus chronological relationships in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-20']::TEXT[],
    ARRAY['Incident investigation: Causal versus chronological relationships', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012004',
    v_course_id,
    'db000000-0000-4000-8000-000000000120',
    'm20-l4-root-cause-hypothesis-and-counterevidence',
    'Module 20 · Lesson 4: Root-cause hypothesis and counterevidence',
    'Hands-on incident response lesson covering Root-cause hypothesis and counterevidence. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'gWclBdzBzDM',
    35,
    4,
    ARRAY['Explain root-cause hypothesis and counterevidence in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-20']::TEXT[],
    ARRAY['Incident investigation: Root-cause hypothesis and counterevidence', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012005',
    v_course_id,
    'db000000-0000-4000-8000-000000000120',
    'm20-l5-evidence-citations-and-defensible-reporting',
    'Module 20 · Lesson 5: Evidence citations and defensible reporting',
    'Hands-on incident response lesson covering Evidence citations and defensible reporting. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'gWclBdzBzDM',
    35,
    5,
    ARRAY['Explain evidence citations and defensible reporting in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-20']::TEXT[],
    ARRAY['Incident investigation: Evidence citations and defensible reporting', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012101',
    v_course_id,
    'db000000-0000-4000-8000-000000000121',
    'm21-l1-containment-goals-and-host-account-network-options',
    'Module 21 · Lesson 1: Containment goals and host/account/network options',
    'Hands-on incident response lesson covering Containment goals and host/account/network options. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'MNu4QhM3LJI',
    35,
    1,
    ARRAY['Explain containment goals and host/account/network options in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-21', 'network-security', 'containment']::TEXT[],
    ARRAY['Incident investigation: Containment goals and host/account/network options', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012102',
    v_course_id,
    'db000000-0000-4000-8000-000000000121',
    'm21-l2-emergency-versus-planned-containment',
    'Module 21 · Lesson 2: Emergency versus planned containment',
    'Hands-on incident response lesson covering Emergency versus planned containment. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'MNu4QhM3LJI',
    35,
    2,
    ARRAY['Explain emergency versus planned containment in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-21', 'containment']::TEXT[],
    ARRAY['Incident investigation: Emergency versus planned containment', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012103',
    v_course_id,
    'db000000-0000-4000-8000-000000000121',
    'm21-l3-operational-risks-and-asset-dependencies',
    'Module 21 · Lesson 3: Operational risks and asset dependencies',
    'Hands-on incident response lesson covering Operational risks and asset dependencies. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5J1qLKbXGBo',
    35,
    3,
    ARRAY['Explain operational risks and asset dependencies in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-21', 'containment']::TEXT[],
    ARRAY['Incident investigation: Operational risks and asset dependencies', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012104',
    v_course_id,
    'db000000-0000-4000-8000-000000000121',
    'm21-l4-evidence-preservation-before-change',
    'Module 21 · Lesson 4: Evidence preservation before change',
    'Hands-on incident response lesson covering Evidence preservation before change. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5J1qLKbXGBo',
    35,
    4,
    ARRAY['Explain evidence preservation before change in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-21', 'containment']::TEXT[],
    ARRAY['Incident investigation: Evidence preservation before change', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012105',
    v_course_id,
    'db000000-0000-4000-8000-000000000121',
    'm21-l5-reassessment-and-attacker-persistence',
    'Module 21 · Lesson 5: Reassessment and attacker persistence',
    'Hands-on incident response lesson covering Reassessment and attacker persistence. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5J1qLKbXGBo',
    35,
    5,
    ARRAY['Explain reassessment and attacker persistence in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-21', 'containment']::TEXT[],
    ARRAY['Incident investigation: Reassessment and attacker persistence', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012201',
    v_course_id,
    'db000000-0000-4000-8000-000000000122',
    'm22-l1-confirm-scope-before-eradication',
    'Module 22 · Lesson 1: Confirm scope before eradication',
    'Hands-on incident response lesson covering Confirm scope before eradication. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'WCr8etx7MxA',
    35,
    1,
    ARRAY['Explain confirm scope before eradication in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-22', 'containment']::TEXT[],
    ARRAY['Incident investigation: Confirm scope before eradication', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012202',
    v_course_id,
    'db000000-0000-4000-8000-000000000122',
    'm22-l2-remove-persistence-and-compromised-credentials',
    'Module 22 · Lesson 2: Remove persistence and compromised credentials',
    'Hands-on incident response lesson covering Remove persistence and compromised credentials. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'WCr8etx7MxA',
    35,
    2,
    ARRAY['Explain remove persistence and compromised credentials in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-22', 'containment']::TEXT[],
    ARRAY['Incident investigation: Remove persistence and compromised credentials', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012203',
    v_course_id,
    'db000000-0000-4000-8000-000000000122',
    'm22-l3-patch-configuration-remediation-as-appropriate',
    'Module 22 · Lesson 3: Patch/configuration remediation as appropriate',
    'Hands-on incident response lesson covering Patch/configuration remediation as appropriate. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '75y6fdUoIgE',
    35,
    3,
    ARRAY['Explain patch/configuration remediation as appropriate in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-22', 'containment']::TEXT[],
    ARRAY['Incident investigation: Patch/configuration remediation as appropriate', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012204',
    v_course_id,
    'db000000-0000-4000-8000-000000000122',
    'm22-l4-validate-clean-state-and-missed-footholds',
    'Module 22 · Lesson 4: Validate clean state and missed footholds',
    'Hands-on incident response lesson covering Validate clean state and missed footholds. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '75y6fdUoIgE',
    35,
    4,
    ARRAY['Explain validate clean state and missed footholds in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-22', 'containment']::TEXT[],
    ARRAY['Incident investigation: Validate clean state and missed footholds', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012205',
    v_course_id,
    'db000000-0000-4000-8000-000000000122',
    'm22-l5-avoid-premature-closure',
    'Module 22 · Lesson 5: Avoid premature closure',
    'Hands-on incident response lesson covering Avoid premature closure. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '75y6fdUoIgE',
    35,
    5,
    ARRAY['Explain avoid premature closure in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-22', 'containment']::TEXT[],
    ARRAY['Incident investigation: Avoid premature closure', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012301',
    v_course_id,
    'db000000-0000-4000-8000-000000000123',
    'm23-l1-known-good-restore-points-and-trusted-images',
    'Module 23 · Lesson 1: Known-good restore points and trusted images',
    'Hands-on incident response lesson covering Known-good restore points and trusted images. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'WCr8etx7MxA',
    35,
    1,
    ARRAY['Explain known-good restore points and trusted images in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-23', 'containment']::TEXT[],
    ARRAY['Incident investigation: Known-good restore points and trusted images', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012302',
    v_course_id,
    'db000000-0000-4000-8000-000000000123',
    'm23-l2-business-acceptance-and-staged-return',
    'Module 23 · Lesson 2: Business acceptance and staged return',
    'Hands-on incident response lesson covering Business acceptance and staged return. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'WCr8etx7MxA',
    35,
    2,
    ARRAY['Explain business acceptance and staged return in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-23', 'containment']::TEXT[],
    ARRAY['Incident investigation: Business acceptance and staged return', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012303',
    v_course_id,
    'db000000-0000-4000-8000-000000000123',
    'm23-l3-health-security-validation-and-dependency-checks',
    'Module 23 · Lesson 3: Health/security validation and dependency checks',
    'Hands-on incident response lesson covering Health/security validation and dependency checks. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ZORnotWe42A',
    35,
    3,
    ARRAY['Explain health/security validation and dependency checks in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-23', 'containment']::TEXT[],
    ARRAY['Incident investigation: Health/security validation and dependency checks', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012304',
    v_course_id,
    'db000000-0000-4000-8000-000000000123',
    'm23-l4-reinfection-monitoring-and-rollback',
    'Module 23 · Lesson 4: Reinfection monitoring and rollback',
    'Hands-on incident response lesson covering Reinfection monitoring and rollback. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ZORnotWe42A',
    35,
    4,
    ARRAY['Explain reinfection monitoring and rollback in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-23', 'containment']::TEXT[],
    ARRAY['Incident investigation: Reinfection monitoring and rollback', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012305',
    v_course_id,
    'db000000-0000-4000-8000-000000000123',
    'm23-l5-recovery-communication-and-documentation',
    'Module 23 · Lesson 5: Recovery communication and documentation',
    'Hands-on incident response lesson covering Recovery communication and documentation. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ZORnotWe42A',
    35,
    5,
    ARRAY['Explain recovery communication and documentation in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-23', 'containment']::TEXT[],
    ARRAY['Incident investigation: Recovery communication and documentation', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012401',
    v_course_id,
    'db000000-0000-4000-8000-000000000124',
    'm24-l1-recognizing-encryption-extortion-signals',
    'Module 24 · Lesson 1: Recognizing encryption/extortion signals',
    'Hands-on incident response lesson covering Recognizing encryption/extortion signals. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'MNu4QhM3LJI',
    35,
    1,
    ARRAY['Explain recognizing encryption/extortion signals in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-24', 'ransomware']::TEXT[],
    ARRAY['Incident investigation: Recognizing encryption/extortion signals', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012402',
    v_course_id,
    'db000000-0000-4000-8000-000000000124',
    'm24-l2-crisis-roles-isolation-strategy-and-legal-coordination',
    'Module 24 · Lesson 2: Crisis roles, isolation strategy and legal coordination',
    'Hands-on incident response lesson covering Crisis roles, isolation strategy and legal coordination. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'MNu4QhM3LJI',
    35,
    2,
    ARRAY['Explain crisis roles, isolation strategy and legal coordination in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-24', 'ransomware']::TEXT[],
    ARRAY['Incident investigation: Crisis roles, isolation strategy and legal coordination', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012403',
    v_course_id,
    'db000000-0000-4000-8000-000000000124',
    'm24-l3-impact-estimation-scoping-and-backups',
    'Module 24 · Lesson 3: Impact estimation, scoping and backups',
    'Hands-on incident response lesson covering Impact estimation, scoping and backups. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'WCr8etx7MxA',
    35,
    3,
    ARRAY['Explain impact estimation, scoping and backups in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-24', 'ransomware']::TEXT[],
    ARRAY['Incident investigation: Impact estimation, scoping and backups', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012404',
    v_course_id,
    'db000000-0000-4000-8000-000000000124',
    'm24-l4-recovery-prioritization-and-stakeholder-updates',
    'Module 24 · Lesson 4: Recovery prioritization and stakeholder updates',
    'Hands-on incident response lesson covering Recovery prioritization and stakeholder updates. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'WCr8etx7MxA',
    35,
    4,
    ARRAY['Explain recovery prioritization and stakeholder updates in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-24', 'ransomware', 'containment']::TEXT[],
    ARRAY['Incident investigation: Recovery prioritization and stakeholder updates', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012405',
    v_course_id,
    'db000000-0000-4000-8000-000000000124',
    'm24-l5-evidence-after-action-and-detection-improvements',
    'Module 24 · Lesson 5: Evidence, after-action and detection improvements',
    'Hands-on incident response lesson covering Evidence, after-action and detection improvements. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'WCr8etx7MxA',
    35,
    5,
    ARRAY['Explain evidence, after-action and detection improvements in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-24', 'ransomware']::TEXT[],
    ARRAY['Incident investigation: Evidence, after-action and detection improvements', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012501',
    v_course_id,
    'db000000-0000-4000-8000-000000000125',
    'm25-l1-exfiltration-indications-and-normal-transfers',
    'Module 25 · Lesson 1: Exfiltration indications and normal transfers',
    'Hands-on incident response lesson covering Exfiltration indications and normal transfers. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'niuf8nGTzBw',
    35,
    1,
    ARRAY['Explain exfiltration indications and normal transfers in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-25']::TEXT[],
    ARRAY['Incident investigation: Exfiltration indications and normal transfers', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012502',
    v_course_id,
    'db000000-0000-4000-8000-000000000125',
    'm25-l2-network-identity-dlp-and-cloud-logs',
    'Module 25 · Lesson 2: Network, identity, DLP and cloud logs',
    'Hands-on incident response lesson covering Network, identity, DLP and cloud logs. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'niuf8nGTzBw',
    35,
    2,
    ARRAY['Explain network, identity, dlp and cloud logs in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-25', 'network-security', 'cloud-security']::TEXT[],
    ARRAY['Incident investigation: Network, identity, DLP and cloud logs', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012503',
    v_course_id,
    'db000000-0000-4000-8000-000000000125',
    'm25-l3-data-sensitivity-and-impact-scoping',
    'Module 25 · Lesson 3: Data sensitivity and impact scoping',
    'Hands-on incident response lesson covering Data sensitivity and impact scoping. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ygtTDz3X8BQ',
    35,
    3,
    ARRAY['Explain data sensitivity and impact scoping in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-25']::TEXT[],
    ARRAY['Incident investigation: Data sensitivity and impact scoping', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012504',
    v_course_id,
    'db000000-0000-4000-8000-000000000125',
    'm25-l4-vendor-legal-privacy-and-leadership-workflows',
    'Module 25 · Lesson 4: Vendor, legal/privacy and leadership workflows',
    'Hands-on incident response lesson covering Vendor, legal/privacy and leadership workflows. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ygtTDz3X8BQ',
    35,
    4,
    ARRAY['Explain vendor, legal/privacy and leadership workflows in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-25']::TEXT[],
    ARRAY['Incident investigation: Vendor, legal/privacy and leadership workflows', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012505',
    v_course_id,
    'db000000-0000-4000-8000-000000000125',
    'm25-l5-preservation-and-uncertainty-when-content-visibility-is-missing',
    'Module 25 · Lesson 5: Preservation and uncertainty when content visibility is missing',
    'Hands-on incident response lesson covering Preservation and uncertainty when content visibility is missing. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ygtTDz3X8BQ',
    35,
    5,
    ARRAY['Explain preservation and uncertainty when content visibility is missing in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-25']::TEXT[],
    ARRAY['Incident investigation: Preservation and uncertainty when content visibility is missing', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012601',
    v_course_id,
    'db000000-0000-4000-8000-000000000126',
    'm26-l1-shared-responsibility-and-blast-radius',
    'Module 26 · Lesson 1: Shared responsibility and blast radius',
    'Hands-on incident response lesson covering Shared responsibility and blast radius. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'z2oqdFV1S8Y',
    35,
    1,
    ARRAY['Explain shared responsibility and blast radius in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-26', 'cloud-security']::TEXT[],
    ARRAY['Incident investigation: Shared responsibility and blast radius', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012602',
    v_course_id,
    'db000000-0000-4000-8000-000000000126',
    'm26-l2-cloudtrail-guardduty-config-log-roles',
    'Module 26 · Lesson 2: CloudTrail/GuardDuty/Config log roles',
    'Hands-on incident response lesson covering CloudTrail/GuardDuty/Config log roles. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'z2oqdFV1S8Y',
    35,
    2,
    ARRAY['Explain cloudtrail/guardduty/config log roles in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-26', 'cloud-security']::TEXT[],
    ARRAY['Incident investigation: CloudTrail/GuardDuty/Config log roles', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012603',
    v_course_id,
    'db000000-0000-4000-8000-000000000126',
    'm26-l3-iam-access-key-and-role-misuse-indicators',
    'Module 26 · Lesson 3: IAM access-key and role misuse indicators',
    'Hands-on incident response lesson covering IAM access-key and role misuse indicators. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'jjXdwzEaMwo',
    35,
    3,
    ARRAY['Explain iam access-key and role misuse indicators in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-26', 'cloud-security']::TEXT[],
    ARRAY['Incident investigation: IAM access-key and role misuse indicators', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012604',
    v_course_id,
    'db000000-0000-4000-8000-000000000126',
    'm26-l4-snapshot-and-isolation-concepts',
    'Module 26 · Lesson 4: Snapshot and isolation concepts',
    'Hands-on incident response lesson covering Snapshot and isolation concepts. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'jjXdwzEaMwo',
    35,
    4,
    ARRAY['Explain snapshot and isolation concepts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-26', 'cloud-security']::TEXT[],
    ARRAY['Incident investigation: Snapshot and isolation concepts', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012605',
    v_course_id,
    'db000000-0000-4000-8000-000000000126',
    'm26-l5-multi-account-coordination-and-cost-awareness',
    'Module 26 · Lesson 5: Multi-account coordination and cost awareness',
    'Hands-on incident response lesson covering Multi-account coordination and cost awareness. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'jjXdwzEaMwo',
    35,
    5,
    ARRAY['Explain multi-account coordination and cost awareness in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-26', 'cloud-security']::TEXT[],
    ARRAY['Incident investigation: Multi-account coordination and cost awareness', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012701',
    v_course_id,
    'db000000-0000-4000-8000-000000000127',
    'm27-l1-entra-sign-ins-and-audit-trails',
    'Module 27 · Lesson 1: Entra sign-ins and audit trails',
    'Hands-on incident response lesson covering Entra sign-ins and audit trails. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5J1qLKbXGBo',
    35,
    1,
    ARRAY['Explain entra sign-ins and audit trails in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-27', 'cloud-security']::TEXT[],
    ARRAY['Incident investigation: Entra sign-ins and audit trails', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012702',
    v_course_id,
    'db000000-0000-4000-8000-000000000127',
    'm27-l2-microsoft-defender-xdr-and-sentinel-incident-context',
    'Module 27 · Lesson 2: Microsoft Defender XDR and Sentinel incident context',
    'Hands-on incident response lesson covering Microsoft Defender XDR and Sentinel incident context. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '5J1qLKbXGBo',
    35,
    2,
    ARRAY['Explain microsoft defender xdr and sentinel incident context in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-27', 'cloud-security', 'siem']::TEXT[],
    ARRAY['Incident investigation: Microsoft Defender XDR and Sentinel incident context', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012703',
    v_course_id,
    'db000000-0000-4000-8000-000000000127',
    'm27-l3-mailbox-and-application-access-investigations',
    'Module 27 · Lesson 3: Mailbox and application access investigations',
    'Hands-on incident response lesson covering Mailbox and application access investigations. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'pgcMsv39090',
    35,
    3,
    ARRAY['Explain mailbox and application access investigations in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-27', 'cloud-security']::TEXT[],
    ARRAY['Incident investigation: Mailbox and application access investigations', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012704',
    v_course_id,
    'db000000-0000-4000-8000-000000000127',
    'm27-l4-cross-service-evidence-retention',
    'Module 27 · Lesson 4: Cross-service evidence retention',
    'Hands-on incident response lesson covering Cross-service evidence retention. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'pgcMsv39090',
    35,
    4,
    ARRAY['Explain cross-service evidence retention in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-27', 'cloud-security']::TEXT[],
    ARRAY['Incident investigation: Cross-service evidence retention', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012705',
    v_course_id,
    'db000000-0000-4000-8000-000000000127',
    'm27-l5-tenant-level-containment-approvals',
    'Module 27 · Lesson 5: Tenant-level containment approvals',
    'Hands-on incident response lesson covering Tenant-level containment approvals. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'pgcMsv39090',
    35,
    5,
    ARRAY['Explain tenant-level containment approvals in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-27', 'cloud-security', 'containment']::TEXT[],
    ARRAY['Incident investigation: Tenant-level containment approvals', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012801',
    v_course_id,
    'db000000-0000-4000-8000-000000000128',
    'm28-l1-endpoint-fleet-visibility-and-authorization',
    'Module 28 · Lesson 1: Endpoint fleet visibility and authorization',
    'Hands-on incident response lesson covering Endpoint fleet visibility and authorization. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'EA40rztSOd4',
    35,
    1,
    ARRAY['Explain endpoint fleet visibility and authorization in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-28']::TEXT[],
    ARRAY['Incident investigation: Endpoint fleet visibility and authorization', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012802',
    v_course_id,
    'db000000-0000-4000-8000-000000000128',
    'm28-l2-targeted-collection-versus-broad-hunts',
    'Module 28 · Lesson 2: Targeted collection versus broad hunts',
    'Hands-on incident response lesson covering Targeted collection versus broad hunts. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'EA40rztSOd4',
    35,
    2,
    ARRAY['Explain targeted collection versus broad hunts in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-28']::TEXT[],
    ARRAY['Incident investigation: Targeted collection versus broad hunts', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012803',
    v_course_id,
    'db000000-0000-4000-8000-000000000128',
    'm28-l3-artifact-selection-vql-and-data-minimization',
    'Module 28 · Lesson 3: Artifact selection, VQL and data minimization',
    'Hands-on incident response lesson covering Artifact selection, VQL and data minimization. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '75y6fdUoIgE',
    35,
    3,
    ARRAY['Explain artifact selection, vql and data minimization in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-28']::TEXT[],
    ARRAY['Incident investigation: Artifact selection, VQL and data minimization', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012804',
    v_course_id,
    'db000000-0000-4000-8000-000000000128',
    'm28-l4-hypothesis-driven-cross-host-searches',
    'Module 28 · Lesson 4: Hypothesis-driven cross-host searches',
    'Hands-on incident response lesson covering Hypothesis-driven cross-host searches. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '75y6fdUoIgE',
    35,
    4,
    ARRAY['Explain hypothesis-driven cross-host searches in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-28']::TEXT[],
    ARRAY['Incident investigation: Hypothesis-driven cross-host searches', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012805',
    v_course_id,
    'db000000-0000-4000-8000-000000000128',
    'm28-l5-preservation-logging-and-response-review',
    'Module 28 · Lesson 5: Preservation, logging and response review',
    'Hands-on incident response lesson covering Preservation, logging and response review. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '75y6fdUoIgE',
    35,
    5,
    ARRAY['Explain preservation, logging and response review in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-28']::TEXT[],
    ARRAY['Incident investigation: Preservation, logging and response review', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012901',
    v_course_id,
    'db000000-0000-4000-8000-000000000129',
    'm29-l1-playbook-trigger-inputs-and-guardrails',
    'Module 29 · Lesson 1: Playbook trigger, inputs and guardrails',
    'Hands-on incident response lesson covering Playbook trigger, inputs and guardrails. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'pgcMsv39090',
    35,
    1,
    ARRAY['Explain playbook trigger, inputs and guardrails in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-29']::TEXT[],
    ARRAY['Incident investigation: Playbook trigger, inputs and guardrails', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012902',
    v_course_id,
    'db000000-0000-4000-8000-000000000129',
    'm29-l2-automate-enrichment-before-destructive-actions',
    'Module 29 · Lesson 2: Automate enrichment before destructive actions',
    'Hands-on incident response lesson covering Automate enrichment before destructive actions. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'pgcMsv39090',
    35,
    2,
    ARRAY['Explain automate enrichment before destructive actions in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-29']::TEXT[],
    ARRAY['Incident investigation: Automate enrichment before destructive actions', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012903',
    v_course_id,
    'db000000-0000-4000-8000-000000000129',
    'm29-l3-sigma-rule-structure-and-tuning',
    'Module 29 · Lesson 3: Sigma rule structure and tuning',
    'Hands-on incident response lesson covering Sigma rule structure and tuning. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '6AVBPsTWd5A',
    35,
    3,
    ARRAY['Explain sigma rule structure and tuning in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-29']::TEXT[],
    ARRAY['Incident investigation: Sigma rule structure and tuning', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012904',
    v_course_id,
    'db000000-0000-4000-8000-000000000129',
    'm29-l4-human-approval-auditability-and-rollback',
    'Module 29 · Lesson 4: Human approval, auditability and rollback',
    'Hands-on incident response lesson covering Human approval, auditability and rollback. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '6AVBPsTWd5A',
    35,
    4,
    ARRAY['Explain human approval, auditability and rollback in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-29']::TEXT[],
    ARRAY['Incident investigation: Human approval, auditability and rollback', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000012905',
    v_course_id,
    'db000000-0000-4000-8000-000000000129',
    'm29-l5-metrics-false-positive-rate-and-response-quality',
    'Module 29 · Lesson 5: Metrics, false-positive rate and response quality',
    'Hands-on incident response lesson covering Metrics, false-positive rate and response quality. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '6AVBPsTWd5A',
    35,
    5,
    ARRAY['Explain metrics, false-positive rate and response quality in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-29']::TEXT[],
    ARRAY['Incident investigation: Metrics, false-positive rate and response quality', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000013001',
    v_course_id,
    'db000000-0000-4000-8000-000000000130',
    'm30-l1-receive-alerts-and-declare-investigative-scope',
    'Module 30 · Lesson 1: Receive alerts and declare investigative scope',
    'Hands-on incident response lesson covering Receive alerts and declare investigative scope. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '75y6fdUoIgE',
    35,
    1,
    ARRAY['Explain receive alerts and declare investigative scope in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-30']::TEXT[],
    ARRAY['Incident investigation: Receive alerts and declare investigative scope', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000013002',
    v_course_id,
    'db000000-0000-4000-8000-000000000130',
    'm30-l2-triage-multiple-telemetry-sources-and-maintain-case-notes',
    'Module 30 · Lesson 2: Triage multiple telemetry sources and maintain case notes',
    'Hands-on incident response lesson covering Triage multiple telemetry sources and maintain case notes. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    '75y6fdUoIgE',
    35,
    2,
    ARRAY['Explain triage multiple telemetry sources and maintain case notes in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-30']::TEXT[],
    ARRAY['Incident investigation: Triage multiple telemetry sources and maintain case notes', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000013003',
    v_course_id,
    'db000000-0000-4000-8000-000000000130',
    'm30-l3-develop-timeline-escalation-and-containment-options',
    'Module 30 · Lesson 3: Develop timeline, escalation and containment options',
    'Hands-on incident response lesson covering Develop timeline, escalation and containment options. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ZORnotWe42A',
    35,
    3,
    ARRAY['Explain develop timeline, escalation and containment options in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-30', 'containment']::TEXT[],
    ARRAY['Incident investigation: Develop timeline, escalation and containment options', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000013004',
    v_course_id,
    'db000000-0000-4000-8000-000000000130',
    'm30-l4-plan-eradication-recovery-and-validation',
    'Module 30 · Lesson 4: Plan eradication, recovery and validation',
    'Hands-on incident response lesson covering Plan eradication, recovery and validation. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ZORnotWe42A',
    35,
    4,
    ARRAY['Explain plan eradication, recovery and validation in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-30', 'containment']::TEXT[],
    ARRAY['Incident investigation: Plan eradication, recovery and validation', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'db000000-0000-4000-8000-000000013005',
    v_course_id,
    'db000000-0000-4000-8000-000000000130',
    'm30-l5-report-lessons-learned-and-brief-leadership',
    'Module 30 · Lesson 5: Report, lessons learned and brief leadership',
    'Hands-on incident response lesson covering Report, lessons learned and brief leadership. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks.',
    'ZORnotWe42A',
    35,
    5,
    ARRAY['Explain report, lessons learned and brief leadership in a SOC/IR context, identify the evidence needed, state a realistic uncertainty, and document an appropriate next investigative step.', 'Distinguish factual observations from investigative inferences without overcalling compromise.', 'Formulate and document defensible escalation and containment recommendations.']::TEXT[],
    ARRAY['incident-response', 'soc-analyst', 'dfir', 'module-30']::TEXT[],
    ARRAY['Incident investigation: Report, lessons learned and brief leadership', 'Factual evidence normalization and chronological timeline construction', 'Defensive risk scoping and asset criticality evaluation', 'Reversible containment planning and authorization verification']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
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