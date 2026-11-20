-- =============================================================================
-- CYBERTUBE: SEED SIEM ZERO TO ADVANCED COMPLETE COURSE
-- =============================================================================
-- Description:
-- Idempotently seeds the 30-module SIEM Zero to Advanced course,
-- all 30 modules, and all 120 video lessons into the Supabase database.
-- =============================================================================

DO $$
DECLARE
  v_course_id CONSTANT UUID := 'da000000-0000-4000-8000-000000000001';
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
    'siem-zero-to-advanced',
    'SIEM for Cybersecurity: Zero to Advanced',
    'A 30-module, video-guided SIEM operations and detection engineering curriculum with Splunk and Microsoft Sentinel, 120 lessons, hands-on SOC labs, SPL, KQL, threat hunting, and an end-to-end capstone portfolio.',
    'A comprehensive, hands-on 30-module defensive cybersecurity curriculum designed for aspiring and practicing SOC L1/L2 analysts, threat hunters, and detection engineers. Master enterprise SIEM architecture across both Splunk and Microsoft Sentinel: raw log ingestion, parsing, normalization, and search; production SPL commands (stats, eval, timechart, rex, coalesce) and KQL syntax (where, summarize, project, join, make-series, ASIM); authentication anomalies and brute-force triage; DNS tunneling and rare domain analysis; web proxy and firewall flow correlation; ransomware and endpoint DFIR tracing; Splunk Enterprise Security risk-based alerting (RBA); Microsoft Sentinel data connectors, analytics rules, incident graphs, UEBA, and hunting notebooks; approval-aware SOAR playbooks; detection-as-code and Sigma rule lifecycles; SIEM ingestion health, performance optimization, and cloud cost management; culminating in an end-to-end cross-platform SOC capstone portfolio project.',
    'intermediate',
    '30 modules (148 hours)',
    4200,
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    'CyberTube SIEM Curators & Open SOC Community',
    'SIEM & SOC Detection Engineers',
    'Splunk, Microsoft Security Community, TryHackMe & Soft Mania',
    'published',
    ARRAY['siem', 'splunk', 'microsoft-sentinel', 'soc-analyst', 'kql', 'spl', 'detection-engineering', 'threat-hunting', 'incident-response', 'soar']::TEXT[],
    ARRAY['Basic understanding of operating system concepts (Windows and Linux logs)', 'Familiarity with foundational networking protocols (TCP/IP, DNS, HTTP)', 'Commitment to ethical defensive investigation and authorized lab telemetry']::TEXT[],
    ARRAY['Differentiate security telemetry, events, alerts, and incidents in a SOC operating model', 'Ingest, parse, normalize, and query diverse logs in Splunk and Microsoft Sentinel', 'Write production-grade SPL and KQL queries for triage, statistical analysis, and detection', 'Investigate authentication anomalies, credential spraying, DNS tunneling, web exploitation, and ransomware', 'Construct multi-source incident timelines and execute hypothesis-driven threat hunts', 'Map detections and investigative findings to the MITRE ATT&CK Enterprise matrix', 'Design risk-based alerting (RBA) models and ASIM-normalized analytics rules', 'Build, tune, and test detection rules with measured false-positive controls', 'Design safe, approval-aware SOAR playbooks and automation workflows', 'Complete an end-to-end cross-platform SOC capstone report in both SPL and KQL']::TEXT[],
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

  -- 2. Insert/Update 30 Modules
  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000101', v_course_id, 'Module 01 — SIEM Fundamentals and the SOC Mission', 'Foundation level track (Beginner). Estimated effort: 3 hours (video + guided practice, approximate). Outcome: Explain what a SIEM does and distinguish raw events, alerts, and incidents.', 1)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000102', v_course_id, 'Module 02 — Security Log Types and Event Anatomy', 'Foundation level track (Beginner). Estimated effort: 3 hours (video + guided practice, approximate). Outcome: Interpret timestamps, user, host, source IP, action and severity in sample records.', 2)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000103', v_course_id, 'Module 03 — SOC Alert Triage and Investigation Workflow', 'Foundation level track (Beginner). Estimated effort: 4 hours (video + guided practice, approximate). Outcome: Perform consistent evidence-first triage while avoiding unjustified severity claims.', 3)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000104', v_course_id, 'Module 04 — Windows Security and Sysmon Telemetry', 'Foundation level track (Beginner). Estimated effort: 4 hours (video + guided practice, approximate). Outcome: Identify useful Windows event IDs and explain enhanced endpoint event collection.', 4)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000105', v_course_id, 'Module 05 — Linux, DNS, Firewall and Web Logs for SIEM', 'Foundation level track (Beginner). Estimated effort: 4 hours (video + guided practice, approximate). Outcome: Read common Linux, DNS, network and web logs to identify investigation pivots.', 5)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000106', v_course_id, 'Module 06 — Install a Safe Splunk Learning Lab', 'Splunk level track (Beginner). Estimated effort: 4 hours (video + guided practice, approximate). Outcome: Deploy and validate a personal non-production Splunk instance for sample data.', 6)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000107', v_course_id, 'Module 07 — Splunk Ingestion, Indexes and Sourcetypes', 'Splunk level track (Beginner). Estimated effort: 4 hours (video + guided practice, approximate). Outcome: Ingest sample CSV/JSON logs accurately and validate timestamps, fields and counts.', 7)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000108', v_course_id, 'Module 08 — Splunk Search Interface and Basic SPL', 'Splunk level track (Beginner). Estimated effort: 4 hours (video + guided practice, approximate). Outcome: Use SPL to filter, transform and examine security events.', 8)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000109', v_course_id, 'Module 09 — SPL Aggregation, Eval and Time-Series Analysis', 'Splunk level track (Intermediate). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Identify patterns and baselines using SPL statistics and time windows.', 9)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000110', v_course_id, 'Module 10 — Field Extraction, Parsing and Normalization in Splunk', 'Splunk level track (Intermediate). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Build consistent fields for heterogeneous source logs.', 10)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000111', v_course_id, 'Module 11 — Enrichment, Lookups and Multi-Source Correlation', 'Splunk level track (Intermediate). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Connect related log sources using normalized keys and temporal context.', 11)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000112', v_course_id, 'Module 12 — Splunk Dashboards and SOC Reporting', 'Splunk level track (Intermediate). Estimated effort: 4 hours (video + guided practice, approximate). Outcome: Build analyst-facing dashboards without misleading visualizations.', 12)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000113', v_course_id, 'Module 13 — Splunk Alerting and Detection Rule Tuning', 'Splunk level track (Intermediate). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Turn a defensible investigation hypothesis into a tested alert.', 13)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000114', v_course_id, 'Module 14 — Investigate Credential Attacks with Splunk', 'Splunk level track (Intermediate). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Triage password spraying and brute-force hypotheses from event records.', 14)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000115', v_course_id, 'Module 15 — DNS, Proxy and Web Security Investigation', 'Splunk level track (Intermediate). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Analyze web telemetry to discover suspicious patterns without overcalling attacks.', 15)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000116', v_course_id, 'Module 16 — Endpoint and Ransomware Investigation Using Splunk', 'Splunk level track (Intermediate). Estimated effort: 6 hours (video + guided practice, approximate). Outcome: Trace a multi-event endpoint incident in passive logs and report the evidence.', 16)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000117', v_course_id, 'Module 17 — Splunk Enterprise Security and Risk-Based Alerting', 'Splunk level track (Intermediate). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Explain ES finding/risk concepts and simulate risk scoring in a base Splunk lab.', 17)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000118', v_course_id, 'Module 18 — Threat Hunting and Detection Engineering with SPL', 'Splunk level track (Intermediate). Estimated effort: 6 hours (video + guided practice, approximate). Outcome: Form and test a hypothesis-led hunt and turn findings into defensible detections.', 18)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000119', v_course_id, 'Module 19 — Microsoft Sentinel Foundations and Workspace Design', 'Sentinel level track (Intermediate). Estimated effort: 4 hours (video + guided practice, approximate). Outcome: Explain Sentinel architecture and safely plan a cloud SIEM without surprise costs.', 19)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000120', v_course_id, 'Module 20 — Sentinel Connectors: Windows, Linux, Syslog, Cloud', 'Sentinel level track (Intermediate). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Select and validate data connectors for defensive telemetry.', 20)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000121', v_course_id, 'Module 21 — KQL Basics for SOC Analysts', 'Sentinel level track (Intermediate). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Query security event tables with safe, correctly scoped KQL.', 21)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000122', v_course_id, 'Module 22 — Advanced KQL: Joins, JSON, Baselines and ASIM', 'Sentinel level track (Intermediate). Estimated effort: 6 hours (video + guided practice, approximate). Outcome: Combine data and engineer more reliable KQL detections.', 22)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000123', v_course_id, 'Module 23 — Sentinel Analytics Rules and Detection Validation', 'Sentinel level track (Intermediate). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Create a detection specification with measured false-positive controls.', 23)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000124', v_course_id, 'Module 24 — Sentinel Incident Investigation and SOC Handoff', 'Sentinel level track (Advanced). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Investigate an alert as a coherent multi-entity incident.', 24)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000125', v_course_id, 'Module 25 — Threat Intelligence, Watchlists and ASIM Enrichment', 'Sentinel level track (Advanced). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Apply external intelligence context carefully and avoid unsafe blanket blocking.', 25)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000126', v_course_id, 'Module 26 — Sentinel Dashboards, UEBA and Investigation Notebooks', 'Sentinel level track (Advanced). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Interpret SOC workbooks and behavioral anomaly findings with proper uncertainty.', 26)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000127', v_course_id, 'Module 27 — SOAR and Playbooks: Safe Response Automation', 'Advanced level track (Advanced). Estimated effort: 6 hours (video + guided practice, approximate). Outcome: Design approval-aware security orchestration without causing unintended impacts.', 27)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000128', v_course_id, 'Module 28 — Advanced Detection Engineering and SIEM Content Lifecycle', 'Advanced level track (Advanced). Estimated effort: 6 hours (video + guided practice, approximate). Outcome: Review detection rules as testable, versioned security content.', 28)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000129', v_course_id, 'Module 29 — SIEM Health, Performance, Cost and Advanced Integrations', 'Advanced level track (Advanced). Estimated effort: 5 hours (video + guided practice, approximate). Outcome: Manage SIEM reliability, query performance and operational cost.', 29)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('da000000-0000-4000-8000-000000000130', v_course_id, 'Module 30 — Splunk and Sentinel Cross-Platform Capstone', 'Capstone level track (Advanced). Estimated effort: 10 hours (video + guided practice, approximate). Outcome: Complete a documented SOC case in both SPL and KQL, demonstrating investigative competence.', 30)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  -- 3. Insert/Update 120 Lessons
  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010101',
    v_course_id,
    'da000000-0000-4000-8000-000000000101',
    'm01-l1-what-siem-collects-and-why',
    'Module 01 - Lesson 1: What SIEM collects and why',
    'Hands-on video-guided lesson exploring What SIEM collects and why. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'MtqFMe4zSpQ',
    35,
    1,
    ARRAY['Master core competencies for What SIEM collects and why.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-01']::TEXT[],
    ARRAY['Defensive operational triage: What SIEM collects and why', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010102',
    v_course_id,
    'da000000-0000-4000-8000-000000000101',
    'm01-l2-collection-parsing-search-detection-response',
    'Module 01 - Lesson 2: Collection > parsing > search > detection > response',
    'Hands-on video-guided lesson exploring Collection > parsing > search > detection > response. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'MtqFMe4zSpQ',
    35,
    2,
    ARRAY['Master core competencies for Collection > parsing > search > detection > response.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-01']::TEXT[],
    ARRAY['Defensive operational triage: Collection > parsing > search > detection > response', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010103',
    v_course_id,
    'da000000-0000-4000-8000-000000000101',
    'm01-l3-soc-l1-l2-l3-and-escalation',
    'Module 01 - Lesson 3: SOC L1/L2/L3 and escalation',
    'Hands-on video-guided lesson exploring SOC L1/L2/L3 and escalation. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'gbjbE15b8r4',
    35,
    3,
    ARRAY['Master core competencies for SOC L1/L2/L3 and escalation.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-01']::TEXT[],
    ARRAY['Defensive operational triage: SOC L1/L2/L3 and escalation', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010104',
    v_course_id,
    'da000000-0000-4000-8000-000000000101',
    'm01-l4-siem-versus-xdr-edr-and-soar',
    'Module 01 - Lesson 4: SIEM versus XDR, EDR and SOAR',
    'Hands-on video-guided lesson exploring SIEM versus XDR, EDR and SOAR. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'gbjbE15b8r4',
    35,
    4,
    ARRAY['Master core competencies for SIEM versus XDR, EDR and SOAR.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-01']::TEXT[],
    ARRAY['Defensive operational triage: SIEM versus XDR, EDR and SOAR', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010201',
    v_course_id,
    'da000000-0000-4000-8000-000000000102',
    'm02-l1-windows-linux-network-dns-and-proxy-event-sources',
    'Module 02 - Lesson 1: Windows, Linux, network, DNS and proxy event sources',
    'Hands-on video-guided lesson exploring Windows, Linux, network, DNS and proxy event sources. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    1,
    ARRAY['Master core competencies for Windows, Linux, network, DNS and proxy event sources.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-02']::TEXT[],
    ARRAY['Defensive operational triage: Windows, Linux, network, DNS and proxy event sources', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010202',
    v_course_id,
    'da000000-0000-4000-8000-000000000102',
    'm02-l2-fields-types-timestamps-and-time-zones',
    'Module 02 - Lesson 2: Fields, types, timestamps and time zones',
    'Hands-on video-guided lesson exploring Fields, types, timestamps and time zones. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    2,
    ARRAY['Master core competencies for Fields, types, timestamps and time zones.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-02']::TEXT[],
    ARRAY['Defensive operational triage: Fields, types, timestamps and time zones', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010203',
    v_course_id,
    'da000000-0000-4000-8000-000000000102',
    'm02-l3-authentication-success-failure-and-baselines',
    'Module 02 - Lesson 3: Authentication success/failure and baselines',
    'Hands-on video-guided lesson exploring Authentication success/failure and baselines. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'hOYpji940yw',
    35,
    3,
    ARRAY['Master core competencies for Authentication success/failure and baselines.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-02']::TEXT[],
    ARRAY['Defensive operational triage: Authentication success/failure and baselines', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010204',
    v_course_id,
    'da000000-0000-4000-8000-000000000102',
    'm02-l4-structured-json-csv-and-syslog-formats',
    'Module 02 - Lesson 4: Structured JSON, CSV and syslog formats',
    'Hands-on video-guided lesson exploring Structured JSON, CSV and syslog formats. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'hOYpji940yw',
    35,
    4,
    ARRAY['Master core competencies for Structured JSON, CSV and syslog formats.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-02']::TEXT[],
    ARRAY['Defensive operational triage: Structured JSON, CSV and syslog formats', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010301',
    v_course_id,
    'da000000-0000-4000-8000-000000000103',
    'm03-l1-alert-queue-and-slas',
    'Module 03 - Lesson 1: Alert queue and SLAs',
    'Hands-on video-guided lesson exploring Alert queue and SLAs. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'HloK6Ay4h1M',
    35,
    1,
    ARRAY['Master core competencies for Alert queue and SLAs.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-03']::TEXT[],
    ARRAY['Defensive operational triage: Alert queue and SLAs', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010302',
    v_course_id,
    'da000000-0000-4000-8000-000000000103',
    'm03-l2-true-positive-false-positive-versus-benign-positive',
    'Module 03 - Lesson 2: True positive/false positive versus benign positive',
    'Hands-on video-guided lesson exploring True positive/false positive versus benign positive. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'HloK6Ay4h1M',
    35,
    2,
    ARRAY['Master core competencies for True positive/false positive versus benign positive.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-03']::TEXT[],
    ARRAY['Defensive operational triage: True positive/false positive versus benign positive', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010303',
    v_course_id,
    'da000000-0000-4000-8000-000000000103',
    'm03-l3-scope-impact-confidence-and-timelines',
    'Module 03 - Lesson 3: Scope, impact, confidence and timelines',
    'Hands-on video-guided lesson exploring Scope, impact, confidence and timelines. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'NJlaqBaqahc',
    35,
    3,
    ARRAY['Master core competencies for Scope, impact, confidence and timelines.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-03']::TEXT[],
    ARRAY['Defensive operational triage: Scope, impact, confidence and timelines', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010304',
    v_course_id,
    'da000000-0000-4000-8000-000000000103',
    'm03-l4-escalation-note-taking-and-containment-authorization',
    'Module 03 - Lesson 4: Escalation, note-taking and containment authorization',
    'Hands-on video-guided lesson exploring Escalation, note-taking and containment authorization. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'NJlaqBaqahc',
    35,
    4,
    ARRAY['Master core competencies for Escalation, note-taking and containment authorization.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-03']::TEXT[],
    ARRAY['Defensive operational triage: Escalation, note-taking and containment authorization', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010401',
    v_course_id,
    'da000000-0000-4000-8000-000000000104',
    'm04-l1-windows-authentication-event-ids-4624-4625-4672',
    'Module 04 - Lesson 1: Windows authentication event IDs 4624, 4625, 4672',
    'Hands-on video-guided lesson exploring Windows authentication event IDs 4624, 4625, 4672. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'MvfhIydxFmw',
    35,
    1,
    ARRAY['Master core competencies for Windows authentication event IDs 4624, 4625, 4672.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-04']::TEXT[],
    ARRAY['Defensive operational triage: Windows authentication event IDs 4624, 4625, 4672', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010402',
    v_course_id,
    'da000000-0000-4000-8000-000000000104',
    'm04-l2-process-creation-4688-optional-command-line-logging',
    'Module 04 - Lesson 2: Process creation 4688; optional command-line logging',
    'Hands-on video-guided lesson exploring Process creation 4688; optional command-line logging. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'MvfhIydxFmw',
    35,
    2,
    ARRAY['Master core competencies for Process creation 4688; optional command-line logging.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-04']::TEXT[],
    ARRAY['Defensive operational triage: Process creation 4688; optional command-line logging', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010403',
    v_course_id,
    'da000000-0000-4000-8000-000000000104',
    'm04-l3-sysmon-process-and-network-telemetry',
    'Module 04 - Lesson 3: Sysmon process and network telemetry',
    'Hands-on video-guided lesson exploring Sysmon process and network telemetry. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'hOYpji940yw',
    35,
    3,
    ARRAY['Master core competencies for Sysmon process and network telemetry.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-04']::TEXT[],
    ARRAY['Defensive operational triage: Sysmon process and network telemetry', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010404',
    v_course_id,
    'da000000-0000-4000-8000-000000000104',
    'm04-l4-privacy-and-collection-volume-trade-offs',
    'Module 04 - Lesson 4: Privacy and collection-volume trade-offs',
    'Hands-on video-guided lesson exploring Privacy and collection-volume trade-offs. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'hOYpji940yw',
    35,
    4,
    ARRAY['Master core competencies for Privacy and collection-volume trade-offs.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-04']::TEXT[],
    ARRAY['Defensive operational triage: Privacy and collection-volume trade-offs', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010501',
    v_course_id,
    'da000000-0000-4000-8000-000000000105',
    'm05-l1-sshd-and-auth-logs',
    'Module 05 - Lesson 1: sshd and auth logs',
    'Hands-on video-guided lesson exploring sshd and auth logs. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    1,
    ARRAY['Master core competencies for sshd and auth logs.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-05']::TEXT[],
    ARRAY['Defensive operational triage: sshd and auth logs', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010502',
    v_course_id,
    'da000000-0000-4000-8000-000000000105',
    'm05-l2-dns-query-response-domain-and-nxdomain',
    'Module 05 - Lesson 2: DNS query, response, domain and NXDOMAIN',
    'Hands-on video-guided lesson exploring DNS query, response, domain and NXDOMAIN. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    2,
    ARRAY['Master core competencies for DNS query, response, domain and NXDOMAIN.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-05']::TEXT[],
    ARRAY['Defensive operational triage: DNS query, response, domain and NXDOMAIN', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010503',
    v_course_id,
    'da000000-0000-4000-8000-000000000105',
    'm05-l3-firewall-allow-deny-flows',
    'Module 05 - Lesson 3: Firewall allow/deny flows',
    'Hands-on video-guided lesson exploring Firewall allow/deny flows. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    3,
    ARRAY['Master core competencies for Firewall allow/deny flows.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-05']::TEXT[],
    ARRAY['Defensive operational triage: Firewall allow/deny flows', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010504',
    v_course_id,
    'da000000-0000-4000-8000-000000000105',
    'm05-l4-http-request-method-status-and-user-agent',
    'Module 05 - Lesson 4: HTTP request, method, status and user agent',
    'Hands-on video-guided lesson exploring HTTP request, method, status and user agent. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    4,
    ARRAY['Master core competencies for HTTP request, method, status and user agent.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'foundation', 'module-05']::TEXT[],
    ARRAY['Defensive operational triage: HTTP request, method, status and user agent', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010601',
    v_course_id,
    'da000000-0000-4000-8000-000000000106',
    'm06-l1-splunk-enterprise-components-search-index-forward',
    'Module 06 - Lesson 1: Splunk Enterprise components: search, index, forward',
    'Hands-on video-guided lesson exploring Splunk Enterprise components: search, index, forward. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    1,
    ARRAY['Master core competencies for Splunk Enterprise components: search, index, forward.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-06', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Splunk Enterprise components: search, index, forward', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010602',
    v_course_id,
    'da000000-0000-4000-8000-000000000106',
    'm06-l2-local-vm-versus-workstation-installation',
    'Module 06 - Lesson 2: Local VM versus workstation installation',
    'Hands-on video-guided lesson exploring Local VM versus workstation installation. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    2,
    ARRAY['Master core competencies for Local VM versus workstation installation.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-06', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Local VM versus workstation installation', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010603',
    v_course_id,
    'da000000-0000-4000-8000-000000000106',
    'm06-l3-ui-indexes-users-and-least-privilege',
    'Module 06 - Lesson 3: UI, indexes, users and least privilege',
    'Hands-on video-guided lesson exploring UI, indexes, users and least privilege. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    3,
    ARRAY['Master core competencies for UI, indexes, users and least privilege.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-06', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: UI, indexes, users and least privilege', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010604',
    v_course_id,
    'da000000-0000-4000-8000-000000000106',
    'm06-l4-cost-licensing-storage-and-lab-cleanup',
    'Module 06 - Lesson 4: Cost/licensing, storage and lab cleanup',
    'Hands-on video-guided lesson exploring Cost/licensing, storage and lab cleanup. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'YM3UWuvIJyc',
    35,
    4,
    ARRAY['Master core competencies for Cost/licensing, storage and lab cleanup.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-06', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Cost/licensing, storage and lab cleanup', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010701',
    v_course_id,
    'da000000-0000-4000-8000-000000000107',
    'm07-l1-file-monitor-versus-upload',
    'Module 07 - Lesson 1: File monitor versus upload',
    'Hands-on video-guided lesson exploring File monitor versus upload. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    1,
    ARRAY['Master core competencies for File monitor versus upload.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-07', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: File monitor versus upload', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010702',
    v_course_id,
    'da000000-0000-4000-8000-000000000107',
    'm07-l2-index-source-sourcetype-host-attributes',
    'Module 07 - Lesson 2: index/source/sourcetype/host attributes',
    'Hands-on video-guided lesson exploring index/source/sourcetype/host attributes. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    2,
    ARRAY['Master core competencies for index/source/sourcetype/host attributes.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-07', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: index/source/sourcetype/host attributes', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010703',
    v_course_id,
    'da000000-0000-4000-8000-000000000107',
    'm07-l3-timestamp-and-field-parsing-validation',
    'Module 07 - Lesson 3: Timestamp and field parsing validation',
    'Hands-on video-guided lesson exploring Timestamp and field parsing validation. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'YM3UWuvIJyc',
    35,
    3,
    ARRAY['Master core competencies for Timestamp and field parsing validation.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-07', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Timestamp and field parsing validation', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010704',
    v_course_id,
    'da000000-0000-4000-8000-000000000107',
    'm07-l4-ingest-troubleshooting-and-data-quality-checks',
    'Module 07 - Lesson 4: Ingest troubleshooting and data-quality checks',
    'Hands-on video-guided lesson exploring Ingest troubleshooting and data-quality checks. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'YM3UWuvIJyc',
    35,
    4,
    ARRAY['Master core competencies for Ingest troubleshooting and data-quality checks.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-07', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Ingest troubleshooting and data-quality checks', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010801',
    v_course_id,
    'da000000-0000-4000-8000-000000000108',
    'm08-l1-search-app-time-picker-events-versus-statistics',
    'Module 08 - Lesson 1: search app, time picker, events versus statistics',
    'Hands-on video-guided lesson exploring search app, time picker, events versus statistics. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    1,
    ARRAY['Master core competencies for search app, time picker, events versus statistics.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-08', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: search app, time picker, events versus statistics', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010802',
    v_course_id,
    'da000000-0000-4000-8000-000000000108',
    'm08-l2-index-sourcetype-fields-and-keywords',
    'Module 08 - Lesson 2: index=, sourcetype=, fields and keywords',
    'Hands-on video-guided lesson exploring index=, sourcetype=, fields and keywords. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    2,
    ARRAY['Master core competencies for index=, sourcetype=, fields and keywords.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-08', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: index=, sourcetype=, fields and keywords', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010803',
    v_course_id,
    'da000000-0000-4000-8000-000000000108',
    'm08-l3-boolean-filters-and-comparison-operators',
    'Module 08 - Lesson 3: Boolean filters and comparison operators',
    'Hands-on video-guided lesson exploring Boolean filters and comparison operators. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    3,
    ARRAY['Master core competencies for Boolean filters and comparison operators.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-08', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Boolean filters and comparison operators', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010804',
    v_course_id,
    'da000000-0000-4000-8000-000000000108',
    'm08-l4-table-fields-sort-and-head',
    'Module 08 - Lesson 4: table, fields, sort and head',
    'Hands-on video-guided lesson exploring table, fields, sort and head. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    4,
    ARRAY['Master core competencies for table, fields, sort and head.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-08', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: table, fields, sort and head', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010901',
    v_course_id,
    'da000000-0000-4000-8000-000000000109',
    'm09-l1-stats-count-dc-values-earliest-latest',
    'Module 09 - Lesson 1: stats count, dc, values, earliest, latest',
    'Hands-on video-guided lesson exploring stats count, dc, values, earliest, latest. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'wY3I4kC532U',
    35,
    1,
    ARRAY['Master core competencies for stats count, dc, values, earliest, latest.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-09', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: stats count, dc, values, earliest, latest', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010902',
    v_course_id,
    'da000000-0000-4000-8000-000000000109',
    'm09-l2-eval-if-case-and-conditional-comparisons',
    'Module 09 - Lesson 2: eval, if, case and conditional comparisons',
    'Hands-on video-guided lesson exploring eval, if, case and conditional comparisons. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'wY3I4kC532U',
    35,
    2,
    ARRAY['Master core competencies for eval, if, case and conditional comparisons.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-09', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: eval, if, case and conditional comparisons', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010903',
    v_course_id,
    'da000000-0000-4000-8000-000000000109',
    'm09-l3-timechart-and-bin',
    'Module 09 - Lesson 3: timechart and bin',
    'Hands-on video-guided lesson exploring timechart and bin. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    3,
    ARRAY['Master core competencies for timechart and bin.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-09', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: timechart and bin', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000010904',
    v_course_id,
    'da000000-0000-4000-8000-000000000109',
    'm09-l4-thresholds-rate-and-aggregation-pitfalls',
    'Module 09 - Lesson 4: Thresholds, rate and aggregation pitfalls',
    'Hands-on video-guided lesson exploring Thresholds, rate and aggregation pitfalls. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    4,
    ARRAY['Master core competencies for Thresholds, rate and aggregation pitfalls.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-09', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Thresholds, rate and aggregation pitfalls', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011001',
    v_course_id,
    'da000000-0000-4000-8000-000000000110',
    'm10-l1-automatic-extractions-versus-explicit-field-mappings',
    'Module 10 - Lesson 1: Automatic extractions versus explicit field mappings',
    'Hands-on video-guided lesson exploring Automatic extractions versus explicit field mappings. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    1,
    ARRAY['Master core competencies for Automatic extractions versus explicit field mappings.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-10', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Automatic extractions versus explicit field mappings', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011002',
    v_course_id,
    'da000000-0000-4000-8000-000000000110',
    'm10-l2-rex-and-safe-regex-basics',
    'Module 10 - Lesson 2: rex and safe regex basics',
    'Hands-on video-guided lesson exploring rex and safe regex basics. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    2,
    ARRAY['Master core competencies for rex and safe regex basics.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-10', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: rex and safe regex basics', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011003',
    v_course_id,
    'da000000-0000-4000-8000-000000000110',
    'm10-l3-eval-coalesce-for-normalization',
    'Module 10 - Lesson 3: eval coalesce for normalization',
    'Hands-on video-guided lesson exploring eval coalesce for normalization. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'wY3I4kC532U',
    35,
    3,
    ARRAY['Master core competencies for eval coalesce for normalization.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-10', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: eval coalesce for normalization', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011004',
    v_course_id,
    'da000000-0000-4000-8000-000000000110',
    'm10-l4-data-quality-and-schema-contracts',
    'Module 10 - Lesson 4: Data quality and schema contracts',
    'Hands-on video-guided lesson exploring Data quality and schema contracts. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'wY3I4kC532U',
    35,
    4,
    ARRAY['Master core competencies for Data quality and schema contracts.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-10', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Data quality and schema contracts', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011101',
    v_course_id,
    'da000000-0000-4000-8000-000000000111',
    'm11-l1-static-csv-lookup-fundamentals',
    'Module 11 - Lesson 1: Static CSV lookup fundamentals',
    'Hands-on video-guided lesson exploring Static CSV lookup fundamentals. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'wY3I4kC532U',
    35,
    1,
    ARRAY['Master core competencies for Static CSV lookup fundamentals.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-11']::TEXT[],
    ARRAY['Defensive operational triage: Static CSV lookup fundamentals', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011102',
    v_course_id,
    'da000000-0000-4000-8000-000000000111',
    'm11-l2-join-vs-stats-and-transaction-trade-offs',
    'Module 11 - Lesson 2: join vs stats and transaction: trade-offs',
    'Hands-on video-guided lesson exploring join vs stats and transaction: trade-offs. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'wY3I4kC532U',
    35,
    2,
    ARRAY['Master core competencies for join vs stats and transaction: trade-offs.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-11']::TEXT[],
    ARRAY['Defensive operational triage: join vs stats and transaction: trade-offs', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011103',
    v_course_id,
    'da000000-0000-4000-8000-000000000111',
    'm11-l3-correlation-by-host-user-ip-time',
    'Module 11 - Lesson 3: correlation by host/user/IP/time',
    'Hands-on video-guided lesson exploring correlation by host/user/IP/time. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'MvfhIydxFmw',
    35,
    3,
    ARRAY['Master core competencies for correlation by host/user/IP/time.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-11']::TEXT[],
    ARRAY['Defensive operational triage: correlation by host/user/IP/time', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011104',
    v_course_id,
    'da000000-0000-4000-8000-000000000111',
    'm11-l4-threat-context-versus-assertions-of-compromise',
    'Module 11 - Lesson 4: Threat context versus assertions of compromise',
    'Hands-on video-guided lesson exploring Threat context versus assertions of compromise. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'MvfhIydxFmw',
    35,
    4,
    ARRAY['Master core competencies for Threat context versus assertions of compromise.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-11']::TEXT[],
    ARRAY['Defensive operational triage: Threat context versus assertions of compromise', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011201',
    v_course_id,
    'da000000-0000-4000-8000-000000000112',
    'm12-l1-panels-for-time-series-top-sources-success-failure',
    'Module 12 - Lesson 1: Panels for time-series, top sources, success/failure',
    'Hands-on video-guided lesson exploring Panels for time-series, top sources, success/failure. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    1,
    ARRAY['Master core competencies for Panels for time-series, top sources, success/failure.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-12', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Panels for time-series, top sources, success/failure', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011202',
    v_course_id,
    'da000000-0000-4000-8000-000000000112',
    'm12-l2-dashboard-studio-and-drilldowns',
    'Module 12 - Lesson 2: Dashboard Studio and drilldowns',
    'Hands-on video-guided lesson exploring Dashboard Studio and drilldowns. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    2,
    ARRAY['Master core competencies for Dashboard Studio and drilldowns.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-12', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Dashboard Studio and drilldowns', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011203',
    v_course_id,
    'da000000-0000-4000-8000-000000000112',
    'm12-l3-readable-metrics-and-filter-controls',
    'Module 12 - Lesson 3: Readable metrics and filter controls',
    'Hands-on video-guided lesson exploring Readable metrics and filter controls. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'UXNdKTbHPVg',
    35,
    3,
    ARRAY['Master core competencies for Readable metrics and filter controls.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-12', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Readable metrics and filter controls', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011204',
    v_course_id,
    'da000000-0000-4000-8000-000000000112',
    'm12-l4-dashboard-qa-and-access-boundaries',
    'Module 12 - Lesson 4: Dashboard QA and access boundaries',
    'Hands-on video-guided lesson exploring Dashboard QA and access boundaries. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'UXNdKTbHPVg',
    35,
    4,
    ARRAY['Master core competencies for Dashboard QA and access boundaries.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-12', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Dashboard QA and access boundaries', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011301',
    v_course_id,
    'da000000-0000-4000-8000-000000000113',
    'm13-l1-scheduled-searches-and-alert-triggers',
    'Module 13 - Lesson 1: Scheduled searches and alert triggers',
    'Hands-on video-guided lesson exploring Scheduled searches and alert triggers. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'wY3I4kC532U',
    35,
    1,
    ARRAY['Master core competencies for Scheduled searches and alert triggers.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-13', 'splunk', 'spl', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Scheduled searches and alert triggers', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011302',
    v_course_id,
    'da000000-0000-4000-8000-000000000113',
    'm13-l2-severity-frequency-suppression-and-ownership',
    'Module 13 - Lesson 2: Severity, frequency, suppression and ownership',
    'Hands-on video-guided lesson exploring Severity, frequency, suppression and ownership. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'wY3I4kC532U',
    35,
    2,
    ARRAY['Master core competencies for Severity, frequency, suppression and ownership.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-13', 'splunk', 'spl', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Severity, frequency, suppression and ownership', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011303',
    v_course_id,
    'da000000-0000-4000-8000-000000000113',
    'm13-l3-false-positive-false-negative-test-design',
    'Module 13 - Lesson 3: False positive / false negative test design',
    'Hands-on video-guided lesson exploring False positive / false negative test design. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    3,
    ARRAY['Master core competencies for False positive / false negative test design.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-13', 'splunk', 'spl', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: False positive / false negative test design', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011304',
    v_course_id,
    'da000000-0000-4000-8000-000000000113',
    'm13-l4-mitre-att-ck-technique-mapping',
    'Module 13 - Lesson 4: MITRE ATT&CK technique mapping',
    'Hands-on video-guided lesson exploring MITRE ATT&CK technique mapping. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    4,
    ARRAY['Master core competencies for MITRE ATT&CK technique mapping.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-13', 'splunk', 'spl', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: MITRE ATT&CK technique mapping', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011401',
    v_course_id,
    'da000000-0000-4000-8000-000000000114',
    'm14-l1-brute-force-versus-spraying',
    'Module 14 - Lesson 1: Brute force versus spraying',
    'Hands-on video-guided lesson exploring Brute force versus spraying. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    1,
    ARRAY['Master core competencies for Brute force versus spraying.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-14', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Brute force versus spraying', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011402',
    v_course_id,
    'da000000-0000-4000-8000-000000000114',
    'm14-l2-unique-users-vs-unique-source-ips',
    'Module 14 - Lesson 2: Unique users vs unique source IPs',
    'Hands-on video-guided lesson exploring Unique users vs unique source IPs. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    2,
    ARRAY['Master core competencies for Unique users vs unique source IPs.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-14', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Unique users vs unique source IPs', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011403',
    v_course_id,
    'da000000-0000-4000-8000-000000000114',
    'm14-l3-success-after-failure-sequences',
    'Module 14 - Lesson 3: Success-after-failure sequences',
    'Hands-on video-guided lesson exploring Success-after-failure sequences. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'HloK6Ay4h1M',
    35,
    3,
    ARRAY['Master core competencies for Success-after-failure sequences.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-14', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Success-after-failure sequences', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011404',
    v_course_id,
    'da000000-0000-4000-8000-000000000114',
    'm14-l4-identity-context-and-escalation-boundaries',
    'Module 14 - Lesson 4: Identity context and escalation boundaries',
    'Hands-on video-guided lesson exploring Identity context and escalation boundaries. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'HloK6Ay4h1M',
    35,
    4,
    ARRAY['Master core competencies for Identity context and escalation boundaries.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-14', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Identity context and escalation boundaries', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011501',
    v_course_id,
    'da000000-0000-4000-8000-000000000115',
    'm15-l1-high-frequency-dns-and-rare-domain-investigation',
    'Module 15 - Lesson 1: High-frequency DNS and rare domain investigation',
    'Hands-on video-guided lesson exploring High-frequency DNS and rare domain investigation. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    1,
    ARRAY['Master core competencies for High-frequency DNS and rare domain investigation.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-15']::TEXT[],
    ARRAY['Defensive operational triage: High-frequency DNS and rare domain investigation', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011502',
    v_course_id,
    'da000000-0000-4000-8000-000000000115',
    'm15-l2-http-methods-paths-response-status',
    'Module 15 - Lesson 2: HTTP methods, paths, response status',
    'Hands-on video-guided lesson exploring HTTP methods, paths, response status. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    2,
    ARRAY['Master core competencies for HTTP methods, paths, response status.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-15']::TEXT[],
    ARRAY['Defensive operational triage: HTTP methods, paths, response status', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011503',
    v_course_id,
    'da000000-0000-4000-8000-000000000115',
    'm15-l3-beacon-like-intervals-and-false-positives',
    'Module 15 - Lesson 3: Beacon-like intervals and false positives',
    'Hands-on video-guided lesson exploring Beacon-like intervals and false positives. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    3,
    ARRAY['Master core competencies for Beacon-like intervals and false positives.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-15']::TEXT[],
    ARRAY['Defensive operational triage: Beacon-like intervals and false positives', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011504',
    v_course_id,
    'da000000-0000-4000-8000-000000000115',
    'm15-l4-cross-source-temporal-pivots',
    'Module 15 - Lesson 4: Cross-source temporal pivots',
    'Hands-on video-guided lesson exploring Cross-source temporal pivots. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    4,
    ARRAY['Master core competencies for Cross-source temporal pivots.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-15']::TEXT[],
    ARRAY['Defensive operational triage: Cross-source temporal pivots', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011601',
    v_course_id,
    'da000000-0000-4000-8000-000000000116',
    'm16-l1-suspicious-process-and-file-activity',
    'Module 16 - Lesson 1: Suspicious process and file activity',
    'Hands-on video-guided lesson exploring Suspicious process and file activity. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'fS2u97T05KQ',
    35,
    1,
    ARRAY['Master core competencies for Suspicious process and file activity.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-16', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Suspicious process and file activity', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011602',
    v_course_id,
    'da000000-0000-4000-8000-000000000116',
    'm16-l2-initial-access-versus-execution-indicators',
    'Module 16 - Lesson 2: Initial access versus execution indicators',
    'Hands-on video-guided lesson exploring Initial access versus execution indicators. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'fS2u97T05KQ',
    35,
    2,
    ARRAY['Master core competencies for Initial access versus execution indicators.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-16', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Initial access versus execution indicators', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011603',
    v_course_id,
    'da000000-0000-4000-8000-000000000116',
    'm16-l3-timeline-from-endpoint-to-web-log',
    'Module 16 - Lesson 3: Timeline from endpoint to web log',
    'Hands-on video-guided lesson exploring Timeline from endpoint to web log. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'wY3I4kC532U',
    35,
    3,
    ARRAY['Master core competencies for Timeline from endpoint to web log.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-16', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Timeline from endpoint to web log', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011604',
    v_course_id,
    'da000000-0000-4000-8000-000000000116',
    'm16-l4-evidence-confidence-and-containment-authorization',
    'Module 16 - Lesson 4: Evidence confidence and containment authorization',
    'Hands-on video-guided lesson exploring Evidence confidence and containment authorization. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'wY3I4kC532U',
    35,
    4,
    ARRAY['Master core competencies for Evidence confidence and containment authorization.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-16', 'splunk', 'spl']::TEXT[],
    ARRAY['Defensive operational triage: Evidence confidence and containment authorization', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011701',
    v_course_id,
    'da000000-0000-4000-8000-000000000117',
    'm17-l1-enterprise-security-concepts-and-availability',
    'Module 17 - Lesson 1: Enterprise Security concepts and availability',
    'Hands-on video-guided lesson exploring Enterprise Security concepts and availability. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    1,
    ARRAY['Master core competencies for Enterprise Security concepts and availability.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-17', 'splunk', 'spl', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Enterprise Security concepts and availability', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011702',
    v_course_id,
    'da000000-0000-4000-8000-000000000117',
    'm17-l2-risk-scores-notable-events-findings',
    'Module 17 - Lesson 2: Risk scores, notable events/findings',
    'Hands-on video-guided lesson exploring Risk scores, notable events/findings. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'LbR5cqqaFVk',
    35,
    2,
    ARRAY['Master core competencies for Risk scores, notable events/findings.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-17', 'splunk', 'spl', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Risk scores, notable events/findings', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011703',
    v_course_id,
    'da000000-0000-4000-8000-000000000117',
    'm17-l3-cim-data-models-and-normalized-security-content',
    'Module 17 - Lesson 3: CIM/data models and normalized security content',
    'Hands-on video-guided lesson exploring CIM/data models and normalized security content. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'wY3I4kC532U',
    35,
    3,
    ARRAY['Master core competencies for CIM/data models and normalized security content.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-17', 'splunk', 'spl', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: CIM/data models and normalized security content', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011704',
    v_course_id,
    'da000000-0000-4000-8000-000000000117',
    'm17-l4-entity-based-prioritization-and-investigation-queues',
    'Module 17 - Lesson 4: Entity-based prioritization and investigation queues',
    'Hands-on video-guided lesson exploring Entity-based prioritization and investigation queues. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'wY3I4kC532U',
    35,
    4,
    ARRAY['Master core competencies for Entity-based prioritization and investigation queues.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-17', 'splunk', 'spl', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Entity-based prioritization and investigation queues', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011801',
    v_course_id,
    'da000000-0000-4000-8000-000000000118',
    'm18-l1-hypothesis-driven-hunting-workflow',
    'Module 18 - Lesson 1: Hypothesis-driven hunting workflow',
    'Hands-on video-guided lesson exploring Hypothesis-driven hunting workflow. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'MvfhIydxFmw',
    35,
    1,
    ARRAY['Master core competencies for Hypothesis-driven hunting workflow.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-18', 'splunk', 'spl', 'threat-hunting', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Hypothesis-driven hunting workflow', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011802',
    v_course_id,
    'da000000-0000-4000-8000-000000000118',
    'm18-l2-att-ck-mapping-and-data-requirements',
    'Module 18 - Lesson 2: ATT&CK mapping and data requirements',
    'Hands-on video-guided lesson exploring ATT&CK mapping and data requirements. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'MvfhIydxFmw',
    35,
    2,
    ARRAY['Master core competencies for ATT&CK mapping and data requirements.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-18', 'splunk', 'spl', 'threat-hunting', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: ATT&CK mapping and data requirements', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011803',
    v_course_id,
    'da000000-0000-4000-8000-000000000118',
    'm18-l3-pivot-queries-and-evidence-collection',
    'Module 18 - Lesson 3: Pivot queries and evidence collection',
    'Hands-on video-guided lesson exploring Pivot queries and evidence collection. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'fS2u97T05KQ',
    35,
    3,
    ARRAY['Master core competencies for Pivot queries and evidence collection.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-18', 'splunk', 'spl', 'threat-hunting', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Pivot queries and evidence collection', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011804',
    v_course_id,
    'da000000-0000-4000-8000-000000000118',
    'm18-l4-versioned-detection-tests-and-coverage',
    'Module 18 - Lesson 4: Versioned detection tests and coverage',
    'Hands-on video-guided lesson exploring Versioned detection tests and coverage. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'fS2u97T05KQ',
    35,
    4,
    ARRAY['Master core competencies for Versioned detection tests and coverage.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'splunk', 'module-18', 'splunk', 'spl', 'threat-hunting', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Versioned detection tests and coverage', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011901',
    v_course_id,
    'da000000-0000-4000-8000-000000000119',
    'm19-l1-log-analytics-workspaces-and-sentinel',
    'Module 19 - Lesson 1: Log Analytics workspaces and Sentinel',
    'Hands-on video-guided lesson exploring Log Analytics workspaces and Sentinel. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    '0ydVILka3eg',
    35,
    1,
    ARRAY['Master core competencies for Log Analytics workspaces and Sentinel.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-19', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Log Analytics workspaces and Sentinel', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011902',
    v_course_id,
    'da000000-0000-4000-8000-000000000119',
    'm19-l2-defender-portal-versus-legacy-azure-entry-points',
    'Module 19 - Lesson 2: Defender portal versus legacy Azure entry points',
    'Hands-on video-guided lesson exploring Defender portal versus legacy Azure entry points. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    '0ydVILka3eg',
    35,
    2,
    ARRAY['Master core competencies for Defender portal versus legacy Azure entry points.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-19', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Defender portal versus legacy Azure entry points', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011903',
    v_course_id,
    'da000000-0000-4000-8000-000000000119',
    'm19-l3-tenants-role-based-access-and-retention',
    'Module 19 - Lesson 3: Tenants, role-based access and retention',
    'Hands-on video-guided lesson exploring Tenants, role-based access and retention. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'PDvQKFubLjY',
    35,
    3,
    ARRAY['Master core competencies for Tenants, role-based access and retention.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-19', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Tenants, role-based access and retention', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000011904',
    v_course_id,
    'da000000-0000-4000-8000-000000000119',
    'm19-l4-trial-scope-budgets-and-deletion',
    'Module 19 - Lesson 4: Trial scope, budgets and deletion',
    'Hands-on video-guided lesson exploring Trial scope, budgets and deletion. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'PDvQKFubLjY',
    35,
    4,
    ARRAY['Master core competencies for Trial scope, budgets and deletion.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-19', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Trial scope, budgets and deletion', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012001',
    v_course_id,
    'da000000-0000-4000-8000-000000000120',
    'm20-l1-azure-monitor-agent-and-data-collection-rules',
    'Module 20 - Lesson 1: Azure Monitor Agent and data collection rules',
    'Hands-on video-guided lesson exploring Azure Monitor Agent and data collection rules. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'hOYpji940yw',
    35,
    1,
    ARRAY['Master core competencies for Azure Monitor Agent and data collection rules.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-20', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Azure Monitor Agent and data collection rules', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012002',
    v_course_id,
    'da000000-0000-4000-8000-000000000120',
    'm20-l2-windows-event-sysmon-ingestion',
    'Module 20 - Lesson 2: Windows event/Sysmon ingestion',
    'Hands-on video-guided lesson exploring Windows event/Sysmon ingestion. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'hOYpji940yw',
    35,
    2,
    ARRAY['Master core competencies for Windows event/Sysmon ingestion.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-20', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Windows event/Sysmon ingestion', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012003',
    v_course_id,
    'da000000-0000-4000-8000-000000000120',
    'm20-l3-linux-syslog-and-cef',
    'Module 20 - Lesson 3: Linux Syslog and CEF',
    'Hands-on video-guided lesson exploring Linux Syslog and CEF. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'FStpHl0NRM8',
    35,
    3,
    ARRAY['Master core competencies for Linux Syslog and CEF.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-20', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Linux Syslog and CEF', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012004',
    v_course_id,
    'da000000-0000-4000-8000-000000000120',
    'm20-l4-data-freshness-and-connector-health',
    'Module 20 - Lesson 4: Data freshness and connector health',
    'Hands-on video-guided lesson exploring Data freshness and connector health. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'FStpHl0NRM8',
    35,
    4,
    ARRAY['Master core competencies for Data freshness and connector health.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-20', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Data freshness and connector health', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012101',
    v_course_id,
    'da000000-0000-4000-8000-000000000121',
    'm21-l1-tabular-query-operators-and-pipeline',
    'Module 21 - Lesson 1: Tabular query operators and pipeline',
    'Hands-on video-guided lesson exploring Tabular query operators and pipeline. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    '3DHcnk9obfk',
    35,
    1,
    ARRAY['Master core competencies for Tabular query operators and pipeline.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-21', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Tabular query operators and pipeline', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012102',
    v_course_id,
    'da000000-0000-4000-8000-000000000121',
    'm21-l2-where-project-take-order-by',
    'Module 21 - Lesson 2: where, project, take, order by',
    'Hands-on video-guided lesson exploring where, project, take, order by. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    '3DHcnk9obfk',
    35,
    2,
    ARRAY['Master core competencies for where, project, take, order by.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-21', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: where, project, take, order by', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012103',
    v_course_id,
    'da000000-0000-4000-8000-000000000121',
    'm21-l3-filtering-timestamps-and-ips',
    'Module 21 - Lesson 3: Filtering timestamps and IPs',
    'Hands-on video-guided lesson exploring Filtering timestamps and IPs. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'EDCBLULjtCM',
    35,
    3,
    ARRAY['Master core competencies for Filtering timestamps and IPs.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-21', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Filtering timestamps and IPs', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012104',
    v_course_id,
    'da000000-0000-4000-8000-000000000121',
    'm21-l4-count-and-summarize-by-entity',
    'Module 21 - Lesson 4: Count and summarize by entity',
    'Hands-on video-guided lesson exploring Count and summarize by entity. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'EDCBLULjtCM',
    35,
    4,
    ARRAY['Master core competencies for Count and summarize by entity.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-21', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Count and summarize by entity', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012201',
    v_course_id,
    'da000000-0000-4000-8000-000000000122',
    'm22-l1-join-and-lookup-patterns',
    'Module 22 - Lesson 1: join and lookup patterns',
    'Hands-on video-guided lesson exploring join and lookup patterns. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    '3DHcnk9obfk',
    35,
    1,
    ARRAY['Master core competencies for join and lookup patterns.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-22', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: join and lookup patterns', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012202',
    v_course_id,
    'da000000-0000-4000-8000-000000000122',
    'm22-l2-extend-parse-json-mv-expand',
    'Module 22 - Lesson 2: extend, parse_json, mv-expand',
    'Hands-on video-guided lesson exploring extend, parse_json, mv-expand. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    '3DHcnk9obfk',
    35,
    2,
    ARRAY['Master core competencies for extend, parse_json, mv-expand.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-22', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: extend, parse_json, mv-expand', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012203',
    v_course_id,
    'da000000-0000-4000-8000-000000000122',
    'm22-l3-make-series-and-anomaly-patterns',
    'Module 22 - Lesson 3: make-series and anomaly patterns',
    'Hands-on video-guided lesson exploring make-series and anomaly patterns. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'Cf4wu_ujhG4',
    35,
    3,
    ARRAY['Master core competencies for make-series and anomaly patterns.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-22', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: make-series and anomaly patterns', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012204',
    v_course_id,
    'da000000-0000-4000-8000-000000000122',
    'm22-l4-asim-field-normalization-and-query-performance',
    'Module 22 - Lesson 4: ASIM field normalization and query performance',
    'Hands-on video-guided lesson exploring ASIM field normalization and query performance. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'Cf4wu_ujhG4',
    35,
    4,
    ARRAY['Master core competencies for ASIM field normalization and query performance.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-22', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: ASIM field normalization and query performance', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012301',
    v_course_id,
    'da000000-0000-4000-8000-000000000123',
    'm23-l1-scheduled-query-rules-and-prerequisites',
    'Module 23 - Lesson 1: Scheduled query rules and prerequisites',
    'Hands-on video-guided lesson exploring Scheduled query rules and prerequisites. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'pJjljBT4ipQ',
    35,
    1,
    ARRAY['Master core competencies for Scheduled query rules and prerequisites.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-23', 'microsoft-sentinel', 'kql', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Scheduled query rules and prerequisites', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012302',
    v_course_id,
    'da000000-0000-4000-8000-000000000123',
    'm23-l2-entity-mapping-severity-tactics-grouping',
    'Module 23 - Lesson 2: Entity mapping, severity, tactics, grouping',
    'Hands-on video-guided lesson exploring Entity mapping, severity, tactics, grouping. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'pJjljBT4ipQ',
    35,
    2,
    ARRAY['Master core competencies for Entity mapping, severity, tactics, grouping.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-23', 'microsoft-sentinel', 'kql', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Entity mapping, severity, tactics, grouping', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012303',
    v_course_id,
    'da000000-0000-4000-8000-000000000123',
    'm23-l3-rule-test-cases-and-delayed-events',
    'Module 23 - Lesson 3: Rule test cases and delayed events',
    'Hands-on video-guided lesson exploring Rule test cases and delayed events. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'PDvQKFubLjY',
    35,
    3,
    ARRAY['Master core competencies for Rule test cases and delayed events.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-23', 'microsoft-sentinel', 'kql', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Rule test cases and delayed events', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012304',
    v_course_id,
    'da000000-0000-4000-8000-000000000123',
    'm23-l4-rule-ownership-suppression-and-review',
    'Module 23 - Lesson 4: Rule ownership, suppression and review',
    'Hands-on video-guided lesson exploring Rule ownership, suppression and review. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'PDvQKFubLjY',
    35,
    4,
    ARRAY['Master core competencies for Rule ownership, suppression and review.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-23', 'microsoft-sentinel', 'kql', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Rule ownership, suppression and review', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012401',
    v_course_id,
    'da000000-0000-4000-8000-000000000124',
    'm24-l1-alerts-to-incidents-and-entity-graphs',
    'Module 24 - Lesson 1: Alerts to incidents and entity graphs',
    'Hands-on video-guided lesson exploring Alerts to incidents and entity graphs. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'HloK6Ay4h1M',
    35,
    1,
    ARRAY['Master core competencies for Alerts to incidents and entity graphs.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-24', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Alerts to incidents and entity graphs', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012402',
    v_course_id,
    'da000000-0000-4000-8000-000000000124',
    'm24-l2-incident-assignment-evidence-and-status',
    'Module 24 - Lesson 2: Incident assignment, evidence and status',
    'Hands-on video-guided lesson exploring Incident assignment, evidence and status. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'HloK6Ay4h1M',
    35,
    2,
    ARRAY['Master core competencies for Incident assignment, evidence and status.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-24', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Incident assignment, evidence and status', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012403',
    v_course_id,
    'da000000-0000-4000-8000-000000000124',
    'm24-l3-case-timeline-and-bookmarks',
    'Module 24 - Lesson 3: Case timeline and bookmarks',
    'Hands-on video-guided lesson exploring Case timeline and bookmarks. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'NJlaqBaqahc',
    35,
    3,
    ARRAY['Master core competencies for Case timeline and bookmarks.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-24', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Case timeline and bookmarks', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012404',
    v_course_id,
    'da000000-0000-4000-8000-000000000124',
    'm24-l4-cross-product-enrichment-and-l2-handoff',
    'Module 24 - Lesson 4: Cross-product enrichment and L2 handoff',
    'Hands-on video-guided lesson exploring Cross-product enrichment and L2 handoff. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'NJlaqBaqahc',
    35,
    4,
    ARRAY['Master core competencies for Cross-product enrichment and L2 handoff.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-24', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Cross-product enrichment and L2 handoff', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012501',
    v_course_id,
    'da000000-0000-4000-8000-000000000125',
    'm25-l1-indicators-confidence-expiration-and-provenance',
    'Module 25 - Lesson 1: Indicators, confidence, expiration and provenance',
    'Hands-on video-guided lesson exploring Indicators, confidence, expiration and provenance. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'NJlaqBaqahc',
    35,
    1,
    ARRAY['Master core competencies for Indicators, confidence, expiration and provenance.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-25']::TEXT[],
    ARRAY['Defensive operational triage: Indicators, confidence, expiration and provenance', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012502',
    v_course_id,
    'da000000-0000-4000-8000-000000000125',
    'm25-l2-watchlists-for-assets-and-allowed-services',
    'Module 25 - Lesson 2: Watchlists for assets and allowed services',
    'Hands-on video-guided lesson exploring Watchlists for assets and allowed services. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'NJlaqBaqahc',
    35,
    2,
    ARRAY['Master core competencies for Watchlists for assets and allowed services.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-25']::TEXT[],
    ARRAY['Defensive operational triage: Watchlists for assets and allowed services', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012503',
    v_course_id,
    'da000000-0000-4000-8000-000000000125',
    'm25-l3-entity-enrichment-in-investigations',
    'Module 25 - Lesson 3: Entity enrichment in investigations',
    'Hands-on video-guided lesson exploring Entity enrichment in investigations. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'Cf4wu_ujhG4',
    35,
    3,
    ARRAY['Master core competencies for Entity enrichment in investigations.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-25']::TEXT[],
    ARRAY['Defensive operational triage: Entity enrichment in investigations', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012504',
    v_course_id,
    'da000000-0000-4000-8000-000000000125',
    'm25-l4-asim-normalized-detections',
    'Module 25 - Lesson 4: ASIM-normalized detections',
    'Hands-on video-guided lesson exploring ASIM-normalized detections. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'Cf4wu_ujhG4',
    35,
    4,
    ARRAY['Master core competencies for ASIM-normalized detections.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-25']::TEXT[],
    ARRAY['Defensive operational triage: ASIM-normalized detections', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012601',
    v_course_id,
    'da000000-0000-4000-8000-000000000126',
    'm26-l1-workbooks-for-triage-and-visibility',
    'Module 26 - Lesson 1: Workbooks for triage and visibility',
    'Hands-on video-guided lesson exploring Workbooks for triage and visibility. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    '7eYNaYSsk1A',
    35,
    1,
    ARRAY['Master core competencies for Workbooks for triage and visibility.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-26', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Workbooks for triage and visibility', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012602',
    v_course_id,
    'da000000-0000-4000-8000-000000000126',
    'm26-l2-ueba-concepts-and-limitations',
    'Module 26 - Lesson 2: UEBA concepts and limitations',
    'Hands-on video-guided lesson exploring UEBA concepts and limitations. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'ixBotw9Qidg',
    35,
    2,
    ARRAY['Master core competencies for UEBA concepts and limitations.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-26', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: UEBA concepts and limitations', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012603',
    v_course_id,
    'da000000-0000-4000-8000-000000000126',
    'm26-l3-notebooks-for-enrichment-and-visual-analytics',
    'Module 26 - Lesson 3: Notebooks for enrichment and visual analytics',
    'Hands-on video-guided lesson exploring Notebooks for enrichment and visual analytics. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'ixBotw9Qidg',
    35,
    3,
    ARRAY['Master core competencies for Notebooks for enrichment and visual analytics.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-26', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Notebooks for enrichment and visual analytics', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012604',
    v_course_id,
    'da000000-0000-4000-8000-000000000126',
    'm26-l4-communicating-data-freshness-and-model-caveats',
    'Module 26 - Lesson 4: Communicating data freshness and model caveats',
    'Hands-on video-guided lesson exploring Communicating data freshness and model caveats. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'z6QbN4rpAvA',
    35,
    4,
    ARRAY['Master core competencies for Communicating data freshness and model caveats.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'sentinel', 'module-26', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Communicating data freshness and model caveats', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012701',
    v_course_id,
    'da000000-0000-4000-8000-000000000127',
    'm27-l1-incident-automation-versus-playbooks',
    'Module 27 - Lesson 1: Incident automation versus playbooks',
    'Hands-on video-guided lesson exploring Incident automation versus playbooks. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'G6TIzJK8XBA',
    35,
    1,
    ARRAY['Master core competencies for Incident automation versus playbooks.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'advanced', 'module-27']::TEXT[],
    ARRAY['Defensive operational triage: Incident automation versus playbooks', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012702',
    v_course_id,
    'da000000-0000-4000-8000-000000000127',
    'm27-l2-logic-apps-connector-concepts',
    'Module 27 - Lesson 2: Logic Apps connector concepts',
    'Hands-on video-guided lesson exploring Logic Apps connector concepts. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'G6TIzJK8XBA',
    35,
    2,
    ARRAY['Master core competencies for Logic Apps connector concepts.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'advanced', 'module-27']::TEXT[],
    ARRAY['Defensive operational triage: Logic Apps connector concepts', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012703',
    v_course_id,
    'da000000-0000-4000-8000-000000000127',
    'm27-l3-human-approvals-idempotence-and-failure-handling',
    'Module 27 - Lesson 3: Human approvals, idempotence and failure handling',
    'Hands-on video-guided lesson exploring Human approvals, idempotence and failure handling. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'NJlaqBaqahc',
    35,
    3,
    ARRAY['Master core competencies for Human approvals, idempotence and failure handling.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'advanced', 'module-27']::TEXT[],
    ARRAY['Defensive operational triage: Human approvals, idempotence and failure handling', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012704',
    v_course_id,
    'da000000-0000-4000-8000-000000000127',
    'm27-l4-audit-logging-and-secret-management',
    'Module 27 - Lesson 4: Audit logging and secret management',
    'Hands-on video-guided lesson exploring Audit logging and secret management. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'NJlaqBaqahc',
    35,
    4,
    ARRAY['Master core competencies for Audit logging and secret management.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'advanced', 'module-27']::TEXT[],
    ARRAY['Defensive operational triage: Audit logging and secret management', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012801',
    v_course_id,
    'da000000-0000-4000-8000-000000000128',
    'm28-l1-detection-as-code-concept',
    'Module 28 - Lesson 1: Detection-as-code concept',
    'Hands-on video-guided lesson exploring Detection-as-code concept. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'pJjljBT4ipQ',
    35,
    1,
    ARRAY['Master core competencies for Detection-as-code concept.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'advanced', 'module-28', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Detection-as-code concept', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012802',
    v_course_id,
    'da000000-0000-4000-8000-000000000128',
    'm28-l2-sigma-to-spl-kql-translation-validation',
    'Module 28 - Lesson 2: Sigma to SPL/KQL translation validation',
    'Hands-on video-guided lesson exploring Sigma to SPL/KQL translation validation. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'pJjljBT4ipQ',
    35,
    2,
    ARRAY['Master core competencies for Sigma to SPL/KQL translation validation.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'advanced', 'module-28', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Sigma to SPL/KQL translation validation', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012803',
    v_course_id,
    'da000000-0000-4000-8000-000000000128',
    'm28-l3-schema-drift-and-test-fixtures',
    'Module 28 - Lesson 3: Schema drift and test fixtures',
    'Hands-on video-guided lesson exploring Schema drift and test fixtures. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'Cu4dc88GH1k',
    35,
    3,
    ARRAY['Master core competencies for Schema drift and test fixtures.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'advanced', 'module-28', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Schema drift and test fixtures', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012804',
    v_course_id,
    'da000000-0000-4000-8000-000000000128',
    'm28-l4-peer-reviews-coverage-change-control',
    'Module 28 - Lesson 4: Peer reviews, coverage, change control',
    'Hands-on video-guided lesson exploring Peer reviews, coverage, change control. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'Cu4dc88GH1k',
    35,
    4,
    ARRAY['Master core competencies for Peer reviews, coverage, change control.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'advanced', 'module-28', 'detection-engineering']::TEXT[],
    ARRAY['Defensive operational triage: Peer reviews, coverage, change control', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012901',
    v_course_id,
    'da000000-0000-4000-8000-000000000129',
    'm29-l1-ingest-delay-dropped-events-connector-health',
    'Module 29 - Lesson 1: Ingest delay, dropped events, connector health',
    'Hands-on video-guided lesson exploring Ingest delay, dropped events, connector health. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'T6Vyo7gZYds',
    35,
    1,
    ARRAY['Master core competencies for Ingest delay, dropped events, connector health.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'advanced', 'module-29']::TEXT[],
    ARRAY['Defensive operational triage: Ingest delay, dropped events, connector health', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012902',
    v_course_id,
    'da000000-0000-4000-8000-000000000129',
    'm29-l2-query-optimization-and-retention',
    'Module 29 - Lesson 2: Query optimization and retention',
    'Hands-on video-guided lesson exploring Query optimization and retention. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'Cu4dc88GH1k',
    35,
    2,
    ARRAY['Master core competencies for Query optimization and retention.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'advanced', 'module-29']::TEXT[],
    ARRAY['Defensive operational triage: Query optimization and retention', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012903',
    v_course_id,
    'da000000-0000-4000-8000-000000000129',
    'm29-l3-cost-budget-usage-monitoring-and-cleanup',
    'Module 29 - Lesson 3: Cost budget, usage monitoring and cleanup',
    'Hands-on video-guided lesson exploring Cost budget, usage monitoring and cleanup. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'Cu4dc88GH1k',
    35,
    3,
    ARRAY['Master core competencies for Cost budget, usage monitoring and cleanup.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'advanced', 'module-29']::TEXT[],
    ARRAY['Defensive operational triage: Cost budget, usage monitoring and cleanup', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000012904',
    v_course_id,
    'da000000-0000-4000-8000-000000000129',
    'm29-l4-read-only-apis-and-audit-safe-integrations',
    'Module 29 - Lesson 4: Read-only APIs and audit-safe integrations',
    'Hands-on video-guided lesson exploring Read-only APIs and audit-safe integrations. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'QDIuvZbmUmc',
    35,
    4,
    ARRAY['Master core competencies for Read-only APIs and audit-safe integrations.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'advanced', 'module-29']::TEXT[],
    ARRAY['Defensive operational triage: Read-only APIs and audit-safe integrations', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000013001',
    v_course_id,
    'da000000-0000-4000-8000-000000000130',
    'm30-l1-case-intake-and-scope',
    'Module 30 - Lesson 1: Case intake and scope',
    'Hands-on video-guided lesson exploring Case intake and scope. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'wY3I4kC532U',
    35,
    1,
    ARRAY['Master core competencies for Case intake and scope.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'capstone', 'module-30', 'splunk', 'spl', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Case intake and scope', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000013002',
    v_course_id,
    'da000000-0000-4000-8000-000000000130',
    'm30-l2-telemetry-normalization-and-evidence-timeline',
    'Module 30 - Lesson 2: Telemetry normalization and evidence timeline',
    'Hands-on video-guided lesson exploring Telemetry normalization and evidence timeline. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'z6QbN4rpAvA',
    35,
    2,
    ARRAY['Master core competencies for Telemetry normalization and evidence timeline.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'capstone', 'module-30', 'splunk', 'spl', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Telemetry normalization and evidence timeline', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000013003',
    v_course_id,
    'da000000-0000-4000-8000-000000000130',
    'm30-l3-correlation-detection-false-positive-review',
    'Module 30 - Lesson 3: Correlation, detection, false-positive review',
    'Hands-on video-guided lesson exploring Correlation, detection, false-positive review. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'z6QbN4rpAvA',
    35,
    3,
    ARRAY['Master core competencies for Correlation, detection, false-positive review.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'capstone', 'module-30', 'splunk', 'spl', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Correlation, detection, false-positive review', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught
  ) VALUES (
    'da000000-0000-4000-8000-000000013004',
    v_course_id,
    'da000000-0000-4000-8000-000000000130',
    'm30-l4-executive-and-technical-reporting-with-handoff',
    'Module 30 - Lesson 4: Executive and technical reporting with handoff',
    'Hands-on video-guided lesson exploring Executive and technical reporting with handoff. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows.',
    'fS2u97T05KQ',
    35,
    4,
    ARRAY['Master core competencies for Executive and technical reporting with handoff.', 'Analyze synthetic and live defensive event streams without overcalling compromise.', 'Execute and evaluate detection logic against known false-positive baselines.']::TEXT[],
    ARRAY['siem', 'soc-analyst', 'capstone', 'module-30', 'splunk', 'spl', 'microsoft-sentinel', 'kql']::TEXT[],
    ARRAY['Defensive operational triage: Executive and technical reporting with handoff', 'Log normalization and timestamp boundary validation', 'Telemetry-driven hypothesis formulation and testing', 'Concise L1/L2 incident escalation documentation']::TEXT[]
  )
  ON CONFLICT (course_id, slug) DO UPDATE SET
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