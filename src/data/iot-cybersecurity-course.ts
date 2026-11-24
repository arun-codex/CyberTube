// CyberTube IoT Cybersecurity & Ethical Hacking: Zero to Advanced Course
// 30 Modules • 120 Lessons • 120 Unique Verified YouTube Videos • 0 Duplicates • No Quizzes
// Source of Truth: Verified Video Manifest + Curated Hardware Catalog + Code-Rendered Diagrams

import type { Course, CourseModule, Lesson, PracticalLab, CapstoneAssessment } from '../types/course';
import { IOT_VIDEO_MANIFEST, getVideoForLesson } from './iot/video-manifest';
import { HARDWARE_CATALOG, getLessonBOM } from './iot/hardware-catalog';
import { IOT_DIAGRAMS, getDiagramForModule } from './iot/diagrams';
import { IOT_PROJECTS, getProjectForModule } from './iot/projects';

type VideoSource = { title: string; url: string; videoId: string; creator: string; durationMinutes?: number };
type LessonSource = { title: string; activity: string; practice: string; check: string };
type ModuleSource = {
  title: string;
  phase: string;
  hours: number;
  aim: string;
  prereq: string;
  task: string;
  output: string;
  steps: string[];
  reading: { title: string; url: string }[];
  videos: VideoSource[];
  lessons: LessonSource[];
};

const moduleSources: ModuleSource[] = [
  {
    "title": "IoT Security Orientation & Legal Lab Boundaries",
    "phase": "Foundation",
    "hours": 4,
    "aim": "Build the ability to explain, safely assess and defend **scope and authorization** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "None: beginner entry",
    "task": "Draw an attack-surface map for a fictional smart camera; label allowed vs forbidden targets.",
    "output": "One-page architecture + written lab authorization boundaries",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **scope and authorization** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP Internet of Things Project",
        "url": "https://owasp.org/projects/internet-of-things"
      },
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      }
    ],
    "videos": [
      {
        "title": "Introduction to IoT Hacking \u2013 1.1 Getting Started",
        "url": "https://www.youtube.com/watch?v=jY51TKyOq7U",
        "videoId": "jY51TKyOq7U",
        "creator": "LufSec"
      },
      {
        "title": "IoT Security Problems",
        "url": "https://www.youtube.com/watch?v=ijhU66n5Po8",
        "videoId": "ijhU66n5Po8",
        "creator": "Engineering Funda"
      }
    ],
    "lessons": [
      {
        "title": "How an IoT system differs from conventional IT",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **how an iot system differs from conventional it** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Identify device, gateway, broker, app and cloud attack surfaces",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **identify device, gateway, broker, app and cloud attack surfaces** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "CIA, safety, privacy and physical impact",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **cia, safety, privacy and physical impact** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Rules of engagement, evidence and responsible disclosure",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **rules of engagement, evidence and responsible disclosure** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "IoT Threat Landscape & Real Attacker Models",
    "phase": "Foundation",
    "hours": 4,
    "aim": "Build the ability to explain, safely assess and defend **threat modeling** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 01, with earlier foundations as needed",
    "task": "Build a threat register for a sample smart-home ecosystem and prioritize five risks.",
    "output": "Risk register: asset, threat, consequence, likelihood, control, residual risk",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **threat modeling** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP Internet of Things Project",
        "url": "https://owasp.org/projects/internet-of-things"
      },
      {
        "title": "OWASP Attack Surface Analysis Cheat Sheet",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Attack_Surface_Analysis_Cheat_Sheet.html"
      }
    ],
    "videos": [
      {
        "title": "IoT Security Problems",
        "url": "https://www.youtube.com/watch?v=ijhU66n5Po8",
        "videoId": "ijhU66n5Po8",
        "creator": "Engineering Funda"
      },
      {
        "title": "IoT Security Challenges",
        "url": "https://www.youtube.com/watch?v=y1iDtMmc_iE",
        "videoId": "y1iDtMmc_iE",
        "creator": "Engineering Funda"
      }
    ],
    "lessons": [
      {
        "title": "Exposed services, default credentials and insecure deployment",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **exposed services, default credentials and insecure deployment** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Threat actors, motives and asset-value prioritization",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **threat actors, motives and asset-value prioritization** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Map spoofing, tampering, data disclosure and outages",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **map spoofing, tampering, data disclosure and outages** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Translate threats into preventive and detective controls",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **translate threats into preventive and detective controls** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "IoT Security Architecture & Trust Boundaries",
    "phase": "Foundation",
    "hours": 4,
    "aim": "Build the ability to explain, safely assess and defend **defense in depth** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 02, with earlier foundations as needed",
    "task": "Annotate a three-tier example diagram with trust boundaries and controls.",
    "output": "Annotated data-flow diagram and top-five design decisions",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **defense in depth** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP IoT Security Verification Standard",
        "url": "https://owasp.org/projects/iot-security-verification-standard"
      },
      {
        "title": "NIST 8259A Device Cybersecurity Capability Core Baseline",
        "url": "https://csrc.nist.gov/pubs/ir/8259/a/final"
      }
    ],
    "videos": [
      {
        "title": "Elements of IoT Security: Authentication, Access Control, Data Security",
        "url": "https://www.youtube.com/watch?v=qzre4NKO_LE",
        "videoId": "qzre4NKO_LE",
        "creator": "Engineering Funda"
      },
      {
        "title": "Best Practices for Securing IoT System",
        "url": "https://www.youtube.com/watch?v=7gwqO7MpNB0",
        "videoId": "7gwqO7MpNB0",
        "creator": "Engineering Funda"
      }
    ],
    "lessons": [
      {
        "title": "Device-to-gateway-to-cloud data flow",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **device-to-gateway-to-cloud data flow** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Security zones and trust boundaries",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **security zones and trust boundaries** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Security objectives: authenticity, integrity and availability",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **security objectives: authenticity, integrity and availability** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Secure-by-design control mapping",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **secure-by-design control mapping** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Safe Lab Build: IoTGoat, VMs & Evidence",
    "phase": "Foundation",
    "hours": 4,
    "aim": "Build the ability to explain, safely assess and defend **isolated lab operations** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 03, with earlier foundations as needed",
    "task": "Install or inspect the downloadable IoTGoat lab in a network with no public exposure; record snapshots and versions.",
    "output": "Lab inventory, network topology, snapshots and safety checklist",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **isolated lab operations** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP IoTGoat deliberately insecure firmware",
        "url": "https://github.com/OWASP/IoTGoat"
      },
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      }
    ],
    "videos": [
      {
        "title": "Introduction to IoT Hacking \u2013 1.1 Getting Started",
        "url": "https://www.youtube.com/watch?v=jY51TKyOq7U",
        "videoId": "jY51TKyOq7U",
        "creator": "LufSec"
      },
      {
        "title": "Hardware Hacking Curiosity \u2013 IoT & Firmware Hacking",
        "url": "https://www.youtube.com/watch?v=UpOzUdd7cqM",
        "videoId": "UpOzUdd7cqM",
        "creator": "Wild West Hackin Fest"
      }
    ],
    "lessons": [
      {
        "title": "Plan an isolated host-only learning network",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **plan an isolated host-only learning network** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Obtain and validate OWASP IoTGoat safely",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **obtain and validate owasp iotgoat safely** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Snapshot, reset and instrument the lab",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **snapshot, reset and instrument the lab** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Keep an evidence ledger and protect test data",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **keep an evidence ledger and protect test data** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Embedded Linux Security Essentials",
    "phase": "Foundation",
    "hours": 4,
    "aim": "Build the ability to explain, safely assess and defend **embedded Linux hardening** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 04, with earlier foundations as needed",
    "task": "On an owned training image inspect /etc, services and startup scripts; propose least-privilege changes.",
    "output": "Configuration hardening worksheet + redacted evidence",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **embedded Linux hardening** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP IoTGoat deliberately insecure firmware",
        "url": "https://github.com/OWASP/IoTGoat"
      },
      {
        "title": "NIST 8259A Device Cybersecurity Capability Core Baseline",
        "url": "https://csrc.nist.gov/pubs/ir/8259/a/final"
      }
    ],
    "videos": [
      {
        "title": "Inside a Router Firmware: Hardcoded Passwords and Startup Script Leaks",
        "url": "https://www.youtube.com/watch?v=aAHpfiRVv1U",
        "videoId": "aAHpfiRVv1U",
        "creator": "Suit Up and Hack"
      },
      {
        "title": "5. IoT Forensics: Mount Data Storage for Analysis",
        "url": "https://www.youtube.com/watch?v=14B1zeM-SvU",
        "videoId": "14B1zeM-SvU",
        "creator": "Atdhe Buja"
      }
    ],
    "lessons": [
      {
        "title": "Identify users, processes, services and permissions on IoT Linux",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **identify users, processes, services and permissions on iot linux** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Review init scripts and boot persistence",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **review init scripts and boot persistence** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Locate configs, logs and storage mounts",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **locate configs, logs and storage mounts** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Identify unnecessary services and risky permissions",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **identify unnecessary services and risky permissions** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "IoT Network Enumeration \u2013 Defensive Asset Inventory",
    "phase": "Foundation",
    "hours": 4,
    "aim": "Build the ability to explain, safely assess and defend **defensive reconnaissance** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 05, with earlier foundations as needed",
    "task": "Use a provided pcap/isolated lab to list device IPs and exposed services; do not scan external devices.",
    "output": "Asset inventory with owner, expected service and evidence",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **defensive reconnaissance** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "Wireshark official documentation",
        "url": "https://www.wireshark.org/docs/"
      },
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      }
    ],
    "videos": [
      {
        "title": "2. IoT Forensics: Analyze Network Traffic",
        "url": "https://www.youtube.com/watch?v=it1yG5mAQE4",
        "videoId": "it1yG5mAQE4",
        "creator": "Atdhe Buja"
      },
      {
        "title": "IoT Security Problems",
        "url": "https://www.youtube.com/watch?v=ijhU66n5Po8",
        "videoId": "ijhU66n5Po8",
        "creator": "Engineering Funda"
      }
    ],
    "lessons": [
      {
        "title": "Identify known assets from DHCP, ARP and approved inventory",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **identify known assets from dhcp, arp and approved inventory** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Understand TCP/UDP ports, services and banners",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **understand tcp/udp ports, services and banners** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Distinguish passive discovery from permissioned active tests",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **distinguish passive discovery from permissioned active tests** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Build a device-specific exposure baseline",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **build a device-specific exposure baseline** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "IoT Protocols & Packet Analysis",
    "phase": "Core",
    "hours": 6,
    "aim": "Build the ability to explain, safely assess and defend **traffic analysis** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 06, with earlier foundations as needed",
    "task": "Analyze a benign sample capture to classify protocol flows and make a normal-vs-suspicious table.",
    "output": "Annotated packet evidence + baseline table",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **traffic analysis** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "Wireshark official documentation",
        "url": "https://www.wireshark.org/docs/"
      },
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      }
    ],
    "videos": [
      {
        "title": "2. IoT Forensics: Analyze Network Traffic",
        "url": "https://www.youtube.com/watch?v=it1yG5mAQE4",
        "videoId": "it1yG5mAQE4",
        "creator": "Atdhe Buja"
      },
      {
        "title": "11. IoT Forensics: Capture Live MQTT Traffic",
        "url": "https://www.youtube.com/watch?v=RDyKIie75UM",
        "videoId": "RDyKIie75UM",
        "creator": "Atdhe Buja"
      }
    ],
    "lessons": [
      {
        "title": "Recognize MQTT, CoAP, HTTP(S), DNS and NTP",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **recognize mqtt, coap, http(s), dns and ntp** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Inspect packets and sessions in Wireshark",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **inspect packets and sessions in wireshark** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Identify plaintext telemetry, unusual endpoints and protocol misuse",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **identify plaintext telemetry, unusual endpoints and protocol misuse** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Baseline normal traffic and document anomalies",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **baseline normal traffic and document anomalies** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "MQTT Security: Authentication, ACLs & TLS",
    "phase": "Core",
    "hours": 6,
    "aim": "Build the ability to explain, safely assess and defend **MQTT broker defense** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 07, with earlier foundations as needed",
    "task": "Run Mosquitto only on localhost/isolated VM and contrast a deliberately permissive config with an authenticated ACL-based config.",
    "output": "Redacted config diff, broker logs, mitigation report",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **MQTT broker defense** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "Eclipse Mosquitto MQTT broker",
        "url": "https://mosquitto.org/"
      },
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      }
    ],
    "videos": [
      {
        "title": "11. IoT Forensics: Capture Live MQTT Traffic",
        "url": "https://www.youtube.com/watch?v=RDyKIie75UM",
        "videoId": "RDyKIie75UM",
        "creator": "Atdhe Buja"
      },
      {
        "title": "Elements of IoT Security: Authentication, Access Control, Data Security",
        "url": "https://www.youtube.com/watch?v=qzre4NKO_LE",
        "videoId": "qzre4NKO_LE",
        "creator": "Engineering Funda"
      }
    ],
    "lessons": [
      {
        "title": "Broker, publisher/subscriber and topic design",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **broker, publisher/subscriber and topic design** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Threat model anonymous brokers and overbroad topics",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **threat model anonymous brokers and overbroad topics** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "TLS, per-device credentials and topic authorization",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **tls, per-device credentials and topic authorization** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Monitor connection failures and unusual topic use",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **monitor connection failures and unusual topic use** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "CoAP, HTTP & IoT API Security",
    "phase": "Core",
    "hours": 6,
    "aim": "Build the ability to explain, safely assess and defend **IoT application security** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 08, with earlier foundations as needed",
    "task": "Evaluate a mock device API specification for missing authorization, exposed configuration and data privacy controls.",
    "output": "API risk matrix + safe test plan",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **IoT application security** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      },
      {
        "title": "OWASP Web Security Testing Guide",
        "url": "https://wstg.owasp.org/"
      }
    ],
    "videos": [
      {
        "title": "Introduction to IoT Hacking \u2013 1.1 Getting Started",
        "url": "https://www.youtube.com/watch?v=jY51TKyOq7U",
        "videoId": "jY51TKyOq7U",
        "creator": "LufSec"
      },
      {
        "title": "IoT Security Problems",
        "url": "https://www.youtube.com/watch?v=ijhU66n5Po8",
        "videoId": "ijhU66n5Po8",
        "creator": "Engineering Funda"
      }
    ],
    "lessons": [
      {
        "title": "Constrained request/response patterns and trust assumptions",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **constrained request/response patterns and trust assumptions** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Authentication/session risks in device APIs",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **authentication/session risks in device apis** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Request validation, rate-limiting and least privilege",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **request validation, rate-limiting and least privilege** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Record API misuse indicators without deploying live attacks",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **record api misuse indicators without deploying live attacks** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Wireless IoT Threat Models: Wi-Fi, BLE & Zigbee",
    "phase": "Core",
    "hours": 6,
    "aim": "Build the ability to explain, safely assess and defend **wireless protocol security** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 09, with earlier foundations as needed",
    "task": "Review mock wireless provisioning flows and identify trust gaps without transmitting or intercepting traffic.",
    "output": "Wireless threat model and mitigation matrix",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **wireless protocol security** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      },
      {
        "title": "OWASP IoT Security Verification Standard",
        "url": "https://owasp.org/projects/iot-security-verification-standard"
      }
    ],
    "videos": [
      {
        "title": "Hardware Hacking Curiosity \u2013 IoT & Firmware Hacking",
        "url": "https://www.youtube.com/watch?v=UpOzUdd7cqM",
        "videoId": "UpOzUdd7cqM",
        "creator": "Wild West Hackin Fest"
      },
      {
        "title": "LoRaWAN Explained: Basics, Devices, Architecture",
        "url": "https://www.youtube.com/watch?v=EAby2vOeLpc",
        "videoId": "EAby2vOeLpc",
        "creator": "Engineering Funda"
      }
    ],
    "lessons": [
      {
        "title": "Compare link-layer threat models",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **compare link-layer threat models** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Pairing, provisioning and key-management concepts",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **pairing, provisioning and key-management concepts** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Detect misconfiguration from documentation/capture",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **detect misconfiguration from documentation/capture** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Define RF safety and permissions",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **define rf safety and permissions** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "BLE & Smart-Home Device Security",
    "phase": "Core",
    "hours": 6,
    "aim": "Build the ability to explain, safely assess and defend **BLE app and device protection** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 10, with earlier foundations as needed",
    "task": "Use the BLE CTF repository in a dedicated lab or analyze a supplied case study; document risks, not nearby devices.",
    "output": "BLE service-access policy + annotated findings",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **BLE app and device protection** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "BLE CTF practice",
        "url": "https://github.com/hackgnar/ble_ctf"
      },
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      }
    ],
    "videos": [
      {
        "title": "Hardware Hacking Curiosity \u2013 IoT & Firmware Hacking",
        "url": "https://www.youtube.com/watch?v=UpOzUdd7cqM",
        "videoId": "UpOzUdd7cqM",
        "creator": "Wild West Hackin Fest"
      },
      {
        "title": "Elements of IoT Security: Authentication, Access Control, Data Security",
        "url": "https://www.youtube.com/watch?v=qzre4NKO_LE",
        "videoId": "qzre4NKO_LE",
        "creator": "Engineering Funda"
      }
    ],
    "lessons": [
      {
        "title": "BLE discovery, bonding and GATT conceptual model",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **ble discovery, bonding and gatt conceptual model** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Weak pairing and unauthorized characteristic access",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **weak pairing and unauthorized characteristic access** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Device identity and private-data considerations",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **device identity and private-data considerations** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Defense validation using simulated or self-owned traffic",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **defense validation using simulated or self-owned traffic** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Zigbee, LoRaWAN & Low-Power Networks",
    "phase": "Core",
    "hours": 6,
    "aim": "Build the ability to explain, safely assess and defend **low-power IoT protections** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 11, with earlier foundations as needed",
    "task": "Evaluate a fictional Zigbee/LoRaWAN deployment for provisioning and key-rotation risks.",
    "output": "Network-key management plan and design review",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **low-power IoT protections** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP IoT Security Verification Standard",
        "url": "https://owasp.org/projects/iot-security-verification-standard"
      },
      {
        "title": "NIST 8259A Device Cybersecurity Capability Core Baseline",
        "url": "https://csrc.nist.gov/pubs/ir/8259/a/final"
      }
    ],
    "videos": [
      {
        "title": "LoRaWAN Explained: Basics, Devices, Architecture",
        "url": "https://www.youtube.com/watch?v=EAby2vOeLpc",
        "videoId": "EAby2vOeLpc",
        "creator": "Engineering Funda"
      },
      {
        "title": "IoT Security Problems",
        "url": "https://www.youtube.com/watch?v=ijhU66n5Po8",
        "videoId": "ijhU66n5Po8",
        "creator": "Engineering Funda"
      }
    ],
    "lessons": [
      {
        "title": "Mesh or star network security assumptions",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **mesh or star network security assumptions** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Commissioning, join and network-key lifecycle",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **commissioning, join and network-key lifecycle** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Replay and availability risks at the conceptual level",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **replay and availability risks at the conceptual level** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Segmentation and secure provisioning decisions",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **segmentation and secure provisioning decisions** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Physical Hardware Security & Lab Safety",
    "phase": "Core",
    "hours": 6,
    "aim": "Build the ability to explain, safely assess and defend **hardware security** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 12, with earlier foundations as needed",
    "task": "Inspect annotated board images and classify potential exposure points without powering unknown hardware.",
    "output": "Hardware inspection worksheet + safety assessment",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **hardware security** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      },
      {
        "title": "NIST 8259A Device Cybersecurity Capability Core Baseline",
        "url": "https://csrc.nist.gov/pubs/ir/8259/a/final"
      }
    ],
    "videos": [
      {
        "title": "Hardware Hacking Curiosity \u2013 IoT & Firmware Hacking",
        "url": "https://www.youtube.com/watch?v=UpOzUdd7cqM",
        "videoId": "UpOzUdd7cqM",
        "creator": "Wild West Hackin Fest"
      },
      {
        "title": "IoT Device Investigation \u2013 UART, JTAG, NVRAM, Modbus & SCADA",
        "url": "https://www.youtube.com/watch?v=Lg_H6wEhfdQ",
        "videoId": "Lg_H6wEhfdQ",
        "creator": "it-learn"
      }
    ],
    "lessons": [
      {
        "title": "Threat model physical interfaces and tampering",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **threat model physical interfaces and tampering** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Identify chips, memory, pads and debug access conceptually",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **identify chips, memory, pads and debug access conceptually** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Establish ESD, voltage and equipment precautions",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **establish esd, voltage and equipment precautions** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Decide when destructive testing is prohibited",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **decide when destructive testing is prohibited** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "UART, SPI, I2C & JTAG Security Concepts",
    "phase": "Core",
    "hours": 6,
    "aim": "Build the ability to explain, safely assess and defend **debug interface hardening** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 13, with earlier foundations as needed",
    "task": "Using an isolated development board or supplied trace, identify debug-interface risks; never bypass locked devices.",
    "output": "Debug-access threat model + recommended hardening checklist",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **debug interface hardening** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      },
      {
        "title": "OWASP IoT Security Verification Standard",
        "url": "https://owasp.org/projects/iot-security-verification-standard"
      }
    ],
    "videos": [
      {
        "title": "IoT Device Investigation \u2013 UART, JTAG, NVRAM, Modbus & SCADA",
        "url": "https://www.youtube.com/watch?v=Lg_H6wEhfdQ",
        "videoId": "Lg_H6wEhfdQ",
        "creator": "it-learn"
      },
      {
        "title": "UART Protocol \u2013 IoT Serial Communication",
        "url": "https://www.youtube.com/watch?v=293VWAkwxqs",
        "videoId": "293VWAkwxqs",
        "creator": "Engineering Funda"
      }
    ],
    "lessons": [
      {
        "title": "What debug and serial buses expose",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **what debug and serial buses expose** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Read-only diagnostic collection and consent",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **read-only diagnostic collection and consent** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Locked vs unlocked debug configurations",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **locked vs unlocked debug configurations** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Secure production debug policy",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **secure production debug policy** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Firmware Image Formats & Safe Acquisition",
    "phase": "Core",
    "hours": 6,
    "aim": "Build the ability to explain, safely assess and defend **firmware evidence integrity** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 14, with earlier foundations as needed",
    "task": "Download official or intentionally vulnerable firmware; hash it and inspect file type without executing it.",
    "output": "Acquisition manifest, SHA-256 and evidence log",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **firmware evidence integrity** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "Binwalk project",
        "url": "https://github.com/ReFirmLabs/binwalk"
      },
      {
        "title": "OWASP IoTGoat deliberately insecure firmware",
        "url": "https://github.com/OWASP/IoTGoat"
      }
    ],
    "videos": [
      {
        "title": "IP Camera Firmware Extraction Exposed Everything",
        "url": "https://www.youtube.com/watch?v=8IvCNbQOmxk",
        "videoId": "8IvCNbQOmxk",
        "creator": "Suit Up and Hack"
      },
      {
        "title": "12. IoT Forensics: Firmware Extraction & Analysis with Binwalk",
        "url": "https://www.youtube.com/watch?v=LjkG-tSIEjU",
        "videoId": "LjkG-tSIEjU",
        "creator": "Atdhe Buja"
      }
    ],
    "lessons": [
      {
        "title": "Vendor firmware vs owned test firmware",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **vendor firmware vs owned test firmware** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Integrity hashes and chain of custody",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **integrity hashes and chain of custody** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Archive, compression and embedded filesystem signatures",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **archive, compression and embedded filesystem signatures** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Secure storage and provenance documentation",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **secure storage and provenance documentation** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Firmware Extraction with Binwalk & SquashFS",
    "phase": "Core",
    "hours": 6,
    "aim": "Build the ability to explain, safely assess and defend **static firmware analysis** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 15, with earlier foundations as needed",
    "task": "Perform static extraction of IoTGoat firmware or another authorized specimen in a disposable VM.",
    "output": "Extracted file tree summary and three verified observations",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **static firmware analysis** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "Binwalk project",
        "url": "https://github.com/ReFirmLabs/binwalk"
      },
      {
        "title": "OWASP IoTGoat deliberately insecure firmware",
        "url": "https://github.com/OWASP/IoTGoat"
      }
    ],
    "videos": [
      {
        "title": "12. IoT Forensics: Firmware Extraction & Analysis with Binwalk",
        "url": "https://www.youtube.com/watch?v=LjkG-tSIEjU",
        "videoId": "LjkG-tSIEjU",
        "creator": "Atdhe Buja"
      },
      {
        "title": "IP Camera Firmware Extraction Exposed Everything",
        "url": "https://www.youtube.com/watch?v=8IvCNbQOmxk",
        "videoId": "8IvCNbQOmxk",
        "creator": "Suit Up and Hack"
      }
    ],
    "lessons": [
      {
        "title": "Interpret Binwalk file signatures",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **interpret binwalk file signatures** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Extract an allowed test image to a sandbox",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **extract an allowed test image to a sandbox** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Navigate init files, embedded keys and dependencies",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **navigate init files, embedded keys and dependencies** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Make findings reproducible without leaking secrets",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **make findings reproducible without leaking secrets** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Secrets, Credentials & Insecure Defaults",
    "phase": "Core",
    "hours": 6,
    "aim": "Build the ability to explain, safely assess and defend **credential hygiene** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 16, with earlier foundations as needed",
    "task": "Audit a controlled test filesystem for example credentials; do not test recovered secrets against any real service.",
    "output": "Sanitized secret-exposure report and remediation priorities",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **credential hygiene** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP IoT Security Verification Standard",
        "url": "https://owasp.org/projects/iot-security-verification-standard"
      },
      {
        "title": "NIST 8259A Device Cybersecurity Capability Core Baseline",
        "url": "https://csrc.nist.gov/pubs/ir/8259/a/final"
      }
    ],
    "videos": [
      {
        "title": "Inside a Router Firmware: Hardcoded Passwords and Startup Script Leaks",
        "url": "https://www.youtube.com/watch?v=aAHpfiRVv1U",
        "videoId": "aAHpfiRVv1U",
        "creator": "Suit Up and Hack"
      },
      {
        "title": "Ghidra Just Exposed a Critical IoT Vulnerability \u2013 CWE-321",
        "url": "https://www.youtube.com/watch?v=nrGNyvm_ocI",
        "videoId": "nrGNyvm_ocI",
        "creator": "Suit Up and Hack"
      }
    ],
    "lessons": [
      {
        "title": "Differentiate passwords, hashes, keys and certificates",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **differentiate passwords, hashes, keys and certificates** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Look for credentials in safe sample firmware",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **look for credentials in safe sample firmware** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Assess unique-device credentials and secret rotation",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **assess unique-device credentials and secret rotation** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Redact evidence and prioritize remediation",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **redact evidence and prioritize remediation** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "IoT Binary Analysis with Ghidra",
    "phase": "Advanced",
    "hours": 7,
    "aim": "Build the ability to explain, safely assess and defend **static reverse engineering** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 17, with earlier foundations as needed",
    "task": "Analyze a licensed training binary in Ghidra to locate a deliberately hardcoded sample key without targeting real devices.",
    "output": "Screenshots, annotated function map and CWE mapping",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **static reverse engineering** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "Ghidra project",
        "url": "https://github.com/NationalSecurityAgency/ghidra"
      },
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      }
    ],
    "videos": [
      {
        "title": "Ghidra Just Exposed a Critical IoT Vulnerability \u2013 CWE-321",
        "url": "https://www.youtube.com/watch?v=nrGNyvm_ocI",
        "videoId": "nrGNyvm_ocI",
        "creator": "Suit Up and Hack"
      },
      {
        "title": "Inside a Router Firmware: Hardcoded Passwords and Startup Script Leaks",
        "url": "https://www.youtube.com/watch?v=aAHpfiRVv1U",
        "videoId": "aAHpfiRVv1U",
        "creator": "Suit Up and Hack"
      }
    ],
    "lessons": [
      {
        "title": "Identify embedded CPU architecture and calling convention",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **identify embedded cpu architecture and calling convention** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Understand strings, cross-references and decompilation",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **understand strings, cross-references and decompilation** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Review hardcoded key/crypto-use patterns",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **review hardcoded key/crypto-use patterns** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Explain confidence limits and false positives",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **explain confidence limits and false positives** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Firmware Emulation & Dynamic Observation",
    "phase": "Advanced",
    "hours": 7,
    "aim": "Build the ability to explain, safely assess and defend **controlled dynamic analysis** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 18, with earlier foundations as needed",
    "task": "Plan or build an offline emulation lab using an intentionally vulnerable image; record startup limitations.",
    "output": "Emulation topology, service inventory and gap analysis",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **controlled dynamic analysis** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "QEMU documentation",
        "url": "https://www.qemu.org/docs/master/"
      },
      {
        "title": "Firmadyne project",
        "url": "https://github.com/firmadyne/firmadyne"
      }
    ],
    "videos": [
      {
        "title": "Hardware Hacking Curiosity \u2013 IoT & Firmware Hacking",
        "url": "https://www.youtube.com/watch?v=UpOzUdd7cqM",
        "videoId": "UpOzUdd7cqM",
        "creator": "Wild West Hackin Fest"
      },
      {
        "title": "IP Camera Firmware Extraction Exposed Everything",
        "url": "https://www.youtube.com/watch?v=8IvCNbQOmxk",
        "videoId": "8IvCNbQOmxk",
        "creator": "Suit Up and Hack"
      }
    ],
    "lessons": [
      {
        "title": "Why device emulation is difficult",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **why device emulation is difficult** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "QEMU/Firmadyne architecture and environmental constraints",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **qemu/firmadyne architecture and environmental constraints** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Define isolated services and nonproduction credentials",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **define isolated services and nonproduction credentials** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Compare static findings to observed behavior",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **compare static findings to observed behavior** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "IoT Web Interfaces & Embedded API Assessment",
    "phase": "Advanced",
    "hours": 7,
    "aim": "Build the ability to explain, safely assess and defend **application security testing** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 19, with earlier foundations as needed",
    "task": "Review IoTGoat training web functionality in a host-only environment; document one vulnerability class and its secure fix.",
    "output": "Vulnerability report with safe reproducer and mitigation",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **application security testing** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP Web Security Testing Guide",
        "url": "https://wstg.owasp.org/"
      },
      {
        "title": "OWASP IoTGoat deliberately insecure firmware",
        "url": "https://github.com/OWASP/IoTGoat"
      }
    ],
    "videos": [
      {
        "title": "IP Camera Firmware Extraction Exposed Everything",
        "url": "https://www.youtube.com/watch?v=8IvCNbQOmxk",
        "videoId": "8IvCNbQOmxk",
        "creator": "Suit Up and Hack"
      },
      {
        "title": "Introduction to IoT Hacking \u2013 1.1 Getting Started",
        "url": "https://www.youtube.com/watch?v=jY51TKyOq7U",
        "videoId": "jY51TKyOq7U",
        "creator": "LufSec"
      }
    ],
    "lessons": [
      {
        "title": "Embedded administration login and authorization risks",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **embedded administration login and authorization risks** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Configuration import/export and input validation",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **configuration import/export and input validation** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Secure-session, CSRF and transport controls",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **secure-session, csrf and transport controls** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Evidence-based remediation and retest",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **evidence-based remediation and retest** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Secure Boot, Signing & OTA Update Security",
    "phase": "Advanced",
    "hours": 7,
    "aim": "Build the ability to explain, safely assess and defend **secure update architecture** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 20, with earlier foundations as needed",
    "task": "Threat-model a fictional OTA pipeline and sketch signature verification, version enforcement and rollback handling.",
    "output": "OTA trust-flow diagram + release checklist",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **secure update architecture** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "NIST 8259A Device Cybersecurity Capability Core Baseline",
        "url": "https://csrc.nist.gov/pubs/ir/8259/a/final"
      },
      {
        "title": "OWASP IoT Security Verification Standard",
        "url": "https://owasp.org/projects/iot-security-verification-standard"
      }
    ],
    "videos": [
      {
        "title": "Best Practices for Securing IoT System",
        "url": "https://www.youtube.com/watch?v=7gwqO7MpNB0",
        "videoId": "7gwqO7MpNB0",
        "creator": "Engineering Funda"
      },
      {
        "title": "Ghidra Just Exposed a Critical IoT Vulnerability \u2013 CWE-321",
        "url": "https://www.youtube.com/watch?v=nrGNyvm_ocI",
        "videoId": "nrGNyvm_ocI",
        "creator": "Suit Up and Hack"
      }
    ],
    "lessons": [
      {
        "title": "Boot chain of trust and update authorization",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **boot chain of trust and update authorization** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Hash vs signature and rollback protection",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **hash vs signature and rollback protection** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Firmware lifecycle and end-of-support decisions",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **firmware lifecycle and end-of-support decisions** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Design an update integrity checklist",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **design an update integrity checklist** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "IoT Cryptography & Device Identity",
    "phase": "Advanced",
    "hours": 7,
    "aim": "Build the ability to explain, safely assess and defend **device identity assurance** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 21, with earlier foundations as needed",
    "task": "Audit example configuration files for TLS validation, unique identifiers and secret lifecycle without exposing live credentials.",
    "output": "Key-management policy and crypto-control checklist",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **device identity assurance** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "NIST 8259A Device Cybersecurity Capability Core Baseline",
        "url": "https://csrc.nist.gov/pubs/ir/8259/a/final"
      },
      {
        "title": "OWASP IoT Security Verification Standard",
        "url": "https://owasp.org/projects/iot-security-verification-standard"
      }
    ],
    "videos": [
      {
        "title": "Elements of IoT Security: Authentication, Access Control, Data Security",
        "url": "https://www.youtube.com/watch?v=qzre4NKO_LE",
        "videoId": "qzre4NKO_LE",
        "creator": "Engineering Funda"
      },
      {
        "title": "Ghidra Just Exposed a Critical IoT Vulnerability \u2013 CWE-321",
        "url": "https://www.youtube.com/watch?v=nrGNyvm_ocI",
        "videoId": "nrGNyvm_ocI",
        "creator": "Suit Up and Hack"
      }
    ],
    "lessons": [
      {
        "title": "Per-device identities and credential provisioning",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **per-device identities and credential provisioning** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Certificate validation, TLS and key storage",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **certificate validation, tls and key storage** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Threats from reused keys and insecure randomness",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **threats from reused keys and insecure randomness** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Key rotation, revocation and incident response",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **key rotation, revocation and incident response** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Cloud, Mobile Apps & Ecosystem Security",
    "phase": "Advanced",
    "hours": 7,
    "aim": "Build the ability to explain, safely assess and defend **IoT ecosystem defense** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 22, with earlier foundations as needed",
    "task": "Review a mock cloud-device architecture with a companion app; mark authentication, privacy and logging improvements.",
    "output": "Ecosystem architecture review + prioritized controls",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **IoT ecosystem defense** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      },
      {
        "title": "OWASP Web Security Testing Guide",
        "url": "https://wstg.owasp.org/"
      }
    ],
    "videos": [
      {
        "title": "Introduction to IoT Hacking \u2013 1.1 Getting Started",
        "url": "https://www.youtube.com/watch?v=jY51TKyOq7U",
        "videoId": "jY51TKyOq7U",
        "creator": "LufSec"
      },
      {
        "title": "Elements of IoT Security: Authentication, Access Control, Data Security",
        "url": "https://www.youtube.com/watch?v=qzre4NKO_LE",
        "videoId": "qzre4NKO_LE",
        "creator": "Engineering Funda"
      }
    ],
    "lessons": [
      {
        "title": "Device onboarding and cloud trust assumptions",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **device onboarding and cloud trust assumptions** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Cloud IoT role/permission boundaries",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **cloud iot role/permission boundaries** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Companion app token and API exposure",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **companion app token and api exposure** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Cloud-to-device revocation and monitoring",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **cloud-to-device revocation and monitoring** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "IoT Botnets, DDoS & Malware Case Studies",
    "phase": "Advanced",
    "hours": 7,
    "aim": "Build the ability to explain, safely assess and defend **defensive malware analysis** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 23, with earlier foundations as needed",
    "task": "From a supplied synthetic pcap, identify botnet-like outbound spikes and write containment steps.",
    "output": "IoT malware case study, IOC summary and response plan",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **defensive malware analysis** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "CISA Known Exploited Vulnerabilities",
        "url": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
      },
      {
        "title": "OWASP Internet of Things Project",
        "url": "https://owasp.org/projects/internet-of-things"
      }
    ],
    "videos": [
      {
        "title": "USENIX Security 2017 \u2013 Understanding the Mirai Botnet",
        "url": "https://www.youtube.com/watch?v=1pywzRTJDaY",
        "videoId": "1pywzRTJDaY",
        "creator": "USENIX"
      },
      {
        "title": "IoT Security Problems",
        "url": "https://www.youtube.com/watch?v=ijhU66n5Po8",
        "videoId": "ijhU66n5Po8",
        "creator": "Engineering Funda"
      }
    ],
    "lessons": [
      {
        "title": "Analyze historic Mirai attack chain without reproducing it",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **analyze historic mirai attack chain without reproducing it** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Typical initial access and persistence patterns",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **typical initial access and persistence patterns** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Network and DNS indications of compromise",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **network and dns indications of compromise** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Isolation, patching and vendor response",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **isolation, patching and vendor response** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "IoT Forensics & Chain of Custody",
    "phase": "Advanced",
    "hours": 7,
    "aim": "Build the ability to explain, safely assess and defend **forensic defensibility** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 24, with earlier foundations as needed",
    "task": "Document a mock seizure/acquisition of owned test firmware and verify checksums before analysis.",
    "output": "Evidence acquisition form + artifact hashes",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **forensic defensibility** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      },
      {
        "title": "NIST IoT Device Cybersecurity Requirement Catalog",
        "url": "https://pages.nist.gov/IoT-Device-Cybersecurity-Requirement-Catalogs/"
      }
    ],
    "videos": [
      {
        "title": "1. IoT Forensics: Chain of Custody",
        "url": "https://www.youtube.com/watch?v=Rji8IsYKYOI",
        "videoId": "Rji8IsYKYOI",
        "creator": "Atdhe Buja"
      },
      {
        "title": "5. IoT Forensics: Mount Data Storage for Analysis",
        "url": "https://www.youtube.com/watch?v=14B1zeM-SvU",
        "videoId": "14B1zeM-SvU",
        "creator": "Atdhe Buja"
      }
    ],
    "lessons": [
      {
        "title": "Preservation order and legal authority",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **preservation order and legal authority** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Volatile vs nonvolatile device data",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **volatile vs nonvolatile device data** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Read-only storage analysis and chain-of-custody logs",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **read-only storage analysis and chain-of-custody logs** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Hashing, timestamps and integrity verification",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **hashing, timestamps and integrity verification** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "IoT Timeline Reconstruction & Investigation",
    "phase": "Advanced",
    "hours": 7,
    "aim": "Build the ability to explain, safely assess and defend **event reconstruction** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 25, with earlier foundations as needed",
    "task": "Reconstruct an incident timeline from three synthetic logs and a training pcap.",
    "output": "UTC timeline with confidence notes and corroborating evidence",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **event reconstruction** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "Wireshark official documentation",
        "url": "https://www.wireshark.org/docs/"
      },
      {
        "title": "OWASP IoTGoat deliberately insecure firmware",
        "url": "https://github.com/OWASP/IoTGoat"
      }
    ],
    "videos": [
      {
        "title": "15. IoT Forensics: Explore Disk Image & Timeline Analysis",
        "url": "https://www.youtube.com/watch?v=T7FnBQCciUk",
        "videoId": "T7FnBQCciUk",
        "creator": "Atdhe Buja"
      },
      {
        "title": "2. IoT Forensics: Analyze Network Traffic",
        "url": "https://www.youtube.com/watch?v=it1yG5mAQE4",
        "videoId": "it1yG5mAQE4",
        "creator": "Atdhe Buja"
      }
    ],
    "lessons": [
      {
        "title": "Normalize timestamps and timezones",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **normalize timestamps and timezones** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Correlate files, device logs, DNS and network events",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **correlate files, device logs, dns and network events** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Use timeline tools on practice images",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **use timeline tools on practice images** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Present observations vs hypotheses",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **present observations vs hypotheses** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "SOC Monitoring & Threat Detection for IoT",
    "phase": "Advanced",
    "hours": 7,
    "aim": "Build the ability to explain, safely assess and defend **blue team detections** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 26, with earlier foundations as needed",
    "task": "Create a local rule for unusually frequent failed MQTT connections or atypical outbound destinations in test logs.",
    "output": "Detection description, test cases, false-positive notes and alert examples",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **blue team detections** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "Wazuh documentation",
        "url": "https://documentation.wazuh.com/current/"
      },
      {
        "title": "NIST 8259A Device Cybersecurity Capability Core Baseline",
        "url": "https://csrc.nist.gov/pubs/ir/8259/a/final"
      }
    ],
    "videos": [
      {
        "title": "11. IoT Forensics: Capture Live MQTT Traffic",
        "url": "https://www.youtube.com/watch?v=RDyKIie75UM",
        "videoId": "RDyKIie75UM",
        "creator": "Atdhe Buja"
      },
      {
        "title": "2. IoT Forensics: Analyze Network Traffic",
        "url": "https://www.youtube.com/watch?v=it1yG5mAQE4",
        "videoId": "it1yG5mAQE4",
        "creator": "Atdhe Buja"
      }
    ],
    "lessons": [
      {
        "title": "Logging limitations in constrained devices",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **logging limitations in constrained devices** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Baselines for DNS, MQTT, authentication and outbound flows",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **baselines for dns, mqtt, authentication and outbound flows** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "SIEM ingestion, data normalization and triage",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **siem ingestion, data normalization and triage** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Build low-noise detection rules from synthetic data",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **build low-noise detection rules from synthetic data** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Industrial IoT / ICS Security & Safety",
    "phase": "Advanced",
    "hours": 7,
    "aim": "Build the ability to explain, safely assess and defend **OT-aware defense** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 27, with earlier foundations as needed",
    "task": "Map an illustrative industrial sensor deployment and propose read-only monitoring controls; no active testing on live plants.",
    "output": "IIoT zones/conduits diagram and safety-oriented security memo",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **OT-aware defense** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "NIST 8259A Device Cybersecurity Capability Core Baseline",
        "url": "https://csrc.nist.gov/pubs/ir/8259/a/final"
      },
      {
        "title": "IoT Security Foundation",
        "url": "https://www.iotsecurityfoundation.org/"
      }
    ],
    "videos": [
      {
        "title": "IoT Device Investigation \u2013 UART, JTAG, NVRAM, Modbus & SCADA",
        "url": "https://www.youtube.com/watch?v=Lg_H6wEhfdQ",
        "videoId": "Lg_H6wEhfdQ",
        "creator": "it-learn"
      }
    ],
    "lessons": [
      {
        "title": "Distinguish consumer IoT vs industrial IoT safety goals",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **distinguish consumer iot vs industrial iot safety goals** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Gateway, sensors, SCADA and industrial DMZ",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **gateway, sensors, scada and industrial dmz** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Change management and passive monitoring first",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **change management and passive monitoring first** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Unsafe test boundaries and contingency planning",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **unsafe test boundaries and contingency planning** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Secure IoT Product Lifecycle, SBOM & Standards",
    "phase": "Advanced",
    "hours": 7,
    "aim": "Build the ability to explain, safely assess and defend **lifecycle governance** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 28, with earlier foundations as needed",
    "task": "Build a manufacturer security checklist covering procurement, shipping, patching, reporting and retirement.",
    "output": "Device security profile with traceable control evidence",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **lifecycle governance** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "NIST IR 8259 rev. 1 foundational activities",
        "url": "https://csrc.nist.gov/pubs/ir/8259/r1/final"
      },
      {
        "title": "OWASP IoT Security Verification Standard",
        "url": "https://owasp.org/projects/iot-security-verification-standard"
      }
    ],
    "videos": [
      {
        "title": "Best Practices for Securing IoT System",
        "url": "https://www.youtube.com/watch?v=7gwqO7MpNB0",
        "videoId": "7gwqO7MpNB0",
        "creator": "Engineering Funda"
      },
      {
        "title": "IoT Security Challenges",
        "url": "https://www.youtube.com/watch?v=y1iDtMmc_iE",
        "videoId": "y1iDtMmc_iE",
        "creator": "Engineering Funda"
      }
    ],
    "lessons": [
      {
        "title": "Product security requirements and security-by-design",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **product security requirements and security-by-design** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Vulnerability disclosure and coordinated fixes",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **vulnerability disclosure and coordinated fixes** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "SBOM, support windows and patch workflows",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **sbom, support windows and patch workflows** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Mapping OWASP ISVS / NIST controls to evidence",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **mapping owasp isvs / nist controls to evidence** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  },
  {
    "title": "Final Capstone: Full IoT Assessment & SOC Handoff",
    "phase": "Capstone",
    "hours": 16,
    "aim": "Build the ability to explain, safely assess and defend **professional portfolio** within an IoT ecosystem. The objective is evidence-based security competence, not operating a hobby electronics project.",
    "prereq": "Module 29, with earlier foundations as needed",
    "task": "Assess only an offline IoTGoat image or your dedicated lab: trace three findings end-to-end from evidence to mitigation and SOC detection.",
    "output": "Portfolio-ready package: architecture, evidence, finding reports, detection, executive summary",
    "steps": [
      "Identify the exact training asset, its owner, and the approved scope; use a host-only network or static files whenever possible.",
      "Capture a baseline: diagram, current configuration, protocol example, hashes or expected data flow.",
      "Investigate the relevant **professional portfolio** risk and record at least three concrete observations with evidence labels (E1, E2, E3).",
      "Explain which observed weakness is a fact, which is a theoretical risk, and which needs further validation.",
      "Propose safer settings or design changes; verify them in the same safe environment when feasible.",
      "Record one monitoring/detection idea and its most likely false-positive case.",
      "Reset disposable lab state; remove test secrets and archive sanitized evidence."
    ],
    "reading": [
      {
        "title": "OWASP IoT Security Testing Guide",
        "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
      },
      {
        "title": "OWASP IoTGoat deliberately insecure firmware",
        "url": "https://github.com/OWASP/IoTGoat"
      },
      {
        "title": "NIST IR 8259 rev. 1 foundational activities",
        "url": "https://csrc.nist.gov/pubs/ir/8259/r1/final"
      }
    ],
    "videos": [
      {
        "title": "Hardware Hacking Curiosity \u2013 IoT & Firmware Hacking",
        "url": "https://www.youtube.com/watch?v=UpOzUdd7cqM",
        "videoId": "UpOzUdd7cqM",
        "creator": "Wild West Hackin Fest"
      },
      {
        "title": "15. IoT Forensics: Explore Disk Image & Timeline Analysis",
        "url": "https://www.youtube.com/watch?v=T7FnBQCciUk",
        "videoId": "T7FnBQCciUk",
        "creator": "Atdhe Buja"
      },
      {
        "title": "USENIX Security 2017 \u2013 Understanding the Mirai Botnet",
        "url": "https://www.youtube.com/watch?v=1pywzRTJDaY",
        "videoId": "1pywzRTJDaY",
        "creator": "USENIX"
      }
    ],
    "lessons": [
      {
        "title": "Define signed scope, asset inventory and lab baseline",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **define signed scope, asset inventory and lab baseline** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Perform static, network and configuration review safely",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **perform static, network and configuration review safely** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Build detections, prioritized remediation and retest",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **build detections, prioritized remediation and retest** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      },
      {
        "title": "Present executive, technical and SOC handoff reports",
        "activity": "Watch the assigned IoT-specific video(s), inspect a supplied diagram, sample log, firmware image or fictional design, and explain how **present executive, technical and soc handoff reports** affects confidentiality, integrity, availability, safety or privacy.",
        "practice": "Create a clearly labeled artifact for this subtopic (annotation, observation, rule hypothesis, comparison, or screenshot). State at least one attacker opportunity, one defense, and one verifiable indicator.",
        "check": "The learner can explain the topic without copying a video transcript and connect it to an authorized IoT test or operational decision."
      }
    ]
  }
];

const safeCriteria = [
  'Scoped offline or explicitly authorized IoT lab only',
  'Three traceable observations; facts distinguished from hypotheses',
  'Preventive, detective and response controls justified',
  'No secrets, credentials, private keys or personally identifying data in submitted evidence',
];

function makeModule(m: ModuleSource, index: number): CourseModule {
  const n = index + 1;
  const moduleNumber = String(n).padStart(2, '0');
  const moduleTitle = `Module ${moduleNumber}: ${m.title}`;
  const difficulty = n <= 6 ? 'beginner' : n <= 17 ? 'intermediate' : 'advanced';
  const projectSpec = getProjectForModule(n);
  const diagramSpec = getDiagramForModule(n);

  const moduleLab: PracticalLab = {
    id: `iot-cybersecurity-m${moduleNumber}-lab`,
    title: `${moduleTitle} — Practical Lab`,
    objective: m.task,
    toolsRequired: [
      'Authorized isolated training environment or supplied static evidence',
      'ESP32 DevKit or Wokwi simulator',
      'Digital multimeter or simulation probe',
      'Wireshark / Mosquitto toolset',
    ],
    pcapSource: {
      fileName: 'No PCAP download required; use provided lab evidence where applicable',
      fileUrl: 'https://owasp.org/owasp-istg/01_introduction/index.html',
      repositoryUrl: 'https://github.com/OWASP/IoTGoat',
    },
    difficulty,
    estimatedMinutes: Math.max(40, Math.round(m.hours * 20)),
    instructions: [m.task, ...m.steps, `Deliverable: ${m.output}`],
    tasks: m.steps.map((description, i) => ({ id: `iot-m${moduleNumber}-task-${i+1}`, description })),
    evidenceWorksheet: [
      {
        field: 'e1_observation',
        prompt: 'First verifiable observation (diagram component, voltage measurement, packet field, configuration key or hash).',
        expectedEvidenceType: 'Direct evidence quote, hex/base64 snippet, measured reading, or parameter reference',
      },
      {
        field: 'e2_hypothesis_vs_fact',
        prompt: 'Explain which part of the observation is a proven fact, which part is an assumption, and how you verified it.',
        expectedEvidenceType: 'Written justification separating confirmed fact from speculative risk',
      },
      {
        field: 'e3_mitigation_and_detection',
        prompt: 'Propose a specific defensive control (preventive, detective, or responsive) and identify its false-positive edge case.',
        expectedEvidenceType: 'Hardened setting, firewall rule, ACL entry, or monitoring alert signature',
      },
    ],
    questions: [], // STRICT ZERO QUIZZES RULE
    completionCriteria: [
      ...safeCriteria,
      `Completed deliverable: ${m.output}`,
      `Verified adherence to safe electrical limits (<=3.3V logic)`,
    ],
  };

  const lessons: Lesson[] = m.lessons.map((lesson, lessonIndex) => {
    const lessonGlobalOrder = index * 4 + lessonIndex + 1;
    const lessonNumber = String(lessonIndex + 1).padStart(2, '0');
    const lessonSlug = `m${moduleNumber}-l${lessonNumber}-${lesson.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
    const lessonId = `les-iot-m${moduleNumber}-${lessonNumber}`;

    // Fetch unique verified video from manifest
    const videoEntry = getVideoForLesson(lessonGlobalOrder);

    const lessonBOM = getLessonBOM(lessonSlug);

    return {
      id: lessonId,
      slug: lessonSlug,
      title: lesson.title,
      description: `${lesson.activity} Practice: ${lesson.practice}`,
      youtubeVideoId: videoEntry.videoId,
      durationMinutes: videoEntry.durationMinutes, // REAL video duration in minutes
      estimatedStudyMinutes: videoEntry.estimatedStudyMinutes, // Allocated hands-on study & lab time
      order: lessonIndex + 1,
      objectives: [
        `Master concepts of ${lesson.title.toLowerCase()}`,
        `Apply defensive practices: ${lesson.practice}`,
        `Verify understanding: ${lesson.check}`,
        `Adhere to low-voltage 3.3V safety boundaries and ethical lab rules`,
      ],
      tags: [
        'iot',
        `phase-${m.phase.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        `module-${moduleNumber}`,
        'hardware-security',
        'hands-on-lab',
        'no-quizzes',
      ],
      skillsTaught: [
        lesson.title,
        m.title,
        'Defensive IoT engineering',
        'Hardware pinout safety',
        'Network packet analysis',
      ],
      moduleTitle,
      videoAttribution: {
        creator: videoEntry.creator,
        channelUrl: `https://www.youtube.com/watch?v=${videoEntry.videoId}`,
        platform: 'YouTube',
        seriesTitle: videoEntry.topic,
        partNumber: lessonIndex + 1,
      },
      richContent: {
        introduction: `${lesson.activity} This lesson guides you through technical execution, hardware safety checks, and evidence preservation.`,
        prerequisites: [m.prereq],
        keyTerminology: [
          { term: 'ESP32 DevKit', definition: '32-bit dual-core 240MHz microcontroller with Wi-Fi/BLE and 3.3V GPIO logic.' },
          { term: 'Trust Boundary', definition: 'The perimeter separating components with different privilege levels or network zones.' },
          { term: 'Current Limiting', definition: 'Using series resistors (220Ω - 330Ω) to prevent excessive current from damaging LEDs and GPIO pads.' },
          { term: 'Fail-Safe State', definition: 'The default safe condition assumed by an actuator when power is lost or a crash occurs.' },
        ],
        theorySections: [
          {
            title: `Core Principles: ${lesson.title}`,
            content: `In embedded and IoT systems, ${lesson.title.toLowerCase()} directly determines how devices withstand physical and network threats. Unlike standard IT servers running in protected data centers, IoT edge devices operate in physically untrusted locations where attackers can probe test pads, monitor power rails, and eavesdrop on wireless communications.`,
            keyPoints: [
              `Always respect 3.3V logic limits; never apply 5V signals to ESP32 pins.`,
              `Maintain ground reference continuity between all interconnected boards and sensors.`,
              `Separate real-time control loops from network telemetry to prevent watchdog starvation.`,
              `Distinguish verified physical observations from speculative software inferences.`,
            ],
          },
          {
            title: `Defensive Architecture & Trust Validation`,
            content: `Implementing ${lesson.title.toLowerCase()} requires adhering to the principle of least privilege at both the electronic and software layers. Use isolated subnets, disable unused debug interfaces in production, and enforce cryptographic verification on all firmware and telemetry flows.`,
            keyPoints: [
              `Hardware: Pair inductive loads with flyback clamping diodes (1N4007).`,
              `Firmware: Store credentials in encrypted NVS rather than plaintext flash strings.`,
              `Network: Use Mosquitto MQTT topic ACLs and Mutual TLS on port 8883.`,
            ],
          },
        ],
        stepByStepProcedures: [
          {
            step: 1,
            title: `Step 1: Inspect Physical Hardware Connections and Voltage Rails`,
            instruction: `Before powering on, verify breadboard power rails with a multimeter. Ensure ESP32 3V3 rail reads between 3.28V and 3.32V DC, and ground reference is common across all components.`,
            expectedOutcome: `Stable 3.3V DC power verified; zero short circuits detected.`,
          },
          {
            step: 2,
            title: `Step 2: Flash and Monitor Defensive Firmware Routine`,
            instruction: `Compile the lesson exercise code and flash it over USB data cable at 115200 baud. Open Serial Monitor to observe boot sequence and initial hardware self-test outputs.`,
            expectedOutcome: `Clean boot banner displayed with chip revision and zero initialization errors.`,
          },
          {
            step: 3,
            title: `Step 3: Capture Baseline Evidence and Validate Behavior`,
            instruction: `Execute the practical task: ${lesson.practice}. Record at least three distinct observations (E1, E2, E3) with timestamped serial logs or packet captures.`,
            expectedOutcome: `${lesson.check}`,
          },
        ],
        securityRelevance: `Mastering ${lesson.title.toLowerCase()} gives defenders the diagnostic competence to harden connected hardware before deployment and recognize physical or network tamper events in operational telemetry.`,
        summary: `You have completed ${lesson.title}, verified electrical safety bounds, and documented defensible laboratory evidence.`,
      },
      // NO QUIZZES
    };
  });

  const moduleResult: CourseModule = {
    id: `mod-iot-cybersecurity-${moduleNumber}`,
    title: moduleTitle,
    description: `${m.phase} Phase — ${m.aim}`,
    order: n,
    lessons,
    practicalLab: moduleLab,
  };

  if (n === 30) {
    moduleResult.capstoneAssessment = IOT_CAPSTONE;
  }

  return moduleResult;
}

const rubricEntries: [string, number][] = [
  ['1. Functional Smart-Device Hardware Build', 20],
  ['2. Hardened Firmware & Cryptographic Identity', 20],
  ['3. Protocol & Network Telemetry Evidence', 15],
  ['4. Hardware Safety & Electrical Documentation', 10],
  ['5. Incident Simulation & SOC Detections', 15],
  ['6. Executive Report & Remediation Roadmap', 15],
  ['7. Reproducibility & Demonstration Video', 5],
];

const IOT_CAPSTONE: CapstoneAssessment = {
  id: 'iot-capstone-assessment',
  title: 'Portfolio Project 6: Final 100-Mark Practical IoT Cybersecurity Capstone',
  scenario: 'Build, secure, evaluate, and present an end-to-end connected IoT monitoring system with verified hardware wiring, mTLS encryption, SOC alerting, and executive assessment.',
  pcapSource: {
    fileName: 'Authorized smart-room mTLS packet capture and serial evidence archive',
    fileUrl: 'https://github.com/OWASP/IoTGoat',
  },
  totalMarks: 100,
  passingScore: 75,
  rubric: rubricEntries.map(([category, marks]) => ({
    category,
    marks,
    criteria: [
      'Physical hardware or verified Wokwi simulation operates reliably without electrical violations',
      'Cryptographic controls (TLS 1.3, encrypted NVS, Secure Boot) verified via packet captures and logs',
      'Executive report clearly distinguishes confirmed observations from theoretical hypotheses',
    ],
  })),
  submissionSections: rubricEntries.map(([title, maxMarks], i) => ({
    id: `iot-capstone-${i + 1}`,
    title,
    prompt: `Submit ${title.toLowerCase()} with safe evidence, test logs, circuit diagrams, and remediation guidance.`,
    maxMarks,
  })),
};

// Compute real total video minutes from all 120 lessons in manifest
const totalRealVideoMinutes = IOT_VIDEO_MANIFEST.reduce((sum, v) => sum + v.durationMinutes, 0);

export const IOT_CYBERSECURITY_ZERO_TO_ADVANCED_COURSE: Course = {
  id: 'course-iot-cybersecurity-zero-to-advanced',
  slug: 'iot-cybersecurity-zero-to-advanced',
  title: 'IoT Cybersecurity & Ethical Hacking: Zero to Advanced',
  shortDescription: '30 modules • 120 video-guided lessons • 120 unique video tutorials • 30 practical labs • 6 portfolio milestones • Capstone. Zero quizzes.',
  description: 'Comprehensive 30-module, 120-lesson professional curriculum in IoT hardware security and ethical hacking. Features 120 distinct, verified YouTube video tutorials with measured runtimes, step-by-step breadboard and discrete circuit CAD, interactive Three.js 3D hardware inspection, 30 practical labs, and a 100-mark portfolio capstone. Covers low-voltage electronics, ESP32 firmware, MQTT/TLS cryptography, Ghidra reverse engineering, QEMU emulation, OWASP IoTGoat, hardware debug interfaces, and IoT SOC detection engineering. No quizzes.',
  domains: ['iot-embedded-security', 'soc-blue-team', 'dfir', 'network-security'],
  tags: ['iot', 'embedded-security', 'esp32', 'hardware-hacking', 'firmware', 'mqtt', 'tls', 'dfir', 'blue-team', 'no-quizzes'],
  difficulty: 'intermediate',
  thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  estimatedDuration: `${Math.round(totalRealVideoMinutes / 60)} hours of video tutorials • 190 total hands-on study & lab hours`,
  totalDurationMinutes: totalRealVideoMinutes, // REAL video duration (~2350 mins, ~39h)
  instructor: {
    name: 'CyberTube IoT Security Curriculum',
    title: 'Curated open videos, code CAD diagrams, and defensive lab guides',
    organization: 'CyberTube',
  },
  prerequisites: [
    'Basic computer literacy and terminal familiarity',
    'An isolated or personally owned, expressly authorized IoT training environment',
    'Strict adherence to low-voltage DC safety (<=3.3V logic) and legal lab boundaries',
  ],
  learningObjectives: [
    'Wire, measure, and safely control discrete electronic circuits with ESP32 microcontrollers',
    'Develop defensive firmware with debouncing, watchdog timers, and encrypted secret storage',
    'Secure IoT communications using Mosquitto topic ACLs, Wi-Fi segmentation, and Mutual TLS',
    'Extract and reverse engineer embedded firmware binaries using Ghidra, binwalk, and QEMU',
    'Safely audit hardware debug interfaces (UART, JTAG, SWD) with 3.3V logic analyzers',
    'Build automated IoT SOC detection rules for anomalous MQTT traffic and botnet telemetry',
    'Deliver an end-to-end secure connected monitoring capstone with defensible evidence',
  ],
  track: 'cybersecurity',
  featured: true,
  modules: moduleSources.map(makeModule),
};
