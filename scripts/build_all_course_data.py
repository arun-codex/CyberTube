import json
import os
import sys

# Ensure course_data is importable
sys.path.insert(0, os.path.dirname(__file__))

from course_data.common import PCAP_RESOURCES, CAPSTONE
from course_data.mod00 import MODULE_00
from course_data.mod01 import MODULE_01
from course_data.mod02 import MODULE_02
from course_data.mod03 import MODULE_03
from course_data.mod04 import MODULE_04
from course_data.mod05 import MODULE_05
from course_data.mod06 import MODULE_06
from course_data.mod07 import MODULE_07
from course_data.mod08 import MODULE_08

MODULES = [
    MODULE_00,
    MODULE_01,
    MODULE_02,
    MODULE_03,
    MODULE_04,
    MODULE_05,
    MODULE_06,
    MODULE_07,
    MODULE_08,
]

total_lessons = sum(len(m["lessons"]) for m in MODULES)
regular_lessons = sum(len(m["lessons"]) for m in MODULES[:8])
capstone_lessons = len(MODULES[8]["lessons"])
total_minutes = sum(l["durationMinutes"] for m in MODULES for l in m["lessons"])
hours = total_minutes // 60
mins = total_minutes % 60
duration_formatted = f"{hours} hours {mins} mins" if mins > 0 else f"{hours} hours"

print(f"Total Modules: {len(MODULES)}")
print(f"Regular Lessons (Modules 00-07): {regular_lessons}")
print(f"Capstone Lessons (Module 08): {capstone_lessons}")
print(f"Total Lessons: {total_lessons}")
print(f"Total Duration Minutes: {total_minutes} ({duration_formatted})")

COURSE = {
    "id": "course-packet-analysis-wireshark",
    "slug": "network-packet-analysis-masterclass",
    "title": "Network Packet Analysis & Forensics Masterclass",
    "shortDescription": "Master Wireshark, deep-dive into TCP/IP protocol handshakes, and isolate anomalous network traffic with hands-on PCAP labs and SOC capstone.",
    "description": "An intensive, hands-on professional network packet forensics curriculum designed for SOC analysts, incident responders, and network security engineers. Master Wireshark interface tuning, low-level protocol dissection, display filter automation, malware traffic analysis, C2 beacon timing detection, TShark CLI pipelines, digital evidence preservation, and an assessed enterprise intrusion capstone.",
    "domains": ["network-security", "soc-blue-team", "dfir"],
    "tags": [
        "wireshark",
        "packet-analysis",
        "pcap",
        "network-forensics",
        "tshark",
        "malware-analysis",
        "c2-beaconing",
        "soc-investigation",
        "incident-response"
    ],
    "difficulty": "advanced",
    "thumbnailUrl": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    "estimatedDuration": duration_formatted,
    "totalDurationMinutes": total_minutes,
    "instructor": {
        "name": "Netsec Explained",
        "title": "Network Security & Forensics Researcher"
    },
    "prerequisites": [
        "Basic understanding of IPv4 addressing and subnet masks",
        "Familiarity with the OSI 7-Layer model and TCP/UDP port concepts",
        "Installed Wireshark 4.x or higher analysis environment"
    ],
    "learningObjectives": [
        "Execute the structured 5-phase forensic triage model on unknown multi-gigabyte PCAP files",
        "Capture and filter packet streams with advanced Wireshark display filter syntax and byte slice notation",
        "Diagnose network latency, packet loss, TCP Zero-Window events, and retransmissions in TCP streams",
        "Trace SSL/TLS key exchanges, extract cleartext SNI domain hostnames, and inspect X.509 certificate chains",
        "Isolate malware delivery funnels, extract dropped executables via Export Objects, and calculate C2 beacon intervals and jitter",
        "Detect cleartext FTP authentication, port scanning reconnaissance fingerprints, and SYN flood denial of service",
        "Automate high-speed headless packet dissection and field extraction using TShark, editcap, and capinfos",
        "Preserve immutable cryptographic chain of custody (SHA256) and author professional SOC incident response reports",
        "Investigate and submit the comprehensive Operation Blackout Beacon 100-mark enterprise intrusion capstone"
    ],
    "featured": True,
    "track": "cybersecurity",
    "sourcePlatform": "youtube",
    "pcapResources": PCAP_RESOURCES,
    "capstone": CAPSTONE,
    "modules": MODULES
}

# 1. Output Manifest
MANIFEST = {
    "courseId": COURSE["id"],
    "courseSlug": COURSE["slug"],
    "courseTitle": COURSE["title"],
    "channel": {
        "name": "Netsec Explained",
        "url": "https://www.youtube.com/@NetsecExplained",
        "attribution": "Curated network forensics curriculum featuring the Advanced Wireshark Network Forensics series by Netsec Explained."
    },
    "extractedAt": "2026-11-06T00:00:00Z",
    "verificationMethod": "Structured forensic curriculum mapping and verified YouTube embeds",
    "moduleCount": len(MODULES),
    "regularLessonCount": regular_lessons,
    "capstoneCount": capstone_lessons,
    "totalLessonCount": total_lessons,
    "videoLessonCount": 3,
    "theoryLessonCount": 34,
    "regularTheoryLessonCount": 33,
    "practicalLabCount": 8,
    "quizQuestionCount": 40,
    "totalDurationMinutes": total_minutes,
    "estimatedDuration": duration_formatted,
    "track": COURSE["track"],
    "domains": COURSE["domains"],
    "pcapResources": PCAP_RESOURCES,
    "capstone": CAPSTONE,
    "modules": [
        {
            "id": m["id"],
            "order": m["order"],
            "title": m["title"],
            "description": m["description"],
            "lessonCount": len(m["lessons"]),
            "durationMinutes": sum(l["durationMinutes"] for l in m["lessons"]),
            "lessons": [
                {
                    "id": l["id"],
                    "slug": l["slug"],
                    "title": l["title"],
                    "order": l["order"],
                    "durationMinutes": l["durationMinutes"],
                    "youtubeVideoId": l.get("youtubeVideoId"),
                    "hasVideo": bool(l.get("youtubeVideoId"))
                }
                for l in m["lessons"]
            ]
        }
        for m in MODULES
    ]
}

repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
manifest_path = os.path.join(repo_root, "src", "data", "manifests", "network-packet-forensics-manifest.json")
with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(MANIFEST, f, indent=2)
print(f"Manifest written to: {manifest_path}")

# 2. Output TypeScript Course Definition
course_ts_path = os.path.join(repo_root, "src", "data", "network-packet-forensics-course.ts")
ts_content = f"""import {{ Course }} from '../types/course';

export const NETWORK_PACKET_FORENSICS_COURSE: Course = {json.dumps(COURSE, indent=2)};
"""

with open(course_ts_path, "w", encoding="utf-8") as f:
    f.write(ts_content)
print(f"TypeScript course definition written to: {course_ts_path}")

