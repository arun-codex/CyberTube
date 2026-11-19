# Module 09 — PowerShell Security, Safe Automation and Script Logging

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Intermediate | **Suggested effort:** 9–11 hours | **Prerequisite:** Module 08

[← Master course](README.md) | [Previous module](08-sysmon-installation-configuration-and-security-telemetry.md) | [Next module](10-windows-server-2025-and-active-directory-lab-fundamentals.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Build read-only Windows inventory scripts for the SOC.
2. Understand script-block logging, module logging, AMSI and remoting safeguards.
3. Recognize suspicious PowerShell execution patterns from logs without reproducing payloads.

## Detailed topics checklist

- [ ] PowerShell objects, functions, exceptions and constrained output
- [ ] Security Event 4688, PowerShell Operational 4104 if configured
- [ ] Script Block Logging, module logging and event collection privacy
- [ ] AMSI protection overview and code signing concepts
- [ ] Remoting authentication, JEA concept and least privilege

## Free YouTube video lesson(s) — watch in this order

- [PowerShell Full Course — Beginner to scripting (5 hours)](https://www.youtube.com/watch?v=ueKFupiT2wA)
- [Windows logging for SOC Analysts — Windows/Sysmon/PowerShell](https://www.youtube.com/watch?v=svxqs_yvJIk)
- [TrustedSec Sysmon 6 — Process tracking](https://youtu.be/46-alN2_vlo)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft Learn — Get started with Windows PowerShell](https://learn.microsoft.com/en-us/training/paths/get-started-windows-powershell/)
- [PowerShell security features / AMSI / application control](https://learn.microsoft.com/en-us/powershell/scripting/security/security-features)
- [Microsoft Learn — Windows PowerShell remoting](https://learn.microsoft.com/en-us/training/paths/administer-remote-computers-use-windows-powershell/)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Write `Get-SOCLabInventory.ps1` that reads hostname, OS version, active firewall profiles and 10 processes.
2. Avoid accepting untrusted input as code, and do not use `Invoke-Expression` in this project.
3. Export inventory as timestamped CSV under `C:\SOC-Lab\exports`.
4. Enable script-block logging in the VM only by following Microsoft policy documentation, then generate a benign command in PowerShell.
5. Inspect `Microsoft-Windows-PowerShell/Operational` for 4104 where enabled and compare with Security/Sysmon traces.
6. Write a short note explaining why an encoded command or unusual parent process may be worth triage but is not proof by itself.

### What successful completion looks like

- `Get-SOCLabInventory.ps1` source with comments
- Sanitized inventory CSV and demonstration screenshot
- PowerShell logging evidence map

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

1. What is AMSI?
2. Why is execution policy not a robust security boundary?
3. How do script-block logs differ from 4688 process logs?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 09 — PowerShell Security, Safe Automation and Script Logging
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
