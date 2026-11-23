import glob
import os
import re
import json

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def quote_sql(text):
    if text is None:
        return "NULL"
    escaped = text.replace("'", "''")
    return f"'{escaped}'"

def to_pg_array(items):
    if not items:
        return "ARRAY[]::TEXT[]"
    escaped_items = []
    for item in items:
        clean = item.replace("'", "''")
        escaped_items.append(f"'{clean}'")
    return f"ARRAY[{', '.join(escaped_items)}]::TEXT[]"

def generate():
    base_dir = r"C:\Users\dutch\.gemini\antigravity\scratch\CyberTube-discover-v3"
    modules_dir = r"C:\Users\dutch\.gemini\antigravity\scratch\uploaded_zip\Python_for_Cybersecurity\modules"
    files = sorted(glob.glob(os.path.join(modules_dir, "*.md")))

    print(f"Discovered {len(files)} module files.")

    course_uuid = "df000000-0000-4000-8000-000000000001"
    course_slug = "python-for-cybersecurity-zero-to-advanced"

    modules = []
    sql_modules = []
    sql_lessons = []
    
    total_minutes = 0

    for m_idx, fpath in enumerate(files, 1):
        content = open(fpath, "r", encoding="utf-8").read()

        # Module Header
        m_head = re.search(r'^#\s+Module\s+(\d+)\s+[\u2014-]\s+(.*)$', content, re.MULTILINE)
        mod_num = int(m_head.group(1)) if m_head else m_idx
        mod_title_raw = m_head.group(2).strip() if m_head else f"Module {mod_num}"
        mod_title = f"Module {mod_num:02d}: {mod_title_raw}"

        # Meta
        meta_m = re.search(r'\*\*Phase:\*\*\s*(.*?)\s*·\s*\*\*Estimated time:\*\*\s*(.*?)\s*·\s*\*\*Prerequisite:\*\*\s*(.*?)\s*·\s*\*\*Primary role:\*\*\s*(.*?)$', content, re.MULTILINE)
        phase = meta_m.group(1).strip() if meta_m else 'Foundation'
        est_time = meta_m.group(2).strip() if meta_m else '4-6 hours'
        prereq = meta_m.group(3).strip() if meta_m else 'None'
        role = meta_m.group(4).strip() if meta_m else 'SOC Analyst / Defender'

        # Why matters
        why_m = re.search(r'## Why this module matters in cybersecurity\s*\n\n(.*?)(?=\n\n##|\Z)', content, re.DOTALL)
        why_matters = why_m.group(1).strip() if why_m else ''

        # Outcomes
        outcomes_m = re.search(r'## Learning outcomes\s*\n\nAfter completing this module you should be able to:\s*\n(.*?)(?=\n\n##|\Z)', content, re.DOTALL)
        outcomes = []
        if outcomes_m:
            outcomes = [re.sub(r'^\d+\.\s*', '', line).strip() for line in outcomes_m.group(1).strip().split('\n') if line.strip()]

        # Lab details
        lab_m = re.search(r'## Guided hands-on lab\s*\n\n\*\*Scenario:\*\*\s*(.*?)(?=\n\n### Procedure|\Z)', content, re.DOTALL)
        lab_scenario = lab_m.group(1).strip() if lab_m else ''

        proc_m = re.search(r'### Procedure\s*\n(.*?)(?=\n\n### Required submission|\Z)', content, re.DOTALL)
        proc_steps = [re.sub(r'^\d+\.\s*', '', line).strip() for line in proc_m.group(1).strip().split('\n') if line.strip()] if proc_m else []

        sub_m = re.search(r'### Required submission\s*\n\n(.*?)(?=\n\n### Acceptance checks|\Z)', content, re.DOTALL)
        sub_text = sub_m.group(1).strip() if sub_m else ''

        acc_m = re.search(r'### Acceptance checks\s*\n(.*?)(?=\n\n## Self-review|\Z)', content, re.DOTALL)
        acc_checks = [re.sub(r'^-\s*\[\s*\]\s*', '', line).strip() for line in acc_m.group(1).strip().split('\n') if line.strip()] if acc_m else []

        # References
        ref_m = re.search(r'## Free references\s*\n(.*?)(?=\n\n## Common mistakes|\Z)', content, re.DOTALL)
        further_reading = []
        if ref_m:
            matches = re.findall(r'-\s*\[(.*?)\]\((.*?)\)', ref_m.group(1))
            for title_str, url_str in matches:
                further_reading.append({
                    "title": title_str.strip(),
                    "url": url_str.strip()
                })

        # Module description
        mod_desc = f"{phase} phase. {why_matters} {est_time}. Role focus: {role}. Prerequisite: {prereq}."

        mod_uuid = f"df000000-{mod_num:04x}-4000-8000-000000000001"
        mod_id = f"mod-pysec-m{mod_num:02d}"

        # Parse lessons
        lessons_raw = re.split(r'###\s+Lesson\s+(\d+\.\d+)\s+[\u2014-]\s+', content)
        module_lessons = []

        lesson_seq = 1
        for i in range(1, len(lessons_raw), 2):
            les_code = lessons_raw[i] # e.g. "01.1"
            les_body = lessons_raw[i+1]

            title_m = re.match(r'^(.*?)\n', les_body)
            les_title_raw = title_m.group(1).strip() if title_m else f"Lesson {lesson_seq}"
            les_title = f"Module {mod_num:02d} - Lesson {lesson_seq}: {les_title_raw}"

            watch_m = re.search(r'\*\*Watch:\*\*\s+\[(.*?)\]\((.*?)\)', les_body)
            watch_label = watch_m.group(1) if watch_m else ''
            watch_url = watch_m.group(2) if watch_m else ''

            yt_id_m = re.search(r'(?:v=|youtu\.be/)([\w-]{11})', watch_url)
            yt_id = yt_id_m.group(1) if yt_id_m else ''

            align_m = re.search(r'\n\n\*\*(Direct topic demonstration|Technique bridge[^\*]*)\*\*', les_body)
            align_type = align_m.group(1).strip() if align_m else 'Direct topic demonstration'

            prac_m = re.search(r'\*\*Practical instruction:\*\*\s*(.*?)(?=\n\n\*\*|\Z)', les_body, re.DOTALL)
            prac_inst = prac_m.group(1).strip() if prac_m else ''

            ver_m = re.search(r'\*\*Verify understanding:\*\*\s*(.*?)(?=\n\n\*\*|\Z)', les_body, re.DOTALL)
            ver_und = ver_m.group(1).strip() if ver_m else ''

            inst_m = re.search(r'\*\*Instructor prompt:\*\*\s*(.*?)(?=\n\n##|\n\n###|\Z)', les_body, re.DOTALL)
            inst_p = inst_m.group(1).strip() if inst_m else ''

            les_slug = f"m{mod_num:02d}-l{lesson_seq}-{slugify(les_title_raw)}"
            les_uuid = f"df000000-{mod_num:04x}-4000-8000-{lesson_seq:012x}"
            les_id = f"les-pysec-m{mod_num:02d}-l{lesson_seq:02d}"

            les_desc = f"{align_type}. {prac_inst} Verification: {ver_und}"
            les_duration = 35 # 35 minutes per lesson
            total_minutes += les_duration

            les_objectives = [
                prac_inst if prac_inst else f"Master {les_title_raw} techniques",
                f"Verify implementation: {ver_und}" if ver_und else "Validate test execution and safety constraints",
                f"Topic alignment: {align_type}"
            ]
            if outcomes:
                les_objectives.extend(outcomes[:2])

            les_tags = ["python", "cybersecurity", f"module-{mod_num:02d}", slugify(phase)]
            les_skills = [
                les_title_raw,
                f"Security Python Scripting (Mod {mod_num:02d})",
                "Defensive Evidence Handling"
            ]

            # Rich Content
            creator_name = watch_label.split('—')[0].strip() if '—' in watch_label else "CyberTube Educator"
            rich_content = {
                "introduction": f"In this video-guided lesson ({les_title_raw}), learn defensive programming with video instruction by {creator_name}. Follow along, pause the recording to code in your sandbox, and verify the resulting telemetry.",
                "prerequisites": [
                    f"Python 3.10+ installed and isolated lab configured ({prereq})",
                    "Command terminal or VS Code configured for defensive scripting"
                ],
                "theorySections": [
                    {
                        "title": f"Core Security Principles: {les_title_raw}",
                        "content": f"{why_matters}\n\nAlignment context: {align_type}. Always ensure scripts run within authorized scope boundaries and avoid executing unvetted remote inputs.",
                        "keyPoints": [
                            prac_inst,
                            f"Verification rule: {ver_und}",
                            f"Instructor recommendation: {inst_p}"
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Interactive Study & Code Along",
                        "instruction": f"Watch the timestamped video lesson: '{watch_label}'. Pause and recreate the demonstrated code patterns in your development environment.",
                        "expectedOutcome": "Code compiles and runs without syntax or runtime exceptions."
                    },
                    {
                        "step": 2,
                        "title": "Execute Practical Security Task",
                        "instruction": prac_inst,
                        "expectedOutcome": ver_und
                    },
                    {
                        "step": 3,
                        "title": "Verify Defenses & Provenance",
                        "instruction": f"Run sanity checks and test against unexpected inputs. {inst_p}",
                        "expectedOutcome": "Script executes deterministically and handles edge cases safely."
                    }
                ],
                "expectedObservations": [
                    ver_und,
                    "Strict adherence to safe isolated lab boundaries without touching production networks.",
                    "Repeatable execution with logged input/output fixtures."
                ],
                "commonMistakes": [
                    "Testing scripts against production endpoints without explicit written authorization.",
                    "Hardcoding credentials or API keys directly in script source code.",
                    "Failing to handle file-not-found, encoding, or malformed data exceptions."
                ],
                "securityRelevance": f"In enterprise security operations, automation must be reliable, auditable, and resilient. {why_matters}",
                "furtherReading": further_reading
            }

            lesson_obj = {
                "id": les_id,
                "slug": les_slug,
                "title": les_title,
                "description": les_desc,
                "youtubeVideoId": yt_id,
                "videoAttribution": {
                    "creator": creator_name,
                    "platform": "youtube"
                },
                "durationMinutes": les_duration,
                "order": lesson_seq,
                "moduleTitle": mod_title,
                "objectives": les_objectives,
                "tags": les_tags,
                "skillsTaught": les_skills,
                "richContent": rich_content
            }

            module_lessons.append(lesson_obj)

            # Prepare SQL record for lesson
            sql_lessons.append({
                "uuid": les_uuid,
                "module_uuid": mod_uuid,
                "slug": les_slug,
                "title": les_title,
                "description": les_desc,
                "youtube_video_id": yt_id,
                "duration_minutes": les_duration,
                "order_index": (m_idx - 1) * 4 + lesson_seq,
                "objectives": les_objectives,
                "tags": les_tags,
                "skills_taught": les_skills
            })

            lesson_seq += 1

        # Practical lab structure for module
        practical_lab = {
            "id": f"lab-pysec-m{mod_num:02d}",
            "title": f"Lab {mod_num:02d}: {mod_title_raw} Hands-on Implementation",
            "objective": f"{why_matters} {lab_scenario}",
            "toolsRequired": ["Python 3.10+", "VS Code / Preferred Editor", "Safe Isolated Lab Directory"],
            "pcapSource": {
                "fileName": f"synthetic_m{mod_num:02d}_dataset.json",
                "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/synthetic_labs.json"
            },
            "difficulty": "intermediate" if mod_num > 10 else "beginner",
            "estimatedMinutes": 60,
            "instructions": proc_steps if proc_steps else [
                "Initialize your Python virtual environment in an isolated directory.",
                "Implement the required security automation logic according to lab objectives.",
                "Execute the test suite and capture sanitized console output.",
                "Verify acceptance criteria and save deliverables."
            ],
            "tasks": [
                {
                    "id": f"task-m{mod_num:02d}-1",
                    "description": proc_steps[0] if len(proc_steps) > 0 else "Set up isolated environment and verify Python execution."
                },
                {
                    "id": f"task-m{mod_num:02d}-2",
                    "description": proc_steps[1] if len(proc_steps) > 1 else "Develop the core automation script and implement error handling."
                },
                {
                    "id": f"task-m{mod_num:02d}-3",
                    "description": proc_steps[2] if len(proc_steps) > 2 else "Run verification checks with standard and malformed input test cases."
                }
            ],
            "evidenceWorksheet": [
                {
                    "field": "environment_provenance",
                    "prompt": "Document your Python version, OS environment, and isolated directory path.",
                    "expectedEvidenceType": "Text transcript"
                },
                {
                    "field": "execution_output",
                    "prompt": "Provide terminal output demonstrating successful execution and edge-case handling.",
                    "expectedEvidenceType": "Terminal output log"
                }
            ],
            "questions": [],
            "completionCriteria": acc_checks if acc_checks else [
                "Script executes without unhandled exceptions.",
                "All test cases pass with deterministic output.",
                "No credentials or proprietary target data exposed."
            ]
        }

        module_obj = {
            "id": mod_id,
            "title": mod_title,
            "description": mod_desc,
            "order": m_idx,
            "lessons": module_lessons,
            "practicalLab": practical_lab
        }

        # Capstone assessment on Module 30
        if mod_num == 30:
            module_obj["capstoneAssessment"] = {
                "id": "capstone-python-soc-pipeline",
                "title": "Comprehensive Capstone: Offline SOC Automation Pipeline",
                "scenario": "Given a folder of synthetic Linux authentication lines, Windows Event XML fragments, alert JSON, and a mock IOC feed, build a repeatable, modular Python pipeline that produces an auditable one-page incident investigation report.",
                "pcapSource": {
                    "fileName": "soc_capstone_synthetic_fixtures.zip",
                    "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/data/soc_capstone_fixtures.zip"
                },
                "totalMarks": 100,
                "passingScore": 75,
                "rubric": [
                    {
                        "category": "Python Correctness & Maintainability",
                        "marks": 20,
                        "criteria": ["Modular design", "Type validation", "Clear naming", "Defensive error handling"]
                    },
                    {
                        "category": "Evidence Handling & Normalization",
                        "marks": 20,
                        "criteria": ["Original inputs unchanged", "Data provenance", "UTC normalization", "Malformed record handling"]
                    },
                    {
                        "category": "Detection Reasoning & False Positives",
                        "marks": 20,
                        "criteria": ["Documented thresholds", "Careful uncertainty", "No unwarranted compromise conclusions"]
                    },
                    {
                        "category": "Automated Tests & Reproducibility",
                        "marks": 15,
                        "criteria": [">=15 unit tests", "Boundary and negative test cases", "Clear execution instructions"]
                    },
                    {
                        "category": "Security Engineering",
                        "marks": 15,
                        "criteria": ["Offline-by-default execution", "Strict input validation", "Timeouts and secret protection"]
                    },
                    {
                        "category": "Reporting & Communication",
                        "marks": 10,
                        "criteria": ["Concise incident summary", "Actionable recommendations", "Clear documentation of limitations"]
                    }
                ],
                "submissionSections": [
                    {
                        "id": "code_repository",
                        "title": "Modular Source Code & Test Suite",
                        "prompt": "Link your Git repository containing ingest, normalize, triage, and reporting modules with >=15 tests.",
                        "maxMarks": 40
                    },
                    {
                        "id": "investigation_report",
                        "title": "Investigation Report & Analyst Recommendations",
                        "prompt": "Provide your investigation_report.md containing incident timeline, evidence artifacts, confidence scoring, and mitigations.",
                        "maxMarks": 30
                    },
                    {
                        "id": "threat_model",
                        "title": "Pipeline Threat Model & Operational Hardening",
                        "prompt": "Provide your threat model covering secrets handling, sandbox boundaries, error paths, and permission controls.",
                        "maxMarks": 30
                    }
                ]
            }

        modules.append(module_obj)

        sql_modules.append({
            "uuid": mod_uuid,
            "title": mod_title,
            "description": mod_desc,
            "order_index": m_idx
        })

    # Assemble Course Object
    course_data = {
        "id": "course-python-for-cybersecurity-zero-to-advanced",
        "slug": course_slug,
        "title": "Python for Cybersecurity — Zero to Advanced",
        "shortDescription": "Master defensive Python scripting, log forensics, IOC extraction, PCAP analysis, and automated SOC pipelines with 30 hands-on modules and 120 video-guided lessons (70 hours structured video + 130–150 hours guided labs & coding).",
        "description": "A comprehensive, defense-first 30-module curriculum designed for aspiring and practicing cybersecurity defenders, junior SOC analysts, and security engineers. Features 70 hours of structured video lessons across 30 modules, paired with 130–150 hours of guided hands-on coding, log forensics labs, and capstone engineering (200–220 total study hours). Learn to automate incident investigation workflows, parse EVTX and auth logs, dissect PCAPs with Scapy, enrich IOCs, correlate telemetry against MITRE ATT&CK, test Sigma rules, query SIEM APIs, and build production-grade SOC automation tools in Python.",
        "domains": [
            "soc-blue-team",
            "fundamentals",
            "dfir"
        ],
        "tags": [
            "python",
            "cybersecurity",
            "soc-automation",
            "scripting",
            "blue-team",
            "scapy",
            "log-analysis",
            "mitre-attack",
            "incident-response"
        ],
        "difficulty": "intermediate",
        "thumbnailUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        "estimatedDuration": "70 hours video • 200–220 study hours (with coding, reading & labs)",
        "totalDurationMinutes": total_minutes,
        "instructor": {
            "name": "CyberTube Open Cybersecurity & Python Faculty",
            "title": "Security Automation & Defensive Engineering Instructors",
            "organization": "CyberTube Academy & Open Security Community"
        },
        "prerequisites": [
            "Basic computer literacy and understanding of cybersecurity core concepts",
            "Python 3 installed with a code editor (VS Code, PyCharm, or similar)",
            "An isolated lab workspace (virtual machine or dedicated test directory)"
        ],
        "learningObjectives": [
            "Write clean, safe, auditable Python 3 scripts for defensive security automation",
            "Parse, normalize, and extract IOCs from Linux auth logs, Windows EVTX, CSV, and JSON feeds",
            "Conduct offline packet forensics and dissect protocol handshakes using Scapy",
            "Enrich synthetic alerts with threat intelligence feeds, CVE/NVD data, and MITRE ATT&CK techniques",
            "Build, test, and package robust CLI incident response tools and automated SOC playbooks",
            "Design and deploy an end-to-end modular SOC automation pipeline in the comprehensive capstone assessment"
        ],
        "featured": True,
        "track": "cybersecurity",
        "modules": modules
    }

    # Write TypeScript course definition
    ts_content = "import { Course } from '../types/course';\n\n"
    ts_content += f"export const PYTHON_FOR_CYBERSECURITY_COURSE: Course = {json.dumps(course_data, indent=2)};\n"

    target_ts_paths = [
        os.path.join(base_dir, "src/data/python-for-cybersecurity-course.ts"),
        r"C:\Users\dutch\.gemini\antigravity\scratch\cybertube\src\data\python-for-cybersecurity-course.ts"
    ]
    for p in target_ts_paths:
        with open(p, "w", encoding="utf-8") as f:
            f.write(ts_content)
        print(f"Written TS course file to {p} successfully!")

    # Write SQL migration file
    sql_lines = [
        "-- =============================================================================",
        "-- CYBERTUBE: SEED PYTHON FOR CYBERSECURITY ZERO TO ADVANCED COMPLETE COURSE",
        "-- =============================================================================",
        "-- Description:",
        "-- Idempotently seeds the 30-module Python for Cybersecurity course,",
        "-- all 30 modules, and all 120 video lessons into the Supabase database.",
        "-- =============================================================================",
        "",
        "DO $$",
        f"DECLARE",
        f"  v_course_id CONSTANT UUID := '{course_uuid}';",
        "BEGIN",
        "  -- 1. Insert/Update Course",
        "  INSERT INTO public.courses (",
        "    id,",
        "    slug,",
        "    title,",
        "    short_description,",
        "    description,",
        "    difficulty,",
        "    estimated_duration,",
        "    total_duration_minutes,",
        "    thumbnail_url,",
        "    instructor_name,",
        "    instructor_title,",
        "    instructor_org,",
        "    status,",
        "    tags,",
        "    prerequisites,",
        "    learning_objectives,",
        "    track,",
        "    domains,",
        "    featured",
        "  ) VALUES (",
        "    v_course_id,",
        f"    {quote_sql(course_slug)},",
        f"    {quote_sql(course_data['title'])},",
        f"    {quote_sql(course_data['shortDescription'])},",
        f"    {quote_sql(course_data['description'])},",
        "    'intermediate',",
        f"    {quote_sql(course_data['estimatedDuration'])},",
        f"    {total_minutes},",
        f"    {quote_sql(course_data['thumbnailUrl'])},",
        f"    {quote_sql(course_data['instructor']['name'])},",
        f"    {quote_sql(course_data['instructor']['title'])},",
        f"    {quote_sql(course_data['instructor']['organization'])},",
        "    'published',",
        f"    {to_pg_array(course_data['tags'])},",
        f"    {to_pg_array(course_data['prerequisites'])},",
        f"    {to_pg_array(course_data['learningObjectives'])},",
        "    'cybersecurity',",
        f"    {to_pg_array(course_data['domains'])},",
        "    TRUE",
        "  )",
        "  ON CONFLICT (slug) DO UPDATE SET",
        "    title = EXCLUDED.title,",
        "    short_description = EXCLUDED.short_description,",
        "    description = EXCLUDED.description,",
        "    difficulty = EXCLUDED.difficulty,",
        "    estimated_duration = EXCLUDED.estimated_duration,",
        "    total_duration_minutes = EXCLUDED.total_duration_minutes,",
        "    thumbnail_url = EXCLUDED.thumbnail_url,",
        "    instructor_name = EXCLUDED.instructor_name,",
        "    instructor_title = EXCLUDED.instructor_title,",
        "    instructor_org = EXCLUDED.instructor_org,",
        "    status = EXCLUDED.status,",
        "    tags = EXCLUDED.tags,",
        "    prerequisites = EXCLUDED.prerequisites,",
        "    learning_objectives = EXCLUDED.learning_objectives,",
        "    track = EXCLUDED.track,",
        "    domains = EXCLUDED.domains,",
        "    featured = EXCLUDED.featured;",
        ""
    ]

    sql_lines.append("  -- 2. Insert/Update 30 Modules")
    for sm in sql_modules:
        sql_lines.append(f"  INSERT INTO public.course_modules (id, course_id, title, description, order_index)")
        sql_lines.append(f"  VALUES ('{sm['uuid']}', v_course_id, {quote_sql(sm['title'])}, {quote_sql(sm['description'])}, {sm['order_index']})")
        sql_lines.append(f"  ON CONFLICT (course_id, order_index) DO UPDATE SET")
        sql_lines.append(f"    title = EXCLUDED.title,")
        sql_lines.append(f"    description = EXCLUDED.description;")
        sql_lines.append("")

    sql_lines.append("  -- 3. Insert/Update 120 Lessons")
    for sl in sql_lessons:
        sql_lines.append(f"  INSERT INTO public.lessons (")
        sql_lines.append(f"    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught")
        sql_lines.append(f"  ) VALUES (")
        sql_lines.append(f"    '{sl['uuid']}',")
        sql_lines.append(f"    v_course_id,")
        sql_lines.append(f"    '{sl['module_uuid']}',")
        sql_lines.append(f"    {quote_sql(sl['slug'])},")
        sql_lines.append(f"    {quote_sql(sl['title'])},")
        sql_lines.append(f"    {quote_sql(sl['description'])},")
        sql_lines.append(f"    {quote_sql(sl['youtube_video_id'])},")
        sql_lines.append(f"    {sl['duration_minutes']},")
        sql_lines.append(f"    {sl['order_index']},")
        sql_lines.append(f"    {to_pg_array(sl['objectives'])},")
        sql_lines.append(f"    {to_pg_array(sl['tags'])},")
        sql_lines.append(f"    {to_pg_array(sl['skills_taught'])}")
        sql_lines.append(f"  )")
        sql_lines.append(f"  ON CONFLICT (course_id, slug) DO UPDATE SET")
        sql_lines.append(f"    module_id = EXCLUDED.module_id,")
        sql_lines.append(f"    title = EXCLUDED.title,")
        sql_lines.append(f"    description = EXCLUDED.description,")
        sql_lines.append(f"    youtube_video_id = EXCLUDED.youtube_video_id,")
        sql_lines.append(f"    duration_minutes = EXCLUDED.duration_minutes,")
        sql_lines.append(f"    order_index = EXCLUDED.order_index,")
        sql_lines.append(f"    objectives = EXCLUDED.objectives,")
        sql_lines.append(f"    tags = EXCLUDED.tags,")
        sql_lines.append(f"    skills_taught = EXCLUDED.skills_taught;")
        sql_lines.append("")

    sql_lines.append("END $$;")

    migration_paths = [
        os.path.join(base_dir, "supabase/migrations/20261121170000_seed_python_cybersecurity_course.sql"),
        r"C:\Users\dutch\.gemini\antigravity\scratch\cybertube\supabase\migrations\20261121170000_seed_python_cybersecurity_course.sql"
    ]
    for mp in migration_paths:
        with open(mp, "w", encoding="utf-8") as f:
            f.write("\n".join(sql_lines))
        print(f"Written SQL migration file to {mp} successfully!")

    print(f"Course generation complete! 30 modules, {len(sql_lessons)} lessons, total duration: {total_minutes} mins.")

if __name__ == "__main__":
    generate()
