import glob
import os
import re
import json

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

MODULE_QUIZZES = {
    1: [
        {
            "question": "How is a raw security event fundamentally different from a security incident in a SOC?",
            "options": [
                "An event is any observable factual occurrence in an environment or log, whereas an incident is a verified adverse event (or pattern of events) that threatens confidentiality, integrity, or availability and requires coordinated response",
                "Events originate solely from network firewalls, whereas incidents originate exclusively from Windows servers",
                "An event is always malicious and high severity, while an incident is merely informational",
                "Events require immediate server isolation, while incidents require no documentation"
            ],
            "correctAnswerIndex": 0,
            "explanation": "In security operations, an event is simply any observable occurrence (e.g. login, network connection). An incident is a validated event that negatively impacts the organization's security posture and triggers an incident response lifecycle."
        },
        {
            "question": "What is the primary operational objective of a Tier 1 (L1) SOC analyst during initial alert intake?",
            "options": [
                "Immediately format and wipe the hard drive of the affected asset",
                "Rapidly validate whether the alert represents a false positive, true positive, or benign positive, gather initial entity context, and escalate validated threats with clear documentation",
                "Reverse engineer all binary executables found on the affected workstation",
                "Contact executive leadership directly without informing the incident commander"
            ],
            "correctAnswerIndex": 1,
            "explanation": "L1 analysts specialize in intake validation, separating benign noise and false positives from genuine security concerns, performing initial triage, and providing well-documented escalations to L2/L3 specialists."
        },
        {
            "question": "What distinguishes a 'benign positive' from a malicious 'true positive' during alert triage?",
            "options": [
                "A benign positive triggers detection logic through legitimate authorized activity (such as an admin running an approved maintenance script), whereas a true positive represents unauthorized or adversarial activity",
                "Benign positives only occur on Linux servers",
                "A benign positive indicates that anti-virus software has failed to update",
                "A true positive never creates an event in the SIEM"
            ],
            "correctAnswerIndex": 0,
            "explanation": "A benign positive is an alert that fired correctly according to its rule logic, but investigation proves the underlying action was authorized, expected business activity rather than malicious attack."
        }
    ],
    2: [
        {
            "question": "How does the NIST SP 800-61 Revision 3 (2025) incident response lifecycle model differ from the legacy Revision 2 framework?",
            "options": [
                "Revision 3 completely eliminates the concept of incident containment",
                "Revision 3 aligns incident response directly with the NIST Cybersecurity Framework (CSF) 2.0 functions (Govern, Identify, Protect, Detect, Respond, Recover) and emphasizes continuous feedback and governance",
                "Revision 3 mandates that all cybersecurity incidents must be handled in under 5 minutes",
                "Revision 3 only applies to physical building locks and CCTV cameras"
            ],
            "correctAnswerIndex": 1,
            "explanation": "NIST SP 800-61 Rev 3 directly incorporates NIST CSF 2.0 governance and lifecycle alignment, modernizing the historical PICERL / 4-phase models from Rev 2 into an integrated enterprise resilience workflow."
        },
        {
            "question": "In the NIST CSF 2.0 framework, what is the role of the newly added 'Govern' (GV) function in incident response?",
            "options": [
                "To establish organizational context, cybersecurity strategy, roles, responsibilities, risk management policies, and response oversight across the enterprise",
                "To automatically deploy firewalls to all employee mobile phones",
                "To encrypt all workstation hard drives when an alert is received",
                "To monitor user keystrokes for productivity tracking"
            ],
            "correctAnswerIndex": 0,
            "explanation": "CSF 2.0 introduces 'Govern' as a foundational cross-cutting pillar to ensure that incident response priorities, policies, resource allocations, and legal requirements align with business strategy and leadership oversight."
        },
        {
            "question": "Why is the traditional PICERL model (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned) still taught alongside modern NIST Rev 3?",
            "options": [
                "Because PICERL is required by federal criminal statutes",
                "Because PICERL serves as an intuitive, widely recognized operational teaching model whose phases map cleanly into CSF 2.0 Detect, Respond, and Recover functions",
                "Because modern cloud platforms do not support NIST CSF",
                "PICERL was invented exclusively for web application security"
            ],
            "correctAnswerIndex": 1,
            "explanation": "PICERL remains valuable pedagogical and operational shorthand for tactical responders, and mapping its phases into NIST CSF 2.0 enables analysts to communicate across both technical and executive audiences."
        }
    ],
    3: [
        {
            "question": "What core fields comprise a standard network '5-tuple' used by incident responders to identify unique communications?",
            "options": [
                "Source IP, Destination IP, Source Port, Destination Port, and Layer 4 Transport Protocol (e.g. TCP/UDP)",
                "MAC Address, Subnet Mask, Gateway IP, DNS Server, and DHCP Lease Time",
                "User Agent, Cookie, HTTP Method, Host Header, and Status Code",
                "Operating System, Hostname, CPU Model, Memory Usage, and Disk Space"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The 5-tuple (Src IP, Dst IP, Src Port, Dst Port, Protocol) is the universal network identifier for correlating connections across firewalls, NetFlow, proxies, and endpoint telemetry."
        },
        {
            "question": "What is a key forensic limitation of network NetFlow or IPFIX connection logs compared to full packet captures (PCAP)?",
            "options": [
                "NetFlow logs cannot record IP addresses or timestamps",
                "NetFlow only records connection metadata (byte counts, duration, endpoints) and does not store the raw application payload contents, URL paths, or transferred files",
                "NetFlow files are too large to be analyzed by computers",
                "NetFlow requires disabling all firewalls to operate"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Flow logs provide lightweight, scalable session metadata (who talked to whom, when, and how much data transferred), but unlike full PCAP, they do not capture the payload bytes necessary to reconstruct transferred files or HTTP request bodies."
        },
        {
            "question": "How does pervasive TLS/HTTPS encryption impact network traffic analysis during incident triage?",
            "options": [
                "Responders cannot inspect encrypted payload data directly, requiring them to rely on unencrypted metadata (SNI, certificates, packet sizes, beaconing timing) or endpoint process correlation",
                "TLS encryption makes it impossible to see the destination IP address",
                "Encrypted packets are automatically dropped by enterprise routers",
                "TLS changes the source port on every individual packet"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Because payloads are ciphertext, network forensic analysts pivot to TLS metadata (Server Name Indication, TLS fingerprinting, certificate issuer) and correlate with endpoint EDR telemetry to discover what process initiated the stream."
        }
    ],
    4: [
        {
            "question": "Which Linux log file or utility is primarily used on modern systemd-based distributions to inspect unified service, kernel, and authentication events?",
            "options": [
                "/etc/fstab",
                "journalctl (systemd journal)",
                "/proc/cpuinfo",
                "ifconfig"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The systemd journal (`journalctl`) provides centralized, indexed binary logging for Linux services, kernel messages, boot sequences, and authentication events across modern Linux distributions."
        },
        {
            "question": "Where are user authentication logs, including SSH logins and sudo privilege escalations, recorded on Debian/Ubuntu systems?",
            "options": [
                "/var/log/auth.log",
                "/var/log/nginx/access.log",
                "/etc/shadow",
                "/tmp/ssh.log"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Debian and Ubuntu systems record PAM, sudo, and SSH authentication events in `/var/log/auth.log` (while RHEL/CentOS systems utilize `/var/log/secure`)."
        },
        {
            "question": "Why must an analyst avoid running arbitrary third-party binaries or invasive modification commands during Linux live-response triage?",
            "options": [
                "Invasive actions alter volatile memory, modify file access timestamps (atime), overwrite deleted inodes, and can contaminate the forensic chain of custody",
                "Linux servers will permanently lock their bootloaders",
                "All user passwords will be sent over unencrypted DNS",
                "Systemd will immediately shut down the host"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Forensic live response adheres to the Order of Volatility: non-destructive read-only triage commands preserve volatile RAM, process state, open sockets, and metadata without contaminating evidence."
        }
    ],
    5: [
        {
            "question": "Which Windows Security Event IDs indicate successful authentication and failed logon attempts, respectively?",
            "options": [
                "Event ID 4624 (Success) and Event ID 4625 (Failure)",
                "Event ID 7045 (Success) and Event ID 1102 (Failure)",
                "Event ID 4688 (Success) and Event ID 4697 (Failure)",
                "Event ID 1000 (Success) and Event ID 1001 (Failure)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Windows Security Event ID 4624 logs successful logon sessions (including Logon Type such as Type 2 Interactive or Type 3 Network), while Event ID 4625 logs failed authentication attempts with specific failure status codes."
        },
        {
            "question": "What invaluable endpoint telemetry does Sysmon Event ID 1 provide that standard Windows security logging often lacks by default?",
            "options": [
                "Detailed Process Creation telemetry, including full command-line arguments, parent process name, parent command line, process GUID, and file hashes (SHA256)",
                "Full disk encryption recovery keys",
                "Audio recordings of user microphone activity",
                "BIOS firmware microcode dumps"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Sysmon Event ID 1 records granular process creation events, preserving the exact parent-child process tree, process hashes, and complete command-line strings that adversaries use to invoke tools like PowerShell or mshta."
        },
        {
            "question": "In a Windows process tree, why is `winword.exe` launching `powershell.exe` with base64-encoded parameters considered suspicious?",
            "options": [
                "Word documents have no legitimate reason to execute command shells, and encoded command lines are frequently used to obfuscate downloader scripts or payload staging",
                "Microsoft Office automatically deletes PowerShell if it is launched",
                "PowerShell only runs on Linux servers",
                "Because base64 encoding is illegal under Windows licensing"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Productivity applications (Word, Excel) spawning scripting interpreters (PowerShell, cmd, wscript) is a classic indicator of macro or exploit execution, and encoded flags (`-enc`) are designed to evade simple string detection."
        }
    ],
    6: [
        {
            "question": "Why is enterprise-wide time synchronization via Network Time Protocol (NTP) vital for incident response readiness?",
            "options": [
                "Without synchronized clocks, correlating chronological event sequences and causal relationships across endpoints, servers, firewalls, and cloud services becomes difficult or misleading",
                "NTP prevents malware from executing after midnight",
                "Computer motherboards cannot operate without an NTP server",
                "NTP automatically updates operating system patches"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Time skew across different logs destroys an analyst's ability to reconstruct an accurate timeline. Standardizing on NTP and converting all forensic evidence to UTC is essential for defensible investigation."
        },
        {
            "question": "What is the primary function of an incident response 'Communication and Escalation Matrix' established during the Preparation phase?",
            "options": [
                "It specifies pre-approved points of contact, on-call roles, escalation thresholds, and emergency approval authorities for disruptive response actions (like host isolation or credential reset)",
                "It lists the personal social media accounts of all employees",
                "It automatically posts security alerts to public websites",
                "It replaces the need for technical log monitoring"
            ],
            "correctAnswerIndex": 0,
            "explanation": "A communication matrix ensures responders know exactly who has the legal and operational authority to approve containment actions, when to notify legal/communications teams, and how to reach on-call leads 24/7."
        },
        {
            "question": "What is the main benefit of conducting tabletop exercises (TTX) before real security incidents occur?",
            "options": [
                "They validate playbooks, uncover operational friction, clarify decision-making authorities, and build muscle memory across technical and executive stakeholders without risking production downtime",
                "They allow analysts to test live destructive ransomware on production domain controllers",
                "They guarantee that an organization will never suffer a security breach",
                "They generate real SIEM alerts that count toward analyst performance quotas"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Tabletops simulate realistic crisis scenarios in a safe discussion environment, testing communication paths, technical playbooks, and decision-making bottlenecks before a live high-stakes incident occurs."
        }
    ],
    7: [
        {
            "question": "What is the very first step an L1 analyst should perform upon receiving a high-severity alert from a detection engine?",
            "options": [
                "Inspect the detection rule logic and raw triggering fields to understand exactly what event conditions caused the alert to fire",
                "Immediately notify the media that a breach has occurred",
                "Delete the detection rule to clear the alert queue",
                "Shut down the corporate data center"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Effective triage starts by understanding rule logic: what threshold, query condition, or behavior triggered the alert, and what specific log fields are cited as supporting evidence."
        },
        {
            "question": "Why should an analyst verify whether an alert represents an isolated event or part of a clustered storm?",
            "options": [
                "Duplicate alerts across dozens of hosts simultaneously often indicate an IT deployment, vulnerability scanner, or broken rule rather than 50 separate targeted intrusions",
                "Because SIEM software charges per click in the user interface",
                "Clustered alerts are automatically deleted by the operating system",
                "Because isolated alerts are always false positives"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Deconfliction requires checking temporal and fleet-wide scope: a sudden spike across 100 machines often points to a routine configuration rollout or false-positive scanner rule rather than simultaneous manual compromises."
        },
        {
            "question": "What should an analyst do when alert triage leaves significant uncertainty regarding the legitimacy of an administrative script?",
            "options": [
                "Pivot to asset ownership records, check change management tickets, contact the account owner or system administrator, and document the open questions in the ticket",
                "Guess that it is benign and close the ticket with no notes",
                "Immediately wipe the server without asking anyone",
                "Mark the ticket as closed and delete the logs"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Professional triage separates confirmed observations from open inferences. When activity might be authorized administration, cross-referencing change tickets and contacting the asset owner resolves ambiguity defensibly."
        }
    ],
    8: [
        {
            "question": "Why is an alert's static detection severity (e.g. 'Medium') not necessarily identical to the actual Incident Priority?",
            "options": [
                "Incident Priority factors in business context: the criticality of the targeted asset, whether exploitation succeeded, blast radius, and potential impact on operations or sensitive data",
                "Priority is assigned randomly by the ticketing system",
                "Detection engineers set all alerts to Critical by default",
                "Severity only applies to hardware defects"
            ],
            "correctAnswerIndex": 0,
            "explanation": "A 'Medium' alert on a public sandboxed test VM may be low priority, while that same 'Medium' alert on a Tier-0 Active Directory Domain Controller or SWIFT banking server becomes an immediate P1 emergency."
        },
        {
            "question": "What operational criterion defines an Incident Response Service Level Agreement (SLA)?",
            "options": [
                "The agreed-upon timeframes within which an alert must be acknowledged, triaged, and escalated or contained based on its severity tier",
                "The total gigabytes of logs a user is permitted to download",
                "The discount percentage offered by cybersecurity insurance",
                "The maximum number of hours an employee can work per week"
            ],
            "correctAnswerIndex": 0,
            "explanation": "IR SLAs establish clear contractual or organizational performance commitments (e.g., P1 acknowledged within 15 minutes, initial containment recommendation within 1 hour)."
        },
        {
            "question": "Why is a formal shift handoff protocol essential in a 24/7 Security Operations Center?",
            "options": [
                "To ensure ongoing investigations, uncontained active threats, pending approvals, and scheduled maintenance context are seamlessly transferred to the incoming team without dropped context",
                "To allow analysts to leave their workstations unattended for hours",
                "Shift handoffs are only required during fire drills",
                "To reboot all monitoring servers between shifts"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Shift handoffs prevent security blind spots: incomplete investigations or active containment monitoring must be explicitly briefed to incoming analysts to maintain continuous defense."
        }
    ],
    9: [
        {
            "question": "What is the primary difference between an atomic Indicator of Compromise (IoC) and a behavioral TTP in the MITRE ATT&CK framework?",
            "options": [
                "An IoC is a static artifact (IP address, domain, MD5/SHA256 hash) that adversaries can change easily, whereas a TTP describes the tactic, technique, and procedure (behavior) used to accomplish an objective",
                "IoCs are used only by law enforcement, while TTPs are used only by software developers",
                "TTPs expire within 24 hours, while IoCs remain valid forever",
                "There is no difference between IoCs and TTPs"
            ],
            "correctAnswerIndex": 0,
            "explanation": "David Bianco's Pyramid of Pain demonstrates that atomic IoCs (hashes, IPs) are trivial for adversaries to alter, whereas detecting core TTPs (e.g. Process Injection, Pass-the-Hash) forces attackers to reinvent their entire tradecraft."
        },
        {
            "question": "Why should incident responders be cautious when using public multi-engine reputation services (e.g. VirusTotal) during active investigations?",
            "options": [
                "Submitting proprietary customer documents, internal memory dumps, or sensitive configuration files to public scanning platforms exposes confidential organizational data to external third parties and adversaries",
                "Public scanning tools will permanently lock the files on the source server",
                "Public platforms do not support SHA256 hashes",
                "Scanners charge thousands of dollars for each hash lookup"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Uploading raw files containing proprietary data or confidential IP leaks information to paid subscribers (including researchers and adversaries monitoring telemetry). Responders search by file hash rather than uploading raw payloads."
        },
        {
            "question": "Why do threat intelligence indicator matches on shared Content Delivery Network (CDN) or cloud IPs frequently cause false positives?",
            "options": [
                "Because thousands of completely benign corporate websites and SaaS applications share the same edge IP addresses; alerting on the IP alone misidentifies harmless traffic as C2 communication",
                "Because CDN providers do not allow security monitoring",
                "Shared IPs cause physical damage to switches",
                "Adversaries never use cloud infrastructure"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Multi-tenant cloud infrastructure and CDNs (Cloudflare, Akamai, AWS CloudFront) host millions of legitimate domains behind shared IP pools. Reliable triage requires domain/SNI and HTTP host context."
        }
    ],
    10: [
        {
            "question": "What is the core principle of evidentiary chain of custody in incident case management?",
            "options": [
                "Documenting the chronological custody, transfer, disposition, and cryptographic integrity (hashes) of digital evidence so that every access and transformation can be independently verified",
                "Storing all forensic evidence on unencrypted USB thumb drives",
                "Ensuring that evidence is deleted within 48 hours to save disk space",
                "Never recording the name of the analyst who collected the data"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Chain of custody establishes legal and operational defensibility by recording who collected the evidence, when, where it was stored, who accessed it, and proving its integrity through matching cryptographic hashes."
        },
        {
            "question": "In investigation documentation, why is it critical to separate factual observations from analytical hypotheses?",
            "options": [
                "Conflating unproven assumptions with verified facts can lead downstream responders into confirmation bias, misdirected containment actions, and flawed executive reporting",
                "Because ticketing systems will reject notes containing opinions",
                "Hypotheses are strictly forbidden in security operations",
                "Observations cannot be viewed by other analysts"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Documenting 'Sysmon Event 1 shows powershell.exe executed with flag -enc' is a verified fact; claiming 'the endpoint is compromised by APT29' is a hypothesis that requires further proof before taking disruptive actions."
        },
        {
            "question": "Under what condition should a security incident ticket be officially marked as resolved and closed?",
            "options": [
                "Only when root cause is identified, all containment and eradication actions are verified, affected assets are restored to trusted operation, and post-incident lessons learned are documented",
                "As soon as the user logs off for the day",
                "When the shift ends, regardless of whether malware is still running",
                "Immediately after an alert is escalated to Tier 2"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Incident closure requires comprehensive validation: all access vectors must be sealed, eradication verified, systems safely restored, and documentation completed to prevent recurring compromise."
        }
    ],
    11: [
        {
            "question": "What is the fundamental difference between the `_time` and `_indextime` fields in Splunk SIEM architecture?",
            "options": [
                "`_time` represents when the event actually occurred on the originating source machine, whereas `_indextime` represents when the Splunk indexer received and indexed the record",
                "`_time` is measured in microseconds, while `_indextime` is measured in days",
                "`_indextime` is always earlier than `_time`",
                "They are always identical in every search query"
            ],
            "correctAnswerIndex": 0,
            "explanation": "`_time` is extracted from the raw event payload (source timestamp), while `_indextime` records when Splunk processed it. Comparing them reveals forwarder lag, network outages, or delayed log delivery."
        },
        {
            "question": "Why should analysts always specify index names and bounded time ranges in their Splunk Search Processing Language (SPL) queries?",
            "options": [
                "It restricts the search to relevant time-partitioned disk buckets and specific indices, preventing unconstrained full-cluster disk scans that degrade SIEM performance",
                "Splunk queries will generate an error if an index is omitted",
                "Time ranges change the font size of the results table",
                "Indexes encrypt the search string"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Unscoped searches (`* | search evil`) force indexers to scan every single historical bucket across all default indices. Scoping by index and time window is the cardinal rule of high-performance SIEM investigation."
        },
        {
            "question": "Which SPL command is used to calculate statistical metrics (like count, distinct count, average) grouped by specific field entities?",
            "options": [
                "stats",
                "table",
                "dedup",
                "rename"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The `stats` command (e.g. `| stats count, dc(dest_ip) by user`) aggregates search results into calculated numerical metrics grouped by specified fields."
        }
    ],
    12: [
        {
            "question": "In Microsoft Sentinel, which Kusto Query Language (KQL) operator filters rows matching specific logical conditions?",
            "options": [
                "where",
                "project",
                "summarize",
                "extend"
            ],
            "correctAnswerIndex": 0,
            "explanation": "In KQL, `where` filters the tabular dataset based on boolean predicates (e.g. `SecurityEvent | where EventID == 4625 and TimeGenerated > ago(1d)`)."
        },
        {
            "question": "What is the function of the Microsoft Sentinel 'Investigation Graph' during incident analysis?",
            "options": [
                "It visually maps connected entities (hosts, accounts, IP addresses, URLs) and related alerts across time to help analysts explore relationships and blast radius interactively",
                "It measures the network bandwidth used by the Azure portal",
                "It automatically changes employee passwords",
                "It graphs the billing cost of the Log Analytics workspace"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The Investigation Graph links related entities across different security alerts, helping analysts visually discover common IP addresses, compromised accounts, and lateral movements spanning multiple systems."
        },
        {
            "question": "What is the primary architectural purpose of the Advanced Security Information Model (ASIM) in Microsoft Sentinel?",
            "options": [
                "To normalize disparate vendor logs (DNS, Web, Network, Auth) into standardized schemas so that unified analytic rules and hunting queries work across any source vendor",
                "To delete old security events automatically",
                "To translate KQL queries into Python scripts",
                "To encrypt all Azure virtual machines"
            ],
            "correctAnswerIndex": 0,
            "explanation": "ASIM uses query-time parsers to map diverse source formats (e.g., Infoblox, Windows DNS, Cisco Umbrella) into a single standard schema (`_Im_Dns`), enabling vendor-agnostic detection rules."
        }
    ],
    13: [
        {
            "question": "Why is an EDR process tree representation critical when analyzing an alert on a common utility like `certutil.exe` or `powershell.exe`?",
            "options": [
                "Because legitimate administrative tools are frequently abused ('Living off the Land'), and the parent process (e.g. spawned by Word, Excel, or Apache) reveals the unauthorized initial execution vector",
                "Because EDR tools cannot scan utilities signed by Microsoft",
                "Process trees show the hardware temperature of the CPU",
                "Process trees automatically terminate any script that runs longer than 5 seconds"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Adversaries leverage signed native binaries (LOLBins). A process tree showing `httpd.exe -> cmd.exe -> certutil.exe -urlcache` immediately reveals a web shell executing payload downloads rather than authorized IT operations."
        },
        {
            "question": "What common persistence mechanism on Windows endpoints can be identified through Sysmon Event ID 11 (FileCreate) and Registry telemetry?",
            "options": [
                "Dropping malicious scripts or binaries into Startup directories or registering them under CurrentVersion\\Run registry keys",
                "Changing desktop background wallpaper",
                "Adjusting screen brightness settings",
                "Plugging in an external USB monitor"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Adversaries maintain access by writing files to startup locations and creating autostart registry entries (`HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`), which trigger on every user logon."
        },
        {
            "question": "Why should host isolation via EDR require verified triage and proper authorization before execution?",
            "options": [
                "Isolating a host severs network connectivity, which can disrupt critical business operations or services and may alert the adversary that they have been detected before full scope is understood",
                "EDR isolation destroys the operating system kernel permanently",
                "Host isolation violates international telecommunications law",
                "Isolation causes the computer monitor to turn off"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Host isolation is a disruptive containment action that can take business-critical servers offline. Responders must weigh operational impact, preserve necessary volatile evidence, and follow pre-approved authority matrices."
        }
    ],
    14: [
        {
            "question": "What three standard email authentication mechanisms should analysts inspect in RFC 5322 headers when investigating suspected phishing emails?",
            "options": [
                "SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC (Domain-based Message Authentication, Reporting, and Conformance)",
                "HTTP, FTP, and Telnet",
                "SSL, TLS, and SSH",
                "TCP, UDP, and ICMP"
            ],
            "correctAnswerIndex": 0,
            "explanation": "SPF validates sender server IP authorization, DKIM verifies cryptographic message integrity, and DMARC enforces domain alignment policies to prevent spoofed sender domains."
        },
        {
            "question": "Why do incident responders defang suspicious URLs (e.g. converting `https://evil.com` to `hxxps[://]evil[.]com`) in case notes and reports?",
            "options": [
                "To prevent colleagues, clients, or automated tools from accidentally clicking or resolving the link and connecting to active malicious infrastructure",
                "Because ticketing systems cannot store forward slashes",
                "To translate foreign language domain names into English",
                "Defanging encrypts the domain using SHA256"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Defanging neutralizes actionable links in documentation, ensuring that analysts or ticketing systems do not inadvertently trigger HTTP connections or download malicious payloads."
        },
        {
            "question": "Once a phishing email is confirmed malicious, what immediate scoping action should the SOC perform across the enterprise email system?",
            "options": [
                "Execute an organization-wide mailbox search (by message ID, subject, sender, or attachment hash) to identify all other recipients, check whether links were clicked, and purge copies from inboxes",
                "Delete all email accounts across the entire company",
                "Reply to the phishing email demanding the attacker stop",
                "Reboot the corporate mail exchange server"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Phishing attacks are rarely isolated to a single employee. Scoping across all mailboxes determines campaign breadth, identifies which users interacted with the lure, and allows security teams to purge the threat enterprise-wide."
        }
    ],
    15: [
        {
            "question": "What is an 'impossible travel' anomaly in cloud identity monitoring (e.g. Microsoft Entra ID)?",
            "options": [
                "Two or more successful user sign-ins occurring from geographically distant locations within a time interval that is physically impossible to traverse via commercial travel",
                "A user logging in while their laptop is powered off",
                "An employee accessing corporate email from an airplane with satellite Wi-Fi",
                "A user changing their corporate password twice in one month"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Impossible travel occurs when authentication records show a user signing in from New York and 15 minutes later from Tokyo. While VPN/proxy usage can produce benign anomalies, it warrants immediate identity triage."
        },
        {
            "question": "Why do adversaries establish hidden inbox forwarding or deletion rules after compromising an employee's email account (BEC)?",
            "options": [
                "To intercept financial wire requests, divert vendor invoices, and conceal security notifications from the legitimate user",
                "To increase the storage space of the employee's mailbox",
                "To improve the employee's email typing speed",
                "Because Microsoft 365 requires forwarding rules on all accounts"
            ],
            "correctAnswerIndex": 0,
            "explanation": "In Business Email Compromise (BEC), threat actors create rules (e.g. forward emails containing 'invoice' or 'payment' to external webmail and delete the originals) to facilitate invoice fraud without the user's knowledge."
        },
        {
            "question": "What constitutes an effective initial containment response when an identity compromise is confirmed in a cloud tenant?",
            "options": [
                "Revoke all active user session tokens, reset credentials with a strong password, require MFA re-registration, audit active OAuth app consents, and remove suspicious inbox rules",
                "Send an email to the compromised account asking if they logged in",
                "Delete the user's account from the cloud tenant permanently",
                "Disable multi-factor authentication for the user"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Resetting the password alone does not revoke active session tokens or OAuth bearer tokens. Effective containment revokes active sessions, rotates credentials, enforces MFA, and removes adversary footholds."
        }
    ],
    16: [
        {
            "question": "In Wireshark, which display filter will display only DNS queries and responses communicating with an external DNS server?",
            "options": [
                "dns",
                "tcp.port == 80",
                "http.request",
                "arp"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The simple display filter `dns` isolates all Domain Name System traffic, allowing analysts to inspect query names, response records, NXDOMAIN errors, and potential DNS tunneling patterns."
        },
        {
            "question": "What network pattern in PCAP or Zeek `conn.log` typically characterizes adversary Command and Control (C2) beaconing?",
            "options": [
                "Repetitive, outbound TCP or HTTP(S) connections to a single external IP or domain occurring at consistent regular time intervals (often with slight randomized jitter)",
                "A single massive file download lasting 10 seconds",
                "An ARP request broadcast to local subnet machines",
                "A printer sending status messages over port 9100"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Adversary implants check in periodically with C2 infrastructure. Regular intervals (e.g. every 60 seconds +/- 10% jitter) and consistent connection durations are strong statistical indicators of automated beaconing."
        },
        {
            "question": "Why is cryptographic hashing (e.g. SHA-256) performed on a network capture file immediately upon acquisition?",
            "options": [
                "To establish a verifiable cryptographic baseline proving that the forensic capture was not modified, truncated, or tampered with during subsequent analysis",
                "To decrypt all SSL/TLS traffic inside the PCAP",
                "To compress the PCAP file so it fits onto floppy disks",
                "To speed up Wireshark display filter rendering"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Calculating and recording a cryptographic hash at the moment of acquisition establishes evidence integrity and chain of custody, ensuring any working copies can be verified against the pristine original."
        }
    ],
    17: [
        {
            "question": "What valuable evidence does the Windows Prefetch artifact (`C:\\Windows\\Prefetch`) provide to a forensic investigator?",
            "options": [
                "Proof of executable execution on the system, including application path, run count, and timestamps of the last eight execution times",
                "The full plaintext password of the logged-in user",
                "The complete audio conversation recorded during video calls",
                "The serial numbers of all monitors connected in the past year"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Windows Prefetch is designed to optimize application loading. Forensically, it proves an executable ran on the system, recording its name, execution count, volume information, and recent execution timestamps."
        },
        {
            "question": "How do Windows Shortcut (.LNK) files and Jump Lists aid in reconstructing user and attacker activity?",
            "options": [
                "They record evidence of files and folders opened by the user, including target file paths, volume serial numbers, and MAC timestamps, even if the target file was later deleted",
                "They encrypt the master file table (MFT)",
                "They increase the CPU processing speed of Windows Explorer",
                "They prevent malware from executing in the user profile"
            ],
            "correctAnswerIndex": 0,
            "explanation": "LNK files and Jump Lists automatically track user document and application interactions, preserving historical evidence of accessed local and network files, timestamps, and target volume metadata."
        },
        {
            "question": "Why is ShimCache (AppCompatCache) particularly useful when investigating historical malware execution?",
            "options": [
                "It maintains a chronological cache of executables residing on the system to manage OS compatibility, preserving file path, file size, and execution flags across system reboots",
                "It automatically recovers files encrypted by ransomware",
                "It permanently prevents unauthorized software installation",
                "It stores raw memory dumps of all running services"
            ],
            "correctAnswerIndex": 0,
            "explanation": "ShimCache tracks executables across the file system for application compatibility purposes, recording file paths and metadata that survive file deletion, providing proof that an adversary's binary existed on disk."
        }
    ],
    18: [
        {
            "question": "What is the primary operational difference between a forensic disk image (e.g. raw DD or E01) and a simple file copy?",
            "options": [
                "A forensic image captures a bit-for-bit physical replica of the entire storage media—including unallocated space, slack space, partition tables, and deleted file fragments—while file copies only read active logical files",
                "File copies preserve cryptographic write-blocking, while forensic images do not",
                "Forensic disk images cannot be opened on computers running 64-bit operating systems",
                "A forensic disk image only copies documents created in Microsoft Office"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Forensic imaging produces an exact sector-by-sector clone of the storage device, preserving deleted data, orphaned file system structures, and hidden artifacts that standard file copies cannot access."
        },
        {
            "question": "Why is a hardware or software write-blocker mandatory when acquiring forensic disk evidence from original physical media?",
            "options": [
                "To physically or logically prevent the acquisition workstation from writing any data, modifying timestamps, or changing metadata on the suspect drive during read operations",
                "To accelerate the read speed of the SATA or NVMe bus",
                "To format the destination hard drive automatically",
                "To remove all malware from the source drive before copying"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Connecting suspect media without a write-blocker allows the host OS to mount partitions, alter access times, create hidden volume information, and contaminate pristine forensic evidence."
        },
        {
            "question": "In digital forensics software like Autopsy, what is the purpose of 'Ingest Modules' during case processing?",
            "options": [
                "Automated background processing pipelines that extract file metadata, identify known files via hash sets, parse web browser histories, extract keyword indexes, and flag potential indicators",
                "Hardware drivers that physically cool the hard drive during reading",
                "Encryption algorithms used to lock the investigator's report",
                "Modules that securely erase the original evidence drive"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Ingest modules automate forensic parsing across disk images, cataloging file types, checking hashes against NSRL/threat databases, extracting EXIF data, and indexing keywords for fast keyword searching."
        }
    ],
    19: [
        {
            "question": "According to the Order of Volatility (RFC 3227), why should volatile system memory (RAM) be acquired before powering down a machine?",
            "options": [
                "RAM contains ephemeral evidence—such as running process state, injected code, decrypted cryptographic keys, active network sockets, and unsaved command lines—that is completely lost upon power loss",
                "Powering down a computer causes the hard drive to self-destruct",
                "RAM is permanent and never loses data when power is removed",
                "Disk drives cannot be analyzed if the computer was turned off"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Volatile memory vanishes when power is severed. Capturing RAM preserves live adversary footholds (memory-only rootkits, Cobalt Strike beacons, unencrypted credentials) that leave zero trace on physical disk."
        },
        {
            "question": "In Volatility 3, which plugin inspects active network connections and listening ports from a Windows memory image?",
            "options": [
                "windows.netscan",
                "windows.pslist",
                "windows.malfind",
                "windows.hashdump"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The `windows.netscan` plugin parses TCP endpoints, UDP sockets, listening ports, and associated PID/process names from memory structures present at the time of RAM acquisition."
        },
        {
            "question": "What forensic anomaly does the Volatility `windows.malfind` plugin seek to identify in a memory capture?",
            "options": [
                "Memory regions marked with Execute-Read-Write (PAGE_EXECUTE_READWRITE) permissions that contain executable code (such as MZ headers or shellcode) not backed by a legitimate file on disk",
                "Old files in the Windows Recycle Bin",
                "Hard drives that have bad sectors",
                "Passwords containing fewer than eight characters"
            ],
            "correctAnswerIndex": 0,
            "explanation": "`malfind` looks for memory pages flagged with read-write-execute permissions without corresponding mapped image files on disk—a classic signature of process hollowing, reflective DLL injection, and shellcode execution."
        }
    ],
    20: [
        {
            "question": "Why is clock skew normalization essential when correlating evidence across endpoint logs, network firewalls, and cloud audit trails?",
            "options": [
                "Systems with uncalibrated clocks record out-of-order timestamps, leading analysts to draw incorrect conclusions regarding which event caused subsequent activity",
                "Clock skew causes SIEM queries to return corrupted text characters",
                "Timestamps cannot be sorted alphabetically",
                "Because cloud firewalls will reject all packets from machines with clock skew"
            ],
            "correctAnswerIndex": 0,
            "explanation": "If a server's clock is 8 minutes slow, an attacker's lateral movement may appear in logs *before* their initial login. Normalizing all sources to a verified UTC delta is critical to establishing valid cause-and-effect timelines."
        },
        {
            "question": "What is the critical analytical distinction between correlation and causation during incident timeline analysis?",
            "options": [
                "Two events occurring close in time may be completely unrelated coincidences (e.g. an admin running backup jobs during an alert window); proving causation requires corroborating evidence linking the process, user, and artifact directly",
                "Correlation only applies to network packets, while causation applies only to files",
                "Causation is proven whenever two events have the same timestamp",
                "There is no distinction between correlation and causation in digital forensics"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Temporal coincidence is not proof of causality. Responders must verify shared entity identifiers, process lineage, and artifact linkage to demonstrate that action A directly produced outcome B."
        },
        {
            "question": "Why should forensic incident reports cite specific Evidence IDs (e.g. EV-001, LOG-04) for every substantive statement of fact?",
            "options": [
                "To ensure that all conclusions are fully traceable, reproducible, and verifiable against pristine source evidence by peer reviewers, legal counsel, or auditors",
                "To make the report look longer for billing purposes",
                "Because evidence numbers are required by word processing software",
                "To prevent the report from being printed on paper"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Traceability is the cornerstone of professional reporting. Citing explicit evidence IDs allows independent investigators or legal teams to verify the exact log entry or artifact supporting each finding."
        }
    ],
    21: [
        {
            "question": "What is the primary objective of the Containment phase in the incident response lifecycle?",
            "options": [
                "To prevent an incident from expanding its scope, limit damage to critical business assets, and stop attacker lateral movement or data exfiltration while preserving forensic evidence",
                "To immediately delete all infected virtual machines from existence",
                "To issue a public press release before alerting IT administrators",
                "To format the hard drives of all employee workstations"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Containment halts the spread of an attack, protects business continuity, and stops active compromise from worsening while maintaining system state needed for forensic investigation."
        },
        {
            "question": "Why must incident responders obtain operational or executive authorization before executing disruptive containment actions (such as isolating an ERP database)?",
            "options": [
                "Disruptive containment can halt revenue-generating business operations, violate customer service contracts, or trigger massive operational outages that outweigh the technical security risk",
                "Because engineers are not legally allowed to use command-line tools",
                "Authorization is only required for personal computers",
                "To transfer all technical blame to executive leadership"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Taking down production systems or revoking enterprise services carries severe business and financial consequences. Responders recommend containment options with clear risk/benefit analysis, ensuring authorized decision-makers approve the disruption."
        },
        {
            "question": "Why should containment measures be designed to be reversible whenever possible?",
            "options": [
                "If subsequent investigation reveals the alert was a benign positive or that a critical business service was incorrectly isolated, access can be swiftly restored without permanent operational damage",
                "Reversible containment allows malware to escape more easily",
                "Because firewalls can only be modified once per year",
                "Reversibility is an optional software license feature"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Triage decisions are made under high uncertainty. Using reversible controls (e.g. host isolation via EDR or disabling an account rather than hard-deleting virtual machines) ensures recovery without permanent harm if the triage verdict evolves."
        }
    ],
    22: [
        {
            "question": "Why must an incident response team thoroughly confirm the full scope of adversary access across the enterprise before initiating eradication?",
            "options": [
                "If the team eradicates only one visible foothold while the adversary maintains secondary backdoors or compromised credentials, the attacker will immediately adapt, escalate privileges, or deploy ransomware",
                "Because eradication tools can only run on one machine at a time",
                "Eradication is only necessary if the server runs Windows",
                "Because network firewalls must be uninstalled during eradication"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Premature eradication tips off the adversary. If secondary persistence mechanisms or alternative compromised accounts remain unaddressed, the adversary will pivot, delete logs, or trigger destructive payloads."
        },
        {
            "question": "What are the core technical activities performed during the Eradication phase of incident response?",
            "options": [
                "Removing all malicious binaries, scripts, and backdoors, eliminating unauthorized persistence mechanisms, revoking and rotating all compromised credentials, and patching exploited vulnerabilities",
                "Writing the final executive invoice for the client",
                "Purchasing new computer monitors for the department",
                "Rebooting all routers in the corporate office"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Eradication purges the threat from the environment: terminating hostile processes, cleaning persistence artifacts, revoking compromised access paths, and closing the initial vulnerability that granted entry."
        },
        {
            "question": "Why is 'rebuilding from clean trusted source code/images' often preferred over attempting to manually clean a deeply compromised operating system?",
            "options": [
                "Adversaries can embed sophisticated stealth footholds (rootkits, WMI subscriptions, modified system binaries) that evade manual detection; rebuilding from known-good golden images guarantees an uncompromised state",
                "Rebuilding is always cheaper than running antivirus scans",
                "Operating system licenses require reinstallation after any alert",
                "Antivirus software will refuse to scan a computer that has been hacked"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Once an adversary achieves kernel-level or root access, trusting the integrity of the operating system is impossible. Re-imaging from validated, hardened baseline images ensures zero residual adversary presence."
        }
    ],
    23: [
        {
            "question": "Why must incident responders verify that backup restore points are 'known-good' prior to restoring production systems after a breach?",
            "options": [
                "Adversaries frequently establish dwell times of weeks or months before triggering alerts; restoring a backup taken after the initial intrusion will merely reintroduce the adversary's backdoors and compromised state",
                "Because backups older than 24 hours cannot be read by modern hard drives",
                "Restoring backups will permanently delete the active directory domain",
                "Known-good backups are only required for cloud databases"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Threat actors often dwell inside networks for weeks before discovery. Responders establish the initial compromise date and verify that backups selected for recovery pre-date adversary presence and are free of malware."
        },
        {
            "question": "What is the primary rationale for implementing a 'staged return to service' during system recovery?",
            "options": [
                "It allows security teams to restore systems incrementally under heightened telemetry monitoring, verifying business functionality and security health in phases before exposing them to full production traffic",
                "To reduce the electric power consumption of the data center",
                "Because network cables can only transfer data to one server at a time",
                "Staged recovery is only used when restoring printers"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Staged recovery prevents sudden re-infection and operational overload, bringing critical services online gradually with enhanced logging, restricted network egress, and real-time monitoring."
        },
        {
            "question": "Why is heightened 24/7 post-recovery monitoring mandatory for at least 30 to 90 days following major incident resolution?",
            "options": [
                "To catch any dormant secondary backdoors, monitor for credential reuse attempts, verify that patched vulnerabilities remain closed, and detect any potential adversary re-entry immediately",
                "Because cybersecurity insurance policies require constant typing in the SOC",
                "To allow servers to cool down after recovery",
                "Post-recovery monitoring is only required for retail websites during holidays"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Adversaries often attempt to re-enter networks using secondary access vectors or newly purchased stolen credentials. Continuous focused monitoring verifies sustained environmental health and confirms eradication success."
        }
    ],
    24: [
        {
            "question": "What immediate technical indicator strongly suggests an active enterprise ransomware outbreak in progress?",
            "options": [
                "Rapid, high-volume file modification and renaming spikes across network shares, mass termination of backup and volume shadow copy services (`vssadmin delete shadows`), and ransom notes appearing in directories",
                "A user reporting that their mouse battery is low",
                "A web browser displaying an expired SSL certificate warning",
                "A scheduled Windows Update notification appearing on the desktop"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Ransomware operators systematically inhibit recovery before encryption: deleting volume shadow copies (`vssadmin`), stopping backup services, and encrypting hundreds of files per second with new extensions."
        },
        {
            "question": "Why should network segmentation and isolated containment be executed with extreme urgency during a confirmed ransomware outbreak?",
            "options": [
                "To sever adversary lateral movement channels (SMB, RDP, WinRM) and prevent the encryption payload or wiper from spreading to secondary subnets, domain controllers, and backup repositories",
                "Because ransomware cannot run on computers that are turned on",
                "To prevent employees from checking social media",
                "Because isolation decrypts all locked files instantly"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Modern ransomware spreads aggressively using automated scripts and stolen domain admin credentials. Severing lateral network paths immediately restricts the blast radius and protects unaffected subnets."
        },
        {
            "question": "Why do incident response tabletop exercises for ransomware emphasize coordination with legal counsel and executive leadership?",
            "options": [
                "Ransomware incidents trigger severe legal notification duties (data breach reporting deadlines), potential regulatory penalties, extortion compliance laws, and critical decisions regarding business viability",
                "Because lawyers are required to write the technical decryption scripts",
                "Because executive leadership handles all firewall configuration changes",
                "Legal counsel must approve all software updates on user laptops"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Ransomware involves extortion, data theft, business interruption, and regulatory reporting mandates (e.g. GDPR, HIPAA, SEC disclosure rules). Response requires close alignment between technical, legal, insurance, and executive leadership."
        }
    ],
    25: [
        {
            "question": "What data sources are most effective for detecting and quantifying potential adversary data exfiltration?",
            "options": [
                "Egress firewall logs, web proxy upload volumes, NetFlow outbound byte spikes, cloud storage API audit logs, and endpoint Data Loss Prevention (DLP) telemetry",
                "CPU temperature monitors and power supply voltage logs",
                "Antivirus update download logs",
                "Operating system audio output logs"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Exfiltration involves transferring volume across organizational boundaries. Correlating high outbound byte counts on proxies/firewalls with endpoint archive creation (e.g. 7-zip staging) reveals data egress."
        },
        {
            "question": "Why is establishing the specific scope and sensitivity of exfiltrated data critical during incident triage?",
            "options": [
                "It determines statutory data breach notification obligations to regulators and affected individuals (e.g., PII, PHI, financial records, intellectual property) and guides legal risk exposure",
                "Because cloud storage providers charge higher fees for sensitive data",
                "To decide whether the company needs to buy new hard drives",
                "Data sensitivity only matters if the company is a bank"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Privacy regulations (GDPR, CCPA, HIPAA) mandate specific notification clocks (e.g. 72 hours) and public disclosures based strictly on whether sensitive personal or health data was accessed or exfiltrated."
        },
        {
            "question": "How should an incident response team address uncertainty when inspecting egress traffic to an encrypted cloud storage service (e.g. Mega, Dropbox)?",
            "options": [
                "Document known connection metadata (timestamps, transferred byte volumes, destination domain) while acknowledging that encrypted payload contents cannot be read directly without endpoint staging evidence",
                "Assert that no data was stolen because the traffic was encrypted",
                "Claim that all corporate data on the entire network was stolen without evidence",
                "Delete the proxy logs to prevent legal discovery"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Defensible forensics separates verified facts from unknown contents. Showing that 4.2 GB uploaded to an external storage service indicates high risk, while endpoint forensic staging artifacts help establish what specific files were transferred."
        }
    ],
    26: [
        {
            "question": "What core principle governs security incident response responsibilities under the AWS Cloud Shared Responsibility Model?",
            "options": [
                "AWS is responsible for the security 'of' the cloud (physical infrastructure, virtualization layer), while the customer is responsible for security 'in' the cloud (IAM policies, OS configurations, data encryption, and application logs)",
                "AWS assumes 100% of all incident response and legal liabilities for customer data",
                "The customer is responsible for repairing physical servers in AWS data centers",
                "Shared responsibility means that neither AWS nor the customer needs to monitor logs"
            ],
            "correctAnswerIndex": 0,
            "explanation": "AWS manages physical and hypervisor infrastructure, while customers maintain ownership and operational responsibility for their configurations, operating systems, user credentials, access keys, and data."
        },
        {
            "question": "Which AWS audit service provides immutable, centralized records of API calls and administrative actions executed across an AWS environment?",
            "options": [
                "AWS CloudTrail",
                "AWS CloudFront",
                "Amazon Route 53",
                "Amazon EC2"
            ],
            "correctAnswerIndex": 0,
            "explanation": "AWS CloudTrail records API calls made by users, roles, or AWS services, capturing caller identity, source IP address, request parameters, and response elements essential for cloud incident triage."
        },
        {
            "question": "What is the recommended containment procedure when an AWS IAM long-term access key is suspected of being compromised or leaked publicly?",
            "options": [
                "Immediately deactivate or delete the access key in IAM, revoke all active sessions for the principal, review CloudTrail for unauthorized API calls, and attach an explicit Deny policy while investigating",
                "Wait 7 days to see if any more API calls occur",
                "Change the AWS account's corporate credit card number",
                "Reboot the EC2 instances in that region"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Deactivating the access key immediately severs the attacker's authentication path. Revoking active STS sessions and reviewing CloudTrail history determines what resources were created or accessed."
        }
    ],
    27: [
        {
            "question": "What telemetry source within Microsoft Purview / M365 records critical user activities such as mailbox item access, file sharing, and administrative role assignments?",
            "options": [
                "The Unified Audit Log (UAL)",
                "Windows Defender Antivirus quarantine log",
                "The Windows system pagefile",
                "Internet Information Services (IIS) log"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The Microsoft 365 Unified Audit Log (UAL) aggregates user and administrator activities across Exchange Online, SharePoint, OneDrive, Entra ID, and Teams into a centralized queryable audit store."
        },
        {
            "question": "How can an adversary maintain persistent stealth access to a Microsoft 365 tenant through 'Illicit Consent Grant' attacks?",
            "options": [
                "By tricking a user into granting an OAuth 2.0 application excessive permissions (e.g. `Mail.ReadWrite`, `Files.ReadWrite.All`), allowing the attacker's app to access tenant data via API without needing the user's password",
                "By physically stealing an Azure data center hard drive",
                "By changing the desktop font size of the Outlook web client",
                "By sending an unencrypted fax to Microsoft headquarters"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Illicit consent attacks bypass MFA and password resets: the adversary registers an Azure AD app and phishes users into granting API permissions, allowing programmatic data harvesting via Graph API."
        },
        {
            "question": "What does a `MailItemsAccessed` event in Exchange Online auditing signify during an Account Takeover investigation?",
            "options": [
                "A forensic record indicating that individual email messages or message folders were read or synchronized by a specific client or IP address, proving whether mail contents were accessed",
                "The user received a new spam email",
                "The mail server's hard drive is 50% full",
                "A calendar invitation was declined"
            ],
            "correctAnswerIndex": 0,
            "explanation": "`MailItemsAccessed` is an advanced auditing action that provides forensic proof of whether an adversary actually read, previewed, or downloaded sensitive email messages during an unauthorized session."
        }
    ],
    28: [
        {
            "question": "What is the primary architectural purpose of an enterprise DFIR platform like Velociraptor during large-scale incident response?",
            "options": [
                "To rapidly query, collect, and analyze granular endpoint forensic artifacts (MFT, memory, registry, event logs) across thousands of distributed machines simultaneously using custom queries (VQL)",
                "To replace enterprise firewalls and network routers",
                "To automatically mine cryptocurrency on employee computers",
                "To write annual employee performance appraisals"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Velociraptor enables endpoint visibility at scale: investigators dispatch lightweight Velociraptor Query Language (VQL) artifacts across the fleet in minutes to hunt for indicators without pulling full disk images."
        },
        {
            "question": "How does the principle of 'Data Minimization' apply to enterprise digital forensics and threat hunting?",
            "options": [
                "Investigators should collect only the specific forensic artifacts necessary to answer investigative questions, minimizing storage overhead, network bandwidth consumption, and exposure of irrelevant employee privacy data",
                "Investigators should only look at one log file per incident",
                "All log files should be deleted after 10 minutes",
                "Data minimization means using smaller monitor screens"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Targeted artifact collection (pulling specific prefetch files or MFT records instead of entire 1 TB physical disk images) accelerates analysis, reduces network saturation, and respects employee privacy regulations."
        },
        {
            "question": "Why is threat hunting described as a 'hypothesis-driven' proactive security process?",
            "options": [
                "Hunters formulate a specific testable assumption that an adversary is present using a known technique (e.g. DLL search order hijacking) and proactively search existing telemetry for evidence, rather than waiting for an automated alert to fire",
                "Because threat hunting is only performed when all computers have crashed",
                "Threat hunting requires guessing random passwords until one works",
                "Hypotheses are only used by software programmers"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Threat hunting starts with an intelligent hypothesis (informed by threat intelligence, new vulnerabilities, or environment architecture) and actively inspects data to uncover stealth threats that evaded automated detection rules."
        }
    ],
    29: [
        {
            "question": "What is the primary advantage of authoring detection rules in the open-source Sigma format?",
            "options": [
                "Sigma provides an open, vendor-agnostic YAML rule specification that can be automatically converted into target search syntaxes (Splunk SPL, Sentinel KQL, Elastic Lucene, QRadar) using tools like `sigmac`",
                "Sigma rules are executable binary programs that replace antivirus software",
                "Sigma rules guarantee zero false positives in any environment",
                "Sigma rules run faster than the speed of light"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Sigma is the 'YARA for log events': detection engineers write rule logic once in standardized YAML, and compilation tools translate it into native queries for Splunk, Sentinel, Elasticsearch, and other SIEMs."
        },
        {
            "question": "Why should Security Orchestration, Automation, and Response (SOAR) playbooks include human approval gates before executing high-impact actions?",
            "options": [
                "To prevent an automated script from causing catastrophic business downtime or disconnecting critical production services due to a false-positive alert or misclassified entity",
                "Because automation software cannot execute without a human holding the spacebar",
                "Human approval is required by the computer motherboard manufacturer",
                "To ensure that alerts take at least 24 hours to process"
            ],
            "correctAnswerIndex": 0,
            "explanation": "While enriching data (looking up IP reputation, user details) can be 100% automated, disruptive containment (shutting down servers, blocking core gateway firewalls) must require human confirmation to prevent self-inflicted outages."
        },
        {
            "question": "How does an incident response team track and improve detection quality over time?",
            "options": [
                "By measuring False Positive Rates, Mean Time to Detect (MTTD), Mean Time to Acknowledge (MTTA), and holding Post-Incident Reviews to translate investigation lessons into tuned detection rules",
                "By ignoring all alerts that fire more than five times a day",
                "By turning off detection rules that generate too many emails",
                "By measuring how many words are in each analyst ticket"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Continuous detection improvement closes the feedback loop: each incident and false-positive cluster informs rule tuning, whitelist refinements, and new detections to harden the organization against repeat attacks."
        }
    ],
    30: [
        {
            "question": "In a comprehensive end-to-end incident response capstone, what primary deliverable bridges technical forensic findings with executive risk decisions?",
            "options": [
                "The Post-Incident Executive and Technical Report, featuring an executive summary of business impact, a verified chronological timeline, root cause analysis, and prioritized strategic recommendations",
                "A screenshot of the analyst's terminal window",
                "A list of the user's favorite website bookmarks",
                "A raw binary dump of the hard drive without explanations"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The final incident report synthesizes the entire lifecycle: translating complex technical telemetry into clear business impacts, verified facts, root causes, and actionable preventive controls for leadership."
        },
        {
            "question": "What is the central purpose of a Post-Incident Review (Lessons Learned meeting) conducted after an incident has been resolved?",
            "options": [
                "To conduct a blameless analysis of what occurred, evaluate response effectiveness, identify detection or communication gaps, and assign actionable security improvements to prevent future occurrences",
                "To identify which individual employee should be fired for the incident",
                "To argue with executive leadership about working hours",
                "To delete all evidence and tickets from the case management system"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Blameless post-mortems focus on systemic resilience: understanding what worked, where visibility was lacking, why detections failed, and how to improve playbooks and architecture to harden the enterprise."
        },
        {
            "question": "Why is a defensible digital incident response investigation considered 'complete' only when evidence citations and integrity records are preserved?",
            "options": [
                "Because digital evidence may be scrutinized in civil litigation, regulatory audits, criminal proceedings, or insurance claims, where unsubstantiated assertions without verifiable provenance and integrity will be rejected",
                "Because computer files expire after 30 days unless cited",
                "Citation of evidence is only required for high school essays",
                "Integrity records are an optional cosmetic feature of PDF exports"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Legal and corporate governance standards demand strict defensibility: conclusions must withstand external audits, regulatory investigations, and courtroom scrutiny by demonstrating unbroken chain of custody and verifiable proof."
        }
    ]
}

def main():
    base_dir = r"C:\Users\dutch\.gemini\antigravity\worktrees\REA_Project\private_bug_bounty_library"
    modules_dir = os.path.join(base_dir, r"docs\courses\incident_response_zero_to_advanced\modules")
    
    module_files = sorted(glob.glob(os.path.join(modules_dir, "M*.md")))
    print(f"Found {len(module_files)} module files in {modules_dir}")
    
    course_uuid = "db000000-0000-4000-8000-000000000001"
    
    modules = []
    sql_modules = []
    sql_lessons = []
    
    total_minutes = 0
    
    for f in module_files:
        basename = os.path.basename(f)
        with open(f, "r", encoding="utf-8") as fp:
            content = fp.read()
            
        # Parse module number
        mod_num_m = re.search(r'M(\d+)_', basename)
        if not mod_num_m:
            continue
        mod_num = int(mod_num_m.group(1))
        
        # Parse title
        title_m = re.search(r'#\s+Module\s+\d+:\s*([^\n]+)', content)
        raw_title = title_m.group(1).strip() if title_m else f"Module {mod_num:02d}"
        mod_title = f"Module {mod_num:02d}: {raw_title}"
        
        # Parse Phase, Level, Planned effort, Goal
        phase_m = re.search(r'\*\*Phase:\*\*\s*([^\n]+)', content)
        phase_str = phase_m.group(1).strip() if phase_m else "Foundations"
        
        level_m = re.search(r'\*\*Target level:\*\*\s*([^\n]+)', content)
        level = level_m.group(1).strip() if level_m else "Intermediate"
        
        time_m = re.search(r'\*\*Planned learner effort:\*\*\s*([^\n]+)', content)
        est_time = time_m.group(1).strip() if time_m else "3–5 hours"
        
        goal_m = re.search(r'\*\*Module mastery goal:\*\*\s*([^\n]+)', content)
        goal = goal_m.group(1).strip() if goal_m else "Master key incident response competencies."
        
        mod_desc = f"{phase_str} phase ({level}). Planned effort: {est_time}. Mastery goal: {goal}"
        
        mod_order = mod_num
        mod_uuid = f"db000000-0000-4000-8000-0000000001{mod_num:02d}"
        mod_id = f"mod-ir-m{mod_num:02d}"
        
        # Parse YouTube videos
        # 1. **Primary direct watch:** [Title](url)
        # 2. **Secondary direct watch:** [Title](url)
        yt_vids = []
        for line in content.split("\n"):
            m = re.search(r'\*\*(?:Primary|Secondary)\s+direct watch:\*\*\s*\[([^\]]+)\]\((https?://(?:www\.)?youtube\.com/watch\?v=([a-zA-Z0-9_-]+)[^\)]*)\)', line)
            if m:
                yt_vids.append({
                    "title": m.group(1).strip(),
                    "url": m.group(2).strip(),
                    "videoId": m.group(3).strip()
                })
        
        # Fallback if regex didn't catch both
        if len(yt_vids) < 2:
            raw_vids = re.findall(r'\[([^\]]+)\]\((https?://(?:www\.)?youtube\.com/watch\?v=([a-zA-Z0-9_-]+)[^\)]*)\)', content)
            yt_vids = []
            for rv in raw_vids:
                yt_vids.append({
                    "title": rv[0].strip(),
                    "url": rv[1].strip(),
                    "videoId": rv[2].strip()
                })
                
        # Parse lessons:
        # ### Lesson 01.1: Security events versus incidents
        lesson_matches = list(re.finditer(r'###\s+Lesson\s+(\d+\.\d+):\s*([^\n]+)(.*?)(?=(?:###\s+Lesson|\n##\s+|\Z))', content, re.DOTALL))
        
        # Parse Guided Lab
        lab_m = re.search(r'## Guided practical lab \(safe/authorized\)\s*\n\s*\*\*Scenario:\*\*\s*([^\n]+)(.*?)(?=## Free resources|## Knowledge check)', content, re.DOTALL)
        scenario = ""
        lab_steps = []
        submit_instructions = ""
        pass_standard = ""
        if lab_m:
            scenario = lab_m.group(1).strip()
            lab_body = lab_m.group(2).strip()
            # steps are numbered 1. ... 2. ...
            for s_line in lab_body.split("\n"):
                s_line = s_line.strip()
                if re.match(r'^\d+\.\s*', s_line):
                    lab_steps.append(re.sub(r'^\d+\.\s*', '', s_line))
            sub_m = re.search(r'\*\*Submission instructions:\*\*\s*([^\n]+)', lab_body)
            if sub_m:
                submit_instructions = sub_m.group(1).strip()
            pass_m = re.search(r'\*\*Pass standard:\*\*\s*([^\n]+)', lab_body)
            if pass_m:
                pass_standard = pass_m.group(1).strip()
                
        # Parse exit criteria / knowledge check
        kc_questions = []
        kc_m = re.search(r'## Knowledge check \(write answers in your notes\)\s*\n\s*(.*?)(?=## Reviewer checklist|\Z)', content, re.DOTALL)
        if kc_m:
            for q_line in kc_m.group(1).strip().split("\n"):
                q_line = q_line.strip()
                if re.match(r'^\d+\.\s*', q_line):
                    kc_questions.append(re.sub(r'^\d+\.\s*', '', q_line))
                    
        # Parse checklist
        rev_checklist = []
        rev_m = re.search(r'## Reviewer checklist\s*\n\s*(.*?)(?=\*\*Next:|\Z)', content, re.DOTALL)
        if rev_m:
            for c_line in rev_m.group(1).strip().split("\n"):
                c_line = c_line.strip()
                if c_line.startswith("- [ ]") or c_line.startswith("- [x]"):
                    rev_checklist.append(c_line.replace("- [ ]", "").replace("- [x]", "").strip())
        if not rev_checklist:
            rev_checklist = [
                "Watched and summarized both direct videos or relevant chapters.",
                "Completed all five lesson prompts with original explanations.",
                "Executed only safe/authorized activity on synthetic or authorized targets.",
                "Submitted a reproducible lab artifact and evidence/source references.",
                "Assigned an evidence-based verdict with limitations and escalation reasoning."
            ]

        # Build module lessons
        module_lessons = []
        for l_idx, lm in enumerate(lesson_matches):
            lesson_num_str = lm.group(1).strip() # e.g. "01.1"
            lesson_title_raw = lm.group(2).strip()
            lesson_body = lm.group(3).strip()
            
            l_order = l_idx + 1
            l_uuid = f"db000000-0000-4000-8000-00000001{mod_num:02d}{l_order:02d}"
            l_id = f"les-ir-m{mod_num:02d}-l{l_order:02d}"
            l_slug = f"m{mod_num:02d}-l{l_order}-{slugify(lesson_title_raw)}"
            
            # Map video:
            # 2 videos: lessons 1 & 2 -> video 0 (primary); lessons 3, 4, 5 -> video 1 (secondary)
            if yt_vids:
                if len(yt_vids) == 1:
                    assigned_yt = yt_vids[0]
                else:
                    assigned_yt = yt_vids[0] if l_order <= 2 else yt_vids[1]
            else:
                assigned_yt = {"title": "Incident Response Briefing", "videoId": "ugRlyWj-9SI"}
                
            video_id = assigned_yt["videoId"]
            video_creator = assigned_yt["title"].split("—")[-1].strip() if "—" in assigned_yt["title"] else "DFIR Specialist"
            
            duration = 35 # 35 mins per lesson -> 5 lessons = 175 mins per module
            total_minutes += duration
            
            lesson_title = f"Module {mod_num:02d} · Lesson {l_order}: {lesson_title_raw}"
            lesson_desc = f"Hands-on incident response lesson covering {lesson_title_raw}. Analyze triage evidence, evaluate root causes, and apply NIST SP 800-61r3 / CISA playbooks."
            
            # Extract learning objective from body if present
            obj_m = re.search(r'\*\*Learning objective:\*\*\s*([^\n]+)', lesson_body)
            specific_obj = obj_m.group(1).strip() if obj_m else f"Master core defensive competencies for {lesson_title_raw}."
            
            objectives = [
                specific_obj,
                "Distinguish factual observations from investigative inferences without overcalling compromise.",
                "Formulate and document defensible escalation and containment recommendations."
            ]
            
            tags = ["incident-response", "soc-analyst", "dfir", f"module-{mod_num:02d}"]
            title_lower = lesson_title_raw.lower() + " " + raw_title.lower()
            if "linux" in title_lower: tags.append("linux")
            if "windows" in title_lower or "sysmon" in title_lower: tags.append("windows")
            if "network" in title_lower or "wireshark" in title_lower or "pcap" in title_lower: tags.append("network-security")
            if "memory" in title_lower or "volatility" in title_lower: tags.append("memory-forensics")
            if "disk" in title_lower or "autopsy" in title_lower: tags.append("disk-forensics")
            if "cloud" in title_lower or "aws" in title_lower or "azure" in title_lower: tags.append("cloud-security")
            if "phishing" in title_lower or "email" in title_lower: tags.append("email-security")
            if "ransomware" in title_lower: tags.append("ransomware")
            if "containment" in title_lower or "eradication" in title_lower or "recovery" in title_lower: tags.append("containment")
            if "siem" in title_lower or "splunk" in title_lower or "sentinel" in title_lower: tags.append("siem")
            
            skills_taught = [
                f"Incident investigation: {lesson_title_raw}",
                "Factual evidence normalization and chronological timeline construction",
                "Defensive risk scoping and asset criticality evaluation",
                "Reversible containment planning and authorization verification"
            ]
            
            rich_content = {
                "introduction": f"In this lesson on '{lesson_title_raw}', we explore the operational triage, analysis, and containment methodologies required in professional SOC and CSIRT environments. Review the demonstration, inspect the synthetic evidence, and apply evidence-based reasoning.",
                "prerequisites": [
                    "Familiarity with basic OS logs (Windows Event Logs or Linux syslog)",
                    "Access to synthetic IR training datasets (alerts, sign-ins, sysmon, network PCAPs)",
                    "Understanding of NIST SP 800-61r3 / CSF 2.0 defensive boundaries"
                ],
                "theorySections": [
                    {
                        "title": f"Investigation Framework: {lesson_title_raw}",
                        "content": f"During incident handling, {lesson_title_raw} forms a vital link in establishing scope, confidence, and appropriate operational impact. Responders must ground their decisions in immutable telemetry, account for false-positive baselines, and maintain strict evidentiary chain of custody.",
                        "keyPoints": [
                            f"Collect and verify source telemetry before forming adversarial conclusions regarding {lesson_title_raw}.",
                            "Distinguish confirmed factual observations from tentative analytical hypotheses.",
                            "Record all UTC timestamps, source machine names, and cryptographic hashes in your evidence ledger."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Inspect Triggering Alert & Context",
                        "instruction": f"Review the assigned lesson video, noting the specific tools, forensic artifacts, and analyst judgment demonstrated for {lesson_title_raw}.",
                        "expectedOutcome": "Detailed observation notes detailing specific event fields, triage pivots, and limitations."
                    },
                    {
                        "step": 2,
                        "title": "Analyze Synthetic Telemetry",
                        "instruction": "Open the course scenario dataset, filter on the relevant user or host entity, and reconstruct the sequence of actions across UTC time boundaries.",
                        "expectedOutcome": "Tabular evidence listing normalized timestamps, source IPs, process lineages, and status codes."
                    },
                    {
                        "step": 3,
                        "title": "Evaluate Non-Malicious Hypotheses",
                        "instruction": "Identify at least two benign explanations (e.g. administrative scripts, VPN geolocations, automated software updates) that could account for the observed telemetry.",
                        "expectedOutcome": "Balanced triage notes preventing premature or disruptive over-containment."
                    }
                ],
                "expectedObservations": [
                    "Clear separation between factual observations and analytical inferences.",
                    "Properly normalized UTC timestamps across all correlated data sources.",
                    "Defensible risk categorization backed by cited Evidence IDs."
                ],
                "commonMistakes": [
                    "Declaring confirmed compromise based solely on a single unverified alert.",
                    "Executing disruptive containment (isolating critical servers) without operational authorization.",
                    "Failing to preserve volatile evidence before rebooting or modifying suspect systems."
                ],
                "securityRelevance": f"Mastery of {lesson_title_raw} prevents alert fatigue, protects business operations, and ensures defensible, audit-safe incident handling in enterprise environments.",
                "practicalExercise": {
                    "title": f"Practical Exercise: {lesson_title_raw}",
                    "objective": f"Apply {lesson_title_raw} methodologies to the Harborlight Retail training scenario.",
                    "instructions": [
                        f"1. Before watching: write what an L1 analyst already knows about {lesson_title_raw} and what information would change your verdict.",
                        "2. Note at least one relevant workflow, tool, or judgment demonstrated in the video.",
                        "3. Complete the lesson quick check: identify what evidence to collect next, from whom, and what assumptions to avoid."
                    ]
                },
                "summary": f"{lesson_title_raw} reinforces rigorous defensive thinking, establishing the evidence-first mindset required to protect critical enterprise infrastructure.",
                "furtherReading": [
                    {
                        "title": "NIST SP 800-61 Revision 3: Incident Response Recommendations and Considerations for Cybersecurity Risk Management",
                        "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
                        "description": "The authoritative national cybersecurity guidance aligning incident response with NIST CSF 2.0."
                    },
                    {
                        "title": "CISA Cybersecurity Incident & Vulnerability Response Playbooks",
                        "url": "https://www.cisa.gov/resources-tools/programs/incident-response-training",
                        "description": "Standardized operational playbooks for preparation, detection, containment, eradication, and recovery."
                    },
                    {
                        "title": "MITRE ATT&CK Enterprise Matrix",
                        "url": "https://attack.mitre.org/",
                        "description": "Comprehensive taxonomy of real-world adversary tactics, techniques, and procedures."
                    }
                ]
            }
            
            lesson_obj = {
                "id": l_id,
                "slug": l_slug,
                "title": lesson_title,
                "description": lesson_desc,
                "youtubeVideoId": video_id,
                "videoAttribution": {
                    "creator": video_creator,
                    "platform": "youtube"
                },
                "durationMinutes": duration,
                "order": l_order,
                "moduleTitle": mod_title,
                "objectives": objectives,
                "tags": tags,
                "skillsTaught": skills_taught,
                "richContent": rich_content
            }
            
            module_lessons.append(lesson_obj)
            
            sql_lessons.append({
                "uuid": l_uuid,
                "module_uuid": mod_uuid,
                "slug": l_slug,
                "title": lesson_title,
                "description": lesson_desc,
                "youtube_video_id": video_id,
                "duration_minutes": duration,
                "order_index": l_order,
                "objectives": objectives,
                "tags": tags,
                "skills_taught": skills_taught
            })
            
        # Practical lab
        tasks = []
        for s_idx, st in enumerate(lab_steps):
            tasks.append({
                "id": f"task-ir-{mod_num:02d}-{s_idx+1}",
                "description": st,
                "hint": "Reference the synthetic datasets in /datasets/incident-response/ and use UTC timestamps.",
                "filterSuggestion": "Review scenarios/synthetic_alerts.json or synthetic_signins.csv"
            })
        if not tasks:
            tasks = [
                {"id": f"task-ir-{mod_num:02d}-1", "description": "Inspect sample events and normalize timestamps to UTC.", "hint": "Extract UTC time and entity identifiers."},
                {"id": f"task-ir-{mod_num:02d}-2", "description": "Formulate testable triage hypotheses and counter-explanations.", "hint": "Consider legitimate business and administrative baselines."},
                {"id": f"task-ir-{mod_num:02d}-3", "description": "Draft an evidence-backed incident case ticket.", "hint": "Cite specific Evidence IDs for all conclusions."}
            ]
            
        practical_lab = {
            "id": f"lab-ir-m{mod_num:02d}",
            "title": f"Guided Practical Lab: {raw_title}",
            "objective": goal,
            "toolsRequired": ["Text Editor or Markdown IDE", "Log Analysis Tool (Splunk, Sentinel, or CSV viewer)", "Network / Host Analysis Tools"],
            "pcapSource": {
                "fileName": "synthetic-ir-datasets.zip",
                "fileUrl": "/datasets/incident-response/synthetic-ir-datasets.zip"
            },
            "difficulty": "beginner" if "Beginner" in level else "intermediate" if "Intermediate" in level else "advanced",
            "estimatedMinutes": 60,
            "instructions": lab_steps if lab_steps else [
                "Open the synthetic exercise data in /datasets/incident-response/.",
                "Follow the guided lab steps to analyze telemetry and identify anomalies.",
                "Produce the required ticket or evidence register deliverable."
            ],
            "tasks": tasks,
            "evidenceWorksheet": [
                {
                    "field": "case_scenario",
                    "prompt": f"Document the investigative scenario, affected entities, and scope for {raw_title}.",
                    "expectedEvidenceType": "text"
                },
                {
                    "field": "evidence_observations",
                    "prompt": "List the verified telemetry facts (UTC timestamps, event IDs, IP addresses, process names) with cited Evidence IDs.",
                    "expectedEvidenceType": "code"
                },
                {
                    "field": "verdict_and_escalation",
                    "prompt": f"State your triage verdict, confidence level, remaining unknowns, and recommended next actions ({pass_standard or 'Authorized, reversible response recommendation'}).",
                    "expectedEvidenceType": "text"
                }
            ],
            "questions": [
                {
                    "question": f"What verified factual evidence distinguishes malicious activity from normal operations in {raw_title}?",
                    "options": [
                        "Chronological correlation of anomalous action codes, unusual parent-child process lineages, and uncharacteristic outbound network sessions",
                        "The volume of alerts received in the analyst email inbox",
                        "The affected workstation operating on a Tuesday afternoon",
                        "The presence of temporary files in the browser cache"
                    ],
                    "correctAnswerIndex": 0,
                    "explanation": "Defensible incident verdicts rely on corroborated telemetry linking multiple distinct anomalies across identity, host, and network layers rather than isolated threshold alerts."
                }
            ],
            "completionCriteria": rev_checklist
        }
        
        quiz = {
            "title": f"Module {mod_num:02d} Knowledge Check: {raw_title}",
            "questions": MODULE_QUIZZES.get(mod_num, [
                {
                    "question": f"What is the primary incident response objective for {raw_title}?",
                    "options": [
                        f"Apply structured defensive triage and evidence-first analysis to {raw_title} according to NIST Rev 3 guidelines",
                        "Immediately shut down all corporate firewalls",
                        "Delete the SIEM database to clear warning indicators",
                        "Contact external media before investigating"
                    ],
                    "correctAnswerIndex": 0,
                    "explanation": "Every module in the curriculum emphasizes structured, evidence-based defensive investigation that preserves operational integrity."
                }
            ]),
            "passingScorePercent": 75
        }
        
        mod_obj = {
            "id": mod_id,
            "title": mod_title,
            "description": mod_desc,
            "order": mod_order,
            "lessons": module_lessons,
            "practicalLab": practical_lab,
            "quiz": quiz
        }
        
        # Module 30 Capstone
        if mod_num == 30:
            capstone = {
                "id": "capstone-incident-response-end-to-end",
                "title": "Final Capstone: End-to-End SOC Incident Response Case Portfolio",
                "scenario": "Execute an end-to-end incident investigation for fictional retailer Harborlight Retail following NIST SP 800-61r3 and CISA playbooks. Ingest and correlate synthetic email headers, multi-source sign-in logs, Sysmon endpoint execution records, outbound proxy sessions, and CloudTrail audit trails. Deliver six complete forensic artifacts: 1) TRIAGE.md (initial scope and severity), 2) TIMELINE.md (UTC evidence chronology), 3) EVIDENCE.md (chain of custody register), 4) ESCALATION.md (risk communication and approval matrix), 5) RESPONSE_PLAN.md (authorized containment, eradication, and recovery validation), and 6) POST_INCIDENT_REPORT.md (executive summary, root cause analysis, and lessons learned).",
                "pcapSource": {
                    "fileName": "synthetic-ir-datasets.zip",
                    "fileUrl": "/datasets/incident-response/synthetic-ir-datasets.zip"
                },
                "totalMarks": 100,
                "passingScore": 75,
                "rubric": [
                    {
                        "category": "Triage & Impact Decisions",
                        "marks": 20,
                        "criteria": [
                            "Correctly identifies initial scope, affected entities, and assets at risk.",
                            "Justifies severity classification using asset criticality and blast radius.",
                            "Distinguishes unverified alerts from confirmed compromise with stated confidence."
                        ]
                    },
                    {
                        "category": "Technical Investigation & Correlation",
                        "marks": 25,
                        "criteria": [
                            "Correlates evidence across email, identity, endpoint Sysmon, and proxy telemetry.",
                            "Normalizes all evidence timestamps to UTC and accounts for clock drift.",
                            "Identifies specific initial access vector and adversary persistence mechanisms."
                        ]
                    },
                    {
                        "category": "Evidence Handling & Integrity",
                        "marks": 20,
                        "criteria": [
                            "Assigns immutable Evidence IDs to all cited logs and artifacts.",
                            "Maintains chain of custody and records cryptographic hashes where applicable.",
                            "Employs non-destructive collection and adheres to order of volatility."
                        ]
                    },
                    {
                        "category": "Communication & Escalation",
                        "marks": 15,
                        "criteria": [
                            "Clearly separates verified factual observations from analyst hypotheses.",
                            "Identifies required authorization owners before disruptive actions.",
                            "Drafts concise, professional stakeholder briefings with remaining unknowns."
                        ]
                    },
                    {
                        "category": "Response, Eradication & Recovery",
                        "marks": 10,
                        "criteria": [
                            "Designs least-disruptive, reversible containment measures.",
                            "Formulates ordered eradication covering initial access and persistence footholds.",
                            "Establishes trusted backup validation and post-recovery monitoring plan."
                        ]
                    },
                    {
                        "category": "Post-Incident Reporting & Improvement",
                        "marks": 10,
                        "criteria": [
                            "Authoritative executive summary suitable for business leadership.",
                            "Identifies concrete root causes rather than superficial symptoms.",
                            "Proposes actionable detection rules (Sigma/KQL) and defensive improvements."
                        ]
                    }
                ],
                "submissionSections": [
                    {
                        "id": "triage_scoping",
                        "title": "Part 1: Initial Triage and Scoping (TRIAGE.md)",
                        "prompt": "Submit your initial alert intake assessment, entity scoping, false-positive evaluation, and evidence-justified priority.",
                        "maxMarks": 20
                    },
                    {
                        "id": "timeline_reconstruction",
                        "title": "Part 2: UTC Chronological Timeline (TIMELINE.md)",
                        "prompt": "Provide your multi-source UTC timeline correlating email, authentication, Sysmon, and network evidence with Evidence IDs.",
                        "maxMarks": 25
                    },
                    {
                        "id": "evidence_register",
                        "title": "Part 3: Evidence Register & Chain of Custody (EVIDENCE.md)",
                        "prompt": "Document all forensic data sources, collection methods, hashes, and chain of custody entries.",
                        "maxMarks": 20
                    },
                    {
                        "id": "escalation_matrix",
                        "title": "Part 4: Escalation and Impact Assessment (ESCALATION.md)",
                        "prompt": "Submit your escalation briefing, business impact analysis, approval matrix, and open questions.",
                        "maxMarks": 15
                    },
                    {
                        "id": "containment_and_recovery",
                        "title": "Part 5: Containment, Eradication & Recovery Plan (RESPONSE_PLAN.md)",
                        "prompt": "Detail your reversible containment, ordered eradication, backup validation, and post-recovery monitoring controls.",
                        "maxMarks": 10
                    },
                    {
                        "id": "post_incident_report",
                        "title": "Part 6: Executive Post-Incident Report (POST_INCIDENT_REPORT.md)",
                        "prompt": "Deliver your final executive report, root-cause analysis, and strategic detection improvement recommendations.",
                        "maxMarks": 10
                    }
                ]
            }
            mod_obj["capstoneAssessment"] = capstone
            
        modules.append(mod_obj)
        
        sql_modules.append({
            "uuid": mod_uuid,
            "title": mod_title,
            "description": mod_desc,
            "order_index": mod_order
        })

    course_data = {
        "id": "course-incident-response-zero-to-advanced",
        "slug": "incident-response-zero-to-advanced",
        "title": "Incident Response: Zero to Advanced",
        "shortDescription": "A comprehensive 30-module incident response and SOC operations curriculum aligned with NIST SP 800-61r3 and CISA playbooks, with 150 lessons, 60 video lectures, guided DFIR labs, and an end-to-end capstone portfolio.",
        "description": "An exhaustive, hands-on 30-module cybersecurity curriculum designed for Tier 1–3 SOC analysts, incident responders, and DFIR specialists. Aligned with the current NIST SP 800-61 Revision 3 framework and CISA operational playbooks, this program covers the complete incident lifecycle: event intake and fast L1 triage; severity, prioritization, and SLAs; MITRE ATT&CK and threat intelligence; case management and chain of custody; SIEM investigations in Splunk and Microsoft Sentinel; EDR telemetry, process tree analysis, and Sysmon; email security and phishing triage; cloud identity compromise, BEC, and impossible travel; network forensics with Wireshark and Zeek; Windows artifacts (Prefetch, ShimCache, LNK) and timeline reconstruction; forensic disk imaging and Autopsy; memory forensics with Volatility 3; multi-source timeline correlation; authorized, reversible containment; ordered eradication; safe backup recovery and post-incident monitoring; ransomware response table-tops; data exfiltration and DLP; AWS CloudTrail and Azure M365 cloud DFIR; enterprise threat hunting with Velociraptor; detection engineering with Sigma and SOAR playbooks; culminating in an end-to-end multi-artifact SOC capstone portfolio project.",
        "domains": ["dfir", "soc-blue-team", "fundamentals"],
        "tags": [
            "incident-response",
            "dfir",
            "soc-analyst",
            "nist-sp-800-61r3",
            "cisa-playbook",
            "threat-hunting",
            "forensics",
            "wireshark",
            "sysmon",
            "volatility",
            "splunk",
            "sentinel"
        ],
        "difficulty": "intermediate",
        "thumbnailUrl": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        "estimatedDuration": "30 modules (150 hours)",
        "totalDurationMinutes": total_minutes,
        "instructor": {
            "name": "CyberTube DFIR & Open SOC Community",
            "title": "Senior Incident Response & DFIR Specialists",
            "organization": "NIST, CISA, 13Cubed, DFIRScience & Microsoft Community"
        },
        "prerequisites": [
            "Basic understanding of operating system architectures (Windows and Linux internals)",
            "Foundational knowledge of networking protocols (TCP/IP, DNS, HTTP, TLS)",
            "Commitment to authorized, defensive investigation on synthetic and owned lab environments"
        ],
        "learningObjectives": [
            "Apply NIST SP 800-61 Revision 3 and CISA operational playbooks across the incident lifecycle",
            "Perform fast, accurate Tier 1 alert triage and separate benign positives from true attacks",
            "Analyze Windows Event Logs, Sysmon telemetry, and parent-child process tree anomalies",
            "Investigate Linux authentication, journalctl logs, and live-response volatility",
            "Conduct network forensic investigations using Wireshark display filters and Zeek logs",
            "Triage phishing emails, evaluate SPF/DKIM/DMARC headers, and safely defang indicators",
            "Investigate identity compromises, impossible travel, and Business Email Compromise (BEC)",
            "Extract Windows forensic artifacts (Prefetch, Amcache, ShimCache, LNK) for timeline analysis",
            "Perform forensic disk acquisition and analysis using Autopsy and write-blocker controls",
            "Analyze volatile memory captures with Volatility 3 to detect injected code and C2 sockets",
            "Plan and execute authorized, least-disruptive, reversible containment strategies",
            "Coordinate eradication, clean-state rebuilds, backup validation, and post-recovery monitoring",
            "Investigate cloud security incidents across AWS CloudTrail and Azure / Microsoft 365",
            "Design and tune detection rules in Sigma format and build safe SOAR playbooks",
            "Deliver an end-to-end, six-artifact SOC incident response capstone portfolio"
        ],
        "featured": True,
        "track": "cybersecurity",
        "modules": modules
    }
    
    # Write TS Course file
    ts_content = "import { Course } from '../types/course';\n\n"
    ts_content += f"export const INCIDENT_RESPONSE_ZERO_TO_ADVANCED_COURSE: Course = {json.dumps(course_data, indent=2)};\n\n"
    ts_content += "INCIDENT_RESPONSE_ZERO_TO_ADVANCED_COURSE.capstone = INCIDENT_RESPONSE_ZERO_TO_ADVANCED_COURSE.modules[29]?.capstoneAssessment;\n"
    
    out_ts_path = os.path.join(base_dir, "src/data/incident-response-zero-to-advanced-course.ts")
    with open(out_ts_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"Written {out_ts_path} successfully! ({len(modules)} modules, {len(sql_lessons)} lessons)")

    # Build SQL migration
    def quote_sql(val):
        if val is None:
            return "NULL"
        val_str = str(val).replace("'", "''")
        return f"'{val_str}'"
        
    def to_pg_array(arr):
        if not arr:
            return "'{}'::TEXT[]"
        escaped = []
        for x in arr:
            x_clean = str(x).replace("'", "''")
            escaped.append(f"'{x_clean}'")
        return f"ARRAY[{', '.join(escaped)}]::TEXT[]"

    sql_lines = [
        "-- =============================================================================",
        "-- Migration: 20261120010000_seed_incident_response_course.sql",
        "-- Description:",
        "-- Idempotently seeds the 30-module Incident Response Zero to Advanced course,",
        "-- all 30 modules, and all 150 video lessons into the Supabase database.",
        "-- =============================================================================",
        "",
        "DO $$",
        "DECLARE",
        f"  v_course_id UUID := '{course_uuid}';",
        "BEGIN",
        "  -- 1. Insert or Update Course",
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
        "    'incident-response-zero-to-advanced',",
        f"    {quote_sql(course_data['title'])},",
        f"    {quote_sql(course_data['shortDescription'])},",
        f"    {quote_sql(course_data['description'])},",
        "    'intermediate',",
        f"    {quote_sql(course_data['estimatedDuration'])},",
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
    
    migration_file = os.path.join(base_dir, "supabase/migrations/20261120010000_seed_incident_response_course.sql")
    with open(migration_file, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines))
    print(f"Written {migration_file} successfully! ({len(sql_lines)} lines)")

if __name__ == "__main__":
    main()
