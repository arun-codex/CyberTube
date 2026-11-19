# Module 24: Final Linux administration and security capstone
**Level:** Advanced  |  **Phase:** Capstone  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 23

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Linux troubleshooting — Learn Linux TV](https://www.youtube.com/watch?v=GPF5lrY9YJY)
2. [Linux systemd services — Learn Linux TV](https://www.youtube.com/watch?v=5JVBpXiYMKo)
3. [Linux Command Line Entire Tutorial Series — review](https://www.youtube.com/watch?v=avg65oY7sj4)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Build and maintain a documented Linux server VM
- [ ] Demonstrate all core commands without watching the screen
- [ ] Write reusable admin scripts and troubleshooting reports
- [ ] Present secure and reversible configuration choices

## Detailed lesson checklist
- [ ] **Lesson 1:** VM architecture and snapshot strategy. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Users and access. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** File permissions. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Package and service management. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** SSH and UFW. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Logging and scheduled jobs. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Backups and restoration. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 8:** Performance and troubleshooting. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
uname -a
id
findmnt /
systemctl --failed --no-pager
ss -tulpen
journalctl -b -p warning -n 20 --no-pager
df -hT
free -h
```

## Hands-on lab: step-by-step instructions
1. Start with a fresh disposable Ubuntu Server or Desktop VM and take an initial snapshot.
2. Create a limited user account and a private training folder, documenting permissions.
3. Apply updates after reviewing the proposed package changes.
4. Configure one permitted test service; enable SSH key access only after testing with a spare session.
5. Document inbound firewall rules and test from an authorized second VM.
6. Write one backup script and a temporary scheduled run; confirm that a restore works.
7. Generate a read-only system health report and investigate one simulated service failure from journal logs.
8. Submit `README.md`, `architecture.md`, `commands.md`, `backup-test.md`, `hardening.md`, and `troubleshooting.md` with screenshots that contain no credentials.

## Expected results / self-check
- [ ] Build can be repeated from written instructions
- [ ] One backup has been restored and compared
- [ ] The server retains expected connectivity after hardening
- [ ] You can explain and defend each administrative change

## Common mistakes and troubleshooting
- **Watch for:** Demonstrating only screenshots without executable documentation.
- **Watch for:** Leaving temporary cron tasks and test accounts behind.
- **Watch for:** Pushing secrets or private keys to a public repository.

## Challenge assignment
Add an optional separate container lesson from Learn Linux TV after finishing the core Linux course.

## Knowledge check
1. What is the single largest operational risk in your configuration?
2. How would you recover after a failed firewall change?
3. Which monitoring evidence would tell you a service stopped unexpectedly?

## Free documentation and references
- [Ubuntu Server documentation](https://documentation.ubuntu.com/server/)
- [Linux Command Line book](https://linuxcommand.org/tlcl.php)

## What to submit before moving on
- A file named `module-24-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.

> **Important:** Success means a documented, reproducible, secure **Linux** environment. No Windows, Kali attack tools or unrelated cybersecurity domains are required.
