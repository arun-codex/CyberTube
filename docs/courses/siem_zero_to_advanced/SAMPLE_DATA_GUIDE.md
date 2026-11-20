# Synthetic SIEM Dataset Guide

This course includes three original CSV files designed only for defensive investigation practice.

- [Authentication events](datasets/auth_events.csv): timestamp, user, src_ip, host, action, event_id. Some activity forms a deliberately unusual burst of failed logins and later one successful login.
- [DNS events](datasets/dns_events.csv): timestamp, host, query, record_type, rcode. Some activity is deliberately repetitive for one lab client.
- [Web events](datasets/web_events.csv): timestamp, host, dst_ip, method, url, status. A series of POST events is intentionally clustered.

**All content is fictional.** IP addresses use RFC 5737 documentation blocks (192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24) and domains use `.example`. Events are **not** live evidence of cyberattacks; the anomalies are educational and may also have benign explanations.

## Import checklist

1. Use the dedicated test index, not production. Retain file names as sources.
2. Field types and source timestamps are in UTC with `Z` suffix. Verify parse format.
3. When queries return 0 rows, check the absolute time range (events: November 15, 2026), index, sourcetype and field names.
4. Never publish or send confidential workplace telemetry just to complete a lab.

## Basic hypothesis challenges

- Which account/source combination has the highest failed login volume?
- Is there a success after that burst? Does this prove account takeover? Explain.
- Does one workstation have a concentration of DNS queries to the same domain?
- Is there HTTP behavior for the same fictional hostname and an overlapping timeframe?
- What essential endpoint or identity evidence is **not** present?

Do not treat these as predetermined proof of compromise. The correct outcome must distinguish observations from inference.
