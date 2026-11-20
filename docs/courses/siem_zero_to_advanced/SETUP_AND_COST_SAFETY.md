# Setup Guide — Safe, Low-Cost SIEM Study

## A. Recommended free-first approach

1. Have a personal computer (8 GB RAM minimum for light practice, 16 GB preferable if running VMs; approximate needs depend on workload).
2. Install a supported local VM or use your own operating system. Keep all labs confined to your private machine/network.
3. Download Splunk Enterprise from the official Splunk site; check current trial/free-license terms and limits. Never expose port 8000/management ports to the public Internet. Make one unique admin password and a dedicated test index named `soc_lab` if your lab edition supports it.
4. Upload `datasets/auth_events.csv`, `datasets/dns_events.csv`, and `datasets/web_events.csv` as **three separate sources**. Set a consistent timestamp format, source type, and time range matching 2026-11-15. Use source fields in queries rather than assuming a vendor schema.
5. Run an event-count search and confirm fields parse. Keep initial copies unmodified so you can recover from an import mistake.
6. If local installation is impossible, read sample CSVs directly and write SPL/KQL queries as text. Modules grade investigation reasoning, not possession of an enterprise license.

## B. Sentinel cloud cost safety

Microsoft currently documents a 31-day trial for eligible new Sentinel workspaces, with up to the first 10 GB/day of selected Analytics log ingestion waived; **this is not a guarantee of a free Azure lab**. Other service and retention costs can apply. Before creating ANY resources:

1. Read [Sentinel billing](https://learn.microsoft.com/en-us/azure/sentinel/billing), [Azure cost management](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/), and official region-specific pricing.
2. Decide on a maximum budget and setup alerts. Budget alerts notify; they do **not necessarily automatically stop spending**.
3. Use a separate disposable practice resource group. Do not connect actual workplace/customer logs.
4. Avoid costly data connectors, paid virtual machines, Microsoft Defender upgrades or premium services unless their charges are explicitly understood.
5. Delete/disable cloud resources and recheck your bill at the end. A free resource like a GitHub lab guide may create paid resources if executed.
6. **Zero-cloud-cost alternative:** use Microsoft Learn KQL examples and `datatable()` queries to reason through supplied sample cases in text without provisioning Sentinel.

## C. Basic SPL sanity queries

Use after ingesting into `soc_lab`. Field names may be named differently depending on import settings:

```spl
index=soc_lab | stats count by sourcetype
index=soc_lab action=failure | stats count by user src_ip | sort - count
index=soc_lab | timechart span=1h count
```

**Timestamp warning:** synthetic CSV timestamps are in November 2026. Select an absolute time range that includes them; a default 'last 24 hours' search will return zero after the dates pass.

## D. Basic KQL practice example

This works as text in a KQL-compatible environment without requiring real SecurityEvent table data:

```kusto
let Auth = datatable(TimeGenerated:datetime, Account:string, SourceIP:string, Action:string)
[
 datetime(2026-11-15T09:00:00Z), 'jordan.training', '203.0.113.91', 'failure',
 datetime(2026-11-15T09:01:00Z), 'jordan.training', '203.0.113.91', 'failure',
 datetime(2026-11-15T09:02:00Z), 'jordan.training', '203.0.113.91', 'success'
];
Auth | summarize Failures=countif(Action == 'failure'), Successes=countif(Action == 'success') by Account, SourceIP
```

## E. Safety boundaries

Only use your own systems and synthetic or expressly authorized security data. Do not deploy attacks on external targets, send real phishing, run ransomware samples, or expose production credentials. If performing optional emulation, follow your lab's written authorization and snapshot isolation.
