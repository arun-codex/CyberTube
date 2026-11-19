import { Course } from '../types/course';

export const LINUX_ZERO_TO_ADVANCED_COURSE: Course = {
  "id": "course-linux-zero-to-advanced",
  "slug": "linux-zero-to-advanced",
  "title": "Linux Zero \u2192 Advanced: Complete Administration & Security",
  "shortDescription": "A comprehensive 24-week zero-to-advanced Linux administration and systems security curriculum with 55 video lessons, hands-on labs, command practice, quizzes, and capstone.",
  "description": "An intensive, hands-on 24-week Linux systems administration and server security curriculum designed for junior administrators, SOC analysts, and security engineers. Master Linux kernel fundamentals, bash shell navigation, file permissions, ACLs, package managers, process lifecycle, systemd daemon management, disk partitioning, LVM snapshots, backups with rsync, cron scheduling, network routing and sockets, OpenSSH administration, UFW firewalls, advanced Bash/AWK/sed scripting, centralized logging with journald/syslog, system performance metrics, LUKS disk encryption, server hardening audits, and a comprehensive end-of-course server operations capstone project.",
  "domains": [
    "fundamentals",
    "soc-blue-team"
  ],
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
  "totalDurationMinutes": 1650,
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
  "featured": true,
  "track": "cybersecurity",
  "modules": [
    {
      "id": "mod-linux-m01",
      "title": "Module 01: Linux basics, distributions and a safe lab",
      "description": "Beginner level (Foundations). 1 week (9\u201312 hours). Prerequisite: None. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 1,
      "lessons": [
        {
          "id": "les-linux-m01-l01",
          "slug": "m01-l1-what-is-a-linux-distribution",
          "title": "Module 01 - Lesson 1: What is a Linux distribution?",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 01: Linux basics, distributions and a safe lab. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "6EKzuBAEbOA",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 01: Linux basics, distributions and a safe lab",
          "objectives": [
            "Explain kernel, distribution, shell and terminal",
            "Install an Ubuntu VM without replacing the host OS",
            "Navigate a Linux desktop and locate the terminal",
            "Collect baseline system information"
          ],
          "tags": [
            "linux",
            "module-01",
            "foundations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (What is a Linux distribution?), we explore fundamental aspects of Module 01: Linux basics, distributions and a safe lab. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Basic terminal access"
            ],
            "theorySections": [
              {
                "title": "Overview of What is a Linux distribution?",
                "content": "This lesson covers key systems principles from Module 01: Linux basics, distributions and a safe lab. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain kernel, distribution, shell and terminal",
                  "Install an Ubuntu VM without replacing the host OS",
                  "Navigate a Linux desktop and locate the terminal",
                  "Collect baseline system information"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: uname -a",
                "instruction": "Run `uname -a` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: cat /etc/os-release",
                "instruction": "Run `cat /etc/os-release` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: whoami",
                "instruction": "Run `whoami` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: hostnamectl",
                "instruction": "Run `hostnamectl` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: pwd",
                "instruction": "Run `pwd` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: echo \"$SHELL\"",
                "instruction": "Run `echo \"$SHELL\"` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Ubuntu boots normally without changing the host operating system",
              "`/etc/os-release` displays your Linux distribution",
              "A working VM snapshot and setup notes exist"
            ],
            "commonMistakes": [
              "Confusing an ISO file with an installed operating system.",
              "Giving the VM nearly all host RAM and freezing the computer.",
              "Running random scripts with sudo during setup."
            ],
            "securityRelevance": "Understanding Module 01: Linux basics, distributions and a safe lab is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 01.",
            "furtherReading": [
              {
                "title": "Ubuntu download",
                "url": "https://ubuntu.com/download/desktop"
              },
              {
                "title": "VirtualBox download",
                "url": "https://www.virtualbox.org/wiki/Downloads"
              },
              {
                "title": "Ubuntu VirtualBox tutorial",
                "url": "https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox"
              }
            ]
          }
        },
        {
          "id": "les-linux-m01-l02",
          "slug": "m01-l2-linux-for-hackers-ep1",
          "title": "Module 01 - Lesson 2: Linux for Hackers EP1",
          "description": "Video lesson presented by NetworkChuck. Covers core concepts of Module 01: Linux basics, distributions and a safe lab. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "VbEx7B_PTOE",
          "videoAttribution": {
            "creator": "NetworkChuck",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 01: Linux basics, distributions and a safe lab",
          "objectives": [
            "Explain kernel, distribution, shell and terminal",
            "Install an Ubuntu VM without replacing the host OS",
            "Navigate a Linux desktop and locate the terminal",
            "Collect baseline system information"
          ],
          "tags": [
            "linux",
            "module-01",
            "foundations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Linux for Hackers EP1), we explore fundamental aspects of Module 01: Linux basics, distributions and a safe lab. Follow along with NetworkChuck, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Basic terminal access"
            ],
            "theorySections": [
              {
                "title": "Overview of Linux for Hackers EP1",
                "content": "This lesson covers key systems principles from Module 01: Linux basics, distributions and a safe lab. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain kernel, distribution, shell and terminal",
                  "Install an Ubuntu VM without replacing the host OS",
                  "Navigate a Linux desktop and locate the terminal",
                  "Collect baseline system information"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: uname -a",
                "instruction": "Run `uname -a` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: cat /etc/os-release",
                "instruction": "Run `cat /etc/os-release` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: whoami",
                "instruction": "Run `whoami` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: hostnamectl",
                "instruction": "Run `hostnamectl` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: pwd",
                "instruction": "Run `pwd` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: echo \"$SHELL\"",
                "instruction": "Run `echo \"$SHELL\"` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Ubuntu boots normally without changing the host operating system",
              "`/etc/os-release` displays your Linux distribution",
              "A working VM snapshot and setup notes exist"
            ],
            "commonMistakes": [
              "Confusing an ISO file with an installed operating system.",
              "Giving the VM nearly all host RAM and freezing the computer.",
              "Running random scripts with sudo during setup."
            ],
            "securityRelevance": "Understanding Module 01: Linux basics, distributions and a safe lab is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 01.",
            "furtherReading": [
              {
                "title": "Ubuntu download",
                "url": "https://ubuntu.com/download/desktop"
              },
              {
                "title": "VirtualBox download",
                "url": "https://www.virtualbox.org/wiki/Downloads"
              },
              {
                "title": "Ubuntu VirtualBox tutorial",
                "url": "https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m01",
        "title": "Module 01 Hands-on Lab: Linux basics, distributions and a safe lab",
        "objective": "Complete hands-on terminal tasks for Module 01: Linux basics, distributions and a safe lab in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Download Ubuntu Desktop only from its official site and VirtualBox from the official download page.",
          "Create a new VM with at least 2 vCPUs, 4 GiB RAM if available, and a 25 GiB dynamically allocated virtual disk. Do not select your real computer drive as the installation target.",
          "Install Ubuntu in the virtual disk; keep networking in NAT mode initially.",
          "Open the terminal (Ctrl+Alt+T) and execute every command listed in the command table.",
          "Create a VM snapshot called `linux-week-01-clean`.",
          "Create `~/linux-course/01-setup/` and write your Ubuntu version, username, date and VM settings to `system-info.md`."
        ],
        "tasks": [
          {
            "id": "task-m01-1",
            "description": "Download Ubuntu Desktop only from its official site and VirtualBox from the official download page.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m01-2",
            "description": "Create a new VM with at least 2 vCPUs, 4 GiB RAM if available, and a 25 GiB dynamically allocated virtual disk. Do not select your real computer drive as the installation target.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m01-3",
            "description": "Install Ubuntu in the virtual disk; keep networking in NAT mode initially.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m01-4",
            "description": "Open the terminal (Ctrl+Alt+T) and execute every command listed in the command table.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m01-5",
            "description": "Create a VM snapshot called `linux-week-01-clean`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m01-6",
            "description": "Create `~/linux-course/01-setup/` and write your Ubuntu version, username, date and VM settings to `system-info.md`.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Ubuntu boots normally without changing the host operating system",
          "`/etc/os-release` displays your Linux distribution",
          "A working VM snapshot and setup notes exist"
        ]
      },
      "quiz": {
        "title": "Module 01 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the primary role of the Linux operating system kernel?",
            "options": [
              "Rendering the desktop user interface and window decorations",
              "Managing hardware resources, memory allocation, and CPU scheduling for processes",
              "Providing a bash command shell prompt for interactive typing",
              "Compiling C code directly into machine binaries"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The Linux kernel is the core component that mediates between system hardware (CPU, RAM, disk, network) and userland applications.",
            "difficulty": "beginner"
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
            "explanation": "A VM runs inside a hypervisor (such as VirtualBox) on your existing OS, providing a safe, sandboxed environment without touching host partitions.",
            "difficulty": "beginner"
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
            "explanation": "Kali is specialized for penetration testing and forensics. Standard distributions like Ubuntu or Debian teach proper enterprise sysadmin conventions, non-root user privilege boundaries, and standard service lifecycles.",
            "difficulty": "beginner"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m02",
      "title": "Module 02: Terminal navigation and Linux filesystem hierarchy",
      "description": "Beginner level (Foundations). 1 week (9\u201312 hours). Prerequisite: Module 01. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 2,
      "lessons": [
        {
          "id": "les-linux-m02-l01",
          "slug": "m02-l1-navigating-the-linux-filesystem",
          "title": "Module 02 - Lesson 1: Navigating the Linux Filesystem",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 02: Terminal navigation and Linux filesystem hierarchy. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "BNL3qBN9pP0",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 02: Terminal navigation and Linux filesystem hierarchy",
          "objectives": [
            "Move through Linux entirely from terminal",
            "Distinguish absolute and relative paths",
            "Describe major filesystem directories",
            "Use built-in command help"
          ],
          "tags": [
            "linux",
            "module-02",
            "foundations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Navigating the Linux Filesystem), we explore fundamental aspects of Module 02: Terminal navigation and Linux filesystem hierarchy. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 01"
            ],
            "theorySections": [
              {
                "title": "Overview of Navigating the Linux Filesystem",
                "content": "This lesson covers key systems principles from Module 02: Terminal navigation and Linux filesystem hierarchy. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Move through Linux entirely from terminal",
                  "Distinguish absolute and relative paths",
                  "Describe major filesystem directories",
                  "Use built-in command help"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: pwd",
                "instruction": "Run `pwd` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: ls -lah",
                "instruction": "Run `ls -lah` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: cd /etc",
                "instruction": "Run `cd /etc` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: cd ~",
                "instruction": "Run `cd ~` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: ls /var",
                "instruction": "Run `ls /var` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: man ls",
                "instruction": "Run `man ls` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can reach any supplied absolute path without GUI",
              "Can explain the difference between `.` and `..`",
              "Filesystem table and command history notes saved"
            ],
            "commonMistakes": [
              "Mistaking `/` for `~`.",
              "Assuming all files have extensions.",
              "Copying commands without understanding the current directory."
            ],
            "securityRelevance": "Understanding Module 02: Terminal navigation and Linux filesystem hierarchy is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 02.",
            "furtherReading": [
              {
                "title": "Filesystem Hierarchy Standard",
                "url": "https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html"
              },
              {
                "title": "Linux Journey",
                "url": "https://linuxjourney.com/"
              }
            ]
          }
        },
        {
          "id": "les-linux-m02-l02",
          "slug": "m02-l2-how-to-use-ls",
          "title": "Module 02 - Lesson 2: How to use ls",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 02: Terminal navigation and Linux filesystem hierarchy. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "43hcVCt_GMc",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 02: Terminal navigation and Linux filesystem hierarchy",
          "objectives": [
            "Move through Linux entirely from terminal",
            "Distinguish absolute and relative paths",
            "Describe major filesystem directories",
            "Use built-in command help"
          ],
          "tags": [
            "linux",
            "module-02",
            "foundations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (How to use ls), we explore fundamental aspects of Module 02: Terminal navigation and Linux filesystem hierarchy. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 01"
            ],
            "theorySections": [
              {
                "title": "Overview of How to use ls",
                "content": "This lesson covers key systems principles from Module 02: Terminal navigation and Linux filesystem hierarchy. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Move through Linux entirely from terminal",
                  "Distinguish absolute and relative paths",
                  "Describe major filesystem directories",
                  "Use built-in command help"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: pwd",
                "instruction": "Run `pwd` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: ls -lah",
                "instruction": "Run `ls -lah` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: cd /etc",
                "instruction": "Run `cd /etc` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: cd ~",
                "instruction": "Run `cd ~` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: ls /var",
                "instruction": "Run `ls /var` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: man ls",
                "instruction": "Run `man ls` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can reach any supplied absolute path without GUI",
              "Can explain the difference between `.` and `..`",
              "Filesystem table and command history notes saved"
            ],
            "commonMistakes": [
              "Mistaking `/` for `~`.",
              "Assuming all files have extensions.",
              "Copying commands without understanding the current directory."
            ],
            "securityRelevance": "Understanding Module 02: Terminal navigation and Linux filesystem hierarchy is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 02.",
            "furtherReading": [
              {
                "title": "Filesystem Hierarchy Standard",
                "url": "https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html"
              },
              {
                "title": "Linux Journey",
                "url": "https://linuxjourney.com/"
              }
            ]
          }
        },
        {
          "id": "les-linux-m02-l03",
          "slug": "m02-l3-full-command-line-course-navigation",
          "title": "Module 02 - Lesson 3: Full command-line course: navigation",
          "description": "Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 02: Terminal navigation and Linux filesystem hierarchy. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "avg65oY7sj4",
          "videoAttribution": {
            "creator": "MichaelsTechTutorials",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 3,
          "moduleTitle": "Module 02: Terminal navigation and Linux filesystem hierarchy",
          "objectives": [
            "Move through Linux entirely from terminal",
            "Distinguish absolute and relative paths",
            "Describe major filesystem directories",
            "Use built-in command help"
          ],
          "tags": [
            "linux",
            "module-02",
            "foundations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Full command-line course: navigation), we explore fundamental aspects of Module 02: Terminal navigation and Linux filesystem hierarchy. Follow along with MichaelsTechTutorials, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 01"
            ],
            "theorySections": [
              {
                "title": "Overview of Full command-line course: navigation",
                "content": "This lesson covers key systems principles from Module 02: Terminal navigation and Linux filesystem hierarchy. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Move through Linux entirely from terminal",
                  "Distinguish absolute and relative paths",
                  "Describe major filesystem directories",
                  "Use built-in command help"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: pwd",
                "instruction": "Run `pwd` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: ls -lah",
                "instruction": "Run `ls -lah` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: cd /etc",
                "instruction": "Run `cd /etc` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: cd ~",
                "instruction": "Run `cd ~` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: ls /var",
                "instruction": "Run `ls /var` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: man ls",
                "instruction": "Run `man ls` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can reach any supplied absolute path without GUI",
              "Can explain the difference between `.` and `..`",
              "Filesystem table and command history notes saved"
            ],
            "commonMistakes": [
              "Mistaking `/` for `~`.",
              "Assuming all files have extensions.",
              "Copying commands without understanding the current directory."
            ],
            "securityRelevance": "Understanding Module 02: Terminal navigation and Linux filesystem hierarchy is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 02.",
            "furtherReading": [
              {
                "title": "Filesystem Hierarchy Standard",
                "url": "https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html"
              },
              {
                "title": "Linux Journey",
                "url": "https://linuxjourney.com/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m02",
        "title": "Module 02 Hands-on Lab: Terminal navigation and Linux filesystem hierarchy",
        "objective": "Complete hands-on terminal tasks for Module 02: Terminal navigation and Linux filesystem hierarchy in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Make `~/linux-course/02-navigation/` and enter it from an arbitrary starting location.",
          "Navigate to `/etc`, `/var/log`, `/usr/bin`, `/tmp` and back to your home directory.",
          "List hidden files with `ls -la` and compare to plain `ls`.",
          "Run `man ls`, search inside the manual with `/color`, and quit with `q`.",
          "Use tab completion to complete a directory name; review 10 history items.",
          "Write a short table of seven Linux directories and their purposes."
        ],
        "tasks": [
          {
            "id": "task-m02-1",
            "description": "Make `~/linux-course/02-navigation/` and enter it from an arbitrary starting location.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m02-2",
            "description": "Navigate to `/etc`, `/var/log`, `/usr/bin`, `/tmp` and back to your home directory.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m02-3",
            "description": "List hidden files with `ls -la` and compare to plain `ls`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m02-4",
            "description": "Run `man ls`, search inside the manual with `/color`, and quit with `q`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m02-5",
            "description": "Use tab completion to complete a directory name; review 10 history items.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m02-6",
            "description": "Write a short table of seven Linux directories and their purposes.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Can reach any supplied absolute path without GUI",
          "Can explain the difference between `.` and `..`",
          "Filesystem table and command history notes saved"
        ]
      },
      "quiz": {
        "title": "Module 02 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What defines an absolute path in the Linux filesystem hierarchy?",
            "options": [
              "Any path that begins relative to the current working directory",
              "Any path that begins with the root slash (/) and resolves from the top of the entire filesystem tree",
              "Any path containing a tilde (~) symbol",
              "Any file located in the user's home folder"
            ],
            "correctAnswerIndex": 1,
            "explanation": "An absolute path always starts with the root directory (/), unambiguous regardless of the current working directory.",
            "difficulty": "beginner"
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
            "explanation": "/etc contains host-specific system configuration files and scripts required for system-wide services and daemon settings.",
            "difficulty": "beginner"
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
            "explanation": "'man ls' opens the official system reference manual page describing all command switches, formatting options, and behavior.",
            "difficulty": "beginner"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m03",
      "title": "Module 03: Files, directories, links and search",
      "description": "Beginner level (Foundations). 1 week (9\u201312 hours). Prerequisite: Module 02. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 3,
      "lessons": [
        {
          "id": "les-linux-m03-l01",
          "slug": "m03-l1-the-find-command",
          "title": "Module 03 - Lesson 1: The find command",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 03: Files, directories, links and search. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "skTiK_6DdqU",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 03: Files, directories, links and search",
          "objectives": [
            "Create, organize and rename files safely",
            "Search by path and metadata",
            "Understand symbolic links and file types",
            "Avoid risky recursive deletion"
          ],
          "tags": [
            "linux",
            "module-03",
            "foundations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (The find command), we explore fundamental aspects of Module 03: Files, directories, links and search. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 02"
            ],
            "theorySections": [
              {
                "title": "Overview of The find command",
                "content": "This lesson covers key systems principles from Module 03: Files, directories, links and search. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Create, organize and rename files safely",
                  "Search by path and metadata",
                  "Understand symbolic links and file types",
                  "Avoid risky recursive deletion"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: mkdir -p ~/linux-course/03-files/{original,archive}",
                "instruction": "Run `mkdir -p ~/linux-course/03-files/{original,archive}` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: touch ~/linux-course/03-files/original/a.txt",
                "instruction": "Run `touch ~/linux-course/03-files/original/a.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: cp ~/linux-course/03-files/original/a.txt ~/linux-course/03-files/archive/",
                "instruction": "Run `cp ~/linux-course/03-files/original/a.txt ~/linux-course/03-files/archive/` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: find ~/linux-course/03-files -type f",
                "instruction": "Run `find ~/linux-course/03-files -type f` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: stat ~/linux-course/03-files/original/a.txt",
                "instruction": "Run `stat ~/linux-course/03-files/original/a.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: ln -s ~/linux-course/03-files/original/a.txt ~/linux-course/03-files/link.txt",
                "instruction": "Run `ln -s ~/linux-course/03-files/original/a.txt ~/linux-course/03-files/link.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Directory tree contains both original and archive files",
              "Search returns only intended sample files",
              "You can explain when a symlink becomes broken"
            ],
            "commonMistakes": [
              "Using `rm -rf` without checking the path.",
              "Thinking a symlink is a duplicate file.",
              "Forgetting quotes for filenames with spaces."
            ],
            "securityRelevance": "Understanding Module 03: Files, directories, links and search is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 03.",
            "furtherReading": [
              {
                "title": "GNU find manual",
                "url": "https://www.gnu.org/software/findutils/manual/html_mono/find.html"
              },
              {
                "title": "Linux Command Line book",
                "url": "https://linuxcommand.org/tlcl.php"
              }
            ]
          }
        },
        {
          "id": "les-linux-m03-l02",
          "slug": "m03-l2-full-command-line-course-files-and-directories",
          "title": "Module 03 - Lesson 2: Full command-line course: files and directories",
          "description": "Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 03: Files, directories, links and search. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "avg65oY7sj4",
          "videoAttribution": {
            "creator": "MichaelsTechTutorials",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 03: Files, directories, links and search",
          "objectives": [
            "Create, organize and rename files safely",
            "Search by path and metadata",
            "Understand symbolic links and file types",
            "Avoid risky recursive deletion"
          ],
          "tags": [
            "linux",
            "module-03",
            "foundations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Full command-line course: files and directories), we explore fundamental aspects of Module 03: Files, directories, links and search. Follow along with MichaelsTechTutorials, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 02"
            ],
            "theorySections": [
              {
                "title": "Overview of Full command-line course: files and directories",
                "content": "This lesson covers key systems principles from Module 03: Files, directories, links and search. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Create, organize and rename files safely",
                  "Search by path and metadata",
                  "Understand symbolic links and file types",
                  "Avoid risky recursive deletion"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: mkdir -p ~/linux-course/03-files/{original,archive}",
                "instruction": "Run `mkdir -p ~/linux-course/03-files/{original,archive}` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: touch ~/linux-course/03-files/original/a.txt",
                "instruction": "Run `touch ~/linux-course/03-files/original/a.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: cp ~/linux-course/03-files/original/a.txt ~/linux-course/03-files/archive/",
                "instruction": "Run `cp ~/linux-course/03-files/original/a.txt ~/linux-course/03-files/archive/` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: find ~/linux-course/03-files -type f",
                "instruction": "Run `find ~/linux-course/03-files -type f` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: stat ~/linux-course/03-files/original/a.txt",
                "instruction": "Run `stat ~/linux-course/03-files/original/a.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: ln -s ~/linux-course/03-files/original/a.txt ~/linux-course/03-files/link.txt",
                "instruction": "Run `ln -s ~/linux-course/03-files/original/a.txt ~/linux-course/03-files/link.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Directory tree contains both original and archive files",
              "Search returns only intended sample files",
              "You can explain when a symlink becomes broken"
            ],
            "commonMistakes": [
              "Using `rm -rf` without checking the path.",
              "Thinking a symlink is a duplicate file.",
              "Forgetting quotes for filenames with spaces."
            ],
            "securityRelevance": "Understanding Module 03: Files, directories, links and search is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 03.",
            "furtherReading": [
              {
                "title": "GNU find manual",
                "url": "https://www.gnu.org/software/findutils/manual/html_mono/find.html"
              },
              {
                "title": "Linux Command Line book",
                "url": "https://linuxcommand.org/tlcl.php"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m03",
        "title": "Module 03 Hands-on Lab: Files, directories, links and search",
        "objective": "Complete hands-on terminal tasks for Module 03: Files, directories, links and search in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Run the commands above in your home folder only.",
          "Create five additional files, copy two, and rename one.",
          "Add a symlink and observe `ls -l` output; move the target to see what happens.",
          "Use `find` to list all `.txt` files and identify files modified today.",
          "Compare `stat` timestamps before and after editing a file.",
          "Move unnecessary test files to an archive folder instead of using destructive removal."
        ],
        "tasks": [
          {
            "id": "task-m03-1",
            "description": "Run the commands above in your home folder only.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m03-2",
            "description": "Create five additional files, copy two, and rename one.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m03-3",
            "description": "Add a symlink and observe `ls -l` output; move the target to see what happens.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m03-4",
            "description": "Use `find` to list all `.txt` files and identify files modified today.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m03-5",
            "description": "Compare `stat` timestamps before and after editing a file.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m03-6",
            "description": "Move unnecessary test files to an archive folder instead of using destructive removal.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Directory tree contains both original and archive files",
          "Search returns only intended sample files",
          "You can explain when a symlink becomes broken"
        ]
      },
      "quiz": {
        "title": "Module 03 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What does the option '-type f' specify when executing the 'find' command?",
            "options": [
              "Filter and return only regular files, ignoring directories, sockets, and block devices",
              "Force delete all matched filesystem entries",
              "Search only for files formatted as FAT32",
              "Display file permissions in octal format"
            ],
            "correctAnswerIndex": 0,
            "explanation": "In 'find', '-type f' restricts the search results exclusively to regular files.",
            "difficulty": "beginner"
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
            "explanation": "'rm -rf /' tells the system to recursively remove all files from root downwards without prompting, destroying system binaries, libraries, and kernel modules.",
            "difficulty": "beginner"
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
            "explanation": "A hard link shares the exact same inode as the original file; a symlink (soft link) is a pointer file containing the path to another file and breaks if the target is moved.",
            "difficulty": "beginner"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m04",
      "title": "Module 04: File viewers, Nano, Vim and command documentation",
      "description": "Beginner level (Foundations). 1 week (9\u201312 hours). Prerequisite: Module 03. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 4,
      "lessons": [
        {
          "id": "les-linux-m04-l01",
          "slug": "m04-l1-the-cat-command",
          "title": "Module 04 - Lesson 1: The cat command",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 04: File viewers, Nano, Vim and command documentation. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "z3nJlyrJYW4",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 04: File viewers, Nano, Vim and command documentation",
          "objectives": [
            "Read small and large text files",
            "Make edits confidently in Nano",
            "Navigate and save changes in Vim",
            "Use man pages to learn new options"
          ],
          "tags": [
            "linux",
            "module-04",
            "foundations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (The cat command), we explore fundamental aspects of Module 04: File viewers, Nano, Vim and command documentation. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 03"
            ],
            "theorySections": [
              {
                "title": "Overview of The cat command",
                "content": "This lesson covers key systems principles from Module 04: File viewers, Nano, Vim and command documentation. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Read small and large text files",
                  "Make edits confidently in Nano",
                  "Navigate and save changes in Vim",
                  "Use man pages to learn new options"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: printf \"alpha\\nbeta\\ngamma\\n\" > ~/linux-course/04-notes.txt",
                "instruction": "Run `printf \"alpha\\nbeta\\ngamma\\n\" > ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: cat ~/linux-course/04-notes.txt",
                "instruction": "Run `cat ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: less ~/linux-course/04-notes.txt",
                "instruction": "Run `less ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: head -n 2 ~/linux-course/04-notes.txt",
                "instruction": "Run `head -n 2 ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: nano ~/linux-course/04-notes.txt",
                "instruction": "Run `nano ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: man grep",
                "instruction": "Run `man grep` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Both editors can save changes successfully",
              "You can exit Vim intentionally",
              "You know which viewer to use for large logs"
            ],
            "commonMistakes": [
              "Being stuck in Vim insert mode.",
              "Editing protected files instead of local examples.",
              "Expecting `cat` to paginate long output."
            ],
            "securityRelevance": "Understanding Module 04: File viewers, Nano, Vim and command documentation is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 04.",
            "furtherReading": [
              {
                "title": "GNU nano manual",
                "url": "https://www.nano-editor.org/docs.php"
              },
              {
                "title": "Vim user manual",
                "url": "https://vimhelp.org/usr_toc.txt.html"
              }
            ]
          }
        },
        {
          "id": "les-linux-m04-l02",
          "slug": "m04-l2-learn-the-man-command",
          "title": "Module 04 - Lesson 2: Learn the man command",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 04: File viewers, Nano, Vim and command documentation. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "7BG-Devm7sA",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 04: File viewers, Nano, Vim and command documentation",
          "objectives": [
            "Read small and large text files",
            "Make edits confidently in Nano",
            "Navigate and save changes in Vim",
            "Use man pages to learn new options"
          ],
          "tags": [
            "linux",
            "module-04",
            "foundations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Learn the man command), we explore fundamental aspects of Module 04: File viewers, Nano, Vim and command documentation. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 03"
            ],
            "theorySections": [
              {
                "title": "Overview of Learn the man command",
                "content": "This lesson covers key systems principles from Module 04: File viewers, Nano, Vim and command documentation. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Read small and large text files",
                  "Make edits confidently in Nano",
                  "Navigate and save changes in Vim",
                  "Use man pages to learn new options"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: printf \"alpha\\nbeta\\ngamma\\n\" > ~/linux-course/04-notes.txt",
                "instruction": "Run `printf \"alpha\\nbeta\\ngamma\\n\" > ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: cat ~/linux-course/04-notes.txt",
                "instruction": "Run `cat ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: less ~/linux-course/04-notes.txt",
                "instruction": "Run `less ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: head -n 2 ~/linux-course/04-notes.txt",
                "instruction": "Run `head -n 2 ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: nano ~/linux-course/04-notes.txt",
                "instruction": "Run `nano ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: man grep",
                "instruction": "Run `man grep` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Both editors can save changes successfully",
              "You can exit Vim intentionally",
              "You know which viewer to use for large logs"
            ],
            "commonMistakes": [
              "Being stuck in Vim insert mode.",
              "Editing protected files instead of local examples.",
              "Expecting `cat` to paginate long output."
            ],
            "securityRelevance": "Understanding Module 04: File viewers, Nano, Vim and command documentation is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 04.",
            "furtherReading": [
              {
                "title": "GNU nano manual",
                "url": "https://www.nano-editor.org/docs.php"
              },
              {
                "title": "Vim user manual",
                "url": "https://vimhelp.org/usr_toc.txt.html"
              }
            ]
          }
        },
        {
          "id": "les-linux-m04-l03",
          "slug": "m04-l3-full-command-line-course-nano-and-vi",
          "title": "Module 04 - Lesson 3: Full command-line course: Nano and vi",
          "description": "Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 04: File viewers, Nano, Vim and command documentation. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "avg65oY7sj4",
          "videoAttribution": {
            "creator": "MichaelsTechTutorials",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 3,
          "moduleTitle": "Module 04: File viewers, Nano, Vim and command documentation",
          "objectives": [
            "Read small and large text files",
            "Make edits confidently in Nano",
            "Navigate and save changes in Vim",
            "Use man pages to learn new options"
          ],
          "tags": [
            "linux",
            "module-04",
            "foundations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Full command-line course: Nano and vi), we explore fundamental aspects of Module 04: File viewers, Nano, Vim and command documentation. Follow along with MichaelsTechTutorials, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 03"
            ],
            "theorySections": [
              {
                "title": "Overview of Full command-line course: Nano and vi",
                "content": "This lesson covers key systems principles from Module 04: File viewers, Nano, Vim and command documentation. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Read small and large text files",
                  "Make edits confidently in Nano",
                  "Navigate and save changes in Vim",
                  "Use man pages to learn new options"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: printf \"alpha\\nbeta\\ngamma\\n\" > ~/linux-course/04-notes.txt",
                "instruction": "Run `printf \"alpha\\nbeta\\ngamma\\n\" > ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: cat ~/linux-course/04-notes.txt",
                "instruction": "Run `cat ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: less ~/linux-course/04-notes.txt",
                "instruction": "Run `less ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: head -n 2 ~/linux-course/04-notes.txt",
                "instruction": "Run `head -n 2 ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: nano ~/linux-course/04-notes.txt",
                "instruction": "Run `nano ~/linux-course/04-notes.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: man grep",
                "instruction": "Run `man grep` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Both editors can save changes successfully",
              "You can exit Vim intentionally",
              "You know which viewer to use for large logs"
            ],
            "commonMistakes": [
              "Being stuck in Vim insert mode.",
              "Editing protected files instead of local examples.",
              "Expecting `cat` to paginate long output."
            ],
            "securityRelevance": "Understanding Module 04: File viewers, Nano, Vim and command documentation is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 04.",
            "furtherReading": [
              {
                "title": "GNU nano manual",
                "url": "https://www.nano-editor.org/docs.php"
              },
              {
                "title": "Vim user manual",
                "url": "https://vimhelp.org/usr_toc.txt.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m04",
        "title": "Module 04 Hands-on Lab: File viewers, Nano, Vim and command documentation",
        "objective": "Complete hands-on terminal tasks for Module 04: File viewers, Nano, Vim and command documentation in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Create a file with ten lines of Linux notes.",
          "Use `cat`, `head`, `tail` and `less` to inspect it; record the difference.",
          "Open in Nano, add a new line, save with Ctrl+O and exit with Ctrl+X.",
          "Open in Vim; press `i`, add a line, press Escape, then `:wq`.",
          "Find `grep` options with `man grep` and write down `-n` and `-i`.",
          "Capture a screenshot or text transcript of the changed file."
        ],
        "tasks": [
          {
            "id": "task-m04-1",
            "description": "Create a file with ten lines of Linux notes.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m04-2",
            "description": "Use `cat`, `head`, `tail` and `less` to inspect it; record the difference.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m04-3",
            "description": "Open in Nano, add a new line, save with Ctrl+O and exit with Ctrl+X.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m04-4",
            "description": "Open in Vim; press `i`, add a line, press Escape, then `:wq`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m04-5",
            "description": "Find `grep` options with `man grep` and write down `-n` and `-i`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m04-6",
            "description": "Capture a screenshot or text transcript of the changed file.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Both editors can save changes successfully",
          "You can exit Vim intentionally",
          "You know which viewer to use for large logs"
        ]
      },
      "quiz": {
        "title": "Module 04 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "How do you exit the Vim editor immediately without saving any pending modifications?",
            "options": [
              "Press Ctrl+C followed by Enter",
              "Type :q! in Normal mode and press Enter",
              "Press Esc followed by :wq",
              "Type exit in Insert mode"
            ],
            "correctAnswerIndex": 1,
            "explanation": "In Vim, ':q!' forces an exit from command mode, discarding all unsaved changes.",
            "difficulty": "beginner"
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
            "explanation": "'less' pages through files without reading the entire file into memory upfront, enabling fast scrolling and pattern searching.",
            "difficulty": "beginner"
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
            "explanation": "Man page section 8 is reserved for system administration commands and root maintenance daemons.",
            "difficulty": "beginner"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m05",
      "title": "Module 05: Pipes, redirection and Linux text filters",
      "description": "Beginner level (Foundations). 1 week (9\u201312 hours). Prerequisite: Module 04. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 5,
      "lessons": [
        {
          "id": "les-linux-m05-l01",
          "slug": "m05-l1-linux-data-streams",
          "title": "Module 05 - Lesson 1: Linux Data Streams",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 05: Pipes, redirection and Linux text filters. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "zMKacHGuIHI",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 05: Pipes, redirection and Linux text filters",
          "objectives": [
            "Use stdin, stdout and stderr intentionally",
            "Chain commands with pipes",
            "Search logs and text efficiently",
            "Count, sort and deduplicate records"
          ],
          "tags": [
            "linux",
            "module-05",
            "foundations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Linux Data Streams), we explore fundamental aspects of Module 05: Pipes, redirection and Linux text filters. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 04"
            ],
            "theorySections": [
              {
                "title": "Overview of Linux Data Streams",
                "content": "This lesson covers key systems principles from Module 05: Pipes, redirection and Linux text filters. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Use stdin, stdout and stderr intentionally",
                  "Chain commands with pipes",
                  "Search logs and text efficiently",
                  "Count, sort and deduplicate records"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: printf \"ok\\nfail\\nok\\nfail\\nok\\n\" > ~/linux-course/05-events.txt",
                "instruction": "Run `printf \"ok\\nfail\\nok\\nfail\\nok\\n\" > ~/linux-course/05-events.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: grep -n \"fail\" ~/linux-course/05-events.txt",
                "instruction": "Run `grep -n \"fail\" ~/linux-course/05-events.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: sort ~/linux-course/05-events.txt | uniq -c",
                "instruction": "Run `sort ~/linux-course/05-events.txt | uniq -c` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: wc -l ~/linux-course/05-events.txt",
                "instruction": "Run `wc -l ~/linux-course/05-events.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: grep \"fail\" ~/linux-course/05-events.txt | tee ~/linux-course/05-failures.txt",
                "instruction": "Run `grep \"fail\" ~/linux-course/05-events.txt | tee ~/linux-course/05-failures.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Count should report five sample lines",
              "`uniq -c` correctly aggregates duplicated values",
              "Saved reports match expected filtered output"
            ],
            "commonMistakes": [
              "Using `>` when you meant `>>`.",
              "Forgetting that `uniq` usually requires sorted input.",
              "Not quoting patterns that contain spaces."
            ],
            "securityRelevance": "Understanding Module 05: Pipes, redirection and Linux text filters is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 05.",
            "furtherReading": [
              {
                "title": "GNU grep manual",
                "url": "https://www.gnu.org/software/grep/manual/grep.html"
              },
              {
                "title": "Missing Semester shell tools",
                "url": "https://missing.csail.mit.edu/2020/shell-tools/"
              }
            ]
          }
        },
        {
          "id": "les-linux-m05-l02",
          "slug": "m05-l2-grep-command",
          "title": "Module 05 - Lesson 2: grep command",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 05: Pipes, redirection and Linux text filters. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "Tc_jntovCM0",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 05: Pipes, redirection and Linux text filters",
          "objectives": [
            "Use stdin, stdout and stderr intentionally",
            "Chain commands with pipes",
            "Search logs and text efficiently",
            "Count, sort and deduplicate records"
          ],
          "tags": [
            "linux",
            "module-05",
            "foundations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (grep command), we explore fundamental aspects of Module 05: Pipes, redirection and Linux text filters. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 04"
            ],
            "theorySections": [
              {
                "title": "Overview of grep command",
                "content": "This lesson covers key systems principles from Module 05: Pipes, redirection and Linux text filters. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Use stdin, stdout and stderr intentionally",
                  "Chain commands with pipes",
                  "Search logs and text efficiently",
                  "Count, sort and deduplicate records"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: printf \"ok\\nfail\\nok\\nfail\\nok\\n\" > ~/linux-course/05-events.txt",
                "instruction": "Run `printf \"ok\\nfail\\nok\\nfail\\nok\\n\" > ~/linux-course/05-events.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: grep -n \"fail\" ~/linux-course/05-events.txt",
                "instruction": "Run `grep -n \"fail\" ~/linux-course/05-events.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: sort ~/linux-course/05-events.txt | uniq -c",
                "instruction": "Run `sort ~/linux-course/05-events.txt | uniq -c` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: wc -l ~/linux-course/05-events.txt",
                "instruction": "Run `wc -l ~/linux-course/05-events.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: grep \"fail\" ~/linux-course/05-events.txt | tee ~/linux-course/05-failures.txt",
                "instruction": "Run `grep \"fail\" ~/linux-course/05-events.txt | tee ~/linux-course/05-failures.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Count should report five sample lines",
              "`uniq -c` correctly aggregates duplicated values",
              "Saved reports match expected filtered output"
            ],
            "commonMistakes": [
              "Using `>` when you meant `>>`.",
              "Forgetting that `uniq` usually requires sorted input.",
              "Not quoting patterns that contain spaces."
            ],
            "securityRelevance": "Understanding Module 05: Pipes, redirection and Linux text filters is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 05.",
            "furtherReading": [
              {
                "title": "GNU grep manual",
                "url": "https://www.gnu.org/software/grep/manual/grep.html"
              },
              {
                "title": "Missing Semester shell tools",
                "url": "https://missing.csail.mit.edu/2020/shell-tools/"
              }
            ]
          }
        },
        {
          "id": "les-linux-m05-l03",
          "slug": "m05-l3-full-command-line-course-redirection",
          "title": "Module 05 - Lesson 3: Full command-line course: redirection",
          "description": "Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 05: Pipes, redirection and Linux text filters. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "avg65oY7sj4",
          "videoAttribution": {
            "creator": "MichaelsTechTutorials",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 3,
          "moduleTitle": "Module 05: Pipes, redirection and Linux text filters",
          "objectives": [
            "Use stdin, stdout and stderr intentionally",
            "Chain commands with pipes",
            "Search logs and text efficiently",
            "Count, sort and deduplicate records"
          ],
          "tags": [
            "linux",
            "module-05",
            "foundations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Full command-line course: redirection), we explore fundamental aspects of Module 05: Pipes, redirection and Linux text filters. Follow along with MichaelsTechTutorials, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 04"
            ],
            "theorySections": [
              {
                "title": "Overview of Full command-line course: redirection",
                "content": "This lesson covers key systems principles from Module 05: Pipes, redirection and Linux text filters. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Use stdin, stdout and stderr intentionally",
                  "Chain commands with pipes",
                  "Search logs and text efficiently",
                  "Count, sort and deduplicate records"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: printf \"ok\\nfail\\nok\\nfail\\nok\\n\" > ~/linux-course/05-events.txt",
                "instruction": "Run `printf \"ok\\nfail\\nok\\nfail\\nok\\n\" > ~/linux-course/05-events.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: grep -n \"fail\" ~/linux-course/05-events.txt",
                "instruction": "Run `grep -n \"fail\" ~/linux-course/05-events.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: sort ~/linux-course/05-events.txt | uniq -c",
                "instruction": "Run `sort ~/linux-course/05-events.txt | uniq -c` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: wc -l ~/linux-course/05-events.txt",
                "instruction": "Run `wc -l ~/linux-course/05-events.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: grep \"fail\" ~/linux-course/05-events.txt | tee ~/linux-course/05-failures.txt",
                "instruction": "Run `grep \"fail\" ~/linux-course/05-events.txt | tee ~/linux-course/05-failures.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Count should report five sample lines",
              "`uniq -c` correctly aggregates duplicated values",
              "Saved reports match expected filtered output"
            ],
            "commonMistakes": [
              "Using `>` when you meant `>>`.",
              "Forgetting that `uniq` usually requires sorted input.",
              "Not quoting patterns that contain spaces."
            ],
            "securityRelevance": "Understanding Module 05: Pipes, redirection and Linux text filters is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 05.",
            "furtherReading": [
              {
                "title": "GNU grep manual",
                "url": "https://www.gnu.org/software/grep/manual/grep.html"
              },
              {
                "title": "Missing Semester shell tools",
                "url": "https://missing.csail.mit.edu/2020/shell-tools/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m05",
        "title": "Module 05 Hands-on Lab: Pipes, redirection and Linux text filters",
        "objective": "Complete hands-on terminal tasks for Module 05: Pipes, redirection and Linux text filters in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Generate sample text using the first command and confirm five lines exist.",
          "Filter lines containing `fail` and view their numbers.",
          "Pipe sorted output into `uniq -c`; explain why sorting matters.",
          "Save selected lines into a new report with `tee`.",
          "Redirect a deliberately invalid file lookup stderr into `05-errors.txt`.",
          "Produce a one-page summary of how each redirect operator behaves."
        ],
        "tasks": [
          {
            "id": "task-m05-1",
            "description": "Generate sample text using the first command and confirm five lines exist.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m05-2",
            "description": "Filter lines containing `fail` and view their numbers.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m05-3",
            "description": "Pipe sorted output into `uniq -c`; explain why sorting matters.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m05-4",
            "description": "Save selected lines into a new report with `tee`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m05-5",
            "description": "Redirect a deliberately invalid file lookup stderr into `05-errors.txt`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m05-6",
            "description": "Produce a one-page summary of how each redirect operator behaves.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Count should report five sample lines",
          "`uniq -c` correctly aggregates duplicated values",
          "Saved reports match expected filtered output"
        ]
      },
      "quiz": {
        "title": "Module 05 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the standard stream number for Standard Error (stderr) in Linux?",
            "options": [
              "Stream 0",
              "Stream 1",
              "Stream 2",
              "Stream 3"
            ],
            "correctAnswerIndex": 2,
            "explanation": "File descriptor 0 is stdin, 1 is stdout, and 2 is stderr.",
            "difficulty": "beginner"
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
            "explanation": "'>' truncates and overwrites the destination file, while '>>' appends output to the end of the file.",
            "difficulty": "beginner"
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
            "explanation": "The 'uniq' command only filters duplicate lines that are adjacent. Sorting first brings identical lines together.",
            "difficulty": "beginner"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m06",
      "title": "Module 06: Accounts, groups, sudo and login sessions",
      "description": "Intermediate level (System administration). 1 week (9\u201312 hours). Prerequisite: Module 05. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 6,
      "lessons": [
        {
          "id": "les-linux-m06-l01",
          "slug": "m06-l1-managing-users",
          "title": "Module 06 - Lesson 1: Managing users",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 06: Accounts, groups, sudo and login sessions. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "19WOD84JFxA",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 06: Accounts, groups, sudo and login sessions",
          "objectives": [
            "Explain root privileges and least privilege",
            "Inspect UID/GID and Linux account records",
            "Create and remove disposable test accounts",
            "Understand groups and sudo configuration"
          ],
          "tags": [
            "linux",
            "module-06",
            "system-administration"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Managing users), we explore fundamental aspects of Module 06: Accounts, groups, sudo and login sessions. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 05"
            ],
            "theorySections": [
              {
                "title": "Overview of Managing users",
                "content": "This lesson covers key systems principles from Module 06: Accounts, groups, sudo and login sessions. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain root privileges and least privilege",
                  "Inspect UID/GID and Linux account records",
                  "Create and remove disposable test accounts",
                  "Understand groups and sudo configuration"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: id",
                "instruction": "Run `id` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: getent passwd \"$(whoami)\"",
                "instruction": "Run `getent passwd \"$(whoami)\"` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: groups",
                "instruction": "Run `groups` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: sudo -l",
                "instruction": "Run `sudo -l` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: getent group sudo",
                "instruction": "Run `getent group sudo` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: last -n 5",
                "instruction": "Run `last -n 5` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can locate user information without exposing password hashes",
              "Can explain your sudo privileges",
              "Disposable account is created and removed safely"
            ],
            "commonMistakes": [
              "Running everyday commands as root.",
              "Editing `/etc/sudoers` directly rather than via `visudo`.",
              "Removing the wrong account."
            ],
            "securityRelevance": "Understanding Module 06: Accounts, groups, sudo and login sessions is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 06.",
            "furtherReading": [
              {
                "title": "Ubuntu users management",
                "url": "https://ubuntu.com/server/docs/user-management"
              },
              {
                "title": "sudo manual",
                "url": "https://www.sudo.ws/docs/man/sudo.man/"
              }
            ]
          }
        },
        {
          "id": "les-linux-m06-l02",
          "slug": "m06-l2-managing-groups",
          "title": "Module 06 - Lesson 2: Managing groups",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 06: Accounts, groups, sudo and login sessions. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "GnlgAD8-GhE",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 06: Accounts, groups, sudo and login sessions",
          "objectives": [
            "Explain root privileges and least privilege",
            "Inspect UID/GID and Linux account records",
            "Create and remove disposable test accounts",
            "Understand groups and sudo configuration"
          ],
          "tags": [
            "linux",
            "module-06",
            "system-administration"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Managing groups), we explore fundamental aspects of Module 06: Accounts, groups, sudo and login sessions. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 05"
            ],
            "theorySections": [
              {
                "title": "Overview of Managing groups",
                "content": "This lesson covers key systems principles from Module 06: Accounts, groups, sudo and login sessions. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain root privileges and least privilege",
                  "Inspect UID/GID and Linux account records",
                  "Create and remove disposable test accounts",
                  "Understand groups and sudo configuration"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: id",
                "instruction": "Run `id` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: getent passwd \"$(whoami)\"",
                "instruction": "Run `getent passwd \"$(whoami)\"` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: groups",
                "instruction": "Run `groups` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: sudo -l",
                "instruction": "Run `sudo -l` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: getent group sudo",
                "instruction": "Run `getent group sudo` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: last -n 5",
                "instruction": "Run `last -n 5` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can locate user information without exposing password hashes",
              "Can explain your sudo privileges",
              "Disposable account is created and removed safely"
            ],
            "commonMistakes": [
              "Running everyday commands as root.",
              "Editing `/etc/sudoers` directly rather than via `visudo`.",
              "Removing the wrong account."
            ],
            "securityRelevance": "Understanding Module 06: Accounts, groups, sudo and login sessions is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 06.",
            "furtherReading": [
              {
                "title": "Ubuntu users management",
                "url": "https://ubuntu.com/server/docs/user-management"
              },
              {
                "title": "sudo manual",
                "url": "https://www.sudo.ws/docs/man/sudo.man/"
              }
            ]
          }
        },
        {
          "id": "les-linux-m06-l03",
          "slug": "m06-l3-full-command-line-course-root-and-user-accounts",
          "title": "Module 06 - Lesson 3: Full command-line course: root and user accounts",
          "description": "Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 06: Accounts, groups, sudo and login sessions. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "avg65oY7sj4",
          "videoAttribution": {
            "creator": "MichaelsTechTutorials",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 3,
          "moduleTitle": "Module 06: Accounts, groups, sudo and login sessions",
          "objectives": [
            "Explain root privileges and least privilege",
            "Inspect UID/GID and Linux account records",
            "Create and remove disposable test accounts",
            "Understand groups and sudo configuration"
          ],
          "tags": [
            "linux",
            "module-06",
            "system-administration"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Full command-line course: root and user accounts), we explore fundamental aspects of Module 06: Accounts, groups, sudo and login sessions. Follow along with MichaelsTechTutorials, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 05"
            ],
            "theorySections": [
              {
                "title": "Overview of Full command-line course: root and user accounts",
                "content": "This lesson covers key systems principles from Module 06: Accounts, groups, sudo and login sessions. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain root privileges and least privilege",
                  "Inspect UID/GID and Linux account records",
                  "Create and remove disposable test accounts",
                  "Understand groups and sudo configuration"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: id",
                "instruction": "Run `id` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: getent passwd \"$(whoami)\"",
                "instruction": "Run `getent passwd \"$(whoami)\"` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: groups",
                "instruction": "Run `groups` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: sudo -l",
                "instruction": "Run `sudo -l` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: getent group sudo",
                "instruction": "Run `getent group sudo` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: last -n 5",
                "instruction": "Run `last -n 5` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can locate user information without exposing password hashes",
              "Can explain your sudo privileges",
              "Disposable account is created and removed safely"
            ],
            "commonMistakes": [
              "Running everyday commands as root.",
              "Editing `/etc/sudoers` directly rather than via `visudo`.",
              "Removing the wrong account."
            ],
            "securityRelevance": "Understanding Module 06: Accounts, groups, sudo and login sessions is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 06.",
            "furtherReading": [
              {
                "title": "Ubuntu users management",
                "url": "https://ubuntu.com/server/docs/user-management"
              },
              {
                "title": "sudo manual",
                "url": "https://www.sudo.ws/docs/man/sudo.man/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m06",
        "title": "Module 06 Hands-on Lab: Accounts, groups, sudo and login sessions",
        "objective": "Complete hands-on terminal tasks for Module 06: Accounts, groups, sudo and login sessions in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Inspect your own account and groups before editing anything.",
          "In the disposable VM, use `sudo adduser learnerdemo` to create a test account.",
          "Use `id learnerdemo` and `getent passwd learnerdemo` to verify creation.",
          "Log in to the test account using a separate local terminal session; check its home folder.",
          "Discuss why adding every user to the sudo group is poor practice.",
          "When finished, remove the demo account using `sudo deluser --remove-home learnerdemo` only after verifying its name and that it contains no data you need."
        ],
        "tasks": [
          {
            "id": "task-m06-1",
            "description": "Inspect your own account and groups before editing anything.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m06-2",
            "description": "In the disposable VM, use `sudo adduser learnerdemo` to create a test account.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m06-3",
            "description": "Use `id learnerdemo` and `getent passwd learnerdemo` to verify creation.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m06-4",
            "description": "Log in to the test account using a separate local terminal session; check its home folder.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m06-5",
            "description": "Discuss why adding every user to the sudo group is poor practice.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m06-6",
            "description": "When finished, remove the demo account using `sudo deluser --remove-home learnerdemo` only after verifying its name and that it contains no data you need.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Can locate user information without exposing password hashes",
          "Can explain your sudo privileges",
          "Disposable account is created and removed safely"
        ]
      },
      "quiz": {
        "title": "Module 06 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the User ID (UID) of the root superuser account on standard Linux systems?",
            "options": [
              "UID 1000",
              "UID 0",
              "UID 1",
              "UID 65534"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The root administrative superuser account always possesses UID 0.",
            "difficulty": "intermediate"
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
            "explanation": "sudo provides audit logs (/var/log/auth.log or journald), enforces password verification per operator, and limits prolonged exposure to root privileges.",
            "difficulty": "intermediate"
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
            "explanation": "/etc/passwd is world-readable and defines username, UID, primary GID, home directory, and default shell.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m07",
      "title": "Module 07: Linux file permissions, ownership, ACLs and umask",
      "description": "Intermediate level (System administration). 1 week (9\u201312 hours). Prerequisite: Module 06. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 7,
      "lessons": [
        {
          "id": "les-linux-m07-l01",
          "slug": "m07-l1-understanding-file-and-directory-permissions",
          "title": "Module 07 - Lesson 1: Understanding file and directory permissions",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 07: Linux file permissions, ownership, ACLs and umask. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "4e669hSjaX8",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 07: Linux file permissions, ownership, ACLs and umask",
          "objectives": [
            "Interpret rwx and octal permissions",
            "Configure private/shared directories",
            "Understand default umask",
            "Inspect ACLs, SUID, SGID and sticky bit"
          ],
          "tags": [
            "linux",
            "module-07",
            "system-administration"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Understanding file and directory permissions), we explore fundamental aspects of Module 07: Linux file permissions, ownership, ACLs and umask. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 06"
            ],
            "theorySections": [
              {
                "title": "Overview of Understanding file and directory permissions",
                "content": "This lesson covers key systems principles from Module 07: Linux file permissions, ownership, ACLs and umask. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Interpret rwx and octal permissions",
                  "Configure private/shared directories",
                  "Understand default umask",
                  "Inspect ACLs, SUID, SGID and sticky bit"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: mkdir -p ~/linux-course/07-permissions",
                "instruction": "Run `mkdir -p ~/linux-course/07-permissions` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: touch ~/linux-course/07-permissions/private.txt",
                "instruction": "Run `touch ~/linux-course/07-permissions/private.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: chmod 600 ~/linux-course/07-permissions/private.txt",
                "instruction": "Run `chmod 600 ~/linux-course/07-permissions/private.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: stat -c \"%a %U:%G %n\" ~/linux-course/07-permissions/private.txt",
                "instruction": "Run `stat -c \"%a %U:%G %n\" ~/linux-course/07-permissions/private.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: umask",
                "instruction": "Run `umask` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: getfacl ~/linux-course/07-permissions/private.txt",
                "instruction": "Run `getfacl ~/linux-course/07-permissions/private.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Explain all rwx bits on files and directories",
              "Modes displayed by stat match your plan",
              "Permissions stay limited to your training directory"
            ],
            "commonMistakes": [
              "Confusing octal `755` with decimal 755.",
              "Setting `777` instead of understanding ownership.",
              "Running chmod recursively on `/etc` or `/home`."
            ],
            "securityRelevance": "Understanding Module 07: Linux file permissions, ownership, ACLs and umask is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 07.",
            "furtherReading": [
              {
                "title": "GNU coreutils chmod manual",
                "url": "https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html"
              },
              {
                "title": "ACL manual",
                "url": "https://man7.org/linux/man-pages/man5/acl.5.html"
              }
            ]
          }
        },
        {
          "id": "les-linux-m07-l02",
          "slug": "m07-l2-full-command-line-course-acls",
          "title": "Module 07 - Lesson 2: Full command-line course: ACLs",
          "description": "Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 07: Linux file permissions, ownership, ACLs and umask. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "avg65oY7sj4",
          "videoAttribution": {
            "creator": "MichaelsTechTutorials",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 07: Linux file permissions, ownership, ACLs and umask",
          "objectives": [
            "Interpret rwx and octal permissions",
            "Configure private/shared directories",
            "Understand default umask",
            "Inspect ACLs, SUID, SGID and sticky bit"
          ],
          "tags": [
            "linux",
            "module-07",
            "system-administration"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Full command-line course: ACLs), we explore fundamental aspects of Module 07: Linux file permissions, ownership, ACLs and umask. Follow along with MichaelsTechTutorials, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 06"
            ],
            "theorySections": [
              {
                "title": "Overview of Full command-line course: ACLs",
                "content": "This lesson covers key systems principles from Module 07: Linux file permissions, ownership, ACLs and umask. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Interpret rwx and octal permissions",
                  "Configure private/shared directories",
                  "Understand default umask",
                  "Inspect ACLs, SUID, SGID and sticky bit"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: mkdir -p ~/linux-course/07-permissions",
                "instruction": "Run `mkdir -p ~/linux-course/07-permissions` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: touch ~/linux-course/07-permissions/private.txt",
                "instruction": "Run `touch ~/linux-course/07-permissions/private.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: chmod 600 ~/linux-course/07-permissions/private.txt",
                "instruction": "Run `chmod 600 ~/linux-course/07-permissions/private.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: stat -c \"%a %U:%G %n\" ~/linux-course/07-permissions/private.txt",
                "instruction": "Run `stat -c \"%a %U:%G %n\" ~/linux-course/07-permissions/private.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: umask",
                "instruction": "Run `umask` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: getfacl ~/linux-course/07-permissions/private.txt",
                "instruction": "Run `getfacl ~/linux-course/07-permissions/private.txt` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Explain all rwx bits on files and directories",
              "Modes displayed by stat match your plan",
              "Permissions stay limited to your training directory"
            ],
            "commonMistakes": [
              "Confusing octal `755` with decimal 755.",
              "Setting `777` instead of understanding ownership.",
              "Running chmod recursively on `/etc` or `/home`."
            ],
            "securityRelevance": "Understanding Module 07: Linux file permissions, ownership, ACLs and umask is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 07.",
            "furtherReading": [
              {
                "title": "GNU coreutils chmod manual",
                "url": "https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html"
              },
              {
                "title": "ACL manual",
                "url": "https://man7.org/linux/man-pages/man5/acl.5.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m07",
        "title": "Module 07 Hands-on Lab: Linux file permissions, ownership, ACLs and umask",
        "objective": "Complete hands-on terminal tasks for Module 07: Linux file permissions, ownership, ACLs and umask in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Create files with modes `600`, `640` and `644`; record and explain them.",
          "Create a directory with mode `700` and compare it with `755`.",
          "Run `umask` and explain default file permissions.",
          "If `getfacl` is unavailable, install the `acl` package only after a package-cache update.",
          "In a test folder, use `setfacl -m u:$(whoami):rw` and verify the ACL; do not alter system directories.",
          "Write a short access matrix for owner/group/other."
        ],
        "tasks": [
          {
            "id": "task-m07-1",
            "description": "Create files with modes `600`, `640` and `644`; record and explain them.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m07-2",
            "description": "Create a directory with mode `700` and compare it with `755`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m07-3",
            "description": "Run `umask` and explain default file permissions.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m07-4",
            "description": "If `getfacl` is unavailable, install the `acl` package only after a package-cache update.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m07-5",
            "description": "In a test folder, use `setfacl -m u:$(whoami):rw` and verify the ACL; do not alter system directories.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m07-6",
            "description": "Write a short access matrix for owner/group/other.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Explain all rwx bits on files and directories",
          "Modes displayed by stat match your plan",
          "Permissions stay limited to your training directory"
        ]
      },
      "quiz": {
        "title": "Module 07 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What permissions are granted by the octal mode 'chmod 640 target_file'?",
            "options": [
              "Owner: read/write; Group: read-only; Others: no permissions",
              "Owner: read/write/execute; Group: read/write; Others: read-only",
              "Owner: read-only; Group: read-only; Others: execute-only",
              "Owner: write-only; Group: read/write; Others: no permissions"
            ],
            "correctAnswerIndex": 0,
            "explanation": "6 (4+2 = rw-) for owner, 4 (4 = r--) for group, and 0 (---) for others.",
            "difficulty": "intermediate"
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
            "explanation": "Umask specifies which permission bits should NOT be enabled by default on newly created files and directories.",
            "difficulty": "intermediate"
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
            "explanation": "For directories, read (r) allows listing contents, write (w) allows creating/deleting files, and execute (x) allows entering (cd) and resolving paths through the directory.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m08",
      "title": "Module 08: Software packages, repositories and updates",
      "description": "Intermediate level (System administration). 1 week (9\u201312 hours). Prerequisite: Module 07. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 8,
      "lessons": [
        {
          "id": "les-linux-m08-l01",
          "slug": "m08-l1-the-apt-command",
          "title": "Module 08 - Lesson 1: The apt command",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 08: Software packages, repositories and updates. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "1kicKTbK768",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 08: Software packages, repositories and updates",
          "objectives": [
            "Understand Linux package managers",
            "Install and remove software responsibly",
            "Identify software versions and repositories",
            "Explain package update versus upgrade"
          ],
          "tags": [
            "linux",
            "module-08",
            "system-administration"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (The apt command), we explore fundamental aspects of Module 08: Software packages, repositories and updates. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 07"
            ],
            "theorySections": [
              {
                "title": "Overview of The apt command",
                "content": "This lesson covers key systems principles from Module 08: Software packages, repositories and updates. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Understand Linux package managers",
                  "Install and remove software responsibly",
                  "Identify software versions and repositories",
                  "Explain package update versus upgrade"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: apt --version",
                "instruction": "Run `apt --version` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: apt list --installed | head",
                "instruction": "Run `apt list --installed | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: apt-cache policy bash",
                "instruction": "Run `apt-cache policy bash` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: dpkg -s bash",
                "instruction": "Run `dpkg -s bash` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: sudo apt update",
                "instruction": "Run `sudo apt update` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: apt list --upgradable",
                "instruction": "Run `apt list --upgradable` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "APT metadata refresh completes successfully",
              "Can trace which repository offers a package",
              "Can differentiate metadata updates from package upgrades"
            ],
            "commonMistakes": [
              "Pasting curl-pipe-bash installation commands.",
              "Removing essential packages to clean the system.",
              "Assuming Kali and Ubuntu use identical update practices."
            ],
            "securityRelevance": "Understanding Module 08: Software packages, repositories and updates is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 08.",
            "furtherReading": [
              {
                "title": "Ubuntu package management",
                "url": "https://ubuntu.com/server/docs/package-management"
              },
              {
                "title": "APT documentation",
                "url": "https://wiki.debian.org/Apt"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m08",
        "title": "Module 08 Hands-on Lab: Software packages, repositories and updates",
        "objective": "Complete hands-on terminal tasks for Module 08: Software packages, repositories and updates in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "List 10 installed packages and their installed versions.",
          "Update the APT metadata database in your disposable VM.",
          "Use `apt-cache policy` to inspect which repository provides a package.",
          "Install a harmless optional package such as `tree` using `sudo apt install tree` after reviewing the apt prompt.",
          "Use `tree ~/linux-course` to inspect your notes directory.",
          "Remove optional test software only after confirming the package name."
        ],
        "tasks": [
          {
            "id": "task-m08-1",
            "description": "List 10 installed packages and their installed versions.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m08-2",
            "description": "Update the APT metadata database in your disposable VM.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m08-3",
            "description": "Use `apt-cache policy` to inspect which repository provides a package.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m08-4",
            "description": "Install a harmless optional package such as `tree` using `sudo apt install tree` after reviewing the apt prompt.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m08-5",
            "description": "Use `tree ~/linux-course` to inspect your notes directory.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m08-6",
            "description": "Remove optional test software only after confirming the package name.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "APT metadata refresh completes successfully",
          "Can trace which repository offers a package",
          "Can differentiate metadata updates from package upgrades"
        ]
      },
      "quiz": {
        "title": "Module 08 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is a Linux software repository?",
            "options": [
              "A local folder on the user desktop holding uncompiled C source code",
              "A secure, centralized server holding digitally signed software packages and metadata index files",
              "A git repository used exclusively for kernel patch submissions",
              "A hardware drive partition reserved for system recovery"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A package repository is a remote or local collection of cryptographically signed package archives and package index manifests.",
            "difficulty": "intermediate"
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
            "explanation": "'apt update' fetches the latest package lists and versions from repository mirrors; it does not actually install or upgrade software.",
            "difficulty": "intermediate"
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
            "explanation": "Dependency resolution calculates the full tree of required libraries, runtimes, and companion packages to ensure the target program functions properly.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m09",
      "title": "Module 09: Processes, process priorities and job control",
      "description": "Intermediate level (System administration). 1 week (9\u201312 hours). Prerequisite: Module 08. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 9,
      "lessons": [
        {
          "id": "les-linux-m09-l01",
          "slug": "m09-l1-demystifying-top",
          "title": "Module 09 - Lesson 1: Demystifying top",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 09: Processes, process priorities and job control. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "WsR11EGF9PA",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 09: Processes, process priorities and job control",
          "objectives": [
            "Identify CPU/memory-intensive processes",
            "Manage foreground/background jobs",
            "Send appropriate Unix signals",
            "Understand priority and resource controls"
          ],
          "tags": [
            "linux",
            "module-09",
            "system-administration"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Demystifying top), we explore fundamental aspects of Module 09: Processes, process priorities and job control. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 08"
            ],
            "theorySections": [
              {
                "title": "Overview of Demystifying top",
                "content": "This lesson covers key systems principles from Module 09: Processes, process priorities and job control. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Identify CPU/memory-intensive processes",
                  "Manage foreground/background jobs",
                  "Send appropriate Unix signals",
                  "Understand priority and resource controls"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: ps aux | head",
                "instruction": "Run `ps aux | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: top -b -n 1 | head",
                "instruction": "Run `top -b -n 1 | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: sleep 120 &",
                "instruction": "Run `sleep 120 &` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: jobs",
                "instruction": "Run `jobs` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: pgrep sleep",
                "instruction": "Run `pgrep sleep` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: kill \"$(pgrep -n sleep)\"",
                "instruction": "Run `kill \"$(pgrep -n sleep)\"` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can identify an exact PID before signaling it",
              "Can explain foreground versus background tasks",
              "All test processes are terminated after the lab"
            ],
            "commonMistakes": [
              "Killing a random PID.",
              "Confusing nice value with actual CPU percentage.",
              "Assuming a background task survives logout."
            ],
            "securityRelevance": "Understanding Module 09: Processes, process priorities and job control is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 09.",
            "furtherReading": [
              {
                "title": "proc manual",
                "url": "https://man7.org/linux/man-pages/man5/proc.5.html"
              },
              {
                "title": "Linux processes guide",
                "url": "https://linuxjourney.com/"
              }
            ]
          }
        },
        {
          "id": "les-linux-m09-l02",
          "slug": "m09-l2-full-command-line-course-processes",
          "title": "Module 09 - Lesson 2: Full command-line course: processes",
          "description": "Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 09: Processes, process priorities and job control. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "avg65oY7sj4",
          "videoAttribution": {
            "creator": "MichaelsTechTutorials",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 09: Processes, process priorities and job control",
          "objectives": [
            "Identify CPU/memory-intensive processes",
            "Manage foreground/background jobs",
            "Send appropriate Unix signals",
            "Understand priority and resource controls"
          ],
          "tags": [
            "linux",
            "module-09",
            "system-administration"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Full command-line course: processes), we explore fundamental aspects of Module 09: Processes, process priorities and job control. Follow along with MichaelsTechTutorials, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 08"
            ],
            "theorySections": [
              {
                "title": "Overview of Full command-line course: processes",
                "content": "This lesson covers key systems principles from Module 09: Processes, process priorities and job control. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Identify CPU/memory-intensive processes",
                  "Manage foreground/background jobs",
                  "Send appropriate Unix signals",
                  "Understand priority and resource controls"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: ps aux | head",
                "instruction": "Run `ps aux | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: top -b -n 1 | head",
                "instruction": "Run `top -b -n 1 | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: sleep 120 &",
                "instruction": "Run `sleep 120 &` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: jobs",
                "instruction": "Run `jobs` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: pgrep sleep",
                "instruction": "Run `pgrep sleep` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: kill \"$(pgrep -n sleep)\"",
                "instruction": "Run `kill \"$(pgrep -n sleep)\"` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can identify an exact PID before signaling it",
              "Can explain foreground versus background tasks",
              "All test processes are terminated after the lab"
            ],
            "commonMistakes": [
              "Killing a random PID.",
              "Confusing nice value with actual CPU percentage.",
              "Assuming a background task survives logout."
            ],
            "securityRelevance": "Understanding Module 09: Processes, process priorities and job control is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 09.",
            "furtherReading": [
              {
                "title": "proc manual",
                "url": "https://man7.org/linux/man-pages/man5/proc.5.html"
              },
              {
                "title": "Linux processes guide",
                "url": "https://linuxjourney.com/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m09",
        "title": "Module 09 Hands-on Lab: Processes, process priorities and job control",
        "objective": "Complete hands-on terminal tasks for Module 09: Processes, process priorities and job control in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Run the commands in a disposable terminal and confirm a test sleep process is running.",
          "Check how it appears in `ps` and `top`.",
          "Use `jobs` to list background shell jobs.",
          "Send SIGTERM to the exact test process only; verify it ended.",
          "Start a second `sleep` command and examine its priority with `ps -o pid,ni,cmd`.",
          "Write down when forcing SIGKILL would be appropriate and why it is a last resort."
        ],
        "tasks": [
          {
            "id": "task-m09-1",
            "description": "Run the commands in a disposable terminal and confirm a test sleep process is running.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m09-2",
            "description": "Check how it appears in `ps` and `top`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m09-3",
            "description": "Use `jobs` to list background shell jobs.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m09-4",
            "description": "Send SIGTERM to the exact test process only; verify it ended.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m09-5",
            "description": "Start a second `sleep` command and examine its priority with `ps -o pid,ni,cmd`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m09-6",
            "description": "Write down when forcing SIGKILL would be appropriate and why it is a last resort.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Can identify an exact PID before signaling it",
          "Can explain foreground versus background tasks",
          "All test processes are terminated after the lab"
        ]
      },
      "quiz": {
        "title": "Module 09 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What does a Process ID (PID) represent in the Linux operating system?",
            "options": [
              "The physical hardware memory address where program instructions reside",
              "A unique positive integer assigned by the kernel to identify an active running process instance",
              "The user ID of the person executing the binary",
              "The network socket port number bound by the application"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The PID is a unique kernel-assigned integer that identifies each running process in the system process table.",
            "difficulty": "intermediate"
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
            "explanation": "SIGTERM permits clean shutdown and resource release; SIGKILL is handled directly by the kernel and terminates the process immediately without cleanup.",
            "difficulty": "intermediate"
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
            "explanation": "Nice values range from -20 (highest priority) to +19 (lowest priority). A higher nice value means lower scheduling priority.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m10",
      "title": "Module 10: systemd, services and Linux boot lifecycle",
      "description": "Intermediate level (System administration). 1 week (9\u201312 hours). Prerequisite: Module 09. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 10,
      "lessons": [
        {
          "id": "les-linux-m10-l01",
          "slug": "m10-l1-systemctl-and-systemd",
          "title": "Module 10 - Lesson 1: systemctl and systemd",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 10: systemd, services and Linux boot lifecycle. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "5JVBpXiYMKo",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 10: systemd, services and Linux boot lifecycle",
          "objectives": [
            "Explain Linux boot stages at a high level",
            "Inspect unit files and dependencies",
            "Start and stop an isolated training service",
            "Use journalctl to diagnose service failures"
          ],
          "tags": [
            "linux",
            "module-10",
            "system-administration"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (systemctl and systemd), we explore fundamental aspects of Module 10: systemd, services and Linux boot lifecycle. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 09"
            ],
            "theorySections": [
              {
                "title": "Overview of systemctl and systemd",
                "content": "This lesson covers key systems principles from Module 10: systemd, services and Linux boot lifecycle. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain Linux boot stages at a high level",
                  "Inspect unit files and dependencies",
                  "Start and stop an isolated training service",
                  "Use journalctl to diagnose service failures"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: systemctl --version",
                "instruction": "Run `systemctl --version` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: systemctl list-units --type=service --no-pager | head",
                "instruction": "Run `systemctl list-units --type=service --no-pager | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: systemctl status cron --no-pager",
                "instruction": "Run `systemctl status cron --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: systemctl cat cron",
                "instruction": "Run `systemctl cat cron` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: journalctl -u cron -n 15 --no-pager",
                "instruction": "Run `journalctl -u cron -n 15 --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: systemd-analyze",
                "instruction": "Run `systemd-analyze` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Identify a unit file path and status",
              "Explain start versus enable",
              "Find related logs without editing services"
            ],
            "commonMistakes": [
              "Disabling a service without checking system impact.",
              "Assuming service names match across all distributions.",
              "Editing packaged unit files in `/usr/lib` or `/lib` directly."
            ],
            "securityRelevance": "Understanding Module 10: systemd, services and Linux boot lifecycle is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 10.",
            "furtherReading": [
              {
                "title": "systemd documentation",
                "url": "https://www.freedesktop.org/software/systemd/man/latest/"
              },
              {
                "title": "Ubuntu systemd reference",
                "url": "https://ubuntu.com/server/docs/service-management"
              }
            ]
          }
        },
        {
          "id": "les-linux-m10-l02",
          "slug": "m10-l2-journalctl-basics",
          "title": "Module 10 - Lesson 2: journalctl basics",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 10: systemd, services and Linux boot lifecycle. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "0dG3vUYt7Uk",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 10: systemd, services and Linux boot lifecycle",
          "objectives": [
            "Explain Linux boot stages at a high level",
            "Inspect unit files and dependencies",
            "Start and stop an isolated training service",
            "Use journalctl to diagnose service failures"
          ],
          "tags": [
            "linux",
            "module-10",
            "system-administration"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (journalctl basics), we explore fundamental aspects of Module 10: systemd, services and Linux boot lifecycle. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 09"
            ],
            "theorySections": [
              {
                "title": "Overview of journalctl basics",
                "content": "This lesson covers key systems principles from Module 10: systemd, services and Linux boot lifecycle. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain Linux boot stages at a high level",
                  "Inspect unit files and dependencies",
                  "Start and stop an isolated training service",
                  "Use journalctl to diagnose service failures"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: systemctl --version",
                "instruction": "Run `systemctl --version` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: systemctl list-units --type=service --no-pager | head",
                "instruction": "Run `systemctl list-units --type=service --no-pager | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: systemctl status cron --no-pager",
                "instruction": "Run `systemctl status cron --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: systemctl cat cron",
                "instruction": "Run `systemctl cat cron` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: journalctl -u cron -n 15 --no-pager",
                "instruction": "Run `journalctl -u cron -n 15 --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: systemd-analyze",
                "instruction": "Run `systemd-analyze` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Identify a unit file path and status",
              "Explain start versus enable",
              "Find related logs without editing services"
            ],
            "commonMistakes": [
              "Disabling a service without checking system impact.",
              "Assuming service names match across all distributions.",
              "Editing packaged unit files in `/usr/lib` or `/lib` directly."
            ],
            "securityRelevance": "Understanding Module 10: systemd, services and Linux boot lifecycle is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 10.",
            "furtherReading": [
              {
                "title": "systemd documentation",
                "url": "https://www.freedesktop.org/software/systemd/man/latest/"
              },
              {
                "title": "Ubuntu systemd reference",
                "url": "https://ubuntu.com/server/docs/service-management"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m10",
        "title": "Module 10 Hands-on Lab: systemd, services and Linux boot lifecycle",
        "objective": "Complete hands-on terminal tasks for Module 10: systemd, services and Linux boot lifecycle in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Identify the active system manager and its version.",
          "List active services and choose one low-risk service to inspect.",
          "Read its unit definition via `systemctl cat`.",
          "Use `journalctl -u` to inspect recent events.",
          "If the cron service exists, inspect its status; do not stop SSH or other connectivity services.",
          "Explain how to determine whether a service starts automatically on reboot."
        ],
        "tasks": [
          {
            "id": "task-m10-1",
            "description": "Identify the active system manager and its version.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m10-2",
            "description": "List active services and choose one low-risk service to inspect.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m10-3",
            "description": "Read its unit definition via `systemctl cat`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m10-4",
            "description": "Use `journalctl -u` to inspect recent events.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m10-5",
            "description": "If the cron service exists, inspect its status; do not stop SSH or other connectivity services.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m10-6",
            "description": "Explain how to determine whether a service starts automatically on reboot.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Identify a unit file path and status",
          "Explain start versus enable",
          "Find related logs without editing services"
        ]
      },
      "quiz": {
        "title": "Module 10 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the role of PID 1 on modern Linux distributions running systemd?",
            "options": [
              "The kernel space hardware abstraction driver",
              "The system init process and service manager that bootstraps userland, mounts filesystems, and supervises all daemons",
              "The network DHCP client daemon",
              "The interactive Bash login shell for root"
            ],
            "correctAnswerIndex": 1,
            "explanation": "systemd runs as PID 1, acting as the system and service manager responsible for bringing the system to its configured target state.",
            "difficulty": "intermediate"
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
            "explanation": "'enable' sets up systemd target symlinks for persistent startup across reboots; 'start' triggers immediate daemon execution right now.",
            "difficulty": "intermediate"
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
            "explanation": "'journalctl -u nginx -f' follows the live log stream for the specific systemd unit 'nginx'.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m11",
      "title": "Module 11: Disks, filesystems, partitions and mounting",
      "description": "Intermediate level (Storage and automation). 1 week (9\u201312 hours). Prerequisite: Module 10. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 11,
      "lessons": [
        {
          "id": "les-linux-m11-l01",
          "slug": "m11-l1-formatting-and-mounting-disks",
          "title": "Module 11 - Lesson 1: Formatting and mounting disks",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 11: Disks, filesystems, partitions and mounting. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "2Z6ouBYfZr8",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 11: Disks, filesystems, partitions and mounting",
          "objectives": [
            "Inspect block devices without changing them",
            "Interpret df, du, UUID and fstab",
            "Understand ext4 and XFS basics",
            "Mount a dedicated disposable lab disk safely"
          ],
          "tags": [
            "linux",
            "module-11",
            "storage-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Formatting and mounting disks), we explore fundamental aspects of Module 11: Disks, filesystems, partitions and mounting. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 10"
            ],
            "theorySections": [
              {
                "title": "Overview of Formatting and mounting disks",
                "content": "This lesson covers key systems principles from Module 11: Disks, filesystems, partitions and mounting. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Inspect block devices without changing them",
                  "Interpret df, du, UUID and fstab",
                  "Understand ext4 and XFS basics",
                  "Mount a dedicated disposable lab disk safely"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: lsblk -f",
                "instruction": "Run `lsblk -f` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: df -hT",
                "instruction": "Run `df -hT` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: du -sh ~/linux-course",
                "instruction": "Run `du -sh ~/linux-course` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: findmnt /",
                "instruction": "Run `findmnt /` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: cat /proc/mounts | head",
                "instruction": "Run `cat /proc/mounts | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: mount | head",
                "instruction": "Run `mount | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can explain root filesystem versus mount point",
              "Can read `df` and `du` outputs",
              "No existing data disk was reformatted"
            ],
            "commonMistakes": [
              "Running mkfs or fdisk on the wrong disk.",
              "Assuming `/dev/sdb` always points to the same disk.",
              "Changing fstab without a recovery snapshot."
            ],
            "securityRelevance": "Understanding Module 11: Disks, filesystems, partitions and mounting is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 11.",
            "furtherReading": [
              {
                "title": "ArchWiki fstab",
                "url": "https://wiki.archlinux.org/title/Fstab"
              },
              {
                "title": "man7 mount",
                "url": "https://man7.org/linux/man-pages/man8/mount.8.html"
              }
            ]
          }
        },
        {
          "id": "les-linux-m11-l02",
          "slug": "m11-l2-full-command-line-course-partitions-and-fdisk",
          "title": "Module 11 - Lesson 2: Full command-line course: partitions and fdisk",
          "description": "Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 11: Disks, filesystems, partitions and mounting. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "avg65oY7sj4",
          "videoAttribution": {
            "creator": "MichaelsTechTutorials",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 11: Disks, filesystems, partitions and mounting",
          "objectives": [
            "Inspect block devices without changing them",
            "Interpret df, du, UUID and fstab",
            "Understand ext4 and XFS basics",
            "Mount a dedicated disposable lab disk safely"
          ],
          "tags": [
            "linux",
            "module-11",
            "storage-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Full command-line course: partitions and fdisk), we explore fundamental aspects of Module 11: Disks, filesystems, partitions and mounting. Follow along with MichaelsTechTutorials, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 10"
            ],
            "theorySections": [
              {
                "title": "Overview of Full command-line course: partitions and fdisk",
                "content": "This lesson covers key systems principles from Module 11: Disks, filesystems, partitions and mounting. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Inspect block devices without changing them",
                  "Interpret df, du, UUID and fstab",
                  "Understand ext4 and XFS basics",
                  "Mount a dedicated disposable lab disk safely"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: lsblk -f",
                "instruction": "Run `lsblk -f` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: df -hT",
                "instruction": "Run `df -hT` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: du -sh ~/linux-course",
                "instruction": "Run `du -sh ~/linux-course` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: findmnt /",
                "instruction": "Run `findmnt /` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: cat /proc/mounts | head",
                "instruction": "Run `cat /proc/mounts | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: mount | head",
                "instruction": "Run `mount | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can explain root filesystem versus mount point",
              "Can read `df` and `du` outputs",
              "No existing data disk was reformatted"
            ],
            "commonMistakes": [
              "Running mkfs or fdisk on the wrong disk.",
              "Assuming `/dev/sdb` always points to the same disk.",
              "Changing fstab without a recovery snapshot."
            ],
            "securityRelevance": "Understanding Module 11: Disks, filesystems, partitions and mounting is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 11.",
            "furtherReading": [
              {
                "title": "ArchWiki fstab",
                "url": "https://wiki.archlinux.org/title/Fstab"
              },
              {
                "title": "man7 mount",
                "url": "https://man7.org/linux/man-pages/man8/mount.8.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m11",
        "title": "Module 11 Hands-on Lab: Disks, filesystems, partitions and mounting",
        "objective": "Complete hands-on terminal tasks for Module 11: Disks, filesystems, partitions and mounting in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Inspect all current block devices and identify the root filesystem by mount point.",
          "Record disk use and available capacity using `df -hT`.",
          "Find your course folder size with `du -sh`.",
          "Read `/etc/fstab` without editing it; identify UUID or device references.",
          "If available, attach a NEW empty additional virtual disk in VirtualBox and take a snapshot.",
          "Perform formatting/mounting only on this disposable extra disk after confirming its device identity with `lsblk`; never follow a tutorial blindly on your host disk."
        ],
        "tasks": [
          {
            "id": "task-m11-1",
            "description": "Inspect all current block devices and identify the root filesystem by mount point.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m11-2",
            "description": "Record disk use and available capacity using `df -hT`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m11-3",
            "description": "Find your course folder size with `du -sh`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m11-4",
            "description": "Read `/etc/fstab` without editing it; identify UUID or device references.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m11-5",
            "description": "If available, attach a NEW empty additional virtual disk in VirtualBox and take a snapshot.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m11-6",
            "description": "Perform formatting/mounting only on this disposable extra disk after confirming its device identity with `lsblk`; never follow a tutorial blindly on your host disk.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Can explain root filesystem versus mount point",
          "Can read `df` and `du` outputs",
          "No existing data disk was reformatted"
        ]
      },
      "quiz": {
        "title": "Module 11 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the primary function of the 'lsblk' command?",
            "options": [
              "Listing user login accounts currently active on the console",
              "Displaying a structured tree of all block storage devices, partitions, and their current mount points",
              "Formatting hard disk partitions with an ext4 filesystem",
              "Listing blocked incoming IP addresses in the firewall"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'lsblk' queries sysfs to display all block devices (disks, partitions, NVMe, LVM volumes) and where they are mounted.",
            "difficulty": "intermediate"
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
            "explanation": "If a large file was deleted but is held open by a running process, 'df' still counts its disk blocks as used, whereas 'du' cannot see the unlinked file in the directory tree.",
            "difficulty": "intermediate"
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
            "explanation": "Mounting connects the root of a partition's filesystem to a specified directory location (mount point) in the unified filesystem hierarchy.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m12",
      "title": "Module 12: LVM, snapshots and modern Linux filesystems",
      "description": "Advanced level (Storage and automation). 1 week (9\u201312 hours). Prerequisite: Module 11. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 12,
      "lessons": [
        {
          "id": "les-linux-m12-l01",
          "slug": "m12-l1-linux-logical-volume-manager-deep-dive",
          "title": "Module 12 - Lesson 1: Linux Logical Volume Manager Deep Dive",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 12: LVM, snapshots and modern Linux filesystems. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "MeltFN-bXrQ",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 12: LVM, snapshots and modern Linux filesystems",
          "objectives": [
            "Explain PV, VG and LV",
            "Understand storage resizing and snapshots",
            "Compare ext4, XFS, ZFS and Btrfs concepts",
            "Practice LVM operations only with disposable storage"
          ],
          "tags": [
            "linux",
            "module-12",
            "storage-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Linux Logical Volume Manager Deep Dive), we explore fundamental aspects of Module 12: LVM, snapshots and modern Linux filesystems. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 11"
            ],
            "theorySections": [
              {
                "title": "Overview of Linux Logical Volume Manager Deep Dive",
                "content": "This lesson covers key systems principles from Module 12: LVM, snapshots and modern Linux filesystems. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain PV, VG and LV",
                  "Understand storage resizing and snapshots",
                  "Compare ext4, XFS, ZFS and Btrfs concepts",
                  "Practice LVM operations only with disposable storage"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: lsblk -f",
                "instruction": "Run `lsblk -f` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: pvs",
                "instruction": "Run `pvs` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: vgs",
                "instruction": "Run `vgs` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: lvs",
                "instruction": "Run `lvs` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: findmnt -T /",
                "instruction": "Run `findmnt -T /` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: df -Th",
                "instruction": "Run `df -Th` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can explain PV\u2192VG\u2192LV without notes",
              "Can identify whether your VM uses LVM",
              "No real or production disk was modified"
            ],
            "commonMistakes": [
              "Treating a snapshot as a backup.",
              "Modifying the active root volume without a recovery plan.",
              "Formatting a device based on guessed /dev letters."
            ],
            "securityRelevance": "Understanding Module 12: LVM, snapshots and modern Linux filesystems is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 12.",
            "furtherReading": [
              {
                "title": "Ubuntu LVM",
                "url": "https://documentation.ubuntu.com/server/how-to/storage/manage-logical-volumes/"
              },
              {
                "title": "Btrfs documentation",
                "url": "https://btrfs.readthedocs.io/en/latest/"
              }
            ]
          }
        },
        {
          "id": "les-linux-m12-l02",
          "slug": "m12-l2-long-command-line-course-lvm",
          "title": "Module 12 - Lesson 2: Linux Logical Volume Manager (LVM) Deep Dive Tutorial",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 12: LVM, physical volumes, volume groups, logical volumes, and snapshots. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "MeltFN-bXrQ",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 42,
          "order": 2,
          "moduleTitle": "Module 12: LVM, snapshots and modern Linux filesystems",
          "objectives": [
            "Explain PV, VG and LV",
            "Understand storage resizing and snapshots",
            "Compare ext4, XFS, ZFS and Btrfs concepts",
            "Practice LVM operations only with disposable storage"
          ],
          "tags": [
            "linux",
            "module-12",
            "storage-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Long command-line course: LVM), we explore fundamental aspects of Module 12: LVM, snapshots and modern Linux filesystems. Follow along with MichaelsTechTutorials, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 11"
            ],
            "theorySections": [
              {
                "title": "Overview of Long command-line course: LVM",
                "content": "This lesson covers key systems principles from Module 12: LVM, snapshots and modern Linux filesystems. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain PV, VG and LV",
                  "Understand storage resizing and snapshots",
                  "Compare ext4, XFS, ZFS and Btrfs concepts",
                  "Practice LVM operations only with disposable storage"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: lsblk -f",
                "instruction": "Run `lsblk -f` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: pvs",
                "instruction": "Run `pvs` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: vgs",
                "instruction": "Run `vgs` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: lvs",
                "instruction": "Run `lvs` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: findmnt -T /",
                "instruction": "Run `findmnt -T /` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: df -Th",
                "instruction": "Run `df -Th` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can explain PV\u2192VG\u2192LV without notes",
              "Can identify whether your VM uses LVM",
              "No real or production disk was modified"
            ],
            "commonMistakes": [
              "Treating a snapshot as a backup.",
              "Modifying the active root volume without a recovery plan.",
              "Formatting a device based on guessed /dev letters."
            ],
            "securityRelevance": "Understanding Module 12: LVM, snapshots and modern Linux filesystems is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 12.",
            "furtherReading": [
              {
                "title": "Ubuntu LVM",
                "url": "https://documentation.ubuntu.com/server/how-to/storage/manage-logical-volumes/"
              },
              {
                "title": "Btrfs documentation",
                "url": "https://btrfs.readthedocs.io/en/latest/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m12",
        "title": "Module 12 Hands-on Lab: LVM, snapshots and modern Linux filesystems",
        "objective": "Complete hands-on terminal tasks for Module 12: LVM, snapshots and modern Linux filesystems in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Watch the LVM tutorial before changing any storage.",
          "Run read-only LVM inspection commands; record if your system has no LVM.",
          "On a disposable dedicated virtual disk, draw a plan showing a PV, VG and two LVs.",
          "If comfortable, follow the tutorial inside a new throwaway VM to create LVs and a filesystem.",
          "Test expansion and snapshot concepts in the disposable VM only.",
          "Write how an LVM snapshot differs from an off-machine backup."
        ],
        "tasks": [
          {
            "id": "task-m12-1",
            "description": "Watch the LVM tutorial before changing any storage.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m12-2",
            "description": "Run read-only LVM inspection commands; record if your system has no LVM.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m12-3",
            "description": "On a disposable dedicated virtual disk, draw a plan showing a PV, VG and two LVs.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m12-4",
            "description": "If comfortable, follow the tutorial inside a new throwaway VM to create LVs and a filesystem.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m12-5",
            "description": "Test expansion and snapshot concepts in the disposable VM only.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m12-6",
            "description": "Write how an LVM snapshot differs from an off-machine backup.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Can explain PV\u2192VG\u2192LV without notes",
          "Can identify whether your VM uses LVM",
          "No real or production disk was modified"
        ]
      },
      "quiz": {
        "title": "Module 12 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "In Linux Logical Volume Manager (LVM), what is a Volume Group (VG)?",
            "options": [
              "A physical hard drive partition formatted as ext4",
              "A shared pool of storage capacity aggregated from one or more Physical Volumes (PVs)",
              "A group of Linux user accounts authorized to read disk blocks",
              "A software RAID 1 mirror array"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A Volume Group pools physical extents from underlying Physical Volumes (PVs), from which dynamic Logical Volumes (LVs) are carved.",
            "difficulty": "advanced"
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
            "explanation": "LVM snapshots are local copy-on-write representations for fast rollbacks or consistent backup states, not standalone physical backups.",
            "difficulty": "advanced"
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
            "explanation": "'lvextend' increases the block device boundary, but the filesystem residing on it must be grown (e.g. via 'resize2fs' or 'xfs_growfs') to register the new capacity.",
            "difficulty": "advanced"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m13",
      "title": "Module 13: Archiving, compression, backups and rsync",
      "description": "Intermediate level (Storage and automation). 1 week (9\u201312 hours). Prerequisite: Module 12. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 13,
      "lessons": [
        {
          "id": "les-linux-m13-l01",
          "slug": "m13-l1-tar-and-gzip-tutorial",
          "title": "Module 13 - Lesson 1: tar and gzip tutorial",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 13: Archiving, compression, backups and rsync. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "2iwumBcfd58",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 13: Archiving, compression, backups and rsync",
          "objectives": [
            "Create and inspect tar archives",
            "Use compression appropriately",
            "Make repeatable local backups",
            "Verify restore integrity and document recovery"
          ],
          "tags": [
            "linux",
            "module-13",
            "storage-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (tar and gzip tutorial), we explore fundamental aspects of Module 13: Archiving, compression, backups and rsync. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 12"
            ],
            "theorySections": [
              {
                "title": "Overview of tar and gzip tutorial",
                "content": "This lesson covers key systems principles from Module 13: Archiving, compression, backups and rsync. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Create and inspect tar archives",
                  "Use compression appropriately",
                  "Make repeatable local backups",
                  "Verify restore integrity and document recovery"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: mkdir -p ~/linux-course/13-backups",
                "instruction": "Run `mkdir -p ~/linux-course/13-backups` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: tar -czf ~/linux-course/13-backups/course.tar.gz -C ~ linux-course/01-setup",
                "instruction": "Run `tar -czf ~/linux-course/13-backups/course.tar.gz -C ~ linux-course/01-setup` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: tar -tzf ~/linux-course/13-backups/course.tar.gz | head",
                "instruction": "Run `tar -tzf ~/linux-course/13-backups/course.tar.gz | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: rsync -av --dry-run ~/linux-course/02-navigation/ ~/linux-course/13-backups/navigation/",
                "instruction": "Run `rsync -av --dry-run ~/linux-course/02-navigation/ ~/linux-course/13-backups/navigation/` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: sha256sum ~/linux-course/13-backups/course.tar.gz",
                "instruction": "Run `sha256sum ~/linux-course/13-backups/course.tar.gz` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Archive lists expected files",
              "Restored content matches source",
              "Rsync dry run explains intended copies"
            ],
            "commonMistakes": [
              "Not testing restores.",
              "Using `rsync --delete` on the wrong destination.",
              "Forgetting the trailing slash meaning in rsync paths."
            ],
            "securityRelevance": "Understanding Module 13: Archiving, compression, backups and rsync is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 13.",
            "furtherReading": [
              {
                "title": "rsync documentation",
                "url": "https://rsync.samba.org/documentation.html"
              },
              {
                "title": "GNU tar manual",
                "url": "https://www.gnu.org/software/tar/manual/"
              }
            ]
          }
        },
        {
          "id": "les-linux-m13-l02",
          "slug": "m13-l2-rsync-tutorial",
          "title": "Module 13 - Lesson 2: rsync tutorial",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 13: Archiving, compression, backups and rsync. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "KG78O53u8rY",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 13: Archiving, compression, backups and rsync",
          "objectives": [
            "Create and inspect tar archives",
            "Use compression appropriately",
            "Make repeatable local backups",
            "Verify restore integrity and document recovery"
          ],
          "tags": [
            "linux",
            "module-13",
            "storage-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (rsync tutorial), we explore fundamental aspects of Module 13: Archiving, compression, backups and rsync. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 12"
            ],
            "theorySections": [
              {
                "title": "Overview of rsync tutorial",
                "content": "This lesson covers key systems principles from Module 13: Archiving, compression, backups and rsync. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Create and inspect tar archives",
                  "Use compression appropriately",
                  "Make repeatable local backups",
                  "Verify restore integrity and document recovery"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: mkdir -p ~/linux-course/13-backups",
                "instruction": "Run `mkdir -p ~/linux-course/13-backups` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: tar -czf ~/linux-course/13-backups/course.tar.gz -C ~ linux-course/01-setup",
                "instruction": "Run `tar -czf ~/linux-course/13-backups/course.tar.gz -C ~ linux-course/01-setup` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: tar -tzf ~/linux-course/13-backups/course.tar.gz | head",
                "instruction": "Run `tar -tzf ~/linux-course/13-backups/course.tar.gz | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: rsync -av --dry-run ~/linux-course/02-navigation/ ~/linux-course/13-backups/navigation/",
                "instruction": "Run `rsync -av --dry-run ~/linux-course/02-navigation/ ~/linux-course/13-backups/navigation/` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: sha256sum ~/linux-course/13-backups/course.tar.gz",
                "instruction": "Run `sha256sum ~/linux-course/13-backups/course.tar.gz` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Archive lists expected files",
              "Restored content matches source",
              "Rsync dry run explains intended copies"
            ],
            "commonMistakes": [
              "Not testing restores.",
              "Using `rsync --delete` on the wrong destination.",
              "Forgetting the trailing slash meaning in rsync paths."
            ],
            "securityRelevance": "Understanding Module 13: Archiving, compression, backups and rsync is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 13.",
            "furtherReading": [
              {
                "title": "rsync documentation",
                "url": "https://rsync.samba.org/documentation.html"
              },
              {
                "title": "GNU tar manual",
                "url": "https://www.gnu.org/software/tar/manual/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m13",
        "title": "Module 13 Hands-on Lab: Archiving, compression, backups and rsync",
        "objective": "Complete hands-on terminal tasks for Module 13: Archiving, compression, backups and rsync in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Create a tar.gz of one existing course module directory.",
          "List archive contents without extracting.",
          "Run an rsync `--dry-run` to a second local folder.",
          "Run the real rsync after reviewing the proposed operations; do not use `--delete` in this lab.",
          "Restore the tar archive into a new empty directory, not over existing notes.",
          "Compare restored file content and record a SHA-256 checksum."
        ],
        "tasks": [
          {
            "id": "task-m13-1",
            "description": "Create a tar.gz of one existing course module directory.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m13-2",
            "description": "List archive contents without extracting.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m13-3",
            "description": "Run an rsync `--dry-run` to a second local folder.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m13-4",
            "description": "Run the real rsync after reviewing the proposed operations; do not use `--delete` in this lab.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m13-5",
            "description": "Restore the tar archive into a new empty directory, not over existing notes.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m13-6",
            "description": "Compare restored file content and record a SHA-256 checksum.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Archive lists expected files",
          "Restored content matches source",
          "Rsync dry run explains intended copies"
        ]
      },
      "quiz": {
        "title": "Module 13 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "How does the 'tar' command fundamentally differ from compression tools like 'gzip'?",
            "options": [
              "tar only encrypts files with AES-256",
              "tar bundles multiple files and directory structures into a single archive file without compressing; gzip compresses a single data stream",
              "gzip can archive directories directly without tar",
              "tar cannot be combined with compression algorithms"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'tar' (tape archive) bundles files, preserving ownership and permissions. Compression utilities like gzip or bzip2 then compress the resulting tarball.",
            "difficulty": "intermediate"
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
            "explanation": "A backup is only as good as its tested recovery. Restore drills uncover corrupted media, missing encryption keys, and incomplete dependencies.",
            "difficulty": "intermediate"
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
            "explanation": "'rsync --dry-run' previews changes without writing or deleting any data, preventing costly operational mistakes.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m14",
      "title": "Module 14: cron jobs, systemd timers and Linux scheduling",
      "description": "Intermediate level (Storage and automation). 1 week (9\u201312 hours). Prerequisite: Module 13. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 14,
      "lessons": [
        {
          "id": "les-linux-m14-l01",
          "slug": "m14-l1-scheduling-tasks-with-cron",
          "title": "Module 14 - Lesson 1: Scheduling tasks with cron",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 14: cron jobs, systemd timers and Linux scheduling. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "7cbP7fzn0D8",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 14: cron jobs, systemd timers and Linux scheduling",
          "objectives": [
            "Understand cron expressions",
            "Schedule safe user-level maintenance",
            "Recognize systemd timer units",
            "Verify scheduled job output"
          ],
          "tags": [
            "linux",
            "module-14",
            "storage-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Scheduling tasks with cron), we explore fundamental aspects of Module 14: cron jobs, systemd timers and Linux scheduling. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 13"
            ],
            "theorySections": [
              {
                "title": "Overview of Scheduling tasks with cron",
                "content": "This lesson covers key systems principles from Module 14: cron jobs, systemd timers and Linux scheduling. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Understand cron expressions",
                  "Schedule safe user-level maintenance",
                  "Recognize systemd timer units",
                  "Verify scheduled job output"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: date",
                "instruction": "Run `date` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: crontab -l",
                "instruction": "Run `crontab -l` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: systemctl --user list-timers --all",
                "instruction": "Run `systemctl --user list-timers --all` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: systemctl list-timers --all --no-pager | head",
                "instruction": "Run `systemctl list-timers --all --no-pager | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: journalctl --user --since today -n 10 --no-pager",
                "instruction": "Run `journalctl --user --since today -n 10 --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Scheduled command actually runs",
              "Log contains at least one expected timestamp",
              "Temporary job is removed at the end"
            ],
            "commonMistakes": [
              "Using relative paths in cron jobs.",
              "Leaving a recurring task running indefinitely.",
              "Running cron tasks as root without a need."
            ],
            "securityRelevance": "Understanding Module 14: cron jobs, systemd timers and Linux scheduling is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 14.",
            "furtherReading": [
              {
                "title": "crontab manual",
                "url": "https://man7.org/linux/man-pages/man5/crontab.5.html"
              },
              {
                "title": "systemd.timer manual",
                "url": "https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html"
              }
            ]
          }
        },
        {
          "id": "les-linux-m14-l02",
          "slug": "m14-l2-long-course-systemd-timer",
          "title": "Module 14 - Lesson 2: Long course: systemd timer",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 14: cron jobs, systemd timers and Linux scheduling. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "avg65oY7sj4",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 14: cron jobs, systemd timers and Linux scheduling",
          "objectives": [
            "Understand cron expressions",
            "Schedule safe user-level maintenance",
            "Recognize systemd timer units",
            "Verify scheduled job output"
          ],
          "tags": [
            "linux",
            "module-14",
            "storage-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Long course: systemd timer), we explore fundamental aspects of Module 14: cron jobs, systemd timers and Linux scheduling. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 13"
            ],
            "theorySections": [
              {
                "title": "Overview of Long course: systemd timer",
                "content": "This lesson covers key systems principles from Module 14: cron jobs, systemd timers and Linux scheduling. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Understand cron expressions",
                  "Schedule safe user-level maintenance",
                  "Recognize systemd timer units",
                  "Verify scheduled job output"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: date",
                "instruction": "Run `date` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: crontab -l",
                "instruction": "Run `crontab -l` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: systemctl --user list-timers --all",
                "instruction": "Run `systemctl --user list-timers --all` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: systemctl list-timers --all --no-pager | head",
                "instruction": "Run `systemctl list-timers --all --no-pager | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: journalctl --user --since today -n 10 --no-pager",
                "instruction": "Run `journalctl --user --since today -n 10 --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Scheduled command actually runs",
              "Log contains at least one expected timestamp",
              "Temporary job is removed at the end"
            ],
            "commonMistakes": [
              "Using relative paths in cron jobs.",
              "Leaving a recurring task running indefinitely.",
              "Running cron tasks as root without a need."
            ],
            "securityRelevance": "Understanding Module 14: cron jobs, systemd timers and Linux scheduling is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 14.",
            "furtherReading": [
              {
                "title": "crontab manual",
                "url": "https://man7.org/linux/man-pages/man5/crontab.5.html"
              },
              {
                "title": "systemd.timer manual",
                "url": "https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m14",
        "title": "Module 14 Hands-on Lab: cron jobs, systemd timers and Linux scheduling",
        "objective": "Complete hands-on terminal tasks for Module 14: cron jobs, systemd timers and Linux scheduling in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Create a script in your course folder that appends the current date to `scheduler.log`.",
          "Run the script manually first, inspect ownership and absolute path.",
          "Schedule it in your own crontab for a temporary short interval (or create a systemd user timer).",
          "Wait for one execution and verify the file contains a new timestamp.",
          "Remove the temporary cron entry afterward and ensure no leftover recurring task remains.",
          "Document why the environment under cron may differ from your interactive shell."
        ],
        "tasks": [
          {
            "id": "task-m14-1",
            "description": "Create a script in your course folder that appends the current date to `scheduler.log`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m14-2",
            "description": "Run the script manually first, inspect ownership and absolute path.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m14-3",
            "description": "Schedule it in your own crontab for a temporary short interval (or create a systemd user timer).",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m14-4",
            "description": "Wait for one execution and verify the file contains a new timestamp.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m14-5",
            "description": "Remove the temporary cron entry afterward and ensure no leftover recurring task remains.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m14-6",
            "description": "Document why the environment under cron may differ from your interactive shell.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Scheduled command actually runs",
          "Log contains at least one expected timestamp",
          "Temporary job is removed at the end"
        ]
      },
      "quiz": {
        "title": "Module 14 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "In a standard 5-field cron expression, what does '*/5 * * * *' represent?",
            "options": [
              "Execute at 5:00 AM on the 5th day of every month",
              "Execute every 5 minutes of every hour, every day",
              "Execute 5 times per second",
              "Execute on the 5th minute of 5 specific hours"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Field 1 is minutes (*/5 means step by 5), followed by hour (*), day of month (*), month (*), day of week (*).",
            "difficulty": "intermediate"
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
            "explanation": "Cron jobs execute in a restricted, non-login shell environment where $PATH is minimal; full absolute paths guarantee command resolution.",
            "difficulty": "intermediate"
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
            "explanation": "'systemctl list-timers' lists all active timer units, when they last ran, and when they are next scheduled to trigger.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m15",
      "title": "Module 15: IP addressing, routes, DNS and Linux network commands",
      "description": "Intermediate level (Networking and automation). 1 week (9\u201312 hours). Prerequisite: Module 14. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 15,
      "lessons": [
        {
          "id": "les-linux-m15-l01",
          "slug": "m15-l1-ip-command",
          "title": "Module 15 - Lesson 1: ip command",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 15: IP addressing, routes, DNS and Linux network commands. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "wHfIFZlDxtU",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 15: IP addressing, routes, DNS and Linux network commands",
          "objectives": [
            "Explain interface and address information",
            "Read routing and DNS information",
            "Inspect listening ports and established sockets",
            "Troubleshoot a simple DNS or connectivity issue"
          ],
          "tags": [
            "linux",
            "module-15",
            "networking-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (ip command), we explore fundamental aspects of Module 15: IP addressing, routes, DNS and Linux network commands. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 14"
            ],
            "theorySections": [
              {
                "title": "Overview of ip command",
                "content": "This lesson covers key systems principles from Module 15: IP addressing, routes, DNS and Linux network commands. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain interface and address information",
                  "Read routing and DNS information",
                  "Inspect listening ports and established sockets",
                  "Troubleshoot a simple DNS or connectivity issue"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: ip -br addr",
                "instruction": "Run `ip -br addr` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: ip route",
                "instruction": "Run `ip route` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: resolvectl status",
                "instruction": "Run `resolvectl status` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: ss -tulpen",
                "instruction": "Run `ss -tulpen` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: dig example.com",
                "instruction": "Run `dig example.com` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: ping -c 3 1.1.1.1",
                "instruction": "Run `ping -c 3 1.1.1.1` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Identify active interface, IP, route and resolver",
              "Explain a listening versus established socket",
              "Restore connectivity after the lab"
            ],
            "commonMistakes": [
              "Equating DNS failure with all network failure.",
              "Assuming ping must work for a service to work.",
              "Changing network settings on your host instead of VM."
            ],
            "securityRelevance": "Understanding Module 15: IP addressing, routes, DNS and Linux network commands is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 15.",
            "furtherReading": [
              {
                "title": "ip-route2 manpages",
                "url": "https://man7.org/linux/man-pages/man8/ip.8.html"
              },
              {
                "title": "Ubuntu networking",
                "url": "https://ubuntu.com/server/docs/network-configuration"
              }
            ]
          }
        },
        {
          "id": "les-linux-m15-l02",
          "slug": "m15-l2-ss-command",
          "title": "Module 15 - Lesson 2: ss command",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 15: IP addressing, routes, DNS and Linux network commands. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "phY8Q7Woxsw",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 15: IP addressing, routes, DNS and Linux network commands",
          "objectives": [
            "Explain interface and address information",
            "Read routing and DNS information",
            "Inspect listening ports and established sockets",
            "Troubleshoot a simple DNS or connectivity issue"
          ],
          "tags": [
            "linux",
            "module-15",
            "networking-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (ss command), we explore fundamental aspects of Module 15: IP addressing, routes, DNS and Linux network commands. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 14"
            ],
            "theorySections": [
              {
                "title": "Overview of ss command",
                "content": "This lesson covers key systems principles from Module 15: IP addressing, routes, DNS and Linux network commands. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain interface and address information",
                  "Read routing and DNS information",
                  "Inspect listening ports and established sockets",
                  "Troubleshoot a simple DNS or connectivity issue"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: ip -br addr",
                "instruction": "Run `ip -br addr` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: ip route",
                "instruction": "Run `ip route` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: resolvectl status",
                "instruction": "Run `resolvectl status` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: ss -tulpen",
                "instruction": "Run `ss -tulpen` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: dig example.com",
                "instruction": "Run `dig example.com` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: ping -c 3 1.1.1.1",
                "instruction": "Run `ping -c 3 1.1.1.1` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Identify active interface, IP, route and resolver",
              "Explain a listening versus established socket",
              "Restore connectivity after the lab"
            ],
            "commonMistakes": [
              "Equating DNS failure with all network failure.",
              "Assuming ping must work for a service to work.",
              "Changing network settings on your host instead of VM."
            ],
            "securityRelevance": "Understanding Module 15: IP addressing, routes, DNS and Linux network commands is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 15.",
            "furtherReading": [
              {
                "title": "ip-route2 manpages",
                "url": "https://man7.org/linux/man-pages/man8/ip.8.html"
              },
              {
                "title": "Ubuntu networking",
                "url": "https://ubuntu.com/server/docs/network-configuration"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m15",
        "title": "Module 15 Hands-on Lab: IP addressing, routes, DNS and Linux network commands",
        "objective": "Complete hands-on terminal tasks for Module 15: IP addressing, routes, DNS and Linux network commands in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Inspect assigned interfaces and write down your VM IP address and default gateway.",
          "Use `ip route` to identify the default route.",
          "Use `resolvectl status` or `/etc/resolv.conf` to inspect DNS settings.",
          "Query `example.com` with `dig` and distinguish DNS success from ICMP success.",
          "List listening ports with `ss -tulpen` and identify local processes where permitted.",
          "Disable the virtual NIC temporarily in the VM GUI, observe command failures, then restore it."
        ],
        "tasks": [
          {
            "id": "task-m15-1",
            "description": "Inspect assigned interfaces and write down your VM IP address and default gateway.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m15-2",
            "description": "Use `ip route` to identify the default route.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m15-3",
            "description": "Use `resolvectl status` or `/etc/resolv.conf` to inspect DNS settings.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m15-4",
            "description": "Query `example.com` with `dig` and distinguish DNS success from ICMP success.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m15-5",
            "description": "List listening ports with `ss -tulpen` and identify local processes where permitted.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m15-6",
            "description": "Disable the virtual NIC temporarily in the VM GUI, observe command failures, then restore it.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Identify active interface, IP, route and resolver",
          "Explain a listening versus established socket",
          "Restore connectivity after the lab"
        ]
      },
      "quiz": {
        "title": "Module 15 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the function of the default gateway (default route 0.0.0.0/0) in a Linux routing table?",
            "options": [
              "It blocks all incoming traffic from the external internet",
              "It specifies the router IP address to which packets are forwarded when the destination IP does not match any specific local subnet route",
              "It resolves hostnames into IPv4 addresses",
              "It assigns DHCP leases to neighboring computers"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The default route matches all traffic not specifically routable on local broadcast domains, directing it to the upstream gateway router.",
            "difficulty": "intermediate"
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
            "explanation": "'ss -tuln' displays listening TCP and UDP sockets with numeric host and port resolutions, omitting slow reverse-DNS lookups.",
            "difficulty": "intermediate"
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
            "explanation": "ICMP (used by ping) is a separate protocol from TCP (used by HTTPS). Network security devices frequently drop ICMP while allowing HTTPS.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m16",
      "title": "Module 16: OpenSSH administration, keys and secure file transfer",
      "description": "Intermediate level (Networking and automation). 1 week (9\u201312 hours). Prerequisite: Module 15. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 16,
      "lessons": [
        {
          "id": "les-linux-m16-l01",
          "slug": "m16-l1-public-key-authentication",
          "title": "Module 16 - Lesson 1: Public key authentication",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 16: OpenSSH administration, keys and secure file transfer. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "bfwfRCCFTVI",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 16: OpenSSH administration, keys and secure file transfer",
          "objectives": [
            "Use SSH for remote Linux shell access",
            "Distinguish password and public-key authentication",
            "Transfer files securely with scp and sftp",
            "Inspect SSH service configuration and logs"
          ],
          "tags": [
            "linux",
            "module-16",
            "networking-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Public key authentication), we explore fundamental aspects of Module 16: OpenSSH administration, keys and secure file transfer. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 15"
            ],
            "theorySections": [
              {
                "title": "Overview of Public key authentication",
                "content": "This lesson covers key systems principles from Module 16: OpenSSH administration, keys and secure file transfer. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Use SSH for remote Linux shell access",
                  "Distinguish password and public-key authentication",
                  "Transfer files securely with scp and sftp",
                  "Inspect SSH service configuration and logs"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: ssh -V",
                "instruction": "Run `ssh -V` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: ssh-keygen -t ed25519 -f ~/linux-course/16-labkey",
                "instruction": "Run `ssh-keygen -t ed25519 -f ~/linux-course/16-labkey` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: ls -l ~/linux-course/16-labkey*",
                "instruction": "Run `ls -l ~/linux-course/16-labkey*` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: systemctl status ssh --no-pager",
                "instruction": "Run `systemctl status ssh --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: ss -tln | grep :22 || true",
                "instruction": "Run `ss -tln | grep :22 || true` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "SSH session uses the expected target VM",
              "Transferred file has correct contents",
              "Private key never included in submitted screenshots or reports"
            ],
            "commonMistakes": [
              "Publishing a private key in GitHub.",
              "Disabling password authentication before confirming key access.",
              "Changing production SSH settings without console fallback."
            ],
            "securityRelevance": "Understanding Module 16: OpenSSH administration, keys and secure file transfer is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 16.",
            "furtherReading": [
              {
                "title": "OpenSSH documentation",
                "url": "https://www.openssh.com/manual.html"
              },
              {
                "title": "Ubuntu OpenSSH server",
                "url": "https://ubuntu.com/server/docs/service-openssh"
              }
            ]
          }
        },
        {
          "id": "les-linux-m16-l02",
          "slug": "m16-l2-scp-command",
          "title": "Module 16 - Lesson 2: scp command",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 16: OpenSSH administration, keys and secure file transfer. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "Aa7tKMmeFZI",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 16: OpenSSH administration, keys and secure file transfer",
          "objectives": [
            "Use SSH for remote Linux shell access",
            "Distinguish password and public-key authentication",
            "Transfer files securely with scp and sftp",
            "Inspect SSH service configuration and logs"
          ],
          "tags": [
            "linux",
            "module-16",
            "networking-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (scp command), we explore fundamental aspects of Module 16: OpenSSH administration, keys and secure file transfer. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 15"
            ],
            "theorySections": [
              {
                "title": "Overview of scp command",
                "content": "This lesson covers key systems principles from Module 16: OpenSSH administration, keys and secure file transfer. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Use SSH for remote Linux shell access",
                  "Distinguish password and public-key authentication",
                  "Transfer files securely with scp and sftp",
                  "Inspect SSH service configuration and logs"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: ssh -V",
                "instruction": "Run `ssh -V` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: ssh-keygen -t ed25519 -f ~/linux-course/16-labkey",
                "instruction": "Run `ssh-keygen -t ed25519 -f ~/linux-course/16-labkey` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: ls -l ~/linux-course/16-labkey*",
                "instruction": "Run `ls -l ~/linux-course/16-labkey*` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: systemctl status ssh --no-pager",
                "instruction": "Run `systemctl status ssh --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: ss -tln | grep :22 || true",
                "instruction": "Run `ss -tln | grep :22 || true` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "SSH session uses the expected target VM",
              "Transferred file has correct contents",
              "Private key never included in submitted screenshots or reports"
            ],
            "commonMistakes": [
              "Publishing a private key in GitHub.",
              "Disabling password authentication before confirming key access.",
              "Changing production SSH settings without console fallback."
            ],
            "securityRelevance": "Understanding Module 16: OpenSSH administration, keys and secure file transfer is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 16.",
            "furtherReading": [
              {
                "title": "OpenSSH documentation",
                "url": "https://www.openssh.com/manual.html"
              },
              {
                "title": "Ubuntu OpenSSH server",
                "url": "https://ubuntu.com/server/docs/service-openssh"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m16",
        "title": "Module 16 Hands-on Lab: OpenSSH administration, keys and secure file transfer",
        "objective": "Complete hands-on terminal tasks for Module 16: OpenSSH administration, keys and secure file transfer in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Use two disposable Linux VMs or localhost; install `openssh-server` only if needed.",
          "Generate a **disposable practice key** in your course folder; do not overwrite an existing real key.",
          "Confirm the SSH daemon is listening; inspect `/etc/ssh/sshd_config` read-only.",
          "Copy only the public key to an authorized test account using `ssh-copy-id` or manual practice.",
          "Connect over SSH and use `scp` to transfer a harmless text file.",
          "Record how file permissions protect the private key and how to revoke a test key."
        ],
        "tasks": [
          {
            "id": "task-m16-1",
            "description": "Use two disposable Linux VMs or localhost; install `openssh-server` only if needed.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m16-2",
            "description": "Generate a **disposable practice key** in your course folder; do not overwrite an existing real key.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m16-3",
            "description": "Confirm the SSH daemon is listening; inspect `/etc/ssh/sshd_config` read-only.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m16-4",
            "description": "Copy only the public key to an authorized test account using `ssh-copy-id` or manual practice.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m16-5",
            "description": "Connect over SSH and use `scp` to transfer a harmless text file.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m16-6",
            "description": "Record how file permissions protect the private key and how to revoke a test key.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "SSH session uses the expected target VM",
          "Transferred file has correct contents",
          "Private key never included in submitted screenshots or reports"
        ]
      },
      "quiz": {
        "title": "Module 16 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "In an OpenSSH asymmetric public/private key pair, which file must NEVER be shared or copied to a remote host?",
            "options": [
              "The public key file (e.g. id_ed25519.pub)",
              "The private key file (e.g. id_ed25519)",
              "The authorized_keys file",
              "The known_hosts file"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The private key is the secret credential used to authenticate your identity; only the corresponding public key is placed on remote servers.",
            "difficulty": "intermediate"
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
            "explanation": "known_hosts saves the server's public key upon first connection; if the server key changes unexpectedly, SSH warns of potential interception.",
            "difficulty": "intermediate"
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
            "explanation": "rsync over SSH compares file timestamps and checksums, copying only modified chunks, saving substantial bandwidth and time.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m17",
      "title": "Module 17: Linux host firewalls with UFW",
      "description": "Intermediate level (Networking and automation). 1 week (9\u201312 hours). Prerequisite: Module 16. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 17,
      "lessons": [
        {
          "id": "les-linux-m17-l01",
          "slug": "m17-l1-ufw-made-easy",
          "title": "Module 17 - Lesson 1: UFW Made Easy",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 17: Linux host firewalls with UFW. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "F-ubkT1WNFk",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 17: Linux host firewalls with UFW",
          "objectives": [
            "Explain inbound versus outbound policy",
            "Inspect UFW configuration",
            "Test least-privilege access to a lab service",
            "Understand how to avoid SSH lockouts"
          ],
          "tags": [
            "linux",
            "module-17",
            "networking-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (UFW Made Easy), we explore fundamental aspects of Module 17: Linux host firewalls with UFW. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 16"
            ],
            "theorySections": [
              {
                "title": "Overview of UFW Made Easy",
                "content": "This lesson covers key systems principles from Module 17: Linux host firewalls with UFW. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain inbound versus outbound policy",
                  "Inspect UFW configuration",
                  "Test least-privilege access to a lab service",
                  "Understand how to avoid SSH lockouts"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: sudo ufw status verbose",
                "instruction": "Run `sudo ufw status verbose` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: ss -tulpen",
                "instruction": "Run `ss -tulpen` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: sudo ufw show added",
                "instruction": "Run `sudo ufw show added` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: sudo ufw status numbered",
                "instruction": "Run `sudo ufw status numbered` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: sudo journalctl -k -n 20 --no-pager",
                "instruction": "Run `sudo journalctl -k -n 20 --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Firewall status is documented before and after",
              "Expected services remain available",
              "Unnecessary inbound connectivity is blocked within lab"
            ],
            "commonMistakes": [
              "Locking yourself out of a remote VM.",
              "Assuming disabling UFW removes all firewall layers.",
              "Using broad allow-any rules without a reason."
            ],
            "securityRelevance": "Understanding Module 17: Linux host firewalls with UFW is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 17.",
            "furtherReading": [
              {
                "title": "Ubuntu firewall documentation",
                "url": "https://ubuntu.com/server/docs/firewalls"
              },
              {
                "title": "nftables wiki",
                "url": "https://wiki.nftables.org/wiki-nftables/index.php/Main_Page"
              }
            ]
          }
        },
        {
          "id": "les-linux-m17-l02",
          "slug": "m17-l2-ss-command",
          "title": "Module 17 - Lesson 2: ss command",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 17: Linux host firewalls with UFW. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "phY8Q7Woxsw",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 17: Linux host firewalls with UFW",
          "objectives": [
            "Explain inbound versus outbound policy",
            "Inspect UFW configuration",
            "Test least-privilege access to a lab service",
            "Understand how to avoid SSH lockouts"
          ],
          "tags": [
            "linux",
            "module-17",
            "networking-and-automation"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (ss command), we explore fundamental aspects of Module 17: Linux host firewalls with UFW. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 16"
            ],
            "theorySections": [
              {
                "title": "Overview of ss command",
                "content": "This lesson covers key systems principles from Module 17: Linux host firewalls with UFW. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain inbound versus outbound policy",
                  "Inspect UFW configuration",
                  "Test least-privilege access to a lab service",
                  "Understand how to avoid SSH lockouts"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: sudo ufw status verbose",
                "instruction": "Run `sudo ufw status verbose` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: ss -tulpen",
                "instruction": "Run `ss -tulpen` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: sudo ufw show added",
                "instruction": "Run `sudo ufw show added` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: sudo ufw status numbered",
                "instruction": "Run `sudo ufw status numbered` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: sudo journalctl -k -n 20 --no-pager",
                "instruction": "Run `sudo journalctl -k -n 20 --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Firewall status is documented before and after",
              "Expected services remain available",
              "Unnecessary inbound connectivity is blocked within lab"
            ],
            "commonMistakes": [
              "Locking yourself out of a remote VM.",
              "Assuming disabling UFW removes all firewall layers.",
              "Using broad allow-any rules without a reason."
            ],
            "securityRelevance": "Understanding Module 17: Linux host firewalls with UFW is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 17.",
            "furtherReading": [
              {
                "title": "Ubuntu firewall documentation",
                "url": "https://ubuntu.com/server/docs/firewalls"
              },
              {
                "title": "nftables wiki",
                "url": "https://wiki.nftables.org/wiki-nftables/index.php/Main_Page"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m17",
        "title": "Module 17 Hands-on Lab: Linux host firewalls with UFW",
        "objective": "Complete hands-on terminal tasks for Module 17: Linux host firewalls with UFW in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Take a VM snapshot and confirm you have access to the VM console.",
          "Inspect listening services with `ss` before enabling the firewall.",
          "Watch the UFW tutorial and write intended allow rules for the actual local lab services.",
          "If testing SSH remotely, allow its required test connection BEFORE enabling a deny-by-default inbound policy.",
          "Enable and test UFW in a disposable VM only; validate that desired traffic is allowed and unwanted access is denied.",
          "Document every rule and either reset the disposable VM snapshot or leave the correct known-safe configuration in place."
        ],
        "tasks": [
          {
            "id": "task-m17-1",
            "description": "Take a VM snapshot and confirm you have access to the VM console.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m17-2",
            "description": "Inspect listening services with `ss` before enabling the firewall.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m17-3",
            "description": "Watch the UFW tutorial and write intended allow rules for the actual local lab services.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m17-4",
            "description": "If testing SSH remotely, allow its required test connection BEFORE enabling a deny-by-default inbound policy.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m17-5",
            "description": "Enable and test UFW in a disposable VM only; validate that desired traffic is allowed and unwanted access is denied.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m17-6",
            "description": "Document every rule and either reset the disposable VM snapshot or leave the correct known-safe configuration in place.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Firewall status is documented before and after",
          "Expected services remain available",
          "Unnecessary inbound connectivity is blocked within lab"
        ]
      },
      "quiz": {
        "title": "Module 17 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the principle of 'default deny' in firewall security configuration?",
            "options": [
              "Denying all local users the ability to run administrative commands",
              "Blocking all incoming network connection attempts by default, explicitly whitelisting only necessary ports and services",
              "Allowing all traffic until an administrator manually enters an IP address block",
              "Disabling the network interface card on boot"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'Default deny' ensures that any port not explicitly opened is closed, preventing unintended exposure of background services.",
            "difficulty": "intermediate"
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
            "explanation": "If the firewall is enabled before permitting SSH traffic, the active remote session will be severed, leaving the server unreachable without physical/console access.",
            "difficulty": "intermediate"
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
            "explanation": "UFW translates straightforward commands (like 'ufw allow 22/tcp') into low-level iptables/nftables firewall rules enforced in kernel space.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m18",
      "title": "Module 18: Bash scripting from zero: variables, ifs and loops",
      "description": "Intermediate level (Bash and observability). 1 week (9\u201312 hours). Prerequisite: Module 17. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 18,
      "lessons": [
        {
          "id": "les-linux-m18-l01",
          "slug": "m18-l1-bash-scripting-on-linux-part-1",
          "title": "Module 18 - Lesson 1: Bash scripting on Linux, Part 1",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 18: Bash scripting from zero: variables, ifs and loops. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "2733cRPudvI",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 18: Bash scripting from zero: variables, ifs and loops",
          "objectives": [
            "Write executable shell scripts",
            "Pass and validate arguments",
            "Use conditional logic and loops",
            "Understand quoting and shell exit codes"
          ],
          "tags": [
            "linux",
            "module-18",
            "bash-and-observability"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Bash scripting on Linux, Part 1), we explore fundamental aspects of Module 18: Bash scripting from zero: variables, ifs and loops. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 17"
            ],
            "theorySections": [
              {
                "title": "Overview of Bash scripting on Linux, Part 1",
                "content": "This lesson covers key systems principles from Module 18: Bash scripting from zero: variables, ifs and loops. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Write executable shell scripts",
                  "Pass and validate arguments",
                  "Use conditional logic and loops",
                  "Understand quoting and shell exit codes"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: mkdir -p ~/linux-course/18-bash",
                "instruction": "Run `mkdir -p ~/linux-course/18-bash` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: cat > ~/linux-course/18-bash/hello.sh <<'EOF'",
                "instruction": "Run `cat > ~/linux-course/18-bash/hello.sh <<'EOF'` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: printf 'hello %s\\n' \"$USER\"",
                "instruction": "Run `printf 'hello %s\\n' \"$USER\"` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: EOF",
                "instruction": "Run `EOF` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: chmod +x ~/linux-course/18-bash/hello.sh",
                "instruction": "Run `chmod +x ~/linux-course/18-bash/hello.sh` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: bash -n ~/linux-course/18-bash/hello.sh",
                "instruction": "Run `bash -n ~/linux-course/18-bash/hello.sh` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Script runs with proper execute permissions",
              "Missing arguments produce an actionable error",
              "Variables with spaces are handled safely"
            ],
            "commonMistakes": [
              "Unquoted variable expansion.",
              "Not checking a command return code.",
              "Using sudo inside scripts unnecessarily."
            ],
            "securityRelevance": "Understanding Module 18: Bash scripting from zero: variables, ifs and loops is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 18.",
            "furtherReading": [
              {
                "title": "GNU Bash manual",
                "url": "https://www.gnu.org/software/bash/manual/"
              },
              {
                "title": "ShellCheck",
                "url": "https://www.shellcheck.net/"
              }
            ]
          }
        },
        {
          "id": "les-linux-m18-l02",
          "slug": "m18-l2-bash-scripting-for-beginners",
          "title": "Module 18 - Lesson 2: Bash scripting for beginners",
          "description": "Video lesson presented by freeCodeCamp. Covers core concepts of Module 18: Bash scripting from zero: variables, ifs and loops. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "tK9Oc6AEnR4",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 18: Bash scripting from zero: variables, ifs and loops",
          "objectives": [
            "Write executable shell scripts",
            "Pass and validate arguments",
            "Use conditional logic and loops",
            "Understand quoting and shell exit codes"
          ],
          "tags": [
            "linux",
            "module-18",
            "bash-and-observability"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Bash scripting for beginners), we explore fundamental aspects of Module 18: Bash scripting from zero: variables, ifs and loops. Follow along with freeCodeCamp, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 17"
            ],
            "theorySections": [
              {
                "title": "Overview of Bash scripting for beginners",
                "content": "This lesson covers key systems principles from Module 18: Bash scripting from zero: variables, ifs and loops. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Write executable shell scripts",
                  "Pass and validate arguments",
                  "Use conditional logic and loops",
                  "Understand quoting and shell exit codes"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: mkdir -p ~/linux-course/18-bash",
                "instruction": "Run `mkdir -p ~/linux-course/18-bash` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: cat > ~/linux-course/18-bash/hello.sh <<'EOF'",
                "instruction": "Run `cat > ~/linux-course/18-bash/hello.sh <<'EOF'` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: printf 'hello %s\\n' \"$USER\"",
                "instruction": "Run `printf 'hello %s\\n' \"$USER\"` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: EOF",
                "instruction": "Run `EOF` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: chmod +x ~/linux-course/18-bash/hello.sh",
                "instruction": "Run `chmod +x ~/linux-course/18-bash/hello.sh` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: bash -n ~/linux-course/18-bash/hello.sh",
                "instruction": "Run `bash -n ~/linux-course/18-bash/hello.sh` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Script runs with proper execute permissions",
              "Missing arguments produce an actionable error",
              "Variables with spaces are handled safely"
            ],
            "commonMistakes": [
              "Unquoted variable expansion.",
              "Not checking a command return code.",
              "Using sudo inside scripts unnecessarily."
            ],
            "securityRelevance": "Understanding Module 18: Bash scripting from zero: variables, ifs and loops is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 18.",
            "furtherReading": [
              {
                "title": "GNU Bash manual",
                "url": "https://www.gnu.org/software/bash/manual/"
              },
              {
                "title": "ShellCheck",
                "url": "https://www.shellcheck.net/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m18",
        "title": "Module 18 Hands-on Lab: variables, ifs and loops",
        "objective": "Complete hands-on terminal tasks for Module 18: Bash scripting from zero: variables, ifs and loops in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Watch the introductory Bash video and type examples yourself.",
          "Write `hello.sh` in Nano rather than copying complex snippets blindly.",
          "Add a required username argument and print an error when it is missing.",
          "Add a `for` loop that prints three planned directories.",
          "Add a function that checks whether an input file exists; return success/failure appropriately.",
          "Run `bash -n` for syntax validation and add comments explaining each branch."
        ],
        "tasks": [
          {
            "id": "task-m18-1",
            "description": "Watch the introductory Bash video and type examples yourself.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m18-2",
            "description": "Write `hello.sh` in Nano rather than copying complex snippets blindly.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m18-3",
            "description": "Add a required username argument and print an error when it is missing.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m18-4",
            "description": "Add a `for` loop that prints three planned directories.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m18-5",
            "description": "Add a function that checks whether an input file exists; return success/failure appropriately.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m18-6",
            "description": "Run `bash -n` for syntax validation and add comments explaining each branch.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Script runs with proper execute permissions",
          "Missing arguments produce an actionable error",
          "Variables with spaces are handled safely"
        ]
      },
      "quiz": {
        "title": "Module 18 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the role of the shebang '#!/usr/bin/env bash' at the first line of a script?",
            "options": [
              "It marks the file as executable in the filesystem metadata",
              "It instructs the program loader to locate the bash binary in the user's active PATH and use it as the script interpreter",
              "It enables root administrative mode automatically",
              "It suppresses all script error messages"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The shebang specifies which interpreter should execute the script; using '/usr/bin/env bash' ensures portability across different Unix distributions.",
            "difficulty": "intermediate"
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
            "explanation": "'$?' holds the return code of the last command; 0 signifies normal completion, while non-zero indicates an error.",
            "difficulty": "intermediate"
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
            "explanation": "Unquoted variables are subject to word splitting and globbing, which causes errors if the variable string contains spaces or wildcards.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m19",
      "title": "Module 19: Advanced Bash, awk, sed, regex and robust scripts",
      "description": "Advanced level (Bash and observability). 1 week (9\u201312 hours). Prerequisite: Module 18. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 19,
      "lessons": [
        {
          "id": "les-linux-m19-l01",
          "slug": "m19-l1-awk",
          "title": "Module 19 - Lesson 1: awk",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 19: Advanced Bash, awk, sed, regex and robust scripts. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "oPEnvuj9QrI",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 19: Advanced Bash, awk, sed, regex and robust scripts",
          "objectives": [
            "Parse structured text with awk and sed",
            "Handle errors predictably",
            "Use functions and temporary files safely",
            "Lint and test scripts"
          ],
          "tags": [
            "linux",
            "module-19",
            "bash-and-observability"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (awk), we explore fundamental aspects of Module 19: Advanced Bash, awk, sed, regex and robust scripts. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 18"
            ],
            "theorySections": [
              {
                "title": "Overview of awk",
                "content": "This lesson covers key systems principles from Module 19: Advanced Bash, awk, sed, regex and robust scripts. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Parse structured text with awk and sed",
                  "Handle errors predictably",
                  "Use functions and temporary files safely",
                  "Lint and test scripts"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: printf 'alice,ok\\nbob,fail\\ncarol,ok\\n' > ~/linux-course/19-status.csv",
                "instruction": "Run `printf 'alice,ok\\nbob,fail\\ncarol,ok\\n' > ~/linux-course/19-status.csv` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: awk -F, '$2==\"fail\" {print $1}' ~/linux-course/19-status.csv",
                "instruction": "Run `awk -F, '$2==\"fail\" {print $1}' ~/linux-course/19-status.csv` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: sed 's/,/ | /g' ~/linux-course/19-status.csv",
                "instruction": "Run `sed 's/,/ | /g' ~/linux-course/19-status.csv` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: grep -En '^[a-z]+,(ok|fail)$' ~/linux-course/19-status.csv",
                "instruction": "Run `grep -En '^[a-z]+,(ok|fail)$' ~/linux-course/19-status.csv` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: command -v shellcheck || true",
                "instruction": "Run `command -v shellcheck || true` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Correct result for all sample records",
              "Invalid input causes clean failure",
              "Linter findings addressed or explained"
            ],
            "commonMistakes": [
              "Assuming a trivial awk parser handles arbitrary CSV quoting.",
              "Using `/tmp/fixed-name` for sensitive temporary files.",
              "Using `set -e` without testing errors in pipelines and conditionals."
            ],
            "securityRelevance": "Understanding Module 19: Advanced Bash, awk, sed, regex and robust scripts is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 19.",
            "furtherReading": [
              {
                "title": "Bash FAQ",
                "url": "https://mywiki.wooledge.org/BashFAQ"
              },
              {
                "title": "GNU awk manual",
                "url": "https://www.gnu.org/software/gawk/manual/gawk.html"
              }
            ]
          }
        },
        {
          "id": "les-linux-m19-l02",
          "slug": "m19-l2-sed",
          "title": "Module 19 - Lesson 2: sed",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 19: Advanced Bash, awk, sed, regex and robust scripts. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "nXLnx8ncZyE",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 19: Advanced Bash, awk, sed, regex and robust scripts",
          "objectives": [
            "Parse structured text with awk and sed",
            "Handle errors predictably",
            "Use functions and temporary files safely",
            "Lint and test scripts"
          ],
          "tags": [
            "linux",
            "module-19",
            "bash-and-observability"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (sed), we explore fundamental aspects of Module 19: Advanced Bash, awk, sed, regex and robust scripts. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 18"
            ],
            "theorySections": [
              {
                "title": "Overview of sed",
                "content": "This lesson covers key systems principles from Module 19: Advanced Bash, awk, sed, regex and robust scripts. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Parse structured text with awk and sed",
                  "Handle errors predictably",
                  "Use functions and temporary files safely",
                  "Lint and test scripts"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: printf 'alice,ok\\nbob,fail\\ncarol,ok\\n' > ~/linux-course/19-status.csv",
                "instruction": "Run `printf 'alice,ok\\nbob,fail\\ncarol,ok\\n' > ~/linux-course/19-status.csv` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: awk -F, '$2==\"fail\" {print $1}' ~/linux-course/19-status.csv",
                "instruction": "Run `awk -F, '$2==\"fail\" {print $1}' ~/linux-course/19-status.csv` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: sed 's/,/ | /g' ~/linux-course/19-status.csv",
                "instruction": "Run `sed 's/,/ | /g' ~/linux-course/19-status.csv` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: grep -En '^[a-z]+,(ok|fail)$' ~/linux-course/19-status.csv",
                "instruction": "Run `grep -En '^[a-z]+,(ok|fail)$' ~/linux-course/19-status.csv` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: command -v shellcheck || true",
                "instruction": "Run `command -v shellcheck || true` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Correct result for all sample records",
              "Invalid input causes clean failure",
              "Linter findings addressed or explained"
            ],
            "commonMistakes": [
              "Assuming a trivial awk parser handles arbitrary CSV quoting.",
              "Using `/tmp/fixed-name` for sensitive temporary files.",
              "Using `set -e` without testing errors in pipelines and conditionals."
            ],
            "securityRelevance": "Understanding Module 19: Advanced Bash, awk, sed, regex and robust scripts is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 19.",
            "furtherReading": [
              {
                "title": "Bash FAQ",
                "url": "https://mywiki.wooledge.org/BashFAQ"
              },
              {
                "title": "GNU awk manual",
                "url": "https://www.gnu.org/software/gawk/manual/gawk.html"
              }
            ]
          }
        },
        {
          "id": "les-linux-m19-l03",
          "slug": "m19-l3-full-course-sed-to-awk-section",
          "title": "Module 19 - Lesson 3: Full course: sed to awk section",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 19: Advanced Bash, awk, sed, regex and robust scripts. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "avg65oY7sj4",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 3,
          "moduleTitle": "Module 19: Advanced Bash, awk, sed, regex and robust scripts",
          "objectives": [
            "Parse structured text with awk and sed",
            "Handle errors predictably",
            "Use functions and temporary files safely",
            "Lint and test scripts"
          ],
          "tags": [
            "linux",
            "module-19",
            "bash-and-observability"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Full course: sed to awk section), we explore fundamental aspects of Module 19: Advanced Bash, awk, sed, regex and robust scripts. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 18"
            ],
            "theorySections": [
              {
                "title": "Overview of Full course: sed to awk section",
                "content": "This lesson covers key systems principles from Module 19: Advanced Bash, awk, sed, regex and robust scripts. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Parse structured text with awk and sed",
                  "Handle errors predictably",
                  "Use functions and temporary files safely",
                  "Lint and test scripts"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: printf 'alice,ok\\nbob,fail\\ncarol,ok\\n' > ~/linux-course/19-status.csv",
                "instruction": "Run `printf 'alice,ok\\nbob,fail\\ncarol,ok\\n' > ~/linux-course/19-status.csv` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: awk -F, '$2==\"fail\" {print $1}' ~/linux-course/19-status.csv",
                "instruction": "Run `awk -F, '$2==\"fail\" {print $1}' ~/linux-course/19-status.csv` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: sed 's/,/ | /g' ~/linux-course/19-status.csv",
                "instruction": "Run `sed 's/,/ | /g' ~/linux-course/19-status.csv` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: grep -En '^[a-z]+,(ok|fail)$' ~/linux-course/19-status.csv",
                "instruction": "Run `grep -En '^[a-z]+,(ok|fail)$' ~/linux-course/19-status.csv` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: command -v shellcheck || true",
                "instruction": "Run `command -v shellcheck || true` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Correct result for all sample records",
              "Invalid input causes clean failure",
              "Linter findings addressed or explained"
            ],
            "commonMistakes": [
              "Assuming a trivial awk parser handles arbitrary CSV quoting.",
              "Using `/tmp/fixed-name` for sensitive temporary files.",
              "Using `set -e` without testing errors in pipelines and conditionals."
            ],
            "securityRelevance": "Understanding Module 19: Advanced Bash, awk, sed, regex and robust scripts is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 19.",
            "furtherReading": [
              {
                "title": "Bash FAQ",
                "url": "https://mywiki.wooledge.org/BashFAQ"
              },
              {
                "title": "GNU awk manual",
                "url": "https://www.gnu.org/software/gawk/manual/gawk.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m19",
        "title": "Module 19 Hands-on Lab: Advanced Bash, awk, sed, regex and robust scripts",
        "objective": "Complete hands-on terminal tasks for Module 19: Advanced Bash, awk, sed, regex and robust scripts in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Generate a comma-separated three-row sample as shown.",
          "Use `awk` to list users whose status is `fail`.",
          "Transform the CSV using `sed` but keep the original unchanged.",
          "Use `grep -E` to validate row shape.",
          "Build `status-report.sh` that verifies file existence, parses rows, prints counts, and exits nonzero on invalid input.",
          "Run ShellCheck; fix errors, then add one deliberate edge case (blank line or comma in value) and document the parser limitation."
        ],
        "tasks": [
          {
            "id": "task-m19-1",
            "description": "Generate a comma-separated three-row sample as shown.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m19-2",
            "description": "Use `awk` to list users whose status is `fail`.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m19-3",
            "description": "Transform the CSV using `sed` but keep the original unchanged.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m19-4",
            "description": "Use `grep -E` to validate row shape.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m19-5",
            "description": "Build `status-report.sh` that verifies file existence, parses rows, prints counts, and exits nonzero on invalid input.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m19-6",
            "description": "Run ShellCheck; fix errors, then add one deliberate edge case (blank line or comma in value) and document the parser limitation.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Correct result for all sample records",
          "Invalid input causes clean failure",
          "Linter findings addressed or explained"
        ]
      },
      "quiz": {
        "title": "Module 19 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "In the AWK text processing utility, what does the switch '-F,' specify?",
            "options": [
              "Format output in floating-point scientific notation",
              "Set the input field delimiter to a comma, enabling CSV column parsing",
              "Filter out all lines containing lowercase letters",
              "Force AWK to run in recursive file mode"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'-F' sets the field separator (FS) in AWK; '-F,' separates fields by commas, allowing access via $1, $2, etc.",
            "difficulty": "advanced"
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
            "explanation": "'trap' handles signals and execution events, ensuring temporary files and background locks are cleanly removed upon exit or interruption.",
            "difficulty": "advanced"
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
            "explanation": "Full CSV data can have commas inside quoted strings (\"Smith, John\"), which simple character-splitting utilities misinterpret as field breaks.",
            "difficulty": "advanced"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m20",
      "title": "Module 20: Linux logging: journald, syslog and logrotate",
      "description": "Advanced level (Bash and observability). 1 week (9\u201312 hours). Prerequisite: Module 19. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 20,
      "lessons": [
        {
          "id": "les-linux-m20-l01",
          "slug": "m20-l1-understanding-linux-logging",
          "title": "Module 20 - Lesson 1: Understanding Linux Logging",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 20: Linux logging: journald, syslog and logrotate. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "6uP_f_z3CbM",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 20: Linux logging: journald, syslog and logrotate",
          "objectives": [
            "Find system and service logs",
            "Filter by unit, time and priority",
            "Understand journald versus text log files",
            "Produce a repeatable log review report"
          ],
          "tags": [
            "linux",
            "module-20",
            "bash-and-observability"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Understanding Linux Logging), we explore fundamental aspects of Module 20: Linux logging: journald, syslog and logrotate. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 19"
            ],
            "theorySections": [
              {
                "title": "Overview of Understanding Linux Logging",
                "content": "This lesson covers key systems principles from Module 20: Linux logging: journald, syslog and logrotate. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Find system and service logs",
                  "Filter by unit, time and priority",
                  "Understand journald versus text log files",
                  "Produce a repeatable log review report"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: journalctl -b -n 20 --no-pager",
                "instruction": "Run `journalctl -b -n 20 --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: journalctl -p warning --since today --no-pager",
                "instruction": "Run `journalctl -p warning --since today --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: journalctl --disk-usage",
                "instruction": "Run `journalctl --disk-usage` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: ls -la /var/log | head",
                "instruction": "Run `ls -la /var/log | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: systemctl status systemd-journald --no-pager",
                "instruction": "Run `systemctl status systemd-journald --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can find logs by unit and time",
              "Can explain where authentication records may be stored",
              "No secrets or private key material in the report"
            ],
            "commonMistakes": [
              "Assuming `/var/log/auth.log` exists on every Linux distro.",
              "Treating every warning as an attack.",
              "Sharing full logs containing personal identifiers."
            ],
            "securityRelevance": "Understanding Module 20: Linux logging: journald, syslog and logrotate is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 20.",
            "furtherReading": [
              {
                "title": "journalctl manual",
                "url": "https://www.freedesktop.org/software/systemd/man/latest/journalctl.html"
              },
              {
                "title": "logrotate manual",
                "url": "https://man7.org/linux/man-pages/man8/logrotate.8.html"
              }
            ]
          }
        },
        {
          "id": "les-linux-m20-l02",
          "slug": "m20-l2-journalctl-basics",
          "title": "Module 20 - Lesson 2: journalctl Basics",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 20: Linux logging: journald, syslog and logrotate. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "0dG3vUYt7Uk",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 20: Linux logging: journald, syslog and logrotate",
          "objectives": [
            "Find system and service logs",
            "Filter by unit, time and priority",
            "Understand journald versus text log files",
            "Produce a repeatable log review report"
          ],
          "tags": [
            "linux",
            "module-20",
            "bash-and-observability"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (journalctl Basics), we explore fundamental aspects of Module 20: Linux logging: journald, syslog and logrotate. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 19"
            ],
            "theorySections": [
              {
                "title": "Overview of journalctl Basics",
                "content": "This lesson covers key systems principles from Module 20: Linux logging: journald, syslog and logrotate. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Find system and service logs",
                  "Filter by unit, time and priority",
                  "Understand journald versus text log files",
                  "Produce a repeatable log review report"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: journalctl -b -n 20 --no-pager",
                "instruction": "Run `journalctl -b -n 20 --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: journalctl -p warning --since today --no-pager",
                "instruction": "Run `journalctl -p warning --since today --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: journalctl --disk-usage",
                "instruction": "Run `journalctl --disk-usage` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: ls -la /var/log | head",
                "instruction": "Run `ls -la /var/log | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: systemctl status systemd-journald --no-pager",
                "instruction": "Run `systemctl status systemd-journald --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can find logs by unit and time",
              "Can explain where authentication records may be stored",
              "No secrets or private key material in the report"
            ],
            "commonMistakes": [
              "Assuming `/var/log/auth.log` exists on every Linux distro.",
              "Treating every warning as an attack.",
              "Sharing full logs containing personal identifiers."
            ],
            "securityRelevance": "Understanding Module 20: Linux logging: journald, syslog and logrotate is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 20.",
            "furtherReading": [
              {
                "title": "journalctl manual",
                "url": "https://www.freedesktop.org/software/systemd/man/latest/journalctl.html"
              },
              {
                "title": "logrotate manual",
                "url": "https://man7.org/linux/man-pages/man8/logrotate.8.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m20",
        "title": "Module 20 Hands-on Lab: journald, syslog and logrotate",
        "objective": "Complete hands-on terminal tasks for Module 20: Linux logging: journald, syslog and logrotate in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Inspect boot logs without modifying them.",
          "Filter journal messages to only warning and higher priority for the current day.",
          "Inspect logs for a known unit (for example cron or ssh if installed).",
          "Record time zone and explain why comparisons across hosts may be confusing.",
          "Identify whether `/var/log/auth.log` exists on your distribution; if absent, use the journal or relevant platform logging.",
          "Write a summary with five noteworthy but non-sensitive service events and their timestamps."
        ],
        "tasks": [
          {
            "id": "task-m20-1",
            "description": "Inspect boot logs without modifying them.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m20-2",
            "description": "Filter journal messages to only warning and higher priority for the current day.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m20-3",
            "description": "Inspect logs for a known unit (for example cron or ssh if installed).",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m20-4",
            "description": "Record time zone and explain why comparisons across hosts may be confusing.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m20-5",
            "description": "Identify whether `/var/log/auth.log` exists on your distribution; if absent, use the journal or relevant platform logging.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m20-6",
            "description": "Write a summary with five noteworthy but non-sensitive service events and their timestamps.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Can find logs by unit and time",
          "Can explain where authentication records may be stored",
          "No secrets or private key material in the report"
        ]
      },
      "quiz": {
        "title": "Module 20 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What log messages are displayed by executing 'journalctl -b'?",
            "options": [
              "All log messages generated exclusively by battery power management",
              "All log messages recorded since the current system boot only",
              "Logs recorded in reverse chronological order from last year",
              "Only kernel panic messages"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The '-b' flag filters systemd journal records to only show entries from the current boot cycle.",
            "difficulty": "advanced"
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
            "explanation": "logrotate automates rotating, compressing, and deleting aging log files so service logs do not exhaust filesystem storage.",
            "difficulty": "advanced"
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
            "explanation": "Without synchronized time (NTP), establishing the true order of adversary actions and cross-referencing multi-system logs during incident triage is impossible.",
            "difficulty": "advanced"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m21",
      "title": "Module 21: Linux performance, capacity and troubleshooting",
      "description": "Advanced level (Advanced Linux operations). 1 week (9\u201312 hours). Prerequisite: Module 20. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 21,
      "lessons": [
        {
          "id": "les-linux-m21-l01",
          "slug": "m21-l1-how-to-interpret-linux-load-average",
          "title": "Module 21 - Lesson 1: How to interpret Linux load average",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 21: Linux performance, capacity and troubleshooting. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "4bJmzHh4pg0",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 21: Linux performance, capacity and troubleshooting",
          "objectives": [
            "Diagnose CPU, memory, IO and disk problems",
            "Read load average and swap usage",
            "Use observation before changing settings",
            "Write a systematic troubleshooting report"
          ],
          "tags": [
            "linux",
            "module-21",
            "advanced-linux-operations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (How to interpret Linux load average), we explore fundamental aspects of Module 21: Linux performance, capacity and troubleshooting. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 20"
            ],
            "theorySections": [
              {
                "title": "Overview of How to interpret Linux load average",
                "content": "This lesson covers key systems principles from Module 21: Linux performance, capacity and troubleshooting. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Diagnose CPU, memory, IO and disk problems",
                  "Read load average and swap usage",
                  "Use observation before changing settings",
                  "Write a systematic troubleshooting report"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: uptime",
                "instruction": "Run `uptime` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: free -h",
                "instruction": "Run `free -h` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: df -hT",
                "instruction": "Run `df -hT` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: df -i",
                "instruction": "Run `df -i` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: top -b -n 1 | head -n 20",
                "instruction": "Run `top -b -n 1 | head -n 20` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: ps -eo pid,stat,%cpu,%mem,comm --sort=-%cpu | head",
                "instruction": "Run `ps -eo pid,stat,%cpu,%mem,comm --sort=-%cpu | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Report includes at least four observed metrics",
              "Correctly distinguishes free versus cached memory",
              "Documents investigation without random reboots"
            ],
            "commonMistakes": [
              "Treating high Linux memory cache as a fault.",
              "Interpreting load average without CPU-core context.",
              "Disabling services before understanding root cause."
            ],
            "securityRelevance": "Understanding Module 21: Linux performance, capacity and troubleshooting is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 21.",
            "furtherReading": [
              {
                "title": "proc man page",
                "url": "https://man7.org/linux/man-pages/man5/proc.5.html"
              },
              {
                "title": "Linux performance tools overview",
                "url": "https://www.brendangregg.com/linuxperf.html"
              }
            ]
          }
        },
        {
          "id": "les-linux-m21-l02",
          "slug": "m21-l2-understanding-memory-and-swap",
          "title": "Module 21 - Lesson 2: Understanding memory and swap",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 21: Linux performance, capacity and troubleshooting. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "XTMyJ5l0GLg",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 21: Linux performance, capacity and troubleshooting",
          "objectives": [
            "Diagnose CPU, memory, IO and disk problems",
            "Read load average and swap usage",
            "Use observation before changing settings",
            "Write a systematic troubleshooting report"
          ],
          "tags": [
            "linux",
            "module-21",
            "advanced-linux-operations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Understanding memory and swap), we explore fundamental aspects of Module 21: Linux performance, capacity and troubleshooting. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 20"
            ],
            "theorySections": [
              {
                "title": "Overview of Understanding memory and swap",
                "content": "This lesson covers key systems principles from Module 21: Linux performance, capacity and troubleshooting. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Diagnose CPU, memory, IO and disk problems",
                  "Read load average and swap usage",
                  "Use observation before changing settings",
                  "Write a systematic troubleshooting report"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: uptime",
                "instruction": "Run `uptime` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: free -h",
                "instruction": "Run `free -h` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: df -hT",
                "instruction": "Run `df -hT` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: df -i",
                "instruction": "Run `df -i` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: top -b -n 1 | head -n 20",
                "instruction": "Run `top -b -n 1 | head -n 20` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: ps -eo pid,stat,%cpu,%mem,comm --sort=-%cpu | head",
                "instruction": "Run `ps -eo pid,stat,%cpu,%mem,comm --sort=-%cpu | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Report includes at least four observed metrics",
              "Correctly distinguishes free versus cached memory",
              "Documents investigation without random reboots"
            ],
            "commonMistakes": [
              "Treating high Linux memory cache as a fault.",
              "Interpreting load average without CPU-core context.",
              "Disabling services before understanding root cause."
            ],
            "securityRelevance": "Understanding Module 21: Linux performance, capacity and troubleshooting is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 21.",
            "furtherReading": [
              {
                "title": "proc man page",
                "url": "https://man7.org/linux/man-pages/man5/proc.5.html"
              },
              {
                "title": "Linux performance tools overview",
                "url": "https://www.brendangregg.com/linuxperf.html"
              }
            ]
          }
        },
        {
          "id": "les-linux-m21-l03",
          "slug": "m21-l3-sar-command",
          "title": "Module 21 - Lesson 3: sar command",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 21: Linux performance, capacity and troubleshooting. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "_4WVPSfGqos",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 3,
          "moduleTitle": "Module 21: Linux performance, capacity and troubleshooting",
          "objectives": [
            "Diagnose CPU, memory, IO and disk problems",
            "Read load average and swap usage",
            "Use observation before changing settings",
            "Write a systematic troubleshooting report"
          ],
          "tags": [
            "linux",
            "module-21",
            "advanced-linux-operations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (sar command), we explore fundamental aspects of Module 21: Linux performance, capacity and troubleshooting. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 20"
            ],
            "theorySections": [
              {
                "title": "Overview of sar command",
                "content": "This lesson covers key systems principles from Module 21: Linux performance, capacity and troubleshooting. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Diagnose CPU, memory, IO and disk problems",
                  "Read load average and swap usage",
                  "Use observation before changing settings",
                  "Write a systematic troubleshooting report"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: uptime",
                "instruction": "Run `uptime` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: free -h",
                "instruction": "Run `free -h` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: df -hT",
                "instruction": "Run `df -hT` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: df -i",
                "instruction": "Run `df -i` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: top -b -n 1 | head -n 20",
                "instruction": "Run `top -b -n 1 | head -n 20` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: ps -eo pid,stat,%cpu,%mem,comm --sort=-%cpu | head",
                "instruction": "Run `ps -eo pid,stat,%cpu,%mem,comm --sort=-%cpu | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Report includes at least four observed metrics",
              "Correctly distinguishes free versus cached memory",
              "Documents investigation without random reboots"
            ],
            "commonMistakes": [
              "Treating high Linux memory cache as a fault.",
              "Interpreting load average without CPU-core context.",
              "Disabling services before understanding root cause."
            ],
            "securityRelevance": "Understanding Module 21: Linux performance, capacity and troubleshooting is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 21.",
            "furtherReading": [
              {
                "title": "proc man page",
                "url": "https://man7.org/linux/man-pages/man5/proc.5.html"
              },
              {
                "title": "Linux performance tools overview",
                "url": "https://www.brendangregg.com/linuxperf.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m21",
        "title": "Module 21 Hands-on Lab: Linux performance, capacity and troubleshooting",
        "objective": "Complete hands-on terminal tasks for Module 21: Linux performance, capacity and troubleshooting in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Record a clean baseline of CPU, memory, load average, swap and disk use.",
          "Run a short local harmless command (e.g. `sha256sum` over a test file) and compare resource readings.",
          "Use `ps`/`top` to identify active workloads; do not kill anything you do not own.",
          "Check free disk space and inode use separately.",
          "Inspect relevant journal warnings around a simulated failed service start.",
          "Produce a concise diagnostic report with: symptom, evidence, hypothesis, test and conclusion."
        ],
        "tasks": [
          {
            "id": "task-m21-1",
            "description": "Record a clean baseline of CPU, memory, load average, swap and disk use.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m21-2",
            "description": "Run a short local harmless command (e.g. `sha256sum` over a test file) and compare resource readings.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m21-3",
            "description": "Use `ps`/`top` to identify active workloads; do not kill anything you do not own.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m21-4",
            "description": "Check free disk space and inode use separately.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m21-5",
            "description": "Inspect relevant journal warnings around a simulated failed service start.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m21-6",
            "description": "Produce a concise diagnostic report with: symptom, evidence, hypothesis, test and conclusion.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Report includes at least four observed metrics",
          "Correctly distinguishes free versus cached memory",
          "Documents investigation without random reboots"
        ]
      },
      "quiz": {
        "title": "Module 21 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the purpose of swap space in Linux memory management?",
            "options": [
              "Swapping user accounts between terminal consoles",
              "Providing virtual memory on disk to stage infrequently accessed memory pages when physical RAM is under pressure",
              "Accelerating hard drive read/write speed by caching files in RAM",
              "Storing kernel crash dumps only"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Swap allows the kernel to page out inactive anonymous memory to disk, freeing up physical RAM for active processes and cache.",
            "difficulty": "advanced"
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
            "explanation": "Load average measures running + runnable + uninterruptible tasks. On a 2-core machine, a load of 2.0 is 100% saturation; 4.0 means demand exceeds capacity by double.",
            "difficulty": "advanced"
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
            "explanation": "'df -i' checks inode table usage. If all inodes are consumed by millions of tiny files, new files cannot be created even if free disk space exists.",
            "difficulty": "advanced"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m22",
      "title": "Module 22: Linux storage encryption with LUKS (advanced lab)",
      "description": "Advanced level (Advanced Linux operations). 1 week (9\u201312 hours). Prerequisite: Module 21. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 22,
      "lessons": [
        {
          "id": "les-linux-m22-l01",
          "slug": "m22-l1-linux-command-line-complete-course-luks-chapter",
          "title": "Module 22 - Lesson 1: Linux Command Line complete course: LUKS chapter",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 22: Linux storage encryption with LUKS (advanced lab). Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "avg65oY7sj4",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 22: Linux storage encryption with LUKS (advanced lab)",
          "objectives": [
            "Explain at-rest disk encryption",
            "Understand dm-crypt and LUKS concepts",
            "Inspect an encrypted test volume safely",
            "Document unlock, mount and recovery principles"
          ],
          "tags": [
            "linux",
            "module-22",
            "advanced-linux-operations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Linux Command Line complete course: LUKS chapter), we explore fundamental aspects of Module 22: Linux storage encryption with LUKS (advanced lab). Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 21"
            ],
            "theorySections": [
              {
                "title": "Overview of Linux Command Line complete course: LUKS chapter",
                "content": "This lesson covers key systems principles from Module 22: Linux storage encryption with LUKS (advanced lab). Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain at-rest disk encryption",
                  "Understand dm-crypt and LUKS concepts",
                  "Inspect an encrypted test volume safely",
                  "Document unlock, mount and recovery principles"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: lsblk -f",
                "instruction": "Run `lsblk -f` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: findmnt -T /",
                "instruction": "Run `findmnt -T /` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: command -v cryptsetup || true",
                "instruction": "Run `command -v cryptsetup || true` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: cryptsetup --help | head",
                "instruction": "Run `cryptsetup --help | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can explain LUKS and dm-crypt in plain terms",
              "Can distinguish unlocked block device from mounted filesystem",
              "Disks with existing data were never targeted"
            ],
            "commonMistakes": [
              "Encrypting the wrong partition.",
              "Storing a recovery passphrase in public notes.",
              "Assuming encryption can recover data after deletion."
            ],
            "securityRelevance": "Understanding Module 22: Linux storage encryption with LUKS (advanced lab) is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 22.",
            "furtherReading": [
              {
                "title": "cryptsetup documentation",
                "url": "https://gitlab.com/cryptsetup/cryptsetup/-/wikis/home"
              },
              {
                "title": "ArchWiki dm-crypt",
                "url": "https://wiki.archlinux.org/title/Dm-crypt/Encrypting_an_entire_system"
              }
            ]
          }
        },
        {
          "id": "les-linux-m22-l02",
          "slug": "m22-l2-same-video-cryptsetup-cli-luks-lesson",
          "title": "Module 22 - Lesson 2: Same video: cryptsetup CLI LUKS lesson",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 22: Linux storage encryption with LUKS (advanced lab). Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "avg65oY7sj4",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 22: Linux storage encryption with LUKS (advanced lab)",
          "objectives": [
            "Explain at-rest disk encryption",
            "Understand dm-crypt and LUKS concepts",
            "Inspect an encrypted test volume safely",
            "Document unlock, mount and recovery principles"
          ],
          "tags": [
            "linux",
            "module-22",
            "advanced-linux-operations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Same video: cryptsetup CLI LUKS lesson), we explore fundamental aspects of Module 22: Linux storage encryption with LUKS (advanced lab). Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 21"
            ],
            "theorySections": [
              {
                "title": "Overview of Same video: cryptsetup CLI LUKS lesson",
                "content": "This lesson covers key systems principles from Module 22: Linux storage encryption with LUKS (advanced lab). Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Explain at-rest disk encryption",
                  "Understand dm-crypt and LUKS concepts",
                  "Inspect an encrypted test volume safely",
                  "Document unlock, mount and recovery principles"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: lsblk -f",
                "instruction": "Run `lsblk -f` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: findmnt -T /",
                "instruction": "Run `findmnt -T /` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: command -v cryptsetup || true",
                "instruction": "Run `command -v cryptsetup || true` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: cryptsetup --help | head",
                "instruction": "Run `cryptsetup --help | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Can explain LUKS and dm-crypt in plain terms",
              "Can distinguish unlocked block device from mounted filesystem",
              "Disks with existing data were never targeted"
            ],
            "commonMistakes": [
              "Encrypting the wrong partition.",
              "Storing a recovery passphrase in public notes.",
              "Assuming encryption can recover data after deletion."
            ],
            "securityRelevance": "Understanding Module 22: Linux storage encryption with LUKS (advanced lab) is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 22.",
            "furtherReading": [
              {
                "title": "cryptsetup documentation",
                "url": "https://gitlab.com/cryptsetup/cryptsetup/-/wikis/home"
              },
              {
                "title": "ArchWiki dm-crypt",
                "url": "https://wiki.archlinux.org/title/Dm-crypt/Encrypting_an_entire_system"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m22",
        "title": "Module 22 Hands-on Lab: Linux storage encryption with LUKS (advanced lab)",
        "objective": "Complete hands-on terminal tasks for Module 22: Linux storage encryption with LUKS (advanced lab) in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Watch the LUKS chapter in the full Linux video before any hands-on steps.",
          "Take a VM snapshot and add a brand-new blank secondary virtual disk (or create a controlled file-backed test device with an instructor).",
          "Use read-only `lsblk` to verify which disk is disposable; write down its ID and size.",
          "Follow the video for encryption only after verifying you are NOT selecting the operating system disk.",
          "Practice unlocking and mounting inside the disposable VM; place one harmless sample file on the test filesystem.",
          "Un-mount/close the volume carefully and document how loss of credentials could affect recovery."
        ],
        "tasks": [
          {
            "id": "task-m22-1",
            "description": "Watch the LUKS chapter in the full Linux video before any hands-on steps.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m22-2",
            "description": "Take a VM snapshot and add a brand-new blank secondary virtual disk (or create a controlled file-backed test device with an instructor).",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m22-3",
            "description": "Use read-only `lsblk` to verify which disk is disposable; write down its ID and size.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m22-4",
            "description": "Follow the video for encryption only after verifying you are NOT selecting the operating system disk.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m22-5",
            "description": "Practice unlocking and mounting inside the disposable VM; place one harmless sample file on the test filesystem.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m22-6",
            "description": "Un-mount/close the volume carefully and document how loss of credentials could affect recovery.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Can explain LUKS and dm-crypt in plain terms",
          "Can distinguish unlocked block device from mounted filesystem",
          "Disks with existing data were never targeted"
        ]
      },
      "quiz": {
        "title": "Module 22 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What primary threat does LUKS (Linux Unified Key Setup) full-disk encryption protect against?",
            "options": [
              "Remote network web application attacks and SQL injections",
              "Unauthorized data access from offline physical theft of storage drives or decommissioned hardware",
              "Privilege escalation by local users logged in via SSH",
              "DDoS attacks targeting network sockets"
            ],
            "correctAnswerIndex": 1,
            "explanation": "LUKS protects data-at-rest. If a laptop or drive is stolen or inspected offline, the contents cannot be read without the decryption passphrase/key.",
            "difficulty": "advanced"
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
            "explanation": "Disk encryption protects data at rest; once unlocked, the kernel mapper presents plain block access to active OS processes.",
            "difficulty": "advanced"
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
            "explanation": "The LUKS header contains the master key encrypted by user passphrases. If damaged by bad sectors or accidental overwrites, the data is lost forever.",
            "difficulty": "advanced"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m23",
      "title": "Module 23: Linux server hardening, auditing and access review",
      "description": "Advanced level (Advanced Linux operations). 1 week (9\u201312 hours). Prerequisite: Module 22. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 23,
      "lessons": [
        {
          "id": "les-linux-m23-l01",
          "slug": "m23-l1-ufw-security-guide",
          "title": "Module 23 - Lesson 1: UFW security guide",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 23: Linux server hardening, auditing and access review. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "F-ubkT1WNFk",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 23: Linux server hardening, auditing and access review",
          "objectives": [
            "Create a practical Linux hardening checklist",
            "Audit users, services, permissions and firewall exposure",
            "Check patch posture and SSH settings",
            "Document an evidence-based remediation plan"
          ],
          "tags": [
            "linux",
            "module-23",
            "advanced-linux-operations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (UFW security guide), we explore fundamental aspects of Module 23: Linux server hardening, auditing and access review. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 22"
            ],
            "theorySections": [
              {
                "title": "Overview of UFW security guide",
                "content": "This lesson covers key systems principles from Module 23: Linux server hardening, auditing and access review. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Create a practical Linux hardening checklist",
                  "Audit users, services, permissions and firewall exposure",
                  "Check patch posture and SSH settings",
                  "Document an evidence-based remediation plan"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: uname -r",
                "instruction": "Run `uname -r` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: apt list --upgradable 2>/dev/null | head",
                "instruction": "Run `apt list --upgradable 2>/dev/null | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: getent passwd | tail -n 5",
                "instruction": "Run `getent passwd | tail -n 5` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: ss -tulpn",
                "instruction": "Run `ss -tulpn` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: sudo ufw status verbose",
                "instruction": "Run `sudo ufw status verbose` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: systemctl list-unit-files --state=enabled --no-pager | head",
                "instruction": "Run `systemctl list-unit-files --state=enabled --no-pager | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "A 10-item hardening checklist is completed",
              "Every configuration change has a rollback note",
              "Authorized access still works after changes"
            ],
            "commonMistakes": [
              "Applying CIS benchmark commands blindly.",
              "Disabling SSH before validating alternative access.",
              "Treating a scanner warning as certain evidence of compromise."
            ],
            "securityRelevance": "Understanding Module 23: Linux server hardening, auditing and access review is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 23.",
            "furtherReading": [
              {
                "title": "Ubuntu security documentation",
                "url": "https://documentation.ubuntu.com/security/"
              },
              {
                "title": "OpenSSH security manual",
                "url": "https://www.openssh.com/manual.html"
              }
            ]
          }
        },
        {
          "id": "les-linux-m23-l02",
          "slug": "m23-l2-public-key-authentication",
          "title": "Module 23 - Lesson 2: Public key authentication",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 23: Linux server hardening, auditing and access review. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "bfwfRCCFTVI",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 23: Linux server hardening, auditing and access review",
          "objectives": [
            "Create a practical Linux hardening checklist",
            "Audit users, services, permissions and firewall exposure",
            "Check patch posture and SSH settings",
            "Document an evidence-based remediation plan"
          ],
          "tags": [
            "linux",
            "module-23",
            "advanced-linux-operations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Public key authentication), we explore fundamental aspects of Module 23: Linux server hardening, auditing and access review. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 22"
            ],
            "theorySections": [
              {
                "title": "Overview of Public key authentication",
                "content": "This lesson covers key systems principles from Module 23: Linux server hardening, auditing and access review. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Create a practical Linux hardening checklist",
                  "Audit users, services, permissions and firewall exposure",
                  "Check patch posture and SSH settings",
                  "Document an evidence-based remediation plan"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: uname -r",
                "instruction": "Run `uname -r` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: apt list --upgradable 2>/dev/null | head",
                "instruction": "Run `apt list --upgradable 2>/dev/null | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: getent passwd | tail -n 5",
                "instruction": "Run `getent passwd | tail -n 5` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: ss -tulpn",
                "instruction": "Run `ss -tulpn` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: sudo ufw status verbose",
                "instruction": "Run `sudo ufw status verbose` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: systemctl list-unit-files --state=enabled --no-pager | head",
                "instruction": "Run `systemctl list-unit-files --state=enabled --no-pager | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "A 10-item hardening checklist is completed",
              "Every configuration change has a rollback note",
              "Authorized access still works after changes"
            ],
            "commonMistakes": [
              "Applying CIS benchmark commands blindly.",
              "Disabling SSH before validating alternative access.",
              "Treating a scanner warning as certain evidence of compromise."
            ],
            "securityRelevance": "Understanding Module 23: Linux server hardening, auditing and access review is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 23.",
            "furtherReading": [
              {
                "title": "Ubuntu security documentation",
                "url": "https://documentation.ubuntu.com/security/"
              },
              {
                "title": "OpenSSH security manual",
                "url": "https://www.openssh.com/manual.html"
              }
            ]
          }
        },
        {
          "id": "les-linux-m23-l03",
          "slug": "m23-l3-linux-logging",
          "title": "Module 23 - Lesson 3: Linux logging",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 23: Linux server hardening, auditing and access review. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "6uP_f_z3CbM",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 3,
          "moduleTitle": "Module 23: Linux server hardening, auditing and access review",
          "objectives": [
            "Create a practical Linux hardening checklist",
            "Audit users, services, permissions and firewall exposure",
            "Check patch posture and SSH settings",
            "Document an evidence-based remediation plan"
          ],
          "tags": [
            "linux",
            "module-23",
            "advanced-linux-operations"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Linux logging), we explore fundamental aspects of Module 23: Linux server hardening, auditing and access review. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 22"
            ],
            "theorySections": [
              {
                "title": "Overview of Linux logging",
                "content": "This lesson covers key systems principles from Module 23: Linux server hardening, auditing and access review. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Create a practical Linux hardening checklist",
                  "Audit users, services, permissions and firewall exposure",
                  "Check patch posture and SSH settings",
                  "Document an evidence-based remediation plan"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: uname -r",
                "instruction": "Run `uname -r` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: apt list --upgradable 2>/dev/null | head",
                "instruction": "Run `apt list --upgradable 2>/dev/null | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: getent passwd | tail -n 5",
                "instruction": "Run `getent passwd | tail -n 5` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: ss -tulpn",
                "instruction": "Run `ss -tulpn` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: sudo ufw status verbose",
                "instruction": "Run `sudo ufw status verbose` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: systemctl list-unit-files --state=enabled --no-pager | head",
                "instruction": "Run `systemctl list-unit-files --state=enabled --no-pager | head` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "A 10-item hardening checklist is completed",
              "Every configuration change has a rollback note",
              "Authorized access still works after changes"
            ],
            "commonMistakes": [
              "Applying CIS benchmark commands blindly.",
              "Disabling SSH before validating alternative access.",
              "Treating a scanner warning as certain evidence of compromise."
            ],
            "securityRelevance": "Understanding Module 23: Linux server hardening, auditing and access review is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 23.",
            "furtherReading": [
              {
                "title": "Ubuntu security documentation",
                "url": "https://documentation.ubuntu.com/security/"
              },
              {
                "title": "OpenSSH security manual",
                "url": "https://www.openssh.com/manual.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m23",
        "title": "Module 23 Hands-on Lab: Linux server hardening, auditing and access review",
        "objective": "Complete hands-on terminal tasks for Module 23: Linux server hardening, auditing and access review in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Clone your Ubuntu VM or take a snapshot before any changes.",
          "Create a simple inventory of distro, version, accounts, listening ports, packages and active services.",
          "Compare actual configuration to a written baseline: no unnecessary public services, up-to-date packages, strong account separation and usable logs.",
          "Review SSH configuration read-only; plan a key-based login and a safe rollback path.",
          "Review UFW rules and test from a second lab VM only.",
          "Apply low-risk changes in the disposable VM and record before/after evidence, including any issue you could not resolve."
        ],
        "tasks": [
          {
            "id": "task-m23-1",
            "description": "Clone your Ubuntu VM or take a snapshot before any changes.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m23-2",
            "description": "Create a simple inventory of distro, version, accounts, listening ports, packages and active services.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m23-3",
            "description": "Compare actual configuration to a written baseline: no unnecessary public services, up-to-date packages, strong account separation and usable logs.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m23-4",
            "description": "Review SSH configuration read-only; plan a key-based login and a safe rollback path.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m23-5",
            "description": "Review UFW rules and test from a second lab VM only.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m23-6",
            "description": "Apply low-risk changes in the disposable VM and record before/after evidence, including any issue you could not resolve.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "A 10-item hardening checklist is completed",
          "Every configuration change has a rollback note",
          "Authorized access still works after changes"
        ]
      },
      "quiz": {
        "title": "Module 23 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the foundational cybersecurity principle of 'Least Privilege' in Linux server administration?",
            "options": [
              "Granting all developers full root access to avoid service disruptions",
              "Granting each user, process, and service account only the minimum permissions strictly necessary to perform its intended job",
              "Disabling all user accounts and running the server autonomously",
              "Limiting servers to a single network interface"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Least privilege ensures that if an account or service is compromised, the attacker's blast radius is strictly confined.",
            "difficulty": "advanced"
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
            "explanation": "Hardening multiple services simultaneously obscures the cause if a daemon fails; step-by-step enforcement makes troubleshooting clear.",
            "difficulty": "advanced"
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
            "explanation": "Active verification requires attempting an authentication method that was disallowed and verifying the daemon firmly denies access.",
            "difficulty": "advanced"
          }
        ]
      }
    },
    {
      "id": "mod-linux-m24",
      "title": "Module 24: Final Linux administration and security capstone",
      "description": "Advanced level (Capstone). 1 week (9\u201312 hours). Prerequisite: Module 23. Complete all hands-on exercises, review commands, and pass the knowledge check.",
      "order": 24,
      "lessons": [
        {
          "id": "les-linux-m24-l01",
          "slug": "m24-l1-linux-troubleshooting",
          "title": "Module 24 - Lesson 1: Linux troubleshooting",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 24: Final Linux administration and security capstone. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "GPF5lrY9YJY",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 24: Final Linux administration and security capstone",
          "objectives": [
            "Build and maintain a documented Linux server VM",
            "Demonstrate all core commands without watching the screen",
            "Write reusable admin scripts and troubleshooting reports",
            "Present secure and reversible configuration choices"
          ],
          "tags": [
            "linux",
            "module-24",
            "capstone"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Linux troubleshooting), we explore fundamental aspects of Module 24: Final Linux administration and security capstone. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 23"
            ],
            "theorySections": [
              {
                "title": "Overview of Linux troubleshooting",
                "content": "This lesson covers key systems principles from Module 24: Final Linux administration and security capstone. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Build and maintain a documented Linux server VM",
                  "Demonstrate all core commands without watching the screen",
                  "Write reusable admin scripts and troubleshooting reports",
                  "Present secure and reversible configuration choices"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: uname -a",
                "instruction": "Run `uname -a` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: id",
                "instruction": "Run `id` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: findmnt /",
                "instruction": "Run `findmnt /` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: systemctl --failed --no-pager",
                "instruction": "Run `systemctl --failed --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: ss -tulpen",
                "instruction": "Run `ss -tulpen` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: journalctl -b -p warning -n 20 --no-pager",
                "instruction": "Run `journalctl -b -p warning -n 20 --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Build can be repeated from written instructions",
              "One backup has been restored and compared",
              "The server retains expected connectivity after hardening",
              "You can explain and defend each administrative change"
            ],
            "commonMistakes": [
              "Demonstrating only screenshots without executable documentation.",
              "Leaving temporary cron tasks and test accounts behind.",
              "Pushing secrets or private keys to a public repository."
            ],
            "securityRelevance": "Understanding Module 24: Final Linux administration and security capstone is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 24.",
            "furtherReading": [
              {
                "title": "Ubuntu Server documentation",
                "url": "https://documentation.ubuntu.com/server/"
              },
              {
                "title": "Linux Command Line book",
                "url": "https://linuxcommand.org/tlcl.php"
              }
            ]
          }
        },
        {
          "id": "les-linux-m24-l02",
          "slug": "m24-l2-linux-systemd-services",
          "title": "Module 24 - Lesson 2: Linux systemd services",
          "description": "Video lesson presented by Learn Linux TV. Covers core concepts of Module 24: Final Linux administration and security capstone. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "5JVBpXiYMKo",
          "videoAttribution": {
            "creator": "Learn Linux TV",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 24: Final Linux administration and security capstone",
          "objectives": [
            "Build and maintain a documented Linux server VM",
            "Demonstrate all core commands without watching the screen",
            "Write reusable admin scripts and troubleshooting reports",
            "Present secure and reversible configuration choices"
          ],
          "tags": [
            "linux",
            "module-24",
            "capstone"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Linux systemd services), we explore fundamental aspects of Module 24: Final Linux administration and security capstone. Follow along with Learn Linux TV, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 23"
            ],
            "theorySections": [
              {
                "title": "Overview of Linux systemd services",
                "content": "This lesson covers key systems principles from Module 24: Final Linux administration and security capstone. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Build and maintain a documented Linux server VM",
                  "Demonstrate all core commands without watching the screen",
                  "Write reusable admin scripts and troubleshooting reports",
                  "Present secure and reversible configuration choices"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: uname -a",
                "instruction": "Run `uname -a` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: id",
                "instruction": "Run `id` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: findmnt /",
                "instruction": "Run `findmnt /` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: systemctl --failed --no-pager",
                "instruction": "Run `systemctl --failed --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: ss -tulpen",
                "instruction": "Run `ss -tulpen` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: journalctl -b -p warning -n 20 --no-pager",
                "instruction": "Run `journalctl -b -p warning -n 20 --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Build can be repeated from written instructions",
              "One backup has been restored and compared",
              "The server retains expected connectivity after hardening",
              "You can explain and defend each administrative change"
            ],
            "commonMistakes": [
              "Demonstrating only screenshots without executable documentation.",
              "Leaving temporary cron tasks and test accounts behind.",
              "Pushing secrets or private keys to a public repository."
            ],
            "securityRelevance": "Understanding Module 24: Final Linux administration and security capstone is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 24.",
            "furtherReading": [
              {
                "title": "Ubuntu Server documentation",
                "url": "https://documentation.ubuntu.com/server/"
              },
              {
                "title": "Linux Command Line book",
                "url": "https://linuxcommand.org/tlcl.php"
              }
            ]
          }
        },
        {
          "id": "les-linux-m24-l03",
          "slug": "m24-l3-linux-command-line-entire-tutorial-series",
          "title": "Module 24 - Lesson 3: Linux Command Line Entire Tutorial Series",
          "description": "Video lesson presented by MichaelsTechTutorials. Covers core concepts of Module 24: Final Linux administration and security capstone. Practice the commands in your Ubuntu lab environment.",
          "youtubeVideoId": "avg65oY7sj4",
          "videoAttribution": {
            "creator": "MichaelsTechTutorials",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 3,
          "moduleTitle": "Module 24: Final Linux administration and security capstone",
          "objectives": [
            "Build and maintain a documented Linux server VM",
            "Demonstrate all core commands without watching the screen",
            "Write reusable admin scripts and troubleshooting reports",
            "Present secure and reversible configuration choices"
          ],
          "tags": [
            "linux",
            "module-24",
            "capstone"
          ],
          "skillsTaught": [
            "Lesson 1",
            "Lesson 2",
            "Lesson 3",
            "Lesson 4"
          ],
          "richContent": {
            "introduction": "In this lesson (Linux Command Line Entire Tutorial Series), we explore fundamental aspects of Module 24: Final Linux administration and security capstone. Follow along with MichaelsTechTutorials, run the verification commands, and reproduce the demonstrated configuration in your virtual machine.",
            "prerequisites": [
              "Module 23"
            ],
            "theorySections": [
              {
                "title": "Overview of Linux Command Line Entire Tutorial Series",
                "content": "This lesson covers key systems principles from Module 24: Final Linux administration and security capstone. Ensure you have your safe lab ready before making configuration changes.",
                "keyPoints": [
                  "Build and maintain a documented Linux server VM",
                  "Demonstrate all core commands without watching the screen",
                  "Write reusable admin scripts and troubleshooting reports",
                  "Present secure and reversible configuration choices"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Execute: uname -a",
                "instruction": "Run `uname -a` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 2,
                "title": "Execute: id",
                "instruction": "Run `id` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 3,
                "title": "Execute: findmnt /",
                "instruction": "Run `findmnt /` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 4,
                "title": "Execute: systemctl --failed --no-pager",
                "instruction": "Run `systemctl --failed --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 5,
                "title": "Execute: ss -tulpen",
                "instruction": "Run `ss -tulpen` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              },
              {
                "step": 6,
                "title": "Execute: journalctl -b -p warning -n 20 --no-pager",
                "instruction": "Run `journalctl -b -p warning -n 20 --no-pager` in terminal to inspect system state and verify output.",
                "expectedOutcome": "Command terminates with exit status 0 and displays system data."
              }
            ],
            "expectedObservations": [
              "Build can be repeated from written instructions",
              "One backup has been restored and compared",
              "The server retains expected connectivity after hardening",
              "You can explain and defend each administrative change"
            ],
            "commonMistakes": [
              "Demonstrating only screenshots without executable documentation.",
              "Leaving temporary cron tasks and test accounts behind.",
              "Pushing secrets or private keys to a public repository."
            ],
            "securityRelevance": "Understanding Module 24: Final Linux administration and security capstone is vital for defending Linux infrastructure, enforcing least privilege, and preventing system misconfigurations.",
            "summary": "Satisfy all lab criteria, verify commands run cleanly, and complete the knowledge check for Module 24.",
            "furtherReading": [
              {
                "title": "Ubuntu Server documentation",
                "url": "https://documentation.ubuntu.com/server/"
              },
              {
                "title": "Linux Command Line book",
                "url": "https://linuxcommand.org/tlcl.php"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-linux-m24",
        "title": "Module 24 Hands-on Lab: Final Linux administration and security capstone",
        "objective": "Complete hands-on terminal tasks for Module 24: Final Linux administration and security capstone in a dedicated Ubuntu VM without touching host partitions.",
        "toolsRequired": [
          "Ubuntu Desktop/Server VM",
          "Bash Terminal",
          "VirtualBox or UTM"
        ],
        "pcapSource": {
          "fileName": "lab-environment",
          "fileUrl": "https://ubuntu.com/download/desktop"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Start with a fresh disposable Ubuntu Server or Desktop VM and take an initial snapshot.",
          "Create a limited user account and a private training folder, documenting permissions.",
          "Apply updates after reviewing the proposed package changes.",
          "Configure one permitted test service; enable SSH key access only after testing with a spare session.",
          "Document inbound firewall rules and test from an authorized second VM.",
          "Write one backup script and a temporary scheduled run; confirm that a restore works.",
          "Generate a read-only system health report and investigate one simulated service failure from journal logs.",
          "Submit `README.md`, `architecture.md`, `commands.md`, `backup-test.md`, `hardening.md`, and `troubleshooting.md` with screenshots that contain no credentials."
        ],
        "tasks": [
          {
            "id": "task-m24-1",
            "description": "Start with a fresh disposable Ubuntu Server or Desktop VM and take an initial snapshot.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m24-2",
            "description": "Create a limited user account and a private training folder, documenting permissions.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m24-3",
            "description": "Apply updates after reviewing the proposed package changes.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m24-4",
            "description": "Configure one permitted test service; enable SSH key access only after testing with a spare session.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m24-5",
            "description": "Document inbound firewall rules and test from an authorized second VM.",
            "hint": "Verify command output and check logs if any error occurs."
          },
          {
            "id": "task-m24-6",
            "description": "Write one backup script and a temporary scheduled run; confirm that a restore works.",
            "hint": "Verify command output and check logs if any error occurs."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "terminal_transcript",
            "prompt": "Paste sanitized terminal output verifying successful lab execution",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Build can be repeated from written instructions",
          "One backup has been restored and compared",
          "The server retains expected connectivity after hardening",
          "You can explain and defend each administrative change"
        ]
      },
      "quiz": {
        "title": "Module 24 Knowledge Check",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "In production Linux operations, what is commonly the single largest risk during firewall and network maintenance?",
            "options": [
              "Hardware failure of the CPU cooling fan",
              "Inadvertently severing administrative management access (locking yourself out) without an out-of-band console recovery path",
              "Exhausting disk inodes during routing table updates",
              "Bash shell history being written to disk"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Modifying firewall or network rules remotely without an independent recovery path (console/serial/revert script) frequently causes administrator lockouts.",
            "difficulty": "advanced"
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
            "explanation": "Using out-of-band VM console access or staging a 'fallback revert script' ensures you can recover access without wiping the machine.",
            "difficulty": "advanced"
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
            "explanation": "'systemctl status' shows the exit code and process termination signal, while 'journalctl -u' displays the stderr output and crash stack trace.",
            "difficulty": "advanced"
          }
        ]
      },
      "capstoneAssessment": {
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
    }
  ]
};
