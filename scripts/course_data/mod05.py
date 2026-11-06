MODULE_05 = {
    "id": "mod-05-dos-recon-ftp-forensics",
    "title": "Module 05: DoS, Reconnaissance & FTP Network Forensics",
    "description": "Reconstruct reconnaissance scans, dissect denial of service flood signatures, recover cleartext credentials, and detect lateral movement.",
    "order": 6,
    "lessons": [
        {
            "id": "les-05-1-port-scanning-recon",
            "slug": "port-scanning-reconnaissance-fingerprints",
            "title": "Port Scanning & Network Reconnaissance Fingerprints (Nmap, SYN Scans)",
            "description": "Examine network reconnaissance techniques, dissecting TCP SYN Stealth scans (-sS), TCP Connect scans (-sT), UDP scans (-sU), and FIN/Xmas/Null scan fingerprints in Wireshark.",
            "durationMinutes": 35,
            "order": 1,
            "objectives": [
                "Identify TCP SYN, Connect, and UDP scanning signatures across packet captures",
                "Recognize Nmap OS detection and version probing traffic fingerprints",
                "Measure scan velocity, target port coverage, and source IP distribution"
            ],
            "tags": [
                "reconnaissance",
                "nmap",
                "port-scanning",
                "syn-scan",
                "network-mapping"
            ],
            "skillsTaught": [
                "Scan fingerprint recognition",
                "Probe velocity measurement",
                "Target sweep mapping"
            ],
            "richContent": {
                "introduction": "Every targeted network intrusion begins with reconnaissance. Attackers sweep subnets with tools like Nmap, Masscan, and ZMap to map active hosts, enumerate open ports, and fingerprint operating systems. Recognizing how these scan patterns manifest at the packet level enables early detection before adversaries exploit discovered vulnerabilities.",
                "prerequisites": [
                    "Lesson 0.4: TCP Handshake & Flags"
                ],
                "keyTerminology": [
                    {
                        "term": "TCP SYN Scan (-sS)",
                        "definition": "A stealth scan where the scanner sends SYN packets; if a SYN-ACK is returned (port open), the scanner immediately sends a RST to avoid completing the full 3-way handshake."
                    },
                    {
                        "term": "Null / Xmas / FIN Scan",
                        "definition": "Inverse mapping scans that set no flags (Null), FIN/PSH/URG (Xmas), or only FIN, expecting closed ports to return RST per RFC 793."
                    },
                    {
                        "term": "TCP Connect Scan (-sT)",
                        "definition": "A scan that completes the full 3-way handshake via the operating system connect() API, generating full connection logs on the target."
                    }
                ],
                "theorySections": [
                    {
                        "title": "Signature of a Half-Open SYN Scan",
                        "content": "In a TCP SYN scan, the scanner transmits SYN to port 80. The target responds with SYN-ACK (port open). The scanner immediately returns RST. For a closed port, the target returns RST-ACK. In Wireshark, an IP address transmitting thousands of SYN packets to sequential or pseudo-random destination ports with near-instant RST responses is the definitive fingerprint of Nmap -sS.",
                        "keyPoints": [
                            "Closed ports return RST-ACK.",
                            "Filtered ports produce no response or ICMP Type 3 Code 1/2/3/9/10/13 errors.",
                            "Look at tcp.window_size: Nmap uses distinctive fixed TCP window sizes (e.g. 1024) during scans."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Filter for Half-Open Scan Responses",
                        "instruction": "Filter for SYN packets paired with RST responses from the same client IP.",
                        "filter": "tcp.flags.syn == 1 and tcp.flags.ack == 0 and tcp.window_size == 1024",
                        "expectedOutcome": "Highlights Nmap stealth scan probes."
                    },
                    {
                        "step": 2,
                        "title": "Evaluate Target Port Range in Conversations",
                        "instruction": "Open Statistics -> Conversations -> TCP tab -> Sort by Destination Port.",
                        "expectedOutcome": "Reveals whether the scan targeted top 1000 ports, full 65535 ports, or specific services."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "tcp.flags == 0x000",
                        "description": "Filters for TCP Null Scan packets (no flags set)",
                        "purpose": "Detect stealth Null scans"
                    },
                    {
                        "filter": "tcp.flags == 0x029",
                        "description": "Filters for TCP Xmas Scan packets (FIN, PSH, URG set)",
                        "purpose": "Detect Xmas tree scans"
                    }
                ],
                "expectedObservations": [
                    "Rapid succession of single-packet probes to sequential port numbers (21, 22, 23, 25, 80, 443, 445, 3389)."
                ],
                "commonMistakes": [
                    "Assuming port scanning is always volumetric; low-and-slow scans (T1 / sneaky) spread probes over days to evade threshold alerts."
                ],
                "securityRelevance": "Reconnaissance identification allows SOC analysts to preemptively firewall the scanning IP before targeted exploitation begins.",
                "knowledgeCheck": {
                    "question": "What packet does an attacker transmitting a half-open TCP SYN scan (-sS) send immediately upon receiving a SYN-ACK from an open port?",
                    "options": [
                        "ACK",
                        "RST (Reset)",
                        "FIN",
                        "PSH-ACK"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "To prevent establishing a complete TCP connection (and avoid application logging), the scanner immediately returns a RST to tear down the half-open socket.",
                    "difficulty": "intermediate"
                },
                "summary": "Port scans leave unmistakable mathematical footprints in packet captures: rapid port progression, distinctive flag combinations, and anomalous RST packet generation.",
                "furtherReading": [
                    {
                        "title": "Nmap Network Scanning \u2014 Port Scanning Techniques",
                        "url": "https://nmap.org/book/man-port-scanning-techniques.html"
                    }
                ]
            }
        },
        {
            "id": "les-05-2-video-part3",
            "slug": "dos-recon-ftp-forensics-part3",
            "title": "Advanced Wireshark Network Forensics - Part 3/3",
            "description": "Concluding video masterclass by Netsec Explained covering reconnaissance analysis, Denial of Service (DoS) flood traffic, and cleartext FTP credential recovery in real-world PCAP scenarios.",
            "durationMinutes": 45,
            "order": 2,
            "youtubeVideoId": "HR_sLcW4xz0",
            "videoAttribution": {
                "creator": "Netsec Explained",
                "channelUrl": "https://www.youtube.com/@NetsecExplained",
                "platform": "YouTube",
                "seriesTitle": "Advanced Wireshark Network Forensics",
                "partNumber": 3
            },
            "objectives": [
                "Follow expert demonstration of DoS traffic analysis and FTP credential harvesting",
                "Observe how Netsec Explained reconstructs adversary activity across multi-protocol captures",
                "Extract cleartext authentication exchanges and validate findings in companion lab captures"
            ],
            "tags": [
                "netsec-explained",
                "video-walkthrough",
                "dos-analysis",
                "ftp-forensics"
            ],
            "skillsTaught": [
                "DoS traffic characterization",
                "Cleartext credential recovery",
                "Multi-stage attack correlation"
            ],
            "richContent": {
                "introduction": "In the final installment of the Advanced Wireshark Network Forensics series by Netsec Explained, the investigation examines aggressive adversary tactics: port scanning reconnaissance, high-velocity denial-of-service floods, and the exploitation of unencrypted legacy protocols such as FTP to harvest credentials.",
                "prerequisites": [
                    "Lesson 5.1: Port Scanning & Reconnaissance"
                ],
                "keyTerminology": [
                    {
                        "term": "SYN Flood",
                        "definition": "A denial-of-service attack that exhausts server resources by transmitting floods of SYN requests without completing handshakes."
                    },
                    {
                        "term": "Cleartext Authentication",
                        "definition": "Protocols (FTP, Telnet, HTTP Basic) that transmit usernames and passwords in unencrypted ASCII text across the wire."
                    }
                ],
                "theorySections": [
                    {
                        "title": "Core Takeaways from Part 3",
                        "content": "Watch how Netsec Explained utilizes IO Graphs to document the exact onset of flood attacks and contrasts normal traffic with anomalous floods. Notice the rapid recovery of plaintext credentials by filtering directly on application commands (USER, PASS).",
                        "keyPoints": [
                            "Volumetric attacks are characterized by sudden, overwhelming spikes in single packet types.",
                            "Cleartext protocols allow trivial credential recovery for both attackers and forensic analysts."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Watch the Video Lesson",
                        "instruction": "Watch Advanced Wireshark Network Forensics - Part 3/3 (Video ID: HR_sLcW4xz0).",
                        "expectedOutcome": "Observe expert demonstration of DoS and FTP credential extraction."
                    },
                    {
                        "step": 2,
                        "title": "Replicate on Scenario 2 PCAP",
                        "instruction": "Open Scenario 2.pcap and filter for ftp to view authentication dialogs.",
                        "filter": "ftp",
                        "expectedOutcome": "Exposes cleartext FTP commands: USER, PASS, SYST, PORT, RETR."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "ftp.response.code == 230",
                        "description": "Filters for successful FTP login responses ('User logged in')",
                        "purpose": "Confirm valid credentials"
                    },
                    {
                        "filter": "tcp.flags.syn == 1 && tcp.flags.ack == 0",
                        "description": "Isolates SYN packets during suspected flood events",
                        "purpose": "Quantify SYN flood volume"
                    }
                ],
                "expectedObservations": [
                    "Usernames and passwords appear completely unobfuscated in the Packet Details and Byte panes."
                ],
                "commonMistakes": [
                    "Failing to inspect the corresponding FTP data channel (port 20 or dynamic passive ports) where actual files are transferred."
                ],
                "securityRelevance": "Recovering exposed credentials allows incident responders to trigger immediate password resets before adversaries pivot laterally.",
                "knowledgeCheck": {
                    "question": "Which two FTP protocol commands are used to submit client usernames and passwords in cleartext?",
                    "options": [
                        "AUTH and TOKEN",
                        "USER and PASS",
                        "LOGIN and SECRET",
                        "ID and KEY"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "RFC 959 defines USER <username> and PASS <password> as the standard commands for client authentication in cleartext FTP.",
                    "difficulty": "beginner"
                },
                "summary": "Part 3 of the Netsec Explained trilogy ties together reconnaissance, denial-of-service, and cleartext credential exploitation into a comprehensive investigation.",
                "furtherReading": [
                    {
                        "title": "Netsec Explained YouTube Channel",
                        "url": "https://www.youtube.com/@NetsecExplained"
                    }
                ]
            }
        },
        {
            "id": "les-05-3-dos-syn-flood",
            "slug": "denial-of-service-syn-flood-analysis",
            "title": "Denial of Service (DoS) & SYN Flood Traffic Characterization",
            "description": "Characterize volumetric and resource-exhaustion denial of service attacks: TCP SYN floods, UDP amplification storms, and ICMP broadcast attacks.",
            "durationMinutes": 35,
            "order": 3,
            "objectives": [
                "Differentiate volumetric bandwidth exhaustion from state-table resource starvation attacks",
                "Analyze TCP SYN flood characteristics (spoofed source IPs, fixed window sizes, missing ACKs)",
                "Document attack duration, packet-per-second (PPS) rates, and victim impact"
            ],
            "tags": [
                "dos",
                "ddos",
                "syn-flood",
                "amplification",
                "traffic-analysis"
            ],
            "skillsTaught": [
                "SYN flood characterization",
                "PPS calculation",
                "Victim impact assessment"
            ],
            "richContent": {
                "introduction": "Denial of Service (DoS) and Distributed Denial of Service (DDoS) attacks attempt to degrade or crash target systems. Network-layer floods exhaust firewall connection tracking tables and operating system SYN backlogs, preventing legitimate clients from establishing valid TCP handshakes.",
                "prerequisites": [
                    "Lesson 0.4: TCP Handshake & Flags"
                ],
                "keyTerminology": [
                    {
                        "term": "SYN Backlog Queue",
                        "definition": "A kernel memory table storing half-open TCP connections awaiting the third ACK packet from the client."
                    },
                    {
                        "term": "Amplification Attack",
                        "definition": "A UDP attack leveraging open reflectors (DNS, NTP, SNMP, Memcached) to bounce spoofed requests that return massive responses to a victim."
                    },
                    {
                        "term": "SYN Cookies",
                        "definition": "A kernel defensive mechanism that encodes TCP connection parameters into the Initial Sequence Number to avoid allocating backlog memory before the final ACK."
                    }
                ],
                "theorySections": [
                    {
                        "title": "Deconstructing a SYN Flood Attack",
                        "content": "In a SYN flood, the attacker transmits tens of thousands of SYN packets per second, often with spoofed random source IP addresses. The target allocates a Transmission Control Block (TCB) in memory and returns a SYN-ACK. Because the spoofed source either does not exist or ignores the packet, no final ACK arrives, filling the backlog queue until the server refuses all new connections.",
                        "keyPoints": [
                            "Ratio of SYN packets to SYN-ACK responses approaches extreme asymmetry (>1000:1).",
                            "Legitimate TCP connections will show retransmissions and timeout resets."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Plot SYN Flood Surge in IO Graphs",
                        "instruction": "Open Statistics -> I/O Graphs -> Create series with filter: tcp.flags.syn == 1 and tcp.flags.ack == 0.",
                        "expectedOutcome": "Visualizes the exact onset, peak PPS rate, and termination of the flood attack."
                    },
                    {
                        "step": 2,
                        "title": "Evaluate Source IP Distribution in Endpoints",
                        "instruction": "Open Statistics -> Endpoints -> IPv4 tab -> Sort by Packets.",
                        "expectedOutcome": "Exposes whether the attack originates from a single source or thousands of spoofed addresses."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "tcp.flags.syn == 1 and tcp.flags.ack == 0 and tcp.window_size <= 1024",
                        "description": "Isolates automated SYN flood packets",
                        "purpose": "Filter out legitimate user connections"
                    },
                    {
                        "filter": "icmp.type == 3 and icmp.code == 1",
                        "description": "ICMP Host Unreachable responses during flood",
                        "purpose": "Measure network infrastructure distress"
                    }
                ],
                "expectedObservations": [
                    "A flood of incoming SYN packets targeting a single destination IP and port with zero completed handshakes."
                ],
                "commonMistakes": [
                    "Confusing high legitimate flash crowd traffic with a malicious SYN flood; flash crowds complete full three-way handshakes and request content."
                ],
                "securityRelevance": "Documenting flood velocity (Gbps and PPS) is required for submitting upstream ISP mitigation requests and tuning cloud DDoS scrubbers.",
                "knowledgeCheck": {
                    "question": "What kernel resource does a classic TCP SYN flood attack aim to exhaust on the target server?",
                    "options": [
                        "Physical disk storage",
                        "The TCP SYN backlog queue (connection state table)",
                        "DNS cache",
                        "The MAC address ARP cache"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "A SYN flood fills the kernel's SYN backlog queue with half-open connections, preventing the operating system from accepting legitimate new client handshakes.",
                    "difficulty": "intermediate"
                },
                "summary": "Analyzing DoS traffic in Wireshark provides quantitative proof of attack mechanisms, measuring packet rates, spoofing techniques, and service degradation.",
                "furtherReading": [
                    {
                        "title": "RFC 4987 \u2014 TCP SYN Flooding Attacks and Common Mitigations",
                        "url": "https://datatracker.ietf.org/doc/html/rfc4987"
                    }
                ]
            }
        },
        {
            "id": "les-05-4-cleartext-ftp-auth",
            "slug": "insecure-ftp-authentication-data-channels",
            "title": "Insecure Protocols in the Wild: Cleartext FTP Authentication & Data Channels",
            "description": "Dissect the File Transfer Protocol (FTP) architecture, recovering cleartext USER/PASS credentials, inspecting command channels vs. passive/active data channels, and carving transferred files.",
            "durationMinutes": 30,
            "order": 4,
            "objectives": [
                "Analyze the dual-channel architecture of FTP (Control Channel Port 21 vs. Data Channel)",
                "Extract cleartext usernames and passwords from USER and PASS command packets",
                "Reconstruct active (PORT) and passive (PASV) data transfer sessions to carve files"
            ],
            "tags": [
                "ftp",
                "cleartext-credentials",
                "insecure-protocols",
                "data-channels"
            ],
            "skillsTaught": [
                "FTP credential harvesting",
                "Active vs passive mode decoding",
                "Data channel file extraction"
            ],
            "richContent": {
                "introduction": "The File Transfer Protocol (FTP, RFC 959) dates back to 1985 and was designed without security or encryption. Despite modern secure alternatives (SFTP, FTPS), legacy industrial systems, embedded IoT devices, and internal enterprise shares still run cleartext FTP, exposing authentication secrets to anyone monitoring the wire.",
                "prerequisites": [
                    "Lesson 2.3: Following Streams"
                ],
                "keyTerminology": [
                    {
                        "term": "Control Channel",
                        "definition": "Persistent TCP connection established on port 21 used for authentication, directory navigation, and issuing transfer commands."
                    },
                    {
                        "term": "Data Channel",
                        "definition": "Separate on-demand TCP connection established in Active mode (server connects back from port 20) or Passive mode (client connects to server ephemeral port) to transfer file contents."
                    }
                ],
                "theorySections": [
                    {
                        "title": "Active Mode (PORT) vs. Passive Mode (PASV)",
                        "content": "In Active FTP, the client issues 'PORT h1,h2,h3,h4,p1,p2' telling the server which IP and port to connect back to. In Passive FTP, the client sends 'PASV', and the server replies '227 Entering Passive Mode (h1,h2,h3,h4,p1,p2)' where Port = (p1 * 256) + p2.",
                        "keyPoints": [
                            "Credentials are sent strictly across the Control Channel (port 21).",
                            "File contents traverse the Data Channel and must be carved separately."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Filter for FTP Credentials",
                        "instruction": "Filter for FTP command packets carrying authentication credentials.",
                        "filter": "ftp.command == \"USER\" or ftp.command == \"PASS\"",
                        "expectedOutcome": "Lists cleartext usernames and passwords submitted to the FTP server."
                    },
                    {
                        "step": 2,
                        "title": "Follow the FTP Control Stream",
                        "instruction": "Right-click any FTP packet -> Follow -> TCP Stream.",
                        "expectedOutcome": "Reconstructs the full session transcript: authentication, directory listing, and RETR commands."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "ftp-data",
                        "description": "Filters for the raw data channel carrying transferred files",
                        "purpose": "Inspect file transfer payloads"
                    },
                    {
                        "filter": "ftp.response.code >= 400",
                        "description": "Filters for FTP error and authentication failure codes",
                        "purpose": "Detect brute-force attempts"
                    }
                ],
                "expectedObservations": [
                    "Usernames and passwords appear in raw text without hashing or encryption."
                ],
                "commonMistakes": [
                    "Expecting to find the transferred file inside the port 21 control stream; the file is transmitted over a separate TCP data stream."
                ],
                "securityRelevance": "Compromised FTP credentials often grant attackers access to sensitive internal backups, configuration scripts, and firmware images.",
                "knowledgeCheck": {
                    "question": "If an FTP server responds '227 Entering Passive Mode (192,168,1,50,195,80)', on what TCP port will the data channel be established?",
                    "options": [
                        "Port 21",
                        "Port 20",
                        "Port 50000",
                        "Port 80"
                    ],
                    "correctAnswerIndex": 2,
                    "explanation": "In Passive FTP, the port is calculated as (p1 * 256) + p2. Here, (195 * 256) + 80 = 49920 + 80 = 50000.",
                    "difficulty": "intermediate"
                },
                "summary": "Cleartext protocols like FTP expose critical enterprise credentials and file contents. Dissecting the dual-channel architecture allows investigators to recover both authentication credentials and exfiltrated files.",
                "furtherReading": [
                    {
                        "title": "RFC 959 \u2014 File Transfer Protocol (FTP)",
                        "url": "https://datatracker.ietf.org/doc/html/rfc959"
                    }
                ]
            }
        },
        {
            "id": "les-05-5-lateral-movement-smb",
            "slug": "lateral-movement-smb-rpc-signatures",
            "title": "Lateral Movement, SMB/RPC Traffic & Remote Execution Signatures",
            "description": "Inspect Server Message Block (SMBv1, SMBv2, SMBv3) conversations, analyze Remote Procedure Calls (RPC), detect PsExec / WMI execution signatures, and identify internal pivoting.",
            "durationMinutes": 35,
            "order": 5,
            "objectives": [
                "Deconstruct SMB tree connect, session setup, and file read/write transactions",
                "Identify PsExec remote execution signatures (IPC$, admin$, svcctl, named pipes)",
                "Detect internal pass-the-hash and lateral movement probing across enterprise subnets"
            ],
            "tags": [
                "smb",
                "lateral-movement",
                "psexec",
                "rpc",
                "active-directory"
            ],
            "skillsTaught": [
                "SMB traffic dissection",
                "Named pipe tracking",
                "Lateral movement detection"
            ],
            "richContent": {
                "introduction": "Once an adversary secures an initial workstation foothold, they must pivot laterally to achieve their mission objectives (e.g. compromising Domain Controllers or database servers). Server Message Block (SMB port 445) and Microsoft RPC (port 135) are the primary protocol pathways used by attackers to execute remote commands, upload tools, and dump credentials.",
                "prerequisites": [
                    "Lesson 0.4: TCP Handshake & Flags"
                ],
                "keyTerminology": [
                    {
                        "term": "Lateral Movement",
                        "definition": "Techniques adversaries use to extend access from one compromised system to other systems across the internal network."
                    },
                    {
                        "term": "ADMIN$ / C$",
                        "definition": "Default Windows administrative network shares used by tools like PsExec to stage remote service binaries."
                    },
                    {
                        "term": "Named Pipe",
                        "definition": "An inter-process communication mechanism exposed over SMB (e.g. \\pipe\\svcctl for the Service Control Manager)."
                    }
                ],
                "theorySections": [
                    {
                        "title": "Anatomy of PsExec Lateral Movement Over SMB",
                        "content": "PsExec lateral movement leaves a consistent network fingerprint: 1) SMB2 Session Setup with administrative NTLM/Kerberos authentication, 2) Tree Connect to \\\\target\\ADMIN$, 3) Create / Write of an executable (e.g. PSEXESVC.exe), 4) Tree Connect to \\\\target\\IPC$ and binding to the \\pipe\\svcctl named pipe, and 5) Issuing RPC calls to create and start the service.",
                        "keyPoints": [
                            "Look for SMB Tree Connect requests to hidden administrative shares (ending in $).",
                            "Look for writes to named pipes like svcctl, samr (SAM account database), or winreg."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Filter for SMB Share Connections",
                        "instruction": "Filter for Tree Connect requests to identify accessed internal shares.",
                        "filter": "smb2.tree_connect.path",
                        "expectedOutcome": "Lists UNC share paths accessed by client endpoints."
                    },
                    {
                        "step": 2,
                        "title": "Filter for Named Pipe Transactions",
                        "instruction": "Filter for file creation requests targeting named pipes.",
                        "filter": "smb2.filename contains \"pipe\" or smb2.filename contains \"PSEXE\"",
                        "expectedOutcome": "Exposes remote execution attempts and service manager bindings."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "smb2.tree_connect.path contains \"ADMIN$\" or smb2.tree_connect.path contains \"C$\"",
                        "description": "Isolates connections to administrative network shares",
                        "purpose": "Spot administrative lateral movement"
                    },
                    {
                        "filter": "smb2.cmd == 5",
                        "description": "Filters for SMB2 Create (File Open/Create) commands",
                        "purpose": "Track file staging on remote endpoints"
                    }
                ],
                "expectedObservations": [
                    "A workstation connecting directly to another workstation on port 445 (peer-to-peer SMB) is highly anomalous in corporate environments."
                ],
                "commonMistakes": [
                    "Mistaking legitimate IT administration or system management software for malicious lateral movement without verifying source user accounts."
                ],
                "securityRelevance": "Detecting lateral movement at the network level allows defenders to isolate compromised endpoints before ransomware spreads across the domain.",
                "knowledgeCheck": {
                    "question": "Which Windows administrative share and named pipe are typically targeted over SMB port 445 during PsExec remote service execution?",
                    "options": [
                        "PUBLIC$ and \\pipe\\audio",
                        "ADMIN$ (file staging) and \\pipe\\svcctl (Service Control Manager)",
                        "SYSVOL and \\pipe\\browser",
                        "NETLOGON and \\pipe\\spoolss"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "PsExec uploads its service binary to ADMIN$, then connects to the IPC$ share to bind to the \\pipe\\svcctl named pipe, allowing it to start the service remotely via RPC.",
                    "difficulty": "advanced"
                },
                "summary": "SMB and RPC traffic reveals adversary internal pivoting. Monitoring administrative share connections and named pipe transactions exposes lateral movement and remote execution.",
                "furtherReading": [
                    {
                        "title": "MITRE ATT&CK \u2014 T1021.002: Remote Services: SMB/Windows Admin Shares",
                        "url": "https://attack.mitre.org/techniques/T1021/002/"
                    }
                ]
            }
        }
    ],
    "practicalLab": {
        "id": "lab-05-recon-credential-recovery",
        "title": "Lab 05: Intrusion Reconstruction & Cleartext Credential Recovery",
        "objective": "Analyze Scenario 2 PCAP to reconstruct port scanning activity, evaluate SYN flood intensity, and recover cleartext credentials from unencrypted FTP exchanges.",
        "toolsRequired": [
            "Wireshark 4.x or higher"
        ],
        "pcapSource": {
            "fileName": "Scenario 2.pcap",
            "fileUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Scenario%202.pcap",
            "repositoryUrl": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
            "sha256": "f664404d592d4fd647ebdf8117eb91b91a868fad1b54888e2117d1b271ba5b11"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 50,
        "instructions": [
            "Open Scenario 2.pcap in Wireshark.",
            "Filter for the scanning IP address and determine which ports were probed.",
            "Inspect FTP traffic and extract all submitted usernames and passwords.",
            "Identify whether any file was transferred over the FTP data channel.",
            "Plot the volumetric SYN flood using IO Graphs and record the peak packet rate."
        ],
        "tasks": [
            {
                "id": "task-05-1",
                "description": "Identify scanning source IP and targeted service ports",
                "hint": "Filter: tcp.flags.syn == 1 and tcp.flags.ack == 0"
            },
            {
                "id": "task-05-2",
                "description": "Extract FTP credentials",
                "hint": "Filter: ftp.command == \"USER\" or ftp.command == \"PASS\""
            },
            {
                "id": "task-05-3",
                "description": "Verify file transfer name",
                "hint": "Filter: ftp.command == \"RETR\" or ftp.command == \"STOR\""
            }
        ],
        "evidenceWorksheet": [
            {
                "field": "Scanning Source IP",
                "prompt": "Enter the IP address executing the port scan:",
                "expectedEvidenceType": "IPv4 address"
            },
            {
                "field": "Recovered FTP Username",
                "prompt": "Enter the captured cleartext username:",
                "expectedEvidenceType": "String"
            },
            {
                "field": "Recovered FTP Password",
                "prompt": "Enter the captured cleartext password:",
                "expectedEvidenceType": "String"
            },
            {
                "field": "Transferred Filename",
                "prompt": "Filename requested via RETR/STOR:",
                "expectedEvidenceType": "String"
            }
        ],
        "questions": [
            {
                "question": "Why is cleartext FTP considered a severe security risk on modern internal networks?",
                "options": [
                    "It consumes excessive bandwidth",
                    "Any attacker with network tap or ARP spoofing access can sniff plain-text passwords and confidential files directly off the wire",
                    "It disables firewall inspection",
                    "It only supports IPv6"
                ],
                "correctAnswerIndex": 1,
                "explanation": "FTP provides zero encryption on the wire; authentication and file payloads are transmitted as raw ASCII and binary, allowing trivial interception by adversaries.",
                "difficulty": "beginner"
            }
        ],
        "completionCriteria": [
            "Scanning IP identified",
            "Cleartext credentials extracted and logged in worksheet",
            "File transfer identified and documented"
        ]
    },
    "quiz": {
        "title": "Module 05 Assessment: DoS, Reconnaissance & FTP Network Forensics",
        "questions": [
            {
                "question": "What is the primary indicator of an Nmap half-open TCP SYN scan in a packet capture?",
                "options": [
                    "A rapid succession of SYN packets followed immediately by RST packets from the scanner upon receiving SYN-ACKs",
                    "Continuous ICMP Echo Requests",
                    "Encrypted TLS handshakes on port 443",
                    "Broadcast DHCP Requests"
                ],
                "correctAnswerIndex": 0,
                "explanation": "A half-open scan sends SYN, receives SYN-ACK, and immediately terminates with RST to avoid completing the handshake.",
                "difficulty": "intermediate"
            },
            {
                "question": "In Passive FTP mode, how does the client determine which server port to connect to for the data channel?",
                "options": [
                    "It always connects to port 20",
                    "It parses the 227 response parameters (h1,h2,h3,h4,p1,p2) where Port = (p1 * 256) + p2",
                    "It uses DNS to resolve the data port",
                    "The client chooses the port and informs the server"
                ],
                "correctAnswerIndex": 1,
                "explanation": "In Passive FTP, the server returns a 227 response containing 6 comma-separated octets; the last two octets compute the data port as (p1 * 256) + p2.",
                "difficulty": "intermediate"
            },
            {
                "question": "Peer-to-peer SMB traffic (port 445) observed between two user workstations in an Active Directory environment is most often an indicator of which MITRE ATT&CK tactic?",
                "options": [
                    "Initial Access",
                    "Lateral Movement",
                    "Resource Development",
                    "Exfiltration"
                ],
                "correctAnswerIndex": 1,
                "explanation": "Direct workstation-to-workstation SMB connections are rare in standard corporate architectures and strongly indicate lateral movement, remote service creation, or internal share scanning.",
                "difficulty": "intermediate"
            },
            {
                "question": "How does a Slowloris application-layer Denial of Service (DoS) attack uniquely manifest in packet captures?",
                "options": [
                    "High-volume UDP reflection floods exceeding 100 Gbps",
                    "Hundreds of persistent TCP connections that transmit incomplete HTTP request headers with periodic trailing bytes at long intervals to exhaust web server worker threads",
                    "ICMP Echo Request floods with spoofed broadcast addresses",
                    "Rapid TCP SYN-ACK floods targeting intermediate stateful firewalls"
                ],
                "correctAnswerIndex": 1,
                "explanation": "Slowloris opens numerous TCP connections to a web server and sends partial HTTP headers (e.g., 'X-a: b\\r\\n') at prolonged intervals (every 10-15 seconds), holding connection threads open indefinitely until server worker capacity is exhausted.",
                "difficulty": "intermediate"
            },
            {
                "question": "What diagnostic indicator in packet captures confirms unauthorized data exfiltration concealed within ICMP Echo Request (ping) packets?",
                "options": [
                    "The ICMP Sequence Number resets to zero on every packet",
                    "The ICMP payload data contains dynamic file headers, base64 strings, or data volumes varying across packets instead of standard static OS padding bytes",
                    "The ICMP Type is set to 8 and Code is set to 0",
                    "The ICMP packet has an IP Time-to-Live (TTL) of 64"
                ],
                "correctAnswerIndex": 1,
                "explanation": "Standard OS ping utilities transmit fixed default payload patterns (e.g., repeating alphabet strings or static timestamps). ICMP tunneling exfiltration embeds dynamic file data, encrypted bytes, or non-standard payload lengths within the ICMP data field.",
                "difficulty": "intermediate"
            }
        ]
    }
}
