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
