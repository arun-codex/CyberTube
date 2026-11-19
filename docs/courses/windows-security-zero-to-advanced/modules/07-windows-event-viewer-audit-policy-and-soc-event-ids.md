# Module 07 — Windows Event Viewer, Audit Policy and SOC Event IDs

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Intermediate | **Suggested effort:** 10–12 hours | **Prerequisite:** Module 06

[← Master course](README.md) | [Previous module](06-windows-defender-smartscreen-bitlocker-and-endpoint-protection.md) | [Next module](08-sysmon-installation-configuration-and-security-telemetry.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Navigate Security, System, Application and operational event channels.
2. Interpret common authentication, account and process-creation events.
3. Enable appropriate auditing inside a lab and export relevant EVTX evidence.

## Detailed topics checklist

- [ ] EVTX channels, Event Viewer filters, XML event fields
- [ ] 4624 successful logon, 4625 failed logon, 4634 logoff, 4672 special privileges
- [ ] 4688 process creation when auditing is configured
- [ ] 4720 account created, 4728/4732 membership changes where applicable
- [ ] 1102 log clear and investigation significance; coverage limitations
- [ ] Logon types, subject/target usernames, source address and false positives

## Free YouTube video lesson(s) — watch in this order

- [Windows logging for SOC Analysts — Windows/Sysmon/PowerShell](https://www.youtube.com/watch?v=svxqs_yvJIk)
- [Windows Event Logs explained — SOC analyst walkthrough](https://www.youtube.com/watch?v=gRbG-8mQce0)
- [CyberPatriot — Windows Security Configuration](https://www.youtube.com/watch?v=Vvv4LaCAJWQ)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Advanced Windows audit policy and event IDs](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration)
- [Microsoft — Events to Monitor](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Open Event Viewer (`eventvwr.msc`) and browse Windows Logs > Security (admin rights may be needed).
2. Run `auditpol /get /category:*` and record currently enabled auditing subcategories.
3. Attempt one intentionally incorrect password against your *own lab local user* and look for Event 4625 on the authenticating machine.
4. Create a successful test logon to compare 4624 and 4625 records; account for logon type and the correct host.
5. Query `Get-WinEvent -FilterHashtable @{LogName="Security"; Id=4625; StartTime=(Get-Date).AddHours(-4)} -ErrorAction SilentlyContinue`.
6. Export a small event selection (EVTX or CSV) and record Event ID, time, machine, account and why it matters.

### What successful completion looks like

- `event-id-reference.md` for at least 12 IDs with caveats
- 1 failed-login mini-case timeline
- Sanitized EVTX/CSV export and screenshots

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

1. Does missing Event 4688 prove no process ran?
2. What is the significance of logon type for Event 4624?
3. Where does local vs domain authentication get logged?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

### Windows security event quick reference

| Event | Normal interpretation | Practical caveat |
|---|---|---|
| 4624 | Successful logon | Check logon type and target host |
| 4625 | Failed logon | One failure is not automatically an attack |
| 4634 | Logoff | Some sessions end without matching event |
| 4672 | Special privileges assigned | Common for legitimate admin/service logons |
| 4688 | Process creation | Requires appropriate audit policy |
| 4720 | User account created | Domain/local placement depends on source |
| 4728 / 4732 | Member added to security-enabled group | Depends on group scope and DC/local source |
| 4768 / 4769 | Kerberos ticket activity | Typically collected on DCs, needs auditing |
| 1102 | Security log cleared | Investigate context and evidence of maintenance |

Never assume an event is present until audit policy, Windows version, and source location are verified.

## Notes template (copy below)

```text
Module: 07 — Windows Event Viewer, Audit Policy and SOC Event IDs
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
