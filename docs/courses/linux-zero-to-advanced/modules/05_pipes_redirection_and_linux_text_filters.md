# Module 05: Pipes, redirection and Linux text filters
**Level:** Beginner  |  **Phase:** Foundations  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 04

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Linux Data Streams — Learn Linux TV](https://www.youtube.com/watch?v=zMKacHGuIHI)
2. [grep command — Learn Linux TV](https://www.youtube.com/watch?v=Tc_jntovCM0)
3. [Full command-line course: redirection](https://www.youtube.com/watch?v=avg65oY7sj4&t=3328s)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Use stdin, stdout and stderr intentionally
- [ ] Chain commands with pipes
- [ ] Search logs and text efficiently
- [ ] Count, sort and deduplicate records

## Detailed lesson checklist
- [ ] **Lesson 1:** `|`, `>`, `>>`, `2>`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** `grep -nEi`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** `sort`, `uniq -c`, `wc -l`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** `cut`, `tr`, `tee`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** Quoting and escaping. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Basic regular expressions. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Avoid accidental truncation. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
printf "ok\nfail\nok\nfail\nok\n" > ~/linux-course/05-events.txt
grep -n "fail" ~/linux-course/05-events.txt
sort ~/linux-course/05-events.txt | uniq -c
wc -l ~/linux-course/05-events.txt
grep "fail" ~/linux-course/05-events.txt | tee ~/linux-course/05-failures.txt
```

## Hands-on lab: step-by-step instructions
1. Generate sample text using the first command and confirm five lines exist.
2. Filter lines containing `fail` and view their numbers.
3. Pipe sorted output into `uniq -c`; explain why sorting matters.
4. Save selected lines into a new report with `tee`.
5. Redirect a deliberately invalid file lookup stderr into `05-errors.txt`.
6. Produce a one-page summary of how each redirect operator behaves.

## Expected results / self-check
- [ ] Count should report five sample lines
- [ ] `uniq -c` correctly aggregates duplicated values
- [ ] Saved reports match expected filtered output

## Common mistakes and troubleshooting
- **Watch for:** Using `>` when you meant `>>`.
- **Watch for:** Forgetting that `uniq` usually requires sorted input.
- **Watch for:** Not quoting patterns that contain spaces.

## Challenge assignment
Count how many distinct words appear in a 20-line sample file.

## Knowledge check
1. What is exit status versus stderr?
2. When should you use `>>`?
3. Why do `sort` and `uniq` often go together?

## Free documentation and references
- [GNU grep manual](https://www.gnu.org/software/grep/manual/grep.html)
- [Missing Semester shell tools](https://missing.csail.mit.edu/2020/shell-tools/)

## What to submit before moving on
- A file named `module-05-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.
