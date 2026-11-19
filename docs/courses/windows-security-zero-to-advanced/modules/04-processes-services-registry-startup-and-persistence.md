# Module 04 — Processes, Services, Registry, Startup and Persistence

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Intermediate | **Suggested effort:** 7–9 hours | **Prerequisite:** Module 03

[← Master course](README.md) | [Previous module](03-windows-identity-uac-and-ntfs-permissions.md) | [Next module](05-windows-networking-smb-rdp-and-firewall-security.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Distinguish expected services and auto-start entries from suspicious changes.
2. Inventory tasks, startup entries and relevant registry keys without editing unrelated items.
3. Correlate processes with users and executable locations.

## Detailed topics checklist

- [ ] Parent-child process chains and common Windows processes
- [ ] Services, scheduled tasks, startup apps and Run keys
- [ ] Registry hives HKLM/HKCU and safe backups
- [ ] Digital signatures, hashes, file paths and startup persistence
- [ ] Benign Windows-native persistence simulation only

## Free YouTube video lesson(s) — watch in this order

- [PowerShell Full Course — Beginner to scripting (5 hours)](https://www.youtube.com/watch?v=ueKFupiT2wA)
- [TrustedSec Sysmon 6 — Process tracking](https://youtu.be/46-alN2_vlo)
- [TrustedSec Sysmon 22 — Registry actions](https://youtu.be/hy5s1pnaO2I)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft Sysinternals official tools](https://learn.microsoft.com/en-us/sysinternals/)
- [Microsoft Sysinternals Process Explorer](https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer)
- [13Cubed free forensic cheat sheets](https://training.13cubed.com/downloads)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Record a baseline using `Get-Process | Select Name,Id,Path` (some paths require elevation).
2. List services using `Get-CimInstance Win32_Service | Select Name,StartMode,State,PathName`.
3. List scheduled tasks with `Get-ScheduledTask | Select TaskName,TaskPath,State`.
4. Inspect `HKCU:\Software\Microsoft\Windows\CurrentVersion\Run` read-only in PowerShell.
5. Create a *benign* scheduled task inside a disposable VM that launches Notepad at user logon, record it, and delete it afterward.
6. Compare before/after inventories and describe why ordinary software updates can also add scheduled tasks.

### What successful completion looks like

- Process/service/task inventory
- Table of 5 persistence locations and their benign purposes
- Screenshot of benign task and evidence of successful cleanup

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

1. Why does a strange filename alone not prove malware?
2. What is a parent PID?
3. Why should analysts compare activity to a baseline?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 04 — Processes, Services, Registry, Startup and Persistence
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
