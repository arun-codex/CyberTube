# Free Resources, Lab References and Cost Boundaries

**Free** here means free-to-read/view training content or openly hosted documentation. It does **not** mean every connected cloud account, software license, exam, test lab, or optional activity is free. Check the terms for your account, region, and product version.

| Resource | Link | Free-access qualification |
|---|---|---|
| Splunk official free training | [https://www.splunk.com/en_us/training/free-courses/overview.html](https://www.splunk.com/en_us/training/free-courses/overview.html) | Free self-paced training catalogue; account registration may apply |
| Splunk documentation | [https://help.splunk.com/](https://help.splunk.com/) | Free documentation |
| Splunk Education | [https://education.splunk.com/](https://education.splunk.com/) | Free and paid course options; inspect each item |
| Splunk Attack Data | [https://github.com/splunk/attack_data](https://github.com/splunk/attack_data) | Open attack-related log datasets; review file rights and safe handling |
| Splunk Security Content | [https://github.com/splunk/security_content](https://github.com/splunk/security_content) | Detection examples, tests and analytics |
| Splunk BOTS v2 | [https://github.com/splunk/botsv2](https://github.com/splunk/botsv2) | Public CTF-style dataset, nontrivial to download/import |
| Microsoft Sentinel 21-part skill-up training | [https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources](https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources) | Official deep reference; videos and docs |
| Configure Sentinel training — Microsoft Learn | [https://learn.microsoft.com/en-us/training/paths/sc-200-configure-azure-sentinel-environment/](https://learn.microsoft.com/en-us/training/paths/sc-200-configure-azure-sentinel-environment/) | Free learning materials; real cloud lab may incur charges |
| Microsoft Learn: KQL for Sentinel | [https://learn.microsoft.com/en-us/training/paths/sc-200-utilize-kql-for-azure-sentinel/](https://learn.microsoft.com/en-us/training/paths/sc-200-utilize-kql-for-azure-sentinel/) | Free structured KQL lessons |
| Microsoft Sentinel official training lab | [https://github.com/Azure/Azure-Sentinel/tree/master/Tools/Microsoft-Sentinel-Training-Lab](https://github.com/Azure/Azure-Sentinel/tree/master/Tools/Microsoft-Sentinel-Training-Lab) | Free instructions/source; Azure resources may cost money |
| Microsoft Sentinel billing and free trial | [https://learn.microsoft.com/en-us/azure/sentinel/billing](https://learn.microsoft.com/en-us/azure/sentinel/billing) | Check free trial eligibility and exclusions before provisioning |
| MITRE ATT&CK Enterprise | [https://attack.mitre.org/](https://attack.mitre.org/) | Free technique references |
| Sigma detection rules | [https://github.com/SigmaHQ/sigma](https://github.com/SigmaHQ/sigma) | Community rule format and examples; validate against your schema |
| Atomic Red Team | [https://github.com/redcanaryco/atomic-red-team](https://github.com/redcanaryco/atomic-red-team) | Controlled test library; execute only on authorized isolated lab |
| Open log repository (Splunk datasets) | [https://github.com/splunk/attack_data](https://github.com/splunk/attack_data) | Curated examples |
| osquery documentation | [https://osquery.io/](https://osquery.io/) | Free endpoint telemetry reference |
| Sysmon documentation | [https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon) | Free tool; configure only on owned endpoints |
| KQL documentation | [https://learn.microsoft.com/en-us/kusto/query/](https://learn.microsoft.com/en-us/kusto/query/) | Free query language reference |
| Azure cost management | [https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/) | Cost and budget control guidance |

## Strongest recommended learning path

1. Splunk official **Intro to Splunk**, **Using Fields**, **Scheduling Reports and Alerts**, **Introduction to Enterprise Security**, and **SOC Essentials** materials: start from the free course catalog and inspect individual entries for free-versus-lab differences.
2. Microsoft Learn **Configure Sentinel**, **Connect logs**, **KQL**, and Microsoft's comprehensive **Sentinel skill-up** course. The 21-part skill-up resource includes older webinars; combine with 2026 SC-200 video lessons.
3. Practice with supplied fictional `datasets/*.csv`, Splunk's public attack_data repository, and official Sentinel lab instructions only in an explicitly authorized environment.
4. For ATT&CK technique descriptions and detection tests, use MITRE ATT&CK, SigmaHQ and Splunk Security Content.

## Essential warnings

- **Splunk Enterprise Security:** many enterprise features require paid licensing; you can **study** the concepts using public videos and simulate risk scoring in the base Splunk lab.
- **Microsoft Sentinel:** its 31-day qualifying trial advertises a 10 GB/day data-ingestion allowance for some workloads, but not all Azure resources are free. Consult the [current billing page](https://learn.microsoft.com/en-us/azure/sentinel/billing) and set budgets; delete lab resources.
- **TryHackMe:** videos may be public while hosted rooms or guided lab access may be freemium or subscription-based. The course's assessment never requires purchase.
- **No malware execution:** use public prepared attack logs or the fictional CSV set.
- **Do not republish videos:** linking is different from having licensing permission to upload, embed in a commercial product or modify video files. Verify embedding and terms for your intended website.
