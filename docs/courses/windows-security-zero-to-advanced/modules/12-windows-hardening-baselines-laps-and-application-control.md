# Module 12 — Windows Hardening, Baselines, LAPS and Application Control

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Advanced | **Suggested effort:** 9–11 hours | **Prerequisite:** Module 11

[← Master course](README.md) | [Previous module](11-active-directory-kerberos-and-group-policy-security.md) | [Next module](13-sysinternals-process-explorer-autoruns-and-threat-hunting.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Conduct before/after configuration reviews against Microsoft baselines.
2. Explain AppLocker vs App Control for Business and audit modes.
3. Prioritize hardening changes with reversibility and business impact.

## Detailed topics checklist

- [ ] Windows Security Baselines and security configuration templates
- [ ] Microsoft Security Compliance Toolkit, Policy Analyzer, LGPO
- [ ] Windows LAPS concept and privileged local accounts
- [ ] AppLocker/App Control for Business and audit vs enforcement
- [ ] Credential Guard, VBS, Secure Boot, TPM and edition constraints
- [ ] Windows Update/patch operations and exception management

## Free YouTube video lesson(s) — watch in this order

- [CyberPatriot — Windows Security Configuration](https://www.youtube.com/watch?v=Vvv4LaCAJWQ)
- [CyberPatriot — Windows Security Tools](https://www.youtube.com/watch?v=C_RTcErv3gU)
- [Windows Server 2025 — Group Policy fundamentals](https://www.youtube.com/watch?v=4m3RnIfkZQ4)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft — Windows security baselines](https://learn.microsoft.com/windows/security/threat-protection/windows-security-configuration-framework/windows-security-baselines)
- [Microsoft Security Compliance Toolkit](https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/security-compliance-toolkit-10)
- [Microsoft — AppLocker and App Control overview](https://learn.microsoft.com/en-us/windows/security/application-security/application-control/app-control-for-business/appcontrol-and-applocker-overview)
- [Microsoft Learn — Secure Windows Server Infrastructure](https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM plus an optional isolated Windows Server VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. Take snapshot `M12-before-hardening` and export a read-only security baseline inventory.
2. Compare local configuration with selected Microsoft security baseline recommendations; note unsupported VM or edition features.
3. Inspect `secpol.msc` (where available), local audit policy, password policy and Defender state.
4. Review AppLocker/App Control requirements in Microsoft documentation before attempting any policy; begin with **audit mode** if supported.
5. Choose 3 reversible improvements for the lab and document exact rollback steps before implementation.
6. After changes, retest access, firewall and logging; restore the snapshot if something breaks.

### What successful completion looks like

- Before/after hardening checklist and risk-based priority list
- Edition/licensing capability matrix
- Rollback plan and validation evidence

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

1. Why test a security baseline rather than apply it blindly?
2. What is the value of AppLocker audit-only mode?
3. What role does LAPS play in limiting local admin password reuse?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 12 — Windows Hardening, Baselines, LAPS and Application Control
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
