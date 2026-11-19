import glob
import os
import re
import json

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

MODULE_QUIZZES = {
    0: [
        {
            "question": "What is a VM snapshot, and what does it not back up?",
            "options": [
                "A full external backup of your physical computer's hard drive",
                "A point-in-time state of the virtual machine's disk and memory; it does not replace independent off-site backups or protect against host drive failures",
                "An export of Windows event logs to a cloud SIEM",
                "A duplicate copy of the hypervisor installation binary"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A VM snapshot captures the state and data of a virtual machine at a specific point in time, enabling fast rollback during experiments. It relies on the host disk and is not an independent backup."
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
            "explanation": "Bridged networking assigns the guest VM an IP address on your physical LAN, so any scanning or broadcast traffic touches production/home devices. Host-only or isolated internal switches keep test traffic contained."
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
            "explanation": "Windows 11 Pro includes enterprise management features like Local Group Policy, BitLocker Drive Encryption, and Active Directory domain joining that are restricted or absent in Home edition."
        }
    ],
    1: [
        {
            "question": "What is the difference between a service and a standard process in Windows?",
            "options": [
                "Services run exclusively in kernel mode, while processes run in user mode",
                "A process is an executing program instance with its own virtual address space, while a service is a specialized background process managed by the Service Control Manager that can run without an interactive user logon",
                "Services are only written in PowerShell",
                "A process cannot open network sockets"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Windows services are specialized background processes supervised by services.exe (SCM). They typically start at boot time and operate under system accounts (SYSTEM, Network Service, Local Service) without requiring a logged-in user."
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
            "explanation": "UAC enforces the principle of least privilege by running administrative user sessions with a restricted standard token by default, prompting for elevation before high-integrity actions are permitted."
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
            "explanation": "An event provider is a software module or driver that defines and publishes structured telemetry events via ETW to channels like Security, System, or Application."
        }
    ],
    2: [
        {
            "question": "Why are PowerShell pipeline objects fundamentally different from CMD text streams?",
            "options": [
                "CMD sends structured JSON while PowerShell sends plain text strings",
                "PowerShell passes rich .NET objects with typed properties and methods through the pipeline, whereas CMD passes raw unstructured text streams that require manual string parsing",
                "PowerShell commands run in the kernel whereas CMD runs in userland",
                "PowerShell pipelines do not support filtering"
            ],
            "correctAnswerIndex": 1,
            "explanation": "PowerShell pipelines pass structured .NET objects. Downstream cmdlets can directly inspect object properties (e.g. .Id, .Path, .Status) without regex or string slicing."
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
            "explanation": "In Windows PowerShell 5.1, Export-Csv prepends '#TYPE Selected.System.Management.Automation...' as line 1. -NoTypeInformation suppresses this header for RFC-compliant CSV output."
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
            "explanation": "Under UAC, an administrative user has split tokens. A non-elevated session carries a medium-integrity token with administrative SIDs set to 'deny only', blocking elevated tasks like reading Security.evtx."
        }
    ],
    3: [
        {
            "question": "Is membership in Administrators equivalent to every process being elevated?",
            "options": [
                "Yes, every process spawned by an administrator immediately receives high integrity",
                "No, under UAC, interactive processes run with a filtered standard user token until explicitly elevated via consent prompt",
                "Only CMD processes are elevated, whereas PowerShell is never elevated",
                "Only processes with signed certificates are elevated"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Membership in the Administrators group does not automatically elevate every process. By default, applications run with medium integrity until explicitly elevated."
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
            "explanation": "Share permissions only control access over network SMB shares, while NTFS permissions govern the underlying filesystem directly. When accessing across a network, the effective permission is the most restrictive combination."
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
            "explanation": "A SID (e.g., S-1-5-21-...) is a variable-length string that uniquely and immutably identifies a user account, security group, or computer account across the operating system."
        }
    ],
    4: [
        {
            "question": "Why does a strange or unfamiliar filename alone not prove malware?",
            "options": [
                "File names are permanently locked by the NTFS filesystem",
                "Legitimate third-party applications and system utilities often use obscure or auto-generated names; analysts must examine file paths, digital signatures, hashes, parent processes, and behavior",
                "Windows automatically deletes files with suspicious names",
                "Strange file names only occur on Linux systems"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Legitimate software updaters and temporary installers frequently generate random strings. Defenders must correlate executable location, Authenticode signatures, hash reputation, and process lineage."
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
            "explanation": "PPID records the PID of the process responsible for creating a child process. Analyzing parent-child relationships (e.g. winword.exe spawning powershell.exe) is a core detection pattern."
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
            "explanation": "A baseline establishes expected, legitimate background behavior on clean endpoints, making unusual scheduled tasks, registry Run keys, or rogue services stand out immediately."
        }
    ],
    5: [
        {
            "question": "What is the difference between inbound and outbound firewall filtering?",
            "options": [
                "Inbound regulates traffic initiated from external systems toward the host; outbound filters traffic originating on the local host attempting to reach external destinations",
                "Inbound applies only to UDP, while outbound applies only to TCP",
                "Outbound filtering is only supported on Windows Server",
                "Inbound filtering only inspects port 80"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Inbound rules filter packets arriving from other machines trying to connect to local ports, whereas outbound rules govern connections initiated by local processes to external servers."
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
            "explanation": "Many normal Windows components (e.g., RPC on 135, SMB on 445, WinRM on 5985) legitimately listen for connections. Triage requires verifying the hosting binary and account."
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
            "explanation": "The Public profile assumes the local subnet contains untrusted machines (such as public Wi-Fi). Windows turns off file sharing and discovery to prevent unauthorized inbound access."
        }
    ],
    6: [
        {
            "question": "Are Microsoft Defender Antivirus and Microsoft Defender for Endpoint identical?",
            "options": [
                "Yes, they are the exact same product with different names",
                "No, Defender Antivirus is the built-in local endpoint AV engine, whereas Defender for Endpoint is an enterprise cloud-managed XDR/EDR platform offering centralized hunting, response, and behavioral analysis",
                "Defender Antivirus only runs on Windows 7",
                "Defender for Endpoint is a hardware appliance"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Defender Antivirus is the client-side signature and heuristic engine built into Windows. Defender for Endpoint (MDE) is a licensed cloud-connected EDR suite with live device response, telemetry aggregation, and automated investigation."
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
            "explanation": "Turning off protection blinds the analyst to real-world defensive telemetry (Defender operational event IDs, AMSI alerts) and leaves the testing machine unguarded."
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
            "explanation": "Without the 48-digit recovery key or password, encrypted volume data cannot be decrypted if the platform configuration registers (PCRs) fail to validate against the TPM."
        }
    ],
    7: [
        {
            "question": "Does the absence of Event 4688 prove that no process was created?",
            "options": [
                "Yes, Event 4688 is always logged by default on every Windows edition",
                "No, process creation auditing must be explicitly enabled in audit policy; without it, processes spawn without generating Event 4688",
                "Yes, Windows Event Viewer cannot miss events",
                "No, but only if the user logged out first"
            ],
            "correctAnswerIndex": 1,
            "explanation": "In standard Windows default configurations, Detailed Tracking > Audit Process Creation is not enabled, meaning process executions occur silently without emitting Event 4688."
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
            "explanation": "Logon types indicate the authentication mechanism: Type 2 is local interactive, Type 3 is network (SMB/RPC), Type 5 is service, and Type 10 is Remote Desktop (RDP), pinpointing how an attacker accessed the machine."
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
            "explanation": "Local accounts authenticate against the local SAM database and log to the endpoint's Security.evtx. Domain accounts authenticate against Active Directory Domain Controllers, which record Kerberos/NTLM authentication events."
        }
    ],
    8: [
        {
            "question": "Does Sysmon itself block malicious actions?",
            "options": [
                "Yes, Sysmon is an endpoint prevention and blocking tool",
                "No, Sysmon is a host-level telemetry collection driver and service that logs detailed system activity to the event log; it does not block actions",
                "Sysmon blocks network traffic but allows processes",
                "Sysmon quarantines malicious files automatically"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Sysmon is an auditing and observability tool. It monitors system activity and writes rich events into the Microsoft-Windows-Sysmon/Operational log channel; it is not an antivirus or EDR blocking engine."
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
            "explanation": "Sysmon operates strictly according to its XML configuration schema. Many production configurations filter out or exclude Event 3 entirely due to the extreme volume of network packets generated by modern browsers."
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
            "explanation": "Sysmon generates unique GUIDs (ProcessGuid and ParentProcessGuid) alongside OS PIDs to disambiguate process lineage, preventing PID reuse confusion across reboots or long running sessions."
        }
    ],
    9: [
        {
            "question": "What is the Antimalware Scan Interface (AMSI)?",
            "options": [
                "A hardware firewall integrated into the motherboard",
                "An interface standard allowing applications and script hosts (like PowerShell) to integrate with the installed antivirus product to inspect content and dynamic buffers in memory before execution",
                "A PowerShell module for downloading files from GitHub",
                "An encryption algorithm for securing scripts on disk"
            ],
            "correctAnswerIndex": 1,
            "explanation": "AMSI is a vendor-agnostic API that allows script engines (PowerShell, VBScript, JScript, .NET) to submit de-obfuscated buffers and in-memory scripts to antivirus engines before execution."
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
            "explanation": "Microsoft explicitly documents that execution policy is a safety convenience to prevent users from accidentally double-clicking unvetted scripts, not an enforceable security boundary."
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
            "explanation": "While 4688 captures the initial arguments passed to powershell.exe, Event 4104 captures the full script content, including decoded chunks of obfuscated commands executed dynamically."
        }
    ],
    10: [
        {
            "question": "Why is DNS critical for Active Directory domain joining?",
            "options": [
                "DNS assigns IP addresses via DHCP to joining machines",
                "Domain clients rely on DNS Service (SRV) records to discover domain controllers, Kerberos key distribution centers (KDC), and LDAP services",
                "DNS encrypts the password entered during domain join",
                "DNS is only required if the client uses Wi-Fi"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Active Directory depends heavily on DNS SRV records (e.g. _ldap._tcp.dc._msdcs.domain) to locate DCs and authentication endpoints. If a client points to an external DNS resolver like 8.8.8.8, domain join fails."
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
            "explanation": "DCs run Active Directory Domain Services (AD DS), store identity objects in NTDS.dit, manage replication among partners, issue Kerberos tickets, and distribute Group Policies."
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
            "explanation": "Domain groups exist in Active Directory and apply across all domain-joined resources, whereas local groups exist purely inside an individual endpoint's local SAM database."
        }
    ],
    11: [
        {
            "question": "Where are domain Kerberos authentication events (4768, 4769) primarily investigated?",
            "options": [
                "On the local client endpoint's Application log",
                "On Domain Controllers where the Kerberos Key Distribution Center (KDC) issues Ticket Granting Tickets (TGTs) and Service Tickets (TGSs)",
                "In the root of the C:\\ drive",
                "Exclusively on the perimeter firewall"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The KDC service runs on Domain Controllers. When users request TGTs (4768) or service tickets (4769), these authentication events are generated in the DC's Security log."
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
            "explanation": "Interactive logons place Kerberos tickets and credential hashes into LSASS memory on the target machine. Compromise of a single standard endpoint can compromise the entire domain if Domain Admins log into it."
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
            "explanation": "Linking GPOs to specific OUs ensures that security configurations, audit policies, or restrictions only apply to intended test or department assets rather than impacting the entire domain."
        }
    ],
    12: [
        {
            "question": "Why should security teams test a baseline before applying it across production?",
            "options": [
                "Security baselines contain intentional malware",
                "Baselines enforce strict configurations (disabling legacy protocols, tightening authentication, restricting rights) that can break legacy line-of-business applications and operational services",
                "Baselines permanently delete all user accounts",
                "Microsoft does not allow deploying baselines without testing"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Tightening configurations (such as blocking NTLM, enforcing SMB signing, or disabling macros) can break legitimate legacy business systems. Staged rollouts in audit mode prevent outages."
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
            "explanation": "Audit mode logs policy match events (Event ID 8003 in AppLocker) without blocking execution, giving engineers the data needed to whitelist essential tools before turning on enforcement."
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
            "explanation": "LAPS automatically generates and rotates unique, random passwords for each endpoint's built-in local administrator account, preventing pass-the-hash or credential reuse lateral movement across systems."
        }
    ],
    13: [
        {
            "question": "Why should an analyst avoid immediately deleting an unfamiliar Autorun entry during live triage?",
            "options": [
                "Deleting an entry without investigating destroys volatile forensic evidence and can corrupt necessary operating system boot components or legitimate software dependencies",
                "Autoruns entries cannot be deleted under Windows",
                "Deleting entries causes an immediate kernel crash",
                "Microsoft requires all autoruns to remain active for 30 days"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Immediate deletion destroys key forensic indicators (file paths, registry keys, timestamps) and risks breaking critical system drivers or enterprise management agents."
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
            "explanation": "Commercial code signing certificates require paid third-party verification. Many internal enterprise utilities and open-source tools remain unsigned without being malicious."
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
            "explanation": "Attackers frequently execute commands that run for only a few milliseconds (e.g. whoami, net user). Process Explorer misses exited processes, while Sysmon permanently records them in Event 1."
        }
    ],
    14: [
        {
            "question": "Why does a file's Last Modified timestamp alone not prove execution?",
            "options": [
                "Windows does not track file modification times",
                "Modifying or saving a file changes its Last Write timestamp without ever running or loading its code into memory; execution artifacts like Prefetch, Shimcache, and Amcache provide evidence of execution",
                "Timestamps are always randomized by the NTFS driver",
                "Only read timestamps can prove execution"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A file can be written to disk, modified, or downloaded without ever executing. Proof of execution requires specific execution artifacts such as Prefetch (.pf), UserAssist, Shimcache, or Event 4688."
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
            "explanation": "Artifacts record timestamps in different formats (UTC in EVTX, local time in FAT/registry). Failing to record and normalize time zones leads to misaligned timelines and false conclusions."
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
            "explanation": "Volatile memory (RAM) is lost when power is disconnected, so live triage and memory acquisition must occur before rebooting. Non-volatile storage (disks, logs) persists across reboots."
        }
    ],
    15: [
        {
            "question": "What is the primary function of Windows Event Forwarding (WEF)?",
            "options": [
                "An automated antivirus quarantine utility",
                "A native Windows log transport mechanism using WinRM/HTTP(S) to centralize event logs from multiple endpoints onto designated collector servers (WEC) without third-party agents",
                "A firewall filter that drops suspicious packets",
                "A backup tool for user desktop folders"
            ],
            "correctAnswerIndex": 1,
            "explanation": "WEF is built into Windows. Endpoints push or pull structured XML events over WinRM (WS-Management) to a centralized Windows Event Collector server for monitoring and ingestion."
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
            "explanation": "Everyday user typos generate sporadic 4625 events. Effective detection engineering correlates multiple failed logins within a narrow time window, tracks distinct target usernames, or monitors privileged accounts."
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
            "explanation": "Silent logging failures occur when WinRM stalls or event subscriptions expire. Monitoring query rates against baseline ingestion volume alerts teams when an endpoint abruptly stops reporting."
        }
    ],
    16: [
        {
            "question": "Why should an analyst avoid immediately categorizing every Event 4625 spike as a brute-force attack?",
            "options": [
                "Event 4625 is only generated during system shutdown",
                "Expired service account passwords, misconfigured scheduled tasks, mobile devices with cached credentials, or script loops frequently cause high-volume 4625 spikes benignly",
                "Brute-force attacks never generate Event 4625",
                "Event 4625 is an Application log event"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A locked out account with stale stored credentials (in Outlook, mapped drives, or Windows Task Scheduler) can trigger dozens of 4625 failures per minute entirely benignly."
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
            "explanation": "Triage is the assessment phase to separate true positives from noise and understand scope. Containment is the tactical response phase to halt adversary spread."
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
            "explanation": "High-impact indicators like LSASS memory access (Sysmon 10), unauthorized PsExec/WMI execution across systems, or command-and-control beaconing indicate active intrusion requiring immediate escalation."
        }
    ],
    17: [
        {
            "question": "How do you verify an alert detection rather than assuming the test activity generated logs?",
            "options": [
                "Assume that running the test command always produces logs",
                "Query the specific log channel (Security/Sysmon) with exact timestamps, verify the expected Event IDs and fields were generated with matching parameters, and confirm no auditing gaps exist",
                "Check if the VM hard drive has free space",
                "Reinstall Windows to confirm"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Verification requires empirical proof: validating that the event provider emitted the expected record, that audit policies didn't drop it, and that timestamps and attributes match the action."
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
            "explanation": "Event 4688 provides native security auditing of process executions, while Sysmon Event 1 complements it with cryptographic hashes (SHA256), process GUIDs, and full parent command-line telemetry."
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
            "explanation": "Domain Controllers are Tier 0 identity assets. Compromising a DC compromises every user, computer, and credential in the domain, requiring immediate containment."
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
        clean = item.replace("'", "''")
        escaped_items.append(f"'{clean}'")
    return f"ARRAY[{', '.join(escaped_items)}]::TEXT[]"

def generate():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    mod_files = sorted(glob.glob(os.path.join(base_dir, 'docs/courses/windows-security-zero-to-advanced/modules/[0-9][0-9]*.md')))
    print(f"Generating Windows course from {len(mod_files)} files...")
    
    modules = []
    sql_modules = []
    sql_lessons = []
    
    total_minutes = 0
    course_uuid = "d8b00000-0000-4000-8000-000000000001"
    
    for idx_zero, mf in enumerate(mod_files):
        mod_num = int(os.path.basename(mf)[:2])
        display_num = mod_num
        
        with open(mf, 'r', encoding='utf-8') as f:
            content = f.read()

        lines = content.splitlines()
        title = lines[0].replace('# ', '').strip()
        
        meta_line = lines[1] if len(lines) > 1 else ""
        if not meta_line and len(lines) > 2:
            meta_line = lines[2]
            
        level_match = re.search(r'\*\*Level:\*\*\s*([^|]+)', meta_line)
        duration_match = re.search(r'\*\*Suggested effort:\*\*\s*([^|]+)', meta_line)
        prereq_match = re.search(r'\*\*Prerequisite:\*\*\s*([^\n]+)', meta_line)
        
        level = level_match.group(1).strip() if level_match else "Beginner"
        duration = duration_match.group(1).strip() if duration_match else "6–8 hours"
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

        video_sec = sections.get("Free YouTube video lesson(s) — watch in this order", "")
        raw_videos = []
        for line in video_sec.splitlines():
            matches = re.findall(r'\[(.*?)\]\((https?://(?:www\.)?(?:youtube\.com/watch\?v=|youtu\.be/)([a-zA-Z0-9_-]{11})[^\)]*)\)', line)
            for v_title, url, vid in matches:
                creator = "Windows Security Community"
                if "Garage Tec" in v_title or "Garage Tec" in line:
                    creator = "Garage Tec"
                elif "CyberPatriot" in v_title or "CyberPatriot" in line:
                    creator = "CyberPatriot"
                elif "PowerShell Full Course" in v_title or "freeCodeCamp" in line:
                    creator = "freeCodeCamp"
                elif "TrustedSec" in v_title or "TrustedSec" in line or "Sysmon" in v_title:
                    creator = "TrustedSec / Carlos Perez"
                elif "13Cubed" in v_title or "13Cubed" in line:
                    creator = "13Cubed"
                elif "Windows Server 2025" in v_title or "Travis Roberts" in line:
                    creator = "Travis Roberts"
                elif "Create a GPO" in v_title:
                    creator = "ITProTV / ACI Learning"
                elif "Windows logging for SOC Analysts" in v_title:
                    creator = "MyDFIR"
                elif "Windows Event Logs explained" in v_title:
                    creator = "Gerald Auger / Simply Cyber"
                elif "Windows Event Forwarding" in v_title:
                    creator = "I.T Security Labs"
                elif "Defender Firewall" in v_title:
                    creator = "Kevin Stratvert"
                elif "BitLocker" in v_title:
                    creator = "Britec09"
                elif "Defender Antivirus" in v_title:
                    creator = "Windows Security Guides"
                
                clean_title = v_title.split("—")[0].strip()
                if not any(v['videoId'] == vid and v['url'] == url for v in raw_videos):
                    raw_videos.append({
                        "rawTitle": v_title,
                        "title": clean_title,
                        "url": url,
                        "videoId": vid,
                        "creator": creator
                    })

        obj_sec = sections.get("Learning outcomes", "")
        objectives = [re.sub(r'^\d+\.\s*', '', l).strip() for l in obj_sec.splitlines() if re.match(r'^\d+\.', l.strip())]

        chk_sec = sections.get("Detailed topics checklist", "")
        checklist = [re.sub(r'^-\s*\[\s*\]\s*', '', l).strip() for l in chk_sec.splitlines() if l.strip().startswith('-')]

        lab_sec = sections.get("Hands-on lab — detailed procedure", "")
        lab_steps = [re.sub(r'^\d+\.\s*', '', l).strip() for l in lab_sec.splitlines() if re.match(r'^\d+\.', l.strip())]

        res_sec = ""
        for k in sections:
            if "What successful completion looks like" in k or k.startswith("What successful"):
                res_sec = sections[k]
        if not res_sec:
            comp_match = re.search(r'### What successful completion looks like\s*\n\n(.*?)(?=\n\n###|\n\n##|$)', content, re.DOTALL)
            if comp_match:
                res_sec = comp_match.group(1).strip()
        expected_results = [re.sub(r'^-\s*', '', l).strip() for l in res_sec.splitlines() if l.strip().startswith('-')]

        mis_sec = ""
        for k in sections:
            if "Troubleshooting and common mistakes" in k:
                mis_sec = sections[k]
        if not mis_sec:
            mis_match = re.search(r'### Troubleshooting and common mistakes\s*\n\n(.*?)(?=\n\n##|$)', content, re.DOTALL)
            if mis_match:
                mis_sec = mis_match.group(1).strip()
        mistakes = [re.sub(r'^-\s*', '', l).strip() for l in mis_sec.splitlines() if l.strip().startswith('-')]

        ref_sec = sections.get("Free reading and downloadable tools", "")
        ref_matches = re.findall(r'\[(.*?)\]\((https?://[^\)]+)\)', ref_sec)
        references = [{"title": r[0], "url": r[1]} for r in ref_matches]

        mod_order = idx_zero + 1
        mod_uuid = f"d8b00000-0000-4000-8000-0000000001{display_num:02d}"
        mod_id = f"mod-winsec-m{display_num:02d}"
        mod_desc = f"{level} level. Suggested effort: {duration}. Prerequisite: {prereq}. Complete all hands-on procedures, analyze Windows telemetry, and pass the knowledge check."

        module_lessons = []
        for l_idx, v in enumerate(raw_videos, 1):
            les_uuid = f"d8b00000-0000-4000-8000-000000{display_num:02d}00{l_idx:02d}"
            les_id = f"les-winsec-m{display_num:02d}-l{l_idx:02d}"
            les_slug = f"m{display_num:02d}-l{l_idx}-{slugify(v['title'])}"
            les_title = f"Module {display_num:02d} - Lesson {l_idx}: {v['rawTitle']}"
            les_duration = 35
            total_minutes += les_duration
            
            les_desc = f"Hands-on Windows security video lesson presented by {v['creator']}. Covers critical concepts from {title}. Follow in your isolated lab environment."
            
            procedures = []
            for s_i, step in enumerate(lab_steps[:6], 1):
                procedures.append({
                    "step": s_i,
                    "title": f"Lab Step {s_i}",
                    "instruction": step,
                    "expectedOutcome": "Step verified in Windows 11/Server console with state documented."
                })
            
            rich_content = {
                "introduction": f"In this lesson ({v['rawTitle']}), we analyze core defensive techniques from {title}. Follow along with {v['creator']}, observe Windows event generation, and reproduce configurations in your authorized lab VM.",
                "prerequisites": [prereq] if prereq != "None" else ["Isolated Windows lab virtual machine"],
                "theorySections": [
                    {
                        "title": f"Defensive Analysis: {v['title']}",
                        "content": f"This lesson covers Windows host and domain security concepts from {title}. Always ensure snapshots are taken before changing audit policies or security baselines.",
                        "keyPoints": objectives[:4] if objectives else checklist[:4]
                    }
                ],
                "stepByStepProcedures": procedures,
                "expectedObservations": expected_results[:4],
                "commonMistakes": mistakes[:4],
                "securityRelevance": f"Understanding {title} is critical for SOC analysts to recognize normal behavior, triage suspicious activity, and audit Windows endpoints.",
                "summary": f"Complete all lab verifications, record evidentiary artifacts, and pass the knowledge check for Module {display_num:02d}.",
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
                "objectives": objectives[:4] if objectives else checklist[:4],
                "tags": ["windows-security", f"module-{display_num:02d}", slugify(level)],
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
                "objectives": objectives[:4] if objectives else checklist[:4],
                "tags": ["windows-security", f"module-{display_num:02d}", slugify(level)],
                "skills_taught": [c.split(":")[0].replace("**", "") for c in checklist[:4]]
            })

        practical_lab = {
            "id": f"lab-winsec-m{display_num:02d}",
            "title": f"Module {display_num:02d} Hands-on Lab: {title.split('—')[-1].strip()}",
            "objective": f"Perform authorized, hands-on Windows defensive analysis and configuration for {title} inside an isolated virtual machine.",
            "toolsRequired": ["Windows 11 VM", "PowerShell 5.1/7", "Event Viewer", "Sysinternals Suite"],
            "pcapSource": {
                "fileName": "windows-lab-environment",
                "fileUrl": "https://www.microsoft.com/software-download/windows11"
            },
            "difficulty": "beginner" if "Beginner" in level or "Foundation" in level else "intermediate" if "Intermediate" in level else "advanced",
            "estimatedMinutes": 60,
            "instructions": lab_steps if lab_steps else ["Complete all guided procedures in your Windows lab VM."],
            "tasks": [
                {
                    "id": f"task-winsec-m{display_num:02d}-{t_i+1}",
                    "description": step,
                    "hint": "Verify command output, inspect relevant event channels, and preserve evidence screenshots."
                }
                for t_i, step in enumerate(lab_steps[:6])
            ],
            "evidenceWorksheet": [
                {
                    "field": "lab_evidence_log",
                    "prompt": "Document your command execution, observed event IDs, and sanitized screenshot paths",
                    "expectedEvidenceType": "text"
                }
            ],
            "questions": [],
            "completionCriteria": expected_results if expected_results else ["All lab procedures successfully executed and documented."]
        }

        q_data = MODULE_QUIZZES.get(mod_num, [])
        quiz = {
            "title": f"Module {display_num:02d} Knowledge Check: {title.split('—')[-1].strip()}",
            "passingScorePercent": 70,
            "questions": [
                {
                    "question": q["question"],
                    "options": q["options"],
                    "correctAnswerIndex": q["correctAnswerIndex"],
                    "explanation": q["explanation"],
                    "difficulty": "beginner" if "Beginner" in level or "Foundation" in level else "intermediate" if "Intermediate" in level else "advanced"
                }
                for q in q_data
            ]
        }

        mod_obj = {
            "id": mod_id,
            "title": title,
            "description": mod_desc,
            "order": mod_order,
            "lessons": module_lessons,
            "practicalLab": practical_lab,
            "quiz": quiz
        }
        
        if mod_num == 17:
            capstone = {
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
            mod_obj["capstoneAssessment"] = capstone

        modules.append(mod_obj)
        
        sql_modules.append({
            "uuid": mod_uuid,
            "title": title,
            "description": mod_desc,
            "order_index": mod_order
        })

    course_data = {
        "id": "course-windows-security-zero-to-advanced",
        "slug": "windows-security-zero-to-advanced",
        "title": "Windows Security for Cybersecurity — Zero to Advanced",
        "shortDescription": "A 100% Windows-focused, 18-week zero-to-advanced cybersecurity curriculum with 60 video lessons, hands-on labs, Sysmon, Active Directory, event triage, forensics, and SOC capstone.",
        "description": "An intensive, hands-on 18-week Windows-focused cybersecurity syllabus designed for aspiring SOC L1/L2 analysts, incident responders, and Windows defenders. Master Windows 11 and Server 2025 architecture, CMD/PowerShell essentials, NTFS permissions and UAC, processes and persistence mechanisms, Windows Firewall and networking, Defender AV and BitLocker, Event Viewer audit policies and key security event IDs (4624, 4625, 4688, 1102), complete TrustedSec Sysmon deployment and telemetry analysis, Active Directory DS, Kerberos ticket inspection, Group Policy security, Windows hardening baselines, Sysinternals threat hunting (Process Explorer, Autoruns), DFIR evidence extraction (MFT, Prefetch, Registry), Windows Event Forwarding (WEF), and alert triage through an end-to-end SOC capstone portfolio project.",
        "domains": ["soc-blue-team", "dfir", "fundamentals"],
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
        "estimatedDuration": "18 weeks (130–175 hours)",
        "totalDurationMinutes": total_minutes,
        "instructor": {
            "name": "TrustedSec, 13Cubed & Open Windows Security Community",
            "title": "Windows Security & DFIR Educators",
            "organization": "TrustedSec, 13Cubed, CyberPatriot & Garage Tec"
        },
        "prerequisites": [
            "A PC capable of running 64-bit virtualization with at least 16 GB RAM (24–32 GB recommended for Active Directory labs)",
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
        "featured": True,
        "track": "cybersecurity",
        "modules": modules
    }
    
    ts_content = "import { Course } from '../types/course';\n\n"
    ts_content += f"export const WINDOWS_SECURITY_ZERO_TO_ADVANCED_COURSE: Course = {json.dumps(course_data, indent=2)};\n"
    
    out_ts_path = os.path.join(base_dir, "src/data/windows-security-course.ts")
    with open(out_ts_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"Written {out_ts_path} successfully!")
    
    sql_lines = [
        "-- =============================================================================",
        "-- CYBERTUBE: SEED WINDOWS SECURITY ZERO TO ADVANCED COMPLETE COURSE",
        "-- =============================================================================",
        "-- Description:",
        "-- Idempotently seeds the 18-week Windows Security Zero to Advanced course,",
        "-- all 18 modules, and all 60 video lessons into the Supabase database.",
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
        "    'windows-security-zero-to-advanced',",
        f"    {quote_sql(course_data['title'])},",
        f"    {quote_sql(course_data['shortDescription'])},",
        f"    {quote_sql(course_data['description'])},",
        "    'intermediate',",
        "    '18 weeks (130–175 hours)',",
        f"    {total_minutes},",
        f"    {quote_sql(course_data['thumbnailUrl'])},",
        f"    {quote_sql(course_data['instructor']['name'])},",
        f"    {quote_sql(course_data['instructor']['title'])},",
        f"    {quote_sql(course_data['instructor']['organization'])},",
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
    
    sql_lines.append("  -- 2. Insert/Update 18 Modules")
    for sm in sql_modules:
        sql_lines.append(f"  INSERT INTO public.course_modules (id, course_id, title, description, order_index)")
        sql_lines.append(f"  VALUES ('{sm['uuid']}', v_course_id, {quote_sql(sm['title'])}, {quote_sql(sm['description'])}, {sm['order_index']})")
        sql_lines.append(f"  ON CONFLICT (course_id, order_index) DO UPDATE SET")
        sql_lines.append(f"    title = EXCLUDED.title,")
        sql_lines.append(f"    description = EXCLUDED.description;")
        sql_lines.append("")
        
    sql_lines.append("  -- 3. Insert/Update 60 Lessons")
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
    
    migration_file = os.path.join(base_dir, "supabase/migrations/20261119173000_seed_windows_security_course.sql")
    with open(migration_file, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines))
    print(f"Written {migration_file} successfully!")

if __name__ == "__main__":
    generate()
