# Module 02: Terminal navigation and Linux filesystem hierarchy
**Level:** Beginner  |  **Phase:** Foundations  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 01

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Navigating the Linux Filesystem — Learn Linux TV](https://www.youtube.com/watch?v=BNL3qBN9pP0)
2. [How to use ls — Learn Linux TV](https://www.youtube.com/watch?v=43hcVCt_GMc)
3. [Full command-line course: navigation](https://www.youtube.com/watch?v=avg65oY7sj4&t=895s)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Move through Linux entirely from terminal
- [ ] Distinguish absolute and relative paths
- [ ] Describe major filesystem directories
- [ ] Use built-in command help

## Detailed lesson checklist
- [ ] **Lesson 1:** `/`, `/home`, `/etc`, `/var`, `/usr`, `/tmp`, `/proc`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Current and parent directories. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Tilde expansion and hidden files. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Options and arguments. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** `man`, `--help`, `whatis`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Shell tab completion. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Why Linux is case-sensitive. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
pwd
ls -lah
cd /etc
cd ~
ls /var
man ls
type cd
history | tail
```

## Hands-on lab: step-by-step instructions
1. Make `~/linux-course/02-navigation/` and enter it from an arbitrary starting location.
2. Navigate to `/etc`, `/var/log`, `/usr/bin`, `/tmp` and back to your home directory.
3. List hidden files with `ls -la` and compare to plain `ls`.
4. Run `man ls`, search inside the manual with `/color`, and quit with `q`.
5. Use tab completion to complete a directory name; review 10 history items.
6. Write a short table of seven Linux directories and their purposes.

## Expected results / self-check
- [ ] Can reach any supplied absolute path without GUI
- [ ] Can explain the difference between `.` and `..`
- [ ] Filesystem table and command history notes saved

## Common mistakes and troubleshooting
- **Watch for:** Mistaking `/` for `~`.
- **Watch for:** Assuming all files have extensions.
- **Watch for:** Copying commands without understanding the current directory.

## Challenge assignment
Find the location of your current shell executable and explain how you confirmed it.

## Knowledge check
1. What is an absolute path?
2. What is in `/etc`?
3. How do you read help for `ls`?

## Free documentation and references
- [Filesystem Hierarchy Standard](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html)
- [Linux Journey](https://linuxjourney.com/)

## What to submit before moving on
- A file named `module-02-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.
