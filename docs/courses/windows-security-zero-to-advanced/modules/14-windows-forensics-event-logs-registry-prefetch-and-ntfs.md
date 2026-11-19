# Module 14 — Windows Forensics: Event Logs, Registry, Prefetch and NTFS

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Advanced | **Suggested effort:** 10–12 hours | **Prerequisite:** Module 13

[← Master course](README.md) | [Previous module](13-sysinternals-process-explorer-autoruns-and-threat-hunting.md) | [Next module](15-windows-event-forwarding-and-soc-detection-engineering.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Explain the forensic value and limits of common Windows artifacts.
2. Build a timeline from benign execution and login events.
3. Document collection methods without damaging evidence.

## Detailed topics checklist

- [ ] EVTX logs and event timestamps/time zone considerations
- [ ] Prefetch execution traces and feature limitations
- [ ] NTUSER.DAT, UserAssist, ShellBags, Run keys
- [ ] LNK files, Jump Lists, RecentDocs and file interactions
- [ ] NTFS MFT and USN journal concepts, evidence of deletion
- [ ] Evidence handling, hashes, note-taking, preservation and acquisition scope

## Free YouTube video lesson(s) — watch in this order

- [13Cubed — Introduction to Windows Forensics playlist](https://www.youtube.com/playlist?list=PLlv3b9B16ZadqDQH0lTRO4kqn2P1g9Mve)
- [13Cubed — Introduction to Windows Forensics](https://www.youtube.com/watch?v=VYROU-ZwZX8)
- [13Cubed — NTFS MFT and Journal Forensics](https://www.youtube.com/watch?v=_qElVZJqlGY)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [13Cubed free forensic cheat sheets](https://training.13cubed.com/downloads)
- [DFIR artifact reference — 13Cubed cheat sheets](https://training.13cubed.com/downloads)
- [Microsoft — Events to Monitor](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM plus an optional isolated Windows Server VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Take snapshot and establish VM clock/time zone; record a known start time.
2. Create and open a small test text file; launch Notepad twice and note activity timestamps.
3. Observe (read-only) `C:\Windows\Prefetch` if available; absence is not proof of non-execution.
4. Create a shortcut to the file and inspect its target and modified time in a benign lab.
5. Export pertinent events for test login and process execution; align them on a UTC-based timeline.
6. Hash your exported files using `Get-FileHash` and keep collection notes.
7. Write a case narrative with observed facts, limitations and possible alternative explanations.

### What successful completion looks like

- Forensic timeline CSV with UTC and source column
- SHA-256 evidence manifest and chain-of-custody-style notes
- One-page explanation of Prefetch/Registry/LNK artifact limitations

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

1. Why does a file modified time alone not prove execution?
2. Why record the time zone?
3. What is the difference between volatile and persistent evidence?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 14 — Windows Forensics: Event Logs, Registry, Prefetch and NTFS
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
