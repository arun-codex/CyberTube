MODULE_07 = {
    "id": "mod-07-digital-forensics-evidence-reporting",
    "title": "Module 07: Digital Forensics, Evidence & Reporting",
    "description": "Ensure legal evidence admissibility, protect chain of custody, sanitize sensitive captures, correlate host and network artifacts, and deliver SOC reports.",
    "order": 8,
    "lessons": [
        {
            "id": "les-07-1-evidence-admissibility-chain",
            "slug": "evidence-admissibility-chain-of-custody",
            "title": "Digital Evidence Admissibility, Chain of Custody & Forensic Hashes",
            "description": "Examine the legal and procedural standards for network evidence: establishing cryptographic chain of custody (SHA256), preserving raw sensor captures, and meeting court admissibility standards.",
            "durationMinutes": 35,
            "order": 1,
            "objectives": [
                "Understand the legal requirements for digital evidence admissibility (FRE 902, Daubert standard)",
                "Calculate and verify cryptographic hashes (SHA-256) of evidence captures immediately upon collection",
                "Maintain complete chain of custody records documenting acquisition, transfer, and analysis"
            ],
            "tags": ["chain-of-custody", "evidence-integrity", "sha256", "admissibility", "legal-standards"],
            "skillsTaught": ["Chain of custody documentation", "Evidence hash verification", "Forensic copy management"],
            "richContent": {
                "introduction": "Technical discovery without legal integrity is worthless in criminal prosecutions and corporate dispute hearings. Network evidence is volatile: packets in transit cannot be re-captured once lost. Establishing cryptographic chain of custody immediately upon capture ensures that evidence presented to leadership, regulators, or courts is provably uncontaminated.",
                "prerequisites": ["Module 03: Advanced Wireshark Investigation Workflow"],
                "keyTerminology": [
                    {"term": "Chain of Custody", "definition": "A chronological paper and electronic paper trail documenting the custody, control, transfer, analysis, and disposition of digital evidence."},
                    {"term": "Forensic Hash", "definition": "A cryptographically secure one-way hash (SHA-256) computed across the raw capture file upon acquisition to prove bit-for-bit integrity."},
                    {"term": "Working Copy", "definition": "An exact replica of the master forensic image used for analysis, ensuring the original evidence remains unaltered in write-blocked storage."}
                ],
                "theorySections": [
                    {
                        "title": "Rules of Digital Evidence Integrity",
                        "content": "Rule 1: Never analyze original evidence directly; always create and verify a bit-for-bit working copy. Rule 2: Compute SHA-256 hashes immediately upon acquisition and verify before and after every transfer. Rule 3: Document sensor details, NTP synchronization status, interface names, and acquisition operator credentials.",
                        "keyPoints": [
                            "Federal Rules of Evidence Rule 902(14) permits self-authenticating digital records verified by digital hash values.",
                            "Any modification of a PCAP (such as editing or resaving in Wireshark) changes its file hash, destroying verification."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Compute Evidence Hash in Terminal",
                        "instruction": "Compute SHA-256 checksum of your master capture file.",
                        "filter": "sha256sum \"Hackers on the Network.pcapng\" (or Get-FileHash in PowerShell)",
                        "expectedOutcome": "Outputs 64-character hexadecimal SHA-256 hash."
                    },
                    {
                        "step": 2,
                        "title": "Document Chain of Custody Record",
                        "instruction": "Record file name, file size in bytes, SHA-256 hash, acquisition date/time in UTC, and analyst name in the evidence ledger.",
                        "expectedOutcome": "Establishes permanent evidentiary documentation."
                    }
                ],
                "displayFilters": [
                    {"filter": "capinfos -H \"Hackers on the Network.pcapng\"", "description": "CLI command to display built-in SHA256/SHA1/MD5 file hashes", "purpose": "Rapid integrity verification"}
                ],
                "expectedObservations": [
                    "SHA-256 hashes match identically across master archive and working analysis copies."
                ],
                "commonMistakes": [
                    "Opening a master PCAP file in Wireshark and clicking 'Save As' or modifying comments, which rewrites block headers and alters the SHA-256 hash."
                ],
                "securityRelevance": "Strict evidence preservation prevents defense challenges regarding evidence tampering in legal proceedings and cyber insurance claims.",
                "knowledgeCheck": {
                    "question": "Why must forensic investigators work strictly with working copies of PCAP files rather than the original acquired capture?",
                    "options": [
                        "Original captures cannot be opened in Wireshark",
                        "To protect original evidence from accidental modification, corruption, or timestamp alteration, maintaining an unassailable chain of custody",
                        "Working copies run faster",
                        "Wireshark requires files to be renamed"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "Working copies prevent accidental modification of the original master evidence. The original remains write-protected in evidence archives for verification.",
                    "difficulty": "beginner"
                },
                "summary": "Cryptographic integrity verification and rigorous chain of custody documentation are the foundational requirements that ensure network forensic findings are defensible and admissible.",
                "furtherReading": [
                    {"title": "NIST SP 800-86 — Guide to Integrating Forensic Techniques into Incident Response", "url": "https://csrc.nist.gov/publications/detail/sp/800-86/final"}
                ]
            }
        },
        {
            "id": "les-07-2-redacting-pcap-data",
            "slug": "redacting-sensitive-pcap-anonymization",
            "title": "Redacting Sensitive PCAP Data: IP Anonymization & Payload Scrubbing",
            "description": "Sanitize and anonymize packet captures prior to sharing with external threat intelligence, CERTs, or researchers: scrubbing PII, hashing internal IP subnets, and stripping sensitive credentials.",
            "durationMinutes": 35,
            "order": 2,
            "objectives": [
                "Understand the legal and privacy risks of sharing unredacted captures (GDPR, HIPAA, proprietary data)",
                "Anonymize IP addresses and MAC addresses using tools like Bittwiste, Trace-Summary, and Python scripts",
                "Zero out or redact sensitive payload bytes (passwords, session cookies, health records) while preserving attack signatures"
            ],
            "tags": ["pcap-redaction", "anonymization", "privacy", "data-sanitization", "gdpr"],
            "skillsTaught": ["IP address anonymization", "Sensitive payload scrubbing", "Safe PCAP sharing"],
            "richContent": {
                "introduction": "While sharing PCAP evidence with external vendors, national CERTs, or threat intelligence platforms accelerates threat containment, raw packet captures often contain trade secrets, employee passwords, internal server IPs, and customer Personal Identifiable Information (PII). Analysts must know how to sanitize captures without destroying the attack telemetry.",
                "prerequisites": ["Lesson 7.1: Evidence Admissibility & Hashes"],
                "keyTerminology": [
                    {"term": "PCAP Sanitization", "definition": "The controlled process of scrubbing sensitive payload bytes or anonymizing internal network addresses while leaving protocol headers and attack signatures intact."},
                    {"term": "Consistent IP Anonymization", "definition": "A mapping technique where internal IP addresses are pseudo-anonymized consistently (e.g. 10.0.1.5 always maps to 192.0.2.5) preserving conversation topologies."}
                ],
                "theorySections": [
                    {
                        "title": "Techniques for Safe Packet Capture Sharing",
                        "content": "1) Header-only sharing: Use editcap -s 96 to truncate packets at 96 bytes (keeping L2/L3/L4 headers while dropping payload). 2) Subnet masking: Shift internal subnets (10.x.x.x -> 192.0.2.x TEST-NET-1). 3) Precision payload scrubbing: Replace matched password strings or credit cards with null bytes using Python Scapy or custom BPF filters.",
                        "keyPoints": [
                            "Truncating packet snap length (-s) is the most foolproof method to eliminate payload privacy leaks.",
                            "Always verify redacted files in Wireshark to confirm sensitive strings are completely absent."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Truncate Capture to Headers Only with editcap",
                        "instruction": "Use editcap to truncate all packets to 96 bytes (preserving Ethernet, IP, and TCP headers while eliminating application payloads).",
                        "filter": "editcap -s 96 \"Scenario 1.pcapng\" \"Scenario 1_headers_only.pcapng\"",
                        "expectedOutcome": "Creates sanitized capture containing full header telemetry without application content."
                    },
                    {
                        "step": 2,
                        "title": "Verify Absence of Sensitive Strings",
                        "instruction": "Open the sanitized capture in Wireshark and search for cleartext keywords.",
                        "filter": "frame contains \"password\" or frame contains \"Authorization:\"",
                        "expectedOutcome": "Zero packets are matched, confirming complete payload sanitization."
                    }
                ],
                "displayFilters": [
                    {"filter": "frame.len <= 96", "description": "Verifies all packets conform to truncated snap length", "purpose": "Sanitization validation"}
                ],
                "expectedObservations": [
                    "Packet Details indicates 'Packet size limited during capture' or 'Packet truncated' on application layers."
                ],
                "commonMistakes": [
                    "Sharing PCAPs containing internal Active Directory user credentials or customer database records with public portals like VirusTotal."
                ],
                "securityRelevance": "Careless PCAP sharing frequently causes severe secondary data breaches, exposing internal credentials to public indexing.",
                "knowledgeCheck": {
                    "question": "Which editcap option truncates each packet in a capture to a specific maximum byte length, stripping application payloads while preserving headers?",
                    "options": ["-d", "-s <snaplen>", "-t", "-C"],
                    "correctAnswerIndex": 1,
                    "explanation": "The -s <snaplen> option sets the snapshot length, truncating every packet to the specified number of bytes from the start of the frame.",
                    "difficulty": "intermediate"
                },
                "summary": "Anonymizing IP topologies and truncating payloads enables safe collaboration with external security researchers without violating privacy regulations or leaking sensitive data.",
                "furtherReading": [
                    {"title": "Wireshark Wiki — Anonymizing PCAP Files", "url": "https://wiki.wireshark.org/Anonymizing_PCAP_Files"}
                ]
            }
        },
        {
            "id": "les-07-3-host-network-correlation",
            "slug": "correlating-network-captures-siem-logs",
            "title": "Correlating Network Captures with Host Logs & SIEM Events",
            "description": "Bridge packet evidence with host operating system artifacts: correlating PCAP timestamps and 5-tuples with Windows Event Logs (Sysmon), Linux auditd, EDR telemetry, and SIEM records.",
            "durationMinutes": 35,
            "order": 3,
            "objectives": [
                "Map network 5-tuples (Src IP, Src Port, Dst IP, Dst Port, Protocol) to host process IDs (PIDs) using Sysmon Event ID 3",
                "Correlate network connection initiation timestamps with host executable execution events (Event ID 1)",
                "Reconstruct full-kill-chain incident timelines unifying network and endpoint evidence"
            ],
            "tags": ["correlation", "siem", "sysmon", "edr", "incident-investigation"],
            "skillsTaught": ["Network-to-host mapping", "Sysmon Event ID 3 correlation", "Unified timeline assembly"],
            "richContent": {
                "introduction": "A network packet capture proves what crossed the wire, but it cannot definitively identify which process, user account, or thread generated the connection on the host. By correlating network 5-tuples with host telemetry (Windows Sysmon, EDR agent logs, Linux auditd), investigators create a complete, airtight narrative of an intrusion.",
                "prerequisites": ["Lesson 7.1: Evidence Admissibility & Hashes"],
                "keyTerminology": [
                    {"term": "5-Tuple", "definition": "The five parameters that uniquely identify a network session: Source IP, Source Port, Destination IP, Destination Port, and Transport Protocol."},
                    {"term": "Sysmon Event ID 3", "definition": "Windows System Monitor event logged every time a local process initiates or receives a network connection, recording PID, Process Name, and 5-tuple."},
                    {"term": "Sysmon Event ID 1", "definition": "Process Creation event recording the executable path, command line arguments, parent process, and file hashes."}
                ],
                "theorySections": [
                    {
                        "title": "The Network-to-Host Correlation Bridge",
                        "content": "Step 1: Identify anomalous outbound connection in Wireshark (e.g. 10.0.4.152:49211 -> 198.51.100.25:443 at 03:22:15.102 UTC). Step 2: Query SIEM / Sysmon for Event ID 3 on host 10.0.4.152 matching DestinationPort=443 and Time ~ 03:22:15 UTC. Step 3: Extract the associated ProcessId (e.g. PID 4820, svchost.exe running from C:\\Users\\Public\\). Step 4: Query Event ID 1 for PID 4820 to find the parent process (e.g. powershell.exe) and the initiating user account.",
                        "keyPoints": [
                            "Always verify time zone offsets (UTC vs. local sensor time) when correlating across disparate log sources.",
                            "Ephemeral source ports (49152-65535) provide the unique key that links packet streams to specific process sockets."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Extract 5-Tuple of Suspected C2 Connection",
                        "instruction": "In Wireshark, select the initial SYN packet of an anomalous connection and record the full 5-tuple.",
                        "filter": "ip.src == 10.0.4.152 and tcp.flags.syn == 1 and tcp.flags.ack == 0",
                        "expectedOutcome": "Records Source IP, Source Ephemeral Port, Destination IP, Destination Port, and exact timestamp."
                    },
                    {
                        "step": 2,
                        "title": "Formulate SIEM Sysmon Query",
                        "instruction": "Formulate the search query for your SIEM (Splunk, Elastic, Sentinel).",
                        "filter": "index=sysmon EventCode=3 SourceIp=\"10.0.4.152\" DestinationPort=443 DestinationIp=\"198.51.100.25\"",
                        "expectedOutcome": "Identifies the responsible host process executable, PID, and initiating user identity."
                    }
                ],
                "displayFilters": [
                    {"filter": "tcp.srcport == 49211 and ip.src == 10.0.4.152", "description": "Isolates the exact ephemeral port socket recorded in host logs", "purpose": "Bi-directional network/host alignment"}
                ],
                "expectedObservations": [
                    "Host logs and network packet timestamps synchronize to within milliseconds when NTP is properly maintained."
                ],
                "commonMistakes": [
                    "Assuming standard process names (like svchost.exe or lsass.exe) are benign without verifying parent process and file path on disk."
                ],
                "securityRelevance": "Correlating network telemetry with endpoint processes definitively confirms whether traffic was initiated by a legitimate enterprise binary or a malicious implant.",
                "knowledgeCheck": {
                    "question": "Which Windows Sysmon Event ID records network connection initiations, providing the process ID (PID) and process image path responsible for a network socket?",
                    "options": ["Event ID 1 (Process Create)", "Event ID 3 (Network Connect)", "Event ID 7 (Image Load)", "Event ID 11 (File Create)"],
                    "correctAnswerIndex": 1,
                    "explanation": "Sysmon Event ID 3 (Network Connection Detected) logs all outbound and inbound TCP/UDP connections along with the process ID, image path, user, and full 5-tuple.",
                    "difficulty": "intermediate"
                },
                "summary": "Correlating packet 5-tuples with host Sysmon and EDR logs closes the loop between network wire observations and endpoint code execution.",
                "furtherReading": [
                    {"title": "Microsoft Learn — Sysmon Event ID 3 Documentation", "url": "https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon"}
                ]
            }
        },
        {
            "id": "les-07-4-authoring-soc-reports",
            "slug": "authoring-incident-response-forensics-reports",
            "title": "Authoring Professional Incident Response & SOC Forensics Reports",
            "description": "Synthesize network forensic discoveries into executive summaries, detailed technical findings, comprehensive Indicators of Compromise (IOC) tables, and actionable remediation roadmaps.",
            "durationMinutes": 35,
            "order": 4,
            "objectives": [
                "Structure a formal Network Incident Forensics Report: Executive Summary, Timeline, Technical Analysis, IOCs, Remediation",
                "Translate complex packet dissections into clear business risk statements for executive leadership",
                "Author comprehensive Indicator of Compromise (IOC) tables and network containment firewall rules"
            ],
            "tags": ["reporting", "soc", "incident-report", "ioc-table", "remediation"],
            "skillsTaught": ["Forensic report authoring", "Executive summary writing", "IOC table compilation"],
            "richContent": {
                "introduction": "An investigation is only as effective as the final report delivered to decision-makers. A technical report that is overly cryptic fails executive leadership, while a high-level summary that lacks technical evidence cannot guide remediation engineers. A professional SOC forensics report bridges both worlds.",
                "prerequisites": ["Lesson 7.3: Correlating Network Captures with SIEM Logs"],
                "keyTerminology": [
                    {"term": "Executive Summary", "definition": "A 1-page high-level overview detailing what happened, business impact, containment status, and strategic next steps for C-level leadership."},
                    {"term": "IOC Table", "definition": "Structured list of malicious artifacts (IPs, domain names, file hashes, URLs, user agents) formatted for immediate ingestion by security controls."},
                    {"term": "Root Cause Analysis (RCA)", "definition": "Determination of the fundamental flaw (vulnerability, misconfiguration, credential compromise) that allowed the incident to occur."}
                ],
                "theorySections": [
                    {
                        "title": "Core Sections of a Professional Network Forensics Report",
                        "content": "1. Incident Overview & Executive Summary. 2. Scope & Evidence Master Table (PCAPs, Hashes, Dates). 3. Chronological Incident Timeline (UTC). 4. In-Depth Technical Analysis (Protocol findings, packet excerpts, Wireshark screenshots). 5. Complete Indicators of Compromise (IOC) Matrix. 6. Immediate Containment & Long-Term Hardening Recommendations.",
                        "keyPoints": [
                            "Always state facts observed in evidence clearly separate from hypotheses and unconfirmed theories.",
                            "Include exact Wireshark display filters alongside screenshots so third-party auditors can reproduce your findings."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Compile Evidence Master Table",
                        "instruction": "Create the evidence identification table listing all analyzed captures with file sizes and SHA-256 hashes.",
                        "expectedOutcome": "Provides complete transparency and chain-of-custody reference."
                    },
                    {
                        "step": 2,
                        "title": "Construct IOC Table",
                        "instruction": "Format all discovered malicious indicators with Type, Value, Role, and Recommended Action.",
                        "expectedOutcome": "Produces structured table ready for firewall and EDR blocklists."
                    }
                ],
                "displayFilters": [
                    {"filter": "capinfos -c -d -u -s -e capture.pcapng", "description": "Generates concise summary metrics for inclusion in report overview", "purpose": "Report evidence table generation"}
                ],
                "expectedObservations": [
                    "Reports that provide exact display filters enable seamless peer review and independent verification."
                ],
                "commonMistakes": [
                    "Using jargon in the Executive Summary without explaining the operational impact on business continuity.",
                    "Failing to include timestamps in UTC, causing confusion across geographically dispersed response teams."
                ],
                "securityRelevance": "The final report is the definitive historical record of the incident, reviewed by legal counsel, insurers, regulatory bodies, and board members.",
                "knowledgeCheck": {
                    "question": "What is the primary function of the Executive Summary section in a formal Incident Response report?",
                    "options": [
                        "To provide raw packet hex dumps",
                        "To communicate the incident nature, business impact, root cause, and containment status concisely to organizational leadership",
                        "To list every display filter used",
                        "To criticize IT staff"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "The Executive Summary provides business leaders and non-technical stakeholders with a clear, concise overview of what occurred, operational impact, and current status.",
                    "difficulty": "beginner"
                },
                "summary": "Mastering forensic report writing ensures your technical investigations drive real organizational change, rapid containment, and lasting security posture improvement.",
                "furtherReading": [
                    {"title": "CISA — Incident and Vulnerability Response Playbooks", "url": "https://www.cisa.gov/resources-tools/resources/federal-government-cybersecurity-incident-and-vulnerability-response-playbooks"}
                ]
            }
        }
    ],
    "practicalLab": {
        "id": "lab-07-chain-of-custody-report",
        "title": "Lab 07: Chain of Custody Documentation & Forensic Report Draft",
        "objective": "Document cryptographic chain of custody for Hackers on the Network PCAP, sanitize an evidence slice, and author a structured incident summary report.",
        "toolsRequired": ["Wireshark", "Terminal (sha256sum / editcap)"],
        "pcapSource": {
            "fileName": "Hackers on the Network.pcapng",
            "fileUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Hackers%20on%20the%20Network.pcapng",
            "repositoryUrl": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
            "sha256": "9f228b37ad582a9394f71a0642751f8dc974be42d0719ef7dfc33bb3e24a49db"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 55,
        "instructions": [
            "Compute and verify the SHA-256 hash of Hackers on the Network.pcapng.",
            "Complete the Chain of Custody evidence record in the worksheet.",
            "Use editcap to create a sanitized header-only copy (snaplen 96 bytes).",
            "Draft a 3-paragraph executive summary detailing the observed intrusion.",
            "Compile an IOC table containing the malicious IP addresses and domains identified across the module."
        ],
        "tasks": [
            {"id": "task-07-1", "description": "Verify SHA256 hash of Hackers on the Network", "hint": "sha256sum \"Hackers on the Network.pcapng\""},
            {"id": "task-07-2", "description": "Create sanitized header-only slice with editcap", "hint": "editcap -s 96 \"Hackers on the Network.pcapng\" sanitized.pcapng"},
            {"id": "task-07-3", "description": "Draft Executive Summary and IOC Table", "hint": "Include Date, C2 IPs, Domains, and Action items"}
        ],
        "evidenceWorksheet": [
            {"field": "Verified SHA-256 Hash", "prompt": "Enter the 64-character SHA-256 checksum:", "expectedEvidenceType": "Hexadecimal hash"},
            {"field": "Executive Summary Draft", "prompt": "Enter a concise executive summary of the intrusion:", "expectedEvidenceType": "Paragraph text"},
            {"field": "IOC Count", "prompt": "Total count of malicious IOCs documented in table:", "expectedEvidenceType": "Integer count"}
        ],
        "questions": [
            {
                "question": "Why is it vital to clearly separate observed evidence from analytical hypotheses in a formal forensics report?",
                "options": [
                    "To increase word count",
                    "To prevent unverified assumptions from being treated as established facts in legal or regulatory reviews",
                    "It is not necessary",
                    "To comply with Wireshark guidelines"
                ],
                "correctAnswerIndex": 1,
                "explanation": "Legal and professional forensic standards require rigorous separation of observable facts (packet data, hashes) from expert hypotheses or deductions.",
                "difficulty": "beginner"
            }
        ],
        "completionCriteria": [
            "SHA-256 hash verified and recorded",
            "Chain of custody documentation completed",
            "Executive summary and IOC table formulated"
        ]
    },
    "quiz": {
        "title": "Module 07 Assessment: Digital Forensics, Evidence & Reporting",
        "questions": [
            {
                "question": "Under Federal Rules of Evidence Rule 902(14), what technical method is recognized for self-authenticating digital evidence records?",
                "options": [
                    "An affidavit from an employee without technical data",
                    "Cryptographic digital hash values (e.g. SHA-256) verifying that a copy is identical to the original seized data",
                    "A screenshot of a folder",
                    "Verbal testimony only"
                ],
                "correctAnswerIndex": 1,
                "explanation": "FRE 902(14) permits self-authentication of digital records generated by an electronic process or system, validated by a certified process using digital checksums/hashes.",
                "difficulty": "intermediate"
            },
            {
                "question": "What is the primary benefit of truncating packet snap lengths (e.g. editcap -s 96) before sharing capture files with third-party threat analysts?",
                "options": [
                    "It converts IPv4 to IPv6",
                    "It preserves essential L2-L4 headers for attack analysis while removing potentially sensitive application payload data",
                    "It decrypts TLS payloads",
                    "It improves packet delivery speed"
                ],
                "correctAnswerIndex": 1,
                "explanation": "Truncating to 96 bytes preserves Ethernet, IP, and TCP/UDP transport headers needed for traffic flow analysis while eliminating application layer content containing sensitive user or company data.",
                "difficulty": "intermediate"
            },
            {
                "question": "Which parameter from a network packet capture acts as the primary ephemeral identifier linking an outbound connection directly to a host operating system socket in Sysmon Event ID 3?",
                "options": ["Destination IP", "Destination Port 443", "Source Ephemeral Port (e.g. 49211)", "Ethernet MAC Address"],
                "correctAnswerIndex": 2,
                "explanation": "Operating systems allocate unique ephemeral source ports (49152-65535) for each outbound TCP/UDP socket. Matching the ephemeral port and timestamp links the network packet to the specific host process socket in Sysmon Event 3.",
                "difficulty": "advanced"
            }
        ]
    }
}

