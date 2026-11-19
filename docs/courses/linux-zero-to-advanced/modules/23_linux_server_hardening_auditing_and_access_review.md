# Module 23: Linux server hardening, auditing and access review
**Level:** Advanced  |  **Phase:** Advanced Linux operations  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 22

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [UFW security guide — Learn Linux TV](https://www.youtube.com/watch?v=F-ubkT1WNFk)
2. [Public key authentication — Learn Linux TV](https://www.youtube.com/watch?v=bfwfRCCFTVI)
3. [Linux logging — Learn Linux TV](https://www.youtube.com/watch?v=6uP_f_z3CbM)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Create a practical Linux hardening checklist
- [ ] Audit users, services, permissions and firewall exposure
- [ ] Check patch posture and SSH settings
- [ ] Document an evidence-based remediation plan

## Detailed lesson checklist
- [ ] **Lesson 1:** Asset inventory and baseline. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Package updates and reboot planning. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Least-privilege accounts. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Secure OpenSSH settings. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** UFW rule review. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Logging and integrity. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Review of world-writable paths on lab scope. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
uname -r
apt list --upgradable 2>/dev/null | head
getent passwd | tail -n 5
ss -tulpn
sudo ufw status verbose
systemctl list-unit-files --state=enabled --no-pager | head
```

## Hands-on lab: step-by-step instructions
1. Clone your Ubuntu VM or take a snapshot before any changes.
2. Create a simple inventory of distro, version, accounts, listening ports, packages and active services.
3. Compare actual configuration to a written baseline: no unnecessary public services, up-to-date packages, strong account separation and usable logs.
4. Review SSH configuration read-only; plan a key-based login and a safe rollback path.
5. Review UFW rules and test from a second lab VM only.
6. Apply low-risk changes in the disposable VM and record before/after evidence, including any issue you could not resolve.

## Expected results / self-check
- [ ] A 10-item hardening checklist is completed
- [ ] Every configuration change has a rollback note
- [ ] Authorized access still works after changes

## Common mistakes and troubleshooting
- **Watch for:** Applying CIS benchmark commands blindly.
- **Watch for:** Disabling SSH before validating alternative access.
- **Watch for:** Treating a scanner warning as certain evidence of compromise.

## Challenge assignment
Build a small script that prints read-only baseline checks into a dated report.

## Knowledge check
1. What is least privilege?
2. Why should hardening be incremental?
3. How do you verify a security improvement?

## Free documentation and references
- [Ubuntu security documentation](https://documentation.ubuntu.com/security/)
- [OpenSSH security manual](https://www.openssh.com/manual.html)

## What to submit before moving on
- A file named `module-23-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.

> **Important:** Keep the scope to your own disposable VM. Avoid treating this as penetration testing against external hosts.
