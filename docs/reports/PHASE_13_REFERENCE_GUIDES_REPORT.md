# CyberTube Phase 13 — Reference Guides & Utilities Report

## 1. Overview
To deliver a complete educational platform, Phase 13 created comprehensive reference guides for Industry Certifications (`/certifications`), Career Pathways (`/careers`), a Cybersecurity Glossary (`/glossary`), and Technical Cheat Sheets (`/cheat-sheets`).

## 2. Certifications Guide (`/certifications`)
- **Vendor-Neutral Policy:** Zero commercial pricing or voucher affiliate marketing. Direct links to official vendor registration and objective syllabi only.
- **Featured Credentials:**
  1. *CompTIA Security+ (SY0-701):* Clear notice regarding active validity through 2026/2027 and retirement of legacy SY0-601. Domain weightings: General Concepts (12%), Threats & Mitigations (22%), Architecture (18%), Operations (28%), Management & Oversight (20%).
  2. *CompTIA Network+ (N10-009):* Modernized June 2024 update replacing N10-008.
  3. *Cisco Certified Network Associate (CCNA 200-301 v1.1):* Incorporates August 2024 additions including cloud automation and AI networking concepts.
  4. *CompTIA CySA+ (CS0-003):* Intermediate defensive operations and SIEM analysis.
  5. *OffSec Certified Professional (OSCP / PEN-200):* Hands-on 24-hour practical penetration test and reporting.
  6. *AWS Certified Security - Specialty (SCS-C02):* Cloud IAM policies and workload encryption.

## 3. Career Pathways Guide (`/careers`)
Breaks down 6 distinct cybersecurity careers:
1. **Security Operations Center (SOC) Analyst:** Daily SIEM alert triage, log analysis, EDR containment, Tier 1 to Detection Engineer ladder.
2. **Penetration Tester / Ethical Hacker:** Authorized network and web exploitation, Burp Suite, report writing, Junior to Red Team Lead ladder.
3. **Application Security (AppSec) Engineer:** CI/CD security scanning, code auditing, threat modeling, Junior to CPSO ladder.
4. **Cloud Security Engineer:** Zero-trust cloud IAM, Terraform guardrails, DevOps to Principal Cloud Architect ladder.
5. **Governance, Risk & Compliance (GRC) Analyst:** Regulatory audits (SOC 2, ISO 27001), vendor risk, GRC Specialist to CISO ladder.
6. **Digital Forensics & Incident Response (DFIR) Analyst:** Memory acquisition, Volatility, MFT analysis, Incident Responder to DFIR Lead ladder.

## 4. Cybersecurity Glossary (`/glossary`)
- 44 fundamental terms covering Fundamentals, Networking, Threats & Attacks, Defense & Monitoring, Cryptography, and Cloud.
- Dual-mode explanations: Formal technical definition + real-world analogy (e.g. CIA triad, XSS, SSRF, Air Gap, Honeypot, Salt).
- Real-time instant search input.

## 5. Security Cheat Sheets (`/cheat-sheets`)
- **Tab 1 — Linux Security Commands:** Navigation, permissions, SUID hunting (`find / -perm -4000`), text parsing (`grep`, `awk`), socket inspection (`ss -tulpn`), and system logging (`tail -f /var/log/auth.log`). Includes one-click copy and flag breakdowns.
- **Tab 2 — Common Ports & Protocols:** 30+ well-known and registered ports (TCP & UDP) with protocol mechanics, description, and concrete security implications (e.g. unencrypted credentials on ports 21/23/80, SMB lateral movement on 445, RDP brute force on 3389).
