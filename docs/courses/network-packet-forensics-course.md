# Network Packet Analysis & Forensics Masterclass

## Overview

The **Network Packet Analysis & Forensics Masterclass** is an enterprise-grade, comprehensive cybersecurity course hosted on CyberTube. Engineered for Blue Team analysts, SOC defenders, and digital forensics & incident response (DFIR) practitioners, this course transforms fundamental packet capture mechanics into advanced protocol reverse engineering, malware traffic analysis, intrusion detection, and automated command-line forensics.

## Course Metadata

- **Course ID**: `course-packet-analysis-wireshark`
- **Canonical Slug**: `network-packet-analysis-masterclass`
- **Canonical URL**: `/courses/network-packet-analysis-masterclass`
- **Legacy / Alias Slug**: `network-packet-analysis-forensics-masterclass` (redirects 308 to canonical with query string preservation)
- **Track**: `cybersecurity`
- **Domains**: `['network-security', 'soc-blue-team', 'dfir']`
- **Difficulty**: `Advanced`
- **Total Duration**: 1,410 minutes (23 hours 30 mins)
- **Instructor**: Netsec Explained (Senior Network Security & Forensics Researcher)
- **Channel**: [Netsec Explained on YouTube](https://www.youtube.com/@NetsecExplained)
- **Official PCAP Repository**: [NetsecExplained/Advanced-Wireshark-Network-Forensics](https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics)

---

## Curriculum Structure

The curriculum is structured into **9 comprehensive modules** containing **37 total lessons** (36 progressive curriculum lessons + 1 comprehensive capstone investigation):

| Module ID | Module Title | Order | Lessons | Est. Duration | Video Included |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `mod-00` | Orientation & Foundations of Packet Analysis | 1 | 4 lessons | 120 mins | — |
| `mod-01` | Core Network Protocol Dissection | 2 | 4 lessons | 150 mins | — |
| `mod-02` | Critical Infrastructure Protocols | 3 | 4 lessons | 150 mins | — |
| `mod-03` | Advanced Wireshark Configuration & Filter Mastery | 4 | 5 lessons | 180 mins | Yes (Part 1: `e_dsGhvq9CU`) |
| `mod-04` | Malware Traffic Analysis & C2 Communication | 5 | 5 lessons | 195 mins | Yes (Part 2: `ZJZlRGLN2_s`) |
| `mod-05` | Network Reconnaissance, DoS & Exfiltration | 6 | 5 lessons | 195 mins | Yes (Part 3: `HR_sLcW4xz0`) |
| `mod-06` | Command-Line Forensics & Automation | 7 | 4 lessons | 150 mins | — |
| `mod-07` | SOC Workflows, Threat Hunting & DFIR Reporting | 8 | 4 lessons | 150 mins | — |
| `mod-08` | Capstone: Enterprise Intrusion Investigation | 9 | 1 lesson | 120 mins | — |

---

## Video Integration & Theory Architecture

To ensure high technical density and maintain complete pedagogical integrity:

1. **Integrated Masterclass Videos**:
   - **Part 1**: `e_dsGhvq9CU` — *Advanced Wireshark Network Forensics (Filter Chains & Protocol Dissection)* in Module 3, Lesson 2.
   - **Part 2**: `ZJZlRGLN2_s` — *Advanced Wireshark Network Forensics (Malware Traffic & C2 Stream Analysis)* in Module 4, Lesson 2.
   - **Part 3**: `HR_sLcW4xz0` — *Advanced Wireshark Network Forensics (DoS, Recon & FTP Exfiltration Forensics)* in Module 5, Lesson 2.

2. **Theory & Lab Guide Lessons**:
   The remaining 34 lessons do not contain YouTube videos. Instead, CyberTube renders a dedicated Forensics Curriculum & Practical Lab Guide featuring:
   - Reading duration estimates and module breadcrumbs.
   - Key terminology and RFC/protocol specifications.
   - Exact Wireshark display filters with one-click copy functionality.
   - Step-by-step procedural workflows.
   - Interactive knowledge check questions with instant feedback and reset capabilities.
   - Direct attribution and external link to Netsec Explained.

---

## PCAP Scenario & Evidence Library

The course integrates verified forensic captures from the official Netsec Explained repository and Wireshark Foundation:

- `Hackers on the Network.pcapng` (Multi-stage enterprise intrusion, SHA-256 verified)
- `Scenario 1.pcapng` (Malicious payload delivery & persistence beaconing)
- `Scenario 2.pcap` (Credential dumping, lateral movement & FTP exfiltration)
- `Wireshark Wiki Sample Captures` (Protocol edge cases: asymmetric routing, TCP retransmissions, DNS spoofing)

---

## Assessment & Practical Evaluation Engine

Each module includes assessed hands-on exercises:

1. **Interactive Knowledge Checks**: Real-time evaluation embedded within every lesson.
2. **Assessed Module Labs**: 8 comprehensive lab environments with technical objectives, hint expansions, and evidence worksheets.
3. **Module Quizzes**: Graded 5-question technical assessments requiring a 70% pass mark to demonstrate mastery.
4. **Operation Blackout Beacon (SOC Capstone)**:
   - 100-mark enterprise breach scenario.
   - 6 graded reporting sections: Executive Summary, Initial Access Analysis, C2 & Beaconing Analysis, Lateral Movement, Data Exfiltration & Impact, Containment & Remediation Roadmap.
   - Minimum pass mark: 75/100.

---

## Progress Migration & Backward Compatibility

- **Stable ID**: The course preserves its initial ID `course-packet-analysis-wireshark` to avoid breaking existing references.
- **Legacy Progress Archival**: Users who completed the prototype lessons (`les-wireshark-deep-dive`, `les-wireshark-troubleshooting`) have their completions safely archived into `archivedLegacyLessonIds` in localStorage. These legacy lessons are not falsely counted towards the 37-lesson masterclass progress, and an informational banner alerts learners that their historical record is preserved.

