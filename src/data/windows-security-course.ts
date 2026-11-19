import { Course } from '../types/course';

export const WINDOWS_SECURITY_ZERO_TO_ADVANCED_COURSE: Course = {
  "id": "course-windows-security-zero-to-advanced",
  "slug": "windows-security-zero-to-advanced",
  "title": "Windows Security for Cybersecurity \u2014 Zero to Advanced",
  "shortDescription": "A 100% Windows-focused, 18-week zero-to-advanced cybersecurity curriculum with 60 video lessons, hands-on labs, Sysmon, Active Directory, event triage, forensics, and SOC capstone.",
  "description": "An intensive, hands-on 18-week Windows-focused cybersecurity syllabus designed for aspiring SOC L1/L2 analysts, incident responders, and Windows defenders. Master Windows 11 and Server 2025 architecture, CMD/PowerShell essentials, NTFS permissions and UAC, processes and persistence mechanisms, Windows Firewall and networking, Defender AV and BitLocker, Event Viewer audit policies and key security event IDs (4624, 4625, 4688, 1102), complete TrustedSec Sysmon deployment and telemetry analysis, Active Directory DS, Kerberos ticket inspection, Group Policy security, Windows hardening baselines, Sysinternals threat hunting (Process Explorer, Autoruns), DFIR evidence extraction (MFT, Prefetch, Registry), Windows Event Forwarding (WEF), and alert triage through an end-to-end SOC capstone portfolio project.",
  "domains": [
    "soc-blue-team",
    "dfir",
    "fundamentals"
  ],
  "tags": [
    "windows-security",
    "soc-analyst",
    "sysmon",
    "active-directory",
    "powershell",
    "incident-response",
    "event-viewer",
    "sysinternals",
    "dfir",
    "hardening"
  ],
  "difficulty": "intermediate",
  "thumbnailUrl": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
  "estimatedDuration": "18 weeks (130\u2013175 hours)",
  "totalDurationMinutes": 2100,
  "instructor": {
    "name": "TrustedSec, 13Cubed & Open Windows Security Community",
    "title": "Windows Security & DFIR Educators",
    "organization": "TrustedSec, 13Cubed, CyberPatriot & Garage Tec"
  },
  "prerequisites": [
    "A PC capable of running 64-bit virtualization with at least 16 GB RAM (24\u201332 GB recommended for Active Directory labs)",
    "Basic understanding of computing and operating systems concepts",
    "Commitment to ethical defensive investigation and authorized lab boundaries"
  ],
  "learningObjectives": [
    "Build and configure an isolated Windows 11 and Windows Server 2025 defensive lab environment",
    "Navigate Windows administrative consoles and extract structured system inventories using PowerShell",
    "Analyze Windows access tokens, UAC integrity levels, SIDs, and NTFS discretionary access control lists (DACLs)",
    "Detect persistence mechanisms across Run keys, services, scheduled tasks, and auto-start entry points",
    "Investigate critical Windows Security Event IDs including 4624, 4625, 4688, 4720, and 1102 with exact caveats",
    "Deploy and configure Sysmon to capture process creations, network connections, and telemetry noise filtering",
    "Configure Active Directory Domain Services, analyze Kerberos ticket requests (4768/4769), and enforce Group Policy",
    "Harden Windows endpoints against Microsoft Security Baselines, LAPS, and AppLocker/App Control",
    "Hunt malicious process trees and anomalies using Sysinternals Process Explorer and Autoruns",
    "Execute digital forensics on Windows artifacts including Prefetch, NTFS MFT, and Registry hives",
    "Design detection engineering rules with Windows Event Forwarding (WEF) and build a complete SOC capstone report"
  ],
  "featured": true,
  "track": "cybersecurity",
  "modules": [
    {
      "id": "mod-winsec-m00",
      "title": "Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow",
      "description": "Foundation level. Suggested effort: 5\u20137 hours. Prerequisite: None. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 1,
      "lessons": [
        {
          "id": "les-winsec-m00-l01",
          "slug": "m00-l1-windows-11-on-virtualbox",
          "title": "Module 00 - Lesson 1: Windows 11 on VirtualBox \u2014 step-by-step (Garage Tec)",
          "description": "Hands-on Windows security video lesson presented by Garage Tec. Covers critical concepts from Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow. Follow in your isolated lab environment.",
          "youtubeVideoId": "9Z6FZisqazE",
          "videoAttribution": {
            "creator": "Garage Tec",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow",
          "objectives": [
            "Understand Windows editions, safe virtualization, snapshots, and VM resource budgets.",
            "Create a Windows 11 client VM and record an initial baseline.",
            "Explain why real networks and devices must not be tested without permission."
          ],
          "tags": [
            "windows-security",
            "module-00",
            "foundation"
          ],
          "skillsTaught": [
            "Host vs guest OS; CPU virtualization; virtual TPM and Secure Boot",
            "Windows 11 editions and feature limitations",
            "VM networking modes",
            "Snapshots, restore points, backups, evidence hygiene"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows 11 on VirtualBox \u2014 step-by-step (Garage Tec)), we analyze core defensive techniques from Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow. Follow along with Garage Tec, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Isolated Windows lab virtual machine"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows 11 on VirtualBox",
                "content": "This lesson covers Windows host and domain security concepts from Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Understand Windows editions, safe virtualization, snapshots, and VM resource budgets.",
                  "Create a Windows 11 client VM and record an initial baseline.",
                  "Explain why real networks and devices must not be tested without permission."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Check that hardware virtualization is enabled and ensure you have enough RAM and disk space; do not overcommit your work PC.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Download VirtualBox and a legitimate Windows 11 ISO from the official pages; comply with license/activation rules.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Create a Windows 11 VM with the required supported hardware settings (UEFI, virtual TPM, RAM and disk).",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Use NAT for normal updates and host-only or disconnected networking for any controlled attack simulation; never use bridged networking for attack labs.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Install updates, record Windows edition/build using `winver`, then create snapshot `M00-clean`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Make `C:\\SOC-Lab\\notes`, `evidence`, and `exports` directories and record VM name, OS build, time zone and test-account names.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`lab-inventory.md` with edition/build/hardware/network modes",
              "Screenshot of updated Windows Security and VM snapshot",
              "A written authorization/scope statement: ONLY your own isolated VM"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 00.",
            "furtherReading": [
              {
                "title": "Oracle VirtualBox downloads",
                "url": "https://www.virtualbox.org/wiki/Downloads"
              },
              {
                "title": "Microsoft official Windows 11 ISO download",
                "url": "https://www.microsoft.com/software-download/windows11"
              },
              {
                "title": "Microsoft Windows Server 2025 evaluation",
                "url": "https://www.microsoft.com/en-us/evalcenter/download-windows-server-2025"
              },
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m00-l02",
          "slug": "m00-l2-windows-11-virtualbox-setup-and-tpm-considerations",
          "title": "Module 00 - Lesson 2: Windows 11 VirtualBox setup and TPM considerations",
          "description": "Hands-on Windows security video lesson presented by Windows Security Community. Covers critical concepts from Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow. Follow in your isolated lab environment.",
          "youtubeVideoId": "5BC2fRWfiQ0",
          "videoAttribution": {
            "creator": "Windows Security Community",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow",
          "objectives": [
            "Understand Windows editions, safe virtualization, snapshots, and VM resource budgets.",
            "Create a Windows 11 client VM and record an initial baseline.",
            "Explain why real networks and devices must not be tested without permission."
          ],
          "tags": [
            "windows-security",
            "module-00",
            "foundation"
          ],
          "skillsTaught": [
            "Host vs guest OS; CPU virtualization; virtual TPM and Secure Boot",
            "Windows 11 editions and feature limitations",
            "VM networking modes",
            "Snapshots, restore points, backups, evidence hygiene"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows 11 VirtualBox setup and TPM considerations), we analyze core defensive techniques from Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow. Follow along with Windows Security Community, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Isolated Windows lab virtual machine"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows 11 VirtualBox setup and TPM considerations",
                "content": "This lesson covers Windows host and domain security concepts from Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Understand Windows editions, safe virtualization, snapshots, and VM resource budgets.",
                  "Create a Windows 11 client VM and record an initial baseline.",
                  "Explain why real networks and devices must not be tested without permission."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Check that hardware virtualization is enabled and ensure you have enough RAM and disk space; do not overcommit your work PC.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Download VirtualBox and a legitimate Windows 11 ISO from the official pages; comply with license/activation rules.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Create a Windows 11 VM with the required supported hardware settings (UEFI, virtual TPM, RAM and disk).",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Use NAT for normal updates and host-only or disconnected networking for any controlled attack simulation; never use bridged networking for attack labs.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Install updates, record Windows edition/build using `winver`, then create snapshot `M00-clean`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Make `C:\\SOC-Lab\\notes`, `evidence`, and `exports` directories and record VM name, OS build, time zone and test-account names.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`lab-inventory.md` with edition/build/hardware/network modes",
              "Screenshot of updated Windows Security and VM snapshot",
              "A written authorization/scope statement: ONLY your own isolated VM"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 00.",
            "furtherReading": [
              {
                "title": "Oracle VirtualBox downloads",
                "url": "https://www.virtualbox.org/wiki/Downloads"
              },
              {
                "title": "Microsoft official Windows 11 ISO download",
                "url": "https://www.microsoft.com/software-download/windows11"
              },
              {
                "title": "Microsoft Windows Server 2025 evaluation",
                "url": "https://www.microsoft.com/en-us/evalcenter/download-windows-server-2025"
              },
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m00-l03",
          "slug": "m00-l3-cyberpatriot",
          "title": "Module 00 - Lesson 3: CyberPatriot \u2014 Windows Basics video",
          "description": "Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow. Follow in your isolated lab environment.",
          "youtubeVideoId": "8AtEe3bOqus",
          "videoAttribution": {
            "creator": "CyberPatriot",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow",
          "objectives": [
            "Understand Windows editions, safe virtualization, snapshots, and VM resource budgets.",
            "Create a Windows 11 client VM and record an initial baseline.",
            "Explain why real networks and devices must not be tested without permission."
          ],
          "tags": [
            "windows-security",
            "module-00",
            "foundation"
          ],
          "skillsTaught": [
            "Host vs guest OS; CPU virtualization; virtual TPM and Secure Boot",
            "Windows 11 editions and feature limitations",
            "VM networking modes",
            "Snapshots, restore points, backups, evidence hygiene"
          ],
          "richContent": {
            "introduction": "In this lesson (CyberPatriot \u2014 Windows Basics video), we analyze core defensive techniques from Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow. Follow along with CyberPatriot, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Isolated Windows lab virtual machine"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: CyberPatriot",
                "content": "This lesson covers Windows host and domain security concepts from Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Understand Windows editions, safe virtualization, snapshots, and VM resource budgets.",
                  "Create a Windows 11 client VM and record an initial baseline.",
                  "Explain why real networks and devices must not be tested without permission."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Check that hardware virtualization is enabled and ensure you have enough RAM and disk space; do not overcommit your work PC.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Download VirtualBox and a legitimate Windows 11 ISO from the official pages; comply with license/activation rules.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Create a Windows 11 VM with the required supported hardware settings (UEFI, virtual TPM, RAM and disk).",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Use NAT for normal updates and host-only or disconnected networking for any controlled attack simulation; never use bridged networking for attack labs.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Install updates, record Windows edition/build using `winver`, then create snapshot `M00-clean`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Make `C:\\SOC-Lab\\notes`, `evidence`, and `exports` directories and record VM name, OS build, time zone and test-account names.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`lab-inventory.md` with edition/build/hardware/network modes",
              "Screenshot of updated Windows Security and VM snapshot",
              "A written authorization/scope statement: ONLY your own isolated VM"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 00.",
            "furtherReading": [
              {
                "title": "Oracle VirtualBox downloads",
                "url": "https://www.virtualbox.org/wiki/Downloads"
              },
              {
                "title": "Microsoft official Windows 11 ISO download",
                "url": "https://www.microsoft.com/software-download/windows11"
              },
              {
                "title": "Microsoft Windows Server 2025 evaluation",
                "url": "https://www.microsoft.com/en-us/evalcenter/download-windows-server-2025"
              },
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m00",
        "title": "Module 00 Hands-on Lab: Home Lab Setup, Ethics, and Learning Workflow",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 00 \u2014 Home Lab Setup, Ethics, and Learning Workflow inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Check that hardware virtualization is enabled and ensure you have enough RAM and disk space; do not overcommit your work PC.",
          "Download VirtualBox and a legitimate Windows 11 ISO from the official pages; comply with license/activation rules.",
          "Create a Windows 11 VM with the required supported hardware settings (UEFI, virtual TPM, RAM and disk).",
          "Use NAT for normal updates and host-only or disconnected networking for any controlled attack simulation; never use bridged networking for attack labs.",
          "Install updates, record Windows edition/build using `winver`, then create snapshot `M00-clean`.",
          "Make `C:\\SOC-Lab\\notes`, `evidence`, and `exports` directories and record VM name, OS build, time zone and test-account names."
        ],
        "tasks": [
          {
            "id": "task-winsec-m00-1",
            "description": "Check that hardware virtualization is enabled and ensure you have enough RAM and disk space; do not overcommit your work PC.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m00-2",
            "description": "Download VirtualBox and a legitimate Windows 11 ISO from the official pages; comply with license/activation rules.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m00-3",
            "description": "Create a Windows 11 VM with the required supported hardware settings (UEFI, virtual TPM, RAM and disk).",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m00-4",
            "description": "Use NAT for normal updates and host-only or disconnected networking for any controlled attack simulation; never use bridged networking for attack labs.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m00-5",
            "description": "Install updates, record Windows edition/build using `winver`, then create snapshot `M00-clean`.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m00-6",
            "description": "Make `C:\\SOC-Lab\\notes`, `evidence`, and `exports` directories and record VM name, OS build, time zone and test-account names.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "`lab-inventory.md` with edition/build/hardware/network modes",
          "Screenshot of updated Windows Security and VM snapshot",
          "A written authorization/scope statement: ONLY your own isolated VM"
        ]
      },
      "quiz": {
        "title": "Module 00 Knowledge Check: Home Lab Setup, Ethics, and Learning Workflow",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is a VM snapshot, and what does it not back up?",
            "options": [
              "A full external backup of your physical computer's hard drive",
              "A point-in-time state of the virtual machine's disk and memory; it does not replace independent off-site backups or protect against host drive failures",
              "An export of Windows event logs to a cloud SIEM",
              "A duplicate copy of the hypervisor installation binary"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A VM snapshot captures the state and data of a virtual machine at a specific point in time, enabling fast rollback during experiments. It relies on the host disk and is not an independent backup.",
            "difficulty": "beginner"
          },
          {
            "question": "Why is bridged networking unsuitable for deliberately suspicious test traffic?",
            "options": [
              "Bridged networking disables internet access inside the guest VM",
              "Bridged networking places the VM directly on your physical local area network, exposing other household or corporate devices to test traffic",
              "Bridged networking consumes double the CPU cycles of NAT",
              "Windows 11 prohibits bridged networking by default"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Bridged networking assigns the guest VM an IP address on your physical LAN, so any scanning or broadcast traffic touches production/home devices. Host-only or isolated internal switches keep test traffic contained.",
            "difficulty": "beginner"
          },
          {
            "question": "How do Windows 11 Home and Pro differ for business security lab features?",
            "options": [
              "Home does not have PowerShell installed",
              "Pro includes Group Policy Editor (gpedit.msc), BitLocker, Hyper-V, and domain-join capabilities not natively enabled in Home",
              "Pro cannot run VirtualBox",
              "Home cannot connect to the internet"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Windows 11 Pro includes enterprise management features like Local Group Policy, BitLocker Drive Encryption, and Active Directory domain joining that are restricted or absent in Home edition.",
            "difficulty": "beginner"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m01",
      "title": "Module 01 \u2014 Windows Architecture and Security Foundations",
      "description": "Beginner level. Suggested effort: 6\u20138 hours. Prerequisite: Module 00. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 2,
      "lessons": [
        {
          "id": "les-winsec-m01-l01",
          "slug": "m01-l1-cyberpatriot",
          "title": "Module 01 - Lesson 1: CyberPatriot \u2014 Windows Basics video",
          "description": "Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 01 \u2014 Windows Architecture and Security Foundations. Follow in your isolated lab environment.",
          "youtubeVideoId": "8AtEe3bOqus",
          "videoAttribution": {
            "creator": "CyberPatriot",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 01 \u2014 Windows Architecture and Security Foundations",
          "objectives": [
            "Navigate Windows administrative consoles confidently.",
            "Describe local system architecture, user space, kernel, tokens and core security boundaries.",
            "Identify security-related administrative tools on Windows 11."
          ],
          "tags": [
            "windows-security",
            "module-01",
            "beginner"
          ],
          "skillsTaught": [
            "Windows processes, services, drivers and registry high-level concepts",
            "NTFS, partitions, boot chain, UEFI, TPM, Secure Boot",
            "Task Manager, Computer Management, Services, Settings and Control Panel",
            "Windows Security app vs Microsoft Defender Antivirus vs enterprise Defender for Endpoint"
          ],
          "richContent": {
            "introduction": "In this lesson (CyberPatriot \u2014 Windows Basics video), we analyze core defensive techniques from Module 01 \u2014 Windows Architecture and Security Foundations. Follow along with CyberPatriot, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 00"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: CyberPatriot",
                "content": "This lesson covers Windows host and domain security concepts from Module 01 \u2014 Windows Architecture and Security Foundations. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Navigate Windows administrative consoles confidently.",
                  "Describe local system architecture, user space, kernel, tokens and core security boundaries.",
                  "Identify security-related administrative tools on Windows 11."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Open `msinfo32`, `winver`, `msconfig`, `services.msc`, `eventvwr.msc` and Task Manager; note what each shows.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "In Windows Security, locate virus protection, firewall, device security, and protection history.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Find the OS build, Windows edition, active network profile, and installed updates.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Use Task Manager to select one first-party process; record name, PID, user and parent if available.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Check Secure Boot and TPM status where supported by the VM; mark unsupported or unavailable honestly.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a one-page diagram of where endpoint events travel: program \u2192 Windows event provider \u2192 log \u2192 analyst.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Annotated map of at least 8 Windows consoles",
              "One-page Windows trust-boundary diagram",
              "Security control inventory with enabled/disabled/not available"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 01 \u2014 Windows Architecture and Security Foundations is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 01.",
            "furtherReading": [
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              },
              {
                "title": "Microsoft \u2014 Windows security baselines",
                "url": "https://learn.microsoft.com/windows/security/threat-protection/windows-security-configuration-framework/windows-security-baselines"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m01-l02",
          "slug": "m01-l2-cyberpatriot",
          "title": "Module 01 - Lesson 2: CyberPatriot \u2014 Windows Security Tools",
          "description": "Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 01 \u2014 Windows Architecture and Security Foundations. Follow in your isolated lab environment.",
          "youtubeVideoId": "C_RTcErv3gU",
          "videoAttribution": {
            "creator": "CyberPatriot",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 01 \u2014 Windows Architecture and Security Foundations",
          "objectives": [
            "Navigate Windows administrative consoles confidently.",
            "Describe local system architecture, user space, kernel, tokens and core security boundaries.",
            "Identify security-related administrative tools on Windows 11."
          ],
          "tags": [
            "windows-security",
            "module-01",
            "beginner"
          ],
          "skillsTaught": [
            "Windows processes, services, drivers and registry high-level concepts",
            "NTFS, partitions, boot chain, UEFI, TPM, Secure Boot",
            "Task Manager, Computer Management, Services, Settings and Control Panel",
            "Windows Security app vs Microsoft Defender Antivirus vs enterprise Defender for Endpoint"
          ],
          "richContent": {
            "introduction": "In this lesson (CyberPatriot \u2014 Windows Security Tools), we analyze core defensive techniques from Module 01 \u2014 Windows Architecture and Security Foundations. Follow along with CyberPatriot, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 00"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: CyberPatriot",
                "content": "This lesson covers Windows host and domain security concepts from Module 01 \u2014 Windows Architecture and Security Foundations. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Navigate Windows administrative consoles confidently.",
                  "Describe local system architecture, user space, kernel, tokens and core security boundaries.",
                  "Identify security-related administrative tools on Windows 11."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Open `msinfo32`, `winver`, `msconfig`, `services.msc`, `eventvwr.msc` and Task Manager; note what each shows.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "In Windows Security, locate virus protection, firewall, device security, and protection history.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Find the OS build, Windows edition, active network profile, and installed updates.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Use Task Manager to select one first-party process; record name, PID, user and parent if available.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Check Secure Boot and TPM status where supported by the VM; mark unsupported or unavailable honestly.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a one-page diagram of where endpoint events travel: program \u2192 Windows event provider \u2192 log \u2192 analyst.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Annotated map of at least 8 Windows consoles",
              "One-page Windows trust-boundary diagram",
              "Security control inventory with enabled/disabled/not available"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 01 \u2014 Windows Architecture and Security Foundations is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 01.",
            "furtherReading": [
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              },
              {
                "title": "Microsoft \u2014 Windows security baselines",
                "url": "https://learn.microsoft.com/windows/security/threat-protection/windows-security-configuration-framework/windows-security-baselines"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m01-l03",
          "slug": "m01-l3-cyberpatriot",
          "title": "Module 01 - Lesson 3: CyberPatriot \u2014 Windows Security Configuration",
          "description": "Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 01 \u2014 Windows Architecture and Security Foundations. Follow in your isolated lab environment.",
          "youtubeVideoId": "Vvv4LaCAJWQ",
          "videoAttribution": {
            "creator": "CyberPatriot",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 01 \u2014 Windows Architecture and Security Foundations",
          "objectives": [
            "Navigate Windows administrative consoles confidently.",
            "Describe local system architecture, user space, kernel, tokens and core security boundaries.",
            "Identify security-related administrative tools on Windows 11."
          ],
          "tags": [
            "windows-security",
            "module-01",
            "beginner"
          ],
          "skillsTaught": [
            "Windows processes, services, drivers and registry high-level concepts",
            "NTFS, partitions, boot chain, UEFI, TPM, Secure Boot",
            "Task Manager, Computer Management, Services, Settings and Control Panel",
            "Windows Security app vs Microsoft Defender Antivirus vs enterprise Defender for Endpoint"
          ],
          "richContent": {
            "introduction": "In this lesson (CyberPatriot \u2014 Windows Security Configuration), we analyze core defensive techniques from Module 01 \u2014 Windows Architecture and Security Foundations. Follow along with CyberPatriot, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 00"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: CyberPatriot",
                "content": "This lesson covers Windows host and domain security concepts from Module 01 \u2014 Windows Architecture and Security Foundations. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Navigate Windows administrative consoles confidently.",
                  "Describe local system architecture, user space, kernel, tokens and core security boundaries.",
                  "Identify security-related administrative tools on Windows 11."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Open `msinfo32`, `winver`, `msconfig`, `services.msc`, `eventvwr.msc` and Task Manager; note what each shows.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "In Windows Security, locate virus protection, firewall, device security, and protection history.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Find the OS build, Windows edition, active network profile, and installed updates.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Use Task Manager to select one first-party process; record name, PID, user and parent if available.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Check Secure Boot and TPM status where supported by the VM; mark unsupported or unavailable honestly.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a one-page diagram of where endpoint events travel: program \u2192 Windows event provider \u2192 log \u2192 analyst.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Annotated map of at least 8 Windows consoles",
              "One-page Windows trust-boundary diagram",
              "Security control inventory with enabled/disabled/not available"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 01 \u2014 Windows Architecture and Security Foundations is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 01.",
            "furtherReading": [
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              },
              {
                "title": "Microsoft \u2014 Windows security baselines",
                "url": "https://learn.microsoft.com/windows/security/threat-protection/windows-security-configuration-framework/windows-security-baselines"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m01",
        "title": "Module 01 Hands-on Lab: Windows Architecture and Security Foundations",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 01 \u2014 Windows Architecture and Security Foundations inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Open `msinfo32`, `winver`, `msconfig`, `services.msc`, `eventvwr.msc` and Task Manager; note what each shows.",
          "In Windows Security, locate virus protection, firewall, device security, and protection history.",
          "Find the OS build, Windows edition, active network profile, and installed updates.",
          "Use Task Manager to select one first-party process; record name, PID, user and parent if available.",
          "Check Secure Boot and TPM status where supported by the VM; mark unsupported or unavailable honestly.",
          "Write a one-page diagram of where endpoint events travel: program \u2192 Windows event provider \u2192 log \u2192 analyst."
        ],
        "tasks": [
          {
            "id": "task-winsec-m01-1",
            "description": "Open `msinfo32`, `winver`, `msconfig`, `services.msc`, `eventvwr.msc` and Task Manager; note what each shows.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m01-2",
            "description": "In Windows Security, locate virus protection, firewall, device security, and protection history.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m01-3",
            "description": "Find the OS build, Windows edition, active network profile, and installed updates.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m01-4",
            "description": "Use Task Manager to select one first-party process; record name, PID, user and parent if available.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m01-5",
            "description": "Check Secure Boot and TPM status where supported by the VM; mark unsupported or unavailable honestly.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m01-6",
            "description": "Write a one-page diagram of where endpoint events travel: program \u2192 Windows event provider \u2192 log \u2192 analyst.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Annotated map of at least 8 Windows consoles",
          "One-page Windows trust-boundary diagram",
          "Security control inventory with enabled/disabled/not available"
        ]
      },
      "quiz": {
        "title": "Module 01 Knowledge Check: Windows Architecture and Security Foundations",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the difference between a service and a standard process in Windows?",
            "options": [
              "Services run exclusively in kernel mode, while processes run in user mode",
              "A process is an executing program instance with its own virtual address space, while a service is a specialized background process managed by the Service Control Manager that can run without an interactive user logon",
              "Services are only written in PowerShell",
              "A process cannot open network sockets"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Windows services are specialized background processes supervised by services.exe (SCM). They typically start at boot time and operate under system accounts (SYSTEM, Network Service, Local Service) without requiring a logged-in user.",
            "difficulty": "beginner"
          },
          {
            "question": "Why does User Account Control (UAC) matter for administrative actions?",
            "options": [
              "UAC completely prevents any user from ever executing malware",
              "Even when logged in as an administrator, standard processes run with a filtered token; UAC requires explicit elevation consent or credential validation to use full administrative privileges",
              "UAC automatically deletes unsigned executables",
              "UAC encrypts the hard drive using BitLocker"
            ],
            "correctAnswerIndex": 1,
            "explanation": "UAC enforces the principle of least privilege by running administrative user sessions with a restricted standard token by default, prompting for elevation before high-integrity actions are permitted.",
            "difficulty": "beginner"
          },
          {
            "question": "What is a Windows event provider?",
            "options": [
              "A third-party cloud SaaS company that sells logs",
              "An operating system component or application registered with ETW (Event Tracing for Windows) that publishes structured events to specific channels",
              "A hardware chip on the motherboard that records system temperature",
              "A firewall rule that allows incoming Syslog packets"
            ],
            "correctAnswerIndex": 1,
            "explanation": "An event provider is a software module or driver that defines and publishes structured telemetry events via ETW to channels like Security, System, or Application.",
            "difficulty": "beginner"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m02",
      "title": "Module 02 \u2014 Windows CMD and PowerShell Essentials",
      "description": "Beginner level. Suggested effort: 8\u201310 hours. Prerequisite: Module 01. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 3,
      "lessons": [
        {
          "id": "les-winsec-m02-l01",
          "slug": "m02-l1-powershell-full-course",
          "title": "Module 02 - Lesson 1: PowerShell Full Course \u2014 Beginner to scripting (5 hours)",
          "description": "Hands-on Windows security video lesson presented by freeCodeCamp. Covers critical concepts from Module 02 \u2014 Windows CMD and PowerShell Essentials. Follow in your isolated lab environment.",
          "youtubeVideoId": "ueKFupiT2wA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 02 \u2014 Windows CMD and PowerShell Essentials",
          "objectives": [
            "Navigate Windows with Command Prompt and PowerShell.",
            "Use safe read-only inventory cmdlets.",
            "Export structured output to CSV without modifying system security settings."
          ],
          "tags": [
            "windows-security",
            "module-02",
            "beginner"
          ],
          "skillsTaught": [
            "CMD vs Windows PowerShell 5.1 vs modern PowerShell 7",
            "Objects, properties, cmdlets, `Get-Help`, `Get-Command`, pipelines",
            "Paths, quotes, filesystem and environment variables",
            "`whoami /all`, `systeminfo`, `Get-Process`, `Get-Service`, `Get-ComputerInfo`"
          ],
          "richContent": {
            "introduction": "In this lesson (PowerShell Full Course \u2014 Beginner to scripting (5 hours)), we analyze core defensive techniques from Module 02 \u2014 Windows CMD and PowerShell Essentials. Follow along with freeCodeCamp, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 01"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: PowerShell Full Course",
                "content": "This lesson covers Windows host and domain security concepts from Module 02 \u2014 Windows CMD and PowerShell Essentials. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Navigate Windows with Command Prompt and PowerShell.",
                  "Use safe read-only inventory cmdlets.",
                  "Export structured output to CSV without modifying system security settings."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Open a standard (not elevated) PowerShell terminal and run `Get-Help Get-Process`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Run `whoami /all`, `Get-Process | Select-Object -First 10`, and `Get-Service | Where-Object Status -eq Running`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Save running services: `Get-Service | Where-Object Status -eq Running | Export-Csv C:\\SOC-Lab\\exports\\running-services.csv -NoTypeInformation`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Query `Get-LocalUser` and `Get-LocalGroup` where present; read rather than edit.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Use `Get-ChildItem C:\\SOC-Lab -Recurse` and `Get-FileHash` on a text file you created.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Compare data shown by CMD and PowerShell for IP configuration and note object vs text output.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`windows-command-cheatsheet.md` with 20 commands and explanations",
              "`running-services.csv`, plus process and user inventories",
              "A 10-question personal drill with answers"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 02 \u2014 Windows CMD and PowerShell Essentials is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 02.",
            "furtherReading": [
              {
                "title": "Microsoft Learn \u2014 Get started with Windows PowerShell",
                "url": "https://learn.microsoft.com/en-us/training/paths/get-started-windows-powershell/"
              },
              {
                "title": "PowerShell security features / AMSI / application control",
                "url": "https://learn.microsoft.com/en-us/powershell/scripting/security/security-features"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m02-l02",
          "slug": "m02-l2-cyberpatriot",
          "title": "Module 02 - Lesson 2: CyberPatriot \u2014 Windows Basics video",
          "description": "Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 02 \u2014 Windows CMD and PowerShell Essentials. Follow in your isolated lab environment.",
          "youtubeVideoId": "8AtEe3bOqus",
          "videoAttribution": {
            "creator": "CyberPatriot",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 02 \u2014 Windows CMD and PowerShell Essentials",
          "objectives": [
            "Navigate Windows with Command Prompt and PowerShell.",
            "Use safe read-only inventory cmdlets.",
            "Export structured output to CSV without modifying system security settings."
          ],
          "tags": [
            "windows-security",
            "module-02",
            "beginner"
          ],
          "skillsTaught": [
            "CMD vs Windows PowerShell 5.1 vs modern PowerShell 7",
            "Objects, properties, cmdlets, `Get-Help`, `Get-Command`, pipelines",
            "Paths, quotes, filesystem and environment variables",
            "`whoami /all`, `systeminfo`, `Get-Process`, `Get-Service`, `Get-ComputerInfo`"
          ],
          "richContent": {
            "introduction": "In this lesson (CyberPatriot \u2014 Windows Basics video), we analyze core defensive techniques from Module 02 \u2014 Windows CMD and PowerShell Essentials. Follow along with CyberPatriot, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 01"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: CyberPatriot",
                "content": "This lesson covers Windows host and domain security concepts from Module 02 \u2014 Windows CMD and PowerShell Essentials. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Navigate Windows with Command Prompt and PowerShell.",
                  "Use safe read-only inventory cmdlets.",
                  "Export structured output to CSV without modifying system security settings."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Open a standard (not elevated) PowerShell terminal and run `Get-Help Get-Process`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Run `whoami /all`, `Get-Process | Select-Object -First 10`, and `Get-Service | Where-Object Status -eq Running`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Save running services: `Get-Service | Where-Object Status -eq Running | Export-Csv C:\\SOC-Lab\\exports\\running-services.csv -NoTypeInformation`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Query `Get-LocalUser` and `Get-LocalGroup` where present; read rather than edit.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Use `Get-ChildItem C:\\SOC-Lab -Recurse` and `Get-FileHash` on a text file you created.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Compare data shown by CMD and PowerShell for IP configuration and note object vs text output.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`windows-command-cheatsheet.md` with 20 commands and explanations",
              "`running-services.csv`, plus process and user inventories",
              "A 10-question personal drill with answers"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 02 \u2014 Windows CMD and PowerShell Essentials is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 02.",
            "furtherReading": [
              {
                "title": "Microsoft Learn \u2014 Get started with Windows PowerShell",
                "url": "https://learn.microsoft.com/en-us/training/paths/get-started-windows-powershell/"
              },
              {
                "title": "PowerShell security features / AMSI / application control",
                "url": "https://learn.microsoft.com/en-us/powershell/scripting/security/security-features"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m02",
        "title": "Module 02 Hands-on Lab: Windows CMD and PowerShell Essentials",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 02 \u2014 Windows CMD and PowerShell Essentials inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Open a standard (not elevated) PowerShell terminal and run `Get-Help Get-Process`.",
          "Run `whoami /all`, `Get-Process | Select-Object -First 10`, and `Get-Service | Where-Object Status -eq Running`.",
          "Save running services: `Get-Service | Where-Object Status -eq Running | Export-Csv C:\\SOC-Lab\\exports\\running-services.csv -NoTypeInformation`.",
          "Query `Get-LocalUser` and `Get-LocalGroup` where present; read rather than edit.",
          "Use `Get-ChildItem C:\\SOC-Lab -Recurse` and `Get-FileHash` on a text file you created.",
          "Compare data shown by CMD and PowerShell for IP configuration and note object vs text output."
        ],
        "tasks": [
          {
            "id": "task-winsec-m02-1",
            "description": "Open a standard (not elevated) PowerShell terminal and run `Get-Help Get-Process`.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m02-2",
            "description": "Run `whoami /all`, `Get-Process | Select-Object -First 10`, and `Get-Service | Where-Object Status -eq Running`.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m02-3",
            "description": "Save running services: `Get-Service | Where-Object Status -eq Running | Export-Csv C:\\SOC-Lab\\exports\\running-services.csv -NoTypeInformation`.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m02-4",
            "description": "Query `Get-LocalUser` and `Get-LocalGroup` where present; read rather than edit.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m02-5",
            "description": "Use `Get-ChildItem C:\\SOC-Lab -Recurse` and `Get-FileHash` on a text file you created.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m02-6",
            "description": "Compare data shown by CMD and PowerShell for IP configuration and note object vs text output.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "`windows-command-cheatsheet.md` with 20 commands and explanations",
          "`running-services.csv`, plus process and user inventories",
          "A 10-question personal drill with answers"
        ]
      },
      "quiz": {
        "title": "Module 02 Knowledge Check: Windows CMD and PowerShell Essentials",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "Why are PowerShell pipeline objects fundamentally different from CMD text streams?",
            "options": [
              "CMD sends structured JSON while PowerShell sends plain text strings",
              "PowerShell passes rich .NET objects with typed properties and methods through the pipeline, whereas CMD passes raw unstructured text streams that require manual string parsing",
              "PowerShell commands run in the kernel whereas CMD runs in userland",
              "PowerShell pipelines do not support filtering"
            ],
            "correctAnswerIndex": 1,
            "explanation": "PowerShell pipelines pass structured .NET objects. Downstream cmdlets can directly inspect object properties (e.g. .Id, .Path, .Status) without regex or string slicing.",
            "difficulty": "beginner"
          },
          {
            "question": "What does the -NoTypeInformation parameter affect in Export-Csv?",
            "options": [
              "It compresses the CSV file into a zip archive",
              "It omits the first-line #TYPE header banner from the exported CSV, making the file cleanly readable by standard CSV parsers",
              "It prevents sensitive passwords from being written to disk",
              "It converts all column headers into uppercase"
            ],
            "correctAnswerIndex": 1,
            "explanation": "In Windows PowerShell 5.1, Export-Csv prepends '#TYPE Selected.System.Management.Automation...' as line 1. -NoTypeInformation suppresses this header for RFC-compliant CSV output.",
            "difficulty": "beginner"
          },
          {
            "question": "What is the distinction between local admin and non-elevated PowerShell?",
            "options": [
              "Non-elevated PowerShell cannot execute any scripts",
              "A non-elevated PowerShell process runs under a filtered medium-integrity token, preventing access to protected resources like security event logs and system services, even if the account belongs to Administrators",
              "Local admin sessions run in a separate virtual machine",
              "Non-elevated sessions cannot read files in the user's personal documents folder"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Under UAC, an administrative user has split tokens. A non-elevated session carries a medium-integrity token with administrative SIDs set to 'deny only', blocking elevated tasks like reading Security.evtx.",
            "difficulty": "beginner"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m03",
      "title": "Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions",
      "description": "Beginner level. Suggested effort: 7\u20139 hours. Prerequisite: Module 02. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 4,
      "lessons": [
        {
          "id": "les-winsec-m03-l01",
          "slug": "m03-l1-cyberpatriot",
          "title": "Module 03 - Lesson 1: CyberPatriot \u2014 Windows Security Configuration",
          "description": "Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions. Follow in your isolated lab environment.",
          "youtubeVideoId": "Vvv4LaCAJWQ",
          "videoAttribution": {
            "creator": "CyberPatriot",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions",
          "objectives": [
            "Explain local accounts, groups, SIDs, logon sessions and tokens.",
            "Read NTFS permissions and understand access inheritance.",
            "Practice least privilege and UAC safely with an expendable local user."
          ],
          "tags": [
            "windows-security",
            "module-03",
            "beginner"
          ],
          "skillsTaught": [
            "Local accounts and local groups, SIDs and group membership",
            "Authentication vs authorization; access tokens and privileges",
            "User Account Control and elevation prompts",
            "NTFS permissions, ownership, inheritance vs sharing permissions"
          ],
          "richContent": {
            "introduction": "In this lesson (CyberPatriot \u2014 Windows Security Configuration), we analyze core defensive techniques from Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions. Follow along with CyberPatriot, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 02"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: CyberPatriot",
                "content": "This lesson covers Windows host and domain security concepts from Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain local accounts, groups, SIDs, logon sessions and tokens.",
                  "Read NTFS permissions and understand access inheritance.",
                  "Practice least privilege and UAC safely with an expendable local user."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take snapshot `M03-before-identities`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Create a lab-only standard user via Windows Settings/Computer Management; do not modify your daily-use account.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Use `whoami /user`, `whoami /groups` in the standard session and compare to an approved admin session.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Create `C:\\SOC-Lab\\PermissionsTest`; inspect its ACL using `icacls` and `Get-Acl`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Grant only the test user access to a test subfolder via the GUI; document effective permissions.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Compare behavior with a standard user; then restore permissions from the snapshot or manually clean up.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Account and group table with anonymized SIDs",
              "Before/after ACL screenshots or text",
              "Least-privilege checklist and explanation of UAC"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 03.",
            "furtherReading": [
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              },
              {
                "title": "Microsoft Learn \u2014 Secure Windows Server Infrastructure",
                "url": "https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m03-l02",
          "slug": "m03-l2-cyberpatriot",
          "title": "Module 03 - Lesson 2: CyberPatriot \u2014 Windows Security Tools",
          "description": "Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions. Follow in your isolated lab environment.",
          "youtubeVideoId": "C_RTcErv3gU",
          "videoAttribution": {
            "creator": "CyberPatriot",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions",
          "objectives": [
            "Explain local accounts, groups, SIDs, logon sessions and tokens.",
            "Read NTFS permissions and understand access inheritance.",
            "Practice least privilege and UAC safely with an expendable local user."
          ],
          "tags": [
            "windows-security",
            "module-03",
            "beginner"
          ],
          "skillsTaught": [
            "Local accounts and local groups, SIDs and group membership",
            "Authentication vs authorization; access tokens and privileges",
            "User Account Control and elevation prompts",
            "NTFS permissions, ownership, inheritance vs sharing permissions"
          ],
          "richContent": {
            "introduction": "In this lesson (CyberPatriot \u2014 Windows Security Tools), we analyze core defensive techniques from Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions. Follow along with CyberPatriot, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 02"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: CyberPatriot",
                "content": "This lesson covers Windows host and domain security concepts from Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain local accounts, groups, SIDs, logon sessions and tokens.",
                  "Read NTFS permissions and understand access inheritance.",
                  "Practice least privilege and UAC safely with an expendable local user."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take snapshot `M03-before-identities`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Create a lab-only standard user via Windows Settings/Computer Management; do not modify your daily-use account.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Use `whoami /user`, `whoami /groups` in the standard session and compare to an approved admin session.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Create `C:\\SOC-Lab\\PermissionsTest`; inspect its ACL using `icacls` and `Get-Acl`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Grant only the test user access to a test subfolder via the GUI; document effective permissions.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Compare behavior with a standard user; then restore permissions from the snapshot or manually clean up.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Account and group table with anonymized SIDs",
              "Before/after ACL screenshots or text",
              "Least-privilege checklist and explanation of UAC"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 03.",
            "furtherReading": [
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              },
              {
                "title": "Microsoft Learn \u2014 Secure Windows Server Infrastructure",
                "url": "https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m03-l03",
          "slug": "m03-l3-powershell-full-course",
          "title": "Module 03 - Lesson 3: PowerShell Full Course \u2014 Beginner to scripting (5 hours)",
          "description": "Hands-on Windows security video lesson presented by freeCodeCamp. Covers critical concepts from Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions. Follow in your isolated lab environment.",
          "youtubeVideoId": "ueKFupiT2wA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions",
          "objectives": [
            "Explain local accounts, groups, SIDs, logon sessions and tokens.",
            "Read NTFS permissions and understand access inheritance.",
            "Practice least privilege and UAC safely with an expendable local user."
          ],
          "tags": [
            "windows-security",
            "module-03",
            "beginner"
          ],
          "skillsTaught": [
            "Local accounts and local groups, SIDs and group membership",
            "Authentication vs authorization; access tokens and privileges",
            "User Account Control and elevation prompts",
            "NTFS permissions, ownership, inheritance vs sharing permissions"
          ],
          "richContent": {
            "introduction": "In this lesson (PowerShell Full Course \u2014 Beginner to scripting (5 hours)), we analyze core defensive techniques from Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions. Follow along with freeCodeCamp, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 02"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: PowerShell Full Course",
                "content": "This lesson covers Windows host and domain security concepts from Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain local accounts, groups, SIDs, logon sessions and tokens.",
                  "Read NTFS permissions and understand access inheritance.",
                  "Practice least privilege and UAC safely with an expendable local user."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take snapshot `M03-before-identities`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Create a lab-only standard user via Windows Settings/Computer Management; do not modify your daily-use account.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Use `whoami /user`, `whoami /groups` in the standard session and compare to an approved admin session.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Create `C:\\SOC-Lab\\PermissionsTest`; inspect its ACL using `icacls` and `Get-Acl`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Grant only the test user access to a test subfolder via the GUI; document effective permissions.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Compare behavior with a standard user; then restore permissions from the snapshot or manually clean up.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Account and group table with anonymized SIDs",
              "Before/after ACL screenshots or text",
              "Least-privilege checklist and explanation of UAC"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 03.",
            "furtherReading": [
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              },
              {
                "title": "Microsoft Learn \u2014 Secure Windows Server Infrastructure",
                "url": "https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m03",
        "title": "Module 03 Hands-on Lab: Windows Identity, UAC, and NTFS Permissions",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 03 \u2014 Windows Identity, UAC, and NTFS Permissions inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "Take snapshot `M03-before-identities`.",
          "Create a lab-only standard user via Windows Settings/Computer Management; do not modify your daily-use account.",
          "Use `whoami /user`, `whoami /groups` in the standard session and compare to an approved admin session.",
          "Create `C:\\SOC-Lab\\PermissionsTest`; inspect its ACL using `icacls` and `Get-Acl`.",
          "Grant only the test user access to a test subfolder via the GUI; document effective permissions.",
          "Compare behavior with a standard user; then restore permissions from the snapshot or manually clean up."
        ],
        "tasks": [
          {
            "id": "task-winsec-m03-1",
            "description": "Take snapshot `M03-before-identities`.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m03-2",
            "description": "Create a lab-only standard user via Windows Settings/Computer Management; do not modify your daily-use account.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m03-3",
            "description": "Use `whoami /user`, `whoami /groups` in the standard session and compare to an approved admin session.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m03-4",
            "description": "Create `C:\\SOC-Lab\\PermissionsTest`; inspect its ACL using `icacls` and `Get-Acl`.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m03-5",
            "description": "Grant only the test user access to a test subfolder via the GUI; document effective permissions.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m03-6",
            "description": "Compare behavior with a standard user; then restore permissions from the snapshot or manually clean up.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Account and group table with anonymized SIDs",
          "Before/after ACL screenshots or text",
          "Least-privilege checklist and explanation of UAC"
        ]
      },
      "quiz": {
        "title": "Module 03 Knowledge Check: Windows Identity, UAC, and NTFS Permissions",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "Is membership in Administrators equivalent to every process being elevated?",
            "options": [
              "Yes, every process spawned by an administrator immediately receives high integrity",
              "No, under UAC, interactive processes run with a filtered standard user token until explicitly elevated via consent prompt",
              "Only CMD processes are elevated, whereas PowerShell is never elevated",
              "Only processes with signed certificates are elevated"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Membership in the Administrators group does not automatically elevate every process. By default, applications run with medium integrity until explicitly elevated.",
            "difficulty": "beginner"
          },
          {
            "question": "How do NTFS permission inheritance and share permissions differ?",
            "options": [
              "Share permissions apply locally; NTFS permissions only apply across the network",
              "Share permissions regulate access over SMB network shares, while NTFS permissions apply locally and over the network; the most restrictive permission applies when accessing a share",
              "Share permissions override NTFS permissions under all circumstances",
              "NTFS permissions cannot be inherited by child folders"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Share permissions only control access over network SMB shares, while NTFS permissions govern the underlying filesystem directly. When accessing across a network, the effective permission is the most restrictive combination.",
            "difficulty": "beginner"
          },
          {
            "question": "What is a Security Identifier (SID)?",
            "options": [
              "A temporary session ID generated upon opening a browser",
              "A unique, immutable alphanumeric string that Windows uses to identify a security principal such as a user, group, or computer account",
              "A digital certificate issued by Microsoft to sign device drivers",
              "The computer's hardware MAC address"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A SID (e.g., S-1-5-21-...) is a variable-length string that uniquely and immutably identifies a user account, security group, or computer account across the operating system.",
            "difficulty": "beginner"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m04",
      "title": "Module 04 \u2014 Processes, Services, Registry, Startup and Persistence",
      "description": "Intermediate level. Suggested effort: 7\u20139 hours. Prerequisite: Module 03. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 5,
      "lessons": [
        {
          "id": "les-winsec-m04-l01",
          "slug": "m04-l1-powershell-full-course",
          "title": "Module 04 - Lesson 1: PowerShell Full Course \u2014 Beginner to scripting (5 hours)",
          "description": "Hands-on Windows security video lesson presented by freeCodeCamp. Covers critical concepts from Module 04 \u2014 Processes, Services, Registry, Startup and Persistence. Follow in your isolated lab environment.",
          "youtubeVideoId": "ueKFupiT2wA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 04 \u2014 Processes, Services, Registry, Startup and Persistence",
          "objectives": [
            "Distinguish expected services and auto-start entries from suspicious changes.",
            "Inventory tasks, startup entries and relevant registry keys without editing unrelated items.",
            "Correlate processes with users and executable locations."
          ],
          "tags": [
            "windows-security",
            "module-04",
            "intermediate"
          ],
          "skillsTaught": [
            "Parent-child process chains and common Windows processes",
            "Services, scheduled tasks, startup apps and Run keys",
            "Registry hives HKLM/HKCU and safe backups",
            "Digital signatures, hashes, file paths and startup persistence"
          ],
          "richContent": {
            "introduction": "In this lesson (PowerShell Full Course \u2014 Beginner to scripting (5 hours)), we analyze core defensive techniques from Module 04 \u2014 Processes, Services, Registry, Startup and Persistence. Follow along with freeCodeCamp, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 03"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: PowerShell Full Course",
                "content": "This lesson covers Windows host and domain security concepts from Module 04 \u2014 Processes, Services, Registry, Startup and Persistence. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Distinguish expected services and auto-start entries from suspicious changes.",
                  "Inventory tasks, startup entries and relevant registry keys without editing unrelated items.",
                  "Correlate processes with users and executable locations."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Record a baseline using `Get-Process | Select Name,Id,Path` (some paths require elevation).",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "List services using `Get-CimInstance Win32_Service | Select Name,StartMode,State,PathName`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "List scheduled tasks with `Get-ScheduledTask | Select TaskName,TaskPath,State`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Inspect `HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` read-only in PowerShell.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create a *benign* scheduled task inside a disposable VM that launches Notepad at user logon, record it, and delete it afterward.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Compare before/after inventories and describe why ordinary software updates can also add scheduled tasks.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Process/service/task inventory",
              "Table of 5 persistence locations and their benign purposes",
              "Screenshot of benign task and evidence of successful cleanup"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 04 \u2014 Processes, Services, Registry, Startup and Persistence is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 04.",
            "furtherReading": [
              {
                "title": "Microsoft Sysinternals official tools",
                "url": "https://learn.microsoft.com/en-us/sysinternals/"
              },
              {
                "title": "Microsoft Sysinternals Process Explorer",
                "url": "https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer"
              },
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m04-l02",
          "slug": "m04-l2-trustedsec-sysmon-6",
          "title": "Module 04 - Lesson 2: TrustedSec Sysmon 6 \u2014 Process tracking",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 04 \u2014 Processes, Services, Registry, Startup and Persistence. Follow in your isolated lab environment.",
          "youtubeVideoId": "46-alN2_vlo",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 04 \u2014 Processes, Services, Registry, Startup and Persistence",
          "objectives": [
            "Distinguish expected services and auto-start entries from suspicious changes.",
            "Inventory tasks, startup entries and relevant registry keys without editing unrelated items.",
            "Correlate processes with users and executable locations."
          ],
          "tags": [
            "windows-security",
            "module-04",
            "intermediate"
          ],
          "skillsTaught": [
            "Parent-child process chains and common Windows processes",
            "Services, scheduled tasks, startup apps and Run keys",
            "Registry hives HKLM/HKCU and safe backups",
            "Digital signatures, hashes, file paths and startup persistence"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 6 \u2014 Process tracking), we analyze core defensive techniques from Module 04 \u2014 Processes, Services, Registry, Startup and Persistence. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 03"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 6",
                "content": "This lesson covers Windows host and domain security concepts from Module 04 \u2014 Processes, Services, Registry, Startup and Persistence. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Distinguish expected services and auto-start entries from suspicious changes.",
                  "Inventory tasks, startup entries and relevant registry keys without editing unrelated items.",
                  "Correlate processes with users and executable locations."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Record a baseline using `Get-Process | Select Name,Id,Path` (some paths require elevation).",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "List services using `Get-CimInstance Win32_Service | Select Name,StartMode,State,PathName`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "List scheduled tasks with `Get-ScheduledTask | Select TaskName,TaskPath,State`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Inspect `HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` read-only in PowerShell.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create a *benign* scheduled task inside a disposable VM that launches Notepad at user logon, record it, and delete it afterward.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Compare before/after inventories and describe why ordinary software updates can also add scheduled tasks.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Process/service/task inventory",
              "Table of 5 persistence locations and their benign purposes",
              "Screenshot of benign task and evidence of successful cleanup"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 04 \u2014 Processes, Services, Registry, Startup and Persistence is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 04.",
            "furtherReading": [
              {
                "title": "Microsoft Sysinternals official tools",
                "url": "https://learn.microsoft.com/en-us/sysinternals/"
              },
              {
                "title": "Microsoft Sysinternals Process Explorer",
                "url": "https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer"
              },
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m04-l03",
          "slug": "m04-l3-trustedsec-sysmon-22",
          "title": "Module 04 - Lesson 3: TrustedSec Sysmon 22 \u2014 Registry actions",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 04 \u2014 Processes, Services, Registry, Startup and Persistence. Follow in your isolated lab environment.",
          "youtubeVideoId": "hy5s1pnaO2I",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 04 \u2014 Processes, Services, Registry, Startup and Persistence",
          "objectives": [
            "Distinguish expected services and auto-start entries from suspicious changes.",
            "Inventory tasks, startup entries and relevant registry keys without editing unrelated items.",
            "Correlate processes with users and executable locations."
          ],
          "tags": [
            "windows-security",
            "module-04",
            "intermediate"
          ],
          "skillsTaught": [
            "Parent-child process chains and common Windows processes",
            "Services, scheduled tasks, startup apps and Run keys",
            "Registry hives HKLM/HKCU and safe backups",
            "Digital signatures, hashes, file paths and startup persistence"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 22 \u2014 Registry actions), we analyze core defensive techniques from Module 04 \u2014 Processes, Services, Registry, Startup and Persistence. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 03"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 22",
                "content": "This lesson covers Windows host and domain security concepts from Module 04 \u2014 Processes, Services, Registry, Startup and Persistence. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Distinguish expected services and auto-start entries from suspicious changes.",
                  "Inventory tasks, startup entries and relevant registry keys without editing unrelated items.",
                  "Correlate processes with users and executable locations."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Record a baseline using `Get-Process | Select Name,Id,Path` (some paths require elevation).",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "List services using `Get-CimInstance Win32_Service | Select Name,StartMode,State,PathName`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "List scheduled tasks with `Get-ScheduledTask | Select TaskName,TaskPath,State`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Inspect `HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` read-only in PowerShell.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create a *benign* scheduled task inside a disposable VM that launches Notepad at user logon, record it, and delete it afterward.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Compare before/after inventories and describe why ordinary software updates can also add scheduled tasks.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Process/service/task inventory",
              "Table of 5 persistence locations and their benign purposes",
              "Screenshot of benign task and evidence of successful cleanup"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 04 \u2014 Processes, Services, Registry, Startup and Persistence is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 04.",
            "furtherReading": [
              {
                "title": "Microsoft Sysinternals official tools",
                "url": "https://learn.microsoft.com/en-us/sysinternals/"
              },
              {
                "title": "Microsoft Sysinternals Process Explorer",
                "url": "https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer"
              },
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m04",
        "title": "Module 04 Hands-on Lab: Processes, Services, Registry, Startup and Persistence",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 04 \u2014 Processes, Services, Registry, Startup and Persistence inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Record a baseline using `Get-Process | Select Name,Id,Path` (some paths require elevation).",
          "List services using `Get-CimInstance Win32_Service | Select Name,StartMode,State,PathName`.",
          "List scheduled tasks with `Get-ScheduledTask | Select TaskName,TaskPath,State`.",
          "Inspect `HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` read-only in PowerShell.",
          "Create a *benign* scheduled task inside a disposable VM that launches Notepad at user logon, record it, and delete it afterward.",
          "Compare before/after inventories and describe why ordinary software updates can also add scheduled tasks."
        ],
        "tasks": [
          {
            "id": "task-winsec-m04-1",
            "description": "Record a baseline using `Get-Process | Select Name,Id,Path` (some paths require elevation).",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m04-2",
            "description": "List services using `Get-CimInstance Win32_Service | Select Name,StartMode,State,PathName`.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m04-3",
            "description": "List scheduled tasks with `Get-ScheduledTask | Select TaskName,TaskPath,State`.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m04-4",
            "description": "Inspect `HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run` read-only in PowerShell.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m04-5",
            "description": "Create a *benign* scheduled task inside a disposable VM that launches Notepad at user logon, record it, and delete it afterward.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m04-6",
            "description": "Compare before/after inventories and describe why ordinary software updates can also add scheduled tasks.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Process/service/task inventory",
          "Table of 5 persistence locations and their benign purposes",
          "Screenshot of benign task and evidence of successful cleanup"
        ]
      },
      "quiz": {
        "title": "Module 04 Knowledge Check: Processes, Services, Registry, Startup and Persistence",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "Why does a strange or unfamiliar filename alone not prove malware?",
            "options": [
              "File names are permanently locked by the NTFS filesystem",
              "Legitimate third-party applications and system utilities often use obscure or auto-generated names; analysts must examine file paths, digital signatures, hashes, parent processes, and behavior",
              "Windows automatically deletes files with suspicious names",
              "Strange file names only occur on Linux systems"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Legitimate software updaters and temporary installers frequently generate random strings. Defenders must correlate executable location, Authenticode signatures, hash reputation, and process lineage.",
            "difficulty": "intermediate"
          },
          {
            "question": "What is a parent PID (PPID)?",
            "options": [
              "The physical memory address of the operating system kernel",
              "The Process Identifier of the process that spawned or created the current child process, essential for tracing execution lineage",
              "The network port assigned to a running process",
              "A hash generated by Windows Defender for each executable"
            ],
            "correctAnswerIndex": 1,
            "explanation": "PPID records the PID of the process responsible for creating a child process. Analyzing parent-child relationships (e.g. winword.exe spawning powershell.exe) is a core detection pattern.",
            "difficulty": "intermediate"
          },
          {
            "question": "Why should analysts compare activity to a known baseline?",
            "options": [
              "Baselines are required to maintain Windows license validity",
              "Without knowing what normal processes, services, and scheduled tasks exist in an environment, it is difficult to spot genuine anomalies and malicious persistence",
              "Baselines automatically eliminate all false positives",
              "Baselines reduce disk fragmentation"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A baseline establishes expected, legitimate background behavior on clean endpoints, making unusual scheduled tasks, registry Run keys, or rogue services stand out immediately.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m05",
      "title": "Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security",
      "description": "Intermediate level. Suggested effort: 8\u201310 hours. Prerequisite: Module 04. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 6,
      "lessons": [
        {
          "id": "les-winsec-m05-l01",
          "slug": "m05-l1-windows-defender-firewall-inbound-outbound-rules-tutorial",
          "title": "Module 05 - Lesson 1: Configuring Windows Defender Firewall — Inbound & Outbound Rules",
          "description": "Hands-on Windows security video lesson presented by Professor Messer. Covers critical concepts from Module 05 — Windows Networking, SMB, RDP and Firewall Security. Follow in your isolated lab environment.",
          "youtubeVideoId": "b5YODEKsOrA",
          "videoAttribution": {
            "creator": "Professor Messer",
            "platform": "youtube"
          },
          "durationMinutes": 7,
          "order": 1,
          "moduleTitle": "Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security",
          "objectives": [
            "Understand Windows-specific network connections and profiles.",
            "Read local TCP connections, name resolution and firewall rules.",
            "Explain SMB and RDP hardening without attacking any public system."
          ],
          "tags": [
            "windows-security",
            "module-05",
            "intermediate"
          ],
          "skillsTaught": [
            "Windows network profiles, DNS client, IP config, routes",
            "`ipconfig`, `Get-NetIPAddress`, `Get-NetTCPConnection`, `Test-NetConnection`",
            "Firewall",
            "RDP, Windows Remote Management (WinRM) and SMB threat surfaces"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows Defender Firewall inbound/outbound rules tutorial), we analyze core defensive techniques from Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security. Follow along with Kevin Stratvert, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 04"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows Defender Firewall inbound/outbound rules tutorial",
                "content": "This lesson covers Windows host and domain security concepts from Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Understand Windows-specific network connections and profiles.",
                  "Read local TCP connections, name resolution and firewall rules.",
                  "Explain SMB and RDP hardening without attacking any public system."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Record `Get-NetConnectionProfile` and `Get-NetFirewallProfile` output.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Open `wf.msc`; inspect default inbound/outbound rules, making no changes initially.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Use `Get-NetTCPConnection | Select -First 20` and correlate local PIDs with `Get-Process`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Within your VM, create a narrowly scoped temporary outbound blocking rule for a harmless test app, then verify expected blocking.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Remove the lab rule and confirm normal traffic; never disable Windows Firewall globally.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a risk note: when would you expose RDP or SMB, and what controls should protect them?",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Annotated firewall rule screenshot",
              "TCP connection inventory and process correlation",
              "One-page Windows SMB/RDP security checklist"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 05.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Windows Firewall with Advanced Security rules",
                "url": "https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-firewall/configure"
              },
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m05-l02",
          "slug": "m05-l2-cyberpatriot",
          "title": "Module 05 - Lesson 2: CyberPatriot \u2014 Windows Security Tools",
          "description": "Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security. Follow in your isolated lab environment.",
          "youtubeVideoId": "C_RTcErv3gU",
          "videoAttribution": {
            "creator": "CyberPatriot",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security",
          "objectives": [
            "Understand Windows-specific network connections and profiles.",
            "Read local TCP connections, name resolution and firewall rules.",
            "Explain SMB and RDP hardening without attacking any public system."
          ],
          "tags": [
            "windows-security",
            "module-05",
            "intermediate"
          ],
          "skillsTaught": [
            "Windows network profiles, DNS client, IP config, routes",
            "`ipconfig`, `Get-NetIPAddress`, `Get-NetTCPConnection`, `Test-NetConnection`",
            "Firewall",
            "RDP, Windows Remote Management (WinRM) and SMB threat surfaces"
          ],
          "richContent": {
            "introduction": "In this lesson (CyberPatriot \u2014 Windows Security Tools), we analyze core defensive techniques from Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security. Follow along with CyberPatriot, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 04"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: CyberPatriot",
                "content": "This lesson covers Windows host and domain security concepts from Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Understand Windows-specific network connections and profiles.",
                  "Read local TCP connections, name resolution and firewall rules.",
                  "Explain SMB and RDP hardening without attacking any public system."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Record `Get-NetConnectionProfile` and `Get-NetFirewallProfile` output.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Open `wf.msc`; inspect default inbound/outbound rules, making no changes initially.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Use `Get-NetTCPConnection | Select -First 20` and correlate local PIDs with `Get-Process`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Within your VM, create a narrowly scoped temporary outbound blocking rule for a harmless test app, then verify expected blocking.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Remove the lab rule and confirm normal traffic; never disable Windows Firewall globally.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a risk note: when would you expose RDP or SMB, and what controls should protect them?",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Annotated firewall rule screenshot",
              "TCP connection inventory and process correlation",
              "One-page Windows SMB/RDP security checklist"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 05.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Windows Firewall with Advanced Security rules",
                "url": "https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-firewall/configure"
              },
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m05-l03",
          "slug": "m05-l3-trustedsec-sysmon-8",
          "title": "Module 05 - Lesson 3: TrustedSec Sysmon 8 \u2014 Network connections",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security. Follow in your isolated lab environment.",
          "youtubeVideoId": "y4cpuliY4dk",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security",
          "objectives": [
            "Understand Windows-specific network connections and profiles.",
            "Read local TCP connections, name resolution and firewall rules.",
            "Explain SMB and RDP hardening without attacking any public system."
          ],
          "tags": [
            "windows-security",
            "module-05",
            "intermediate"
          ],
          "skillsTaught": [
            "Windows network profiles, DNS client, IP config, routes",
            "`ipconfig`, `Get-NetIPAddress`, `Get-NetTCPConnection`, `Test-NetConnection`",
            "Firewall",
            "RDP, Windows Remote Management (WinRM) and SMB threat surfaces"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 8 \u2014 Network connections), we analyze core defensive techniques from Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 04"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 8",
                "content": "This lesson covers Windows host and domain security concepts from Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Understand Windows-specific network connections and profiles.",
                  "Read local TCP connections, name resolution and firewall rules.",
                  "Explain SMB and RDP hardening without attacking any public system."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Record `Get-NetConnectionProfile` and `Get-NetFirewallProfile` output.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Open `wf.msc`; inspect default inbound/outbound rules, making no changes initially.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Use `Get-NetTCPConnection | Select -First 20` and correlate local PIDs with `Get-Process`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Within your VM, create a narrowly scoped temporary outbound blocking rule for a harmless test app, then verify expected blocking.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Remove the lab rule and confirm normal traffic; never disable Windows Firewall globally.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a risk note: when would you expose RDP or SMB, and what controls should protect them?",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Annotated firewall rule screenshot",
              "TCP connection inventory and process correlation",
              "One-page Windows SMB/RDP security checklist"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 05.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Windows Firewall with Advanced Security rules",
                "url": "https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-firewall/configure"
              },
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m05",
        "title": "Module 05 Hands-on Lab: Windows Networking, SMB, RDP and Firewall Security",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 05 \u2014 Windows Networking, SMB, RDP and Firewall Security inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Record `Get-NetConnectionProfile` and `Get-NetFirewallProfile` output.",
          "Open `wf.msc`; inspect default inbound/outbound rules, making no changes initially.",
          "Use `Get-NetTCPConnection | Select -First 20` and correlate local PIDs with `Get-Process`.",
          "Within your VM, create a narrowly scoped temporary outbound blocking rule for a harmless test app, then verify expected blocking.",
          "Remove the lab rule and confirm normal traffic; never disable Windows Firewall globally.",
          "Write a risk note: when would you expose RDP or SMB, and what controls should protect them?"
        ],
        "tasks": [
          {
            "id": "task-winsec-m05-1",
            "description": "Record `Get-NetConnectionProfile` and `Get-NetFirewallProfile` output.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m05-2",
            "description": "Open `wf.msc`; inspect default inbound/outbound rules, making no changes initially.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m05-3",
            "description": "Use `Get-NetTCPConnection | Select -First 20` and correlate local PIDs with `Get-Process`.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m05-4",
            "description": "Within your VM, create a narrowly scoped temporary outbound blocking rule for a harmless test app, then verify expected blocking.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m05-5",
            "description": "Remove the lab rule and confirm normal traffic; never disable Windows Firewall globally.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m05-6",
            "description": "Write a risk note: when would you expose RDP or SMB, and what controls should protect them?",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Annotated firewall rule screenshot",
          "TCP connection inventory and process correlation",
          "One-page Windows SMB/RDP security checklist"
        ]
      },
      "quiz": {
        "title": "Module 05 Knowledge Check: Windows Networking, SMB, RDP and Firewall Security",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the difference between inbound and outbound firewall filtering?",
            "options": [
              "Inbound regulates traffic initiated from external systems toward the host; outbound filters traffic originating on the local host attempting to reach external destinations",
              "Inbound applies only to UDP, while outbound applies only to TCP",
              "Outbound filtering is only supported on Windows Server",
              "Inbound filtering only inspects port 80"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Inbound rules filter packets arriving from other machines trying to connect to local ports, whereas outbound rules govern connections initiated by local processes to external servers.",
            "difficulty": "intermediate"
          },
          {
            "question": "Does a LISTENING port automatically indicate compromise?",
            "options": [
              "Yes, no legitimate Windows service ever listens on a local port",
              "No, standard system daemons and legitimate network software regularly bind to ports and wait for incoming connections",
              "Only ports above 1024 indicate compromise",
              "Listening ports are always created by web browsers"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Many normal Windows components (e.g., RPC on 135, SMB on 445, WinRM on 5985) legitimately listen for connections. Triage requires verifying the hosting binary and account.",
            "difficulty": "intermediate"
          },
          {
            "question": "Why is the Public network profile usually more restrictive than Private?",
            "options": [
              "Public networks assume untrusted peers and disable network discovery and incoming connection exceptions by default to protect the endpoint",
              "Public profiles block all outbound internet traffic",
              "Public profiles disable Windows Defender Antivirus",
              "Public profiles prevent the computer from receiving Windows Updates"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The Public profile assumes the local subnet contains untrusted machines (such as public Wi-Fi). Windows turns off file sharing and discovery to prevent unauthorized inbound access.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m06",
      "title": "Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection",
      "description": "Intermediate level. Suggested effort: 8\u201310 hours. Prerequisite: Module 05. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 7,
      "lessons": [
        {
          "id": "les-winsec-m06-l01",
          "slug": "m06-l1-microsoft-defender-antivirus-windows-10-11-setup",
          "title": "Module 06 - Lesson 1: Microsoft Defender Antivirus Windows 10/11 setup",
          "description": "Hands-on Windows security video lesson presented by Windows Security Guides. Covers critical concepts from Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection. Follow in your isolated lab environment.",
          "youtubeVideoId": "HOvRXmkW-J8",
          "videoAttribution": {
            "creator": "Windows Security Guides",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection",
          "objectives": [
            "Interpret Microsoft Defender protection and detection status.",
            "Differentiate endpoint AV and enterprise EDR.",
            "Explain Windows encryption and safe recovery-key handling."
          ],
          "tags": [
            "windows-security",
            "module-06",
            "intermediate"
          ],
          "skillsTaught": [
            "Microsoft Defender Antivirus protection states and scans",
            "Protection history, security intelligence, exclusions and safe defaults",
            "SmartScreen, reputation-based protection, ASR concept",
            "BitLocker vs Device Encryption and TPM"
          ],
          "richContent": {
            "introduction": "In this lesson (Microsoft Defender Antivirus Windows 10/11 setup), we analyze core defensive techniques from Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection. Follow along with Windows Security Guides, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 05"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Microsoft Defender Antivirus Windows 10/11 setup",
                "content": "This lesson covers Windows host and domain security concepts from Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Interpret Microsoft Defender protection and detection status.",
                  "Differentiate endpoint AV and enterprise EDR.",
                  "Explain Windows encryption and safe recovery-key handling."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "In Windows Security, review Virus & threat protection and Firewall & network protection.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Run `Get-MpComputerStatus | Select AntivirusEnabled,RealTimeProtectionEnabled,AntivirusSignatureLastUpdated` on an authorized lab VM.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Trigger a normal Quick Scan in the GUI; record its result without using malware.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Inspect existing `Get-MpThreatDetection` output; zero results is a valid result.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Review encryption capability and read the BitLocker recovery key safety guidance; never include keys or identifiers in portfolio screenshots.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Explain 5 defenses: Defender AV, SmartScreen, UAC, Firewall, and encryption.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Endpoint-protection baseline report",
              "Quick-scan screenshot and detection-history interpretation",
              "Encryption readiness checklist without recovery keys"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 06.",
            "furtherReading": [
              {
                "title": "Microsoft Defender PowerShell cmdlets",
                "url": "https://learn.microsoft.com/en-us/powershell/module/defender/"
              },
              {
                "title": "Get-MpComputerStatus reference",
                "url": "https://learn.microsoft.com/en-us/powershell/module/defender/get-mpcomputerstatus"
              },
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m06-l02",
          "slug": "m06-l2-windows-11-bitlocker-and-recovery-key-precautions",
          "title": "Module 06 - Lesson 2: Windows 11 BitLocker and recovery-key precautions",
          "description": "Hands-on Windows security video lesson presented by Britec09. Covers critical concepts from Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection. Follow in your isolated lab environment.",
          "youtubeVideoId": "3ODr_uFHD6M",
          "videoAttribution": {
            "creator": "Britec09",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection",
          "objectives": [
            "Interpret Microsoft Defender protection and detection status.",
            "Differentiate endpoint AV and enterprise EDR.",
            "Explain Windows encryption and safe recovery-key handling."
          ],
          "tags": [
            "windows-security",
            "module-06",
            "intermediate"
          ],
          "skillsTaught": [
            "Microsoft Defender Antivirus protection states and scans",
            "Protection history, security intelligence, exclusions and safe defaults",
            "SmartScreen, reputation-based protection, ASR concept",
            "BitLocker vs Device Encryption and TPM"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows 11 BitLocker and recovery-key precautions), we analyze core defensive techniques from Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection. Follow along with Britec09, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 05"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows 11 BitLocker and recovery-key precautions",
                "content": "This lesson covers Windows host and domain security concepts from Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Interpret Microsoft Defender protection and detection status.",
                  "Differentiate endpoint AV and enterprise EDR.",
                  "Explain Windows encryption and safe recovery-key handling."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "In Windows Security, review Virus & threat protection and Firewall & network protection.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Run `Get-MpComputerStatus | Select AntivirusEnabled,RealTimeProtectionEnabled,AntivirusSignatureLastUpdated` on an authorized lab VM.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Trigger a normal Quick Scan in the GUI; record its result without using malware.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Inspect existing `Get-MpThreatDetection` output; zero results is a valid result.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Review encryption capability and read the BitLocker recovery key safety guidance; never include keys or identifiers in portfolio screenshots.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Explain 5 defenses: Defender AV, SmartScreen, UAC, Firewall, and encryption.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Endpoint-protection baseline report",
              "Quick-scan screenshot and detection-history interpretation",
              "Encryption readiness checklist without recovery keys"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 06.",
            "furtherReading": [
              {
                "title": "Microsoft Defender PowerShell cmdlets",
                "url": "https://learn.microsoft.com/en-us/powershell/module/defender/"
              },
              {
                "title": "Get-MpComputerStatus reference",
                "url": "https://learn.microsoft.com/en-us/powershell/module/defender/get-mpcomputerstatus"
              },
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m06-l03",
          "slug": "m06-l3-cyberpatriot",
          "title": "Module 06 - Lesson 3: CyberPatriot \u2014 Windows Security Tools",
          "description": "Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection. Follow in your isolated lab environment.",
          "youtubeVideoId": "C_RTcErv3gU",
          "videoAttribution": {
            "creator": "CyberPatriot",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection",
          "objectives": [
            "Interpret Microsoft Defender protection and detection status.",
            "Differentiate endpoint AV and enterprise EDR.",
            "Explain Windows encryption and safe recovery-key handling."
          ],
          "tags": [
            "windows-security",
            "module-06",
            "intermediate"
          ],
          "skillsTaught": [
            "Microsoft Defender Antivirus protection states and scans",
            "Protection history, security intelligence, exclusions and safe defaults",
            "SmartScreen, reputation-based protection, ASR concept",
            "BitLocker vs Device Encryption and TPM"
          ],
          "richContent": {
            "introduction": "In this lesson (CyberPatriot \u2014 Windows Security Tools), we analyze core defensive techniques from Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection. Follow along with CyberPatriot, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 05"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: CyberPatriot",
                "content": "This lesson covers Windows host and domain security concepts from Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Interpret Microsoft Defender protection and detection status.",
                  "Differentiate endpoint AV and enterprise EDR.",
                  "Explain Windows encryption and safe recovery-key handling."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "In Windows Security, review Virus & threat protection and Firewall & network protection.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Run `Get-MpComputerStatus | Select AntivirusEnabled,RealTimeProtectionEnabled,AntivirusSignatureLastUpdated` on an authorized lab VM.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Trigger a normal Quick Scan in the GUI; record its result without using malware.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Inspect existing `Get-MpThreatDetection` output; zero results is a valid result.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Review encryption capability and read the BitLocker recovery key safety guidance; never include keys or identifiers in portfolio screenshots.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Explain 5 defenses: Defender AV, SmartScreen, UAC, Firewall, and encryption.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Endpoint-protection baseline report",
              "Quick-scan screenshot and detection-history interpretation",
              "Encryption readiness checklist without recovery keys"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 06.",
            "furtherReading": [
              {
                "title": "Microsoft Defender PowerShell cmdlets",
                "url": "https://learn.microsoft.com/en-us/powershell/module/defender/"
              },
              {
                "title": "Get-MpComputerStatus reference",
                "url": "https://learn.microsoft.com/en-us/powershell/module/defender/get-mpcomputerstatus"
              },
              {
                "title": "Microsoft Windows security documentation",
                "url": "https://learn.microsoft.com/windows/security"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m06",
        "title": "Module 06 Hands-on Lab: Windows Defender, SmartScreen, BitLocker and Endpoint Protection",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 06 \u2014 Windows Defender, SmartScreen, BitLocker and Endpoint Protection inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "In Windows Security, review Virus & threat protection and Firewall & network protection.",
          "Run `Get-MpComputerStatus | Select AntivirusEnabled,RealTimeProtectionEnabled,AntivirusSignatureLastUpdated` on an authorized lab VM.",
          "Trigger a normal Quick Scan in the GUI; record its result without using malware.",
          "Inspect existing `Get-MpThreatDetection` output; zero results is a valid result.",
          "Review encryption capability and read the BitLocker recovery key safety guidance; never include keys or identifiers in portfolio screenshots.",
          "Explain 5 defenses: Defender AV, SmartScreen, UAC, Firewall, and encryption."
        ],
        "tasks": [
          {
            "id": "task-winsec-m06-1",
            "description": "In Windows Security, review Virus & threat protection and Firewall & network protection.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m06-2",
            "description": "Run `Get-MpComputerStatus | Select AntivirusEnabled,RealTimeProtectionEnabled,AntivirusSignatureLastUpdated` on an authorized lab VM.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m06-3",
            "description": "Trigger a normal Quick Scan in the GUI; record its result without using malware.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m06-4",
            "description": "Inspect existing `Get-MpThreatDetection` output; zero results is a valid result.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m06-5",
            "description": "Review encryption capability and read the BitLocker recovery key safety guidance; never include keys or identifiers in portfolio screenshots.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m06-6",
            "description": "Explain 5 defenses: Defender AV, SmartScreen, UAC, Firewall, and encryption.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Endpoint-protection baseline report",
          "Quick-scan screenshot and detection-history interpretation",
          "Encryption readiness checklist without recovery keys"
        ]
      },
      "quiz": {
        "title": "Module 06 Knowledge Check: Windows Defender, SmartScreen, BitLocker and Endpoint Protection",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "Are Microsoft Defender Antivirus and Microsoft Defender for Endpoint identical?",
            "options": [
              "Yes, they are the exact same product with different names",
              "No, Defender Antivirus is the built-in local endpoint AV engine, whereas Defender for Endpoint is an enterprise cloud-managed XDR/EDR platform offering centralized hunting, response, and behavioral analysis",
              "Defender Antivirus only runs on Windows 7",
              "Defender for Endpoint is a hardware appliance"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Defender Antivirus is the client-side signature and heuristic engine built into Windows. Defender for Endpoint (MDE) is a licensed cloud-connected EDR suite with live device response, telemetry aggregation, and automated investigation.",
            "difficulty": "intermediate"
          },
          {
            "question": "Why is disabling real-time protection a bad lab habit?",
            "options": [
              "Disabling real-time protection corrupts the Windows registry",
              "It creates unrealistic testing environments, blinds the lab to endpoint detection telemetry, and leaves the host vulnerable to unintended execution",
              "It causes the VM hypervisor to crash",
              "Real-time protection cannot be turned off in Windows"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Turning off protection blinds the analyst to real-world defensive telemetry (Defender operational event IDs, AMSI alerts) and leaves the testing machine unguarded.",
            "difficulty": "intermediate"
          },
          {
            "question": "What is the risk of losing the BitLocker recovery key?",
            "options": [
              "The computer will automatically format the drive on the next reboot",
              "If hardware changes, firmware updates, or TPM resets trigger recovery mode, encrypted volume data becomes permanently inaccessible without the recovery key",
              "Windows will revert to Windows 95",
              "BitLocker recovery keys can always be recovered using CMD"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Without the 48-digit recovery key or password, encrypted volume data cannot be decrypted if the platform configuration registers (PCRs) fail to validate against the TPM.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m07",
      "title": "Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs",
      "description": "Intermediate level. Suggested effort: 10\u201312 hours. Prerequisite: Module 06. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 8,
      "lessons": [
        {
          "id": "les-winsec-m07-l01",
          "slug": "m07-l1-windows-logging-for-soc-analysts",
          "title": "Module 07 - Lesson 1: Windows logging for SOC Analysts \u2014 Windows/Sysmon/PowerShell",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs. Follow in your isolated lab environment.",
          "youtubeVideoId": "svxqs_yvJIk",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs",
          "objectives": [
            "Navigate Security, System, Application and operational event channels.",
            "Interpret common authentication, account and process-creation events.",
            "Enable appropriate auditing inside a lab and export relevant EVTX evidence."
          ],
          "tags": [
            "windows-security",
            "module-07",
            "intermediate"
          ],
          "skillsTaught": [
            "EVTX channels, Event Viewer filters, XML event fields",
            "4624 successful logon, 4625 failed logon, 4634 logoff, 4672 special privileges",
            "4688 process creation when auditing is configured",
            "4720 account created, 4728/4732 membership changes where applicable"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows logging for SOC Analysts \u2014 Windows/Sysmon/PowerShell), we analyze core defensive techniques from Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 06"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows logging for SOC Analysts",
                "content": "This lesson covers Windows host and domain security concepts from Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Navigate Security, System, Application and operational event channels.",
                  "Interpret common authentication, account and process-creation events.",
                  "Enable appropriate auditing inside a lab and export relevant EVTX evidence."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Open Event Viewer (`eventvwr.msc`) and browse Windows Logs > Security (admin rights may be needed).",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Run `auditpol /get /category:*` and record currently enabled auditing subcategories.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Attempt one intentionally incorrect password against your *own lab local user* and look for Event 4625 on the authenticating machine.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Create a successful test logon to compare 4624 and 4625 records; account for logon type and the correct host.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Query `Get-WinEvent -FilterHashtable @{LogName=\"Security\"; Id=4625; StartTime=(Get-Date).AddHours(-4)} -ErrorAction SilentlyContinue`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Export a small event selection (EVTX or CSV) and record Event ID, time, machine, account and why it matters.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`event-id-reference.md` for at least 12 IDs with caveats",
              "1 failed-login mini-case timeline",
              "Sanitized EVTX/CSV export and screenshots"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 07.",
            "furtherReading": [
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m07-l02",
          "slug": "m07-l2-windows-event-logs-explained",
          "title": "Module 07 - Lesson 2: Windows Event Logs explained \u2014 SOC analyst walkthrough",
          "description": "Hands-on Windows security video lesson presented by Gerald Auger / Simply Cyber. Covers critical concepts from Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs. Follow in your isolated lab environment.",
          "youtubeVideoId": "gRbG-8mQce0",
          "videoAttribution": {
            "creator": "Gerald Auger / Simply Cyber",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs",
          "objectives": [
            "Navigate Security, System, Application and operational event channels.",
            "Interpret common authentication, account and process-creation events.",
            "Enable appropriate auditing inside a lab and export relevant EVTX evidence."
          ],
          "tags": [
            "windows-security",
            "module-07",
            "intermediate"
          ],
          "skillsTaught": [
            "EVTX channels, Event Viewer filters, XML event fields",
            "4624 successful logon, 4625 failed logon, 4634 logoff, 4672 special privileges",
            "4688 process creation when auditing is configured",
            "4720 account created, 4728/4732 membership changes where applicable"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows Event Logs explained \u2014 SOC analyst walkthrough), we analyze core defensive techniques from Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs. Follow along with Gerald Auger / Simply Cyber, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 06"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows Event Logs explained",
                "content": "This lesson covers Windows host and domain security concepts from Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Navigate Security, System, Application and operational event channels.",
                  "Interpret common authentication, account and process-creation events.",
                  "Enable appropriate auditing inside a lab and export relevant EVTX evidence."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Open Event Viewer (`eventvwr.msc`) and browse Windows Logs > Security (admin rights may be needed).",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Run `auditpol /get /category:*` and record currently enabled auditing subcategories.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Attempt one intentionally incorrect password against your *own lab local user* and look for Event 4625 on the authenticating machine.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Create a successful test logon to compare 4624 and 4625 records; account for logon type and the correct host.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Query `Get-WinEvent -FilterHashtable @{LogName=\"Security\"; Id=4625; StartTime=(Get-Date).AddHours(-4)} -ErrorAction SilentlyContinue`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Export a small event selection (EVTX or CSV) and record Event ID, time, machine, account and why it matters.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`event-id-reference.md` for at least 12 IDs with caveats",
              "1 failed-login mini-case timeline",
              "Sanitized EVTX/CSV export and screenshots"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 07.",
            "furtherReading": [
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m07-l03",
          "slug": "m07-l3-cyberpatriot",
          "title": "Module 07 - Lesson 3: CyberPatriot \u2014 Windows Security Configuration",
          "description": "Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs. Follow in your isolated lab environment.",
          "youtubeVideoId": "Vvv4LaCAJWQ",
          "videoAttribution": {
            "creator": "CyberPatriot",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs",
          "objectives": [
            "Navigate Security, System, Application and operational event channels.",
            "Interpret common authentication, account and process-creation events.",
            "Enable appropriate auditing inside a lab and export relevant EVTX evidence."
          ],
          "tags": [
            "windows-security",
            "module-07",
            "intermediate"
          ],
          "skillsTaught": [
            "EVTX channels, Event Viewer filters, XML event fields",
            "4624 successful logon, 4625 failed logon, 4634 logoff, 4672 special privileges",
            "4688 process creation when auditing is configured",
            "4720 account created, 4728/4732 membership changes where applicable"
          ],
          "richContent": {
            "introduction": "In this lesson (CyberPatriot \u2014 Windows Security Configuration), we analyze core defensive techniques from Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs. Follow along with CyberPatriot, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 06"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: CyberPatriot",
                "content": "This lesson covers Windows host and domain security concepts from Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Navigate Security, System, Application and operational event channels.",
                  "Interpret common authentication, account and process-creation events.",
                  "Enable appropriate auditing inside a lab and export relevant EVTX evidence."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Open Event Viewer (`eventvwr.msc`) and browse Windows Logs > Security (admin rights may be needed).",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Run `auditpol /get /category:*` and record currently enabled auditing subcategories.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Attempt one intentionally incorrect password against your *own lab local user* and look for Event 4625 on the authenticating machine.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Create a successful test logon to compare 4624 and 4625 records; account for logon type and the correct host.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Query `Get-WinEvent -FilterHashtable @{LogName=\"Security\"; Id=4625; StartTime=(Get-Date).AddHours(-4)} -ErrorAction SilentlyContinue`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Export a small event selection (EVTX or CSV) and record Event ID, time, machine, account and why it matters.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`event-id-reference.md` for at least 12 IDs with caveats",
              "1 failed-login mini-case timeline",
              "Sanitized EVTX/CSV export and screenshots"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 07.",
            "furtherReading": [
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m07",
        "title": "Module 07 Hands-on Lab: Windows Event Viewer, Audit Policy and SOC Event IDs",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 07 \u2014 Windows Event Viewer, Audit Policy and SOC Event IDs inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Open Event Viewer (`eventvwr.msc`) and browse Windows Logs > Security (admin rights may be needed).",
          "Run `auditpol /get /category:*` and record currently enabled auditing subcategories.",
          "Attempt one intentionally incorrect password against your *own lab local user* and look for Event 4625 on the authenticating machine.",
          "Create a successful test logon to compare 4624 and 4625 records; account for logon type and the correct host.",
          "Query `Get-WinEvent -FilterHashtable @{LogName=\"Security\"; Id=4625; StartTime=(Get-Date).AddHours(-4)} -ErrorAction SilentlyContinue`.",
          "Export a small event selection (EVTX or CSV) and record Event ID, time, machine, account and why it matters."
        ],
        "tasks": [
          {
            "id": "task-winsec-m07-1",
            "description": "Open Event Viewer (`eventvwr.msc`) and browse Windows Logs > Security (admin rights may be needed).",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m07-2",
            "description": "Run `auditpol /get /category:*` and record currently enabled auditing subcategories.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m07-3",
            "description": "Attempt one intentionally incorrect password against your *own lab local user* and look for Event 4625 on the authenticating machine.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m07-4",
            "description": "Create a successful test logon to compare 4624 and 4625 records; account for logon type and the correct host.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m07-5",
            "description": "Query `Get-WinEvent -FilterHashtable @{LogName=\"Security\"; Id=4625; StartTime=(Get-Date).AddHours(-4)} -ErrorAction SilentlyContinue`.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m07-6",
            "description": "Export a small event selection (EVTX or CSV) and record Event ID, time, machine, account and why it matters.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "`event-id-reference.md` for at least 12 IDs with caveats",
          "1 failed-login mini-case timeline",
          "Sanitized EVTX/CSV export and screenshots"
        ]
      },
      "quiz": {
        "title": "Module 07 Knowledge Check: Windows Event Viewer, Audit Policy and SOC Event IDs",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "Does the absence of Event 4688 prove that no process was created?",
            "options": [
              "Yes, Event 4688 is always logged by default on every Windows edition",
              "No, process creation auditing must be explicitly enabled in audit policy; without it, processes spawn without generating Event 4688",
              "Yes, Windows Event Viewer cannot miss events",
              "No, but only if the user logged out first"
            ],
            "correctAnswerIndex": 1,
            "explanation": "In standard Windows default configurations, Detailed Tracking > Audit Process Creation is not enabled, meaning process executions occur silently without emitting Event 4688.",
            "difficulty": "intermediate"
          },
          {
            "question": "What is the significance of logon type for Event 4624?",
            "options": [
              "It indicates the physical screen resolution of the monitor",
              "It reveals how the session was established (e.g., Type 2 for Interactive, Type 3 for Network, Type 10 for RemoteInteractive/RDP), critical for scoping lateral movement vs physical console access",
              "It indicates the version of PowerShell used",
              "It determines whether the account is disabled"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Logon types indicate the authentication mechanism: Type 2 is local interactive, Type 3 is network (SMB/RPC), Type 5 is service, and Type 10 is Remote Desktop (RDP), pinpointing how an attacker accessed the machine.",
            "difficulty": "intermediate"
          },
          {
            "question": "Where does local vs domain authentication get logged?",
            "options": [
              "Domain logons are recorded on Domain Controllers (and local ticket interactions on clients), while local account authentication is recorded solely in the local machine's Security event log",
              "All authentication events are sent to Microsoft Azure automatically",
              "Local logons are only logged in System.evtx",
              "Domain logons are never recorded in EVTX files"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Local accounts authenticate against the local SAM database and log to the endpoint's Security.evtx. Domain accounts authenticate against Active Directory Domain Controllers, which record Kerberos/NTLM authentication events.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m08",
      "title": "Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry",
      "description": "Intermediate level. Suggested effort: 10\u201312 hours. Prerequisite: Module 07. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 9,
      "lessons": [
        {
          "id": "les-winsec-m08-l01",
          "slug": "m08-l1-trustedsec-sysmon-1",
          "title": "Module 08 - Lesson 1: TrustedSec Sysmon 1 \u2014 What is Sysmon?",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Follow in your isolated lab environment.",
          "youtubeVideoId": "kESndPO5Fig",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry",
          "objectives": [
            "Explain native Windows auditing vs Sysmon telemetry.",
            "Install/configure Sysmon using an approach supported by your OS version.",
            "Analyze Sysmon process and network events from safe activities."
          ],
          "tags": [
            "windows-security",
            "module-08",
            "intermediate"
          ],
          "skillsTaught": [
            "Sysmon 1 process creation, 3 network connections (configuration-dependent)",
            "DNS, registry and file operation telemetry",
            "Sysmon XML configurations, exclusions and event noise",
            "Operational channel"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 1 \u2014 What is Sysmon?), we analyze core defensive techniques from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 07"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 1",
                "content": "This lesson covers Windows host and domain security concepts from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain native Windows auditing vs Sysmon telemetry.",
                  "Install/configure Sysmon using an approach supported by your OS version.",
                  "Analyze Sysmon process and network events from safe activities."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take a VM snapshot; review Microsoft documentation for your exact build and choose **one** Sysmon installation method only.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Review whether a Sysmon service already exists with `Get-Service sysmon* -ErrorAction SilentlyContinue`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Install/enable a supported Sysmon configuration in the VM using documented steps; never run unknown configs without reading them.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Open `Applications and Services Logs > Microsoft > Windows > Sysmon > Operational`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Launch Notepad and PowerShell intentionally; locate process creation events and compare command lines, parent image and process GUID.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Perform a harmless browser request to a trusted site; check if your chosen config records event 3 or DNS events; absence may be expected.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Sysmon deployment notes and config filename/hash",
              "3 sanitized Sysmon process-event records",
              "A 1-page comparison: native event IDs 4688 vs Sysmon 1"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 08.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 How to enable and configure Sysmon",
                "url": "https://learn.microsoft.com/windows/security/operating-system-security/sysmon/how-to-enable-sysmon"
              },
              {
                "title": "SwiftOnSecurity Sysmon config example",
                "url": "https://github.com/SwiftOnSecurity/sysmon-config"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m08-l02",
          "slug": "m08-l2-trustedsec-sysmon-2",
          "title": "Module 08 - Lesson 2: TrustedSec Sysmon 2 \u2014 Installation",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Follow in your isolated lab environment.",
          "youtubeVideoId": "MlGc44dfFBg",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry",
          "objectives": [
            "Explain native Windows auditing vs Sysmon telemetry.",
            "Install/configure Sysmon using an approach supported by your OS version.",
            "Analyze Sysmon process and network events from safe activities."
          ],
          "tags": [
            "windows-security",
            "module-08",
            "intermediate"
          ],
          "skillsTaught": [
            "Sysmon 1 process creation, 3 network connections (configuration-dependent)",
            "DNS, registry and file operation telemetry",
            "Sysmon XML configurations, exclusions and event noise",
            "Operational channel"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 2 \u2014 Installation), we analyze core defensive techniques from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 07"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 2",
                "content": "This lesson covers Windows host and domain security concepts from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain native Windows auditing vs Sysmon telemetry.",
                  "Install/configure Sysmon using an approach supported by your OS version.",
                  "Analyze Sysmon process and network events from safe activities."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take a VM snapshot; review Microsoft documentation for your exact build and choose **one** Sysmon installation method only.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Review whether a Sysmon service already exists with `Get-Service sysmon* -ErrorAction SilentlyContinue`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Install/enable a supported Sysmon configuration in the VM using documented steps; never run unknown configs without reading them.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Open `Applications and Services Logs > Microsoft > Windows > Sysmon > Operational`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Launch Notepad and PowerShell intentionally; locate process creation events and compare command lines, parent image and process GUID.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Perform a harmless browser request to a trusted site; check if your chosen config records event 3 or DNS events; absence may be expected.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Sysmon deployment notes and config filename/hash",
              "3 sanitized Sysmon process-event records",
              "A 1-page comparison: native event IDs 4688 vs Sysmon 1"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 08.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 How to enable and configure Sysmon",
                "url": "https://learn.microsoft.com/windows/security/operating-system-security/sysmon/how-to-enable-sysmon"
              },
              {
                "title": "SwiftOnSecurity Sysmon config example",
                "url": "https://github.com/SwiftOnSecurity/sysmon-config"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m08-l03",
          "slug": "m08-l3-trustedsec-sysmon-4",
          "title": "Module 08 - Lesson 3: TrustedSec Sysmon 4 \u2014 Configuration file",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Follow in your isolated lab environment.",
          "youtubeVideoId": "VKVSedPGDgY",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry",
          "objectives": [
            "Explain native Windows auditing vs Sysmon telemetry.",
            "Install/configure Sysmon using an approach supported by your OS version.",
            "Analyze Sysmon process and network events from safe activities."
          ],
          "tags": [
            "windows-security",
            "module-08",
            "intermediate"
          ],
          "skillsTaught": [
            "Sysmon 1 process creation, 3 network connections (configuration-dependent)",
            "DNS, registry and file operation telemetry",
            "Sysmon XML configurations, exclusions and event noise",
            "Operational channel"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 4 \u2014 Configuration file), we analyze core defensive techniques from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 07"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 4",
                "content": "This lesson covers Windows host and domain security concepts from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain native Windows auditing vs Sysmon telemetry.",
                  "Install/configure Sysmon using an approach supported by your OS version.",
                  "Analyze Sysmon process and network events from safe activities."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take a VM snapshot; review Microsoft documentation for your exact build and choose **one** Sysmon installation method only.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Review whether a Sysmon service already exists with `Get-Service sysmon* -ErrorAction SilentlyContinue`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Install/enable a supported Sysmon configuration in the VM using documented steps; never run unknown configs without reading them.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Open `Applications and Services Logs > Microsoft > Windows > Sysmon > Operational`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Launch Notepad and PowerShell intentionally; locate process creation events and compare command lines, parent image and process GUID.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Perform a harmless browser request to a trusted site; check if your chosen config records event 3 or DNS events; absence may be expected.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Sysmon deployment notes and config filename/hash",
              "3 sanitized Sysmon process-event records",
              "A 1-page comparison: native event IDs 4688 vs Sysmon 1"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 08.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 How to enable and configure Sysmon",
                "url": "https://learn.microsoft.com/windows/security/operating-system-security/sysmon/how-to-enable-sysmon"
              },
              {
                "title": "SwiftOnSecurity Sysmon config example",
                "url": "https://github.com/SwiftOnSecurity/sysmon-config"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m08-l04",
          "slug": "m08-l4-trustedsec-sysmon-5",
          "title": "Module 08 - Lesson 4: TrustedSec Sysmon 5 \u2014 Rule/filter order",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Follow in your isolated lab environment.",
          "youtubeVideoId": "KBsEAaZFcyI",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry",
          "objectives": [
            "Explain native Windows auditing vs Sysmon telemetry.",
            "Install/configure Sysmon using an approach supported by your OS version.",
            "Analyze Sysmon process and network events from safe activities."
          ],
          "tags": [
            "windows-security",
            "module-08",
            "intermediate"
          ],
          "skillsTaught": [
            "Sysmon 1 process creation, 3 network connections (configuration-dependent)",
            "DNS, registry and file operation telemetry",
            "Sysmon XML configurations, exclusions and event noise",
            "Operational channel"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 5 \u2014 Rule/filter order), we analyze core defensive techniques from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 07"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 5",
                "content": "This lesson covers Windows host and domain security concepts from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain native Windows auditing vs Sysmon telemetry.",
                  "Install/configure Sysmon using an approach supported by your OS version.",
                  "Analyze Sysmon process and network events from safe activities."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take a VM snapshot; review Microsoft documentation for your exact build and choose **one** Sysmon installation method only.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Review whether a Sysmon service already exists with `Get-Service sysmon* -ErrorAction SilentlyContinue`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Install/enable a supported Sysmon configuration in the VM using documented steps; never run unknown configs without reading them.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Open `Applications and Services Logs > Microsoft > Windows > Sysmon > Operational`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Launch Notepad and PowerShell intentionally; locate process creation events and compare command lines, parent image and process GUID.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Perform a harmless browser request to a trusted site; check if your chosen config records event 3 or DNS events; absence may be expected.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Sysmon deployment notes and config filename/hash",
              "3 sanitized Sysmon process-event records",
              "A 1-page comparison: native event IDs 4688 vs Sysmon 1"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 08.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 How to enable and configure Sysmon",
                "url": "https://learn.microsoft.com/windows/security/operating-system-security/sysmon/how-to-enable-sysmon"
              },
              {
                "title": "SwiftOnSecurity Sysmon config example",
                "url": "https://github.com/SwiftOnSecurity/sysmon-config"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m08-l05",
          "slug": "m08-l5-trustedsec-sysmon-6",
          "title": "Module 08 - Lesson 5: TrustedSec Sysmon 6 \u2014 Process tracking",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Follow in your isolated lab environment.",
          "youtubeVideoId": "46-alN2_vlo",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 5,
          "moduleTitle": "Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry",
          "objectives": [
            "Explain native Windows auditing vs Sysmon telemetry.",
            "Install/configure Sysmon using an approach supported by your OS version.",
            "Analyze Sysmon process and network events from safe activities."
          ],
          "tags": [
            "windows-security",
            "module-08",
            "intermediate"
          ],
          "skillsTaught": [
            "Sysmon 1 process creation, 3 network connections (configuration-dependent)",
            "DNS, registry and file operation telemetry",
            "Sysmon XML configurations, exclusions and event noise",
            "Operational channel"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 6 \u2014 Process tracking), we analyze core defensive techniques from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 07"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 6",
                "content": "This lesson covers Windows host and domain security concepts from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain native Windows auditing vs Sysmon telemetry.",
                  "Install/configure Sysmon using an approach supported by your OS version.",
                  "Analyze Sysmon process and network events from safe activities."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take a VM snapshot; review Microsoft documentation for your exact build and choose **one** Sysmon installation method only.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Review whether a Sysmon service already exists with `Get-Service sysmon* -ErrorAction SilentlyContinue`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Install/enable a supported Sysmon configuration in the VM using documented steps; never run unknown configs without reading them.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Open `Applications and Services Logs > Microsoft > Windows > Sysmon > Operational`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Launch Notepad and PowerShell intentionally; locate process creation events and compare command lines, parent image and process GUID.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Perform a harmless browser request to a trusted site; check if your chosen config records event 3 or DNS events; absence may be expected.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Sysmon deployment notes and config filename/hash",
              "3 sanitized Sysmon process-event records",
              "A 1-page comparison: native event IDs 4688 vs Sysmon 1"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 08.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 How to enable and configure Sysmon",
                "url": "https://learn.microsoft.com/windows/security/operating-system-security/sysmon/how-to-enable-sysmon"
              },
              {
                "title": "SwiftOnSecurity Sysmon config example",
                "url": "https://github.com/SwiftOnSecurity/sysmon-config"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m08-l06",
          "slug": "m08-l6-trustedsec-sysmon-8",
          "title": "Module 08 - Lesson 6: TrustedSec Sysmon 8 \u2014 Network connections",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Follow in your isolated lab environment.",
          "youtubeVideoId": "y4cpuliY4dk",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 6,
          "moduleTitle": "Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry",
          "objectives": [
            "Explain native Windows auditing vs Sysmon telemetry.",
            "Install/configure Sysmon using an approach supported by your OS version.",
            "Analyze Sysmon process and network events from safe activities."
          ],
          "tags": [
            "windows-security",
            "module-08",
            "intermediate"
          ],
          "skillsTaught": [
            "Sysmon 1 process creation, 3 network connections (configuration-dependent)",
            "DNS, registry and file operation telemetry",
            "Sysmon XML configurations, exclusions and event noise",
            "Operational channel"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 8 \u2014 Network connections), we analyze core defensive techniques from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 07"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 8",
                "content": "This lesson covers Windows host and domain security concepts from Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain native Windows auditing vs Sysmon telemetry.",
                  "Install/configure Sysmon using an approach supported by your OS version.",
                  "Analyze Sysmon process and network events from safe activities."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take a VM snapshot; review Microsoft documentation for your exact build and choose **one** Sysmon installation method only.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Review whether a Sysmon service already exists with `Get-Service sysmon* -ErrorAction SilentlyContinue`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Install/enable a supported Sysmon configuration in the VM using documented steps; never run unknown configs without reading them.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Open `Applications and Services Logs > Microsoft > Windows > Sysmon > Operational`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Launch Notepad and PowerShell intentionally; locate process creation events and compare command lines, parent image and process GUID.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Perform a harmless browser request to a trusted site; check if your chosen config records event 3 or DNS events; absence may be expected.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Sysmon deployment notes and config filename/hash",
              "3 sanitized Sysmon process-event records",
              "A 1-page comparison: native event IDs 4688 vs Sysmon 1"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 08.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 How to enable and configure Sysmon",
                "url": "https://learn.microsoft.com/windows/security/operating-system-security/sysmon/how-to-enable-sysmon"
              },
              {
                "title": "SwiftOnSecurity Sysmon config example",
                "url": "https://github.com/SwiftOnSecurity/sysmon-config"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m08",
        "title": "Module 08 Hands-on Lab: Sysmon Installation, Configuration and Security Telemetry",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 08 \u2014 Sysmon Installation, Configuration and Security Telemetry inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Take a VM snapshot; review Microsoft documentation for your exact build and choose **one** Sysmon installation method only.",
          "Review whether a Sysmon service already exists with `Get-Service sysmon* -ErrorAction SilentlyContinue`.",
          "Install/enable a supported Sysmon configuration in the VM using documented steps; never run unknown configs without reading them.",
          "Open `Applications and Services Logs > Microsoft > Windows > Sysmon > Operational`.",
          "Launch Notepad and PowerShell intentionally; locate process creation events and compare command lines, parent image and process GUID.",
          "Perform a harmless browser request to a trusted site; check if your chosen config records event 3 or DNS events; absence may be expected.",
          "Describe noise reduction and list what your config excludes."
        ],
        "tasks": [
          {
            "id": "task-winsec-m08-1",
            "description": "Take a VM snapshot; review Microsoft documentation for your exact build and choose **one** Sysmon installation method only.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m08-2",
            "description": "Review whether a Sysmon service already exists with `Get-Service sysmon* -ErrorAction SilentlyContinue`.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m08-3",
            "description": "Install/enable a supported Sysmon configuration in the VM using documented steps; never run unknown configs without reading them.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m08-4",
            "description": "Open `Applications and Services Logs > Microsoft > Windows > Sysmon > Operational`.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m08-5",
            "description": "Launch Notepad and PowerShell intentionally; locate process creation events and compare command lines, parent image and process GUID.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m08-6",
            "description": "Perform a harmless browser request to a trusted site; check if your chosen config records event 3 or DNS events; absence may be expected.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Sysmon deployment notes and config filename/hash",
          "3 sanitized Sysmon process-event records",
          "A 1-page comparison: native event IDs 4688 vs Sysmon 1"
        ]
      },
      "quiz": {
        "title": "Module 08 Knowledge Check: Sysmon Installation, Configuration and Security Telemetry",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "Does Sysmon itself block malicious actions?",
            "options": [
              "Yes, Sysmon is an endpoint prevention and blocking tool",
              "No, Sysmon is a host-level telemetry collection driver and service that logs detailed system activity to the event log; it does not block actions",
              "Sysmon blocks network traffic but allows processes",
              "Sysmon quarantines malicious files automatically"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Sysmon is an auditing and observability tool. It monitors system activity and writes rich events into the Microsoft-Windows-Sysmon/Operational log channel; it is not an antivirus or EDR blocking engine.",
            "difficulty": "intermediate"
          },
          {
            "question": "Why might a configured Sysmon installation record no Event 3 (Network Connection) events?",
            "options": [
              "Sysmon does not support network monitoring on Windows 11",
              "Event 3 generation depends on the active XML configuration; if network connection logging is disabled or heavily filtered to prevent log volume saturation, benign connections will not be logged",
              "Event 3 only logs incoming ICMP pings",
              "Sysmon requires a third-party NIC driver for network logs"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Sysmon operates strictly according to its XML configuration schema. Many production configurations filter out or exclude Event 3 entirely due to the extreme volume of network packets generated by modern browsers.",
            "difficulty": "intermediate"
          },
          {
            "question": "What fields help link a child process to its parent in Sysmon Event 1?",
            "options": [
              "MAC address and IPv6 gateway",
              "ProcessGuid, ParentProcessGuid, ProcessId, and ParentProcessId",
              "Screen coordinates and window handle",
              "System uptime and BIOS serial number"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Sysmon generates unique GUIDs (ProcessGuid and ParentProcessGuid) alongside OS PIDs to disambiguate process lineage, preventing PID reuse confusion across reboots or long running sessions.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m09",
      "title": "Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging",
      "description": "Intermediate level. Suggested effort: 9\u201311 hours. Prerequisite: Module 08. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 10,
      "lessons": [
        {
          "id": "les-winsec-m09-l01",
          "slug": "m09-l1-powershell-full-course",
          "title": "Module 09 - Lesson 1: PowerShell Full Course \u2014 Beginner to scripting (5 hours)",
          "description": "Hands-on Windows security video lesson presented by freeCodeCamp. Covers critical concepts from Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging. Follow in your isolated lab environment.",
          "youtubeVideoId": "ueKFupiT2wA",
          "videoAttribution": {
            "creator": "freeCodeCamp",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging",
          "objectives": [
            "Build read-only Windows inventory scripts for the SOC.",
            "Understand script-block logging, module logging, AMSI and remoting safeguards.",
            "Recognize suspicious PowerShell execution patterns from logs without reproducing payloads."
          ],
          "tags": [
            "windows-security",
            "module-09",
            "intermediate"
          ],
          "skillsTaught": [
            "PowerShell objects, functions, exceptions and constrained output",
            "Security Event 4688, PowerShell Operational 4104 if configured",
            "Script Block Logging, module logging and event collection privacy",
            "AMSI protection overview and code signing concepts"
          ],
          "richContent": {
            "introduction": "In this lesson (PowerShell Full Course \u2014 Beginner to scripting (5 hours)), we analyze core defensive techniques from Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging. Follow along with freeCodeCamp, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 08"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: PowerShell Full Course",
                "content": "This lesson covers Windows host and domain security concepts from Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Build read-only Windows inventory scripts for the SOC.",
                  "Understand script-block logging, module logging, AMSI and remoting safeguards.",
                  "Recognize suspicious PowerShell execution patterns from logs without reproducing payloads."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Write `Get-SOCLabInventory.ps1` that reads hostname, OS version, active firewall profiles and 10 processes.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Avoid accepting untrusted input as code, and do not use `Invoke-Expression` in this project.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Export inventory as timestamped CSV under `C:\\SOC-Lab\\exports`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Enable script-block logging in the VM only by following Microsoft policy documentation, then generate a benign command in PowerShell.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Inspect `Microsoft-Windows-PowerShell/Operational` for 4104 where enabled and compare with Security/Sysmon traces.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a short note explaining why an encoded command or unusual parent process may be worth triage but is not proof by itself.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`Get-SOCLabInventory.ps1` source with comments",
              "Sanitized inventory CSV and demonstration screenshot",
              "PowerShell logging evidence map"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 09.",
            "furtherReading": [
              {
                "title": "Microsoft Learn \u2014 Get started with Windows PowerShell",
                "url": "https://learn.microsoft.com/en-us/training/paths/get-started-windows-powershell/"
              },
              {
                "title": "PowerShell security features / AMSI / application control",
                "url": "https://learn.microsoft.com/en-us/powershell/scripting/security/security-features"
              },
              {
                "title": "Microsoft Learn \u2014 Windows PowerShell remoting",
                "url": "https://learn.microsoft.com/en-us/training/paths/administer-remote-computers-use-windows-powershell/"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m09-l02",
          "slug": "m09-l2-windows-logging-for-soc-analysts",
          "title": "Module 09 - Lesson 2: Windows logging for SOC Analysts \u2014 Windows/Sysmon/PowerShell",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging. Follow in your isolated lab environment.",
          "youtubeVideoId": "svxqs_yvJIk",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging",
          "objectives": [
            "Build read-only Windows inventory scripts for the SOC.",
            "Understand script-block logging, module logging, AMSI and remoting safeguards.",
            "Recognize suspicious PowerShell execution patterns from logs without reproducing payloads."
          ],
          "tags": [
            "windows-security",
            "module-09",
            "intermediate"
          ],
          "skillsTaught": [
            "PowerShell objects, functions, exceptions and constrained output",
            "Security Event 4688, PowerShell Operational 4104 if configured",
            "Script Block Logging, module logging and event collection privacy",
            "AMSI protection overview and code signing concepts"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows logging for SOC Analysts \u2014 Windows/Sysmon/PowerShell), we analyze core defensive techniques from Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 08"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows logging for SOC Analysts",
                "content": "This lesson covers Windows host and domain security concepts from Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Build read-only Windows inventory scripts for the SOC.",
                  "Understand script-block logging, module logging, AMSI and remoting safeguards.",
                  "Recognize suspicious PowerShell execution patterns from logs without reproducing payloads."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Write `Get-SOCLabInventory.ps1` that reads hostname, OS version, active firewall profiles and 10 processes.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Avoid accepting untrusted input as code, and do not use `Invoke-Expression` in this project.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Export inventory as timestamped CSV under `C:\\SOC-Lab\\exports`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Enable script-block logging in the VM only by following Microsoft policy documentation, then generate a benign command in PowerShell.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Inspect `Microsoft-Windows-PowerShell/Operational` for 4104 where enabled and compare with Security/Sysmon traces.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a short note explaining why an encoded command or unusual parent process may be worth triage but is not proof by itself.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`Get-SOCLabInventory.ps1` source with comments",
              "Sanitized inventory CSV and demonstration screenshot",
              "PowerShell logging evidence map"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 09.",
            "furtherReading": [
              {
                "title": "Microsoft Learn \u2014 Get started with Windows PowerShell",
                "url": "https://learn.microsoft.com/en-us/training/paths/get-started-windows-powershell/"
              },
              {
                "title": "PowerShell security features / AMSI / application control",
                "url": "https://learn.microsoft.com/en-us/powershell/scripting/security/security-features"
              },
              {
                "title": "Microsoft Learn \u2014 Windows PowerShell remoting",
                "url": "https://learn.microsoft.com/en-us/training/paths/administer-remote-computers-use-windows-powershell/"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m09-l03",
          "slug": "m09-l3-trustedsec-sysmon-6",
          "title": "Module 09 - Lesson 3: TrustedSec Sysmon 6 \u2014 Process tracking",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging. Follow in your isolated lab environment.",
          "youtubeVideoId": "46-alN2_vlo",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging",
          "objectives": [
            "Build read-only Windows inventory scripts for the SOC.",
            "Understand script-block logging, module logging, AMSI and remoting safeguards.",
            "Recognize suspicious PowerShell execution patterns from logs without reproducing payloads."
          ],
          "tags": [
            "windows-security",
            "module-09",
            "intermediate"
          ],
          "skillsTaught": [
            "PowerShell objects, functions, exceptions and constrained output",
            "Security Event 4688, PowerShell Operational 4104 if configured",
            "Script Block Logging, module logging and event collection privacy",
            "AMSI protection overview and code signing concepts"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 6 \u2014 Process tracking), we analyze core defensive techniques from Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 08"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 6",
                "content": "This lesson covers Windows host and domain security concepts from Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Build read-only Windows inventory scripts for the SOC.",
                  "Understand script-block logging, module logging, AMSI and remoting safeguards.",
                  "Recognize suspicious PowerShell execution patterns from logs without reproducing payloads."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Write `Get-SOCLabInventory.ps1` that reads hostname, OS version, active firewall profiles and 10 processes.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Avoid accepting untrusted input as code, and do not use `Invoke-Expression` in this project.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Export inventory as timestamped CSV under `C:\\SOC-Lab\\exports`.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Enable script-block logging in the VM only by following Microsoft policy documentation, then generate a benign command in PowerShell.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Inspect `Microsoft-Windows-PowerShell/Operational` for 4104 where enabled and compare with Security/Sysmon traces.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a short note explaining why an encoded command or unusual parent process may be worth triage but is not proof by itself.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`Get-SOCLabInventory.ps1` source with comments",
              "Sanitized inventory CSV and demonstration screenshot",
              "PowerShell logging evidence map"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 09.",
            "furtherReading": [
              {
                "title": "Microsoft Learn \u2014 Get started with Windows PowerShell",
                "url": "https://learn.microsoft.com/en-us/training/paths/get-started-windows-powershell/"
              },
              {
                "title": "PowerShell security features / AMSI / application control",
                "url": "https://learn.microsoft.com/en-us/powershell/scripting/security/security-features"
              },
              {
                "title": "Microsoft Learn \u2014 Windows PowerShell remoting",
                "url": "https://learn.microsoft.com/en-us/training/paths/administer-remote-computers-use-windows-powershell/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m09",
        "title": "Module 09 Hands-on Lab: PowerShell Security, Safe Automation and Script Logging",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 09 \u2014 PowerShell Security, Safe Automation and Script Logging inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Write `Get-SOCLabInventory.ps1` that reads hostname, OS version, active firewall profiles and 10 processes.",
          "Avoid accepting untrusted input as code, and do not use `Invoke-Expression` in this project.",
          "Export inventory as timestamped CSV under `C:\\SOC-Lab\\exports`.",
          "Enable script-block logging in the VM only by following Microsoft policy documentation, then generate a benign command in PowerShell.",
          "Inspect `Microsoft-Windows-PowerShell/Operational` for 4104 where enabled and compare with Security/Sysmon traces.",
          "Write a short note explaining why an encoded command or unusual parent process may be worth triage but is not proof by itself."
        ],
        "tasks": [
          {
            "id": "task-winsec-m09-1",
            "description": "Write `Get-SOCLabInventory.ps1` that reads hostname, OS version, active firewall profiles and 10 processes.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m09-2",
            "description": "Avoid accepting untrusted input as code, and do not use `Invoke-Expression` in this project.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m09-3",
            "description": "Export inventory as timestamped CSV under `C:\\SOC-Lab\\exports`.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m09-4",
            "description": "Enable script-block logging in the VM only by following Microsoft policy documentation, then generate a benign command in PowerShell.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m09-5",
            "description": "Inspect `Microsoft-Windows-PowerShell/Operational` for 4104 where enabled and compare with Security/Sysmon traces.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m09-6",
            "description": "Write a short note explaining why an encoded command or unusual parent process may be worth triage but is not proof by itself.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "`Get-SOCLabInventory.ps1` source with comments",
          "Sanitized inventory CSV and demonstration screenshot",
          "PowerShell logging evidence map"
        ]
      },
      "quiz": {
        "title": "Module 09 Knowledge Check: PowerShell Security, Safe Automation and Script Logging",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the Antimalware Scan Interface (AMSI)?",
            "options": [
              "A hardware firewall integrated into the motherboard",
              "An interface standard allowing applications and script hosts (like PowerShell) to integrate with the installed antivirus product to inspect content and dynamic buffers in memory before execution",
              "A PowerShell module for downloading files from GitHub",
              "An encryption algorithm for securing scripts on disk"
            ],
            "correctAnswerIndex": 1,
            "explanation": "AMSI is a vendor-agnostic API that allows script engines (PowerShell, VBScript, JScript, .NET) to submit de-obfuscated buffers and in-memory scripts to antivirus engines before execution.",
            "difficulty": "intermediate"
          },
          {
            "question": "Why is PowerShell execution policy not considered a robust security boundary?",
            "options": [
              "Execution policy is easily bypassed by command-line parameters (e.g., -ExecutionPolicy Bypass), encoded commands, or piping scripts to stdin; it is designed to prevent accidental execution, not malicious intent",
              "Execution policy only applies to Python scripts",
              "Execution policy can only be set by Domain Admins",
              "Execution policy is disabled permanently in Windows 11"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Microsoft explicitly documents that execution policy is a safety convenience to prevent users from accidentally double-clicking unvetted scripts, not an enforceable security boundary.",
            "difficulty": "intermediate"
          },
          {
            "question": "How do Script Block logs (Event 4104) differ from Process Creation logs (Event 4688)?",
            "options": [
              "Event 4688 captures the process binary and initial command line, whereas Event 4104 records the actual decoded script code and dynamically executed blocks within the PowerShell runspace",
              "Event 4104 only logs failed commands",
              "Event 4688 only logs when an error occurs",
              "They are completely identical logs written to two different channels"
            ],
            "correctAnswerIndex": 0,
            "explanation": "While 4688 captures the initial arguments passed to powershell.exe, Event 4104 captures the full script content, including decoded chunks of obfuscated commands executed dynamically.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m10",
      "title": "Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals",
      "description": "Intermediate level. Suggested effort: 10\u201312 hours. Prerequisite: Module 09. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 11,
      "lessons": [
        {
          "id": "les-winsec-m10-l01",
          "slug": "m10-l1-windows-server-2025",
          "title": "Module 10 - Lesson 1: Windows Server 2025 \u2014 AD, DNS, domain join walkthrough",
          "description": "Hands-on Windows security video lesson presented by Travis Roberts. Covers critical concepts from Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals. Follow in your isolated lab environment.",
          "youtubeVideoId": "Gt12Q1jB1s8",
          "videoAttribution": {
            "creator": "Travis Roberts",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals",
          "objectives": [
            "Explain the domain controller, AD DS, OU, group and DNS relationship.",
            "Create a private lab domain using legitimate Windows Server evaluation software.",
            "Join a Windows client to a training domain when edition supports it."
          ],
          "tags": [
            "windows-security",
            "module-10",
            "intermediate"
          ],
          "skillsTaught": [
            "Windows Server evaluation, roles and services",
            "Active Directory Domain Services and domain controller responsibilities",
            "Forests, domains, OUs, users, computer objects and groups",
            "DNS requirements, domain join, domain vs local accounts"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows Server 2025 \u2014 AD, DNS, domain join walkthrough), we analyze core defensive techniques from Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals. Follow along with Travis Roberts, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 09"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows Server 2025",
                "content": "This lesson covers Windows host and domain security concepts from Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain the domain controller, AD DS, OU, group and DNS relationship.",
                  "Create a private lab domain using legitimate Windows Server evaluation software.",
                  "Join a Windows client to a training domain when edition supports it."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Assess hardware capacity: DC plus client can require substantial RAM; a single-VM alternative is reading/video plus screenshots if unavailable.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Download Windows Server evaluation from Microsoft and install a new isolated Server VM.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Configure a host-only/private virtual switch for DC + client; **no bridged AD lab**.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Follow the video to install AD DS and create training domain `lab.example.test` (use only a name you control or reserved for testing).",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create a standard test user and one OU; record group membership and default group posture.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "If your Windows client edition allows domain join, join it to the training domain and verify DNS resolution.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Lab topology with names/IP ranges but no passwords",
              "Screenshots of AD users, OUs and client domain membership",
              "One-page glossary of 15 Active Directory terms"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 10.",
            "furtherReading": [
              {
                "title": "Microsoft Windows Server 2025 evaluation",
                "url": "https://www.microsoft.com/en-us/evalcenter/download-windows-server-2025"
              },
              {
                "title": "Microsoft Learn \u2014 Secure Windows Server Infrastructure",
                "url": "https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m10-l02",
          "slug": "m10-l2-install-active-directory-on-windows-server-2025",
          "title": "Module 10 - Lesson 2: Install Active Directory on Windows Server 2025",
          "description": "Hands-on Windows security video lesson presented by Travis Roberts. Covers critical concepts from Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals. Follow in your isolated lab environment.",
          "youtubeVideoId": "TYfswI9phv0",
          "videoAttribution": {
            "creator": "Travis Roberts",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals",
          "objectives": [
            "Explain the domain controller, AD DS, OU, group and DNS relationship.",
            "Create a private lab domain using legitimate Windows Server evaluation software.",
            "Join a Windows client to a training domain when edition supports it."
          ],
          "tags": [
            "windows-security",
            "module-10",
            "intermediate"
          ],
          "skillsTaught": [
            "Windows Server evaluation, roles and services",
            "Active Directory Domain Services and domain controller responsibilities",
            "Forests, domains, OUs, users, computer objects and groups",
            "DNS requirements, domain join, domain vs local accounts"
          ],
          "richContent": {
            "introduction": "In this lesson (Install Active Directory on Windows Server 2025), we analyze core defensive techniques from Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals. Follow along with Travis Roberts, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 09"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Install Active Directory on Windows Server 2025",
                "content": "This lesson covers Windows host and domain security concepts from Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain the domain controller, AD DS, OU, group and DNS relationship.",
                  "Create a private lab domain using legitimate Windows Server evaluation software.",
                  "Join a Windows client to a training domain when edition supports it."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Assess hardware capacity: DC plus client can require substantial RAM; a single-VM alternative is reading/video plus screenshots if unavailable.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Download Windows Server evaluation from Microsoft and install a new isolated Server VM.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Configure a host-only/private virtual switch for DC + client; **no bridged AD lab**.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Follow the video to install AD DS and create training domain `lab.example.test` (use only a name you control or reserved for testing).",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create a standard test user and one OU; record group membership and default group posture.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "If your Windows client edition allows domain join, join it to the training domain and verify DNS resolution.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Lab topology with names/IP ranges but no passwords",
              "Screenshots of AD users, OUs and client domain membership",
              "One-page glossary of 15 Active Directory terms"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 10.",
            "furtherReading": [
              {
                "title": "Microsoft Windows Server 2025 evaluation",
                "url": "https://www.microsoft.com/en-us/evalcenter/download-windows-server-2025"
              },
              {
                "title": "Microsoft Learn \u2014 Secure Windows Server Infrastructure",
                "url": "https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m10-l03",
          "slug": "m10-l3-windows-server-2025",
          "title": "Module 10 - Lesson 3: Windows Server 2025 \u2014 Group Policy fundamentals",
          "description": "Hands-on Windows security video lesson presented by Travis Roberts. Covers critical concepts from Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals. Follow in your isolated lab environment.",
          "youtubeVideoId": "4m3RnIfkZQ4",
          "videoAttribution": {
            "creator": "Travis Roberts",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals",
          "objectives": [
            "Explain the domain controller, AD DS, OU, group and DNS relationship.",
            "Create a private lab domain using legitimate Windows Server evaluation software.",
            "Join a Windows client to a training domain when edition supports it."
          ],
          "tags": [
            "windows-security",
            "module-10",
            "intermediate"
          ],
          "skillsTaught": [
            "Windows Server evaluation, roles and services",
            "Active Directory Domain Services and domain controller responsibilities",
            "Forests, domains, OUs, users, computer objects and groups",
            "DNS requirements, domain join, domain vs local accounts"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows Server 2025 \u2014 Group Policy fundamentals), we analyze core defensive techniques from Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals. Follow along with Travis Roberts, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 09"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows Server 2025",
                "content": "This lesson covers Windows host and domain security concepts from Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain the domain controller, AD DS, OU, group and DNS relationship.",
                  "Create a private lab domain using legitimate Windows Server evaluation software.",
                  "Join a Windows client to a training domain when edition supports it."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Assess hardware capacity: DC plus client can require substantial RAM; a single-VM alternative is reading/video plus screenshots if unavailable.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Download Windows Server evaluation from Microsoft and install a new isolated Server VM.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Configure a host-only/private virtual switch for DC + client; **no bridged AD lab**.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Follow the video to install AD DS and create training domain `lab.example.test` (use only a name you control or reserved for testing).",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create a standard test user and one OU; record group membership and default group posture.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "If your Windows client edition allows domain join, join it to the training domain and verify DNS resolution.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Lab topology with names/IP ranges but no passwords",
              "Screenshots of AD users, OUs and client domain membership",
              "One-page glossary of 15 Active Directory terms"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 10.",
            "furtherReading": [
              {
                "title": "Microsoft Windows Server 2025 evaluation",
                "url": "https://www.microsoft.com/en-us/evalcenter/download-windows-server-2025"
              },
              {
                "title": "Microsoft Learn \u2014 Secure Windows Server Infrastructure",
                "url": "https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m10",
        "title": "Module 10 Hands-on Lab: Windows Server 2025 and Active Directory Lab Fundamentals",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 10 \u2014 Windows Server 2025 and Active Directory Lab Fundamentals inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "Assess hardware capacity: DC plus client can require substantial RAM; a single-VM alternative is reading/video plus screenshots if unavailable.",
          "Download Windows Server evaluation from Microsoft and install a new isolated Server VM.",
          "Configure a host-only/private virtual switch for DC + client; **no bridged AD lab**.",
          "Follow the video to install AD DS and create training domain `lab.example.test` (use only a name you control or reserved for testing).",
          "Create a standard test user and one OU; record group membership and default group posture.",
          "If your Windows client edition allows domain join, join it to the training domain and verify DNS resolution.",
          "Take clean snapshots before moving on to account-security labs."
        ],
        "tasks": [
          {
            "id": "task-winsec-m10-1",
            "description": "Assess hardware capacity: DC plus client can require substantial RAM; a single-VM alternative is reading/video plus screenshots if unavailable.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m10-2",
            "description": "Download Windows Server evaluation from Microsoft and install a new isolated Server VM.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m10-3",
            "description": "Configure a host-only/private virtual switch for DC + client; **no bridged AD lab**.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m10-4",
            "description": "Follow the video to install AD DS and create training domain `lab.example.test` (use only a name you control or reserved for testing).",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m10-5",
            "description": "Create a standard test user and one OU; record group membership and default group posture.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m10-6",
            "description": "If your Windows client edition allows domain join, join it to the training domain and verify DNS resolution.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Lab topology with names/IP ranges but no passwords",
          "Screenshots of AD users, OUs and client domain membership",
          "One-page glossary of 15 Active Directory terms"
        ]
      },
      "quiz": {
        "title": "Module 10 Knowledge Check: Windows Server 2025 and Active Directory Lab Fundamentals",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "Why is DNS critical for Active Directory domain joining?",
            "options": [
              "DNS assigns IP addresses via DHCP to joining machines",
              "Domain clients rely on DNS Service (SRV) records to discover domain controllers, Kerberos key distribution centers (KDC), and LDAP services",
              "DNS encrypts the password entered during domain join",
              "DNS is only required if the client uses Wi-Fi"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Active Directory depends heavily on DNS SRV records (e.g. _ldap._tcp.dc._msdcs.domain) to locate DCs and authentication endpoints. If a client points to an external DNS resolver like 8.8.8.8, domain join fails.",
            "difficulty": "intermediate"
          },
          {
            "question": "What are domain controllers responsible for in an Active Directory forest?",
            "options": [
              "Hosting web servers and email mailboxes for all staff",
              "Maintaining the centralized directory database (NTDS.dit), handling authentication requests, enforcing domain security policies, and managing directory replication",
              "Formatting client hard drives on schedule",
              "Routing external internet traffic through NAT"
            ],
            "correctAnswerIndex": 1,
            "explanation": "DCs run Active Directory Domain Services (AD DS), store identity objects in NTDS.dit, manage replication among partners, issue Kerberos tickets, and distribute Group Policies.",
            "difficulty": "intermediate"
          },
          {
            "question": "How do domain groups differ from local groups?",
            "options": [
              "Domain groups are managed centrally in Active Directory and can be assigned access across domain resources, while local groups reside in the SAM database and only grant rights on the local machine",
              "Local groups can contain users from any domain in the world",
              "Domain groups cannot be nested",
              "Local groups are synchronized to Azure AD automatically"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Domain groups exist in Active Directory and apply across all domain-joined resources, whereas local groups exist purely inside an individual endpoint's local SAM database.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m11",
      "title": "Module 11 \u2014 Active Directory, Kerberos and Group Policy Security",
      "description": "Advanced level. Suggested effort: 9\u201311 hours. Prerequisite: Module 10. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 12,
      "lessons": [
        {
          "id": "les-winsec-m11-l01",
          "slug": "m11-l1-windows-server-2025",
          "title": "Module 11 - Lesson 1: Windows Server 2025 \u2014 Group Policy fundamentals",
          "description": "Hands-on Windows security video lesson presented by Travis Roberts. Covers critical concepts from Module 11 \u2014 Active Directory, Kerberos and Group Policy Security. Follow in your isolated lab environment.",
          "youtubeVideoId": "4m3RnIfkZQ4",
          "videoAttribution": {
            "creator": "Travis Roberts",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 11 \u2014 Active Directory, Kerberos and Group Policy Security",
          "objectives": [
            "Understand common AD misconfigurations from a defender standpoint.",
            "Review Group Policy security settings and Windows authentication events.",
            "Configure least-privilege policies on non-production lab OUs."
          ],
          "tags": [
            "windows-security",
            "module-11",
            "advanced"
          ],
          "skillsTaught": [
            "Kerberos TGT/TGS concepts, NTLM fallback and lockout policy",
            "GPO precedence",
            "Password/lockout policy, privileged groups, delegation",
            "4768/4769/4771 ticket activity (on DCs when auditing configured)"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows Server 2025 \u2014 Group Policy fundamentals), we analyze core defensive techniques from Module 11 \u2014 Active Directory, Kerberos and Group Policy Security. Follow along with Travis Roberts, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 10"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows Server 2025",
                "content": "This lesson covers Windows host and domain security concepts from Module 11 \u2014 Active Directory, Kerberos and Group Policy Security. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Understand common AD misconfigurations from a defender standpoint.",
                  "Review Group Policy security settings and Windows authentication events.",
                  "Configure least-privilege policies on non-production lab OUs."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Create `OU=SOC-Lab-Clients` and a test GPO that configures a harmless security setting (e.g., screen-lock timeout) on lab machines.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Link the GPO only to the training OU and run `gpresult /r` on a test client.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Review domain password/lockout settings without intentionally locking out an admin account.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Compare membership of a standard test user and a dedicated privileged test group.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Enable an appropriate Kerberos audit subcategory only in the lab and note which DC receives relevant events.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Document an AD attack-path **risk assessment** (excessive rights, stale accounts, insecure remote access) and 5 mitigations.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "GPO linkage and `gpresult` screenshots",
              "AD access review and recommended least-privilege changes",
              "Kerberos event-reference table with audit-policy prerequisites"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 11 \u2014 Active Directory, Kerberos and Group Policy Security is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 11.",
            "furtherReading": [
              {
                "title": "Microsoft Learn \u2014 Secure Windows Server Infrastructure",
                "url": "https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m11-l02",
          "slug": "m11-l2-create-a-gpo-in-active-directory",
          "title": "Module 11 - Lesson 2: Create a GPO in Active Directory \u2014 hands-on",
          "description": "Hands-on Windows security video lesson presented by ITProTV / ACI Learning. Covers critical concepts from Module 11 \u2014 Active Directory, Kerberos and Group Policy Security. Follow in your isolated lab environment.",
          "youtubeVideoId": "nNerx5ZcU58",
          "videoAttribution": {
            "creator": "ITProTV / ACI Learning",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 11 \u2014 Active Directory, Kerberos and Group Policy Security",
          "objectives": [
            "Understand common AD misconfigurations from a defender standpoint.",
            "Review Group Policy security settings and Windows authentication events.",
            "Configure least-privilege policies on non-production lab OUs."
          ],
          "tags": [
            "windows-security",
            "module-11",
            "advanced"
          ],
          "skillsTaught": [
            "Kerberos TGT/TGS concepts, NTLM fallback and lockout policy",
            "GPO precedence",
            "Password/lockout policy, privileged groups, delegation",
            "4768/4769/4771 ticket activity (on DCs when auditing configured)"
          ],
          "richContent": {
            "introduction": "In this lesson (Create a GPO in Active Directory \u2014 hands-on), we analyze core defensive techniques from Module 11 \u2014 Active Directory, Kerberos and Group Policy Security. Follow along with ITProTV / ACI Learning, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 10"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Create a GPO in Active Directory",
                "content": "This lesson covers Windows host and domain security concepts from Module 11 \u2014 Active Directory, Kerberos and Group Policy Security. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Understand common AD misconfigurations from a defender standpoint.",
                  "Review Group Policy security settings and Windows authentication events.",
                  "Configure least-privilege policies on non-production lab OUs."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Create `OU=SOC-Lab-Clients` and a test GPO that configures a harmless security setting (e.g., screen-lock timeout) on lab machines.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Link the GPO only to the training OU and run `gpresult /r` on a test client.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Review domain password/lockout settings without intentionally locking out an admin account.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Compare membership of a standard test user and a dedicated privileged test group.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Enable an appropriate Kerberos audit subcategory only in the lab and note which DC receives relevant events.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Document an AD attack-path **risk assessment** (excessive rights, stale accounts, insecure remote access) and 5 mitigations.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "GPO linkage and `gpresult` screenshots",
              "AD access review and recommended least-privilege changes",
              "Kerberos event-reference table with audit-policy prerequisites"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 11 \u2014 Active Directory, Kerberos and Group Policy Security is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 11.",
            "furtherReading": [
              {
                "title": "Microsoft Learn \u2014 Secure Windows Server Infrastructure",
                "url": "https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m11-l03",
          "slug": "m11-l3-windows-logging-for-soc-analysts",
          "title": "Module 11 - Lesson 3: Windows logging for SOC Analysts \u2014 Windows/Sysmon/PowerShell",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 11 \u2014 Active Directory, Kerberos and Group Policy Security. Follow in your isolated lab environment.",
          "youtubeVideoId": "svxqs_yvJIk",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 11 \u2014 Active Directory, Kerberos and Group Policy Security",
          "objectives": [
            "Understand common AD misconfigurations from a defender standpoint.",
            "Review Group Policy security settings and Windows authentication events.",
            "Configure least-privilege policies on non-production lab OUs."
          ],
          "tags": [
            "windows-security",
            "module-11",
            "advanced"
          ],
          "skillsTaught": [
            "Kerberos TGT/TGS concepts, NTLM fallback and lockout policy",
            "GPO precedence",
            "Password/lockout policy, privileged groups, delegation",
            "4768/4769/4771 ticket activity (on DCs when auditing configured)"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows logging for SOC Analysts \u2014 Windows/Sysmon/PowerShell), we analyze core defensive techniques from Module 11 \u2014 Active Directory, Kerberos and Group Policy Security. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 10"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows logging for SOC Analysts",
                "content": "This lesson covers Windows host and domain security concepts from Module 11 \u2014 Active Directory, Kerberos and Group Policy Security. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Understand common AD misconfigurations from a defender standpoint.",
                  "Review Group Policy security settings and Windows authentication events.",
                  "Configure least-privilege policies on non-production lab OUs."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Create `OU=SOC-Lab-Clients` and a test GPO that configures a harmless security setting (e.g., screen-lock timeout) on lab machines.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Link the GPO only to the training OU and run `gpresult /r` on a test client.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Review domain password/lockout settings without intentionally locking out an admin account.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Compare membership of a standard test user and a dedicated privileged test group.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Enable an appropriate Kerberos audit subcategory only in the lab and note which DC receives relevant events.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Document an AD attack-path **risk assessment** (excessive rights, stale accounts, insecure remote access) and 5 mitigations.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "GPO linkage and `gpresult` screenshots",
              "AD access review and recommended least-privilege changes",
              "Kerberos event-reference table with audit-policy prerequisites"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 11 \u2014 Active Directory, Kerberos and Group Policy Security is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 11.",
            "furtherReading": [
              {
                "title": "Microsoft Learn \u2014 Secure Windows Server Infrastructure",
                "url": "https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m11",
        "title": "Module 11 Hands-on Lab: Active Directory, Kerberos and Group Policy Security",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 11 \u2014 Active Directory, Kerberos and Group Policy Security inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Create `OU=SOC-Lab-Clients` and a test GPO that configures a harmless security setting (e.g., screen-lock timeout) on lab machines.",
          "Link the GPO only to the training OU and run `gpresult /r` on a test client.",
          "Review domain password/lockout settings without intentionally locking out an admin account.",
          "Compare membership of a standard test user and a dedicated privileged test group.",
          "Enable an appropriate Kerberos audit subcategory only in the lab and note which DC receives relevant events.",
          "Document an AD attack-path **risk assessment** (excessive rights, stale accounts, insecure remote access) and 5 mitigations."
        ],
        "tasks": [
          {
            "id": "task-winsec-m11-1",
            "description": "Create `OU=SOC-Lab-Clients` and a test GPO that configures a harmless security setting (e.g., screen-lock timeout) on lab machines.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m11-2",
            "description": "Link the GPO only to the training OU and run `gpresult /r` on a test client.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m11-3",
            "description": "Review domain password/lockout settings without intentionally locking out an admin account.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m11-4",
            "description": "Compare membership of a standard test user and a dedicated privileged test group.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m11-5",
            "description": "Enable an appropriate Kerberos audit subcategory only in the lab and note which DC receives relevant events.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m11-6",
            "description": "Document an AD attack-path **risk assessment** (excessive rights, stale accounts, insecure remote access) and 5 mitigations.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "GPO linkage and `gpresult` screenshots",
          "AD access review and recommended least-privilege changes",
          "Kerberos event-reference table with audit-policy prerequisites"
        ]
      },
      "quiz": {
        "title": "Module 11 Knowledge Check: Active Directory, Kerberos and Group Policy Security",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "Where are domain Kerberos authentication events (4768, 4769) primarily investigated?",
            "options": [
              "On the local client endpoint's Application log",
              "On Domain Controllers where the Kerberos Key Distribution Center (KDC) issues Ticket Granting Tickets (TGTs) and Service Tickets (TGSs)",
              "In the root of the C:\\ drive",
              "Exclusively on the perimeter firewall"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The KDC service runs on Domain Controllers. When users request TGTs (4768) or service tickets (4769), these authentication events are generated in the DC's Security log.",
            "difficulty": "advanced"
          },
          {
            "question": "Why should administrators avoid day-to-day use of Domain Admin accounts on workstations?",
            "options": [
              "Domain Admin accounts expire every 24 hours",
              "Logging into workstations with Domain Admin credentials leaves plaintext hashes and Kerberos tickets in LSASS memory, exposing them to credential dumping if the workstation is compromised",
              "Domain Admin accounts cannot open web browsers",
              "Workstations do not support Domain Admin logons"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Interactive logons place Kerberos tickets and credential hashes into LSASS memory on the target machine. Compromise of a single standard endpoint can compromise the entire domain if Domain Admins log into it.",
            "difficulty": "advanced"
          },
          {
            "question": "How does OU-scoped Group Policy Object (GPO) targeting limit unintended impact?",
            "options": [
              "It applies configuration changes only to computer and user accounts located within that specific Organizational Unit, avoiding broad system disruption across the entire domain",
              "It automatically rolls back any GPO error after 5 minutes",
              "It prevents users from changing their desktop background",
              "It converts GPO files into PowerShell scripts"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Linking GPOs to specific OUs ensures that security configurations, audit policies, or restrictions only apply to intended test or department assets rather than impacting the entire domain.",
            "difficulty": "advanced"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m12",
      "title": "Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control",
      "description": "Advanced level. Suggested effort: 9\u201311 hours. Prerequisite: Module 11. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 13,
      "lessons": [
        {
          "id": "les-winsec-m12-l01",
          "slug": "m12-l1-cyberpatriot",
          "title": "Module 12 - Lesson 1: CyberPatriot \u2014 Windows Security Configuration",
          "description": "Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control. Follow in your isolated lab environment.",
          "youtubeVideoId": "Vvv4LaCAJWQ",
          "videoAttribution": {
            "creator": "CyberPatriot",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control",
          "objectives": [
            "Conduct before/after configuration reviews against Microsoft baselines.",
            "Explain AppLocker vs App Control for Business and audit modes.",
            "Prioritize hardening changes with reversibility and business impact."
          ],
          "tags": [
            "windows-security",
            "module-12",
            "advanced"
          ],
          "skillsTaught": [
            "Windows Security Baselines and security configuration templates",
            "Microsoft Security Compliance Toolkit, Policy Analyzer, LGPO",
            "Windows LAPS concept and privileged local accounts",
            "AppLocker/App Control for Business and audit vs enforcement"
          ],
          "richContent": {
            "introduction": "In this lesson (CyberPatriot \u2014 Windows Security Configuration), we analyze core defensive techniques from Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control. Follow along with CyberPatriot, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 11"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: CyberPatriot",
                "content": "This lesson covers Windows host and domain security concepts from Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Conduct before/after configuration reviews against Microsoft baselines.",
                  "Explain AppLocker vs App Control for Business and audit modes.",
                  "Prioritize hardening changes with reversibility and business impact."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take snapshot `M12-before-hardening` and export a read-only security baseline inventory.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Compare local configuration with selected Microsoft security baseline recommendations; note unsupported VM or edition features.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Inspect `secpol.msc` (where available), local audit policy, password policy and Defender state.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Review AppLocker/App Control requirements in Microsoft documentation before attempting any policy; begin with **audit mode** if supported.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Choose 3 reversible improvements for the lab and document exact rollback steps before implementation.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "After changes, retest access, firewall and logging; restore the snapshot if something breaks.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Before/after hardening checklist and risk-based priority list",
              "Edition/licensing capability matrix",
              "Rollback plan and validation evidence"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 12.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Windows security baselines",
                "url": "https://learn.microsoft.com/windows/security/threat-protection/windows-security-configuration-framework/windows-security-baselines"
              },
              {
                "title": "Microsoft Security Compliance Toolkit",
                "url": "https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/security-compliance-toolkit-10"
              },
              {
                "title": "Microsoft \u2014 AppLocker and App Control overview",
                "url": "https://learn.microsoft.com/en-us/windows/security/application-security/application-control/app-control-for-business/appcontrol-and-applocker-overview"
              },
              {
                "title": "Microsoft Learn \u2014 Secure Windows Server Infrastructure",
                "url": "https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m12-l02",
          "slug": "m12-l2-cyberpatriot",
          "title": "Module 12 - Lesson 2: CyberPatriot \u2014 Windows Security Tools",
          "description": "Hands-on Windows security video lesson presented by CyberPatriot. Covers critical concepts from Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control. Follow in your isolated lab environment.",
          "youtubeVideoId": "C_RTcErv3gU",
          "videoAttribution": {
            "creator": "CyberPatriot",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control",
          "objectives": [
            "Conduct before/after configuration reviews against Microsoft baselines.",
            "Explain AppLocker vs App Control for Business and audit modes.",
            "Prioritize hardening changes with reversibility and business impact."
          ],
          "tags": [
            "windows-security",
            "module-12",
            "advanced"
          ],
          "skillsTaught": [
            "Windows Security Baselines and security configuration templates",
            "Microsoft Security Compliance Toolkit, Policy Analyzer, LGPO",
            "Windows LAPS concept and privileged local accounts",
            "AppLocker/App Control for Business and audit vs enforcement"
          ],
          "richContent": {
            "introduction": "In this lesson (CyberPatriot \u2014 Windows Security Tools), we analyze core defensive techniques from Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control. Follow along with CyberPatriot, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 11"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: CyberPatriot",
                "content": "This lesson covers Windows host and domain security concepts from Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Conduct before/after configuration reviews against Microsoft baselines.",
                  "Explain AppLocker vs App Control for Business and audit modes.",
                  "Prioritize hardening changes with reversibility and business impact."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take snapshot `M12-before-hardening` and export a read-only security baseline inventory.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Compare local configuration with selected Microsoft security baseline recommendations; note unsupported VM or edition features.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Inspect `secpol.msc` (where available), local audit policy, password policy and Defender state.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Review AppLocker/App Control requirements in Microsoft documentation before attempting any policy; begin with **audit mode** if supported.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Choose 3 reversible improvements for the lab and document exact rollback steps before implementation.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "After changes, retest access, firewall and logging; restore the snapshot if something breaks.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Before/after hardening checklist and risk-based priority list",
              "Edition/licensing capability matrix",
              "Rollback plan and validation evidence"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 12.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Windows security baselines",
                "url": "https://learn.microsoft.com/windows/security/threat-protection/windows-security-configuration-framework/windows-security-baselines"
              },
              {
                "title": "Microsoft Security Compliance Toolkit",
                "url": "https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/security-compliance-toolkit-10"
              },
              {
                "title": "Microsoft \u2014 AppLocker and App Control overview",
                "url": "https://learn.microsoft.com/en-us/windows/security/application-security/application-control/app-control-for-business/appcontrol-and-applocker-overview"
              },
              {
                "title": "Microsoft Learn \u2014 Secure Windows Server Infrastructure",
                "url": "https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m12-l03",
          "slug": "m12-l3-windows-server-2025",
          "title": "Module 12 - Lesson 3: Windows Server 2025 \u2014 Group Policy fundamentals",
          "description": "Hands-on Windows security video lesson presented by Travis Roberts. Covers critical concepts from Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control. Follow in your isolated lab environment.",
          "youtubeVideoId": "4m3RnIfkZQ4",
          "videoAttribution": {
            "creator": "Travis Roberts",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control",
          "objectives": [
            "Conduct before/after configuration reviews against Microsoft baselines.",
            "Explain AppLocker vs App Control for Business and audit modes.",
            "Prioritize hardening changes with reversibility and business impact."
          ],
          "tags": [
            "windows-security",
            "module-12",
            "advanced"
          ],
          "skillsTaught": [
            "Windows Security Baselines and security configuration templates",
            "Microsoft Security Compliance Toolkit, Policy Analyzer, LGPO",
            "Windows LAPS concept and privileged local accounts",
            "AppLocker/App Control for Business and audit vs enforcement"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows Server 2025 \u2014 Group Policy fundamentals), we analyze core defensive techniques from Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control. Follow along with Travis Roberts, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 11"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows Server 2025",
                "content": "This lesson covers Windows host and domain security concepts from Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Conduct before/after configuration reviews against Microsoft baselines.",
                  "Explain AppLocker vs App Control for Business and audit modes.",
                  "Prioritize hardening changes with reversibility and business impact."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take snapshot `M12-before-hardening` and export a read-only security baseline inventory.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Compare local configuration with selected Microsoft security baseline recommendations; note unsupported VM or edition features.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Inspect `secpol.msc` (where available), local audit policy, password policy and Defender state.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Review AppLocker/App Control requirements in Microsoft documentation before attempting any policy; begin with **audit mode** if supported.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Choose 3 reversible improvements for the lab and document exact rollback steps before implementation.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "After changes, retest access, firewall and logging; restore the snapshot if something breaks.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Before/after hardening checklist and risk-based priority list",
              "Edition/licensing capability matrix",
              "Rollback plan and validation evidence"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 12.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Windows security baselines",
                "url": "https://learn.microsoft.com/windows/security/threat-protection/windows-security-configuration-framework/windows-security-baselines"
              },
              {
                "title": "Microsoft Security Compliance Toolkit",
                "url": "https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/security-compliance-toolkit-10"
              },
              {
                "title": "Microsoft \u2014 AppLocker and App Control overview",
                "url": "https://learn.microsoft.com/en-us/windows/security/application-security/application-control/app-control-for-business/appcontrol-and-applocker-overview"
              },
              {
                "title": "Microsoft Learn \u2014 Secure Windows Server Infrastructure",
                "url": "https://learn.microsoft.com/en-us/training/paths/secure-windows-server-infrastructure/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m12",
        "title": "Module 12 Hands-on Lab: Windows Hardening, Baselines, LAPS and Application Control",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 12 \u2014 Windows Hardening, Baselines, LAPS and Application Control inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Take snapshot `M12-before-hardening` and export a read-only security baseline inventory.",
          "Compare local configuration with selected Microsoft security baseline recommendations; note unsupported VM or edition features.",
          "Inspect `secpol.msc` (where available), local audit policy, password policy and Defender state.",
          "Review AppLocker/App Control requirements in Microsoft documentation before attempting any policy; begin with **audit mode** if supported.",
          "Choose 3 reversible improvements for the lab and document exact rollback steps before implementation.",
          "After changes, retest access, firewall and logging; restore the snapshot if something breaks."
        ],
        "tasks": [
          {
            "id": "task-winsec-m12-1",
            "description": "Take snapshot `M12-before-hardening` and export a read-only security baseline inventory.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m12-2",
            "description": "Compare local configuration with selected Microsoft security baseline recommendations; note unsupported VM or edition features.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m12-3",
            "description": "Inspect `secpol.msc` (where available), local audit policy, password policy and Defender state.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m12-4",
            "description": "Review AppLocker/App Control requirements in Microsoft documentation before attempting any policy; begin with **audit mode** if supported.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m12-5",
            "description": "Choose 3 reversible improvements for the lab and document exact rollback steps before implementation.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m12-6",
            "description": "After changes, retest access, firewall and logging; restore the snapshot if something breaks.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Before/after hardening checklist and risk-based priority list",
          "Edition/licensing capability matrix",
          "Rollback plan and validation evidence"
        ]
      },
      "quiz": {
        "title": "Module 12 Knowledge Check: Windows Hardening, Baselines, LAPS and Application Control",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "Why should security teams test a baseline before applying it across production?",
            "options": [
              "Security baselines contain intentional malware",
              "Baselines enforce strict configurations (disabling legacy protocols, tightening authentication, restricting rights) that can break legacy line-of-business applications and operational services",
              "Baselines permanently delete all user accounts",
              "Microsoft does not allow deploying baselines without testing"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Tightening configurations (such as blocking NTLM, enforcing SMB signing, or disabling macros) can break legitimate legacy business systems. Staged rollouts in audit mode prevent outages.",
            "difficulty": "advanced"
          },
          {
            "question": "What is the primary value of running AppLocker or App Control in Audit-Only mode?",
            "options": [
              "It immediately prevents zero-day malware from executing",
              "It logs what would have been blocked without disrupting legitimate business operations, allowing defenders to identify required business software and tune rules",
              "It disables Windows Defender real-time protection",
              "It encrypts all executables in Program Files"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Audit mode logs policy match events (Event ID 8003 in AppLocker) without blocking execution, giving engineers the data needed to whitelist essential tools before turning on enforcement.",
            "difficulty": "advanced"
          },
          {
            "question": "What critical security risk does Windows LAPS (Local Administrator Password Solution) mitigate?",
            "options": [
              "Phishing emails received in Outlook",
              "Lateral movement using shared, identical local administrator passwords across multiple endpoints",
              "Hardware failure in domain controllers",
              "Insecure Wi-Fi connections"
            ],
            "correctAnswerIndex": 1,
            "explanation": "LAPS automatically generates and rotates unique, random passwords for each endpoint's built-in local administrator account, preventing pass-the-hash or credential reuse lateral movement across systems.",
            "difficulty": "advanced"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m13",
      "title": "Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting",
      "description": "Advanced level. Suggested effort: 9\u201311 hours. Prerequisite: Module 12. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 14,
      "lessons": [
        {
          "id": "les-winsec-m13-l01",
          "slug": "m13-l1-13cubed",
          "title": "Module 13 - Lesson 1: 13Cubed \u2014 Introduction to Windows Forensics",
          "description": "Hands-on Windows security video lesson presented by 13Cubed. Covers critical concepts from Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting. Follow in your isolated lab environment.",
          "youtubeVideoId": "VYROU-ZwZX8",
          "videoAttribution": {
            "creator": "13Cubed",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting",
          "objectives": [
            "Use Sysinternals to investigate suspicious Windows behaviors safely.",
            "Identify process ancestry, signature and auto-start evidence.",
            "Correlate current state with Windows/Sysmon historical telemetry."
          ],
          "tags": [
            "windows-security",
            "module-13",
            "advanced"
          ],
          "skillsTaught": [
            "Process Explorer vs Task Manager; handles, image paths, signatures",
            "Autoruns as an auto-start baseline and triage tool",
            "Process Monitor as high-volume evidence, filtering and capture caution",
            "Hashes and publisher signatures; false positive caveats"
          ],
          "richContent": {
            "introduction": "In this lesson (13Cubed \u2014 Introduction to Windows Forensics), we analyze core defensive techniques from Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting. Follow along with 13Cubed, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 12"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: 13Cubed",
                "content": "This lesson covers Windows host and domain security concepts from Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Use Sysinternals to investigate suspicious Windows behaviors safely.",
                  "Identify process ancestry, signature and auto-start evidence.",
                  "Correlate current state with Windows/Sysmon historical telemetry."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Download Sysinternals utilities from Microsoft only; run inside your VM.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Open Process Explorer and inspect signed Microsoft system processes; save a screenshot of parent-child relationships.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Launch Notepad, identify its executable path, parent PID and signature state.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Open Autoruns and **observe only**; export a CSV/screenshot baseline without disabling entries.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Compare process findings with Sysmon 1 and scheduled-task inventories.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a mock SOC alert for a made-up anomalous process; separate observed evidence from hypotheses.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Process tree with PID, parent, signer and command line",
              "Autoruns inventory and 3 investigation questions",
              "Short threat-hunting report using only benign activity"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 13.",
            "furtherReading": [
              {
                "title": "Microsoft Sysinternals official tools",
                "url": "https://learn.microsoft.com/en-us/sysinternals/"
              },
              {
                "title": "Microsoft Sysinternals Process Explorer",
                "url": "https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer"
              },
              {
                "title": "Microsoft Sysinternals video training",
                "url": "https://learn.microsoft.com/en-us/sysinternals/resources/webcasts"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m13-l02",
          "slug": "m13-l2-trustedsec-sysmon-6",
          "title": "Module 13 - Lesson 2: TrustedSec Sysmon 6 \u2014 Process tracking",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting. Follow in your isolated lab environment.",
          "youtubeVideoId": "46-alN2_vlo",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting",
          "objectives": [
            "Use Sysinternals to investigate suspicious Windows behaviors safely.",
            "Identify process ancestry, signature and auto-start evidence.",
            "Correlate current state with Windows/Sysmon historical telemetry."
          ],
          "tags": [
            "windows-security",
            "module-13",
            "advanced"
          ],
          "skillsTaught": [
            "Process Explorer vs Task Manager; handles, image paths, signatures",
            "Autoruns as an auto-start baseline and triage tool",
            "Process Monitor as high-volume evidence, filtering and capture caution",
            "Hashes and publisher signatures; false positive caveats"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 6 \u2014 Process tracking), we analyze core defensive techniques from Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 12"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 6",
                "content": "This lesson covers Windows host and domain security concepts from Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Use Sysinternals to investigate suspicious Windows behaviors safely.",
                  "Identify process ancestry, signature and auto-start evidence.",
                  "Correlate current state with Windows/Sysmon historical telemetry."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Download Sysinternals utilities from Microsoft only; run inside your VM.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Open Process Explorer and inspect signed Microsoft system processes; save a screenshot of parent-child relationships.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Launch Notepad, identify its executable path, parent PID and signature state.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Open Autoruns and **observe only**; export a CSV/screenshot baseline without disabling entries.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Compare process findings with Sysmon 1 and scheduled-task inventories.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a mock SOC alert for a made-up anomalous process; separate observed evidence from hypotheses.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Process tree with PID, parent, signer and command line",
              "Autoruns inventory and 3 investigation questions",
              "Short threat-hunting report using only benign activity"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 13.",
            "furtherReading": [
              {
                "title": "Microsoft Sysinternals official tools",
                "url": "https://learn.microsoft.com/en-us/sysinternals/"
              },
              {
                "title": "Microsoft Sysinternals Process Explorer",
                "url": "https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer"
              },
              {
                "title": "Microsoft Sysinternals video training",
                "url": "https://learn.microsoft.com/en-us/sysinternals/resources/webcasts"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m13-l03",
          "slug": "m13-l3-trustedsec-sysmon-10",
          "title": "Module 13 - Lesson 3: TrustedSec Sysmon 10 \u2014 Process access signals",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting. Follow in your isolated lab environment.",
          "youtubeVideoId": "51YRHDl93f4",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting",
          "objectives": [
            "Use Sysinternals to investigate suspicious Windows behaviors safely.",
            "Identify process ancestry, signature and auto-start evidence.",
            "Correlate current state with Windows/Sysmon historical telemetry."
          ],
          "tags": [
            "windows-security",
            "module-13",
            "advanced"
          ],
          "skillsTaught": [
            "Process Explorer vs Task Manager; handles, image paths, signatures",
            "Autoruns as an auto-start baseline and triage tool",
            "Process Monitor as high-volume evidence, filtering and capture caution",
            "Hashes and publisher signatures; false positive caveats"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 10 \u2014 Process access signals), we analyze core defensive techniques from Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 12"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 10",
                "content": "This lesson covers Windows host and domain security concepts from Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Use Sysinternals to investigate suspicious Windows behaviors safely.",
                  "Identify process ancestry, signature and auto-start evidence.",
                  "Correlate current state with Windows/Sysmon historical telemetry."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Download Sysinternals utilities from Microsoft only; run inside your VM.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Open Process Explorer and inspect signed Microsoft system processes; save a screenshot of parent-child relationships.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Launch Notepad, identify its executable path, parent PID and signature state.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Open Autoruns and **observe only**; export a CSV/screenshot baseline without disabling entries.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Compare process findings with Sysmon 1 and scheduled-task inventories.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a mock SOC alert for a made-up anomalous process; separate observed evidence from hypotheses.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Process tree with PID, parent, signer and command line",
              "Autoruns inventory and 3 investigation questions",
              "Short threat-hunting report using only benign activity"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 13.",
            "furtherReading": [
              {
                "title": "Microsoft Sysinternals official tools",
                "url": "https://learn.microsoft.com/en-us/sysinternals/"
              },
              {
                "title": "Microsoft Sysinternals Process Explorer",
                "url": "https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer"
              },
              {
                "title": "Microsoft Sysinternals video training",
                "url": "https://learn.microsoft.com/en-us/sysinternals/resources/webcasts"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m13-l04",
          "slug": "m13-l4-trustedsec-sysmon-22",
          "title": "Module 13 - Lesson 4: TrustedSec Sysmon 22 \u2014 Registry actions",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting. Follow in your isolated lab environment.",
          "youtubeVideoId": "hy5s1pnaO2I",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting",
          "objectives": [
            "Use Sysinternals to investigate suspicious Windows behaviors safely.",
            "Identify process ancestry, signature and auto-start evidence.",
            "Correlate current state with Windows/Sysmon historical telemetry."
          ],
          "tags": [
            "windows-security",
            "module-13",
            "advanced"
          ],
          "skillsTaught": [
            "Process Explorer vs Task Manager; handles, image paths, signatures",
            "Autoruns as an auto-start baseline and triage tool",
            "Process Monitor as high-volume evidence, filtering and capture caution",
            "Hashes and publisher signatures; false positive caveats"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 22 \u2014 Registry actions), we analyze core defensive techniques from Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 12"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 22",
                "content": "This lesson covers Windows host and domain security concepts from Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Use Sysinternals to investigate suspicious Windows behaviors safely.",
                  "Identify process ancestry, signature and auto-start evidence.",
                  "Correlate current state with Windows/Sysmon historical telemetry."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Download Sysinternals utilities from Microsoft only; run inside your VM.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Open Process Explorer and inspect signed Microsoft system processes; save a screenshot of parent-child relationships.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Launch Notepad, identify its executable path, parent PID and signature state.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Open Autoruns and **observe only**; export a CSV/screenshot baseline without disabling entries.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Compare process findings with Sysmon 1 and scheduled-task inventories.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a mock SOC alert for a made-up anomalous process; separate observed evidence from hypotheses.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Process tree with PID, parent, signer and command line",
              "Autoruns inventory and 3 investigation questions",
              "Short threat-hunting report using only benign activity"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 13.",
            "furtherReading": [
              {
                "title": "Microsoft Sysinternals official tools",
                "url": "https://learn.microsoft.com/en-us/sysinternals/"
              },
              {
                "title": "Microsoft Sysinternals Process Explorer",
                "url": "https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer"
              },
              {
                "title": "Microsoft Sysinternals video training",
                "url": "https://learn.microsoft.com/en-us/sysinternals/resources/webcasts"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m13",
        "title": "Module 13 Hands-on Lab: Sysinternals Process Explorer, Autoruns and Threat Hunting",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 13 \u2014 Sysinternals Process Explorer, Autoruns and Threat Hunting inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Download Sysinternals utilities from Microsoft only; run inside your VM.",
          "Open Process Explorer and inspect signed Microsoft system processes; save a screenshot of parent-child relationships.",
          "Launch Notepad, identify its executable path, parent PID and signature state.",
          "Open Autoruns and **observe only**; export a CSV/screenshot baseline without disabling entries.",
          "Compare process findings with Sysmon 1 and scheduled-task inventories.",
          "Write a mock SOC alert for a made-up anomalous process; separate observed evidence from hypotheses."
        ],
        "tasks": [
          {
            "id": "task-winsec-m13-1",
            "description": "Download Sysinternals utilities from Microsoft only; run inside your VM.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m13-2",
            "description": "Open Process Explorer and inspect signed Microsoft system processes; save a screenshot of parent-child relationships.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m13-3",
            "description": "Launch Notepad, identify its executable path, parent PID and signature state.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m13-4",
            "description": "Open Autoruns and **observe only**; export a CSV/screenshot baseline without disabling entries.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m13-5",
            "description": "Compare process findings with Sysmon 1 and scheduled-task inventories.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m13-6",
            "description": "Write a mock SOC alert for a made-up anomalous process; separate observed evidence from hypotheses.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Process tree with PID, parent, signer and command line",
          "Autoruns inventory and 3 investigation questions",
          "Short threat-hunting report using only benign activity"
        ]
      },
      "quiz": {
        "title": "Module 13 Knowledge Check: Sysinternals Process Explorer, Autoruns and Threat Hunting",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "Why should an analyst avoid immediately deleting an unfamiliar Autorun entry during live triage?",
            "options": [
              "Deleting an entry without investigating destroys volatile forensic evidence and can corrupt necessary operating system boot components or legitimate software dependencies",
              "Autoruns entries cannot be deleted under Windows",
              "Deleting entries causes an immediate kernel crash",
              "Microsoft requires all autoruns to remain active for 30 days"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Immediate deletion destroys key forensic indicators (file paths, registry keys, timestamps) and risks breaking critical system drivers or enterprise management agents.",
            "difficulty": "advanced"
          },
          {
            "question": "Why can unsigned executables be completely legitimate?",
            "options": [
              "Microsoft prohibits signing internal tools",
              "Custom internal enterprise scripts, open-source utilities, and in-house administrative tools frequently lack commercial code-signing certificates despite being benign",
              "Signing certificates are only valid on Linux",
              "Digital signatures expire every hour"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Commercial code signing certificates require paid third-party verification. Many internal enterprise utilities and open-source tools remain unsigned without being malicious.",
            "difficulty": "advanced"
          },
          {
            "question": "What unique historical insight does Sysmon telemetry provide over a live Process Explorer snapshot?",
            "options": [
              "Process Explorer only shows currently running processes at that exact moment; Sysmon preserves historical process creations, terminations, command-line arguments, and parent relationships for short-lived ephemeral processes that already exited",
              "Sysmon displays the CPU temperature",
              "Process Explorer cannot display process names",
              "Sysmon decrypts SSL network packets"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Attackers frequently execute commands that run for only a few milliseconds (e.g. whoami, net user). Process Explorer misses exited processes, while Sysmon permanently records them in Event 1.",
            "difficulty": "advanced"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m14",
      "title": "Module 14 \u2014 Windows Forensics: Event Logs, Registry, Prefetch and NTFS",
      "description": "Advanced level. Suggested effort: 10\u201312 hours. Prerequisite: Module 13. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 15,
      "lessons": [
        {
          "id": "les-winsec-m14-l01",
          "slug": "m14-l1-13cubed",
          "title": "Module 14 - Lesson 1: 13Cubed \u2014 Introduction to Windows Forensics",
          "description": "Hands-on Windows security video lesson presented by 13Cubed. Covers critical concepts from Module 14 \u2014 Windows Forensics: Event Logs, Registry, Prefetch and NTFS. Follow in your isolated lab environment.",
          "youtubeVideoId": "VYROU-ZwZX8",
          "videoAttribution": {
            "creator": "13Cubed",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 14 \u2014 Windows Forensics: Event Logs, Registry, Prefetch and NTFS",
          "objectives": [
            "Explain the forensic value and limits of common Windows artifacts.",
            "Build a timeline from benign execution and login events.",
            "Document collection methods without damaging evidence."
          ],
          "tags": [
            "windows-security",
            "module-14",
            "advanced"
          ],
          "skillsTaught": [
            "EVTX logs and event timestamps/time zone considerations",
            "Prefetch execution traces and feature limitations",
            "NTUSER.DAT, UserAssist, ShellBags, Run keys",
            "LNK files, Jump Lists, RecentDocs and file interactions"
          ],
          "richContent": {
            "introduction": "In this lesson (13Cubed \u2014 Introduction to Windows Forensics), we analyze core defensive techniques from Module 14 \u2014 Windows Forensics: Event Logs, Registry, Prefetch and NTFS. Follow along with 13Cubed, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 13"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: 13Cubed",
                "content": "This lesson covers Windows host and domain security concepts from Module 14 \u2014 Windows Forensics: Event Logs, Registry, Prefetch and NTFS. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain the forensic value and limits of common Windows artifacts.",
                  "Build a timeline from benign execution and login events.",
                  "Document collection methods without damaging evidence."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take snapshot and establish VM clock/time zone; record a known start time.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Create and open a small test text file; launch Notepad twice and note activity timestamps.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Observe (read-only) `C:\\Windows\\Prefetch` if available; absence is not proof of non-execution.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Create a shortcut to the file and inspect its target and modified time in a benign lab.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Export pertinent events for test login and process execution; align them on a UTC-based timeline.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Hash your exported files using `Get-FileHash` and keep collection notes.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Forensic timeline CSV with UTC and source column",
              "SHA-256 evidence manifest and chain-of-custody-style notes",
              "One-page explanation of Prefetch/Registry/LNK artifact limitations"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 14 \u2014 Windows Forensics: Event Logs, Registry, Prefetch and NTFS is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 14.",
            "furtherReading": [
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              },
              {
                "title": "DFIR artifact reference \u2014 13Cubed cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              },
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m14-l02",
          "slug": "m14-l2-13cubed",
          "title": "Module 14 - Lesson 2: 13Cubed \u2014 NTFS MFT and Journal Forensics",
          "description": "Hands-on Windows security video lesson presented by 13Cubed. Covers critical concepts from Module 14 \u2014 Windows Forensics: Event Logs, Registry, Prefetch and NTFS. Follow in your isolated lab environment.",
          "youtubeVideoId": "_qElVZJqlGY",
          "videoAttribution": {
            "creator": "13Cubed",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 14 \u2014 Windows Forensics: Event Logs, Registry, Prefetch and NTFS",
          "objectives": [
            "Explain the forensic value and limits of common Windows artifacts.",
            "Build a timeline from benign execution and login events.",
            "Document collection methods without damaging evidence."
          ],
          "tags": [
            "windows-security",
            "module-14",
            "advanced"
          ],
          "skillsTaught": [
            "EVTX logs and event timestamps/time zone considerations",
            "Prefetch execution traces and feature limitations",
            "NTUSER.DAT, UserAssist, ShellBags, Run keys",
            "LNK files, Jump Lists, RecentDocs and file interactions"
          ],
          "richContent": {
            "introduction": "In this lesson (13Cubed \u2014 NTFS MFT and Journal Forensics), we analyze core defensive techniques from Module 14 \u2014 Windows Forensics: Event Logs, Registry, Prefetch and NTFS. Follow along with 13Cubed, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 13"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: 13Cubed",
                "content": "This lesson covers Windows host and domain security concepts from Module 14 \u2014 Windows Forensics: Event Logs, Registry, Prefetch and NTFS. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Explain the forensic value and limits of common Windows artifacts.",
                  "Build a timeline from benign execution and login events.",
                  "Document collection methods without damaging evidence."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Take snapshot and establish VM clock/time zone; record a known start time.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Create and open a small test text file; launch Notepad twice and note activity timestamps.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Observe (read-only) `C:\\Windows\\Prefetch` if available; absence is not proof of non-execution.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Create a shortcut to the file and inspect its target and modified time in a benign lab.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Export pertinent events for test login and process execution; align them on a UTC-based timeline.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Hash your exported files using `Get-FileHash` and keep collection notes.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Forensic timeline CSV with UTC and source column",
              "SHA-256 evidence manifest and chain-of-custody-style notes",
              "One-page explanation of Prefetch/Registry/LNK artifact limitations"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 14 \u2014 Windows Forensics: Event Logs, Registry, Prefetch and NTFS is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 14.",
            "furtherReading": [
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              },
              {
                "title": "DFIR artifact reference \u2014 13Cubed cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              },
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m14",
        "title": "Module 14 Hands-on Lab: Windows Forensics: Event Logs, Registry, Prefetch and NTFS",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 14 \u2014 Windows Forensics: Event Logs, Registry, Prefetch and NTFS inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Take snapshot and establish VM clock/time zone; record a known start time.",
          "Create and open a small test text file; launch Notepad twice and note activity timestamps.",
          "Observe (read-only) `C:\\Windows\\Prefetch` if available; absence is not proof of non-execution.",
          "Create a shortcut to the file and inspect its target and modified time in a benign lab.",
          "Export pertinent events for test login and process execution; align them on a UTC-based timeline.",
          "Hash your exported files using `Get-FileHash` and keep collection notes.",
          "Write a case narrative with observed facts, limitations and possible alternative explanations."
        ],
        "tasks": [
          {
            "id": "task-winsec-m14-1",
            "description": "Take snapshot and establish VM clock/time zone; record a known start time.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m14-2",
            "description": "Create and open a small test text file; launch Notepad twice and note activity timestamps.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m14-3",
            "description": "Observe (read-only) `C:\\Windows\\Prefetch` if available; absence is not proof of non-execution.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m14-4",
            "description": "Create a shortcut to the file and inspect its target and modified time in a benign lab.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m14-5",
            "description": "Export pertinent events for test login and process execution; align them on a UTC-based timeline.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m14-6",
            "description": "Hash your exported files using `Get-FileHash` and keep collection notes.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Forensic timeline CSV with UTC and source column",
          "SHA-256 evidence manifest and chain-of-custody-style notes",
          "One-page explanation of Prefetch/Registry/LNK artifact limitations"
        ]
      },
      "quiz": {
        "title": "Module 14 Knowledge Check: Windows Forensics: Event Logs, Registry, Prefetch and NTFS",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "Why does a file's Last Modified timestamp alone not prove execution?",
            "options": [
              "Windows does not track file modification times",
              "Modifying or saving a file changes its Last Write timestamp without ever running or loading its code into memory; execution artifacts like Prefetch, Shimcache, and Amcache provide evidence of execution",
              "Timestamps are always randomized by the NTFS driver",
              "Only read timestamps can prove execution"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A file can be written to disk, modified, or downloaded without ever executing. Proof of execution requires specific execution artifacts such as Prefetch (.pf), UserAssist, Shimcache, or Event 4688.",
            "difficulty": "advanced"
          },
          {
            "question": "Why is recording the system time zone critical during forensic acquisition and timeline analysis?",
            "options": [
              "Without time zone normalization (converting timestamps to UTC), events from different systems, logs, and artifacts cannot be accurately sequenced, causing misleading timelines",
              "Windows cannot boot if the time zone is unknown",
              "Antivirus updates will fail if the time zone is set",
              "Event Viewer only opens files in GMT"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Artifacts record timestamps in different formats (UTC in EVTX, local time in FAT/registry). Failing to record and normalize time zones leads to misaligned timelines and false conclusions.",
            "difficulty": "advanced"
          },
          {
            "question": "What is the fundamental difference between volatile and persistent evidence?",
            "options": [
              "Volatile evidence (RAM, active network connections, running processes) is lost upon system shutdown or reboot, whereas persistent evidence (disk files, event logs, registry hives) survives power cycles",
              "Persistent evidence only exists for 24 hours",
              "Volatile evidence is always encrypted by BitLocker",
              "There is no difference between the two"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Volatile memory (RAM) is lost when power is disconnected, so live triage and memory acquisition must occur before rebooting. Non-volatile storage (disks, logs) persists across reboots.",
            "difficulty": "advanced"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m15",
      "title": "Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering",
      "description": "Advanced level. Suggested effort: 10\u201312 hours. Prerequisite: Module 14. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 16,
      "lessons": [
        {
          "id": "les-winsec-m15-l01",
          "slug": "m15-l1-windows-event-forwarding-and-windows-log-collection",
          "title": "Module 15 - Lesson 1: Windows Event Forwarding and Windows log collection",
          "description": "Hands-on Windows security video lesson presented by I.T Security Labs. Covers critical concepts from Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering. Follow in your isolated lab environment.",
          "youtubeVideoId": "kkzAILQc9LE",
          "videoAttribution": {
            "creator": "I.T Security Labs",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering",
          "objectives": [
            "Understand how Windows Event Forwarding (WEF/WEC) centralizes Windows logs.",
            "Design simple Windows event rules with false-positive checks.",
            "Write readable analytic logic without requiring a paid cloud SIEM."
          ],
          "tags": [
            "windows-security",
            "module-15",
            "advanced"
          ],
          "skillsTaught": [
            "WEF sources, collectors, ForwardedEvents and subscriptions",
            "Source-initiated vs collector-initiated event subscriptions",
            "Audit policy and event availability vs ingestion gaps",
            "Rule logic"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows Event Forwarding and Windows log collection), we analyze core defensive techniques from Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering. Follow along with I.T Security Labs, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 14"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows Event Forwarding and Windows log collection",
                "content": "This lesson covers Windows host and domain security concepts from Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Understand how Windows Event Forwarding (WEF/WEC) centralizes Windows logs.",
                  "Design simple Windows event rules with false-positive checks.",
                  "Write readable analytic logic without requiring a paid cloud SIEM."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Review `wecutil` and the WEF architecture documentation before enabling services.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "If you have a Server+client lab, configure a small trusted subscription for a low-volume security event set; do not forward production logs.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "If a second VM is unavailable, draw a WEF topology and use exported local EVTX as the data source.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Create detection idea A: repeated Event 4625 on one host within 10 minutes, excluding lab test noise.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create detection idea B: Event 4720 or a local-account creation event in an unexpected maintenance window.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "For each, write evidence fields, expected false positives, a triage step and a tuning approach.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "WEF architecture diagram and test or simulated subscription notes",
              "Two detection rule specifications with thresholds and known blind spots",
              "One sample analyst ticket with severity and escalation criteria"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 15.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Windows Event Forwarding for intrusion detection",
                "url": "https://learn.microsoft.com/windows/security/operating-system-security/device-management/use-windows-event-forwarding-to-assist-in-intrusion-detection"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "Sigma detection rules (open source)",
                "url": "https://github.com/SigmaHQ/sigma"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m15-l02",
          "slug": "m15-l2-windows-logging-for-soc-analysts",
          "title": "Module 15 - Lesson 2: Windows logging for SOC Analysts \u2014 Windows/Sysmon/PowerShell",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering. Follow in your isolated lab environment.",
          "youtubeVideoId": "svxqs_yvJIk",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering",
          "objectives": [
            "Understand how Windows Event Forwarding (WEF/WEC) centralizes Windows logs.",
            "Design simple Windows event rules with false-positive checks.",
            "Write readable analytic logic without requiring a paid cloud SIEM."
          ],
          "tags": [
            "windows-security",
            "module-15",
            "advanced"
          ],
          "skillsTaught": [
            "WEF sources, collectors, ForwardedEvents and subscriptions",
            "Source-initiated vs collector-initiated event subscriptions",
            "Audit policy and event availability vs ingestion gaps",
            "Rule logic"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows logging for SOC Analysts \u2014 Windows/Sysmon/PowerShell), we analyze core defensive techniques from Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 14"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows logging for SOC Analysts",
                "content": "This lesson covers Windows host and domain security concepts from Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Understand how Windows Event Forwarding (WEF/WEC) centralizes Windows logs.",
                  "Design simple Windows event rules with false-positive checks.",
                  "Write readable analytic logic without requiring a paid cloud SIEM."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Review `wecutil` and the WEF architecture documentation before enabling services.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "If you have a Server+client lab, configure a small trusted subscription for a low-volume security event set; do not forward production logs.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "If a second VM is unavailable, draw a WEF topology and use exported local EVTX as the data source.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Create detection idea A: repeated Event 4625 on one host within 10 minutes, excluding lab test noise.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create detection idea B: Event 4720 or a local-account creation event in an unexpected maintenance window.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "For each, write evidence fields, expected false positives, a triage step and a tuning approach.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "WEF architecture diagram and test or simulated subscription notes",
              "Two detection rule specifications with thresholds and known blind spots",
              "One sample analyst ticket with severity and escalation criteria"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 15.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Windows Event Forwarding for intrusion detection",
                "url": "https://learn.microsoft.com/windows/security/operating-system-security/device-management/use-windows-event-forwarding-to-assist-in-intrusion-detection"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "Sigma detection rules (open source)",
                "url": "https://github.com/SigmaHQ/sigma"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m15-l03",
          "slug": "m15-l3-trustedsec-sysmon-14",
          "title": "Module 15 - Lesson 3: TrustedSec Sysmon 14 \u2014 Prioritizing coverage",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering. Follow in your isolated lab environment.",
          "youtubeVideoId": "5AQ19x08wHI",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering",
          "objectives": [
            "Understand how Windows Event Forwarding (WEF/WEC) centralizes Windows logs.",
            "Design simple Windows event rules with false-positive checks.",
            "Write readable analytic logic without requiring a paid cloud SIEM."
          ],
          "tags": [
            "windows-security",
            "module-15",
            "advanced"
          ],
          "skillsTaught": [
            "WEF sources, collectors, ForwardedEvents and subscriptions",
            "Source-initiated vs collector-initiated event subscriptions",
            "Audit policy and event availability vs ingestion gaps",
            "Rule logic"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 14 \u2014 Prioritizing coverage), we analyze core defensive techniques from Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 14"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 14",
                "content": "This lesson covers Windows host and domain security concepts from Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Understand how Windows Event Forwarding (WEF/WEC) centralizes Windows logs.",
                  "Design simple Windows event rules with false-positive checks.",
                  "Write readable analytic logic without requiring a paid cloud SIEM."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Review `wecutil` and the WEF architecture documentation before enabling services.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "If you have a Server+client lab, configure a small trusted subscription for a low-volume security event set; do not forward production logs.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "If a second VM is unavailable, draw a WEF topology and use exported local EVTX as the data source.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Create detection idea A: repeated Event 4625 on one host within 10 minutes, excluding lab test noise.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create detection idea B: Event 4720 or a local-account creation event in an unexpected maintenance window.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "For each, write evidence fields, expected false positives, a triage step and a tuning approach.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "WEF architecture diagram and test or simulated subscription notes",
              "Two detection rule specifications with thresholds and known blind spots",
              "One sample analyst ticket with severity and escalation criteria"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 15.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Windows Event Forwarding for intrusion detection",
                "url": "https://learn.microsoft.com/windows/security/operating-system-security/device-management/use-windows-event-forwarding-to-assist-in-intrusion-detection"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "Sigma detection rules (open source)",
                "url": "https://github.com/SigmaHQ/sigma"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m15-l04",
          "slug": "m15-l4-trustedsec-sysmon-19",
          "title": "Module 15 - Lesson 4: TrustedSec Sysmon 19 \u2014 DNS queries",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering. Follow in your isolated lab environment.",
          "youtubeVideoId": "uwyiGFjPYa8",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering",
          "objectives": [
            "Understand how Windows Event Forwarding (WEF/WEC) centralizes Windows logs.",
            "Design simple Windows event rules with false-positive checks.",
            "Write readable analytic logic without requiring a paid cloud SIEM."
          ],
          "tags": [
            "windows-security",
            "module-15",
            "advanced"
          ],
          "skillsTaught": [
            "WEF sources, collectors, ForwardedEvents and subscriptions",
            "Source-initiated vs collector-initiated event subscriptions",
            "Audit policy and event availability vs ingestion gaps",
            "Rule logic"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 19 \u2014 DNS queries), we analyze core defensive techniques from Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 14"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 19",
                "content": "This lesson covers Windows host and domain security concepts from Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Understand how Windows Event Forwarding (WEF/WEC) centralizes Windows logs.",
                  "Design simple Windows event rules with false-positive checks.",
                  "Write readable analytic logic without requiring a paid cloud SIEM."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Review `wecutil` and the WEF architecture documentation before enabling services.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "If you have a Server+client lab, configure a small trusted subscription for a low-volume security event set; do not forward production logs.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "If a second VM is unavailable, draw a WEF topology and use exported local EVTX as the data source.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Create detection idea A: repeated Event 4625 on one host within 10 minutes, excluding lab test noise.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create detection idea B: Event 4720 or a local-account creation event in an unexpected maintenance window.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "For each, write evidence fields, expected false positives, a triage step and a tuning approach.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "WEF architecture diagram and test or simulated subscription notes",
              "Two detection rule specifications with thresholds and known blind spots",
              "One sample analyst ticket with severity and escalation criteria"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 15.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Windows Event Forwarding for intrusion detection",
                "url": "https://learn.microsoft.com/windows/security/operating-system-security/device-management/use-windows-event-forwarding-to-assist-in-intrusion-detection"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "Sigma detection rules (open source)",
                "url": "https://github.com/SigmaHQ/sigma"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m15",
        "title": "Module 15 Hands-on Lab: Windows Event Forwarding and SOC Detection Engineering",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 15 \u2014 Windows Event Forwarding and SOC Detection Engineering inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Review `wecutil` and the WEF architecture documentation before enabling services.",
          "If you have a Server+client lab, configure a small trusted subscription for a low-volume security event set; do not forward production logs.",
          "If a second VM is unavailable, draw a WEF topology and use exported local EVTX as the data source.",
          "Create detection idea A: repeated Event 4625 on one host within 10 minutes, excluding lab test noise.",
          "Create detection idea B: Event 4720 or a local-account creation event in an unexpected maintenance window.",
          "For each, write evidence fields, expected false positives, a triage step and a tuning approach."
        ],
        "tasks": [
          {
            "id": "task-winsec-m15-1",
            "description": "Review `wecutil` and the WEF architecture documentation before enabling services.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m15-2",
            "description": "If you have a Server+client lab, configure a small trusted subscription for a low-volume security event set; do not forward production logs.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m15-3",
            "description": "If a second VM is unavailable, draw a WEF topology and use exported local EVTX as the data source.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m15-4",
            "description": "Create detection idea A: repeated Event 4625 on one host within 10 minutes, excluding lab test noise.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m15-5",
            "description": "Create detection idea B: Event 4720 or a local-account creation event in an unexpected maintenance window.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m15-6",
            "description": "For each, write evidence fields, expected false positives, a triage step and a tuning approach.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "WEF architecture diagram and test or simulated subscription notes",
          "Two detection rule specifications with thresholds and known blind spots",
          "One sample analyst ticket with severity and escalation criteria"
        ]
      },
      "quiz": {
        "title": "Module 15 Knowledge Check: Windows Event Forwarding and SOC Detection Engineering",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "What is the primary function of Windows Event Forwarding (WEF)?",
            "options": [
              "An automated antivirus quarantine utility",
              "A native Windows log transport mechanism using WinRM/HTTP(S) to centralize event logs from multiple endpoints onto designated collector servers (WEC) without third-party agents",
              "A firewall filter that drops suspicious packets",
              "A backup tool for user desktop folders"
            ],
            "correctAnswerIndex": 1,
            "explanation": "WEF is built into Windows. Endpoints push or pull structured XML events over WinRM (WS-Management) to a centralized Windows Event Collector server for monitoring and ingestion.",
            "difficulty": "advanced"
          },
          {
            "question": "Why is alerting on an isolated Event ID (like 4625) alone typically insufficient for a reliable SOC detection rule?",
            "options": [
              "Single failed logins occur routinely from benign typos and expired credentials; robust detection requires thresholds, time windows, account context, and failure reason analysis to minimize false positives",
              "Event 4625 is deprecated by Microsoft",
              "Event 4625 only logs successful logins",
              "The event ID changes randomly after every reboot"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Everyday user typos generate sporadic 4625 events. Effective detection engineering correlates multiple failed logins within a narrow time window, tracks distinct target usernames, or monitors privileged accounts.",
            "difficulty": "advanced"
          },
          {
            "question": "How would a SOC analyst identify a log collection outage from a critical server?",
            "options": [
              "By observing a complete absence of heartbeat events or a drop to zero forwarded events below expected historical baselines for that endpoint",
              "By waiting for an email notification from the end user",
              "By rebooting the domain controller",
              "Log outages cannot be detected"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Silent logging failures occur when WinRM stalls or event subscriptions expire. Monitoring query rates against baseline ingestion volume alerts teams when an endpoint abruptly stops reporting.",
            "difficulty": "advanced"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m16",
      "title": "Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage",
      "description": "Advanced level. Suggested effort: 10\u201312 hours. Prerequisite: Module 15. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 17,
      "lessons": [
        {
          "id": "les-winsec-m16-l01",
          "slug": "m16-l1-windows-logging-for-soc-analysts",
          "title": "Module 16 - Lesson 1: Windows logging for SOC Analysts \u2014 Windows/Sysmon/PowerShell",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage. Follow in your isolated lab environment.",
          "youtubeVideoId": "svxqs_yvJIk",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage",
          "objectives": [
            "Triage Windows alerts using reproducible evidence and context.",
            "Assess likely Windows attack techniques using MITRE ATT&CK as a vocabulary.",
            "Produce an incident report with containment recommendations."
          ],
          "tags": [
            "windows-security",
            "module-16",
            "advanced"
          ],
          "skillsTaught": [
            "Alert triage",
            "Windows login abuse, suspicious PowerShell, anomalous new service/task",
            "RDP/SMB lateral-movement risk indicators from defensive telemetry",
            "Privilege-change and registry-persistence indicators"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows logging for SOC Analysts \u2014 Windows/Sysmon/PowerShell), we analyze core defensive techniques from Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 15"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows logging for SOC Analysts",
                "content": "This lesson covers Windows host and domain security concepts from Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Triage Windows alerts using reproducible evidence and context.",
                  "Assess likely Windows attack techniques using MITRE ATT&CK as a vocabulary.",
                  "Produce an incident report with containment recommendations."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Choose a scenario: (a) multiple failed lab logins, (b) unexpected benign scheduled task, or (c) unusual but benign PowerShell activity.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Create only harmless lab events with clear timestamps and test-account labels.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Collect Windows Security, Sysmon (if enabled), Defender status and Task Scheduler evidence.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Build a concise timeline: time, host, user, process, source and interpretation.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Map the *behavior category* to suitable MITRE techniques without claiming that real compromise occurred.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a 1-page incident report: hypothesis, facts, evidence, severity, false positives, containment, next steps.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Windows incident report and investigation timeline",
              "5-question SOC interview narrative using this case",
              "Evidence-to-conclusion table that distinguishes observation from inference"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 16.",
            "furtherReading": [
              {
                "title": "MITRE ATT&CK Windows techniques",
                "url": "https://attack.mitre.org/matrices/enterprise/"
              },
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              },
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              },
              {
                "title": "Sigma detection rules (open source)",
                "url": "https://github.com/SigmaHQ/sigma"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m16-l02",
          "slug": "m16-l2-trustedsec-sysmon-20",
          "title": "Module 16 - Lesson 2: TrustedSec Sysmon 20 \u2014 WMI permanent events",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage. Follow in your isolated lab environment.",
          "youtubeVideoId": "UITVJ_AozQo",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage",
          "objectives": [
            "Triage Windows alerts using reproducible evidence and context.",
            "Assess likely Windows attack techniques using MITRE ATT&CK as a vocabulary.",
            "Produce an incident report with containment recommendations."
          ],
          "tags": [
            "windows-security",
            "module-16",
            "advanced"
          ],
          "skillsTaught": [
            "Alert triage",
            "Windows login abuse, suspicious PowerShell, anomalous new service/task",
            "RDP/SMB lateral-movement risk indicators from defensive telemetry",
            "Privilege-change and registry-persistence indicators"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 20 \u2014 WMI permanent events), we analyze core defensive techniques from Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 15"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 20",
                "content": "This lesson covers Windows host and domain security concepts from Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Triage Windows alerts using reproducible evidence and context.",
                  "Assess likely Windows attack techniques using MITRE ATT&CK as a vocabulary.",
                  "Produce an incident report with containment recommendations."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Choose a scenario: (a) multiple failed lab logins, (b) unexpected benign scheduled task, or (c) unusual but benign PowerShell activity.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Create only harmless lab events with clear timestamps and test-account labels.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Collect Windows Security, Sysmon (if enabled), Defender status and Task Scheduler evidence.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Build a concise timeline: time, host, user, process, source and interpretation.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Map the *behavior category* to suitable MITRE techniques without claiming that real compromise occurred.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a 1-page incident report: hypothesis, facts, evidence, severity, false positives, containment, next steps.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Windows incident report and investigation timeline",
              "5-question SOC interview narrative using this case",
              "Evidence-to-conclusion table that distinguishes observation from inference"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 16.",
            "furtherReading": [
              {
                "title": "MITRE ATT&CK Windows techniques",
                "url": "https://attack.mitre.org/matrices/enterprise/"
              },
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              },
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              },
              {
                "title": "Sigma detection rules (open source)",
                "url": "https://github.com/SigmaHQ/sigma"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m16-l03",
          "slug": "m16-l3-trustedsec-sysmon-21",
          "title": "Module 16 - Lesson 3: TrustedSec Sysmon 21 \u2014 Process tampering indicators",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage. Follow in your isolated lab environment.",
          "youtubeVideoId": "iAJMUNt8OcY",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage",
          "objectives": [
            "Triage Windows alerts using reproducible evidence and context.",
            "Assess likely Windows attack techniques using MITRE ATT&CK as a vocabulary.",
            "Produce an incident report with containment recommendations."
          ],
          "tags": [
            "windows-security",
            "module-16",
            "advanced"
          ],
          "skillsTaught": [
            "Alert triage",
            "Windows login abuse, suspicious PowerShell, anomalous new service/task",
            "RDP/SMB lateral-movement risk indicators from defensive telemetry",
            "Privilege-change and registry-persistence indicators"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 21 \u2014 Process tampering indicators), we analyze core defensive techniques from Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 15"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 21",
                "content": "This lesson covers Windows host and domain security concepts from Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Triage Windows alerts using reproducible evidence and context.",
                  "Assess likely Windows attack techniques using MITRE ATT&CK as a vocabulary.",
                  "Produce an incident report with containment recommendations."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Choose a scenario: (a) multiple failed lab logins, (b) unexpected benign scheduled task, or (c) unusual but benign PowerShell activity.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Create only harmless lab events with clear timestamps and test-account labels.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Collect Windows Security, Sysmon (if enabled), Defender status and Task Scheduler evidence.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Build a concise timeline: time, host, user, process, source and interpretation.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Map the *behavior category* to suitable MITRE techniques without claiming that real compromise occurred.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a 1-page incident report: hypothesis, facts, evidence, severity, false positives, containment, next steps.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Windows incident report and investigation timeline",
              "5-question SOC interview narrative using this case",
              "Evidence-to-conclusion table that distinguishes observation from inference"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 16.",
            "furtherReading": [
              {
                "title": "MITRE ATT&CK Windows techniques",
                "url": "https://attack.mitre.org/matrices/enterprise/"
              },
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              },
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              },
              {
                "title": "Sigma detection rules (open source)",
                "url": "https://github.com/SigmaHQ/sigma"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m16-l04",
          "slug": "m16-l4-13cubed",
          "title": "Module 16 - Lesson 4: 13Cubed \u2014 Introduction to Windows Forensics",
          "description": "Hands-on Windows security video lesson presented by 13Cubed. Covers critical concepts from Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage. Follow in your isolated lab environment.",
          "youtubeVideoId": "VYROU-ZwZX8",
          "videoAttribution": {
            "creator": "13Cubed",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage",
          "objectives": [
            "Triage Windows alerts using reproducible evidence and context.",
            "Assess likely Windows attack techniques using MITRE ATT&CK as a vocabulary.",
            "Produce an incident report with containment recommendations."
          ],
          "tags": [
            "windows-security",
            "module-16",
            "advanced"
          ],
          "skillsTaught": [
            "Alert triage",
            "Windows login abuse, suspicious PowerShell, anomalous new service/task",
            "RDP/SMB lateral-movement risk indicators from defensive telemetry",
            "Privilege-change and registry-persistence indicators"
          ],
          "richContent": {
            "introduction": "In this lesson (13Cubed \u2014 Introduction to Windows Forensics), we analyze core defensive techniques from Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage. Follow along with 13Cubed, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 15"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: 13Cubed",
                "content": "This lesson covers Windows host and domain security concepts from Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Triage Windows alerts using reproducible evidence and context.",
                  "Assess likely Windows attack techniques using MITRE ATT&CK as a vocabulary.",
                  "Produce an incident report with containment recommendations."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Choose a scenario: (a) multiple failed lab logins, (b) unexpected benign scheduled task, or (c) unusual but benign PowerShell activity.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Create only harmless lab events with clear timestamps and test-account labels.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Collect Windows Security, Sysmon (if enabled), Defender status and Task Scheduler evidence.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Build a concise timeline: time, host, user, process, source and interpretation.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Map the *behavior category* to suitable MITRE techniques without claiming that real compromise occurred.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Write a 1-page incident report: hypothesis, facts, evidence, severity, false positives, containment, next steps.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "Windows incident report and investigation timeline",
              "5-question SOC interview narrative using this case",
              "Evidence-to-conclusion table that distinguishes observation from inference"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 16.",
            "furtherReading": [
              {
                "title": "MITRE ATT&CK Windows techniques",
                "url": "https://attack.mitre.org/matrices/enterprise/"
              },
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              },
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              },
              {
                "title": "Sigma detection rules (open source)",
                "url": "https://github.com/SigmaHQ/sigma"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m16",
        "title": "Module 16 Hands-on Lab: Windows Incident Response, Threat Scenarios and Triage",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 16 \u2014 Windows Incident Response, Threat Scenarios and Triage inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Choose a scenario: (a) multiple failed lab logins, (b) unexpected benign scheduled task, or (c) unusual but benign PowerShell activity.",
          "Create only harmless lab events with clear timestamps and test-account labels.",
          "Collect Windows Security, Sysmon (if enabled), Defender status and Task Scheduler evidence.",
          "Build a concise timeline: time, host, user, process, source and interpretation.",
          "Map the *behavior category* to suitable MITRE techniques without claiming that real compromise occurred.",
          "Write a 1-page incident report: hypothesis, facts, evidence, severity, false positives, containment, next steps.",
          "Restore the baseline snapshot or remove all simulated artifacts; verify no changes remain."
        ],
        "tasks": [
          {
            "id": "task-winsec-m16-1",
            "description": "Choose a scenario: (a) multiple failed lab logins, (b) unexpected benign scheduled task, or (c) unusual but benign PowerShell activity.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m16-2",
            "description": "Create only harmless lab events with clear timestamps and test-account labels.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m16-3",
            "description": "Collect Windows Security, Sysmon (if enabled), Defender status and Task Scheduler evidence.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m16-4",
            "description": "Build a concise timeline: time, host, user, process, source and interpretation.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m16-5",
            "description": "Map the *behavior category* to suitable MITRE techniques without claiming that real compromise occurred.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m16-6",
            "description": "Write a 1-page incident report: hypothesis, facts, evidence, severity, false positives, containment, next steps.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Windows incident report and investigation timeline",
          "5-question SOC interview narrative using this case",
          "Evidence-to-conclusion table that distinguishes observation from inference"
        ]
      },
      "quiz": {
        "title": "Module 16 Knowledge Check: Windows Incident Response, Threat Scenarios and Triage",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "Why should an analyst avoid immediately categorizing every Event 4625 spike as a brute-force attack?",
            "options": [
              "Event 4625 is only generated during system shutdown",
              "Expired service account passwords, misconfigured scheduled tasks, mobile devices with cached credentials, or script loops frequently cause high-volume 4625 spikes benignly",
              "Brute-force attacks never generate Event 4625",
              "Event 4625 is an Application log event"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A locked out account with stale stored credentials (in Outlook, mapped drives, or Windows Task Scheduler) can trigger dozens of 4625 failures per minute entirely benignly.",
            "difficulty": "advanced"
          },
          {
            "question": "What is the distinction between triage and containment in an incident response lifecycle?",
            "options": [
              "Triage scopes and validates the alert to determine authenticity, severity, and affected systems; containment takes targeted actions (isolating the host, disabling accounts, blocking IPs) to prevent further harm",
              "Containment always precedes triage",
              "Triage means wiping the affected hard drive",
              "They are synonymous terms with identical procedures"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Triage is the assessment phase to separate true positives from noise and understand scope. Containment is the tactical response phase to halt adversary spread.",
            "difficulty": "advanced"
          },
          {
            "question": "What objective evidence best justifies escalating a workstation alert to a critical incident?",
            "options": [
              "High CPU usage on the workstation",
              "Evidence of credential dumping from LSASS, unauthorized lateral movement attempts toward domain controllers, or confirmed execution of ransomware/C2 communications",
              "A user opening Command Prompt during lunch",
              "An expired Windows license notification"
            ],
            "correctAnswerIndex": 1,
            "explanation": "High-impact indicators like LSASS memory access (Sysmon 10), unauthorized PsExec/WMI execution across systems, or command-and-control beaconing indicate active intrusion requiring immediate escalation.",
            "difficulty": "advanced"
          }
        ]
      }
    },
    {
      "id": "mod-winsec-m17",
      "title": "Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness",
      "description": "Capstone level. Suggested effort: 12\u201316 hours. Prerequisite: Module 16. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check.",
      "order": 18,
      "lessons": [
        {
          "id": "les-winsec-m17-l01",
          "slug": "m17-l1-windows-event-logs-explained",
          "title": "Module 17 - Lesson 1: Windows Event Logs explained \u2014 SOC analyst walkthrough",
          "description": "Hands-on Windows security video lesson presented by Gerald Auger / Simply Cyber. Covers critical concepts from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow in your isolated lab environment.",
          "youtubeVideoId": "gRbG-8mQce0",
          "videoAttribution": {
            "creator": "Gerald Auger / Simply Cyber",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 1,
          "moduleTitle": "Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness",
          "objectives": [
            "Demonstrate end-to-end defensive analysis of a self-created Windows event story.",
            "Deliver a public-safe GitHub portfolio report with no secrets or personal data.",
            "Answer SOC L1 interview questions using evidence from your lab."
          ],
          "tags": [
            "windows-security",
            "module-17",
            "capstone"
          ],
          "skillsTaught": [
            "Case design and statement of authorized lab scope",
            "Windows baseline, test scenario and alert qualification",
            "Windows Security + Sysmon + PowerShell log correlation",
            "Incident timeline, user/host scoping and false-positive assessment"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows Event Logs explained \u2014 SOC analyst walkthrough), we analyze core defensive techniques from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow along with Gerald Auger / Simply Cyber, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 16"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows Event Logs explained",
                "content": "This lesson covers Windows host and domain security concepts from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Demonstrate end-to-end defensive analysis of a self-created Windows event story.",
                  "Deliver a public-safe GitHub portfolio report with no secrets or personal data.",
                  "Answer SOC L1 interview questions using evidence from your lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Prepare a fully updated disposable Windows VM and define scope: lab hostnames, no production endpoints, no real credentials.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Take clean snapshot; enable only the needed Windows audit and Sysmon telemetry.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Trigger three harmless and controlled actions: one failed login, a known process launch and creation/removal of a benign scheduled task.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Collect Event Viewer exports and optional Sysmon records; use PowerShell to produce a read-only evidence summary.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create a timeline that shows when each benign action occurred and whether the expected events were generated.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Develop two detection ideas (suspicious logon pattern and suspicious new task/process) and document false positives.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`CAPSTONE_REPORT.md` with executive summary, scope, evidence, investigation and recommendations",
              "`timeline.csv` and `event-map.md` (redacted, no keys/passwords)",
              "A GitHub-ready portfolio README, plus lessons learned and 15 interview answers"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 17.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "MITRE ATT&CK Windows techniques",
                "url": "https://attack.mitre.org/matrices/enterprise/"
              },
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m17-l02",
          "slug": "m17-l2-windows-logging-for-soc-analysts",
          "title": "Module 17 - Lesson 2: Windows logging for SOC Analysts \u2014 Windows/Sysmon/PowerShell",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow in your isolated lab environment.",
          "youtubeVideoId": "svxqs_yvJIk",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 2,
          "moduleTitle": "Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness",
          "objectives": [
            "Demonstrate end-to-end defensive analysis of a self-created Windows event story.",
            "Deliver a public-safe GitHub portfolio report with no secrets or personal data.",
            "Answer SOC L1 interview questions using evidence from your lab."
          ],
          "tags": [
            "windows-security",
            "module-17",
            "capstone"
          ],
          "skillsTaught": [
            "Case design and statement of authorized lab scope",
            "Windows baseline, test scenario and alert qualification",
            "Windows Security + Sysmon + PowerShell log correlation",
            "Incident timeline, user/host scoping and false-positive assessment"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows logging for SOC Analysts \u2014 Windows/Sysmon/PowerShell), we analyze core defensive techniques from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 16"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows logging for SOC Analysts",
                "content": "This lesson covers Windows host and domain security concepts from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Demonstrate end-to-end defensive analysis of a self-created Windows event story.",
                  "Deliver a public-safe GitHub portfolio report with no secrets or personal data.",
                  "Answer SOC L1 interview questions using evidence from your lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Prepare a fully updated disposable Windows VM and define scope: lab hostnames, no production endpoints, no real credentials.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Take clean snapshot; enable only the needed Windows audit and Sysmon telemetry.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Trigger three harmless and controlled actions: one failed login, a known process launch and creation/removal of a benign scheduled task.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Collect Event Viewer exports and optional Sysmon records; use PowerShell to produce a read-only evidence summary.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create a timeline that shows when each benign action occurred and whether the expected events were generated.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Develop two detection ideas (suspicious logon pattern and suspicious new task/process) and document false positives.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`CAPSTONE_REPORT.md` with executive summary, scope, evidence, investigation and recommendations",
              "`timeline.csv` and `event-map.md` (redacted, no keys/passwords)",
              "A GitHub-ready portfolio README, plus lessons learned and 15 interview answers"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 17.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "MITRE ATT&CK Windows techniques",
                "url": "https://attack.mitre.org/matrices/enterprise/"
              },
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m17-l03",
          "slug": "m17-l3-trustedsec-sysmon-6",
          "title": "Module 17 - Lesson 3: TrustedSec Sysmon 6 \u2014 Process tracking",
          "description": "Hands-on Windows security video lesson presented by TrustedSec / Carlos Perez. Covers critical concepts from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow in your isolated lab environment.",
          "youtubeVideoId": "46-alN2_vlo",
          "videoAttribution": {
            "creator": "TrustedSec / Carlos Perez",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 3,
          "moduleTitle": "Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness",
          "objectives": [
            "Demonstrate end-to-end defensive analysis of a self-created Windows event story.",
            "Deliver a public-safe GitHub portfolio report with no secrets or personal data.",
            "Answer SOC L1 interview questions using evidence from your lab."
          ],
          "tags": [
            "windows-security",
            "module-17",
            "capstone"
          ],
          "skillsTaught": [
            "Case design and statement of authorized lab scope",
            "Windows baseline, test scenario and alert qualification",
            "Windows Security + Sysmon + PowerShell log correlation",
            "Incident timeline, user/host scoping and false-positive assessment"
          ],
          "richContent": {
            "introduction": "In this lesson (TrustedSec Sysmon 6 \u2014 Process tracking), we analyze core defensive techniques from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow along with TrustedSec / Carlos Perez, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 16"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: TrustedSec Sysmon 6",
                "content": "This lesson covers Windows host and domain security concepts from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Demonstrate end-to-end defensive analysis of a self-created Windows event story.",
                  "Deliver a public-safe GitHub portfolio report with no secrets or personal data.",
                  "Answer SOC L1 interview questions using evidence from your lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Prepare a fully updated disposable Windows VM and define scope: lab hostnames, no production endpoints, no real credentials.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Take clean snapshot; enable only the needed Windows audit and Sysmon telemetry.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Trigger three harmless and controlled actions: one failed login, a known process launch and creation/removal of a benign scheduled task.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Collect Event Viewer exports and optional Sysmon records; use PowerShell to produce a read-only evidence summary.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create a timeline that shows when each benign action occurred and whether the expected events were generated.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Develop two detection ideas (suspicious logon pattern and suspicious new task/process) and document false positives.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`CAPSTONE_REPORT.md` with executive summary, scope, evidence, investigation and recommendations",
              "`timeline.csv` and `event-map.md` (redacted, no keys/passwords)",
              "A GitHub-ready portfolio README, plus lessons learned and 15 interview answers"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 17.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "MITRE ATT&CK Windows techniques",
                "url": "https://attack.mitre.org/matrices/enterprise/"
              },
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m17-l04",
          "slug": "m17-l4-13cubed",
          "title": "Module 17 - Lesson 4: 13Cubed \u2014 Introduction to Windows Forensics",
          "description": "Hands-on Windows security video lesson presented by 13Cubed. Covers critical concepts from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow in your isolated lab environment.",
          "youtubeVideoId": "VYROU-ZwZX8",
          "videoAttribution": {
            "creator": "13Cubed",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 4,
          "moduleTitle": "Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness",
          "objectives": [
            "Demonstrate end-to-end defensive analysis of a self-created Windows event story.",
            "Deliver a public-safe GitHub portfolio report with no secrets or personal data.",
            "Answer SOC L1 interview questions using evidence from your lab."
          ],
          "tags": [
            "windows-security",
            "module-17",
            "capstone"
          ],
          "skillsTaught": [
            "Case design and statement of authorized lab scope",
            "Windows baseline, test scenario and alert qualification",
            "Windows Security + Sysmon + PowerShell log correlation",
            "Incident timeline, user/host scoping and false-positive assessment"
          ],
          "richContent": {
            "introduction": "In this lesson (13Cubed \u2014 Introduction to Windows Forensics), we analyze core defensive techniques from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow along with 13Cubed, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 16"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: 13Cubed",
                "content": "This lesson covers Windows host and domain security concepts from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Demonstrate end-to-end defensive analysis of a self-created Windows event story.",
                  "Deliver a public-safe GitHub portfolio report with no secrets or personal data.",
                  "Answer SOC L1 interview questions using evidence from your lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Prepare a fully updated disposable Windows VM and define scope: lab hostnames, no production endpoints, no real credentials.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Take clean snapshot; enable only the needed Windows audit and Sysmon telemetry.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Trigger three harmless and controlled actions: one failed login, a known process launch and creation/removal of a benign scheduled task.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Collect Event Viewer exports and optional Sysmon records; use PowerShell to produce a read-only evidence summary.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create a timeline that shows when each benign action occurred and whether the expected events were generated.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Develop two detection ideas (suspicious logon pattern and suspicious new task/process) and document false positives.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`CAPSTONE_REPORT.md` with executive summary, scope, evidence, investigation and recommendations",
              "`timeline.csv` and `event-map.md` (redacted, no keys/passwords)",
              "A GitHub-ready portfolio README, plus lessons learned and 15 interview answers"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 17.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "MITRE ATT&CK Windows techniques",
                "url": "https://attack.mitre.org/matrices/enterprise/"
              },
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        },
        {
          "id": "les-winsec-m17-l05",
          "slug": "m17-l5-windows-event-forwarding-and-windows-log-collection",
          "title": "Module 17 - Lesson 5: Windows Event Forwarding and Windows log collection",
          "description": "Hands-on Windows security video lesson presented by I.T Security Labs. Covers critical concepts from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow in your isolated lab environment.",
          "youtubeVideoId": "kkzAILQc9LE",
          "videoAttribution": {
            "creator": "I.T Security Labs",
            "platform": "youtube"
          },
          "durationMinutes": 35,
          "order": 5,
          "moduleTitle": "Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness",
          "objectives": [
            "Demonstrate end-to-end defensive analysis of a self-created Windows event story.",
            "Deliver a public-safe GitHub portfolio report with no secrets or personal data.",
            "Answer SOC L1 interview questions using evidence from your lab."
          ],
          "tags": [
            "windows-security",
            "module-17",
            "capstone"
          ],
          "skillsTaught": [
            "Case design and statement of authorized lab scope",
            "Windows baseline, test scenario and alert qualification",
            "Windows Security + Sysmon + PowerShell log correlation",
            "Incident timeline, user/host scoping and false-positive assessment"
          ],
          "richContent": {
            "introduction": "In this lesson (Windows Event Forwarding and Windows log collection), we analyze core defensive techniques from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Follow along with I.T Security Labs, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
            "prerequisites": [
              "Module 16"
            ],
            "theorySections": [
              {
                "title": "Defensive Analysis: Windows Event Forwarding and Windows log collection",
                "content": "This lesson covers Windows host and domain security concepts from Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness. Always ensure snapshots are taken before changing audit policies or security baselines.",
                "keyPoints": [
                  "Demonstrate end-to-end defensive analysis of a self-created Windows event story.",
                  "Deliver a public-safe GitHub portfolio report with no secrets or personal data.",
                  "Answer SOC L1 interview questions using evidence from your lab."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Lab Step 1",
                "instruction": "Prepare a fully updated disposable Windows VM and define scope: lab hostnames, no production endpoints, no real credentials.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 2,
                "title": "Lab Step 2",
                "instruction": "Take clean snapshot; enable only the needed Windows audit and Sysmon telemetry.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 3,
                "title": "Lab Step 3",
                "instruction": "Trigger three harmless and controlled actions: one failed login, a known process launch and creation/removal of a benign scheduled task.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 4,
                "title": "Lab Step 4",
                "instruction": "Collect Event Viewer exports and optional Sysmon records; use PowerShell to produce a read-only evidence summary.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 5,
                "title": "Lab Step 5",
                "instruction": "Create a timeline that shows when each benign action occurred and whether the expected events were generated.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              },
              {
                "step": 6,
                "title": "Lab Step 6",
                "instruction": "Develop two detection ideas (suspicious logon pattern and suspicious new task/process) and document false positives.",
                "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
              }
            ],
            "expectedObservations": [
              "`CAPSTONE_REPORT.md` with executive summary, scope, evidence, investigation and recommendations",
              "`timeline.csv` and `event-map.md` (redacted, no keys/passwords)",
              "A GitHub-ready portfolio README, plus lessons learned and 15 interview answers"
            ],
            "commonMistakes": [
              "If a command is unavailable, check Windows edition/build, installed PowerShell version, optional features, and required permissions. Record that limitation rather than making up a result.",
              "If the expected security event is absent, check whether auditing was enabled, whether the event occurred on *this machine* or on the domain controller, the correct channel, and the time window.",
              "Never put passwords, tokens, BitLocker recovery keys, employee records or unrestricted host identifiers into screenshots or GitHub.",
              "Do not change settings on production PCs, work networks or systems you do not own/administer with explicit permission."
            ],
            "securityRelevance": "Understanding Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
            "summary": "Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module 17.",
            "furtherReading": [
              {
                "title": "Microsoft \u2014 Events to Monitor",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor"
              },
              {
                "title": "Advanced Windows audit policy and event IDs",
                "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/advanced-audit-policy-configuration"
              },
              {
                "title": "MITRE ATT&CK Windows techniques",
                "url": "https://attack.mitre.org/matrices/enterprise/"
              },
              {
                "title": "13Cubed free forensic cheat sheets",
                "url": "https://training.13cubed.com/downloads"
              },
              {
                "title": "TrustedSec \u2014 all 22 Learning Sysmon videos",
                "url": "https://trustedsec.com/research/learning-sysmon-video-series"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-winsec-m17",
        "title": "Module 17 Hands-on Lab: Final Capstone: Windows SOC Analyst Portfolio and Job Readiness",
        "objective": "Perform authorized, hands-on Windows defensive analysis and configuration for Module 17 \u2014 Final Capstone: Windows SOC Analyst Portfolio and Job Readiness inside an isolated virtual machine.",
        "toolsRequired": [
          "Windows 11 VM",
          "PowerShell 5.1/7",
          "Event Viewer",
          "Sysinternals Suite"
        ],
        "pcapSource": {
          "fileName": "windows-lab-environment",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "Prepare a fully updated disposable Windows VM and define scope: lab hostnames, no production endpoints, no real credentials.",
          "Take clean snapshot; enable only the needed Windows audit and Sysmon telemetry.",
          "Trigger three harmless and controlled actions: one failed login, a known process launch and creation/removal of a benign scheduled task.",
          "Collect Event Viewer exports and optional Sysmon records; use PowerShell to produce a read-only evidence summary.",
          "Create a timeline that shows when each benign action occurred and whether the expected events were generated.",
          "Develop two detection ideas (suspicious logon pattern and suspicious new task/process) and document false positives.",
          "Produce a final README, redacted screenshots, CSV timeline, event-ID map and incident case study.",
          "Restore original snapshot; recheck Windows Security and firewall status and verify cleanup.",
          "Practice 15 interview questions aloud, using the investigation to explain your reasoning."
        ],
        "tasks": [
          {
            "id": "task-winsec-m17-1",
            "description": "Prepare a fully updated disposable Windows VM and define scope: lab hostnames, no production endpoints, no real credentials.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m17-2",
            "description": "Take clean snapshot; enable only the needed Windows audit and Sysmon telemetry.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m17-3",
            "description": "Trigger three harmless and controlled actions: one failed login, a known process launch and creation/removal of a benign scheduled task.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m17-4",
            "description": "Collect Event Viewer exports and optional Sysmon records; use PowerShell to produce a read-only evidence summary.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m17-5",
            "description": "Create a timeline that shows when each benign action occurred and whether the expected events were generated.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          },
          {
            "id": "task-winsec-m17-6",
            "description": "Develop two detection ideas (suspicious logon pattern and suspicious new task/process) and document false positives.",
            "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "lab_evidence_log",
            "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
            "expectedEvidenceType": "text"
          }
        ],
        "questions": [],
        "completionCriteria": [
          "`CAPSTONE_REPORT.md` with executive summary, scope, evidence, investigation and recommendations",
          "`timeline.csv` and `event-map.md` (redacted, no keys/passwords)",
          "A GitHub-ready portfolio README, plus lessons learned and 15 interview answers"
        ]
      },
      "quiz": {
        "title": "Module 17 Knowledge Check: Final Capstone: Windows SOC Analyst Portfolio and Job Readiness",
        "passingScorePercent": 70,
        "questions": [
          {
            "question": "How do you verify an alert detection rather than assuming the test activity generated logs?",
            "options": [
              "Assume that running the test command always produces logs",
              "Query the specific log channel (Security/Sysmon) with exact timestamps, verify the expected Event IDs and fields were generated with matching parameters, and confirm no auditing gaps exist",
              "Check if the VM hard drive has free space",
              "Reinstall Windows to confirm"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Verification requires empirical proof: validating that the event provider emitted the expected record, that audit policies didn't drop it, and that timestamps and attributes match the action.",
            "difficulty": "advanced"
          },
          {
            "question": "Which two complementary Windows data sources provide the highest confidence during endpoint process investigation?",
            "options": [
              "Windows Security Event 4688 (with command-line logging enabled) and Sysmon Event 1 (process creation with hashes, GUIDs, and parent trees)",
              "System Event 6005 and Application Event 1000",
              "Windows Update logs and Device Manager",
              "Calculator history and Notepad recent files"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Event 4688 provides native security auditing of process executions, while Sysmon Event 1 complements it with cryptographic hashes (SHA256), process GUIDs, and full parent command-line telemetry.",
            "difficulty": "advanced"
          },
          {
            "question": "If a pattern of anomalous account creation (Event 4720) or privilege escalation appears on a corporate Domain Controller, why is immediate escalation required?",
            "options": [
              "Because Domain Controllers represent the root of trust in Active Directory; unauthorized administrative changes can compromise the entire enterprise identity boundary",
              "Because Domain Controllers shut down automatically when 4720 occurs",
              "Because Domain Controllers cannot be restored from backups",
              "Because Microsoft will cancel the enterprise license"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Domain Controllers are Tier 0 identity assets. Compromising a DC compromises every user, computer, and credential in the domain, requiring immediate containment.",
            "difficulty": "advanced"
          }
        ]
      },
      "capstoneAssessment": {
        "id": "capstone-windows-soc-analyst-portfolio",
        "title": "Final Capstone: Windows SOC Analyst Portfolio and Job Readiness",
        "scenario": "Execute end-to-end defensive triage of a benign multi-stage Windows event scenario in your isolated lab. Configure native auditing and Sysmon telemetry, trigger controlled benign authentication and process activities, correlate Event Viewer and Sysmon event records into a chronological timeline, engineer detection logic with false-positive controls, and compile a sanitized public-safe SOC portfolio report.",
        "pcapSource": {
          "fileName": "windows-soc-lab-vm",
          "fileUrl": "https://www.microsoft.com/software-download/windows11"
        },
        "totalMarks": 100,
        "passingScore": 75,
        "rubric": [
          {
            "category": "Lab Scope, Safety and Reproducibility",
            "marks": 15,
            "criteria": [
              "Isolated lab VM configuration documented with build, network modes, and ethical boundary statement",
              "Clean baseline snapshots established and verified prior to scenario execution"
            ]
          },
          {
            "category": "Windows Event & Telemetry Collection",
            "marks": 20,
            "criteria": [
              "Audit policies correctly configured and validated with auditpol",
              "Security, System, and Sysmon event records accurately extracted with matching parameters"
            ]
          },
          {
            "category": "Timeline Analysis & Process Lineage",
            "marks": 20,
            "criteria": [
              "Comprehensive UTC-normalized timeline correlating timestamps, PIDs, parents, and user accounts",
              "Accurate distinction between observed factual evidence and investigative hypotheses"
            ]
          },
          {
            "category": "False-Positive Analysis & Limitations",
            "marks": 15,
            "criteria": [
              "Thorough evaluation of legitimate business activities that could trigger the observed event signatures",
              "Honest identification of telemetry blind spots and log retention limitations"
            ]
          },
          {
            "category": "Detection Engineering & Mitigation",
            "marks": 15,
            "criteria": [
              "Two high-fidelity detection rule specifications with thresholds, time windows, and tuning guidance",
              "Actionable host hardening and response recommendations"
            ]
          },
          {
            "category": "Professional Reporting & Presentation",
            "marks": 15,
            "criteria": [
              "Comprehensive sanitized CAPSTONE_REPORT.md suitable for technical portfolio review",
              "Answers prepared for 15 SOC L1/L2 technical interview questions"
            ]
          }
        ],
        "submissionSections": [
          {
            "id": "sec-lab-scope",
            "title": "Scope & Laboratory Environment Baseline",
            "prompt": "Provide your lab-inventory.md detailing OS build, virtualization settings, host-only networking, and statement of authorized scope.",
            "maxMarks": 15
          },
          {
            "id": "sec-telemetry-collection",
            "title": "Telemetry Collection & Event Manifest",
            "prompt": "Provide sanitized EVTX/CSV extracts and configuration hashes for auditpol and Sysmon.",
            "maxMarks": 20
          },
          {
            "id": "sec-incident-timeline",
            "title": "Chronological Incident Timeline & Process Lineage",
            "prompt": "Provide your normalized UTC timeline correlating login events (4624/4625), process launches (4688/Sysmon 1), and scheduled tasks.",
            "maxMarks": 20
          },
          {
            "id": "sec-false-positives",
            "title": "False-Positive Analysis & Blind Spots",
            "prompt": "Document at least three benign causes for the observed telemetry and describe audit logging gaps.",
            "maxMarks": 15
          },
          {
            "id": "sec-detection-rules",
            "title": "Detection Engineering & Triage Escalation Playbook",
            "prompt": "Provide logic for two detection rules (e.g. repeated 4625 brute-force and suspicious task creation) with severity and triage steps.",
            "maxMarks": 15
          },
          {
            "id": "sec-executive-summary",
            "title": "Executive Summary & Job-Readiness Presentation",
            "prompt": "Submit your CAPSTONE_REPORT.md executive summary and answers to 5 key SOC interview questions.",
            "maxMarks": 15
          }
        ]
      }
    }
  ]
};

// Wire capstone assessment to course root for universal access
WINDOWS_SECURITY_ZERO_TO_ADVANCED_COURSE.capstone = WINDOWS_SECURITY_ZERO_TO_ADVANCED_COURSE.modules[17]?.capstoneAssessment;

