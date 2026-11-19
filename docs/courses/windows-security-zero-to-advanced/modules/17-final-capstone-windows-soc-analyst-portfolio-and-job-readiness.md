# Module 17 — Final Capstone: Windows SOC Analyst Portfolio and Job Readiness

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Capstone | **Suggested effort:** 12–16 hours | **Prerequisite:** Module 16

[← Master course](README.md) | [Previous module](16-windows-incident-response-threat-scenarios-and-triage.md) | Final module

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Demonstrate end-to-end defensive analysis of a self-created Windows event story.
2. Deliver a public-safe GitHub portfolio report with no secrets or personal data.
3. Answer SOC L1 interview questions using evidence from your lab.

## Detailed topics checklist

- [ ] Case design and statement of authorized lab scope
- [ ] Windows baseline, test scenario and alert qualification
- [ ] Windows Security + Sysmon + PowerShell log correlation
- [ ] Incident timeline, user/host scoping and false-positive assessment
- [ ] Report writing, screen captures, GitHub hygiene, presentation and interview demo

## Free YouTube video lesson(s) — watch in this order

- [Windows Event Logs explained — SOC analyst walkthrough](https://www.youtube.com/watch?v=gRbG-8mQce0)
- [Windows logging for SOC Analysts — Windows/Sysmon/PowerShell](https://www.youtube.com/watch?v=svxqs_yvJIk)
- [TrustedSec Sysmon 6 — Process tracking](https://youtu.be/46-alN2_vlo)
- [13Cubed — Introduction to Windows Forensics](https://www.youtube.com/watch?v=VYROU-ZwZX8)
- [Windows Event Forwarding and Windows log collection](https://www.youtube.com/watch?v=kkzAILQc9LE)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft — Events to Monitor](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor)
- [Advanced Windows audit policy and event IDs](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration)
- [MITRE ATT&CK Windows techniques](https://attack.mitre.org/matrices/enterprise/)
- [13Cubed free forensic cheat sheets](https://training.13cubed.com/downloads)
- [TrustedSec — all 22 Learning Sysmon videos](https://trustedsec.com/research/learning-sysmon-video-series)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM plus an optional isolated Windows Server VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Prepare a fully updated disposable Windows VM and define scope: lab hostnames, no production endpoints, no real credentials.
2. Take clean snapshot; enable only the needed Windows audit and Sysmon telemetry.
3. Trigger three harmless and controlled actions: one failed login, a known process launch and creation/removal of a benign scheduled task.
4. Collect Event Viewer exports and optional Sysmon records; use PowerShell to produce a read-only evidence summary.
5. Create a timeline that shows when each benign action occurred and whether the expected events were generated.
6. Develop two detection ideas (suspicious logon pattern and suspicious new task/process) and document false positives.
7. Produce a final README, redacted screenshots, CSV timeline, event-ID map and incident case study.
8. Restore original snapshot; recheck Windows Security and firewall status and verify cleanup.
9. Practice 15 interview questions aloud, using the investigation to explain your reasoning.

### What successful completion looks like

- `CAPSTONE_REPORT.md` with executive summary, scope, evidence, investigation and recommendations
- `timeline.csv` and `event-map.md` (redacted, no keys/passwords)
- A GitHub-ready portfolio README, plus lessons learned and 15 interview answers

### Troubleshooting and common mistakes

- If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.
- If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.
- Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.
- Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission.

## Study schedule for this module

| Session | Suggested focus | Evidence |
|---|---|---|
| 1 | Watch first lesson; list unfamiliar terms | 10–15 vocabulary definitions |
| 2 | Watch remaining videos and follow docs | Notes with source URLs |
| 3 | Complete first half of the lab | Screenshots, command outputs |
| 4 | Complete second half and troubleshoot | Final exported evidence |
| 5 | Write a SOC-style explanation and take the quiz | Final report and self-score |

## Knowledge check (answer without looking)

1. How did you verify the detection instead of assuming the action generated logs?
2. Which two data sources most increased your confidence?
3. What would you escalate if this pattern appeared on a corporate domain controller?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

### Capstone rubric (100 points)

| Criteria | Points |
|---|---:|
| Correct lab scope, safety and reproducibility | 15 |
| Correctly collected Windows event evidence | 20 |
| Accurate timeline and process/user correlation | 20 |
| Thoughtful false-positive and limitations discussion | 15 |
| Detection ideas and response recommendations | 15 |
| Clear reporting, redaction and portfolio presentation | 15 |

**Pass:** 75+ and zero unauthorized activity or exposed secrets. **Advanced:** 90+ with independently reproduced evidence and defensible conclusions.

## Notes template (copy below)

```text
Module: 17 — Final Capstone: Windows SOC Analyst Portfolio and Job Readiness
Date (with time zone):
Lab VM and Windows build:
Video(s) completed:
Commands tested:
Expected observation:
Actual observation:
Important event IDs/fields:
False positives or limitations:
Artifacts saved (paths):
What I need to repeat:
```
