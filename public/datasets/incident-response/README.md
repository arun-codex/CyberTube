# Synthetic training scenario: Harborlight Retail

This entire organization and every event below are invented for instructional use. No real IP addresses, people, domains, malware or victims are represented. Reserved `example.com` and RFC 5737 example IP addresses are used.

**Initial alert:** Multiple failed logins for `finance.user` followed by a successful login and a suspicious process on `HLR-FIN-07`. A fake urgent-payment email was received that morning.

**Task:** Read the provided synthetic datasets (alerts, sign-ins, email, Sysmon, proxy and optional cloud events). Create a case ticket, normalize the timestamps, compare multiple hypotheses, assign an evidence-based priority, recommend approval-aware containment, draft a 6-event timeline and write a final report. Some details are deliberately ambiguous.

**Analyst prompts:**
1. Is the login location alone sufficient to declare compromise?
2. What process tree evidence would you request?
3. Is the e-mail a probable vector or verified root cause?
4. Should you disable the account now, isolate a workstation, or seek more evidence? Identify the decision authority.
5. Which actions preserve evidence and which could destroy it?

**Do not** turn these text events into real exploit/malware executions.

## Synthetic files

- `synthetic_alerts.json` — three practice alerts with different priorities
- `synthetic_signins.csv` — sign-in events with conflicting context
- `identity_signins_4countries.csv` — alternate geography/MFA exercise
- `synthetic_sysmon.csv` — endpoint process/network example
- `synthetic_proxy.csv` — outbound traffic metadata (not proof of content exfiltration)
- `synthetic_email.json` — harmless synthetic phishing email headers
- `synthetic_cloudtrail.json` — fictional AWS audit event example
