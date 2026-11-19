# Module 15 — Windows Event Forwarding and SOC Detection Engineering

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Advanced | **Suggested effort:** 10–12 hours | **Prerequisite:** Module 14

[← Master course](README.md) | [Previous module](14-windows-forensics-event-logs-registry-prefetch-and-ntfs.md) | [Next module](16-windows-incident-response-threat-scenarios-and-triage.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Understand how Windows Event Forwarding (WEF/WEC) centralizes Windows logs.
2. Design simple Windows event rules with false-positive checks.
3. Write readable analytic logic without requiring a paid cloud SIEM.

## Detailed topics checklist

- [ ] WEF sources, collectors, ForwardedEvents and subscriptions
- [ ] Source-initiated vs collector-initiated event subscriptions
- [ ] Audit policy and event availability vs ingestion gaps
- [ ] Rule logic: threshold/window/account/host context
- [ ] Sigma rule structure and safe rule testing
- [ ] Log retention, time synchronization, noise and privacy

## Free YouTube video lesson(s) — watch in this order

- [Windows Event Forwarding and Windows log collection](https://www.youtube.com/watch?v=kkzAILQc9LE)
- [Windows logging for SOC Analysts — Windows/Sysmon/PowerShell](https://www.youtube.com/watch?v=svxqs_yvJIk)
- [TrustedSec Sysmon 14 — Prioritizing coverage](https://youtu.be/5AQ19x08wHI)
- [TrustedSec Sysmon 19 — DNS queries](https://youtu.be/uwyiGFjPYa8)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft — Windows Event Forwarding for intrusion detection](https://learn.microsoft.com/windows/security/operating-system-security/device-management/use-windows-event-forwarding-to-assist-in-intrusion-detection)
- [Advanced Windows audit policy and event IDs](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration)
- [Sigma detection rules (open source)](https://github.com/SigmaHQ/sigma)
- [TrustedSec — all 22 Learning Sysmon videos](https://trustedsec.com/research/learning-sysmon-video-series)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM plus an optional isolated Windows Server VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Review `wecutil` and the WEF architecture documentation before enabling services.
2. If you have a Server+client lab, configure a small trusted subscription for a low-volume security event set; do not forward production logs.
3. If a second VM is unavailable, draw a WEF topology and use exported local EVTX as the data source.
4. Create detection idea A: repeated Event 4625 on one host within 10 minutes, excluding lab test noise.
5. Create detection idea B: Event 4720 or a local-account creation event in an unexpected maintenance window.
6. For each, write evidence fields, expected false positives, a triage step and a tuning approach.

### What successful completion looks like

- WEF architecture diagram and test or simulated subscription notes
- Two detection rule specifications with thresholds and known blind spots
- One sample analyst ticket with severity and escalation criteria

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

1. Is WEF an antivirus or event transport mechanism?
2. Why is an Event ID alone often insufficient for an alert?
3. How would you identify a log collection outage?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 15 — Windows Event Forwarding and SOC Detection Engineering
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
