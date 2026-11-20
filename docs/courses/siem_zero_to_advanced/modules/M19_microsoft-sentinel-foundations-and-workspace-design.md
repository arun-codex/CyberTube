# Module 19 — Microsoft Sentinel Foundations and Workspace Design

**Track:** Sentinel  
**Estimated learner time:** 4 hours (video + guided practice, approximate)  
**Prerequisites:** M01-M05  
**Level:** Intermediate  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Explain Sentinel architecture and safely plan a cloud SIEM without surprise costs.

## 4 video-guided lessons

### 19.1 Log Analytics workspaces and Sentinel

- **Before watching:** identify one thing you already know and one question you want answered about log analytics workspaces and sentinel.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 19.2 Defender portal versus legacy Azure entry points

- **Before watching:** identify one thing you already know and one question you want answered about defender portal versus legacy azure entry points.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 19.3 Tenants, role-based access and retention

- **Before watching:** identify one thing you already know and one question you want answered about tenants, role-based access and retention.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 19.4 Trial scope, budgets and deletion

- **Before watching:** identify one thing you already know and one question you want answered about trial scope, budgets and deletion.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[SC-200 Episode 7: Configure Microsoft Sentinel — Microsoft Learn (2026)](https://www.youtube.com/watch?v=0ydVILka3eg)** — Verified Microsoft Learn lesson on workspaces and configuration.
- **[Getting Started with Sentinel: Deployment — Cloud 360 Training](https://www.youtube.com/watch?v=PDvQKFubLjY&t=179s)** — Workspace, connectors, KQL, rules, incidents; relevant chapter begins at ~2:59.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Microsoft Sentinel 21-part skill-up training](https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources) — Official deep reference; videos and docs.
- [Microsoft Sentinel billing and free trial](https://learn.microsoft.com/en-us/azure/sentinel/billing) — Check free trial eligibility and exclusions before provisioning.
- [Azure cost management](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/) — Cost and budget control guidance.

## Guided SOC lab

**Scenario:** Design a workspace for one practice lab and specify a no-charge fallback.

**Steps**

1. Draw ingestion and identity flow.
2. Read current Microsoft trial/pricing terms before creating any resources.
3. If eligible, set a cost budget and account alerts; otherwise use screenshots/docs and sample CSV.
4. Record resource names, region, permissions, cleanup actions.

**Submit as evidence:** Workspace design plus explicit cost checklist.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. Why can a free learning resource still incur cloud charges?
2. What is the role of Log Analytics?
3. Why least privilege?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
