# Module 14: cron jobs, systemd timers and Linux scheduling
**Level:** Intermediate  |  **Phase:** Storage and automation  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 13

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Scheduling tasks with cron — Learn Linux TV](https://www.youtube.com/watch?v=7cbP7fzn0D8)
2. [Long course: systemd timer](https://www.youtube.com/watch?v=avg65oY7sj4&t=34128s)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Understand cron expressions
- [ ] Schedule safe user-level maintenance
- [ ] Recognize systemd timer units
- [ ] Verify scheduled job output

## Detailed lesson checklist
- [ ] **Lesson 1:** cron minute/hour/day/month/weekday. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** User crontabs. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Environment and PATH for cron. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Logging stdout and stderr. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** `systemctl --user` timers. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Timer persistence and calendar expressions. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Idempotent scheduled work. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
date
crontab -l
systemctl --user list-timers --all
systemctl list-timers --all --no-pager | head
journalctl --user --since today -n 10 --no-pager
```

## Hands-on lab: step-by-step instructions
1. Create a script in your course folder that appends the current date to `scheduler.log`.
2. Run the script manually first, inspect ownership and absolute path.
3. Schedule it in your own crontab for a temporary short interval (or create a systemd user timer).
4. Wait for one execution and verify the file contains a new timestamp.
5. Remove the temporary cron entry afterward and ensure no leftover recurring task remains.
6. Document why the environment under cron may differ from your interactive shell.

## Expected results / self-check
- [ ] Scheduled command actually runs
- [ ] Log contains at least one expected timestamp
- [ ] Temporary job is removed at the end

## Common mistakes and troubleshooting
- **Watch for:** Using relative paths in cron jobs.
- **Watch for:** Leaving a recurring task running indefinitely.
- **Watch for:** Running cron tasks as root without a need.

## Challenge assignment
Compare the advantages of systemd timers over classic cron.

## Knowledge check
1. What does `*/5 * * * *` mean?
2. Why use absolute paths in cron?
3. Where would you troubleshoot a timer failure?

## Free documentation and references
- [crontab manual](https://man7.org/linux/man-pages/man5/crontab.5.html)
- [systemd.timer manual](https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html)

## What to submit before moving on
- A file named `module-14-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.
