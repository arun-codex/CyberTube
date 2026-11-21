import os, sys
sys.path.append(os.path.dirname(__file__))
from generate_mitre_attack_course import slugify, quote_sql, to_pg_array, MODULE_VIDEOS, MODULE_QUIZZES
import glob, re

base_dir = r"C:\Users\dutch\.gemini\antigravity\worktrees\REA_Project\private_bug_bounty_library"
course_docs_dir = os.path.join(base_dir, r"docs\courses\mitre-attack-incident-response-zero-to-advanced")
modules_dir = os.path.join(course_docs_dir, "modules")

module_files = sorted(glob.glob(os.path.join(modules_dir, "*.md")))
course_uuid = "dc000000-0000-4000-8000-000000000001"

course_slug = 'mitre-attack-incident-response-zero-to-advanced'
course_title = 'MITRE ATT&CK for Incident Response: Zero to Advanced'
course_short = 'A comprehensive 30-module, video-guided defensive incident response curriculum aligned with MITRE ATT&CK Enterprise v20.1 and NIST SP 800-61r3, 150 lessons, hands-on SOC cases, DFIR investigations, and a full capstone portfolio.'
course_desc = 'A comprehensive, hands-on 30-module defensive cybersecurity curriculum designed for aspiring and practicing SOC L1/L2 analysts, incident responders, and DFIR professionals. Master enterprise incident response aligned with MITRE ATT&CK Enterprise v20.1 and NIST SP 800-61r3: SOC triage, evidence preservation, chain of custody, Windows/Linux host forensics, network PCAP analysis, credential access, persistence mechanisms, defense impairment, lateral movement, ransomware containment, timeline reconstruction, memory analysis, detection engineering, threat hunting, ATT&CK Navigator mapping, and post-incident recovery, culminating in a full ATT&CK-informed incident investigation capstone portfolio.'
tags = ['mitre-attack', 'incident-response', 'dfir', 'soc-analyst', 'threat-hunting', 'detection-engineering', 'nist-800-61r3', 'forensics', 'windows-security', 'ransomware']
prereqs = ['Basic understanding of operating system internals (Windows and Linux logs)', 'Familiarity with foundational networking protocols (TCP/IP, DNS, HTTP, TLS)', 'Commitment to ethical defensive investigation within authorized boundaries']
objs = [
    'Differentiate security telemetry, events, alerts, and validated incidents using NIST SP 800-61r3',
    'Navigate, query, and map adversary behaviors to the MITRE ATT&CK Enterprise v20.1 matrix',
    'Distinguish between ATT&CK Tactics (why), Techniques (how), Sub-techniques, and empirical Procedures',
    'Apply the ATT&CK v20.1 separation between Stealth (TA0045) and Defense Impairment (TA0046)',
    'Preserve digital evidence following the RFC 3227 Order of Volatility and cryptographic chain of custody',
    'Investigate Windows and Linux endpoint telemetry, including Sysmon, Event ID 4624/4625, and /var/log/auth.log',
    'Triage network PCAP captures, DNS tunneling cadences, TLS handshakes, and phishing email headers',
    'Detect credential spraying, Kerberoasting, LSASS dumping, persistence Run keys, and PsExec lateral movement',
    'Execute Volatility 3 memory analysis to identify injected shellcode (malfind) and hidden processes (psscan)',
    'Deliver an executive-level incident investigation report, ATT&CK Navigator layer, and remediation roadmap'
]
domains = ['soc-blue-team', 'dfir', 'fundamentals']

module_rows = []
lesson_rows = []

for f in module_files:
    basename = os.path.basename(f)
    with open(f, "r", encoding="utf-8") as fp:
        content = fp.read()
    mod_num_m = re.search(r'^(\d+)-', basename)
    if not mod_num_m: continue
    mod_num = int(mod_num_m.group(1))
    
    title_m = re.search(r'#\s+Module\s+\d+:\s+([^\n]+)', content)
    raw_title = title_m.group(1).strip() if title_m else f"Module {mod_num:02d}"
    mod_title = f"Module {mod_num:02d}: {raw_title}"
    
    phase_m = re.search(r'\*\*Stage:\*\*\s*([^\|\n]+)', content)
    phase = phase_m.group(1).strip() if phase_m else "Foundations"
    
    diff_m = re.search(r'\*\*Difficulty:\*\*\s*([^\|\n]+)', content)
    diff_level = diff_m.group(1).strip() if diff_m else "Zero"
    
    time_m = re.search(r'\*\*Estimated guided \+ independent time:\*\*\s*([^\n]+)', content)
    est_time = time_m.group(1).strip() if time_m else "6 hours"
    
    focus_m = re.search(r'\*\*Focus:\*\*\s*([^\n]+)', content)
    focus = focus_m.group(1).strip() if focus_m else "Defensive incident response."
    
    mod_desc = f"{phase} stage ({diff_level} difficulty). Estimated effort: {est_time}. Focus: {focus}"
    mod_uuid = f"dc000000-0000-4000-8000-0000000001{mod_num:02d}"
    
    module_rows.append(
        f"  ('{mod_uuid}', '{course_uuid}', {quote_sql(mod_title)}, {quote_sql(mod_desc)}, {mod_num})"
    )
    
    lesson_matches = list(re.finditer(r'###\s+Lesson\s+(\d+\.\d+):\s+([^\n]+)(.*?)(?=(?:###\s+Lesson|\n##|\Z))', content, re.DOTALL))
    v_info = MODULE_VIDEOS.get(mod_num, MODULE_VIDEOS[1])
    video_id = v_info["videoId"]
    
    for l_idx, lm in enumerate(lesson_matches):
        l_order = l_idx + 1
        lesson_title_raw = lm.group(2).strip()
        l_uuid = f"dc000000-0000-4000-8000-00000001{mod_num:02d}{l_order:02d}"
        l_slug = f"m{mod_num:02d}-l{l_order}-{slugify(lesson_title_raw)}"
        l_title = f"Module {mod_num:02d} - Lesson {l_order}: {lesson_title_raw}"
        l_desc = (
            f"Video-guided incident response lesson examining {lesson_title_raw} "
            f"aligned with MITRE ATT&CK Enterprise v20.1 and NIST SP 800-61r3. "
            f"Focuses on observable attacker tradecraft, telemetry evidence, and defensive decision-making."
        )
        l_obj = [
            f"Master key concepts, terminology, and operational boundaries for {lesson_title_raw}.",
            "Distinguish empirical telemetry evidence from analyst hypotheses and unverified assumptions.",
            "Map observed techniques to the MITRE ATT&CK Enterprise v20.1 matrix and document recommended containment."
        ]
        l_tags = [
            "mitre-attack",
            "incident-response",
            "dfir",
            "soc-analyst",
            f"module-{mod_num:02d}",
            slugify(phase)
        ]
        l_skills = [
            f"Defensive operational triage: {lesson_title_raw}",
            "ATT&CK Enterprise v20.1 behavior mapping and evidence citation",
            "Chronological incident timeline reconstruction (UTC normalized)",
            "Actionable SOC escalation and containment decision-making"
        ]
        
        lesson_rows.append(
            f"  ('{l_uuid}', '{course_uuid}', '{mod_uuid}', {quote_sql(l_slug)}, {quote_sql(l_title)}, {quote_sql(l_desc)}, "
            f"{quote_sql(video_id)}, 35, {l_order}, {to_pg_array(l_obj)}, {to_pg_array(l_tags)}, {to_pg_array(l_skills)})"
        )

sql_parts = [
    "-- =============================================================================",
    "-- CYBERTUBE: SEED MITRE ATT&CK INCIDENT RESPONSE ZERO TO ADVANCED COMPLETE COURSE",
    "-- =============================================================================",
    "",
    "-- 1. Course",
    "INSERT INTO public.courses (",
    "  id, slug, title, short_description, description, difficulty, estimated_duration, total_duration_minutes,",
    "  thumbnail_url, instructor_name, instructor_title, instructor_org, status, tags, prerequisites,",
    "  learning_objectives, track, domains, featured",
    ") VALUES (",
    f"  '{course_uuid}', {quote_sql(course_slug)}, {quote_sql(course_title)}, {quote_sql(course_short)}, {quote_sql(course_desc)},",
    f"  'intermediate', '30 modules (234 hours)', 5250,",
    f"  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',",
    f"  'CyberTube IR Curators & MITRE Open Community', 'Incident Response & SOC Detection Engineers',",
    f"  'MITRE ATT&CK, CISA, TryHackMe & Open DFIR Community', 'published',",
    f"  {to_pg_array(tags)}, {to_pg_array(prereqs)}, {to_pg_array(objs)}, 'cybersecurity', {to_pg_array(domains)}, true",
    ")",
    "ON CONFLICT (slug) DO UPDATE SET",
    "  title = EXCLUDED.title,",
    "  short_description = EXCLUDED.short_description,",
    "  description = EXCLUDED.description,",
    "  difficulty = EXCLUDED.difficulty,",
    "  estimated_duration = EXCLUDED.estimated_duration,",
    "  total_duration_minutes = EXCLUDED.total_duration_minutes,",
    "  thumbnail_url = EXCLUDED.thumbnail_url,",
    "  instructor_name = EXCLUDED.instructor_name,",
    "  instructor_title = EXCLUDED.instructor_title,",
    "  instructor_org = EXCLUDED.instructor_org,",
    "  status = EXCLUDED.status,",
    "  tags = EXCLUDED.tags,",
    "  prerequisites = EXCLUDED.prerequisites,",
    "  learning_objectives = EXCLUDED.learning_objectives,",
    "  track = EXCLUDED.track,",
    "  domains = EXCLUDED.domains,",
    "  featured = EXCLUDED.featured;",
    "",
    "-- 2. Course Modules (30 rows)",
    "INSERT INTO public.course_modules (id, course_id, title, description, order_index) VALUES",
    ",\n".join(module_rows),
    "ON CONFLICT (course_id, order_index) DO UPDATE SET",
    "  title = EXCLUDED.title,",
    "  description = EXCLUDED.description;",
    "",
    "-- 3. Lessons (150 rows)",
    "INSERT INTO public.lessons (",
    "  id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught",
    ") VALUES",
    ",\n".join(lesson_rows),
    "ON CONFLICT (course_id, slug) DO UPDATE SET",
    "  module_id = EXCLUDED.module_id,\n  title = EXCLUDED.title,\n  description = EXCLUDED.description,\n  youtube_video_id = EXCLUDED.youtube_video_id,\n  duration_minutes = EXCLUDED.duration_minutes,\n  order_index = EXCLUDED.order_index,\n  objectives = EXCLUDED.objectives,\n  tags = EXCLUDED.tags,\n  skills_taught = EXCLUDED.skills_taught;"
]

final_sql = "\n".join(sql_parts)

out_file = os.path.join(base_dir, "supabase/migrations/20261121150000_seed_mitre_attack_incident_response_course.sql")
with open(out_file, "w", encoding="utf-8") as f:
    f.write(final_sql)

print(f"Generated complete compact migration file: {len(final_sql)} characters ({len(final_sql)/1024:.1f} KB)")
