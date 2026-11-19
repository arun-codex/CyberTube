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
