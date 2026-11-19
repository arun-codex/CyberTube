# Module 18: Bash scripting from zero: variables, ifs and loops
**Level:** Intermediate  |  **Phase:** Bash and observability  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 17

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Bash scripting on Linux, Part 1 — Learn Linux TV](https://www.youtube.com/watch?v=2733cRPudvI)
2. [Bash scripting for beginners — freeCodeCamp](https://www.youtube.com/watch?v=tK9Oc6AEnR4)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Write executable shell scripts
- [ ] Pass and validate arguments
- [ ] Use conditional logic and loops
- [ ] Understand quoting and shell exit codes

## Detailed lesson checklist
- [ ] **Lesson 1:** Shebang and permissions. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Variables and command substitution. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** `$1`, `$@`, `$?`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** `if`, `case`, `for`, `while`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** Functions and return values. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Single versus double quotes. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Shell script comments. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
mkdir -p ~/linux-course/18-bash
cat > ~/linux-course/18-bash/hello.sh <<'EOF'
#!/usr/bin/env bash
printf 'hello %s\n' "$USER"
EOF
chmod +x ~/linux-course/18-bash/hello.sh
bash -n ~/linux-course/18-bash/hello.sh
~/linux-course/18-bash/hello.sh
```

## Hands-on lab: step-by-step instructions
1. Watch the introductory Bash video and type examples yourself.
2. Write `hello.sh` in Nano rather than copying complex snippets blindly.
3. Add a required username argument and print an error when it is missing.
4. Add a `for` loop that prints three planned directories.
5. Add a function that checks whether an input file exists; return success/failure appropriately.
6. Run `bash -n` for syntax validation and add comments explaining each branch.

## Expected results / self-check
- [ ] Script runs with proper execute permissions
- [ ] Missing arguments produce an actionable error
- [ ] Variables with spaces are handled safely

## Common mistakes and troubleshooting
- **Watch for:** Unquoted variable expansion.
- **Watch for:** Not checking a command return code.
- **Watch for:** Using sudo inside scripts unnecessarily.

## Challenge assignment
Write a small script that summarizes how many files are in a directory passed as an argument.

## Knowledge check
1. Why use `#!/usr/bin/env bash`?
2. What does `$?` mean?
3. Why quote `"$variable"`?

## Free documentation and references
- [GNU Bash manual](https://www.gnu.org/software/bash/manual/)
- [ShellCheck](https://www.shellcheck.net/)

## What to submit before moving on
- A file named `module-18-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.

> **Important:** If a sample script from a video is outdated or fails, diagnose it rather than blindly running it with root privileges.
