# Windows SOC Analyst Quick Reference (for lab and interviews)

## Common Windows Security Event IDs

| Event ID | Meaning | First check |
|---|---|---|
| 4624 | Successful logon | Logon type, target account, originating system, time |
| 4625 | Failed logon | Account, reason/substatus, source, volume and window |
| 4634 | Logoff | Session and account relationship |
| 4672 | Special privileges assigned at logon | Legitimate admin/service? |
| 4688 | New process (when enabled) | Command line (when enabled), parent process |
| 4720 | User account created | Who created it and which machine/DC logged it |
| 4728 / 4732 | Account added to security group | Group, actor, affected user |
| 4768 / 4769 | Kerberos tickets | DC coverage and service account expectations |
| 1102 | Security audit log cleared | Administrative change? Supporting evidence? |

**Reminder:** Events are version-, source- and audit-policy-dependent; some IDs appear on DCs rather than endpoints. [Microsoft official reference](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor).

## Sysmon

| Sysmon Event | Common use | Caveat |
|---|---|---|
| 1 | Process creation | Requires active Sysmon |
| 3 | Network connection | Often disabled or filtered by config |
| 7 | Image load | Frequently high volume |
| 11 | File created | Config filtering is important |
| 12–14 | Registry operations | Depends on config and OS |
| 22 | DNS query | Check config and process attribution |

**Sysmon logs only:** it does not itself prevent attacks or create SIEM alerts. [Microsoft Sysmon guide](https://learn.microsoft.com/windows/security/operating-system-security/sysmon/how-to-enable-sysmon).

## Useful read-only Windows commands

```powershell
winver
whoami /all
Get-ComputerInfo | Select-Object OsName,OsVersion,WindowsVersion
Get-LocalUser
Get-LocalGroup
Get-Process | Select-Object -First 10 Name,Id,Path
Get-Service | Where-Object Status -eq Running
Get-ScheduledTask | Select-Object -First 20 TaskName,TaskPath,State
Get-NetConnectionProfile
Get-NetFirewallProfile
Get-NetTCPConnection | Select-Object -First 20
Get-MpComputerStatus | Select-Object AntivirusEnabled,RealTimeProtectionEnabled
auditpol /get /category:*
Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625;StartTime=(Get-Date).AddDays(-1)} -ErrorAction SilentlyContinue
Get-FileHash 'C:\SOC-Lab\notes\sample.txt'
```

Use elevated privileges only where needed. Local users commands can differ on domain controllers. `Get-WinEvent` requires appropriate access to security events and can return no matches.

## Six-step defensive triage process

1. **Validate** the alert: what rule/data source produced it?
2. **Scope** host, user, time window, IP and process, while controlling for normal activity.
3. **Collect** relevant Windows EVTX and Sysmon records without disrupting data.
4. **Correlate** with the timeline and independent sources; identify gaps.
5. **Assess** impact, possible benign explanations and whether escalation is warranted.
6. **Document** facts, hypotheses, supporting evidence and recommended next steps.

## Example Windows SOC ticket (fictional, lab-only)

- **Alert:** Repeated failures for a lab test account over 10 minutes.
- **Source:** Windows Security event 4625, generated on authorized virtual machine.
- **Validate:** Count failures; compare status/substatus, timestamp, logon type and source.
- **Cross-check:** Was there a subsequent 4624, and was the legitimate test performed?
- **Conclusion:** Benign lab login failures if scenario and evidence align. In a real enterprise, escalate according to policy if anomaly and impact warrant it.

## Official references

- [Windows Security](https://learn.microsoft.com/windows/security)
- [Advanced Audit Policy](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration)
- [PowerShell](https://learn.microsoft.com/en-us/training/paths/get-started-windows-powershell/)
- [TrustedSec Sysmon](https://trustedsec.com/research/learning-sysmon-video-series)
- [13Cubed Windows forensic cheat sheets](https://training.13cubed.com/downloads)
