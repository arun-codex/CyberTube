# Module 05 — Windows Networking, SMB, RDP and Firewall Security

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Intermediate | **Suggested effort:** 8–10 hours | **Prerequisite:** Module 04

[← Master course](README.md) | [Previous module](04-processes-services-registry-startup-and-persistence.md) | [Next module](06-windows-defender-smartscreen-bitlocker-and-endpoint-protection.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Understand Windows-specific network connections and profiles.
2. Read local TCP connections, name resolution and firewall rules.
3. Explain SMB and RDP hardening without attacking any public system.

## Detailed topics checklist

- [ ] Windows network profiles, DNS client, IP config, routes
- [ ] `ipconfig`, `Get-NetIPAddress`, `Get-NetTCPConnection`, `Test-NetConnection`
- [ ] Firewall: inbound vs outbound; Domain/Private/Public profiles
- [ ] RDP, Windows Remote Management (WinRM) and SMB threat surfaces
- [ ] Defensive approaches: restrict inbound exposure, least privilege, MFA where supported

## Free YouTube video lesson(s) — watch in this order

- [Windows Defender Firewall inbound/outbound rules tutorial](https://www.youtube.com/watch?v=5NwbGcqKTQI)
- [CyberPatriot — Windows Security Tools](https://www.youtube.com/watch?v=C_RTcErv3gU)
- [TrustedSec Sysmon 8 — Network connections](https://youtu.be/y4cpuliY4dk)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft — Windows Firewall with Advanced Security rules](https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-firewall/configure)
- [Microsoft Windows security documentation](https://learn.microsoft.com/windows/security)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Record `Get-NetConnectionProfile` and `Get-NetFirewallProfile` output.
2. Open `wf.msc`; inspect default inbound/outbound rules, making no changes initially.
3. Use `Get-NetTCPConnection | Select -First 20` and correlate local PIDs with `Get-Process`.
4. Within your VM, create a narrowly scoped temporary outbound blocking rule for a harmless test app, then verify expected blocking.
5. Remove the lab rule and confirm normal traffic; never disable Windows Firewall globally.
6. Write a risk note: when would you expose RDP or SMB, and what controls should protect them?

### What successful completion looks like

- Annotated firewall rule screenshot
- TCP connection inventory and process correlation
- One-page Windows SMB/RDP security checklist

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

1. What is the difference between inbound and outbound filtering?
2. Does a LISTENING port automatically mean compromise?
3. Why is a Public profile usually more restrictive?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 05 — Windows Networking, SMB, RDP and Firewall Security
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
