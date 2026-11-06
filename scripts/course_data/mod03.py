MODULE_03 = {
    "id": "mod-03-advanced-investigation-workflow",
    "title": "Module 03: Advanced Wireshark Investigation Workflow",
    "description": "Execute structured 5-phase forensic triage on unknown captures, dissect TLS sessions, carve embedded payloads, and pinpoint TCP transmission faults.",
    "order": 4,
    "lessons": [
        {
            "id": "les-03-1-5phase-triage-model",
            "slug": "five-phase-pcap-triage-model",
            "title": "Investigating Unknown PCAPs: The 5-Phase Forensic Triage Model",
            "description": "Execute a repeatable 5-phase triage methodology for analyzing unknown incident captures: Scoping, Protocol Profiling, Endpoint Clustering, Stream Reconstruction, and Artifact Carving.",
            "durationMinutes": 35,
            "order": 1,
            "objectives": [
                "Apply the 5-phase network forensic triage methodology to unfamiliar PCAP files",
                "Generate baseline capture summary metrics (Capinfos, Protocol Hierarchy)",
                "Isolate suspicious external IPs and correlate with threat intelligence"
            ],
            "tags": [
                "forensic-methodology",
                "triage",
                "incident-response",
                "pcap-analysis"
            ],
            "skillsTaught": [
                "5-phase triage execution",
                "Baseline scoping",
                "Suspicious endpoint clustering"
            ],
            "richContent": {
                "introduction": "Facing an unknown 10-gigabyte capture during an active incident response engagement can be overwhelming without a structured framework. The 5-Phase Forensic Triage Model standardizes the investigation: Phase 1 (Capture Scoping & Integrity), Phase 2 (Protocol Profiling), Phase 3 (Endpoint Clustering & Anomaly Detection), Phase 4 (Deep Conversation Reconstruction), and Phase 5 (Forensic Artifact Extraction).",
                "prerequisites": [
                    "Module 02: Packet Analysis & Protocol Investigation"
                ],
                "keyTerminology": [
                    {
                        "term": "Triage",
                        "definition": "Rapid forensic assessment to categorize, prioritize, and isolate high-severity attack evidence within a capture."
                    },
                    {
                        "term": "Capinfos",
                        "definition": "Wireshark command-line utility providing metadata: file format, capture duration, packet count, byte size, and average bit rate."
                    }
                ],
                "theorySections": [
                    {
                        "title": "The 5 Phases of Network Forensic Triage",
                        "content": "Phase 1: Verify file hash, record duration and packet counts. Phase 2: Open Protocol Hierarchy to spot unusual protocols. Phase 3: Inspect Conversations for top talkers, external IP connections, and high-port traffic. Phase 4: Reconstruct TCP/UDP streams for suspicious sessions. Phase 5: Carve dropped payloads, scripts, and certificates using File -> Export Objects.",
                        "keyPoints": [
                            "Never begin with random packet scrolling; always proceed top-down through the phases.",
                            "Document findings at each phase to construct an immutable investigation timeline."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Phase 1: Capture Summary Scoping",
                        "instruction": "Open Statistics -> Capture File Properties to review file hash, capture duration, and hardware interface info.",
                        "expectedOutcome": "Provides start time, end time, total packets, and hardware metadata."
                    },
                    {
                        "step": 2,
                        "title": "Phase 2: Protocol Profiling",
                        "instruction": "Open Statistics -> Protocol Hierarchy and look for anomalies (e.g. IRC, unexpected SSH, or HTTP on port 443).",
                        "expectedOutcome": "Identifies protocols that deviate from enterprise baseline expectations."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "!(ip.addr == 10.0.0.0/8 or ip.addr == 172.16.0.0/12 or ip.addr == 192.168.0.0/16)",
                        "description": "Isolates external internet IP communications",
                        "purpose": "Focus on outbound WAN traffic"
                    }
                ],
                "expectedObservations": [
                    "A disciplined triage workflow quickly eliminates 95% of background noise (NTP, ARP, SSDP, mDNS)."
                ],
                "commonMistakes": [
                    "Jumping into individual packet details before understanding the macro protocol hierarchy."
                ],
                "securityRelevance": "Structured triage ensures zero critical evidence is overlooked during rapid-response incident containment.",
                "knowledgeCheck": {
                    "question": "What is the recommended initial action when beginning analysis of an unfamiliar capture file?",
                    "options": [
                        "Export all HTTP objects immediately",
                        "Review Capture File Properties and Protocol Hierarchy to understand baseline scope and composition",
                        "Filter for password strings",
                        "Restart Wireshark"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "Evaluating Capture File Properties and Protocol Hierarchy provides essential context regarding duration, size, and protocol distribution before diving into granular packet analysis.",
                    "difficulty": "beginner"
                },
                "summary": "The 5-phase triage methodology establishes a disciplined, repeatable workflow for cutting through enterprise traffic volume to uncover adversary activity.",
                "furtherReading": [
                    {
                        "title": "SANS Network Forensics Poster",
                        "url": "https://www.sans.org/posters/network-forensics/"
                    }
                ]
            }
        },
        {
            "id": "les-03-2-video-part1",
            "slug": "advanced-investigation-workflow",
            "title": "Advanced Wireshark Network Forensics - Part 1/3",
            "description": "Comprehensive practical demonstration of advanced Wireshark network forensic workflows by Netsec Explained, walking through unknown capture triage, DNS queries, and initial indicator discovery.",
            "durationMinutes": 45,
            "order": 2,
            "youtubeVideoId": "e_dsGhvq9CU",
            "videoAttribution": {
                "creator": "Netsec Explained",
                "channelUrl": "https://www.youtube.com/@NetsecExplained",
                "platform": "YouTube",
                "seriesTitle": "Advanced Wireshark Network Forensics",
                "partNumber": 1
            },
            "objectives": [
                "Follow expert forensic demonstration of unknown PCAP triage in Wireshark",
                "Observe display filter strategies for isolating malicious DNS transactions",
                "Extract Indicators of Compromise (IOCs) from live scenario traffic"
            ],
            "tags": [
                "netsec-explained",
                "video-walkthrough",
                "pcap-triage",
                "network-forensics"
            ],
            "skillsTaught": [
                "Expert triage observation",
                "Interactive display filtering",
                "IOC documentation"
            ],
            "richContent": {
                "introduction": "In Part 1 of the Advanced Wireshark Network Forensics master series by Netsec Explained, you will walk through the forensic deconstruction of an unknown intrusion capture. Learn how professional incident responders approach a suspicious capture, utilize customized display filters, interrogate DNS requests, and trace the initial adversary intrusion footprint.",
                "prerequisites": [
                    "Lesson 3.1: 5-Phase Triage Model"
                ],
                "keyTerminology": [
                    {
                        "term": "Indicator of Compromise (IOC)",
                        "definition": "Forensic artifact observed on a network or in an operating system that indicates an intrusion with high confidence."
                    },
                    {
                        "term": "Initial Access Vector",
                        "definition": "The technical method utilized by an adversary to gain their first foothold in an enterprise network."
                    }
                ],
                "theorySections": [
                    {
                        "title": "Expert Network Forensics Workflow Analysis",
                        "content": "This video masterclass demonstrates real-world application of the triage principles covered in preceding lessons. Pay close attention to how Netsec Explained uses display filter combinations to eliminate benign background protocols, focuses on anomalous DNS transactions, and correlates external IP addresses with suspicious endpoints.",
                        "keyPoints": [
                            "Observe the rapid transition from statistical overview to targeted display filters.",
                            "Note the systematic isolation of client workstations communicating with unrecognized domain names."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Watch the Video Demonstration",
                        "instruction": "Watch Advanced Wireshark Network Forensics - Part 1/3 (Video ID: e_dsGhvq9CU) in the player above or on YouTube.",
                        "expectedOutcome": "Understand the live investigative flow and display filter commands shown."
                    },
                    {
                        "step": 2,
                        "title": "Replicate Filters on Hackers on the Network PCAP",
                        "instruction": "Open Hackers on the Network.pcapng and replicate the DNS and IP filters demonstrated in the video.",
                        "filter": "dns.flags.response == 0",
                        "expectedOutcome": "Examines all outbound DNS queries for comparison with the video walkthrough."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "dns.qry.name contains \".\"",
                        "description": "Filters for standard domain resolution queries",
                        "purpose": "DNS interrogation"
                    },
                    {
                        "filter": "http.request.method == \"GET\"",
                        "description": "Filters for HTTP GET requests",
                        "purpose": "Payload download inspection"
                    }
                ],
                "expectedObservations": [
                    "Suspicious DNS queries often precede secondary stage HTTP executable downloads by seconds."
                ],
                "commonMistakes": [
                    "Watching passively without replicating the filters on the companion PCAP file in your own Wireshark instance."
                ],
                "securityRelevance": "Mastering the mental workflow of an expert investigator accelerates real-time triage during high-stress cyber incident response.",
                "knowledgeCheck": {
                    "question": "In the demonstration by Netsec Explained, what protocol is investigated first to uncover adversary domain infrastructure?",
                    "options": [
                        "BGP",
                        "Domain Name System (DNS)",
                        "SNMP",
                        "NTP"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "DNS requests provide immediate high-fidelity indicators of adversary infrastructure, as malware must resolve C2 hostnames before establishing TCP/TLS sessions.",
                    "difficulty": "beginner"
                },
                "summary": "Part 1 of the Netsec Explained series reinforces the fundamental discipline of network triage: interrogate DNS, profile endpoints, and filter relentlessly.",
                "furtherReading": [
                    {
                        "title": "Netsec Explained YouTube Channel",
                        "url": "https://www.youtube.com/@NetsecExplained"
                    },
                    {
                        "title": "Companion GitHub Repository",
                        "url": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics"
                    }
                ]
            }
        },
        {
            "id": "les-03-3-tls-handshake-sni",
            "slug": "dissecting-tls-handshakes-sni-analysis",
            "title": "Dissecting Encrypted Traffic: TLS Handshakes, Cipher Suites & SNI Analysis",
            "description": "Analyze Transport Layer Security (TLS 1.2 and TLS 1.3) sessions, extract Server Name Indication (SNI) hostnames from Client Hellos, evaluate cipher suites, and inspect X.509 certificate chains.",
            "durationMinutes": 40,
            "order": 3,
            "objectives": [
                "Deconstruct the TLS handshake: Client Hello, Server Hello, Certificate, Key Exchange",
                "Extract domain indicators from the cleartext Server Name Indication (SNI) extension",
                "Differentiate TLS 1.2 from TLS 1.3 encrypted handshake characteristics",
                "Inspect X.509 certificates to verify issuer validity and subject alternative names (SAN)"
            ],
            "tags": [
                "tls",
                "sni",
                "certificates",
                "encrypted-traffic",
                "ssl-handshake"
            ],
            "skillsTaught": [
                "SNI extraction",
                "Certificate validation",
                "Cipher suite analysis"
            ],
            "richContent": {
                "introduction": "Over 90% of modern enterprise web traffic is encrypted with TLS. While the application payload is encrypted, the initial cryptographic handshake remains a goldmine for forensic analysts: the Client Hello carries the cleartext Server Name Indication (SNI), the Server Hello reveals negotiated cipher suites, and in TLS 1.2, server X.509 certificates are transmitted unencrypted.",
                "prerequisites": [
                    "Lesson 0.4: TCP Handshake & Flags"
                ],
                "keyTerminology": [
                    {
                        "term": "SNI (Server Name Indication)",
                        "definition": "A TLS extension in the Client Hello indicating the specific hostname the client wishes to reach on a shared virtual hosting IP."
                    },
                    {
                        "term": "Cipher Suite",
                        "definition": "A standardized cryptographic combination (e.g. TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384) specifying key exchange, authentication, encryption, and hashing algorithms."
                    },
                    {
                        "term": "JA3 / JA4 Fingerprint",
                        "definition": "Cryptographic hash of client TLS handshake parameters (ciphers, extensions, curves) used to fingerprint client applications and malware families."
                    }
                ],
                "theorySections": [
                    {
                        "title": "TLS 1.2 vs. TLS 1.3 Forensics Differences",
                        "content": "In TLS 1.2, the Server Hello and Certificate message are sent in cleartext, allowing direct inspection of the server's public X.509 certificate and validity dates. In TLS 1.3, the server certificate is encrypted immediately after the Server Hello, meaning analysts must rely on the cleartext SNI in the Client Hello and IP reputation.",
                        "keyPoints": [
                            "Filter for Client Hello: tls.handshake.type == 1.",
                            "Filter for Server Hello: tls.handshake.type == 2.",
                            "Filter for Certificate message: tls.handshake.type == 11 (TLS 1.2)."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Extract All TLS Server Names",
                        "instruction": "Apply a display filter to isolate all outgoing TLS connection attempts and display their requested domain names.",
                        "filter": "tls.handshake.extension.type == 0",
                        "expectedOutcome": "Lists all Client Hello packets containing Server Name Indication extensions."
                    },
                    {
                        "step": 2,
                        "title": "Inspect X.509 Certificate Chain",
                        "instruction": "Filter for Certificate packets and expand Transport Layer Security -> Certificate in Packet Details.",
                        "filter": "tls.handshake.certificate",
                        "expectedOutcome": "Reveals Certificate Subject, Issuer, Validity Not Before / Not After, and Subject Alternative Names (SANs)."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "tls.handshake.extensions_server_name",
                        "description": "Shows packets with non-empty SNI hostname",
                        "purpose": "Enumerate external target domains"
                    },
                    {
                        "filter": "tls.handshake.extensions_server_name contains \".xyz\"",
                        "description": "Isolates suspicious top-level domains",
                        "purpose": "Spot anomalous TLDs used in phishing/C2"
                    }
                ],
                "expectedObservations": [
                    "Self-signed certificates or certificates with mismatched Common Names (CN) and SANs frequently indicate rogue C2 servers or interception proxies."
                ],
                "commonMistakes": [
                    "Assuming encrypted traffic cannot be fingerprinted; JA3/JA4 signatures identify malware families even when payloads are completely opaque."
                ],
                "securityRelevance": "Adversaries utilize legitimate public cloud providers (Cloudflare, AWS, Fastly) for fronting, making SNI analysis essential for differentiating legitimate services from malicious hostnames.",
                "knowledgeCheck": {
                    "question": "Which field in the TLS Client Hello packet contains the unencrypted domain name requested by the client?",
                    "options": [
                        "Session ID",
                        "Cipher Suites List",
                        "Server Name Indication (SNI) Extension",
                        "Pre-Shared Key"
                    ],
                    "correctAnswerIndex": 2,
                    "explanation": "The Server Name Indication (SNI) extension allows the client to announce the destination domain name in cleartext so the server can present the correct digital certificate.",
                    "difficulty": "intermediate"
                },
                "summary": "TLS handshakes leak critical intelligence regarding adversary infrastructure. SNI extraction, certificate inspection, and JA3 fingerprinting enable high-confidence threat profiling on encrypted sessions.",
                "furtherReading": [
                    {
                        "title": "RFC 8446 \u2014 The Transport Layer Security (TLS) Protocol Version 1.3",
                        "url": "https://datatracker.ietf.org/doc/html/rfc8446"
                    }
                ]
            }
        },
        {
            "id": "les-03-4-object-carving",
            "slug": "extracting-embedded-objects-payloads",
            "title": "Extracting Embedded Objects & File Payloads from Network Streams",
            "description": "Utilize Wireshark's Export Objects engine to carve transferred files (HTTP, SMB, IMF, TFTP), reconstruct malware drops, and compute cryptographic hashes for threat intelligence.",
            "durationMinutes": 35,
            "order": 4,
            "objectives": [
                "Extract transferred files from network streams using File -> Export Objects (HTTP, SMB, IMF)",
                "Identify executable file signatures (MZ / PE, ELF, PK / ZIP) in raw packet bytes",
                "Compute cryptographic SHA256 hashes of carved artifacts in isolated environments"
            ],
            "tags": [
                "object-carving",
                "export-objects",
                "payload-extraction",
                "malware-analysis"
            ],
            "skillsTaught": [
                "Object extraction",
                "Magic byte identification",
                "Artifact hashing"
            ],
            "richContent": {
                "introduction": "When malware is delivered over unencrypted channels or intercepted via decrypted sessions, the binary payload traverses the network as application layer data. Wireshark can automatically reassemble and carve transferred files directly to disk through its Export Objects engine.",
                "prerequisites": [
                    "Lesson 2.3: Following Streams"
                ],
                "keyTerminology": [
                    {
                        "term": "Object Carving",
                        "definition": "The process of extracting complete files (documents, executables, images) from reassembled network stream payloads."
                    },
                    {
                        "term": "Magic Bytes",
                        "definition": "Distinctive binary header signatures identifying file types: 4D 5A ('MZ' for Windows PE), 7F 45 4C 46 ('ELF' for Linux), 50 4B 03 04 ('PK' for ZIP/Office)."
                    }
                ],
                "theorySections": [
                    {
                        "title": "Wireshark Export Objects Framework",
                        "content": "Wireshark includes specialized carvers for HTTP, SMB/SMB2, IMF (Internet Message Format / Email), and TFTP. When selected, Wireshark lists every file transferred, its content type, packet number, hostname, and size in bytes.",
                        "keyPoints": [
                            "Always carve files into an isolated analysis sandbox.",
                            "Never double-click carved artifacts on your forensic workstation; analyze with sha256sum, file, and strings first."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Open HTTP Export Objects",
                        "instruction": "Open Scenario 1.pcapng -> Click File -> Export Objects -> HTTP.",
                        "expectedOutcome": "The Export Objects dialog lists all web artifacts, filenames, and byte sizes."
                    },
                    {
                        "step": 2,
                        "title": "Save Selected File to Sandbox",
                        "instruction": "Select a suspicious artifact (.exe, .scr, .vbs, .ps1) and click 'Save'.",
                        "expectedOutcome": "Writes the raw reconstructed file directly to your analysis directory."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "http.content_type contains \"application/octet-stream\"",
                        "description": "Filters for binary file downloads over HTTP",
                        "purpose": "Locate dropped executables"
                    },
                    {
                        "filter": "http.content_type contains \"application/x-dosexec\"",
                        "description": "Filters for Windows PE executable transfers",
                        "purpose": "Direct malware delivery detection"
                    }
                ],
                "expectedObservations": [
                    "Carved executable files display standard 'MZ' header bytes at byte offset 0x00."
                ],
                "commonMistakes": [
                    "Carving objects onto a live host without antivirus exclusions or isolated sandboxing, resulting in instant host antivirus quarantine or accidental execution."
                ],
                "securityRelevance": "Extracted binaries yield cryptographic hashes for querying VirusTotal and provide samples for static reverse engineering and behavioral detonation.",
                "knowledgeCheck": {
                    "question": "What two ASCII characters represent the magic byte signature at offset 0x00 of all Windows Portable Executable (PE) binaries?",
                    "options": [
                        "PK",
                        "MZ",
                        "ELF",
                        "7z"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "Windows PE files begin with the hexadecimal bytes 0x4D 0x5A, representing the ASCII letters 'MZ' (the initials of DOS executable architect Mark Zbikowski).",
                    "difficulty": "beginner"
                },
                "summary": "Export Objects allows network forensic analysts to extract the exact files delivered by adversaries, bridging network evidence with host-level malware analysis.",
                "furtherReading": [
                    {
                        "title": "Wireshark User Guide \u2014 Exporting Objects",
                        "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChIOExportSection.html"
                    }
                ]
            }
        },
        {
            "id": "les-03-5-packet-loss-window",
            "slug": "packet-loss-tcp-zero-window-analysis",
            "title": "Identifying Packet Loss, Window Exhaustion & TCP Zero-Window Events",
            "description": "Diagnose network transmission faults, isolate TCP retransmissions and duplicate ACKs, evaluate TCP window size exhaustion, and detect intentional denial of service.",
            "durationMinutes": 35,
            "order": 5,
            "objectives": [
                "Interpret Wireshark TCP Expert Information: Retransmission, Fast Retransmission, Duplicate ACK",
                "Diagnose TCP Zero-Window and Window Full conditions indicating receiver buffer exhaustion",
                "Differentiate network-induced packet loss from adversary rate-limiting or resource starvation"
            ],
            "tags": [
                "tcp-analysis",
                "packet-loss",
                "zero-window",
                "retransmission",
                "troubleshooting"
            ],
            "skillsTaught": [
                "TCP fault diagnosis",
                "Buffer exhaustion detection",
                "Expert info interpretation"
            ],
            "richContent": {
                "introduction": "Not all anomalies represent malicious exploits; understanding protocol performance faults prevents false alarms. When a server's receive buffer fills completely, it advertises a TCP Zero-Window (win=0), instructing the sender to halt transmission. Understanding these signals allows analysts to diagnose resource exhaustion attacks.",
                "prerequisites": [
                    "Lesson 0.4: TCP Handshake & Flags"
                ],
                "keyTerminology": [
                    {
                        "term": "TCP Window Size",
                        "definition": "The number of unacknowledged bytes a sender is permitted to transmit before receiving an ACK from the receiver."
                    },
                    {
                        "term": "Zero-Window",
                        "definition": "A TCP packet where Window Size = 0, indicating the receiver application buffer is exhausted and cannot accept further data."
                    },
                    {
                        "term": "Fast Retransmission",
                        "definition": "Retransmission triggered immediately upon receiving 3 duplicate ACKs without waiting for the retransmission timeout (RTO) to expire."
                    }
                ],
                "theorySections": [
                    {
                        "title": "Wireshark TCP Expert Information Engine",
                        "content": "Wireshark continuously tracks sequence numbers and marks anomalies with color-coded Expert Information: Chat (Blue), Note (Cyan), Warning (Yellow), and Error (Red). Warnings include 'TCP Retransmission', 'TCP Previous Segment Not Captured' (packet loss), and 'TCP ZeroWindow'.",
                        "keyPoints": [
                            "Zero-Window probes are sent periodically to test if the receiver's window has reopened.",
                            "Persistent Zero-Window states during an attack indicate successful service starvation (Denial of Service)."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "View Expert Information Summary",
                        "instruction": "Click Analyze -> Expert Information (or click the bottom-left color circle indicator).",
                        "expectedOutcome": "Categorized summary of all warnings, notes, and errors across the capture."
                    },
                    {
                        "step": 2,
                        "title": "Filter for Zero-Window Events",
                        "instruction": "Filter for packets advertising a zero receive window.",
                        "filter": "tcp.analysis.zero_window",
                        "expectedOutcome": "Highlights packets where receiving endpoints are stalled."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "tcp.analysis.retransmission",
                        "description": "Isolates retransmitted TCP segments",
                        "purpose": "Measure packet loss rate"
                    },
                    {
                        "filter": "tcp.analysis.duplicate_ack",
                        "description": "Isolates duplicate ACKs indicating out-of-order arrival or loss",
                        "purpose": "Pinpoint dropped packets"
                    }
                ],
                "expectedObservations": [
                    "A wave of Duplicate ACKs followed by a Fast Retransmission pinpoint the exact sequence byte dropped in transit."
                ],
                "commonMistakes": [
                    "Assuming every retransmission is caused by an attack; network congestion and bad cabling also cause retransmissions."
                ],
                "securityRelevance": "Volumetric and algorithmic denial-of-service attacks systematically trigger Zero-Window collapse across target web and database servers.",
                "knowledgeCheck": {
                    "question": "What does an advertised TCP Window Size of 0 (Zero-Window) communicate to the sending peer?",
                    "options": [
                        "The connection has been terminated by an administrator",
                        "The receiver's socket buffer is completely full; halt data transmission until a window update is sent",
                        "The client sequence number was reset to zero",
                        "The network link has zero latency"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "A TCP Zero-Window informs the sender that the receiver's kernel buffer is full and cannot accept additional bytes, halting data transmission until buffer space clears.",
                    "difficulty": "intermediate"
                },
                "summary": "Mastering TCP analysis flags and window exhaustion conditions enables investigators to differentiate genuine network degradation from adversary denial of service.",
                "furtherReading": [
                    {
                        "title": "Wireshark User Guide \u2014 TCP Analysis Flags",
                        "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChAdvTCPAnalysis.html"
                    }
                ]
            }
        }
    ],
    "practicalLab": {
        "id": "lab-03-triage-carving",
        "title": "Lab 03: Unknown PCAP Triage & Suspicious File Extraction",
        "objective": "Execute the 5-phase triage model on Hackers on the Network PCAP, identify external C2 domains via SNI, and carve transferred files using Export Objects.",
        "toolsRequired": [
            "Wireshark 4.x or higher"
        ],
        "pcapSource": {
            "fileName": "Hackers on the Network.pcapng",
            "fileUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Hackers%20on%20the%20Network.pcapng",
            "repositoryUrl": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
            "sha256": "b2bd9a8b484f4ded72a4ce7de1335198d5ae6e81ace89fe6e6d5a071e1391cd9"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 55,
        "instructions": [
            "Open Hackers on the Network.pcapng.",
            "Record capture metadata (Capinfos duration, packet count, average bit rate).",
            "Identify anomalous external IP addresses in the Conversations matrix.",
            "Use File -> Export Objects -> HTTP to extract any transferred payload files.",
            "Calculate the SHA256 checksum of extracted files and document in the worksheet."
        ],
        "tasks": [
            {
                "id": "task-03-1",
                "description": "Document capture duration and total packet count",
                "hint": "Statistics -> Capture File Properties"
            },
            {
                "id": "task-03-2",
                "description": "Extract all HTTP objects to your analysis directory",
                "hint": "File -> Export Objects -> HTTP -> Save All"
            },
            {
                "id": "task-03-3",
                "description": "Identify TLS SNI hostnames for encrypted outbound streams",
                "hint": "Filter: tls.handshake.extensions_server_name"
            }
        ],
        "evidenceWorksheet": [
            {
                "field": "Total Capture Packet Count",
                "prompt": "Enter the total packets in Hackers on the Network:",
                "expectedEvidenceType": "Integer count"
            },
            {
                "field": "Carved Artifact Filename",
                "prompt": "Filename of extracted payload object:",
                "expectedEvidenceType": "String"
            },
            {
                "field": "Target TLS SNI Hostname",
                "prompt": "Observed server name in Client Hello:",
                "expectedEvidenceType": "Domain FQDN"
            }
        ],
        "questions": [
            {
                "question": "What is the primary risk of analyzing carved executable payloads directly on your host operating system?",
                "options": [
                    "It modifies the original PCAP file",
                    "Accidental execution of malicious code can infect the analysis workstation",
                    "It invalidates Wireshark licensing",
                    "It changes the file hash"
                ],
                "correctAnswerIndex": 1,
                "explanation": "Carved objects may be live malware. They must strictly be handled within isolated, non-networked sandboxes with execution disabled.",
                "difficulty": "beginner"
            }
        ],
        "completionCriteria": [
            "Capture scoped with exact packet count",
            "HTTP objects carved and documented",
            "TLS SNI hostnames recorded in evidence worksheet"
        ]
    },
    "quiz": {
        "title": "Module 03 Assessment: Advanced Wireshark Investigation Workflow",
        "questions": [
            {
                "question": "In TLS 1.3, which handshake message containing the server certificate is encrypted, unlike in TLS 1.2?",
                "options": [
                    "Client Hello",
                    "Server Hello",
                    "Certificate",
                    "Change Cipher Spec"
                ],
                "correctAnswerIndex": 2,
                "explanation": "In TLS 1.3, encryption begins immediately after the Server Hello, meaning the Certificate message is encrypted on the wire, preventing cleartext certificate inspection without keys.",
                "difficulty": "intermediate"
            },
            {
                "question": "What does Wireshark Expert Information flag when a packet retransmits previously sent sequence numbers following 3 duplicate ACKs?",
                "options": [
                    "TCP ZeroWindow",
                    "TCP Fast Retransmission",
                    "TCP Out-of-Order",
                    "TCP Window Update"
                ],
                "correctAnswerIndex": 1,
                "explanation": "A TCP Fast Retransmission is triggered when the sender observes three duplicate ACKs, retransmitting the missing segment immediately without waiting for the retransmission timeout.",
                "difficulty": "intermediate"
            },
            {
                "question": "Which Wireshark menu provides the native capability to extract transferred web objects and binaries directly to disk?",
                "options": [
                    "Tools -> Firewall ACL Rules",
                    "File -> Export Objects -> HTTP",
                    "Analyze -> Expert Info",
                    "Edit -> Find Packet"
                ],
                "correctAnswerIndex": 1,
                "explanation": "File -> Export Objects allows automatic extraction and reassembly of files transferred over HTTP, SMB, IMF, and TFTP.",
                "difficulty": "beginner"
            },
            {
                "question": "Which Wireshark diagnostic window provides calculated summary metrics including total packets, total bytes, duration, and bidirectional bandwidth between all communicating endpoint pairs?",
                "options": [
                    "Protocol Hierarchy Statistics",
                    "Conversations Window (Statistics -> Conversations)",
                    "Capture File Properties",
                    "Flow Graph / Sequence Diagram"
                ],
                "correctAnswerIndex": 1,
                "explanation": "The Statistics -> Conversations window aggregates packet counts, byte volumes, and start/duration timestamps for Ethernet, IPv4, IPv6, and TCP/UDP conversation pairs.",
                "difficulty": "beginner"
            },
            {
                "question": "What is the critical semantic difference in Wireshark display filters between 'ip.addr != 10.0.0.1' and '!(ip.addr == 10.0.0.1)'?",
                "options": [
                    "They are syntactically and logically identical in all scenarios",
                    "'ip.addr != 10.0.0.1' evaluates true if EITHER source OR destination is not 10.0.0.1, whereas '!(ip.addr == 10.0.0.1)' strictly excludes packets where NEITHER address is 10.0.0.1",
                    "'ip.addr !=' only applies to broadcast packets, whereas '!(' applies to unicast",
                    "'!(ip.addr == 10.0.0.1)' triggers a syntax error in modern Wireshark"
                ],
                "correctAnswerIndex": 1,
                "explanation": "Because IP packets have two addresses (src and dst), 'ip.addr != X' tests if ANY address field is not X (which is almost always true). '!(ip.addr == X)' negates the condition, matching only packets where NEITHER the source nor destination is X.",
                "difficulty": "advanced"
            }
        ]
    }
}
