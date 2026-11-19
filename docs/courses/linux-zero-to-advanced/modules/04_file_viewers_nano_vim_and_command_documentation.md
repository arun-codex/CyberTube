# Module 04: File viewers, Nano, Vim and command documentation
**Level:** Beginner  |  **Phase:** Foundations  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 03

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [The cat command — Learn Linux TV](https://www.youtube.com/watch?v=z3nJlyrJYW4)
2. [Learn the man command — Learn Linux TV](https://www.youtube.com/watch?v=7BG-Devm7sA)
3. [Full command-line course: Nano and vi](https://www.youtube.com/watch?v=avg65oY7sj4&t=2454s)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Read small and large text files
- [ ] Make edits confidently in Nano
- [ ] Navigate and save changes in Vim
- [ ] Use man pages to learn new options

## Detailed lesson checklist
- [ ] **Lesson 1:** `cat`, `less`, `head`, `tail`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** `nano` shortcuts. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Vim normal/insert modes and `:wq`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** `man` sections and examples. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** `file` and MIME basics. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Files with long lines. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Read-only inspection versus editing. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
printf "alpha\nbeta\ngamma\n" > ~/linux-course/04-notes.txt
cat ~/linux-course/04-notes.txt
less ~/linux-course/04-notes.txt
head -n 2 ~/linux-course/04-notes.txt
nano ~/linux-course/04-notes.txt
man grep
```

## Hands-on lab: step-by-step instructions
1. Create a file with ten lines of Linux notes.
2. Use `cat`, `head`, `tail` and `less` to inspect it; record the difference.
3. Open in Nano, add a new line, save with Ctrl+O and exit with Ctrl+X.
4. Open in Vim; press `i`, add a line, press Escape, then `:wq`.
5. Find `grep` options with `man grep` and write down `-n` and `-i`.
6. Capture a screenshot or text transcript of the changed file.

## Expected results / self-check
- [ ] Both editors can save changes successfully
- [ ] You can exit Vim intentionally
- [ ] You know which viewer to use for large logs

## Common mistakes and troubleshooting
- **Watch for:** Being stuck in Vim insert mode.
- **Watch for:** Editing protected files instead of local examples.
- **Watch for:** Expecting `cat` to paginate long output.

## Challenge assignment
Write a one-page comparison of Nano, Vim and less.

## Knowledge check
1. How do you exit Vim without saving?
2. How is `less` different from `cat`?
3. Which command opens manual pages?

## Free documentation and references
- [GNU nano manual](https://www.nano-editor.org/docs.php)
- [Vim user manual](https://vimhelp.org/usr_toc.txt.html)

## What to submit before moving on
- A file named `module-04-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.
