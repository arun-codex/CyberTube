MODULE_00 = {
    "id": "mod-00-networking-prerequisites",
    "title": "Module 00: Networking Prerequisites & Lab Preparation",
    "description": "Master fundamental networking abstractions, OSI vs. TCP/IP models, frame/packet headers, and prepare your packet capture analysis workstation.",
    "order": 1,
    "lessons": [
        {
            "id": "les-00-1-osi-vs-tcpip",
            "slug": "osi-vs-tcpip-encapsulation",
            "title": "OSI 7-Layer vs. TCP/IP Model & Encapsulation Mechanics",
            "description": "Deconstruct network communication through the 7-layer OSI and 4-layer TCP/IP models, analyzing data encapsulation headers from application payload to physical bitstream.",
            "durationMinutes": 30,
            "order": 1,
            "objectives": [
                "Differentiate OSI reference layers from the pragmatic TCP/IP internet protocol suite",
                "Trace protocol data units (PDUs) through encapsulation and decapsulation stages",
                "Correlate Wireshark packet detail tree nodes directly with corresponding protocol layers"
            ],
            "tags": ["osi-model", "tcp-ip", "encapsulation", "pdu", "networking-basics"],
            "skillsTaught": ["Layer-by-layer dissection", "Encapsulation tracing", "PDU mapping"],
            "richContent": {
                "introduction": "Every packet traversing an Ethernet network represents the end result of hierarchical protocol encapsulation. Understanding how application data is packaged into transport segments, wrapped in network datagrams, framed by link-layer headers, and transmitted as physical signals is the fundamental prerequisite of all network forensics.",
                "prerequisites": ["Basic computer literacy", "Understanding of client-server architecture"],
                "keyTerminology": [
                    {"term": "PDU (Protocol Data Unit)", "definition": "The specific unit of data processed at a given layer: Data (Layer 7-5), Segment (Layer 4), Packet (Layer 3), Frame (Layer 2), Bits (Layer 1)."},
                    {"term": "Encapsulation", "definition": "The process whereby higher-layer protocols add header and trailer metadata as data descends the network stack."},
                    {"term": "MTU (Maximum Transmission Unit)", "definition": "The largest packet or frame size (typically 1500 bytes for standard Ethernet) that can be transmitted on a network link without fragmentation."}
                ],
                "theorySections": [
                    {
                        "title": "OSI 7-Layer Reference Model vs. TCP/IP Architecture",
                        "content": "The 7-layer OSI model serves as the conceptual gold standard for networking abstractions, whereas the TCP/IP suite forms the actual implementation running across modern operating systems and the global Internet. In Wireshark, the Packet Details pane maps directly to this stack: Frame metadata (Layer 1 physical abstraction), Ethernet II (Layer 2 Link), Internet Protocol (Layer 3 Network), Transmission Control Protocol (Layer 4 Transport), and Application layer protocols (HTTP, DNS, TLS).",
                        "keyPoints": [
                            "Physical (L1) and Data Link (L2) handle node-to-node hop delivery on local broadcast domains.",
                            "Network (L3) handles logical host-to-host end-to-end addressing across routing boundaries.",
                            "Transport (L4) provides process-to-process multiplexing via port numbers and reliable sequencing.",
                            "Application (L7) encompasses user data formats, presentation encoding, and session interactions."
                        ]
                    }
                ],
                "protocolExplanations": [
                    {
                        "protocol": "Ethernet II / IP / TCP Stack",
                        "layer": "Layers 2 through 4",
                        "details": "Standard IPv4 over Ethernet frame layout: 14-byte Ethernet header, 20-byte minimum IPv4 header, 20-byte minimum TCP header, followed by application payload.",
                        "headerFields": ["Destination MAC (6B)", "Source MAC (6B)", "EtherType (2B)", "IP Version/IHL (1B)", "Total Length (2B)", "TTL (1B)", "Protocol (1B)", "Source/Dest IP (8B)", "Source/Dest Port (4B)", "Seq/Ack Num (8B)", "Flags (12b)", "Window Size (2B)"]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Open Wireshark and Load Baseline Capture",
                        "instruction": "Launch Wireshark and open Scenario 1.pcapng from your forensics directory.",
                        "filter": "frame.number == 1",
                        "expectedOutcome": "Packet 1 is displayed in the Packet List and Packet Details view."
                    },
                    {
                        "step": 2,
                        "title": "Expand Protocol Layers in Packet Details",
                        "instruction": "Click on the disclosure triangles for Frame, Ethernet II, Internet Protocol Version 4, and Transmission Control Protocol in sequence.",
                        "expectedOutcome": "Observe the 14-byte Ethernet header, 20-byte IP header, and 20-byte TCP header encapsulating the payload."
                    }
                ],
                "displayFilters": [
                    {"filter": "frame.len > 1514", "description": "Detects oversized frames (Jumbo frames or segmentation offload artifacts)", "purpose": "Encapsulation & MTU diagnostics"},
                    {"filter": "eth.type == 0x0800", "description": "Filters for IPv4 frames exclusively", "purpose": "Protocol layer isolation"}
                ],
                "expectedObservations": [
                    "Packet Details pane visually mirrors the protocol stack from bottom (physical/frame) to top (application).",
                    "Selecting a header field in the Details pane highlights its corresponding raw hexadecimal bytes in the Packet Bytes pane."
                ],
                "commonMistakes": [
                    "Confusing display filter syntax with Berkeley Packet Filter (BPF) capture filter syntax.",
                    "Assuming all packets contain application payload; pure TCP ACK or SYN packets consist solely of headers."
                ],
                "securityRelevance": "Adversaries manipulate protocol encapsulation to bypass security controls, using tunneling (e.g. DNS tunneling, ICMP tunneling) or header anomaly techniques that break standard inspection assumptions.",
                "practicalExercise": {
                    "title": "Exercise 0.1: PDU Byte Boundary Inspection",
                    "objective": "Identify byte offsets of Layer 2, Layer 3, and Layer 4 headers in raw hexadecimal view.",
                    "instructions": [
                        "Select Packet #1 in Scenario 1.pcapng.",
                        "Click Ethernet II in Packet Details and note bytes 0x00 through 0x0D highlighted in Packet Bytes.",
                        "Click Internet Protocol Version 4 and verify bytes 0x0E through 0x21 are highlighted.",
                        "Calculate the total overhead introduced by protocol encapsulation before application data begins."
                    ],
                    "pcapReference": "Scenario 1.pcapng"
                },
                "knowledgeCheck": {
                    "question": "Which Layer of the OSI Model is responsible for end-to-end logical packet routing across distinct networks?",
                    "options": ["Data Link Layer (Layer 2)", "Network Layer (Layer 3)", "Transport Layer (Layer 4)", "Session Layer (Layer 5)"],
                    "correctAnswerIndex": 1,
                    "explanation": "The Network Layer (Layer 3), implemented by protocols such as IPv4 and IPv6, provides logical addressing (IP addresses) and routing across routed network boundaries. Layer 2 handles hop-by-hop local framing via MAC addresses.",
                    "difficulty": "beginner"
                },
                "summary": "Protocol encapsulation adds structured metadata at each network layer. Forensics analysts must fluently dissect Layer 2 framing, Layer 3 addressing, and Layer 4 transport semantics to uncover anomalous behavior embedded within raw packet captures.",
                "furtherReading": [
                    {"title": "RFC 1122 — Requirements for Internet Hosts: Communication Layers", "url": "https://datatracker.ietf.org/doc/html/rfc1122"},
                    {"title": "Wireshark User Guide: Packet Dissection", "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChDissectView.html"}
                ]
            }
        },
        {
            "id": "les-00-2-ethernet-arp",
            "slug": "ethernet-mac-arp-operations",
            "title": "Ethernet Frames, MAC Addressing & ARP Operations",
            "description": "Examine Ethernet frame structure, Organizationally Unique Identifiers (OUIs), broadcast mechanics, and Address Resolution Protocol (ARP) query-response workflows.",
            "durationMinutes": 30,
            "order": 2,
            "objectives": [
                "Deconstruct 802.3 and Ethernet II header fields (Destination MAC, Source MAC, EtherType)",
                "Decode Address Resolution Protocol (ARP) requests and replies",
                "Detect gratuitous ARP anomalies, ARP spoofing, and poisoning patterns"
            ],
            "tags": ["ethernet", "mac-address", "arp", "arp-spoofing", "layer-2"],
            "skillsTaught": ["MAC OUI lookup", "ARP conversation tracing", "Spoofing detection"],
            "richContent": {
                "introduction": "Within local broadcast domains, network interfaces do not communicate using IP addresses; they resolve Layer 3 logical addresses to Layer 2 48-bit Media Access Control (MAC) addresses using the Address Resolution Protocol (ARP). Because ARP lacks cryptographic authentication, it is historically vulnerable to spoofing, poisoning, and man-in-the-middle attacks.",
                "prerequisites": ["Lesson 0.1: OSI & TCP/IP Encapsulation"],
                "keyTerminology": [
                    {"term": "MAC Address", "definition": "A 48-bit physical hardware identifier formatted as 6 hexadecimal octets (e.g. 00:1A:2B:3C:4D:5E). The first 24 bits represent the Organizationally Unique Identifier (OUI)."},
                    {"term": "ARP Request", "definition": "A broadcast frame (Destination MAC ff:ff:ff:ff:ff:ff) asking 'Who has IP X.X.X.X? Tell IP Y.Y.Y.Y'."},
                    {"term": "ARP Reply", "definition": "A unicast frame responding 'IP X.X.X.X is at MAC AA:BB:CC:DD:EE:FF'."}
                ],
                "theorySections": [
                    {
                        "title": "Ethernet II Frame Structure & EtherType Field",
                        "content": "An Ethernet II frame consists of a 6-byte Destination MAC, 6-byte Source MAC, and a 2-byte EtherType field. Common EtherTypes include 0x0800 (IPv4), 0x0806 (ARP), and 0x86DD (IPv6). The preamble and start-of-frame delimiter (SFD) are stripped by network interface controllers (NICs) before capture drivers record the frame.",
                        "keyPoints": [
                            "Unicast destination MACs have the least significant bit of the first octet set to 0.",
                            "Multicast and broadcast destination MACs have the least significant bit set to 1.",
                            "ARP OpCodes indicate operation: 1 for Request, 2 for Reply."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Filter for ARP Traffic",
                        "instruction": "In Wireshark, apply the display filter arp in the filter bar and press Enter.",
                        "filter": "arp",
                        "expectedOutcome": "Only ARP request, reply, and announcement packets are shown in the packet list."
                    },
                    {
                        "step": 2,
                        "title": "Identify ARP Request vs Reply",
                        "instruction": "Locate an ARP broadcast request (Info: 'Who has ... Tell ...') and inspect the ARP Opcode under Address Resolution Protocol in the Details pane.",
                        "filter": "arp.opcode == 1",
                        "expectedOutcome": "Opcode displays: request (1)."
                    }
                ],
                "displayFilters": [
                    {"filter": "arp.opcode == 2", "description": "Filters for ARP reply packets", "purpose": "Identify IP-to-MAC resolution responses"},
                    {"filter": "arp.duplicate-address-frame", "description": "Detects duplicate IP addresses or ARP poisoning attacks", "purpose": "ARP anomaly and spoofing triage"}
                ],
                "expectedObservations": [
                    "ARP requests always use Ethernet destination address ff:ff:ff:ff:ff:ff (Broadcast).",
                    "ARP replies are directed unicast frames returned directly to the requesting hardware MAC."
                ],
                "commonMistakes": [
                    "Assuming ARP traffic crosses WAN routers; ARP is strictly non-routable and confined to local Layer 2 segments."
                ],
                "securityRelevance": "Adversaries execute ARP poisoning to position their machine as the default gateway for victim endpoints, enabling transparent credential interception and session hijacking.",
                "practicalExercise": {
                    "title": "Exercise 0.2: Spotting Gratuitous ARP Anomalies",
                    "objective": "Identify unsolicited ARP announcements in capture files.",
                    "instructions": [
                        "Filter for arp.isgratuitous == 1.",
                        "Verify whether sender IP matches target IP.",
                        "Evaluate if the MAC address change indicates IP address migration or an active ARP poisoning campaign."
                    ]
                },
                "knowledgeCheck": {
                    "question": "What is the destination MAC address utilized by a standard ARP Request frame?",
                    "options": ["00:00:00:00:00:00", "127.0.0.1", "ff:ff:ff:ff:ff:ff", "01:00:5e:00:00:01"],
                    "correctAnswerIndex": 2,
                    "explanation": "ARP Request frames must reach every host on the local Ethernet collision/broadcast domain, requiring the all-ones broadcast MAC address ff:ff:ff:ff:ff:ff.",
                    "difficulty": "beginner"
                },
                "summary": "Ethernet frames deliver packets between local hardware nodes using MAC addresses. ARP binds Layer 3 IPs to Layer 2 MACs, making its inspection crucial for identifying local network impersonation and MITM attacks.",
                "furtherReading": [
                    {"title": "RFC 826 — An Ethernet Address Resolution Protocol", "url": "https://datatracker.ietf.org/doc/html/rfc826"}
                ]
            }
        },
        {
            "id": "les-00-3-ipv4-ipv6-headers",
            "slug": "ipv4-ipv6-headers-subnetting",
            "title": "IPv4 & IPv6 Packet Headers, Addressing & Subnetting",
            "description": "Examine IPv4 and IPv6 header architectures, Time to Live (TTL) decrement mechanics, fragmentation fields, and IP subnet calculations.",
            "durationMinutes": 35,
            "order": 3,
            "objectives": [
                "Analyze IPv4 header fields: Version, IHL, Total Length, Identification, Flags, Fragment Offset, TTL, Protocol, Checksum",
                "Contrast IPv4 with the streamlined 40-byte fixed header of IPv6",
                "Calculate subnet boundaries, network IDs, and broadcast addresses from CIDR notation"
            ],
            "tags": ["ipv4", "ipv6", "ttl", "fragmentation", "subnetting"],
            "skillsTaught": ["Header field decoding", "TTL hop counting", "Fragmentation reassembly analysis"],
            "richContent": {
                "introduction": "The Internet Protocol (IP) provides host-to-host delivery across routed internetworks. Understanding header fields such as Time-to-Live (TTL) allows analysts to infer the operating system of remote endpoints and estimate the number of intermediate router hops traversed.",
                "prerequisites": ["Lesson 0.1: OSI & TCP/IP Encapsulation"],
                "keyTerminology": [
                    {"term": "TTL (Time to Live)", "definition": "An 8-bit counter decremented by 1 at each router hop to prevent forwarding loops. Initial values are OS-dependent: Linux/macOS typically start at 64; Windows typically starts at 128."},
                    {"term": "CIDR (Classless Inter-Domain Routing)", "definition": "A method for allocating IP addresses and IP routing using variable-length subnet masks (e.g. 192.168.1.0/24)."}
                ],
                "theorySections": [
                    {
                        "title": "IPv4 Header Dissection & OS Fingerprinting",
                        "content": "The default IPv4 header is 20 bytes long when no options are present (Internet Header Length = 5). By observing the observed TTL in a captured inbound packet and comparing it to common baseline default values (64, 128, 255), an analyst can determine both the operating system family and the exact hop count between client and sensor.",
                        "keyPoints": [
                            "Default TTL 64 (Linux, Android, macOS, iOS).",
                            "Default TTL 128 (Windows 10, Windows 11, Windows Server).",
                            "Default TTL 255 (Cisco IOS, network appliances, Solaris)."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Filter by IP Subnet",
                        "instruction": "Use CIDR notation in Wireshark display filter bar to isolate internal subnet communications.",
                        "filter": "ip.addr == 192.168.0.0/16",
                        "expectedOutcome": "Filters packets where either source or destination IP matches the private RFC 1918 192.168.0.0/16 range."
                    },
                    {
                        "step": 2,
                        "title": "Inspect TTL and Protocol Fields",
                        "instruction": "Select an inbound TCP packet and note the ip.ttl and ip.proto fields in Packet Details.",
                        "filter": "ip.proto == 6",
                        "expectedOutcome": "Packet details confirm IP protocol is TCP (6)."
                    }
                ],
                "displayFilters": [
                    {"filter": "ip.flags.mf == 1 or ip.frag_offset > 0", "description": "Filters for fragmented IP datagrams", "purpose": "Identify network fragmentation and evasion attacks"},
                    {"filter": "ip.ttl <= 5", "description": "Detects packets nearing hop expiration", "purpose": "Trace traceroute packets or routing loops"}
                ],
                "expectedObservations": [
                    "Standard web responses from external Linux web servers often arrive at your sensor with TTL values between 50 and 57 (initial 64 minus 7-14 hops).",
                    "Fragmented packets indicate MTU mismatches or fragmentation-based firewall evasion attempts."
                ],
                "commonMistakes": [
                    "Assuming TTL is a measure of elapsed seconds; it represents decremented router hops."
                ],
                "securityRelevance": "Adversaries modify packet TTL or manipulate fragmentation offsets (e.g. Teardrop, overlapping fragments) to evade Network Intrusion Detection Systems (NIDS).",
                "knowledgeCheck": {
                    "question": "An inbound SYN packet arriving from an external server has an observed TTL of 52. What was the most probable initial TTL and operating system family?",
                    "options": ["Initial TTL 64 (Linux/UNIX)", "Initial TTL 128 (Windows)", "Initial TTL 255 (Network Router)", "Initial TTL 32 (Legacy System)"],
                    "correctAnswerIndex": 0,
                    "explanation": "Standard Linux kernels initialize TTL at 64. Passing through 12 internet router hops decrements 64 - 12 = 52. If it were Windows (128), 12 hops would yield a TTL around 116.",
                    "difficulty": "intermediate"
                },
                "summary": "IP headers convey critical routing, hop count, and fragmentation data. TTL inspection provides immediate contextual OS intelligence and path-length indicators during forensic triage.",
                "furtherReading": [
                    {"title": "RFC 791 — Internet Protocol Specification", "url": "https://datatracker.ietf.org/doc/html/rfc791"}
                ]
            }
        },
        {
            "id": "les-00-4-tcp-handshake-flags",
            "slug": "tcp-handshake-sequence-flags",
            "title": "TCP Three-Way Handshake, Sequence Numbers & Flags",
            "description": "Dissect the Transmission Control Protocol (TCP) three-way handshake, SYN, ACK, FIN, RST, PSH, and URG flags, relative vs. raw sequence numbers, and teardown flows.",
            "durationMinutes": 35,
            "order": 4,
            "objectives": [
                "Deconstruct the TCP 3-way handshake: SYN, SYN-ACK, ACK",
                "Understand relative vs. raw 32-bit sequence and acknowledgment numbers",
                "Interpret TCP control flags (SYN, ACK, FIN, RST, PSH, URG, ECE, CWR)",
                "Diagnose clean connection teardowns (FIN-ACK) versus abrupt resets (RST)"
            ],
            "tags": ["tcp", "handshake", "tcp-flags", "syn-ack", "sequence-numbers"],
            "skillsTaught": ["Handshake verification", "Flag combination analysis", "RST cause deduction"],
            "richContent": {
                "introduction": "The Transmission Control Protocol (TCP) provides connection-oriented, ordered, reliable byte-stream transmission. Before any application data can be exchanged over HTTP, SSH, FTP, or TLS, both endpoints must establish synchronized sequence numbers through the classical three-way handshake.",
                "prerequisites": ["Lesson 0.3: IPv4 & IPv6 Packet Headers"],
                "keyTerminology": [
                    {"term": "SYN (Synchronize)", "definition": "Initial connection request flag indicating the sender is establishing a session and announcing its Initial Sequence Number (ISN)."},
                    {"term": "ACK (Acknowledgment)", "definition": "Indicates the acknowledgment number field is valid, confirming receipt of all preceding bytes."},
                    {"term": "RST (Reset)", "definition": "Abruptly terminates a connection due to closed port, security policy rejection, or unrecoverable error."}
                ],
                "theorySections": [
                    {
                        "title": "The Three-Way Handshake Sequence Mechanics",
                        "content": "Client transmits SYN with random Initial Sequence Number (ISN_c). Server responds with SYN-ACK containing its own random ISN_s and ACK = ISN_c + 1. Client finishes with ACK where Seq = ISN_c + 1 and Ack = ISN_s + 1. Wireshark simplifies analysis by presenting relative sequence numbers starting from 0 by default.",
                        "keyPoints": [
                            "SYN consumes 1 sequence number byte in the stream despite carrying 0 payload bytes.",
                            "FIN consumes 1 sequence number byte during graceful termination.",
                            "RST consumes 0 sequence number bytes and requires no acknowledgment."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Filter for TCP Handshakes",
                        "instruction": "Filter for all initial connection attempts with SYN=1 and ACK=0.",
                        "filter": "tcp.flags.syn == 1 and tcp.flags.ack == 0",
                        "expectedOutcome": "Only initial client connection requests are shown."
                    },
                    {
                        "step": 2,
                        "title": "Follow the Full Handshake",
                        "instruction": "Right-click any SYN packet, select Conversation Filter -> TCP, and observe the initial 3 packets.",
                        "expectedOutcome": "Packet 1: [SYN], Packet 2: [SYN, ACK], Packet 3: [ACK]."
                    }
                ],
                "displayFilters": [
                    {"filter": "tcp.flags.reset == 1", "description": "Filters for connection reset packets", "purpose": "Identify refused connections or firewall teardowns"},
                    {"filter": "tcp.flags.syn == 1 and tcp.flags.ack == 1", "description": "Filters for server acceptance responses", "purpose": "Confirm open ports and responsive services"}
                ],
                "expectedObservations": [
                    "Relative sequence numbers start at 0 for both sides of the stream, making delta tracking straightforward.",
                    "Raw sequence numbers are 32-bit cryptographically randomized integers."
                ],
                "commonMistakes": [
                    "Confusing Wireshark relative sequence numbers (0, 1, 2) with raw wire numbers on the wire."
                ],
                "securityRelevance": "SYN flood attacks bombard targets with spoofed SYN packets without completing the third ACK, exhausting kernel connection queues. Unsolicited RST packets indicate active network firewall intervention or port scanners probing closed ports.",
                "knowledgeCheck": {
                    "question": "During a TCP handshake, what control flags are set on the second packet returned from the server to the client?",
                    "options": ["SYN", "SYN and ACK", "ACK and PSH", "RST and ACK"],
                    "correctAnswerIndex": 1,
                    "explanation": "The second packet of the three-way handshake is the SYN-ACK, which acknowledges the client Initial Sequence Number and synchronizes the server sequence number.",
                    "difficulty": "beginner"
                },
                "summary": "The TCP handshake synchronizes connection parameters and initial sequence numbers. Control flags indicate the operational state of each transport conversation, forming the bedrock of stateful traffic analysis.",
                "furtherReading": [
                    {"title": "RFC 9293 — Transmission Control Protocol (TCP)", "url": "https://datatracker.ietf.org/doc/html/rfc9293"}
                ]
            }
        },
        {
            "id": "les-00-5-udp-icmp-infra",
            "slug": "udp-icmp-dns-dhcp-protocols",
            "title": "UDP, ICMP & Core Infrastructure Protocols (DNS, DHCP)",
            "description": "Examine stateless User Datagram Protocol (UDP) communication, Internet Control Message Protocol (ICMP) error reporting, DNS resolutions, and DHCP leases.",
            "durationMinutes": 30,
            "order": 5,
            "objectives": [
                "Deconstruct lightweight UDP header fields (Source Port, Dest Port, Length, Checksum)",
                "Interpret ICMP Type and Code values (Echo Request/Reply, Destination Unreachable, Time Exceeded)",
                "Trace DNS query/response structures and identify recursive lookup flows",
                "Analyze the 4-step DHCP DORA sequence: Discover, Offer, Request, Acknowledge"
            ],
            "tags": ["udp", "icmp", "dns", "dhcp", "infrastructure"],
            "skillsTaught": ["DNS query dissection", "ICMP type/code decoding", "DHCP lease tracing"],
            "richContent": {
                "introduction": "While TCP governs reliable sessions, UDP powers time-sensitive, low-overhead services such as DNS, DHCP, and media streaming. ICMP serves as the diagnostic and error-reporting mechanism of the network layer. Understanding how baseline infrastructure traffic appears is essential for spotting anomalies.",
                "prerequisites": ["Lesson 0.3: IPv4 & IPv6 Packet Headers"],
                "keyTerminology": [
                    {"term": "UDP (User Datagram Protocol)", "definition": "A connectionless, lightweight 8-byte header transport protocol offering no reliability, retransmission, or flow control."},
                    {"term": "ICMP (Internet Control Message Protocol)", "definition": "Network layer protocol used by routers and hosts to send error messages and operational information (e.g. Host Unreachable)."},
                    {"term": "DORA", "definition": "The 4-step DHCP lease exchange: Discover (Broadcast), Offer (Unicast/Broadcast), Request (Broadcast), Acknowledge (Unicast)."}
                ],
                "theorySections": [
                    {
                        "title": "ICMP Diagnostics: Echo, Unreachable, and Time Exceeded",
                        "content": "ICMP packets contain a Type and Code field. Type 8/Code 0 indicates Echo Request (Ping), Type 0/Code 0 is Echo Reply. Type 3 indicates Destination Unreachable, with Code 3 signifying Port Unreachable (frequently returned by firewalls or closed UDP ports). Type 11/Code 0 signifies Time-to-Live Exceeded in Transit, utilized by traceroute.",
                        "keyPoints": [
                            "Traceroute intentionally sends packets with TTL 1, 2, 3... to elicit ICMP Type 11 responses from each hop.",
                            "DNS operates primarily on UDP port 53 for standard queries and TCP port 53 for large zone transfers or EDNS0 payloads exceeding 512 bytes."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Filter for DNS Resolution Traffic",
                        "instruction": "Filter for standard DNS queries and responses.",
                        "filter": "dns",
                        "expectedOutcome": "Domain Name System queries (A, AAAA, TXT, MX) and corresponding responses are displayed."
                    },
                    {
                        "step": 2,
                        "title": "Identify DNS Query Names and RCODEs",
                        "instruction": "Select a DNS response and expand Queries and Answers in Packet Details. Inspect dns.flags.rcode.",
                        "filter": "dns.flags.rcode != 0",
                        "expectedOutcome": "Filters for DNS errors such as NXDomain (No Such Name, RCODE 3) or Server Failure (RCODE 2)."
                    }
                ],
                "displayFilters": [
                    {"filter": "bootp or dhcp", "description": "Filters for DHCP Discover, Offer, Request, and ACK packets", "purpose": "Track IP lease assignments"},
                    {"filter": "icmp.type == 3 and icmp.code == 3", "description": "Filters for ICMP Port Unreachable error packets", "purpose": "Detect UDP port scanning or closed service responses"}
                ],
                "expectedObservations": [
                    "DHCP Discover packets originate from 0.0.0.0:68 targeting 255.255.255.255:67.",
                    "DNS responses include Answer, Authoritative, and Additional records."
                ],
                "commonMistakes": [
                    "Assuming DNS only uses UDP; zone transfers and DNSSEC/EDNS0 large responses frequently use TCP port 53."
                ],
                "securityRelevance": "Adversaries leverage ICMP for covert exfiltration (ICMP tunneling) and exploit DNS for command-and-control beaconing and data exfiltration via TXT/A record queries.",
                "knowledgeCheck": {
                    "question": "What ICMP Type and Code are returned by an intermediate router when a packet TTL reaches zero during transit?",
                    "options": ["Type 8, Code 0", "Type 0, Code 0", "Type 11, Code 0", "Type 3, Code 1"],
                    "correctAnswerIndex": 2,
                    "explanation": "ICMP Type 11 (Time Exceeded), Code 0 (Time to live exceeded in transit) is generated when a router decrements a packet TTL to zero.",
                    "difficulty": "intermediate"
                },
                "summary": "UDP, ICMP, DNS, and DHCP form the core fabric of local and wide-area networks. Mastering their normal operational signatures enables rapid isolation of reconnaissance scans and tunneling.",
                "furtherReading": [
                    {"title": "RFC 768 — User Datagram Protocol", "url": "https://datatracker.ietf.org/doc/html/rfc768"},
                    {"title": "RFC 1035 — Domain Names: Implementation and Specification", "url": "https://datatracker.ietf.org/doc/html/rfc1035"}
                ]
            }
        }
    ],
    "practicalLab": {
        "id": "lab-00-header-dissection",
        "title": "Lab 00: Frame & Packet Header Dissection Lab",
        "objective": "Dissect Ethernet, IP, TCP, and UDP headers in a multi-protocol capture, identifying encapsulation boundaries, IP hop counts, and handshake completions.",
        "toolsRequired": ["Wireshark 4.x or higher"],
        "pcapSource": {
            "fileName": "Scenario 1.pcapng",
            "fileUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Scenario%201.pcapng",
            "repositoryUrl": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
            "sha256": "7c81d86d634ebbbd6174a8894101e19485bb24a0d92298e82ef45b721245b73d"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 45,
        "instructions": [
            "Open Scenario 1.pcapng in Wireshark.",
            "Locate the first three TCP handshake packets between the client and a web service.",
            "Record the client MAC, gateway MAC, source IP, destination IP, source port, and destination port.",
            "Determine the observed TTL and deduce the probable host OS family."
        ],
        "tasks": [
            {"id": "task-00-1", "description": "Locate the first SYN packet in the capture", "hint": "Apply display filter: tcp.flags.syn == 1 and tcp.flags.ack == 0", "filterSuggestion": "tcp.flags.syn == 1 and tcp.flags.ack == 0"},
            {"id": "task-00-2", "description": "Identify the client source MAC and destination default gateway MAC", "hint": "Inspect Ethernet II header in Packet Details"},
            {"id": "task-00-3", "description": "Verify whether the server responded with a valid SYN-ACK", "hint": "Follow the TCP conversation or filter by tcp.flags.syn == 1 and tcp.flags.ack == 1"}
        ],
        "evidenceWorksheet": [
            {"field": "Client MAC Address", "prompt": "Enter the hardware address of the initiating host:", "expectedEvidenceType": "Hexadecimal MAC (e.g. 00:11:22:33:44:55)"},
            {"field": "Initial Sequence Number (Raw)", "prompt": "Enter the 32-bit raw ISN of the client SYN:", "expectedEvidenceType": "Integer / Hex sequence"},
            {"field": "Server Observed TTL", "prompt": "Enter the observed TTL in the server SYN-ACK response:", "expectedEvidenceType": "Integer 1-255"}
        ],
        "questions": [
            {
                "question": "What is the standard Ethernet header size before the IP packet begins?",
                "options": ["12 bytes", "14 bytes", "20 bytes", "32 bytes"],
                "correctAnswerIndex": 1,
                "explanation": "Ethernet II headers contain 6 bytes Destination MAC + 6 bytes Source MAC + 2 bytes EtherType = 14 bytes.",
                "difficulty": "beginner"
            }
        ],
        "completionCriteria": [
            "All three packets of a TCP handshake identified",
            "Layer 2 MAC, Layer 3 IP, and Layer 4 ports documented in worksheet",
            "Worksheet submitted with accurate values"
        ]
    },
    "quiz": {
        "title": "Module 00 Assessment: Networking Prerequisites",
        "questions": [
            {
                "question": "Which field in the IPv4 header is decremented by 1 at each intermediate router to prevent perpetual routing loops?",
                "options": ["Header Checksum", "Identification", "Time to Live (TTL)", "Differentiated Services Field"],
                "correctAnswerIndex": 2,
                "explanation": "The Time to Live (TTL) field is decremented by each router hop. When it hits 0, the packet is dropped and an ICMP Time Exceeded is returned.",
                "difficulty": "beginner"
            },
            {
                "question": "Which TCP flag is used to gracefully close a connection in both directions?",
                "options": ["RST (Reset)", "FIN (Finish)", "PSH (Push)", "SYN (Synchronize)"],
                "correctAnswerIndex": 1,
                "explanation": "FIN is transmitted by each endpoint wishing to terminate its half of the bidirectional TCP stream gracefully.",
                "difficulty": "beginner"
            },
            {
                "question": "What is the primary operational role of ARP on an Ethernet segment?",
                "options": ["Assigning IP addresses automatically", "Resolving hostnames to IP addresses", "Translating Layer 3 IP addresses to Layer 2 MAC addresses", "Routing packets across wide area networks"],
                "correctAnswerIndex": 2,
                "explanation": "Address Resolution Protocol (ARP) translates known Layer 3 logical IP addresses into Layer 2 physical MAC addresses for delivery within the local broadcast domain.",
                "difficulty": "beginner"
            }
        ]
    }
}

