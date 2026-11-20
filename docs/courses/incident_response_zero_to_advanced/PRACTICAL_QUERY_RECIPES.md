# Practical Incident Response Query and Investigation Recipes

> **Scope:** Examples use synthetic training data or your own authorized analysis machines. These are educational starting points, not production-ready detections. Validate field names, data quality and correct permissions before use. No sample requires creating malware or changing live infrastructure.

## 1. SOC triage checklist

1. Capture alert rule name, timestamp (UTC), source, event ID, triggering fields and rule logic.
2. Confirm exact affected host, user, asset owner and data sensitivity.
3. Check duplicates, known maintenance, VPN/proxy/geolocation and logging gaps.
4. Pivot to relevant endpoint, identity, network and email logs.
5. Record observations, inferences, alternative explanations, confidence and open questions.
6. Close as documented benign/false positive only with sufficient evidence; otherwise investigate or escalate to authorized owner.

## 2. Linux triage on your own lab machine

```bash
# Read-only observation only. Output and logs vary by distro/configuration.
id
hostnamectl
journalctl --utc --since '2026-11-19 00:00:00' --until '2026-11-20 00:00:00' --no-pager | head -n 100
last -F | head -n 20
ss -tunap
systemctl list-timers --all
sha256sum ./synthetic_signins.csv
```

**Questions:** Is the timezone correct? Were logs rotated? Is your user allowed to view the full journal? Does a current session show hostile activity or just administration?

## 3. Windows Event Viewer and PowerShell read-only query (own training VM)

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625; StartTime=(Get-Date).AddDays(-1)} -ErrorAction SilentlyContinue |
  Select-Object -First 20 TimeCreated, Id, ProviderName, Message
```

`4625` means failed logon event when security auditing is enabled; log details and availability depend on system policy. Preserve originals before export, and record local timezone.

## 4. Splunk SPL illustrative query (adjust fields and index)

```spl
index=training sourcetype=synthetic_signins result=Failure
| stats count AS failures min(_time) AS first max(_time) AS last BY user source_ip
| where failures >= 3
| sort - failures
```

**Validation:** Not production-ready without mapping `time_utc` to `_time` and configuring index/sourcetype. Correlate failures with success and legitimate VPN activity. Do not equate three failures with compromise.

## 5. Microsoft Sentinel/KQL with synthetic in-memory sample

```kusto
let Signins = datatable(TimeGenerated:datetime, User:string, SourceIp:string, Result:string)
[
 datetime(2026-11-19T08:02:00Z), "finance.user", "198.51.100.23", "Failure",
 datetime(2026-11-19T08:04:00Z), "finance.user", "198.51.100.23", "Failure",
 datetime(2026-11-19T08:06:00Z), "finance.user", "198.51.100.23", "Failure",
 datetime(2026-11-19T08:07:00Z), "finance.user", "203.0.113.77", "Success"
];
Signins
| summarize Fails=countif(Result == "Failure"), Successes=countif(Result == "Success") by User, SourceIp
| order by Fails desc
```

This datatable works as a conceptual KQL exercise without connecting to real tenant logs. For actual Entra sign-in logs, map their real schema and permissions. Never assume sign-in geography alone proves compromise.

## 6. Wireshark display filters for a training PCAP

```text
dns
ip.addr == 203.0.113.145
tcp.port == 443
http.request
```

Review timestamps, stream identifiers and TCP/TLS metadata; encrypted payload contents typically cannot be inspected directly. Only load safely sourced training PCAPs in an isolated environment.

## 7. Memory image analysis with Volatility 3 (published training memory images only)

```bash
python3 vol.py -f /path/to/training-memory.img windows.info
python3 vol.py -f /path/to/training-memory.img windows.pslist
python3 vol.py -f /path/to/training-memory.img windows.pstree
python3 vol.py -f /path/to/training-memory.img windows.netscan
```

Plugin support depends on the image OS/build and installed Volatility version. Commands are examples, not guaranteed to succeed on every image. Record tool version and image hash.

## 8. Minimal Sigma rule skeleton for a synthetic Windows log scenario

```yaml
title: Training - Office Process Launching PowerShell
id: d508d047-3bc3-4c99-97c8-b8c4ae75158f
status: experimental
description: Demonstration rule for authorized synthetic Sysmon ProcessCreate logs.
logsource:
  product: windows
  category: process_creation
detection:
  selection:
    ParentImage|endswith: '\WINWORD.EXE'
    Image|endswith: '\powershell.exe'
  condition: selection
level: medium
falsepositives:
  - Approved document automation or administrative workflows
```

This is a demonstration requiring testing and local field normalization. Do not deploy without a false-positive test plan.

## 9. Good incident statement versus unsupported conclusion

- **Observation:** "Synthetic Sysmon Event 1 shows `winword.exe` as the parent of `powershell.exe` at 08:11Z on HLR-FIN-07 (EV-002)."
- **Inference:** "This is unusual for a typical finance workstation and justifies investigation, but does not independently prove malicious execution."
- **Next action:** "Obtain authenticated process command line, signed-file metadata, and EDR network context; coordinate with the asset owner before isolating."

## 10. Closeout checklist

- [ ] Every conclusion references one or more evidence IDs.
- [ ] UTC and tool/data versions are explicit.
- [ ] False-positive paths considered.
- [ ] Approval owners identified for disruptive actions.
- [ ] Root cause separated from initial hypothesis.
- [ ] Recovery verification and rollback documented.
