# Module 16 — Windows Incident Response, Threat Scenarios and Triage

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Advanced | **Suggested effort:** 10–12 hours | **Prerequisite:** Module 15

[← Master course](README.md) | [Previous module](15-windows-event-forwarding-and-soc-detection-engineering.md) | [Next module](17-final-capstone-windows-soc-analyst-portfolio-and-job-readiness.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Triage Windows alerts using reproducible evidence and context.
2. Assess likely Windows attack techniques using MITRE ATT&CK as a vocabulary.
3. Produce an incident report with containment recommendations.

## Detailed topics checklist

- [ ] Alert triage: validate, scope, timeline, evidence, impact, escalate
- [ ] Windows login abuse, suspicious PowerShell, anomalous new service/task
- [ ] RDP/SMB lateral-movement risk indicators from defensive telemetry
- [ ] Privilege-change and registry-persistence indicators
- [ ] Incident note-taking, stakeholder updates and recovery validation
- [ ] Attack simulations only as benign exercises; no live intrusion tooling

## Free YouTube video lesson(s) — watch in this order

- [Windows logging for SOC Analysts — Windows/Sysmon/PowerShell](https://www.youtube.com/watch?v=svxqs_yvJIk)
- [TrustedSec Sysmon 20 — WMI permanent events](https://youtu.be/UITVJ_AozQo)
- [TrustedSec Sysmon 21 — Process tampering indicators](https://youtu.be/iAJMUNt8OcY)
- [13Cubed — Introduction to Windows Forensics](https://www.youtube.com/watch?v=VYROU-ZwZX8)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [MITRE ATT&CK Windows techniques](https://attack.mitre.org/matrices/enterprise/)
- [Microsoft — Events to Monitor](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor)
- [13Cubed free forensic cheat sheets](https://training.13cubed.com/downloads)
- [Sigma detection rules (open source)](https://github.com/SigmaHQ/sigma)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM plus an optional isolated Windows Server VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Choose a scenario: (a) multiple failed lab logins, (b) unexpected benign scheduled task, or (c) unusual but benign PowerShell activity.
2. Create only harmless lab events with clear timestamps and test-account labels.
3. Collect Windows Security, Sysmon (if enabled), Defender status and Task Scheduler evidence.
4. Build a concise timeline: time, host, user, process, source and interpretation.
5. Map the *behavior category* to suitable MITRE techniques without claiming that real compromise occurred.
6. Write a 1-page incident report: hypothesis, facts, evidence, severity, false positives, containment, next steps.
7. Restore the baseline snapshot or remove all simulated artifacts; verify no changes remain.

### What successful completion looks like

- Windows incident report and investigation timeline
- 5-question SOC interview narrative using this case
- Evidence-to-conclusion table that distinguishes observation from inference

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

1. Why should you not call every 4625 event a brute-force attack?
2. What is the difference between triage and containment?
3. What information supports escalation?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 16 — Windows Incident Response, Threat Scenarios and Triage
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
