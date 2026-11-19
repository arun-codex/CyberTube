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
