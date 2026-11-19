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
