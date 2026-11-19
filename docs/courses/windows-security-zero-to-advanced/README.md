# Windows Security for Cybersecurity — Zero to Advanced

**100% Windows-focused, YouTube-first, free-resource course** | **18 modules (00–17)** | **Suggested duration:** 18 weeks at 6–10 hours/week (roughly 130–175 hours including labs) | **Audience:** complete beginners through advanced Windows defenders, aspiring SOC L1/L2 analysts, incident responders, and ethical security testers.

**Last assembled:** 19 November 2026. This is a custom curated study syllabus, **not an officially accredited course**. Videos are publicly linked; third-party creators control availability. Most software/resources are free to download; Windows activation and advanced enterprise products can require licenses. Microsoft Server evaluation is time-limited, and some VM or domain capabilities need Windows Pro/Enterprise/Server.

## Start here

1. Read `00-...md` to create a legally licensed Windows 11 VM and isolated home lab.
2. Watch the **specific YouTube lesson links inside each module** before attempting the lab.
3. Complete the linked free Microsoft Learn references, then follow the numbered lab.
4. Save redacted screenshots, text/CSV exports, and a 1-page summary for every module.
5. Take snapshots and restore after controlled changes; do not disable antivirus for convenience.
6. Only after modules 00–16, complete the capstone and publish a **sanitized** portfolio report.

> **Important scope and ethics:** Defensive investigation, configuration, and detection are the primary goal. Attack concepts are taught only to recognize Windows risk and validate defenses. Do not attempt credential theft, persistence on third-party endpoints, lateral movement, or malware execution outside a formally authorized isolated lab. The labs deliberately use benign activity and read-only collection wherever possible.

## Exact module-by-module roadmap

| Module | Course unit | Level | Hours | Completion |
|---|---|---|---:|---|
| [00](00-home-lab-setup-ethics-and-learning-workflow.md) | Home Lab Setup, Ethics, and Learning Workflow | Foundation | 5–7 | ☐ |
| [01](01-windows-architecture-and-security-foundations.md) | Windows Architecture and Security Foundations | Beginner | 6–8 | ☐ |
| [02](02-windows-cmd-and-powershell-essentials.md) | Windows CMD and PowerShell Essentials | Beginner | 8–10 | ☐ |
| [03](03-windows-identity-uac-and-ntfs-permissions.md) | Windows Identity, UAC, and NTFS Permissions | Beginner | 7–9 | ☐ |
| [04](04-processes-services-registry-startup-and-persistence.md) | Processes, Services, Registry, Startup and Persistence | Intermediate | 7–9 | ☐ |
| [05](05-windows-networking-smb-rdp-and-firewall-security.md) | Windows Networking, SMB, RDP and Firewall Security | Intermediate | 8–10 | ☐ |
| [06](06-windows-defender-smartscreen-bitlocker-and-endpoint-protection.md) | Windows Defender, SmartScreen, BitLocker and Endpoint Protection | Intermediate | 8–10 | ☐ |
| [07](07-windows-event-viewer-audit-policy-and-soc-event-ids.md) | Windows Event Viewer, Audit Policy and SOC Event IDs | Intermediate | 10–12 | ☐ |
| [08](08-sysmon-installation-configuration-and-security-telemetry.md) | Sysmon Installation, Configuration and Security Telemetry | Intermediate | 10–12 | ☐ |
| [09](09-powershell-security-safe-automation-and-script-logging.md) | PowerShell Security, Safe Automation and Script Logging | Intermediate | 9–11 | ☐ |
| [10](10-windows-server-2025-and-active-directory-lab-fundamentals.md) | Windows Server 2025 and Active Directory Lab Fundamentals | Intermediate | 10–12 | ☐ |
| [11](11-active-directory-kerberos-and-group-policy-security.md) | Active Directory, Kerberos and Group Policy Security | Advanced | 9–11 | ☐ |
| [12](12-windows-hardening-baselines-laps-and-application-control.md) | Windows Hardening, Baselines, LAPS and Application Control | Advanced | 9–11 | ☐ |
| [13](13-sysinternals-process-explorer-autoruns-and-threat-hunting.md) | Sysinternals Process Explorer, Autoruns and Threat Hunting | Advanced | 9–11 | ☐ |
| [14](14-windows-forensics-event-logs-registry-prefetch-and-ntfs.md) | Windows Forensics: Event Logs, Registry, Prefetch and NTFS | Advanced | 10–12 | ☐ |
| [15](15-windows-event-forwarding-and-soc-detection-engineering.md) | Windows Event Forwarding and SOC Detection Engineering | Advanced | 10–12 | ☐ |
| [16](16-windows-incident-response-threat-scenarios-and-triage.md) | Windows Incident Response, Threat Scenarios and Triage | Advanced | 10–12 | ☐ |
| [17](17-final-capstone-windows-soc-analyst-portfolio-and-job-readiness.md) | Final Capstone: Windows SOC Analyst Portfolio and Job Readiness | Capstone | 12–16 | ☐ |

## Recommended 18-week study calendar

| Week | Module | Suggested output |
|---|---|---|
| 1 | 00 — Home Lab Setup, Ethics, and Learning Workflow | `lab-inventory.md` with edition/build/hardware/network modes |
| 2 | 01 — Windows Architecture and Security Foundations | Annotated map of at least 8 Windows consoles |
| 3 | 02 — Windows CMD and PowerShell Essentials | `windows-command-cheatsheet.md` with 20 commands and explanations |
| 4 | 03 — Windows Identity, UAC, and NTFS Permissions | Account and group table with anonymized SIDs |
| 5 | 04 — Processes, Services, Registry, Startup and Persistence | Process/service/task inventory |
| 6 | 05 — Windows Networking, SMB, RDP and Firewall Security | Annotated firewall rule screenshot |
| 7 | 06 — Windows Defender, SmartScreen, BitLocker and Endpoint Protection | Endpoint-protection baseline report |
| 8 | 07 — Windows Event Viewer, Audit Policy and SOC Event IDs | `event-id-reference.md` for at least 12 IDs with caveats |
| 9 | 08 — Sysmon Installation, Configuration and Security Telemetry | Sysmon deployment notes and config filename/hash |
| 10 | 09 — PowerShell Security, Safe Automation and Script Logging | `Get-SOCLabInventory.ps1` source with comments |
| 11 | 10 — Windows Server 2025 and Active Directory Lab Fundamentals | Lab topology with names/IP ranges but no passwords |
| 12 | 11 — Active Directory, Kerberos and Group Policy Security | GPO linkage and `gpresult` screenshots |
| 13 | 12 — Windows Hardening, Baselines, LAPS and Application Control | Before/after hardening checklist and risk-based priority list |
| 14 | 13 — Sysinternals Process Explorer, Autoruns and Threat Hunting | Process tree with PID, parent, signer and command line |
| 15 | 14 — Windows Forensics: Event Logs, Registry, Prefetch and NTFS | Forensic timeline CSV with UTC and source column |
| 16 | 15 — Windows Event Forwarding and SOC Detection Engineering | WEF architecture diagram and test or simulated subscription notes |
| 17 | 16 — Windows Incident Response, Threat Scenarios and Triage | Windows incident report and investigation timeline |
| 18 | 17 — Final Capstone: Windows SOC Analyst Portfolio and Job Readiness | `CAPSTONE_REPORT.md` with executive summary, scope, evidence, investigation and recommendations |

## Lab hardware and free software checklist

- **Minimum practical:** A Windows host with virtualization enabled, adequate free disk (ideally 100+ GB), and 16 GB RAM for basic client VM labs; smaller hardware can work with trade-offs.
- **Recommended for AD labs:** 24–32 GB host RAM and space for two simultaneous Windows VMs; if insufficient, do the Server modules as guided study/design and finish all single-client labs.
- **Windows 11:** Legal installer/ISO from [Microsoft](https://www.microsoft.com/software-download/windows11), used under appropriate licensing. VM features such as virtual TPM/UEFI may be required.
- **Windows Server:** [Windows Server 2025 Evaluation](https://www.microsoft.com/en-us/evalcenter/download-windows-server-2025), subject to evaluation duration/activation terms.
- **Hypervisor:** [Oracle VirtualBox](https://www.virtualbox.org/wiki/Downloads) or a supported alternative. VM networking: normal updates via NAT; isolated domain and benign attack-simulation labs via host-only/private switch. No bridged attack simulation.
- **Windows tools:** PowerShell, Event Viewer, Windows Security, Defender, Windows Firewall, Group Policy (edition-dependent), Sysinternals, optional Sysmon.
- **Evidence folder:** `C:\SOC-Lab\evidence`, `C:\SOC-Lab\exports`, `C:\SOC-Lab\notes`. Store raw personal data privately; portfolio screenshots must be redacted.

## Standard daily routine (90–120 minutes)

1. **20 minutes — Recall:** Review prior notes and explain yesterday's event IDs or commands from memory.
2. **30 minutes — YouTube:** Follow video and pause at each Windows console, command, or concept.
3. **45–60 minutes — VM practice:** Perform approved steps yourself; write down errors and surprising results.
4. **15 minutes — Evidence:** Export a screenshot/CSV/EVTX/markdown note and name what it proves or cannot prove.
5. **5 minutes — Self-check:** Answer one question and decide whether to repeat the lab.

## Mandatory skill checks before job applications

- [ ] Navigate Event Viewer and explain **4624, 4625, 4688, 4720, 1102** with prerequisites and caveats.
- [ ] Enumerate Windows processes, services, scheduled tasks, local users, and firewall profiles with PowerShell.
- [ ] Investigate benign failed logons using event timestamp, account, logon type and host.
- [ ] Enable supported Sysmon telemetry without installing conflicting variants; interpret Event 1 and other configured events.
- [ ] Explain Defender AV vs Defender for Endpoint, Windows Firewall, BitLocker, UAC, LAPS and hardening baselines.
- [ ] Explain AD domain controller, DNS, GPO, Kerberos and least-privilege controls.
- [ ] Produce a case timeline and distinguish observations, assumptions and false positives.
- [ ] Finish the final Windows SOC capstone with a sanitization checklist.

## Original sources and attribution

The course links out to freely watchable videos; it does **not** reproduce, redistribute, download or claim ownership of the videos. Course plans, tasks, and writing in these `.md` files are original educational organization and instructions. Video topics are based on YouTube pages and teacher descriptions; always confirm the current availability and correct Windows OS applicability.

The standout **22-video Sysmon sequence** is by TrustedSec/Carlos Perez: [Learning Sysmon Video Series](https://trustedsec.com/research/learning-sysmon-video-series). [13Cubed](https://www.youtube.com/@13Cubed) provides free Windows forensic lessons; their separate commercial training is not required. [Microsoft Learn Windows Security](https://learn.microsoft.com/windows/security) is the primary reference for configuration accuracy.

## Files included

- `README.md` — master roadmap, index and learning routine.
- `00-...md` to `17-...md` — 18 individual step-by-step modules, each with real YouTube video URLs, free references, objectives, topic checklists, labs, deliverables, knowledge checks, and notes template.
- `FREE-VIDEO-LIBRARY.md` — all curated YouTube lesson links with brief topic categories.
- `WINDOWS-SOC-CHEATSHEET.md` — common Windows event IDs, commands, triage workflow and sources.
- `PROGRESS-TRACKER.md` — print/copy-friendly module tracking table.

## Important learning integrity

Windows telemetry is configurable and version-specific. Missing logs may mean auditing was not enabled, a provider is unavailable, a log was overwritten, or the wrong computer was queried; **absence does not prove absence of activity**. Security baseline changes, Sysmon deployments, and domain policies must be tested on snapshots first. Some enterprise controls and cloud SIEM features are **not free**, so this course avoids requiring them.
