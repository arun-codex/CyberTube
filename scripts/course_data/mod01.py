MODULE_01 = {
    "id": "mod-01-wireshark-mastery",
    "title": "Module 01: Wireshark Installation & Interface Mastery",
    "description": "Configure high-fidelity packet capture drivers, master interface capture modes, customize forensic profiles, and establish delta timing baselines.",
    "order": 2,
    "lessons": [
        {
            "id": "les-01-1-architecture-drivers",
            "slug": "wireshark-architecture-capture-drivers",
            "title": "Wireshark Architecture, libpcap/Npcap & Driver Capture Modes",
            "description": "Explore the internal architecture of Wireshark, dissecting the packet capture library (libpcap/Npcap), wiretap library, packet dissection engine, and operating system capture subsystems.",
            "durationMinutes": 30,
            "order": 1,
            "objectives": [
                "Understand the relationship between user-space Wireshark and kernel packet capture drivers (libpcap / Npcap)",
                "Identify hardware and buffer limitations that lead to packet drop during high-throughput analysis",
                "Configure Npcap loopback and raw 802.11 monitor mode options"
            ],
            "tags": ["wireshark", "npcap", "libpcap", "capture-drivers", "architecture"],
            "skillsTaught": ["Capture driver configuration", "Buffer optimization", "Packet drop mitigation"],
            "richContent": {
                "introduction": "Wireshark is not merely a packet visualizer; it is a complex modular system comprising packet capture drivers (libpcap on Linux/macOS, Npcap on Windows), the Wiretap file reading abstraction, and thousands of modular protocol dissectors. Understanding how packets travel from the NIC ring buffer to the dissection engine ensures data integrity during forensic triage.",
                "prerequisites": ["Module 00: Networking Prerequisites"],
                "keyTerminology": [
                    {"term": "Npcap", "definition": "The Windows packet capture library and driver developed by the Nmap project, providing loopback capture and raw 802.11 frame injection."},
                    {"term": "Wiretap (wtap)", "definition": "Wireshark library responsible for opening, reading, and converting dozens of capture file formats (pcap, pcapng, snoop, cap)."},
                    {"term": "Dissector", "definition": "A protocol-specific parsing module in Wireshark that translates raw packet bytes into human-readable field trees."}
                ],
                "theorySections": [
                    {
                        "title": "Kernel-to-User-Space Packet Journey",
                        "content": "When a frame arrives at the Network Interface Card (NIC), it is transferred via Direct Memory Access (DMA) into an OS ring buffer. The Npcap/libpcap kernel filter intercepts the packet, applies Berkeley Packet Filters (BPF) if specified, and copies the buffer into user space memory where Wireshark reads it.",
                        "keyPoints": [
                            "Capture drops occur when the CPU or disk cannot drain the driver buffer fast enough during burst traffic.",
                            "BPF capture filters run in kernel space, minimizing packet copy overhead during high-speed captures."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Verify Capture Driver Version",
                        "instruction": "Open Wireshark -> Help -> About Wireshark and review the Compiled with and Running on library versions.",
                        "expectedOutcome": "Confirms active Npcap or libpcap driver version and supported hardware acceleration."
                    }
                ],
                "displayFilters": [
                    {"filter": "_ws.expert.severity == \"Error\"", "description": "Displays malformed or truncated packets reported by dissectors", "purpose": "Identify driver corruption or dissection errors"}
                ],
                "expectedObservations": [
                    "About dialog verifies whether loopback adapter capture is supported on your platform."
                ],
                "commonMistakes": [
                    "Installing outdated WinPcap instead of modern Npcap, resulting in missing loopback traffic and missing 802.11 radiotap headers."
                ],
                "securityRelevance": "Attackers can exploit vulnerabilities in protocol dissectors or flood network interfaces to force forensic packet drops, creating blind spots for defenders.",
                "knowledgeCheck": {
                    "question": "Which component is responsible for filtering packets in kernel space before copying them into Wireshark user memory?",
                    "options": ["Wiretap library", "Berkeley Packet Filter (BPF) engine in libpcap/Npcap", "Display filter engine", "Qt GUI layer"],
                    "correctAnswerIndex": 1,
                    "explanation": "BPF capture filters are evaluated directly in kernel space within libpcap/Npcap, ensuring that only matched packets incur user-space copy overhead.",
                    "difficulty": "intermediate"
                },
                "summary": "Wireshark leverages low-level capture drivers to interface with physical NICs. Understanding driver buffer management prevents packet drops during high-volume incident investigations.",
                "furtherReading": [
                    {"title": "Wireshark Developer Guide — Dissector Architecture", "url": "https://www.wireshark.org/docs/wsdg_html_chunked/"}
                ]
            }
        },
        {
            "id": "les-01-2-interface-selection",
            "slug": "interface-selection-promiscuous-mode",
            "title": "Interface Selection, Promiscuous vs. Monitor Mode & Capture Options",
            "description": "Configure capture interfaces, contrast Promiscuous mode with standard Unicast filtering, master wireless Monitor Mode, and tune ring buffer thresholds.",
            "durationMinutes": 35,
            "order": 2,
            "objectives": [
                "Distinguish between standard unicast, Promiscuous, and wireless Monitor capture modes",
                "Configure multiple buffer files (ring buffers) and auto-split triggers based on size and duration",
                "Evaluate SPAN port, network TAP, and port mirror topologies"
            ],
            "tags": ["promiscuous-mode", "monitor-mode", "span-port", "taps", "capture-options"],
            "skillsTaught": ["Promiscuous mode configuration", "Ring buffer setup", "SPAN port analysis"],
            "richContent": {
                "introduction": "By default, network cards drop any Ethernet frame whose destination MAC address does not match their own hardware MAC (or a broadcast/multicast group). In Promiscuous mode, the NIC controller delivers all observed frames across the broadcast segment to the OS. On wireless networks, Monitor mode allows capturing 802.11 management and control frames without associating with an Access Point.",
                "prerequisites": ["Lesson 1.1: Wireshark Architecture"],
                "keyTerminology": [
                    {"term": "Promiscuous Mode", "definition": "NIC configuration that disables hardware MAC address filtering, capturing all traffic passing through the local segment."},
                    {"term": "Monitor Mode (rfmon)", "definition": "Wireless card mode that captures raw 802.11 frames over the air without associating with a BSSID."},
                    {"term": "Network TAP", "definition": "A dedicated hardware device inserted directly into a physical cable to copy full-duplex traffic without introducing latency or altering packet contents."}
                ],
                "theorySections": [
                    {
                        "title": "Network Capture Topologies: TAP vs. SPAN Port",
                        "content": "A Switched Port Analyzer (SPAN) or port mirror copies switch port traffic to a designated monitoring port. However, SPAN ports drop corrupted frames, strip VLAN tags by default, and drop packets when the destination port exceeds capacity. Hardware TAPs copy 100% of physical bits, including malformed frames and preamble anomalies.",
                        "keyPoints": [
                            "Promiscuous mode on a switched network only sees broadcast, multicast, and traffic addressed to the local port.",
                            "Full forensic capture on enterprise switches requires SPAN ports or in-line physical TAPs."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Open Capture Options",
                        "instruction": "Click Capture -> Options (Ctrl+K or Cmd+K) to view active interface sparklines and buffer settings.",
                        "expectedOutcome": "Active network interfaces display real-time packet activity graphs."
                    },
                    {
                        "step": 2,
                        "title": "Configure Multiple Ring Buffer Files",
                        "instruction": "Select Output tab -> Enable 'Create a new file automatically after...' -> Set limit to 100 megabytes and check 'Use a ring buffer with 10 files'.",
                        "expectedOutcome": "Wireshark will cycle through 10 files of 100MB each, preventing disk exhaustion during prolonged captures."
                    }
                ],
                "displayFilters": [
                    {"filter": "wlan.fc.type_subtype == 0x08", "description": "Filters for 802.11 Beacon frames in wireless monitor mode captures", "purpose": "Wireless BSSID reconnaissance"}
                ],
                "expectedObservations": [
                    "Interfaces in promiscuous mode on a hub see all conversations; on a switch, only local and mirrored traffic appears."
                ],
                "commonMistakes": [
                    "Expecting promiscuous mode on a home Wi-Fi adapter to automatically decrypt WPA2/WPA3 traffic of neighboring devices without 4-way handshake keys."
                ],
                "securityRelevance": "Unauthorized promiscuous interfaces indicate internal network sniffers. Proper SPAN/TAP placement is essential for gathering uncontaminated forensic evidence.",
                "knowledgeCheck": {
                    "question": "What is the primary difference between Promiscuous Mode and Monitor Mode?",
                    "options": [
                        "Promiscuous mode works on wired and associated wireless; Monitor mode captures raw over-the-air wireless frames without association",
                        "Monitor mode is only used for Bluetooth",
                        "Promiscuous mode requires root, Monitor mode does not",
                        "Promiscuous mode alters MAC addresses on the wire"
                    ],
                    "correctAnswerIndex": 0,
                    "explanation": "Promiscuous mode captures all packets on a connected wired network or associated Wi-Fi network. Monitor mode (rfmon) allows wireless NICs to capture raw 802.11 management, control, and data frames passively without connecting to an AP.",
                    "difficulty": "intermediate"
                },
                "summary": "Interface mode selection dictates what physical traffic reaches Wireshark. Setting up ring buffers ensures high-volume enterprise captures never crash analysts' machines.",
                "furtherReading": [
                    {"title": "Wireshark Wiki — CaptureSetup/Ethernet", "url": "https://wiki.wireshark.org/CaptureSetup/Ethernet"}
                ]
            }
        },
        {
            "id": "les-01-3-custom-profiles-colors",
            "slug": "custom-profiles-coloring-rules",
            "title": "Deep Customization: Coloring Rules, Custom Columns & Profiles",
            "description": "Construct high-efficiency forensic profiles, create custom columns for TCP delta times and HTTP hosts, and establish automated syntax coloring rules.",
            "durationMinutes": 35,
            "order": 3,
            "objectives": [
                "Create, export, and switch between dedicated Wireshark Configuration Profiles",
                "Add custom columns from packet details: Delta time, HTTP host, DNS query, TCP stream number",
                "Build dynamic coloring rules to instantly highlight TCP resets, SYN packets, and malware indicators"
            ],
            "tags": ["profiles", "coloring-rules", "custom-columns", "forensic-workflow"],
            "skillsTaught": ["Forensic profile building", "Custom column extraction", "Visual triage acceleration"],
            "richContent": {
                "introduction": "Default Wireshark installations are optimized for general networking, not cyber forensics. By creating dedicated investigation profiles, extracting key header fields into dedicated columns (such as TCP Delta Time and Host Header), and applying contrast coloring rules, analysts reduce forensic triage time by over 70%.",
                "prerequisites": ["Lesson 1.2: Interface Selection"],
                "keyTerminology": [
                    {"term": "Configuration Profile", "definition": "A discrete set of Wireshark preferences, custom columns, coloring rules, recent display filters, and enabled protocols stored in a dedicated folder."},
                    {"term": "TCP Delta Time", "definition": "The elapsed time between the current packet and the previous packet within the exact same TCP stream."}
                ],
                "theorySections": [
                    {
                        "title": "Why Dedicated Forensics Profiles Matter",
                        "content": "When examining incident response PCAPs, the standard 'No., Time, Source, Destination, Protocol, Length, Info' columns fail to surface critical metadata. Adding 'TCP Delta', 'TCP Stream', 'Host', and 'Source Port' directly to the Packet List allows instant visual triage without expanding individual packets.",
                        "keyPoints": [
                            "Profiles can be hot-swapped via the bottom-right status bar.",
                            "Coloring rules are evaluated in top-down sequential order; first match wins."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Create a New Forensic Profile",
                        "instruction": "Right-click the Profile indicator in the bottom-right status bar -> Manage Profiles -> Click '+' -> Name it 'SOC-Forensics' -> Click OK.",
                        "expectedOutcome": "Wireshark activates the clean SOC-Forensics profile."
                    },
                    {
                        "step": 2,
                        "title": "Add TCP Delta Time as a Custom Column",
                        "instruction": "Select any TCP packet -> Expand Transmission Control Protocol -> Expand Timestamps -> Right-click 'Time since previous frame in this TCP stream' -> Select 'Apply as Column'.",
                        "expectedOutcome": "A new Delta time column is permanently displayed in the packet list for this profile."
                    }
                ],
                "displayFilters": [
                    {"filter": "tcp.flags.reset == 1", "description": "Highlight resets with red background in Coloring Rules", "purpose": "Visual triage for connection terminations"},
                    {"filter": "http.request or tls.handshake.type == 1", "description": "Highlight web requests and client hellos with cyan background", "purpose": "Session initiation visibility"}
                ],
                "expectedObservations": [
                    "Packet list instantly exposes stream numbers and timing anomalies without manual packet expansion."
                ],
                "commonMistakes": [
                    "Applying column changes in the 'Default' profile, causing customized columns to clutter non-forensic packet captures."
                ],
                "securityRelevance": "Rapid visual triage separates commodity scans from stealthy targeted C2 beacons and data exfiltration sessions.",
                "knowledgeCheck": {
                    "question": "How are Wireshark coloring rules evaluated when multiple rules match a single packet?",
                    "options": [
                        "The most specific rule wins",
                        "From top to bottom; the first matching rule determines packet appearance",
                        "From bottom to top; the last matching rule overrides earlier rules",
                        "Rules are blended together chromatically"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "Coloring rules are evaluated strictly top-to-bottom. The first rule in the list that evaluates to true determines the background and foreground colors.",
                    "difficulty": "intermediate"
                },
                "summary": "Custom forensic profiles, dedicated timing columns, and contrast coloring rules convert Wireshark into a precision SOC triage workbench.",
                "furtherReading": [
                    {"title": "Wireshark User Guide — Customizing Configuration Profiles", "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChCustConfigProfilesSection.html"}
                ]
            }
        },
        {
            "id": "les-01-4-timestamps-delta-timing",
            "slug": "timestamps-tcp-delta-timing",
            "title": "Time Display Formats, Timestamps & TCP Delta Timing Analysis",
            "description": "Master Wireshark time display formats (UTC, Epoch, Seconds Since Beginning), analyze TCP conversational delta times, and detect automated beacon frequencies.",
            "durationMinutes": 40,
            "order": 4,
            "objectives": [
                "Switch between UTC Date and Time, Seconds Since Beginning, and Seconds Since Previous Displayed Packet",
                "Analyze TCP round-trip delta timings to measure client vs. server delay",
                "Detect automated periodic execution (cron jobs, C2 beacons) using precise timestamp differentials"
            ],
            "tags": ["timestamps", "delta-time", "rtt", "beacon-detection", "time-display"],
            "skillsTaught": ["Timestamp alignment", "Delta timing calculations", "Beaconing periodicity identification"],
            "richContent": {
                "introduction": "Network forensics is fundamentally about timeline reconstruction. A single misplaced time zone or misunderstanding of packet delta timings can lead to invalid attribution. Wireshark provides flexible time representations to correlate packet captures with host logs, SIEM events, and firewall alerts.",
                "prerequisites": ["Lesson 1.3: Custom Profiles & Columns"],
                "keyTerminology": [
                    {"term": "Epoch Time", "definition": "Seconds elapsed since January 1, 1970 (UTC), the standard cross-platform timestamp representation."},
                    {"term": "Delta Time (Displayed)", "definition": "Time elapsed between the current packet and the previous packet shown under active display filters."},
                    {"term": "TCP Conversational Delta", "definition": "Time elapsed since the previous packet in the exact same TCP stream, isolating server processing or client delay."}
                ],
                "theorySections": [
                    {
                        "title": "Time Format Configurations & Forensic Use Cases",
                        "content": "View -> Time Display Format provides options: 'Date and Time of Day' (essential when correlating with SIEM syslog entries), 'Seconds Since Beginning of Capture' (for measuring relative scenario progress), and 'Seconds Since Previous Displayed Packet' (for measuring inter-packet arrival gaps).",
                        "keyPoints": [
                            "Always verify sensor clock synchronization (NTP) when comparing captures across multiple vantage points.",
                            "C2 beacons configured with low jitter exhibit tight, predictable delta timings across outbound connections."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Set Time Format to UTC Date and Time",
                        "instruction": "Click View -> Time Display Format -> Date and Time of Day (e.g., 2026-10-14 03:22:15.123456).",
                        "expectedOutcome": "The Time column updates to display absolute UTC date and microsecond timestamp."
                    },
                    {
                        "step": 2,
                        "title": "Filter for Conversational Delays",
                        "instruction": "Filter for TCP packets with delta time exceeding 5 seconds within the same conversation.",
                        "filter": "tcp.time_delta > 5.0",
                        "expectedOutcome": "Displays idle pauses or delayed responses within established TCP streams."
                    }
                ],
                "displayFilters": [
                    {"filter": "frame.time_delta < 0.001", "description": "Packets arriving within sub-millisecond bursts", "purpose": "Identify automated script traffic or volumetric floods"},
                    {"filter": "tcp.time_delta > 30 and tcp.flags.syn == 1", "description": "SYN attempts spaced by roughly 30 seconds", "purpose": "Periodic beaconing detection"}
                ],
                "expectedObservations": [
                    "Human interactive traffic (e.g. typing over SSH/Telnet) exhibits irregular deltas between 0.1s and 2.5s.",
                    "Automated bots and C2 heartbeats display consistent inter-packet arrival intervals."
                ],
                "commonMistakes": [
                    "Confusing frame.time_delta (delta across displayed packets) with tcp.time_delta (delta within stream)."
                ],
                "securityRelevance": "Adversaries add random jitter (e.g. 20% variance) to C2 communication intervals to evade naive static delta-time threshold alerts.",
                "knowledgeCheck": {
                    "question": "Which time display format should an analyst select in Wireshark when correlating PCAP events directly with external SIEM syslog records?",
                    "options": [
                        "Seconds Since Beginning of Capture",
                        "Date and Time of Day (UTC / Local)",
                        "Seconds Since Previous Captured Packet",
                        "Epoch Time in Nanoseconds"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "Date and Time of Day renders absolute calendar dates, hours, minutes, seconds, and fractional sub-seconds, enabling direct 1:1 cross-referencing with SIEM and host event logs.",
                    "difficulty": "beginner"
                },
                "summary": "Mastering timestamp formats and delta calculations allows analysts to reconstruct precise event sequences and differentiate human user activity from automated malware beaconing.",
                "furtherReading": [
                    {"title": "Wireshark User Guide — Time Display Formats", "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChAdvTimestamps.html"}
                ]
            }
        }
    ],
    "practicalLab": {
        "id": "lab-01-profile-optimization",
        "title": "Lab 01: Forensic Profile & Custom Column Optimization",
        "objective": "Build a complete forensic analysis profile with custom delta time, TCP stream, and host columns, configuring coloring rules to highlight anomalies.",
        "toolsRequired": ["Wireshark 4.x or higher"],
        "pcapSource": {
            "fileName": "Scenario 1.pcapng",
            "fileUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Scenario%201.pcapng",
            "repositoryUrl": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
            "sha256": "7c81d86d634ebbbd6174a8894101e19485bb24a0d92298e82ef45b721245b73d"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 45,
        "instructions": [
            "Create a new profile named 'Forensic-Triage'.",
            "Add TCP Stream Index (tcp.stream) and TCP Delta Time (tcp.time_delta) as columns in the packet list.",
            "Add HTTP Host (http.host) and TLS SNI (tls.handshake.extensions_server_name) as custom columns.",
            "Create a custom coloring rule for TCP Reset packets (tcp.flags.reset == 1) with dark red background.",
            "Identify the longest idle pause in TCP Stream #0."
        ],
        "tasks": [
            {"id": "task-01-1", "description": "Configure the 4 recommended custom columns", "hint": "Right-click field in packet details -> Apply as Column"},
            {"id": "task-01-2", "description": "Verify coloring rule precedence for TCP Resets", "hint": "View -> Coloring Rules -> Move to top"},
            {"id": "task-01-3", "description": "Measure peak delta time in Stream #0", "hint": "Filter tcp.stream == 0 and sort by tcp.time_delta descending"}
        ],
        "evidenceWorksheet": [
            {"field": "Custom Profile Name", "prompt": "Name of created profile:", "expectedEvidenceType": "String"},
            {"field": "Longest Delta Time in Stream 0", "prompt": "Enter the highest observed tcp.time_delta value in seconds:", "expectedEvidenceType": "Decimal seconds (e.g. 4.123456)"}
        ],
        "questions": [
            {
                "question": "What happens if a custom column field is not present in a packet (e.g., http.host in a DNS packet)?",
                "options": ["Wireshark displays an error", "The column cell remains empty", "The packet is hidden", "Wireshark crashes"],
                "correctAnswerIndex": 1,
                "explanation": "If a packet does not contain the protocol or field mapped to a custom column, Wireshark renders an empty cell for that packet without error.",
                "difficulty": "beginner"
            }
        ],
        "completionCriteria": [
            "Forensic profile created with custom columns",
            "TCP delta time analyzed and documented",
            "Coloring rules active and functional"
        ]
    },
    "quiz": {
        "title": "Module 01 Assessment: Wireshark Installation & Interface Mastery",
        "questions": [
            {
                "question": "Which Wireshark capture option should be configured to prevent exhausting system disk space during a multi-hour network capture?",
                "options": ["Promiscuous mode", "Multiple Ring Buffer Files with file count and size limits", "Monitor mode", "Capture Filter: host 127.0.0.1"],
                "correctAnswerIndex": 1,
                "explanation": "Configuring ring buffer files with max file size and file count ensures Wireshark continuously rotates through a fixed pool of capture files, bounding total disk usage.",
                "difficulty": "intermediate"
            },
            {
                "question": "Why is Npcap preferred over legacy WinPcap on modern Windows operating systems?",
                "options": ["WinPcap is paid software", "Npcap supports loopback capture, raw 802.11 monitor mode, and Windows 10/11 security models", "Npcap does not require admin privileges", "Npcap only works with Linux"],
                "correctAnswerIndex": 1,
                "explanation": "Npcap was developed to replace the obsolete WinPcap, bringing NDIS 6 driver support, loopback packet capture, and modern Windows kernel compatibility.",
                "difficulty": "intermediate"
            },
            {
                "question": "How can an analyst quickly isolate conversational pauses exceeding 10 seconds within a specific TCP conversation?",
                "options": ["frame.time_delta > 10", "tcp.time_delta > 10.0", "ip.ttl > 10", "tcp.analysis.retransmission"],
                "correctAnswerIndex": 1,
                "explanation": "The field tcp.time_delta measures elapsed time specifically between consecutive packets of the same TCP conversation stream.",
                "difficulty": "intermediate"
            }
        ]
    }
}

