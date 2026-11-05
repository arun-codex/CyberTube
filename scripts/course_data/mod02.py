MODULE_02 = {
    "id": "mod-02-packet-analysis-protocols",
    "title": "Module 02: Packet Analysis & Protocol Investigation",
    "description": "Deconstruct network conversations, master boolean and bitwise display filters, follow multi-protocol streams, and evaluate traffic volume statistics.",
    "order": 3,
    "lessons": [
        {
            "id": "les-02-1-packet-dissection-views",
            "slug": "packet-dissection-tree-byte-views",
            "title": "Packet Dissection: Packet List, Packet Details & Byte Inspector",
            "description": "Master the tripartite Wireshark interface: navigating the packet summary list, inspecting tree hierarchies in packet details, and analyzing raw hexadecimal/ASCII payload bytes.",
            "durationMinutes": 35,
            "order": 1,
            "objectives": [
                "Navigate between Packet List, Packet Details tree, and Packet Bytes views seamlessly",
                "Map decoded fields directly to raw hexadecimal offsets in the Packet Bytes pane",
                "Export selected packet bytes as raw binary, C arrays, or hex dumps for external analysis"
            ],
            "tags": ["dissection", "byte-inspector", "hex-dump", "packet-views"],
            "skillsTaught": ["Tripartite view navigation", "Hex-to-field correlation", "Raw byte extraction"],
            "richContent": {
                "introduction": "The core of Wireshark's interface is the synchronized three-pane view: Packet List (top), Packet Details (middle), and Packet Bytes (bottom). Clicking on any dissected field in the details tree immediately highlights its exact corresponding byte offset in the hexadecimal inspector.",
                "prerequisites": ["Module 01: Wireshark Mastery"],
                "keyTerminology": [
                    {"term": "Packet Details Tree", "definition": "Hierarchical dissection tree presenting decoded protocol fields, values, bitmasks, and expert info."},
                    {"term": "Packet Bytes Pane", "definition": "Lower pane displaying raw frame bytes in 16-byte rows with hexadecimal on the left and ASCII representations on the right."},
                    {"term": "Copy as As Escaped String", "definition": "Context menu command that exports highlighted bytes formatted with \\x notation for scripting."}
                ],
                "theorySections": [
                    {
                        "title": "Bitmask and Flag Dissection",
                        "content": "Many protocol fields use bitmasks where individual bits represent Boolean flags (e.g. TCP flags, IP flags, DNS flags). In the Packet Details view, expanding a flag field shows the binary bitmask (e.g. .... ..1. = Syn: Set), confirming exactly which bits on the wire triggered the dissector's interpretation.",
                        "keyPoints": [
                            "Right-clicking any field in Packet Details provides 'Apply as Filter' and 'Prepare as Filter'.",
                            "Right-clicking highlighted bytes allows exporting raw payload directly to disk as binary files."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Correlate IP Address to Hex Offset",
                        "instruction": "Open Scenario 1.pcapng, select Packet #1, expand Internet Protocol Version 4, and click Source Address.",
                        "expectedOutcome": "In the Packet Bytes pane, exactly 4 bytes (e.g., C0 A8 01 0A) are highlighted corresponding to the IPv4 address."
                    },
                    {
                        "step": 2,
                        "title": "Export Raw Packet Bytes",
                        "instruction": "Right-click the highlighted bytes in the Packet Bytes pane -> Export Packet Bytes... -> Save as payload.bin.",
                        "expectedOutcome": "Saves the raw bytes to disk without pcap encapsulation headers."
                    }
                ],
                "displayFilters": [
                    {"filter": "data.data", "description": "Filters packets that contain raw unparsed data payloads", "purpose": "Isolate unknown or custom protocol payloads"}
                ],
                "expectedObservations": [
                    "ASCII pane displays human-readable text (HTTP headers, cleartext passwords, banner strings) while binary bytes appear as dots."
                ],
                "commonMistakes": [
                    "Selecting the whole protocol header in Details and attempting to export just the payload bytes."
                ],
                "securityRelevance": "Adversaries embed encoded payloads, shellcode, and steganographic data within raw protocol padding or unparsed data fields.",
                "knowledgeCheck": {
                    "question": "When you click a field in the Packet Details pane, what visual feedback does Wireshark provide in the Packet Bytes pane?",
                    "options": [
                        "It displays an informational alert",
                        "It highlights the exact hexadecimal bytes and ASCII equivalent comprising that field",
                        "It copies the bytes to clipboard automatically",
                        "It clears the byte pane"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "Wireshark maintains bi-directional synchronization between the Details tree and the Bytes pane: clicking any dissected field highlights its raw byte range.",
                    "difficulty": "beginner"
                },
                "summary": "Proficiency in navigating and correlating Wireshark's three panes allows analysts to verify dissector output against ground-truth raw wire bytes.",
                "furtherReading": [
                    {"title": "Wireshark User Guide — The Packet Bytes Pane", "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChUIBytesView.html"}
                ]
            }
        },
        {
            "id": "les-02-2-display-filter-syntax",
            "slug": "display-filter-syntax-primitives",
            "title": "Display Filter Syntax & Primitives (Comparison, Logical, Bitwise)",
            "description": "Master advanced Wireshark display filter syntax: comparison operators (eq, ne, gt, le), boolean logic (and, or, not), string matching (matches, contains), and slice syntax.",
            "durationMinutes": 40,
            "order": 2,
            "objectives": [
                "Construct complex display filters using boolean logic and comparison operators",
                "Apply string operators (contains, matches) to search for IOCs and malware signatures",
                "Use byte slice notation (e.g. frame[0:4] == 00:11:22:33) for precision payload matching"
            ],
            "tags": ["display-filters", "boolean-logic", "regex", "slice-notation", "syntax"],
            "skillsTaught": ["Filter construction", "RegexIOC searching", "Byte slice filtering"],
            "richContent": {
                "introduction": "Display filters are the primary tool of the packet forensic analyst. Unlike capture filters which discard packets at acquisition, display filters allow non-destructive interrogation of multi-gigabyte captures, querying protocols, fields, strings, and byte offsets with microsecond precision.",
                "prerequisites": ["Lesson 2.1: Packet Dissection Views"],
                "keyTerminology": [
                    {"term": "Display Filter", "definition": "A search expression evaluated against dissected packet fields to dynamically show or hide packets without altering the underlying capture."},
                    {"term": "contains Operator", "definition": "Case-sensitive byte or string matching operator (e.g. http contains 'password')."},
                    {"term": "matches Operator", "definition": "Perl-Compatible Regular Expression (PCRE) evaluation operator (e.g. http.host matches '\\.ru$')."}
                ],
                "theorySections": [
                    {
                        "title": "Comparison Operators and the '! operator' Pitfall",
                        "content": "A common mistake in Wireshark is filtering 'ip.addr != 10.0.0.1'. Because packets have both ip.src and ip.dst, if EITHER address is not 10.0.0.1, the expression evaluates to true! To exclude 10.0.0.1 entirely, the correct expression is '!(ip.addr == 10.0.0.1)'.",
                        "keyPoints": [
                            "Equality: eq or ==, Inequality: ne or !=",
                            "Logical: and / &&, or / ||, not / !",
                            "Slice syntax: protocol[offset:length] (e.g. eth[0:3] == 00:50:56 for VMware OUIs)."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Search for Cleartext Usernames",
                        "instruction": "Apply a filter searching for authentication strings across all protocols.",
                        "filter": "frame contains \"USER \" or frame contains \"username=\"",
                        "expectedOutcome": "Isolates authentication negotiation packets in FTP, HTTP, and SMTP."
                    },
                    {
                        "step": 2,
                        "title": "Filter Using PCRE Regular Expressions",
                        "instruction": "Filter for HTTP Host headers targeting dynamic DNS domains or numeric IP host headers.",
                        "filter": "http.host matches \"^[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+$\"",
                        "expectedOutcome": "Highlights direct-to-IP HTTP requests commonly used in malware C2 and stage downloads."
                    }
                ],
                "displayFilters": [
                    {"filter": "!(ip.addr == 192.168.1.1)", "description": "Correctly excludes an IP address from both src and dst", "purpose": "Noise reduction during triage"},
                    {"filter": "tcp.port in {80, 443, 8080, 8443}", "description": "Set membership filter for web ports", "purpose": "Consolidate multi-port monitoring"},
                    {"filter": "tcp[13] & 0x02 != 0", "description": "Bitwise test for SYN flag at TCP offset 13", "purpose": "Low-level flag validation"}
                ],
                "expectedObservations": [
                    "Filter bar background turns green for valid syntax, red for invalid syntax, and yellow for valid but potentially ambiguous syntax."
                ],
                "commonMistakes": [
                    "Using 'ip.addr != X' expecting to filter out traffic involving host X.",
                    "Writing capture filter syntax (like 'port 80') in the display filter bar (which expects 'tcp.port == 80')."
                ],
                "securityRelevance": "Display filter fluency enables rapid extraction of suspicious URLs, User-Agents, command-line arguments, and exfiltrated documents from massive enterprise captures.",
                "knowledgeCheck": {
                    "question": "Why is '!(ip.addr == 10.0.0.5)' preferred over 'ip.addr != 10.0.0.5' when excluding a host from analysis?",
                    "options": [
                        "'ip.addr != 10.0.0.5' causes Wireshark to crash",
                        "'ip.addr != 10.0.0.5' matches any packet where either source OR destination is not 10.0.0.5, failing to exclude conversations involving that host",
                        "There is no difference between the two expressions",
                        "'!(ip.addr == 10.0.0.5)' only applies to IPv6"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "Because ip.addr resolves to both source and destination addresses, 'ip.addr != X' is true for virtually every packet unless BOTH source and destination are X. The negation operator '!(ip.addr == X)' properly excludes packets where either address equals X.",
                    "difficulty": "intermediate"
                },
                "summary": "Mastering comparison, regex, and slice display filter operators transforms hours of manual inspection into instantaneous, targeted forensic discovery.",
                "furtherReading": [
                    {"title": "Wireshark User Guide — Building Display Filter Expressions", "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html"}
                ]
            }
        },
        {
            "id": "les-02-3-following-streams",
            "slug": "following-tcp-udp-ssl-http-streams",
            "title": "Following TCP, UDP, SSL/TLS, and HTTP Streams",
            "description": "Reassemble fragmented network conversations, inspect full-duplex TCP/UDP streams, examine cleartext session transcripts, and extract decrypted payloads.",
            "durationMinutes": 35,
            "order": 3,
            "objectives": [
                "Reassemble bidirectional conversations using Follow TCP Stream and Follow UDP Stream",
                "Differentiate client requests (red) from server responses (blue) in stream dialogs",
                "Filter and search reconstructed streams for credentials, shell commands, and error codes"
            ],
            "tags": ["stream-reassembly", "tcp-stream", "follow-stream", "session-reconstruction"],
            "skillsTaught": ["Stream reassembly", "Conversation decoding", "Transcript export"],
            "richContent": {
                "introduction": "Individual packets represent fragments of an overall conversation. Analyzing packets in isolation often obscures the adversary's intent. Wireshark's Follow Stream engine reorders TCP segments by sequence number, handles out-of-order delivery, strips transport headers, and reconstructs the full application layer dialog.",
                "prerequisites": ["Lesson 2.2: Display Filter Syntax"],
                "keyTerminology": [
                    {"term": "TCP Stream Index", "definition": "A 0-based integer assigned by Wireshark to each unique 4-tuple TCP conversation (IP_a:Port_a <-> IP_b:Port_b)."},
                    {"term": "Full-Duplex Reassembly", "definition": "Reconstruction of both client-to-server (red) and server-to-client (blue) data streams in chronological order."}
                ],
                "theorySections": [
                    {
                        "title": "How Wireshark Reassembles Streams",
                        "content": "Wireshark tracks TCP sequence numbers and acknowledgment numbers across both directions of a stream. If packets arrive out of order or undergo retransmission, the stream follower reorders segments based on relative sequence offsets, presenting the exact contiguous byte stream presented to the application socket.",
                        "keyPoints": [
                            "Client data is styled in red by default; server responses are styled in blue.",
                            "The stream viewer allows displaying content as ASCII, Raw Hex, C Arrays, or YAML."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Follow a Web Conversation",
                        "instruction": "Right-click any HTTP packet in Scenario 1.pcapng -> Select Follow -> TCP Stream.",
                        "expectedOutcome": "The Follow TCP Stream dialog displays the full HTTP request and server HTTP response."
                    },
                    {
                        "step": 2,
                        "title": "Switch Between Streams",
                        "instruction": "In the bottom-right of the Stream window, click the Stream selector stepper to jump to Stream 1, 2, 3...",
                        "expectedOutcome": "Inspects subsequent conversations without closing the modal."
                    }
                ],
                "displayFilters": [
                    {"filter": "tcp.stream == 0", "description": "Isolates all packets belonging to TCP conversation 0", "purpose": "Focus analysis on a single conversation"},
                    {"filter": "tcp.stream eq 4 and http", "description": "Isolates HTTP traffic within stream 4", "purpose": "Target specific application exchange"}
                ],
                "expectedObservations": [
                    "Closing the Stream dialog automatically applies a filter (e.g. tcp.stream eq 0) to the main packet list."
                ],
                "commonMistakes": [
                    "Attempting to follow encrypted TLS traffic expecting cleartext ASCII without providing premaster secrets."
                ],
                "securityRelevance": "Following streams allows instant reconstruction of cleartext telnet/FTP sessions, compromised reverse shells, and adversary command execution transcripts.",
                "knowledgeCheck": {
                    "question": "In Wireshark's Follow TCP Stream window, what do the red and blue colored texts represent by default?",
                    "options": [
                        "Red = Corrupted packets, Blue = Valid packets",
                        "Red = Client-to-server traffic, Blue = Server-to-client traffic",
                        "Red = Outbound WAN traffic, Blue = Inbound LAN traffic",
                        "Red = Encrypted bytes, Blue = Cleartext bytes"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "Wireshark uses red text for data transmitted from the connection initiator (client) to the receiver, and blue text for reverse data transmitted from the receiver (server) back to the client.",
                    "difficulty": "beginner"
                },
                "summary": "Stream following reassembles fragmented packets into contiguous human-readable transcripts, exposing the complete interaction between client and server.",
                "furtherReading": [
                    {"title": "Wireshark User Guide — Following Protocol Streams", "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChAdvFollowStreamSection.html"}
                ]
            }
        },
        {
            "id": "les-02-4-protocol-hierarchy-stats",
            "slug": "protocol-hierarchy-conversations-triage",
            "title": "Protocol Hierarchy Statistics & Conversations Table Triage",
            "description": "Evaluate global PCAP metrics using the Protocol Hierarchy Statistics tree, Endpoints table, and Conversations matrix to identify top talkers and anomalous ports.",
            "durationMinutes": 30,
            "order": 4,
            "objectives": [
                "Generate and interpret the Protocol Hierarchy Statistics tree",
                "Analyze the Conversations window across Ethernet, IPv4, TCP, and UDP tabs",
                "Identify top talkers and suspicious high-volume transfers using byte and packet sorting"
            ],
            "tags": ["statistics", "protocol-hierarchy", "conversations", "endpoints", "triage"],
            "skillsTaught": ["Global triage evaluation", "Top talker isolation", "Conversations matrix filtering"],
            "richContent": {
                "introduction": "When handed a 5GB PCAP of an enterprise incident, beginning with packet-by-packet reading is impossible. Professional forensic triage begins in the Statistics menu: Protocol Hierarchy reveals the protocol composition of the capture, while the Conversations table instantly surfaces the top talkers and highest-volume exfiltration paths.",
                "prerequisites": ["Lesson 2.1: Packet Dissection Views"],
                "keyTerminology": [
                    {"term": "Protocol Hierarchy Statistics (PHS)", "definition": "A hierarchical tree showing percentages of total packets and bytes consumed by each protocol in the capture."},
                    {"term": "Conversations Window", "definition": "Matrix showing bidirectional communications between pairs of endpoints, tracking packet counts, byte volumes, and duration."}
                ],
                "theorySections": [
                    {
                        "title": "The Top-Down Forensic Triage Methodology",
                        "content": "Step 1: Open Statistics -> Protocol Hierarchy to see if unexpected protocols (IRC, BitTorrent, SSH on non-standard ports) are present. Step 2: Open Statistics -> Conversations -> IPv4 / TCP, and sort by Bytes descending to identify top data transfers. Step 3: Right-click suspicious conversations and select 'Apply as Filter -> Selected' to isolate them in the main view.",
                        "keyPoints": [
                            "Look for high byte volume coupled with low packet count (large payload transfers).",
                            "Look for high packet count coupled with low byte volume (scanning or flood attacks)."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Open Protocol Hierarchy",
                        "instruction": "Click Statistics -> Protocol Hierarchy.",
                        "expectedOutcome": "Tree view displays % of Packets, % of Bytes, and Protocol breakdown."
                    },
                    {
                        "step": 2,
                        "title": "Identify Top Conversations",
                        "instruction": "Click Statistics -> Conversations -> Click IPv4 tab -> Click 'Bytes' column header to sort descending.",
                        "expectedOutcome": "The highest-volume IP communication pair appears at the top of the table."
                    }
                ],
                "displayFilters": [
                    {"filter": "ip.src == 10.0.0.1 && ip.dst == 192.168.1.1", "description": "Isolates conversation between top talker pair", "purpose": "Focus on high-volume session"}
                ],
                "expectedObservations": [
                    "A sudden surge in 'Data' under TCP in Protocol Hierarchy indicates non-standard or unparsed application protocols."
                ],
                "commonMistakes": [
                    "Failing to check the 'Limit to display filter' checkbox in Statistics windows when working with filtered captures."
                ],
                "securityRelevance": "Exfiltration channels and C2 bulk downloads immediately stand out in the Conversations table as high-volume anomalies compared to baseline enterprise traffic.",
                "knowledgeCheck": {
                    "question": "Which Wireshark statistical tool provides an immediate percentage breakdown of all protocols present across an entire capture file?",
                    "options": ["Conversations Table", "Protocol Hierarchy Statistics", "IO Graphs", "Flow Graph"],
                    "correctAnswerIndex": 1,
                    "explanation": "Statistics -> Protocol Hierarchy generates a tree structure displaying the percentage and absolute counts of packets and bytes consumed by every detected protocol.",
                    "difficulty": "beginner"
                },
                "summary": "Protocol Hierarchy and Conversations tables provide the essential 30,000-foot view of an incident capture, directing investigators to the top data transfers and anomalous services.",
                "furtherReading": [
                    {"title": "Wireshark User Guide — Statistical Windows", "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChStatHierarchy.html"}
                ]
            }
        },
        {
            "id": "les-02-5-io-graphs-rtt",
            "slug": "io-graphs-throughput-rtt-analysis",
            "title": "IO Graphs, Throughput Trends & Round-Trip Time (RTT) Graphing",
            "description": "Construct multi-series IO Graphs, plot network throughput spikes, analyze Round-Trip Time (RTT) trends, and visually pinpoint denial-of-service surges.",
            "durationMinutes": 35,
            "order": 5,
            "objectives": [
                "Build multi-series IO Graphs plotting packets/sec and bits/sec over capture timelines",
                "Plot TCP Round-Trip Time (RTT) and Stevens sequence graphs",
                "Visually correlate network latency spikes with packet drop and retransmissions"
            ],
            "tags": ["io-graphs", "throughput", "rtt", "latency", "traffic-spikes"],
            "skillsTaught": ["IO graph plotting", "Throughput spike detection", "RTT trend evaluation"],
            "richContent": {
                "introduction": "Visual representations often reveal patterns invisible in tabular packet lists. Wireshark's IO Graphs tool allows plotting multiple simultaneous data series (e.g. Total Traffic vs. TCP Resets vs. Port 80 bytes) over microsecond or second intervals, instantly exposing volumetric floods and latency anomalies.",
                "prerequisites": ["Lesson 2.4: Protocol Hierarchy & Conversations"],
                "keyTerminology": [
                    {"term": "IO Graph", "definition": "A time-series visualization tool in Wireshark plotting packet rates, byte throughput, or specific field values over the capture timeline."},
                    {"term": "Round-Trip Time (RTT)", "definition": "The elapsed duration required for a data segment to be transmitted and its acknowledgment returned from the remote peer."}
                ],
                "theorySections": [
                    {
                        "title": "Configuring Multi-Filter Visual Comparisons",
                        "content": "By creating Graph 1 with no filter (Total Packets), Graph 2 with 'tcp.flags.reset == 1' (Resets), and Graph 3 with 'http' (Web traffic), an investigator can see exactly when a server failure occurred and how it impacted legitimate application sessions.",
                        "keyPoints": [
                            "Set Y-axis to 'Bytes/Tick' or 'Bits/Tick' to evaluate bandwidth consumption.",
                            "Clicking any point on the graph line navigates the main packet list directly to the nearest packet in time."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Open IO Graphs",
                        "instruction": "Click Statistics -> I/O Graphs.",
                        "expectedOutcome": "Opens the IO Graphs window displaying default total packet throughput."
                    },
                    {
                        "step": 2,
                        "title": "Add a Second Graph for TCP Errors",
                        "instruction": "Click '+' -> Name it 'TCP Resets' -> Display Filter: tcp.flags.reset == 1 -> Color: Red.",
                        "expectedOutcome": "Plots TCP reset occurrences directly over total network traffic."
                    }
                ],
                "displayFilters": [
                    {"filter": "tcp.analysis.retransmission", "description": "Graph packet retransmissions over time", "purpose": "Measure network degradation and packet loss"}
                ],
                "expectedObservations": [
                    "A sudden sharp spike in the all-packets line accompanied by a collapse in HTTP throughput indicates a volumetric Denial of Service event."
                ],
                "commonMistakes": [
                    "Setting the time interval (X-axis tick) too wide (e.g. 1 min for a 30-sec burst), hiding transient micro-bursts."
                ],
                "securityRelevance": "IO Graphs visually confirm DoS attack onset and conclusion times, identify periodic beaconing rhythms, and document data exfiltration burst velocity.",
                "knowledgeCheck": {
                    "question": "What happens in Wireshark when you click directly on a peak or data point in an IO Graph?",
                    "options": [
                        "The graph resets",
                        "Wireshark jumps to and selects the packet corresponding to that exact timestamp in the main Packet List",
                        "The graph exports to PDF",
                        "The packet is deleted"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "Clicking any point on an IO Graph immediately synchronizes the main Wireshark interface, selecting the packet closest to that timestamp.",
                    "difficulty": "intermediate"
                },
                "summary": "IO Graphs and RTT visualizations translate millions of packet records into clear visual trends, accelerating the identification of traffic anomalies and incident timelines.",
                "furtherReading": [
                    {"title": "Wireshark User Guide — The IO Graphs Window", "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChStatIOGraphs.html"}
                ]
            }
        }
    ],
    "practicalLab": {
        "id": "lab-02-filter-troubleshooting",
        "title": "Lab 02: Protocol Breakdown & Display Filter Troubleshooting",
        "objective": "Use Protocol Hierarchy and Conversations to identify top talkers in Scenario 1, construct advanced display filters, and reassemble cleartext web sessions.",
        "toolsRequired": ["Wireshark 4.x or higher"],
        "pcapSource": {
            "fileName": "Scenario 1.pcapng",
            "fileUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Scenario%201.pcapng",
            "repositoryUrl": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
            "sha256": "7c81d86d634ebbbd6174a8894101e19485bb24a0d92298e82ef45b721245b73d"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 50,
        "instructions": [
            "Open Scenario 1.pcapng in Wireshark.",
            "Open Protocol Hierarchy and identify the top application layer protocol by byte volume.",
            "In the Conversations window, identify the IP pair with the highest transferred byte count.",
            "Follow the TCP stream of that conversation and extract any requested URIs or server responses.",
            "Create an IO Graph plotting overall traffic against TCP retransmissions."
        ],
        "tasks": [
            {"id": "task-02-1", "description": "Identify top application protocol in Protocol Hierarchy", "hint": "Statistics -> Protocol Hierarchy"},
            {"id": "task-02-2", "description": "Identify top IP talker pair", "hint": "Statistics -> Conversations -> IPv4"},
            {"id": "task-02-3", "description": "Follow TCP stream and copy the HTTP User-Agent", "hint": "Right-click -> Follow -> TCP Stream"}
        ],
        "evidenceWorksheet": [
            {"field": "Top Application Protocol", "prompt": "Name of top L7 protocol by byte volume:", "expectedEvidenceType": "String (e.g. TLS, HTTP, DNS)"},
            {"field": "Top IP Conversation Bytes", "prompt": "Total bytes transferred between the top IP pair:", "expectedEvidenceType": "Integer byte count"},
            {"field": "Observed HTTP User-Agent", "prompt": "User-Agent string observed in Stream:", "expectedEvidenceType": "String"}
        ],
        "questions": [
            {
                "question": "What is the primary benefit of following a TCP stream over reading individual packets?",
                "options": [
                    "It bypasses all encryption",
                    "It reassembles out-of-order segments and presents the full contiguous conversation transcript",
                    "It calculates cryptographic hashes",
                    "It modifies the packet capture"
                ],
                "correctAnswerIndex": 1,
                "explanation": "Stream following reorders segments according to sequence numbers, strips headers, and delivers the full reconstructed application data.",
                "difficulty": "beginner"
            }
        ],
        "completionCriteria": [
            "Protocol hierarchy documented",
            "Top talkers isolated and confirmed",
            "Stream reassembly completed and evidence recorded"
        ]
    },
    "quiz": {
        "title": "Module 02 Assessment: Packet Analysis & Protocol Investigation",
        "questions": [
            {
                "question": "Which display filter syntax correctly finds packets containing the literal string 'cmd.exe' anywhere in the packet?",
                "options": ["frame contains \"cmd.exe\"", "ip.payload == \"cmd.exe\"", "tcp.string == cmd.exe", "find(\"cmd.exe\")"],
                "correctAnswerIndex": 0,
                "explanation": "The 'frame contains' operator conducts a case-sensitive search for the specified string across the entire frame.",
                "difficulty": "beginner"
            },
            {
                "question": "What happens in the Conversations window if you sort by the 'Packets' column descending during a DDoS investigation?",
                "options": [
                    "The top talkers generating the highest packet frequency appear at the top",
                    "Wireshark filters for HTTP packets",
                    "The capture file is sorted on disk",
                    "Packets are grouped by MAC address"
                ],
                "correctAnswerIndex": 0,
                "explanation": "Sorting by Packets descending instantly bubbles up high-frequency conversations, highlighting SYN floods, UDP storms, or aggressive port scans.",
                "difficulty": "intermediate"
            },
            {
                "question": "What is the primary purpose of applying a byte slice filter like 'tcp[0:2] == 0x1f90'?",
                "options": [
                    "To match specific raw hexadecimal bytes at an exact offset in the TCP header (port 8080)",
                    "To delete the first two bytes of TCP",
                    "To compress the TCP header",
                    "To convert the packet to text"
                ],
                "correctAnswerIndex": 0,
                "explanation": "Slice notation protocol[offset:length] enables precise low-level matching of raw bytes, such as checking specific header fields or magic bytes.",
                "difficulty": "advanced"
            }
        ]
    }
}

