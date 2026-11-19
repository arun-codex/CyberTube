# Module 03 — Windows Identity, UAC, and NTFS Permissions

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Beginner | **Suggested effort:** 7–9 hours | **Prerequisite:** Module 02

[← Master course](README.md) | [Previous module](02-windows-cmd-and-powershell-essentials.md) | [Next module](04-processes-services-registry-startup-and-persistence.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Explain local accounts, groups, SIDs, logon sessions and tokens.
2. Read NTFS permissions and understand access inheritance.
3. Practice least privilege and UAC safely with an expendable local user.

## Detailed topics checklist

- [ ] Local accounts and local groups, SIDs and group membership
- [ ] Authentication vs authorization; access tokens and privileges
- [ ] User Account Control and elevation prompts
- [ ] NTFS permissions, ownership, inheritance vs sharing permissions
- [ ] Windows Hello and credential-protection overview

## Free YouTube video lesson(s) — watch in this order

- [CyberPatriot — Windows Security Configuration](https://www.youtube.com/watch?v=Vvv4LaCAJWQ)
- [CyberPatriot — Windows Security Tools](https://www.youtube.com/watch?v=C_RTcErv3gU)
- [PowerShell Full Course — Beginner to scripting (5 hours)](https://www.youtube.com/watch?v=ueKFupiT2wA)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft Windows security documentation](https://learn.microsoft.com/windows/security)
- [Microsoft Learn — Secure Windows Server Infrastructure](https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Take snapshot `M03-before-identities`.
2. Create a lab-only standard user via Windows Settings/Computer Management; do not modify your daily-use account.
3. Use `whoami /user`, `whoami /groups` in the standard session and compare to an approved admin session.
4. Create `C:\SOC-Lab\PermissionsTest`; inspect its ACL using `icacls` and `Get-Acl`.
5. Grant only the test user access to a test subfolder via the GUI; document effective permissions.
6. Compare behavior with a standard user; then restore permissions from the snapshot or manually clean up.

### What successful completion looks like

- Account and group table with anonymized SIDs
- Before/after ACL screenshots or text
- Least-privilege checklist and explanation of UAC

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

1. Is membership in Administrators equivalent to every process being elevated?
2. How do NTFS permission inheritance and share permissions differ?
3. What is an SID?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 03 — Windows Identity, UAC, and NTFS Permissions
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
