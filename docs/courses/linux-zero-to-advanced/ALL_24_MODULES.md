# Complete Linux Course — All 24 Modules in One Markdown File

For navigation, use the individual files and `README.md` too.


---

# Module 01: Linux basics, distributions and a safe lab
**Level:** Beginner  |  **Phase:** Foundations  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** None

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [What is a Linux distribution? — Learn Linux TV](https://www.youtube.com/watch?v=6EKzuBAEbOA)
2. [Linux for Hackers EP1 — NetworkChuck](https://www.youtube.com/watch?v=VbEx7B_PTOE)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Explain kernel, distribution, shell and terminal
- [ ] Install an Ubuntu VM without replacing the host OS
- [ ] Navigate a Linux desktop and locate the terminal
- [ ] Collect baseline system information

## Detailed lesson checklist
- [ ] **Lesson 1:** Kernel and GNU userland. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Ubuntu, Debian, Fedora and Kali differences. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Virtual machines and host versus guest. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** ISO, RAM, virtual disks and snapshots. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** Terminal versus shell. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** What home directory means. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Why admin access must be limited. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
uname -a
cat /etc/os-release
whoami
hostnamectl
pwd
echo "$SHELL"
```

## Hands-on lab: step-by-step instructions
1. Download Ubuntu Desktop only from its official site and VirtualBox from the official download page.
2. Create a new VM with at least 2 vCPUs, 4 GiB RAM if available, and a 25 GiB dynamically allocated virtual disk. Do not select your real computer drive as the installation target.
3. Install Ubuntu in the virtual disk; keep networking in NAT mode initially.
4. Open the terminal (Ctrl+Alt+T) and execute every command listed in the command table.
5. Create a VM snapshot called `linux-week-01-clean`.
6. Create `~/linux-course/01-setup/` and write your Ubuntu version, username, date and VM settings to `system-info.md`.

## Expected results / self-check
- [ ] Ubuntu boots normally without changing the host operating system
- [ ] `/etc/os-release` displays your Linux distribution
- [ ] A working VM snapshot and setup notes exist

## Common mistakes and troubleshooting
- **Watch for:** Confusing an ISO file with an installed operating system.
- **Watch for:** Giving the VM nearly all host RAM and freezing the computer.
- **Watch for:** Running random scripts with sudo during setup.

## Challenge assignment
Explain in your own words what would change if you used Fedora instead of Ubuntu.

## Knowledge check
1. What does a kernel do?
2. How is a virtual machine different from dual boot?
3. Why is Kali not required to learn Linux fundamentals?

## Free documentation and references
- [Ubuntu download](https://ubuntu.com/download/desktop)
- [VirtualBox download](https://www.virtualbox.org/wiki/Downloads)
- [Ubuntu VirtualBox tutorial](https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox)

## What to submit before moving on
- A file named `module-01-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.


---

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


---

# Module 03: Files, directories, links and search
**Level:** Beginner  |  **Phase:** Foundations  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 02

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [The find command — Learn Linux TV](https://www.youtube.com/watch?v=skTiK_6DdqU)
2. [Full command-line course: files and directories](https://www.youtube.com/watch?v=avg65oY7sj4&t=1888s)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Create, organize and rename files safely
- [ ] Search by path and metadata
- [ ] Understand symbolic links and file types
- [ ] Avoid risky recursive deletion

## Detailed lesson checklist
- [ ] **Lesson 1:** `touch`, `mkdir`, `cp`, `mv`, `rm`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Globs (`*`, `?`). Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Safe trash and careful deletion. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** `find` predicates. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** File metadata via `stat` and `file`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Hard links versus symlinks. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** File timestamps. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
mkdir -p ~/linux-course/03-files/{original,archive}
touch ~/linux-course/03-files/original/a.txt
cp ~/linux-course/03-files/original/a.txt ~/linux-course/03-files/archive/
find ~/linux-course/03-files -type f
stat ~/linux-course/03-files/original/a.txt
ln -s ~/linux-course/03-files/original/a.txt ~/linux-course/03-files/link.txt
```

## Hands-on lab: step-by-step instructions
1. Run the commands above in your home folder only.
2. Create five additional files, copy two, and rename one.
3. Add a symlink and observe `ls -l` output; move the target to see what happens.
4. Use `find` to list all `.txt` files and identify files modified today.
5. Compare `stat` timestamps before and after editing a file.
6. Move unnecessary test files to an archive folder instead of using destructive removal.

## Expected results / self-check
- [ ] Directory tree contains both original and archive files
- [ ] Search returns only intended sample files
- [ ] You can explain when a symlink becomes broken

## Common mistakes and troubleshooting
- **Watch for:** Using `rm -rf` without checking the path.
- **Watch for:** Thinking a symlink is a duplicate file.
- **Watch for:** Forgetting quotes for filenames with spaces.

## Challenge assignment
Find files over 1 KiB inside your own course folder, without searching the entire system.

## Knowledge check
1. What does `find -type f` do?
2. Why is `rm -rf /` unsafe?
3. What is the difference between copy and symlink?

## Free documentation and references
- [GNU find manual](https://www.gnu.org/software/findutils/manual/html_mono/find.html)
- [Linux Command Line book](https://linuxcommand.org/tlcl.php)

## What to submit before moving on
- A file named `module-03-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.


---

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


---

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


---

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


---

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


---

# Module 08: Software packages, repositories and updates
**Level:** Intermediate  |  **Phase:** System administration  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 07

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [The apt command — Learn Linux TV](https://www.youtube.com/watch?v=1kicKTbK768)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Understand Linux package managers
- [ ] Install and remove software responsibly
- [ ] Identify software versions and repositories
- [ ] Explain package update versus upgrade

## Detailed lesson checklist
- [ ] **Lesson 1:** APT and dpkg on Ubuntu. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** DNF on Fedora/RHEL. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Package metadata and dependencies. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Trusted software repositories. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** `apt update` versus `apt upgrade`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Package holds and installed versions. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Why unreviewed install scripts are risky. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
apt --version
apt list --installed | head
apt-cache policy bash
dpkg -s bash
sudo apt update
apt list --upgradable
```

## Hands-on lab: step-by-step instructions
1. List 10 installed packages and their installed versions.
2. Update the APT metadata database in your disposable VM.
3. Use `apt-cache policy` to inspect which repository provides a package.
4. Install a harmless optional package such as `tree` using `sudo apt install tree` after reviewing the apt prompt.
5. Use `tree ~/linux-course` to inspect your notes directory.
6. Remove optional test software only after confirming the package name.

## Expected results / self-check
- [ ] APT metadata refresh completes successfully
- [ ] Can trace which repository offers a package
- [ ] Can differentiate metadata updates from package upgrades

## Common mistakes and troubleshooting
- **Watch for:** Pasting curl-pipe-bash installation commands.
- **Watch for:** Removing essential packages to clean the system.
- **Watch for:** Assuming Kali and Ubuntu use identical update practices.

## Challenge assignment
Compare how Ubuntu APT and Fedora DNF name their equivalent operations.

## Knowledge check
1. What is a repository?
2. What does `sudo apt update` update?
3. What is package dependency resolution?

## Free documentation and references
- [Ubuntu package management](https://ubuntu.com/server/docs/package-management)
- [APT documentation](https://wiki.debian.org/Apt)

## What to submit before moving on
- A file named `module-08-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.


---

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


---

# Module 10: systemd, services and Linux boot lifecycle
**Level:** Intermediate  |  **Phase:** System administration  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 09

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [systemctl and systemd — Learn Linux TV](https://www.youtube.com/watch?v=5JVBpXiYMKo)
2. [journalctl basics — Learn Linux TV](https://www.youtube.com/watch?v=0dG3vUYt7Uk)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Explain Linux boot stages at a high level
- [ ] Inspect unit files and dependencies
- [ ] Start and stop an isolated training service
- [ ] Use journalctl to diagnose service failures

## Detailed lesson checklist
- [ ] **Lesson 1:** Firmware to bootloader to kernel to init. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** systemd units: service, target, timer. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** `systemctl status`, `list-unit-files`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Enable versus start. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** Dependencies and ordering. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Service restart policies. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Reading unit logs. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
systemctl --version
systemctl list-units --type=service --no-pager | head
systemctl status cron --no-pager
systemctl cat cron
journalctl -u cron -n 15 --no-pager
systemd-analyze
```

## Hands-on lab: step-by-step instructions
1. Identify the active system manager and its version.
2. List active services and choose one low-risk service to inspect.
3. Read its unit definition via `systemctl cat`.
4. Use `journalctl -u` to inspect recent events.
5. If the cron service exists, inspect its status; do not stop SSH or other connectivity services.
6. Explain how to determine whether a service starts automatically on reboot.

## Expected results / self-check
- [ ] Identify a unit file path and status
- [ ] Explain start versus enable
- [ ] Find related logs without editing services

## Common mistakes and troubleshooting
- **Watch for:** Disabling a service without checking system impact.
- **Watch for:** Assuming service names match across all distributions.
- **Watch for:** Editing packaged unit files in `/usr/lib` or `/lib` directly.

## Challenge assignment
Create a harmless user-level oneshot service that writes a timestamp into your home folder.

## Knowledge check
1. What is PID 1?
2. How does enable differ from start?
3. Which command shows a service log?

## Free documentation and references
- [systemd documentation](https://www.freedesktop.org/software/systemd/man/latest/)
- [Ubuntu systemd reference](https://ubuntu.com/server/docs/service-management)

## What to submit before moving on
- A file named `module-10-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.


---

# Module 11: Disks, filesystems, partitions and mounting
**Level:** Intermediate  |  **Phase:** Storage and automation  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 10

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Formatting and mounting disks — Learn Linux TV](https://www.youtube.com/watch?v=2Z6ouBYfZr8)
2. [Full command-line course: partitions and fdisk](https://www.youtube.com/watch?v=avg65oY7sj4&t=53990s)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Inspect block devices without changing them
- [ ] Interpret df, du, UUID and fstab
- [ ] Understand ext4 and XFS basics
- [ ] Mount a dedicated disposable lab disk safely

## Detailed lesson checklist
- [ ] **Lesson 1:** Device files and block storage. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** MBR/GPT overview. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** `lsblk`, `blkid`, `df`, `du`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Mount points and UUIDs. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** `/etc/fstab` and options. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Filesystems and inodes. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Distinguishing a virtual disk from host storage. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
lsblk -f
df -hT
du -sh ~/linux-course
findmnt /
cat /proc/mounts | head
mount | head
```

## Hands-on lab: step-by-step instructions
1. Inspect all current block devices and identify the root filesystem by mount point.
2. Record disk use and available capacity using `df -hT`.
3. Find your course folder size with `du -sh`.
4. Read `/etc/fstab` without editing it; identify UUID or device references.
5. If available, attach a NEW empty additional virtual disk in VirtualBox and take a snapshot.
6. Perform formatting/mounting only on this disposable extra disk after confirming its device identity with `lsblk`; never follow a tutorial blindly on your host disk.

## Expected results / self-check
- [ ] Can explain root filesystem versus mount point
- [ ] Can read `df` and `du` outputs
- [ ] No existing data disk was reformatted

## Common mistakes and troubleshooting
- **Watch for:** Running mkfs or fdisk on the wrong disk.
- **Watch for:** Assuming `/dev/sdb` always points to the same disk.
- **Watch for:** Changing fstab without a recovery snapshot.

## Challenge assignment
Explain how mounting by UUID is more robust than device letters.

## Knowledge check
1. What does lsblk show?
2. Why does df differ from du?
3. What is a mount point?

## Free documentation and references
- [ArchWiki fstab](https://wiki.archlinux.org/title/Fstab)
- [man7 mount](https://man7.org/linux/man-pages/man8/mount.8.html)

## What to submit before moving on
- A file named `module-11-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.

> **Important:** STORAGE SAFETY: Do not copy any `mkfs`, `fdisk`, or destructive disk command until you have created a separate empty lab virtual disk and verified its identifier.


---

# Module 12: LVM, snapshots and modern Linux filesystems
**Level:** Advanced  |  **Phase:** Storage and automation  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 11

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Linux Logical Volume Manager Deep Dive — Learn Linux TV](https://www.youtube.com/watch?v=MeltFN-bXrQ)
2. [Long command-line course: LVM](https://www.youtube.com/watch?v=avg65oY7sj4&t=56158s)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Explain PV, VG and LV
- [ ] Understand storage resizing and snapshots
- [ ] Compare ext4, XFS, ZFS and Btrfs concepts
- [ ] Practice LVM operations only with disposable storage

## Detailed lesson checklist
- [ ] **Lesson 1:** Physical volumes and volume groups. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Logical volumes and extents. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Filesystem growth versus logical-volume growth. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Snapshots and rollback limitations. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** RAID concepts. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** ZFS and Btrfs features. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Backup versus snapshot. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
lsblk -f
pvs
vgs
lvs
findmnt -T /
df -Th
```

## Hands-on lab: step-by-step instructions
1. Watch the LVM tutorial before changing any storage.
2. Run read-only LVM inspection commands; record if your system has no LVM.
3. On a disposable dedicated virtual disk, draw a plan showing a PV, VG and two LVs.
4. If comfortable, follow the tutorial inside a new throwaway VM to create LVs and a filesystem.
5. Test expansion and snapshot concepts in the disposable VM only.
6. Write how an LVM snapshot differs from an off-machine backup.

## Expected results / self-check
- [ ] Can explain PV→VG→LV without notes
- [ ] Can identify whether your VM uses LVM
- [ ] No real or production disk was modified

## Common mistakes and troubleshooting
- **Watch for:** Treating a snapshot as a backup.
- **Watch for:** Modifying the active root volume without a recovery plan.
- **Watch for:** Formatting a device based on guessed /dev letters.

## Challenge assignment
Compare filesystem snapshots with versioned off-site backups.

## Knowledge check
1. What is a volume group?
2. Does LVM provide a complete backup?
3. What must grow after expanding an LV?

## Free documentation and references
- [Ubuntu LVM](https://documentation.ubuntu.com/server/how-to/storage/manage-logical-volumes/)
- [Btrfs documentation](https://btrfs.readthedocs.io/en/latest/)

## What to submit before moving on
- A file named `module-12-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.

> **Important:** Any destructive LVM commands belong on a dedicated disposable disk in a VM only.


---

# Module 13: Archiving, compression, backups and rsync
**Level:** Intermediate  |  **Phase:** Storage and automation  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 12

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [tar and gzip tutorial — Learn Linux TV](https://www.youtube.com/watch?v=2iwumBcfd58)
2. [rsync tutorial — Learn Linux TV](https://www.youtube.com/watch?v=KG78O53u8rY)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Create and inspect tar archives
- [ ] Use compression appropriately
- [ ] Make repeatable local backups
- [ ] Verify restore integrity and document recovery

## Detailed lesson checklist
- [ ] **Lesson 1:** Archive versus compressed file. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** tar and gzip/xz. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Incremental copying using rsync. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Exclusion patterns. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** Backup naming and retention. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Checksums and file integrity. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Restore testing. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
mkdir -p ~/linux-course/13-backups
tar -czf ~/linux-course/13-backups/course.tar.gz -C ~ linux-course/01-setup
tar -tzf ~/linux-course/13-backups/course.tar.gz | head
rsync -av --dry-run ~/linux-course/02-navigation/ ~/linux-course/13-backups/navigation/
sha256sum ~/linux-course/13-backups/course.tar.gz
```

## Hands-on lab: step-by-step instructions
1. Create a tar.gz of one existing course module directory.
2. List archive contents without extracting.
3. Run an rsync `--dry-run` to a second local folder.
4. Run the real rsync after reviewing the proposed operations; do not use `--delete` in this lab.
5. Restore the tar archive into a new empty directory, not over existing notes.
6. Compare restored file content and record a SHA-256 checksum.

## Expected results / self-check
- [ ] Archive lists expected files
- [ ] Restored content matches source
- [ ] Rsync dry run explains intended copies

## Common mistakes and troubleshooting
- **Watch for:** Not testing restores.
- **Watch for:** Using `rsync --delete` on the wrong destination.
- **Watch for:** Forgetting the trailing slash meaning in rsync paths.

## Challenge assignment
Write a 3-2-1 backup strategy for your learning notes.

## Knowledge check
1. How is tar different from gzip?
2. Why is a restore test necessary?
3. What does rsync `--dry-run` do?

## Free documentation and references
- [rsync documentation](https://rsync.samba.org/documentation.html)
- [GNU tar manual](https://www.gnu.org/software/tar/manual/)

## What to submit before moving on
- A file named `module-13-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.


---

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


---

# Module 15: IP addressing, routes, DNS and Linux network commands
**Level:** Intermediate  |  **Phase:** Networking and automation  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 14

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [ip command — Learn Linux TV](https://www.youtube.com/watch?v=wHfIFZlDxtU)
2. [ss command — Learn Linux TV](https://www.youtube.com/watch?v=phY8Q7Woxsw)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Explain interface and address information
- [ ] Read routing and DNS information
- [ ] Inspect listening ports and established sockets
- [ ] Troubleshoot a simple DNS or connectivity issue

## Detailed lesson checklist
- [ ] **Lesson 1:** Loopback and Ethernet interfaces. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** IPv4 CIDR basics. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Routing table and default gateway. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** DNS resolvers and `dig`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** TCP/UDP sockets via `ss`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** `ping` and `tracepath`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** NetworkManager and systemd-resolved overview. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
ip -br addr
ip route
resolvectl status
ss -tulpen
dig example.com
ping -c 3 1.1.1.1
```

## Hands-on lab: step-by-step instructions
1. Inspect assigned interfaces and write down your VM IP address and default gateway.
2. Use `ip route` to identify the default route.
3. Use `resolvectl status` or `/etc/resolv.conf` to inspect DNS settings.
4. Query `example.com` with `dig` and distinguish DNS success from ICMP success.
5. List listening ports with `ss -tulpen` and identify local processes where permitted.
6. Disable the virtual NIC temporarily in the VM GUI, observe command failures, then restore it.

## Expected results / self-check
- [ ] Identify active interface, IP, route and resolver
- [ ] Explain a listening versus established socket
- [ ] Restore connectivity after the lab

## Common mistakes and troubleshooting
- **Watch for:** Equating DNS failure with all network failure.
- **Watch for:** Assuming ping must work for a service to work.
- **Watch for:** Changing network settings on your host instead of VM.

## Challenge assignment
Explain the difference between a local interface address and the default gateway.

## Knowledge check
1. What is a default route?
2. What does `ss -l` show?
3. Why might ping fail when HTTPS works?

## Free documentation and references
- [ip-route2 manpages](https://man7.org/linux/man-pages/man8/ip.8.html)
- [Ubuntu networking](https://ubuntu.com/server/docs/network-configuration)

## What to submit before moving on
- A file named `module-15-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.


---

# Module 16: OpenSSH administration, keys and secure file transfer
**Level:** Intermediate  |  **Phase:** Networking and automation  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 15

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Public key authentication — Learn Linux TV](https://www.youtube.com/watch?v=bfwfRCCFTVI)
2. [scp command — Learn Linux TV](https://www.youtube.com/watch?v=Aa7tKMmeFZI)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Use SSH for remote Linux shell access
- [ ] Distinguish password and public-key authentication
- [ ] Transfer files securely with scp and sftp
- [ ] Inspect SSH service configuration and logs

## Detailed lesson checklist
- [ ] **Lesson 1:** SSH client/server roles. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Host keys and known_hosts. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Private/public key pairs. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** `authorized_keys` and correct permissions. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** `ssh -v` troubleshooting. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** SCP/SFTP file transfer. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Avoid exposing SSH unnecessarily. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
ssh -V
ssh-keygen -t ed25519 -f ~/linux-course/16-labkey
ls -l ~/linux-course/16-labkey*
systemctl status ssh --no-pager
ss -tln | grep :22 || true
```

## Hands-on lab: step-by-step instructions
1. Use two disposable Linux VMs or localhost; install `openssh-server` only if needed.
2. Generate a **disposable practice key** in your course folder; do not overwrite an existing real key.
3. Confirm the SSH daemon is listening; inspect `/etc/ssh/sshd_config` read-only.
4. Copy only the public key to an authorized test account using `ssh-copy-id` or manual practice.
5. Connect over SSH and use `scp` to transfer a harmless text file.
6. Record how file permissions protect the private key and how to revoke a test key.

## Expected results / self-check
- [ ] SSH session uses the expected target VM
- [ ] Transferred file has correct contents
- [ ] Private key never included in submitted screenshots or reports

## Common mistakes and troubleshooting
- **Watch for:** Publishing a private key in GitHub.
- **Watch for:** Disabling password authentication before confirming key access.
- **Watch for:** Changing production SSH settings without console fallback.

## Challenge assignment
Explain how to verify an SSH host key fingerprint securely.

## Knowledge check
1. Which key is secret?
2. What is known_hosts?
3. What is the difference between scp and rsync over SSH?

## Free documentation and references
- [OpenSSH documentation](https://www.openssh.com/manual.html)
- [Ubuntu OpenSSH server](https://ubuntu.com/server/docs/service-openssh)

## What to submit before moving on
- A file named `module-16-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.


---

# Module 17: Linux host firewalls with UFW
**Level:** Intermediate  |  **Phase:** Networking and automation  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 16

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [UFW Made Easy — Learn Linux TV](https://www.youtube.com/watch?v=F-ubkT1WNFk)
2. [ss command — Learn Linux TV](https://www.youtube.com/watch?v=phY8Q7Woxsw)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Explain inbound versus outbound policy
- [ ] Inspect UFW configuration
- [ ] Test least-privilege access to a lab service
- [ ] Understand how to avoid SSH lockouts

## Detailed lesson checklist
- [ ] **Lesson 1:** Netfilter/nftables concepts. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** UFW interface on Ubuntu. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Allow/deny rules. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Default inbound policy. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** Rules by port and source. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Firewall logging. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Testing and rollback. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
sudo ufw status verbose
ss -tulpen
sudo ufw show added
sudo ufw status numbered
sudo journalctl -k -n 20 --no-pager
```

## Hands-on lab: step-by-step instructions
1. Take a VM snapshot and confirm you have access to the VM console.
2. Inspect listening services with `ss` before enabling the firewall.
3. Watch the UFW tutorial and write intended allow rules for the actual local lab services.
4. If testing SSH remotely, allow its required test connection BEFORE enabling a deny-by-default inbound policy.
5. Enable and test UFW in a disposable VM only; validate that desired traffic is allowed and unwanted access is denied.
6. Document every rule and either reset the disposable VM snapshot or leave the correct known-safe configuration in place.

## Expected results / self-check
- [ ] Firewall status is documented before and after
- [ ] Expected services remain available
- [ ] Unnecessary inbound connectivity is blocked within lab

## Common mistakes and troubleshooting
- **Watch for:** Locking yourself out of a remote VM.
- **Watch for:** Assuming disabling UFW removes all firewall layers.
- **Watch for:** Using broad allow-any rules without a reason.

## Challenge assignment
Recreate a small ruleset from a written network access policy.

## Knowledge check
1. What is default deny inbound?
2. Why test firewall changes from the console?
3. How does UFW relate to netfilter?

## Free documentation and references
- [Ubuntu firewall documentation](https://ubuntu.com/server/docs/firewalls)
- [nftables wiki](https://wiki.nftables.org/wiki-nftables/index.php/Main_Page)

## What to submit before moving on
- A file named `module-17-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.

> **Important:** FIREWALL SAFETY: Use a VM snapshot and console access; never apply untested deny rules to a production or remotely managed machine.


---

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


---

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


---

# Module 20: Linux logging: journald, syslog and logrotate
**Level:** Advanced  |  **Phase:** Bash and observability  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 19

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Understanding Linux Logging — Learn Linux TV](https://www.youtube.com/watch?v=6uP_f_z3CbM)
2. [journalctl Basics — Learn Linux TV](https://www.youtube.com/watch?v=0dG3vUYt7Uk)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Find system and service logs
- [ ] Filter by unit, time and priority
- [ ] Understand journald versus text log files
- [ ] Produce a repeatable log review report

## Detailed lesson checklist
- [ ] **Lesson 1:** systemd-journald. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Syslog daemon concepts. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** `journalctl -b`, `-u`, `--since`, `-p`. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Log retention and rotation. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** Timestamps and UTC. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Auth and sudo events. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Rootless versus privileged log access. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
journalctl -b -n 20 --no-pager
journalctl -p warning --since today --no-pager
journalctl --disk-usage
ls -la /var/log | head
systemctl status systemd-journald --no-pager
```

## Hands-on lab: step-by-step instructions
1. Inspect boot logs without modifying them.
2. Filter journal messages to only warning and higher priority for the current day.
3. Inspect logs for a known unit (for example cron or ssh if installed).
4. Record time zone and explain why comparisons across hosts may be confusing.
5. Identify whether `/var/log/auth.log` exists on your distribution; if absent, use the journal or relevant platform logging.
6. Write a summary with five noteworthy but non-sensitive service events and their timestamps.

## Expected results / self-check
- [ ] Can find logs by unit and time
- [ ] Can explain where authentication records may be stored
- [ ] No secrets or private key material in the report

## Common mistakes and troubleshooting
- **Watch for:** Assuming `/var/log/auth.log` exists on every Linux distro.
- **Watch for:** Treating every warning as an attack.
- **Watch for:** Sharing full logs containing personal identifiers.

## Challenge assignment
Compare how persistent and volatile journald storage differ.

## Knowledge check
1. What does `journalctl -b` show?
2. What is logrotate used for?
3. Why do timestamps matter in incident review?

## Free documentation and references
- [journalctl manual](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html)
- [logrotate manual](https://man7.org/linux/man-pages/man8/logrotate.8.html)

## What to submit before moving on
- A file named `module-20-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.


---

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


---

# Module 22: Linux storage encryption with LUKS (advanced lab)
**Level:** Advanced  |  **Phase:** Advanced Linux operations  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 21

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Linux Command Line complete course: LUKS chapter](https://www.youtube.com/watch?v=avg65oY7sj4&t=68405s)
2. [Same video: cryptsetup CLI LUKS lesson](https://www.youtube.com/watch?v=avg65oY7sj4&t=68904s)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Explain at-rest disk encryption
- [ ] Understand dm-crypt and LUKS concepts
- [ ] Inspect an encrypted test volume safely
- [ ] Document unlock, mount and recovery principles

## Detailed lesson checklist
- [ ] **Lesson 1:** Block encryption versus file encryption. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** LUKS headers and keys. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** cryptsetup concepts. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Unlock versus mount. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** Backup and recovery key concepts. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Why encryption does not replace backups. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Protecting passphrases and header backups. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
lsblk -f
findmnt -T /
command -v cryptsetup || true
cryptsetup --help | head
```

## Hands-on lab: step-by-step instructions
1. Watch the LUKS chapter in the full Linux video before any hands-on steps.
2. Take a VM snapshot and add a brand-new blank secondary virtual disk (or create a controlled file-backed test device with an instructor).
3. Use read-only `lsblk` to verify which disk is disposable; write down its ID and size.
4. Follow the video for encryption only after verifying you are NOT selecting the operating system disk.
5. Practice unlocking and mounting inside the disposable VM; place one harmless sample file on the test filesystem.
6. Un-mount/close the volume carefully and document how loss of credentials could affect recovery.

## Expected results / self-check
- [ ] Can explain LUKS and dm-crypt in plain terms
- [ ] Can distinguish unlocked block device from mounted filesystem
- [ ] Disks with existing data were never targeted

## Common mistakes and troubleshooting
- **Watch for:** Encrypting the wrong partition.
- **Watch for:** Storing a recovery passphrase in public notes.
- **Watch for:** Assuming encryption can recover data after deletion.

## Challenge assignment
Compare LUKS full-disk encryption with application-layer file encryption.

## Knowledge check
1. What does LUKS protect against?
2. Does a mounted unlocked volume remain encrypted to current processes?
3. Why do you need a backup?

## Free documentation and references
- [cryptsetup documentation](https://gitlab.com/cryptsetup/cryptsetup/-/wikis/home)
- [ArchWiki dm-crypt](https://wiki.archlinux.org/title/Dm-crypt/Encrypting_an_entire_system)

## What to submit before moving on
- A file named `module-22-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.

> **Important:** CAUTION: Encryption destroys data when applied to an existing filesystem. Use ONLY a disposable dedicated lab volume and confirm its identity twice.


---

# Module 23: Linux server hardening, auditing and access review
**Level:** Advanced  |  **Phase:** Advanced Linux operations  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 22

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [UFW security guide — Learn Linux TV](https://www.youtube.com/watch?v=F-ubkT1WNFk)
2. [Public key authentication — Learn Linux TV](https://www.youtube.com/watch?v=bfwfRCCFTVI)
3. [Linux logging — Learn Linux TV](https://www.youtube.com/watch?v=6uP_f_z3CbM)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Create a practical Linux hardening checklist
- [ ] Audit users, services, permissions and firewall exposure
- [ ] Check patch posture and SSH settings
- [ ] Document an evidence-based remediation plan

## Detailed lesson checklist
- [ ] **Lesson 1:** Asset inventory and baseline. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Package updates and reboot planning. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** Least-privilege accounts. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Secure OpenSSH settings. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** UFW rule review. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Logging and integrity. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Review of world-writable paths on lab scope. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
uname -r
apt list --upgradable 2>/dev/null | head
getent passwd | tail -n 5
ss -tulpn
sudo ufw status verbose
systemctl list-unit-files --state=enabled --no-pager | head
```

## Hands-on lab: step-by-step instructions
1. Clone your Ubuntu VM or take a snapshot before any changes.
2. Create a simple inventory of distro, version, accounts, listening ports, packages and active services.
3. Compare actual configuration to a written baseline: no unnecessary public services, up-to-date packages, strong account separation and usable logs.
4. Review SSH configuration read-only; plan a key-based login and a safe rollback path.
5. Review UFW rules and test from a second lab VM only.
6. Apply low-risk changes in the disposable VM and record before/after evidence, including any issue you could not resolve.

## Expected results / self-check
- [ ] A 10-item hardening checklist is completed
- [ ] Every configuration change has a rollback note
- [ ] Authorized access still works after changes

## Common mistakes and troubleshooting
- **Watch for:** Applying CIS benchmark commands blindly.
- **Watch for:** Disabling SSH before validating alternative access.
- **Watch for:** Treating a scanner warning as certain evidence of compromise.

## Challenge assignment
Build a small script that prints read-only baseline checks into a dated report.

## Knowledge check
1. What is least privilege?
2. Why should hardening be incremental?
3. How do you verify a security improvement?

## Free documentation and references
- [Ubuntu security documentation](https://documentation.ubuntu.com/security/)
- [OpenSSH security manual](https://www.openssh.com/manual.html)

## What to submit before moving on
- A file named `module-23-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.

> **Important:** Keep the scope to your own disposable VM. Avoid treating this as penetration testing against external hosts.


---

# Module 24: Final Linux administration and security capstone
**Level:** Advanced  |  **Phase:** Capstone  |  **Suggested duration:** 1 week (9–12 hours)  |  **Prerequisite:** Module 23

## Exact YouTube learning videos (free to view)
Watch the links in order. These are direct video URLs; a timestamp on a full-length course points to the matching chapter. Pause frequently and reproduce the demonstration in your own Ubuntu VM.
1. [Linux troubleshooting — Learn Linux TV](https://www.youtube.com/watch?v=GPF5lrY9YJY)
2. [Linux systemd services — Learn Linux TV](https://www.youtube.com/watch?v=5JVBpXiYMKo)
3. [Linux Command Line Entire Tutorial Series — review](https://www.youtube.com/watch?v=avg65oY7sj4)

**Full supplementary playlist:** [Learn Linux TV — Linux Crash Course](https://www.youtube.com/playlist?list=PLT98CRl2KxKHKd_tH3ssq0HPrThx2hESW) and [tutoriaLinux — Linux Sysadmin Basics](https://www.youtube.com/playlist?list=PLtK75qxsQaMLZSo7KL-PmiRarU7hrpnwK).

## Learning objectives
- [ ] Build and maintain a documented Linux server VM
- [ ] Demonstrate all core commands without watching the screen
- [ ] Write reusable admin scripts and troubleshooting reports
- [ ] Present secure and reversible configuration choices

## Detailed lesson checklist
- [ ] **Lesson 1:** VM architecture and snapshot strategy. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 2:** Users and access. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 3:** File permissions. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 4:** Package and service management. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 5:** SSH and UFW. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 6:** Logging and scheduled jobs. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 7:** Backups and restoration. Write down the definition, run one relevant command, and explain its output.
- [ ] **Lesson 8:** Performance and troubleshooting. Write down the definition, run one relevant command, and explain its output.

## Commands to practise
Run only the commands you understand and review paths/arguments first. Do not use root access for practice unless specifically required by the lab.
```bash
uname -a
id
findmnt /
systemctl --failed --no-pager
ss -tulpen
journalctl -b -p warning -n 20 --no-pager
df -hT
free -h
```

## Hands-on lab: step-by-step instructions
1. Start with a fresh disposable Ubuntu Server or Desktop VM and take an initial snapshot.
2. Create a limited user account and a private training folder, documenting permissions.
3. Apply updates after reviewing the proposed package changes.
4. Configure one permitted test service; enable SSH key access only after testing with a spare session.
5. Document inbound firewall rules and test from an authorized second VM.
6. Write one backup script and a temporary scheduled run; confirm that a restore works.
7. Generate a read-only system health report and investigate one simulated service failure from journal logs.
8. Submit `README.md`, `architecture.md`, `commands.md`, `backup-test.md`, `hardening.md`, and `troubleshooting.md` with screenshots that contain no credentials.

## Expected results / self-check
- [ ] Build can be repeated from written instructions
- [ ] One backup has been restored and compared
- [ ] The server retains expected connectivity after hardening
- [ ] You can explain and defend each administrative change

## Common mistakes and troubleshooting
- **Watch for:** Demonstrating only screenshots without executable documentation.
- **Watch for:** Leaving temporary cron tasks and test accounts behind.
- **Watch for:** Pushing secrets or private keys to a public repository.

## Challenge assignment
Add an optional separate container lesson from Learn Linux TV after finishing the core Linux course.

## Knowledge check
1. What is the single largest operational risk in your configuration?
2. How would you recover after a failed firewall change?
3. Which monitoring evidence would tell you a service stopped unexpectedly?

## Free documentation and references
- [Ubuntu Server documentation](https://documentation.ubuntu.com/server/)
- [Linux Command Line book](https://linuxcommand.org/tlcl.php)

## What to submit before moving on
- A file named `module-24-notes.md` containing the commands and your explanations.
- A copy of your lab results or sanitized terminal transcript (no passwords, tokens or private keys).
- Answers to all three knowledge-check questions.
- A short reflection: what failed, why, and how you corrected it.

**Completion rule:** Watch the assigned video(s), independently perform the lab, satisfy all expected results, and explain the important commands without referring to the video.

> **Important:** Success means a documented, reproducible, secure **Linux** environment. No Windows, Kali attack tools or unrelated cybersecurity domains are required.
