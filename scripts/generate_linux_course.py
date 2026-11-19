import glob
import os
import re
import json

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

# Questions database mapping for all 24 modules
MODULE_QUIZZES = {
    1: [
        {
            "question": "What is the primary role of the Linux operating system kernel?",
            "options": [
                "Rendering the desktop user interface and window decorations",
                "Managing hardware resources, memory allocation, and CPU scheduling for processes",
                "Providing a bash command shell prompt for interactive typing",
                "Compiling C code directly into machine binaries"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The Linux kernel is the core component that mediates between system hardware (CPU, RAM, disk, network) and userland applications."
        },
        {
            "question": "How is a virtual machine fundamentally different from a dual-boot setup?",
            "options": [
                "A virtual machine runs as an isolated guest process on top of a hypervisor while the host OS continues running",
                "A virtual machine requires partitioning the physical hard drive into separate raw boot sectors",
                "Dual boot is completely safe and cannot overwrite the existing master boot record",
                "A virtual machine runs faster than bare-metal hardware"
            ],
            "correctAnswerIndex": 0,
            "explanation": "A VM runs inside a hypervisor (such as VirtualBox) on your existing OS, providing a safe, sandboxed environment without touching host partitions."
        },
        {
            "question": "Why is Kali Linux not recommended for learning foundational Linux systems administration?",
            "options": [
                "Kali Linux does not have a bash terminal",
                "Kali is pre-configured with aggressive offensive security tools and historically runs non-standard root privileges rather than standard enterprise server defaults",
                "Kali Linux is closed-source and proprietary",
                "Kali cannot connect to the internet"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Kali is specialized for penetration testing and forensics. Standard distributions like Ubuntu or Debian teach proper enterprise sysadmin conventions, non-root user privilege boundaries, and standard service lifecycles."
        }
    ],
    2: [
        {
            "question": "What defines an absolute path in the Linux filesystem hierarchy?",
            "options": [
                "Any path that begins relative to the current working directory",
                "Any path that begins with the root slash (/) and resolves from the top of the entire filesystem tree",
                "Any path containing a tilde (~) symbol",
                "Any file located in the user's home folder"
            ],
            "correctAnswerIndex": 1,
            "explanation": "An absolute path always starts with the root directory (/), unambiguous regardless of the current working directory."
        },
        {
            "question": "What is the primary purpose of the /etc directory in the Filesystem Hierarchy Standard (FHS)?",
            "options": [
                "Storing user personal documents and desktop icons",
                "Storing static host-specific system configuration files and service parameters",
                "Holding temporary ephemeral cache files cleared on reboot",
                "Storing compiled binary executables like ls and bash"
            ],
            "correctAnswerIndex": 1,
            "explanation": "/etc contains host-specific system configuration files and scripts required for system-wide services and daemon settings."
        },
        {
            "question": "Which command displays official, comprehensive manual documentation for the 'ls' utility?",
            "options": [
                "whatis ls",
                "man ls",
                "ls --find",
                "cat /etc/ls"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'man ls' opens the official system reference manual page describing all command switches, formatting options, and behavior."
        }
    ],
    3: [
        {
            "question": "What does the option '-type f' specify when executing the 'find' command?",
            "options": [
                "Filter and return only regular files, ignoring directories, sockets, and block devices",
                "Force delete all matched filesystem entries",
                "Search only for files formatted as FAT32",
                "Display file permissions in octal format"
            ],
            "correctAnswerIndex": 0,
            "explanation": "In 'find', '-type f' restricts the search results exclusively to regular files."
        },
        {
            "question": "Why is running 'rm -rf /' catastrophic on a Linux system?",
            "options": [
                "It resets network adapter IP addresses back to 0.0.0.0",
                "It recursively and forcibly deletes all files and directories starting from the root of the filesystem",
                "It immediately shuts down the machine without saving bash history",
                "It changes ownership of all files to the nobody user"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'rm -rf /' tells the system to recursively remove all files from root downwards without prompting, destroying system binaries, libraries, and kernel modules."
        },
        {
            "question": "What is the key difference between a hard link and a symbolic link (symlink)?",
            "options": [
                "A hard link points to an inode number directly on the same filesystem, whereas a symlink is a separate file containing a path string to the target",
                "Symlinks can only point to directories, while hard links can only point to files",
                "Deleting the target file keeps a symlink working, but breaks a hard link",
                "Hard links work seamlessly across different network mounts and filesystems"
            ],
            "correctAnswerIndex": 0,
            "explanation": "A hard link shares the exact same inode as the original file; a symlink (soft link) is a pointer file containing the path to another file and breaks if the target is moved."
        }
    ],
    4: [
        {
            "question": "How do you exit the Vim editor immediately without saving any pending modifications?",
            "options": [
                "Press Ctrl+C followed by Enter",
                "Type :q! in Normal mode and press Enter",
                "Press Esc followed by :wq",
                "Type exit in Insert mode"
            ],
            "correctAnswerIndex": 1,
            "explanation": "In Vim, ':q!' forces an exit from command mode, discarding all unsaved changes."
        },
        {
            "question": "Why is the 'less' pager preferred over 'cat' when inspecting large log files?",
            "options": [
                "cat compresses files before displaying them",
                "less loads file buffers interactively with forward/backward pagination and search without dumping the entire file into terminal scrollback",
                "cat requires root administrative permissions to read files",
                "less automatically translates binary files into plaintext"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'less' pages through files without reading the entire file into memory upfront, enabling fast scrolling and pattern searching."
        },
        {
            "question": "Which section of the Linux man pages documents administrative and system management commands (such as fdisk or iptables)?",
            "options": [
                "Section 1 (User commands)",
                "Section 5 (File formats and conventions)",
                "Section 8 (System administration commands and daemons)",
                "Section 3 (C library functions)"
            ],
            "correctAnswerIndex": 2,
            "explanation": "Man page section 8 is reserved for system administration commands and root maintenance daemons."
        }
    ],
    5: [
        {
            "question": "What is the standard stream number for Standard Error (stderr) in Linux?",
            "options": [
                "Stream 0",
                "Stream 1",
                "Stream 2",
                "Stream 3"
            ],
            "correctAnswerIndex": 2,
            "explanation": "File descriptor 0 is stdin, 1 is stdout, and 2 is stderr."
        },
        {
            "question": "When should you use the '>>' redirection operator instead of '>'?",
            "options": [
                "When you want to redirect stderr instead of stdout",
                "When you want to append new output to an existing file without overwriting its previous content",
                "When you want to redirect output over a network socket",
                "When executing a command in the background"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'>' truncates and overwrites the destination file, while '>>' appends output to the end of the file."
        },
        {
            "question": "Why must the 'sort' command typically precede 'uniq' in a pipeline?",
            "options": [
                "uniq only removes duplicate lines that are immediately adjacent to each other",
                "sort deletes all non-ASCII characters from the input stream",
                "uniq cannot read from standard input",
                "sort converts all text to lowercase before deduplication"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The 'uniq' command only filters duplicate lines that are adjacent. Sorting first brings identical lines together."
        }
    ],
    6: [
        {
            "question": "What is the User ID (UID) of the root superuser account on standard Linux systems?",
            "options": [
                "UID 1000",
                "UID 0",
                "UID 1",
                "UID 65534"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The root administrative superuser account always possesses UID 0."
        },
        {
            "question": "Why is utilizing 'sudo' for administrative commands superior to logging in directly as root?",
            "options": [
                "sudo runs commands faster by skipping kernel privilege checks",
                "sudo logs executed commands for auditing, enforces granular privilege delegation, and prevents accidental system-wide modifications",
                "sudo bypasses file permissions automatically without requiring a password",
                "root accounts are prohibited by the Linux kernel from running network commands"
            ],
            "correctAnswerIndex": 1,
            "explanation": "sudo provides audit logs (/var/log/auth.log or journald), enforces password verification per operator, and limits prolonged exposure to root privileges."
        },
        {
            "question": "Which file contains the database of local user account attributes, usernames, default shells, and home directories?",
            "options": [
                "/etc/shadow",
                "/etc/passwd",
                "/etc/group",
                "/etc/sudoers"
            ],
            "correctAnswerIndex": 1,
            "explanation": "/etc/passwd is world-readable and defines username, UID, primary GID, home directory, and default shell."
        }
    ],
    7: [
        {
            "question": "What permissions are granted by the octal mode 'chmod 640 target_file'?",
            "options": [
                "Owner: read/write; Group: read-only; Others: no permissions",
                "Owner: read/write/execute; Group: read/write; Others: read-only",
                "Owner: read-only; Group: read-only; Others: execute-only",
                "Owner: write-only; Group: read/write; Others: no permissions"
            ],
            "correctAnswerIndex": 0,
            "explanation": "6 (4+2 = rw-) for owner, 4 (4 = r--) for group, and 0 (---) for others."
        },
        {
            "question": "What is the purpose of the 'umask' setting in a Linux shell environment?",
            "options": [
                "To encrypt files when written to disk",
                "To define default permission bits that are subtracted (masked) when creating new files and directories",
                "To hide hidden files starting with a dot from directory listings",
                "To restrict network socket communication"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Umask specifies which permission bits should NOT be enabled by default on newly created files and directories."
        },
        {
            "question": "Why does a directory require the execute (x) permission bit for a user to access its contents?",
            "options": [
                "The execute bit on a directory is required to enter (cd into) it and access file inodes within it",
                "Execute permission on a directory allows executing shell scripts located in that folder only",
                "Without execute permission, files inside the directory cannot be read",
                "Directories in Linux are binary executables that must run in memory"
            ],
            "correctAnswerIndex": 0,
            "explanation": "For directories, read (r) allows listing contents, write (w) allows creating/deleting files, and execute (x) allows entering (cd) and resolving paths through the directory."
        }
    ],
    8: [
        {
            "question": "What is a Linux software repository?",
            "options": [
                "A local folder on the user desktop holding uncompiled C source code",
                "A secure, centralized server holding digitally signed software packages and metadata index files",
                "A git repository used exclusively for kernel patch submissions",
                "A hardware drive partition reserved for system recovery"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A package repository is a remote or local collection of cryptographically signed package archives and package index manifests."
        },
        {
            "question": "What action does 'sudo apt update' perform on an Ubuntu/Debian system?",
            "options": [
                "It upgrades all installed packages and reboots the operating system",
                "It refreshes local package index manifests from configured repositories without downloading or installing package upgrades",
                "It deletes obsolete package cache archives from /var/cache/apt",
                "It installs kernel security patches immediately"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'apt update' fetches the latest package lists and versions from repository mirrors; it does not actually install or upgrade software."
        },
        {
            "question": "What is 'dependency resolution' in package managers like APT or DNF?",
            "options": [
                "Automatically identifying, retrieving, and installing shared libraries and prerequisite packages required by the requested software",
                "Resolving hostnames of repository servers via DNS",
                "Checking whether the user has paid a license fee for the package",
                "Converting RPM packages into DEB format dynamically"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Dependency resolution calculates the full tree of required libraries, runtimes, and companion packages to ensure the target program functions properly."
        }
    ],
    9: [
        {
            "question": "What does a Process ID (PID) represent in the Linux operating system?",
            "options": [
                "The physical hardware memory address where program instructions reside",
                "A unique positive integer assigned by the kernel to identify an active running process instance",
                "The user ID of the person executing the binary",
                "The network socket port number bound by the application"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The PID is a unique kernel-assigned integer that identifies each running process in the system process table."
        },
        {
            "question": "What is the critical difference between signals SIGTERM (15) and SIGKILL (9)?",
            "options": [
                "SIGKILL can be caught and handled by an application, while SIGTERM cannot",
                "SIGTERM requests a graceful termination allowing the process to clean up files and state; SIGKILL cannot be caught or ignored and terminates the process immediately",
                "SIGTERM pauses the process in background, while SIGKILL restarts it",
                "SIGKILL only works on root-owned processes"
            ],
            "correctAnswerIndex": 1,
            "explanation": "SIGTERM permits clean shutdown and resource release; SIGKILL is handled directly by the kernel and terminates the process immediately without cleanup."
        },
        {
            "question": "In Linux process scheduling, what does a higher 'nice' value (e.g. +19) indicate?",
            "options": [
                "The process receives higher CPU priority and preempts other tasks",
                "The process is 'nicer' to other system tasks, lowering its CPU scheduling priority",
                "The process has higher I/O bandwidth limits",
                "The process will automatically run as root"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Nice values range from -20 (highest priority) to +19 (lowest priority). A higher nice value means lower scheduling priority."
        }
    ],
    10: [
        {
            "question": "What is the role of PID 1 on modern Linux distributions running systemd?",
            "options": [
                "The kernel space hardware abstraction driver",
                "The system init process and service manager that bootstraps userland, mounts filesystems, and supervises all daemons",
                "The network DHCP client daemon",
                "The interactive Bash login shell for root"
            ],
            "correctAnswerIndex": 1,
            "explanation": "systemd runs as PID 1, acting as the system and service manager responsible for bringing the system to its configured target state."
        },
        {
            "question": "How does 'systemctl enable' differ from 'systemctl start'?",
            "options": [
                "enable creates symlinks so the service starts automatically on future system boots, while start activates the service immediately in the current session",
                "start configures auto-start on boot, while enable runs the service once",
                "enable modifies the binary code of the service to grant root access",
                "start requires a full system reboot to take effect"
            ],
            "correctAnswerIndex": 0,
            "explanation": "'enable' sets up systemd target symlinks for persistent startup across reboots; 'start' triggers immediate daemon execution right now."
        },
        {
            "question": "Which command queries systemd's centralized journal to inspect real-time log output for the 'nginx' service?",
            "options": [
                "cat /var/log/syslog | grep nginx",
                "journalctl -u nginx -f",
                "systemctl status -l nginx",
                "tail /etc/nginx/nginx.conf"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'journalctl -u nginx -f' follows the live log stream for the specific systemd unit 'nginx'."
        }
    ],
    11: [
        {
            "question": "What is the primary function of the 'lsblk' command?",
            "options": [
                "Listing user login accounts currently active on the console",
                "Displaying a structured tree of all block storage devices, partitions, and their current mount points",
                "Formatting hard disk partitions with an ext4 filesystem",
                "Listing blocked incoming IP addresses in the firewall"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'lsblk' queries sysfs to display all block devices (disks, partitions, NVMe, LVM volumes) and where they are mounted."
        },
        {
            "question": "Why can the reported disk usage of 'df' differ substantially from 'du'?",
            "options": [
                "df counts block storage allocation metadata and open unlinked deleted files, while du traverses existing directory trees from the filesystem namespace",
                "du includes RAM usage while df only measures swap space",
                "df operates in megabytes while du operates in sectors",
                "du only works on ext4 filesystems"
            ],
            "correctAnswerIndex": 0,
            "explanation": "If a large file was deleted but is held open by a running process, 'df' still counts its disk blocks as used, whereas 'du' cannot see the unlinked file in the directory tree."
        },
        {
            "question": "What is a 'mount point' in the Linux filesystem architecture?",
            "options": [
                "The physical SATA or NVMe connector on the motherboard",
                "An existing directory in the unified directory tree onto which a storage filesystem is attached and made accessible",
                "The master boot record on sector 0 of a disk",
                "A network router gateway address"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Mounting connects the root of a partition's filesystem to a specified directory location (mount point) in the unified filesystem hierarchy."
        }
    ],
    12: [
        {
            "question": "In Linux Logical Volume Manager (LVM), what is a Volume Group (VG)?",
            "options": [
                "A physical hard drive partition formatted as ext4",
                "A shared pool of storage capacity aggregated from one or more Physical Volumes (PVs)",
                "A group of Linux user accounts authorized to read disk blocks",
                "A software RAID 1 mirror array"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A Volume Group pools physical extents from underlying Physical Volumes (PVs), from which dynamic Logical Volumes (LVs) are carved."
        },
        {
            "question": "Does creating an LVM snapshot serve as a substitute for an off-site backup?",
            "options": [
                "Yes, LVM snapshots permanently clone all data to secondary cloud storage",
                "No, an LVM snapshot is a copy-on-write pointer table residing on the same Volume Group; if the underlying physical disks fail, both origin and snapshot are lost",
                "Yes, because snapshots are immutable and survive physical disk failure",
                "No, snapshots can only be created on unmounted partitions"
            ],
            "correctAnswerIndex": 1,
            "explanation": "LVM snapshots are local copy-on-write representations for fast rollbacks or consistent backup states, not standalone physical backups."
        },
        {
            "question": "After extending an LVM Logical Volume with 'lvextend', what critical step must be executed?",
            "options": [
                "Reboot the physical server",
                "Resize the underlying filesystem (e.g., resize2fs or xfs_growfs) to consume the newly allocated block space",
                "Unmount the partition and run fsck",
                "Delete the volume group metadata"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'lvextend' increases the block device boundary, but the filesystem residing on it must be grown (e.g. via 'resize2fs' or 'xfs_growfs') to register the new capacity."
        }
    ],
    13: [
        {
            "question": "How does the 'tar' command fundamentally differ from compression tools like 'gzip'?",
            "options": [
                "tar only encrypts files with AES-256",
                "tar bundles multiple files and directory structures into a single archive file without compressing; gzip compresses a single data stream",
                "gzip can archive directories directly without tar",
                "tar cannot be combined with compression algorithms"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'tar' (tape archive) bundles files, preserving ownership and permissions. Compression utilities like gzip or bzip2 then compress the resulting tarball."
        },
        {
            "question": "Why is performing periodic restore drills an essential requirement of any backup policy?",
            "options": [
                "Restore drills refresh filesystem timestamps to prevent archive expiration",
                "Backups are unverified assumptions until a restore successfully demonstrates data integrity, application recoverability, and correct procedures",
                "To free up disk space on the primary storage volume",
                "Linux kernels discard archives that have not been read within 30 days"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A backup is only as good as its tested recovery. Restore drills uncover corrupted media, missing encryption keys, and incomplete dependencies."
        },
        {
            "question": "What is the purpose of the '--dry-run' (-n) flag when executing 'rsync'?",
            "options": [
                "It compresses files with maximum CPU priority",
                "It simulates the synchronization and displays files that would be copied or deleted without modifying any destination files",
                "It performs a read-only hardware sector check on the destination drive",
                "It deletes duplicate files on the source drive"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'rsync --dry-run' previews changes without writing or deleting any data, preventing costly operational mistakes."
        }
    ],
    14: [
        {
            "question": "In a standard 5-field cron expression, what does '*/5 * * * *' represent?",
            "options": [
                "Execute at 5:00 AM on the 5th day of every month",
                "Execute every 5 minutes of every hour, every day",
                "Execute 5 times per second",
                "Execute on the 5th minute of 5 specific hours"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Field 1 is minutes (*/5 means step by 5), followed by hour (*), day of month (*), month (*), day of week (*)."
        },
        {
            "question": "Why must scripts executed by cron always use absolute paths for commands and files?",
            "options": [
                "cron scripts run inside an isolated chroot jail",
                "cron runs with a minimal, non-interactive environment PATH (often just /usr/bin:/bin), so relative paths or custom user binaries in ~/bin will fail to resolve",
                "The kernel rejects relative paths when executed by root",
                "Relative paths are forbidden by POSIX standards"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Cron jobs execute in a restricted, non-login shell environment where $PATH is minimal; full absolute paths guarantee command resolution."
        },
        {
            "question": "Which command displays the scheduled execution schedule and time remaining for all active systemd timers?",
            "options": [
                "crontab -l -u root",
                "systemctl list-timers",
                "journalctl -u timer",
                "timedatectl status"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'systemctl list-timers' lists all active timer units, when they last ran, and when they are next scheduled to trigger."
        }
    ],
    15: [
        {
            "question": "What is the function of the default gateway (default route 0.0.0.0/0) in a Linux routing table?",
            "options": [
                "It blocks all incoming traffic from the external internet",
                "It specifies the router IP address to which packets are forwarded when the destination IP does not match any specific local subnet route",
                "It resolves hostnames into IPv4 addresses",
                "It assigns DHCP leases to neighboring computers"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The default route matches all traffic not specifically routable on local broadcast domains, directing it to the upstream gateway router."
        },
        {
            "question": "What information does the command 'ss -tuln' display?",
            "options": [
                "System memory usage and swap metrics",
                "Listening (-l) TCP (-t) and UDP (-u) sockets with numeric (-n) port and IP addresses",
                "All established SSH terminal connections",
                "Network card physical link speed and duplex status"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'ss -tuln' displays listening TCP and UDP sockets with numeric host and port resolutions, omitting slow reverse-DNS lookups."
        },
        {
            "question": "Why might 'ping example.com' fail with 100% packet loss while 'curl https://example.com' succeeds immediately?",
            "options": [
                "The remote host or intermediate firewalls are filtering ICMP Echo Request packets while permitting TCP port 443 web traffic",
                "Linux disables ICMP on Ethernet network interfaces by default",
                "ping only works over local Wi-Fi networks",
                "curl does not use network sockets"
            ],
            "correctAnswerIndex": 0,
            "explanation": "ICMP (used by ping) is a separate protocol from TCP (used by HTTPS). Network security devices frequently drop ICMP while allowing HTTPS."
        }
    ],
    16: [
        {
            "question": "In an OpenSSH asymmetric public/private key pair, which file must NEVER be shared or copied to a remote host?",
            "options": [
                "The public key file (e.g. id_ed25519.pub)",
                "The private key file (e.g. id_ed25519)",
                "The authorized_keys file",
                "The known_hosts file"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The private key is the secret credential used to authenticate your identity; only the corresponding public key is placed on remote servers."
        },
        {
            "question": "What is the security role of the ~/.ssh/known_hosts file on an SSH client machine?",
            "options": [
                "Storing passwords for automated logins",
                "Recording the cryptographic public host keys of remote servers to protect against Machine-in-the-Middle (MitM) impersonation attacks",
                "Listing user accounts permitted to log into the local desktop",
                "Configuring SSH port forwarding tunnels"
            ],
            "correctAnswerIndex": 1,
            "explanation": "known_hosts saves the server's public key upon first connection; if the server key changes unexpectedly, SSH warns of potential interception."
        },
        {
            "question": "What is the primary operational advantage of 'rsync -avz -e ssh' over standard 'scp'?",
            "options": [
                "rsync requires no remote authentication",
                "rsync employs delta-transfer algorithms to only transmit changed portions of files, and can resume interrupted transfers",
                "scp encrypts data whereas rsync sends plaintext over SSH",
                "rsync runs in the kernel while scp runs in userland"
            ],
            "correctAnswerIndex": 1,
            "explanation": "rsync over SSH compares file timestamps and checksums, copying only modified chunks, saving substantial bandwidth and time."
        }
    ],
    17: [
        {
            "question": "What is the principle of 'default deny' in firewall security configuration?",
            "options": [
                "Denying all local users the ability to run administrative commands",
                "Blocking all incoming network connection attempts by default, explicitly whitelisting only necessary ports and services",
                "Allowing all traffic until an administrator manually enters an IP address block",
                "Disabling the network interface card on boot"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'Default deny' ensures that any port not explicitly opened is closed, preventing unintended exposure of background services."
        },
        {
            "question": "Why is it strongly advised to test new firewall rules from a local console or have a fallback connection before enabling UFW?",
            "options": [
                "UFW deletes user account passwords upon activation",
                "An incorrect or missing allow rule (e.g., forgetting to allow SSH port 22) will immediately lock remote administrators out of the server",
                "UFW disables DNS resolution on the entire subnet",
                "The kernel panics if UFW is enabled over SSH"
            ],
            "correctAnswerIndex": 1,
            "explanation": "If the firewall is enabled before permitting SSH traffic, the active remote session will be severed, leaving the server unreachable without physical/console access."
        },
        {
            "question": "What is the relationship between UFW (Uncomplicated Firewall) and Netfilter/nftables?",
            "options": [
                "UFW replaces the Linux kernel's networking stack entirely",
                "UFW is a user-friendly frontend CLI that configures the underlying Netfilter/nftables packet filtering engine inside the Linux kernel",
                "UFW is a commercial proprietary antivirus extension",
                "Netfilter is an older deprecated version of UFW"
            ],
            "correctAnswerIndex": 1,
            "explanation": "UFW translates straightforward commands (like 'ufw allow 22/tcp') into low-level iptables/nftables firewall rules enforced in kernel space."
        }
    ],
    18: [
        {
            "question": "What is the role of the shebang '#!/usr/bin/env bash' at the first line of a script?",
            "options": [
                "It marks the file as executable in the filesystem metadata",
                "It instructs the program loader to locate the bash binary in the user's active PATH and use it as the script interpreter",
                "It enables root administrative mode automatically",
                "It suppresses all script error messages"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The shebang specifies which interpreter should execute the script; using '/usr/bin/env bash' ensures portability across different Unix distributions."
        },
        {
            "question": "What does the special Bash variable '$?' represent?",
            "options": [
                "The Process ID (PID) of the current script",
                "The exit status code (0 for success, non-zero for error) of the most recently executed foreground command",
                "The total number of positional arguments passed to the script",
                "A randomly generated integer"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'$?' holds the return code of the last command; 0 signifies normal completion, while non-zero indicates an error."
        },
        {
            "question": "Why should variables in Bash scripts almost always be wrapped in double quotes (e.g. \"$variable\")?",
            "options": [
                "To prevent word splitting and unwanted pathname (glob) expansion when the variable contains spaces or special characters",
                "To convert the variable into an integer",
                "Because unquoted variables cannot be printed by echo",
                "To prevent the variable from being read by other users"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Unquoted variables are subject to word splitting and globbing, which causes errors if the variable string contains spaces or wildcards."
        }
    ],
    19: [
        {
            "question": "In the AWK text processing utility, what does the switch '-F,' specify?",
            "options": [
                "Format output in floating-point scientific notation",
                "Set the input field delimiter to a comma, enabling CSV column parsing",
                "Filter out all lines containing lowercase letters",
                "Force AWK to run in recursive file mode"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'-F' sets the field separator (FS) in AWK; '-F,' separates fields by commas, allowing access via $1, $2, etc."
        },
        {
            "question": "What is the function of the 'trap' built-in command in a robust Bash script?",
            "options": [
                "It catches system errors and halts the operating system",
                "It intercepts specified signals (like SIGINT or EXIT) and executes cleanup routines (e.g., removing temporary files)",
                "It prevents users from viewing the script source code",
                "It traps network packets on the default interface"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'trap' handles signals and execution events, ensuring temporary files and background locks are cleanly removed upon exit or interruption."
        },
        {
            "question": "Why is naive text splitting (like cut -d,) inadequate for parsing RFC 4180-compliant CSV files?",
            "options": [
                "cut cannot read files larger than 100 megabytes",
                "CSV fields frequently contain embedded commas, newline characters, or escaped quotes inside quoted strings",
                "Linux shells do not support commas in variable strings",
                "cut always reverses field order"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Full CSV data can have commas inside quoted strings (\"Smith, John\"), which simple character-splitting utilities misinterpret as field breaks."
        }
    ],
    20: [
        {
            "question": "What log messages are displayed by executing 'journalctl -b'?",
            "options": [
                "All log messages generated exclusively by battery power management",
                "All log messages recorded since the current system boot only",
                "Logs recorded in reverse chronological order from last year",
                "Only kernel panic messages"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The '-b' flag filters systemd journal records to only show entries from the current boot cycle."
        },
        {
            "question": "What is the primary function of the 'logrotate' service on Linux servers?",
            "options": [
                "Rotating monitor display orientation for console terminals",
                "Compressing, truncating, and managing the lifecycle of log files to prevent storage volumes from filling up",
                "Encrypting logs and transmitting them to a central SIEM",
                "Translating syslog files into JSON"
            ],
            "correctAnswerIndex": 1,
            "explanation": "logrotate automates rotating, compressing, and deleting aging log files so service logs do not exhaust filesystem storage."
        },
        {
            "question": "Why are synchronized, accurate timestamps (via NTP/chrony) critical in security log analysis?",
            "options": [
                "Because unsynchronized clocks cause logrotate to delete files immediately",
                "Accurate time synchronization enables forensic analysts to reliably correlate event sequences across multiple firewalls, servers, and endpoints during an incident",
                "Linux kernel modules refuse to log messages if system time is off by more than 1 second",
                "Timestamps determine the encryption key used for syslog storage"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Without synchronized time (NTP), establishing the true order of adversary actions and cross-referencing multi-system logs during incident triage is impossible."
        }
    ],
    21: [
        {
            "question": "What is the purpose of swap space in Linux memory management?",
            "options": [
                "Swapping user accounts between terminal consoles",
                "Providing virtual memory on disk to stage infrequently accessed memory pages when physical RAM is under pressure",
                "Accelerating hard drive read/write speed by caching files in RAM",
                "Storing kernel crash dumps only"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Swap allows the kernel to page out inactive anonymous memory to disk, freeing up physical RAM for active processes and cache."
        },
        {
            "question": "What does a 1-minute load average of 4.0 indicate on a server with 2 CPU cores?",
            "options": [
                "The CPU is operating at 40% capacity",
                "On average, 4 processes were running or waiting for CPU time, meaning the 2-core system was experiencing significant CPU saturation (200% loaded)",
                "4 gigabytes of RAM have been exhausted",
                "4 network interfaces have lost link carrier"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Load average measures running + runnable + uninterruptible tasks. On a 2-core machine, a load of 2.0 is 100% saturation; 4.0 means demand exceeds capacity by double."
        },
        {
            "question": "What does the command 'df -i' monitor?",
            "options": [
                "Total IP addresses assigned to network interfaces",
                "Inode consumption across mounted filesystems, which can exhaust storage even when raw megabytes remain available",
                "Interactive process CPU consumption",
                "Input/Output operations per second (IOPS) on disk controllers"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'df -i' checks inode table usage. If all inodes are consumed by millions of tiny files, new files cannot be created even if free disk space exists."
        }
    ],
    22: [
        {
            "question": "What primary threat does LUKS (Linux Unified Key Setup) full-disk encryption protect against?",
            "options": [
                "Remote network web application attacks and SQL injections",
                "Unauthorized data access from offline physical theft of storage drives or decommissioned hardware",
                "Privilege escalation by local users logged in via SSH",
                "DDoS attacks targeting network sockets"
            ],
            "correctAnswerIndex": 1,
            "explanation": "LUKS protects data-at-rest. If a laptop or drive is stolen or inspected offline, the contents cannot be read without the decryption passphrase/key."
        },
        {
            "question": "Once a LUKS volume is unlocked and mounted by the operating system, does it protect data from running malicious processes with root privileges?",
            "options": [
                "Yes, LUKS actively blocks unauthorized process memory access",
                "No, once unlocked, the decrypted block device is transparently exposed to the running operating system and its active processes",
                "Yes, all read operations require password re-entry",
                "No, but it restricts file access to read-only"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Disk encryption protects data at rest; once unlocked, the kernel mapper presents plain block access to active OS processes."
        },
        {
            "question": "Why is backing up the LUKS volume header ('cryptsetup luksHeaderBackup') strongly recommended?",
            "options": [
                "To allow remote recovery without passphrase",
                "If the first few megabytes of the drive holding the LUKS header and keyslots are damaged, all encrypted data on the volume is permanently unrecoverable",
                "The kernel deletes the header after 90 days",
                "To sync keys with cloud key management services"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The LUKS header contains the master key encrypted by user passphrases. If damaged by bad sectors or accidental overwrites, the data is lost forever."
        }
    ],
    23: [
        {
            "question": "What is the foundational cybersecurity principle of 'Least Privilege' in Linux server administration?",
            "options": [
                "Granting all developers full root access to avoid service disruptions",
                "Granting each user, process, and service account only the minimum permissions strictly necessary to perform its intended job",
                "Disabling all user accounts and running the server autonomously",
                "Limiting servers to a single network interface"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Least privilege ensures that if an account or service is compromised, the attacker's blast radius is strictly confined."
        },
        {
            "question": "Why should server security hardening changes be applied and tested incrementally rather than all at once?",
            "options": [
                "Applying all changes at once causes kernel panics",
                "Incremental changes allow administrators to immediately isolate and diagnose which specific setting broke service availability or network access",
                "Linux package managers can only apply one setting per day",
                "Security tools cannot audit multiple configuration files"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Hardening multiple services simultaneously obscures the cause if a daemon fails; step-by-step enforcement makes troubleshooting clear."
        },
        {
            "question": "How do you systematically verify that an SSH hardening configuration (such as disabling password auth) took effect?",
            "options": [
                "Check whether the server uptime increased",
                "Test an inbound SSH connection from an external client without a key and verify the server rejects password prompts with 'Permission denied (publickey)'",
                "Reboot the client machine and ping the server",
                "Check if the SSH port number changed automatically"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Active verification requires attempting an authentication method that was disallowed and verifying the daemon firmly denies access."
        }
    ],
    24: [
        {
            "question": "In production Linux operations, what is commonly the single largest risk during firewall and network maintenance?",
            "options": [
                "Hardware failure of the CPU cooling fan",
                "Inadvertently severing administrative management access (locking yourself out) without an out-of-band console recovery path",
                "Exhausting disk inodes during routing table updates",
                "Bash shell history being written to disk"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Modifying firewall or network rules remotely without an independent recovery path (console/serial/revert script) frequently causes administrator lockouts."
        },
        {
            "question": "What is the most effective operational strategy to recover quickly if a remote firewall change blocks SSH access?",
            "options": [
                "Send an ICMP echo request ping to the gateway",
                "Connect via the hypervisor or cloud provider's out-of-band console, or run a pre-scheduled revert timer that rolls back rules if unconfirmed",
                "Power cycle the physical power supply repeatedly",
                "Wait for the firewall to disable itself"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Using out-of-band VM console access or staging a 'fallback revert script' ensures you can recover access without wiping the machine."
        },
        {
            "question": "Which command and log combination provides immediate forensic evidence that a systemd background service crashed?",
            "options": [
                "systemctl status <service> and journalctl -u <service> --since '10 minutes ago'",
                "cat /etc/hosts and ping localhost",
                "ls -l /tmp and df -h",
                "whoami and uptime"
            ],
            "correctAnswerIndex": 0,
            "explanation": "'systemctl status' shows the exit code and process termination signal, while 'journalctl -u' displays the stderr output and crash stack trace."
        }
    ]
}

def quote_sql(text):
    if text is None:
        return "NULL"
    escaped = text.replace("'", "''")
    return f"'{escaped}'"

def to_pg_array(items):
    if not items:
        return "ARRAY[]::TEXT[]"
    escaped_items = []
    for item in items:
        esc = item.replace("'", "''")
        escaped_items.append(f"'{esc}'")
    return f"ARRAY[{', '.join(escaped_items)}]"

def generate():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    mod_files = sorted(glob.glob(os.path.join(base_dir, 'docs/courses/linux-zero-to-advanced/modules/*.md')))
    print(f"Generating course from {len(mod_files)} files...")
    
    modules = []
    sql_modules = []
    sql_lessons = []
    
    total_minutes = 0
    
    for idx, mf in enumerate(mod_files, 1):
        with open(mf, 'r', encoding='utf-8') as f:
            content = f.read()

        lines = content.splitlines()
        title = lines[0].replace('# ', '').strip()
        
        meta_line = lines[1] if len(lines) > 1 else ""
        level_match = re.search(r'\*\*Level:\*\*\s*([^|]+)', meta_line)
        phase_match = re.search(r'\*\*Phase:\*\*\s*([^|]+)', meta_line)
        duration_match = re.search(r'\*\*Suggested duration:\*\*\s*([^|]+)', meta_line)
        prereq_match = re.search(r'\*\*Prerequisite:\*\*\s*(.+)', meta_line)
        
        level = level_match.group(1).strip() if level_match else "Beginner"
        phase = phase_match.group(1).strip() if phase_match else "Foundations"
        duration = duration_match.group(1).strip() if duration_match else "1 week (9-12 hours)"
        prereq = prereq_match.group(1).strip() if prereq_match else "None"

        sections = {}
        curr_sec = "intro"
        curr_lines = []
        for line in lines[2:]:
            if line.startswith('## '):
                if curr_lines:
                    sections[curr_sec] = "\n".join(curr_lines).strip()
                curr_sec = line.replace('## ', '').strip()
                curr_lines = []
            else:
                curr_lines.append(line)
        if curr_lines:
            sections[curr_sec] = "\n".join(curr_lines).strip()

        video_sec = sections.get("Exact YouTube learning videos (free to view)", "")
        raw_videos = []
        for line in video_sec.splitlines():
            matches = re.findall(r'\[(.*?)\]\((https://www\.youtube\.com/watch\?v=([a-zA-Z0-9_-]{11})[^)]*)\)', line)
            for v_title, url, vid in matches:
                creator = "Learn Linux TV"
                if "NetworkChuck" in v_title or "NetworkChuck" in line:
                    creator = "NetworkChuck"
                elif "tutoriaLinux" in v_title or "tutoriaLinux" in line:
                    creator = "tutoriaLinux"
                elif "MichaelsTechTutorials" in v_title or "MichaelsTechTutorials" in line or "Command-line course" in v_title or "command-line course" in v_title or "Entire Tutorial Series" in v_title:
                    creator = "MichaelsTechTutorials"
                elif "freeCodeCamp" in v_title or "freeCodeCamp" in line:
                    creator = "freeCodeCamp"
                
                clean_title = v_title.split("—")[0].strip()
                if not any(v['videoId'] == vid and v['url'] == url for v in raw_videos):
                    raw_videos.append({
                        "rawTitle": v_title,
                        "title": clean_title,
                        "url": url,
                        "videoId": vid,
                        "creator": creator
                    })

        obj_sec = sections.get("Learning objectives", "")
        objectives = [re.sub(r'^-\s*\[\s*\]\s*', '', l).strip() for l in obj_sec.splitlines() if l.strip().startswith('-')]

        cmd_sec = sections.get("Commands to practise", "")
        code_match = re.search(r'```(?:bash|sh)?\s*\n(.*?)\n```', cmd_sec, re.DOTALL)
        commands_code = code_match.group(1).strip() if code_match else ""
        commands_list = [c.strip() for c in commands_code.splitlines() if c.strip() and not c.strip().startswith('#')]

        lab_sec = sections.get("Hands-on lab: step-by-step instructions", "")
        lab_steps = [re.sub(r'^\d+\.\s*', '', l).strip() for l in lab_sec.splitlines() if re.match(r'^\d+\.', l.strip())]

        res_sec = sections.get("Expected results / self-check", "")
        expected_results = [re.sub(r'^-\s*\[\s*\]\s*', '', l).strip() for l in res_sec.splitlines() if l.strip().startswith('-')]

        mis_sec = sections.get("Common mistakes and troubleshooting", "")
        mistakes = [re.sub(r'^-\s*\*\*Watch for:\*\*\s*', '', l).strip() for l in mis_sec.splitlines() if l.strip().startswith('-')]

        ref_sec = sections.get("Free documentation and references", "")
        ref_matches = re.findall(r'\[(.*?)\]\((https?://[^\)]+)\)', ref_sec)
        references = [{"title": r[0], "url": r[1]} for r in ref_matches]

        chk_sec = sections.get("Detailed lesson checklist", "")
        checklist = [re.sub(r'^-\s*\[\s*\]\s*', '', l).strip() for l in chk_sec.splitlines() if l.strip().startswith('-')]

        mod_uuid = f"d7a00000-0000-4000-8000-0000000001{idx:02d}"
        mod_id = f"mod-linux-m{idx:02d}"
        mod_desc = f"{level} level ({phase}). {duration}. Prerequisite: {prereq}. Complete all hands-on exercises, review commands, and pass the knowledge check."

        module_lessons = []
        for l_idx, v in enumerate(raw_videos, 1):
            les_uuid = f"d7a00000-0000-4000-8000-000000{idx:02d}00{l_idx:02d}"
            les_id = f"les-linux-m{idx:02d}-l{l_idx:02d}"
            les_slug = f"m{idx:02d}-l{l_idx}-{slugify(v['title'])}"
            les_title = f"Module {idx:02d} - Lesson {l_idx}: {v['title']}"
            les_duration = 30
            total_minutes += les_duration
            
            les_desc = f"Video lesson presented by {v['creator']}. Covers core concepts of {title}. Practice the commands in your Ubuntu lab environment."
            
            procedures = []
            for c_i, cmd in enumerate(commands_list[:6], 1):
                procedures.append({
                    "step": c_i,
                    "title": f"Execute: {cmd}",
                    "instruction": f"Run `{cmd}` in terminal to inspect system state and verify output.",
                    "expectedOutcome": "Command terminates with exit status 0 and displays system data."
                })
            
            rich_content = {
                "introduction": f"In this lesson ({v['title']}), we explore fundamental aspects of {title}. Follow along with {v['creator']}, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
                "prerequisites": [prereq] if prereq != "None" else ["Basic terminal access"],
                "theorySections": [
                    {
                        "title": f"Overview of {v['title']}",
                        "content": f"This lesson covers key systems principles from {title}. Ensure you have your safe lab ready before making configuration changes.",
                        "keyPoints": objectives[:4]
                    }
                ],
                "stepByStepProcedures": procedures,
                "expectedObservations": expected_results[:4],
                "commonMistakes": mistakes[:4],
                "securityRelevance": f"Understanding {title} is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
                "summary": f"Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module {idx:02d}.",
                "furtherReading": references
            }
            
            les_obj = {
                "id": les_id,
                "slug": les_slug,
                "title": les_title,
                "description": les_desc,
                "youtubeVideoId": v["videoId"],
                "videoAttribution": {
                    "creator": v["creator"],
                    "platform": "youtube"
                },
                "durationMinutes": les_duration,
                "order": l_idx,
                "moduleTitle": title,
                "objectives": objectives[:4],
                "tags": ["linux", f"module-{idx:02d}", slugify(phase)],
                "skillsTaught": [c.split(":")[0].replace("**", "") for c in checklist[:4]],
                "richContent": rich_content
            }
            module_lessons.append(les_obj)
            
            sql_lessons.append({
                "uuid": les_uuid,
                "module_uuid": mod_uuid,
                "slug": les_slug,
                "title": les_title,
                "description": les_desc,
                "youtube_video_id": v["videoId"],
                "duration_minutes": les_duration,
                "order_index": l_idx,
                "objectives": objectives[:4],
                "tags": ["linux", f"module-{idx:02d}", slugify(phase)],
                "skills_taught": [c.split(":")[0].replace("**", "") for c in checklist[:4]]
            })

        practical_lab = {
            "id": f"lab-linux-m{idx:02d}",
            "title": f"Module {idx:02d} Hands-on Lab: {title.split(':')[-1].strip()}",
            "objective": f"Complete hands-on terminal tasks for {title} in a dedicated Ubuntu VM without touching host partitions.",
            "toolsRequired": ["Ubuntu Desktop/Server VM", "Bash Terminal", "VirtualBox or UTM"],
            "pcapSource": {
                "fileName": "lab-environment",
                "fileUrl": "https://ubuntu.com/download/desktop"
            },
            "difficulty": "beginner" if "Beginner" in level else "intermediate" if "Intermediate" in level else "advanced",
            "estimatedMinutes": 60,
            "instructions": lab_steps if lab_steps else ["Complete all guided terminal steps and verify expected output."],
            "tasks": [
                {
                    "id": f"task-m{idx:02d}-{t_i+1}",
                    "description": step,
                    "hint": "Verify command output and check logs if any error occurs."
                }
                for t_i, step in enumerate(lab_steps[:6])
            ],
            "evidenceWorksheet": [
                {
                    "field": "terminal_transcript",
                    "prompt": "Paste sanitized terminal output verifying successful lab execution",
                    "expectedEvidenceType": "text"
                }
            ],
            "questions": [],
            "completionCriteria": expected_results if expected_results else ["All lab steps completed and validated."]
        }

        q_data = MODULE_QUIZZES.get(idx, [])
        quiz = {
            "title": f"Module {idx:02d} Knowledge Check",
            "passingScorePercent": 70,
            "questions": [
                {
                    "question": q["question"],
                    "options": q["options"],
                    "correctAnswerIndex": q["correctAnswerIndex"],
                    "explanation": q["explanation"],
                    "difficulty": "beginner" if "Beginner" in level else "intermediate" if "Intermediate" in level else "advanced"
                }
                for q in q_data
            ]
        }

        mod_obj = {
            "id": mod_id,
            "title": title,
            "description": mod_desc,
            "order": idx,
            "lessons": module_lessons,
            "practicalLab": practical_lab,
            "quiz": quiz
        }
        
        if idx == 24:
            capstone = {
                "id": "capstone-linux-sysadmin-security",
                "title": "Final Linux Administration & Security Operations Capstone",
                "scenario": "Deploy a complete, secure Linux server environment in an Ubuntu virtual machine, manage non-root users, configure systemd services, configure UFW host firewall rules, establish SSH key authentication, automate backups with rsync, and generate verification logs.",
                "pcapSource": {
                    "fileName": "capstone-server-environment",
                    "fileUrl": "https://ubuntu.com/download/desktop"
                },
                "totalMarks": 100,
                "passingScore": 75,
                "rubric": [
                    {
                        "category": "System Installation & Baselining",
                        "marks": 20,
                        "criteria": [
                            "Clean Ubuntu VM installation with baseline system information documented",
                            "Snapshot taken and verified prior to service modifications"
                        ]
                    },
                    {
                        "category": "Account Security & Privilege Management",
                        "marks": 20,
                        "criteria": [
                            "Dedicated non-root user created with restricted sudo privileges",
                            "Directory permissions and ownership correctly enforced"
                        ]
                    },
                    {
                        "category": "Services, Daemons & Process Management",
                        "marks": 20,
                        "criteria": [
                            "systemd unit file configured, enabled, and running cleanly",
                            "journald logs inspected and verified for service health"
                        ]
                    },
                    {
                        "category": "Network & Firewall Hardening",
                        "marks": 20,
                        "criteria": [
                            "UFW firewall configured with default-deny inbound and minimal allowed ports",
                            "OpenSSH key-based authentication enforced with root/password login restricted"
                        ]
                    },
                    {
                        "category": "Backups, Automation & Disaster Recovery",
                        "marks": 20,
                        "criteria": [
                            "Automated rsync or tar backup routine tested and validated with restore verification",
                            "Sanitized documentation and operational runbook submitted"
                        ]
                    }
                ],
                "submissionSections": [
                    {
                        "id": "sec-system-baseline",
                        "title": "System Baseline & Kernel Inspection",
                        "prompt": "Provide output of uname -a, cat /etc/os-release, and lscpu from your VM.",
                        "maxMarks": 20
                    },
                    {
                        "id": "sec-account-security",
                        "title": "Account & Permissions Audit",
                        "prompt": "Provide proof of non-root user setup, sudo configuration, and directory permissions.",
                        "maxMarks": 20
                    },
                    {
                        "id": "sec-services-config",
                        "title": "systemd Service Unit & Logging",
                        "prompt": "Provide your custom unit file content and journalctl output confirming clean startup.",
                        "maxMarks": 20
                    },
                    {
                        "id": "sec-firewall-ssh",
                        "title": "UFW Firewall & SSH Key Verification",
                        "prompt": "Provide ufw status verbose and proof of public-key SSH authentication.",
                        "maxMarks": 20
                    },
                    {
                        "id": "sec-backup-recovery",
                        "title": "Backup & Disaster Recovery Drill",
                        "prompt": "Provide rsync command execution log and verification of file checksums on restore.",
                        "maxMarks": 20
                    }
                ]
            }
            mod_obj["capstoneAssessment"] = capstone

        modules.append(mod_obj)
        
        sql_modules.append({
            "uuid": mod_uuid,
            "title": title,
            "description": mod_desc,
            "order_index": idx
        })

    course_data = {
        "id": "course-linux-zero-to-advanced",
        "slug": "linux-zero-to-advanced",
        "title": "Linux Zero → Advanced: Complete Administration & Security",
        "shortDescription": "A comprehensive 24-week zero-to-advanced Linux administration and systems security curriculum with 55 video lessons, hands-on labs, command practice, quizzes, and capstone.",
        "description": "An intensive, hands-on 24-week Linux systems administration and server security curriculum designed for junior administrators, SOC analysts, and security engineers. Master Linux kernel fundamentals, bash shell navigation, file permissions, ACLs, package managers, process lifecycle, systemd daemon management, disk partitioning, LVM snapshots, backups with rsync, cron scheduling, network routing and sockets, OpenSSH administration, UFW firewalls, advanced Bash/AWK/sed scripting, centralized logging with journald/syslog, system performance metrics, LUKS disk encryption, server hardening audits, and a comprehensive end-of-course server operations capstone project.",
        "domains": ["fundamentals", "soc-blue-team"],
        "tags": [
            "linux",
            "sysadmin",
            "bash",
            "systemd",
            "security-hardening",
            "networking",
            "ufw",
            "luks",
            "awk-sed",
            "server-administration"
        ],
        "difficulty": "intermediate",
        "thumbnailUrl": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80",
        "estimatedDuration": "24 weeks (240 hours)",
        "totalDurationMinutes": total_minutes,
        "instructor": {
            "name": "Learn Linux TV & Open Community",
            "title": "Linux Systems Educators",
            "organization": "Learn Linux TV, NetworkChuck & tutoriaLinux"
        },
        "prerequisites": [
            "Basic computer literacy and comfort with general operating system concepts",
            "A PC or Mac capable of running a virtual machine with at least 4 GB of RAM (VirtualBox / UTM)",
            "Curiosity and commitment to practice daily in the Linux command-line terminal"
        ],
        "learningObjectives": [
            "Install, configure, and maintain production-grade Ubuntu Linux systems in virtual environments",
            "Master terminal navigation, core utilities, file management, symlinks, search indexing, and stream redirection",
            "Administer user accounts, groups, shadow passwords, sudo privilege boundaries, and access control lists (ACLs)",
            "Configure, inspect, and troubleshoot systemd unit files, background daemon targets, and boot targets",
            "Manage block storage, partitioning schemes (fdisk), filesystem mounts, and dynamic Logical Volume Management (LVM)",
            "Automate routine systems administration tasks using Cron jobs, systemd timers, Bash scripting, and AWK/sed pipelines",
            "Configure host network interfaces, static routing tables, DNS resolvers, socket monitoring, and OpenSSH key-based authentication",
            "Enforce defensive server security with UFW firewall policies, LUKS full-disk encryption, and CIS-aligned server hardening audits",
            "Deploy, operate, and verify an end-to-end secure Linux server environment in the comprehensive capstone assessment"
        ],
        "featured": True,
        "track": "cybersecurity",
        "modules": modules
    }
    
    ts_content = "import { Course } from '../types/course';\n\n"
    ts_content += f"export const LINUX_ZERO_TO_ADVANCED_COURSE: Course = {json.dumps(course_data, indent=2)};\n"
    
    out_ts_path = os.path.join(base_dir, "src/data/linux-zero-to-advanced-course.ts")
    with open(out_ts_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"Written {out_ts_path} successfully!")
    
    course_uuid = "d7a00000-0000-4000-8000-000000000001"
    sql_lines = [
        "-- =============================================================================",
        "-- CYBERTUBE: SEED LINUX ZERO TO ADVANCED COMPLETE COURSE",
        "-- =============================================================================",
        "-- Description:",
        "-- Idempotently seeds the 24-week Linux Zero to Advanced course,",
        "-- all 24 modules, and all 55 video lessons into the Supabase database.",
        "-- =============================================================================",
        "",
        "DO $$",
        f"DECLARE",
        f"  v_course_id CONSTANT UUID := '{course_uuid}';",
        "BEGIN",
        "  -- 1. Insert/Update Course",
        "  INSERT INTO public.courses (",
        "    id,",
        "    slug,",
        "    title,",
        "    short_description,",
        "    description,",
        "    difficulty,",
        "    estimated_duration,",
        "    total_duration_minutes,",
        "    thumbnail_url,",
        "    instructor_name,",
        "    instructor_title,",
        "    instructor_org,",
        "    status,",
        "    tags,",
        "    prerequisites,",
        "    learning_objectives,",
        "    track,",
        "    domains,",
        "    featured",
        "  ) VALUES (",
        "    v_course_id,",
        "    'linux-zero-to-advanced',",
        f"    {quote_sql(course_data['title'])},",
        f"    {quote_sql(course_data['shortDescription'])},",
        f"    {quote_sql(course_data['description'])},",
        "    'intermediate',",
        "    '24 weeks (240 hours)',",
        f"    {total_minutes},",
        f"    {quote_sql(course_data['thumbnailUrl'])},",
        "    'Learn Linux TV & Open Community',",
        "    'Linux Systems Educators',",
        "    'Learn Linux TV, NetworkChuck & tutoriaLinux',",
        "    'published',",
        f"    {to_pg_array(course_data['tags'])},",
        f"    {to_pg_array(course_data['prerequisites'])},",
        f"    {to_pg_array(course_data['learningObjectives'])},",
        "    'cybersecurity',",
        f"    {to_pg_array(course_data['domains'])},",
        "    TRUE",
        "  )",
        "  ON CONFLICT (slug) DO UPDATE SET",
        "    title = EXCLUDED.title,",
        "    short_description = EXCLUDED.short_description,",
        "    description = EXCLUDED.description,",
        "    difficulty = EXCLUDED.difficulty,",
        "    estimated_duration = EXCLUDED.estimated_duration,",
        "    total_duration_minutes = EXCLUDED.total_duration_minutes,",
        "    thumbnail_url = EXCLUDED.thumbnail_url,",
        "    instructor_name = EXCLUDED.instructor_name,",
        "    instructor_title = EXCLUDED.instructor_title,",
        "    instructor_org = EXCLUDED.instructor_org,",
        "    status = EXCLUDED.status,",
        "    tags = EXCLUDED.tags,",
        "    prerequisites = EXCLUDED.prerequisites,",
        "    learning_objectives = EXCLUDED.learning_objectives,",
        "    track = EXCLUDED.track,",
        "    domains = EXCLUDED.domains,",
        "    featured = EXCLUDED.featured;",
        ""
    ]
    
    sql_lines.append("  -- 2. Insert/Update 24 Modules")
    for sm in sql_modules:
        sql_lines.append(f"  INSERT INTO public.course_modules (id, course_id, title, description, order_index)")
        sql_lines.append(f"  VALUES ('{sm['uuid']}', v_course_id, {quote_sql(sm['title'])}, {quote_sql(sm['description'])}, {sm['order_index']})")
        sql_lines.append(f"  ON CONFLICT (course_id, order_index) DO UPDATE SET")
        sql_lines.append(f"    title = EXCLUDED.title,")
        sql_lines.append(f"    description = EXCLUDED.description;")
        sql_lines.append("")
        
    sql_lines.append("  -- 3. Insert/Update 55 Lessons")
    for sl in sql_lessons:
        sql_lines.append(f"  INSERT INTO public.lessons (")
        sql_lines.append(f"    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught")
        sql_lines.append(f"  ) VALUES (")
        sql_lines.append(f"    '{sl['uuid']}',")
        sql_lines.append(f"    v_course_id,")
        sql_lines.append(f"    '{sl['module_uuid']}',")
        sql_lines.append(f"    {quote_sql(sl['slug'])},")
        sql_lines.append(f"    {quote_sql(sl['title'])},")
        sql_lines.append(f"    {quote_sql(sl['description'])},")
        sql_lines.append(f"    {quote_sql(sl['youtube_video_id'])},")
        sql_lines.append(f"    {sl['duration_minutes']},")
        sql_lines.append(f"    {sl['order_index']},")
        sql_lines.append(f"    {to_pg_array(sl['objectives'])},")
        sql_lines.append(f"    {to_pg_array(sl['tags'])},")
        sql_lines.append(f"    {to_pg_array(sl['skills_taught'])}")
        sql_lines.append(f"  )")
        sql_lines.append(f"  ON CONFLICT (course_id, slug) DO UPDATE SET")
        sql_lines.append(f"    module_id = EXCLUDED.module_id,")
        sql_lines.append(f"    title = EXCLUDED.title,")
        sql_lines.append(f"    description = EXCLUDED.description,")
        sql_lines.append(f"    youtube_video_id = EXCLUDED.youtube_video_id,")
        sql_lines.append(f"    duration_minutes = EXCLUDED.duration_minutes,")
        sql_lines.append(f"    order_index = EXCLUDED.order_index,")
        sql_lines.append(f"    objectives = EXCLUDED.objectives,")
        sql_lines.append(f"    tags = EXCLUDED.tags,")
        sql_lines.append(f"    skills_taught = EXCLUDED.skills_taught;")
        sql_lines.append("")

    sql_lines.append("END $$;")
    
    migration_file = os.path.join(base_dir, "supabase/migrations/20261119170000_seed_linux_zero_to_advanced_course.sql")
    with open(migration_file, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines))
    print(f"Written {migration_file} successfully!")

if __name__ == "__main__":
    generate()
