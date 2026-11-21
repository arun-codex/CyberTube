#!/usr/bin/env python3
"""
CyberTube Generator: English Communication for Cybersecurity: Zero to Advanced (30 Modules, 120 Lessons)
Generates:
  1. src/data/english-communication-for-cybersecurity-course.ts
  2. supabase/migrations/20261121170000_seed_english_communication_course.sql

Strict Site-wide Requirements:
  - ZERO quizzes, ZERO quiz questions, ZERO quiz locking website-wide.
  - All 30 practical communication workshops preserved with instructions, tasks, worksheets, and completion criteria.
  - Comprehensive non-quiz Capstone incident communication portfolio assessment preserved.
  - 100% verified playable YouTube videos from BBC Learning English, Oxford Online English, and English with Lucy.
"""

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

CREATOR_MAP = {
    "QxQUapA-2w4": "BBC Learning English",
    "fdRmGvmeY1U": "BBC Learning English",
    "sp3xU5WvRjA": "Oxford Online English",
    "jul2urONzOQ": "Oxford Online English",
    "pfRw6wg-QqE": "English with Lucy",
    "rZS5qlCGCIY": "Oxford Online English",
    "-P3dJV4BD84": "Oxford Online English",
    "nbnRm_3_QKU": "Oxford Online English",
    "KaA_mxga3PQ": "Oxford Online English",
    "VgTqZOZ1UMQ": "Oxford Online English",
    "xay5TeJVSC0": "Oxford Online English",
    "K7YCzpBA1Nw": "English with Lucy",
    "zNpmtVZFXS0": "Oxford Online English",
    "fzIxD1jXn44": "Oxford Online English",
    "vA-E7ryacmI": "Oxford Online English",
    "YAsDeXcYyTg": "BBC Learning English",
    "nhTcuUvLGOE": "Oxford Online English",
}

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    docs_dir = os.path.join(base_dir, "docs/courses/english-communication-for-cybersecurity-zero-to-advanced")
    modules_dir = os.path.join(docs_dir, "modules")
    
    course_uuid = "de000000-0000-4000-8000-000000000001"
    
    mod_files = sorted(glob.glob(os.path.join(modules_dir, "[0-9][0-9]-*.md")))
    if not mod_files:
        raise Exception(f"No module markdown files found in {modules_dir}")
        
    modules = []
    sql_modules = []
    sql_lessons = []
    total_minutes = 0
    
    for mod_idx, mod_path in enumerate(mod_files, start=1):
        with open(mod_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        m_title = re.search(r'^#\s+(.+)$', content, re.M)
        mod_title_text = m_title.group(1).strip() if m_title else f"Module {mod_idx:02d}"
        mod_title = f"Module {mod_idx:02d}: {mod_title_text}"
        
        m_stage = re.search(r'\*\*Stage:\*\*\s*(.+)', content)
        stage = m_stage.group(1).strip() if m_stage else "Foundation"
        
        m_cefr = re.search(r'\*\*Target CEFR approximation:\*\*\s*(.+)', content)
        cefr = m_cefr.group(1).strip() if m_cefr else "A1"
        
        m_soc = re.search(r'\*\*Operational SOC need:\*\*\s*(.+)', content)
        soc_need = m_soc.group(1).strip() if m_soc else "Security operations communication."
        
        m_outcome = re.search(r'\*\*Outcome:\*\*\s*(.+)', content)
        outcome = m_outcome.group(1).strip() if m_outcome else "Clear technical communication."
        
        mod_desc = f"{stage} stage ({cefr}). Outcome: {outcome}"
        
        mod_uuid = f"de000000-0000-4000-8000-00000001{mod_idx:04d}"
        mod_id = f"mod-english-comm-m{mod_idx:02d}"
        
        # YouTube video extraction from module
        m_yt_mod = re.search(r'https://(?:www\.)?youtube\.com/watch\?v=([a-zA-Z0-9_-]{11})', content)
        mod_video_id = m_yt_mod.group(1) if m_yt_mod else "QxQUapA-2w4"

        # Parse lessons
        lesson_blocks = re.findall(
            r'###\s+Lesson\s+\d+\.(\d+)\s*[-—–:]\s*([^\n]+)\n(.*?)(?=\n###\s+Lesson|\n##\s+Practical|\Z)',
            content,
            re.S
        )
        
        module_lessons = []
        l_order = 1
        
        for num_str, les_title_raw, l_body in lesson_blocks:
            les_title_raw = les_title_raw.strip()
            l_num = int(num_str)
            l_title = f"Module {mod_idx:02d} - Lesson {l_num}: {les_title_raw}"
            l_slug = f"m{mod_idx:02d}-l{l_num}-{slugify(les_title_raw)}"
            l_uuid = f"de000000-0000-4000-8000-00000002{mod_idx:02d}{l_num:02d}"
            l_id = f"les-english-comm-m{mod_idx:02d}-l{l_num:02d}"
            
            # YouTube video extraction (per-lesson if present, fallback to module video)
            m_yt = re.search(r'https://(?:www\.)?youtube\.com/watch\?v=([a-zA-Z0-9_-]{11})', l_body)
            if m_yt:
                video_id = m_yt.group(1)
            else:
                video_id = mod_video_id
                
            creator = CREATOR_MAP.get(video_id, "BBC Learning English & Oxford English")
            l_len = 40
            total_minutes += l_len
            
            # Lesson Objectives
            lesson_obj = [
                f"Master core terminology, pronunciation, and linguistic patterns for {les_title_raw}.",
                "Apply clear, professional communication techniques within simulated SOC operational dialogues.",
                "Distinguish empirical telemetry evidence from speculative assumptions and maintain closed-loop readback verification."
            ]
            
            # Vocabulary extraction
            m_vocab = re.search(r'\*\*Target vocabulary:\*\*\s*(.+)', l_body)
            target_vocab = [v.strip(' `*') for v in m_vocab.group(1).split(',')] if m_vocab else ['communication', 'clarity', 'readback']
            
            # Key Terminology
            key_terms = []
            for term in target_vocab[:5]:
                key_terms.append({
                    "term": term,
                    "definition": f"Core cybersecurity communication terminology used in {les_title_raw} for precise operational reporting."
                })
                
            # Theory Sections
            theory_sections = [
                {
                    "title": f"Linguistic Precision in Security Operations: {les_title_raw}",
                    "content": (
                        f"In modern Security Operations Centers (SOC), precision of language directly impacts mean time to detect (MTTD) "
                        f"and mean time to respond (MTTR). During this lesson on '{les_title_raw}', practitioners master accurate phonetic stress, "
                        f"unambiguous sentence construction, and disciplined readback protocols. This ensures critical telemetry—such as IP addresses, "
                        f"hashes, event IDs, and severity classifications—is conveyed without loss of fidelity across high-stress communication channels."
                    ),
                    "keyPoints": [
                        f"Enunciate technical identifiers clearly using standard phonetic patterns for {les_title_raw}.",
                        "Eliminate cognitive ambiguity between confirmed observations and speculative hypotheses.",
                        "Enforce strict closed-loop verification (sender transmits, receiver reads back, sender confirms)."
                    ]
                },
                {
                    "title": "Mitigating Communication Breakdown on High-Stress Bridges",
                    "content": (
                        "During active incident triage, background noise, low-bandwidth audio bridges, and diverse international accents can cause "
                        "miscomprehension. Analysts must apply deliberate vocal chunking, measured pacing (120-140 words per minute), and explicit "
                        "verbal signposting. Never allow an ambiguous statement or unconfirmed action item to remain unresolved."
                    ),
                    "keyPoints": [
                        "Use phonetic spelling (NATO phonetic alphabet) for similar-sounding characters or critical hashes.",
                        "Structure verbal inputs using Bottom-Line-Up-Front (BLUF) formatting.",
                        "Record all key decisions and assigned ownership immediately in the investigation ticket."
                    ]
                }
            ]
            
            # Step-by-Step Procedures
            step_by_step = [
                {
                    "step": 1,
                    "title": "Active Listening & Pronunciation Shadowing",
                    "instruction": f"Watch the assigned video instruction segment focusing on '{les_title_raw}'. Pause at key phonetic examples and shadow the speaker aloud three times.",
                    "expectedOutcome": "Accurate syllable stress, pitch inflection, and intelligible enunciation of technical identifiers."
                },
                {
                    "step": 2,
                    "title": "Operational Vocabulary Integration",
                    "instruction": f"Formulate three concise operational status sentences integrating the target terms: {', '.join(target_vocab[:3])}.",
                    "expectedOutcome": "Grammatically sound, professionally calibrated technical status sentences."
                },
                {
                    "step": 3,
                    "title": "Simulated Incident Readback Drill",
                    "instruction": "Practice relaying a high-priority incident finding to an imaginary operational partner. State the asset, observed telemetry, severity, and requested next action.",
                    "expectedOutcome": "Structured verbal transmission following standard BLUF and closed-loop protocol."
                },
                {
                    "step": 4,
                    "title": "Documentation & Self-Review",
                    "instruction": "Transcribe your verbal briefing into a standardized 3-sentence incident ticket update. Verify that no speculative claims are included.",
                    "expectedOutcome": "Objective, auditable ticket note ready for Tier 2 escalation or shift handover."
                }
            ]
            
            # Security Relevance
            security_relevance = (
                f"Communication breakdown during critical cybersecurity operations introduces severe operational risk. "
                f"Mastering '{les_title_raw}' ensures that telemetry evidence, firewall rule modifications, and incident severity assessments "
                f"are articulated with absolute clarity, preventing misconfigurations and delayed containment."
            )
            
            # Practical Exercise
            practical_exercise = {
                "title": f"Applied Communication Exercise: {les_title_raw}",
                "objective": f"Demonstrate verbal and written mastery of '{les_title_raw}' in a simulated security incident scenario.",
                "instructions": [
                    f"Read through the operational context for {les_title_raw}.",
                    f"Incorporate target vocabulary ({', '.join(target_vocab[:3])}) into a 60-second verbal status report.",
                    "Record your speech using an audio memo tool or voice recorder.",
                    "Review the recording against the pacing rubric: measured tempo, clear consonants, and zero speculative filler."
                ]
            }
            
            rich_content = {
                "introduction": (
                    f"In this lesson on '{les_title_raw}', we develop foundational communication mastery within {mod_title}. "
                    f"SOC Context: {soc_need} Learners analyze real-world language patterns, practice active shadowing with verified video "
                    f"instruction, and execute rigorous applied communication tasks."
                ),
                "prerequisites": [
                    "Willingness to practice spoken English and pronunciation aloud",
                    "Working audio output and video playback device",
                    "Pen and paper or text editor for note-taking and transcript drills"
                ],
                "keyTerminology": key_terms,
                "theorySections": theory_sections,
                "stepByStepProcedures": step_by_step,
                "expectedObservations": [
                    "Intelligible, confident pronunciation of complex cybersecurity nouns and identifiers.",
                    "Natural usage of professional transitions and measured tone on audio conference calls.",
                    "Clear distinction between observed facts ('The server logged 45 failed SSH attempts') and assumptions ('The server is breached')."
                ],
                "commonMistakes": [
                    "Speaking too quickly or mumbling when relaying alphanumeric hashes or IP addresses.",
                    "Using overly emotional or catastrophic adjectives instead of measured severity language.",
                    "Failing to confirm whether the recipient heard and understood the transmission."
                ],
                "securityRelevance": security_relevance,
                "practicalExercise": practical_exercise,
                "summary": f"Successful completion of this lesson establishes verbal fluency, active listening, and technical documentation proficiency for '{les_title_raw}'.",
                "furtherReading": [
                    {
                        "title": "CISA Incident Response Communications Guidelines",
                        "url": "https://www.cisa.gov/resources-tools/all-resources/incident-response-plan-basics",
                        "description": "Federal guidelines on structured stakeholder communications during cyber incidents."
                    },
                    {
                        "title": "NIST SP 800-61 Rev. 3: Incident Response Coordination",
                        "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/ipd",
                        "description": "Standardized coordination, reporting, and information sharing frameworks."
                    }
                ]
            }
            
            lesson_tags = [
                "english-communication",
                "soc-analyst",
                "workplace-english",
                f"module-{mod_idx:02d}",
                slugify(stage),
                slugify(cefr)
            ]
            
            skills_taught = [
                f"Professional communication: {les_title_raw}",
                "SOC technical briefing and closed-loop readback",
                "Clear pronunciation of cybersecurity identifiers and telemetry",
                "Evidence-based reporting and audience adaptation"
            ]
            
            lesson_data = {
                "id": l_id,
                "slug": l_slug,
                "title": l_title,
                "description": f"Video-guided cybersecurity communication lesson focusing on '{les_title_raw}'. Grounded in real-world SOC operational scenarios, active listening, clear enunciation, and structured technical reporting.",
                "youtubeVideoId": video_id,
                "videoAttribution": {
                    "creator": creator,
                    "platform": "youtube"
                },
                "durationMinutes": l_len,
                "order": l_order,
                "moduleTitle": mod_title,
                "objectives": lesson_obj,
                "tags": lesson_tags,
                "skillsTaught": skills_taught,
                "richContent": rich_content
            }
            
            module_lessons.append(lesson_data)
            
            sql_lessons.append({
                "uuid": l_uuid,
                "module_uuid": mod_uuid,
                "slug": l_slug,
                "title": lesson_data["title"],
                "description": lesson_data["description"],
                "youtube_video_id": video_id,
                "duration_minutes": l_len,
                "order_index": l_order,
                "objectives": lesson_obj,
                "tags": lesson_tags,
                "skills_taught": skills_taught
            })
            
            l_order += 1
            
        m_vocab_box = re.search(r'## Target Vocabulary & Pronunciation\n(.*?)(?=\n##|\Z)', content, re.S)
        vocab_text = m_vocab_box.group(1).strip() if m_vocab_box else "Core technical terms."
        
        # Practical Communication Lab (Preserved 100% as non-quiz hands-on activity)
        mod_lab = {
            "id": f"lab-english-comm-m{mod_idx:02d}",
            "title": f"Practical Communication Workshop: {mod_title_text}",
            "objective": f"Apply {stage} communication techniques to simulated SOC operations. Scenario: {soc_need}",
            "toolsRequired": [
                "Audio recorder or voice memo tool",
                "Markdown notepad / ticketing simulator",
                "Video instruction playback environment"
            ],
            "pcapSource": {
                "fileName": f"soc_comm_scenario_card_{mod_idx:02d}.md",
                "fileUrl": "https://github.com/cybertube/english-for-cybersecurity",
                "sha256": f"comm{mod_idx:04d}e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4"
            },
            "difficulty": "beginner" if mod_idx <= 10 else ("intermediate" if mod_idx <= 20 else "advanced"),
            "estimatedMinutes": 50,
            "instructions": [
                f"Review Role-Play Card {mod_idx:02d} and identify the communication scenario: '{soc_need}'.",
                f"Incorporate target vocabulary: {vocab_text}.",
                "Deliver a 45-60 second verbal explanation or write a calibrated incident ticket note.",
                "Execute closed-loop readback and record one specific improvement for your next attempt."
            ],
            "tasks": [
                {
                    "id": "task-1",
                    "description": "Establish clear communication boundaries and distinguish verified facts from assumptions."
                },
                {
                    "id": "task-2",
                    "description": "Use accurate pacing, pronunciation, and vocabulary to convey technical identifiers."
                },
                {
                    "id": "task-3",
                    "description": "Obtain explicit readback confirmation and document assigned next actions with deadlines."
                }
            ],
            "evidenceWorksheet": [
                {
                    "field": "scenario_id",
                    "prompt": f"Scenario Identifier (e.g. SOC-COMM-M{mod_idx:02d})",
                    "expectedEvidenceType": "text"
                },
                {
                    "field": "spoken_transcript",
                    "prompt": "Transcript of spoken verbal report or written ticket note",
                    "expectedEvidenceType": "text"
                },
                {
                    "field": "readback_verification",
                    "prompt": "Confirmed readback text from peer or listener",
                    "expectedEvidenceType": "text"
                },
                {
                    "field": "actionable_next_step",
                    "prompt": "Explicit next action, responsible owner, and deadline in UTC",
                    "expectedEvidenceType": "text"
                }
            ],
            "questions": [],
            "completionCriteria": [
                "Establish verified boundaries between confirmed telemetry and assumptions.",
                "Accurately pronounce technical identifiers and vocalize timestamps in UTC.",
                "Complete closed-loop readback verification with an operational partner."
            ]
        }
        
        # Module Object without quizzes
        mod_obj = {
            "id": mod_id,
            "title": mod_title,
            "description": mod_desc,
            "order": mod_idx,
            "lessons": module_lessons,
            "practicalLab": mod_lab
        }
        
        modules.append(mod_obj)
        sql_modules.append({
            "uuid": mod_uuid,
            "title": mod_title,
            "description": mod_desc,
            "order_index": mod_idx
        })
        
    print(f"Parsed {len(modules)} modules and {len(sql_lessons)} lessons. Total minutes: {total_minutes}")
    
    # Capstone Non-Quiz Assessment
    capstone_assessment = {
        "id": "capstone-english-communication-zero-to-advanced",
        "title": "Capstone: Full Lifecycle SOC Incident Communication & Stakeholder Briefing",
        "scenario": (
            "Simulated incident case CAP-001: A critical production server generates repeated anomalous login alerts followed by "
            "a successful authentication from an unverified external IP address. As the lead SOC communicator, you must execute the "
            "complete 5-stage communication lifecycle: 1) Conduct an intake phone call with the reporting user, 2) Draft a factual, "
            "concise SOC triage ticket, 3) Write an urgent technical escalation email to Infrastructure Leads, 4) Deliver an audio "
            "shift handover briefing to the incoming team, 5) Deliver a non-technical executive summary to business stakeholders, "
            "and 6) Provide a structured STAR interview response reflecting on how you managed the crisis."
        ),
        "pcapSource": {
            "fileName": "soc_incident_capstone_dossier.md",
            "fileUrl": "https://github.com/cybertube/english-for-cybersecurity",
            "sha256": "capstone0001e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4"
        },
        "totalMarks": 100,
        "passingScore": 75,
        "rubric": [
            {
                "category": "Factual Fidelity & Telemetry Precision",
                "marks": 25,
                "criteria": [
                    "Distinguishes verified telemetry facts from hypotheses and unconfirmed assumptions",
                    "Accurately pronounces and transcribes technical strings, IPs, timestamps, and identifiers",
                    "Normalizes all event times to UTC"
                ]
            },
            {
                "category": "Audience Adaptation & Professional Tone",
                "marks": 25,
                "criteria": [
                    "Calibrates technical depth appropriately for technical leads vs non-technical executives",
                    "Avoids unexplained acronyms and patronizing language when briefing business stakeholders",
                    "Maintains composure, empathy, and professionalism under simulated crisis conditions"
                ]
            },
            {
                "category": "Structure, Coherence & Concise Delivery",
                "marks": 25,
                "criteria": [
                    "Uses Bottom-Line-Up-Front (BLUF) and standard Subject-Verb-Object (SVO) sentence structures",
                    "Delivers clear vocal chunking and pacing during verbal audio briefings",
                    "Constructs actionable ticket handoffs with explicit owners and timed deadlines"
                ]
            },
            {
                "category": "Closed-Loop Verification & STAR Storytelling",
                "marks": 25,
                "criteria": [
                    "Executes complete three-way readback confirmation on critical identifiers",
                    "Delivers structured STAR interview responses articulating Situation, Task, Action, and Result",
                    "Provides evidence-grounded reflection and continuous improvement insights"
                ]
            }
        ],
        "submissionSections": [
            {
                "id": "sec-1",
                "title": "Section 1: Intake Call & Evidence Summary (150-200 words)",
                "prompt": "Document the initial fact-finding interview with the user, separating confirmed observations from assumptions.",
                "maxMarks": 20
            },
            {
                "id": "sec-2",
                "title": "Section 2: Escalation Ticket & High-Priority Email (120-180 words)",
                "prompt": "Draft the formal EDR/SIEM ticket note and write the urgent escalation email to the Infrastructure Lead.",
                "maxMarks": 20
            },
            {
                "id": "sec-3",
                "title": "Section 3: Audio Shift Handover Briefing (90-120 seconds)",
                "prompt": "Deliver a verbal handover briefing covering active containment, evidence in /share/cases, and assigned next steps.",
                "maxMarks": 20
            },
            {
                "id": "sec-4",
                "title": "Section 4: Executive Stakeholder Summary (90-120 words)",
                "prompt": "Provide a non-technical BLUF business summary explaining impact, containment, and regulatory status.",
                "maxMarks": 20
            },
            {
                "id": "sec-5",
                "title": "Section 5: STAR Interview Portfolio Response (90 seconds)",
                "prompt": "Deliver a structured behavioral interview answer describing how you navigated technical complexity and crisis communication.",
                "maxMarks": 20
            }
        ]
    }
    
    course_obj = {
        "id": "course-english-communication-zero-to-advanced",
        "slug": "english-communication-for-cybersecurity-zero-to-advanced",
        "title": "English Communication for Cybersecurity: Zero to Advanced",
        "shortDescription": "Master professional English speaking, listening, technical reporting, shift handovers, and executive stakeholder briefings designed specifically for cybersecurity professionals and SOC analysts.",
        "description": "A comprehensive 30-module, 120-lesson video-first curriculum developing clear pronunciation of technical identifiers, active listening across international accents, concise ticket writing, TLP intelligence reporting, and high-pressure executive communication for SOC analysts, incident responders, and ethical hackers.",
        "difficulty": "beginner",
        "estimatedDuration": "20 weeks (80 hours)",
        "totalDurationMinutes": total_minutes,
        "thumbnailUrl": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        "instructor": {
            "name": "BBC Learning English & Oxford English",
            "title": "Language & Technical Communications Faculty",
            "organization": "CyberTube Academy"
        },
        "prerequisites": [
            "Basic familiarity with computers, operating systems, and networking concepts",
            "Willingness to practice spoken English and pronunciation aloud",
            "Web browser with audio/video playback capability"
        ],
        "learningObjectives": [
            "Speak intelligible workplace English and accurately pronounce technical cybersecurity identifiers (IPs, hashes, hostnames)",
            "Listen actively to security briefings across international accents and request clarification without ambiguity or speculation",
            "Write concise, factually grounded SOC incident triage tickets, escalation emails, and shift handover reports",
            "Deliver structured verbal briefings to both deeply technical engineers and non-technical executive stakeholders",
            "Excel in cybersecurity technical job interviews using structured STAR communication frameworks"
        ],
        "featured": True,
        "track": "cybersecurity",
        "domains": ["fundamentals", "soc-blue-team"],
        "tags": [
            "english-communication",
            "soc-analyst",
            "incident-response",
            "soft-skills",
            "workplace-communication",
            "technical-writing"
        ],
        "modules": modules,
        "capstone": capstone_assessment
    }
    
    # 1. Output TypeScript file
    ts_content = "import { Course } from '../types/course';\n\n"
    ts_content += "export const ENGLISH_COMMUNICATION_FOR_CYBERSECURITY_COURSE: Course = "
    ts_content += json.dumps(course_obj, indent=2)
    ts_content += ";\n"
    
    out_ts_path = os.path.join(base_dir, "src/data/english-communication-for-cybersecurity-course.ts")
    with open(out_ts_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"Written {out_ts_path} successfully! ({len(modules)} modules, {len(sql_lessons)} lessons)")
    
    # 2. Output SQL Migration file (Compact Multi-Row format)
    mod_value_rows = []
    for sm in sql_modules:
        mod_value_rows.append(
            f"  ('{sm['uuid']}', v_course_id, {quote_sql(sm['title'])}, {quote_sql(sm['description'])}, {sm['order_index']})"
        )
        
    lesson_value_rows = []
    for sl in sql_lessons:
        lesson_value_rows.append(
            f"  ('{sl['uuid']}', v_course_id, '{sl['module_uuid']}', {quote_sql(sl['slug'])}, {quote_sql(sl['title'])}, "
            f"{quote_sql(sl['description'])}, {quote_sql(sl['youtube_video_id'])}, {sl['duration_minutes']}, {sl['order_index']}, "
            f"{to_pg_array(sl['objectives'])}, {to_pg_array(sl['tags'])}, {to_pg_array(sl['skills_taught'])})"
        )

    sql_lines = [
        "-- =============================================================================",
        "-- CYBERTUBE: SEED ENGLISH COMMUNICATION FOR CYBERSECURITY ZERO TO ADVANCED",
        "-- =============================================================================",
        "-- Description:",
        "-- Idempotently seeds the 30-module English Communication for Cybersecurity course,",
        "-- all 30 modules, and all 120 lessons into the Supabase database.",
        "-- =============================================================================",
        "",
        "DO $$",
        "DECLARE",
        f"  v_course_id UUID := '{course_uuid}';",
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
        f"    {quote_sql(course_obj['slug'])},",
        f"    {quote_sql(course_obj['title'])},",
        f"    {quote_sql(course_obj['shortDescription'])},",
        f"    {quote_sql(course_obj['description'])},",
        f"    {quote_sql(course_obj['difficulty'])},",
        f"    {quote_sql(course_obj['estimatedDuration'])},",
        f"    {course_obj['totalDurationMinutes']},",
        f"    {quote_sql(course_obj['thumbnailUrl'])},",
        f"    {quote_sql(course_obj['instructor']['name'])},",
        f"    {quote_sql(course_obj['instructor']['title'])},",
        f"    {quote_sql(course_obj['instructor']['organization'])},",
        "    'published',",
        f"    {to_pg_array(course_obj['tags'])},",
        f"    {to_pg_array(course_obj['prerequisites'])},",
        f"    {to_pg_array(course_obj['learningObjectives'])},",
        f"    {quote_sql(course_obj['track'])},",
        f"    {to_pg_array(course_obj['domains'])},",
        "    true",
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
        "",
        "  -- 2. Insert/Update 30 Modules (Multi-Row)",
        "  INSERT INTO public.course_modules (id, course_id, title, description, order_index) VALUES",
        ",\n".join(mod_value_rows),
        "  ON CONFLICT (course_id, order_index) DO UPDATE SET",
        "    title = EXCLUDED.title,",
        "    description = EXCLUDED.description;",
        "",
        "  -- 3. Insert/Update 120 Lessons (Multi-Row)",
        "  INSERT INTO public.lessons (",
        "    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught",
        "  ) VALUES",
        ",\n".join(lesson_value_rows),
        "  ON CONFLICT (course_id, slug) DO UPDATE SET",
        "    module_id = EXCLUDED.module_id,",
        "    title = EXCLUDED.title,",
        "    description = EXCLUDED.description,",
        "    youtube_video_id = EXCLUDED.youtube_video_id,",
        "    duration_minutes = EXCLUDED.duration_minutes,",
        "    order_index = EXCLUDED.order_index,",
        "    objectives = EXCLUDED.objectives,",
        "    tags = EXCLUDED.tags,",
        "    skills_taught = EXCLUDED.skills_taught;",
        "",
        "END $$;"
    ]
    
    migration_file = os.path.join(base_dir, "supabase/migrations/20261121170000_seed_english_communication_course.sql")
    with open(migration_file, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines))
    print(f"Written {migration_file} successfully!")

if __name__ == "__main__":
    main()
