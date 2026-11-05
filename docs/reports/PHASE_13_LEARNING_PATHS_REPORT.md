# CyberTube Phase 13 — Learning Paths Reconciled Architecture Report

## 1. Overview
The learning pathways on CyberTube were restructured into five authoritative tracks (Paths A through E) at `/data/paths.json`. Each track features sequential step milestones, learner choice alternatives (e.g. Jeremy's IT Lab vs. NetworkChuck), actionable checklists, companion lab pairings, and official vendor lifecycle notices.

## 2. Path Architecture

### Path A — Foundations (`/learning-paths/foundations`)
- **Duration:** Months 1–2 (1–2 hrs/day) | **Level:** Absolute Beginner
- **Prerequisites:** None.
- **Steps:**
  1. *Networking Fundamentals:* Free CCNA (Jeremy's IT Lab or NetworkChuck) + OverTheWire / TryHackMe.
  2. *Linux Fundamentals:* Linux for Ethical Hackers (TCM or ProgrammingKnowledge) + OverTheWire Bandit wargame.
  3. *Core Security Concepts:* Security basics, CIA triad, authentication vs authorization.
  4. *Basic Scripting:* Python 3 for security automation (TCM).

### Path B — Security+ Certification Track (`/learning-paths/security-plus`)
- **Duration:** Months 2–4 (1–2 hrs/day) | **Level:** Beginner to Intermediate
- **Official Exam Notice:** SY0-701 launched November 7, 2023, valid through 2026/2027. Legacy SY0-601 retired July 2024.
- **Steps:**
  1. *Complete SY0-701 Syllabus:* Professor Messer's 100+ video playlist or freeCodeCamp Andrew Ramdayal course.
  2. *Practice Exams & PBQs:* Inside Cloud and Security domain drills.
  3. *Exam Readiness Checklist:* Formal review of all 5 exam domains.

### Path C — Ethical Hacking & Practical Pentesting (`/learning-paths/ethical-hacking`)
- **Duration:** Months 4–8 (2–3 hrs/day) | **Level:** Intermediate
- **Strict Legal Rule:** Explicit reminder displayed regarding authorized scopes, CFAA, and Computer Misuse Act.
- **Steps:**
  1. *Practical Penetration Testing Methodology:* TCM Practical Ethical Hacking.
  2. *Reconnaissance & Enumeration:* Nmap, Sublist3r, service discovery.
  3. *Exploitation & Privilege Escalation:* Linux/Windows escalation vectors + Hack The Box wargames.
  4. *Active Directory Fundamentals:* AD attack/defense with John Hammond.
  5. *CTF Practice:* Hack The Box & TryHackMe challenge rooms.

### Path D — Web Application Security (`/learning-paths/web-application-security`)
- **Duration:** Months 4–6 (1–2 hrs/day) | **Level:** Intermediate
- **Steps:**
  1. *HTTP & Web Architecture Fundamentals:* Request/response headers, cookies, TLS.
  2. *OWASP Top 10 Deep Dive:* PortSwigger Web Security Academy + Rana Khalil video walkthroughs.
  3. *Hands-on Vulnerability Labs:* Local OWASP Juice Shop & DVWA docker instances.
  4. *Burp Suite Proficiency:* Repeater, Intruder, Match/Replace, and Proxy workflows.

### Path E — Emerging Tracks (Coming Soon) (`/learning-paths/coming-soon`)
- Curated previews with "Suggest a resource" workflows for:
  - *Cloud Security (AWS/Azure/GCP)*
  - *Digital Forensics & Incident Response (DFIR)*
  - *Malware Analysis & Reverse Engineering*
  - *AI & LLM Security (OWASP Top 10 for LLMs)*

## 3. Progress Tracking & State Persistence
- Individual milestones feature checkboxes backed by `src/lib/progress.ts`.
- Uses resilient `localStorage` caching with cross-tab custom events (`cybertube-progress-update`).
- Dynamically computes pathway progress percentage and overall platform completion without requiring login.
