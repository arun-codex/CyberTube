# CAPSTONE_PROJECT — Build and operate a secure Linux VM

## Goal
Deploy a **Linux-only** small server environment in your own Ubuntu virtual machine, operate it as a junior Linux administrator, and submit reproducible evidence that it works.

## Tasks
1. Install Ubuntu and take a clean snapshot. Record `/etc/os-release`, kernel version, disk and RAM allocations.
2. Create a non-root test user; set up a project directory with appropriate owner/group permissions.
3. Identify package versions; update responsibly and log what changed.
4. Inspect systemd service units; configure a harmless demonstration service and verify it starts correctly.
5. Configure SSH keys between owned virtual machines or localhost. Verify the private key is protected and not included in the submission.
6. Inspect and, if appropriate, configure UFW rules while maintaining a working console/SSH recovery path.
7. Create a backup with tar or rsync, verify that restore produces matching data and record checksums.
8. Write a Bash health report covering date, kernel, disk use, memory, listening sockets, service status and recent journal warnings.
9. Run the health report from a temporary cron entry or systemd user timer, then remove the temporary schedule.
10. Simulate a harmless service failure, inspect `systemctl status` and `journalctl`, record cause and corrective action.
11. Write a hardening review covering accounts, services, SSH, firewall, logging and backup status.
12. Restore the snapshot or remove all temporary test accounts, keys and scheduled tasks not needed for continued lab use.

## Submission structure
```text
linux-capstone/
  README.md
  architecture.md
  setup-commands.md
  account-permissions.md
  services.md
  ssh-firewall.md
  backup-and-restore.md
  scripts/health-report.sh
  evidence/  # sanitized text outputs or screenshots
  troubleshooting.md
  hardening-review.md
```

## Grading rubric
| Category | Points |
|---|---:|
| Correct installation & documented architecture | 10 |
| Users and file permissions | 10 |
| Packages, services and systemd | 15 |
| SSH, UFW and safe access | 15 |
| Backup and verified restore | 15 |
| Bash automation and logs | 15 |
| Troubleshooting reasoning and report quality | 15 |
| Cleanup, snapshots and safe handling | 5 |
| **Total** | **100** |

**Passing target:** 80 or more, with no unresolved risk of accidental data loss or remote lockout.

## Core YouTube review
- Linux full command line masterclass: https://www.youtube.com/watch?v=avg65oY7sj4
- Systemd services lesson: https://www.youtube.com/watch?v=5JVBpXiYMKo
- UFW firewall lesson: https://www.youtube.com/watch?v=F-ubkT1WNFk
- Linux troubleshooting: https://www.youtube.com/watch?v=GPF5lrY9YJY

Do not include raw password files, SSH private keys, real organization logs or any other sensitive system content in your submission.
