# SIEM for Cybersecurity: Zero to Advanced (30-Module Video-Guided Course)

**Scope:** defensive SIEM operations, SOC investigation and detection engineering using Splunk and Microsoft Sentinel.  
**Release date:** 2026-11-20  
**Language:** English (most linked videos in English).  
**Level:** absolute beginner → confident lab practitioner; production expertise requires real experience.  
**Format:** 30 editable Markdown modules; each module has at least one YouTube link, four defined lessons, an evidence-based lab and a short knowledge check.  
**Estimated workload:** 148 hours including independent labs, not a promise that the linked videos alone total this duration.  
**Ownership:** all original module text, labs, rubrics and synthetic data in this package are newly drafted. Linked videos remain third-party content hosted by their owners.

> **Important distinction:** This is a curated syllabus with verified publisher-linked/publicly indexed YouTube videos, not a newly created YouTube playlist or downloadable copies of the videos. Some modules share videos and specify a relevant chapter. Links can be removed or made private by their owners. Some optional cloud lab activities are not free even when instruction material is free.

## How to use the course

1. Read [SETUP_AND_COST_SAFETY.md](SETUP_AND_COST_SAFETY.md) and prepare an offline or personal Splunk lab.
2. Complete modules in numeric order. Read the outcome and four lesson activities before clicking each assigned video.
3. Use the included `datasets/` only on a personal/authorized lab; do not attack real systems.
4. Capture the specified deliverable, complete the knowledge check and mark the checklist.
5. Use the [assessment rubric](ASSESSMENT_AND_CAPSTONE.md) after module 15 and at the final capstone.
6. Use [YOUTUBE_VIDEO_LIBRARY.md](YOUTUBE_VIDEO_LIBRARY.md) and [FREE_RESOURCES.md](FREE_RESOURCES.md) to switch among tutorials and official documentation.

## Learning outcomes

Graduates should be able to: differentiate security telemetry and incidents; ingest, normalize and query logs in Splunk and Sentinel; use SPL and KQL; investigate authentication, DNS, web and endpoint cases; design testable alerts; assess false positives; communicate a defensible SOC handoff; and plan safe SIEM monitoring/automation with cost controls.

## Course map (30 modules)

| # | Module | Phase | Learner hours | Video |
|---:|---|---|---:|---|
| 01 | [SIEM Fundamentals and the SOC Mission](modules/M01_siem-fundamentals-and-the-soc-mission.md) | Foundation | 3 | [Watch](https://www.youtube.com/watch?v=MtqFMe4zSpQ&list=PLHh9jhztlMyp8lyKXt9orVM57ygW_ihPS) |
| 02 | [Security Log Types and Event Anatomy](modules/M02_security-log-types-and-event-anatomy.md) | Foundation | 3 | [Watch](https://www.youtube.com/watch?v=LbR5cqqaFVk) |
| 03 | [SOC Alert Triage and Investigation Workflow](modules/M03_soc-alert-triage-and-investigation-workflow.md) | Foundation | 4 | [Watch](https://www.youtube.com/watch?v=HloK6Ay4h1M) |
| 04 | [Windows Security and Sysmon Telemetry](modules/M04_windows-security-and-sysmon-telemetry.md) | Foundation | 4 | [Watch](https://www.youtube.com/watch?v=MvfhIydxFmw) |
| 05 | [Linux, DNS, Firewall and Web Logs for SIEM](modules/M05_linux-dns-firewall-and-web-logs-for-siem.md) | Foundation | 4 | [Watch](https://www.youtube.com/watch?v=LbR5cqqaFVk) |
| 06 | [Install a Safe Splunk Learning Lab](modules/M06_install-a-safe-splunk-learning-lab.md) | Splunk | 4 | [Watch](https://www.youtube.com/watch?v=LbR5cqqaFVk) |
| 07 | [Splunk Ingestion, Indexes and Sourcetypes](modules/M07_splunk-ingestion-indexes-and-sourcetypes.md) | Splunk | 4 | [Watch](https://www.youtube.com/watch?v=LbR5cqqaFVk) |
| 08 | [Splunk Search Interface and Basic SPL](modules/M08_splunk-search-interface-and-basic-spl.md) | Splunk | 4 | [Watch](https://www.youtube.com/watch?v=LbR5cqqaFVk) |
| 09 | [SPL Aggregation, Eval and Time-Series Analysis](modules/M09_spl-aggregation-eval-and-time-series-analysis.md) | Splunk | 5 | [Watch](https://www.youtube.com/watch?v=wY3I4kC532U) |
| 10 | [Field Extraction, Parsing and Normalization in Splunk](modules/M10_field-extraction-parsing-and-normalization-in-splunk.md) | Splunk | 5 | [Watch](https://www.youtube.com/watch?v=LbR5cqqaFVk) |
| 11 | [Enrichment, Lookups and Multi-Source Correlation](modules/M11_enrichment-lookups-and-multi-source-correlation.md) | Splunk | 5 | [Watch](https://www.youtube.com/watch?v=wY3I4kC532U) |
| 12 | [Splunk Dashboards and SOC Reporting](modules/M12_splunk-dashboards-and-soc-reporting.md) | Splunk | 4 | [Watch](https://www.youtube.com/watch?v=LbR5cqqaFVk) |
| 13 | [Splunk Alerting and Detection Rule Tuning](modules/M13_splunk-alerting-and-detection-rule-tuning.md) | Splunk | 5 | [Watch](https://www.youtube.com/watch?v=wY3I4kC532U) |
| 14 | [Investigate Credential Attacks with Splunk](modules/M14_investigate-credential-attacks-with-splunk.md) | Splunk | 5 | [Watch](https://www.youtube.com/watch?v=LbR5cqqaFVk) |
| 15 | [DNS, Proxy and Web Security Investigation](modules/M15_dns-proxy-and-web-security-investigation.md) | Splunk | 5 | [Watch](https://www.youtube.com/watch?v=LbR5cqqaFVk) |
| 16 | [Endpoint and Ransomware Investigation Using Splunk](modules/M16_endpoint-and-ransomware-investigation-using-splunk.md) | Splunk | 6 | [Watch](https://www.youtube.com/watch?v=fS2u97T05KQ) |
| 17 | [Splunk Enterprise Security and Risk-Based Alerting](modules/M17_splunk-enterprise-security-and-risk-based-alerting.md) | Splunk | 5 | [Watch](https://www.youtube.com/watch?v=LbR5cqqaFVk) |
| 18 | [Threat Hunting and Detection Engineering with SPL](modules/M18_threat-hunting-and-detection-engineering-with-spl.md) | Splunk | 6 | [Watch](https://www.youtube.com/watch?v=MvfhIydxFmw) |
| 19 | [Microsoft Sentinel Foundations and Workspace Design](modules/M19_microsoft-sentinel-foundations-and-workspace-design.md) | Sentinel | 4 | [Watch](https://www.youtube.com/watch?v=0ydVILka3eg) |
| 20 | [Sentinel Connectors: Windows, Linux, Syslog, Cloud](modules/M20_sentinel-connectors-windows-linux-syslog-cloud.md) | Sentinel | 5 | [Watch](https://www.youtube.com/watch?v=hOYpji940yw) |
| 21 | [KQL Basics for SOC Analysts](modules/M21_kql-basics-for-soc-analysts.md) | Sentinel | 5 | [Watch](https://www.youtube.com/watch?v=3DHcnk9obfk) |
| 22 | [Advanced KQL: Joins, JSON, Baselines and ASIM](modules/M22_advanced-kql-joins-json-baselines-and-asim.md) | Sentinel | 6 | [Watch](https://www.youtube.com/watch?v=3DHcnk9obfk) |
| 23 | [Sentinel Analytics Rules and Detection Validation](modules/M23_sentinel-analytics-rules-and-detection-validation.md) | Sentinel | 5 | [Watch](https://www.youtube.com/watch?v=pJjljBT4ipQ) |
| 24 | [Sentinel Incident Investigation and SOC Handoff](modules/M24_sentinel-incident-investigation-and-soc-handoff.md) | Sentinel | 5 | [Watch](https://www.youtube.com/watch?v=HloK6Ay4h1M) |
| 25 | [Threat Intelligence, Watchlists and ASIM Enrichment](modules/M25_threat-intelligence-watchlists-and-asim-enrichment.md) | Sentinel | 5 | [Watch](https://www.youtube.com/watch?v=NJlaqBaqahc) |
| 26 | [Sentinel Dashboards, UEBA and Investigation Notebooks](modules/M26_sentinel-dashboards-ueba-and-investigation-notebooks.md) | Sentinel | 5 | [Watch](https://www.youtube.com/watch?v=7eYNaYSsk1A) |
| 27 | [SOAR and Playbooks: Safe Response Automation](modules/M27_soar-and-playbooks-safe-response-automation.md) | Advanced | 6 | [Watch](https://www.youtube.com/watch?v=G6TIzJK8XBA) |
| 28 | [Advanced Detection Engineering and SIEM Content Lifecycle](modules/M28_advanced-detection-engineering-and-siem-content-lifecycle.md) | Advanced | 6 | [Watch](https://www.youtube.com/watch?v=pJjljBT4ipQ) |
| 29 | [SIEM Health, Performance, Cost and Advanced Integrations](modules/M29_siem-health-performance-cost-and-advanced-integrations.md) | Advanced | 5 | [Watch](https://www.youtube.com/watch?v=T6Vyo7gZYds) |
| 30 | [Splunk and Sentinel Cross-Platform Capstone](modules/M30_splunk-and-sentinel-cross-platform-capstone.md) | Capstone | 10 | [Watch](https://www.youtube.com/watch?v=wY3I4kC532U) |

## Delivery and integrity notes

- This course is intended for **defenders, SOC analysts and authorized blue-team testers**, not intrusion into third-party systems.
- Recorded demos and vendor documentation reflect their release dates. Verify current interface wording, licensing, and feature access before following them.
- Some Splunk products and Enterprise Security capabilities need a commercial license. Base Splunk lab or a simulated walkthrough is an acceptable alternative.
- Some Sentinel exercises require Azure billing, even during a trial: create budgets, review billing, and delete resources; **never assume a trial makes every component free**.
- Video links and official resource links were reviewed from publicly indexed source pages on 2026-11-20; **no guarantee** of continued YouTube playback or free access.
- Optional online labs may require accounts or offer only limited free tiers. The supplied CSV datasets enable low-cost practice without a cloud subscription.

## Included material

- `modules/`: thirty independent module `.md` files, each with video, resources, lesson instructions, lab steps, exit criteria and short answers to produce.
- `YOUTUBE_VIDEO_LIBRARY.md`: curated YouTube videos and a full cross-module index.
- `FREE_RESOURCES.md`: free documentation, official training and lab links with access caveats.
- `SETUP_AND_COST_SAFETY.md`: safe setup and trial/billing guidance.
- `ASSESSMENT_AND_CAPSTONE.md`: transparent checklists, midterm and final grading rubric.
- `STUDY_SCHEDULE.md`: 18-week pathway and tracking checklist.
- `VIDEO_AND_SOURCE_AUDIT.md`: evidence, video provenance and limitations.
- `SAMPLE_DATA_GUIDE.md` and `datasets/`: fictional example data.
- `CONTENT_STUDIO_STORYBOARD.md`: synopsis ready for slide/storyboard adaptation.
