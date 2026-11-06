PCAP_RESOURCES = [
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
]

CAPSTONE = {
    "id": "capstone-operation-blackout-beacon",
    "title": "Operation Blackout Beacon — SOC Enterprise Intrusion Forensics",
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

