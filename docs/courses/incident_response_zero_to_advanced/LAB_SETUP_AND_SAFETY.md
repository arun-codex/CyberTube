# Laboratory Setup and Safety Guide

## Recommended no-cost practice environment

**Option A — Laptop with virtual machines (preferred):** Install a reputable hypervisor on a computer you own. Use one Ubuntu VM as an analysis system and (optionally) one Windows evaluation VM. Keep NAT or host-only networking; do **not** bridge training VMs to a workplace network. Snapshot before each lab. An 8 GB RAM machine can do paper/log-only labs; 16 GB RAM is preferable for multi-VM labs. These are estimates, not hard requirements.

**Option B — Zero-install / low-resource:** Work entirely from the supplied synthetic JSON/CSV files in `scenarios/`, video demos, and documentation templates. Use spreadsheets or a text editor to perform searches and timelines. This avoids costs and risks of installing a SIEM or cloud service.

## Safe working rules

1. Written authorization and defined system scope before collecting or changing anything.
2. Use only data you own or that is explicitly published for training and legally reusable.
3. Preserve original evidence; analyze separate copies and record SHA-256 hashes.
4. Normalize timestamps to UTC and record local offsets/source clocks.
5. Never submit private logs, credential material or unknown samples to public websites.
6. Do not execute ransomware, credential stealers or unknown binaries; use text-only scenarios and sandboxed sanitized artifacts instead.
7. Do not isolate real endpoints, revoke real accounts, or change production firewall rules from a training exercise.
8. Cloud vendor free tiers can still charge. Use documented event samples unless you have budget controls and approval.
9. Use synthetic credentials only. Disable/tear down disposable lab VMs when finished.
10. The current NIST reference is `https://csrc.nist.gov/pubs/sp/800/61/r3/final`.

## Initial setup checklist

- [ ] Create a local course folder with `cases/`, `evidence/`, `reports/`, and `screenshots/` subfolders.
- [ ] Set an arbitrary student case ID format `HLR-IR-0001`.
- [ ] Prepare a UTC timeline template.
- [ ] Read the evidence and case templates.
- [ ] Open a direct YouTube video from Module 01.
- [ ] Test opening the synthetic CSV and JSON samples in `scenarios/`.

## Standard evidence log

For every artifact record: `evidence_id`, collection time UTC, source identity, data type, collection method, local path, SHA-256 (if file), collector, integrity checks, and any transfers. Use training data only.

## Example harmless read-only commands for your OWN Ubuntu VM

```bash
whoami
id
hostnamectl
journalctl --since '1 hour ago' --no-pager | head -n 30
ss -tunap
sha256sum ./synthetic-auth.csv
```

Never assume these read-only observations establish compromise without context.
