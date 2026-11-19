# Module 01 — Windows Architecture and Security Foundations

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Beginner | **Suggested effort:** 6–8 hours | **Prerequisite:** Module 00

[← Master course](README.md) | [Previous module](00-home-lab-setup-ethics-and-learning-workflow.md) | [Next module](02-windows-cmd-and-powershell-essentials.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Navigate Windows administrative consoles confidently.
2. Describe local system architecture, user space, kernel, tokens and core security boundaries.
3. Identify security-related administrative tools on Windows 11.

## Detailed topics checklist

- [ ] Windows processes, services, drivers and registry high-level concepts
- [ ] NTFS, partitions, boot chain, UEFI, TPM, Secure Boot
- [ ] Task Manager, Computer Management, Services, Settings and Control Panel
- [ ] Windows Security app vs Microsoft Defender Antivirus vs enterprise Defender for Endpoint
- [ ] UAC, local policy, Windows Update and recovery concepts

## Free YouTube video lesson(s) — watch in this order

- [CyberPatriot — Windows Basics video](https://www.youtube.com/watch?v=8AtEe3bOqus)
- [CyberPatriot — Windows Security Tools](https://www.youtube.com/watch?v=C_RTcErv3gU)
- [CyberPatriot — Windows Security Configuration](https://www.youtube.com/watch?v=Vvv4LaCAJWQ)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft Windows security documentation](https://learn.microsoft.com/windows/security)
- [Microsoft — Windows security baselines](https://learn.microsoft.com/windows/security/threat-protection/windows-security-configuration-framework/windows-security-baselines)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Open `msinfo32`, `winver`, `msconfig`, `services.msc`, `eventvwr.msc` and Task Manager; note what each shows.
2. In Windows Security, locate virus protection, firewall, device security, and protection history.
3. Find the OS build, Windows edition, active network profile, and installed updates.
4. Use Task Manager to select one first-party process; record name, PID, user and parent if available.
5. Check Secure Boot and TPM status where supported by the VM; mark unsupported or unavailable honestly.
6. Write a one-page diagram of where endpoint events travel: program → Windows event provider → log → analyst.

### What successful completion looks like

- Annotated map of at least 8 Windows consoles
- One-page Windows trust-boundary diagram
- Security control inventory with enabled/disabled/not available

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

1. What is the difference between a service and a process?
2. Why does UAC matter for administrative actions?
3. What is a Windows event provider?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 01 — Windows Architecture and Security Foundations
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
