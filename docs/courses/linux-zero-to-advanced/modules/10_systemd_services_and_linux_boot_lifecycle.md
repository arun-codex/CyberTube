# Module 10: systemd, services and Linux boot lifecycle
**Level:** Intermediate  |  **Phase:** System administration  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 09

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [systemctl and systemd — Learn Linux TV](https://www.youtube.com/watch?v=5JVBpXiYMKo)
2. [journalctl basics — Learn Linux TV](https://www.youtube.com/watch?v=0dG3vUYt7Uk)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Explain Linux boot stages at a high level
- [ ] Inspect unit files and dependencies
- [ ] Start and stop an isolated training service
- [ ] Use journalctl to diagnose service failures

## Detailed lesson checklist
- [ ] **Lesson 1:** Firmware to bootloader to kernel to init. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** systemd units: service, target, timer. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** `systemctl status`, `list-unit-files`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Enable versus start. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** Dependencies and ordering. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Service restart policies. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Reading unit logs. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
systemctl --version
systemctl list-units --type=service --no-pager | head
systemctl status cron --no-pager
systemctl cat cron
journalctl -u cron -n 15 --no-pager
systemd-analyze
```

## Hands-on lab: step-by-step instructions
1. Identify the active system manager and its version.
2. List active services and choose one low-risk service to inspect.
3. Read its unit definition via `systemctl cat`.
4. Use `journalctl -u` to inspect recent events.
5. If the cron service exists, inspect its status; do not stop SSH or other connectivity services.
6. Explain how to determine whether a service starts automatically on reboot.

## Expected results / self-check
- [ ] Identify a unit file path and status
- [ ] Explain start versus enable
- [ ] Find related logs without editing services

## Common mistakes and troubleshooting
- **Watch for:** Disabling a service without checking system impact.
- **Watch for:** Assuming service names match across all distributions.
- **Watch for:** Editing packaged unit files in `/usr/lib` or `/lib` directly.

## Challenge assignment
Create a harmless user-level oneshot service that writes a timestamp into your home folder.

## Knowledge check
1. What is PID 1?
2. How does enable differ from start?
3. Which command shows a service log?

## Free documentation and references
- [systemd documentation](https://www.freedesktop.org/software/systemd/man/latest/)
- [Ubuntu systemd reference](https://ubuntu.com/server/docs/service-management)

## What to submit before moving on
- A file named `module-10-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.
