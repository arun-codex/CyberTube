# LINUX_COMMAND_CHEATSHEET — quick revision

**Only run commands you understand.** Many admin tasks are distribution-specific. Commands here are primarily for Ubuntu Linux.

| Category | Commands | What to inspect |
|---|---|---|
| Help | `man ls`, `ls --help`, `type cd` | Documentation / shell built-ins |
| Identity | `whoami`, `id`, `groups` | Current user and privileges |
| Navigation | `pwd`, `ls -lah`, `cd /etc`, `cd ~` | Directory and path |
| Files | `touch`, `cp`, `mv`, `mkdir`, `find`, `stat`, `file` | File creation and metadata |
| Reading | `cat`, `less`, `head`, `tail -f`, `nano`, `vim` | Text inspection and editing |
| Text | `grep -n`, `sort`, `uniq -c`, `wc -l`, `awk`, `sed` | Filters and pipelines |
| Users | `getent passwd`, `id`, `sudo -l` | Identity and permissions |
| Permissions | `ls -l`, `chmod`, `chown`, `umask`, `getfacl` | Access control |
| Packages | `apt-cache policy`, `apt list --installed`, `sudo apt update` | Software state |
| Processes | `ps aux`, `top`, `pgrep`, `kill`, `jobs` | Running processes |
| Services | `systemctl status NAME`, `systemctl cat NAME` | Service configuration |
| Logs | `journalctl -b`, `journalctl -u NAME`, `journalctl -p warning` | Linux log records |
| Disk | `lsblk -f`, `df -hT`, `du -sh .`, `findmnt /` | Storage layouts |
| Backup | `tar -czf`, `tar -tzf`, `rsync -av --dry-run` | Archives and file sync |
| Scheduling | `crontab -l`, `systemctl --user list-timers` | Scheduled work |
| Networking | `ip -br a`, `ip route`, `ss -tulpen`, `dig` | Routes/sockets/DNS |
| SSH | `ssh -V`, `ssh-keygen`, `ssh`, `scp`, `sftp` | Remote administration |
| Firewall | `sudo ufw status verbose` | Linux host firewall state |
| Performance | `uptime`, `free -h`, `df -i`, `top` | Load, memory, inodes |
| LVM | `pvs`, `vgs`, `lvs` | Read-only storage mapping |

## Dangerous operations — verify in a disposable VM only
- `rm -rf` can delete an entire directory tree irreversibly.
- `mkfs`, `fdisk`, `parted`, LVM modification and `cryptsetup luksFormat` can destroy data on the selected disk.
- `sudo ufw enable` or changing SSH settings can lock you out of a remote host.
- `chmod -R` and `chown -R` can damage permissions across many files.
- Treat private keys and secrets as sensitive; never post them publicly.
