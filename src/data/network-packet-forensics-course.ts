import { Course } from '../types/course';

export const NETWORK_PACKET_FORENSICS_COURSE: Course = {
  "id": "course-packet-analysis-wireshark",
  "slug": "network-packet-analysis-masterclass",
  "title": "Network Packet Analysis & Forensics Masterclass",
  "shortDescription": "Master Wireshark, deep-dive into TCP/IP protocol handshakes, and isolate anomalous network traffic with hands-on PCAP labs and SOC capstone.",
  "description": "An intensive, hands-on professional network packet forensics curriculum designed for SOC analysts, incident responders, and network security engineers. Master Wireshark interface tuning, low-level protocol dissection, display filter automation, malware traffic analysis, C2 beacon timing detection, TShark CLI pipelines, digital evidence preservation, and an assessed enterprise intrusion capstone.",
  "domains": [
    "network-security",
    "soc-blue-team",
    "dfir"
  ],
  "tags": [
    "wireshark",
    "packet-analysis",
    "pcap",
    "network-forensics",
    "tshark",
    "malware-analysis",
    "c2-beaconing",
    "soc-investigation",
    "incident-response"
  ],
  "difficulty": "advanced",
  "thumbnailUrl": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
  "estimatedDuration": "23 hours 30 mins",
  "totalDurationMinutes": 1410,
  "instructor": {
    "name": "Netsec Explained",
    "title": "Network Security & Forensics Researcher"
  },
  "prerequisites": [
    "Basic understanding of IPv4 addressing and subnet masks",
    "Familiarity with the OSI 7-Layer model and TCP/UDP port concepts",
    "Installed Wireshark 4.x or higher analysis environment"
  ],
  "learningObjectives": [
    "Execute the structured 5-phase forensic triage model on unknown multi-gigabyte PCAP files",
    "Capture and filter packet streams with advanced Wireshark display filter syntax and byte slice notation",
    "Diagnose network latency, packet loss, TCP Zero-Window events, and retransmissions in TCP streams",
    "Trace SSL/TLS key exchanges, extract cleartext SNI domain hostnames, and inspect X.509 certificate chains",
    "Isolate malware delivery funnels, extract dropped executables via Export Objects, and calculate C2 beacon intervals and jitter",
    "Detect cleartext FTP authentication, port scanning reconnaissance fingerprints, and SYN flood denial of service",
    "Automate high-speed headless packet dissection and field extraction using TShark, editcap, and capinfos",
    "Preserve immutable cryptographic chain of custody (SHA256) and author professional SOC incident response reports",
    "Investigate and submit the comprehensive Operation Blackout Beacon 100-mark enterprise intrusion capstone"
  ],
  "featured": true,
  "track": "cybersecurity",
  "sourcePlatform": "youtube",
  "pcapResources": [
    {
      "id": "pcap-hackers-on-the-network",
      "title": "Hackers on the Network PCAP",
      "fileName": "Hackers on the Network.pcapng",
      "downloadUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Hackers%20on%20the%20Network.pcapng",
      "sourceRepository": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
      "fileFormat": "pcapng",
      "intendedModule": "Module 03 & Module 04",
      "learningPurpose": "Adversary intrusion triage, command-and-control (C2) beacon detection, and malicious payload analysis.",
      "safetyGuidance": "Educational PCAP containing adversary simulation traffic. Analyze within an isolated Wireshark environment without executing extracted payloads on host systems.",
      "instructions": [
        "Download the file to your designated forensic analysis workspace.",
        "Verify SHA256 integrity hash before opening.",
        "Launch Wireshark and open the capture with a forensic inspection profile.",
        "Apply display filters to isolate anomalous IP conversations."
      ],
      "sha256": "b2bd9a8b484f4ded72a4ce7de1335198d5ae6e81ace89fe6e6d5a071e1391cd9",
      "verificationDate": "2026-11-06",
      "verificationMethod": "Direct SHA-256 computation from upstream git master raw source"
    },
    {
      "id": "pcap-scenario-1",
      "title": "Forensic Scenario 1 PCAP",
      "fileName": "Scenario 1.pcapng",
      "downloadUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Scenario%201.pcapng",
      "sourceRepository": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
      "fileFormat": "pcapng",
      "intendedModule": "Module 00, Module 02 & Module 03",
      "learningPurpose": "Multi-protocol baseline analysis, TCP stream reassembly, and TLS handshake inspection.",
      "safetyGuidance": "Synthetic enterprise baseline capture containing web browsing, DNS queries, and background service traffic.",
      "instructions": [
        "Open in Wireshark and observe the Protocol Hierarchy statistics.",
        "Filter for HTTP and TLS streams to identify external connections.",
        "Practice stream reassembly to inspect conversation content."
      ],
      "sha256": "3d15daea9d46ee8aa6a3a111a3ee37e2e5be009d509d57a249dd850d510b07d8",
      "verificationDate": "2026-11-06",
      "verificationMethod": "Direct SHA-256 computation from upstream git master raw source"
    },
    {
      "id": "pcap-scenario-2",
      "title": "Forensic Scenario 2 PCAP",
      "fileName": "Scenario 2.pcap",
      "downloadUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Scenario%202.pcap",
      "sourceRepository": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
      "fileFormat": "pcap",
      "intendedModule": "Module 05 & Module 06",
      "learningPurpose": "Reconnaissance scanning, SYN flood denial-of-service, and cleartext FTP credential recovery.",
      "safetyGuidance": "Contains synthetic port scanning and simulated attack traffic. Demonstration credentials only.",
      "instructions": [
        "Load the PCAP into Wireshark or TShark.",
        "Filter for ftp or ftp-data to recover unencrypted authentication credentials.",
        "Inspect TCP SYN packets without ACK responses to quantify port scanning behavior."
      ],
      "sha256": "f664404d592d4fd647ebdf8117eb91b91a868fad1b54888e2117d1b271ba5b11",
      "verificationDate": "2026-11-06",
      "verificationMethod": "Direct SHA-256 computation from upstream git master raw source"
    },
    {
      "id": "pcap-wireshark-wiki-samples",
      "title": "Wireshark Foundation Sample Captures",
      "fileName": "Wireshark Sample Captures Collection",
      "downloadUrl": "https://wiki.wireshark.org/SampleCaptures",
      "sourceRepository": "https://wiki.wireshark.org/SampleCaptures",
      "fileFormat": "pcapng",
      "intendedModule": "Reference Library (All Modules)",
      "learningPurpose": "Reference captures for specialized protocols including DNSSEC, HTTP/2, SMB2/3, Kerberos, and VoIP SIP/RTP.",
      "safetyGuidance": "Official open community captures curated by the Wireshark development team and community contributors.",
      "instructions": [
        "Browse the wiki for target protocols discussed in each module.",
        "Download individual protocol samples to compare against anomalous traffic.",
        "Use for protocol header validation and custom filter creation."
      ],
      "verificationMethod": "External community capture index; individual protocol capture hashes maintained upstream"
    }
  ],
  "capstone": {
    "id": "capstone-operation-blackout-beacon",
    "title": "Operation Blackout Beacon \u2014 SOC Enterprise Intrusion Forensics",
    "scenario": "Simulated Incident Scenario: In this capstone scenario, an enterprise SOC analyst is presented with a realistic intrusion investigation narrative. Note: The scenario narrative, timestamps, and IP addresses below serve as an illustrative forensic challenge framework, while the analysis is conducted against the real multi-stage capture 'Hackers on the Network.pcapng' created by Netsec Explained. As the Lead Network Forensics Specialist, you have been tasked with investigating the capture, identifying anomalous protocol flows, isolating secondary payloads and beacons, evaluating command-and-control (C2) communication patterns, mapping connection attempts, and compiling a structured technical and executive report.",
    "pcapSource": {
      "fileName": "Hackers on the Network.pcapng",
      "fileUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Hackers%20on%20the%20Network.pcapng",
      "sha256": "b2bd9a8b484f4ded72a4ce7de1335198d5ae6e81ace89fe6e6d5a071e1391cd9"
    },
    "totalMarks": 100,
    "passingScore": 75,
    "rubric": [
      {
        "category": "1. Initial PCAP Triage",
        "marks": 15,
        "criteria": [
          "Accurately calculates total packet count, byte volume, capture duration, and average data rate",
          "Produces a comprehensive Protocol Hierarchy breakdown identifying top Layer 4 and Layer 7 protocols",
          "Isolates top IP talkers and lists all external IP endpoints communicating with internal subnets"
        ]
      },
      {
        "category": "2. Protocol Investigation",
        "marks": 15,
        "criteria": [
          "Identifies DNS anomalies, unauthorized DNS resolvers, and suspicious domain lookup spikes",
          "Reconstructs unencrypted HTTP requests, inspecting User-Agents, URIs, and server response codes",
          "Extracts TLS Server Name Indication (SNI) values and validates SSL certificate issuer validity"
        ]
      },
      {
        "category": "3. Suspicious Activity & Malware Detection",
        "marks": 20,
        "criteria": [
          "Pinpoints adversary C2 communication channels and calculates regular beaconing interval/jitter",
          "Carves and hashes the primary dropped executable artifact using Export Objects (HTTP/SMB)",
          "Detects active reconnaissance or brute-force scanning against internal domain controllers"
        ]
      },
      {
        "category": "4. Evidence Preservation & Forensic Rigor",
        "marks": 15,
        "criteria": [
          "Generates cryptographic SHA256 hashes of original PCAP and extracted forensic artifacts",
          "Documents immutable chain of custody with exact UTC timestamps and sensor interface identifiers",
          "Ensures that no extracted binaries are executed during static network analysis"
        ]
      },
      {
        "category": "5. Timeline Reconstruction",
        "marks": 15,
        "criteria": [
          "Builds a chronological UTC timestamped sequence of events from initial probe to exfiltration",
          "Correlates TCP sequence delta timings with adversary interaction pauses and automated script executions",
          "Identifies exact start and stop timestamps of lateral movement and data exfiltration sessions"
        ]
      },
      {
        "category": "6. Incident Report Quality & Remediation",
        "marks": 20,
        "criteria": [
          "Authors clear Executive Summary accessible to leadership detailing business impact and root cause",
          "Provides granular Technical Findings section complete with IOC table (IPs, Domains, Hashes, Ports)",
          "Recommends concrete immediate containment measures, network segmentation, and firewall rules"
        ]
      }
    ],
    "submissionSections": [
      {
        "id": "sub-triage",
        "title": "Phase 1: Initial PCAP Triage & Endpoint Discovery",
        "prompt": "Summarize the capture characteristics: total duration, packet count, primary internal subnets involved, and top external IP endpoints by transmitted byte volume.",
        "maxMarks": 15
      },
      {
        "id": "sub-protocols",
        "title": "Phase 2: Protocol Breakdown & DNS/TLS Investigation",
        "prompt": "Document all observed DNS queries to anomalous domains, suspicious HTTP User-Agent strings, and external TLS connection hostnames identified via SNI.",
        "maxMarks": 15
      },
      {
        "id": "sub-malware",
        "title": "Phase 3: C2 Detection & Payload Carving",
        "prompt": "Identify the exact IP, port, and protocol used for C2 communication. Calculate the beaconing interval and jitter. Provide the filename, size, and SHA256 of any carved executable payloads.",
        "maxMarks": 20
      },
      {
        "id": "sub-preservation",
        "title": "Phase 4: Evidence Integrity & Chain of Custody Record",
        "prompt": "Record the verification hashes of the evidence capture, specify proper handling procedures for malicious PCAP artifacts, and describe how sanitization would be performed if sharing with external CERTs.",
        "maxMarks": 15
      },
      {
        "id": "sub-timeline",
        "title": "Phase 5: Master Intrusion Timeline (UTC)",
        "prompt": "Provide a chronological table of key incident milestones: First Probe, Initial Infection / Download, C2 Established, Internal Reconnaissance, Lateral Movement, and Exfiltration.",
        "maxMarks": 15
      },
      {
        "id": "sub-report",
        "title": "Phase 6: Incident Remediation & SOC Containment Plan",
        "prompt": "Write actionable remediation recommendations: immediate firewall egress block rules, DNS sinkholing commands, host isolation priorities, and Snort/Suricata signature recommendations.",
        "maxMarks": 20
      }
    ]
  },
  "modules": [
    {
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
          "tags": [
            "osi-model",
            "tcp-ip",
            "encapsulation",
            "pdu",
            "networking-basics"
          ],
          "skillsTaught": [
            "Layer-by-layer dissection",
            "Encapsulation tracing",
            "PDU mapping"
          ],
          "richContent": {
            "introduction": "Every packet traversing an Ethernet network represents the end result of hierarchical protocol encapsulation. Understanding how application data is packaged into transport segments, wrapped in network datagrams, framed by link-layer headers, and transmitted as physical signals is the fundamental prerequisite of all network forensics.",
            "prerequisites": [
              "Basic computer literacy",
              "Understanding of client-server architecture"
            ],
            "keyTerminology": [
              {
                "term": "PDU (Protocol Data Unit)",
                "definition": "The specific unit of data processed at a given layer: Data (Layer 7-5), Segment (Layer 4), Packet (Layer 3), Frame (Layer 2), Bits (Layer 1)."
              },
              {
                "term": "Encapsulation",
                "definition": "The process whereby higher-layer protocols add header and trailer metadata as data descends the network stack."
              },
              {
                "term": "MTU (Maximum Transmission Unit)",
                "definition": "The largest packet or frame size (typically 1500 bytes for standard Ethernet) that can be transmitted on a network link without fragmentation."
              }
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
                "headerFields": [
                  "Destination MAC (6B)",
                  "Source MAC (6B)",
                  "EtherType (2B)",
                  "IP Version/IHL (1B)",
                  "Total Length (2B)",
                  "TTL (1B)",
                  "Protocol (1B)",
                  "Source/Dest IP (8B)",
                  "Source/Dest Port (4B)",
                  "Seq/Ack Num (8B)",
                  "Flags (12b)",
                  "Window Size (2B)"
                ]
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
              {
                "filter": "frame.len > 1514",
                "description": "Detects oversized frames (Jumbo frames or segmentation offload artifacts)",
                "purpose": "Encapsulation & MTU diagnostics"
              },
              {
                "filter": "eth.type == 0x0800",
                "description": "Filters for IPv4 frames exclusively",
                "purpose": "Protocol layer isolation"
              }
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
              "options": [
                "Data Link Layer (Layer 2)",
                "Network Layer (Layer 3)",
                "Transport Layer (Layer 4)",
                "Session Layer (Layer 5)"
              ],
              "correctAnswerIndex": 1,
              "explanation": "The Network Layer (Layer 3), implemented by protocols such as IPv4 and IPv6, provides logical addressing (IP addresses) and routing across routed network boundaries. Layer 2 handles hop-by-hop local framing via MAC addresses.",
              "difficulty": "beginner"
            },
            "summary": "Protocol encapsulation adds structured metadata at each network layer. Forensics analysts must fluently dissect Layer 2 framing, Layer 3 addressing, and Layer 4 transport semantics to uncover anomalous behavior embedded within raw packet captures.",
            "furtherReading": [
              {
                "title": "RFC 1122 \u2014 Requirements for Internet Hosts: Communication Layers",
                "url": "https://datatracker.ietf.org/doc/html/rfc1122"
              },
              {
                "title": "Wireshark User Guide: Packet Dissection",
                "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChDissectView.html"
              }
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
          "tags": [
            "ethernet",
            "mac-address",
            "arp",
            "arp-spoofing",
            "layer-2"
          ],
          "skillsTaught": [
            "MAC OUI lookup",
            "ARP conversation tracing",
            "Spoofing detection"
          ],
          "richContent": {
            "introduction": "Within local broadcast domains, network interfaces do not communicate using IP addresses; they resolve Layer 3 logical addresses to Layer 2 48-bit Media Access Control (MAC) addresses using the Address Resolution Protocol (ARP). Because ARP lacks cryptographic authentication, it is historically vulnerable to spoofing, poisoning, and man-in-the-middle attacks.",
            "prerequisites": [
              "Lesson 0.1: OSI & TCP/IP Encapsulation"
            ],
            "keyTerminology": [
              {
                "term": "MAC Address",
                "definition": "A 48-bit physical hardware identifier formatted as 6 hexadecimal octets (e.g. 00:1A:2B:3C:4D:5E). The first 24 bits represent the Organizationally Unique Identifier (OUI)."
              },
              {
                "term": "ARP Request",
                "definition": "A broadcast frame (Destination MAC ff:ff:ff:ff:ff:ff) asking 'Who has IP X.X.X.X? Tell IP Y.Y.Y.Y'."
              },
              {
                "term": "ARP Reply",
                "definition": "A unicast frame responding 'IP X.X.X.X is at MAC AA:BB:CC:DD:EE:FF'."
              }
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
              {
                "filter": "arp.opcode == 2",
                "description": "Filters for ARP reply packets",
                "purpose": "Identify IP-to-MAC resolution responses"
              },
              {
                "filter": "arp.duplicate-address-frame",
                "description": "Detects duplicate IP addresses or ARP poisoning attacks",
                "purpose": "ARP anomaly and spoofing triage"
              }
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
              "options": [
                "00:00:00:00:00:00",
                "127.0.0.1",
                "ff:ff:ff:ff:ff:ff",
                "01:00:5e:00:00:01"
              ],
              "correctAnswerIndex": 2,
              "explanation": "ARP Request frames must reach every host on the local Ethernet collision/broadcast domain, requiring the all-ones broadcast MAC address ff:ff:ff:ff:ff:ff.",
              "difficulty": "beginner"
            },
            "summary": "Ethernet frames deliver packets between local hardware nodes using MAC addresses. ARP binds Layer 3 IPs to Layer 2 MACs, making its inspection crucial for identifying local network impersonation and MITM attacks.",
            "furtherReading": [
              {
                "title": "RFC 826 \u2014 An Ethernet Address Resolution Protocol",
                "url": "https://datatracker.ietf.org/doc/html/rfc826"
              }
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
          "tags": [
            "ipv4",
            "ipv6",
            "ttl",
            "fragmentation",
            "subnetting"
          ],
          "skillsTaught": [
            "Header field decoding",
            "TTL hop counting",
            "Fragmentation reassembly analysis"
          ],
          "richContent": {
            "introduction": "The Internet Protocol (IP) provides host-to-host delivery across routed internetworks. Understanding header fields such as Time-to-Live (TTL) allows analysts to infer the operating system of remote endpoints and estimate the number of intermediate router hops traversed.",
            "prerequisites": [
              "Lesson 0.1: OSI & TCP/IP Encapsulation"
            ],
            "keyTerminology": [
              {
                "term": "TTL (Time to Live)",
                "definition": "An 8-bit counter decremented by 1 at each router hop to prevent forwarding loops. Initial values are OS-dependent: Linux/macOS typically start at 64; Windows typically starts at 128."
              },
              {
                "term": "CIDR (Classless Inter-Domain Routing)",
                "definition": "A method for allocating IP addresses and IP routing using variable-length subnet masks (e.g. 192.168.1.0/24)."
              }
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
              {
                "filter": "ip.flags.mf == 1 or ip.frag_offset > 0",
                "description": "Filters for fragmented IP datagrams",
                "purpose": "Identify network fragmentation and evasion attacks"
              },
              {
                "filter": "ip.ttl <= 5",
                "description": "Detects packets nearing hop expiration",
                "purpose": "Trace traceroute packets or routing loops"
              }
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
              "options": [
                "Initial TTL 64 (Linux/UNIX)",
                "Initial TTL 128 (Windows)",
                "Initial TTL 255 (Network Router)",
                "Initial TTL 32 (Legacy System)"
              ],
              "correctAnswerIndex": 0,
              "explanation": "Standard Linux kernels initialize TTL at 64. Passing through 12 internet router hops decrements 64 - 12 = 52. If it were Windows (128), 12 hops would yield a TTL around 116.",
              "difficulty": "intermediate"
            },
            "summary": "IP headers convey critical routing, hop count, and fragmentation data. TTL inspection provides immediate contextual OS intelligence and path-length indicators during forensic triage.",
            "furtherReading": [
              {
                "title": "RFC 791 \u2014 Internet Protocol Specification",
                "url": "https://datatracker.ietf.org/doc/html/rfc791"
              }
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
          "tags": [
            "tcp",
            "handshake",
            "tcp-flags",
            "syn-ack",
            "sequence-numbers"
          ],
          "skillsTaught": [
            "Handshake verification",
            "Flag combination analysis",
            "RST cause deduction"
          ],
          "richContent": {
            "introduction": "The Transmission Control Protocol (TCP) provides connection-oriented, ordered, reliable byte-stream transmission. Before any application data can be exchanged over HTTP, SSH, FTP, or TLS, both endpoints must establish synchronized sequence numbers through the classical three-way handshake.",
            "prerequisites": [
              "Lesson 0.3: IPv4 & IPv6 Packet Headers"
            ],
            "keyTerminology": [
              {
                "term": "SYN (Synchronize)",
                "definition": "Initial connection request flag indicating the sender is establishing a session and announcing its Initial Sequence Number (ISN)."
              },
              {
                "term": "ACK (Acknowledgment)",
                "definition": "Indicates the acknowledgment number field is valid, confirming receipt of all preceding bytes."
              },
              {
                "term": "RST (Reset)",
                "definition": "Abruptly terminates a connection due to closed port, security policy rejection, or unrecoverable error."
              }
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
              {
                "filter": "tcp.flags.reset == 1",
                "description": "Filters for connection reset packets",
                "purpose": "Identify refused connections or firewall teardowns"
              },
              {
                "filter": "tcp.flags.syn == 1 and tcp.flags.ack == 1",
                "description": "Filters for server acceptance responses",
                "purpose": "Confirm open ports and responsive services"
              }
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
              "options": [
                "SYN",
                "SYN and ACK",
                "ACK and PSH",
                "RST and ACK"
              ],
              "correctAnswerIndex": 1,
              "explanation": "The second packet of the three-way handshake is the SYN-ACK, which acknowledges the client Initial Sequence Number and synchronizes the server sequence number.",
              "difficulty": "beginner"
            },
            "summary": "The TCP handshake synchronizes connection parameters and initial sequence numbers. Control flags indicate the operational state of each transport conversation, forming the bedrock of stateful traffic analysis.",
            "furtherReading": [
              {
                "title": "RFC 9293 \u2014 Transmission Control Protocol (TCP)",
                "url": "https://datatracker.ietf.org/doc/html/rfc9293"
              }
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
          "tags": [
            "udp",
            "icmp",
            "dns",
            "dhcp",
            "infrastructure"
          ],
          "skillsTaught": [
            "DNS query dissection",
            "ICMP type/code decoding",
            "DHCP lease tracing"
          ],
          "richContent": {
            "introduction": "While TCP governs reliable sessions, UDP powers time-sensitive, low-overhead services such as DNS, DHCP, and media streaming. ICMP serves as the diagnostic and error-reporting mechanism of the network layer. Understanding how baseline infrastructure traffic appears is essential for spotting anomalies.",
            "prerequisites": [
              "Lesson 0.3: IPv4 & IPv6 Packet Headers"
            ],
            "keyTerminology": [
              {
                "term": "UDP (User Datagram Protocol)",
                "definition": "A connectionless, lightweight 8-byte header transport protocol offering no reliability, retransmission, or flow control."
              },
              {
                "term": "ICMP (Internet Control Message Protocol)",
                "definition": "Network layer protocol used by routers and hosts to send error messages and operational information (e.g. Host Unreachable)."
              },
              {
                "term": "DORA",
                "definition": "The 4-step DHCP lease exchange: Discover (Broadcast), Offer (Unicast/Broadcast), Request (Broadcast), Acknowledge (Unicast)."
              }
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
              {
                "filter": "bootp or dhcp",
                "description": "Filters for DHCP Discover, Offer, Request, and ACK packets",
                "purpose": "Track IP lease assignments"
              },
              {
                "filter": "icmp.type == 3 and icmp.code == 3",
                "description": "Filters for ICMP Port Unreachable error packets",
                "purpose": "Detect UDP port scanning or closed service responses"
              }
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
              "options": [
                "Type 8, Code 0",
                "Type 0, Code 0",
                "Type 11, Code 0",
                "Type 3, Code 1"
              ],
              "correctAnswerIndex": 2,
              "explanation": "ICMP Type 11 (Time Exceeded), Code 0 (Time to live exceeded in transit) is generated when a router decrements a packet TTL to zero.",
              "difficulty": "intermediate"
            },
            "summary": "UDP, ICMP, DNS, and DHCP form the core fabric of local and wide-area networks. Mastering their normal operational signatures enables rapid isolation of reconnaissance scans and tunneling.",
            "furtherReading": [
              {
                "title": "RFC 768 \u2014 User Datagram Protocol",
                "url": "https://datatracker.ietf.org/doc/html/rfc768"
              },
              {
                "title": "RFC 1035 \u2014 Domain Names: Implementation and Specification",
                "url": "https://datatracker.ietf.org/doc/html/rfc1035"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-00-header-dissection",
        "title": "Lab 00: Frame & Packet Header Dissection Lab",
        "objective": "Dissect Ethernet, IP, TCP, and UDP headers in a multi-protocol capture, identifying encapsulation boundaries, IP hop counts, and handshake completions.",
        "toolsRequired": [
          "Wireshark 4.x or higher"
        ],
        "pcapSource": {
          "fileName": "Scenario 1.pcapng",
          "fileUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Scenario%201.pcapng",
          "repositoryUrl": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
          "sha256": "3d15daea9d46ee8aa6a3a111a3ee37e2e5be009d509d57a249dd850d510b07d8"
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
          {
            "id": "task-00-1",
            "description": "Locate the first SYN packet in the capture",
            "hint": "Apply display filter: tcp.flags.syn == 1 and tcp.flags.ack == 0",
            "filterSuggestion": "tcp.flags.syn == 1 and tcp.flags.ack == 0"
          },
          {
            "id": "task-00-2",
            "description": "Identify the client source MAC and destination default gateway MAC",
            "hint": "Inspect Ethernet II header in Packet Details"
          },
          {
            "id": "task-00-3",
            "description": "Verify whether the server responded with a valid SYN-ACK",
            "hint": "Follow the TCP conversation or filter by tcp.flags.syn == 1 and tcp.flags.ack == 1"
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "Client MAC Address",
            "prompt": "Enter the hardware address of the initiating host:",
            "expectedEvidenceType": "Hexadecimal MAC (e.g. 00:11:22:33:44:55)"
          },
          {
            "field": "Initial Sequence Number (Raw)",
            "prompt": "Enter the 32-bit raw ISN of the client SYN:",
            "expectedEvidenceType": "Integer / Hex sequence"
          },
          {
            "field": "Server Observed TTL",
            "prompt": "Enter the observed TTL in the server SYN-ACK response:",
            "expectedEvidenceType": "Integer 1-255"
          }
        ],
        "questions": [
          {
            "question": "What is the standard Ethernet header size before the IP packet begins?",
            "options": [
              "12 bytes",
              "14 bytes",
              "20 bytes",
              "32 bytes"
            ],
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
            "options": [
              "Header Checksum",
              "Identification",
              "Time to Live (TTL)",
              "Differentiated Services Field"
            ],
            "correctAnswerIndex": 2,
            "explanation": "The Time to Live (TTL) field is decremented by each router hop. When it hits 0, the packet is dropped and an ICMP Time Exceeded is returned.",
            "difficulty": "beginner"
          },
          {
            "question": "Which TCP flag is used to gracefully close a connection in both directions?",
            "options": [
              "RST (Reset)",
              "FIN (Finish)",
              "PSH (Push)",
              "SYN (Synchronize)"
            ],
            "correctAnswerIndex": 1,
            "explanation": "FIN is transmitted by each endpoint wishing to terminate its half of the bidirectional TCP stream gracefully.",
            "difficulty": "beginner"
          },
          {
            "question": "What is the primary operational role of ARP on an Ethernet segment?",
            "options": [
              "Assigning IP addresses automatically",
              "Resolving hostnames to IP addresses",
              "Translating Layer 3 IP addresses to Layer 2 MAC addresses",
              "Routing packets across wide area networks"
            ],
            "correctAnswerIndex": 2,
            "explanation": "Address Resolution Protocol (ARP) translates known Layer 3 logical IP addresses into Layer 2 physical MAC addresses for delivery within the local broadcast domain.",
            "difficulty": "beginner"
          },
          {
            "question": "How does an operating system multiplex and distinguish between multiple simultaneous TCP connections between the same client and server host?",
            "options": [
              "By matching the Ethernet MAC address and IP Time-to-Live (TTL)",
              "By using the 4-tuple: Source IP, Source Port, Destination IP, and Destination Port",
              "By assigning distinct Subnet Masks to each connection",
              "By negotiating different Maximum Transmission Unit (MTU) sizes per socket"
            ],
            "correctAnswerIndex": 1,
            "explanation": "TCP demultiplexes socket connections using the 4-tuple (Source IP, Source Port, Destination IP, Destination Port). Even when connecting to the same server IP and port, the client operating system allocates a unique ephemeral source port for each connection.",
            "difficulty": "intermediate"
          },
          {
            "question": "What is the correct 4-step message sequence for dynamic IPv4 client address configuration in the DHCP protocol?",
            "options": [
              "DHCP Request -> DHCP Acknowledge -> DHCP Discover -> DHCP Offer",
              "DHCP Discover -> DHCP Offer -> DHCP Request -> DHCP Acknowledge (DORA)",
              "DHCP Probe -> DHCP Assign -> DHCP Confirm -> DHCP Lease",
              "DHCP SYN -> DHCP SYN-ACK -> DHCP ACK -> DHCP FIN"
            ],
            "correctAnswerIndex": 1,
            "explanation": "DHCP allocation follows the DORA sequence: Discover (broadcast client search), Offer (server lease proposal), Request (client lease acceptance), and Acknowledge (server confirmation with IP parameters).",
            "difficulty": "beginner"
          }
        ]
      }
    },
    {
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
          "tags": [
            "wireshark",
            "npcap",
            "libpcap",
            "capture-drivers",
            "architecture"
          ],
          "skillsTaught": [
            "Capture driver configuration",
            "Buffer optimization",
            "Packet drop mitigation"
          ],
          "richContent": {
            "introduction": "Wireshark is not merely a packet visualizer; it is a complex modular system comprising packet capture drivers (libpcap on Linux/macOS, Npcap on Windows), the Wiretap file reading abstraction, and thousands of modular protocol dissectors. Understanding how packets travel from the NIC ring buffer to the dissection engine ensures data integrity during forensic triage.",
            "prerequisites": [
              "Module 00: Networking Prerequisites"
            ],
            "keyTerminology": [
              {
                "term": "Npcap",
                "definition": "The Windows packet capture library and driver developed by the Nmap project, providing loopback capture and raw 802.11 frame injection."
              },
              {
                "term": "Wiretap (wtap)",
                "definition": "Wireshark library responsible for opening, reading, and converting dozens of capture file formats (pcap, pcapng, snoop, cap)."
              },
              {
                "term": "Dissector",
                "definition": "A protocol-specific parsing module in Wireshark that translates raw packet bytes into human-readable field trees."
              }
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
              {
                "filter": "_ws.expert.severity == \"Error\"",
                "description": "Displays malformed or truncated packets reported by dissectors",
                "purpose": "Identify driver corruption or dissection errors"
              }
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
              "options": [
                "Wiretap library",
                "Berkeley Packet Filter (BPF) engine in libpcap/Npcap",
                "Display filter engine",
                "Qt GUI layer"
              ],
              "correctAnswerIndex": 1,
              "explanation": "BPF capture filters are evaluated directly in kernel space within libpcap/Npcap, ensuring that only matched packets incur user-space copy overhead.",
              "difficulty": "intermediate"
            },
            "summary": "Wireshark leverages low-level capture drivers to interface with physical NICs. Understanding driver buffer management prevents packet drops during high-volume incident investigations.",
            "furtherReading": [
              {
                "title": "Wireshark Developer Guide \u2014 Dissector Architecture",
                "url": "https://www.wireshark.org/docs/wsdg_html_chunked/"
              }
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
          "tags": [
            "promiscuous-mode",
            "monitor-mode",
            "span-port",
            "taps",
            "capture-options"
          ],
          "skillsTaught": [
            "Promiscuous mode configuration",
            "Ring buffer setup",
            "SPAN port analysis"
          ],
          "richContent": {
            "introduction": "By default, network cards drop any Ethernet frame whose destination MAC address does not match their own hardware MAC (or a broadcast/multicast group). In Promiscuous mode, the NIC controller delivers all observed frames across the broadcast segment to the OS. On wireless networks, Monitor mode allows capturing 802.11 management and control frames without associating with an Access Point.",
            "prerequisites": [
              "Lesson 1.1: Wireshark Architecture"
            ],
            "keyTerminology": [
              {
                "term": "Promiscuous Mode",
                "definition": "NIC configuration that disables hardware MAC address filtering, capturing all traffic passing through the local segment."
              },
              {
                "term": "Monitor Mode (rfmon)",
                "definition": "Wireless card mode that captures raw 802.11 frames over the air without associating with a BSSID."
              },
              {
                "term": "Network TAP",
                "definition": "A dedicated hardware device inserted directly into a physical cable to copy full-duplex traffic without introducing latency or altering packet contents."
              }
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
              {
                "filter": "wlan.fc.type_subtype == 0x08",
                "description": "Filters for 802.11 Beacon frames in wireless monitor mode captures",
                "purpose": "Wireless BSSID reconnaissance"
              }
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
              {
                "title": "Wireshark Wiki \u2014 CaptureSetup/Ethernet",
                "url": "https://wiki.wireshark.org/CaptureSetup/Ethernet"
              }
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
          "tags": [
            "profiles",
            "coloring-rules",
            "custom-columns",
            "forensic-workflow"
          ],
          "skillsTaught": [
            "Forensic profile building",
            "Custom column extraction",
            "Visual triage acceleration"
          ],
          "richContent": {
            "introduction": "Default Wireshark installations are optimized for general networking, not cyber forensics. By creating dedicated investigation profiles, extracting key header fields into dedicated columns (such as TCP Delta Time and Host Header), and applying contrast coloring rules, analysts reduce forensic triage time by over 70%.",
            "prerequisites": [
              "Lesson 1.2: Interface Selection"
            ],
            "keyTerminology": [
              {
                "term": "Configuration Profile",
                "definition": "A discrete set of Wireshark preferences, custom columns, coloring rules, recent display filters, and enabled protocols stored in a dedicated folder."
              },
              {
                "term": "TCP Delta Time",
                "definition": "The elapsed time between the current packet and the previous packet within the exact same TCP stream."
              }
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
              {
                "filter": "tcp.flags.reset == 1",
                "description": "Highlight resets with red background in Coloring Rules",
                "purpose": "Visual triage for connection terminations"
              },
              {
                "filter": "http.request or tls.handshake.type == 1",
                "description": "Highlight web requests and client hellos with cyan background",
                "purpose": "Session initiation visibility"
              }
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
              {
                "title": "Wireshark User Guide \u2014 Customizing Configuration Profiles",
                "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChCustConfigProfilesSection.html"
              }
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
          "tags": [
            "timestamps",
            "delta-time",
            "rtt",
            "beacon-detection",
            "time-display"
          ],
          "skillsTaught": [
            "Timestamp alignment",
            "Delta timing calculations",
            "Beaconing periodicity identification"
          ],
          "richContent": {
            "introduction": "Network forensics is fundamentally about timeline reconstruction. A single misplaced time zone or misunderstanding of packet delta timings can lead to invalid attribution. Wireshark provides flexible time representations to correlate packet captures with host logs, SIEM events, and firewall alerts.",
            "prerequisites": [
              "Lesson 1.3: Custom Profiles & Columns"
            ],
            "keyTerminology": [
              {
                "term": "Epoch Time",
                "definition": "Seconds elapsed since January 1, 1970 (UTC), the standard cross-platform timestamp representation."
              },
              {
                "term": "Delta Time (Displayed)",
                "definition": "Time elapsed between the current packet and the previous packet shown under active display filters."
              },
              {
                "term": "TCP Conversational Delta",
                "definition": "Time elapsed since the previous packet in the exact same TCP stream, isolating server processing or client delay."
              }
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
              {
                "filter": "frame.time_delta < 0.001",
                "description": "Packets arriving within sub-millisecond bursts",
                "purpose": "Identify automated script traffic or volumetric floods"
              },
              {
                "filter": "tcp.time_delta > 30 and tcp.flags.syn == 1",
                "description": "SYN attempts spaced by roughly 30 seconds",
                "purpose": "Periodic beaconing detection"
              }
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
              {
                "title": "Wireshark User Guide \u2014 Time Display Formats",
                "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChAdvTimestamps.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-01-profile-optimization",
        "title": "Lab 01: Forensic Profile & Custom Column Optimization",
        "objective": "Build a complete forensic analysis profile with custom delta time, TCP stream, and host columns, configuring coloring rules to highlight anomalies.",
        "toolsRequired": [
          "Wireshark 4.x or higher"
        ],
        "pcapSource": {
          "fileName": "Scenario 1.pcapng",
          "fileUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Scenario%201.pcapng",
          "repositoryUrl": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
          "sha256": "3d15daea9d46ee8aa6a3a111a3ee37e2e5be009d509d57a249dd850d510b07d8"
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
          {
            "id": "task-01-1",
            "description": "Configure the 4 recommended custom columns",
            "hint": "Right-click field in packet details -> Apply as Column"
          },
          {
            "id": "task-01-2",
            "description": "Verify coloring rule precedence for TCP Resets",
            "hint": "View -> Coloring Rules -> Move to top"
          },
          {
            "id": "task-01-3",
            "description": "Measure peak delta time in Stream #0",
            "hint": "Filter tcp.stream == 0 and sort by tcp.time_delta descending"
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "Custom Profile Name",
            "prompt": "Name of created profile:",
            "expectedEvidenceType": "String"
          },
          {
            "field": "Longest Delta Time in Stream 0",
            "prompt": "Enter the highest observed tcp.time_delta value in seconds:",
            "expectedEvidenceType": "Decimal seconds (e.g. 4.123456)"
          }
        ],
        "questions": [
          {
            "question": "What happens if a custom column field is not present in a packet (e.g., http.host in a DNS packet)?",
            "options": [
              "Wireshark displays an error",
              "The column cell remains empty",
              "The packet is hidden",
              "Wireshark crashes"
            ],
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
            "options": [
              "Promiscuous mode",
              "Multiple Ring Buffer Files with file count and size limits",
              "Monitor mode",
              "Capture Filter: host 127.0.0.1"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Configuring ring buffer files with max file size and file count ensures Wireshark continuously rotates through a fixed pool of capture files, bounding total disk usage.",
            "difficulty": "intermediate"
          },
          {
            "question": "Why is Npcap preferred over legacy WinPcap on modern Windows operating systems?",
            "options": [
              "WinPcap is paid software",
              "Npcap supports loopback capture, raw 802.11 monitor mode, and Windows 10/11 security models",
              "Npcap does not require admin privileges",
              "Npcap only works with Linux"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Npcap was developed to replace the obsolete WinPcap, bringing NDIS 6 driver support, loopback packet capture, and modern Windows kernel compatibility.",
            "difficulty": "intermediate"
          },
          {
            "question": "How can an analyst quickly isolate conversational pauses exceeding 10 seconds within a specific TCP conversation?",
            "options": [
              "frame.time_delta > 10",
              "tcp.time_delta > 10.0",
              "ip.ttl > 10",
              "tcp.analysis.retransmission"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The field tcp.time_delta measures elapsed time specifically between consecutive packets of the same TCP conversation stream.",
            "difficulty": "intermediate"
          },
          {
            "question": "Which Wireshark feature allows analysts to switch between customized column layouts, color rules, and protocol decode preferences tailored for specific protocols like VoIP or Malware triage?",
            "options": [
              "Configuration Profiles",
              "BPF Filter Presets",
              "Capture Interface Options",
              "Macro Shortcuts"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Wireshark Configuration Profiles allow creating dedicated environments (e.g., Forensics, VoIP, TLS Decryption) that store specific columns, custom color rules, and protocol preference settings independently.",
            "difficulty": "beginner"
          },
          {
            "question": "How does Wireshark display packet data in the lower 'Packet Bytes' pane by default?",
            "options": [
              "Base64 encoded strings with hexadecimal offsets",
              "Hexadecimal bytes dump on the left with corresponding ASCII interpretation on the right",
              "JSON formatted key-value pairs representing protocol fields",
              "Raw binary bitstreams represented in 8-bit octet blocks"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The Packet Bytes pane renders a classic canonical hex dump: packet byte offset on the far left, hexadecimal byte values in the center, and printable ASCII representations on the right.",
            "difficulty": "beginner"
          }
        ]
      }
    },
    {
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
          "tags": [
            "dissection",
            "byte-inspector",
            "hex-dump",
            "packet-views"
          ],
          "skillsTaught": [
            "Tripartite view navigation",
            "Hex-to-field correlation",
            "Raw byte extraction"
          ],
          "richContent": {
            "introduction": "The core of Wireshark's interface is the synchronized three-pane view: Packet List (top), Packet Details (middle), and Packet Bytes (bottom). Clicking on any dissected field in the details tree immediately highlights its exact corresponding byte offset in the hexadecimal inspector.",
            "prerequisites": [
              "Module 01: Wireshark Mastery"
            ],
            "keyTerminology": [
              {
                "term": "Packet Details Tree",
                "definition": "Hierarchical dissection tree presenting decoded protocol fields, values, bitmasks, and expert info."
              },
              {
                "term": "Packet Bytes Pane",
                "definition": "Lower pane displaying raw frame bytes in 16-byte rows with hexadecimal on the left and ASCII representations on the right."
              },
              {
                "term": "Copy as As Escaped String",
                "definition": "Context menu command that exports highlighted bytes formatted with \\x notation for scripting."
              }
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
              {
                "filter": "data.data",
                "description": "Filters packets that contain raw unparsed data payloads",
                "purpose": "Isolate unknown or custom protocol payloads"
              }
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
              {
                "title": "Wireshark User Guide \u2014 The Packet Bytes Pane",
                "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChUIBytesView.html"
              }
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
          "tags": [
            "display-filters",
            "boolean-logic",
            "regex",
            "slice-notation",
            "syntax"
          ],
          "skillsTaught": [
            "Filter construction",
            "RegexIOC searching",
            "Byte slice filtering"
          ],
          "richContent": {
            "introduction": "Display filters are the primary tool of the packet forensic analyst. Unlike capture filters which discard packets at acquisition, display filters allow non-destructive interrogation of multi-gigabyte captures, querying protocols, fields, strings, and byte offsets with microsecond precision.",
            "prerequisites": [
              "Lesson 2.1: Packet Dissection Views"
            ],
            "keyTerminology": [
              {
                "term": "Display Filter",
                "definition": "A search expression evaluated against dissected packet fields to dynamically show or hide packets without altering the underlying capture."
              },
              {
                "term": "contains Operator",
                "definition": "Case-sensitive byte or string matching operator (e.g. http contains 'password')."
              },
              {
                "term": "matches Operator",
                "definition": "Perl-Compatible Regular Expression (PCRE) evaluation operator (e.g. http.host matches '\\.ru$')."
              }
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
              {
                "filter": "!(ip.addr == 192.168.1.1)",
                "description": "Correctly excludes an IP address from both src and dst",
                "purpose": "Noise reduction during triage"
              },
              {
                "filter": "tcp.port in {80, 443, 8080, 8443}",
                "description": "Set membership filter for web ports",
                "purpose": "Consolidate multi-port monitoring"
              },
              {
                "filter": "tcp[13] & 0x02 != 0",
                "description": "Bitwise test for SYN flag at TCP offset 13",
                "purpose": "Low-level flag validation"
              }
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
              {
                "title": "Wireshark User Guide \u2014 Building Display Filter Expressions",
                "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html"
              }
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
          "tags": [
            "stream-reassembly",
            "tcp-stream",
            "follow-stream",
            "session-reconstruction"
          ],
          "skillsTaught": [
            "Stream reassembly",
            "Conversation decoding",
            "Transcript export"
          ],
          "richContent": {
            "introduction": "Individual packets represent fragments of an overall conversation. Analyzing packets in isolation often obscures the adversary's intent. Wireshark's Follow Stream engine reorders TCP segments by sequence number, handles out-of-order delivery, strips transport headers, and reconstructs the full application layer dialog.",
            "prerequisites": [
              "Lesson 2.2: Display Filter Syntax"
            ],
            "keyTerminology": [
              {
                "term": "TCP Stream Index",
                "definition": "A 0-based integer assigned by Wireshark to each unique 4-tuple TCP conversation (IP_a:Port_a <-> IP_b:Port_b)."
              },
              {
                "term": "Full-Duplex Reassembly",
                "definition": "Reconstruction of both client-to-server (red) and server-to-client (blue) data streams in chronological order."
              }
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
              {
                "filter": "tcp.stream == 0",
                "description": "Isolates all packets belonging to TCP conversation 0",
                "purpose": "Focus analysis on a single conversation"
              },
              {
                "filter": "tcp.stream eq 4 and http",
                "description": "Isolates HTTP traffic within stream 4",
                "purpose": "Target specific application exchange"
              }
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
              {
                "title": "Wireshark User Guide \u2014 Following Protocol Streams",
                "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChAdvFollowStreamSection.html"
              }
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
          "tags": [
            "statistics",
            "protocol-hierarchy",
            "conversations",
            "endpoints",
            "triage"
          ],
          "skillsTaught": [
            "Global triage evaluation",
            "Top talker isolation",
            "Conversations matrix filtering"
          ],
          "richContent": {
            "introduction": "When handed a 5GB PCAP of an enterprise incident, beginning with packet-by-packet reading is impossible. Professional forensic triage begins in the Statistics menu: Protocol Hierarchy reveals the protocol composition of the capture, while the Conversations table instantly surfaces the top talkers and highest-volume exfiltration paths.",
            "prerequisites": [
              "Lesson 2.1: Packet Dissection Views"
            ],
            "keyTerminology": [
              {
                "term": "Protocol Hierarchy Statistics (PHS)",
                "definition": "A hierarchical tree showing percentages of total packets and bytes consumed by each protocol in the capture."
              },
              {
                "term": "Conversations Window",
                "definition": "Matrix showing bidirectional communications between pairs of endpoints, tracking packet counts, byte volumes, and duration."
              }
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
              {
                "filter": "ip.src == 10.0.0.1 && ip.dst == 192.168.1.1",
                "description": "Isolates conversation between top talker pair",
                "purpose": "Focus on high-volume session"
              }
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
              "options": [
                "Conversations Table",
                "Protocol Hierarchy Statistics",
                "IO Graphs",
                "Flow Graph"
              ],
              "correctAnswerIndex": 1,
              "explanation": "Statistics -> Protocol Hierarchy generates a tree structure displaying the percentage and absolute counts of packets and bytes consumed by every detected protocol.",
              "difficulty": "beginner"
            },
            "summary": "Protocol Hierarchy and Conversations tables provide the essential 30,000-foot view of an incident capture, directing investigators to the top data transfers and anomalous services.",
            "furtherReading": [
              {
                "title": "Wireshark User Guide \u2014 Statistical Windows",
                "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChStatHierarchy.html"
              }
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
          "tags": [
            "io-graphs",
            "throughput",
            "rtt",
            "latency",
            "traffic-spikes"
          ],
          "skillsTaught": [
            "IO graph plotting",
            "Throughput spike detection",
            "RTT trend evaluation"
          ],
          "richContent": {
            "introduction": "Visual representations often reveal patterns invisible in tabular packet lists. Wireshark's IO Graphs tool allows plotting multiple simultaneous data series (e.g. Total Traffic vs. TCP Resets vs. Port 80 bytes) over microsecond or second intervals, instantly exposing volumetric floods and latency anomalies.",
            "prerequisites": [
              "Lesson 2.4: Protocol Hierarchy & Conversations"
            ],
            "keyTerminology": [
              {
                "term": "IO Graph",
                "definition": "A time-series visualization tool in Wireshark plotting packet rates, byte throughput, or specific field values over the capture timeline."
              },
              {
                "term": "Round-Trip Time (RTT)",
                "definition": "The elapsed duration required for a data segment to be transmitted and its acknowledgment returned from the remote peer."
              }
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
              {
                "filter": "tcp.analysis.retransmission",
                "description": "Graph packet retransmissions over time",
                "purpose": "Measure network degradation and packet loss"
              }
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
              {
                "title": "Wireshark User Guide \u2014 The IO Graphs Window",
                "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChStatIOGraphs.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-02-filter-troubleshooting",
        "title": "Lab 02: Protocol Breakdown & Display Filter Troubleshooting",
        "objective": "Use Protocol Hierarchy and Conversations to identify top talkers in Scenario 1, construct advanced display filters, and reassemble cleartext web sessions.",
        "toolsRequired": [
          "Wireshark 4.x or higher"
        ],
        "pcapSource": {
          "fileName": "Scenario 1.pcapng",
          "fileUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Scenario%201.pcapng",
          "repositoryUrl": "https://github.com/NetsecExplained/Advanced-Wireshark-Network-Forensics",
          "sha256": "3d15daea9d46ee8aa6a3a111a3ee37e2e5be009d509d57a249dd850d510b07d8"
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
          {
            "id": "task-02-1",
            "description": "Identify top application protocol in Protocol Hierarchy",
            "hint": "Statistics -> Protocol Hierarchy"
          },
          {
            "id": "task-02-2",
            "description": "Identify top IP talker pair",
            "hint": "Statistics -> Conversations -> IPv4"
          },
          {
            "id": "task-02-3",
            "description": "Follow TCP stream and copy the HTTP User-Agent",
            "hint": "Right-click -> Follow -> TCP Stream"
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "Top Application Protocol",
            "prompt": "Name of top L7 protocol by byte volume:",
            "expectedEvidenceType": "String (e.g. TLS, HTTP, DNS)"
          },
          {
            "field": "Top IP Conversation Bytes",
            "prompt": "Total bytes transferred between the top IP pair:",
            "expectedEvidenceType": "Integer byte count"
          },
          {
            "field": "Observed HTTP User-Agent",
            "prompt": "User-Agent string observed in Stream:",
            "expectedEvidenceType": "String"
          }
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
            "options": [
              "frame contains \"cmd.exe\"",
              "ip.payload == \"cmd.exe\"",
              "tcp.string == cmd.exe",
              "find(\"cmd.exe\")"
            ],
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
          },
          {
            "question": "In network packet analysis, what does an ICMP Type 3, Code 3 error packet indicate?",
            "options": [
              "Network Unreachable: Gateway router lacks a route to the destination network",
              "Host Unreachable: Destination IP did not reply to ARP resolution",
              "Port Unreachable: Destination host received UDP traffic for a port without an active listening process",
              "Fragmentation Needed: Packet DF flag is set and payload exceeds path MTU"
            ],
            "correctAnswerIndex": 2,
            "explanation": "ICMP Type 3 (Destination Unreachable), Code 3 specifically indicates 'Port Unreachable', typically generated when a UDP datagram arrives at a host that has no listening service on the destination port.",
            "difficulty": "intermediate"
          },
          {
            "question": "What primary efficiency benefit does the HTTP Keep-Alive header provide as observed in TCP packet streams?",
            "options": [
              "It compresses all HTTP payload data using GZIP by default",
              "It permits multiple HTTP requests and responses to reuse a single established TCP three-way handshake",
              "It forces intermediate routers to prioritize HTTP packets over background UDP traffic",
              "It automatically encrypts HTTP plaintext headers using TLS 1.3"
            ],
            "correctAnswerIndex": 1,
            "explanation": "HTTP Keep-Alive (persistent connections) reuses a single underlying TCP connection for multiple sequential requests and responses, eliminating the latency overhead of repeated three-way handshakes and teardowns.",
            "difficulty": "beginner"
          }
        ]
      }
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
          "tags": [
            "tshark",
            "cli",
            "command-line",
            "headless-analysis",
            "automation"
          ],
          "skillsTaught": [
            "TShark CLI navigation",
            "Terminal filter execution",
            "Headless triage"
          ],
          "richContent": {
            "introduction": "While Wireshark's GUI is unmatched for visual exploration, it struggles when analyzing 50-gigabyte captures across remote headless Linux sensors. TShark is the command-line equivalent of Wireshark, sharing the exact same dissection engine, display filter syntax, and Wiretap libraries, but operating with minimal memory overhead.",
            "prerequisites": [
              "Module 02: Packet Analysis & Protocol Investigation"
            ],
            "keyTerminology": [
              {
                "term": "TShark",
                "definition": "The terminal-oriented version of Wireshark designed for automated scripts, remote SSH sessions, and pipeline integration."
              },
              {
                "term": "-r flag",
                "definition": "Reads an existing capture file (e.g. tshark -r capture.pcap)."
              },
              {
                "term": "-Y flag",
                "definition": "Specifies a Wireshark display filter to evaluate against packets (e.g. tshark -r file.pcap -Y 'http')."
              }
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
              {
                "filter": "tshark -r capture.pcap -Y \"tcp.flags.reset == 1\"",
                "description": "CLI command to list all reset packets",
                "purpose": "Rapid terminal error check"
              }
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
              "options": [
                "-f",
                "-Y",
                "-d",
                "-s"
              ],
              "correctAnswerIndex": 1,
              "explanation": "The -Y option specifies a display filter (evaluated post-dissection), while -f specifies a BPF capture filter (evaluated pre-capture).",
              "difficulty": "beginner"
            },
            "summary": "TShark delivers the full analytical power of Wireshark directly to the terminal, enabling headless, automated forensic workflows.",
            "furtherReading": [
              {
                "title": "Wireshark Man Pages \u2014 TShark",
                "url": "https://www.wireshark.org/docs/man-pages/tshark.html"
              }
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
          "tags": [
            "tshark",
            "field-extraction",
            "csv-export",
            "json-output",
            "automation"
          ],
          "skillsTaught": [
            "Field extraction scripting",
            "JSON/CSV formatting",
            "Command-line aggregation"
          ],
          "richContent": {
            "introduction": "The true forensic superpower of TShark is targeted field extraction (-T fields). Instead of dumping full packet text, analysts specify the exact fields of interest (e.g. timestamp, source IP, DNS query, HTTP user-agent) and format the output as tab-delimited or comma-separated values for instant bash parsing.",
            "prerequisites": [
              "Lesson 6.1: Introduction to TShark"
            ],
            "keyTerminology": [
              {
                "term": "-T fields",
                "definition": "TShark output format mode that outputs only explicitly specified field values."
              },
              {
                "term": "-e <field>",
                "definition": "Specifies a protocol field name to output (can be repeated multiple times)."
              },
              {
                "term": "-E header=y",
                "definition": "Includes a header line displaying field names in the output table."
              }
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
              {
                "filter": "tshark -r capture.pcap -Y \"http.request\" -T fields -e ip.src -e http.host -e http.request.uri",
                "description": "Extract all HTTP requests as tabular data",
                "purpose": "Web traffic audit"
              }
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
              "options": [
                "-f",
                "-e",
                "-i",
                "-s"
              ],
              "correctAnswerIndex": 1,
              "explanation": "The -e flag is used to specify field names (e.g. -e ip.src -e ip.dst). Each -e flag creates an additional column in the output.",
              "difficulty": "beginner"
            },
            "summary": "TShark's -T fields capability enables forensic investigators to extract high-fidelity telemetry and pipe structured data directly into automated analysis tools.",
            "furtherReading": [
              {
                "title": "TShark Documentation \u2014 Output Options",
                "url": "https://www.wireshark.org/docs/man-pages/tshark.html#output-options"
              }
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
          "tags": [
            "capinfos",
            "editcap",
            "mergecap",
            "pcap-slicing",
            "cli-utilities"
          ],
          "skillsTaught": [
            "Capture metadata reporting",
            "PCAP slicing",
            "Multi-sensor file merging"
          ],
          "richContent": {
            "introduction": "Beyond Wireshark and TShark, the Wireshark distribution includes powerful standalone utility binaries: `capinfos` (instant capture statistics), `editcap` (packet slicing, trimming, and time-shifting), and `mergecap` (chronological consolidation of multiple captures). Mastering these utilities solves common data management hurdles.",
            "prerequisites": [
              "Lesson 6.1: Introduction to TShark"
            ],
            "keyTerminology": [
              {
                "term": "capinfos",
                "definition": "CLI tool that prints detailed metadata (packet count, byte size, start/end time, data rate, hashes) without reading whole packet trees."
              },
              {
                "term": "editcap",
                "definition": "CLI tool used to select specific packet ranges, strip encapsulation, adjust timestamps, or split large captures into manageable chunks."
              },
              {
                "term": "mergecap",
                "definition": "CLI tool that merges multiple capture files into a single chronologically sorted output PCAP."
              }
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
              {
                "filter": "capinfos -c -d -u \"Scenario 1.pcapng\"",
                "description": "Prints packet count, duration, and data rate",
                "purpose": "Quick scriptable metrics"
              }
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
              "options": [
                "capinfos",
                "editcap",
                "mergecap",
                "reordercap"
              ],
              "correctAnswerIndex": 1,
              "explanation": "The editcap utility provides the -A (start time) and -B (stop time) options to slice specific time intervals from large capture files.",
              "difficulty": "intermediate"
            },
            "summary": "The Wireshark utility suite (capinfos, editcap, mergecap) provides high-performance metadata extraction, capture slicing, and chronological consolidation.",
            "furtherReading": [
              {
                "title": "Wireshark Man Pages \u2014 editcap",
                "url": "https://www.wireshark.org/docs/man-pages/editcap.html"
              },
              {
                "title": "Wireshark Man Pages \u2014 mergecap",
                "url": "https://www.wireshark.org/docs/man-pages/mergecap.html"
              }
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
          "tags": [
            "scripting",
            "python",
            "pyshark",
            "bash",
            "threat-hunting"
          ],
          "skillsTaught": [
            "Automated IOC sweeps",
            "Python pyshark parsing",
            "Batch pipeline development"
          ],
          "richContent": {
            "introduction": "When a new threat intelligence report releases 50 adversary domain names, IP addresses, and file hashes, checking each PCAP manually in the GUI is inefficient. By combining TShark with Bash scripts or Python libraries like PyShark, investigators can scan terabytes of historical PCAPs automatically and alert on matches.",
            "prerequisites": [
              "Lesson 6.2: TShark Field Extraction"
            ],
            "keyTerminology": [
              {
                "term": "PyShark",
                "definition": "A Python wrapper for TShark that exposes Wireshark's protocol dissectors as Python object trees."
              },
              {
                "term": "IOC Sweep",
                "definition": "Automated matching of known Indicators of Compromise (IPs, hashes, domains) against network data repositories."
              }
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
              {
                "filter": "tshark -r file.pcap -Y \"http.request.uri contains \".php\"\" -T fields -e ip.src -e http.host -e http.request.uri",
                "description": "Automated web probe extraction",
                "purpose": "Scriptable web audit"
              }
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
              {
                "title": "PyShark GitHub Repository",
                "url": "https://github.com/KimiNewt/pyshark"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-06-tshark-pipeline",
        "title": "Lab 06: Headless TShark Pipeline & Automated Field Extraction",
        "objective": "Use TShark to headlessly process Scenario 2 PCAP, extract all FTP authentication attempts as CSV, slice the attack window with editcap, and verify metadata with capinfos.",
        "toolsRequired": [
          "TShark CLI",
          "capinfos",
          "editcap"
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
          "Open your terminal in the directory containing Scenario 2.pcap.",
          "Run capinfos to record total packet count and file duration.",
          "Execute TShark with -T fields to extract timestamps, source IPs, and FTP commands.",
          "Use editcap to carve the first 50 packets into a new capture file.",
          "Verify the carved file packet count with capinfos."
        ],
        "tasks": [
          {
            "id": "task-06-1",
            "description": "Execute capinfos on Scenario 2.pcap",
            "hint": "capinfos \"Scenario 2.pcap\""
          },
          {
            "id": "task-06-2",
            "description": "Extract FTP USER and PASS packets with TShark",
            "hint": "tshark -r \"Scenario 2.pcap\" -Y \"ftp.command\" -T fields -e ip.src -e ftp.command -e ftp.command_arg"
          },
          {
            "id": "task-06-3",
            "description": "Slice first 50 packets with editcap",
            "hint": "editcap -r \"Scenario 2.pcap\" slice.pcap 1-50"
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "capinfos Total Packets",
            "prompt": "Packet count reported by capinfos:",
            "expectedEvidenceType": "Integer count"
          },
          {
            "field": "Extracted FTP Command Argument",
            "prompt": "Argument passed to USER command in TShark output:",
            "expectedEvidenceType": "String username"
          },
          {
            "field": "Sliced File Packet Count",
            "prompt": "Verified packet count of sliced PCAP:",
            "expectedEvidenceType": "Integer count (50)"
          }
        ],
        "questions": [
          {
            "question": "What flag in TShark includes a header row displaying field names in the output table?",
            "options": [
              "-E header=y",
              "-H",
              "-v",
              "--title"
            ],
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
            "options": [
              "-i",
              "-r",
              "-w",
              "-f"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The -r option tells TShark to read from an existing file on disk, while -i specifies a live network interface.",
            "difficulty": "beginner"
          },
          {
            "question": "Which utility from the Wireshark suite is specifically designed to merge multiple capture files chronologically into a single output file?",
            "options": [
              "mergecap",
              "editcap",
              "reordercap",
              "capinfos"
            ],
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
          },
          {
            "question": "Which TShark command-line option specifies statistics tree generation to output conversation lists, HTTP request distributions, or protocol hierarchies directly in the terminal?",
            "options": [
              "-z (e.g., -z conv,ip or -z io,phs)",
              "-e (field extraction)",
              "-s (snapshot length)",
              "-T (output format)"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The -z option in TShark generates statistical summaries such as protocol hierarchy stats (-z io,phs), IP conversations (-z conv,ip), or HTTP request URI counts (-z http,tree).",
            "difficulty": "intermediate"
          },
          {
            "question": "Which command-line utility bundled with Wireshark is designed specifically to split large PCAP files by packet count or extract packets within a specified start and end timestamp window?",
            "options": [
              "mergecap",
              "editcap",
              "capinfos",
              "reordercap"
            ],
            "correctAnswerIndex": 1,
            "explanation": "editcap is Wireshark's capture file editing tool. It is used to split captures by size or packet count (-c), trim packets by time window (-A and -B), and truncate payload bytes (-s).",
            "difficulty": "beginner"
          }
        ]
      }
    },
    {
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
          "tags": [
            "chain-of-custody",
            "evidence-integrity",
            "sha256",
            "admissibility",
            "legal-standards"
          ],
          "skillsTaught": [
            "Chain of custody documentation",
            "Evidence hash verification",
            "Forensic copy management"
          ],
          "richContent": {
            "introduction": "Technical discovery without legal integrity is worthless in criminal prosecutions and corporate dispute hearings. Network evidence is volatile: packets in transit cannot be re-captured once lost. Establishing cryptographic chain of custody immediately upon capture ensures that evidence presented to leadership, regulators, or courts is provably uncontaminated.",
            "prerequisites": [
              "Module 03: Advanced Wireshark Investigation Workflow"
            ],
            "keyTerminology": [
              {
                "term": "Chain of Custody",
                "definition": "A chronological paper and electronic paper trail documenting the custody, control, transfer, analysis, and disposition of digital evidence."
              },
              {
                "term": "Forensic Hash",
                "definition": "A cryptographically secure one-way hash (SHA-256) computed across the raw capture file upon acquisition to prove bit-for-bit integrity."
              },
              {
                "term": "Working Copy",
                "definition": "An exact replica of the master forensic image used for analysis, ensuring the original evidence remains unaltered in write-blocked storage."
              }
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
              {
                "filter": "capinfos -H \"Hackers on the Network.pcapng\"",
                "description": "CLI command to display built-in SHA256/SHA1/MD5 file hashes",
                "purpose": "Rapid integrity verification"
              }
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
              {
                "title": "NIST SP 800-86 \u2014 Guide to Integrating Forensic Techniques into Incident Response",
                "url": "https://csrc.nist.gov/publications/detail/sp/800-86/final"
              }
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
          "tags": [
            "pcap-redaction",
            "anonymization",
            "privacy",
            "data-sanitization",
            "gdpr"
          ],
          "skillsTaught": [
            "IP address anonymization",
            "Sensitive payload scrubbing",
            "Safe PCAP sharing"
          ],
          "richContent": {
            "introduction": "While sharing PCAP evidence with external vendors, national CERTs, or threat intelligence platforms accelerates threat containment, raw packet captures often contain trade secrets, employee passwords, internal server IPs, and customer Personal Identifiable Information (PII). Analysts must know how to sanitize captures without destroying the attack telemetry.",
            "prerequisites": [
              "Lesson 7.1: Evidence Admissibility & Hashes"
            ],
            "keyTerminology": [
              {
                "term": "PCAP Sanitization",
                "definition": "The controlled process of scrubbing sensitive payload bytes or anonymizing internal network addresses while leaving protocol headers and attack signatures intact."
              },
              {
                "term": "Consistent IP Anonymization",
                "definition": "A mapping technique where internal IP addresses are pseudo-anonymized consistently (e.g. 10.0.1.5 always maps to 192.0.2.5) preserving conversation topologies."
              }
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
              {
                "filter": "frame.len <= 96",
                "description": "Verifies all packets conform to truncated snap length",
                "purpose": "Sanitization validation"
              }
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
              "options": [
                "-d",
                "-s <snaplen>",
                "-t",
                "-C"
              ],
              "correctAnswerIndex": 1,
              "explanation": "The -s <snaplen> option sets the snapshot length, truncating every packet to the specified number of bytes from the start of the frame.",
              "difficulty": "intermediate"
            },
            "summary": "Anonymizing IP topologies and truncating payloads enables safe collaboration with external security researchers without violating privacy regulations or leaking sensitive data.",
            "furtherReading": [
              {
                "title": "Wireshark Wiki \u2014 Anonymizing PCAP Files",
                "url": "https://wiki.wireshark.org/Anonymizing_PCAP_Files"
              }
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
          "tags": [
            "correlation",
            "siem",
            "sysmon",
            "edr",
            "incident-investigation"
          ],
          "skillsTaught": [
            "Network-to-host mapping",
            "Sysmon Event ID 3 correlation",
            "Unified timeline assembly"
          ],
          "richContent": {
            "introduction": "A network packet capture proves what crossed the wire, but it cannot definitively identify which process, user account, or thread generated the connection on the host. By correlating network 5-tuples with host telemetry (Windows Sysmon, EDR agent logs, Linux auditd), investigators create a complete, airtight narrative of an intrusion.",
            "prerequisites": [
              "Lesson 7.1: Evidence Admissibility & Hashes"
            ],
            "keyTerminology": [
              {
                "term": "5-Tuple",
                "definition": "The five parameters that uniquely identify a network session: Source IP, Source Port, Destination IP, Destination Port, and Transport Protocol."
              },
              {
                "term": "Sysmon Event ID 3",
                "definition": "Windows System Monitor event logged every time a local process initiates or receives a network connection, recording PID, Process Name, and 5-tuple."
              },
              {
                "term": "Sysmon Event ID 1",
                "definition": "Process Creation event recording the executable path, command line arguments, parent process, and file hashes."
              }
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
              {
                "filter": "tcp.srcport == 49211 and ip.src == 10.0.4.152",
                "description": "Isolates the exact ephemeral port socket recorded in host logs",
                "purpose": "Bi-directional network/host alignment"
              }
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
              "options": [
                "Event ID 1 (Process Create)",
                "Event ID 3 (Network Connect)",
                "Event ID 7 (Image Load)",
                "Event ID 11 (File Create)"
              ],
              "correctAnswerIndex": 1,
              "explanation": "Sysmon Event ID 3 (Network Connection Detected) logs all outbound and inbound TCP/UDP connections along with the process ID, image path, user, and full 5-tuple.",
              "difficulty": "intermediate"
            },
            "summary": "Correlating packet 5-tuples with host Sysmon and EDR logs closes the loop between network wire observations and endpoint code execution.",
            "furtherReading": [
              {
                "title": "Microsoft Learn \u2014 Sysmon Event ID 3 Documentation",
                "url": "https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon"
              }
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
          "tags": [
            "reporting",
            "soc",
            "incident-report",
            "ioc-table",
            "remediation"
          ],
          "skillsTaught": [
            "Forensic report authoring",
            "Executive summary writing",
            "IOC table compilation"
          ],
          "richContent": {
            "introduction": "An investigation is only as effective as the final report delivered to decision-makers. A technical report that is overly cryptic fails executive leadership, while a high-level summary that lacks technical evidence cannot guide remediation engineers. A professional SOC forensics report bridges both worlds.",
            "prerequisites": [
              "Lesson 7.3: Correlating Network Captures with SIEM Logs"
            ],
            "keyTerminology": [
              {
                "term": "Executive Summary",
                "definition": "A 1-page high-level overview detailing what happened, business impact, containment status, and strategic next steps for C-level leadership."
              },
              {
                "term": "IOC Table",
                "definition": "Structured list of malicious artifacts (IPs, domain names, file hashes, URLs, user agents) formatted for immediate ingestion by security controls."
              },
              {
                "term": "Root Cause Analysis (RCA)",
                "definition": "Determination of the fundamental flaw (vulnerability, misconfiguration, credential compromise) that allowed the incident to occur."
              }
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
              {
                "filter": "capinfos -c -d -u -s -e capture.pcapng",
                "description": "Generates concise summary metrics for inclusion in report overview",
                "purpose": "Report evidence table generation"
              }
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
              {
                "title": "CISA \u2014 Incident and Vulnerability Response Playbooks",
                "url": "https://www.cisa.gov/resources-tools/resources/federal-government-cybersecurity-incident-and-vulnerability-response-playbooks"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "id": "lab-07-chain-of-custody-report",
        "title": "Lab 07: Chain of Custody Documentation & Forensic Report Draft",
        "objective": "Document cryptographic chain of custody for Hackers on the Network PCAP, sanitize an evidence slice, and author a structured incident summary report.",
        "toolsRequired": [
          "Wireshark",
          "Terminal (sha256sum / editcap)"
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
          "Compute and verify the SHA-256 hash of Hackers on the Network.pcapng.",
          "Complete the Chain of Custody evidence record in the worksheet.",
          "Use editcap to create a sanitized header-only copy (snaplen 96 bytes).",
          "Draft a 3-paragraph executive summary detailing the observed intrusion.",
          "Compile an IOC table containing the malicious IP addresses and domains identified across the module."
        ],
        "tasks": [
          {
            "id": "task-07-1",
            "description": "Verify SHA256 hash of Hackers on the Network",
            "hint": "sha256sum \"Hackers on the Network.pcapng\""
          },
          {
            "id": "task-07-2",
            "description": "Create sanitized header-only slice with editcap",
            "hint": "editcap -s 96 \"Hackers on the Network.pcapng\" sanitized.pcapng"
          },
          {
            "id": "task-07-3",
            "description": "Draft Executive Summary and IOC Table",
            "hint": "Include Date, C2 IPs, Domains, and Action items"
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "Verified SHA-256 Hash",
            "prompt": "Enter the 64-character SHA-256 checksum:",
            "expectedEvidenceType": "Hexadecimal hash"
          },
          {
            "field": "Executive Summary Draft",
            "prompt": "Enter a concise executive summary of the intrusion:",
            "expectedEvidenceType": "Paragraph text"
          },
          {
            "field": "IOC Count",
            "prompt": "Total count of malicious IOCs documented in table:",
            "expectedEvidenceType": "Integer count"
          }
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
            "options": [
              "Destination IP",
              "Destination Port 443",
              "Source Ephemeral Port (e.g. 49211)",
              "Ethernet MAC Address"
            ],
            "correctAnswerIndex": 2,
            "explanation": "Operating systems allocate unique ephemeral source ports (49152-65535) for each outbound TCP/UDP socket. Matching the ephemeral port and timestamp links the network packet to the specific host process socket in Sysmon Event 3.",
            "difficulty": "advanced"
          },
          {
            "question": "Before sharing packet captures with external threat intelligence vendors or public repositories, what critical step must be executed to protect organizational privacy while preserving protocol analysis validity?",
            "options": [
              "Compress the file using standard ZIP encryption with a shared password",
              "Sanitize and anonymize internal IP addresses, MAC addresses, and proprietary credentials using tools like TraceWrangler or Bittwiste",
              "Convert the capture file into a plaintext CSV dump and delete the raw PCAP",
              "Zero out all TCP payload bytes regardless of protocol layer"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Capture file sanitization (using tools like TraceWrangler) anonymizes sensitive internal IP subnets, hardware MACs, and proprietary payloads while preserving protocol handshakes, relative packet timings, and anomalies required for forensic analysis.",
            "difficulty": "intermediate"
          },
          {
            "question": "What is the primary forensic consequence if network capture tap appliances do not maintain accurate NTP/PTP time synchronization?",
            "options": [
              "Wireshark will refuse to parse TCP sequence numbers correctly",
              "Packet timestamps cannot be accurately correlated against host EDR timelines, authentication logs, and firewall event records during multi-source incident reconstruction",
              "The PCAP file's cryptographic hash will change every time it is read",
              "Display filters using time operators will throw fatal syntax exceptions"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Accurate clock synchronization (via NTP/PTP) on packet capture devices is paramount for Digital Forensics and Incident Response (DFIR). Timestamp skew prevents cross-correlating network packets with host event logs, SIEM alerts, and firewall connection records.",
            "difficulty": "intermediate"
          }
        ]
      }
    },
    {
      "id": "mod-08-soc-forensics-capstone",
      "title": "Module 08: Final SOC Network Forensics Capstone",
      "description": "Synthesize your complete forensics skill set in an end-to-end enterprise incident investigation, evidence extraction, timeline reconstruction, and executive report.",
      "order": 9,
      "lessons": [
        {
          "id": "les-08-1-capstone-investigation",
          "slug": "operation-blackout-beacon-capstone",
          "title": "Capstone Investigation: Operation Blackout Beacon \u2014 Enterprise Intrusion Forensics",
          "description": "Final assessed capstone investigation. Perform end-to-end network triage on an enterprise intrusion capture, reconstruct the attack chain, carve the deployed malware payload, compute C2 beacon metrics, and author an executive report.",
          "durationMinutes": 120,
          "order": 1,
          "objectives": [
            "Execute the complete 5-phase forensic triage methodology on an unknown multi-stage intrusion capture",
            "Extract Indicators of Compromise (IOCs) including C2 IPs, domain infrastructure, and payload hashes",
            "Measure C2 beaconing interval, jitter distribution, and data exfiltration velocity",
            "Submit a comprehensive 6-part incident response report scored across the 100-mark assessment rubric"
          ],
          "tags": [
            "capstone",
            "enterprise-investigation",
            "soc-forensics",
            "incident-response",
            "assessment"
          ],
          "skillsTaught": [
            "Full-scope intrusion analysis",
            "Evidence chain preservation",
            "Executive and technical reporting"
          ],
          "richContent": {
            "introduction": "Welcome to the culmination of the Network Packet Analysis & Forensics Masterclass. In this assessed capstone, you step into the role of Lead Network Forensic Investigator responding to a major corporate security alert: Operation Blackout Beacon. Using all the techniques mastered across the curriculum \u2014 Protocol Hierarchy, display filter syntax, stream reassembly, object carving, C2 beacon timing analysis, and chain of custody documentation \u2014 you will analyze the evidence capture and deliver an authoritative investigation report.",
            "prerequisites": [
              "Modules 00 through 07 complete"
            ],
            "keyTerminology": [
              {
                "term": "Operation Blackout Beacon",
                "definition": "The formal code name of the simulated enterprise intrusion investigation assessed in this capstone."
              },
              {
                "term": "100-Mark Rubric",
                "definition": "The multi-category assessment rubric measuring Triage (15), Protocol Investigation (15), Suspicious Activity (20), Evidence Preservation (15), Timeline (15), and Report Quality (20)."
              }
            ],
            "theorySections": [
              {
                "title": "Capstone Scenario Briefing & Investigation Rules",
                "content": "On October 14 at 03:22 UTC, enterprise monitoring detected persistent anomalous outbound connections originating from an internal accounting host (10.0.4.152). A 45-minute continuous packet capture was acquired from the core switch SPAN port. Your mandate: 1) Verify the integrity of Hackers on the Network.pcapng, 2) Identify the initial delivery method and external C2 servers, 3) Carve and hash any dropped executables, 4) Document the exact intrusion timeline, and 5) Deliver immediate containment rules and an executive summary.",
                "keyPoints": [
                  "Passing threshold is 75/100 marks across the 6 rubric categories.",
                  "All findings must cite specific packet numbers, display filters, and UTC timestamps.",
                  "Do not execute any carved executable payloads on host systems."
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Verify Evidence Integrity",
                "instruction": "Calculate the SHA-256 hash of Hackers on the Network.pcapng and record in your chain of custody worksheet.",
                "filter": "sha256sum \"Hackers on the Network.pcapng\"",
                "expectedOutcome": "Validates that the file matches the expected reference hash: 9f228b37ad582a9394f71a0642751f8dc974be42d0719ef7dfc33bb3e24a49db."
              },
              {
                "step": 2,
                "title": "Execute Protocol Hierarchy and Endpoints Analysis",
                "instruction": "Open Statistics -> Protocol Hierarchy and Statistics -> Endpoints to identify top talkers and external connections.",
                "expectedOutcome": "Isolates the key internal victim IP and external adversary IP addresses."
              },
              {
                "step": 3,
                "title": "Reconstruct C2 Channel & Carve Dropped Binaries",
                "instruction": "Filter for outbound HTTP/TLS streams from 10.0.4.152 and carve transferred files using File -> Export Objects.",
                "expectedOutcome": "Extracts the secondary stage dropped executable and identifies C2 beacon parameters."
              }
            ],
            "displayFilters": [
              {
                "filter": "ip.addr == 10.0.4.152",
                "description": "Isolates all traffic to and from the primary victim host",
                "purpose": "Capstone investigation baseline"
              },
              {
                "filter": "http or tls.handshake.type == 1",
                "description": "Filters for web session initiation and TLS client hellos",
                "purpose": "Map adversary external infrastructure"
              }
            ],
            "expectedObservations": [
              "A clear intrusion trajectory emerges: initial beacon -> executable download -> persistent periodic C2 heartbeats -> internal reconnaissance."
            ],
            "commonMistakes": [
              "Guessing attack milestones without verifying exact packet sequence numbers and timestamps.",
              "Failing to document specific remediation firewall rules with IP and port tuples."
            ],
            "securityRelevance": "The skills demonstrated in this capstone reflect the daily responsibilities of Tier 2/3 SOC Analysts, Incident Responders, and Threat Hunters.",
            "knowledgeCheck": {
              "question": "What is the minimum passing score required on the Operation Blackout Beacon 100-mark capstone assessment?",
              "options": [
                "50 marks",
                "60 marks",
                "75 marks",
                "90 marks"
              ],
              "correctAnswerIndex": 2,
              "explanation": "The capstone requires a minimum passing threshold of 75 out of 100 marks across the six rubric criteria.",
              "difficulty": "intermediate"
            },
            "summary": "Completing Operation Blackout Beacon certifies comprehensive practical competence in network packet analysis, forensic triage, and incident reporting.",
            "furtherReading": [
              {
                "title": "Wireshark Foundation Documentation",
                "url": "https://www.wireshark.org/docs/"
              }
            ]
          }
        }
      ],
      "capstoneAssessment": {
        "id": "capstone-operation-blackout-beacon",
        "title": "Operation Blackout Beacon \u2014 SOC Enterprise Intrusion Forensics",
        "scenario": "Simulated Incident Scenario: In this capstone scenario, an enterprise SOC analyst is presented with a realistic intrusion investigation narrative. Note: The scenario narrative, timestamps, and IP addresses below serve as an illustrative forensic challenge framework, while the analysis is conducted against the real multi-stage capture 'Hackers on the Network.pcapng' created by Netsec Explained. As the Lead Network Forensics Specialist, you have been tasked with investigating the capture, identifying anomalous protocol flows, isolating secondary payloads and beacons, evaluating command-and-control (C2) communication patterns, mapping connection attempts, and compiling a structured technical and executive report.",
        "pcapSource": {
          "fileName": "Hackers on the Network.pcapng",
          "fileUrl": "https://raw.githubusercontent.com/NetsecExplained/Advanced-Wireshark-Network-Forensics/master/Hackers%20on%20the%20Network.pcapng",
          "sha256": "b2bd9a8b484f4ded72a4ce7de1335198d5ae6e81ace89fe6e6d5a071e1391cd9"
        },
        "totalMarks": 100,
        "passingScore": 75,
        "rubric": [
          {
            "category": "1. Initial PCAP Triage",
            "marks": 15,
            "criteria": [
              "Accurately calculates total packet count, byte volume, capture duration, and average data rate",
              "Produces a comprehensive Protocol Hierarchy breakdown identifying top Layer 4 and Layer 7 protocols",
              "Isolates top IP talkers and lists all external IP endpoints communicating with internal subnets"
            ]
          },
          {
            "category": "2. Protocol Investigation",
            "marks": 15,
            "criteria": [
              "Identifies DNS anomalies, unauthorized DNS resolvers, and suspicious domain lookup spikes",
              "Reconstructs unencrypted HTTP requests, inspecting User-Agents, URIs, and server response codes",
              "Extracts TLS Server Name Indication (SNI) values and validates SSL certificate issuer validity"
            ]
          },
          {
            "category": "3. Suspicious Activity & Malware Detection",
            "marks": 20,
            "criteria": [
              "Pinpoints adversary C2 communication channels and calculates regular beaconing interval/jitter",
              "Carves and hashes the primary dropped executable artifact using Export Objects (HTTP/SMB)",
              "Detects active reconnaissance or brute-force scanning against internal domain controllers"
            ]
          },
          {
            "category": "4. Evidence Preservation & Forensic Rigor",
            "marks": 15,
            "criteria": [
              "Generates cryptographic SHA256 hashes of original PCAP and extracted forensic artifacts",
              "Documents immutable chain of custody with exact UTC timestamps and sensor interface identifiers",
              "Ensures that no extracted binaries are executed during static network analysis"
            ]
          },
          {
            "category": "5. Timeline Reconstruction",
            "marks": 15,
            "criteria": [
              "Builds a chronological UTC timestamped sequence of events from initial probe to exfiltration",
              "Correlates TCP sequence delta timings with adversary interaction pauses and automated script executions",
              "Identifies exact start and stop timestamps of lateral movement and data exfiltration sessions"
            ]
          },
          {
            "category": "6. Incident Report Quality & Remediation",
            "marks": 20,
            "criteria": [
              "Authors clear Executive Summary accessible to leadership detailing business impact and root cause",
              "Provides granular Technical Findings section complete with IOC table (IPs, Domains, Hashes, Ports)",
              "Recommends concrete immediate containment measures, network segmentation, and firewall rules"
            ]
          }
        ],
        "submissionSections": [
          {
            "id": "sub-triage",
            "title": "Phase 1: Initial PCAP Triage & Endpoint Discovery",
            "prompt": "Summarize the capture characteristics: total duration, packet count, primary internal subnets involved, and top external IP endpoints by transmitted byte volume.",
            "maxMarks": 15
          },
          {
            "id": "sub-protocols",
            "title": "Phase 2: Protocol Breakdown & DNS/TLS Investigation",
            "prompt": "Document all observed DNS queries to anomalous domains, suspicious HTTP User-Agent strings, and external TLS connection hostnames identified via SNI.",
            "maxMarks": 15
          },
          {
            "id": "sub-malware",
            "title": "Phase 3: C2 Detection & Payload Carving",
            "prompt": "Identify the exact IP, port, and protocol used for C2 communication. Calculate the beaconing interval and jitter. Provide the filename, size, and SHA256 of any carved executable payloads.",
            "maxMarks": 20
          },
          {
            "id": "sub-preservation",
            "title": "Phase 4: Evidence Integrity & Chain of Custody Record",
            "prompt": "Record the verification hashes of the evidence capture, specify proper handling procedures for malicious PCAP artifacts, and describe how sanitization would be performed if sharing with external CERTs.",
            "maxMarks": 15
          },
          {
            "id": "sub-timeline",
            "title": "Phase 5: Master Intrusion Timeline (UTC)",
            "prompt": "Provide a chronological table of key incident milestones: First Probe, Initial Infection / Download, C2 Established, Internal Reconnaissance, Lateral Movement, and Exfiltration.",
            "maxMarks": 15
          },
          {
            "id": "sub-report",
            "title": "Phase 6: Incident Remediation & SOC Containment Plan",
            "prompt": "Write actionable remediation recommendations: immediate firewall egress block rules, DNS sinkholing commands, host isolation priorities, and Snort/Suricata signature recommendations.",
            "maxMarks": 20
          }
        ]
      }
    }
  ]
};
