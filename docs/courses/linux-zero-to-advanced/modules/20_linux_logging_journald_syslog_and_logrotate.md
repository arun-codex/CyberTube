# Module 20: Linux logging: journald, syslog and logrotate
**Level:** Advanced  |  **Phase:** Bash and observability  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 19

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Understanding Linux Logging — Learn Linux TV](https://www.youtube.com/watch?v=6uP_f_z3CbM)
2. [journalctl Basics — Learn Linux TV](https://www.youtube.com/watch?v=0dG3vUYt7Uk)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Find system and service logs
- [ ] Filter by unit, time and priority
- [ ] Understand journald versus text log files
- [ ] Produce a repeatable log review report

## Detailed lesson checklist
- [ ] **Lesson 1:** systemd-journald. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Syslog daemon concepts. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** `journalctl -b`, `-u`, `--since`, `-p`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Log retention and rotation. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** Timestamps and UTC. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Auth and sudo events. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Rootless versus privileged log access. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
journalctl -b -n 20 --no-pager
journalctl -p warning --since today --no-pager
journalctl --disk-usage
ls -la /var/log | head
systemctl status systemd-journald --no-pager
```

## Hands-on lab: step-by-step instructions
1. Inspect boot logs without modifying them.
2. Filter journal messages to only warning and higher priority for the current day.
3. Inspect logs for a known unit (for example cron or ssh if installed).
4. Record time zone and explain why comparisons across hosts may be confusing.
5. Identify whether `/var/log/auth.log` exists on your distribution; if absent, use the journal or relevant platform logging.
6. Write a summary with five noteworthy but non-sensitive service events and their timestamps.

## Expected results / self-check
- [ ] Can find logs by unit and time
- [ ] Can explain where authentication records may be stored
- [ ] No secrets or private key material in the report

## Common mistakes and troubleshooting
- **Watch for:** Assuming `/var/log/auth.log` exists on every Linux distro.
- **Watch for:** Treating every warning as an attack.
- **Watch for:** Sharing full logs containing personal identifiers.

## Challenge assignment
Compare how persistent and volatile journald storage differ.

## Knowledge check
1. What does `journalctl -b` show?
2. What is logrotate used for?
3. Why do timestamps matter in incident review?

## Free documentation and references
- [journalctl manual](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html)
- [logrotate manual](https://man7.org/linux/man-pages/man8/logrotate.8.html)

## What to submit before moving on
- A file named `module-20-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.
