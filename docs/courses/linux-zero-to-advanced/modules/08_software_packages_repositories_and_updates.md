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
