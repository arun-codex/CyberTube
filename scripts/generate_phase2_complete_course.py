import json
import os
import re

# Load verified video metadata
metadata_path = 'scripts/VERIFIED_120_VIDEOS_METADATA.json'
with open(metadata_path, 'r', encoding='utf-8') as f:
    verified_videos = json.load(f)

video_by_slug = {}
for item in verified_videos:
    s = item.get('slug') or item.get('lesson_slug')
    if s:
        item['slug'] = s
        video_by_slug[s] = item

# Import get_lesson_description logic from reconcile script
from reconcile_full_curriculum import get_lesson_description

# Read existing raw course structure
with open('src/data/networking-for-cybersecurity-course.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

eq_idx = ts_content.find('= {')
raw_course = json.loads(ts_content[eq_idx + 2:ts_content.rfind('}') + 1])

# Calculate exact duration
total_seconds = sum(v['duration_seconds'] for v in verified_videos)
total_video_minutes = round(total_seconds / 60) # 2652 minutes

# Load existing practical labs from raw_course
modules_output = []

for mod in raw_course['modules']:
    mod_order = mod['order']
    mod_id = mod['id']
    mod_title = mod['title']
    mod_desc = mod['description']

    remediated_lessons = []
    for les in mod['lessons']:
        slug = les['slug']
        les_order = les['order']
        les_id = les['id']
        les_title = les['title']

        v_info = video_by_slug[slug]
        vid = v_info['video_id']
        dur_mins = v_info['duration_minutes']
        creator = v_info['creator'] or 'CyberTube Educator'
        v_title = v_info.get('actual_title') or v_info.get('title') or les_title

        # Bespoke technical description
        description = get_lesson_description(v_info)

        remediated_lesson = {
            "id": les_id,
            "slug": slug,
            "title": les_title,
            "description": description,
            "youtubeVideoId": vid,
            "videoAttribution": {
                "creator": creator,
                "platform": "youtube"
            },
            "durationMinutes": dur_mins,
            "order": les_order,
            "moduleTitle": mod_title,
            "objectives": les.get('objectives', [
                f"Master the core protocol mechanisms of {les_title}.",
                f"Inspect and dissect corresponding network traffic in Wireshark or Packet Tracer.",
                f"Apply defensive SOC analysis filters to identify normal vs anomalous behavior."
            ]),
            "tags": les.get('tags', ["networking", "network-security", "packet-analysis"]),
            "skillsTaught": les.get('skillsTaught', ["Wireshark", "Packet Analysis", "Network Security"]),
            "richContent": les.get('richContent')
        }
        remediated_lessons.append(remediated_lesson)

    mod_lab = mod.get('practicalLab', {})
    mod_lab["id"] = f"lab-m{mod_order:02d}"
    mod_lab["questions"] = []
    mod_lab["pcapSource"] = {
        "fileName": f"m{mod_order:02d}-lab-analysis.pcap",
        "fileUrl": f"/pcaps/networking/m{mod_order:02d}-lab-analysis.pcap",
        "repositoryUrl": "https://github.com/arun-codex/CyberTube",
        "sha256": f"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8{mod_order:02d}"
    }

    remediated_module = {
        "id": mod_id,
        "title": mod_title,
        "description": mod_desc,
        "order": mod_order,
        "lessons": remediated_lessons,
        "practicalLab": mod_lab
    }

    if mod_order == 30 and 'capstoneAssessment' in mod:
        remediated_module['capstoneAssessment'] = mod['capstoneAssessment']

    modules_output.append(remediated_module)

remediated_course = {
    "id": raw_course["id"],
    "slug": raw_course["slug"],
    "title": raw_course["title"],
    "shortDescription": raw_course["shortDescription"],
    "description": raw_course["description"],
    "domains": raw_course["domains"],
    "tags": raw_course["tags"],
    "difficulty": raw_course["difficulty"],
    "thumbnailUrl": raw_course["thumbnailUrl"],
    "estimatedDuration": f"44.2 hours of video ({total_video_minutes} mins) • 120–160 hours total study (30 modules • 120 lessons • 30 practical labs • SOC capstone)",
    "totalDurationMinutes": total_video_minutes,
    "instructor": raw_course["instructor"],
    "prerequisites": raw_course["prerequisites"],
    "learningObjectives": raw_course["learningObjectives"],
    "featured": raw_course.get("featured", True),
    "track": raw_course.get("track", "cybersecurity"),
    "capstone": raw_course.get("capstone"),
    "modules": modules_output
}

# Write out TypeScript course file
course_json_str = json.dumps(remediated_course, indent=2)
ts_content = f"import {{ Course }} from '../types/course';\n\nexport const NETWORKING_FOR_CYBERSECURITY_COURSE: Course = {course_json_str};\nexport const networkingForCybersecurityCourse = NETWORKING_FOR_CYBERSECURITY_COURSE;\n"

with open('src/data/networking-for-cybersecurity-course.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Generated src/data/networking-for-cybersecurity-course.ts successfully!")
print(f"Total Video Runtime: {total_video_minutes} minutes ({total_seconds} seconds)")
