# CyberTube Phase 13 — Authoritative Catalog & Library Report

## 1. Executive Summary
As part of Phase 13, CyberTube established an authoritative, centralized resource catalog at `/data/resources.json` strictly verified and validated at runtime using Zod (`ResourceSchema`). The catalog contains exactly 21 vetted resources: 14 video courses/playlists by authentic creators and 7 curated legal practice platforms.

## 2. Resource Catalog Matrix

| ID | Title | Creator / Provider | Track | Level | Cost | Type |
|---|---|---|---|---|---|---|
| `net-01` | Free CCNA 200-301 Complete Course | Jeremy's IT Lab | Networking | Beginner | Free | Playlist |
| `net-02` | NetworkChuck CCNA Course | NetworkChuck | Networking | Beginner | Free | Playlist |
| `lin-01` | Linux for Ethical Hackers | The Cyber Mentor (TCM) | Linux | Beginner | Free | Video |
| `lin-02` | Linux Command Line Tutorial For Beginners | ProgrammingKnowledge | Linux | Beginner | Free | Playlist |
| `sec-01` | CompTIA Security+ SY0-701 Training Course | Professor Messer | Security Foundations | Beginner-Intermediate | Free | Playlist |
| `sec-02` | CompTIA Security+ Full Course | freeCodeCamp / Andrew Ramdayal | Security Foundations | Beginner | Free | Video |
| `sec-03` | Security+ Practice Exam Walkthroughs | Inside Cloud and Security | Security Foundations | Beginner-Intermediate | Free | Playlist |
| `prog-01`| Python 3 for Penetration Testing | The Cyber Mentor (TCM) | Scripting | Beginner-Intermediate | Free | Video |
| `off-01` | Practical Ethical Hacking — The Complete Course | The Cyber Mentor (TCM) | Ethical Hacking | Beginner-Intermediate | Free | Video |
| `off-02` | Complete Ethical Hacking Course | freeCodeCamp / Heath Adams | Ethical Hacking | Beginner | Free | Video |
| `off-03` | PortSwigger Web Security Academy Walkthroughs | Rana Khalil | Web Security | Intermediate | Free | Playlist |
| `off-04` | Hack The Box Walkthroughs | IppSec | Ethical Hacking | Intermediate | Free | Playlist |
| `off-05` | Active Directory Attacks & Defense | John Hammond | Active Directory | Intermediate | Free | Playlist |
| `adv-01` | Binary Exploitation / Memory Corruption | LiveOverflow | Advanced Exploitation | Advanced | Free | Playlist |
| `lab-01` | OverTheWire (Bandit & Natas) | OverTheWire Community | Foundations / Linux | Free | Free | Lab |
| `lab-02` | TryHackMe | TryHackMe Ltd. | All Levels | Free & Paid | Free & Paid | Lab |
| `lab-03` | PortSwigger Web Security Academy | PortSwigger Ltd. | Web App Security | Free | Free | Lab |
| `lab-04` | LetsDefend | LetsDefend | Defensive / SOC | Free & Paid | Free & Paid | Lab |
| `lab-05` | Blue Team Labs Online | Security Blue Team | Defensive / IR | Free & Paid | Free & Paid | Lab |
| `lab-06` | OWASP Juice Shop & DVWA | OWASP Foundation | Web App Security | Free | Free | Lab |
| `lab-07` | Hack The Box | Hack The Box | Ethical Hacking | Free & Paid | Free & Paid | Lab |

## 3. Privacy-First Click-to-Load Architecture
- **Component:** `src/components/library/ClickToLoadEmbed.tsx`
- **Mechanism:** Displays an accessible preview card with video metadata, title, and creator attribution. No third-party cookies or JavaScript connections to `youtube.com` or Google telemetry are initialized until the user explicitly clicks the "Load Video Player" button.
- **Privacy Domain:** Embedded players use `https://www.youtube-nocookie.com/embed/...` to respect learner privacy.
- **Fallback:** Includes a prominent "Watch on Original Platform" direct link to ensure learners can view content even in environments where video embeds are blocked.

## 4. Verification & Testing
- Automated test: `Resource Library (/library) renders all 21 items with search, filter, and sorting` (`PASS`).
- Automated test: `Resource Detail (/library/[id]) provides click-to-load embed and YouTube fallback` (`PASS`).
- Zod runtime validation: 100% type-checked, guaranteed non-null fields.

