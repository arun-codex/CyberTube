# Module 07: Linux file permissions, ownership, ACLs and umask
**Level:** Intermediate  |  **Phase:** System administration  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 06

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Understanding file and directory permissions — Learn Linux TV](https://www.youtube.com/watch?v=4e669hSjaX8)
2. [Full command-line course: ACLs](https://www.youtube.com/watch?v=avg65oY7sj4&t=13912s)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Interpret rwx and octal permissions
- [ ] Configure private/shared directories
- [ ] Understand default umask
- [ ] Inspect ACLs, SUID, SGID and sticky bit

## Detailed lesson checklist
- [ ] **Lesson 1:** Owner, group and other. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Symbolic and octal permission notation. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** `chmod`, `chown`, `chgrp`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** File versus directory execute bit. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** `umask` and default permissions. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** ACLs with `getfacl`, `setfacl`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Why world-writable files need review. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
mkdir -p ~/linux-course/07-permissions
touch ~/linux-course/07-permissions/private.txt
chmod 600 ~/linux-course/07-permissions/private.txt
stat -c "%a %U:%G %n" ~/linux-course/07-permissions/private.txt
umask
getfacl ~/linux-course/07-permissions/private.txt
```

## Hands-on lab: step-by-step instructions
1. Create files with modes `600`, `640` and `644`; record and explain them.
2. Create a directory with mode `700` and compare it with `755`.
3. Run `umask` and explain default file permissions.
4. If `getfacl` is unavailable, install the `acl` package only after a package-cache update.
5. In a test folder, use `setfacl -m u:$(whoami):rw` and verify the ACL; do not alter system directories.
6. Write a short access matrix for owner/group/other.

## Expected results / self-check
- [ ] Explain all rwx bits on files and directories
- [ ] Modes displayed by stat match your plan
- [ ] Permissions stay limited to your training directory

## Common mistakes and troubleshooting
- **Watch for:** Confusing octal `755` with decimal 755.
- **Watch for:** Setting `777` instead of understanding ownership.
- **Watch for:** Running chmod recursively on `/etc` or `/home`.

## Challenge assignment
Test how directory execute permission affects traversal using a disposable folder.

## Knowledge check
1. What does chmod 640 mean?
2. What is umask?
3. Why does a directory need execute permission?

## Free documentation and references
- [GNU coreutils chmod manual](https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html)
- [ACL manual](https://man7.org/linux/man-pages/man5/acl.5.html)

## What to submit before moving on
- A file named `module-07-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.
