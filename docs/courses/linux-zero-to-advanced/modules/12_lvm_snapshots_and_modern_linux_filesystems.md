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
