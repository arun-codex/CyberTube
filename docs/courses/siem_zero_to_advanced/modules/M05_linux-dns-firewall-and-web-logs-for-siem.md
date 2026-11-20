# Module 05 — Linux, DNS, Firewall and Web Logs for SIEM

**Track:** Foundation  
**Estimated learner time:** 4 hours (video + guided practice, approximate)  
**Prerequisites:** M02  
**Level:** Beginner  
**Audience:** SOC analyst / defensive cybersecurity; not exploitation training.

## Outcome

Read common Linux, DNS, network and web logs to identify investigation pivots.

## 4 video-guided lessons

### 05.1 sshd and auth logs

- **Before watching:** identify one thing you already know and one question you want answered about sshd and auth logs.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 05.2 DNS query, response, domain and NXDOMAIN

- **Before watching:** identify one thing you already know and one question you want answered about dns query, response, domain and nxdomain.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 05.3 Firewall allow/deny flows

- **Before watching:** identify one thing you already know and one question you want answered about firewall allow/deny flows.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

### 05.4 HTTP request, method, status and user agent

- **Before watching:** identify one thing you already know and one question you want answered about http request, method, status and user agent.
- **Watch actively:** write three notes and identify a command, UI control, or workflow demonstrated by the instructor.
- **After watching:** explain the concept in your own words, including a SOC investigation example and one limitation.
- **Practice:** apply this lesson to the module scenario below using sample/authorized data only.

## YouTube video lessons (required)

- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=3355s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~55:55.
- **[Splunk SIEM Crash Course — Rajneesh Gupta](https://www.youtube.com/watch?v=LbR5cqqaFVk&t=4170s)** — 1h29m tutorial; chapters for deployment, SPL, DNS, HTTP and Enterprise Security; relevant chapter begins at ~69:30.

**Video coverage note:** Some lessons within this module rely on the same longer video or webinar at a specified chapter; these are curated third-party lessons, not videos owned by this course. For topics not explained fully in the assigned video, use the official free reference and complete the instructor-authored practical steps. Product interfaces may have changed.

## Free resources and references

- [Splunk documentation](https://help.splunk.com/) — Free documentation.
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/) — Free technique references.

## Guided SOC lab

**Scenario:** A workstation requests many unusual subdomains and is blocked by a gateway.

**Steps**

1. Open dns_events.csv and web_events.csv.
2. Group activity by client and destination and compare baselines.
3. Correlate DNS requests with associated HTTP activity by time and host.
4. Describe why a spike alone is not proof of command-and-control.

**Submit as evidence:** Time-correlated DNS/HTTP table with one benign alternative.

## Exit criteria / checklist

- [ ] Watched the assigned YouTube demonstrations and took notes.
- [ ] Completed each lesson's post-video explanation.
- [ ] Followed the lab steps using owned, synthetic, or explicitly authorized telemetry.
- [ ] Saved the listed deliverables with a date, tool version and data source.
- [ ] Can explain at least one false-positive possibility and a remaining evidence gap.

## Knowledge check (short-answer)

1. What does NXDOMAIN mean?
2. Why are response codes insufficient to prove attack?
3. What is the value of destination port?

**Pass standard:** Complete the lab evidence and answer at least 2/3 questions accurately. Self-assess first; ask another learner/reviewer to challenge unsupported claims.

## Safety and troubleshooting

- No scanning or attacking systems that you do not own or lack written authorization to test.
- Do not download or execute real malware; use provided benign data or official safe lab.
- If search returns zero rows, first check index/table, time range, field names and ingestion health.
- If a resource is restricted, use the included synthetic data and written walk-through; never bypass access controls.

---

[Course index](../README.md) · [Video library](../YOUTUBE_VIDEO_LIBRARY.md) · [Free resources](../FREE_RESOURCES.md) · [Assessment rubric](../ASSESSMENT_AND_CAPSTONE.md)
