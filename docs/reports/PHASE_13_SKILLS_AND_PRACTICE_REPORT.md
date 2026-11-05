# CyberTube Phase 13 — Skills Map & Legal Practice Report

## 1. Overview
Phase 13 implemented an interactive Skills Map (`/skills`), a Legal Practice Labs Directory (`/labs`), and an authoritative Ethics & Responsible Learning Policy (`/ethics`).

## 2. Interactive Skills Matrix (`/skills`)
The Skills Map organizes critical cybersecurity proficiencies across 7 domains:
1. **Foundations:** IP Addressing & Subnetting, Linux Terminal Navigation, OS Architecture & Virtualization.
2. **Security Basics:** The CIA Triad, Authentication vs Authorization, Applied Cryptography & PKI.
3. **Scripting:** Bash Scripting for Automation, Python for Security Tooling.
4. **Defensive:** Log Analysis & SIEM, Network Traffic Analysis & Wireshark, Incident Triage Lifecycle.
5. **Offensive:** Active Reconnaissance (Nmap), Web App Security (OWASP Top 10 / Burp Suite).
6. **Cloud & AI Security:** Cloud IAM Least Privilege, AI & LLM Security (OWASP Top 10 for LLMs).
7. **Soft Skills:** Technical Report Writing & Executive Briefings, Ethical Decision-Making.

### Features:
- Plain-English beginner explanation for every skill.
- "What Good Looks Like" concrete mastery criteria.
- Direct links to recommended CyberTube study playlists.
- Checkbox progress tracking with local storage persistence (`cybertube_skills_completed`).
- Live percentage progress bar and category filtering.

## 3. Legal Practice Labs Matrix (`/labs`)
Directory of 7 legal targets and wargames:
- **PortSwigger Web Security Academy:** Free, interactive, browser-based web vulnerabilities.
- **TryHackMe:** Guided rooms from beginner fundamentals to advanced offensive/defensive scenarios.
- **picoCTF:** Carnegie Mellon's introductory capture-the-flag wargame.
- **Hack The Box:** Realistic vulnerable Linux and Windows machines.
- **OverTheWire:** Command-line SSH wargames (Bandit, Natas) for Linux mastery.
- **OWASP Juice Shop:** Intentionally insecure modern JavaScript web application.
- **DVWA (Damn Vulnerable Web App):** Classic PHP/MySQL testbed for web exploit drills.

## 4. Ethics & Responsible Conduct Policy (`/ethics`)
- **Primary Rule:** Only test systems you own or have explicit prior written authorization to test.
- **Legal Boundaries:** Highlights CFAA (Computer Fraud and Abuse Act), UK Computer Misuse Act, and international statutes.
- **Coordinated Disclosure:** 90-day notification timeline guidelines for vendors.
- **Reporting & Integrity:** Guidance on immediately halting testing upon encountering sensitive out-of-scope personal data.
