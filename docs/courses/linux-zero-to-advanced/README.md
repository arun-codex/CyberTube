# Linux Zero → Advanced: Complete Video Course (Markdown Edition)

## Read this first
**Scope: Linux ONLY.** This course covers installing, using, administering, troubleshooting and securing Linux systems. It deliberately does not add generic SOC, Kali hacking, Windows, cloud certification or penetration-testing modules. Advanced Linux security and hardening are included because they are part of Linux administration.

**Duration:** 24 modules × 1 week = 24 weeks at roughly 1.5–2 hours/day for 6 days a week (9–12 hours/week). Learn at your own speed.

**Price:** YouTube videos and linked reading are free to view; avoid paid upgrades. Running VMs requires a computer you already have. Online videos may change or become unavailable.

## What is inside this folder
- `README.md` — this introduction and clickable module index.
- `LAB_SETUP.md` — build a safe virtual Linux lab, step by step.
- `VIDEO_LIBRARY.md` — direct YouTube playlists and major full courses.
- `STUDY_SCHEDULE.md` — daily/weekly plan, milestones and grading.
- `FREE_RESOURCES.md` — Linux-only official and free supplementary materials.
- `LINUX_COMMAND_CHEATSHEET.md` — categorized commands and safe sample usage.
- `CAPSTONE_PROJECT.md` — final Linux server project and rubric.
- `COURSE_PROGRESS.md` — checklist for all 24 modules.
- `modules/` — 24 separate detailed Markdown lessons, each containing video links, objectives, commands, guided labs, self-checks and questions.

## Course map — click modules to open

| Week | Module | Level | Phase |
|---:|---|---|---|
| 01 | [Linux basics, distributions and a safe lab](modules/01_linux_basics_distributions_and_a_safe_lab.md) | Beginner | Foundations |
| 02 | [Terminal navigation and Linux filesystem hierarchy](modules/02_terminal_navigation_and_linux_filesystem_hierarchy.md) | Beginner | Foundations |
| 03 | [Files, directories, links and search](modules/03_files_directories_links_and_search.md) | Beginner | Foundations |
| 04 | [File viewers, Nano, Vim and command documentation](modules/04_file_viewers_nano_vim_and_command_documentation.md) | Beginner | Foundations |
| 05 | [Pipes, redirection and Linux text filters](modules/05_pipes_redirection_and_linux_text_filters.md) | Beginner | Foundations |
| 06 | [Accounts, groups, sudo and login sessions](modules/06_accounts_groups_sudo_and_login_sessions.md) | Intermediate | System administration |
| 07 | [Linux file permissions, ownership, ACLs and umask](modules/07_linux_file_permissions_ownership_acls_and_umask.md) | Intermediate | System administration |
| 08 | [Software packages, repositories and updates](modules/08_software_packages_repositories_and_updates.md) | Intermediate | System administration |
| 09 | [Processes, process priorities and job control](modules/09_processes_process_priorities_and_job_control.md) | Intermediate | System administration |
| 10 | [systemd, services and Linux boot lifecycle](modules/10_systemd_services_and_linux_boot_lifecycle.md) | Intermediate | System administration |
| 11 | [Disks, filesystems, partitions and mounting](modules/11_disks_filesystems_partitions_and_mounting.md) | Intermediate | Storage and automation |
| 12 | [LVM, snapshots and modern Linux filesystems](modules/12_lvm_snapshots_and_modern_linux_filesystems.md) | Advanced | Storage and automation |
| 13 | [Archiving, compression, backups and rsync](modules/13_archiving_compression_backups_and_rsync.md) | Intermediate | Storage and automation |
| 14 | [cron jobs, systemd timers and Linux scheduling](modules/14_cron_jobs_systemd_timers_and_linux_scheduling.md) | Intermediate | Storage and automation |
| 15 | [IP addressing, routes, DNS and Linux network commands](modules/15_ip_addressing_routes_dns_and_linux_network_commands.md) | Intermediate | Networking and automation |
| 16 | [OpenSSH administration, keys and secure file transfer](modules/16_openssh_administration_keys_and_secure_file_transfer.md) | Intermediate | Networking and automation |
| 17 | [Linux host firewalls with UFW](modules/17_linux_host_firewalls_with_ufw.md) | Intermediate | Networking and automation |
| 18 | [Bash scripting from zero: variables, ifs and loops](modules/18_bash_scripting_from_zero_variables_ifs_and_loops.md) | Intermediate | Bash and observability |
| 19 | [Advanced Bash, awk, sed, regex and robust scripts](modules/19_advanced_bash_awk_sed_regex_and_robust_scripts.md) | Advanced | Bash and observability |
| 20 | [Linux logging: journald, syslog and logrotate](modules/20_linux_logging_journald_syslog_and_logrotate.md) | Advanced | Bash and observability |
| 21 | [Linux performance, capacity and troubleshooting](modules/21_linux_performance_capacity_and_troubleshooting.md) | Advanced | Advanced Linux operations |
| 22 | [Linux storage encryption with LUKS (advanced lab)](modules/22_linux_storage_encryption_with_luks_advanced_lab.md) | Advanced | Advanced Linux operations |
| 23 | [Linux server hardening, auditing and access review](modules/23_linux_server_hardening_auditing_and_access_review.md) | Advanced | Advanced Linux operations |
| 24 | [Final Linux administration and security capstone](modules/24_final_linux_administration_and_security_capstone.md) | Advanced | Capstone |

## Learning method
1. Read `LAB_SETUP.md` and take an Ubuntu VM snapshot.
2. Open the module for your current week; watch the **exact YouTube video links** inside it.
3. Reproduce each command in your own VM; make one small change to test your understanding.
4. Complete the step-by-step lab and record output in your personal notes.
5. Answer the quiz and check the expected outcomes without copying a video.
6. Mark the module complete in `COURSE_PROGRESS.md`; continue only when comfortable.

## Important safety rules
- Never format your real hard drive. Storage modules use a **dedicated extra blank virtual disk** only.
- Before changing SSH or firewall rules, take a snapshot and ensure VM console access.
- Do not copy public/private keys, tokens, password files or full personal logs into public repositories.
- Administrative commands are for your own Linux VM or systems you are explicitly authorized to maintain.

## Video-source transparency
Each module lists direct individual video URLs and/or chapter-linked URLs from verified YouTube course listings, not merely generic YouTube search pages. For topics not fully covered by one video, the module also lists a full Linux playlist. The module assignment and lab content are independently developed; they are not the same thing as the official creator’s lesson order.

**Last prepared:** 2026-11-19. These are external links; video availability can change.
