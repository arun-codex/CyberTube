import { Course } from '../types/course';

export const NETWORKING_FOR_CYBERSECURITY_COURSE: Course = {
  "id": "e0000000-0000-4000-8000-000000000001",
  "slug": "networking-for-cybersecurity-zero-to-advanced",
  "title": "Networking for Cybersecurity: Zero to Advanced",
  "shortDescription": "A comprehensive 30-module, 120-lesson zero-to-advanced networking curriculum designed for SOC analysts, network defense, packet analysis, and security engineering.",
  "description": "An intensive, video-first, 30-module professional networking curriculum designed specifically for SOC analysts, incident responders, network defenders, and blue team engineers. Spans from binary arithmetic, Ethernet, IPv4/IPv6, subnetting, and switching up through deep TCP stream analysis, DNS hunting, TLS decryption inspection, NetFlow, Zeek NSM, Suricata IDS/IPS, Nmap reconnaissance analysis, and cloud VPC architectures. Contains 120 video-guided lessons, zero quiz locks, hands-on Packet Tracer/Wireshark labs, and a complete SOC investigation capstone.",
  "domains": [
    "network-security",
    "soc-blue-team",
    "fundamentals",
    "dfir"
  ],
  "tags": [
    "networking",
    "tcp-ip",
    "osi-model",
    "wireshark",
    "subnetting",
    "dns",
    "tls",
    "zeek",
    "suricata",
    "nmap",
    "soc",
    "blue-team",
    "packet-analysis",
    "cloud-networking"
  ],
  "difficulty": "beginner",
  "thumbnailUrl": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
  "estimatedDuration": "44.2 hours of video (2652 mins) \u2022 120\u2013160 hours total study (30 modules \u2022 120 lessons \u2022 30 practical labs \u2022 SOC capstone)",
  "totalDurationMinutes": 2652,
  "instructor": {
    "name": "CyberTube Open Networking Faculty",
    "title": "Network Defense & SOC Educators",
    "organization": "Jeremy's IT Lab, Practical Networking, Chris Greer & CyberTube"
  },
  "prerequisites": [
    "Basic computer literacy and comfort with ordinary desktop computing",
    "An isolated lab workspace (Cisco Packet Tracer, Wireshark, and a host-only virtual machine)",
    "Dedication to complete hands-on packet inspection and defensive evidence documentation"
  ],
  "learningObjectives": [
    "Map layered protocols across the 7-layer OSI model and 4-layer TCP/IP stack to identify attack surfaces",
    "Calculate IPv4 subnets, CIDR blocks, VLSM schemes, and configure segmented Layer-2 VLANs",
    "Trace TCP three-way handshakes, sequence numbers, flag permutations, and diagnose connection stalls",
    "Dissect DNS queries, response codes, tunneling anomalies, and threat hunting patterns",
    "Inspect TLS cryptographic handshakes, cipher negotiation, and certificate trust chains without compromising encryption",
    "Capture and dissect live and offline traffic with Wireshark and automated TShark pipelines",
    "Correlate multi-source telemetry across Syslog, NetFlow/IPFIX, Zeek NSM logs, and Suricata IDS/IPS alerts",
    "Design and analyze zero-trust network boundaries, ACLs, stateful firewalls, and AWS VPC cloud security groups",
    "Author a comprehensive, court-defensible SOC network incident investigation report in the final capstone"
  ],
  "featured": true,
  "track": "cybersecurity",
  "capstone": {
    "id": "capstone-enterprise-network-security-investigation",
    "title": "Enterprise Network Security Investigation \u2014 SOC Analyst Final Project",
    "scenario": "You are a Tier-2 SOC Analyst at Apex Financial Defense Corp. At 08:42 UTC on November 24, 2026, the automated Network Security Monitoring (NSM) cluster generated critical alerts indicating unusual outbound DNS query patterns, beaconing behavior, and lateral reconnaissance across the corporate workstation subnet (10.100.20.0/24) toward the internal core database enclave (10.100.50.0/24).\n\nYour investigation scope spans 24 hours of enterprise telemetry:\n- Raw packet captures (pcapng) from perimeter and internal span ports (SPAN-CORE-01).\n- Zeek connection logs (conn.log, dns.log, http.log, ssl.log).\n- Suricata intrusion detection alerts (eve.json) highlighting ET OPEN trojan signatures.\n- Perimeter next-generation firewall (NGFW) egress allow/deny logs.\n- DHCP lease history and ARP resolution tables.\n\nYour mission is to perform comprehensive multi-source correlation, reconstruct the intrusion timeline, identify affected internal endpoints and external C2 infrastructure, calculate exfiltration volume, and author an executive-ready, incident-grade SOC Investigation Report with actionable containment rules.",
    "pcapSource": {
      "fileName": "cybertube-capstone-enterprise-nsm.pcapng",
      "fileUrl": "https://raw.githubusercontent.com/cybertube/pcaps/main/networking/capstone-enterprise-nsm.pcapng",
      "sha256": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"
    },
    "passingScore": 75,
    "totalMarks": 100,
    "rubric": [
      {
        "category": "1. Scoping, Baseline & Topology Analysis",
        "marks": 15,
        "criteria": [
          "Accurately defines network boundaries, IP addressing schemes, subnet masks, and critical asset enclaves.",
          "Establishes normal corporate traffic baselines (DNS query frequency, authorized port profiles, working hour traffic volumes).",
          "Identifies initial anomalies deviating from baseline network behavior."
        ]
      },
      {
        "category": "2. Packet Capture Dissection & Stream Reconstruction",
        "marks": 20,
        "criteria": [
          "Performs granular Wireshark analysis on suspicious TCP handshakes, resets, and window stalls.",
          "Applies accurate display filters (tcp.flags, eth.type, ip.proto, dns.qry.name, ssl.handshake.extensions_server_name).",
          "Reconstructs application payload streams and identifies malicious communication channels."
        ]
      },
      {
        "category": "3. DNS Investigation & Threat Hunting",
        "marks": 15,
        "criteria": [
          "Analyzes high-frequency and high-entropy DNS queries indicative of DNS tunneling or DGA algorithms.",
          "Calculates query volume, label lengths, and response codes (NXDOMAIN vs NOERROR).",
          "Extracts C2 domain indicators and correlates resolver IP deviations."
        ]
      },
      {
        "category": "4. Multi-Source Log Correlation (Zeek & Suricata)",
        "marks": 20,
        "criteria": [
          "Correlates Zeek conn.log UIDs with dns.log and ssl.log records.",
          "Validates Suricata IDS alerts against packet capture evidence, separating true positives from noise.",
          "Correlates perimeter firewall denial logs with internal lateral movement attempts."
        ]
      },
      {
        "category": "5. Intrusion Timeline & Scope of Compromise",
        "marks": 15,
        "criteria": [
          "Builds a chronological UTC master incident timeline spanning Initial Access, Discovery, C2, Lateral Movement, and Exfiltration.",
          "Identifies all affected internal IP addresses, MAC addresses, hostnames, and user accounts.",
          "Quantifies total data volume exfiltrated and confirms whether core databases were breached."
        ]
      },
      {
        "category": "6. Containment, Defense & Incident Report",
        "marks": 15,
        "criteria": [
          "Specifies immediate containment actions: firewall drop rules, DNS sinkholing, VLAN quarantine, and session resets.",
          "Develops custom Snort/Suricata detection rules and Zeek scripts to prevent recurrence.",
          "Delivers a polished, professional SOC Investigation Report with an Executive Summary and technical appendix."
        ]
      }
    ],
    "submissionSections": [
      {
        "id": "sub-scope-topology",
        "title": "Section 1: Executive Summary, Topology & Traffic Baseline",
        "prompt": "Provide a concise Executive Summary summarizing the incident impact, affected business functions, and root cause. Map the enterprise network topology (corporate workstations 10.100.20.0/24, DMZ 192.168.10.0/24, Core Servers 10.100.50.0/24) and contrast baseline network traffic against the observed anomaly indicators.",
        "maxMarks": 15
      },
      {
        "id": "sub-packet-inspection",
        "title": "Section 2: Wireshark Packet Inspection & Stream Analysis",
        "prompt": "Document your Wireshark packet capture analysis. Detail the specific display filters used (e.g. eth.type, ip.addr, tcp.flags, http, tls). Document the suspicious TCP handshakes, sequence numbers, anomalous window scaling, and extracted HTTP/TLS stream details. Provide exact timestamps, source/destination IPs, and port tuples.",
        "maxMarks": 20
      },
      {
        "id": "sub-dns-hunting",
        "title": "Section 3: DNS Threat Hunting & Tunneling Dissection",
        "prompt": "Analyze the observed DNS activity. Document query types (A, TXT, CNAME), average label length, entropy scores, and query frequencies. Provide evidence proving whether DNS tunneling or C2 beaconing occurred. Include specific malicious domain names, resolver IPs, and response code distributions.",
        "maxMarks": 15
      },
      {
        "id": "sub-telemetry-correlation",
        "title": "Section 4: Multi-Source Telemetry Correlation (Zeek, Suricata & Firewall)",
        "prompt": "Present your multi-source telemetry correlation table. Correlate Zeek conn.log UIDs with dns.log and ssl.log events. Document the Suricata alert signatures (SID, class, priority), packet validation results, and corresponding perimeter firewall allow/drop events.",
        "maxMarks": 20
      },
      {
        "id": "sub-incident-timeline",
        "title": "Section 5: Intrusion Timeline & Affected Asset Inventory",
        "prompt": "Construct a chronological master incident timeline in UTC. List every key milestone: Initial Probe, C2 Beacon Establishment, Internal Reconnaissance, Privilege Elevation / Lateral Movement, and Data Exfiltration. Provide the complete inventory of compromised endpoints (IP, MAC, Hostname, Role).",
        "maxMarks": 15
      },
      {
        "id": "sub-remediation-report",
        "title": "Section 6: Containment, Defensive Engineering & Incident Report",
        "prompt": "Detail immediate and long-term containment recommendations: exact perimeter firewall rules (Layer 3/4 and Layer 7), DNS sinkholing syntax, Suricata custom detection signatures, VLAN segmentation adjustments, and Zero Trust architectural improvements. Conclude with continuous monitoring recommendations.",
        "maxMarks": 15
      }
    ]
  },
  "modules": [
    {
      "id": "e0000000-0001-4000-8000-000000000000",
      "title": "Module 01: Orientation, Ethics and the Networking Lab",
      "description": "Beginner level (4\u20135 hours). Prerequisite: None beyond ordinary computer use. Set up a completely authorized lab and explain the role of networks in SOC defense. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 1,
      "lessons": [
        {
          "id": "e0000000-0001-4000-8000-000000000001",
          "slug": "m01-l1-network-security-roles",
          "title": "Module 01 - Lesson 1: Network security roles",
          "description": "Video instruction presented by ZeroDayVault - Cyber Panchayat: \"SOC Analyst L1 Full Course (Day 1) | Complete Beginner Guide to Cyber Security\". Technical focus on SOC Tier-1/2/3 operational responsibilities, incident triage lifecycles, and distinguishing administrative network management from defensive threat monitoring.",
          "youtubeVideoId": "CEKfFnHgQHw",
          "videoAttribution": {
            "creator": "ZeroDayVault - Cyber Panchayat",
            "platform": "youtube"
          },
          "durationMinutes": 51,
          "order": 1,
          "moduleTitle": "Module 01: Orientation, Ethics and the Networking Lab",
          "objectives": [
            "Explain the role of **Network security roles** in ordinary network behavior.",
            "Demonstrate **Networks and endpoints** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Safe lab environment** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Evidence workflow**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-01",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 01 - Lesson 1: Network security roles",
            "Network Security Engineering (Mod 01)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 01 - Lesson 1: Network security roles), follow along with WsCube Cyber Security (\"Complete Networking Tutorial 2026 | Beginner to Advanced (Cybersecurity Focus)\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "None beyond ordinary computer use"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 01 - Lesson 1: Network security roles",
                "content": "Contrast SOC monitoring, network administration and authorized testing. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Set up a completely authorized lab and explain the role of networks in SOC defense. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Contrast SOC monitoring, network administration and authorized testing. Define all terms in your own words; identify source/destination, tra...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 01 - Lesson 1: Network security roles.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draw an asset/owner/permission map for your home or isolated lab. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M01-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Set up a completely authorized lab and explain the role of networks in SOC defense. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 01 - Lesson 1: Network security roles from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              },
              {
                "title": "WsCube Cyber Security networking walkthrough",
                "url": "https://www.youtube.com/watch?v=ewtDKmovou4"
              }
            ]
          }
        },
        {
          "id": "e0000000-0001-4000-8000-000000000002",
          "slug": "m01-l2-networks-and-endpoints",
          "title": "Module 01 - Lesson 2: Networks and endpoints",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Network Devices | Day 1 | CCNA 200-301 Complete Course\". Technical focus on endpoint architecture, network topology hardware, host networking interfaces, and baseline telemetry generated during normal workstation communications.",
          "youtubeVideoId": "H8W9oMNSuwo",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 2,
          "moduleTitle": "Module 01: Orientation, Ethics and the Networking Lab",
          "objectives": [
            "Explain the role of **Network security roles** in ordinary network behavior.",
            "Demonstrate **Networks and endpoints** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Safe lab environment** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Evidence workflow**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-01",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 01 - Lesson 2: Networks and endpoints",
            "Network Security Engineering (Mod 01)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 01 - Lesson 2: Networks and endpoints), follow along with Jeremy's IT Lab (\"Free CCNA | Network Devices | Day 1 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "None beyond ordinary computer use"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 01 - Lesson 2: Networks and endpoints",
                "content": "Differentiate hosts, clients, servers, switches and routers. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Set up a completely authorized lab and explain the role of networks in SOC defense. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Differentiate hosts, clients, servers, switches and routers. Define all terms in your own words; identify source/destination, transport or s...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 01 - Lesson 2: Networks and endpoints.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Sketch a three-host lab topology with IP labels. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M01-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Set up a completely authorized lab and explain the role of networks in SOC defense. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 01 - Lesson 2: Networks and endpoints from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              },
              {
                "title": "WsCube Cyber Security networking walkthrough",
                "url": "https://www.youtube.com/watch?v=ewtDKmovou4"
              }
            ]
          }
        },
        {
          "id": "e0000000-0001-4000-8000-000000000003",
          "slug": "m01-l3-safe-lab-environment",
          "title": "Module 01 - Lesson 3: Safe lab environment",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Packet Tracer Introduction | Day 1 Lab | CCNA 200-301 Complete Course\". Technical focus on configuring isolated virtual network testbeds, host-only adapter sandboxing, and executing safe defensive traffic generation without external network exposure.",
          "youtubeVideoId": "a1Im6GYaSno",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 15,
          "order": 3,
          "moduleTitle": "Module 01: Orientation, Ethics and the Networking Lab",
          "objectives": [
            "Explain the role of **Network security roles** in ordinary network behavior.",
            "Demonstrate **Networks and endpoints** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Safe lab environment** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Evidence workflow**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-01",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 01 - Lesson 3: Safe lab environment",
            "Network Security Engineering (Mod 01)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 01 - Lesson 3: Safe lab environment), follow along with Jeremy's IT Lab (\"Free CCNA | Packet Tracer Introduction | Day 1 Lab | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "None beyond ordinary computer use"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 01 - Lesson 3: Safe lab environment",
                "content": "Distinguish host-only, NAT and bridged virtual adapters. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Set up a completely authorized lab and explain the role of networks in SOC defense. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Distinguish host-only, NAT and bridged virtual adapters. Define all terms in your own words; identify source/destination, transport or servi...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 01 - Lesson 3: Safe lab environment.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Configure host-only or offline simulation and document IP ranges. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M01-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Set up a completely authorized lab and explain the role of networks in SOC defense. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 01 - Lesson 3: Safe lab environment from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              },
              {
                "title": "WsCube Cyber Security networking walkthrough",
                "url": "https://www.youtube.com/watch?v=ewtDKmovou4"
              }
            ]
          }
        },
        {
          "id": "e0000000-0001-4000-8000-000000000004",
          "slug": "m01-l4-evidence-workflow",
          "title": "Module 01 - Lesson 4: Evidence workflow",
          "description": "Video instruction presented by Professor Messer: \"Digital Forensics - CompTIA Security+ SY0-701 - 4.8\". Technical focus on digital evidence acquisition, order of volatility from CPU registers to cold storage, cryptographic hash integrity verification (SHA-256), and establishing legally defensible chain of custody documentation for incident response.",
          "youtubeVideoId": "UtDWApdO8Zk",
          "videoAttribution": {
            "creator": "Professor Messer",
            "platform": "youtube"
          },
          "durationMinutes": 10,
          "order": 4,
          "moduleTitle": "Module 01: Orientation, Ethics and the Networking Lab",
          "objectives": [
            "Explain the role of **Network security roles** in ordinary network behavior.",
            "Demonstrate **Networks and endpoints** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Safe lab environment** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Evidence workflow**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-01",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 01 - Lesson 4: Evidence workflow",
            "Network Security Engineering (Mod 01)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 01 - Lesson 4: Evidence workflow), follow along with Palo Alto Networks Unit 42 (\"Unit 42 Wireshark Workshop Part 1: Introduction & Prerequisites | Unit 42\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "None beyond ordinary computer use"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 01 - Lesson 4: Evidence workflow",
                "content": "Define screenshot, PCAP, command-output and incident-note evidence. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Set up a completely authorized lab and explain the role of networks in SOC defense. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Define screenshot, PCAP, command-output and incident-note evidence. Define all terms in your own words; identify source/destination, transpo...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 01 - Lesson 4: Evidence workflow.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Create module folders with redacted evidence templates. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M01-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Set up a completely authorized lab and explain the role of networks in SOC defense. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 01 - Lesson 4: Evidence workflow from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              },
              {
                "title": "WsCube Cyber Security networking walkthrough",
                "url": "https://www.youtube.com/watch?v=ewtDKmovou4"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 01: Host-Only Lab Architecture, Asset Inventory & Evidence Journal",
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "objective": "Design an isolated host-only network simulation, inventory virtual endpoints, and establish a tamper-evident forensic journal for all subsequent networking experiments.",
        "toolsRequired": [
          "VirtualBox or VMware Workstation",
          "Cisco Packet Tracer",
          "sha256sum / CertUtil",
          "Notepad++ / VS Code"
        ],
        "pcapSource": {
          "fileName": "m01-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m01-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b801"
        },
        "instructions": [
          "Configure an isolated host-only virtual adapter (192.168.56.0/24) disconnected from external internet gateways.",
          "Deploy two lightweight test nodes (Linux VM and Windows VM) with static addressing within the host-only subnet.",
          "Record hardware MAC addresses, assigned IP addresses, subnet masks, and default gateways in a structured inventory journal.",
          "Execute mutual ping verification between test nodes and compute cryptographic SHA-256 hashes of the initial configuration files.",
          "Document evidence collection procedures, timestamp synchronization, and forensic chain-of-custody protocols."
        ],
        "tasks": [
          {
            "id": "t01-1",
            "description": "Initialize Host-Only virtual network switch with subnet 192.168.56.0/24 and disable host DHCP server."
          },
          {
            "id": "t01-2",
            "description": "Configure static IP 192.168.56.10/24 on Node-A and 192.168.56.20/24 on Node-B with proper loopback validation."
          },
          {
            "id": "t01-3",
            "description": "Perform ICMP connectivity testing: ping -c 4 192.168.56.20 and verify zero packet loss."
          },
          {
            "id": "t01-4",
            "description": "Create evidence_log.md and record SHA-256 hashes of /etc/network/interfaces and test scripts using sha256sum."
          },
          {
            "id": "t01-5",
            "description": "Establish forensic log naming conventions: YYYYMMDD_HHMMSS_module01_evidence.pcap."
          }
        ],
        "completionCriteria": [
          "Host-only network is strictly isolated with no default gateway to the public internet.",
          "Both test endpoints successfully ping each other across the virtual switch.",
          "Cryptographic hashes and network inventory tables are recorded in the evidence worksheet."
        ],
        "evidenceWorksheet": [
          {
            "field": "network_topology_map",
            "prompt": "Document virtual interface names, MAC addresses, and assigned IP addresses for Node-A and Node-B.",
            "expectedEvidenceType": "Table with Interface, MAC, IP, Subnet Mask"
          },
          {
            "field": "connectivity_proof",
            "prompt": "Paste terminal output showing successful 4-packet ICMP exchange between nodes.",
            "expectedEvidenceType": "CLI Terminal Output"
          },
          {
            "field": "integrity_hash",
            "prompt": "Record SHA-256 hash of evidence journal file.",
            "expectedEvidenceType": "64-character hex hash string"
          }
        ],
        "id": "lab-m01",
        "questions": []
      }
    },
    {
      "id": "e0000000-0002-4000-8000-000000000000",
      "title": "Module 02: OSI and TCP/IP Models for SOC Analysts",
      "description": "Beginner level (4\u20135 hours). Prerequisite: Module 01 (recommended); prior prerequisite knowledge may be demonstrated. Map observed packet fields to OSI/TCP-IP layers and find likely fault or attack boundaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 2,
      "lessons": [
        {
          "id": "e0000000-0002-4000-8000-000000000001",
          "slug": "m02-l1-seven-osi-layers",
          "title": "Module 02 - Lesson 1: Seven OSI layers",
          "description": "Video instruction presented by Practical Networking: \"OSI Model: A Practical Perspective - Networking Fundamentals - Lesson 2a\". Technical focus on practical decomposition of the OSI 7-layer reference model, protocol data units (PDUs) at each boundary, and mapping attack surfaces to layer-specific vulnerabilities.",
          "youtubeVideoId": "LkolbURrtTs",
          "videoAttribution": {
            "creator": "Practical Networking",
            "platform": "youtube"
          },
          "durationMinutes": 13,
          "order": 1,
          "moduleTitle": "Module 02: OSI and TCP/IP Models for SOC Analysts",
          "objectives": [
            "Explain the role of **Seven OSI layers** in ordinary network behavior.",
            "Demonstrate **TCP/IP stack** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Encapsulation** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security by layer**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-02",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 02 - Lesson 1: Seven OSI layers",
            "Network Security Engineering (Mod 02)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 02 - Lesson 1: Seven OSI layers), follow along with Practical Networking (\"OSI Model: A Practical Perspective - Networking Fundamentals - Lesson 2a\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 01 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 02 - Lesson 1: Seven OSI layers",
                "content": "Identify physical, data-link, network, transport and application responsibilities. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Map observed packet fields to OSI/TCP-IP layers and find likely fault or attack boundaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Identify physical, data-link, network, transport and application responsibilities. Define all terms in your own words; identify source/desti...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 02 - Lesson 1: Seven OSI layers.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Label a browser request from cable through application. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M02-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Map observed packet fields to OSI/TCP-IP layers and find likely fault or attack boundaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 02 - Lesson 1: Seven OSI layers from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0002-4000-8000-000000000002",
          "slug": "m02-l2-tcp-ip-stack",
          "title": "Module 02 - Lesson 2: TCP/IP stack",
          "description": "Video instruction presented by Jeremy's IT Lab: \"How the TCP/IP Model Actually Works | CCNA Day 3\". Technical focus on the four-layer DoD TCP/IP architecture, protocol suite interactions, RFC standards, and comparing theoretical OSI constructs with real-world operating system network stacks.",
          "youtubeVideoId": "yM-XNq9ADlI",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 43,
          "order": 2,
          "moduleTitle": "Module 02: OSI and TCP/IP Models for SOC Analysts",
          "objectives": [
            "Explain the role of **Seven OSI layers** in ordinary network behavior.",
            "Demonstrate **TCP/IP stack** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Encapsulation** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security by layer**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-02",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 02 - Lesson 2: TCP/IP stack",
            "Network Security Engineering (Mod 02)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 02 - Lesson 2: TCP/IP stack), follow along with Practical Networking (\"OSI Model: A Practical Perspective - Part 2 - Networking Fundamentals - Lesson 2\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 01 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 02 - Lesson 2: TCP/IP stack",
                "content": "Map OSI to practical internet protocol layers. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Map observed packet fields to OSI/TCP-IP layers and find likely fault or attack boundaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Map OSI to practical internet protocol layers. Define all terms in your own words; identify source/destination, transport or service details...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 02 - Lesson 2: TCP/IP stack.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Create a one-page OSI-to-TCP/IP comparison. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M02-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Map observed packet fields to OSI/TCP-IP layers and find likely fault or attack boundaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 02 - Lesson 2: TCP/IP stack from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0002-4000-8000-000000000003",
          "slug": "m02-l3-encapsulation",
          "title": "Module 02 - Lesson 3: Encapsulation",
          "description": "Video instruction presented by Practical Networking: \"How Data moves through the Internet - Networking Fundamentals\". Technical focus on protocol encapsulation and decapsulation dynamics, tracking data payloads as headers and trailers are appended across physical, data link, internet, and transport boundaries.",
          "youtubeVideoId": "YJGGYKAV4pA",
          "videoAttribution": {
            "creator": "Practical Networking",
            "platform": "youtube"
          },
          "durationMinutes": 27,
          "order": 3,
          "moduleTitle": "Module 02: OSI and TCP/IP Models for SOC Analysts",
          "objectives": [
            "Explain the role of **Seven OSI layers** in ordinary network behavior.",
            "Demonstrate **TCP/IP stack** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Encapsulation** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security by layer**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-02",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 02 - Lesson 3: Encapsulation",
            "Network Security Engineering (Mod 02)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 02 - Lesson 3: Encapsulation), follow along with Practical Networking (\"How Data moves through the Internet - Networking Fundamentals\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 01 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 02 - Lesson 3: Encapsulation",
                "content": "Identify Ethernet frame, IP packet, TCP segment and data. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Map observed packet fields to OSI/TCP-IP layers and find likely fault or attack boundaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Identify Ethernet frame, IP packet, TCP segment and data. Define all terms in your own words; identify source/destination, transport or serv...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 02 - Lesson 3: Encapsulation.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draw an encapsulated HTTP example. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M02-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Map observed packet fields to OSI/TCP-IP layers and find likely fault or attack boundaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 02 - Lesson 3: Encapsulation from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0002-4000-8000-000000000004",
          "slug": "m02-l4-security-by-layer",
          "title": "Module 02 - Lesson 4: Security by layer",
          "description": "Video instruction presented by Cyber Gray Matter: \"OSI Model Layer Attacks, Mitigation & Protocols | Cybersecurity Analyst Training 101\". Technical focus on defense-in-depth architectural layering, evaluating security controls at Layer 2 (802.1X, port security), Layer 3 (ACLs, IPsec), Layer 4 (stateful firewalls), and Layer 7 (WAFs, DPI).",
          "youtubeVideoId": "CYhpEr8GFok",
          "videoAttribution": {
            "creator": "Cyber Gray Matter",
            "platform": "youtube"
          },
          "durationMinutes": 10,
          "order": 4,
          "moduleTitle": "Module 02: OSI and TCP/IP Models for SOC Analysts",
          "objectives": [
            "Explain the role of **Seven OSI layers** in ordinary network behavior.",
            "Demonstrate **TCP/IP stack** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Encapsulation** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security by layer**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-02",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 02 - Lesson 4: Security by layer",
            "Network Security Engineering (Mod 02)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 02 - Lesson 4: Security by layer), follow along with Professor Messer (\"Understanding the OSI Model - CompTIA Network+ N10-009 - 1.1\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 01 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 02 - Lesson 4: Security by layer",
                "content": "Relate alerts to MAC, IP, port, domain and URL data. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Map observed packet fields to OSI/TCP-IP layers and find likely fault or attack boundaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Relate alerts to MAC, IP, port, domain and URL data. Define all terms in your own words; identify source/destination, transport or service d...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 02 - Lesson 4: Security by layer.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Classify ten example observations by layer. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M02-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Map observed packet fields to OSI/TCP-IP layers and find likely fault or attack boundaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 02 - Lesson 4: Security by layer from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 02: Multi-Layer Protocol Mapping & Fault Isolation",
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "objective": "Dissect a multi-protocol packet capture to identify Layer 2 through Layer 7 protocol data units (PDUs) and demonstrate precise fault isolation across the OSI hierarchy.",
        "toolsRequired": [
          "Wireshark",
          "curl / wget",
          "ping",
          "traceroute"
        ],
        "pcapSource": {
          "fileName": "m02-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m02-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b802"
        },
        "instructions": [
          "Load sample_http_dns_icmp.pcap into Wireshark and inspect packet #1.",
          "Examine the Wireshark packet details pane and map each header to its corresponding OSI and TCP/IP layer.",
          "Identify Layer 2 Frame (Ethernet II), Layer 3 Packet (IPv4), Layer 4 Segment (TCP), and Layer 7 PDU (HTTP).",
          "Simulate Layer 2, Layer 3, and Layer 7 communication failures and document the observable diagnostic symptoms for each layer."
        ],
        "tasks": [
          {
            "id": "t02-1",
            "description": "Identify Ethernet II encapsulation fields (preamble, dest MAC, src MAC, EtherType 0x0800)."
          },
          {
            "id": "t02-2",
            "description": "Examine IPv4 protocol field (0x06 for TCP, 0x11 for UDP, 0x01 for ICMP) and correlate with upper-layer headers."
          },
          {
            "id": "t02-3",
            "description": "Correlate TCP source and destination port numbers with application layer payload data."
          },
          {
            "id": "t02-4",
            "description": "Construct a 7-layer fault isolation matrix distinguishing cable disconnect (L1), MAC misconfiguration (L2), bad mask (L3), closed port (L4), and HTTP 500 (L7)."
          }
        ],
        "completionCriteria": [
          "All 4 encapsulation layers correctly identified and labeled in Wireshark packet details.",
          "Protocol decapsulation order documented from physical bits to application payload.",
          "OSI diagnostic fault isolation matrix completed with technical observables."
        ],
        "evidenceWorksheet": [
          {
            "field": "encapsulation_table",
            "prompt": "List the PDU name, header fields, and addressing scheme for Layers 2, 3, 4, and 7 of Packet #1.",
            "expectedEvidenceType": "Multi-column comparison table"
          },
          {
            "field": "fault_isolation_case",
            "prompt": "Explain what error message a client receives when Layer 3 is intact but Layer 4 service is refused (TCP RST).",
            "expectedEvidenceType": "Defensive analysis text"
          }
        ],
        "id": "lab-m02",
        "questions": []
      }
    },
    {
      "id": "e0000000-0003-4000-8000-000000000000",
      "title": "Module 03: Cables, Interfaces, Ethernet and MAC Addresses",
      "description": "Beginner level (4\u20135 hours). Prerequisite: Module 02 (recommended); prior prerequisite knowledge may be demonstrated. Interpret layer-2 frames and explain MAC-based communication and its limits. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 3,
      "lessons": [
        {
          "id": "e0000000-0003-4000-8000-000000000001",
          "slug": "m03-l1-physical-interfaces",
          "title": "Module 03 - Lesson 1: Physical interfaces",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Interfaces and Cables | Day 2 | CCNA 200-301 Complete Course\". Technical focus on Ethernet physical media standards, copper twisted-pair cabling, optical fiber transceivers, link negotiation, and physical layer signal integrity.",
          "youtubeVideoId": "ieTH5lVhNaY",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 36,
          "order": 1,
          "moduleTitle": "Module 03: Cables, Interfaces, Ethernet and MAC Addresses",
          "objectives": [
            "Explain the role of **Physical interfaces** in ordinary network behavior.",
            "Demonstrate **Ethernet headers** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Switching behavior** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Layer-2 threats**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-03",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 03 - Lesson 1: Physical interfaces",
            "Network Security Engineering (Mod 03)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 03 - Lesson 1: Physical interfaces), follow along with Jeremy's IT Lab (\"Free CCNA | Interfaces and Cables | Day 2 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 02 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 03 - Lesson 1: Physical interfaces",
                "content": "Recognize NICs, link speed, duplex, cable media. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret layer-2 frames and explain MAC-based communication and its limits. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Recognize NICs, link speed, duplex, cable media. Define all terms in your own words; identify source/destination, transport or service detai...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 03 - Lesson 1: Physical interfaces.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Record interface status using ip link / Windows Get-NetAdapter. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M03-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret layer-2 frames and explain MAC-based communication and its limits. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 03 - Lesson 1: Physical interfaces from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0003-4000-8000-000000000002",
          "slug": "m03-l2-ethernet-headers",
          "title": "Module 03 - Lesson 2: Ethernet headers",
          "description": "Video instruction presented by Dave's Garage: \"Ethernet Explained so well that even YOU can Understand it!\". Technical focus on Ethernet II frame architecture, preamble synchronization, Start Frame Delimiter, 48-bit MAC addressing, EtherType protocol multiplexing, payload padding constraints, and Frame Check Sequence (CRC-32) error detection in Wireshark.",
          "youtubeVideoId": "7vzjIv2l6wY",
          "videoAttribution": {
            "creator": "Dave's Garage",
            "platform": "youtube"
          },
          "durationMinutes": 23,
          "order": 2,
          "moduleTitle": "Module 03: Cables, Interfaces, Ethernet and MAC Addresses",
          "objectives": [
            "Explain the role of **Physical interfaces** in ordinary network behavior.",
            "Demonstrate **Ethernet headers** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Switching behavior** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Layer-2 threats**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-03",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 03 - Lesson 2: Ethernet headers",
            "Network Security Engineering (Mod 03)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 03 - Lesson 2: Ethernet headers), follow along with Practical Networking (\"Everything Switches do - Part 1 - Networking Fundamentals - Lesson 4\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 02 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 03 - Lesson 2: Ethernet headers",
                "content": "Find source/destination MAC, EtherType and broadcast. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret layer-2 frames and explain MAC-based communication and its limits. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Find source/destination MAC, EtherType and broadcast. Define all terms in your own words; identify source/destination, transport or service ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 03 - Lesson 2: Ethernet headers.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Inspect Ethernet II frame fields in Wireshark. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M03-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret layer-2 frames and explain MAC-based communication and its limits. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 03 - Lesson 2: Ethernet headers from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0003-4000-8000-000000000003",
          "slug": "m03-l3-switching-behavior",
          "title": "Module 03 - Lesson 3: Switching behavior",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Ethernet LAN Switching (Part 1) | Day 5 | CCNA 200-301 Complete Course\". Technical focus on Layer 2 switch forwarding logic, Content Addressable Memory (CAM) table population, MAC learning algorithms, and unknown unicast frame flooding behavior.",
          "youtubeVideoId": "u2n762WG0Vo",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 38,
          "order": 3,
          "moduleTitle": "Module 03: Cables, Interfaces, Ethernet and MAC Addresses",
          "objectives": [
            "Explain the role of **Physical interfaces** in ordinary network behavior.",
            "Demonstrate **Ethernet headers** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Switching behavior** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Layer-2 threats**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-03",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 03 - Lesson 3: Switching behavior",
            "Network Security Engineering (Mod 03)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 03 - Lesson 3: Switching behavior), follow along with Jeremy's IT Lab (\"Free CCNA | Ethernet LAN Switching (Part 1) | Day 5 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 02 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 03 - Lesson 3: Switching behavior",
                "content": "Explain learning, forwarding, flooding and MAC table aging. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret layer-2 frames and explain MAC-based communication and its limits. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain learning, forwarding, flooding and MAC table aging. Define all terms in your own words; identify source/destination, transport or se...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 03 - Lesson 3: Switching behavior.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Simulate switching in Packet Tracer. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M03-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret layer-2 frames and explain MAC-based communication and its limits. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 03 - Lesson 3: Switching behavior from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0003-4000-8000-000000000004",
          "slug": "m03-l4-layer-2-threats",
          "title": "Module 03 - Lesson 4: Layer-2 threats",
          "description": "Video instruction presented by Professor Messer: \"MAC Flooding - CompTIA Network+ N10-009 - 4.2\". Technical focus on Layer 2 attack vectors including MAC address table flooding, CAM overflow exhaustion, ARP cache spoofing, and switchport security mitigation controls.",
          "youtubeVideoId": "ttLNYwt-aq0",
          "videoAttribution": {
            "creator": "Professor Messer",
            "platform": "youtube"
          },
          "durationMinutes": 8,
          "order": 4,
          "moduleTitle": "Module 03: Cables, Interfaces, Ethernet and MAC Addresses",
          "objectives": [
            "Explain the role of **Physical interfaces** in ordinary network behavior.",
            "Demonstrate **Ethernet headers** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Switching behavior** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Layer-2 threats**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-03",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 03 - Lesson 4: Layer-2 threats",
            "Network Security Engineering (Mod 03)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 03 - Lesson 4: Layer-2 threats), follow along with Professor Messer (\"MAC Flooding - CompTIA Network+ N10-009 - 4.2\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 02 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 03 - Lesson 4: Layer-2 threats",
                "content": "Explain MAC spoofing and port-security signals defensively. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret layer-2 frames and explain MAC-based communication and its limits. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain MAC spoofing and port-security signals defensively. Define all terms in your own words; identify source/destination, transport or se...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 03 - Lesson 4: Layer-2 threats.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Write a detection idea for sudden MAC changes. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M03-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret layer-2 frames and explain MAC-based communication and its limits. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 03 - Lesson 4: Layer-2 threats from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 03: Ethernet II Frame Inspection, MAC Table Flooding & L2 Threat Analysis",
        "difficulty": "beginner",
        "estimatedMinutes": 75,
        "objective": "Perform deep packet analysis of Ethernet II frames using Wireshark, analyze switch MAC address table learning, and evaluate Layer-2 attack indicators.",
        "toolsRequired": [
          "Wireshark",
          "Cisco Packet Tracer",
          "arping"
        ],
        "pcapSource": {
          "fileName": "m03-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m03-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b803"
        },
        "instructions": [
          "Launch Packet Tracer with 3 PCs (PC0, PC1, PC2) connected to a 2960 switch.",
          "Clear switch MAC table: clear mac address-table dynamic. Inspect empty table using show mac address-table.",
          "Ping from PC0 to PC1 in simulation mode. Observe switch broadcast flooding on initial ARP request (FF:FF:FF:FF:FF:FF).",
          "Observe unicast reply from PC1 and verify switch populates MAC table with port-to-MAC bindings.",
          "Open Wireshark and apply filter 'eth'. Dissect Destination MAC, Source MAC, EtherType (0x0800 IPv4, 0x0806 ARP), and Payload.",
          "Analyze why capture interfaces strip Preamble (7 bytes) and Frame Check Sequence (FCS 4 bytes) before delivering frames to Wireshark."
        ],
        "tasks": [
          {
            "id": "t03-1",
            "description": "In Packet Tracer, inspect switch MAC table before and after unicast frame transmission using 'show mac address-table'."
          },
          {
            "id": "t03-2",
            "description": "Identify Ethernet broadcast MAC address ff:ff:ff:ff:ff:ff and verify all switch ports except ingress receive flooded frame."
          },
          {
            "id": "t03-3",
            "description": "In Wireshark, apply display filter: eth.type == 0x0800 && eth.dst != ff:ff:ff:ff:ff:ff to isolate unicast IP traffic."
          },
          {
            "id": "t03-4",
            "description": "Examine OUI (Organizationally Unique Identifier) first 3 bytes (24 bits) and vendor lookup in Wireshark."
          },
          {
            "id": "t03-5",
            "description": "Document MAC flooding attack mechanics: CAM table exhaustion, switch fallback to hub fail-open flooding, and port security mitigation."
          }
        ],
        "completionCriteria": [
          "Ethernet II frame structure verified: 6-byte dest MAC, 6-byte src MAC, 2-byte EtherType, 46-1500 byte payload.",
          "Switch MAC learning behavior accurately mapped during unicast and broadcast frames.",
          "Port security commands (switchport port-security, violation shutdown) documented for defensive hardening."
        ],
        "evidenceWorksheet": [
          {
            "field": "frame_header_breakdown",
            "prompt": "Extract the exact hex bytes of the Ethernet header from packet #1 (Source MAC, Destination MAC, EtherType).",
            "expectedEvidenceType": "Hex bytes and annotated interpretation"
          },
          {
            "field": "fcs_stripping_explanation",
            "prompt": "Explain why Wireshark captures on standard NICs do not display the 8-byte Preamble/SFD and 4-byte FCS.",
            "expectedEvidenceType": "NIC driver and physical layer architecture summary"
          },
          {
            "field": "cam_overflow_defense",
            "prompt": "Provide the exact Cisco switch configuration commands to restrict port Gi0/1 to a maximum of 2 learned MAC addresses.",
            "expectedEvidenceType": "CLI Configuration Script"
          }
        ],
        "id": "lab-m03",
        "questions": []
      }
    },
    {
      "id": "e0000000-0004-4000-8000-000000000000",
      "title": "Module 04: IPv4, Binary and Packet Headers",
      "description": "Beginner level (4\u20135 hours). Prerequisite: Module 03 (recommended); prior prerequisite knowledge may be demonstrated. Interpret IPv4 addresses, host ranges, reserved spaces and IP header fields. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 4,
      "lessons": [
        {
          "id": "e0000000-0004-4000-8000-000000000001",
          "slug": "m04-l1-binary-and-dotted-decimal",
          "title": "Module 04 - Lesson 1: Binary and dotted decimal",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | IPv4 Addressing (Part 1) | Day 7 | CCNA 200-301 Complete Course\". Technical focus on binary math fundamentals for network security, 8-bit octet conversions, bitwise AND operations, and representing 32-bit IPv4 addresses in dotted-decimal format.",
          "youtubeVideoId": "3ROdsfEUuhs",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 40,
          "order": 1,
          "moduleTitle": "Module 04: IPv4, Binary and Packet Headers",
          "objectives": [
            "Explain the role of **Binary and dotted decimal** in ordinary network behavior.",
            "Demonstrate **IPv4 address categories** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **IP headers** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Host addressing**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-04",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 04 - Lesson 1: Binary and dotted decimal",
            "Network Security Engineering (Mod 04)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 04 - Lesson 1: Binary and dotted decimal), follow along with Jeremy's IT Lab (\"Free CCNA | IPv4 Addressing (Part 1) | Day 7 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 03 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 04 - Lesson 1: Binary and dotted decimal",
                "content": "Convert an octet between binary and decimal. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret IPv4 addresses, host ranges, reserved spaces and IP header fields. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Convert an octet between binary and decimal. Define all terms in your own words; identify source/destination, transport or service details w...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 04 - Lesson 1: Binary and dotted decimal.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Write conversion steps for 192 and 168. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M04-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret IPv4 addresses, host ranges, reserved spaces and IP header fields. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 04 - Lesson 1: Binary and dotted decimal from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "RFC 1918 \u2014 private IPv4 addressing",
                "url": "https://www.rfc-editor.org/rfc/rfc1918"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0004-4000-8000-000000000002",
          "slug": "m04-l2-ipv4-address-categories",
          "title": "Module 04 - Lesson 2: IPv4 address categories",
          "description": "Video instruction presented by Professor Messer: \"IPv4 Addressing - CompTIA Network+ N10-009 - 1.7\". Technical focus on IPv4 address classification, RFC 1918 private address spaces, APIPA autoconfiguration, loopback ranges, and multicast/broadcast operational boundaries.",
          "youtubeVideoId": "JNNcyZ_VE2A",
          "videoAttribution": {
            "creator": "Professor Messer",
            "platform": "youtube"
          },
          "durationMinutes": 11,
          "order": 2,
          "moduleTitle": "Module 04: IPv4, Binary and Packet Headers",
          "objectives": [
            "Explain the role of **Binary and dotted decimal** in ordinary network behavior.",
            "Demonstrate **IPv4 address categories** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **IP headers** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Host addressing**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-04",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 04 - Lesson 2: IPv4 address categories",
            "Network Security Engineering (Mod 04)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 04 - Lesson 2: IPv4 address categories), follow along with Professor Messer (\"IPv4 Addressing - CompTIA Network+ N10-009 - 1.7\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 03 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 04 - Lesson 2: IPv4 address categories",
                "content": "Separate private, public, loopback, multicast and link-local. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret IPv4 addresses, host ranges, reserved spaces and IP header fields. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Separate private, public, loopback, multicast and link-local. Define all terms in your own words; identify source/destination, transport or ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 04 - Lesson 2: IPv4 address categories.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Categorize ten addresses from a sample list. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M04-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret IPv4 addresses, host ranges, reserved spaces and IP header fields. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 04 - Lesson 2: IPv4 address categories from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "RFC 1918 \u2014 private IPv4 addressing",
                "url": "https://www.rfc-editor.org/rfc/rfc1918"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0004-4000-8000-000000000003",
          "slug": "m04-l3-ip-headers",
          "title": "Module 04 - Lesson 3: IP headers",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | IPv4 Header | Day 10 | CCNA 200-301 Complete Course\". Technical focus on IPv4 packet header dissection, analyzing TTL expiration, TOS/DiffServ QoS fields, identification, fragmentation flags (DF/MF), and header checksum recalculation.",
          "youtubeVideoId": "aQB22y4liXA",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 3,
          "moduleTitle": "Module 04: IPv4, Binary and Packet Headers",
          "objectives": [
            "Explain the role of **Binary and dotted decimal** in ordinary network behavior.",
            "Demonstrate **IPv4 address categories** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **IP headers** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Host addressing**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-04",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 04 - Lesson 3: IP headers",
            "Network Security Engineering (Mod 04)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 04 - Lesson 3: IP headers), follow along with Jeremy's IT Lab (\"Free CCNA | IPv4 Header | Day 10 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 03 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 04 - Lesson 3: IP headers",
                "content": "Interpret source/destination, TTL, protocol and fragmentation indicators. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret IPv4 addresses, host ranges, reserved spaces and IP header fields. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Interpret source/destination, TTL, protocol and fragmentation indicators. Define all terms in your own words; identify source/destination, t...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 04 - Lesson 3: IP headers.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Inspect TTL and protocol fields in a saved PCAP. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M04-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret IPv4 addresses, host ranges, reserved spaces and IP header fields. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 04 - Lesson 3: IP headers from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "RFC 1918 \u2014 private IPv4 addressing",
                "url": "https://www.rfc-editor.org/rfc/rfc1918"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0004-4000-8000-000000000004",
          "slug": "m04-l4-host-addressing",
          "title": "Module 04 - Lesson 4: Host addressing",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Configuring IP Addresses | Day 8 Lab | CCNA 200-301 Complete Course\". Technical focus on network interface IP configuration, static versus dynamic address binding, default gateway routing parameters, and local host route table inspection.",
          "youtubeVideoId": "e1jbvyMeS5I",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 10,
          "order": 4,
          "moduleTitle": "Module 04: IPv4, Binary and Packet Headers",
          "objectives": [
            "Explain the role of **Binary and dotted decimal** in ordinary network behavior.",
            "Demonstrate **IPv4 address categories** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **IP headers** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Host addressing**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-04",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 04 - Lesson 4: Host addressing",
            "Network Security Engineering (Mod 04)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 04 - Lesson 4: Host addressing), follow along with Jeremy's IT Lab (\"Free CCNA | Configuring IP Addresses | Day 8 Lab | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 03 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 04 - Lesson 4: Host addressing",
                "content": "Recognize subnet mask, gateway and DNS resolver settings. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret IPv4 addresses, host ranges, reserved spaces and IP header fields. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Recognize subnet mask, gateway and DNS resolver settings. Define all terms in your own words; identify source/destination, transport or serv...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 04 - Lesson 4: Host addressing.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Record ipconfig /all or ip addr + ip route + resolvectl. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M04-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret IPv4 addresses, host ranges, reserved spaces and IP header fields. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 04 - Lesson 4: Host addressing from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "RFC 1918 \u2014 private IPv4 addressing",
                "url": "https://www.rfc-editor.org/rfc/rfc1918"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 04: IPv4 Header Analysis, Binary Subnet Decomposition & TTL Forensics",
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "objective": "Dissect IPv4 packet header fields in Wireshark, perform manual binary octet conversions, and analyze IP identification, flags, fragmentation, and TTL decrement mechanics.",
        "toolsRequired": [
          "Wireshark",
          "ping",
          "python"
        ],
        "pcapSource": {
          "fileName": "m04-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m04-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b804"
        },
        "instructions": [
          "Load sample_ipv4_headers.pcap in Wireshark and filter by 'ip'. Select an IPv4 packet.",
          "Dissect IP header fields: Version (4), IHL (5 = 20 bytes), DSCP/ECN, Total Length, Identification, Flags (DF, MF), Fragment Offset, Time to Live (TTL), Protocol (6=TCP, 17=UDP, 1=ICMP), Header Checksum, Source IP, and Destination IP.",
          "Convert dotted-decimal IP 192.168.10.75 into 32-bit binary notation (11000000.10101000.00001010.01001011).",
          "Trace TTL decrement: compare ingress TTL 64 with egress TTL 63 across a routing hop. Identify OS fingerprinting inferences (Linux=64, Windows=128, Cisco IOS=255)."
        ],
        "tasks": [
          {
            "id": "t04-1",
            "description": "Inspect IPv4 header length (IHL) and verify no optional IP fields are present (standard 20 bytes)."
          },
          {
            "id": "t04-2",
            "description": "Analyze IP Flags: inspect Don't Fragment (DF) bit set by Path MTU Discovery (PMTUD)."
          },
          {
            "id": "t04-3",
            "description": "Trace Identification and Fragment Offset fields across fragmented ICMP payloads (ping -l 3000)."
          },
          {
            "id": "t04-4",
            "description": "Correlate observed default TTL values with sender operating system fingerprinting techniques."
          }
        ],
        "completionCriteria": [
          "All 12 IPv4 header fields identified and documented with bit offsets.",
          "Binary octet conversion accurately calculated with zero bit errors.",
          "TTL hop decrement mechanics explained with traceroute operational correlation."
        ],
        "evidenceWorksheet": [
          {
            "field": "header_dissection",
            "prompt": "Extract IHL, Total Length, Protocol, TTL, and Checksum values from Packet #4.",
            "expectedEvidenceType": "Table with Field, Raw Hex, Decoded Decimal, Purpose"
          },
          {
            "field": "os_ttl_fingerprint",
            "prompt": "Explain how an initial TTL of 128 indicates a Windows sender, and calculate how many router hops occurred if captured TTL is 117.",
            "expectedEvidenceType": "Mathematical TTL calculation and OS forensic deduction"
          }
        ],
        "id": "lab-m04",
        "questions": []
      }
    },
    {
      "id": "e0000000-0005-4000-8000-000000000000",
      "title": "Module 05: Subnetting, CIDR and VLSM",
      "description": "Beginner level (4\u20135 hours). Prerequisite: Module 04 (recommended); prior prerequisite knowledge may be demonstrated. Calculate subnets and use them to plan segmented networks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 5,
      "lessons": [
        {
          "id": "e0000000-0005-4000-8000-000000000001",
          "slug": "m05-l1-network-prefix",
          "title": "Module 05 - Lesson 1: Network prefix",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Subnetting (Part 1) | Day 13 | CCNA 200-301 Complete Course\". Technical focus on Classless Inter-Domain Routing (CIDR) notation, subnet masks, prefix lengths, and calculating network and broadcast address boundaries from slash notation.",
          "youtubeVideoId": "bQ8sdpGQu8c",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 29,
          "order": 1,
          "moduleTitle": "Module 05: Subnetting, CIDR and VLSM",
          "objectives": [
            "Explain the role of **Network prefix** in ordinary network behavior.",
            "Demonstrate **Subnet math** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **VLSM design** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security use cases**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-05",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 05 - Lesson 1: Network prefix",
            "Network Security Engineering (Mod 05)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 05 - Lesson 1: Network prefix), follow along with Jeremy's IT Lab (\"Free CCNA | Subnetting (Part 1) | Day 13 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 04 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 05 - Lesson 1: Network prefix",
                "content": "Interpret /24, /26, /27, /30 and address counts. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Calculate subnets and use them to plan segmented networks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Interpret /24, /26, /27, /30 and address counts. Define all terms in your own words; identify source/destination, transport or service detai...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 05 - Lesson 1: Network prefix.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Solve five network-ID and broadcast-ID examples. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M05-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Calculate subnets and use them to plan segmented networks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 05 - Lesson 1: Network prefix from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "RFC 1918 \u2014 private IPv4 addressing",
                "url": "https://www.rfc-editor.org/rfc/rfc1918"
              }
            ]
          }
        },
        {
          "id": "e0000000-0005-4000-8000-000000000002",
          "slug": "m05-l2-subnet-math",
          "title": "Module 05 - Lesson 2: Subnet math",
          "description": "Video instruction presented by Professor Messer: \"Calculating IPv4 Subnets and Hosts - CompTIA Network+ N10-009 - 1.7\". Technical focus on rapid subnet calculation algorithms, determining usable host address capacity, octet-boundary borrow bits, and validating IP range allocations.",
          "youtubeVideoId": "cYQOMifDlKI",
          "videoAttribution": {
            "creator": "Professor Messer",
            "platform": "youtube"
          },
          "durationMinutes": 10,
          "order": 2,
          "moduleTitle": "Module 05: Subnetting, CIDR and VLSM",
          "objectives": [
            "Explain the role of **Network prefix** in ordinary network behavior.",
            "Demonstrate **Subnet math** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **VLSM design** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security use cases**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-05",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 05 - Lesson 2: Subnet math",
            "Network Security Engineering (Mod 05)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 05 - Lesson 2: Subnet math), follow along with Professor Messer (\"Calculating IPv4 Subnets and Hosts - CompTIA Network+ N10-009 - 1.7\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 04 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 05 - Lesson 2: Subnet math",
                "content": "Find host ranges and masks without online calculators. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Calculate subnets and use them to plan segmented networks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Find host ranges and masks without online calculators. Define all terms in your own words; identify source/destination, transport or service...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 05 - Lesson 2: Subnet math.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Calculate 192.168.10.64/27 by hand. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M05-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Calculate subnets and use them to plan segmented networks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 05 - Lesson 2: Subnet math from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "RFC 1918 \u2014 private IPv4 addressing",
                "url": "https://www.rfc-editor.org/rfc/rfc1918"
              }
            ]
          }
        },
        {
          "id": "e0000000-0005-4000-8000-000000000003",
          "slug": "m05-l3-vlsm-design",
          "title": "Module 05 - Lesson 3: VLSM design",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Subnetting (Part 3 - VLSM) | Day 15 | CCNA 200-301 Complete Course\". Technical focus on Variable-Length Subnet Masking (VLSM) hierarchical design, optimizing address allocation across branch offices, and avoiding overlapping address space collisions.",
          "youtubeVideoId": "z-JqCedc9EI",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 24,
          "order": 3,
          "moduleTitle": "Module 05: Subnetting, CIDR and VLSM",
          "objectives": [
            "Explain the role of **Network prefix** in ordinary network behavior.",
            "Demonstrate **Subnet math** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **VLSM design** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security use cases**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-05",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 05 - Lesson 3: VLSM design",
            "Network Security Engineering (Mod 05)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 05 - Lesson 3: VLSM design), follow along with Professor Messer (\"Magic Number Subnetting - CompTIA Network+ N10-009 - 1.7\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 04 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 05 - Lesson 3: VLSM design",
                "content": "Allocate address space for different host needs. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Calculate subnets and use them to plan segmented networks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Allocate address space for different host needs. Define all terms in your own words; identify source/destination, transport or service detai...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 05 - Lesson 3: VLSM design.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Create HR, engineering, guest and server subnet allocations. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M05-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Calculate subnets and use them to plan segmented networks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 05 - Lesson 3: VLSM design from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "RFC 1918 \u2014 private IPv4 addressing",
                "url": "https://www.rfc-editor.org/rfc/rfc1918"
              }
            ]
          }
        },
        {
          "id": "e0000000-0005-4000-8000-000000000004",
          "slug": "m05-l4-security-use-cases",
          "title": "Module 05 - Lesson 4: Security use cases",
          "description": "Video instruction presented by Secure Terminus: \"Your Network Is Flat | Segmentation Architecture Explained\". Technical focus on network segmentation strategies, designing VLAN and subnet security boundaries, eliminating flat network attack surfaces, mitigating lateral attacker movement, and establishing zero-trust access control boundaries between enterprise zones.",
          "youtubeVideoId": "YL0xh171m8w",
          "videoAttribution": {
            "creator": "Secure Terminus",
            "platform": "youtube"
          },
          "durationMinutes": 12,
          "order": 4,
          "moduleTitle": "Module 05: Subnetting, CIDR and VLSM",
          "objectives": [
            "Explain the role of **Network prefix** in ordinary network behavior.",
            "Demonstrate **Subnet math** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **VLSM design** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security use cases**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-05",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 05 - Lesson 4: Security use cases",
            "Network Security Engineering (Mod 05)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 05 - Lesson 4: Security use cases), follow along with Professor Messer (\"IPv4 Subnet Masks - CompTIA Network+ N10-009 - 1.7\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 04 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 05 - Lesson 4: Security use cases",
                "content": "Explain how subnet boundaries support ACLs, logs and segmentation. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Calculate subnets and use them to plan segmented networks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain how subnet boundaries support ACLs, logs and segmentation. Define all terms in your own words; identify source/destination, transpor...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 05 - Lesson 4: Security use cases.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draft a subnet-aware firewall policy matrix. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M05-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Calculate subnets and use them to plan segmented networks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 05 - Lesson 4: Security use cases from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "RFC 1918 \u2014 private IPv4 addressing",
                "url": "https://www.rfc-editor.org/rfc/rfc1918"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 05: Enterprise Subnet Architecture, CIDR Aggregation & VLSM Allocation",
        "difficulty": "intermediate",
        "estimatedMinutes": 90,
        "objective": "Design an enterprise VLSM IP addressing scheme allocating subnets for Corporate Users, DMZ Web Servers, Management, and Point-to-Point WAN links from a /24 parent block.",
        "toolsRequired": [
          "Cisco Packet Tracer",
          "Subnet Calculator / Python",
          "Excel / Markdown"
        ],
        "pcapSource": {
          "fileName": "m05-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m05-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b805"
        },
        "instructions": [
          "Given parent block 10.50.0.0/22 (1024 addresses), allocate non-overlapping subnets using Variable Length Subnet Masking (VLSM).",
          "Subnet Requirements: Sales (120 hosts -> /25), Engineering (60 hosts -> /26), Servers/DMZ (28 hosts -> /27), Management (12 hosts -> /28), WAN links (2 hosts each -> /30).",
          "Calculate Network ID, First Usable Host, Last Usable Host, Broadcast Address, and Subnet Mask for each allocated subnet.",
          "Implement addressing scheme in Cisco Packet Tracer and verify inter-subnet routing through default gateway sub-interfaces."
        ],
        "tasks": [
          {
            "id": "t05-1",
            "description": "Calculate VLSM allocations starting with largest host requirement first to avoid address fragmentation."
          },
          {
            "id": "t05-2",
            "description": "Derive custom subnet masks: /25 (255.255.255.128), /26 (255.255.255.192), /27 (255.255.255.224), /28 (255.255.255.240), /30 (255.255.255.252)."
          },
          {
            "id": "t05-3",
            "description": "Configure Packet Tracer router interfaces with calculated gateway IP addresses."
          },
          {
            "id": "t05-4",
            "description": "Verify hosts within each subnet can communicate with their local gateway and reject broadcast boundary crossing."
          }
        ],
        "completionCriteria": [
          "Zero overlapping IP address ranges across all 5 allocated subnets.",
          "All host requirements satisfied with minimum wasted IP host capacity.",
          "Packet Tracer simulation shows successful routing between subnets."
        ],
        "evidenceWorksheet": [
          {
            "field": "vlsm_table",
            "prompt": "Provide complete VLSM table listing Subnet Name, Required Hosts, Allocated CIDR, Network IP, Usable Range, Broadcast IP, and Subnet Mask.",
            "expectedEvidenceType": "Complete Markdown Table"
          },
          {
            "field": "overlap_audit",
            "prompt": "Prove that 10.50.0.128/26 does not overlap with 10.50.0.0/25 using binary boundary analysis.",
            "expectedEvidenceType": "Binary Subnet Proof"
          }
        ],
        "id": "lab-m05",
        "questions": []
      }
    },
    {
      "id": "e0000000-0006-4000-8000-000000000000",
      "title": "Module 06: ARP, ICMP, Ping and Traceroute",
      "description": "Beginner level (4\u20135 hours). Prerequisite: Module 05 (recommended); prior prerequisite knowledge may be demonstrated. Explain on-link reachability and diagnose IP/MAC resolution safely. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 6,
      "lessons": [
        {
          "id": "e0000000-0006-4000-8000-000000000001",
          "slug": "m06-l1-arp-resolution",
          "title": "Module 06 - Lesson 1: ARP resolution",
          "description": "Video instruction presented by Practical Networking: \"Everything Hosts do to speak on the Internet - Part 1 - Networking Fundamentals - Lesson 3\". Technical focus on Address Resolution Protocol (ARP) mechanics, broadcast request frames, unicast replies, and local subnet IP-to-MAC hardware binding dynamics.",
          "youtubeVideoId": "gYN2qN11-wE",
          "videoAttribution": {
            "creator": "Practical Networking",
            "platform": "youtube"
          },
          "durationMinutes": 12,
          "order": 1,
          "moduleTitle": "Module 06: ARP, ICMP, Ping and Traceroute",
          "objectives": [
            "Explain the role of **ARP resolution** in ordinary network behavior.",
            "Demonstrate **ICMP messages** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Routing path discovery** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Detection interpretation**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-06",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 06 - Lesson 1: ARP resolution",
            "Network Security Engineering (Mod 06)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 06 - Lesson 1: ARP resolution), follow along with Practical Networking (\"Everything Hosts do to speak on the Internet - Part 1 - Networking Fundamentals - Lesson 3\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 05 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 06 - Lesson 1: ARP resolution",
                "content": "Trace broadcast request and unicast response behavior. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Explain on-link reachability and diagnose IP/MAC resolution safely. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Trace broadcast request and unicast response behavior. Define all terms in your own words; identify source/destination, transport or service...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 06 - Lesson 1: ARP resolution.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Capture an ARP resolution on an isolated virtual LAN. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M06-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Explain on-link reachability and diagnose IP/MAC resolution safely. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 06 - Lesson 1: ARP resolution from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0006-4000-8000-000000000002",
          "slug": "m06-l2-icmp-messages",
          "title": "Module 06 - Lesson 2: ICMP messages",
          "description": "Video instruction presented by Professor Messer: \"Other Useful Protocols - CompTIA Network+ N10-009 - 1.4\". Technical focus on Internet Control Message Protocol (ICMP) packet structures, Echo Request/Reply (Type 8/0), Destination Unreachable (Type 3) codes, and TTL Exceeded error telemetry.",
          "youtubeVideoId": "5BahWbszVAY",
          "videoAttribution": {
            "creator": "Professor Messer",
            "platform": "youtube"
          },
          "durationMinutes": 8,
          "order": 2,
          "moduleTitle": "Module 06: ARP, ICMP, Ping and Traceroute",
          "objectives": [
            "Explain the role of **ARP resolution** in ordinary network behavior.",
            "Demonstrate **ICMP messages** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Routing path discovery** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Detection interpretation**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-06",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 06 - Lesson 2: ICMP messages",
            "Network Security Engineering (Mod 06)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 06 - Lesson 2: ICMP messages), follow along with Practical Networking (\"Everything Hosts do to speak on the Internet - Part 2 - Networking Fundamentals - Lesson 3\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 05 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 06 - Lesson 2: ICMP messages",
                "content": "Explain echo, time-exceeded and unreachable indications. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Explain on-link reachability and diagnose IP/MAC resolution safely. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain echo, time-exceeded and unreachable indications. Define all terms in your own words; identify source/destination, transport or servi...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 06 - Lesson 2: ICMP messages.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Compare ping outcomes in a lab. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M06-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Explain on-link reachability and diagnose IP/MAC resolution safely. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 06 - Lesson 2: ICMP messages from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0006-4000-8000-000000000003",
          "slug": "m06-l3-routing-path-discovery",
          "title": "Module 06 - Lesson 3: Routing path discovery",
          "description": "Video instruction presented by PowerCert Animated Videos: \"Traceroute (tracert) Explained - Network Troubleshooting\". Technical focus on path discovery utilities, analyzing traceroute packet mechanics, incremental TTL expiration, ICMP Time Exceeded hop reporting, and round-trip delay analysis.",
          "youtubeVideoId": "up3bcBLZS74",
          "videoAttribution": {
            "creator": "PowerCert Animated Videos",
            "platform": "youtube"
          },
          "durationMinutes": 9,
          "order": 3,
          "moduleTitle": "Module 06: ARP, ICMP, Ping and Traceroute",
          "objectives": [
            "Explain the role of **ARP resolution** in ordinary network behavior.",
            "Demonstrate **ICMP messages** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Routing path discovery** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Detection interpretation**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-06",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 06 - Lesson 3: Routing path discovery",
            "Network Security Engineering (Mod 06)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 06 - Lesson 3: Routing path discovery), follow along with Network Direction (\"What ARP does | Network Fundamentals Part 15\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 05 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 06 - Lesson 3: Routing path discovery",
                "content": "Understand traceroute TTL/ICMP behavior and limitations. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Explain on-link reachability and diagnose IP/MAC resolution safely. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Understand traceroute TTL/ICMP behavior and limitations. Define all terms in your own words; identify source/destination, transport or servi...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 06 - Lesson 3: Routing path discovery.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Run traceroute between owned VMs. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M06-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Explain on-link reachability and diagnose IP/MAC resolution safely. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 06 - Lesson 3: Routing path discovery from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0006-4000-8000-000000000004",
          "slug": "m06-l4-detection-interpretation",
          "title": "Module 06 - Lesson 4: Detection interpretation",
          "description": "Video instruction presented by Chris Greer: \"Catch a MiTM ARP Poison Attack with Wireshark // Ethical Hacking\". Technical focus on identifying network reconnaissance in packet captures, distinguishing benign ICMP monitoring from active ping sweeps, and detecting stealth host discovery probes.",
          "youtubeVideoId": "Evb1x3FJjEo",
          "videoAttribution": {
            "creator": "Chris Greer",
            "platform": "youtube"
          },
          "durationMinutes": 8,
          "order": 4,
          "moduleTitle": "Module 06: ARP, ICMP, Ping and Traceroute",
          "objectives": [
            "Explain the role of **ARP resolution** in ordinary network behavior.",
            "Demonstrate **ICMP messages** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Routing path discovery** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Detection interpretation**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-06",
            "beginner",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 06 - Lesson 4: Detection interpretation",
            "Network Security Engineering (Mod 06)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 06 - Lesson 4: Detection interpretation), follow along with Netsec Explained (\"Advanced Wireshark Network Forensics - Part 3/3\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 05 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 06 - Lesson 4: Detection interpretation",
                "content": "Recognize ARP anomalies and ICMP diagnostic false positives. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Explain on-link reachability and diagnose IP/MAC resolution safely. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Recognize ARP anomalies and ICMP diagnostic false positives. Define all terms in your own words; identify source/destination, transport or s...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 06 - Lesson 4: Detection interpretation.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Document benign vs concerning packet patterns. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M06-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Explain on-link reachability and diagnose IP/MAC resolution safely. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 06 - Lesson 4: Detection interpretation from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 06: ARP, ICMP, Ping and Traceroute Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "objective": "Capture ARP request/reply cycles, ICMP Echo/Reply, Destination Unreachable, and TTL Exceeded packets. Differentiate benign ping sweeps from network reconnaissance.",
        "toolsRequired": [
          "Wireshark",
          "CLI"
        ],
        "pcapSource": {
          "fileName": "m06-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m06-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b806"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Wireshark & CLI within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 06 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t06-1",
            "description": "Initialize lab topology and verify layer connectivity using Wireshark & CLI."
          },
          {
            "id": "t06-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 06."
          },
          {
            "id": "t06-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t06-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t06-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 06 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 06.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m06",
        "questions": []
      }
    },
    {
      "id": "e0000000-0007-4000-8000-000000000000",
      "title": "Module 07: Switching, VLANs and Layer-2 Segmentation",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 06 (recommended); prior prerequisite knowledge may be demonstrated. Configure VLANs and explain how segmentation changes attacker movement. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 7,
      "lessons": [
        {
          "id": "e0000000-0007-4000-8000-000000000001",
          "slug": "m07-l1-broadcast-domains",
          "title": "Module 07 - Lesson 1: Broadcast domains",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | VLANs (Part 1) | Day 16 | CCNA 200-301 Complete Course\". Technical focus on m07-l1-broadcast-domains: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "cjFzOnm6u1g",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 24,
          "order": 1,
          "moduleTitle": "Module 07: Switching, VLANs and Layer-2 Segmentation",
          "objectives": [
            "Explain the role of **Broadcast domains** in ordinary network behavior.",
            "Demonstrate **Access/trunk ports** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Inter-VLAN routing** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security controls**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-07",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 07 - Lesson 1: Broadcast domains",
            "Network Security Engineering (Mod 07)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 07 - Lesson 1: Broadcast domains), follow along with Jeremy's IT Lab (\"Free CCNA | VLANs (Part 1) | Day 16 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 06 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 07 - Lesson 1: Broadcast domains",
                "content": "Compare subnets, VLANs and collision domains. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Configure VLANs and explain how segmentation changes attacker movement. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Compare subnets, VLANs and collision domains. Define all terms in your own words; identify source/destination, transport or service details ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 07 - Lesson 1: Broadcast domains.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Map multiple VLANs in a sample office. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M07-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Configure VLANs and explain how segmentation changes attacker movement. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 07 - Lesson 1: Broadcast domains from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              }
            ]
          }
        },
        {
          "id": "e0000000-0007-4000-8000-000000000002",
          "slug": "m07-l2-access-trunk-ports",
          "title": "Module 07 - Lesson 2: Access/trunk ports",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | VLANs (Part 2) | Day 17 | CCNA 200-301 Complete Course\". Technical focus on m07-l2-access-trunk-ports: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "Jl9OOzNaBDU",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 40,
          "order": 2,
          "moduleTitle": "Module 07: Switching, VLANs and Layer-2 Segmentation",
          "objectives": [
            "Explain the role of **Broadcast domains** in ordinary network behavior.",
            "Demonstrate **Access/trunk ports** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Inter-VLAN routing** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security controls**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-07",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 07 - Lesson 2: Access/trunk ports",
            "Network Security Engineering (Mod 07)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 07 - Lesson 2: Access/trunk ports), follow along with Practical Networking (\"Everything Switches do - Part 2 - Networking Fundamentals - Lesson 4\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 06 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 07 - Lesson 2: Access/trunk ports",
                "content": "Explain access mode, tagged 802.1Q frames and native VLAN. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Configure VLANs and explain how segmentation changes attacker movement. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain access mode, tagged 802.1Q frames and native VLAN. Define all terms in your own words; identify source/destination, transport or ser...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 07 - Lesson 2: Access/trunk ports.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Configure a simulated access and trunk link. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M07-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Configure VLANs and explain how segmentation changes attacker movement. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 07 - Lesson 2: Access/trunk ports from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              }
            ]
          }
        },
        {
          "id": "e0000000-0007-4000-8000-000000000003",
          "slug": "m07-l3-inter-vlan-routing",
          "title": "Module 07 - Lesson 3: Inter-VLAN routing",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | VLANs (Part 3) | Day 18 | CCNA 200-301 Complete Course\". Technical focus on m07-l3-inter-vlan-routing: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "OkPB028l2eE",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 33,
          "order": 3,
          "moduleTitle": "Module 07: Switching, VLANs and Layer-2 Segmentation",
          "objectives": [
            "Explain the role of **Broadcast domains** in ordinary network behavior.",
            "Demonstrate **Access/trunk ports** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Inter-VLAN routing** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security controls**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-07",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 07 - Lesson 3: Inter-VLAN routing",
            "Network Security Engineering (Mod 07)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 07 - Lesson 3: Inter-VLAN routing), follow along with Professor Messer (\"VLANs and Trunking - CompTIA Network+ N10-009 - 2.2\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 06 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 07 - Lesson 3: Inter-VLAN routing",
                "content": "Identify why gateways are needed for cross-VLAN access. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Configure VLANs and explain how segmentation changes attacker movement. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Identify why gateways are needed for cross-VLAN access. Define all terms in your own words; identify source/destination, transport or servic...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 07 - Lesson 3: Inter-VLAN routing.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Use a router-on-a-stick simulation. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M07-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Configure VLANs and explain how segmentation changes attacker movement. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 07 - Lesson 3: Inter-VLAN routing from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              }
            ]
          }
        },
        {
          "id": "e0000000-0007-4000-8000-000000000004",
          "slug": "m07-l4-security-controls",
          "title": "Module 07 - Lesson 4: Security controls",
          "description": "Video instruction presented by NetworkChuck: \"you NEED to learn Port Security\u2026\u2026.RIGHT NOW!! // FREE CCNA // EP 14\". Technical focus on m07-l4-security-controls: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "0W4JZIWtjLQ",
          "videoAttribution": {
            "creator": "NetworkChuck",
            "platform": "youtube"
          },
          "durationMinutes": 23,
          "order": 4,
          "moduleTitle": "Module 07: Switching, VLANs and Layer-2 Segmentation",
          "objectives": [
            "Explain the role of **Broadcast domains** in ordinary network behavior.",
            "Demonstrate **Access/trunk ports** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Inter-VLAN routing** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security controls**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-07",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 07 - Lesson 4: Security controls",
            "Network Security Engineering (Mod 07)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 07 - Lesson 4: Security controls), follow along with NetworkChuck (\"you NEED to learn Port Security .RIGHT NOW!! // FREE CCNA // EP 14\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 06 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 07 - Lesson 4: Security controls",
                "content": "Recognize VLAN hopping risks, trunk misconfiguration and management isolation. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Configure VLANs and explain how segmentation changes attacker movement. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Recognize VLAN hopping risks, trunk misconfiguration and management isolation. Define all terms in your own words; identify source/destinati...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 07 - Lesson 4: Security controls.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Audit a sample configuration for unnecessary trunks. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M07-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Configure VLANs and explain how segmentation changes attacker movement. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 07 - Lesson 4: Security controls from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 07: Switching, VLANs and Layer-2 Segmentation Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "objective": "Configure 802.1Q trunking, access ports across VLAN 10 and VLAN 20, and inter-VLAN routing on a Router-on-a-Stick. Test broadcast isolation.",
        "toolsRequired": [
          "Packet Tracer"
        ],
        "pcapSource": {
          "fileName": "m07-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m07-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b807"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Packet Tracer within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 07 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t07-1",
            "description": "Initialize lab topology and verify layer connectivity using Packet Tracer."
          },
          {
            "id": "t07-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 07."
          },
          {
            "id": "t07-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t07-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t07-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 07 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 07.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m07",
        "questions": []
      }
    },
    {
      "id": "e0000000-0008-4000-8000-000000000000",
      "title": "Module 08: Routers, Routing Tables and Traffic Paths",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 07 (recommended); prior prerequisite knowledge may be demonstrated. Trace a packet through gateways and routing decisions. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 8,
      "lessons": [
        {
          "id": "e0000000-0008-4000-8000-000000000001",
          "slug": "m08-l1-forwarding-logic",
          "title": "Module 08 - Lesson 1: Forwarding logic",
          "description": "Video instruction presented by Practical Networking: \"Everything Routers do - Part 1 - Networking Fundamentals - Lesson 5\". Technical focus on m08-l1-forwarding-logic: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "AzXys5kxpAM",
          "videoAttribution": {
            "creator": "Practical Networking",
            "platform": "youtube"
          },
          "durationMinutes": 17,
          "order": 1,
          "moduleTitle": "Module 08: Routers, Routing Tables and Traffic Paths",
          "objectives": [
            "Explain the role of **Forwarding logic** in ordinary network behavior.",
            "Demonstrate **Default gateways** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Static routes** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security telemetry**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-08",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 08 - Lesson 1: Forwarding logic",
            "Network Security Engineering (Mod 08)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 08 - Lesson 1: Forwarding logic), follow along with Practical Networking (\"Everything Routers do - Part 1 - Networking Fundamentals - Lesson 5\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 07 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 08 - Lesson 1: Forwarding logic",
                "content": "Explain longest-prefix match and next-hop selection. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Trace a packet through gateways and routing decisions. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain longest-prefix match and next-hop selection. Define all terms in your own words; identify source/destination, transport or service d...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 08 - Lesson 1: Forwarding logic.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Inspect ip route / route print output. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M08-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Trace a packet through gateways and routing decisions. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 08 - Lesson 1: Forwarding logic from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              }
            ]
          }
        },
        {
          "id": "e0000000-0008-4000-8000-000000000002",
          "slug": "m08-l2-default-gateways",
          "title": "Module 08 - Lesson 2: Default gateways",
          "description": "Video instruction presented by Practical Networking: \"Everything Routers do - Part 2 - How Routers forward Packets - Networking Fundamentals - Lesson 5\". Technical focus on m08-l2-default-gateways: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "Ep-x_6kggKA",
          "videoAttribution": {
            "creator": "Practical Networking",
            "platform": "youtube"
          },
          "durationMinutes": 15,
          "order": 2,
          "moduleTitle": "Module 08: Routers, Routing Tables and Traffic Paths",
          "objectives": [
            "Explain the role of **Forwarding logic** in ordinary network behavior.",
            "Demonstrate **Default gateways** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Static routes** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security telemetry**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-08",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 08 - Lesson 2: Default gateways",
            "Network Security Engineering (Mod 08)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 08 - Lesson 2: Default gateways), follow along with Practical Networking (\"Everything Routers do - Part 2 - How Routers forward Packets - Networking Fundamentals - Lesson 5\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 07 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 08 - Lesson 2: Default gateways",
                "content": "Understand same-subnet vs remote-subnet forwarding. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Trace a packet through gateways and routing decisions. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Understand same-subnet vs remote-subnet forwarding. Define all terms in your own words; identify source/destination, transport or service de...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 08 - Lesson 2: Default gateways.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Map the packet path from workstation to external DNS. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M08-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Trace a packet through gateways and routing decisions. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 08 - Lesson 2: Default gateways from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              }
            ]
          }
        },
        {
          "id": "e0000000-0008-4000-8000-000000000003",
          "slug": "m08-l3-static-routes",
          "title": "Module 08 - Lesson 3: Static routes",
          "description": "Video instruction presented by Network Direction: \"Static route configuration | Network Fundamentals Part 18\". Technical focus on m08-l3-static-routes: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "cupc6Helc6Y",
          "videoAttribution": {
            "creator": "Network Direction",
            "platform": "youtube"
          },
          "durationMinutes": 14,
          "order": 3,
          "moduleTitle": "Module 08: Routers, Routing Tables and Traffic Paths",
          "objectives": [
            "Explain the role of **Forwarding logic** in ordinary network behavior.",
            "Demonstrate **Default gateways** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Static routes** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security telemetry**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-08",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 08 - Lesson 3: Static routes",
            "Network Security Engineering (Mod 08)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 08 - Lesson 3: Static routes), follow along with Network Direction (\"Static route configuration | Network Fundamentals Part 18\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 07 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 08 - Lesson 3: Static routes",
                "content": "Understand the effect of route entries and missing return paths. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Trace a packet through gateways and routing decisions. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Understand the effect of route entries and missing return paths. Define all terms in your own words; identify source/destination, transport ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 08 - Lesson 3: Static routes.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Create a three-router topology in Packet Tracer. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M08-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Trace a packet through gateways and routing decisions. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 08 - Lesson 3: Static routes from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              }
            ]
          }
        },
        {
          "id": "e0000000-0008-4000-8000-000000000004",
          "slug": "m08-l4-security-telemetry",
          "title": "Module 08 - Lesson 4: Security telemetry",
          "description": "Video instruction presented by M. Atoar Rahman: \"The Observability Pipeline: Collecting, Buffering, Processing, Routing, and Storing Telemetry\". Technical focus on enterprise routing telemetry architecture, streaming network metrics, monitoring route propagation anomalies, and buffering telemetry feeds for real-time security operations analysis.",
          "youtubeVideoId": "G8V7abxLHCs",
          "videoAttribution": {
            "creator": "M. Atoar Rahman",
            "platform": "youtube"
          },
          "durationMinutes": 31,
          "order": 4,
          "moduleTitle": "Module 08: Routers, Routing Tables and Traffic Paths",
          "objectives": [
            "Explain the role of **Forwarding logic** in ordinary network behavior.",
            "Demonstrate **Default gateways** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Static routes** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security telemetry**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-08",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 08 - Lesson 4: Security telemetry",
            "Network Security Engineering (Mod 08)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 08 - Lesson 4: Security telemetry), follow along with Professor Messer (\"Static Routing - CompTIA Network+ N10-009 - 2.1\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 07 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 08 - Lesson 4: Security telemetry",
                "content": "Interpret unexpected next-hop changes and asymmetric paths. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Trace a packet through gateways and routing decisions. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Interpret unexpected next-hop changes and asymmetric paths. Define all terms in your own words; identify source/destination, transport or se...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 08 - Lesson 4: Security telemetry.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Document a route anomaly hypothesis. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M08-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Trace a packet through gateways and routing decisions. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 08 - Lesson 4: Security telemetry from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 08: Routers, Routing Tables and Traffic Paths Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "objective": "Analyze router routing table lookup order (longest prefix match), configure static default routes, and trace traffic across multi-hop router paths.",
        "toolsRequired": [
          "Packet Tracer",
          "Wireshark"
        ],
        "pcapSource": {
          "fileName": "m08-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m08-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b808"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Packet Tracer & Wireshark within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 08 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t08-1",
            "description": "Initialize lab topology and verify layer connectivity using Packet Tracer & Wireshark."
          },
          {
            "id": "t08-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 08."
          },
          {
            "id": "t08-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t08-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t08-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 08 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 08.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m08",
        "questions": []
      }
    },
    {
      "id": "e0000000-0009-4000-8000-000000000000",
      "title": "Module 09: Dynamic Routing, OSPF and BGP Security Concepts",
      "description": "Advanced level (6\u20138 hours). Prerequisite: Module 08 (recommended); prior prerequisite knowledge may be demonstrated. Recognize route advertisement, adjacency, route leak and hijack symptoms without executing attacks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 9,
      "lessons": [
        {
          "id": "e0000000-0009-4000-8000-000000000001",
          "slug": "m09-l1-route-advertisement",
          "title": "Module 09 - Lesson 1: Route advertisement",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Dynamic Routing | Day 24 | CCNA 200-301 Complete Course\". Technical focus on m09-l1-route-advertisement: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "xSTgb8JLkvs",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 45,
          "order": 1,
          "moduleTitle": "Module 09: Dynamic Routing, OSPF and BGP Security Concepts",
          "objectives": [
            "Explain the role of **Route advertisement** in ordinary network behavior.",
            "Demonstrate **OSPF mechanics** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Routing integrity** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC observables**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-09",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 09 - Lesson 1: Route advertisement",
            "Network Security Engineering (Mod 09)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 09 - Lesson 1: Route advertisement), follow along with Practical Networking (\"Router Hierarchies and Route Summarization - Networking Fundamentals - Lesson 5 - Part 3\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 08 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 09 - Lesson 1: Route advertisement",
                "content": "Differentiate static routing, IGP and BGP. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Recognize route advertisement, adjacency, route leak and hijack symptoms without executing attacks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Differentiate static routing, IGP and BGP. Define all terms in your own words; identify source/destination, transport or service details whe...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 09 - Lesson 1: Route advertisement.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draw an internal-vs-external routing diagram. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M09-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Recognize route advertisement, adjacency, route leak and hijack symptoms without executing attacks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 09 - Lesson 1: Route advertisement from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "IETF RFC Editor",
                "url": "https://www.rfc-editor.org/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0009-4000-8000-000000000002",
          "slug": "m09-l2-ospf-mechanics",
          "title": "Module 09 - Lesson 2: OSPF mechanics",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | OSPF Part 1 | Day 26 | CCNA 200-301 Complete Course\". Technical focus on Open Shortest Path First (OSPF) architecture, Link State Advertisements (LSAs), Dijkstra SPF algorithm computation, area hierarchies (Backbone Area 0), and link metrics.",
          "youtubeVideoId": "pvuaoJ9YzoI",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 40,
          "order": 2,
          "moduleTitle": "Module 09: Dynamic Routing, OSPF and BGP Security Concepts",
          "objectives": [
            "Explain the role of **Route advertisement** in ordinary network behavior.",
            "Demonstrate **OSPF mechanics** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Routing integrity** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC observables**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-09",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 09 - Lesson 2: OSPF mechanics",
            "Network Security Engineering (Mod 09)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 09 - Lesson 2: OSPF mechanics), follow along with Jeremy's IT Lab (\"Free CCNA | OSPF Part 1 | Day 26 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 08 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 09 - Lesson 2: OSPF mechanics",
                "content": "Recognize areas, neighbors, LSAs and metrics. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Recognize route advertisement, adjacency, route leak and hijack symptoms without executing attacks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Recognize areas, neighbors, LSAs and metrics. Define all terms in your own words; identify source/destination, transport or service details ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 09 - Lesson 2: OSPF mechanics.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "View OSPF adjacency in Packet Tracer. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M09-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Recognize route advertisement, adjacency, route leak and hijack symptoms without executing attacks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 09 - Lesson 2: OSPF mechanics from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "IETF RFC Editor",
                "url": "https://www.rfc-editor.org/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0009-4000-8000-000000000003",
          "slug": "m09-l3-routing-integrity",
          "title": "Module 09 - Lesson 3: Routing integrity",
          "description": "Video instruction presented by Computerphile: \"BGP: Border Gateway Protocol - Computerphile\". Technical focus on m09-l3-routing-integrity: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "O6tCoD5c_U0",
          "videoAttribution": {
            "creator": "Computerphile",
            "platform": "youtube"
          },
          "durationMinutes": 16,
          "order": 3,
          "moduleTitle": "Module 09: Dynamic Routing, OSPF and BGP Security Concepts",
          "objectives": [
            "Explain the role of **Route advertisement** in ordinary network behavior.",
            "Demonstrate **OSPF mechanics** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Routing integrity** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC observables**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-09",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 09 - Lesson 3: Routing integrity",
            "Network Security Engineering (Mod 09)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 09 - Lesson 3: Routing integrity), follow along with Professor Messer (\"Dynamic Routing - CompTIA Network+ N10-009 - 2.1\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 08 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 09 - Lesson 3: Routing integrity",
                "content": "Explain authentication, filtering and route origin validation at a high level. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Recognize route advertisement, adjacency, route leak and hijack symptoms without executing attacks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain authentication, filtering and route origin validation at a high level. Define all terms in your own words; identify source/destinati...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 09 - Lesson 3: Routing integrity.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Write a BGP/OSPF risk checklist. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M09-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Recognize route advertisement, adjacency, route leak and hijack symptoms without executing attacks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 09 - Lesson 3: Routing integrity from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "IETF RFC Editor",
                "url": "https://www.rfc-editor.org/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0009-4000-8000-000000000004",
          "slug": "m09-l4-soc-observables",
          "title": "Module 09 - Lesson 4: SOC observables",
          "description": "Video instruction presented by DKNOG: \"BGP Security - Hijack and Route Leak Detection\". Technical focus on monitoring BGP routing anomalies, identifying unauthorized prefix hijackings, detecting AS-path manipulations, evaluating route leaks, and operationalizing RPKI Route Origin Authorization (ROA) alerts within a SOC.",
          "youtubeVideoId": "4wG8LcPzvss",
          "videoAttribution": {
            "creator": "DKNOG",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 4,
          "moduleTitle": "Module 09: Dynamic Routing, OSPF and BGP Security Concepts",
          "objectives": [
            "Explain the role of **Route advertisement** in ordinary network behavior.",
            "Demonstrate **OSPF mechanics** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Routing integrity** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC observables**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-09",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 09 - Lesson 4: SOC observables",
            "Network Security Engineering (Mod 09)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 09 - Lesson 4: SOC observables), follow along with Network Direction (\"Routing Protocols and Traffic Forwarding | Network Fundamentals Part 19\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 08 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 09 - Lesson 4: SOC observables",
                "content": "Identify unexpected route changes or loss of reachability. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Recognize route advertisement, adjacency, route leak and hijack symptoms without executing attacks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Identify unexpected route changes or loss of reachability. Define all terms in your own words; identify source/destination, transport or ser...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 09 - Lesson 4: SOC observables.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Correlate a mock route-change log with traffic outage. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M09-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Recognize route advertisement, adjacency, route leak and hijack symptoms without executing attacks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 09 - Lesson 4: SOC observables from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "IETF RFC Editor",
                "url": "https://www.rfc-editor.org/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 09: Dynamic Routing, OSPF and BGP Security Concepts Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "objective": "Configure single-area OSPFv2, verify neighbor adjacencies (Full/DR/BDR), and analyze route authentication and BGP route-hijacking threat models.",
        "toolsRequired": [
          "Packet Tracer"
        ],
        "pcapSource": {
          "fileName": "m09-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m09-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b809"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Packet Tracer within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 09 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t09-1",
            "description": "Initialize lab topology and verify layer connectivity using Packet Tracer."
          },
          {
            "id": "t09-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 09."
          },
          {
            "id": "t09-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t09-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t09-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 09 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 09.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m09",
        "questions": []
      }
    },
    {
      "id": "e0000000-000a-4000-8000-000000000000",
      "title": "Module 10: TCP Connections, Flags and Sessions",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 09 (recommended); prior prerequisite knowledge may be demonstrated. Analyze the TCP state machine and normal handshake evidence. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 10,
      "lessons": [
        {
          "id": "e0000000-000a-4000-8000-000000000001",
          "slug": "m10-l1-tcp-handshake",
          "title": "Module 10 - Lesson 1: TCP handshake",
          "description": "Video instruction presented by David Bombal: \"How TCP really works // Three-way handshake // TCP/IP Deep Dive\". Technical focus on m10-l1-tcp-handshake: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "rmFX1V49K8U",
          "videoAttribution": {
            "creator": "David Bombal",
            "platform": "youtube"
          },
          "durationMinutes": 61,
          "order": 1,
          "moduleTitle": "Module 10: TCP Connections, Flags and Sessions",
          "objectives": [
            "Explain the role of **TCP handshake** in ordinary network behavior.",
            "Demonstrate **TCP flags** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Reliability** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Detection implications**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-10",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 10 - Lesson 1: TCP handshake",
            "Network Security Engineering (Mod 10)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 10 - Lesson 1: TCP handshake), follow along with David Bombal (\"How TCP really works // Three-way handshake // TCP/IP Deep Dive\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 09 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 10 - Lesson 1: TCP handshake",
                "content": "Explain SYN, SYN-ACK, ACK and sequence initialization. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Analyze the TCP state machine and normal handshake evidence. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain SYN, SYN-ACK, ACK and sequence initialization. Define all terms in your own words; identify source/destination, transport or service...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 10 - Lesson 1: TCP handshake.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Mark the handshake in a safe PCAP. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M10-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Analyze the TCP state machine and normal handshake evidence. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 10 - Lesson 1: TCP handshake from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-000a-4000-8000-000000000002",
          "slug": "m10-l2-tcp-flags",
          "title": "Module 10 - Lesson 2: TCP flags",
          "description": "Video instruction presented by Ben Eater: \"TCP: Transmission control protocol | Networking tutorial (12 of 13)\". Technical focus on m10-l2-tcp-flags: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "4IMc3CaMhyY",
          "videoAttribution": {
            "creator": "Ben Eater",
            "platform": "youtube"
          },
          "durationMinutes": 8,
          "order": 2,
          "moduleTitle": "Module 10: TCP Connections, Flags and Sessions",
          "objectives": [
            "Explain the role of **TCP handshake** in ordinary network behavior.",
            "Demonstrate **TCP flags** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Reliability** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Detection implications**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-10",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 10 - Lesson 2: TCP flags",
            "Network Security Engineering (Mod 10)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 10 - Lesson 2: TCP flags), follow along with Packet Pulse - IT (\"TCP - Three-way Handshake in detail - Full Wireshark Breakdown!.\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 09 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 10 - Lesson 2: TCP flags",
                "content": "Differentiate FIN, RST, PSH and ACK in context. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Analyze the TCP state machine and normal handshake evidence. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Differentiate FIN, RST, PSH and ACK in context. Define all terms in your own words; identify source/destination, transport or service detail...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 10 - Lesson 2: TCP flags.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Identify normal close vs reset examples. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M10-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Analyze the TCP state machine and normal handshake evidence. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 10 - Lesson 2: TCP flags from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-000a-4000-8000-000000000003",
          "slug": "m10-l3-reliability",
          "title": "Module 10 - Lesson 3: Reliability",
          "description": "Video instruction presented by Practical Networking: \"TCP - 12 simple ideas to explain the Transmission Control Protocol\". Technical focus on m10-l3-reliability: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "JFch3ctY6nE",
          "videoAttribution": {
            "creator": "Practical Networking",
            "platform": "youtube"
          },
          "durationMinutes": 44,
          "order": 3,
          "moduleTitle": "Module 10: TCP Connections, Flags and Sessions",
          "objectives": [
            "Explain the role of **TCP handshake** in ordinary network behavior.",
            "Demonstrate **TCP flags** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Reliability** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Detection implications**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-10",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 10 - Lesson 3: Reliability",
            "Network Security Engineering (Mod 10)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 10 - Lesson 3: Reliability), follow along with Network Direction (\"Establishing Connections With TCP's Three Way Handshake | Network Fundamentals Part 8\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 09 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 10 - Lesson 3: Reliability",
                "content": "Describe sequence, acknowledgment and windows. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Analyze the TCP state machine and normal handshake evidence. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Describe sequence, acknowledgment and windows. Define all terms in your own words; identify source/destination, transport or service details...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 10 - Lesson 3: Reliability.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Follow a single TCP stream in Wireshark. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M10-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Analyze the TCP state machine and normal handshake evidence. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 10 - Lesson 3: Reliability from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-000a-4000-8000-000000000004",
          "slug": "m10-l4-detection-implications",
          "title": "Module 10 - Lesson 4: Detection implications",
          "description": "Video instruction presented by Bikash's Tech: \"DAY 9 Wireshark : Why your TCP connections are failing: FIN vs RST\". Technical focus on TCP anomaly detection in Wireshark, dissecting abrupt RST connection resets versus graceful FIN handshakes, identifying port scanning probes, and analyzing malicious connection teardown patterns.",
          "youtubeVideoId": "0U1UISW_spY",
          "videoAttribution": {
            "creator": "Bikash's Tech",
            "platform": "youtube"
          },
          "durationMinutes": 10,
          "order": 4,
          "moduleTitle": "Module 10: TCP Connections, Flags and Sessions",
          "objectives": [
            "Explain the role of **TCP handshake** in ordinary network behavior.",
            "Demonstrate **TCP flags** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Reliability** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Detection implications**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-10",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 10 - Lesson 4: Detection implications",
            "Network Security Engineering (Mod 10)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 10 - Lesson 4: Detection implications), follow along with Jeremy's IT Lab (\"Free CCNA | Wireshark Demo (TCP/UDP) | Day 30 Lab | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 09 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 10 - Lesson 4: Detection implications",
                "content": "Recognize why SYN bursts and resets can be ambiguous. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Analyze the TCP state machine and normal handshake evidence. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Recognize why SYN bursts and resets can be ambiguous. Define all terms in your own words; identify source/destination, transport or service ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 10 - Lesson 4: Detection implications.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draft a baseline-aware SYN alert triage checklist. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M10-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Analyze the TCP state machine and normal handshake evidence. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 10 - Lesson 4: Detection implications from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 10: TCP Connections, Flags and Sessions Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "objective": "Capture and dissect TCP 3-way handshakes (SYN, SYN-ACK, ACK), analyze relative vs absolute sequence numbers, and examine graceful teardowns (FIN/ACK) and abrupt resets (RST).",
        "toolsRequired": [
          "Wireshark"
        ],
        "pcapSource": {
          "fileName": "m10-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m10-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b810"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Wireshark within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 10 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t10-1",
            "description": "Initialize lab topology and verify layer connectivity using Wireshark."
          },
          {
            "id": "t10-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 10."
          },
          {
            "id": "t10-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t10-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t10-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 10 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 10.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m10",
        "questions": []
      }
    },
    {
      "id": "e0000000-000b-4000-8000-000000000000",
      "title": "Module 11: UDP, Ports, Sockets and Common Services",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 10 (recommended); prior prerequisite knowledge may be demonstrated. Correlate ports, processes and network protocols with security events. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 11,
      "lessons": [
        {
          "id": "e0000000-000b-4000-8000-000000000001",
          "slug": "m11-l1-tcp-versus-udp",
          "title": "Module 11 - Lesson 1: TCP versus UDP",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | TCP & UDP | Day 30 | CCNA 200-301 Complete Course\". Technical focus on m11-l1-tcp-versus-udp: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "LIEACBqlntY",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 34,
          "order": 1,
          "moduleTitle": "Module 11: UDP, Ports, Sockets and Common Services",
          "objectives": [
            "Explain the role of **TCP versus UDP** in ordinary network behavior.",
            "Demonstrate **Port ranges** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Sockets and services** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Suspicious services**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-11",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 11 - Lesson 1: TCP versus UDP",
            "Network Security Engineering (Mod 11)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 11 - Lesson 1: TCP versus UDP), follow along with Jeremy's IT Lab (\"Free CCNA | TCP & UDP | Day 30 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 10 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 11 - Lesson 1: TCP versus UDP",
                "content": "Compare connection state, timing and protocol examples. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Correlate ports, processes and network protocols with security events. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Compare connection state, timing and protocol examples. Define all terms in your own words; identify source/destination, transport or servic...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 11 - Lesson 1: TCP versus UDP.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Capture UDP DNS traffic and contrast TCP browsing. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M11-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Correlate ports, processes and network protocols with security events. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 11 - Lesson 1: TCP versus UDP from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "IANA \u2014 service name and port number registry",
                "url": "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-000b-4000-8000-000000000002",
          "slug": "m11-l2-port-ranges",
          "title": "Module 11 - Lesson 2: Port ranges",
          "description": "Video instruction presented by Professor Messer: \"Common Ports - CompTIA Network+ N10-009 - 1.4\". Technical focus on m11-l2-port-ranges: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "jX1pobYmZdE",
          "videoAttribution": {
            "creator": "Professor Messer",
            "platform": "youtube"
          },
          "durationMinutes": 20,
          "order": 2,
          "moduleTitle": "Module 11: UDP, Ports, Sockets and Common Services",
          "objectives": [
            "Explain the role of **TCP versus UDP** in ordinary network behavior.",
            "Demonstrate **Port ranges** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Sockets and services** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Suspicious services**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-11",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 11 - Lesson 2: Port ranges",
            "Network Security Engineering (Mod 11)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 11 - Lesson 2: Port ranges), follow along with Professor Messer (\"Common Ports - CompTIA Network+ N10-009 - 1.4\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 10 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 11 - Lesson 2: Port ranges",
                "content": "Explain well-known, registered and ephemeral ports. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Correlate ports, processes and network protocols with security events. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain well-known, registered and ephemeral ports. Define all terms in your own words; identify source/destination, transport or service de...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 11 - Lesson 2: Port ranges.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Annotate client and server port roles. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M11-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Correlate ports, processes and network protocols with security events. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 11 - Lesson 2: Port ranges from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "IANA \u2014 service name and port number registry",
                "url": "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-000b-4000-8000-000000000003",
          "slug": "m11-l3-sockets-and-services",
          "title": "Module 11 - Lesson 3: Sockets and services",
          "description": "Video instruction presented by Steven Gordon: \"Linux Networking: netstat, services, protocols (4 of 6)\". Technical focus on network socket architecture, IP-port endpoint binding, inspecting active listening services with netstat and ss, and tracking socket connection state transitions from LISTEN to TIME_WAIT.",
          "youtubeVideoId": "9ird7Zcw1ZY",
          "videoAttribution": {
            "creator": "Steven Gordon",
            "platform": "youtube"
          },
          "durationMinutes": 12,
          "order": 3,
          "moduleTitle": "Module 11: UDP, Ports, Sockets and Common Services",
          "objectives": [
            "Explain the role of **TCP versus UDP** in ordinary network behavior.",
            "Demonstrate **Port ranges** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Sockets and services** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Suspicious services**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-11",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 11 - Lesson 3: Sockets and services",
            "Network Security Engineering (Mod 11)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 11 - Lesson 3: Sockets and services), follow along with Network Direction (\"How TCP and UDP Work | Network Fundamentals Part 7\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 10 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 11 - Lesson 3: Sockets and services",
                "content": "Connect a listening port to a process on an owned endpoint. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Correlate ports, processes and network protocols with security events. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Connect a listening port to a process on an owned endpoint. Define all terms in your own words; identify source/destination, transport or se...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 11 - Lesson 3: Sockets and services.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Use ss -tulpen or Get-NetTCPConnection. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M11-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Correlate ports, processes and network protocols with security events. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 11 - Lesson 3: Sockets and services from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "IANA \u2014 service name and port number registry",
                "url": "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-000b-4000-8000-000000000004",
          "slug": "m11-l4-suspicious-services",
          "title": "Module 11 - Lesson 4: Suspicious services",
          "description": "Video instruction presented by Cyber Pathshala: \"Find Open Ports Like a Hacker | Port Types, Services & Nmap Practical - 2026\". Technical focus on m11-l4-suspicious-services: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "AQS0grHh1r0",
          "videoAttribution": {
            "creator": "Cyber Pathshala",
            "platform": "youtube"
          },
          "durationMinutes": 23,
          "order": 4,
          "moduleTitle": "Module 11: UDP, Ports, Sockets and Common Services",
          "objectives": [
            "Explain the role of **TCP versus UDP** in ordinary network behavior.",
            "Demonstrate **Port ranges** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Sockets and services** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Suspicious services**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-11",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 11 - Lesson 4: Suspicious services",
            "Network Security Engineering (Mod 11)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 11 - Lesson 4: Suspicious services), follow along with David Bombal (\"Never use TFTP or FTP!\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 10 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 11 - Lesson 4: Suspicious services",
                "content": "Assess unexpected listening ports with owner, process and baseline. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Correlate ports, processes and network protocols with security events. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Assess unexpected listening ports with owner, process and baseline. Define all terms in your own words; identify source/destination, transpo...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 11 - Lesson 4: Suspicious services.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Document a service validation workflow. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M11-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Correlate ports, processes and network protocols with security events. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 11 - Lesson 4: Suspicious services from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "IANA \u2014 service name and port number registry",
                "url": "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 11: UDP, Ports, Sockets and Common Services Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "objective": "Compare connectionless UDP transmission with TCP. Inspect ephemeral vs well-known port bindings and audit listening sockets using netstat and ss.",
        "toolsRequired": [
          "Wireshark",
          "ss/netstat"
        ],
        "pcapSource": {
          "fileName": "m11-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m11-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b811"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Wireshark & ss/netstat within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 11 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t11-1",
            "description": "Initialize lab topology and verify layer connectivity using Wireshark & ss/netstat."
          },
          {
            "id": "t11-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 11."
          },
          {
            "id": "t11-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t11-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t11-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 11 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 11.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m11",
        "questions": []
      }
    },
    {
      "id": "e0000000-000c-4000-8000-000000000000",
      "title": "Module 12: DNS Resolution and DNS Security",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 11 (recommended); prior prerequisite knowledge may be demonstrated. Interpret DNS queries, answers, caching and defensive DNS signals. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 12,
      "lessons": [
        {
          "id": "e0000000-000c-4000-8000-000000000001",
          "slug": "m12-l1-resolver-workflow",
          "title": "Module 12 - Lesson 1: Resolver workflow",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | DNS | Day 38 | CCNA 200-301 Complete Course\". Technical focus on m12-l1-resolver-workflow: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "4C6eeQes4cs",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 1,
          "moduleTitle": "Module 12: DNS Resolution and DNS Security",
          "objectives": [
            "Explain the role of **Resolver workflow** in ordinary network behavior.",
            "Demonstrate **DNS records** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **DNS traffic** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security cases**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-12",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 12 - Lesson 1: Resolver workflow",
            "Network Security Engineering (Mod 12)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 12 - Lesson 1: Resolver workflow), follow along with Jeremy's IT Lab (\"Free CCNA | DNS | Day 38 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 11 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 12 - Lesson 1: Resolver workflow",
                "content": "Explain stub resolver, recursive resolver, authoritative servers. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret DNS queries, answers, caching and defensive DNS signals. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain stub resolver, recursive resolver, authoritative servers. Define all terms in your own words; identify source/destination, transport...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 12 - Lesson 1: Resolver workflow.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draw the complete DNS resolution path. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M12-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret DNS queries, answers, caching and defensive DNS signals. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 12 - Lesson 1: Resolver workflow from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-000c-4000-8000-000000000002",
          "slug": "m12-l2-dns-records",
          "title": "Module 12 - Lesson 2: DNS records",
          "description": "Video instruction presented by Professor Messer: \"DNS Records - CompTIA Network+ N10-009 - 3.4\". Technical focus on m12-l2-dns-records: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "qAyVND44jaE",
          "videoAttribution": {
            "creator": "Professor Messer",
            "platform": "youtube"
          },
          "durationMinutes": 9,
          "order": 2,
          "moduleTitle": "Module 12: DNS Resolution and DNS Security",
          "objectives": [
            "Explain the role of **Resolver workflow** in ordinary network behavior.",
            "Demonstrate **DNS records** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **DNS traffic** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security cases**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-12",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 12 - Lesson 2: DNS records",
            "Network Security Engineering (Mod 12)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 12 - Lesson 2: DNS records), follow along with Professor Messer (\"DNS Records - CompTIA Network+ N10-009 - 3.4\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 11 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 12 - Lesson 2: DNS records",
                "content": "Interpret A, AAAA, CNAME, MX, TXT, NS and TTL. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret DNS queries, answers, caching and defensive DNS signals. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Interpret A, AAAA, CNAME, MX, TXT, NS and TTL. Define all terms in your own words; identify source/destination, transport or service details...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 12 - Lesson 2: DNS records.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Run dig/nslookup against a domain you control or public examples. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M12-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret DNS queries, answers, caching and defensive DNS signals. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 12 - Lesson 2: DNS records from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-000c-4000-8000-000000000003",
          "slug": "m12-l3-dns-traffic",
          "title": "Module 12 - Lesson 3: DNS traffic",
          "description": "Video instruction presented by Chris Greer: \"Your First DNS Lookup\u2014Captured and Explained\". Technical focus on m12-l3-dns-traffic: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "fRRR0sU0BnY",
          "videoAttribution": {
            "creator": "Chris Greer",
            "platform": "youtube"
          },
          "durationMinutes": 9,
          "order": 3,
          "moduleTitle": "Module 12: DNS Resolution and DNS Security",
          "objectives": [
            "Explain the role of **Resolver workflow** in ordinary network behavior.",
            "Demonstrate **DNS records** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **DNS traffic** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security cases**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-12",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 12 - Lesson 3: DNS traffic",
            "Network Security Engineering (Mod 12)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 12 - Lesson 3: DNS traffic), follow along with Chris Greer (\"Your First DNS Lookup Captured and Explained\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 11 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 12 - Lesson 3: DNS traffic",
                "content": "Inspect query IDs, flags, response codes and caching. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret DNS queries, answers, caching and defensive DNS signals. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Inspect query IDs, flags, response codes and caching. Define all terms in your own words; identify source/destination, transport or service ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 12 - Lesson 3: DNS traffic.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Analyze a sample DNS PCAP using Wireshark. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M12-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret DNS queries, answers, caching and defensive DNS signals. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 12 - Lesson 3: DNS traffic from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-000c-4000-8000-000000000004",
          "slug": "m12-l4-security-cases",
          "title": "Module 12 - Lesson 4: Security cases",
          "description": "Video instruction presented by Professor Messer: \"ARP and DNS Poisoning - CompTIA Network+ N10-009 - 4.2\". Technical focus on m12-l4-security-cases: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "2QijB5GtNE4",
          "videoAttribution": {
            "creator": "Professor Messer",
            "platform": "youtube"
          },
          "durationMinutes": 7,
          "order": 4,
          "moduleTitle": "Module 12: DNS Resolution and DNS Security",
          "objectives": [
            "Explain the role of **Resolver workflow** in ordinary network behavior.",
            "Demonstrate **DNS records** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **DNS traffic** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Security cases**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-12",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 12 - Lesson 4: Security cases",
            "Network Security Engineering (Mod 12)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 12 - Lesson 4: Security cases), follow along with Professor Messer (\"ARP and DNS Poisoning - CompTIA Network+ N10-009 - 4.2\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 11 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 12 - Lesson 4: Security cases",
                "content": "Differentiate typosquatting, tunneling indicators and benign lookups. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret DNS queries, answers, caching and defensive DNS signals. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Differentiate typosquatting, tunneling indicators and benign lookups. Define all terms in your own words; identify source/destination, trans...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 12 - Lesson 4: Security cases.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Create a domain-investigation evidence template. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M12-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret DNS queries, answers, caching and defensive DNS signals. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 12 - Lesson 4: Security cases from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 12: DNS Resolution and DNS Security Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "objective": "Capture iterative vs recursive DNS queries, dissect DNS header fields (QR, Opcode, RCODE, Questions, Answers), and audit DNS spoofing and cache poisoning risks.",
        "toolsRequired": [
          "Wireshark",
          "dig/nslookup"
        ],
        "pcapSource": {
          "fileName": "m12-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m12-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b812"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Wireshark & dig/nslookup within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 12 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t12-1",
            "description": "Initialize lab topology and verify layer connectivity using Wireshark & dig/nslookup."
          },
          {
            "id": "t12-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 12."
          },
          {
            "id": "t12-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t12-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t12-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 12 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 12.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m12",
        "questions": []
      }
    },
    {
      "id": "e0000000-000d-4000-8000-000000000000",
      "title": "Module 13: DHCP, NTP and Network Configuration",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 12 (recommended); prior prerequisite knowledge may be demonstrated. Understand network configuration provisioning and time synchronization as security dependencies. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 13,
      "lessons": [
        {
          "id": "e0000000-000d-4000-8000-000000000001",
          "slug": "m13-l1-dhcp-dora",
          "title": "Module 13 - Lesson 1: DHCP DORA",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | DHCP | Day 39 | CCNA 200-301 Complete Course\". Technical focus on m13-l1-dhcp-dora: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "hzkleGAC2_Y",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 37,
          "order": 1,
          "moduleTitle": "Module 13: DHCP, NTP and Network Configuration",
          "objectives": [
            "Explain the role of **DHCP DORA** in ordinary network behavior.",
            "Demonstrate **DHCP leases** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Rogue configuration indicators** as operational or security evidence.",
            "Produce a defensible analyst write-up about **NTP and timestamp integrity**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-13",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 13 - Lesson 1: DHCP DORA",
            "Network Security Engineering (Mod 13)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 13 - Lesson 1: DHCP DORA), follow along with Jeremy's IT Lab (\"Free CCNA | DHCP | Day 39 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 12 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 13 - Lesson 1: DHCP DORA",
                "content": "Explain Discover, Offer, Request and Acknowledge. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Understand network configuration provisioning and time synchronization as security dependencies. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain Discover, Offer, Request and Acknowledge. Define all terms in your own words; identify source/destination, transport or service deta...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 13 - Lesson 1: DHCP DORA.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Identify the DORA sequence in a practice capture. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M13-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Understand network configuration provisioning and time synchronization as security dependencies. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 13 - Lesson 1: DHCP DORA from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              }
            ]
          }
        },
        {
          "id": "e0000000-000d-4000-8000-000000000002",
          "slug": "m13-l2-dhcp-leases",
          "title": "Module 13 - Lesson 2: DHCP leases",
          "description": "Video instruction presented by Professor Messer: \"DHCP - CompTIA Network+ N10-009 - 3.4\". Technical focus on m13-l2-dhcp-leases: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "b7fiXM3vO18",
          "videoAttribution": {
            "creator": "Professor Messer",
            "platform": "youtube"
          },
          "durationMinutes": 9,
          "order": 2,
          "moduleTitle": "Module 13: DHCP, NTP and Network Configuration",
          "objectives": [
            "Explain the role of **DHCP DORA** in ordinary network behavior.",
            "Demonstrate **DHCP leases** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Rogue configuration indicators** as operational or security evidence.",
            "Produce a defensible analyst write-up about **NTP and timestamp integrity**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-13",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 13 - Lesson 2: DHCP leases",
            "Network Security Engineering (Mod 13)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 13 - Lesson 2: DHCP leases), follow along with Professor Messer (\"DHCP - CompTIA Network+ N10-009 - 3.4\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 12 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 13 - Lesson 2: DHCP leases",
                "content": "Understand lease scope, options, renewals and relay. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Understand network configuration provisioning and time synchronization as security dependencies. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Understand lease scope, options, renewals and relay. Define all terms in your own words; identify source/destination, transport or service d...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 13 - Lesson 2: DHCP leases.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Inspect a controlled host lease and gateway settings. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M13-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Understand network configuration provisioning and time synchronization as security dependencies. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 13 - Lesson 2: DHCP leases from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              }
            ]
          }
        },
        {
          "id": "e0000000-000d-4000-8000-000000000003",
          "slug": "m13-l3-rogue-configuration-indicators",
          "title": "Module 13 - Lesson 3: Rogue configuration indicators",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | DHCP Snooping | Day 50 | CCNA 200-301 Complete Course\". Technical focus on m13-l3-rogue-configuration-indicators: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "qYYeg2kz1yE",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 28,
          "order": 3,
          "moduleTitle": "Module 13: DHCP, NTP and Network Configuration",
          "objectives": [
            "Explain the role of **DHCP DORA** in ordinary network behavior.",
            "Demonstrate **DHCP leases** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Rogue configuration indicators** as operational or security evidence.",
            "Produce a defensible analyst write-up about **NTP and timestamp integrity**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-13",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 13 - Lesson 3: Rogue configuration indicators",
            "Network Security Engineering (Mod 13)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 13 - Lesson 3: Rogue configuration indicators), follow along with Professor Messer (\"Rogue Services - CompTIA Network+ N10-009 - 4.2\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 12 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 13 - Lesson 3: Rogue configuration indicators",
                "content": "Explain signs of rogue DHCP and inconsistent DNS gateway data. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Understand network configuration provisioning and time synchronization as security dependencies. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain signs of rogue DHCP and inconsistent DNS gateway data. Define all terms in your own words; identify source/destination, transport or...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 13 - Lesson 3: Rogue configuration indicators.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Compare two mock DHCP server offers. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M13-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Understand network configuration provisioning and time synchronization as security dependencies. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 13 - Lesson 3: Rogue configuration indicators from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              }
            ]
          }
        },
        {
          "id": "e0000000-000d-4000-8000-000000000004",
          "slug": "m13-l4-ntp-and-timestamp-integrity",
          "title": "Module 13 - Lesson 4: NTP and timestamp integrity",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | NTP | Day 37 | CCNA 200-301 Complete Course\". Technical focus on m13-l4-ntp-and-timestamp-integrity: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "qGJaJx7OfUo",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 43,
          "order": 4,
          "moduleTitle": "Module 13: DHCP, NTP and Network Configuration",
          "objectives": [
            "Explain the role of **DHCP DORA** in ordinary network behavior.",
            "Demonstrate **DHCP leases** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Rogue configuration indicators** as operational or security evidence.",
            "Produce a defensible analyst write-up about **NTP and timestamp integrity**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-13",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 13 - Lesson 4: NTP and timestamp integrity",
            "Network Security Engineering (Mod 13)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 13 - Lesson 4: NTP and timestamp integrity), follow along with Jeremy's IT Lab (\"Free CCNA | NTP | Day 37 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 12 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 13 - Lesson 4: NTP and timestamp integrity",
                "content": "Understand why consistent UTC timestamps matter to investigations. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Understand network configuration provisioning and time synchronization as security dependencies. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Understand why consistent UTC timestamps matter to investigations. Define all terms in your own words; identify source/destination, transpor...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 13 - Lesson 4: NTP and timestamp integrity.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Correlate two log samples with clock skew. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M13-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Understand network configuration provisioning and time synchronization as security dependencies. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 13 - Lesson 4: NTP and timestamp integrity from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 13: DHCP, NTP and Network Configuration Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "objective": "Capture DHCP DORA 4-step sequence (Discover, Offer, Request, Ack) on UDP 67/68. Configure DHCP Snooping and verify NTP time synchronization across network nodes.",
        "toolsRequired": [
          "Wireshark",
          "Packet Tracer"
        ],
        "pcapSource": {
          "fileName": "m13-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m13-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b813"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Wireshark & Packet Tracer within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 13 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t13-1",
            "description": "Initialize lab topology and verify layer connectivity using Wireshark & Packet Tracer."
          },
          {
            "id": "t13-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 13."
          },
          {
            "id": "t13-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t13-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t13-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 13 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 13.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m13",
        "questions": []
      }
    },
    {
      "id": "e0000000-000e-4000-8000-000000000000",
      "title": "Module 14: HTTP/HTTPS, Web Requests and Proxies",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 13 (recommended); prior prerequisite knowledge may be demonstrated. Read requests, headers, status codes and proxy metadata relevant to web security. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 14,
      "lessons": [
        {
          "id": "e0000000-000e-4000-8000-000000000001",
          "slug": "m14-l1-http-conversation",
          "title": "Module 14 - Lesson 1: HTTP conversation",
          "description": "Video instruction presented by Hussein Nasser: \"What are web servers and how do they work (with examples httpd and nodejs)\". Technical focus on m14-l1-http-conversation: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "JhpUch6lWMw",
          "videoAttribution": {
            "creator": "Hussein Nasser",
            "platform": "youtube"
          },
          "durationMinutes": 37,
          "order": 1,
          "moduleTitle": "Module 14: HTTP/HTTPS, Web Requests and Proxies",
          "objectives": [
            "Explain the role of **HTTP conversation** in ordinary network behavior.",
            "Demonstrate **Sessions and cookies** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **HTTPS visibility** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Proxy interpretation**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-14",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 14 - Lesson 1: HTTP conversation",
            "Network Security Engineering (Mod 14)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 14 - Lesson 1: HTTP conversation), follow along with David Bombal (\"Why are you still using HTTP?\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 13 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 14 - Lesson 1: HTTP conversation",
                "content": "Explain request line, methods, headers and response codes. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Read requests, headers, status codes and proxy metadata relevant to web security. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain request line, methods, headers and response codes. Define all terms in your own words; identify source/destination, transport or ser...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 14 - Lesson 1: HTTP conversation.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Use browser developer tools against a local test page. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M14-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Read requests, headers, status codes and proxy metadata relevant to web security. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 14 - Lesson 1: HTTP conversation from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "MDN \u2014 HTTP overview",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-000e-4000-8000-000000000002",
          "slug": "m14-l2-sessions-and-cookies",
          "title": "Module 14 - Lesson 2: Sessions and cookies",
          "description": "Video instruction presented by Hussein Nasser: \"HTTP Cookies Crash Course\". Technical focus on m14-l2-sessions-and-cookies: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "sovAIX4doOE",
          "videoAttribution": {
            "creator": "Hussein Nasser",
            "platform": "youtube"
          },
          "durationMinutes": 69,
          "order": 2,
          "moduleTitle": "Module 14: HTTP/HTTPS, Web Requests and Proxies",
          "objectives": [
            "Explain the role of **HTTP conversation** in ordinary network behavior.",
            "Demonstrate **Sessions and cookies** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **HTTPS visibility** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Proxy interpretation**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-14",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 14 - Lesson 2: Sessions and cookies",
            "Network Security Engineering (Mod 14)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 14 - Lesson 2: Sessions and cookies), follow along with Practical Networking (\"Network Protocols - ARP, FTP, SMTP, HTTP, SSL, TLS, HTTPS, DNS, DHCP - Networking Fundamentals - L6\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 13 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 14 - Lesson 2: Sessions and cookies",
                "content": "Explain cookies, redirects and headers without handling real credentials. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Read requests, headers, status codes and proxy metadata relevant to web security. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain cookies, redirects and headers without handling real credentials. Define all terms in your own words; identify source/destination, t...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 14 - Lesson 2: Sessions and cookies.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Identify Set-Cookie and Location in sample output. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M14-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Read requests, headers, status codes and proxy metadata relevant to web security. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 14 - Lesson 2: Sessions and cookies from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "MDN \u2014 HTTP overview",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-000e-4000-8000-000000000003",
          "slug": "m14-l3-https-visibility",
          "title": "Module 14 - Lesson 3: HTTPS visibility",
          "description": "Video instruction presented by Hussein Nasser: \"Wiresharking TLS - What happens during TLS 1.2 and TLS 1.3 Handshake\". Technical focus on m14-l3-https-visibility: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "06Kq50P01sI",
          "videoAttribution": {
            "creator": "Hussein Nasser",
            "platform": "youtube"
          },
          "durationMinutes": 17,
          "order": 3,
          "moduleTitle": "Module 14: HTTP/HTTPS, Web Requests and Proxies",
          "objectives": [
            "Explain the role of **HTTP conversation** in ordinary network behavior.",
            "Demonstrate **Sessions and cookies** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **HTTPS visibility** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Proxy interpretation**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-14",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 14 - Lesson 3: HTTPS visibility",
            "Network Security Engineering (Mod 14)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 14 - Lesson 3: HTTPS visibility), follow along with Concepts & Tricks (\"Wireshark Tutorial: The Ultimate Beginner's Guide to Packet Analysis (Capture HTTP, DNS,TELNET, FTP)\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 13 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 14 - Lesson 3: HTTPS visibility",
                "content": "Differentiate plaintext HTTP metadata from TLS-encrypted content. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Read requests, headers, status codes and proxy metadata relevant to web security. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Differentiate plaintext HTTP metadata from TLS-encrypted content. Define all terms in your own words; identify source/destination, transport...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 14 - Lesson 3: HTTPS visibility.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Compare safe example HTTP and HTTPS captures. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M14-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Read requests, headers, status codes and proxy metadata relevant to web security. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 14 - Lesson 3: HTTPS visibility from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "MDN \u2014 HTTP overview",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-000e-4000-8000-000000000004",
          "slug": "m14-l4-proxy-interpretation",
          "title": "Module 14 - Lesson 4: Proxy interpretation",
          "description": "Video instruction presented by Hussein Nasser: \"Proxy vs Reverse Proxy Server Explained\". Technical focus on m14-l4-proxy-interpretation: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "SqqrOspasag",
          "videoAttribution": {
            "creator": "Hussein Nasser",
            "platform": "youtube"
          },
          "durationMinutes": 14,
          "order": 4,
          "moduleTitle": "Module 14: HTTP/HTTPS, Web Requests and Proxies",
          "objectives": [
            "Explain the role of **HTTP conversation** in ordinary network behavior.",
            "Demonstrate **Sessions and cookies** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **HTTPS visibility** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Proxy interpretation**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-14",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 14 - Lesson 4: Proxy interpretation",
            "Network Security Engineering (Mod 14)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 14 - Lesson 4: Proxy interpretation), follow along with Professor Messer (\"Security Technologies - CompTIA Network+ N10-009 - 4.1\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 13 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 14 - Lesson 4: Proxy interpretation",
                "content": "Explain forward/reverse proxies, X-Forwarded-For trust caveats. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Read requests, headers, status codes and proxy metadata relevant to web security. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain forward/reverse proxies, X-Forwarded-For trust caveats. Define all terms in your own words; identify source/destination, transport o...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 14 - Lesson 4: Proxy interpretation.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draw client-proxy-server logging paths. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M14-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Read requests, headers, status codes and proxy metadata relevant to web security. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 14 - Lesson 4: Proxy interpretation from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "MDN \u2014 HTTP overview",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 14: HTTP/HTTPS, Web Requests and Proxies Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "objective": "Inspect cleartext HTTP request methods, headers, and status codes. Contrast with encrypted HTTPS traffic and analyze forward/reverse proxy header modifications.",
        "toolsRequired": [
          "Wireshark",
          "Browser DevTools"
        ],
        "pcapSource": {
          "fileName": "m14-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m14-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b814"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Wireshark & Browser DevTools within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 14 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t14-1",
            "description": "Initialize lab topology and verify layer connectivity using Wireshark & Browser DevTools."
          },
          {
            "id": "t14-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 14."
          },
          {
            "id": "t14-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t14-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t14-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 14 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 14.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m14",
        "questions": []
      }
    },
    {
      "id": "e0000000-000f-4000-8000-000000000000",
      "title": "Module 15: TLS, Certificates and Encrypted Traffic",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 14 (recommended); prior prerequisite knowledge may be demonstrated. Interpret TLS handshakes and certificate failures without claiming encrypted payload visibility. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 15,
      "lessons": [
        {
          "id": "e0000000-000f-4000-8000-000000000001",
          "slug": "m15-l1-tls-trust-model",
          "title": "Module 15 - Lesson 1: TLS trust model",
          "description": "Video instruction presented by Practical Networking: \"What is SSL & TLS ?   What is HTTPS ?   What is an SSL VPN? - Practical TLS\". Technical focus on m15-l1-tls-trust-model: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "HMoFvRK4HUo",
          "videoAttribution": {
            "creator": "Practical Networking",
            "platform": "youtube"
          },
          "durationMinutes": 8,
          "order": 1,
          "moduleTitle": "Module 15: TLS, Certificates and Encrypted Traffic",
          "objectives": [
            "Explain the role of **TLS trust model** in ordinary network behavior.",
            "Demonstrate **TLS negotiation** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **HTTP/2 and HTTP/3** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC troubleshooting**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-15",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 15 - Lesson 1: TLS trust model",
            "Network Security Engineering (Mod 15)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 15 - Lesson 1: TLS trust model), follow along with Palo Alto Networks Unit 42 (\"Unit 42 Wireshark Workshop Part 4: Non-Malicious Activity | Unit 42\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 14 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 15 - Lesson 1: TLS trust model",
                "content": "Explain certificates, CA chain, name validation and validity. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret TLS handshakes and certificate failures without claiming encrypted payload visibility. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain certificates, CA chain, name validation and validity. Define all terms in your own words; identify source/destination, transport or ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 15 - Lesson 1: TLS trust model.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Inspect a demo site certificate in your browser. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M15-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret TLS handshakes and certificate failures without claiming encrypted payload visibility. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 15 - Lesson 1: TLS trust model from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-000f-4000-8000-000000000002",
          "slug": "m15-l2-tls-negotiation",
          "title": "Module 15 - Lesson 2: TLS negotiation",
          "description": "Video instruction presented by Hussein Nasser: \"The TLS Handshake Explained with Example (the Math)\". Technical focus on m15-l2-tls-negotiation: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "64geP_LAZ5U",
          "videoAttribution": {
            "creator": "Hussein Nasser",
            "platform": "youtube"
          },
          "durationMinutes": 6,
          "order": 2,
          "moduleTitle": "Module 15: TLS, Certificates and Encrypted Traffic",
          "objectives": [
            "Explain the role of **TLS trust model** in ordinary network behavior.",
            "Demonstrate **TLS negotiation** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **HTTP/2 and HTTP/3** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC troubleshooting**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-15",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 15 - Lesson 2: TLS negotiation",
            "Network Security Engineering (Mod 15)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 15 - Lesson 2: TLS negotiation), follow along with Professor Messer (\"Security Concepts - CompTIA Network+ N10-009 - 4.1\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 14 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 15 - Lesson 2: TLS negotiation",
                "content": "Recognize ClientHello, ServerHello and handshake messages. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret TLS handshakes and certificate failures without claiming encrypted payload visibility. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Recognize ClientHello, ServerHello and handshake messages. Define all terms in your own words; identify source/destination, transport or ser...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 15 - Lesson 2: TLS negotiation.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Inspect a supplied TLS PCAP. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M15-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret TLS handshakes and certificate failures without claiming encrypted payload visibility. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 15 - Lesson 2: TLS negotiation from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-000f-4000-8000-000000000003",
          "slug": "m15-l3-http-2-and-http-3",
          "title": "Module 15 - Lesson 3: HTTP/2 and HTTP/3",
          "description": "Video instruction presented by Hussein Nasser: \"HTTP/2 Critical Limitation that led to HTTP/3 & QUIC (Explained by Example)\". Technical focus on comparing HTTP/2 stream multiplexing with HTTP/3 QUIC, analyzing Head-of-Line (HoL) blocking inherent in TCP transport during packet loss, and evaluating independent stream delivery over UDP.",
          "youtubeVideoId": "GriONb4EfPY",
          "videoAttribution": {
            "creator": "Hussein Nasser",
            "platform": "youtube"
          },
          "durationMinutes": 10,
          "order": 3,
          "moduleTitle": "Module 15: TLS, Certificates and Encrypted Traffic",
          "objectives": [
            "Explain the role of **TLS trust model** in ordinary network behavior.",
            "Demonstrate **TLS negotiation** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **HTTP/2 and HTTP/3** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC troubleshooting**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-15",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 15 - Lesson 3: HTTP/2 and HTTP/3",
            "Network Security Engineering (Mod 15)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 15 - Lesson 3: HTTP/2 and HTTP/3), follow along with Byteprint Dev (\"HTTP/1.1 vs HTTP/2 vs HTTP/3 Explained\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 14 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 15 - Lesson 3: HTTP/2 and HTTP/3",
                "content": "Understand HTTP/2 over TLS and QUIC over UDP. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret TLS handshakes and certificate failures without claiming encrypted payload visibility. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Understand HTTP/2 over TLS and QUIC over UDP. Define all terms in your own words; identify source/destination, transport or service details ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 15 - Lesson 3: HTTP/2 and HTTP/3.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Compare capture metadata and transport differences. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M15-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret TLS handshakes and certificate failures without claiming encrypted payload visibility. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 15 - Lesson 3: HTTP/2 and HTTP/3 from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-000f-4000-8000-000000000004",
          "slug": "m15-l4-soc-troubleshooting",
          "title": "Module 15 - Lesson 4: SOC troubleshooting",
          "description": "Video instruction presented by Chris Greer: \"Let's FIX a BROKEN TLS Handshake // with Wireshark\". Technical focus on m15-l4-soc-troubleshooting: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "m3I-h9uSgj8",
          "videoAttribution": {
            "creator": "Chris Greer",
            "platform": "youtube"
          },
          "durationMinutes": 4,
          "order": 4,
          "moduleTitle": "Module 15: TLS, Certificates and Encrypted Traffic",
          "objectives": [
            "Explain the role of **TLS trust model** in ordinary network behavior.",
            "Demonstrate **TLS negotiation** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **HTTP/2 and HTTP/3** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC troubleshooting**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-15",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 15 - Lesson 4: SOC troubleshooting",
            "Network Security Engineering (Mod 15)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 15 - Lesson 4: SOC troubleshooting), follow along with Chris Greer (\"Let's FIX a BROKEN TLS Handshake // with Wireshark\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 14 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 15 - Lesson 4: SOC troubleshooting",
                "content": "Interpret invalid certificate, protocol mismatch and handshake failure. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret TLS handshakes and certificate failures without claiming encrypted payload visibility. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Interpret invalid certificate, protocol mismatch and handshake failure. Define all terms in your own words; identify source/destination, tra...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 15 - Lesson 4: SOC troubleshooting.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Write a structured TLS error triage note. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M15-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret TLS handshakes and certificate failures without claiming encrypted payload visibility. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 15 - Lesson 4: SOC troubleshooting from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 15: TLS, Certificates and Encrypted Traffic Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "objective": "Dissect TLS 1.2/1.3 cryptographic handshakes (Client Hello, Server Hello, Key Exchange, Finished). Validate X.509 certificate chains and SNI visibility.",
        "toolsRequired": [
          "Wireshark",
          "OpenSSL"
        ],
        "pcapSource": {
          "fileName": "m15-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m15-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b815"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Wireshark & OpenSSL within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 15 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t15-1",
            "description": "Initialize lab topology and verify layer connectivity using Wireshark & OpenSSL."
          },
          {
            "id": "t15-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 15."
          },
          {
            "id": "t15-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t15-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t15-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 15 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 15.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m15",
        "questions": []
      }
    },
    {
      "id": "e0000000-0010-4000-8000-000000000000",
      "title": "Module 16: NAT, PAT and Network Translation",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 15 (recommended); prior prerequisite knowledge may be demonstrated. Distinguish private/public endpoints and understand translation in security logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 16,
      "lessons": [
        {
          "id": "e0000000-0010-4000-8000-000000000001",
          "slug": "m16-l1-private-addressing",
          "title": "Module 16 - Lesson 1: Private addressing",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | NAT (Part 1) | Day 44 | CCNA 200-301 Complete Course\". Technical focus on m16-l1-private-addressing: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "2TZCfTgopeg",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 32,
          "order": 1,
          "moduleTitle": "Module 16: NAT, PAT and Network Translation",
          "objectives": [
            "Explain the role of **Private addressing** in ordinary network behavior.",
            "Demonstrate **Static vs dynamic NAT** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **PAT and port mapping** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC attribution**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-16",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 16 - Lesson 1: Private addressing",
            "Network Security Engineering (Mod 16)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 16 - Lesson 1: Private addressing), follow along with Jeremy's IT Lab (\"Free CCNA | NAT (Part 1) | Day 44 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 15 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 16 - Lesson 1: Private addressing",
                "content": "Map RFC1918 ranges to border gateways. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Distinguish private/public endpoints and understand translation in security logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Map RFC1918 ranges to border gateways. Define all terms in your own words; identify source/destination, transport or service details where r...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 16 - Lesson 1: Private addressing.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Identify inside/outside networks in a simple topology. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M16-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Distinguish private/public endpoints and understand translation in security logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 16 - Lesson 1: Private addressing from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "RFC 1918 \u2014 private IPv4 addressing",
                "url": "https://www.rfc-editor.org/rfc/rfc1918"
              }
            ]
          }
        },
        {
          "id": "e0000000-0010-4000-8000-000000000002",
          "slug": "m16-l2-static-vs-dynamic-nat",
          "title": "Module 16 - Lesson 2: Static vs dynamic NAT",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Dynamic NAT | Day 45 Lab | CCNA 200-301 Complete Course\". Technical focus on m16-l2-static-vs-dynamic-nat: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "vNs1xxiwGJs",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 15,
          "order": 2,
          "moduleTitle": "Module 16: NAT, PAT and Network Translation",
          "objectives": [
            "Explain the role of **Private addressing** in ordinary network behavior.",
            "Demonstrate **Static vs dynamic NAT** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **PAT and port mapping** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC attribution**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-16",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 16 - Lesson 2: Static vs dynamic NAT",
            "Network Security Engineering (Mod 16)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 16 - Lesson 2: Static vs dynamic NAT), follow along with Jeremy's IT Lab (\"Free CCNA | Static NAT | Day 44 Lab | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 15 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 16 - Lesson 2: Static vs dynamic NAT",
                "content": "Explain one-to-one and pooled translations. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Distinguish private/public endpoints and understand translation in security logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain one-to-one and pooled translations. Define all terms in your own words; identify source/destination, transport or service details wh...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 16 - Lesson 2: Static vs dynamic NAT.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draw before-and-after packet endpoint fields. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M16-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Distinguish private/public endpoints and understand translation in security logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 16 - Lesson 2: Static vs dynamic NAT from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "RFC 1918 \u2014 private IPv4 addressing",
                "url": "https://www.rfc-editor.org/rfc/rfc1918"
              }
            ]
          }
        },
        {
          "id": "e0000000-0010-4000-8000-000000000003",
          "slug": "m16-l3-pat-and-port-mapping",
          "title": "Module 16 - Lesson 3: PAT and port mapping",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | NAT (part 2) | Day 45 | CCNA 200-301 Complete Course\". Technical focus on m16-l3-pat-and-port-mapping: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "kILDNs4KjYE",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 30,
          "order": 3,
          "moduleTitle": "Module 16: NAT, PAT and Network Translation",
          "objectives": [
            "Explain the role of **Private addressing** in ordinary network behavior.",
            "Demonstrate **Static vs dynamic NAT** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **PAT and port mapping** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC attribution**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-16",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 16 - Lesson 3: PAT and port mapping",
            "Network Security Engineering (Mod 16)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 16 - Lesson 3: PAT and port mapping), follow along with Jeremy's IT Lab (\"Free CCNA | NAT (part 2) | Day 45 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 15 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 16 - Lesson 3: PAT and port mapping",
                "content": "Understand multiple clients sharing a public address. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Distinguish private/public endpoints and understand translation in security logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Understand multiple clients sharing a public address. Define all terms in your own words; identify source/destination, transport or service ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 16 - Lesson 3: PAT and port mapping.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Create a mock translation table with source ports. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M16-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Distinguish private/public endpoints and understand translation in security logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 16 - Lesson 3: PAT and port mapping from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "RFC 1918 \u2014 private IPv4 addressing",
                "url": "https://www.rfc-editor.org/rfc/rfc1918"
              }
            ]
          }
        },
        {
          "id": "e0000000-0010-4000-8000-000000000004",
          "slug": "m16-l4-soc-attribution",
          "title": "Module 16 - Lesson 4: SOC attribution",
          "description": "Video instruction presented by WireDogSec: \"Log Analysis with SIEM | TryHackMe | SOC Level 1 2025\". Technical focus on correlating Network Address Translation (NAT) and firewall connection logs, mapping public-facing translation records back to internal host IP addresses, and attributing suspicious egress connections using ephemeral source port tracking.",
          "youtubeVideoId": "ZpTyTaKjzDc",
          "videoAttribution": {
            "creator": "WireDogSec",
            "platform": "youtube"
          },
          "durationMinutes": 53,
          "order": 4,
          "moduleTitle": "Module 16: NAT, PAT and Network Translation",
          "objectives": [
            "Explain the role of **Private addressing** in ordinary network behavior.",
            "Demonstrate **Static vs dynamic NAT** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **PAT and port mapping** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC attribution**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-16",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 16 - Lesson 4: SOC attribution",
            "Network Security Engineering (Mod 16)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 16 - Lesson 4: SOC attribution), follow along with Network Direction (\"How to Use NAT | Network Fundamentals (Part 21)\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 15 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 16 - Lesson 4: SOC attribution",
                "content": "Explain why NAT logs, time and port are needed for attribution. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Distinguish private/public endpoints and understand translation in security logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain why NAT logs, time and port are needed for attribution. Define all terms in your own words; identify source/destination, transport o...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 16 - Lesson 4: SOC attribution.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Correlate two simulated sessions with NAT entries. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M16-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Distinguish private/public endpoints and understand translation in security logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 16 - Lesson 4: SOC attribution from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "RFC 1918 \u2014 private IPv4 addressing",
                "url": "https://www.rfc-editor.org/rfc/rfc1918"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 16: NAT, PAT and Network Translation Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 90,
        "objective": "Configure dynamic NAT with overload (PAT) on border router. Compare private inside addresses with translated public outside addresses in NAT translation tables.",
        "toolsRequired": [
          "Packet Tracer",
          "Wireshark"
        ],
        "pcapSource": {
          "fileName": "m16-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m16-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b816"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Packet Tracer & Wireshark within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 16 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t16-1",
            "description": "Initialize lab topology and verify layer connectivity using Packet Tracer & Wireshark."
          },
          {
            "id": "t16-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 16."
          },
          {
            "id": "t16-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t16-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t16-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 16 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 16.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m16",
        "questions": []
      }
    },
    {
      "id": "e0000000-0011-4000-8000-000000000000",
      "title": "Module 17: Firewalls, ACLs and Zero-Trust Segmentation",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 16 (recommended); prior prerequisite knowledge may be demonstrated. Design and test minimal access policy while interpreting deny and allow logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 17,
      "lessons": [
        {
          "id": "e0000000-0011-4000-8000-000000000001",
          "slug": "m17-l1-filtering-logic",
          "title": "Module 17 - Lesson 1: Filtering logic",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Standard ACLs | Day 34 | CCNA 200-301 Complete Course\". Technical focus on m17-l1-filtering-logic: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "z023_eRUtSo",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 47,
          "order": 1,
          "moduleTitle": "Module 17: Firewalls, ACLs and Zero-Trust Segmentation",
          "objectives": [
            "Explain the role of **Filtering logic** in ordinary network behavior.",
            "Demonstrate **Rule order** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Network zones** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Firewall investigations**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-17",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 17 - Lesson 1: Filtering logic",
            "Network Security Engineering (Mod 17)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 17 - Lesson 1: Filtering logic), follow along with Jeremy's IT Lab (\"Free CCNA | Standard ACLs | Day 34 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 16 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 17 - Lesson 1: Filtering logic",
                "content": "Differentiate stateless ACL, stateful firewall and application proxy. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Design and test minimal access policy while interpreting deny and allow logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Differentiate stateless ACL, stateful firewall and application proxy. Define all terms in your own words; identify source/destination, trans...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 17 - Lesson 1: Filtering logic.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Compare three flow-policy examples. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M17-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Design and test minimal access policy while interpreting deny and allow logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 17 - Lesson 1: Filtering logic from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0011-4000-8000-000000000002",
          "slug": "m17-l2-rule-order",
          "title": "Module 17 - Lesson 2: Rule order",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Extended ACLs | Day 35 | CCNA 200-301 Complete Course\". Technical focus on m17-l2-rule-order: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "dUttKY_CNXE",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 41,
          "order": 2,
          "moduleTitle": "Module 17: Firewalls, ACLs and Zero-Trust Segmentation",
          "objectives": [
            "Explain the role of **Filtering logic** in ordinary network behavior.",
            "Demonstrate **Rule order** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Network zones** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Firewall investigations**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-17",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 17 - Lesson 2: Rule order",
            "Network Security Engineering (Mod 17)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 17 - Lesson 2: Rule order), follow along with Jeremy's IT Lab (\"Free CCNA | Extended ACLs | Day 35 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 16 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 17 - Lesson 2: Rule order",
                "content": "Explain allow, deny, implicit default and precedence. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Design and test minimal access policy while interpreting deny and allow logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain allow, deny, implicit default and precedence. Define all terms in your own words; identify source/destination, transport or service ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 17 - Lesson 2: Rule order.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draft an ordered rule table. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M17-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Design and test minimal access policy while interpreting deny and allow logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 17 - Lesson 2: Rule order from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0011-4000-8000-000000000003",
          "slug": "m17-l3-network-zones",
          "title": "Module 17 - Lesson 3: Network zones",
          "description": "Video instruction presented by PowerCert Animated Videos: \"What is a DMZ? (Demilitarized Zone)\". Technical focus on m17-l3-network-zones: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "dqlzQXo1wqo",
          "videoAttribution": {
            "creator": "PowerCert Animated Videos",
            "platform": "youtube"
          },
          "durationMinutes": 6,
          "order": 3,
          "moduleTitle": "Module 17: Firewalls, ACLs and Zero-Trust Segmentation",
          "objectives": [
            "Explain the role of **Filtering logic** in ordinary network behavior.",
            "Demonstrate **Rule order** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Network zones** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Firewall investigations**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-17",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 17 - Lesson 3: Network zones",
            "Network Security Engineering (Mod 17)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 17 - Lesson 3: Network zones), follow along with Network Direction (\"Understanding Access Control Lists | Network Fundamentals Part 14\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 16 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 17 - Lesson 3: Network zones",
                "content": "Design user, server, guest and management trust boundaries. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Design and test minimal access policy while interpreting deny and allow logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Design user, server, guest and management trust boundaries. Define all terms in your own words; identify source/destination, transport or se...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 17 - Lesson 3: Network zones.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Build a source/destination/service matrix. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M17-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Design and test minimal access policy while interpreting deny and allow logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 17 - Lesson 3: Network zones from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0011-4000-8000-000000000004",
          "slug": "m17-l4-firewall-investigations",
          "title": "Module 17 - Lesson 4: Firewall investigations",
          "description": "Video instruction presented by InfoSec Pandey: \"Day 22 | Firewall Logs Masterclass | Learn Firewall Log Analysis | Analyze Firewall Logs with Splunk\". Technical focus on firewall log analysis, dissecting traffic, threat, and system events, querying blocked versus allowed connection sequences in Splunk, and investigating perimeter security policy violations.",
          "youtubeVideoId": "JWGV8rNoZZY",
          "videoAttribution": {
            "creator": "InfoSec Pandey",
            "platform": "youtube"
          },
          "durationMinutes": 27,
          "order": 4,
          "moduleTitle": "Module 17: Firewalls, ACLs and Zero-Trust Segmentation",
          "objectives": [
            "Explain the role of **Filtering logic** in ordinary network behavior.",
            "Demonstrate **Rule order** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Network zones** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Firewall investigations**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-17",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 17 - Lesson 4: Firewall investigations",
            "Network Security Engineering (Mod 17)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 17 - Lesson 4: Firewall investigations), follow along with Professor Messer (\"Segmentation Enforcement - CompTIA Network+ N10-009 - 4.1\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 16 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 17 - Lesson 4: Firewall investigations",
                "content": "Read permit/deny events and log fields. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Design and test minimal access policy while interpreting deny and allow logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Read permit/deny events and log fields. Define all terms in your own words; identify source/destination, transport or service details where ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 17 - Lesson 4: Firewall investigations.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Diagnose a permitted business flow blocked by a sample rule. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M17-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Design and test minimal access policy while interpreting deny and allow logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 17 - Lesson 4: Firewall investigations from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 17: Firewalls, ACLs and Zero-Trust Segmentation Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 90,
        "objective": "Implement standard and extended IPv4 Access Control Lists (ACLs). Test top-down first-match evaluation, implicit deny all, and stateful vs stateless packet inspection.",
        "toolsRequired": [
          "Packet Tracer",
          "Syslog"
        ],
        "pcapSource": {
          "fileName": "m17-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m17-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b817"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Packet Tracer & Syslog within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 17 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t17-1",
            "description": "Initialize lab topology and verify layer connectivity using Packet Tracer & Syslog."
          },
          {
            "id": "t17-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 17."
          },
          {
            "id": "t17-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t17-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t17-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 17 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 17.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m17",
        "questions": []
      }
    },
    {
      "id": "e0000000-0012-4000-8000-000000000000",
      "title": "Module 18: Wireless Networking and Wi-Fi Security",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 17 (recommended); prior prerequisite knowledge may be demonstrated. Understand 802.11, wireless authentication and common detection indicators. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 18,
      "lessons": [
        {
          "id": "e0000000-0012-4000-8000-000000000001",
          "slug": "m18-l1-wireless-architecture",
          "title": "Module 18 - Lesson 1: Wireless architecture",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Wireless Architectures | Day 56 | CCNA 200-301 Complete Course\". Technical focus on m18-l1-wireless-architecture: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "uX1h0F6wpBY",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 38,
          "order": 1,
          "moduleTitle": "Module 18: Wireless Networking and Wi-Fi Security",
          "objectives": [
            "Explain the role of **Wireless architecture** in ordinary network behavior.",
            "Demonstrate **802.11 basics** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Authentication** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Wireless monitoring**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-18",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 18 - Lesson 1: Wireless architecture",
            "Network Security Engineering (Mod 18)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 18 - Lesson 1: Wireless architecture), follow along with Professor Messer (\"Wireless Networking - CompTIA Network+ N10-009 - 1.5\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 17 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 18 - Lesson 1: Wireless architecture",
                "content": "Identify AP, SSID, channel, bands and roaming. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Understand 802.11, wireless authentication and common detection indicators. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Identify AP, SSID, channel, bands and roaming. Define all terms in your own words; identify source/destination, transport or service details...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 18 - Lesson 1: Wireless architecture.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Map your own AP settings without exposing passwords. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M18-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Understand 802.11, wireless authentication and common detection indicators. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 18 - Lesson 1: Wireless architecture from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              },
              {
                "title": "NIST cybersecurity publications",
                "url": "https://csrc.nist.gov/publications"
              }
            ]
          }
        },
        {
          "id": "e0000000-0012-4000-8000-000000000002",
          "slug": "m18-l2-802-11-basics",
          "title": "Module 18 - Lesson 2: 802.11 basics",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Wireless Fundamentals | Day 55 | CCNA 200-301 Complete Course\". Technical focus on m18-l2-802-11-basics: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "zuYiktLqNYQ",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 36,
          "order": 2,
          "moduleTitle": "Module 18: Wireless Networking and Wi-Fi Security",
          "objectives": [
            "Explain the role of **Wireless architecture** in ordinary network behavior.",
            "Demonstrate **802.11 basics** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Authentication** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Wireless monitoring**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-18",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 18 - Lesson 2: 802.11 basics",
            "Network Security Engineering (Mod 18)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 18 - Lesson 2: 802.11 basics), follow along with Professor Messer (\"Wireless Encryption - CompTIA Network+ N10-009 - 2.3\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 17 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 18 - Lesson 2: 802.11 basics",
                "content": "Contrast wireless frames with Ethernet framing. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Understand 802.11, wireless authentication and common detection indicators. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Contrast wireless frames with Ethernet framing. Define all terms in your own words; identify source/destination, transport or service detail...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 18 - Lesson 2: 802.11 basics.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Label a sample WLAN diagram. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M18-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Understand 802.11, wireless authentication and common detection indicators. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 18 - Lesson 2: 802.11 basics from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              },
              {
                "title": "NIST cybersecurity publications",
                "url": "https://csrc.nist.gov/publications"
              }
            ]
          }
        },
        {
          "id": "e0000000-0012-4000-8000-000000000003",
          "slug": "m18-l3-authentication",
          "title": "Module 18 - Lesson 3: Authentication",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Wireless Security | Day 57 | CCNA 200-301 Complete Course\". Technical focus on m18-l3-authentication: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "wHXKo9So5y8",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 34,
          "order": 3,
          "moduleTitle": "Module 18: Wireless Networking and Wi-Fi Security",
          "objectives": [
            "Explain the role of **Wireless architecture** in ordinary network behavior.",
            "Demonstrate **802.11 basics** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Authentication** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Wireless monitoring**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-18",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 18 - Lesson 3: Authentication",
            "Network Security Engineering (Mod 18)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 18 - Lesson 3: Authentication), follow along with Jeremy's IT Lab (\"Free CCNA | Wireless Security | Day 57 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 17 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 18 - Lesson 3: Authentication",
                "content": "Compare WPA2-Personal, WPA3 and enterprise 802.1X conceptually. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Understand 802.11, wireless authentication and common detection indicators. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Compare WPA2-Personal, WPA3 and enterprise 802.1X conceptually. Define all terms in your own words; identify source/destination, transport o...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 18 - Lesson 3: Authentication.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Prepare a wireless hardening checklist. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M18-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Understand 802.11, wireless authentication and common detection indicators. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 18 - Lesson 3: Authentication from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              },
              {
                "title": "NIST cybersecurity publications",
                "url": "https://csrc.nist.gov/publications"
              }
            ]
          }
        },
        {
          "id": "e0000000-0012-4000-8000-000000000004",
          "slug": "m18-l4-wireless-monitoring",
          "title": "Module 18 - Lesson 4: Wireless monitoring",
          "description": "Video instruction presented by Tall Paul Tech: \"802.11 Association And Reassociation Frames\". Technical focus on m18-l4-wireless-monitoring: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "0UFp3sSLxFI",
          "videoAttribution": {
            "creator": "Tall Paul Tech",
            "platform": "youtube"
          },
          "durationMinutes": 4,
          "order": 4,
          "moduleTitle": "Module 18: Wireless Networking and Wi-Fi Security",
          "objectives": [
            "Explain the role of **Wireless architecture** in ordinary network behavior.",
            "Demonstrate **802.11 basics** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Authentication** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Wireless monitoring**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-18",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 18 - Lesson 4: Wireless monitoring",
            "Network Security Engineering (Mod 18)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 18 - Lesson 4: Wireless monitoring), follow along with Professor Messer (\"Wireless Technologies - CompTIA Network+ N10-009 - 2.3\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 17 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 18 - Lesson 4: Wireless monitoring",
                "content": "Explain rogue AP, weak encryption and deauth anomaly detection. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Understand 802.11, wireless authentication and common detection indicators. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain rogue AP, weak encryption and deauth anomaly detection. Define all terms in your own words; identify source/destination, transport o...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 18 - Lesson 4: Wireless monitoring.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Review a simulated wireless alert without transmitting interference. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M18-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Understand 802.11, wireless authentication and common detection indicators. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 18 - Lesson 4: Wireless monitoring from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              },
              {
                "title": "NIST cybersecurity publications",
                "url": "https://csrc.nist.gov/publications"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 18: Wireless Networking and Wi-Fi Security Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 90,
        "objective": "Configure WPA2/WPA3 enterprise wireless authentication. Dissect 802.11 management, control, and data frames and analyze deauthentication attack indicators.",
        "toolsRequired": [
          "Packet Tracer",
          "Wireshark"
        ],
        "pcapSource": {
          "fileName": "m18-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m18-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b818"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Packet Tracer & Wireshark within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 18 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t18-1",
            "description": "Initialize lab topology and verify layer connectivity using Packet Tracer & Wireshark."
          },
          {
            "id": "t18-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 18."
          },
          {
            "id": "t18-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t18-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t18-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 18 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 18.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m18",
        "questions": []
      }
    },
    {
      "id": "e0000000-0013-4000-8000-000000000000",
      "title": "Module 19: IPv6 Addressing and Network Security",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 18 (recommended); prior prerequisite knowledge may be demonstrated. Read IPv6 headers, address types, neighbor discovery and dual-stack risk. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 19,
      "lessons": [
        {
          "id": "e0000000-0013-4000-8000-000000000001",
          "slug": "m19-l1-ipv6-representation",
          "title": "Module 19 - Lesson 1: IPv6 representation",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | IPv6 Part 1 | Day 31 | CCNA 200-301 Complete Course\". Technical focus on m19-l1-ipv6-representation: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "ZNuXyOXae5U",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 39,
          "order": 1,
          "moduleTitle": "Module 19: IPv6 Addressing and Network Security",
          "objectives": [
            "Explain the role of **IPv6 representation** in ordinary network behavior.",
            "Demonstrate **NDP and ICMPv6** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Dual-stack paths** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Defensive checks**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-19",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 19 - Lesson 1: IPv6 representation",
            "Network Security Engineering (Mod 19)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 19 - Lesson 1: IPv6 representation), follow along with Jeremy's IT Lab (\"Free CCNA | IPv6 Part 1 | Day 31 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 18 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 19 - Lesson 1: IPv6 representation",
                "content": "Compress addresses and distinguish global, unique-local and link-local. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Read IPv6 headers, address types, neighbor discovery and dual-stack risk. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Compress addresses and distinguish global, unique-local and link-local. Define all terms in your own words; identify source/destination, tra...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 19 - Lesson 1: IPv6 representation.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Convert three sample IPv6 addresses to compressed form. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M19-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Read IPv6 headers, address types, neighbor discovery and dual-stack risk. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 19 - Lesson 1: IPv6 representation from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "IETF RFC Editor",
                "url": "https://www.rfc-editor.org/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0013-4000-8000-000000000002",
          "slug": "m19-l2-ndp-and-icmpv6",
          "title": "Module 19 - Lesson 2: NDP and ICMPv6",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | IPv6 Part 2 | Day 32 | CCNA 200-301 Complete Course\". Technical focus on m19-l2-ndp-and-icmpv6: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "BrTMMOXFhDU",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 40,
          "order": 2,
          "moduleTitle": "Module 19: IPv6 Addressing and Network Security",
          "objectives": [
            "Explain the role of **IPv6 representation** in ordinary network behavior.",
            "Demonstrate **NDP and ICMPv6** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Dual-stack paths** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Defensive checks**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-19",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 19 - Lesson 2: NDP and ICMPv6",
            "Network Security Engineering (Mod 19)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 19 - Lesson 2: NDP and ICMPv6), follow along with Jeremy's IT Lab (\"Free CCNA | IPv6 Part 2 | Day 32 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 18 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 19 - Lesson 2: NDP and ICMPv6",
                "content": "Contrast NDP with ARP and explain router advertisements. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Read IPv6 headers, address types, neighbor discovery and dual-stack risk. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Contrast NDP with ARP and explain router advertisements. Define all terms in your own words; identify source/destination, transport or servi...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 19 - Lesson 2: NDP and ICMPv6.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Inspect available ICMPv6 fields in a sample capture. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M19-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Read IPv6 headers, address types, neighbor discovery and dual-stack risk. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 19 - Lesson 2: NDP and ICMPv6 from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "IETF RFC Editor",
                "url": "https://www.rfc-editor.org/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0013-4000-8000-000000000003",
          "slug": "m19-l3-dual-stack-paths",
          "title": "Module 19 - Lesson 3: Dual-stack paths",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Configuring IPv6 (Part 3) | Day 33 Lab | CCNA 200-301 Complete Course\". Technical focus on m19-l3-dual-stack-paths: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "WSBEVFANMmc",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 19,
          "order": 3,
          "moduleTitle": "Module 19: IPv6 Addressing and Network Security",
          "objectives": [
            "Explain the role of **IPv6 representation** in ordinary network behavior.",
            "Demonstrate **NDP and ICMPv6** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Dual-stack paths** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Defensive checks**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-19",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 19 - Lesson 3: Dual-stack paths",
            "Network Security Engineering (Mod 19)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 19 - Lesson 3: Dual-stack paths), follow along with Professor Messer (\"IPv6 and SLAAC - CompTIA Network+ N10-009 - 3.4\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 18 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 19 - Lesson 3: Dual-stack paths",
                "content": "Explain why IPv4-only inspection can miss IPv6 flows. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Read IPv6 headers, address types, neighbor discovery and dual-stack risk. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain why IPv4-only inspection can miss IPv6 flows. Define all terms in your own words; identify source/destination, transport or service ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 19 - Lesson 3: Dual-stack paths.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Inventory IPv4 and IPv6 adapters on a lab machine. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M19-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Read IPv6 headers, address types, neighbor discovery and dual-stack risk. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 19 - Lesson 3: Dual-stack paths from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "IETF RFC Editor",
                "url": "https://www.rfc-editor.org/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0013-4000-8000-000000000004",
          "slug": "m19-l4-defensive-checks",
          "title": "Module 19 - Lesson 4: Defensive checks",
          "description": "Video instruction presented by PyNet Labs: \"IPv6 RA Guard Explained | Protect Against Rogue Router Advertisements\". Technical focus on IPv6 security monitoring, analyzing rogue Router Advertisement (RA) attacks, preventing SLAAC-based man-in-the-middle exploits, and deploying switch-level IPv6 RA Guard and ND Inspection.",
          "youtubeVideoId": "IKyLbvLF8VQ",
          "videoAttribution": {
            "creator": "PyNet Labs",
            "platform": "youtube"
          },
          "durationMinutes": 13,
          "order": 4,
          "moduleTitle": "Module 19: IPv6 Addressing and Network Security",
          "objectives": [
            "Explain the role of **IPv6 representation** in ordinary network behavior.",
            "Demonstrate **NDP and ICMPv6** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Dual-stack paths** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Defensive checks**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-19",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 19 - Lesson 4: Defensive checks",
            "Network Security Engineering (Mod 19)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 19 - Lesson 4: Defensive checks), follow along with Jeremy's IT Lab (\"Free CCNA | IPv6 Part 3 | Day 33 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 18 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 19 - Lesson 4: Defensive checks",
                "content": "Review RA guard, filtering and IPv6 logging at a conceptual level. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Read IPv6 headers, address types, neighbor discovery and dual-stack risk. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Review RA guard, filtering and IPv6 logging at a conceptual level. Define all terms in your own words; identify source/destination, transpor...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 19 - Lesson 4: Defensive checks.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draft an IPv6 visibility checklist. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M19-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Read IPv6 headers, address types, neighbor discovery and dual-stack risk. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 19 - Lesson 4: Defensive checks from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Cisco Packet Tracer \u2014 free course/download",
                "url": "https://www.netacad.com/courses/getting-started-cisco-packet-tracer/1000"
              },
              {
                "title": "IETF RFC Editor",
                "url": "https://www.rfc-editor.org/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 19: IPv6 Addressing and Network Security Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 90,
        "objective": "Inspect 128-bit IPv6 headers, configure SLAAC with EUI-64, and dissect ICMPv6 Neighbor Discovery Protocol (NDP) Router Solicitations and Advertisements.",
        "toolsRequired": [
          "Wireshark",
          "Packet Tracer"
        ],
        "pcapSource": {
          "fileName": "m19-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m19-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b819"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Wireshark & Packet Tracer within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 19 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t19-1",
            "description": "Initialize lab topology and verify layer connectivity using Wireshark & Packet Tracer."
          },
          {
            "id": "t19-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 19."
          },
          {
            "id": "t19-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t19-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t19-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 19 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 19.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m19",
        "questions": []
      }
    },
    {
      "id": "e0000000-0014-4000-8000-000000000000",
      "title": "Module 20: VPNs, Tunnels and Secure Remote Access",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 19 (recommended); prior prerequisite knowledge may be demonstrated. Differentiate tunneling and encryption and interpret remote-access security telemetry. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 20,
      "lessons": [
        {
          "id": "e0000000-0014-4000-8000-000000000001",
          "slug": "m20-l1-vpn-use-cases",
          "title": "Module 20 - Lesson 1: VPN use cases",
          "description": "Video instruction presented by The Confused Engineer \ud83d\ude1c: \"How VPN REALLY Works (Types, Architectures & Troubleshooting)\". Technical focus on m20-l1-vpn-use-cases: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "Rx8q7N-qZVc",
          "videoAttribution": {
            "creator": "The Confused Engineer \ud83d\ude1c",
            "platform": "youtube"
          },
          "durationMinutes": 20,
          "order": 1,
          "moduleTitle": "Module 20: VPNs, Tunnels and Secure Remote Access",
          "objectives": [
            "Explain the role of **VPN use cases** in ordinary network behavior.",
            "Demonstrate **Tunnel endpoints** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Protocol concepts** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC monitoring**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-20",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 20 - Lesson 1: VPN use cases",
            "Network Security Engineering (Mod 20)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 20 - Lesson 1: VPN use cases), follow along with The Confused Engineer (\"How VPN REALLY Works (Types, Architectures & Troubleshooting)\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 19 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 20 - Lesson 1: VPN use cases",
                "content": "Differentiate remote-access and site-to-site VPN. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Differentiate tunneling and encryption and interpret remote-access security telemetry. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Differentiate remote-access and site-to-site VPN. Define all terms in your own words; identify source/destination, transport or service deta...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 20 - Lesson 1: VPN use cases.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draw an internal workstation remote access path. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M20-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Differentiate tunneling and encryption and interpret remote-access security telemetry. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 20 - Lesson 1: VPN use cases from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0014-4000-8000-000000000002",
          "slug": "m20-l2-tunnel-endpoints",
          "title": "Module 20 - Lesson 2: Tunnel endpoints",
          "description": "Video instruction presented by Professor Messer: \"VPNs - CompTIA Network+ N10-009 - 3.5\". Technical focus on m20-l2-tunnel-endpoints: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "tm7i0zEitPQ",
          "videoAttribution": {
            "creator": "Professor Messer",
            "platform": "youtube"
          },
          "durationMinutes": 7,
          "order": 2,
          "moduleTitle": "Module 20: VPNs, Tunnels and Secure Remote Access",
          "objectives": [
            "Explain the role of **VPN use cases** in ordinary network behavior.",
            "Demonstrate **Tunnel endpoints** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Protocol concepts** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC monitoring**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-20",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 20 - Lesson 2: Tunnel endpoints",
            "Network Security Engineering (Mod 20)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 20 - Lesson 2: Tunnel endpoints), follow along with Professor Messer (\"VPNs - CompTIA Network+ N10-009 - 3.5\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 19 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 20 - Lesson 2: Tunnel endpoints",
                "content": "Explain outer/inner addresses and encapsulation. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Differentiate tunneling and encryption and interpret remote-access security telemetry. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain outer/inner addresses and encapsulation. Define all terms in your own words; identify source/destination, transport or service detai...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 20 - Lesson 2: Tunnel endpoints.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Annotate a hypothetical tunneled packet. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M20-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Differentiate tunneling and encryption and interpret remote-access security telemetry. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 20 - Lesson 2: Tunnel endpoints from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0014-4000-8000-000000000003",
          "slug": "m20-l3-protocol-concepts",
          "title": "Module 20 - Lesson 3: Protocol concepts",
          "description": "Video instruction presented by PowerCert Animated Videos: \"IPsec Explained\". Technical focus on m20-l3-protocol-concepts: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "xTH1ZA_qUvA",
          "videoAttribution": {
            "creator": "PowerCert Animated Videos",
            "platform": "youtube"
          },
          "durationMinutes": 6,
          "order": 3,
          "moduleTitle": "Module 20: VPNs, Tunnels and Secure Remote Access",
          "objectives": [
            "Explain the role of **VPN use cases** in ordinary network behavior.",
            "Demonstrate **Tunnel endpoints** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Protocol concepts** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC monitoring**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-20",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 20 - Lesson 3: Protocol concepts",
            "Network Security Engineering (Mod 20)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 20 - Lesson 3: Protocol concepts), follow along with Professor Messer (\"Remote Access - CompTIA Network+ N10-009 - 3.5\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 19 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 20 - Lesson 3: Protocol concepts",
                "content": "Contrast WireGuard, IPsec and TLS VPN at a high level. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Differentiate tunneling and encryption and interpret remote-access security telemetry. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Contrast WireGuard, IPsec and TLS VPN at a high level. Define all terms in your own words; identify source/destination, transport or service...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 20 - Lesson 3: Protocol concepts.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Make a feature comparison for an organization. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M20-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Differentiate tunneling and encryption and interpret remote-access security telemetry. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 20 - Lesson 3: Protocol concepts from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0014-4000-8000-000000000004",
          "slug": "m20-l4-soc-monitoring",
          "title": "Module 20 - Lesson 4: SOC monitoring",
          "description": "Video instruction presented by Motasem Hamdan : \"VPN Logs Investigation and Data Analytics With Elastic Stack | TryHackMe | Cyber Security\". Technical focus on enterprise VPN log investigation, tracking authentication attempts, detecting credential stuffing and brute-force attacks, identifying impossible travel anomalies, and auditing remote access telemetry in SIEM.",
          "youtubeVideoId": "o4TFyl-FeRI",
          "videoAttribution": {
            "creator": "Motasem Hamdan ",
            "platform": "youtube"
          },
          "durationMinutes": 36,
          "order": 4,
          "moduleTitle": "Module 20: VPNs, Tunnels and Secure Remote Access",
          "objectives": [
            "Explain the role of **VPN use cases** in ordinary network behavior.",
            "Demonstrate **Tunnel endpoints** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Protocol concepts** as operational or security evidence.",
            "Produce a defensible analyst write-up about **SOC monitoring**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-20",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 20 - Lesson 4: SOC monitoring",
            "Network Security Engineering (Mod 20)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 20 - Lesson 4: SOC monitoring), follow along with Professor Messer (\"Zero Trust - CompTIA Network+ N10-009 - 1.8\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 19 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 20 - Lesson 4: SOC monitoring",
                "content": "Identify unusual geolocation and failed VPN logins with context. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Differentiate tunneling and encryption and interpret remote-access security telemetry. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Identify unusual geolocation and failed VPN logins with context. Define all terms in your own words; identify source/destination, transport ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 20 - Lesson 4: SOC monitoring.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Create a sample VPN login triage report. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M20-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Differentiate tunneling and encryption and interpret remote-access security telemetry. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 20 - Lesson 4: SOC monitoring from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              },
              {
                "title": "Cisco Networking Academy",
                "url": "https://www.netacad.com/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 20: VPNs, Tunnels and Secure Remote Access Hands-on Implementation",
        "difficulty": "intermediate",
        "estimatedMinutes": 90,
        "objective": "Configure site-to-site IPsec VPN tunnel with IKE Phase 1 (ISAKMP SA) and Phase 2 (IPsec SA). Dissect ESP (Encapsulating Security Payload) packet encapsulation.",
        "toolsRequired": [
          "Packet Tracer",
          "Wireshark"
        ],
        "pcapSource": {
          "fileName": "m20-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m20-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b820"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Packet Tracer & Wireshark within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 20 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t20-1",
            "description": "Initialize lab topology and verify layer connectivity using Packet Tracer & Wireshark."
          },
          {
            "id": "t20-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 20."
          },
          {
            "id": "t20-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t20-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t20-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 20 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 20.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m20",
        "questions": []
      }
    },
    {
      "id": "e0000000-0015-4000-8000-000000000000",
      "title": "Module 21: Wireshark and TShark Essentials",
      "description": "Intermediate level (5\u20137 hours). Prerequisite: Module 20 (recommended); prior prerequisite knowledge may be demonstrated. Capture and filter permitted traffic and interpret protocol layers. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 21,
      "lessons": [
        {
          "id": "e0000000-0015-4000-8000-000000000001",
          "slug": "m21-l1-capture-safely",
          "title": "Module 21 - Lesson 1: Capture safely",
          "description": "Video instruction presented by Chris Greer: \"Learn Wireshark! Tutorial for BEGINNERS\". Technical focus on m21-l1-capture-safely: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "OU-A2EmVrKQ",
          "videoAttribution": {
            "creator": "Chris Greer",
            "platform": "youtube"
          },
          "durationMinutes": 16,
          "order": 1,
          "moduleTitle": "Module 21: Wireshark and TShark Essentials",
          "objectives": [
            "Explain the role of **Capture safely** in ordinary network behavior.",
            "Demonstrate **Capture vs display filters** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Statistics** as operational or security evidence.",
            "Produce a defensible analyst write-up about **TShark workflow**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-21",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 21 - Lesson 1: Capture safely",
            "Network Security Engineering (Mod 21)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 21 - Lesson 1: Capture safely), follow along with Chris Greer (\"Learn Wireshark! Tutorial for BEGINNERS\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 20 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 21 - Lesson 1: Capture safely",
                "content": "Select capture interface and define scope, duration and permissions. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Capture and filter permitted traffic and interpret protocol layers. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Select capture interface and define scope, duration and permissions. Define all terms in your own words; identify source/destination, transp...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 21 - Lesson 1: Capture safely.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Open a supplied PCAP before making live captures. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M21-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Capture and filter permitted traffic and interpret protocol layers. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 21 - Lesson 1: Capture safely from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0015-4000-8000-000000000002",
          "slug": "m21-l2-capture-vs-display-filters",
          "title": "Module 21 - Lesson 2: Capture vs display filters",
          "description": "Video instruction presented by HackerSploit: \"Wireshark Tutorial for Beginners - Filters\". Technical focus on m21-l2-capture-vs-display-filters: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "xO69Bl1R07E",
          "videoAttribution": {
            "creator": "HackerSploit",
            "platform": "youtube"
          },
          "durationMinutes": 4,
          "order": 2,
          "moduleTitle": "Module 21: Wireshark and TShark Essentials",
          "objectives": [
            "Explain the role of **Capture safely** in ordinary network behavior.",
            "Demonstrate **Capture vs display filters** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Statistics** as operational or security evidence.",
            "Produce a defensible analyst write-up about **TShark workflow**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-21",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 21 - Lesson 2: Capture vs display filters",
            "Network Security Engineering (Mod 21)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 21 - Lesson 2: Capture vs display filters), follow along with HackerSploit (\"Wireshark Tutorial for Beginners - Filters\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 20 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 21 - Lesson 2: Capture vs display filters",
                "content": "Differentiate BPF capture filters and Wireshark display filters. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Capture and filter permitted traffic and interpret protocol layers. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Differentiate BPF capture filters and Wireshark display filters. Define all terms in your own words; identify source/destination, transport ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 21 - Lesson 2: Capture vs display filters.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Practice ip.addr, tcp.port, dns and http filters. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M21-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Capture and filter permitted traffic and interpret protocol layers. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 21 - Lesson 2: Capture vs display filters from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0015-4000-8000-000000000003",
          "slug": "m21-l3-statistics",
          "title": "Module 21 - Lesson 3: Statistics",
          "description": "Video instruction presented by Chris Greer: \"Reading PCAPs with Wireshark Statistics // Lesson 8 // Wireshark Tutorial\". Technical focus on m21-l3-statistics: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "ZNS115MPsO0",
          "videoAttribution": {
            "creator": "Chris Greer",
            "platform": "youtube"
          },
          "durationMinutes": 9,
          "order": 3,
          "moduleTitle": "Module 21: Wireshark and TShark Essentials",
          "objectives": [
            "Explain the role of **Capture safely** in ordinary network behavior.",
            "Demonstrate **Capture vs display filters** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Statistics** as operational or security evidence.",
            "Produce a defensible analyst write-up about **TShark workflow**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-21",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 21 - Lesson 3: Statistics",
            "Network Security Engineering (Mod 21)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 21 - Lesson 3: Statistics), follow along with Palo Alto Networks Unit 42 (\"Unit 42 Wireshark Workshop Part 2: Setting Up Wireshark | Unit 42\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 20 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 21 - Lesson 3: Statistics",
                "content": "Use protocol hierarchy, conversations and endpoints views. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Capture and filter permitted traffic and interpret protocol layers. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Use protocol hierarchy, conversations and endpoints views. Define all terms in your own words; identify source/destination, transport or ser...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 21 - Lesson 3: Statistics.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Export a summary of three PCAP conversations. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M21-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Capture and filter permitted traffic and interpret protocol layers. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 21 - Lesson 3: Statistics from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0015-4000-8000-000000000004",
          "slug": "m21-l4-tshark-workflow",
          "title": "Module 21 - Lesson 4: TShark workflow",
          "description": "Video instruction presented by David Bombal: \"tshark and Termshark tutorial: Capture and view wireshark captures in a console\". Technical focus on m21-l4-tshark-workflow: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "HoYgPlmOZgo",
          "videoAttribution": {
            "creator": "David Bombal",
            "platform": "youtube"
          },
          "durationMinutes": 13,
          "order": 4,
          "moduleTitle": "Module 21: Wireshark and TShark Essentials",
          "objectives": [
            "Explain the role of **Capture safely** in ordinary network behavior.",
            "Demonstrate **Capture vs display filters** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Statistics** as operational or security evidence.",
            "Produce a defensible analyst write-up about **TShark workflow**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-21",
            "intermediate",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 21 - Lesson 4: TShark workflow",
            "Network Security Engineering (Mod 21)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 21 - Lesson 4: TShark workflow), follow along with David Bombal (\"tshark and Termshark tutorial: Capture and view wireshark captures in a console\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 20 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 21 - Lesson 4: TShark workflow",
                "content": "Use command-line packet summaries for repeatable analysis. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Capture and filter permitted traffic and interpret protocol layers. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Use command-line packet summaries for repeatable analysis. Define all terms in your own words; identify source/destination, transport or ser...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 21 - Lesson 4: TShark workflow.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Run tshark -r on a safe sample PCAP. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M21-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Capture and filter permitted traffic and interpret protocol layers. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 21 - Lesson 4: TShark workflow from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 21: Wireshark and TShark Essentials Hands-on Implementation",
        "difficulty": "advanced",
        "estimatedMinutes": 90,
        "objective": "Apply advanced Wireshark display filters, generate Protocol Hierarchy statistics, IO Graphs, and extract payload artifacts using command-line TShark queries.",
        "toolsRequired": [
          "Wireshark",
          "TShark CLI"
        ],
        "pcapSource": {
          "fileName": "m21-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m21-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b821"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Wireshark & TShark CLI within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 21 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t21-1",
            "description": "Initialize lab topology and verify layer connectivity using Wireshark & TShark CLI."
          },
          {
            "id": "t21-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 21."
          },
          {
            "id": "t21-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t21-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t21-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 21 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 21.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m21",
        "questions": []
      }
    },
    {
      "id": "e0000000-0016-4000-8000-000000000000",
      "title": "Module 22: Deep TCP Packet Analysis and Troubleshooting",
      "description": "Advanced level (6\u20138 hours). Prerequisite: Module 21 (recommended); prior prerequisite knowledge may be demonstrated. Understand timing, retransmission, loss and flow-control clues. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 22,
      "lessons": [
        {
          "id": "e0000000-0016-4000-8000-000000000001",
          "slug": "m22-l1-handshake-timing",
          "title": "Module 22 - Lesson 1: Handshake timing",
          "description": "Video instruction presented by Chris Greer: \"Wireshark Tutorial - Lesson 7 // Using the Time Column\". Technical focus on m22-l1-handshake-timing: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "SllJu5MdkAg",
          "videoAttribution": {
            "creator": "Chris Greer",
            "platform": "youtube"
          },
          "durationMinutes": 10,
          "order": 1,
          "moduleTitle": "Module 22: Deep TCP Packet Analysis and Troubleshooting",
          "objectives": [
            "Explain the role of **Handshake timing** in ordinary network behavior.",
            "Demonstrate **Retransmissions** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Window dynamics** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Incident context**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-22",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 22 - Lesson 1: Handshake timing",
            "Network Security Engineering (Mod 22)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 22 - Lesson 1: Handshake timing), follow along with David Bombal (\"Wireshark Display Filters | Free Wireshark and Ethical Hacking Course: Video #4\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 21 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 22 - Lesson 1: Handshake timing",
                "content": "Interpret RTT and initial connection delay. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Understand timing, retransmission, loss and flow-control clues. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Interpret RTT and initial connection delay. Define all terms in your own words; identify source/destination, transport or service details wh...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 22 - Lesson 1: Handshake timing.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Measure SYN-to-SYN-ACK delay in a supplied capture. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M22-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Understand timing, retransmission, loss and flow-control clues. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 22 - Lesson 1: Handshake timing from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0016-4000-8000-000000000002",
          "slug": "m22-l2-retransmissions",
          "title": "Module 22 - Lesson 2: Retransmissions",
          "description": "Video instruction presented by Chris Greer: \"How TCP RETRANSMISSIONS Work // Analyzing Packet Loss\". Technical focus on packet loss analysis in Wireshark, identifying TCP Fast Retransmissions versus RTO timeout retransmissions, duplicate ACKs, and measuring network packet delay.",
          "youtubeVideoId": "HTQLipAG27I",
          "videoAttribution": {
            "creator": "Chris Greer",
            "platform": "youtube"
          },
          "durationMinutes": 9,
          "order": 2,
          "moduleTitle": "Module 22: Deep TCP Packet Analysis and Troubleshooting",
          "objectives": [
            "Explain the role of **Handshake timing** in ordinary network behavior.",
            "Demonstrate **Retransmissions** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Window dynamics** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Incident context**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-22",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 22 - Lesson 2: Retransmissions",
            "Network Security Engineering (Mod 22)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 22 - Lesson 2: Retransmissions), follow along with Chris Greer (\"How TCP RETRANSMISSIONS Work // Analyzing Packet Loss\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 21 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 22 - Lesson 2: Retransmissions",
                "content": "Differentiate retransmit, duplicate ACK and out-of-order events. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Understand timing, retransmission, loss and flow-control clues. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Differentiate retransmit, duplicate ACK and out-of-order events. Define all terms in your own words; identify source/destination, transport ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 22 - Lesson 2: Retransmissions.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Annotate a TCP loss/recovery sequence. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M22-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Understand timing, retransmission, loss and flow-control clues. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 22 - Lesson 2: Retransmissions from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0016-4000-8000-000000000003",
          "slug": "m22-l3-window-dynamics",
          "title": "Module 22 - Lesson 3: Window dynamics",
          "description": "Video instruction presented by Network Direction: \"How TCP Handles Errors And Uses Windows | Network Fundamentals Part 9\". Technical focus on m22-l3-window-dynamics: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "NaEHwrRHfqk",
          "videoAttribution": {
            "creator": "Network Direction",
            "platform": "youtube"
          },
          "durationMinutes": 9,
          "order": 3,
          "moduleTitle": "Module 22: Deep TCP Packet Analysis and Troubleshooting",
          "objectives": [
            "Explain the role of **Handshake timing** in ordinary network behavior.",
            "Demonstrate **Retransmissions** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Window dynamics** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Incident context**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-22",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 22 - Lesson 3: Window dynamics",
            "Network Security Engineering (Mod 22)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 22 - Lesson 3: Window dynamics), follow along with Network Direction (\"How TCP Handles Errors And Uses Windows | Network Fundamentals Part 9\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 21 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 22 - Lesson 3: Window dynamics",
                "content": "Understand advertised window and receiver limitation. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Understand timing, retransmission, loss and flow-control clues. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Understand advertised window and receiver limitation. Define all terms in your own words; identify source/destination, transport or service ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 22 - Lesson 3: Window dynamics.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Compare TCP window examples. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M22-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Understand timing, retransmission, loss and flow-control clues. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 22 - Lesson 3: Window dynamics from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        },
        {
          "id": "e0000000-0016-4000-8000-000000000004",
          "slug": "m22-l4-incident-context",
          "title": "Module 22 - Lesson 4: Incident context",
          "description": "Video instruction presented by Chris Greer: \"Troubleshooting with Wireshark - Analyzing TCP Resets\". Technical focus on network incident analysis, troubleshooting network resets, determining whether TCP resets are caused by server crashes, firewall blocks, or active RST injection.",
          "youtubeVideoId": "t5OJephyw8I",
          "videoAttribution": {
            "creator": "Chris Greer",
            "platform": "youtube"
          },
          "durationMinutes": 7,
          "order": 4,
          "moduleTitle": "Module 22: Deep TCP Packet Analysis and Troubleshooting",
          "objectives": [
            "Explain the role of **Handshake timing** in ordinary network behavior.",
            "Demonstrate **Retransmissions** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Window dynamics** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Incident context**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-22",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 22 - Lesson 4: Incident context",
            "Network Security Engineering (Mod 22)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 22 - Lesson 4: Incident context), follow along with HackerSploit (\"tcpdump - Traffic Capture & Analysis\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 21 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 22 - Lesson 4: Incident context",
                "content": "Distinguish packet loss, application failure and possible attack. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Understand timing, retransmission, loss and flow-control clues. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Distinguish packet loss, application failure and possible attack. Define all terms in your own words; identify source/destination, transport...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 22 - Lesson 4: Incident context.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Write evidence-for/evidence-against table. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M22-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Understand timing, retransmission, loss and flow-control clues. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 22 - Lesson 4: Incident context from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 22: Deep TCP Packet Analysis and Troubleshooting Hands-on Implementation",
        "difficulty": "advanced",
        "estimatedMinutes": 90,
        "objective": "Diagnose TCP performance bottlenecks: calculate Round Trip Time (RTT), trace duplicate ACKs, fast retransmissions, zero-window probes, and analyze window scaling.",
        "toolsRequired": [
          "Wireshark"
        ],
        "pcapSource": {
          "fileName": "m22-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m22-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b822"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Wireshark within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 22 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t22-1",
            "description": "Initialize lab topology and verify layer connectivity using Wireshark."
          },
          {
            "id": "t22-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 22."
          },
          {
            "id": "t22-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t22-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t22-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 22 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 22.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m22",
        "questions": []
      }
    },
    {
      "id": "e0000000-0017-4000-8000-000000000000",
      "title": "Module 23: DNS Traffic Investigation and Threat Hunting",
      "description": "Advanced level (6\u20138 hours). Prerequisite: Module 22 (recommended); prior prerequisite knowledge may be demonstrated. Analyze DNS network evidence and distinguish suspicious patterns from false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 23,
      "lessons": [
        {
          "id": "e0000000-0017-4000-8000-000000000001",
          "slug": "m23-l1-dns-traffic-baseline",
          "title": "Module 23 - Lesson 1: DNS traffic baseline",
          "description": "Video instruction presented by Chris Greer: \"How DNS Works Under the Hood (Packet by Packet)\". Technical focus on m23-l1-dns-traffic-baseline: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "3FPaTvCJojQ",
          "videoAttribution": {
            "creator": "Chris Greer",
            "platform": "youtube"
          },
          "durationMinutes": 18,
          "order": 1,
          "moduleTitle": "Module 23: DNS Traffic Investigation and Threat Hunting",
          "objectives": [
            "Explain the role of **DNS traffic baseline** in ordinary network behavior.",
            "Demonstrate **Long and encoded labels** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Resolver anomalies** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Triage workflow**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-23",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 23 - Lesson 1: DNS traffic baseline",
            "Network Security Engineering (Mod 23)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 23 - Lesson 1: DNS traffic baseline), follow along with Chris Greer (\"How DNS Works Under the Hood (Packet by Packet)\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 22 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 23 - Lesson 1: DNS traffic baseline",
                "content": "Measure query types, NXDOMAIN rate and destinations. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Analyze DNS network evidence and distinguish suspicious patterns from false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Measure query types, NXDOMAIN rate and destinations. Define all terms in your own words; identify source/destination, transport or service d...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 23 - Lesson 1: DNS traffic baseline.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Create a small DNS baseline table from PCAP. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M23-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Analyze DNS network evidence and distinguish suspicious patterns from false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 23 - Lesson 1: DNS traffic baseline from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0017-4000-8000-000000000002",
          "slug": "m23-l2-long-and-encoded-labels",
          "title": "Module 23 - Lesson 2: Long and encoded labels",
          "description": "Video instruction presented by Tom Olzak: \"DNS Tunneling Identification and Defense\". Technical focus on m23-l2-long-and-encoded-labels: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "CaFo83TlpPM",
          "videoAttribution": {
            "creator": "Tom Olzak",
            "platform": "youtube"
          },
          "durationMinutes": 12,
          "order": 2,
          "moduleTitle": "Module 23: DNS Traffic Investigation and Threat Hunting",
          "objectives": [
            "Explain the role of **DNS traffic baseline** in ordinary network behavior.",
            "Demonstrate **Long and encoded labels** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Resolver anomalies** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Triage workflow**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-23",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 23 - Lesson 2: Long and encoded labels",
            "Network Security Engineering (Mod 23)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 23 - Lesson 2: Long and encoded labels), follow along with Palo Alto Networks Unit 42 (\"Unit 42 Wireshark Workshop Part 3: Host Identification | Unit 42\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 22 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 23 - Lesson 2: Long and encoded labels",
                "content": "Describe reasons benign and malicious DNS names can be long. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Analyze DNS network evidence and distinguish suspicious patterns from false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Describe reasons benign and malicious DNS names can be long. Define all terms in your own words; identify source/destination, transport or s...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 23 - Lesson 2: Long and encoded labels.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Flag outliers without declaring compromise. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M23-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Analyze DNS network evidence and distinguish suspicious patterns from false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 23 - Lesson 2: Long and encoded labels from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0017-4000-8000-000000000003",
          "slug": "m23-l3-resolver-anomalies",
          "title": "Module 23 - Lesson 3: Resolver anomalies",
          "description": "Video instruction presented by STAARKEN INFOSEC (Fortify Solutions): \"DNS Tunneling Attack & Access Target Shell | Full Hands-On Ethical Hacking Lab\". Technical focus on detecting DNS resolver anomalies, identifying high-entropy subdomain requests and abnormal TXT query volume, and uncovering DNS tunneling and covert data exfiltration channels in Wireshark.",
          "youtubeVideoId": "N7vGxbZsyzc",
          "videoAttribution": {
            "creator": "STAARKEN INFOSEC (Fortify Solutions)",
            "platform": "youtube"
          },
          "durationMinutes": 11,
          "order": 3,
          "moduleTitle": "Module 23: DNS Traffic Investigation and Threat Hunting",
          "objectives": [
            "Explain the role of **DNS traffic baseline** in ordinary network behavior.",
            "Demonstrate **Long and encoded labels** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Resolver anomalies** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Triage workflow**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-23",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 23 - Lesson 3: Resolver anomalies",
            "Network Security Engineering (Mod 23)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 23 - Lesson 3: Resolver anomalies), follow along with Professor Messer (\"An Overview of DNS - CompTIA Network+ N10-009 - 3.4\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 22 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 23 - Lesson 3: Resolver anomalies",
                "content": "Identify potential misconfiguration and unusual resolvers. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Analyze DNS network evidence and distinguish suspicious patterns from false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Identify potential misconfiguration and unusual resolvers. Define all terms in your own words; identify source/destination, transport or ser...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 23 - Lesson 3: Resolver anomalies.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Compare example authorized vs unauthorized resolver behavior. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M23-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Analyze DNS network evidence and distinguish suspicious patterns from false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 23 - Lesson 3: Resolver anomalies from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0017-4000-8000-000000000004",
          "slug": "m23-l4-triage-workflow",
          "title": "Module 23 - Lesson 4: Triage workflow",
          "description": "Video instruction presented by Mohd Maaz: \"Detect DNS Beaconing with Splunk  Threat Hunting Tutorial\". Technical focus on m23-l4-triage-workflow: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "xqukCIPQ1wE",
          "videoAttribution": {
            "creator": "Mohd Maaz",
            "platform": "youtube"
          },
          "durationMinutes": 7,
          "order": 4,
          "moduleTitle": "Module 23: DNS Traffic Investigation and Threat Hunting",
          "objectives": [
            "Explain the role of **DNS traffic baseline** in ordinary network behavior.",
            "Demonstrate **Long and encoded labels** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Resolver anomalies** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Triage workflow**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-23",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 23 - Lesson 4: Triage workflow",
            "Network Security Engineering (Mod 23)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 23 - Lesson 4: Triage workflow), follow along with Jeremy's IT Lab (\"Free CCNA | DNS | Day 38 Lab | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 22 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 23 - Lesson 4: Triage workflow",
                "content": "Build a decision tree from a DNS anomaly to next action. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Analyze DNS network evidence and distinguish suspicious patterns from false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Build a decision tree from a DNS anomaly to next action. Define all terms in your own words; identify source/destination, transport or servi...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 23 - Lesson 4: Triage workflow.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Write a concise analyst handoff. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M23-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Analyze DNS network evidence and distinguish suspicious patterns from false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 23 - Lesson 4: Triage workflow from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 23: DNS Traffic Investigation and Threat Hunting Hands-on Implementation",
        "difficulty": "advanced",
        "estimatedMinutes": 90,
        "objective": "Investigate high-volume DNS queries for data exfiltration and C2 beaconing. Calculate domain label entropy, identify DNS tunneling signatures, and build detection filters.",
        "toolsRequired": [
          "Wireshark",
          "Python"
        ],
        "pcapSource": {
          "fileName": "m23-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m23-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b823"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Wireshark & Python within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 23 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t23-1",
            "description": "Initialize lab topology and verify layer connectivity using Wireshark & Python."
          },
          {
            "id": "t23-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 23."
          },
          {
            "id": "t23-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t23-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t23-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 23 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 23.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m23",
        "questions": []
      }
    },
    {
      "id": "e0000000-0018-4000-8000-000000000000",
      "title": "Module 24: Web/TLS/QUIC Traffic Investigation",
      "description": "Advanced level (6\u20138 hours). Prerequisite: Module 23 (recommended); prior prerequisite knowledge may be demonstrated. Investigate web connectivity and suspicious destination behavior using observable metadata. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 24,
      "lessons": [
        {
          "id": "e0000000-0018-4000-8000-000000000001",
          "slug": "m24-l1-web-flow-reconstruction",
          "title": "Module 24 - Lesson 1: Web flow reconstruction",
          "description": "Video instruction presented by Chris Greer: \"Extracting Files from PCAPs with Wireshark // Lesson 9 // Wireshark Tutorial\". Technical focus on reconstructing HTTP and web application sessions from raw packet captures, extracting embedded files, images, and executables, and auditing web transaction headers.",
          "youtubeVideoId": "Fn__yRYW6Wo",
          "videoAttribution": {
            "creator": "Chris Greer",
            "platform": "youtube"
          },
          "durationMinutes": 5,
          "order": 1,
          "moduleTitle": "Module 24: Web/TLS/QUIC Traffic Investigation",
          "objectives": [
            "Explain the role of **Web flow reconstruction** in ordinary network behavior.",
            "Demonstrate **Encrypted metadata** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **QUIC basics** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Incident report**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-24",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 24 - Lesson 1: Web flow reconstruction",
            "Network Security Engineering (Mod 24)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 24 - Lesson 1: Web flow reconstruction), follow along with Pooji SOC Talks (\"Day 8: HTTP Traffic Analysis How SOC Analysts Investigate Suspicious Web Traffic\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 23 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 24 - Lesson 1: Web flow reconstruction",
                "content": "Relate HTTP request evidence to TCP sessions. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Investigate web connectivity and suspicious destination behavior using observable metadata. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Relate HTTP request evidence to TCP sessions. Define all terms in your own words; identify source/destination, transport or service details ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 24 - Lesson 1: Web flow reconstruction.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Reconstruct a plaintext test web exchange from sample PCAP. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M24-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Investigate web connectivity and suspicious destination behavior using observable metadata. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 24 - Lesson 1: Web flow reconstruction from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0018-4000-8000-000000000002",
          "slug": "m24-l2-encrypted-metadata",
          "title": "Module 24 - Lesson 2: Encrypted metadata",
          "description": "Video instruction presented by Security BSides London: \"Visualising TLS Fingerprints With TMAP To Hunt Malicious Domains - Amanda Thomson\". Technical focus on m24-l2-encrypted-metadata: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "v0tgVm-QE9E",
          "videoAttribution": {
            "creator": "Security BSides London",
            "platform": "youtube"
          },
          "durationMinutes": 15,
          "order": 2,
          "moduleTitle": "Module 24: Web/TLS/QUIC Traffic Investigation",
          "objectives": [
            "Explain the role of **Web flow reconstruction** in ordinary network behavior.",
            "Demonstrate **Encrypted metadata** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **QUIC basics** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Incident report**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-24",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 24 - Lesson 2: Encrypted metadata",
            "Network Security Engineering (Mod 24)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 24 - Lesson 2: Encrypted metadata), follow along with Palo Alto Networks Unit 42 (\"Unit 42 Wireshark Workshop Part 5: Introduction to Windows Malware Infections | Unit 42\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 23 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 24 - Lesson 2: Encrypted metadata",
                "content": "Identify server IP, ports and TLS handshake artifacts. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Investigate web connectivity and suspicious destination behavior using observable metadata. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Identify server IP, ports and TLS handshake artifacts. Define all terms in your own words; identify source/destination, transport or service...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 24 - Lesson 2: Encrypted metadata.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Explain what is and is not visible in TLS PCAP. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M24-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Investigate web connectivity and suspicious destination behavior using observable metadata. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 24 - Lesson 2: Encrypted metadata from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0018-4000-8000-000000000003",
          "slug": "m24-l3-quic-basics",
          "title": "Module 24 - Lesson 3: QUIC basics",
          "description": "Video instruction presented by David Bombal: \"Decrypting TLS, HTTP/2 and QUIC with Wireshark\". Technical focus on m24-l3-quic-basics: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.",
          "youtubeVideoId": "yodDbgoCnLM",
          "videoAttribution": {
            "creator": "David Bombal",
            "platform": "youtube"
          },
          "durationMinutes": 28,
          "order": 3,
          "moduleTitle": "Module 24: Web/TLS/QUIC Traffic Investigation",
          "objectives": [
            "Explain the role of **Web flow reconstruction** in ordinary network behavior.",
            "Demonstrate **Encrypted metadata** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **QUIC basics** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Incident report**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-24",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 24 - Lesson 3: QUIC basics",
            "Network Security Engineering (Mod 24)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 24 - Lesson 3: QUIC basics), follow along with David Bombal (\"Decrypting TLS, HTTP/2 and QUIC with Wireshark\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 23 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 24 - Lesson 3: QUIC basics",
                "content": "Recognize UDP/443 and HTTP/3 versus traditional HTTPS. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Investigate web connectivity and suspicious destination behavior using observable metadata. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Recognize UDP/443 and HTTP/3 versus traditional HTTPS. Define all terms in your own words; identify source/destination, transport or service...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 24 - Lesson 3: QUIC basics.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Identify candidate QUIC flows. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M24-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Investigate web connectivity and suspicious destination behavior using observable metadata. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 24 - Lesson 3: QUIC basics from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0018-4000-8000-000000000004",
          "slug": "m24-l4-incident-report",
          "title": "Module 24 - Lesson 4: Incident report",
          "description": "Video instruction presented by Watchman: \"Incident Report Writing (LEARN CYBER SECURITY TODAY!)\". Technical focus on authoring forensic incident response reports, documenting network evidence timelines, presenting packet capture artifacts, and drafting executive defense summaries.",
          "youtubeVideoId": "097y4P80WnI",
          "videoAttribution": {
            "creator": "Watchman",
            "platform": "youtube"
          },
          "durationMinutes": 12,
          "order": 4,
          "moduleTitle": "Module 24: Web/TLS/QUIC Traffic Investigation",
          "objectives": [
            "Explain the role of **Web flow reconstruction** in ordinary network behavior.",
            "Demonstrate **Encrypted metadata** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **QUIC basics** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Incident report**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-24",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 24 - Lesson 4: Incident report",
            "Network Security Engineering (Mod 24)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 24 - Lesson 4: Incident report), follow along with Netsec Explained (\"Advanced Wireshark Network Forensics - Part 2/3\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 23 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 24 - Lesson 4: Incident report",
                "content": "Correlate network events with proxy or endpoint records. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Investigate web connectivity and suspicious destination behavior using observable metadata. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Correlate network events with proxy or endpoint records. Define all terms in your own words; identify source/destination, transport or servi...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 24 - Lesson 4: Incident report.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draft a web incident timeline. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M24-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Investigate web connectivity and suspicious destination behavior using observable metadata. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 24 - Lesson 4: Incident report from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 24: Web/TLS/QUIC Traffic Investigation Hands-on Implementation",
        "difficulty": "advanced",
        "estimatedMinutes": 90,
        "objective": "Perform HTTP/2 stream inspection, analyze TLS SNI hostnames, calculate JA3/JA4 cryptographic client fingerprints, and inspect UDP-based QUIC protocol handshakes.",
        "toolsRequired": [
          "Wireshark"
        ],
        "pcapSource": {
          "fileName": "m24-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m24-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b824"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Wireshark within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 24 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t24-1",
            "description": "Initialize lab topology and verify layer connectivity using Wireshark."
          },
          {
            "id": "t24-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 24."
          },
          {
            "id": "t24-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t24-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t24-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 24 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 24.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m24",
        "questions": []
      }
    },
    {
      "id": "e0000000-0019-4000-8000-000000000000",
      "title": "Module 25: Syslog, NetFlow/IPFIX and Network Telemetry",
      "description": "Advanced level (6\u20138 hours). Prerequisite: Module 24 (recommended); prior prerequisite knowledge may be demonstrated. Correlate network metadata logs and distinguish full packets from flow summaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 25,
      "lessons": [
        {
          "id": "e0000000-0019-4000-8000-000000000001",
          "slug": "m25-l1-telemetry-sources",
          "title": "Module 25 - Lesson 1: Telemetry sources",
          "description": "Video instruction presented by TechSky - Ethical Hacking: \"How to Monitor Network Traffic (SOC Analyst Lab with TShark, Zeek & Suricata)\". Technical focus on enterprise network telemetry data sources, comparing full packet capture (PCAP) with flow metadata, proxy logs, firewall events, and endpoint telemetry.",
          "youtubeVideoId": "JSP-yOBRbrg",
          "videoAttribution": {
            "creator": "TechSky - Ethical Hacking",
            "platform": "youtube"
          },
          "durationMinutes": 34,
          "order": 1,
          "moduleTitle": "Module 25: Syslog, NetFlow/IPFIX and Network Telemetry",
          "objectives": [
            "Explain the role of **Telemetry sources** in ordinary network behavior.",
            "Demonstrate **Syslog fields** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Flow records** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Correlation basics**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-25",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 25 - Lesson 1: Telemetry sources",
            "Network Security Engineering (Mod 25)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 25 - Lesson 1: Telemetry sources), follow along with TechSky - Ethical Hacking (\"How to Monitor Network Traffic (SOC Analyst Lab with TShark, Zeek & Suricata)\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 24 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 25 - Lesson 1: Telemetry sources",
                "content": "Compare PCAP, firewall, proxy, DNS and flow logs. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Correlate network metadata logs and distinguish full packets from flow summaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Compare PCAP, firewall, proxy, DNS and flow logs. Define all terms in your own words; identify source/destination, transport or service deta...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 25 - Lesson 1: Telemetry sources.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Build a network evidence source map. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M25-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Correlate network metadata logs and distinguish full packets from flow summaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 25 - Lesson 1: Telemetry sources from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Zeek official documentation",
                "url": "https://docs.zeek.org/en/current/"
              },
              {
                "title": "Suricata official Learning Library",
                "url": "https://suricata.io/learn/learning-library/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0019-4000-8000-000000000002",
          "slug": "m25-l2-syslog-fields",
          "title": "Module 25 - Lesson 2: Syslog fields",
          "description": "Video instruction presented by Jeremy's IT Lab: \"Free CCNA | Syslog | Day 41 | CCNA 200-301 Complete Course\". Technical focus on Syslog protocol standards (RFC 3164 / RFC 5424), facility and severity levels (0-7), message structure formatting, and secure TLS syslog transport.",
          "youtubeVideoId": "RaQPSKQ4J5A",
          "videoAttribution": {
            "creator": "Jeremy's IT Lab",
            "platform": "youtube"
          },
          "durationMinutes": 28,
          "order": 2,
          "moduleTitle": "Module 25: Syslog, NetFlow/IPFIX and Network Telemetry",
          "objectives": [
            "Explain the role of **Telemetry sources** in ordinary network behavior.",
            "Demonstrate **Syslog fields** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Flow records** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Correlation basics**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-25",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 25 - Lesson 2: Syslog fields",
            "Network Security Engineering (Mod 25)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 25 - Lesson 2: Syslog fields), follow along with Jeremy's IT Lab (\"Free CCNA | Syslog | Day 41 | CCNA 200-301 Complete Course\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 24 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 25 - Lesson 2: Syslog fields",
                "content": "Interpret facility, severity, timestamp, hostname and message. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Correlate network metadata logs and distinguish full packets from flow summaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Interpret facility, severity, timestamp, hostname and message. Define all terms in your own words; identify source/destination, transport or...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 25 - Lesson 2: Syslog fields.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Normalize five mock syslog records. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M25-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Correlate network metadata logs and distinguish full packets from flow summaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 25 - Lesson 2: Syslog fields from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Zeek official documentation",
                "url": "https://docs.zeek.org/en/current/"
              },
              {
                "title": "Suricata official Learning Library",
                "url": "https://suricata.io/learn/learning-library/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0019-4000-8000-000000000003",
          "slug": "m25-l3-flow-records",
          "title": "Module 25 - Lesson 3: Flow records",
          "description": "Video instruction presented by TrainerTests: \"NetFlow & IPFIX Explained: Troubleshooting Networks with Flow Data (Networking Basics)\". Technical focus on NetFlow v5/v9, IPFIX, and sFlow architectures, flow cache generation, unidirectional session tracking, and bandwidth utilization telemetry.",
          "youtubeVideoId": "lL7xRH_BpHU",
          "videoAttribution": {
            "creator": "TrainerTests",
            "platform": "youtube"
          },
          "durationMinutes": 6,
          "order": 3,
          "moduleTitle": "Module 25: Syslog, NetFlow/IPFIX and Network Telemetry",
          "objectives": [
            "Explain the role of **Telemetry sources** in ordinary network behavior.",
            "Demonstrate **Syslog fields** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Flow records** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Correlation basics**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-25",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 25 - Lesson 3: Flow records",
            "Network Security Engineering (Mod 25)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 25 - Lesson 3: Flow records), follow along with TrainerTests (\"NetFlow & IPFIX Explained: Troubleshooting Networks with Flow Data (Networking Basics)\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 24 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 25 - Lesson 3: Flow records",
                "content": "Recognize 5-tuples, bytes, packets, start/end and exporter. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Correlate network metadata logs and distinguish full packets from flow summaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Recognize 5-tuples, bytes, packets, start/end and exporter. Define all terms in your own words; identify source/destination, transport or se...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 25 - Lesson 3: Flow records.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Analyze sample flow data for unusual volume. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M25-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Correlate network metadata logs and distinguish full packets from flow summaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 25 - Lesson 3: Flow records from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Zeek official documentation",
                "url": "https://docs.zeek.org/en/current/"
              },
              {
                "title": "Suricata official Learning Library",
                "url": "https://suricata.io/learn/learning-library/"
              }
            ]
          }
        },
        {
          "id": "e0000000-0019-4000-8000-000000000004",
          "slug": "m25-l4-correlation-basics",
          "title": "Module 25 - Lesson 4: Correlation basics",
          "description": "Video instruction presented by CyberWarFare Labs : \"Log Correlation & Attack Mapping: A SOC Analyst\u2019s Playbook | Free Live Cybersecurity Workshop 2026\". Technical focus on cross-telemetry event correlation in modern SIEM systems, joining firewall drops, IDS alerts, and flow logs to trace multi-stage attack paths.",
          "youtubeVideoId": "h2KfYmACu2s",
          "videoAttribution": {
            "creator": "CyberWarFare Labs ",
            "platform": "youtube"
          },
          "durationMinutes": 74,
          "order": 4,
          "moduleTitle": "Module 25: Syslog, NetFlow/IPFIX and Network Telemetry",
          "objectives": [
            "Explain the role of **Telemetry sources** in ordinary network behavior.",
            "Demonstrate **Syslog fields** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Flow records** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Correlation basics**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-25",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 25 - Lesson 4: Correlation basics",
            "Network Security Engineering (Mod 25)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 25 - Lesson 4: Correlation basics), follow along with Network Direction (\"Sending Logs to a Syslog Server | Network Fundamentals Part 23\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 24 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 25 - Lesson 4: Correlation basics",
                "content": "Explain clock synchronization and NAT effects. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Correlate network metadata logs and distinguish full packets from flow summaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain clock synchronization and NAT effects. Define all terms in your own words; identify source/destination, transport or service details...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 25 - Lesson 4: Correlation basics.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Correlate network alert and flow record on same connection. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M25-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Correlate network metadata logs and distinguish full packets from flow summaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 25 - Lesson 4: Correlation basics from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Zeek official documentation",
                "url": "https://docs.zeek.org/en/current/"
              },
              {
                "title": "Suricata official Learning Library",
                "url": "https://suricata.io/learn/learning-library/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 25: Syslog, NetFlow/IPFIX and Network Telemetry Hands-on Implementation",
        "difficulty": "advanced",
        "estimatedMinutes": 90,
        "objective": "Configure router NetFlow v9 export. Parse flow tuples (Src IP, Dst IP, Src Port, Dst Port, Proto, Bytes, Packets) and correlate flow records with centralized syslog events.",
        "toolsRequired": [
          "Syslog",
          "Flow Analyzer"
        ],
        "pcapSource": {
          "fileName": "m25-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m25-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b825"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Syslog & Flow Analyzer within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 25 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t25-1",
            "description": "Initialize lab topology and verify layer connectivity using Syslog & Flow Analyzer."
          },
          {
            "id": "t25-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 25."
          },
          {
            "id": "t25-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t25-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t25-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 25 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 25.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m25",
        "questions": []
      }
    },
    {
      "id": "e0000000-001a-4000-8000-000000000000",
      "title": "Module 26: Zeek Network Security Monitoring",
      "description": "Advanced level (6\u20138 hours). Prerequisite: Module 25 (recommended); prior prerequisite knowledge may be demonstrated. Read Zeek connection, DNS, HTTP and SSL/TLS logs for network investigations. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 26,
      "lessons": [
        {
          "id": "e0000000-001a-4000-8000-000000000001",
          "slug": "m26-l1-zeek-architecture",
          "title": "Module 26 - Lesson 1: Zeek architecture",
          "description": "Video instruction presented by Hank Hackerson: \"SOC Lvl 1 / EP.16a / Zeek Tutorial Pt.1 / Security Analyst Training\". Technical focus on Zeek (formerly Bro) network security monitoring architecture, event engine parsing, policy script interpreter, and automated protocol dissection.",
          "youtubeVideoId": "e1cwKwshC9I",
          "videoAttribution": {
            "creator": "Hank Hackerson",
            "platform": "youtube"
          },
          "durationMinutes": 52,
          "order": 1,
          "moduleTitle": "Module 26: Zeek Network Security Monitoring",
          "objectives": [
            "Explain the role of **Zeek architecture** in ordinary network behavior.",
            "Demonstrate **conn.log basics** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Protocol logs** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Hunting logic**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-26",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 26 - Lesson 1: Zeek architecture",
            "Network Security Engineering (Mod 26)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 26 - Lesson 1: Zeek architecture), follow along with Hank Hackerson (\"SOC Lvl 1 / EP.16a / Zeek Tutorial Pt.1 / Security Analyst Training\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 25 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 26 - Lesson 1: Zeek architecture",
                "content": "Explain passive monitoring and event/log production. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Read Zeek connection, DNS, HTTP and SSL/TLS logs for network investigations. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain passive monitoring and event/log production. Define all terms in your own words; identify source/destination, transport or service d...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 26 - Lesson 1: Zeek architecture.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Map sensor placement in a network diagram. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M26-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Read Zeek connection, DNS, HTTP and SSL/TLS logs for network investigations. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 26 - Lesson 1: Zeek architecture from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Zeek official documentation",
                "url": "https://docs.zeek.org/en/current/"
              },
              {
                "title": "Zeek interactive training",
                "url": "https://try.zeek.org/"
              }
            ]
          }
        },
        {
          "id": "e0000000-001a-4000-8000-000000000002",
          "slug": "m26-l2-conn-log-basics",
          "title": "Module 26 - Lesson 2: conn.log basics",
          "description": "Video instruction presented by John Hubbard: \"12 Days of Defense - Day 2: How to use Zeek for PCAP Analysis\". Technical focus on Zeek `conn.log` forensic fields, analyzing connection duration, byte counters (orig/resp bytes), connection state history flags (SF, S0, REJ, RSTO), and session triage.",
          "youtubeVideoId": "bznH1yMyjjo",
          "videoAttribution": {
            "creator": "John Hubbard",
            "platform": "youtube"
          },
          "durationMinutes": 13,
          "order": 2,
          "moduleTitle": "Module 26: Zeek Network Security Monitoring",
          "objectives": [
            "Explain the role of **Zeek architecture** in ordinary network behavior.",
            "Demonstrate **conn.log basics** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Protocol logs** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Hunting logic**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-26",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 26 - Lesson 2: conn.log basics",
            "Network Security Engineering (Mod 26)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 26 - Lesson 2: conn.log basics), follow along with John Hubbard (\"12 Days of Defense - Day 2: How to use Zeek for PCAP Analysis\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 25 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 26 - Lesson 2: conn.log basics",
                "content": "Read uid, id.orig_h, id.resp_h, ports, service and duration. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Read Zeek connection, DNS, HTTP and SSL/TLS logs for network investigations. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Read uid, id.orig_h, id.resp_h, ports, service and duration. Define all terms in your own words; identify source/destination, transport or s...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 26 - Lesson 2: conn.log basics.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Parse a five-tuple from a sample conn.log. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M26-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Read Zeek connection, DNS, HTTP and SSL/TLS logs for network investigations. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 26 - Lesson 2: conn.log basics from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Zeek official documentation",
                "url": "https://docs.zeek.org/en/current/"
              },
              {
                "title": "Zeek interactive training",
                "url": "https://try.zeek.org/"
              }
            ]
          }
        },
        {
          "id": "e0000000-001a-4000-8000-000000000003",
          "slug": "m26-l3-protocol-logs",
          "title": "Module 26 - Lesson 3: Protocol logs",
          "description": "Video instruction presented by Threat Hunter's Daily: \"Introduction to Zeek network security monitoring, conn.log and pivoting with Zeek UIDs\". Technical focus on Zeek protocol log correlation, inspecting `http.log`, `dns.log`, `ssl.log`, and `files.log`, tracking file SHA-256 hashes, and pivoting on unique connection UIDs.",
          "youtubeVideoId": "-eLI0_OCEmk",
          "videoAttribution": {
            "creator": "Threat Hunter's Daily",
            "platform": "youtube"
          },
          "durationMinutes": 18,
          "order": 3,
          "moduleTitle": "Module 26: Zeek Network Security Monitoring",
          "objectives": [
            "Explain the role of **Zeek architecture** in ordinary network behavior.",
            "Demonstrate **conn.log basics** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Protocol logs** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Hunting logic**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-26",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 26 - Lesson 3: Protocol logs",
            "Network Security Engineering (Mod 26)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 26 - Lesson 3: Protocol logs), follow along with Threat Hunter's Daily (\"Introduction to Zeek network security monitoring, conn.log and pivoting with Zeek UIDs\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 25 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 26 - Lesson 3: Protocol logs",
                "content": "Correlate dns.log, http.log and ssl.log using identifiers. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Read Zeek connection, DNS, HTTP and SSL/TLS logs for network investigations. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Correlate dns.log, http.log and ssl.log using identifiers. Define all terms in your own words; identify source/destination, transport or ser...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 26 - Lesson 3: Protocol logs.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Reconstruct a single sample client flow. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M26-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Read Zeek connection, DNS, HTTP and SSL/TLS logs for network investigations. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 26 - Lesson 3: Protocol logs from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Zeek official documentation",
                "url": "https://docs.zeek.org/en/current/"
              },
              {
                "title": "Zeek interactive training",
                "url": "https://try.zeek.org/"
              }
            ]
          }
        },
        {
          "id": "e0000000-001a-4000-8000-000000000004",
          "slug": "m26-l4-hunting-logic",
          "title": "Module 26 - Lesson 4: Hunting logic",
          "description": "Video instruction presented by Rajneesh Gupta: \"Splunk Basics: Zeek Connection Log Analysis\". Technical focus on threat hunting with Zeek logs, writing custom Zeek scripts for behavioral anomaly detection, and querying Zeek telemetry in Splunk or ELK.",
          "youtubeVideoId": "Uvb2R8W0E-I",
          "videoAttribution": {
            "creator": "Rajneesh Gupta",
            "platform": "youtube"
          },
          "durationMinutes": 7,
          "order": 4,
          "moduleTitle": "Module 26: Zeek Network Security Monitoring",
          "objectives": [
            "Explain the role of **Zeek architecture** in ordinary network behavior.",
            "Demonstrate **conn.log basics** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Protocol logs** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Hunting logic**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-26",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 26 - Lesson 4: Hunting logic",
            "Network Security Engineering (Mod 26)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 26 - Lesson 4: Hunting logic), follow along with Rajneesh Gupta (\"Splunk Basics: Zeek Connection Log Analysis\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 25 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 26 - Lesson 4: Hunting logic",
                "content": "Use Zeek data to prioritize suspicious behavior. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Read Zeek connection, DNS, HTTP and SSL/TLS logs for network investigations. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Use Zeek data to prioritize suspicious behavior. Define all terms in your own words; identify source/destination, transport or service detai...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 26 - Lesson 4: Hunting logic.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Write a hypothesis and validation steps. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M26-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Read Zeek connection, DNS, HTTP and SSL/TLS logs for network investigations. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 26 - Lesson 4: Hunting logic from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Zeek official documentation",
                "url": "https://docs.zeek.org/en/current/"
              },
              {
                "title": "Zeek interactive training",
                "url": "https://try.zeek.org/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 26: Zeek Network Security Monitoring Hands-on Implementation",
        "difficulty": "advanced",
        "estimatedMinutes": 90,
        "objective": "Run Zeek against raw PCAP files. Dissect conn.log, dns.log, http.log, and ssl.log. Pivot across logs using unique connection UIDs to trace attacker lateral movement.",
        "toolsRequired": [
          "Zeek (Bro)",
          "Linux"
        ],
        "pcapSource": {
          "fileName": "m26-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m26-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b826"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Zeek (Bro) & Linux within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 26 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t26-1",
            "description": "Initialize lab topology and verify layer connectivity using Zeek (Bro) & Linux."
          },
          {
            "id": "t26-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 26."
          },
          {
            "id": "t26-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t26-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t26-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 26 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 26.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m26",
        "questions": []
      }
    },
    {
      "id": "e0000000-001b-4000-8000-000000000000",
      "title": "Module 27: Suricata IDS/IPS, Rules and Alert Triage",
      "description": "Advanced level (6\u20138 hours). Prerequisite: Module 26 (recommended); prior prerequisite knowledge may be demonstrated. Interpret network IDS alerts, understand signatures and reduce false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 27,
      "lessons": [
        {
          "id": "e0000000-001b-4000-8000-000000000001",
          "slug": "m27-l1-ids-vs-ips",
          "title": "Module 27 - Lesson 1: IDS vs IPS",
          "description": "Video instruction presented by HackerSploit: \"Introduction To Suricata IDS\". Technical focus on Suricata multi-threaded network threat detection engine, inspecting packet acquisition modules (AF_PACKET, PF_RING), and inline IPS drop capabilities.",
          "youtubeVideoId": "91i7InHVOso",
          "videoAttribution": {
            "creator": "HackerSploit",
            "platform": "youtube"
          },
          "durationMinutes": 11,
          "order": 1,
          "moduleTitle": "Module 27: Suricata IDS/IPS, Rules and Alert Triage",
          "objectives": [
            "Explain the role of **IDS vs IPS** in ordinary network behavior.",
            "Demonstrate **Rule anatomy** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **eve.json events** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Alert validation**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-27",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 27 - Lesson 1: IDS vs IPS",
            "Network Security Engineering (Mod 27)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 27 - Lesson 1: IDS vs IPS), follow along with HackerSploit (\"Introduction To Suricata IDS\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 26 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 27 - Lesson 1: IDS vs IPS",
                "content": "Explain out-of-band observation versus inline blocking. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret network IDS alerts, understand signatures and reduce false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain out-of-band observation versus inline blocking. Define all terms in your own words; identify source/destination, transport or servic...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 27 - Lesson 1: IDS vs IPS.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Diagram safe monitoring deployment. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M27-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret network IDS alerts, understand signatures and reduce false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 27 - Lesson 1: IDS vs IPS from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Suricata official Learning Library",
                "url": "https://suricata.io/learn/learning-library/"
              },
              {
                "title": "Suricata documentation",
                "url": "https://docs.suricata.io/en/latest/"
              }
            ]
          }
        },
        {
          "id": "e0000000-001b-4000-8000-000000000002",
          "slug": "m27-l2-rule-anatomy",
          "title": "Module 27 - Lesson 2: Rule anatomy",
          "description": "Video instruction presented by Insane Cyber: \"Writing Suricata Rules: Understanding The Basic Rule Format\". Technical focus on Suricata rule syntax anatomy, action keywords (alert/drop/pass), protocol definitions, direction operators, and content matching keywords (`uricontent`, `pcre`, `classtype`).",
          "youtubeVideoId": "d-t-8lJ2PII",
          "videoAttribution": {
            "creator": "Insane Cyber",
            "platform": "youtube"
          },
          "durationMinutes": 17,
          "order": 2,
          "moduleTitle": "Module 27: Suricata IDS/IPS, Rules and Alert Triage",
          "objectives": [
            "Explain the role of **IDS vs IPS** in ordinary network behavior.",
            "Demonstrate **Rule anatomy** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **eve.json events** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Alert validation**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-27",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 27 - Lesson 2: Rule anatomy",
            "Network Security Engineering (Mod 27)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 27 - Lesson 2: Rule anatomy), follow along with Insane Cyber (\"Writing Suricata Rules: Understanding The Basic Rule Format\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 26 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 27 - Lesson 2: Rule anatomy",
                "content": "Identify action, protocol, direction, ports and options. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret network IDS alerts, understand signatures and reduce false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Identify action, protocol, direction, ports and options. Define all terms in your own words; identify source/destination, transport or servi...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 27 - Lesson 2: Rule anatomy.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Annotate a harmless sample rule. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M27-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret network IDS alerts, understand signatures and reduce false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 27 - Lesson 2: Rule anatomy from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Suricata official Learning Library",
                "url": "https://suricata.io/learn/learning-library/"
              },
              {
                "title": "Suricata documentation",
                "url": "https://docs.suricata.io/en/latest/"
              }
            ]
          }
        },
        {
          "id": "e0000000-001b-4000-8000-000000000003",
          "slug": "m27-l3-eve-json-events",
          "title": "Module 27 - Lesson 3: eve.json events",
          "description": "Video instruction presented by Maurice Gardner: \"Examine alerts, logs, and rules with Suricata\". Technical focus on Suricata `eve.json` unified event logging, parsing alert payloads, metadata tags, flow records, and streaming eve events to SIEM pipelines.",
          "youtubeVideoId": "zUqHTf-jjeA",
          "videoAttribution": {
            "creator": "Maurice Gardner",
            "platform": "youtube"
          },
          "durationMinutes": 20,
          "order": 3,
          "moduleTitle": "Module 27: Suricata IDS/IPS, Rules and Alert Triage",
          "objectives": [
            "Explain the role of **IDS vs IPS** in ordinary network behavior.",
            "Demonstrate **Rule anatomy** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **eve.json events** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Alert validation**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-27",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 27 - Lesson 3: eve.json events",
            "Network Security Engineering (Mod 27)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 27 - Lesson 3: eve.json events), follow along with Maurice Gardner (\"Examine alerts, logs, and rules with Suricata\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 26 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 27 - Lesson 3: eve.json events",
                "content": "Read alert signatures, 5-tuple and flow metadata. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret network IDS alerts, understand signatures and reduce false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Read alert signatures, 5-tuple and flow metadata. Define all terms in your own words; identify source/destination, transport or service deta...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 27 - Lesson 3: eve.json events.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Inspect a sample benign Suricata alert. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M27-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret network IDS alerts, understand signatures and reduce false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 27 - Lesson 3: eve.json events from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Suricata official Learning Library",
                "url": "https://suricata.io/learn/learning-library/"
              },
              {
                "title": "Suricata documentation",
                "url": "https://docs.suricata.io/en/latest/"
              }
            ]
          }
        },
        {
          "id": "e0000000-001b-4000-8000-000000000004",
          "slug": "m27-l4-alert-validation",
          "title": "Module 27 - Lesson 4: Alert validation",
          "description": "Video instruction presented by SharkFest Wireshark Developer and User Conference: \"SF20V - 18 Intrusion Analysis and Threat Hunting with Suricata (Josh Stroschein/Jack Mott)\". Technical focus on Suricata intrusion alert triage, correlating eve.json alert records with raw packet captures in Wireshark, validating true positive exploits, and tuning detection signatures to eliminate false-positive alert fatigue.",
          "youtubeVideoId": "0WgyiOxCFzE",
          "videoAttribution": {
            "creator": "SharkFest Wireshark Developer and User Conference",
            "platform": "youtube"
          },
          "durationMinutes": 75,
          "order": 4,
          "moduleTitle": "Module 27: Suricata IDS/IPS, Rules and Alert Triage",
          "objectives": [
            "Explain the role of **IDS vs IPS** in ordinary network behavior.",
            "Demonstrate **Rule anatomy** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **eve.json events** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Alert validation**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-27",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 27 - Lesson 4: Alert validation",
            "Network Security Engineering (Mod 27)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 27 - Lesson 4: Alert validation), follow along with The Cyber Initiative Zone (\"Google Cybersec Lab Project; Examine Alerts, logs, and rules with Suricata in Linux\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 26 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 27 - Lesson 4: Alert validation",
                "content": "Link an IDS alert to the underlying PCAP and business context. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret network IDS alerts, understand signatures and reduce false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Link an IDS alert to the underlying PCAP and business context. Define all terms in your own words; identify source/destination, transport or...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 27 - Lesson 4: Alert validation.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Write a false-positive decision memo. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M27-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret network IDS alerts, understand signatures and reduce false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 27 - Lesson 4: Alert validation from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Suricata official Learning Library",
                "url": "https://suricata.io/learn/learning-library/"
              },
              {
                "title": "Suricata documentation",
                "url": "https://docs.suricata.io/en/latest/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 27: Suricata IDS/IPS, Rules and Alert Triage Hands-on Implementation",
        "difficulty": "advanced",
        "estimatedMinutes": 90,
        "objective": "Run Suricata against intrusion PCAPs. Author custom Suricata detection signatures, parse eve.json alert records, and validate alerts against packet payload evidence.",
        "toolsRequired": [
          "Suricata",
          "eve.json"
        ],
        "pcapSource": {
          "fileName": "m27-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m27-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b827"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Suricata & eve.json within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 27 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t27-1",
            "description": "Initialize lab topology and verify layer connectivity using Suricata & eve.json."
          },
          {
            "id": "t27-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 27."
          },
          {
            "id": "t27-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t27-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t27-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 27 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 27.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m27",
        "questions": []
      }
    },
    {
      "id": "e0000000-001c-4000-8000-000000000000",
      "title": "Module 28: Network Discovery with Nmap \u2014 Authorized Labs",
      "description": "Advanced level (6\u20138 hours). Prerequisite: Module 27 (recommended); prior prerequisite knowledge may be demonstrated. Inventory owned systems and interpret TCP/UDP scanning results and their detection traces. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 28,
      "lessons": [
        {
          "id": "e0000000-001c-4000-8000-000000000001",
          "slug": "m28-l1-discovery-basics",
          "title": "Module 28 - Lesson 1: Discovery basics",
          "description": "Video instruction presented by Chris Greer: \"Getting Started with Nmap - Full Course with @davidbombal!!\". Technical focus on network reconnaissance fundamentals, passive OSINT gathering versus active network scanning, ARP sweeps, and ICMP host discovery with Nmap.",
          "youtubeVideoId": "2rRSDGNo_Uo",
          "videoAttribution": {
            "creator": "Chris Greer",
            "platform": "youtube"
          },
          "durationMinutes": 6,
          "order": 1,
          "moduleTitle": "Module 28: Network Discovery with Nmap \u2014 Authorized Labs",
          "objectives": [
            "Explain the role of **Discovery basics** in ordinary network behavior.",
            "Demonstrate **Port state interpretation** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Service identification** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Defensive visibility**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-28",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 28 - Lesson 1: Discovery basics",
            "Network Security Engineering (Mod 28)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 28 - Lesson 1: Discovery basics), follow along with Chris Greer (\"Getting Started with Nmap - Full Course with @davidbombal!!\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 27 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 28 - Lesson 1: Discovery basics",
                "content": "Understand host discovery and scan scope permissions. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Inventory owned systems and interpret TCP/UDP scanning results and their detection traces. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Understand host discovery and scan scope permissions. Define all terms in your own words; identify source/destination, transport or service ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 28 - Lesson 1: Discovery basics.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Write a scan authorization and in-scope IP checklist. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M28-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Inventory owned systems and interpret TCP/UDP scanning results and their detection traces. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 28 - Lesson 1: Discovery basics from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Nmap official reference guide",
                "url": "https://nmap.org/book/man.html"
              }
            ]
          }
        },
        {
          "id": "e0000000-001c-4000-8000-000000000002",
          "slug": "m28-l2-port-state-interpretation",
          "title": "Module 28 - Lesson 2: Port state interpretation",
          "description": "Video instruction presented by HackerSploit: \"Nmap Tutorial For Beginners - 2 - Advanced Scanning\". Technical focus on Nmap port scanning mechanics, interpreting port states (Open, Closed, Filtered, Unfiltered), and analyzing SYN scan (`-sS`) versus TCP Connect (`-sT`) packet responses.",
          "youtubeVideoId": "VFJLMOk6daQ",
          "videoAttribution": {
            "creator": "HackerSploit",
            "platform": "youtube"
          },
          "durationMinutes": 10,
          "order": 2,
          "moduleTitle": "Module 28: Network Discovery with Nmap \u2014 Authorized Labs",
          "objectives": [
            "Explain the role of **Discovery basics** in ordinary network behavior.",
            "Demonstrate **Port state interpretation** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Service identification** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Defensive visibility**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-28",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 28 - Lesson 2: Port state interpretation",
            "Network Security Engineering (Mod 28)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 28 - Lesson 2: Port state interpretation), follow along with ACW360 (\"Part 7 Version Detection & OS Fingerprinting: -sV & -O\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 27 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 28 - Lesson 2: Port state interpretation",
                "content": "Differentiate open, closed and filtered results. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Inventory owned systems and interpret TCP/UDP scanning results and their detection traces. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Differentiate open, closed and filtered results. Define all terms in your own words; identify source/destination, transport or service detai...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 28 - Lesson 2: Port state interpretation.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Run a small authorized scan on localhost/host-only VM. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M28-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Inventory owned systems and interpret TCP/UDP scanning results and their detection traces. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 28 - Lesson 2: Port state interpretation from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Nmap official reference guide",
                "url": "https://nmap.org/book/man.html"
              }
            ]
          }
        },
        {
          "id": "e0000000-001c-4000-8000-000000000003",
          "slug": "m28-l3-service-identification",
          "title": "Module 28 - Lesson 3: Service identification",
          "description": "Video instruction presented by ACW360: \"Part 7 \u2014 Version Detection & OS Fingerprinting: -sV & -O\". Technical focus on active service version probing (`-sV`) and OS fingerprinting (`-O`), evaluating banner grabbing probes, and identifying vulnerable application versions.",
          "youtubeVideoId": "j3H7O-hBrI0",
          "videoAttribution": {
            "creator": "ACW360",
            "platform": "youtube"
          },
          "durationMinutes": 4,
          "order": 3,
          "moduleTitle": "Module 28: Network Discovery with Nmap \u2014 Authorized Labs",
          "objectives": [
            "Explain the role of **Discovery basics** in ordinary network behavior.",
            "Demonstrate **Port state interpretation** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Service identification** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Defensive visibility**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-28",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 28 - Lesson 3: Service identification",
            "Network Security Engineering (Mod 28)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 28 - Lesson 3: Service identification), follow along with Chris Greer (\"How OS Fingerprinting Works // NMAP Tutorial\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 27 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 28 - Lesson 3: Service identification",
                "content": "Understand version-detection caveats. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Inventory owned systems and interpret TCP/UDP scanning results and their detection traces. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Understand version-detection caveats. Define all terms in your own words; identify source/destination, transport or service details where re...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 28 - Lesson 3: Service identification.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Cross-check scan findings with host process inventory. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M28-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Inventory owned systems and interpret TCP/UDP scanning results and their detection traces. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 28 - Lesson 3: Service identification from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Nmap official reference guide",
                "url": "https://nmap.org/book/man.html"
              }
            ]
          }
        },
        {
          "id": "e0000000-001c-4000-8000-000000000004",
          "slug": "m28-l4-defensive-visibility",
          "title": "Module 28 - Lesson 4: Defensive visibility",
          "description": "Video instruction presented by Plaintext Packets: \"How NMAP Works and How to Detect Port Scans in Wireshark\". Technical focus on detecting Nmap reconnaissance from the defensive perspective, identifying scanning footprints in Wireshark, and configuring firewall rate limiting to thwart reconnaissance.",
          "youtubeVideoId": "Maec4f2gt2c",
          "videoAttribution": {
            "creator": "Plaintext Packets",
            "platform": "youtube"
          },
          "durationMinutes": 37,
          "order": 4,
          "moduleTitle": "Module 28: Network Discovery with Nmap \u2014 Authorized Labs",
          "objectives": [
            "Explain the role of **Discovery basics** in ordinary network behavior.",
            "Demonstrate **Port state interpretation** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Service identification** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Defensive visibility**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-28",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 28 - Lesson 4: Defensive visibility",
            "Network Security Engineering (Mod 28)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 28 - Lesson 4: Defensive visibility), follow along with David Bombal (\"Networking for Hackers and Cybersecurity professionals (How long until you learn something new?)\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 27 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 28 - Lesson 4: Defensive visibility",
                "content": "Explain how scans appear in packet and firewall evidence. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Inventory owned systems and interpret TCP/UDP scanning results and their detection traces. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain how scans appear in packet and firewall evidence. Define all terms in your own words; identify source/destination, transport or serv...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 28 - Lesson 4: Defensive visibility.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Inspect a PCAP of your own scan. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M28-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Inventory owned systems and interpret TCP/UDP scanning results and their detection traces. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 28 - Lesson 4: Defensive visibility from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Nmap official reference guide",
                "url": "https://nmap.org/book/man.html"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 28: Network Discovery with Nmap \u2014 Authorized Labs Hands-on Implementation",
        "difficulty": "advanced",
        "estimatedMinutes": 90,
        "objective": "Execute authorized TCP SYN (-sS), Version (-sV), and OS detection (-O) scans against host-only targets. Analyze Nmap packet signatures in Wireshark and differentiate port states.",
        "toolsRequired": [
          "Nmap",
          "Wireshark"
        ],
        "pcapSource": {
          "fileName": "m28-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m28-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b828"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Nmap & Wireshark within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 28 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t28-1",
            "description": "Initialize lab topology and verify layer connectivity using Nmap & Wireshark."
          },
          {
            "id": "t28-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 28."
          },
          {
            "id": "t28-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t28-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t28-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 28 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 28.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m28",
        "questions": []
      }
    },
    {
      "id": "e0000000-001d-4000-8000-000000000000",
      "title": "Module 29: Cloud Networking, VPCs and Security Groups",
      "description": "Advanced level (6\u20138 hours). Prerequisite: Module 28 (recommended); prior prerequisite knowledge may be demonstrated. Interpret cloud virtual networking and common misconfiguration risks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 29,
      "lessons": [
        {
          "id": "e0000000-001d-4000-8000-000000000001",
          "slug": "m29-l1-virtual-networks",
          "title": "Module 29 - Lesson 1: Virtual networks",
          "description": "Video instruction presented by Tiny Technical Tutorials: \"Amazon/AWS VPC (Virtual Private Cloud) Basics | VPC Tutorial | AWS for Beginners\". Technical focus on Cloud Virtual Private Cloud (VPC) architecture, software-defined networking (SDN) overlays, overlay encapsulation (VXLAN/GENEVE), and multi-tenant isolation.",
          "youtubeVideoId": "7_NNlnH7sAg",
          "videoAttribution": {
            "creator": "Tiny Technical Tutorials",
            "platform": "youtube"
          },
          "durationMinutes": 10,
          "order": 1,
          "moduleTitle": "Module 29: Cloud Networking, VPCs and Security Groups",
          "objectives": [
            "Explain the role of **Virtual networks** in ordinary network behavior.",
            "Demonstrate **Ingress and egress** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Security groups and ACLs** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Cloud network evidence**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-29",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 29 - Lesson 1: Virtual networks",
            "Network Security Engineering (Mod 29)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 29 - Lesson 1: Virtual networks), follow along with Tiny Technical Tutorials (\"Amazon/AWS VPC (Virtual Private Cloud) Basics | VPC Tutorial | AWS for Beginners\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 28 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 29 - Lesson 1: Virtual networks",
                "content": "Distinguish VPC/VNet, CIDR, subnet and route tables. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret cloud virtual networking and common misconfiguration risks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Distinguish VPC/VNet, CIDR, subnet and route tables. Define all terms in your own words; identify source/destination, transport or service d...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 29 - Lesson 1: Virtual networks.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draw a cloud network with private and public zones. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M29-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret cloud virtual networking and common misconfiguration risks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 29 - Lesson 1: Virtual networks from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "AWS VPC documentation",
                "url": "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-001d-4000-8000-000000000002",
          "slug": "m29-l2-ingress-and-egress",
          "title": "Module 29 - Lesson 2: Ingress and egress",
          "description": "Video instruction presented by KnoDAX: \"AWS VPC Routing | VPC Routing Tutorial | Understanding Route Tables, Internet Gateway, and Subnets\". Technical focus on cloud network ingress and egress traffic control, routing tables, Internet Gateways (IGW), NAT Gateways, and managing perimeter cloud egress points.",
          "youtubeVideoId": "ksJWwkG_p4M",
          "videoAttribution": {
            "creator": "KnoDAX",
            "platform": "youtube"
          },
          "durationMinutes": 9,
          "order": 2,
          "moduleTitle": "Module 29: Cloud Networking, VPCs and Security Groups",
          "objectives": [
            "Explain the role of **Virtual networks** in ordinary network behavior.",
            "Demonstrate **Ingress and egress** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Security groups and ACLs** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Cloud network evidence**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-29",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 29 - Lesson 2: Ingress and egress",
            "Network Security Engineering (Mod 29)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 29 - Lesson 2: Ingress and egress), follow along with Netmynd AJAY (\"Mastering AWS VPC: Security Groups & NACL Explained\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 28 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 29 - Lesson 2: Ingress and egress",
                "content": "Explain internet gateways, NAT gateways and private routes. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret cloud virtual networking and common misconfiguration risks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Explain internet gateways, NAT gateways and private routes. Define all terms in your own words; identify source/destination, transport or se...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 29 - Lesson 2: Ingress and egress.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Map intended flows between example tiers. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M29-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret cloud virtual networking and common misconfiguration risks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 29 - Lesson 2: Ingress and egress from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "AWS VPC documentation",
                "url": "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-001d-4000-8000-000000000003",
          "slug": "m29-l3-security-groups-and-acls",
          "title": "Module 29 - Lesson 3: Security groups and ACLs",
          "description": "Video instruction presented by LearnITGuide Tutorials: \"AWS Security Groups vs Network ACLs: Key Differences Explained 2026\". Technical focus on cloud defense-in-depth security, contrasting stateful Security Groups applied at elastic network interfaces with stateless Network Access Control Lists (NACLs) at subnet boundaries.",
          "youtubeVideoId": "rTs13yQq8A0",
          "videoAttribution": {
            "creator": "LearnITGuide Tutorials",
            "platform": "youtube"
          },
          "durationMinutes": 8,
          "order": 3,
          "moduleTitle": "Module 29: Cloud Networking, VPCs and Security Groups",
          "objectives": [
            "Explain the role of **Virtual networks** in ordinary network behavior.",
            "Demonstrate **Ingress and egress** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Security groups and ACLs** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Cloud network evidence**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-29",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 29 - Lesson 3: Security groups and ACLs",
            "Network Security Engineering (Mod 29)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 29 - Lesson 3: Security groups and ACLs), follow along with Tiny Technical Tutorials (\"AWS Security Groups Simply Explained: A Step-by-Step Tutorial for Beginners\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 28 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 29 - Lesson 3: Security groups and ACLs",
                "content": "Contrast stateful security groups with subnet network ACLs. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret cloud virtual networking and common misconfiguration risks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Contrast stateful security groups with subnet network ACLs. Define all terms in your own words; identify source/destination, transport or se...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 29 - Lesson 3: Security groups and ACLs.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Draft an allow-minimum security group policy. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M29-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret cloud virtual networking and common misconfiguration risks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 29 - Lesson 3: Security groups and ACLs from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "AWS VPC documentation",
                "url": "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        },
        {
          "id": "e0000000-001d-4000-8000-000000000004",
          "slug": "m29-l4-cloud-network-evidence",
          "title": "Module 29 - Lesson 4: Cloud network evidence",
          "description": "Video instruction presented by Cloud Security Masterclass: \"AWS Security Labs | AWS VPC Flow Logs\". Technical focus on cloud network forensic investigation, analyzing AWS/Azure VPC Flow Logs, tracking ACCEPT and REJECT events, and investigating cloud lateral movement.",
          "youtubeVideoId": "noBOOD7uLJE",
          "videoAttribution": {
            "creator": "Cloud Security Masterclass",
            "platform": "youtube"
          },
          "durationMinutes": 26,
          "order": 4,
          "moduleTitle": "Module 29: Cloud Networking, VPCs and Security Groups",
          "objectives": [
            "Explain the role of **Virtual networks** in ordinary network behavior.",
            "Demonstrate **Ingress and egress** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Security groups and ACLs** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Cloud network evidence**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-29",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 29 - Lesson 4: Cloud network evidence",
            "Network Security Engineering (Mod 29)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 29 - Lesson 4: Cloud network evidence), follow along with Cloud Security Masterclass (\"AWS Security Labs | AWS VPC Flow Logs\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 28 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 29 - Lesson 4: Cloud network evidence",
                "content": "Recognize VPC flow-log fields and cloud audit trails. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Interpret cloud virtual networking and common misconfiguration risks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Recognize VPC flow-log fields and cloud audit trails. Define all terms in your own words; identify source/destination, transport or service ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 29 - Lesson 4: Cloud network evidence.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Review a synthetic cloud-flow-log event. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M29-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Interpret cloud virtual networking and common misconfiguration risks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 29 - Lesson 4: Cloud network evidence from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "AWS VPC documentation",
                "url": "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"
              },
              {
                "title": "Cloudflare Learning Center \u2014 networking, DNS, TLS",
                "url": "https://www.cloudflare.com/learning/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 29: Cloud Networking, VPCs and Security Groups Hands-on Implementation",
        "difficulty": "advanced",
        "estimatedMinutes": 180,
        "objective": "Design an AWS VPC with public/private subnets, Internet Gateway, and NAT Gateway. Configure stateful Security Groups and stateless Network ACLs (NACLs) to enforce defense-in-depth.",
        "toolsRequired": [
          "AWS Console / Terraform"
        ],
        "pcapSource": {
          "fileName": "m29-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m29-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b829"
        },
        "instructions": [
          "Deploy authorized lab environment and configure AWS Console / Terraform within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 29 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t29-1",
            "description": "Initialize lab topology and verify layer connectivity using AWS Console / Terraform."
          },
          {
            "id": "t29-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 29."
          },
          {
            "id": "t29-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t29-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t29-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 29 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 29.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m29",
        "questions": []
      }
    },
    {
      "id": "e0000000-001e-4000-8000-000000000000",
      "title": "Module 30: Final SOC Networking Investigation Capstone",
      "description": "Advanced level (6\u20138 hours). Prerequisite: Module 29 (recommended); prior prerequisite knowledge may be demonstrated. Synthesize end-to-end network evidence in an incident-grade report. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
      "order": 30,
      "lessons": [
        {
          "id": "e0000000-001e-4000-8000-000000000001",
          "slug": "m30-l1-scoping-and-timeline",
          "title": "Module 30 - Lesson 1: Scoping and timeline",
          "description": "Video instruction presented by MyDFIR: \"Cybersecurity SOC Analyst Lab - Web Investigation (PCAP)\". Technical focus on scoping enterprise network security incidents, establishing investigative boundaries, correlating multi-sensor timestamps, and building forensic event timelines.",
          "youtubeVideoId": "X3RGOPEhDw4",
          "videoAttribution": {
            "creator": "MyDFIR",
            "platform": "youtube"
          },
          "durationMinutes": 22,
          "order": 1,
          "moduleTitle": "Module 30: Final SOC Networking Investigation Capstone",
          "objectives": [
            "Explain the role of **Scoping and timeline** in ordinary network behavior.",
            "Demonstrate **Multi-source analysis** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Judgment and caveats** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Communication and defense**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-30",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 30 - Lesson 1: Scoping and timeline",
            "Network Security Engineering (Mod 30)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 30 - Lesson 1: Scoping and timeline), follow along with MyDFIR (\"Cybersecurity SOC Analyst Lab - Web Investigation (PCAP)\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 29 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 30 - Lesson 1: Scoping and timeline",
                "content": "Define asset, time window, indicators and hypotheses. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Synthesize end-to-end network evidence in an incident-grade report. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Define asset, time window, indicators and hypotheses. Define all terms in your own words; identify source/destination, transport or service ...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 30 - Lesson 1: Scoping and timeline.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Write a one-page investigation plan for a fictional case. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M30-L01.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Synthesize end-to-end network evidence in an incident-grade report. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 30 - Lesson 1: Scoping and timeline from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Zeek official documentation",
                "url": "https://docs.zeek.org/en/current/"
              },
              {
                "title": "Suricata official Learning Library",
                "url": "https://suricata.io/learn/learning-library/"
              }
            ]
          }
        },
        {
          "id": "e0000000-001e-4000-8000-000000000002",
          "slug": "m30-l2-multi-source-analysis",
          "title": "Module 30 - Lesson 2: Multi-source analysis",
          "description": "Video instruction presented by root: \"How zeek and kibana work in Security Onion.\". Technical focus on multi-source network evidence corroboration, fusing raw PCAPs, Zeek logs, firewall alerts, and endpoint telemetry into a unified investigation narrative.",
          "youtubeVideoId": "0Ji16Q4zdGQ",
          "videoAttribution": {
            "creator": "root",
            "platform": "youtube"
          },
          "durationMinutes": 9,
          "order": 2,
          "moduleTitle": "Module 30: Final SOC Networking Investigation Capstone",
          "objectives": [
            "Explain the role of **Scoping and timeline** in ordinary network behavior.",
            "Demonstrate **Multi-source analysis** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Judgment and caveats** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Communication and defense**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-30",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 30 - Lesson 2: Multi-source analysis",
            "Network Security Engineering (Mod 30)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 30 - Lesson 2: Multi-source analysis), follow along with Dr. K Cybersecurity (\"How SOC Analysts Actually Investigate Network Traffic (Wireshark Walkthrough)\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 29 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 30 - Lesson 2: Multi-source analysis",
                "content": "Connect packet, DNS, firewall and flow evidence. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Synthesize end-to-end network evidence in an incident-grade report. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Connect packet, DNS, firewall and flow evidence. Define all terms in your own words; identify source/destination, transport or service detai...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 30 - Lesson 2: Multi-source analysis.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Build a normalized five-tuple and timeline table. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M30-L02.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Synthesize end-to-end network evidence in an incident-grade report. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 30 - Lesson 2: Multi-source analysis from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Zeek official documentation",
                "url": "https://docs.zeek.org/en/current/"
              },
              {
                "title": "Suricata official Learning Library",
                "url": "https://suricata.io/learn/learning-library/"
              }
            ]
          }
        },
        {
          "id": "e0000000-001e-4000-8000-000000000003",
          "slug": "m30-l3-judgment-and-caveats",
          "title": "Module 30 - Lesson 3: Judgment and caveats",
          "description": "Video instruction presented by Simply Cyber - Gerald Auger, PhD: \"SOC Analyst Skills - Wireshark Malicious Traffic Analysis\". Technical focus on analytical judgment in SOC investigations, evaluating evidence confidence levels, stating technical caveats, identifying anti-forensic indicators, and avoiding attribution bias.",
          "youtubeVideoId": "M8yoYmiL7rA",
          "videoAttribution": {
            "creator": "Simply Cyber - Gerald Auger, PhD",
            "platform": "youtube"
          },
          "durationMinutes": 24,
          "order": 3,
          "moduleTitle": "Module 30: Final SOC Networking Investigation Capstone",
          "objectives": [
            "Explain the role of **Scoping and timeline** in ordinary network behavior.",
            "Demonstrate **Multi-source analysis** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Judgment and caveats** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Communication and defense**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-30",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 30 - Lesson 3: Judgment and caveats",
            "Network Security Engineering (Mod 30)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 30 - Lesson 3: Judgment and caveats), follow along with Simply Cyber - Gerald Auger, PhD (\"SOC Analyst Skills - Wireshark Malicious Traffic Analysis\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 29 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 30 - Lesson 3: Judgment and caveats",
                "content": "Distinguish observed facts from inferred intent. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Synthesize end-to-end network evidence in an incident-grade report. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Distinguish observed facts from inferred intent. Define all terms in your own words; identify source/destination, transport or service detai...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 30 - Lesson 3: Judgment and caveats.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Write alternative benign explanations and confidence levels. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M30-L03.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Synthesize end-to-end network evidence in an incident-grade report. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 30 - Lesson 3: Judgment and caveats from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Zeek official documentation",
                "url": "https://docs.zeek.org/en/current/"
              },
              {
                "title": "Suricata official Learning Library",
                "url": "https://suricata.io/learn/learning-library/"
              }
            ]
          }
        },
        {
          "id": "e0000000-001e-4000-8000-000000000004",
          "slug": "m30-l4-communication-and-defense",
          "title": "Module 30 - Lesson 4: Communication and defense",
          "description": "Video instruction presented by Motasem Hamdan: \"How to Write a Professional Incident Response Report (DFIR Guide)\". Technical focus on executive communication and technical incident defense, structuring professional SOC post-incident documentation, briefing leadership on business impact, and presenting containment proposals.",
          "youtubeVideoId": "GVkyFvQVlPY",
          "videoAttribution": {
            "creator": "Motasem Hamdan",
            "platform": "youtube"
          },
          "durationMinutes": 15,
          "order": 4,
          "moduleTitle": "Module 30: Final SOC Networking Investigation Capstone",
          "objectives": [
            "Explain the role of **Scoping and timeline** in ordinary network behavior.",
            "Demonstrate **Multi-source analysis** using either a simulator, a permitted local system, or a sample PCAP.",
            "Interpret **Judgment and caveats** as operational or security evidence.",
            "Produce a defensible analyst write-up about **Communication and defense**, with uncertainty and limits stated."
          ],
          "tags": [
            "networking",
            "module-30",
            "advanced",
            "soc-analyst"
          ],
          "skillsTaught": [
            "Module 30 - Lesson 4: Communication and defense",
            "Network Security Engineering (Mod 30)",
            "Defensive Network Operations"
          ],
          "richContent": {
            "introduction": "In this video-guided lesson (Module 30 - Lesson 4: Communication and defense), follow along with Pooji SOC Talks (\"Day 14/LAST: Analyze Suspicious Network Protocols | SOC Investigation & Incident Report\") to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
            "prerequisites": [
              "Module 29 (recommended); prior prerequisite knowledge may be demonstrated"
            ],
            "theorySections": [
              {
                "title": "Core Security Principles: Module 30 - Lesson 4: Communication and defense",
                "content": "Make prioritised next-step and control recommendations. Define all terms in your own words; identify source/destination, transport or service details where relevant; distinguish the normal workflow from an observable misconfiguration or threat signal.\n\nSecurity relevance: Synthesize end-to-end network evidence in an incident-grade report. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
                "keyPoints": [
                  "Make prioritised next-step and control recommendations. Define all terms in your own words; identify source/destination, transport or servic...",
                  "Demonstrate guided practice in an isolated environment",
                  "Produce defensive analyst evidence and document limitations"
                ]
              }
            ],
            "stepByStepProcedures": [
              {
                "step": 1,
                "title": "Watch and Note Core Concepts",
                "instruction": "Watch the video lesson and map source/destination, transport, and layer details for Module 30 - Lesson 4: Communication and defense.",
                "expectedOutcome": "Understand the exact protocol exchange and failure states."
              },
              {
                "step": 2,
                "title": "Guided Practice Exercise",
                "instruction": "Produce a non-technical summary and technical appendix. Work with a bounded example, note the input/context, record the tool/filter/diagram steps, and compare expected with actual observations.",
                "expectedOutcome": "Reproduce the network state or topology in your local lab."
              },
              {
                "step": 3,
                "title": "Evidence Collection",
                "instruction": "Save a dated note named `M30-L04.md`, a screenshot or anonymized text snippet, and one sentence explaining why the result matters to a defensive analyst. Where real capture is unavailable, use the cited sample dataset and label it as simulated.",
                "expectedOutcome": "Create dated documentation with verified observations and next steps."
              }
            ],
            "expectedObservations": [
              "Explain what was observed, how it was verified, one alternative explanation, and what evidence would be needed before escalating."
            ],
            "commonMistakes": [
              "Testing on production or unauthorized networks without explicit written permission",
              "Over-interpreting a single abnormal packet without correlating other telemetry",
              "Failing to document timestamp, timezone, and interface context"
            ],
            "securityRelevance": "Synthesize end-to-end network evidence in an incident-grade report. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.",
            "summary": "By completing this lesson, you can explain and inspect Module 30 - Lesson 4: Communication and defense from an SOC defensive posture.",
            "furtherReading": [
              {
                "title": "Wireshark official sample capture library",
                "url": "https://wiki.wireshark.org/SampleCaptures"
              },
              {
                "title": "Zeek official documentation",
                "url": "https://docs.zeek.org/en/current/"
              },
              {
                "title": "Suricata official Learning Library",
                "url": "https://suricata.io/learn/learning-library/"
              }
            ]
          }
        }
      ],
      "practicalLab": {
        "title": "Lab 30: Final SOC Networking Investigation Capstone Hands-on Implementation",
        "difficulty": "advanced",
        "estimatedMinutes": 180,
        "objective": "Investigate an enterprise multi-stage intrusion. Reconstruct incident timeline, correlate packet captures, Zeek logs, and Suricata alerts, and author an executive SOC incident report.",
        "toolsRequired": [
          "Wireshark, Zeek, Suricata"
        ],
        "pcapSource": {
          "fileName": "m30-lab-analysis.pcap",
          "fileUrl": "/pcaps/networking/m30-lab-analysis.pcap",
          "repositoryUrl": "https://github.com/arun-codex/CyberTube",
          "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b830"
        },
        "instructions": [
          "Deploy authorized lab environment and configure Wireshark, Zeek, Suricata within isolated network bounds.",
          "Perform baseline telemetry collection to establish normal expected traffic profiles.",
          "Execute targeted protocol exercises matching Module 30 learning objectives.",
          "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
          "Document technical observations, defensive interpretations, and recommended remediation controls."
        ],
        "tasks": [
          {
            "id": "t30-1",
            "description": "Initialize lab topology and verify layer connectivity using Wireshark, Zeek, Suricata."
          },
          {
            "id": "t30-2",
            "description": "Perform protocol inspection and extract key header/field identifiers matching Module 30."
          },
          {
            "id": "t30-3",
            "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."
          },
          {
            "id": "t30-4",
            "description": "Analyze protocol anomalies, error states, and security threat indicators."
          },
          {
            "id": "t30-5",
            "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."
          }
        ],
        "completionCriteria": [
          "Practical lab objectives for Module 30 verified through captured evidence.",
          "All step-by-step tasks executed with concrete commands and filters.",
          "Defensive SOC relevance and remediation guidance documented."
        ],
        "evidenceWorksheet": [
          {
            "field": "protocol_evidence",
            "prompt": "Document primary protocol exchange, captured packet numbers, and key header values for Module 30.",
            "expectedEvidenceType": "Wireshark packet details or CLI output"
          },
          {
            "field": "defensive_relevance",
            "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.",
            "expectedEvidenceType": "Structured analyst evaluation text"
          }
        ],
        "id": "lab-m30",
        "questions": []
      },
      "capstoneAssessment": {
        "id": "capstone-enterprise-network-security-investigation",
        "title": "Enterprise Network Security Investigation \u2014 SOC Analyst Final Project",
        "scenario": "You are a Tier-2 SOC Analyst at Apex Financial Defense Corp. At 08:42 UTC on November 24, 2026, the automated Network Security Monitoring (NSM) cluster generated critical alerts indicating unusual outbound DNS query patterns, beaconing behavior, and lateral reconnaissance across the corporate workstation subnet (10.100.20.0/24) toward the internal core database enclave (10.100.50.0/24).\n\nYour investigation scope spans 24 hours of enterprise telemetry:\n- Raw packet captures (pcapng) from perimeter and internal span ports (SPAN-CORE-01).\n- Zeek connection logs (conn.log, dns.log, http.log, ssl.log).\n- Suricata intrusion detection alerts (eve.json) highlighting ET OPEN trojan signatures.\n- Perimeter next-generation firewall (NGFW) egress allow/deny logs.\n- DHCP lease history and ARP resolution tables.\n\nYour mission is to perform comprehensive multi-source correlation, reconstruct the intrusion timeline, identify affected internal endpoints and external C2 infrastructure, calculate exfiltration volume, and author an executive-ready, incident-grade SOC Investigation Report with actionable containment rules.",
        "pcapSource": {
          "fileName": "cybertube-capstone-enterprise-nsm.pcapng",
          "fileUrl": "https://raw.githubusercontent.com/cybertube/pcaps/main/networking/capstone-enterprise-nsm.pcapng",
          "sha256": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"
        },
        "passingScore": 75,
        "totalMarks": 100,
        "rubric": [
          {
            "category": "1. Scoping, Baseline & Topology Analysis",
            "marks": 15,
            "criteria": [
              "Accurately defines network boundaries, IP addressing schemes, subnet masks, and critical asset enclaves.",
              "Establishes normal corporate traffic baselines (DNS query frequency, authorized port profiles, working hour traffic volumes).",
              "Identifies initial anomalies deviating from baseline network behavior."
            ]
          },
          {
            "category": "2. Packet Capture Dissection & Stream Reconstruction",
            "marks": 20,
            "criteria": [
              "Performs granular Wireshark analysis on suspicious TCP handshakes, resets, and window stalls.",
              "Applies accurate display filters (tcp.flags, eth.type, ip.proto, dns.qry.name, ssl.handshake.extensions_server_name).",
              "Reconstructs application payload streams and identifies malicious communication channels."
            ]
          },
          {
            "category": "3. DNS Investigation & Threat Hunting",
            "marks": 15,
            "criteria": [
              "Analyzes high-frequency and high-entropy DNS queries indicative of DNS tunneling or DGA algorithms.",
              "Calculates query volume, label lengths, and response codes (NXDOMAIN vs NOERROR).",
              "Extracts C2 domain indicators and correlates resolver IP deviations."
            ]
          },
          {
            "category": "4. Multi-Source Log Correlation (Zeek & Suricata)",
            "marks": 20,
            "criteria": [
              "Correlates Zeek conn.log UIDs with dns.log and ssl.log records.",
              "Validates Suricata IDS alerts against packet capture evidence, separating true positives from noise.",
              "Correlates perimeter firewall denial logs with internal lateral movement attempts."
            ]
          },
          {
            "category": "5. Intrusion Timeline & Scope of Compromise",
            "marks": 15,
            "criteria": [
              "Builds a chronological UTC master incident timeline spanning Initial Access, Discovery, C2, Lateral Movement, and Exfiltration.",
              "Identifies all affected internal IP addresses, MAC addresses, hostnames, and user accounts.",
              "Quantifies total data volume exfiltrated and confirms whether core databases were breached."
            ]
          },
          {
            "category": "6. Containment, Defense & Incident Report",
            "marks": 15,
            "criteria": [
              "Specifies immediate containment actions: firewall drop rules, DNS sinkholing, VLAN quarantine, and session resets.",
              "Develops custom Snort/Suricata detection rules and Zeek scripts to prevent recurrence.",
              "Delivers a polished, professional SOC Investigation Report with an Executive Summary and technical appendix."
            ]
          }
        ],
        "submissionSections": [
          {
            "id": "sub-scope-topology",
            "title": "Section 1: Executive Summary, Topology & Traffic Baseline",
            "prompt": "Provide a concise Executive Summary summarizing the incident impact, affected business functions, and root cause. Map the enterprise network topology (corporate workstations 10.100.20.0/24, DMZ 192.168.10.0/24, Core Servers 10.100.50.0/24) and contrast baseline network traffic against the observed anomaly indicators.",
            "maxMarks": 15
          },
          {
            "id": "sub-packet-inspection",
            "title": "Section 2: Wireshark Packet Inspection & Stream Analysis",
            "prompt": "Document your Wireshark packet capture analysis. Detail the specific display filters used (e.g. eth.type, ip.addr, tcp.flags, http, tls). Document the suspicious TCP handshakes, sequence numbers, anomalous window scaling, and extracted HTTP/TLS stream details. Provide exact timestamps, source/destination IPs, and port tuples.",
            "maxMarks": 20
          },
          {
            "id": "sub-dns-hunting",
            "title": "Section 3: DNS Threat Hunting & Tunneling Dissection",
            "prompt": "Analyze the observed DNS activity. Document query types (A, TXT, CNAME), average label length, entropy scores, and query frequencies. Provide evidence proving whether DNS tunneling or C2 beaconing occurred. Include specific malicious domain names, resolver IPs, and response code distributions.",
            "maxMarks": 15
          },
          {
            "id": "sub-telemetry-correlation",
            "title": "Section 4: Multi-Source Telemetry Correlation (Zeek, Suricata & Firewall)",
            "prompt": "Present your multi-source telemetry correlation table. Correlate Zeek conn.log UIDs with dns.log and ssl.log events. Document the Suricata alert signatures (SID, class, priority), packet validation results, and corresponding perimeter firewall allow/drop events.",
            "maxMarks": 20
          },
          {
            "id": "sub-incident-timeline",
            "title": "Section 5: Intrusion Timeline & Affected Asset Inventory",
            "prompt": "Construct a chronological master incident timeline in UTC. List every key milestone: Initial Probe, C2 Beacon Establishment, Internal Reconnaissance, Privilege Elevation / Lateral Movement, and Data Exfiltration. Provide the complete inventory of compromised endpoints (IP, MAC, Hostname, Role).",
            "maxMarks": 15
          },
          {
            "id": "sub-remediation-report",
            "title": "Section 6: Containment, Defensive Engineering & Incident Report",
            "prompt": "Detail immediate and long-term containment recommendations: exact perimeter firewall rules (Layer 3/4 and Layer 7), DNS sinkholing syntax, Suricata custom detection signatures, VLAN segmentation adjustments, and Zero Trust architectural improvements. Conclude with continuous monitoring recommendations.",
            "maxMarks": 15
          }
        ]
      }
    }
  ]
};
export const networkingForCybersecurityCourse = NETWORKING_FOR_CYBERSECURITY_COURSE;
