MODULE_06 = {
    "id": "mod-06-command-line-network-forensics",
    "title": "Module 06: Command-Line Network Forensics",
    "description": "Automate large-scale PCAP triage using TShark, extract specific header fields for SIEM ingestion, slice captures with editcap, and script IOC sweeps.",
    "order": 7,
    "lessons": [
        {
            "id": "les-06-1-intro-tshark",
            "slug": "introduction-to-tshark-cli-forensics",
            "title": "Introduction to TShark: CLI Packet Dissection & Filter Automation",
            "description": "Master TShark, the terminal-based network protocol analyzer. Execute headless packet captures, apply display filters on the command line, and process multi-gigabyte captures efficiently.",
            "durationMinutes": 35,
            "order": 1,
            "objectives": [
                "Execute headless packet inspection using TShark command-line arguments",
                "Apply capture filters (-f) and display filters (-Y) from terminal environments",
                "Integrate TShark into automated SOC alert response pipelines"
            ],
            "tags": ["tshark", "cli", "command-line", "headless-analysis", "automation"],
            "skillsTaught": ["TShark CLI navigation", "Terminal filter execution", "Headless triage"],
            "richContent": {
                "introduction": "While Wireshark's GUI is unmatched for visual exploration, it struggles when analyzing 50-gigabyte captures across remote headless Linux sensors. TShark is the command-line equivalent of Wireshark, sharing the exact same dissection engine, display filter syntax, and Wiretap libraries, but operating with minimal memory overhead.",
                "prerequisites": ["Module 02: Packet Analysis & Protocol Investigation"],
                "keyTerminology": [
                    {"term": "TShark", "definition": "The terminal-oriented version of Wireshark designed for automated scripts, remote SSH sessions, and pipeline integration."},
                    {"term": "-r flag", "definition": "Reads an existing capture file (e.g. tshark -r capture.pcap)."},
                    {"term": "-Y flag", "definition": "Specifies a Wireshark display filter to evaluate against packets (e.g. tshark -r file.pcap -Y 'http')."}
                ],
                "theorySections": [
                    {
                        "title": "TShark Command Syntax Essentials",
                        "content": "A typical TShark command combines input specification (-r file.pcapng), display filtering (-Y 'display_filter'), output formatting (-T fields), and specific field selection (-e ip.src -e ip.dst). Because TShark processes packets in a single stream pass, it uses a fraction of the RAM required by the graphical interface.",
                        "keyPoints": [
                            "Use -q (quiet) to suppress default packet summaries when generating statistical reports.",
                            "Use -c <count> to limit the number of processed packets during testing."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Run Basic TShark Packet Summary",
                        "instruction": "Open terminal and run tshark on Scenario 1.",
                        "filter": "tshark -r \"Scenario 1.pcapng\" -c 5",
                        "expectedOutcome": "Prints a 1-line summary for the first 5 packets matching Wireshark's default columns."
                    },
                    {
                        "step": 2,
                        "title": "Filter for DNS Queries in Terminal",
                        "instruction": "Execute TShark with display filter -Y to isolate DNS queries.",
                        "filter": "tshark -r \"Scenario 1.pcapng\" -Y \"dns.flags.response == 0\" -c 10",
                        "expectedOutcome": "Prints only DNS request frames directly to stdout."
                    }
                ],
                "displayFilters": [
                    {"filter": "tshark -r capture.pcap -Y \"tcp.flags.reset == 1\"", "description": "CLI command to list all reset packets", "purpose": "Rapid terminal error check"}
                ],
                "expectedObservations": [
                    "TShark outputs standard ANSI text suitable for piping into grep, awk, sort, and uniq."
                ],
                "commonMistakes": [
                    "Using -R (read filter) instead of -Y (display filter) in modern Wireshark 4.x versions."
                ],
                "securityRelevance": "TShark is the foundation of automated threat detection scripts running in Linux SOC environments and cloud container clusters.",
                "knowledgeCheck": {
                    "question": "Which TShark command-line option specifies a Wireshark display filter for filtering packets from a file?",
                    "options": ["-f", "-Y", "-d", "-s"],
                    "correctAnswerIndex": 1,
                    "explanation": "The -Y option specifies a display filter (evaluated post-dissection), while -f specifies a BPF capture filter (evaluated pre-capture).",
                    "difficulty": "beginner"
                },
                "summary": "TShark delivers the full analytical power of Wireshark directly to the terminal, enabling headless, automated forensic workflows.",
                "furtherReading": [
                    {"title": "Wireshark Man Pages — TShark", "url": "https://www.wireshark.org/docs/man-pages/tshark.html"}
                ]
            }
        },
        {
            "id": "les-06-2-tshark-field-extraction",
            "slug": "tshark-batch-processing-field-extraction",
            "title": "High-Speed Batch Processing, Field Extraction (-T fields) & CSV Output",
            "description": "Extract specific protocol fields using TShark's -T fields engine, export structured CSV/JSON data, and pipe packet metadata into external analysis tools.",
            "durationMinutes": 35,
            "order": 2,
            "objectives": [
                "Extract granular fields using -T fields -e <field_name> syntax",
                "Export clean CSV, TSV, and JSON formatted records for SIEM ingestion",
                "Chain TShark with Linux utilities (sort, uniq -c, awk) to compute top talker statistics"
            ],
            "tags": ["tshark", "field-extraction", "csv-export", "json-output", "automation"],
            "skillsTaught": ["Field extraction scripting", "JSON/CSV formatting", "Command-line aggregation"],
            "richContent": {
                "introduction": "The true forensic superpower of TShark is targeted field extraction (-T fields). Instead of dumping full packet text, analysts specify the exact fields of interest (e.g. timestamp, source IP, DNS query, HTTP user-agent) and format the output as tab-delimited or comma-separated values for instant bash parsing.",
                "prerequisites": ["Lesson 6.1: Introduction to TShark"],
                "keyTerminology": [
                    {"term": "-T fields", "definition": "TShark output format mode that outputs only explicitly specified field values."},
                    {"term": "-e <field>", "definition": "Specifies a protocol field name to output (can be repeated multiple times)."},
                    {"term": "-E header=y", "definition": "Includes a header line displaying field names in the output table."}
                ],
                "theorySections": [
                    {
                        "title": "Precision Field Extraction Pipelines",
                        "content": "To extract all queried domain names from a capture and find the top 5 requested domains: `tshark -r capture.pcapng -Y 'dns.flags.response == 0' -T fields -e dns.qry.name | sort | uniq -c | sort -nr | head -5`. This single line replaces minutes of GUI navigation.",
                        "keyPoints": [
                            "Use -E separator=, to output standard comma-separated values (CSV).",
                            "Use -T json to output rich JSON objects containing full dissection trees for Python parsing."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Extract TLS SNI Domains to CSV",
                        "instruction": "Run TShark to extract timestamps, source IPs, and TLS SNI hostnames.",
                        "filter": "tshark -r \"Scenario 1.pcapng\" -Y \"tls.handshake.extensions_server_name\" -T fields -e frame.time -e ip.src -e tls.handshake.extensions_server_name -E header=y -E separator=,",
                        "expectedOutcome": "Prints a clean CSV table of all outbound TLS domain connections."
                    }
                ],
                "displayFilters": [
                    {"filter": "tshark -r capture.pcap -Y \"http.request\" -T fields -e ip.src -e http.host -e http.request.uri", "description": "Extract all HTTP requests as tabular data", "purpose": "Web traffic audit"}
                ],
                "expectedObservations": [
                    "Instant generation of tabular data ready for import into spreadsheets, databases, or Splunk."
                ],
                "commonMistakes": [
                    "Forgetting quotation marks around display filters containing special characters like spaces, quotes, or ampersands."
                ],
                "securityRelevance": "Fast field extraction allows analysts to sweep 50 PCAPs for a single suspicious domain or hash in seconds.",
                "knowledgeCheck": {
                    "question": "Which TShark option specifies individual field names to display when using '-T fields' mode?",
                    "options": ["-f", "-e", "-i", "-s"],
                    "correctAnswerIndex": 1,
                    "explanation": "The -e flag is used to specify field names (e.g. -e ip.src -e ip.dst). Each -e flag creates an additional column in the output.",
                    "difficulty": "beginner"
                },
                "summary": "TShark's -T fields capability enables forensic investigators to extract high-fidelity telemetry and pipe structured data directly into automated analysis tools.",
                "furtherReading": [
                    {"title": "TShark Documentation — Output Options", "url": "https://www.wireshark.org/docs/man-pages/tshark.html#output-options"}
                ]
            }
        },
        {
            "id": "les-06-3-cli-utilities-capinfos",
            "slug": "wireshark-cli-utilities-editcap-mergecap",
            "title": "Wireshark Command-Line Utilities: capinfos, editcap, and mergecap",
            "description": "Master the companion CLI tool suite bundled with Wireshark: capinfos for capture metadata, editcap for slicing and time-shifting, and mergecap for combining PCAPs.",
            "durationMinutes": 35,
            "order": 3,
            "objectives": [
                "Generate cryptographic checksums and statistical metrics using capinfos",
                "Slice large captures by packet count or timestamp range using editcap",
                "Combine multiple sensor captures into chronological order using mergecap"
            ],
            "tags": ["capinfos", "editcap", "mergecap", "pcap-slicing", "cli-utilities"],
            "skillsTaught": ["Capture metadata reporting", "PCAP slicing", "Multi-sensor file merging"],
            "richContent": {
                "introduction": "Beyond Wireshark and TShark, the Wireshark distribution includes powerful standalone utility binaries: `capinfos` (instant capture statistics), `editcap` (packet slicing, trimming, and time-shifting), and `mergecap` (chronological consolidation of multiple captures). Mastering these utilities solves common data management hurdles.",
                "prerequisites": ["Lesson 6.1: Introduction to TShark"],
                "keyTerminology": [
                    {"term": "capinfos", "definition": "CLI tool that prints detailed metadata (packet count, byte size, start/end time, data rate, hashes) without reading whole packet trees."},
                    {"term": "editcap", "definition": "CLI tool used to select specific packet ranges, strip encapsulation, adjust timestamps, or split large captures into manageable chunks."},
                    {"term": "mergecap", "definition": "CLI tool that merges multiple capture files into a single chronologically sorted output PCAP."}
                ],
                "theorySections": [
                    {
                        "title": "Practical Forensics with editcap and mergecap",
                        "content": "If an incident occurred between 04:00 and 04:15 UTC within a 24-hour capture, running `editcap -A '2026-10-14 04:00:00' -B '2026-10-14 04:15:00' full_day.pcap incident_window.pcap` extracts only the relevant 15 minutes, reducing file size by 98%.",
                        "keyPoints": [
                            "editcap -c <max_packets> splits a huge capture into sequential chunks.",
                            "mergecap -w combined.pcapng file1.pcap file2.pcap merges multi-sensor captures."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Inspect Capture Metadata with capinfos",
                        "instruction": "Run capinfos on Scenario 2.",
                        "filter": "capinfos \"Scenario 2.pcap\"",
                        "expectedOutcome": "Displays file size, start time, end time, duration, packet count, and average packet rate."
                    },
                    {
                        "step": 2,
                        "title": "Extract First 100 Packets with editcap",
                        "instruction": "Extract packets 1 through 100 into a sample capture.",
                        "filter": "editcap -r \"Scenario 2.pcap\" sample_100.pcap 1-100",
                        "expectedOutcome": "Creates sample_100.pcap containing only the specified packet slice."
                    }
                ],
                "displayFilters": [
                    {"filter": "capinfos -c -d -u \"Scenario 1.pcapng\"", "description": "Prints packet count, duration, and data rate", "purpose": "Quick scriptable metrics"}
                ],
                "expectedObservations": [
                    "capinfos completes in milliseconds even on large captures by reading PCAP file block headers directly."
                ],
                "commonMistakes": [
                    "Using mergecap on files with unsynchronized system clocks, creating interleaving timestamp errors."
                ],
                "securityRelevance": "Trimming multi-gigabyte captures down to targeted incident windows makes evidence transfer, team sharing, and automated sandbox analysis feasible.",
                "knowledgeCheck": {
                    "question": "Which command-line utility bundled with Wireshark is designed to extract a specific timestamp window from a large capture file?",
                    "options": ["capinfos", "editcap", "mergecap", "reordercap"],
                    "correctAnswerIndex": 1,
                    "explanation": "The editcap utility provides the -A (start time) and -B (stop time) options to slice specific time intervals from large capture files.",
                    "difficulty": "intermediate"
                },
                "summary": "The Wireshark utility suite (capinfos, editcap, mergecap) provides high-performance metadata extraction, capture slicing, and chronological consolidation.",
                "furtherReading": [
                    {"title": "Wireshark Man Pages — editcap", "url": "https://www.wireshark.org/docs/man-pages/editcap.html"},
                    {"title": "Wireshark Man Pages — mergecap", "url": "https://www.wireshark.org/docs/man-pages/mergecap.html"}
                ]
            }
        },
        {
            "id": "les-06-4-automating-ioc-hunting",
            "slug": "automating-ioc-hunting-pcap-scripting",
            "title": "Automating IOC Hunting & Forensic PCAP Scripting (Bash & Python)",
            "description": "Develop automated threat hunting scripts using Bash and Python (pyshark / scapy), sweeping directory trees of PCAPs for threat indicators and exporting forensic findings.",
            "durationMinutes": 35,
            "order": 4,
            "objectives": [
                "Author Bash scripts using TShark pipelines to sweep PCAP directories for malicious IOCs",
                "Parse packet structures programmatically using Python and PyShark",
                "Automate extraction of file hashes, URLs, and external IP connections for SIEM reporting"
            ],
            "tags": ["scripting", "python", "pyshark", "bash", "threat-hunting"],
            "skillsTaught": ["Automated IOC sweeps", "Python pyshark parsing", "Batch pipeline development"],
            "richContent": {
                "introduction": "When a new threat intelligence report releases 50 adversary domain names, IP addresses, and file hashes, checking each PCAP manually in the GUI is inefficient. By combining TShark with Bash scripts or Python libraries like PyShark, investigators can scan terabytes of historical PCAPs automatically and alert on matches.",
                "prerequisites": ["Lesson 6.2: TShark Field Extraction"],
                "keyTerminology": [
                    {"term": "PyShark", "definition": "A Python wrapper for TShark that exposes Wireshark's protocol dissectors as Python object trees."},
                    {"term": "IOC Sweep", "definition": "Automated matching of known Indicators of Compromise (IPs, hashes, domains) against network data repositories."}
                ],
                "theorySections": [
                    {
                        "title": "Building a Bash TShark Threat Hunting Pipeline",
                        "content": "A simple Bash loop can iterate across all .pcap files in an evidence directory: `for f in *.pcapng; do tshark -r \"$f\" -Y 'dns.qry.name in {\"evil.com\", \"c2.xyz\"}' -T fields -e frame.time -e ip.src -e dns.qry.name; done`. When a match is found, the timestamp and infected client IP are immediately output to the screen.",
                        "keyPoints": [
                            "Combine TShark field extraction with grep -F -f ioc_list.txt for high-speed IOC lookups.",
                            "Use Python PyShark when complex multi-packet state tracking or custom scoring logic is required."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Write a 1-Line IOC Sweeper",
                        "instruction": "Test a bash one-liner searching for external IP connections to a target IOC IP across your captures.",
                        "filter": "tshark -r \"Hackers on the Network.pcapng\" -Y \"ip.dst == 198.51.100.25\" -T fields -e frame.time -e ip.src -e ip.dst",
                        "expectedOutcome": "Lists all matching outbound connections with exact timestamps."
                    }
                ],
                "displayFilters": [
                    {"filter": "tshark -r file.pcap -Y \"http.request.uri contains \".php\"\" -T fields -e ip.src -e http.host -e http.request.uri", "description": "Automated web probe extraction", "purpose": "Scriptable web audit"}
                ],
                "expectedObservations": [
                    "Scripting completes analysis in seconds without opening GUI windows or consuming graphics memory."
                ],
                "commonMistakes": [
                    "Loading entire multi-gigabyte PCAPs into memory with Python Scapy; always stream with TShark or PyShark FileCapture iterator."
                ],
                "securityRelevance": "Scripted IOC sweeps bridge network forensic evidence directly into automated SIEM alerting and SOAR containment playbooks.",
                "knowledgeCheck": {
                    "question": "Why is streaming packets via TShark or PyShark FileCapture preferred over loading entire captures into Python memory with tools like Scapy rdpcap()?",
                    "options": [
                        "rdpcap() loads all raw packets into system RAM simultaneously, causing Out-Of-Memory (OOM) crashes on large captures",
                        "Scapy does not support IPv4",
                        "TShark cannot read pcap files",
                        "Python cannot parse network bytes"
                    ],
                    "correctAnswerIndex": 0,
                    "explanation": "Loading entire multi-gigabyte PCAP files into Python memory objects via rdpcap() quickly exhausts available system RAM. Streaming packets sequentially via TShark or PyShark maintains minimal memory footprint.",
                    "difficulty": "intermediate"
                },
                "summary": "Automating network forensic triage through Bash and Python scripts scales investigative capabilities from single PCAP inspection to enterprise-wide continuous threat hunting.",
                "furtherReading": [
                    {"title": "PyShark GitHub Repository", "url": "https://github.com/KimiNewt/pyshark"}
                ]
            }
        }
    ],
    "practicalLab": {
        "id": "lab-06-tshark-pipeline",
        "title": "Lab 06: Headless TShark Pipeline & Automated Field Extraction",
        "objective": "Use TShark to headlessly process Scenario 2 PCAP, extract all FTP authentication attempts as CSV, slice the attack window with editcap, and verify metadata with capinfos.",
        "toolsRequired": ["TShark CLI", "capinfos", "editcap"],
        "pcapSource": {
            "fileName": "Scenario 2.pcap",
            "fileUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Scenario%202.pcap",
            "repositoryUrl": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
            "sha256": "3d8a57e3240212f43cbffbe2d625d9921606d2c4187e14be26f5d52ad5813b35"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 50,
        "instructions": [
            "Open your terminal in the directory containing Scenario 2.pcap.",
            "Run capinfos to record total packet count and file duration.",
            "Execute TShark with -T fields to extract timestamps, source IPs, and FTP commands.",
            "Use editcap to carve the first 50 packets into a new capture file.",
            "Verify the carved file packet count with capinfos."
        ],
        "tasks": [
            {"id": "task-06-1", "description": "Execute capinfos on Scenario 2.pcap", "hint": "capinfos \"Scenario 2.pcap\""},
            {"id": "task-06-2", "description": "Extract FTP USER and PASS packets with TShark", "hint": "tshark -r \"Scenario 2.pcap\" -Y \"ftp.command\" -T fields -e ip.src -e ftp.command -e ftp.command_arg"},
            {"id": "task-06-3", "description": "Slice first 50 packets with editcap", "hint": "editcap -r \"Scenario 2.pcap\" slice.pcap 1-50"}
        ],
        "evidenceWorksheet": [
            {"field": "capinfos Total Packets", "prompt": "Packet count reported by capinfos:", "expectedEvidenceType": "Integer count"},
            {"field": "Extracted FTP Command Argument", "prompt": "Argument passed to USER command in TShark output:", "expectedEvidenceType": "String username"},
            {"field": "Sliced File Packet Count", "prompt": "Verified packet count of sliced PCAP:", "expectedEvidenceType": "Integer count (50)"}
        ],
        "questions": [
            {
                "question": "What flag in TShark includes a header row displaying field names in the output table?",
                "options": ["-E header=y", "-H", "-v", "--title"],
                "correctAnswerIndex": 0,
                "explanation": "The -E header=y option includes column headers naming each extracted field in the terminal output.",
                "difficulty": "beginner"
            }
        ],
        "completionCriteria": [
            "Metadata extracted with capinfos",
            "TShark field extraction pipeline executed successfully",
            "PCAP slicing completed with editcap"
        ]
    },
    "quiz": {
        "title": "Module 06 Assessment: Command-Line Network Forensics",
        "questions": [
            {
                "question": "Which TShark option specifies the input capture file to be analyzed?",
                "options": ["-i", "-r", "-w", "-f"],
                "correctAnswerIndex": 1,
                "explanation": "The -r option tells TShark to read from an existing file on disk, while -i specifies a live network interface.",
                "difficulty": "beginner"
            },
            {
                "question": "Which utility from the Wireshark suite is specifically designed to merge multiple capture files chronologically into a single output file?",
                "options": ["mergecap", "editcap", "reordercap", "capinfos"],
                "correctAnswerIndex": 0,
                "explanation": "mergecap combines multiple input capture files into a single output file, preserving the chronological sequence of packets based on their timestamps.",
                "difficulty": "beginner"
            },
            {
                "question": "In a TShark field extraction command, what does the '-T fields' argument accomplish?",
                "options": [
                    "It displays packet field definitions in XML",
                    "It configures TShark to output only the specific fields specified by -e options",
                    "It limits processing to 10 fields per packet",
                    "It clears all display filters"
                ],
                "correctAnswerIndex": 1,
                "explanation": "The '-T fields' format directs TShark to output only the specific protocol fields selected using '-e <fieldname>', formatted as tabular text.",
                "difficulty": "beginner"
            }
        ]
    }
}

