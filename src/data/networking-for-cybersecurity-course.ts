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
  "estimatedDuration": "150\u2013200 hours (30 modules \u2022 120 lessons)",
  "totalDurationMinutes": 3600,
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 01 - Lesson 1: Network security roles. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "ewtDKmovou4",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 01 - Lesson 1: Network security roles), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 01 - Lesson 2: Networks and endpoints. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "H8W9oMNSuwo",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
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
            "introduction": "In this video-guided lesson (Module 01 - Lesson 2: Networks and endpoints), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 01 - Lesson 3: Safe lab environment. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "ewtDKmovou4",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 01 - Lesson 3: Safe lab environment), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 01 - Lesson 4: Evidence workflow. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "H8W9oMNSuwo",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 01 - Lesson 4: Evidence workflow), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m01",
        "title": "Lab 01: Orientation, Ethics and the Networking Lab Hands-on Implementation",
        "objective": "Set up a completely authorized lab and explain the role of networks in SOC defense. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_01_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m01-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m01-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m01-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m01-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m01-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m01-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Build a topology in Cisco Packet Tracer with two endpoints, one switch and one router; label ownership, intended connectivity and trust boundaries.",
            "expectedEvidenceType": "A topology screenshot, interface/IP inventory, authorization note and lab README."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 02 - Lesson 1: Seven OSI layers. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "LkolbURrtTs",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 02 - Lesson 1: Seven OSI layers), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 02 - Lesson 2: TCP/IP stack. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "0aGqGKrRE0g",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 02 - Lesson 2: TCP/IP stack), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 02 - Lesson 3: Encapsulation. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "LkolbURrtTs",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 02 - Lesson 3: Encapsulation), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 02 - Lesson 4: Security by layer. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "0aGqGKrRE0g",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 02 - Lesson 4: Security by layer), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m02",
        "title": "Lab 02: OSI and TCP/IP Models for SOC Analysts Hands-on Implementation",
        "objective": "Map observed packet fields to OSI/TCP-IP layers and find likely fault or attack boundaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_02_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m02-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m02-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m02-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m02-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m02-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m02-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Open a provided PCAP, identify one Ethernet frame containing IP and TCP, and annotate each nested header layer.",
            "expectedEvidenceType": "Layer map with annotated packet screenshot and explanation of where each defensive control can observe traffic."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 03 - Lesson 1: Physical interfaces. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "u2n762WG0Vo",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 03 - Lesson 1: Physical interfaces), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 03 - Lesson 2: Ethernet headers. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "AhOU2eOpmX0",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 03 - Lesson 2: Ethernet headers), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 03 - Lesson 3: Switching behavior. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "G7GyWjJtjNs",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 03 - Lesson 3: Switching behavior), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 03 - Lesson 4: Layer-2 threats. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "u2n762WG0Vo",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 03 - Lesson 4: Layer-2 threats), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m03",
        "title": "Lab 03: Cables, Interfaces, Ethernet and MAC Addresses Hands-on Implementation",
        "objective": "Interpret layer-2 frames and explain MAC-based communication and its limits. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_03_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m03-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m03-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m03-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m03-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m03-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m03-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Create two PCs on one switch. Observe broadcast vs unicast communication, then find a MAC address in the packet capture.",
            "expectedEvidenceType": "Packet Tracer file or screenshot, annotated MAC/EtherType fields and two security observations."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 04 - Lesson 1: Binary and dotted decimal. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "3ROdsfEUuhs",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 04 - Lesson 1: Binary and dotted decimal), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 04 - Lesson 2: IPv4 address categories. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "aQB22y4liXA",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 04 - Lesson 2: IPv4 address categories), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 04 - Lesson 3: IP headers. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "3ROdsfEUuhs",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
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
            "introduction": "In this video-guided lesson (Module 04 - Lesson 3: IP headers), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 04 - Lesson 4: Host addressing. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "aQB22y4liXA",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 04 - Lesson 4: Host addressing), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m04",
        "title": "Lab 04: IPv4, Binary and Packet Headers Hands-on Implementation",
        "objective": "Interpret IPv4 addresses, host ranges, reserved spaces and IP header fields. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_04_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m04-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m04-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m04-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m04-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m04-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m04-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Build an IPv4 endpoint inventory and trace the address fields in an ICMP echo request and response.",
            "expectedEvidenceType": "An IPv4 cheat sheet and screenshot of annotated IP headers."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 05 - Lesson 1: Network prefix. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "bQ8sdpGQu8c",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 05 - Lesson 1: Network prefix), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 05 - Lesson 2: Subnet math. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "3ROdsfEUuhs",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 05 - Lesson 2: Subnet math), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 05 - Lesson 3: VLSM design. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "bQ8sdpGQu8c",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 05 - Lesson 3: VLSM design), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 05 - Lesson 4: Security use cases. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "3ROdsfEUuhs",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 05 - Lesson 4: Security use cases), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m05",
        "title": "Lab 05: Subnetting, CIDR and VLSM Hands-on Implementation",
        "objective": "Calculate subnets and use them to plan segmented networks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_05_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m05-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m05-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m05-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m05-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m05-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m05-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Use 10.20.0.0/24 to design four lab subnets for clients, servers, management and guests; prevent overlaps.",
            "expectedEvidenceType": "A table with CIDR, mask, network, usable range, broadcast and intended security zone."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 06 - Lesson 1: ARP resolution. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "gYN2qN11-wE",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 06 - Lesson 1: ARP resolution), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 06 - Lesson 2: ICMP messages. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "JI9Zm2tbUoE",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 06 - Lesson 2: ICMP messages), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 06 - Lesson 3: Routing path discovery. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "gYN2qN11-wE",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 06 - Lesson 3: Routing path discovery), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 06 - Lesson 4: Detection interpretation. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "JI9Zm2tbUoE",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 06 - Lesson 4: Detection interpretation), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m06",
        "title": "Lab 06: ARP, ICMP, Ping and Traceroute Hands-on Implementation",
        "objective": "Explain on-link reachability and diagnose IP/MAC resolution safely. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_06_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "beginner",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m06-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m06-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m06-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m06-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m06-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m06-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Capture an ARP exchange followed by ICMP echo between two host-only VMs; compare MAC and IP destinations.",
            "expectedEvidenceType": "An annotated ARP+ICMP packet sequence and a short troubleshooting decision tree."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 07 - Lesson 1: Broadcast domains. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "cjFzOnm6u1g",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 07 - Lesson 1: Broadcast domains), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 07 - Lesson 2: Access/trunk ports. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "G7GyWjJtjNs",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 07 - Lesson 2: Access/trunk ports), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 07 - Lesson 3: Inter-VLAN routing. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "cjFzOnm6u1g",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 07 - Lesson 3: Inter-VLAN routing), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 07 - Lesson 4: Security controls. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "G7GyWjJtjNs",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 07 - Lesson 4: Security controls), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m07",
        "title": "Lab 07: Switching, VLANs and Layer-2 Segmentation Hands-on Implementation",
        "objective": "Configure VLANs and explain how segmentation changes attacker movement. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_07_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m07-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m07-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m07-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m07-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m07-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m07-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Simulate employee VLAN 10 and guest VLAN 20; show same-VLAN success and cross-VLAN restriction via routing/ACL.",
            "expectedEvidenceType": "VLAN table, topology capture, allowed-flow matrix and blocked-flow evidence."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 08 - Lesson 1: Forwarding logic. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "AzXys5kxpAM",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 08 - Lesson 1: Forwarding logic), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 08 - Lesson 2: Default gateways. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "Ep-x_6kggKA",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 08 - Lesson 2: Default gateways), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 08 - Lesson 3: Static routes. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "aHwAm8GYbn8",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 08 - Lesson 3: Static routes), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 08 - Lesson 4: Security telemetry. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "AzXys5kxpAM",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 08 - Lesson 4: Security telemetry), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m08",
        "title": "Lab 08: Routers, Routing Tables and Traffic Paths Hands-on Implementation",
        "objective": "Trace a packet through gateways and routing decisions. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_08_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m08-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m08-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m08-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m08-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m08-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m08-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Create two routed lab networks, insert an intentional route mistake and document how you located the failure.",
            "expectedEvidenceType": "Before/after route tables, traceroute results, diagnosis and repair notes."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 09 - Lesson 1: Route advertisement. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "pvuaoJ9YzoI",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 09 - Lesson 1: Route advertisement), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 09 - Lesson 2: OSPF mechanics. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "zmxLg4jV0ts",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 09 - Lesson 2: OSPF mechanics), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 09 - Lesson 3: Routing integrity. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "pvuaoJ9YzoI",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 09 - Lesson 3: Routing integrity), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 09 - Lesson 4: SOC observables. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "zmxLg4jV0ts",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
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
            "introduction": "In this video-guided lesson (Module 09 - Lesson 4: SOC observables), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m09",
        "title": "Lab 09: Dynamic Routing, OSPF and BGP Security Concepts Hands-on Implementation",
        "objective": "Recognize route advertisement, adjacency, route leak and hijack symptoms without executing attacks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_09_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m09-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m09-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m09-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m09-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m09-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m09-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Create a simple OSPF topology in Packet Tracer, then document what interface or metric change affects forwarding.",
            "expectedEvidenceType": "Routing diagram, interface tables and one non-offensive routing-event analysis."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 10 - Lesson 1: TCP handshake. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "rmFX1V49K8U",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 10 - Lesson 1: TCP handshake), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 10 - Lesson 2: TCP flags. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "LIEACBqlntY",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 10 - Lesson 2: TCP flags), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 10 - Lesson 3: Reliability. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "rmFX1V49K8U",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 10 - Lesson 3: Reliability), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 10 - Lesson 4: Detection implications. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "LIEACBqlntY",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 10 - Lesson 4: Detection implications), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m10",
        "title": "Lab 10: TCP Connections, Flags and Sessions Hands-on Implementation",
        "objective": "Analyze the TCP state machine and normal handshake evidence. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_10_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m10-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m10-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m10-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m10-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m10-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m10-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Capture a connection to a local web server and label handshake, application exchange and connection close.",
            "expectedEvidenceType": "Packet numbers and timestamps for each phase plus a normal/abnormal interpretation."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 11 - Lesson 1: TCP versus UDP. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "LIEACBqlntY",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 11 - Lesson 1: TCP versus UDP), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 11 - Lesson 2: Port ranges. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "Xgwph7kERps",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 11 - Lesson 2: Port ranges), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 11 - Lesson 3: Sockets and services. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "LIEACBqlntY",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 11 - Lesson 3: Sockets and services), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 11 - Lesson 4: Suspicious services. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "Xgwph7kERps",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 11 - Lesson 4: Suspicious services), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m11",
        "title": "Lab 11: UDP, Ports, Sockets and Common Services Hands-on Implementation",
        "objective": "Correlate ports, processes and network protocols with security events. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_11_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m11-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m11-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m11-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m11-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m11-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m11-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Run a temporary local HTTP listener, observe its port in ss, connect from a lab client and record both endpoints.",
            "expectedEvidenceType": "Port/process table, screenshot of socket state and protocol explanation."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 12 - Lesson 1: Resolver workflow. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "4C6eeQes4cs",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
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
            "introduction": "In this video-guided lesson (Module 12 - Lesson 1: Resolver workflow), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 12 - Lesson 2: DNS records. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "3FPaTvCJojQ",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 12 - Lesson 2: DNS records), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 12 - Lesson 3: DNS traffic. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "4C6eeQes4cs",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 12 - Lesson 3: DNS traffic), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 12 - Lesson 4: Security cases. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "3FPaTvCJojQ",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 12 - Lesson 4: Security cases), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m12",
        "title": "Lab 12: DNS Resolution and DNS Security Hands-on Implementation",
        "objective": "Interpret DNS queries, answers, caching and defensive DNS signals. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_12_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m12-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m12-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m12-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m12-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m12-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m12-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Inspect sample DNS traffic and document a normal query, NXDOMAIN response and an unusually long query name.",
            "expectedEvidenceType": "DNS transaction table with domain, type, resolver, response, TTL and triage comments."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 13 - Lesson 1: DHCP DORA. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "hzkleGAC2_Y",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 13 - Lesson 1: DHCP DORA), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 13 - Lesson 2: DHCP leases. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "cgMsoIQB9Wk",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 13 - Lesson 2: DHCP leases), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 13 - Lesson 3: Rogue configuration indicators. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "hzkleGAC2_Y",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 13 - Lesson 3: Rogue configuration indicators), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 13 - Lesson 4: NTP and timestamp integrity. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "cgMsoIQB9Wk",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 13 - Lesson 4: NTP and timestamp integrity), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m13",
        "title": "Lab 13: DHCP, NTP and Network Configuration Hands-on Implementation",
        "objective": "Understand network configuration provisioning and time synchronization as security dependencies. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_13_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m13-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m13-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m13-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m13-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m13-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m13-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: In Packet Tracer, provide addresses to two clients from a lab DHCP server and correlate DHCP options to client settings.",
            "expectedEvidenceType": "DORA flow diagram, DHCP settings and time-drift impact note."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 14 - Lesson 1: HTTP conversation. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "E5bSumTAHZE",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 14 - Lesson 1: HTTP conversation), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 14 - Lesson 2: Sessions and cookies. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "ewtDKmovou4",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 14 - Lesson 2: Sessions and cookies), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 14 - Lesson 3: HTTPS visibility. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "E5bSumTAHZE",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 14 - Lesson 3: HTTPS visibility), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 14 - Lesson 4: Proxy interpretation. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "ewtDKmovou4",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 14 - Lesson 4: Proxy interpretation), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m14",
        "title": "Lab 14: HTTP/HTTPS, Web Requests and Proxies Hands-on Implementation",
        "objective": "Read requests, headers, status codes and proxy metadata relevant to web security. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_14_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m14-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m14-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m14-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m14-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m14-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m14-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Run a local test server and record GET, 200, 301 and 404 behavior using curl and browser dev tools.",
            "expectedEvidenceType": "An annotated transaction sheet with method, host, path, response, headers and metadata visibility."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 15 - Lesson 1: TLS trust model. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "m3I-h9uSgj8",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 15 - Lesson 1: TLS trust model), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 15 - Lesson 2: TLS negotiation. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "yodDbgoCnLM",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 15 - Lesson 2: TLS negotiation), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 15 - Lesson 3: HTTP/2 and HTTP/3. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "m3I-h9uSgj8",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 15 - Lesson 3: HTTP/2 and HTTP/3), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 15 - Lesson 4: SOC troubleshooting. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "yodDbgoCnLM",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 15 - Lesson 4: SOC troubleshooting), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m15",
        "title": "Lab 15: TLS, Certificates and Encrypted Traffic Hands-on Implementation",
        "objective": "Interpret TLS handshakes and certificate failures without claiming encrypted payload visibility. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_15_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m15-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m15-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m15-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m15-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m15-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m15-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Open a TLS handshake PCAP and annotate visible endpoints, transport, handshake versions and certificate details if present.",
            "expectedEvidenceType": "A TLS metadata evidence sheet and one practical certificate-error resolution path."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 16 - Lesson 1: Private addressing. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "2TZCfTgopeg",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 16 - Lesson 1: Private addressing), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 16 - Lesson 2: Static vs dynamic NAT. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "JI9Zm2tbUoE",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 16 - Lesson 2: Static vs dynamic NAT), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 16 - Lesson 3: PAT and port mapping. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "2TZCfTgopeg",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
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
            "introduction": "In this video-guided lesson (Module 16 - Lesson 3: PAT and port mapping), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 16 - Lesson 4: SOC attribution. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "JI9Zm2tbUoE",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 16 - Lesson 4: SOC attribution), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m16",
        "title": "Lab 16: NAT, PAT and Network Translation Hands-on Implementation",
        "objective": "Distinguish private/public endpoints and understand translation in security logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_16_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m16-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m16-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m16-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m16-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m16-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m16-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Simulate two client hosts reaching one outside service through PAT; document per-flow port mapping.",
            "expectedEvidenceType": "Private/public address table and correlation steps for a hypothetical alert."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 17 - Lesson 1: Filtering logic. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "z023_eRUtSo",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 17 - Lesson 1: Filtering logic), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 17 - Lesson 2: Rule order. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "Xgwph7kERps",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 17 - Lesson 2: Rule order), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 17 - Lesson 3: Network zones. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "z023_eRUtSo",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 17 - Lesson 3: Network zones), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 17 - Lesson 4: Firewall investigations. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "Xgwph7kERps",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 17 - Lesson 4: Firewall investigations), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m17",
        "title": "Lab 17: Firewalls, ACLs and Zero-Trust Segmentation Hands-on Implementation",
        "objective": "Design and test minimal access policy while interpreting deny and allow logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_17_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m17-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m17-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m17-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m17-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m17-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m17-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Design a deny-by-default lab policy that permits only DNS and HTTPS from a test client to selected lab services.",
            "expectedEvidenceType": "Policy matrix, rule order, test results and least-privilege explanation."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 18 - Lesson 1: Wireless architecture. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "wHXKo9So5y8",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 18 - Lesson 1: Wireless architecture), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 18 - Lesson 2: 802.11 basics. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "ewtDKmovou4",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 18 - Lesson 2: 802.11 basics), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 18 - Lesson 3: Authentication. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "wHXKo9So5y8",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 18 - Lesson 3: Authentication), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 18 - Lesson 4: Wireless monitoring. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "ewtDKmovou4",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 18 - Lesson 4: Wireless monitoring), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m18",
        "title": "Lab 18: Wireless Networking and Wi-Fi Security Hands-on Implementation",
        "objective": "Understand 802.11, wireless authentication and common detection indicators. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_18_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m18-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m18-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m18-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m18-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m18-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m18-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Audit the configuration of your own Wi-Fi or a virtual sample config, identify default-security improvements and document trade-offs.",
            "expectedEvidenceType": "Redacted audit checklist and a sample suspicious-SSID triage note."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 19 - Lesson 1: IPv6 representation. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "ZNuXyOXae5U",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 19 - Lesson 1: IPv6 representation), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 19 - Lesson 2: NDP and ICMPv6. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "0aGqGKrRE0g",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 19 - Lesson 2: NDP and ICMPv6), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 19 - Lesson 3: Dual-stack paths. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "ZNuXyOXae5U",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 19 - Lesson 3: Dual-stack paths), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 19 - Lesson 4: Defensive checks. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "0aGqGKrRE0g",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 19 - Lesson 4: Defensive checks), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m19",
        "title": "Lab 19: IPv6 Addressing and Network Security Hands-on Implementation",
        "objective": "Read IPv6 headers, address types, neighbor discovery and dual-stack risk. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_19_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m19-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m19-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m19-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m19-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m19-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m19-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Configure an IPv6 subnet in Packet Tracer and document a neighbor discovery and echo flow.",
            "expectedEvidenceType": "IPv6 address plan, packet screenshot and IPv6 monitoring checklist."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 20 - Lesson 1: VPN use cases. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "Rx8q7N-qZVc",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 20 - Lesson 1: VPN use cases), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 20 - Lesson 2: Tunnel endpoints. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "ewtDKmovou4",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 20 - Lesson 2: Tunnel endpoints), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 20 - Lesson 3: Protocol concepts. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "Rx8q7N-qZVc",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 20 - Lesson 3: Protocol concepts), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 20 - Lesson 4: SOC monitoring. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "ewtDKmovou4",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 20 - Lesson 4: SOC monitoring), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m20",
        "title": "Lab 20: VPNs, Tunnels and Secure Remote Access Hands-on Implementation",
        "objective": "Differentiate tunneling and encryption and interpret remote-access security telemetry. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_20_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m20-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m20-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m20-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m20-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m20-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m20-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Map traffic visibility before and after a VPN gateway using a diagram or simulated event list; no outside connection required.",
            "expectedEvidenceType": "A VPN topology, logging field inventory and alert-triage worksheet."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 21 - Lesson 1: Capture safely. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "OU-A2EmVrKQ",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 21 - Lesson 1: Capture safely), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 21 - Lesson 2: Capture vs display filters. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "YJGGYKAV4pA",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 21 - Lesson 2: Capture vs display filters), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 21 - Lesson 3: Statistics. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "OU-A2EmVrKQ",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 21 - Lesson 3: Statistics), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 21 - Lesson 4: TShark workflow. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "YJGGYKAV4pA",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 21 - Lesson 4: TShark workflow), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m21",
        "title": "Lab 21: Wireshark and TShark Essentials Hands-on Implementation",
        "objective": "Capture and filter permitted traffic and interpret protocol layers. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_21_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "intermediate",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m21-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m21-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m21-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m21-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m21-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m21-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Analyze an official Wireshark sample capture. Identify the top three protocols and build a reproducible display filter.",
            "expectedEvidenceType": "PCAP identifier, filters, screenshots, conversation table and interpretation."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 22 - Lesson 1: Handshake timing. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "HTQLipAG27I",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 22 - Lesson 1: Handshake timing), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 22 - Lesson 2: Retransmissions. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "rmFX1V49K8U",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 22 - Lesson 2: Retransmissions), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 22 - Lesson 3: Window dynamics. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "HTQLipAG27I",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 22 - Lesson 3: Window dynamics), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 22 - Lesson 4: Incident context. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "rmFX1V49K8U",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 22 - Lesson 4: Incident context), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m22",
        "title": "Lab 22: Deep TCP Packet Analysis and Troubleshooting Hands-on Implementation",
        "objective": "Understand timing, retransmission, loss and flow-control clues. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_22_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m22-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m22-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m22-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m22-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m22-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m22-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Review a TCP troubleshooting PCAP and explain whether latency or retransmissions likely caused user-visible delay.",
            "expectedEvidenceType": "Packet timeline, quantitative timing observations and limits of the conclusion."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 23 - Lesson 1: DNS traffic baseline. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "3FPaTvCJojQ",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 23 - Lesson 1: DNS traffic baseline), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 23 - Lesson 2: Long and encoded labels. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "7D_FapNrRUM",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 23 - Lesson 2: Long and encoded labels), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 23 - Lesson 3: Resolver anomalies. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "3FPaTvCJojQ",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 23 - Lesson 3: Resolver anomalies), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 23 - Lesson 4: Triage workflow. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "7D_FapNrRUM",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 23 - Lesson 4: Triage workflow), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m23",
        "title": "Lab 23: DNS Traffic Investigation and Threat Hunting Hands-on Implementation",
        "objective": "Analyze DNS network evidence and distinguish suspicious patterns from false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_23_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m23-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m23-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m23-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m23-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m23-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m23-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Analyze an anonymized DNS PCAP and group queries by domain, response code, length and resolver.",
            "expectedEvidenceType": "Query histogram/table, three hypotheses and recommended validation actions."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 24 - Lesson 1: Web flow reconstruction. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "yodDbgoCnLM",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 24 - Lesson 1: Web flow reconstruction), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 24 - Lesson 2: Encrypted metadata. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "m3I-h9uSgj8",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 24 - Lesson 2: Encrypted metadata), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 24 - Lesson 3: QUIC basics. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "yodDbgoCnLM",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 24 - Lesson 3: QUIC basics), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 24 - Lesson 4: Incident report. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "m3I-h9uSgj8",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 24 - Lesson 4: Incident report), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m24",
        "title": "Lab 24: Web/TLS/QUIC Traffic Investigation Hands-on Implementation",
        "objective": "Investigate web connectivity and suspicious destination behavior using observable metadata. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_24_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m24-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m24-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m24-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m24-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m24-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m24-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Compare an HTTP capture with a TLS/QUIC capture and document privacy-preserving visibility limits.",
            "expectedEvidenceType": "Metadata visibility matrix and analyst-ready case note."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 25 - Lesson 1: Telemetry sources. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "JSP-yOBRbrg",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 25 - Lesson 1: Telemetry sources), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 25 - Lesson 2: Syslog fields. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "e1cwKwshC9I",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 25 - Lesson 2: Syslog fields), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 25 - Lesson 3: Flow records. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "JSP-yOBRbrg",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 25 - Lesson 3: Flow records), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 25 - Lesson 4: Correlation basics. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "e1cwKwshC9I",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 25 - Lesson 4: Correlation basics), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m25",
        "title": "Lab 25: Syslog, NetFlow/IPFIX and Network Telemetry Hands-on Implementation",
        "objective": "Correlate network metadata logs and distinguish full packets from flow summaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_25_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m25-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m25-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m25-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m25-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m25-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m25-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Use sample log rows to construct a five-tuple conversation table and timeline for a fictional security alert.",
            "expectedEvidenceType": "Telemetry schema table, timeline and logging gaps assessment."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 26 - Lesson 1: Zeek architecture. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "e1cwKwshC9I",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 26 - Lesson 1: Zeek architecture), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 26 - Lesson 2: conn.log basics. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "JSP-yOBRbrg",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 26 - Lesson 2: conn.log basics), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 26 - Lesson 3: Protocol logs. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "e1cwKwshC9I",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 26 - Lesson 3: Protocol logs), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 26 - Lesson 4: Hunting logic. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "JSP-yOBRbrg",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 26 - Lesson 4: Hunting logic), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m26",
        "title": "Lab 26: Zeek Network Security Monitoring Hands-on Implementation",
        "objective": "Read Zeek connection, DNS, HTTP and SSL/TLS logs for network investigations. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_26_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m26-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m26-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m26-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m26-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m26-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m26-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Run a known-safe offline PCAP through Zeek if installed, or use the official interactive tutorial and provided logs.",
            "expectedEvidenceType": "Short Zeek report linking connection and protocol records, with limitations."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 27 - Lesson 1: IDS vs IPS. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "JSP-yOBRbrg",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 27 - Lesson 1: IDS vs IPS), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 27 - Lesson 2: Rule anatomy. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "e1cwKwshC9I",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 27 - Lesson 2: Rule anatomy), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 27 - Lesson 3: eve.json events. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "JSP-yOBRbrg",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 27 - Lesson 3: eve.json events), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 27 - Lesson 4: Alert validation. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "e1cwKwshC9I",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 27 - Lesson 4: Alert validation), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m27",
        "title": "Lab 27: Suricata IDS/IPS, Rules and Alert Triage Hands-on Implementation",
        "objective": "Interpret network IDS alerts, understand signatures and reduce false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_27_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m27-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m27-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m27-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m27-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m27-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m27-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Process a permitted offline training PCAP with Suricata using default safe configuration, then inspect eve.json alert and flow records.",
            "expectedEvidenceType": "Annotated rule, event summary, PCAP cross-reference and triage verdict with confidence."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 28 - Lesson 1: Discovery basics. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "2rRSDGNo_Uo",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 28 - Lesson 1: Discovery basics), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 28 - Lesson 2: Port state interpretation. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "Xgwph7kERps",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 28 - Lesson 2: Port state interpretation), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 28 - Lesson 3: Service identification. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "2rRSDGNo_Uo",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 28 - Lesson 3: Service identification), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 28 - Lesson 4: Defensive visibility. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "Xgwph7kERps",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 28 - Lesson 4: Defensive visibility), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m28",
        "title": "Lab 28: Network Discovery with Nmap \u2014 Authorized Labs Hands-on Implementation",
        "objective": "Inventory owned systems and interpret TCP/UDP scanning results and their detection traces. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_28_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m28-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m28-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m28-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m28-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m28-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m28-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Perform a low-rate Nmap scan against a test service on 127.0.0.1 or a host-only VM and compare to listening sockets.",
            "expectedEvidenceType": "Scope statement, commands, results, packet observations and remediation note."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 29 - Lesson 1: Virtual networks. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "SX-vJqeBzOQ",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 29 - Lesson 1: Virtual networks), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 29 - Lesson 2: Ingress and egress. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "2TZCfTgopeg",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 29 - Lesson 2: Ingress and egress), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 29 - Lesson 3: Security groups and ACLs. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "SX-vJqeBzOQ",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 29 - Lesson 3: Security groups and ACLs), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 29 - Lesson 4: Cloud network evidence. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "2TZCfTgopeg",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 29 - Lesson 4: Cloud network evidence), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m29",
        "title": "Lab 29: Cloud Networking, VPCs and Security Groups Hands-on Implementation",
        "objective": "Interpret cloud virtual networking and common misconfiguration risks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_29_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m29-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m29-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m29-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m29-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m29-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m29-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Design a cloud topology on paper, without deploying paid services: one public reverse proxy, a private application service and database.",
            "expectedEvidenceType": "Diagram, CIDR plan, route table, least-privilege rules and log coverage checklist."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 30 - Lesson 1: Scoping and timeline. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "JSP-yOBRbrg",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 30 - Lesson 1: Scoping and timeline), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 30 - Lesson 2: Multi-source analysis. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "3FPaTvCJojQ",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 30 - Lesson 2: Multi-source analysis), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 30 - Lesson 3: Judgment and caveats. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "rmFX1V49K8U",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 30 - Lesson 3: Judgment and caveats), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
          "description": "Video lesson presented by CyberTube Instructor. Covers Module 30 - Lesson 4: Communication and defense. Practice the concepts in your isolated lab environment.",
          "youtubeVideoId": "JSP-yOBRbrg",
          "videoAttribution": {
            "creator": "CyberTube Instructor",
            "platform": "youtube"
          },
          "durationMinutes": 30,
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
            "introduction": "In this video-guided lesson (Module 30 - Lesson 4: Communication and defense), follow along with CyberTube Instructor to master practical network security principles. Run verification commands in your authorized lab environment and record required telemetry.",
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
        "id": "lab-net-m30",
        "title": "Lab 30: Final SOC Networking Investigation Capstone Hands-on Implementation",
        "objective": "Synthesize end-to-end network evidence in an incident-grade report. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report. Work only in an authorized local lab or offline simulation environment.",
        "toolsRequired": [
          "Cisco Packet Tracer / Wireshark / TShark",
          "Host-only Virtual Machine / Lab Topology",
          "Markdown Evidence Log (Mxx-Lyy.md)"
        ],
        "pcapSource": {
          "fileName": "module_30_network_evidence",
          "fileUrl": "https://wiki.wireshark.org/SampleCaptures"
        },
        "difficulty": "advanced",
        "estimatedMinutes": 60,
        "instructions": [
          "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries.",
          "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly.",
          "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope.",
          "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible.",
          "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step.",
          "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
        ],
        "tasks": [
          {
            "id": "task-m30-1",
            "description": "**Scope:** Record the systems you own/control, the source of the sample data, date/time, and explicit lab network boundaries."
          },
          {
            "id": "task-m30-2",
            "description": "**Baseline:** Note the normal configuration or expected protocol exchange before making a controlled change or reviewing an anomaly."
          },
          {
            "id": "task-m30-3",
            "description": "**Observe:** Follow the module scenario with Packet Tracer, Wireshark, TShark, a host-only VM, or a publicly supplied offline training PCAP as appropriate. Never initiate traffic outside the authorized scope."
          },
          {
            "id": "task-m30-4",
            "description": "**Correlate:** Capture the relevant address, port, timestamp, protocol, log field, or topology evidence; compare it with a second observation when possible."
          },
          {
            "id": "task-m30-5",
            "description": "**Conclude:** Record the most likely explanation, evidence for/against it, possible benign alternatives, confidence, and an appropriate defensive next step."
          },
          {
            "id": "task-m30-6",
            "description": "**Clean up:** Stop local test services, restore configurations and redact credentials, private addresses where required, tokens and personal data."
          }
        ],
        "evidenceWorksheet": [
          {
            "field": "authorization_and_scope",
            "prompt": "Document your authorized IP scope, tool configuration, and timestamp timezone.",
            "expectedEvidenceType": "Text transcript"
          },
          {
            "field": "observation_and_correlation",
            "prompt": "Record observed traffic/topology evidence for: Investigate an approved offline PCAP and provided synthetic log dataset. Answer what happened, when, who/what was involved, and what remains unknown.",
            "expectedEvidenceType": "Portfolio-ready 4\u20138 page report with evidence IDs, sanitized screenshots, supporting filters, timeline, false-positive analysis and proposed controls."
          }
        ],
        "questions": [],
        "completionCriteria": [
          "Required module YouTube lesson(s) watched or relevant accessible alternative documented.",
          "Four lesson evidence files created (Mxx-Lxx.md).",
          "At least one valid lab observation or simulation artifact captured.",
          "Source/destination/protocol interpretation is technically consistent.",
          "Analyst note distinguishes observations, hypotheses and unknowns.",
          "Sensitive information sanitized and lab scope respected."
        ]
      }
    }
  ]
};
