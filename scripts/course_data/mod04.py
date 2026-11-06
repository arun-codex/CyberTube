MODULE_04 = {
    "id": "mod-04-malware-traffic-analysis",
    "title": "Module 04: Malware Traffic Analysis",
    "description": "Analyze multi-stage malware delivery, C2 beaconing frequencies, domain generation algorithms (DGAs), and DNS exfiltration techniques.",
    "order": 5,
    "lessons": [
        {
            "id": "les-04-1-malware-delivery-c2",
            "slug": "malware-delivery-exploitation-c2",
            "title": "Malware Delivery Mechanics: Phishing, Exploitation & Command-and-Control (C2)",
            "description": "Examine the technical stages of network-borne malware: malicious URL clicks, exploit kit redirections, secondary payload drops, and C2 check-in handshakes.",
            "durationMinutes": 40,
            "order": 1,
            "objectives": [
                "Deconstruct the multi-stage network lifecycle of commodity and advanced malware",
                "Trace HTTP 302 redirections and malicious Referer headers leading to payload delivery",
                "Analyze HTTP POST and GET check-in requests used by initial stage implants"
            ],
            "tags": [
                "malware-analysis",
                "c2",
                "delivery-mechanics",
                "exploit-kits",
                "http-traffic"
            ],
            "skillsTaught": [
                "Redirection chain tracing",
                "HTTP payload drop analysis",
                "C2 check-in identification"
            ],
            "richContent": {
                "introduction": "Modern cyber attacks rarely deliver monolithic payloads in a single packet. Instead, adversaries use multi-stage infection funnels: an initial lure (phishing email link) triggers an HTTP 302 redirection chain, landing on an exploit delivery server that delivers a lightweight stage-0 loader, which then connects to Command-and-Control (C2) infrastructure to download stage-1 implants.",
                "prerequisites": [
                    "Module 03: Advanced Wireshark Investigation Workflow"
                ],
                "keyTerminology": [
                    {
                        "term": "Command-and-Control (C2)",
                        "definition": "Infrastructure controlled by an attacker used to send commands to compromised systems and receive exfiltrated data."
                    },
                    {
                        "term": "Stager vs. Stageless",
                        "definition": "A stager is a tiny loader that connects back to retrieve the full payload; a stageless binary contains all functionality embedded directly."
                    },
                    {
                        "term": "Referer Header",
                        "definition": "HTTP request header indicating the originating web page that linked to the requested resource, critical for mapping infection chains."
                    }
                ],
                "theorySections": [
                    {
                        "title": "Mapping the Redirection and Delivery Chain",
                        "content": "In Wireshark, filtering for 'http.response.code in {301, 302, 303, 307}' exposes redirect jumps. Examining the 'Location' response header and matching it with the subsequent request's 'Referer' header allows investigators to reconstruct the exact path from innocent browsing to compromised droplet.",
                        "keyPoints": [
                            "Watch for mismatched User-Agents between browser clicks and binary downloads (e.g. Curl or PowerShell User-Agent).",
                            "Look for Base64-encoded strings in HTTP POST bodies and cookie parameters representing victim machine telemetry."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Filter for Web Redirections and Downloads",
                        "instruction": "Filter for all HTTP requests and redirections in sequence.",
                        "filter": "http.request or http.response.code in {301, 302, 307}",
                        "expectedOutcome": "Lists chronologically all web queries and server redirection responses."
                    },
                    {
                        "step": 2,
                        "title": "Inspect Suspicious POST Requests",
                        "instruction": "Filter for outbound HTTP POST requests to isolate victim registration and check-in packets.",
                        "filter": "http.request.method == \"POST\"",
                        "expectedOutcome": "Displays client telemetry submissions to remote servers."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "http.request.uri contains \".exe\" or http.request.uri contains \".dll\"",
                        "description": "Detects cleartext executable file downloads",
                        "purpose": "Locate stage downloads"
                    },
                    {
                        "filter": "http.user_agent contains \"PowerShell\" or http.user_agent contains \"Wget\"",
                        "description": "Identifies script-based programmatic downloads",
                        "purpose": "Detect automated loader activity"
                    }
                ],
                "expectedObservations": [
                    "Adversaries frequently use random alphanumeric URIs (e.g. /gate.php, /api/v1/update?id=82736) for C2 check-ins."
                ],
                "commonMistakes": [
                    "Assuming all C2 traffic is encrypted; many commodity loaders still use cleartext HTTP or custom encoded TCP streams."
                ],
                "securityRelevance": "Documenting the complete delivery chain identifies both initial phishing infrastructure and persistent C2 servers for enterprise firewall blacklisting.",
                "knowledgeCheck": {
                    "question": "Which HTTP request header reveals the originating web page that redirected or linked a victim to a malicious download URL?",
                    "options": [
                        "User-Agent",
                        "Referer",
                        "Host",
                        "Accept-Encoding"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "The HTTP Referer header contains the address of the webpage from which the current request originated, allowing analysts to trace the preceding redirection jump.",
                    "difficulty": "beginner"
                },
                "summary": "Analyzing multi-stage malware delivery requires tracking redirection sequences, identifying abnormal User-Agent strings, and decoding C2 check-in telemetry.",
                "furtherReading": [
                    {
                        "title": "MITRE ATT&CK \u2014 T1071: Application Layer Protocol (C2)",
                        "url": "https://attack.mitre.org/techniques/T1071/"
                    }
                ]
            }
        },
        {
            "id": "les-04-2-video-part2",
            "slug": "malware-traffic-analysis-part2",
            "title": "Advanced Wireshark Network Forensics - Part 2/3",
            "description": "Deep-dive practical video demonstration by Netsec Explained focusing on dissecting malware traffic, identifying malicious domains, analyzing command-and-control handshakes, and tracking compromised hosts.",
            "durationMinutes": 45,
            "order": 2,
            "youtubeVideoId": "ZJZlRGLN2_s",
            "videoAttribution": {
                "creator": "Netsec Explained",
                "channelUrl": "https://www.youtube.com/@NetsecExplained",
                "platform": "YouTube",
                "seriesTitle": "Advanced Wireshark Network Forensics",
                "partNumber": 2
            },
            "objectives": [
                "Follow expert step-by-step dissection of an active malware infection capture",
                "Observe how Netsec Explained isolates suspicious IP conversations and analyzes C2 payloads",
                "Replicate malware traffic analysis workflows in your local Wireshark installation"
            ],
            "tags": [
                "netsec-explained",
                "video-walkthrough",
                "malware-traffic-analysis",
                "c2-hunting"
            ],
            "skillsTaught": [
                "Malware traffic analysis",
                "C2 pattern identification",
                "Expert workflow execution"
            ],
            "richContent": {
                "introduction": "In Part 2 of the Advanced Wireshark Network Forensics series by Netsec Explained, the investigation shifts from broad baseline triage to surgical malware traffic analysis. Watch how anomalous endpoints are systematically isolated, observe how beaconing patterns emerge across TCP and HTTP conversations, and learn how to extract critical indicators for threat reports.",
                "prerequisites": [
                    "Lesson 4.1: Malware Delivery Mechanics"
                ],
                "keyTerminology": [
                    {
                        "term": "Beaconing",
                        "definition": "Repeated network communication by an implant to its C2 server at regular or jittered intervals to check for tasking."
                    },
                    {
                        "term": "Malware Traffic Analysis (MTA)",
                        "definition": "The specialized discipline of inspecting network captures to identify malware infections, exploit kits, and adversary behavior."
                    }
                ],
                "theorySections": [
                    {
                        "title": "Key Investigative Insights from Netsec Explained",
                        "content": "In this video, Netsec Explained demonstrates how to track lateral movement attempts, evaluate abnormal port usage, and verify whether a suspected connection is automated or user-driven. Notice how the instructor correlates DNS query answers with subsequent outbound TCP connections.",
                        "keyPoints": [
                            "Observe the combination of display filters used to isolate suspicious internal hosts.",
                            "Pay attention to how session durations and payload byte counts expose automated implants."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Watch the Video Lesson",
                        "instruction": "Watch Advanced Wireshark Network Forensics - Part 2/3 (Video ID: ZJZlRGLN2_s).",
                        "expectedOutcome": "Observe expert methodology for isolating infected hosts and tracking adversary activity."
                    },
                    {
                        "step": 2,
                        "title": "Replicate Analysis in Hackers on the Network PCAP",
                        "instruction": "Open Hackers on the Network.pcapng and isolate the internal IP address identified in the video.",
                        "filter": "ip.addr == 10.0.4.152",
                        "expectedOutcome": "Filters all traffic involving the compromised accounting workstation."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "ip.src == 10.0.4.152 && tcp.flags.syn == 1 && tcp.flags.ack == 0",
                        "description": "All outbound connection attempts from compromised host",
                        "purpose": "Map target destination IPs"
                    },
                    {
                        "filter": "http.request and ip.src == 10.0.4.152",
                        "description": "Web requests made by the infected system",
                        "purpose": "Identify web-based C2 channels"
                    }
                ],
                "expectedObservations": [
                    "A single infected machine will repeatedly initiate outbound connections to a small set of external IP addresses on fixed ports."
                ],
                "commonMistakes": [
                    "Overlooking non-standard ports (e.g. HTTP running on port 8088 or 4444)."
                ],
                "securityRelevance": "Live malware traffic analysis provides defensible proof of system compromise and determines the operational blast radius of an intrusion.",
                "knowledgeCheck": {
                    "question": "What primary characteristic distinguishes an automated malware C2 connection from a human user browsing the web?",
                    "options": [
                        "Malware only uses UDP port 53",
                        "Automated C2 exhibits repetitive connection intervals, uniform packet sizes, and programmatic User-Agents",
                        "Malware traffic is always smaller than 64 bytes",
                        "Human browsing never uses TLS encryption"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "Implant C2 communications are governed by software timers (loops), generating uniform packet sizes and repetitive intervals compared to sporadic, human-driven web browsing.",
                    "difficulty": "intermediate"
                },
                "summary": "Part 2 of Netsec Explained demonstrates how to track an active infection in packet captures, isolating C2 channels and mapping compromised endpoints.",
                "furtherReading": [
                    {
                        "title": "Malware-Traffic-Analysis.net Exercises by Brad Duncan",
                        "url": "https://www.malware-traffic-analysis.net/"
                    }
                ]
            }
        },
        {
            "id": "les-04-3-c2-beaconing-jitter",
            "slug": "c2-beaconing-jitter-heartbeat-detection",
            "title": "Identifying C2 Beaconing Patterns & Periodic Heartbeat Signals",
            "description": "Calculate beaconing intervals, analyze sleep timers and randomized jitter percentages, evaluate delta time variances, and differentiate periodic automated polling from human interaction.",
            "durationMinutes": 40,
            "order": 3,
            "objectives": [
                "Calculate average beaconing intervals and standard deviation across repeated TCP/HTTP sessions",
                "Identify randomized jitter implementations (e.g., 60s sleep with 20% jitter = 48s to 72s)",
                "Use Wireshark Conversations and IO Graphs to visually identify periodic heartbeat rhythms"
            ],
            "tags": [
                "c2-beaconing",
                "jitter",
                "heartbeat",
                "timing-analysis",
                "threat-hunting"
            ],
            "skillsTaught": [
                "Beacon frequency calculation",
                "Jitter modeling",
                "Automated heartbeat detection"
            ],
            "richContent": {
                "introduction": "Adversary implants maintain contact with command servers by sending periodic 'heartbeats' or 'beacons' to query for queued tasks. While naive implants beacon at exact intervals (e.g. exactly every 60 seconds), mature frameworks (Cobalt Strike, Mythic, Sliver) introduce sleep jitter to randomize connection intervals and evade static threshold detection.",
                "prerequisites": [
                    "Lesson 1.4: Timestamps & Delta Timing Analysis"
                ],
                "keyTerminology": [
                    {
                        "term": "Sleep Time",
                        "definition": "The base duration an implant remains inactive between outbound communication attempts."
                    },
                    {
                        "term": "Jitter",
                        "definition": "A randomized percentage applied to the sleep time (e.g. 60s +/- 20% = 48s to 72s) to prevent exact periodic cadence on the network."
                    },
                    {
                        "term": "Heartbeat",
                        "definition": "A short status message transmitted by an implant confirming it is still active and awaiting instructions."
                    }
                ],
                "theorySections": [
                    {
                        "title": "Mathematical Modeling of Beaconing with Jitter",
                        "content": "To detect beaconing with jitter, investigators extract the connection initiation timestamps (SYN packets or HTTP GET requests) across an hour-long capture. While individual delta times vary between 48s and 72s, plotting a histogram or calculating average inter-arrival intervals reveals a tight Gaussian distribution clustered precisely around the 60-second median.",
                        "keyPoints": [
                            "Sort Conversations by Duration and Packets to find long-lived, low-bandwidth persistent connections.",
                            "Export timestamps to calculate standard deviation and mean interval."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Filter for Outbound Session Starts",
                        "instruction": "Filter for connection initiations to the suspected C2 IP address.",
                        "filter": "ip.dst == 198.51.100.25 and tcp.flags.syn == 1 and tcp.flags.ack == 0",
                        "expectedOutcome": "Lists all initial SYN packets sent to the C2 server."
                    },
                    {
                        "step": 2,
                        "title": "Analyze Time Differences Between Connections",
                        "instruction": "Inspect the Time column (set to 'Seconds Since Previous Displayed Packet') to observe the intervals between SYN attempts.",
                        "expectedOutcome": "Displays the exact interval in seconds (e.g. 59.8s, 61.2s, 58.9s, 60.4s)."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "tcp.flags.syn == 1 and tcp.flags.ack == 0 and ip.dst == 198.51.100.25",
                        "description": "Isolates SYN initiations to specific C2 target",
                        "purpose": "Beacon interval extraction"
                    },
                    {
                        "filter": "http.request and ip.dst == 198.51.100.25",
                        "description": "Isolates web-based polling requests to C2",
                        "purpose": "HTTP heartbeat timing analysis"
                    }
                ],
                "expectedObservations": [
                    "A consistent sequence of delta times (e.g. ~60 seconds) confirming automated software polling."
                ],
                "commonMistakes": [
                    "Mistaking legitimate cloud syncing services (OneDrive, Dropbox) for malware beacons without verifying domain ownership and process context."
                ],
                "securityRelevance": "Calculating exact beaconing sleep and jitter values allows defenders to write Sigma, Snort, and Zeek rules that hunt for the same implant cadence across other enterprise segments.",
                "knowledgeCheck": {
                    "question": "If an adversary implant is configured with a 120-second sleep interval and 25% jitter, what is the valid time window between consecutive beacons?",
                    "options": [
                        "90 seconds to 150 seconds",
                        "100 seconds to 140 seconds",
                        "Exactly 120 seconds",
                        "0 seconds to 120 seconds"
                    ],
                    "correctAnswerIndex": 0,
                    "explanation": "25% of 120 seconds is 30 seconds. Applying +/- 25% jitter results in intervals ranging between 120 - 30 = 90 seconds and 120 + 30 = 150 seconds.",
                    "difficulty": "intermediate"
                },
                "summary": "Analyzing connection delta times and statistical clustering uncovers automated C2 beaconing heartbeats even when disguised by randomized jitter.",
                "furtherReading": [
                    {
                        "title": "Active Countermeasures \u2014 Finding C2 Beacons with Network Traffic Analysis",
                        "url": "https://www.activecountermeasures.com/"
                    }
                ]
            }
        },
        {
            "id": "les-04-4-dns-tunneling-exfil",
            "slug": "dns-tunneling-fast-flux-exfiltration",
            "title": "DNS Tunneling, Fast-Flux Domains & Exfiltration Detection",
            "description": "Detect data exfiltration and covert channels over DNS queries, decode Base64/Hex encoded subdomains, identify Fast-Flux IP switching, and spot Domain Generation Algorithms (DGAs).",
            "durationMinutes": 40,
            "order": 4,
            "objectives": [
                "Detect DNS covert tunneling channels (e.g. dnscat2, iodine) in packet captures",
                "Calculate subdomain label length, query entropy, and record type anomalies (TXT, NULL, CNAME)",
                "Identify Domain Generation Algorithm (DGA) query bursts and high NXDomain error rates",
                "Reconstruct exfiltrated data by extracting and decoding encoded subdomain strings"
            ],
            "tags": [
                "dns-tunneling",
                "exfiltration",
                "dga",
                "fast-flux",
                "covert-channels"
            ],
            "skillsTaught": [
                "DNS tunneling detection",
                "DGA domain identification",
                "Subdomain payload reassembly"
            ],
            "richContent": {
                "introduction": "DNS is frequently permitted outbound through corporate firewalls without proxy inspection. Attackers abuse this trust by encoding sensitive files or C2 instructions directly inside DNS queries (e.g. v2-payload-data.attacker.com), converting the global recursive DNS resolution hierarchy into a covert data exfiltration and command pipeline.",
                "prerequisites": [
                    "Lesson 0.5: UDP, ICMP & Core Infrastructure Protocols"
                ],
                "keyTerminology": [
                    {
                        "term": "DNS Tunneling",
                        "definition": "A technique that encapsulates non-DNS traffic (IP, HTTP, shell commands) inside standard DNS query and response packets."
                    },
                    {
                        "term": "DGA (Domain Generation Algorithm)",
                        "definition": "An algorithm used by malware to dynamically generate hundreds of pseudo-random domain names daily to find an active C2 server."
                    },
                    {
                        "term": "Fast-Flux",
                        "definition": "A DNS technique where A record IP addresses are swapped every few minutes using ultra-low TTLs to hide resilient C2 backend servers."
                    }
                ],
                "theorySections": [
                    {
                        "title": "Signatures of DNS Tunneling & Exfiltration",
                        "content": "Normal enterprise DNS queries average 15-30 characters in length and predominantly request A, AAAA, and HTTPS records. DNS tunneling exhibits: 1) Unusually long query names (>50 characters), 2) High character entropy (random hex or Base32/Base64 strings), 3) High query volume to a single second-level domain, and 4) Frequent TXT or NULL record queries used to transfer large payloads back to the victim.",
                        "keyPoints": [
                            "Legitimate recursive resolvers forward the queries directly to the adversary's authoritative name server.",
                            "DGAs generate massive spikes in NXDomain (RCODE 3: No Such Name) as the implant hunts for the registered C2 domain."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Filter for Long DNS Subdomain Queries",
                        "instruction": "Filter for DNS queries with query names exceeding standard lengths.",
                        "filter": "dns.qry.name.len > 50",
                        "expectedOutcome": "Highlights potential encoded tunneling subdomains."
                    },
                    {
                        "step": 2,
                        "title": "Identify High NXDomain Failure Bursts",
                        "instruction": "Filter for DNS responses returning Non-Existent Domain (RCODE 3).",
                        "filter": "dns.flags.rcode == 3",
                        "expectedOutcome": "Reveals DGA algorithmic probing attempts against unregistered domains."
                    }
                ],
                "displayFilters": [
                    {
                        "filter": "dns.qry.type in {16, 10}",
                        "description": "Filters for DNS TXT (16) and NULL (10) record queries",
                        "purpose": "Detect bulk data exfiltration over DNS"
                    },
                    {
                        "filter": "dns.flags.response == 0 and dns.qry.name contains \"c2\"",
                        "description": "Queries containing specific indicator keywords",
                        "purpose": "Adversary name resolution tracking"
                    }
                ],
                "expectedObservations": [
                    "Tunneling tools like dnscat2 generate massive continuous streams of TXT record queries carrying Base32-encoded data."
                ],
                "commonMistakes": [
                    "Overlooking legitimate cloud services (e.g. antivirus reputation lookups, anti-spam RBL queries) that also use long encoded subdomains."
                ],
                "securityRelevance": "DNS tunneling is a primary fallback channel for nation-state threat actors when web proxies and egress firewalls block standard TCP connections.",
                "knowledgeCheck": {
                    "question": "Which set of characteristics provides the strongest network indicator of active DNS tunneling data exfiltration?",
                    "options": [
                        "Subdomain queries over 60 characters long, high character entropy, and an unusual volume of TXT/NULL record queries to a single domain",
                        "Standard A record queries to google.com with TTL 300",
                        "Reverse DNS lookups for private RFC 1918 IP addresses",
                        "DHCP Discover requests arriving on port 67"
                    ],
                    "correctAnswerIndex": 0,
                    "explanation": "DNS tunneling relies on long, high-entropy encoded strings packed into subdomain labels, coupled with TXT/NULL record queries to maximize payload transfer size per query.",
                    "difficulty": "intermediate"
                },
                "summary": "Detecting DNS covert channels requires monitoring query length, character entropy, record type distributions, and NXDomain error frequencies across enterprise DNS resolvers.",
                "furtherReading": [
                    {
                        "title": "SANS Reading Room \u2014 Detecting DNS Tunneling",
                        "url": "https://www.sans.org/white-papers/34370/"
                    }
                ]
            }
        }
    ],
    "practicalLab": {
        "id": "lab-04-c2-beacon-analysis",
        "title": "Lab 04: Command-and-Control (C2) Identification & Beacon Timing Analysis",
        "objective": "Isolate the primary C2 communication channel in Hackers on the Network PCAP, calculate the beacon interval and jitter, and identify any DNS exfiltration attempts.",
        "toolsRequired": [
            "Wireshark 4.x or higher"
        ],
        "pcapSource": {
            "fileName": "Hackers on the Network.pcapng",
            "fileUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Hackers%20on%20the%20Network.pcapng",
            "repositoryUrl": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
            "sha256": "b2bd9a8b484f4ded72a4ce7de1335198d5ae6e81ace89fe6e6d5a071e1391cd9"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
            "Open Hackers on the Network.pcapng in Wireshark.",
            "Filter for the compromised host (10.0.4.152).",
            "Identify the external destination IP and port handling periodic outbound connections.",
            "Set the Time display to 'Seconds Since Previous Displayed Packet' and record 5 consecutive beacon intervals.",
            "Calculate the average beacon interval and determine if jitter is present.",
            "Check for anomalous DNS queries with unusually long subdomains."
        ],
        "tasks": [
            {
                "id": "task-04-1",
                "description": "Identify external C2 server IP address and target port",
                "hint": "Inspect outbound TCP connections from 10.0.4.152"
            },
            {
                "id": "task-04-2",
                "description": "Measure 5 consecutive beacon delta timings in seconds",
                "hint": "Filter tcp.flags.syn == 1 and view delta times"
            },
            {
                "id": "task-04-3",
                "description": "Verify whether DNS tunneling was utilized",
                "hint": "Filter dns.qry.name.len > 40"
            }
        ],
        "evidenceWorksheet": [
            {
                "field": "C2 Destination IP",
                "prompt": "Enter the remote C2 IP address:",
                "expectedEvidenceType": "IPv4 address"
            },
            {
                "field": "C2 Destination Port",
                "prompt": "Enter the remote C2 port:",
                "expectedEvidenceType": "Integer port (e.g. 443, 8080)"
            },
            {
                "field": "Calculated Average Beacon Interval",
                "prompt": "Average seconds between beacons:",
                "expectedEvidenceType": "Seconds (e.g. 60.5s)"
            }
        ],
        "questions": [
            {
                "question": "What is the primary operational objective of adding randomized jitter to an implant's sleep timer?",
                "options": [
                    "To speed up data exfiltration",
                    "To prevent detection by automated network baseline tools looking for exact periodic connection intervals",
                    "To compress packet size",
                    "To encrypt the transport payload"
                ],
                "correctAnswerIndex": 1,
                "explanation": "Randomized jitter disrupts exact mathematical periodicity, preventing simple threshold alerts from identifying the recurring outbound beacon cadence.",
                "difficulty": "intermediate"
            }
        ],
        "completionCriteria": [
            "C2 IP and port identified and confirmed",
            "Beacon interval calculated and recorded in evidence worksheet",
            "DNS queries audited for tunneling activity"
        ]
    },
    "quiz": {
        "title": "Module 04 Assessment: Malware Traffic Analysis",
        "questions": [
            {
                "question": "Which DNS query record type is most commonly abused by attackers for large outbound data exfiltration payloads due to its generous text payload capacity?",
                "options": [
                    "A (Host Address)",
                    "PTR (Pointer)",
                    "TXT (Text)",
                    "MX (Mail Exchange)"
                ],
                "correctAnswerIndex": 2,
                "explanation": "TXT records can return up to 255 bytes per string (and multiple strings per record), making them the preferred vehicle for returning large payloads over DNS.",
                "difficulty": "intermediate"
            },
            {
                "question": "What does a high frequency of DNS NXDomain (RCODE 3) responses indicate during a malware investigation?",
                "options": [
                    "The local DNS server is offline",
                    "A malware implant using a Domain Generation Algorithm (DGA) is attempting to resolve unregistered candidate domains",
                    "All internet connections are blocked",
                    "The client has an invalid IP address"
                ],
                "correctAnswerIndex": 1,
                "explanation": "DGA malware algorithmically queries dozens or hundreds of candidate domains per day; because only one or two are registered by the attacker, the rest generate NXDomain errors.",
                "difficulty": "intermediate"
            },
            {
                "question": "Which HTTP header is most valuable for tracing the chain of website redirections that led a user from an email click to an exploit kit landing page?",
                "options": [
                    "Accept",
                    "Referer",
                    "Host",
                    "Cookie"
                ],
                "correctAnswerIndex": 1,
                "explanation": "The Referer header identifies the specific URL of the webpage that linked to the requested URL, enabling investigators to map multi-hop redirection funnels.",
                "difficulty": "beginner"
            },
            {
                "question": "Which Wireshark visualization tool is most effective for distinguishing regular automated C2 beacon pulses from interactive human adversary activity?",
                "options": [
                    "IO Graphs (Statistics -> IO Graphs) with 1-second interval filtered on suspected C2 stream",
                    "Expert Info error counter",
                    "Packet Lengths distribution histogram",
                    "TCP Stream Graphs -> Round Trip Time graph"
                ],
                "correctAnswerIndex": 0,
                "explanation": "Wireshark's I/O Graphs with granular time intervals (e.g. 1 second or 0.1s) visually expose recurring periodic spikes representing automated beacon heartbeats, whereas interactive operator sessions exhibit irregular burst patterns.",
                "difficulty": "intermediate"
            },
            {
                "question": "What characteristic DNS pattern in enterprise network capture files indicates the presence of a Domain Generation Algorithm (DGA) malware family?",
                "options": [
                    "A large burst of DNS queries returning NXDOMAIN (No Such Name) followed by a successful resolution to an external IP",
                    "Single DNS queries to well-known search engines with high TTL values",
                    "Continuous DNS PTR reverse lookup requests for local subnet hosts",
                    "DNS queries with oversized EDNS0 buffer options exceeding 4096 bytes"
                ],
                "correctAnswerIndex": 0,
                "explanation": "DGA malware generates hundreds of pseudo-random domain names daily. Most generated domains are unregistered, resulting in high volumes of NXDOMAIN responses until the active attacker-registered domain resolves successfully.",
                "difficulty": "intermediate"
            }
        ]
    }
}
