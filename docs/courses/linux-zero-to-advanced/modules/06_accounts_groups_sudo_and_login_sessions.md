# Module 06: Accounts, groups, sudo and login sessions
**Level:** Intermediate  |  **Phase:** System administration  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 05

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Managing users — Learn Linux TV](https://www.youtube.com/watch?v=19WOD84JFxA)
2. [Managing groups — Learn Linux TV](https://www.youtube.com/watch?v=GnlgAD8-GhE)
3. [Full command-line course: root and user accounts](https://www.youtube.com/watch?v=avg65oY7sj4&t=6094s)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Explain root privileges and least privilege
- [ ] Inspect UID/GID and Linux account records
- [ ] Create and remove disposable test accounts
- [ ] Understand groups and sudo configuration

## Detailed lesson checklist
- [ ] **Lesson 1:** Root versus unprivileged user. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** UID/GID and account databases. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** `/etc/passwd`, `/etc/shadow`, `/etc/group`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** `useradd`, `adduser`, `usermod`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** `sudo -l` and `visudo` basics. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Password aging. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Login sessions and `last`. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
id
getent passwd "$(whoami)"
groups
sudo -l
getent group sudo
last -n 5
```

## Hands-on lab: step-by-step instructions
1. Inspect your own account and groups before editing anything.
2. In the disposable VM, use `sudo adduser learnerdemo` to create a test account.
3. Use `id learnerdemo` and `getent passwd learnerdemo` to verify creation.
4. Log in to the test account using a separate local terminal session; check its home folder.
5. Discuss why adding every user to the sudo group is poor practice.
6. When finished, remove the demo account using `sudo deluser --remove-home learnerdemo` only after verifying its name and that it contains no data you need.

## Expected results / self-check
- [ ] Can locate user information without exposing password hashes
- [ ] Can explain your sudo privileges
- [ ] Disposable account is created and removed safely

## Common mistakes and troubleshooting
- **Watch for:** Running everyday commands as root.
- **Watch for:** Editing `/etc/sudoers` directly rather than via `visudo`.
- **Watch for:** Removing the wrong account.

## Challenge assignment
Explain what changes when a user belongs to multiple groups.

## Knowledge check
1. What is a UID?
2. Why is sudo preferable to always using root?
3. Where is a list of local accounts stored?

## Free documentation and references
- [Ubuntu users management](https://ubuntu.com/server/docs/user-management)
- [sudo manual](https://www.sudo.ws/docs/man/sudo.man/)

## What to submit before moving on
- A file named `module-06-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.

> **Important:** Administrative labs must be run only inside the disposable VM.
