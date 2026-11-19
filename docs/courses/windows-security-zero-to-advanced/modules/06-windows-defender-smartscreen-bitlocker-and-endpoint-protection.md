# Module 06 — Windows Defender, SmartScreen, BitLocker and Endpoint Protection

> **Track:** Windows Security for Cybersecurity & SOC | **Level:** Intermediate | **Suggested effort:** 8–10 hours | **Prerequisite:** Module 05

[← Master course](README.md) | [Previous module](05-windows-networking-smb-rdp-and-firewall-security.md) | [Next module](07-windows-event-viewer-audit-policy-and-soc-event-ids.md)

## Why this module matters

This module focuses exclusively on Windows endpoints or Windows Server security. It connects the skills to real SOC tasks: recognizing normal behavior, examining Windows-native evidence, applying least privilege, and documenting accurate findings. Follow videos with *hands-on practice*; watching alone is not enough.

## Learning outcomes

1. Interpret Microsoft Defender protection and detection status.
2. Differentiate endpoint AV and enterprise EDR.
3. Explain Windows encryption and safe recovery-key handling.

## Detailed topics checklist

- [ ] Microsoft Defender Antivirus protection states and scans
- [ ] Protection history, security intelligence, exclusions and safe defaults
- [ ] SmartScreen, reputation-based protection, ASR concept
- [ ] BitLocker vs Device Encryption and TPM
- [ ] Why enterprise Defender for Endpoint features may require licensing

## Free YouTube video lesson(s) — watch in this order

- [Microsoft Defender Antivirus Windows 10/11 setup](https://www.youtube.com/watch?v=HOvRXmkW-J8)
- [Windows 11 BitLocker and recovery-key precautions](https://www.youtube.com/watch?v=3ODr_uFHD6M)
- [CyberPatriot — Windows Security Tools](https://www.youtube.com/watch?v=C_RTcErv3gU)

**Video use instructions:** Pause after each command demonstration; reproduce only harmless steps in your authorized VM. Video interfaces and Windows versions may differ. Verify security-setting changes against current Microsoft docs. Free-to-watch availability can change by region and creator; the linked videos were found on public YouTube search results at compilation time.

## Free reading and downloadable tools

- [Microsoft Defender PowerShell cmdlets](https://learn.microsoft.com/en-us/powershell/module/defender/)
- [Get-MpComputerStatus reference](https://learn.microsoft.com/en-us/powershell/module/defender/get-mpcomputerstatus)
- [Microsoft Windows security documentation](https://learn.microsoft.com/windows/security)

## Hands-on lab — detailed procedure

**Required environment:** Authorized Windows 11 lab VM. Run elevated commands only when the exercise explicitly needs it; preserve snapshots and keep Defender enabled.

1. In Windows Security, review Virus & threat protection and Firewall & network protection.
2. Run `Get-MpComputerStatus | Select AntivirusEnabled,RealTimeProtectionEnabled,AntivirusSignatureLastUpdated` on an authorized lab VM.
3. Trigger a normal Quick Scan in the GUI; record its result without using malware.
4. Inspect existing `Get-MpThreatDetection` output; zero results is a valid result.
5. Review encryption capability and read the BitLocker recovery key safety guidance; never include keys or identifiers in portfolio screenshots.
6. Explain 5 defenses: Defender AV, SmartScreen, UAC, Firewall, and encryption.

### What successful completion looks like

- Endpoint-protection baseline report
- Quick-scan screenshot and detection-history interpretation
- Encryption readiness checklist without recovery keys

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

1. Are Microsoft Defender Antivirus and Defender for Endpoint identical?
2. Why is disabling real-time protection a bad lab habit?
3. What is the risk of losing the BitLocker recovery key?

**Mastery checkpoint:** You should be able to explain the underlying Windows behavior, demonstrate the procedure without blindly copying, identify the log/source of evidence, and name at least two possible false positives or limitations. If not, repeat the lab.

## Notes template (copy below)

```text
Module: 06 — Windows Defender, SmartScreen, BitLocker and Endpoint Protection
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
