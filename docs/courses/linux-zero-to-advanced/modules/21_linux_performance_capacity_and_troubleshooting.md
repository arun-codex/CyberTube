# Module 21: Linux performance, capacity and troubleshooting
**Level:** Advanced  |  **Phase:** Advanced Linux operations  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 20

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [How to interpret Linux load average — Learn Linux TV](https://www.youtube.com/watch?v=4bJmzHh4pg0)
2. [Understanding memory and swap — Learn Linux TV](https://www.youtube.com/watch?v=XTMyJ5l0GLg)
3. [sar command — Learn Linux TV](https://www.youtube.com/watch?v=_4WVPSfGqos)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Diagnose CPU, memory, IO and disk problems
- [ ] Read load average and swap usage
- [ ] Use observation before changing settings
- [ ] Write a systematic troubleshooting report

## Detailed lesson checklist
- [ ] **Lesson 1:** CPU load versus CPU percentage. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Memory cache and swap. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** `top`, `free`, `vmstat`, `iostat`, `sar`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Disk fullness versus inode fullness. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** Process states and open files. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** System bottleneck hypotheses. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Baseline-versus-change comparisons. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
uptime
free -h
df -hT
df -i
top -b -n 1 | head -n 20
ps -eo pid,stat,%cpu,%mem,comm --sort=-%cpu | head
```

## Hands-on lab: step-by-step instructions
1. Record a clean baseline of CPU, memory, load average, swap and disk use.
2. Run a short local harmless command (e.g. `sha256sum` over a test file) and compare resource readings.
3. Use `ps`/`top` to identify active workloads; do not kill anything you do not own.
4. Check free disk space and inode use separately.
5. Inspect relevant journal warnings around a simulated failed service start.
6. Produce a concise diagnostic report with: symptom, evidence, hypothesis, test and conclusion.

## Expected results / self-check
- [ ] Report includes at least four observed metrics
- [ ] Correctly distinguishes free versus cached memory
- [ ] Documents investigation without random reboots

## Common mistakes and troubleshooting
- **Watch for:** Treating high Linux memory cache as a fault.
- **Watch for:** Interpreting load average without CPU-core context.
- **Watch for:** Disabling services before understanding root cause.

## Challenge assignment
Use `time` and `nice` on a small test process and compare observations.

## Knowledge check
1. What is swap?
2. What does load average measure?
3. What does `df -i` report?

## Free documentation and references
- [proc man page](https://man7.org/linux/man-pages/man5/proc.5.html)
- [Linux performance tools overview](https://www.brendangregg.com/linuxperf.html)

## What to submit before moving on
- A file named `module-21-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.
