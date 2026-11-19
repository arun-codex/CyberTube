# Module 02 — Windows CMD and PowerShell Essentials

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Beginner | **Suggested effort:** 8–10 hours | **Prerequisite:** Module 01

[← Master course](README.md) | [Previous module](01-windows-architecture-and-security-foundations.md) | [Next module](03-windows-identity-uac-and-ntfs-permissions.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Navigate Windows with Command Prompt and PowerShell.
2. Use safe read-only inventory cmdlets.
3. Export structured output to CSV without modifying system security settings.

## Detailed topics checklist

- [ ] CMD vs Windows PowerShell 5.1 vs modern PowerShell 7
- [ ] Objects, properties, cmdlets, `Get-Help`, `Get-Command`, pipelines
- [ ] Paths, quotes, filesystem and environment variables
- [ ] `whoami /all`, `systeminfo`, `Get-Process`, `Get-Service`, `Get-ComputerInfo`
- [ ] CSV exports and pipeline formatting (avoid `Format-Table` before export)

## Free YouTube video lesson(s) — watch in this order

- [PowerShell Full Course — Beginner to scripting (5 hours)](https://www.youtube.com/watch?v=ueKFupiT2wA)
- [CyberPatriot — Windows Basics video](https://www.youtube.com/watch?v=8AtEe3bOqus)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft Learn — Get started with Windows PowerShell](https://learn.microsoft.com/en-us/training/paths/get-started-windows-powershell/)
- [PowerShell security features / AMSI / application control](https://learn.microsoft.com/en-us/powershell/scripting/security/security-features)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Open a standard (not elevated) PowerShell terminal and run `Get-Help Get-Process`.
2. Run `whoami /all`, `Get-Process | Select-Object -First 10`, and `Get-Service | Where-Object Status -eq Running`.
3. Save running services: `Get-Service | Where-Object Status -eq Running | Export-Csv C:\SOC-Lab\exports\running-services.csv -NoTypeInformation`.
4. Query `Get-LocalUser` and `Get-LocalGroup` where present; read rather than edit.
5. Use `Get-ChildItem C:\SOC-Lab -Recurse` and `Get-FileHash` on a text file you created.
6. Compare data shown by CMD and PowerShell for IP configuration and note object vs text output.

### What successful completion looks like

- `windows-command-cheatsheet.md` with 20 commands and explanations
- `running-services.csv`, plus process and user inventories
- A 10-question personal drill with answers

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

1. Why are PowerShell pipeline objects different from CMD text?
2. What does `-NoTypeInformation` affect in CSV exports?
3. What is the distinction between local admin and non-elevated PowerShell?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 02 — Windows CMD and PowerShell Essentials
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
