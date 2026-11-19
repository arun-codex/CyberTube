# Module 13 — Sysinternals Process Explorer, Autoruns and Threat Hunting

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Advanced | **Suggested effort:** 9–11 hours | **Prerequisite:** Module 12

[← Master course](README.md) | [Previous module](12-windows-hardening-baselines-laps-and-application-control.md) | [Next module](14-windows-forensics-event-logs-registry-prefetch-and-ntfs.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Use Sysinternals to investigate suspicious Windows behaviors safely.
2. Identify process ancestry, signature and auto-start evidence.
3. Correlate current state with Windows/Sysmon historical telemetry.

## Detailed topics checklist

- [ ] Process Explorer vs Task Manager; handles, image paths, signatures
- [ ] Autoruns as an auto-start baseline and triage tool
- [ ] Process Monitor as high-volume evidence, filtering and capture caution
- [ ] Hashes and publisher signatures; false positive caveats
- [ ] Process tree and persistence timelines

## Free YouTube video lesson(s) — watch in this order

- [13Cubed — Introduction to Windows Forensics](https://www.youtube.com/watch?v=VYROU-ZwZX8)
- [TrustedSec Sysmon 6 — Process tracking](https://youtu.be/46-alN2_vlo)
- [TrustedSec Sysmon 10 — Process access signals](https://youtu.be/51YRHDl93f4)
- [TrustedSec Sysmon 22 — Registry actions](https://youtu.be/hy5s1pnaO2I)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft Sysinternals official tools](https://learn.microsoft.com/en-us/sysinternals/)
- [Microsoft Sysinternals Process Explorer](https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer)
- [Microsoft Sysinternals video training](https://learn.microsoft.com/en-us/sysinternals/resources/webcasts)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM plus an optional isolated Windows Server VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Download Sysinternals utilities from Microsoft only; run inside your VM.
2. Open Process Explorer and inspect signed Microsoft system processes; save a screenshot of parent-child relationships.
3. Launch Notepad, identify its executable path, parent PID and signature state.
4. Open Autoruns and **observe only**; export a CSV/screenshot baseline without disabling entries.
5. Compare process findings with Sysmon 1 and scheduled-task inventories.
6. Write a mock SOC alert for a made-up anomalous process; separate observed evidence from hypotheses.

### What successful completion looks like

- Process tree with PID, parent, signer and command line
- Autoruns inventory and 3 investigation questions
- Short threat-hunting report using only benign activity

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

1. Why should you not immediately delete an unusual autorun entry?
2. Why can unsigned executables be legitimate?
3. What historical detail does Sysmon add to Process Explorer?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 13 — Sysinternals Process Explorer, Autoruns and Threat Hunting
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
