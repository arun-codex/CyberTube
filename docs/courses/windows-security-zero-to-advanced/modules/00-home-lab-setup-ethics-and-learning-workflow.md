# Module 00 — Home Lab Setup, Ethics, and Learning Workflow

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Foundation | **Suggested effort:** 5–7 hours | **Prerequisite:** None

[← Master course](README.md) | First module | [Next module](01-windows-architecture-and-security-foundations.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Understand Windows editions, safe virtualization, snapshots, and VM resource budgets.
2. Create a Windows 11 client VM and record an initial baseline.
3. Explain why real networks and devices must not be tested without permission.

## Detailed topics checklist

- [ ] Host vs guest OS; CPU virtualization; virtual TPM and Secure Boot
- [ ] Windows 11 editions and feature limitations
- [ ] VM networking modes: NAT/host-only and isolation
- [ ] Snapshots, restore points, backups, evidence hygiene

## Free YouTube video lesson(s) — watch in this order

- [Windows 11 on VirtualBox — step-by-step (Garage Tec)](https://www.youtube.com/watch?v=9Z6FZisqazE)
- [Windows 11 VirtualBox setup and TPM considerations](https://www.youtube.com/watch?v=5BC2fRWfiQ0)
- [CyberPatriot — Windows Basics video](https://www.youtube.com/watch?v=8AtEe3bOqus)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Oracle VirtualBox downloads](https://www.virtualbox.org/wiki/Downloads)
- [Microsoft official Windows 11 ISO download](https://www.microsoft.com/software-download/windows11)
- [Microsoft Windows Server 2025 evaluation](https://www.microsoft.com/en-us/evalcenter/download-windows-server-2025)
- [Microsoft Windows security documentation](https://learn.microsoft.com/windows/security)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Check that hardware virtualization is enabled and ensure you have enough RAM and disk space; do not overcommit your work PC.
2. Download VirtualBox and a legitimate Windows 11 ISO from the official pages; comply with license/activation rules.
3. Create a Windows 11 VM with the required supported hardware settings (UEFI, virtual TPM, RAM and disk).
4. Use NAT for normal updates and host-only or disconnected networking for any controlled attack simulation; never use bridged networking for attack labs.
5. Install updates, record Windows edition/build using `winver`, then create snapshot `M00-clean`.
6. Make `C:\SOC-Lab\notes`, `evidence`, and `exports` directories and record VM name, OS build, time zone and test-account names.

### What successful completion looks like

- `lab-inventory.md` with edition/build/hardware/network modes
- Screenshot of updated Windows Security and VM snapshot
- A written authorization/scope statement: ONLY your own isolated VM

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

1. What is a VM snapshot, and what does it not back up?
2. Why is bridged networking unsuitable for deliberately suspicious test traffic?
3. How do Windows 11 Home and Pro differ for business security lab features?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 00 — Home Lab Setup, Ethics, and Learning Workflow
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
