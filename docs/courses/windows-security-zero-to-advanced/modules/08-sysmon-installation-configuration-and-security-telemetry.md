# Module 08 — Sysmon Installation, Configuration and Security Telemetry

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Intermediate | **Suggested effort:** 10–12 hours | **Prerequisite:** Module 07

[← Master course](README.md) | [Previous module](07-windows-event-viewer-audit-policy-and-soc-event-ids.md) | [Next module](09-powershell-security-safe-automation-and-script-logging.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Explain native Windows auditing vs Sysmon telemetry.
2. Install/configure Sysmon using an approach supported by your OS version.
3. Analyze Sysmon process and network events from safe activities.

## Detailed topics checklist

- [ ] Sysmon 1 process creation, 3 network connections (configuration-dependent)
- [ ] DNS, registry and file operation telemetry
- [ ] Sysmon XML configurations, exclusions and event noise
- [ ] Operational channel: Microsoft-Windows-Sysmon/Operational
- [ ] Built-in Sysmon on supported modern Windows vs standalone Sysinternals Sysmon; do NOT install both

## Free YouTube video lesson(s) — watch in this order

- [TrustedSec Sysmon 1 — What is Sysmon?](https://youtu.be/kESndPO5Fig)
- [TrustedSec Sysmon 2 — Installation](https://youtu.be/MlGc44dfFBg)
- [TrustedSec Sysmon 4 — Configuration file](https://youtu.be/VKVSedPGDgY)
- [TrustedSec Sysmon 5 — Rule/filter order](https://youtu.be/KBsEAaZFcyI)
- [TrustedSec Sysmon 6 — Process tracking](https://youtu.be/46-alN2_vlo)
- [TrustedSec Sysmon 8 — Network connections](https://youtu.be/y4cpuliY4dk)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft — How to enable and configure Sysmon](https://learn.microsoft.com/windows/security/operating-system-security/sysmon/how-to-enable-sysmon)
- [SwiftOnSecurity Sysmon config example](https://github.com/SwiftOnSecurity/sysmon-config)
- [TrustedSec — all 22 Learning Sysmon videos](https://trustedsec.com/research/learning-sysmon-video-series)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Take a VM snapshot; review Microsoft documentation for your exact build and choose **one** Sysmon installation method only.
2. Review whether a Sysmon service already exists with `Get-Service sysmon* -ErrorAction SilentlyContinue`.
3. Install/enable a supported Sysmon configuration in the VM using documented steps; never run unknown configs without reading them.
4. Open `Applications and Services Logs > Microsoft > Windows > Sysmon > Operational`.
5. Launch Notepad and PowerShell intentionally; locate process creation events and compare command lines, parent image and process GUID.
6. Perform a harmless browser request to a trusted site; check if your chosen config records event 3 or DNS events; absence may be expected.
7. Describe noise reduction and list what your config excludes.

### What successful completion looks like

- Sysmon deployment notes and config filename/hash
- 3 sanitized Sysmon process-event records
- A 1-page comparison: native event IDs 4688 vs Sysmon 1

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

1. Does Sysmon itself block malicious actions?
2. Why might a configured Sysmon installation have no Event 3?
3. What fields help link a child process to its parent?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

### Sysmon deployment caution

Microsoft now documents a built-in Sysmon option on supported Windows 11 builds. **Do not install both built-in and standalone Sysmon.** First check your OS support and `Get-Service sysmon*`. Read [Microsoft's current setup instructions](https://learn.microsoft.com/windows/security/operating-system-security/sysmon/how-to-enable-sysmon) and follow only the installation path appropriate to the lab. Sysmon records events; it is **not** a blocking or alerting engine.

## Notes template (copy below)

```text
Module: 08 — Sysmon Installation, Configuration and Security Telemetry
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
