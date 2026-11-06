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
- **Instructor**: Netsec Explained
- **Channel**: [Netsec Explained on YouTube](https://www.youtube.com/@NetsecExplained)
- **Attribution Note**: CyberTube integrates public educational videos and open-source forensic PCAPs from Netsec Explained with structured theory guides, practical lab environments, and assessed capstone scenarios. No direct commercial partnership or endorsement is implied.
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
   The remaining 34 lessons (33 regular curriculum lessons + 1 capstone investigation) do not contain YouTube videos. Instead, CyberTube renders a dedicated Forensics Curriculum & Practical Lab Guide featuring:
   - Reading duration estimates and module breadcrumbs.
   - Key terminology and RFC/protocol specifications.
   - Exact Wireshark display filters with one-click copy functionality.
   - Step-by-step procedural workflows.
   - Interactive knowledge check questions with instant feedback and reset capabilities.
   - Direct attribution and external link to Netsec Explained.

---

## PCAP Scenario & Evidence Library

The course integrates verified forensic captures from the official Netsec Explained upstream repository and the Wireshark Foundation:

1. **Hackers on the Network.pcapng**:
   - Upstream Repo: `https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics`
   - File Size: 8,127,348 bytes
   - SHA-256: `b2bd9a8b484f4ded72a4ce7de1335198d5ae6e81ace89fe6e6d5a071e1391cd9`
   - Role: Multi-stage enterprise intrusion, Module 3 practical analysis.

2. **Scenario 1.pcapng**:
   - Upstream Repo: `https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics`
   - File Size: 1,843,216 bytes
   - SHA-256: `3d15daea9d46ee8aa6a3a111a3ee37e2e5be009d509d57a249dd850d510b07d8`
   - Role: Malicious payload delivery, command execution & C2 beaconing in Module 4.

3. **Scenario 2.pcap**:
   - Upstream Repo: `https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics`
   - File Size: 16,002,551 bytes
   - SHA-256: `f664404d592d4fd647ebdf8117eb91b91a868fad1b54888e2117d1b271ba5b11`
   - Role: Credential dumping, lateral SMB movement & FTP exfiltration in Module 5.

4. **Wireshark Sample Captures Archive**:
   - Source: Wireshark Foundation Wiki Community Archive (`https://wiki.wireshark.org/SampleCaptures`)
   - Role: Protocol edge cases, asymmetric routing, TCP retransmissions, and DNS poisoning.

---

## Assessment & Practical Evaluation Engine

The course employs a rigorous 4-dimension certification engine that prevents premature completion claims:

1. **Interactive Knowledge Checks**: Real-time evaluation embedded within every individual lesson.
2. **Assessed Hands-On Labs**: 8 comprehensive lab environments featuring interactive task checkboxes, display filter assistance, persistent evidence worksheet answers, and live completion tracking.
3. **Module Quizzes (40 Questions Total)**:
   - Exactly 5 technical questions per module across Modules 00 through 07.
   - Passing threshold of 70% (requires at least 4/5 correct answers).
   - Full historical attempt tracking (attempt number, timestamps, answer selections, and highest score preservation).
4. **Operation Blackout Beacon (SOC Capstone)**:
   - Synthetic enterprise intrusion scenario contextualizing verified packet artifacts.
   - 6-part structured student report (Executive Summary, Initial Access, C2 Beaconing, Lateral Movement, Exfiltration, Remediation Roadmap).
   - Automated structural/completeness check requiring substantive content across all 6 sections (minimum 20 words each) and relevant technical packet analysis terms.
   - Independent learner rubric self-assessment (0–100 marks) requiring ≥75/100 to pass. Length-based heuristics or text-inflation shortcuts cannot bypass the assessment.
5. **Multi-Dimensional Course Completion**:
   - Course completion is gated behind all 4 dimensions: 37/37 lessons, 8/8 passed quizzes, 8/8 completed labs, and a passed capstone submission.
   - Simply toggling the capstone lesson complete cannot award 100% course completion without satisfying all assessment gates.

---

## Progress Migration & Backward Compatibility

- **Stable ID**: The course preserves its initial ID `course-packet-analysis-wireshark` to avoid breaking existing references.
- **Legacy Progress Archival**: Users who completed the prototype lessons (`les-wireshark-deep-dive`, `les-wireshark-troubleshooting`) have their completions safely archived into `archivedLegacyLessonIds` in localStorage. These legacy lessons are not falsely counted towards the 37-lesson masterclass progress, and an informational banner alerts learners that their historical record is preserved.
- **Multi-Course Isolation**: Existing courses (MERN Full Stack, Networking for Hackers 2027, Wireshark and Ethical Hacking) retain their standard lesson-based completion semantics and are completely unaffected by masterclass-specific assessment gates.

