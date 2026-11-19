# Module 19: Advanced Bash, awk, sed, regex and robust scripts
**Level:** Advanced  |  **Phase:** Bash and observability  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 18

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [awk — Learn Linux TV](https://www.youtube.com/watch?v=oPEnvuj9QrI)
2. [sed — Learn Linux TV](https://www.youtube.com/watch?v=nXLnx8ncZyE)
3. [Full course: sed to awk section](https://www.youtube.com/watch?v=avg65oY7sj4&t=22018s)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Parse structured text with awk and sed
- [ ] Handle errors predictably
- [ ] Use functions and temporary files safely
- [ ] Lint and test scripts

## Detailed lesson checklist
- [ ] **Lesson 1:** `awk` fields and patterns. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** `sed` substitution. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Regex anchors/classes. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** `set -euo pipefail` caveats. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** Trap cleanup and mktemp. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** ShellCheck feedback. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Avoid parsing `ls` output. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
printf 'alice,ok\nbob,fail\ncarol,ok\n' > ~/linux-course/19-status.csv
awk -F, '$2=="fail" {print $1}' ~/linux-course/19-status.csv
sed 's/,/ | /g' ~/linux-course/19-status.csv
grep -En '^[a-z]+,(ok|fail)$' ~/linux-course/19-status.csv
command -v shellcheck || true
```

## Hands-on lab: step-by-step instructions
1. Generate a comma-separated three-row sample as shown.
2. Use `awk` to list users whose status is `fail`.
3. Transform the CSV using `sed` but keep the original unchanged.
4. Use `grep -E` to validate row shape.
5. Build `status-report.sh` that verifies file existence, parses rows, prints counts, and exits nonzero on invalid input.
6. Run ShellCheck; fix errors, then add one deliberate edge case (blank line or comma in value) and document the parser limitation.

## Expected results / self-check
- [ ] Correct result for all sample records
- [ ] Invalid input causes clean failure
- [ ] Linter findings addressed or explained

## Common mistakes and troubleshooting
- **Watch for:** Assuming a trivial awk parser handles arbitrary CSV quoting.
- **Watch for:** Using `/tmp/fixed-name` for sensitive temporary files.
- **Watch for:** Using `set -e` without testing errors in pipelines and conditionals.

## Challenge assignment
Add a `--help` option and a simple no-network unit test to your script.

## Knowledge check
1. What does `awk -F,` mean?
2. What is a trap?
3. When is CSV parsing more complex than simple string splitting?

## Free documentation and references
- [Bash FAQ](https://mywiki.wooledge.org/BashFAQ)
- [GNU awk manual](https://www.gnu.org/software/gawk/manual/gawk.html)

## What to submit before moving on
- A file named `module-19-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.
