import os
import sys
import json

sys.path.append('scripts')
from canonical_data_definitions import CANONICAL_MODULES_DEF
from canonical_phase2_3 import PHASE_2_AND_3_MODULES

all_modules = CANONICAL_MODULES_DEF + PHASE_2_AND_3_MODULES

with open('scripts/IOT-120-LESSON-SEMANTIC-AUDIT.json', 'r', encoding='utf-8') as f:
    audit_data = json.load(f)

videos_by_order = {r['lessonOrder']: r for r in audit_data['auditRecords']}
total_runtime_minutes = sum(r['measuredDurationMinutes'] for r in audit_data['auditRecords'])

sql_lines = [
    "-- CYBERTUBE IoT CYBERSECURITY & ETHICAL HACKING: COMPLETE INSTRUCTIONAL QUALITY OVERHAUL",
    "-- Exactly 30 modules • 120 lessons • 120 unique verified videos • 0 duplicates • Zero quizzes",
    "-- Idempotent upsert strictly preserving learner progress and low-voltage DC bounds (<=3.3V logic)",
    "BEGIN;",
    "",
    "-- 1. UPSERT COURSE",
    "INSERT INTO public.courses (",
    "  id, slug, title, short_description, description, difficulty, status,",
    "  estimated_duration, total_duration_minutes, thumbnail_url, instructor_name,",
    "  instructor_title, instructor_org, prerequisites, learning_objectives, domains, tags, featured, track",
    ") VALUES (",
    "  'e1000000-0000-4000-8000-000000000001'::uuid,",
    "  'iot-cybersecurity-zero-to-advanced',",
    "  'IoT Cybersecurity & Ethical Hacking: Zero to Advanced',",
    "  '30 modules • 120 video-guided lessons • 120 unique video tutorials • 30 practical labs • 6 portfolio milestones • Capstone. Zero quizzes.',",
    "  'Comprehensive 30-module, 120-lesson professional curriculum in IoT hardware security and ethical hacking. Features 120 distinct, verified YouTube video tutorials with measured runtimes, step-by-step breadboard and discrete circuit CAD, interactive Three.js 3D hardware inspection, 30 practical labs, and a 100-mark portfolio capstone. Covers low-voltage electronics, ESP32 firmware, MQTT/TLS cryptography, Ghidra reverse engineering, QEMU emulation, OWASP IoTGoat, hardware debug interfaces, and IoT SOC detection engineering. No quizzes.',",
    "  'intermediate',",
    "  'published',",
    f"  '32 hours of video tutorials • 190 total hands-on study & lab hours',",
    f"  {total_runtime_minutes},",
    "  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',",
    "  'CyberTube IoT Cybersecurity Curriculum',",
    "  'Curated open videos, code CAD diagrams, and defensive lab guides',",
    "  'CyberTube',",
    "  ARRAY['Basic computer literacy and terminal familiarity','An isolated or personally owned, expressly authorized IoT training environment','Strict adherence to low-voltage DC safety (<=3.3V logic) and legal lab boundaries']::text[],",
    "  ARRAY['Wire, measure, and safely control discrete electronic circuits with ESP32 microcontrollers','Develop defensive firmware with debouncing, watchdog timers, and encrypted secret storage','Secure IoT communications using Mosquitto topic ACLs, Wi-Fi segmentation, and Mutual TLS','Extract and reverse engineer embedded firmware binaries using Ghidra, binwalk, and QEMU','Safely audit hardware debug interfaces (UART, JTAG, SWD) with 3.3V logic analyzers','Build automated IoT SOC detection rules for anomalous MQTT traffic and botnet telemetry','Deliver an end-to-end secure connected monitoring capstone with defensible evidence']::text[],",
    "  ARRAY['iot-embedded-security','soc-blue-team','dfir','network-security']::text[],",
    "  ARRAY['iot','embedded-security','esp32','hardware-hacking','firmware','mqtt','tls','dfir','blue-team','no-quizzes']::text[],",
    "  true,",
    "  'cybersecurity'",
    ") ON CONFLICT (id) DO UPDATE SET",
    "  slug=EXCLUDED.slug, title=EXCLUDED.title, short_description=EXCLUDED.short_description,",
    "  description=EXCLUDED.description, difficulty=EXCLUDED.difficulty, status=EXCLUDED.status,",
    "  estimated_duration=EXCLUDED.estimated_duration, total_duration_minutes=EXCLUDED.total_duration_minutes,",
    "  thumbnail_url=EXCLUDED.thumbnail_url, instructor_name=EXCLUDED.instructor_name,",
    "  instructor_title=EXCLUDED.instructor_title, instructor_org=EXCLUDED.instructor_org,",
    "  prerequisites=EXCLUDED.prerequisites, learning_objectives=EXCLUDED.learning_objectives,",
    "  domains=EXCLUDED.domains, tags=EXCLUDED.tags, featured=EXCLUDED.featured, track=EXCLUDED.track;",
    "",
    "-- 2. UPSERT 30 MODULES",
]

for idx, m in enumerate(all_modules):
    m_order = idx + 1
    mod_uuid = f"e1000000-{m_order:04x}-4000-8000-000000000001"
    clean_title = f"Module {m_order:02d}: {m['title']}".replace("'", "''")
    clean_desc = f"{m['phase']} Phase. {m['hours']} hours. Aim: {m['aim']}".replace("'", "''")
    sql_lines.append(f"INSERT INTO public.course_modules (id, course_id, title, description, order_index) VALUES (")
    sql_lines.append(f"  '{mod_uuid}'::uuid, 'e1000000-0000-4000-8000-000000000001'::uuid, '{clean_title}', '{clean_desc}', {m_order}")
    sql_lines.append(f") ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, description=EXCLUDED.description, order_index=EXCLUDED.order_index WHERE course_modules.course_id=EXCLUDED.course_id;")

sql_lines.append("")
sql_lines.append("-- 3. UPSERT 120 LESSONS")

global_lesson_order = 1
for m_idx, m in enumerate(all_modules):
    m_order = m_idx + 1
    mod_uuid = f"e1000000-{m_order:04x}-4000-8000-000000000001"
    for l_idx, lesson in enumerate(m['lessons']):
        l_in_m = l_idx + 1
        les_uuid = f"e1000000-{m_order:02x}{l_in_m:02d}-4000-8000-000000000001"
        v_info = videos_by_order[global_lesson_order]
        
        slug_raw = f"m{m_order:02d}-l{l_in_m:02d}-{lesson['title'].lower()}"
        slug = "".join(c if c.isalnum() or c == '-' else '-' for c in slug_raw).strip('-')
        while '--' in slug:
            slug = slug.replace('--', '-')
            
        clean_title = f"Module {m_order:02d} - Lesson {l_in_m}: {lesson['title']}".replace("'", "''")
        clean_desc = f"{lesson['activity']} Practice: {lesson['practice']}".replace("'", "''")
        vid_id = v_info['videoId']
        dur = v_info['measuredDurationMinutes']
        
        obj1 = f"Master {lesson['title']}".replace("'", "''")
        obj2 = f"Apply: {lesson['practice']}".replace("'", "''")
        obj3 = "Strict <=3.3V DC limits & ethical ROE"
        
        tag1 = 'iot'
        tag2 = f"module-{m_order:02d}"
        tag3 = 'hardware-security'
        tag4 = 'no-quizzes'
        
        skill1 = lesson['title'].replace("'", "''")
        skill2 = "Defensive IoT engineering"
        
        sql_lines.append(f"INSERT INTO public.lessons (id, module_id, course_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught) VALUES (")
        sql_lines.append(f"  '{les_uuid}'::uuid, '{mod_uuid}'::uuid, 'e1000000-0000-4000-8000-000000000001'::uuid, '{slug}', '{clean_title}', '{clean_desc}', '{vid_id}', {dur}, {l_in_m},")
        sql_lines.append(f"  ARRAY['{obj1}', '{obj2}', '{obj3}']::text[],")
        sql_lines.append(f"  ARRAY['{tag1}', '{tag2}', '{tag3}', '{tag4}']::text[],")
        sql_lines.append(f"  ARRAY['{skill1}', '{skill2}']::text[]")
        sql_lines.append(f") ON CONFLICT (id) DO UPDATE SET slug=EXCLUDED.slug, title=EXCLUDED.title, description=EXCLUDED.description, youtube_video_id=EXCLUDED.youtube_video_id, duration_minutes=EXCLUDED.duration_minutes, order_index=EXCLUDED.order_index, objectives=EXCLUDED.objectives, tags=EXCLUDED.tags, skills_taught=EXCLUDED.skills_taught WHERE lessons.course_id=EXCLUDED.course_id AND lessons.module_id=EXCLUDED.module_id;")
        
        global_lesson_order += 1

sql_lines.append("")
sql_lines.append("COMMIT;")

migration_path = 'supabase/migrations/20261125080000_update_iot_course_instructional_quality.sql'
with open(migration_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_lines))

print(f"Generated {migration_path} with {len(all_modules)} modules and {global_lesson_order - 1} lessons!")
