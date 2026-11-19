# Module 09: Processes, process priorities and job control
**Level:** Intermediate  |  **Phase:** System administration  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 08

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Demystifying top — Learn Linux TV](https://www.youtube.com/watch?v=WsR11EGF9PA)
2. [Full command-line course: processes](https://www.youtube.com/watch?v=avg65oY7sj4&t=35462s)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Identify CPU/memory-intensive processes
- [ ] Manage foreground/background jobs
- [ ] Send appropriate Unix signals
- [ ] Understand priority and resource controls

## Detailed lesson checklist
- [ ] **Lesson 1:** PIDs and PPIDs. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** `ps`, `top`, `htop`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** `jobs`, `bg`, `fg`, `nohup`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** SIGTERM versus SIGKILL. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** `nice` and `renice`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Process trees. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Linux `/proc` introduction. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
ps aux | head
top -b -n 1 | head
sleep 120 &
jobs
pgrep sleep
kill "$(pgrep -n sleep)"
```

## Hands-on lab: step-by-step instructions
1. Run the commands in a disposable terminal and confirm a test sleep process is running.
2. Check how it appears in `ps` and `top`.
3. Use `jobs` to list background shell jobs.
4. Send SIGTERM to the exact test process only; verify it ended.
5. Start a second `sleep` command and examine its priority with `ps -o pid,ni,cmd`.
6. Write down when forcing SIGKILL would be appropriate and why it is a last resort.

## Expected results / self-check
- [ ] Can identify an exact PID before signaling it
- [ ] Can explain foreground versus background tasks
- [ ] All test processes are terminated after the lab

## Common mistakes and troubleshooting
- **Watch for:** Killing a random PID.
- **Watch for:** Confusing nice value with actual CPU percentage.
- **Watch for:** Assuming a background task survives logout.

## Challenge assignment
Compare system processes with user-owned processes; do not terminate system services.

## Knowledge check
1. What is a PID?
2. What is the difference between SIGTERM and SIGKILL?
3. What does a higher nice value indicate?

## Free documentation and references
- [proc manual](https://man7.org/linux/man-pages/man5/proc.5.html)
- [Linux processes guide](https://linuxjourney.com/)

## What to submit before moving on
- A file named `module-09-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.
