# Module 10 — Windows Server 2025 and Active Directory Lab Fundamentals

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Intermediate | **Suggested effort:** 10–12 hours | **Prerequisite:** Module 09

[← Master course](README.md) | [Previous module](09-powershell-security-safe-automation-and-script-logging.md) | [Next module](11-active-directory-kerberos-and-group-policy-security.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Explain the domain controller, AD DS, OU, group and DNS relationship.
2. Create a private lab domain using legitimate Windows Server evaluation software.
3. Join a Windows client to a training domain when edition supports it.

## Detailed topics checklist

- [ ] Windows Server evaluation, roles and services
- [ ] Active Directory Domain Services and domain controller responsibilities
- [ ] Forests, domains, OUs, users, computer objects and groups
- [ ] DNS requirements, domain join, domain vs local accounts
- [ ] Windows authentication basics: Kerberos vs NTLM high-level concepts

## Free YouTube video lesson(s) — watch in this order

- [Windows Server 2025 — AD, DNS, domain join walkthrough](https://www.youtube.com/watch?v=Gt12Q1jB1s8)
- [Install Active Directory on Windows Server 2025](https://www.youtube.com/watch?v=TYfswI9phv0)
- [Windows Server 2025 — Group Policy fundamentals](https://www.youtube.com/watch?v=4m3RnIfkZQ4)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft Windows Server 2025 evaluation](https://www.microsoft.com/en-us/evalcenter/download-windows-server-2025)
- [Microsoft Learn — Secure Windows Server Infrastructure](https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/)
- [Advanced Windows audit policy and event IDs](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM plus an optional isolated Windows Server VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Assess hardware capacity: DC plus client can require substantial RAM; a single-VM alternative is reading/video plus screenshots if unavailable.
2. Download Windows Server evaluation from Microsoft and install a new isolated Server VM.
3. Configure a host-only/private virtual switch for DC + client; **no bridged AD lab**.
4. Follow the video to install AD DS and create training domain `lab.example.test` (use only a name you control or reserved for testing).
5. Create a standard test user and one OU; record group membership and default group posture.
6. If your Windows client edition allows domain join, join it to the training domain and verify DNS resolution.
7. Take clean snapshots before moving on to account-security labs.

### What successful completion looks like

- Lab topology with names/IP ranges but no passwords
- Screenshots of AD users, OUs and client domain membership
- One-page glossary of 15 Active Directory terms

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

1. Why is DNS critical for Active Directory domain joining?
2. What are domain controllers responsible for?
3. How do domain groups differ from local groups?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 10 — Windows Server 2025 and Active Directory Lab Fundamentals
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
