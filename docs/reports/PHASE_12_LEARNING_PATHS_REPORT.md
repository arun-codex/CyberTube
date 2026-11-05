# CyberTube Phase 12 — Cybersecurity Learning Paths & Ethics Curriculum Report

**Date:** 2026-11-05  
**Branch:** `feature/phase-12-platform-upgrade`  
**Focus:** Structured Cybersecurity Pathways & Ethics Framework  
**Status:** DELIVERED & VERIFIED

---

## 1. Curriculum Architecture (`src/types/learning-path.ts`)

Developed a comprehensive type definition structure supporting progressive, stage-based cybersecurity mastery:
- **`LearningPath`**: Unique identifier, slug, title, description, domain, certification alignment, estimated duration, difficulty level, prerequisites, stages, and learning outcomes.
- **`LearningStage`**: Sequential stage number, title, focus topics, practical exercises, and curated YouTube playlists.
- **`PracticalExercise`**: Title, objective, environment setup, and verification criteria.

---

## 2. Pathways Specification (`src/data/learning-paths.ts`)

### Path 1: Cybersecurity Practitioner Foundations
- **Slug:** `cybersecurity-foundations`
- **Domain:** `fundamentals`
- **Certification Alignment:** CompTIA Security+ (SY0-701)
- **Duration:** ~48 hours
- **Stages:**
  1. *Stage 1 — Networking Fundamentals:* OSI 7-Layer, TCP/IP handshake, CIDR subnetting, DNS/DHCP inspection via Wireshark.
  2. *Stage 2 — Linux & Systems Security:* Linux terminal navigation, permissions (`chmod`, `chown`), PAM, SSH hardening, systemd service management.
  3. *Stage 3 — Security Models & Cryptography:* CIA Triad, symmetric vs asymmetric encryption (RSA, AES-GCM), hashing (SHA-256), PKI and TLS handshake.
  4. *Stage 4 — Defensive Scripting & Python Automation:* Python socket programming, log parsing, automated port probing.

### Path 2: Web & Application Security Specialist
- **Slug:** `web-application-security`
- **Domain:** `web-app-security`
- **Certification Alignment:** PortSwigger Certified Web Security Practitioner (CWSP)
- **Duration:** ~56 hours
- **Stages:**
  1. *Stage 1 — HTTP Protocols & Modern Web Architectures:* Request/response headers, cookies, CORS, WebSocket framing.
  2. *Stage 2 — Injection Vulnerabilities:* SQL injection (union, error-based, blind), Command Injection, SSTI.
  3. *Stage 3 — Client-Side Attack Vectors:* Reflected & Stored XSS, DOM XSS, CSRF tokens, CSP bypasses.
  4. *Stage 4 — Authentication, Session Handling & Access Control:* Broken Object Level Authorization (BOLA/IDOR), JWT validation flaws.

### Path 3: Ethical Hacking & Offensive Security Operations
- **Slug:** `ethical-hacking-red-team`
- **Domain:** `red-team-pentest`
- **Certification Alignment:** Offensive Security Certified Professional (OSCP) / CEH
- **Duration:** ~64 hours
- **Stages:**
  1. *Stage 1 — Open Source Intelligence (OSINT) & Reconnaissance:* DNS harvesting, WHOIS, certificate transparency logs, passive asset mapping.
  2. *Stage 2 — Port Scanning & Service Enumeration:* Nmap TCP SYN scans, banner grabbing, NSE scripting.
  3. *Stage 3 — Vulnerability Assessment & Exploitation Concepts:* Metasploit framework, buffer overflow fundamentals, privilege escalation vectors.
  4. *Stage 4 — Post-Exploitation & Reporting:* Scoped engagement guidelines, loot handling, professional executive remediation reports.

---

## 3. Dedicated Routes & Experience

1. **Pathway Catalog (`/learning-paths`):**
   Displays path overview cards, prerequisites, stage counts, and certification badges with full dark mode tokens.
2. **Dynamic Stage Breakdown (`/learning-paths/[slug]`):**
   Renders deep curriculum stages with verified YouTube playlist embeds (`PLG49S3nxzAnl4QDVqK-hOnoqkSKEIDDuk`, `PL103038D12140D8C6`, etc.), prerequisites, and actionable laboratory exercises.
3. **Ethics & Conduct Policy (`/ethics`):**
   Clear rules of engagement: authorization prerequisites, prohibited actions, bug bounty adherence, and legal disclosure compliance.

---

## 4. Integration Verification
- **Navigation:** Added to `Header.tsx` desktop navigation bar.
- **Global Search:** Indexed in `src/lib/search.ts` with real-time keyword filtering.
- **Sitemap:** Automatically included in `app/sitemap.ts`.
- **E2E Tests:** `tests/12_phase12_platform.spec.ts` passed (6/6 tests).
