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
