# Module 11 — Active Directory, Kerberos and Group Policy Security

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Advanced | **Suggested effort:** 9–11 hours | **Prerequisite:** Module 10

[← Master course](README.md) | [Previous module](10-windows-server-2025-and-active-directory-lab-fundamentals.md) | [Next module](12-windows-hardening-baselines-laps-and-application-control.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Understand common AD misconfigurations from a defender standpoint.
2. Review Group Policy security settings and Windows authentication events.
3. Configure least-privilege policies on non-production lab OUs.

## Detailed topics checklist

- [ ] Kerberos TGT/TGS concepts, NTLM fallback and lockout policy
- [ ] GPO precedence: local/site/domain/OU and inheritance
- [ ] Password/lockout policy, privileged groups, delegation
- [ ] 4768/4769/4771 ticket activity (on DCs when auditing configured)
- [ ] LAPS, secure administration, domain-controller hygiene
- [ ] Defensive overview of credential theft and lateral movement; no exploit steps

## Free YouTube video lesson(s) — watch in this order

- [Windows Server 2025 — Group Policy fundamentals](https://www.youtube.com/watch?v=4m3RnIfkZQ4)
- [Create a GPO in Active Directory — hands-on](https://www.youtube.com/watch?v=nNerx5ZcU58)
- [Windows logging for SOC Analysts — Windows/Sysmon/PowerShell](https://www.youtube.com/watch?v=svxqs_yvJIk)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft Learn — Secure Windows Server Infrastructure](https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/)
- [Advanced Windows audit policy and event IDs](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration)
- [Microsoft — Events to Monitor](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM plus an optional isolated Windows Server VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Create `OU=SOC-Lab-Clients` and a test GPO that configures a harmless security setting (e.g., screen-lock timeout) on lab machines.
2. Link the GPO only to the training OU and run `gpresult /r` on a test client.
3. Review domain password/lockout settings without intentionally locking out an admin account.
4. Compare membership of a standard test user and a dedicated privileged test group.
5. Enable an appropriate Kerberos audit subcategory only in the lab and note which DC receives relevant events.
6. Document an AD attack-path **risk assessment** (excessive rights, stale accounts, insecure remote access) and 5 mitigations.

### What successful completion looks like

- GPO linkage and `gpresult` screenshots
- AD access review and recommended least-privilege changes
- Kerberos event-reference table with audit-policy prerequisites

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

1. Where are domain Kerberos events usually investigated?
2. Why should you avoid day-to-day use of Domain Admins?
3. How does OU-scoped GPO targeting limit changes?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 11 — Active Directory, Kerberos and Group Policy Security
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
