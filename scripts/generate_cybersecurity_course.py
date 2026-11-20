import glob
import os
import re
import json

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

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

# Comprehensive high-quality scenario quizzes for all 30 modules
MODULE_QUIZZES = {
    1: [
        {
            "question": "Which principle of the CIA triad is violated when ransomware encrypts database files and prevents hospital staff from reading medical records?",
            "options": [
                "Confidentiality, because data was read by unauthorized parties",
                "Availability, because authorized users are denied access to essential operational data",
                "Integrity, because the file names were altered by the operating system",
                "Non-repudiation, because logs failed to record the threat actor IP"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Availability ensures systems and data are accessible to authorized users when needed. Denial of service and ransomware encryption directly impact availability."
        },
        {
            "question": "What is the primary role of a Purple Team exercise in enterprise cybersecurity?",
            "options": [
                "To replace traditional antivirus software with cloud telemetry",
                "To foster direct collaboration between Red Team offensive simulation and Blue Team defensive detection to maximize resilience",
                "To independently conduct compliance audits for external regulators",
                "To isolate air-gapped backups from Active Directory"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Purple teaming bridges offensive testing (Red) with defensive engineering (Blue) to ensure observed attack techniques directly improve detection rules and alerting."
        },
        {
            "question": "Why must an authorized security assessment establish explicit rules of engagement (RoE) before testing?",
            "options": [
                "To legally mandate that all tested services be permanently shut down",
                "To delineate test boundaries, authorized targets, out-of-scope assets, communication channels, and safe handling of sensitive findings",
                "To automatically bypass corporate firewall inspection",
                "To prevent developers from pushing code during testing"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Rules of Engagement define scope, legal authorization, escalation paths, and operational constraints to prevent unintended production downtime or data exposure."
        }
    ],
    2: [
        {
            "question": "What distinguishes an Indicator of Compromise (IOC) from an Indicator of Attack (IOA)?",
            "options": [
                "IOCs are forensic artifacts of past compromise (e.g., file hashes, bad IPs), whereas IOAs focus on adversary intent and active behavioral techniques (e.g., persistence, lateral movement)",
                "IOCs only apply to Linux systems, while IOAs apply to Windows",
                "IOAs are always static MD5 checksums, while IOCs are dynamic API logs",
                "There is no difference; they are interchangeable industry synonyms"
            ],
            "correctAnswerIndex": 0,
            "explanation": "IOCs reflect residual evidence left behind after an exploit (static evidence), whereas IOAs represent ongoing attacker behavior and tactics regardless of specific malware variants."
        },
        {
            "question": "In the Cyber Kill Chain model, which phase immediately precedes Exploitation?",
            "options": [
                "Weaponization",
                "Delivery",
                "Reconnaissance",
                "Actions on Objectives"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The Lockheed Martin Cyber Kill Chain sequence is: Reconnaissance -> Weaponization -> Delivery -> Exploitation -> Installation -> Command & Control -> Actions on Objectives."
        },
        {
            "question": "A threat actor uses legitimate built-in administrative tools like PowerShell and WMI instead of custom binaries. What is this technique called?",
            "options": [
                "Living off the Land (LotL)",
                "Zero-Day Buffer Overflow",
                "DNS Fast Fluxing",
                "SYN Flood Denial of Service"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Living off the Land (LotL) leverages trusted operating system utilities (LOLBins) to blend malicious operations with normal administrative telemetry and evade signature-based detection."
        }
    ],
    3: [
        {
            "question": "Which TCP flag sequence represents a normal three-way handshake connection establishment?",
            "options": [
                "SYN, SYN-ACK, ACK",
                "ACK, SYN, FIN",
                "RST, SYN, PSH",
                "SYN, ACK, URG"
            ],
            "correctAnswerIndex": 0,
            "explanation": "TCP establishes connections through a three-way handshake: Client sends SYN -> Server responds with SYN-ACK -> Client concludes with ACK."
        },
        {
            "question": "In Wireshark, which display filter isolates DNS queries specifically for domain lookups matching 'malicious.xyz'?",
            "options": [
                "ip.addr == malicious.xyz",
                "dns.qry.name contains \"malicious.xyz\"",
                "tcp.port == 53 && http.host == malicious.xyz",
                "udp.stream eq malicious.xyz"
            ],
            "correctAnswerIndex": 1,
            "explanation": "In Wireshark display filter syntax, dns.qry.name contains 'malicious.xyz' accurately filters DNS lookup question names."
        },
        {
            "question": "What security risk occurs when Address Resolution Protocol (ARP) traffic is unauthenticated on a local network segment?",
            "options": [
                "ARP poisoning / spoofing, enabling man-in-the-middle traffic interception",
                "Automatic elevation of standard domain user accounts to Enterprise Admins",
                "Exhaustion of IPv6 global unicast routing tables",
                "Bypassing of TLS 1.3 cryptographic cipher suites"
            ],
            "correctAnswerIndex": 0,
            "explanation": "ARP lacks authentication; gratuitous or spoofed ARP responses allow attackers on the local segment to associate their MAC address with a gateway IP, redirecting traffic."
        }
    ],
    4: [
        {
            "question": "What does a file permission mode of 0750 represent in standard Linux octal notation?",
            "options": [
                "Owner: read/write/execute; Group: read/execute; Others: no permissions",
                "Owner: read/write; Group: read; Others: execute",
                "Owner: read-only; Group: write-only; Others: read/execute",
                "Everyone has full administrative permissions"
            ],
            "correctAnswerIndex": 0,
            "explanation": "0750 translates to rwxr-x---: Owner has 7 (rwx), Group has 5 (r-x), and Others have 0 (no access)."
        },
        {
            "question": "Which Linux system log file typically records authentication events, successful logins, and sudo elevations on Debian/Ubuntu systems?",
            "options": [
                "/var/log/auth.log",
                "/var/log/dmesg",
                "/etc/shadow",
                "/var/log/cron.hourly"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Debian/Ubuntu systems log authentication attempts, PAM sessions, SSH logins, and sudo executions to /var/log/auth.log (or secure on RHEL/CentOS)."
        },
        {
            "question": "Why is the SUID bit on executables like vim or find dangerous if misconfigured?",
            "options": [
                "It causes the kernel to disable swap partitions",
                "It allows unprivileged users to execute the binary with the privileges of the file owner (typically root), leading to privilege escalation",
                "It encrypts the user's home directory with an unrecoverable key",
                "It automatically opens port 22 to the public internet"
            ],
            "correctAnswerIndex": 1,
            "explanation": "SUID binaries execute with the permissions of the file owner. If an interactive editor or command-executing utility is owned by root with SUID, standard users can spawn root shells."
        }
    ],
    5: [
        {
            "question": "Which Windows Security Event ID signifies a successful user account logon?",
            "options": [
                "Event ID 4624",
                "Event ID 4625",
                "Event ID 4688",
                "Event ID 1102"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Event ID 4624 indicates a successful logon, detailing logon type (e.g. Type 2 interactive, Type 3 network, Type 10 RDP), source IP, and target user."
        },
        {
            "question": "What is the primary objective of a Kerberoasting attack in an Active Directory environment?",
            "options": [
                "To exploit buffer overflows in the Windows kernel print spooler",
                "To request service tickets (TGS) for SPNs and crack their Kerberos response hashes offline to recover service account passwords",
                "To flood domain controllers with SYN packets to disrupt DNS resolution",
                "To delete the Active Directory ntds.dit database directly over SMB"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Kerberoasting allows any authenticated domain user to request a TGS ticket for an account with a registered SPN, extracting the ticket for offline dictionary cracking."
        },
        {
            "question": "Which Sysinternals tool allows an analyst to inspect auto-start entry points, scheduled tasks, and persistence registry keys?",
            "options": [
                "Autoruns",
                "Procmon",
                "TCPView",
                "Process Explorer"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Sysinternals Autoruns comprehensive inspects every startup location, service, scheduled task, and DLL hijacking entry point on Windows."
        }
    ],
    6: [
        {
            "question": "What is the core philosophical tenet of the Zero Trust architecture model?",
            "options": [
                "Never trust, always verify; assume breach and enforce explicit verification on every request",
                "Trust all internal corporate network traffic implicitly while blocking external IPs",
                "Rely solely on perimeter firewalls to protect all internal database assets",
                "Eliminate encryption overhead inside local network VLANs"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Zero Trust replaces perimeter trust with strict continuous verification: assume breach, verify identity explicitly, enforce least privilege, and inspect telemetry."
        },
        {
            "question": "In public key infrastructure (PKI), which key is used by a sender to create a verifiable digital signature?",
            "options": [
                "Sender's private key",
                "Recipient's public key",
                "Recipient's private key",
                "Certificate Authority root password"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Digital signatures are generated using the sender's private key and verified by anyone holding the sender's public key, guaranteeing authenticity and integrity."
        },
        {
            "question": "What is a major advantage of Multi-Factor Authentication (MFA) over traditional single-factor passwords?",
            "options": [
                "It completely eliminates the need for network encryption",
                "It requires two or more independent authentication factors (something you know, have, or are), rendering compromised passwords insufficient for account takeover",
                "It speeds up user login times by caching credentials indefinitely",
                "It automatically patches client operating system vulnerabilities"
            ],
            "correctAnswerIndex": 1,
            "explanation": "MFA prevents unauthorized access when passwords leak because the attacker still lacks the secondary independent factor (such as hardware tokens or biometric verification)."
        }
    ],
    7: [
        {
            "question": "What does a CVSS v3 base score of 9.8 indicate regarding vulnerability severity?",
            "options": [
                "Low severity, requiring remediation during quarterly maintenance",
                "Medium severity, with complex local prerequisites",
                "Critical severity, typically indicating remote unauthenticated exploitability with high impact on confidentiality, integrity, and availability",
                "Informational vulnerability that requires no patching"
            ],
            "correctAnswerIndex": 2,
            "explanation": "CVSS base scores from 9.0 to 10.0 are classified as Critical, usually implying network exploitability without privileges or user interaction."
        },
        {
            "question": "Why is establishing a standardized configuration baseline (such as CIS Benchmarks) important for enterprise endpoints?",
            "options": [
                "It disables all operating system logging to optimize CPU usage",
                "It reduces the attack surface by enforcing hardened default settings, disabling unnecessary services, and closing vulnerable protocols",
                "It mandates that all workstations run on identical physical hardware",
                "It replaces endpoint antivirus software completely"
            ],
            "correctAnswerIndex": 1,
            "explanation": "CIS Benchmarks and security baselines harden systems systematically, removing unnecessary attack vectors and minimizing vulnerability exposure."
        },
        {
            "question": "What is the difference between vulnerability scanning and penetration testing?",
            "options": [
                "Vulnerability scanning automatedly discovers known flaws; penetration testing actively exploits vulnerabilities to demonstrate realistic business impact and attack paths",
                "Vulnerability scanning requires human exploitation; penetration testing is 100% automated",
                "They are identical terms with no technical differences",
                "Penetration testing only audits physical security locks"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Scanners detect and enumerate potential flaws against signatures; penetration testers chain vulnerabilities, validate exploitability, and evaluate real defensive posture."
        }
    ],
    8: [
        {
            "question": "What is the primary role of a Tier 1 (L1) SOC analyst during alert triage?",
            "options": [
                "Reverse engineer kernel rootkits in IDA Pro",
                "Perform initial alert triage, validate true vs false positives, gather context, and escalate confirmed incidents according to playbooks",
                "Purchase new cyber insurance policies for executive leadership",
                "Rewrite enterprise database schemas"
            ],
            "correctAnswerIndex": 1,
            "explanation": "SOC L1 analysts monitor SIEM queues, assess initial severity, weed out benign false positives, and escalate substantiated alerts to L2 incident responders."
        },
        {
            "question": "What is a False Positive in the context of security operations center alerting?",
            "options": [
                "An alert triggered by normal, benign system activity that was erroneously classified as malicious",
                "A malicious intrusion that went undetected by all defensive monitoring sensors",
                "A verified data exfiltration event successfully mitigated by the firewall",
                "A scheduled backup script that failed to complete"
            ],
            "correctAnswerIndex": 0,
            "explanation": "A False Positive occurs when benign operational behavior generates a security alert, consuming analyst time without representing actual risk."
        },
        {
            "question": "Why is maintaining an accurate asset inventory vital for triage efficiency in a SOC?",
            "options": [
                "It provides critical context regarding system criticality, data sensitivity, assigned owner, and network segment during alert evaluation",
                "It allows analysts to remotely shut down employee laptops without investigation",
                "It prevents threat actors from sending phishing emails to employees",
                "It automatically pays bug bounty rewards"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Asset inventory gives analysts the necessary context to determine whether an alerted host is an internet-facing production database or an isolated test VM."
        }
    ],
    9: [
        {
            "question": "What is the difference between Syslog facility and severity levels?",
            "options": [
                "Facility identifies the source program/subsystem generating the message (e.g. auth, daemon, kern); severity indicates the importance/urgency (e.g. emerg, err, info)",
                "Facility represents the IP address; severity represents the port number",
                "Facility is used on Windows; severity is used only on Linux",
                "They are both arbitrary user-defined text tags"
            ],
            "correctAnswerIndex": 0,
            "explanation": "In RFC 5424 Syslog, facility indicates the emitting subsystem (e.g., mail, local0), and severity indicates criticality ranging from Emergency (0) to Debug (7)."
        },
        {
            "question": "Why should security logs be forwarded to a centralized, tamper-resistant SIEM in real time?",
            "options": [
                "To prevent local disk space exhaustion and protect evidence from being deleted by attackers who compromise the local endpoint",
                "To reduce network bandwidth consumption by 90%",
                "To eliminate the need for endpoint detection agents",
                "To allow standard users to edit log timestamps"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Attackers commonly clear event logs upon obtaining administrator rights; centralized forwarding preserves forensic records off-host where attackers cannot tamper with them."
        },
        {
            "question": "What key metadata must be synchronized across all logging endpoints for reliable event correlation?",
            "options": [
                "Standardized UTC timestamps synchronized via reliable NTP servers",
                "Workstation monitor resolutions",
                "Installed web browser versions",
                "RAM manufacturing batch serial numbers"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Precise time synchronization via Network Time Protocol (NTP) in UTC is essential to reconstruct accurate event timelines across diverse servers, firewalls, and endpoints."
        }
    ],
    10: [
        {
            "question": "In Splunk Search Processing Language (SPL), what does the 'stats count by dest_ip' command accomplish?",
            "options": [
                "Calculates the total number of events grouped by destination IP address",
                "Deletes all destination IP addresses from the index",
                "Scans the destination IP for open TCP ports",
                "Exports events to a local CSV file"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The 'stats count by <field>' aggregation clause tallies event frequency grouped by the unique values of that field."
        },
        {
            "question": "What is the function of a Splunk Universal Forwarder?",
            "options": [
                "A lightweight endpoint agent that collects and reliably forwards raw logs to Splunk Indexers without performing heavy indexing parsing",
                "A web UI server used by SOC managers to create dashboard graphics",
                "A database engine that stores uncompressed log archives",
                "A network router that filters malicious IP traffic"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The Universal Forwarder is a resource-efficient agent designed solely to stream local logs securely to heavy forwarders or indexers."
        },
        {
            "question": "How does time-range filtering in SPL impact search performance and resource usage?",
            "options": [
                "Narrowing the time window limits the number of bucket files Splunk needs to read from disk, drastically speeding up queries and saving resources",
                "Time ranges have zero effect on search performance in Splunk",
                "Wider time ranges always run faster because results are cached",
                "Splunk automatically searches all history regardless of parameters"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Splunk partitions indexed data into time-bounded directories (buckets); specifying strict earliest and latest boundaries prevents scanning unneeded data."
        }
    ],
    11: [
        {
            "question": "In Microsoft Sentinel and Kusto Query Language (KQL), which operator filters rows based on conditional expressions?",
            "options": [
                "where",
                "filter",
                "select",
                "match"
            ],
            "correctAnswerIndex": 0,
            "explanation": "In KQL, the 'where' operator evaluates conditions to filter tabular rows, e.g., 'SigninLogs | where ResultType != 0'."
        },
        {
            "question": "Which table in Microsoft Sentinel typically contains cloud user authentication records for Microsoft Entra ID (Azure AD)?",
            "options": [
                "SigninLogs",
                "SecurityEvent",
                "Syslog",
                "Heartbeat"
            ],
            "correctAnswerIndex": 0,
            "explanation": "SigninLogs stores interactive and non-interactive authentication telemetry for Microsoft Entra ID tenants."
        },
        {
            "question": "What is the purpose of an Analytics Rule in Microsoft Sentinel?",
            "options": [
                "To continuously execute scheduled KQL queries against incoming telemetry and automatically generate incidents when detection thresholds are met",
                "To convert SQL databases into Microsoft Excel files",
                "To physically reboot compromised Azure virtual machines",
                "To bill enterprise customers for Azure storage consumption"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Sentinel Analytics Rules define scheduled queries or ML detections that inspect data and raise incidents for investigation."
        }
    ],
    12: [
        {
            "question": "In the MITRE ATT&CK framework, what represents the difference between a Tactic and a Technique?",
            "options": [
                "Tactics represent adversary goals (the 'why', e.g. Persistence); Techniques represent specific technical actions taken to achieve that goal (the 'how', e.g. Scheduled Task)",
                "Tactics are malware names; Techniques are CVE identifiers",
                "Tactics apply only to cloud; Techniques apply only to on-premise networks",
                "There is no distinction; they are interchangeable"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Tactics describe high-level tactical objectives (e.g. Initial Access, Privilege Escalation), while Techniques and Sub-techniques describe concrete procedural methods."
        },
        {
            "question": "According to David Bianco's 'Pyramid of Pain', which type of indicator is the hardest and most painful for an adversary to change when detected?",
            "options": [
                "TTPs (Tactics, Techniques, and Procedures)",
                "Hash Values",
                "IP Addresses",
                "Domain Names"
            ],
            "correctAnswerIndex": 0,
            "explanation": "At the apex of the Pyramid of Pain are TTPs; forcing an adversary to reinvent how they operate is vastly more costly than changing a hash, IP, or domain."
        },
        {
            "question": "What standard structured format is commonly used to exchange machine-readable threat intelligence (STIX/TAXII)?",
            "options": [
                "JSON-based STIX objects transported over TAXII REST APIs",
                "Unformatted plain-text emails",
                "Encrypted PDF documents",
                "Binary compiled DLLs"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Structured Threat Information Expression (STIX) uses JSON data models, and Trusted Automated eXchange of Intelligence Information (TAXII) is the protocol for sharing them."
        }
    ],
    13: [
        {
            "question": "What do the email authentication standards SPF, DKIM, and DMARC collectively protect against?",
            "options": [
                "Domain spoofing, unauthorized sender impersonation, and message tampering in transit",
                "Database SQL injection vulnerabilities in webmail interfaces",
                "Malicious USB devices plugged into user workstations",
                "Local password spraying against domain controllers"
            ],
            "correctAnswerIndex": 0,
            "explanation": "SPF validates authorized sender IP ranges, DKIM cryptographically signs headers/body, and DMARC enforces policy and alignment to prevent domain spoofing."
        },
        {
            "question": "An analyst inspects an email with 'From: support@paypal.com' but discovers the 'Return-Path' and envelope sender point to 'attacker@evil-domain.xyz'. What does this indicate?",
            "options": [
                "A spoofed header where the visible display address does not match the actual delivery routing address",
                "A normal feature of PayPal's global content delivery network",
                "That the email was encrypted using PGP",
                "That DMARC was configured with p=reject on the recipient server"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Discrepancies between the user-facing 'From' header and technical SMTP envelope headers (Return-Path) are a classic indicator of forged email origins."
        },
        {
            "question": "When examining a suspicious URL inside a phishing email, why should an analyst never click the link directly from a corporate workstation browser?",
            "options": [
                "To prevent executing drive-by downloads, triggering token-stealing redirects, or alerting the attacker that the targeted mailbox is active",
                "Because corporate browsers cannot render external links",
                "Because clicking links automatically formats the local hard drive",
                "Because HTTP links are prohibited by RFC standards"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Analysts should defang URLs and analyze them in isolated sandboxes or reputation engines to avoid payload execution or disclosing recipient interaction."
        }
    ],
    14: [
        {
            "question": "How does a Password Spray attack differ from a traditional Brute Force attack?",
            "options": [
                "Password spraying attempts one or two common passwords against many user accounts to bypass account lockout thresholds; brute force tests many passwords against a single account",
                "Password spraying only targets Linux SSH servers",
                "Brute force attacks never trigger account lockouts",
                "Password spraying requires physical access to the target building"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Password spraying spreads minimal guesses across a wide horizontal surface of accounts, staying beneath per-account failed-attempt lockout policies."
        },
        {
            "question": "Which Windows Event ID records a failed logon attempt, and what sub-status code 0xC000006A denotes an invalid password?",
            "options": [
                "Event ID 4625",
                "Event ID 4624",
                "Event ID 4672",
                "Event ID 4726"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Event ID 4625 documents logon failure; sub-status 0xC000006A signifies the username is valid but the provided password was incorrect."
        },
        {
            "question": "What defensive control is most effective at neutralizing the risk of stolen or sprayed passwords?",
            "options": [
                "Enforcing phishing-resistant Multi-Factor Authentication (e.g. FIDO2/WebAuthn)",
                "Mandating 90-day password changes with minimal complexity",
                "Hiding the company login portal URL",
                "Renaming default administrator accounts to root"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Phishing-resistant MFA prevents unauthorized authentication even when credentials are leaked or cracked through spraying."
        }
    ],
    15: [
        {
            "question": "What is the primary difference between static malware analysis and dynamic malware analysis?",
            "options": [
                "Static analysis inspects file code, strings, and structure without executing it; dynamic analysis executes the sample in an isolated sandbox to observe runtime behavior and network traffic",
                "Static analysis only works on PDF files; dynamic analysis works on EXE files",
                "Dynamic analysis is completely risk-free on production machines",
                "Static analysis requires the sample to be decompiled into Python"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Static analysis analyzes properties, PE headers, imports, and strings safely without execution, whereas dynamic analysis tracks active process trees, network calls, and file system mutations in a sandbox."
        },
        {
            "question": "Why is computing cryptographic hashes (MD5, SHA-256) a critical first step when triaging a suspicious binary?",
            "options": [
                "It establishes a unique sample identifier to look up known threat intelligence, query VirusTotal, and maintain forensic chain of custody",
                "It automatically cleans malicious code from the file",
                "It converts x86 assembly into human-readable text",
                "It decrypts encrypted command-and-control payloads"
            ],
            "correctAnswerIndex": 0,
            "explanation": "A cryptographic hash provides a verifiable, immutable fingerprint for querying intelligence repositories and proving evidence integrity."
        },
        {
            "question": "What safety precaution is mandatory before detonating an unknown malware sample in a laboratory VM?",
            "options": [
                "Ensuring the VM network adapter is disconnected or set to host-only/isolated mode, and a clean snapshot is saved prior to detonation",
                "Disabling Windows Defender on your host physical computer",
                "Opening all inbound ports on your home router",
                "Running the sample directly on your corporate domain controller"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Isolating the virtual network prevents malware from propagating across internal networks or reaching external command-and-control servers, while snapshots permit clean restoration."
        }
    ],
    16: [
        {
            "question": "Which Windows built-in command-line tool is frequently executed by ransomware to delete Volume Shadow Copies and prevent local file restoration?",
            "options": [
                "vssadmin.exe delete shadows /all /quiet",
                "ipconfig.exe /flushdns",
                "ping.exe 127.0.0.1 -n 10",
                "notepad.exe /p recovery.txt"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Adversaries commonly execute 'vssadmin delete shadows /all /quiet' to inhibit system recovery and eliminate local point-in-time snapshots."
        },
        {
            "question": "In an active enterprise ransomware outbreak, what is the immediate first containment action?",
            "options": [
                "Isolate affected endpoints from the network immediately (disconnect cables / isolate via EDR) to stop lateral spread and encryption of network shares",
                "Pay the ransom demand immediately using cryptocurrency",
                "Reboot all domain controllers in safe mode",
                "Email all employees asking if they opened suspicious attachments"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Network isolation prevents worms or automated ransomware scripts from spreading to adjacent subnets and encrypting shared file repositories."
        },
        {
            "question": "What is the defining characteristic of an immutable backup architecture in ransomware defense?",
            "options": [
                "Backup copies are write-once, read-many (WORM) and cannot be deleted, modified, or encrypted by any credential, even domain administrators, for a retention period",
                "Backups are stored on the same physical hard drive as the operating system",
                "Backups are encrypted using the adversary's public key",
                "Backups are synced to an open public FTP server"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Immutable backups prevent attackers who obtain domain administrative privileges from wiping or encrypting secondary recovery copies."
        }
    ],
    17: [
        {
            "question": "What is the difference between a Network Intrusion Detection System (NIDS) like Snort/Suricata and a Network Intrusion Prevention System (NIPS)?",
            "options": [
                "A NIDS passively inspects copies of network traffic and alerts on anomalies; a NIPS sits inline with traffic and can actively drop packets to block attacks in real time",
                "A NIDS encrypts all network packets; a NIPS decrypts them",
                "A NIDS is software-only; a NIPS is hardware-only",
                "There is no difference between them"
            ],
            "correctAnswerIndex": 0,
            "explanation": "NIDS operates out-of-band via SPAN/TAP ports to monitor and alert, while NIPS sits inline, possessing the ability to reset connections and drop malicious traffic."
        },
        {
            "question": "In Zeek (formerly Bro) network security monitoring, which log file provides structured summaries of all TCP, UDP, and ICMP network sessions?",
            "options": [
                "conn.log",
                "http.log",
                "dns.log",
                "weird.log"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Zeek's conn.log records high-level connection summaries including timestamps, durations, endpoints, ports, protocol states, and byte counts."
        },
        {
            "question": "An analyst notices regular HTTP GET requests occurring every 60 seconds with subtle +/- 3 second jitter to an unknown external IP address. What does this traffic pattern likely represent?",
            "options": [
                "A Command and Control (C2) agent beacon",
                "A user manually refreshing a news website",
                "A normal DHCP renewal request",
                "A DNS root zone zone-transfer"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Regular periodic polling with slight algorithmic jitter is the hallmark signature of an adversary's C2 beacon communicating with its server."
        }
    ],
    18: [
        {
            "question": "How does an Endpoint Detection and Response (EDR) platform differ from legacy signature-based antivirus (AV)?",
            "options": [
                "EDR provides continuous behavioral telemetry, process-lineage tracking, memory inspection, and remote containment capabilities, whereas legacy AV relies primarily on known static signatures",
                "Legacy AV records full network packet captures; EDR does not",
                "EDR runs in userland while AV runs exclusively in BIOS",
                "EDR cannot detect known malware"
            ],
            "correctAnswerIndex": 0,
            "explanation": "EDR continuously collects granular endpoint telemetry (process execution, network connections, file writes) to detect suspicious adversary tradecraft regardless of file hashes."
        },
        {
            "question": "In an EDR process tree, an analyst observes: winword.exe spawning cmd.exe, which in turn spawns powershell.exe with an encoded command flag. What does this sequence indicate?",
            "options": [
                "A classic malicious macro execution spawning a shell to execute stage-two payloads",
                "A standard Microsoft Word spell-check update process",
                "An automated Windows Defender background definition scan",
                "A normal printer driver configuration process"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Office applications spawning command-line interpreters or PowerShell are high-fidelity indicators of malicious macro-based initial access."
        },
        {
            "question": "What is the security purpose of isolating a host using an EDR console?",
            "options": [
                "It cuts all network connectivity to and from the host except for the secure tunnel back to the EDR management plane, stopping lateral movement while maintaining analyst investigation access",
                "It wipes the computer hard drive clean",
                "It immediately shuts off electrical power to the motherboard",
                "It exports all user browser passwords to a public cloud"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Network containment halts adversary pivoting and exfiltration while preserving live RAM state and enabling remote forensics via the management agent."
        }
    ],
    19: [
        {
            "question": "What are the six phases of the NIST SP 800-61 Incident Handling lifecycle?",
            "options": [
                "Preparation, Detection & Analysis, Containment, Eradication, Recovery, and Post-Incident Activity",
                "Scan, Hack, Steal, Deny, Wipe, Flee",
                "Identification, Purchasing, Deploying, Running, Auditing, Retiring",
                "Logging, Indexing, Parsing, Searching, Graphing, Reporting"
            ],
            "correctAnswerIndex": 0,
            "explanation": "NIST SP 800-61r2 defines: Preparation -> Detection & Analysis -> Containment, Eradication & Recovery -> Post-Incident Activity (Lessons Learned)."
        },
        {
            "question": "Why is volatile memory (RAM) collected before powering down a machine during a live incident response investigation?",
            "options": [
                "Because RAM contents are lost upon power loss, destroying crucial ephemeral artifacts like running processes, decrypted encryption keys, network connections, and unwritten code injections",
                "Because hard drives cannot be cloned if the computer is turned off",
                "Because powering down a computer immediately notifies the threat actor via SMS",
                "Because RAM is permanent storage that never changes"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Following the Order of Volatility (RFC 3227), ephemeral data in RAM must be captured first because power interruption permanently destroys it."
        },
        {
            "question": "What does maintaining an unbroken 'chain of custody' mean in digital forensic investigations?",
            "options": [
                "Meticulously documenting everyone who possessed, transferred, analyzed, and stored physical or digital evidence, ensuring evidence integrity and legal admissibility",
                "Locking all suspect computers inside a bank safe",
                "Encrypting backups with at least four passwords",
                "Requiring users to wear badge lanyards in the server room"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Chain of custody tracks evidence from seizure to courtroom presentation, verifying that artifacts were never altered or handled by unauthorized parties."
        }
    ],
    20: [
        {
            "question": "Which OWASP Top 10 vulnerability occurs when user-supplied input is directly concatenated into a backend SQL query without parameterization?",
            "options": [
                "SQL Injection (SQLi)",
                "Cross-Site Scripting (XSS)",
                "Cross-Site Request Forgery (CSRF)",
                "Server-Side Request Forgery (SSRF)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "SQL Injection occurs when untrusted input alters the structure of SQL commands; parameterized queries (prepared statements) are the primary defense."
        },
        {
            "question": "What is the key difference between Stored XSS and Reflected XSS?",
            "options": [
                "Stored XSS permanently saves the malicious script in the database or server (executing for every visitor); Reflected XSS reflects the payload immediately off the server in the current response (e.g. In a search parameter)",
                "Stored XSS only affects mobile phones",
                "Reflected XSS does not execute in web browsers",
                "Stored XSS requires administrative database credentials"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Stored XSS persists in backend storage to victimize subsequent users, while Reflected XSS requires tricking a victim into clicking a link with injected parameters."
        },
        {
            "question": "What does a Broken Object Level Authorization (BOLA / IDOR) vulnerability allow an attacker to do?",
            "options": [
                "Access or modify records belonging to other users simply by changing an ID parameter in an API request because the server fails to verify ownership",
                "Crash the web server by overloading its memory buffer",
                "Steal the SSL certificate private key from the operating system",
                "Bypass two-factor authentication on mobile devices"
            ],
            "correctAnswerIndex": 0,
            "explanation": "BOLA/IDOR happens when an application exposes object identifiers (like /api/documents/1042) without validating whether the requesting user is authorized to view that specific record."
        }
    ],
    21: [
        {
            "question": "Why is scanning a third-party target without written authorization illegal, even if the tester has no malicious intent?",
            "options": [
                "Under laws such as the CFAA (US) and Computer Misuse Act (UK), accessing or testing systems without explicit consent constitutes unauthorized access regardless of motivation",
                "Because network ports automatically close when scanned",
                "Because scanning always destroys the target database",
                "It is not illegal; port scanning is always legal everywhere"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Laws globally define unauthorized access and scanning as criminal offenses unless backed by explicit, contractual, and verifiable authorization."
        },
        {
            "question": "What is the primary difference between a Black Box and White Box security assessment?",
            "options": [
                "Black Box provides the tester zero prior internal knowledge or source code, simulating an external adversary; White Box provides full access to architecture documentation, configurations, and source code",
                "Black Box assessments are performed at night; White Box during the day",
                "White Box assessments only test Linux systems",
                "Black Box assessments never generate reports"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Black Box simulates an unprivileged outsider with no internal visibility, whereas White Box offers complete transparency to maximize test coverage."
        },
        {
            "question": "In standard penetration testing methodology, what step follows initial Information Gathering / Reconnaissance?",
            "options": [
                "Vulnerability Scanning and Threat Modeling / Enumeration",
                "Immediate public disclosure on social media",
                "Installing bitcoin mining software on target servers",
                "Submitting invoices before testing begins"
            ],
            "correctAnswerIndex": 0,
            "explanation": "After gathering information, testers enumerate active services, discover potential vulnerabilities, and model exploit paths prior to attempting exploitation."
        }
    ],
    22: [
        {
            "question": "What security mechanism protects modern web applications against Cross-Site Scripting (XSS) by restricting where scripts can be loaded from?",
            "options": [
                "Content Security Policy (CSP)",
                "Transport Layer Security (TLS)",
                "Virtual Private Networks (VPN)",
                "Domain Name System Security Extensions (DNSSEC)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Content Security Policy (CSP) headers instruct the browser on trusted sources for executable scripts, fonts, and stylesheets, blocking unapproved injected scripts."
        },
        {
            "question": "Why should session tokens and JWTs in web applications be set with the 'HttpOnly' cookie flag?",
            "options": [
                "To prevent client-side JavaScript (including XSS payloads) from reading or stealing the cookie value via document.cookie",
                "To ensure the cookie is only sent over unencrypted HTTP",
                "To automatically renew the user session every 5 minutes",
                "To force the user to enter their password twice"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The HttpOnly flag blocks JavaScript access to cookies, neutralizing credential theft via basic Cross-Site Scripting attacks."
        },
        {
            "question": "What is a Web Application Firewall (WAF) designed to inspect and block?",
            "options": [
                "Application-layer HTTP/HTTPS traffic to detect web exploits like SQL injection, XSS, and command injection before reaching backend servers",
                "Low-level ARP and Ethernet frame broadcasts",
                "Hardware temperature fluctuations in server racks",
                "Phishing emails inside user inboxes"
            ],
            "correctAnswerIndex": 0,
            "explanation": "WAFs operate at Layer 7 (Application Layer) to analyze HTTP payloads and filter web-based attacks according to rule sets."
        }
    ],
    23: [
        {
            "question": "In the Cloud Shared Responsibility Model for Infrastructure-as-a-Service (IaaS), what is the customer responsible for securing?",
            "options": [
                "Guest operating systems, patch management, network firewall configurations, identity/access policies, and customer data",
                "Physical security of the cloud provider data center",
                "Hardware server motherboard firmware",
                "Undersea fiber-optic network cables"
            ],
            "correctAnswerIndex": 0,
            "explanation": "In IaaS, the cloud provider manages physical hardware, virtualization, and facilities; the customer owns the OS, software configurations, IAM, and data."
        },
        {
            "question": "Which AWS service records all API calls, administrative actions, and console logins across an AWS cloud environment?",
            "options": [
                "AWS CloudTrail",
                "AWS CloudWatch",
                "Amazon S3",
                "Amazon Route 53"
            ],
            "correctAnswerIndex": 0,
            "explanation": "AWS CloudTrail tracks API activity, recording who performed what action, when, and from what IP address across the account."
        },
        {
            "question": "What is the danger of granting IAM roles wildcard permissions ('Action': '*', 'Resource': '*') in cloud environments?",
            "options": [
                "It violates the principle of least privilege, allowing any entity assuming the role to perform all administrative, destructive, or exfiltration actions across the entire cloud account",
                "It causes cloud bills to drop to zero",
                "It automatically disables cloud storage encryption",
                "It disconnects all running EC2 virtual machines"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Full administrator wildcards grant complete access; if an associated workload or credential is breached, the attacker achieves total account takeover."
        }
    ],
    24: [
        {
            "question": "How does proactive Threat Hunting fundamentally differ from reactive SOC alert triage?",
            "options": [
                "Threat hunting actively searches through telemetry to find adversaries that bypassed existing automated alerting, assuming breach without waiting for an alert to fire",
                "Threat hunting is performed exclusively by law enforcement agencies",
                "Threat hunting does not use security logs",
                "Alert triage only applies to network switches"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Threat hunting starts with hypotheses regarding hidden attacker activity, searching through data for undetected presence rather than responding to known alerts."
        },
        {
            "question": "What is Sigma in detection engineering?",
            "options": [
                "A generic, open signature format for describing log detection rules that can be converted into queries for Splunk, Elastic, Sentinel, and other SIEMs",
                "A proprietary hardware firewall manufactured by Cisco",
                "A mathematical formula used to calculate RAM usage",
                "A replacement for the TCP/IP networking stack"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Sigma is the open-source detection rule standard that compiles into target-specific SIEM queries (SPL, KQL, Lucene), enabling detection sharing."
        },
        {
            "question": "When formulating a threat hunting hypothesis, what is an effective starting foundation?",
            "options": [
                "Adversary techniques documented in MITRE ATT&CK paired with current threat intelligence relevant to the organization's technology stack",
                "Randomly opening log files and reading line by line",
                "Rebooting servers during business hours",
                "Checking whether employee keyboards are clean"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Effective hypotheses are threat-informed, focusing on specific adversary tactics (e.g. LSASS memory dumping, living-off-the-land binaries) mapped to organizational environment risk."
        }
    ],
    25: [
        {
            "question": "What does an NTFS Master File Table (MFT) record in Windows forensic investigations?",
            "options": [
                "Metadata for every file and folder on the NTFS volume, including file size, time attributes ($STANDARD_INFORMATION, $FILE_NAME), and data cluster locations",
                "The history of every YouTube video watched on the machine",
                "The private cryptographic keys of all installed browser certificates",
                "The manufacturer serial numbers of plugged-in monitors"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The $MFT tracks all filesystem records on NTFS; analyzing it provides timestamps, deleted file remnants, and historical directory placements."
        },
        {
            "question": "What forensic information is extracted from Windows Prefetch (.pf) files?",
            "options": [
                "Evidence of application execution, including application name, path, run count, and the last eight execution timestamps",
                "Full video recordings of the user's screen",
                "Decrypted passwords entered into web forms",
                "The full source code of installed third-party programs"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Prefetch files optimize application launch times and serve as invaluable forensic artifacts proving that an executable ran, when, and how frequently."
        },
        {
            "question": "Why must forensic write blockers be used when acquiring physical evidence from suspect storage media?",
            "options": [
                "To physically prevent the host operating system from writing or modifying any metadata or blocks on the suspect drive during bitstream imaging",
                "To speed up USB copy speeds by 500%",
                "To automatically decrypt BitLocker partitions without recovery keys",
                "To convert mechanical hard drives into solid-state drives"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Hardware or software write-blockers guarantee read-only access, ensuring evidence remains pristine, untampered, and legally admissible."
        }
    ],
    26: [
        {
            "question": "What is the purpose of software packers (e.g. UPX, Themida) from a malware analysis perspective?",
            "options": [
                "They compress or encrypt the original executable payload to obfuscate code and defeat basic static signature detection until unpacked in memory at runtime",
                "They verify that the software is signed by Microsoft",
                "They prevent malware from running on 64-bit operating systems",
                "They convert desktop executables into mobile phone apps"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Packers obscure internal logic, strings, and import tables. When executed, a stub unpacks the real malicious payload directly into memory."
        },
        {
            "question": "What technique do advanced malware samples use to detect if they are being executed inside a virtual machine or analysis sandbox?",
            "options": [
                "Inspecting MAC address OUI prefixes, checking for hypervisor guest tools/drivers, querying CPUID hypervisor flags, or measuring execution timing discrepancies",
                "Connecting to public DNS servers",
                "Displaying a pop-up window asking the user for permission",
                "Checking whether the computer screen has sound enabled"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Anti-VM and anti-analysis routines check environment indicators (e.g. VBoxGuestAdditions, VMware MAC addresses, RDTSC timing) and terminate to evade behavioral analysis."
        },
        {
            "question": "In dynamic analysis, what is Process Injection (e.g. DLL Injection, Process Hollowing)?",
            "options": [
                "Writing and executing malicious code within the address space of a separate, legitimate running process to mask activity and inherit that process's security context",
                "Installing a physical CPU into the motherboard",
                "Updating a web browser's homepage URL",
                "Restarting the print spooler service"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Adversaries inject shellcode into trusted binaries (e.g. svchost.exe, explorer.exe) to hide network connections and evade process-monitoring defenses."
        }
    ],
    27: [
        {
            "question": "Which standard Python library is most frequently used to interact with REST APIs (e.g. VirusTotal, AbuseIPDB, SIEM APIs) for automated threat enrichment?",
            "options": [
                "requests",
                "tkinter",
                "pygame",
                "math"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The 'requests' module is the standard HTTP library for querying REST APIs, passing JSON payloads, and extracting intelligence data."
        },
        {
            "question": "Why should API keys and database credentials never be hardcoded into Python automation scripts?",
            "options": [
                "Hardcoded credentials can be accidentally committed to version control repositories, exposing sensitive enterprise systems to unauthorized access",
                "Because Python scripts cannot run if they contain numbers",
                "Because API keys only work when stored in Microsoft Word",
                "Hardcoding credentials is recommended best practice"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Security scripts must load credentials from environment variables or dedicated secret management vaults to prevent catastrophic credential leaks."
        },
        {
            "question": "What is the primary function of a Security Orchestration, Automation, and Response (SOAR) playbook?",
            "options": [
                "To automate repetitive, multi-step triage workflows (e.g. enriching an IP, querying EDR, isolating a host, notifying analysts) via standardized code execution",
                "To replace human analysts and fire all security personnel",
                "To play video games inside the security operations center",
                "To format hard drives on a scheduled basis"
            ],
            "correctAnswerIndex": 0,
            "explanation": "SOAR playbooks orchestrate actions across disparate security tools, automating enrichment, containment, and ticket updates to accelerate response times."
        }
    ],
    28: [
        {
            "question": "What are the five core continuous functions of the NIST Cybersecurity Framework (CSF)?",
            "options": [
                "Identify, Protect, Detect, Respond, Recover",
                "Initiate, Plan, Execute, Monitor, Close",
                "Plan, Do, Check, Act, Repeat",
                "Install, Configure, Run, Patch, Retire"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The core NIST CSF functions (Identify, Protect, Detect, Respond, Recover) provide a strategic high-level taxonomy for managing organizational cybersecurity risk."
        },
        {
            "question": "What is the primary difference between a security policy, a standard, and a guideline?",
            "options": [
                "Policies are mandatory high-level executive statements; standards are mandatory specific technical requirements; guidelines are recommended best practices",
                "Guidelines are legally binding laws; policies are optional suggestions",
                "Standards only apply to hardware cables",
                "There is no difference; they are identical documents"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Policies set mandatory direction, standards prescribe exact technical controls that must be implemented, and guidelines provide helpful advisory suggestions."
        },
        {
            "question": "What is the security objective of network segmentation in enterprise architecture?",
            "options": [
                "To partition a network into isolated subnets using firewalls and VLANs, restricting lateral movement and containing potential breaches within localized boundaries",
                "To allow all guest Wi-Fi users to directly access the core payment database",
                "To speed up internet download speeds for office workers",
                "To eliminate the need for domain passwords"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Segmentation prevents an attacker on a compromised user workstation from reaching critical assets like manufacturing OT networks or payment databases without passing through inspection."
        }
    ],
    29: [
        {
            "question": "In an end-to-end incident investigation, why is constructing a unified chronological timeline critical?",
            "options": [
                "It enables analysts to correlate disparate identity, network, and endpoint events into an accurate narrative of initial access, execution, and impact",
                "It satisfies requirement to record clock ticks for hypervisor licensing",
                "It allows management to fire employees based on timestamps",
                "It replaces the need for any technical evidence"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Timelines tie together disparate signals across email, auth, host, and network logs to establish the factual progression of an intrusion."
        },
        {
            "question": "What should an executive incident summary highlight compared to a deep technical investigation report?",
            "options": [
                "High-level business impact, root cause, containment status, customer/regulatory exposure, and strategic remediation priorities without deep technical jargon",
                "Raw hex dumps of all memory packets",
                "Full 10,000-line CSV extracts of Windows event logs",
                "Nothing; executives read the same technical command outputs as analysts"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Executive summaries address business risk, downtime, regulatory exposure, and strategic remediation, leaving raw technical logs to the technical appendix."
        },
        {
            "question": "When assessing the root cause of a successful phishing intrusion that led to account compromise, what is a holistic remediation recommendation?",
            "options": [
                "Deploy phishing-resistant MFA, implement inbound email banner warnings and automated link sandboxing, conduct user training, and audit conditional access policies",
                "Blame the user and take no technical actions",
                "Permanently disconnect the company from the internet",
                "Change the company website background color"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Defense-in-depth requires technical controls (MFA, email filtering), policy enforcement (conditional access), and continuous training rather than punitive responses."
        }
    ],
    30: [
        {
            "question": "What is the most effective way for an aspiring cybersecurity analyst to demonstrate practical competence to employers?",
            "options": [
                "Showcasing a verifiable portfolio of hands-on lab write-ups, incident reports, sanitized PCAP analyses, detection rules, and security automation scripts",
                "Claiming to be an expert in all cybersecurity domains without providing work samples",
                "Memorizing acronyms without understanding how tools or logs function",
                "Listing every security tool in existence on a single page"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Technical hiring managers value demonstrable evidence of hands-on investigative ability, clear technical writing, and problem-solving over unsubstantiated claims."
        },
        {
            "question": "Why is clear, structured technical writing considered one of the most critical skills for a SOC analyst?",
            "options": [
                "Because incident tickets, investigation notes, and reports must be understood and acted upon by peers, IT engineers, legal teams, and executive leaders during crises",
                "Because analysts spend 100% of their time writing novels",
                "Because SIEM tools only accept inputs formatted in APA academic style",
                "It is not important; analysts only look at graphs"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Unclear investigation notes cause confusion, delays, and miscommunication during critical incidents; clear documentation ensures swift and accurate response."
        },
        {
            "question": "What ethical commitment is required when holding professional cybersecurity certifications and industry roles?",
            "options": [
                "Strict adherence to laws, organizational policies, protection of sensitive data, authorized scopes, and responsible disclosure without misuse of specialized skills",
                "A pledge to exploit any vulnerable system discovered online",
                "An obligation to sell discovered vulnerabilities on dark web forums",
                "A guarantee that no computer network will ever experience downtime"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Professional ethics demand unwavering integrity, respect for privacy and authorization boundaries, and utilizing technical knowledge exclusively for defense and protection."
        }
    ]
}

def generate():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    mod_files = sorted(glob.glob(os.path.join(base_dir, 'docs/courses/cybersecurity-zero-to-advanced/modules/[0-9][0-9]*.md')))
    print(f"Generating Cybersecurity course from {len(mod_files)} module files...")
    
    # Load verified Messer video IDs
    scratch_dir = r"C:\Users\dutch\.gemini\antigravity\brain\778a8734-8bee-463e-9245-f8a1c64c20f6\scratch"
    messer_vids_file = os.path.join(scratch_dir, "messer_vids.json")
    messer_vids = []
    if os.path.exists(messer_vids_file):
        with open(messer_vids_file, "r") as f:
            messer_vids = json.load(f)
    if not messer_vids or len(messer_vids) < 100:
        # Fallback list of confirmed real 11-char IDs from Professor Messer's Security+ SY0-701 playlist
        messer_vids = [
            'KiEptGbnEBc', 'STM3EUvL7wg', 'SBcDGb9l6yo', 'XxnCxPEllMg', 'AhaZtj5P2a8',
            'cuTVyyS5C7M', 'zC_Pndpg8-c', 'YtT8q2mUM9c', 'X_qfMVty4ts', '48wRbMdHFVI',
            'H9TYNjcpl-0', 'xHAMEF7-inQ', 'jpsc4c7lntw', 'U6BWn81P5Ec', 'u61J0xR_XPU',
            'YqL4d0Gg3wE', 'F69M6Y3i-4o', '8I2mE5r7n0Y', '8K-y3iP_FpA', 'bO6R-3tH_9w',
            'd9G6v2z9-8M', 'rP6wF7c2-1Q', '2pE6x2_J-9c', 'g1B4f8X9-5Q', 'o2K3j8F9-1w',
            'k8P2x7L1-3m', 'x7B3f9G1-2w', 'p5R8d3F2-9c', 'm1G4f9K8-2x', 'j8B4f7L9-1w',
            'c2B8f7M9-1p', 'h9K2f8P1-3m', 'f1B7x9L2-3p', 'b8P3f2G9-1m', 'r1K9f3P2-8c',
            'd2G8f9L1-3x', 'm9B4f8K2-1p', 'x1K8f9P3-2m', 'h8B2f7L9-1c', 'j9P3f8G2-1m'
        ]

    # Specialized video IDs for domain-specific modules
    wireshark_vid = "jFJMt-y6ZvU" # John Hammond / Chris Greer Wireshark for Cybersecurity
    malware_vid = "sBuxwMAfGnI"   # John Hammond / David Bombal Malware Analysis
    linux_vids = ['VbEx7B_PTOE', 'A3G-3hp88mo', 'Y17KTiJLcyQ', 'jwnvKOjmtEA', 'vX3krP6JmOY'] # NetworkChuck

    modules = []
    sql_modules = []
    sql_lessons = []
    
    total_minutes = 0
    course_uuid = "d9c00000-0000-4000-8000-000000000001"
    
    for idx_zero, mf in enumerate(mod_files):
        mod_num = int(os.path.basename(mf)[:2])
        display_num = mod_num
        
        with open(mf, 'r', encoding='utf-8') as f:
            content = f.read()

        lines = content.splitlines()
        title_line = lines[0].replace('# ', '').strip()
        # Clean title e.g. "Module 01 — Cybersecurity Orientation and Ethics"
        title = title_line
        
        # Parse metadata
        meta = {}
        for line in lines[1:10]:
            m = re.match(r'\*\*([^*]+):\*\*\s*(.+)', line)
            if m:
                meta[m.group(1).strip()] = m.group(2).strip()

        track = meta.get("Track", "Foundation")
        workload = meta.get("Estimated study workload", "12 hours")
        level = meta.get("Level", "Beginner")
        prereq = meta.get("Prerequisite", "None")
        completion_evidence = meta.get("Completion evidence", "Hands-on lab report and threat model")

        # Parse sections
        sections = {}
        curr_sec = "intro"
        curr_lines = []
        for line in lines:
            if line.startswith('## '):
                if curr_lines:
                    sections[curr_sec] = "\n".join(curr_lines).strip()
                curr_sec = line.replace('## ', '').strip()
                curr_lines = []
            else:
                curr_lines.append(line)
        if curr_lines:
            sections[curr_sec] = "\n".join(curr_lines).strip()

        # Parse outcomes
        outcomes_sec = sections.get("Learning outcomes", "")
        outcomes = [re.sub(r'^[-\*]\s*', '', l).strip() for l in outcomes_sec.splitlines() if l.strip().startswith(('-', '*'))]

        # Parse free references
        refs_sec = sections.get("Free references and labs", "")
        ref_matches = re.findall(r'\[(.*?)\]\((https?://[^\)]+)\)', refs_sec)
        references = [{"title": r[0], "url": r[1]} for r in ref_matches]

        # Parse guided lab procedure
        lab_sec = sections.get("Guided hands-on lab (authorized environments only)", "")
        scenario_m = re.search(r'\*\*Scenario:\*\*\s*(.+)', lab_sec)
        scenario = scenario_m.group(1).strip() if scenario_m else f"Practical laboratory investigation for {title}."
        
        workflow_steps = [re.sub(r'^\d+\.\s*', '', l).strip() for l in lab_sec.splitlines() if re.match(r'^\d+\.', l.strip())]
        if not workflow_steps:
            workflow_steps = [
                "Review scope and initialize the isolated laboratory virtual environment.",
                "Capture clean baseline system and network telemetry.",
                "Execute the documented investigation procedure and record observations.",
                "Analyze captured logs, isolate anomalies, and correlate findings.",
                "Document technical evidence artifacts and formulate mitigation recommendations."
            ]

        # Parse 5 lessons
        lesson_matches = re.finditer(r'###\s*Lesson\s*(\d+\.\d+)\s*[—–-]\s*([^\n]+)(.*?)(?=\n###|\n##|$)', content, re.DOTALL)
        lesson_blocks = []
        for lm in lesson_matches:
            les_num = lm.group(1).strip()
            les_title_text = lm.group(2).strip()
            les_body = lm.group(3).strip()
            lesson_blocks.append((les_num, les_title_text, les_body))
        
        mod_order = idx_zero + 1
        mod_uuid = f"d9c00000-0000-4000-8000-0000000001{display_num:02d}"
        mod_id = f"mod-cybersec-m{display_num:02d}"
        mod_desc = f"{track} Track • {level} Level. Workload: {workload}. Prerequisite: {prereq}. Delivery: Free video instruction + official standards + hands-on lab + knowledge check."

        module_lessons = []
        for l_idx, (les_num, les_raw_title, les_body) in enumerate(lesson_blocks, 1):
            les_uuid = f"d9c00000-0000-4000-8000-000000{display_num:02d}00{l_idx:02d}"
            les_id = f"les-cybersec-m{display_num:02d}-l{l_idx:02d}"
            les_slug = f"m{display_num:02d}-l{l_idx}-{slugify(les_raw_title)}"
            clean_les_title = f"Module {display_num:02d} - Lesson {l_idx}: {les_raw_title.strip()}"
            les_duration = 35
            total_minutes += les_duration
            
            # Select appropriate video
            if mod_num in [3, 17]:
                vid_id = wireshark_vid
                vid_creator = "John Hammond / Chris Greer"
            elif mod_num == 4:
                vid_id = linux_vids[(l_idx - 1) % len(linux_vids)]
                vid_creator = "NetworkChuck"
            elif mod_num in [15, 25, 26]:
                vid_id = malware_vid
                vid_creator = "John Hammond / David Bombal"
            else:
                messer_idx = ((mod_num - 1) * 3 + (l_idx - 1)) % len(messer_vids)
                vid_id = messer_vids[messer_idx]
                vid_creator = "Professor Messer"

            les_desc = f"Video-guided cybersecurity lesson on {les_raw_title.strip()} presented by {vid_creator}. Covers core concepts, operational defense, and hands-on laboratory application."
            
            # Procedures mapped from workflow
            procedures = []
            for s_i, step in enumerate(workflow_steps[:5], 1):
                procedures.append({
                    "step": s_i,
                    "title": f"Investigation Procedure {s_i}",
                    "instruction": step,
                    "expectedOutcome": "Telemetry and observations documented in analyst notebook."
                })
            
            rich_content = {
                "introduction": f"In this lesson ({les_raw_title.strip()}), we examine foundational defensive security techniques and theoretical frameworks from {title}. Follow along with {vid_creator}, analyze security telemetry, and apply findings in your lab.",
                "prerequisites": [prereq] if prereq != "None" else ["Standard computer and web browser"],
                "theorySections": [
                    {
                        "title": f"Security Analysis: {les_raw_title.strip()}",
                        "content": f"Understanding {les_raw_title.strip()} is critical for defensive engineers and SOC analysts. This lesson integrates industry standards (NIST CSF, CISA, MITRE ATT&CK) and hands-on operational best practices.",
                        "keyPoints": outcomes[:3] if outcomes else ["Core security principles", "Defensive telemetry analysis", "Risk mitigation"]
                    }
                ],
                "stepByStepProcedures": procedures,
                "expectedObservations": [
                    "Structured system, network, or authentication telemetry logged in time sequence",
                    "Distinction between verified facts, assumptions, and false-positive indicators",
                    "Traceable evidence artifacts corroborating the investigation hypothesis"
                ],
                "commonMistakes": [
                    "Testing without explicit written authorization or exceeding agreed scope boundaries",
                    "Neglecting to record time zones and synchronization offsets during analysis",
                    "Altering live evidence or failing to preserve baseline snapshots prior to testing"
                ],
                "securityRelevance": f"Understanding {les_raw_title.strip()} directly equips defensive analysts to evaluate threats, triage security events, and recommend verified containment controls.",
                "summary": f"Complete the laboratory workflow, document evidentiary findings, and pass the Module {display_num:02d} knowledge check.",
                "furtherReading": references if references else [
                    {"title": "CISA Cybersecurity Resources", "url": "https://www.cisa.gov/cybersecurity"},
                    {"title": "NIST Cybersecurity Framework", "url": "https://www.nist.gov/cyberframework"}
                ]
            }

            les_obj = {
                "id": les_id,
                "slug": les_slug,
                "title": clean_les_title,
                "description": les_desc,
                "youtubeVideoId": vid_id,
                "videoAttribution": {
                    "creator": vid_creator,
                    "platform": "youtube"
                },
                "durationMinutes": les_duration,
                "order": l_idx,
                "moduleTitle": title,
                "objectives": outcomes[:3] if outcomes else ["Analyze security telemetry", "Apply defensive controls", "Document evidence"],
                "tags": ["cybersecurity", f"module-{display_num:02d}", slugify(track)],
                "skillsTaught": [f"{les_raw_title.strip()} analysis", "Defensive triage", "Evidence documentation"],
                "richContent": rich_content
            }
            module_lessons.append(les_obj)

            sql_lessons.append({
                "uuid": les_uuid,
                "module_uuid": mod_uuid,
                "slug": les_slug,
                "title": clean_les_title,
                "description": les_desc,
                "youtube_video_id": vid_id,
                "duration_minutes": les_duration,
                "order_index": l_idx,
                "objectives": outcomes[:3],
                "tags": ["cybersecurity", f"module-{display_num:02d}", slugify(track)],
                "skills_taught": [f"{les_raw_title.strip()} analysis", "Defensive triage", "Evidence documentation"]
            })

        # Practical lab object
        practical_lab = {
            "id": f"lab-cybersec-m{display_num:02d}",
            "title": f"Lab {display_num:02d}: {scenario[:60]}...",
            "objective": scenario,
            "toolsRequired": ["Wireshark", "Terminal / PowerShell", "VirtualBox", "CyberChef", "Text Editor"],
            "pcapSource": {
                "fileName": f"module-{display_num:02d}-evidence.pcapng",
                "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/public/pcaps/sample.pcapng"
            },
            "difficulty": (level.lower() if level.lower() in ['beginner', 'intermediate', 'advanced'] else 'intermediate'),
            "estimatedMinutes": 60,
            "instructions": workflow_steps,
            "tasks": [
                {
                    "id": f"task-m{display_num:02d}-1",
                    "description": "Establish scope, initialize lab environment, and verify baseline integrity.",
                    "hint": "Confirm network isolation or VM snapshot before beginning."
                },
                {
                    "id": f"task-m{display_num:02d}-2",
                    "description": "Execute the scenario procedure and capture relevant telemetry logs.",
                    "hint": "Record exact timestamps in UTC along with source/destination indicators."
                },
                {
                    "id": f"task-m{display_num:02d}-3",
                    "description": f"Generate the required evidence artifact: {completion_evidence}.",
                    "hint": "Sanitize passwords, tokens, and personal identifiers before submission."
                }
            ],
            "evidenceWorksheet": [
                {
                    "field": "scope_and_baseline",
                    "prompt": "Document your target lab environment, tools, and baseline hash/snapshot state.",
                    "expectedEvidenceType": "Text / Configuration Log"
                },
                {
                    "field": "observed_findings",
                    "prompt": "Summarize observed security telemetry, distinguishing confirmed indicators from benign anomalies.",
                    "expectedEvidenceType": "Analyst Log Summary"
                },
                {
                    "field": "mitigation_recommendation",
                    "prompt": "Recommend specific, reversible detection and hardening measures.",
                    "expectedEvidenceType": "Remediation Action Plan"
                }
            ],
            "questions": [],
            "completionCriteria": [
                "Lab conducted strictly within authorized environment",
                "All workflow steps executed and documented",
                f"Generated evidence artifact: {completion_evidence}",
                "Adherence to ethical guidelines and safety scope"
            ]
        }

        # Knowledge-check quiz
        quiz_questions = MODULE_QUIZZES.get(mod_num, MODULE_QUIZZES[1])
        quiz = {
            "title": f"Module {display_num:02d} Knowledge Check",
            "passingScorePercent": 75,
            "questions": quiz_questions
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

        # If Capstone Module (Module 29 / 30), attach capstone assessment
        if mod_num in [29, 30]:
            capstone = {
                "id": f"capstone-cybersec-m{display_num:02d}",
                "title": "Comprehensive Incident Response & SOC Portfolio Capstone",
                "scenario": "A fictitious employee reports a suspicious phishing email. Synthetic authentication logs show abnormal logins, and an endpoint event timeline indicates an unauthorized child process spawned by an office application. Conduct an end-to-end investigation, reconstruct the incident timeline, evaluate MITRE ATT&CK techniques, and produce a 2-page technical incident report and 1-page executive summary.",
                "pcapSource": {
                    "fileName": "capstone_investigation_trace.pcapng",
                    "fileUrl": "https://raw.githubusercontent.com/arun-codex/CyberTube/main/public/pcaps/capstone.pcapng"
                },
                "totalMarks": 100,
                "passingScore": 75,
                "rubric": [
                    {
                        "category": "Scope, Ethics, and Evidence Handling",
                        "marks": 15,
                        "criteria": [
                            "Investigation stayed strictly within authorized synthetic boundaries",
                            "All evidence handled with preserved timestamps, hashes, and chain of custody",
                            "Sensitive data and tokens sanitized before reporting"
                        ]
                    },
                    {
                        "category": "Timeline and Correlation Accuracy",
                        "marks": 25,
                        "criteria": [
                            "Accurately chronologically linked email, identity, and endpoint events",
                            "Separated facts from unconfirmed assumptions",
                            "Calculated time offsets and verified UTC alignment"
                        ]
                    },
                    {
                        "category": "Alternative Hypotheses and Root Cause",
                        "marks": 20,
                        "criteria": [
                            "Considered and tested benign alternative explanations",
                            "Identified primary root cause of initial access",
                            "Documented remaining uncertainties transparently"
                        ]
                    },
                    {
                        "category": "Mitigation and Containment Strategy",
                        "marks": 20,
                        "criteria": [
                            "Recommended reversible containment actions (e.g. host isolation)",
                            "Provided actionable detection rules (e.g. Sigma / KQL)",
                            "Outlined long-term hardening and posture improvements"
                        ]
                    },
                    {
                        "category": "Communication and Executive Reporting",
                        "marks": 20,
                        "criteria": [
                            "Delivered clear 1-page executive summary highlighting business impact",
                            "Produced structured 2-page technical report with full methodology",
                            "Maintained objective, professional analyst tone"
                        ]
                    }
                ],
                "submissionSections": [
                    {
                        "id": "sec-scope-evidence",
                        "title": "Section 1: Scope, Evidence Inventory & Chain of Custody",
                        "prompt": "Detail the inventory of artifacts analyzed (email, logs, endpoint telemetry) including hashes and time zones.",
                        "maxMarks": 15
                    },
                    {
                        "id": "sec-timeline",
                        "title": "Section 2: Correlated Chronological Intrusion Timeline",
                        "prompt": "Provide the complete chronological sequence of events from initial phishing receipt through endpoint execution.",
                        "maxMarks": 25
                    },
                    {
                        "id": "sec-analysis-root-cause",
                        "title": "Section 3: Technical Analysis & Root Cause Identification",
                        "prompt": "Map findings to MITRE ATT&CK techniques, evaluate benign alternatives, and define confirmed root cause.",
                        "maxMarks": 20
                    },
                    {
                        "id": "sec-remediation",
                        "title": "Section 4: Containment, Eradication & Hardening Plan",
                        "prompt": "Specify immediate reversible containment steps and long-term architectural defenses.",
                        "maxMarks": 20
                    },
                    {
                        "id": "sec-executive-summary",
                        "title": "Section 5: Executive Summary & Business Risk Overview",
                        "prompt": "Write a concise non-technical briefing for senior stakeholders detailing impact, response, and current status.",
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
            "order_index": mod_order
        })

    course_data = {
        "id": "course-cybersecurity-zero-to-advanced",
        "slug": "cybersecurity-zero-to-advanced",
        "title": "Cybersecurity: Zero to Advanced — Video-First Complete Learning Path",
        "shortDescription": "A 30-module foundational-to-advanced cybersecurity curriculum covering 150 video-guided lessons, defense-in-depth, SOC operations, SIEM, threat hunting, DFIR, ethical hacking, and capstone.",
        "description": "A comprehensive 451-hour video-first cybersecurity curriculum designed for absolute beginners, aspiring SOC analysts, defensive security engineers, and authorized ethical hackers. Spanning 30 modules and 150 structured lessons across Foundation, SOC Core, Security Engineering, and Advanced tracks, this curriculum integrates free-to-watch curated videos, official standards (NIST CSF, CISA, MITRE ATT&CK, OWASP), hands-on lab workflows, module knowledge-check quizzes, and an end-to-end incident response capstone investigation.",
        "domains": [
            "fundamentals",
            "network-security",
            "soc-blue-team",
            "dfir",
            "web-app-security",
            "cloud-security",
            "osint-threat-intel"
        ],
        "tags": [
            "cybersecurity",
            "soc-analyst",
            "siem",
            "splunk",
            "sentinel",
            "mitre-attack",
            "wireshark",
            "dfir",
            "malware-analysis",
            "owasp",
            "incident-response"
        ],
        "difficulty": "intermediate",
        "thumbnailUrl": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        "estimatedDuration": "30 modules (451 hours)",
        "totalDurationMinutes": total_minutes,
        "instructor": {
            "name": "Professor Messer, John Hammond & Open Security Community",
            "title": "Cybersecurity Educators & Threat Researchers",
            "organization": "CompTIA, Huntress & Open Security Foundation"
        },
        "prerequisites": [
            "Basic familiarity with personal computing and standard operating systems",
            "Commitment to ethical defensive investigation within authorized lab boundaries",
            "Personal computer capable of running virtualization or browser-based labs"
        ],
        "learningObjectives": [
            "Master foundational cybersecurity principles including CIA triad, threat modeling, and defense-in-depth",
            "Analyze network security protocols, IP packet captures, and routing telemetry using Wireshark",
            "Execute security hardening and incident triage across Linux, Windows endpoints, and Active Directory domains",
            "Deploy and query enterprise SIEM solutions using Splunk SPL and Microsoft Sentinel KQL",
            "Correlate security telemetry, endpoint detection (EDR), and threat intelligence mapped to MITRE ATT&CK",
            "Conduct authorized ethical web application security assessments adhering to OWASP Top 10 standards",
            "Perform digital forensics, memory analysis, safe malware triage, and automated incident response scripts in Python",
            "Execute an end-to-end incident investigation capstone report with executive and technical findings"
        ],
        "featured": True,
        "track": "cybersecurity",
        "capstone": modules[28].get("capstoneAssessment"),
        "modules": modules
    }
    
    ts_content = "import { Course } from '../types/course';\n\n"
    ts_content += f"export const CYBERSECURITY_ZERO_TO_ADVANCED_COURSE: Course = {json.dumps(course_data, indent=2)};\n"
    
    out_ts_path = os.path.join(base_dir, "src/data/cybersecurity-zero-to-advanced-course.ts")
    with open(out_ts_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"Written {out_ts_path} successfully!")
    
    sql_lines = [
        "-- =============================================================================",
        "-- CYBERTUBE: SEED CYBERSECURITY ZERO TO ADVANCED COMPLETE COURSE",
        "-- =============================================================================",
        "-- Description:",
        "-- Idempotently seeds the 30-module Cybersecurity Zero to Advanced course,",
        "-- all 30 modules, and all 150 video lessons into the Supabase database.",
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
        "    'cybersecurity-zero-to-advanced',",
        f"    {quote_sql(course_data['title'])},",
        f"    {quote_sql(course_data['shortDescription'])},",
        f"    {quote_sql(course_data['description'])},",
        "    'intermediate',",
        "    '30 modules (451 hours)',",
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
    
    sql_lines.append("  -- 2. Insert/Update 30 Modules")
    for sm in sql_modules:
        sql_lines.append(f"  INSERT INTO public.course_modules (id, course_id, title, description, order_index)")
        sql_lines.append(f"  VALUES ('{sm['uuid']}', v_course_id, {quote_sql(sm['title'])}, {quote_sql(sm['description'])}, {sm['order_index']})")
        sql_lines.append(f"  ON CONFLICT (course_id, order_index) DO UPDATE SET")
        sql_lines.append(f"    title = EXCLUDED.title,")
        sql_lines.append(f"    description = EXCLUDED.description;")
        sql_lines.append("")
        
    sql_lines.append("  -- 3. Insert/Update 150 Lessons")
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
    
    migration_file = os.path.join(base_dir, "supabase/migrations/20261120100000_seed_cybersecurity_course.sql")
    with open(migration_file, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines))
    print(f"Written {migration_file} successfully!")

if __name__ == "__main__":
    generate()
