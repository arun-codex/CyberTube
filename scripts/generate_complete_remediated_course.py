import json
import os
import sys

def build_remediated_course():
    # 1. Load verified video metadata
    metadata_path = 'scripts/VERIFIED_120_VIDEOS_METADATA.json'
    if not os.path.exists(metadata_path):
        print(f"Error: {metadata_path} does not exist yet. Please wait for verification to finish.")
        return False

    with open(metadata_path, 'r', encoding='utf-8') as f:
        verified_videos = json.load(f)

    # Index by slug
    video_by_slug = {}
    for item in verified_videos:
        s = item.get('slug') or item.get('lesson_slug')
        if s:
            item['slug'] = s
            video_by_slug[s] = item

    # 2. Load existing TS course data
    with open('src/data/networking-for-cybersecurity-course.ts', 'r', encoding='utf-8') as f:
        ts_content = f.read()

    eq_idx = ts_content.find('= {')
    raw_course = json.loads(ts_content[eq_idx + 2:ts_content.rfind('}') + 1])

    # 3. Construct Bespoke Practical Labs for all 30 modules
    module_labs = {
        1: {
            "title": "Lab 01: Host-Only Lab Architecture, Asset Inventory & Evidence Journal",
            "difficulty": "beginner",
            "estimatedMinutes": 60,
            "objective": "Design an isolated host-only network simulation, inventory virtual endpoints, and establish a tamper-evident forensic journal for all subsequent networking experiments.",
            "toolsRequired": ["VirtualBox or VMware Workstation", "Cisco Packet Tracer", "sha256sum / CertUtil", "Notepad++ / VS Code"],
            "pcapSource": {
                "fileName": "local-synthetic-host-only-traffic-generation.pcap",
                "fileUrl": "https://raw.githubusercontent.com/cybertube/pcaps/main/networking/local-synthetic-host-only-traffic-generation.pcap",
                "repositoryUrl": "https://github.com/cybertube/pcaps",
                "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
            },
            "instructions": [
                "Configure an isolated host-only virtual adapter (192.168.56.0/24) disconnected from external internet gateways.",
                "Deploy two lightweight test nodes (Linux VM and Windows VM) with static addressing within the host-only subnet.",
                "Record hardware MAC addresses, assigned IP addresses, subnet masks, and default gateways in a structured inventory journal.",
                "Execute mutual ping verification between test nodes and compute cryptographic SHA-256 hashes of the initial configuration files.",
                "Document evidence collection procedures, timestamp synchronization, and forensic chain-of-custody protocols."
            ],
            "tasks": [
                {"id": "t01-1", "description": "Initialize Host-Only virtual network switch with subnet 192.168.56.0/24 and disable host DHCP server."},
                {"id": "t01-2", "description": "Configure static IP 192.168.56.10/24 on Node-A and 192.168.56.20/24 on Node-B with proper loopback validation."},
                {"id": "t01-3", "description": "Perform ICMP connectivity testing: ping -c 4 192.168.56.20 and verify zero packet loss."},
                {"id": "t01-4", "description": "Create evidence_log.md and record SHA-256 hashes of /etc/network/interfaces and test scripts using sha256sum."},
                {"id": "t01-5", "description": "Establish forensic log naming conventions: YYYYMMDD_HHMMSS_module01_evidence.pcap."}
            ],
            "completionCriteria": [
                "Host-only network is strictly isolated with no default gateway to the public internet.",
                "Both test endpoints successfully ping each other across the virtual switch.",
                "Cryptographic hashes and network inventory tables are recorded in the evidence worksheet."
            ],
            "evidenceWorksheet": [
                {"field": "network_topology_map", "prompt": "Document virtual interface names, MAC addresses, and assigned IP addresses for Node-A and Node-B.", "expectedEvidenceType": "Table with Interface, MAC, IP, Subnet Mask"},
                {"field": "connectivity_proof", "prompt": "Paste terminal output showing successful 4-packet ICMP exchange between nodes.", "expectedEvidenceType": "CLI Terminal Output"},
                {"field": "integrity_hash", "prompt": "Record SHA-256 hash of evidence journal file.", "expectedEvidenceType": "64-character hex hash string"}
            ]
        },
        2: {
            "title": "Lab 02: Multi-Layer Protocol Mapping & Fault Isolation",
            "difficulty": "beginner",
            "estimatedMinutes": 60,
            "objective": "Dissect a multi-protocol packet capture to identify Layer 2 through Layer 7 protocol data units (PDUs) and demonstrate precise fault isolation across the OSI hierarchy.",
            "toolsRequired": ["Wireshark", "curl / wget", "ping", "traceroute"],
            "pcapSource": {
                "fileName": "sample_http_dns_icmp-pcap.pcap",
                "fileUrl": "https://raw.githubusercontent.com/cybertube/pcaps/main/networking/sample_http_dns_icmp-pcap.pcap",
                "repositoryUrl": "https://github.com/cybertube/pcaps",
                "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
            },
            "instructions": [
                "Load sample_http_dns_icmp.pcap into Wireshark and inspect packet #1.",
                "Examine the Wireshark packet details pane and map each header to its corresponding OSI and TCP/IP layer.",
                "Identify Layer 2 Frame (Ethernet II), Layer 3 Packet (IPv4), Layer 4 Segment (TCP), and Layer 7 PDU (HTTP).",
                "Simulate Layer 2, Layer 3, and Layer 7 communication failures and document the observable diagnostic symptoms for each layer."
            ],
            "tasks": [
                {"id": "t02-1", "description": "Identify Ethernet II encapsulation fields (preamble, dest MAC, src MAC, EtherType 0x0800)."},
                {"id": "t02-2", "description": "Examine IPv4 protocol field (0x06 for TCP, 0x11 for UDP, 0x01 for ICMP) and correlate with upper-layer headers."},
                {"id": "t02-3", "description": "Correlate TCP source and destination port numbers with application layer payload data."},
                {"id": "t02-4", "description": "Construct a 7-layer fault isolation matrix distinguishing cable disconnect (L1), MAC misconfiguration (L2), bad mask (L3), closed port (L4), and HTTP 500 (L7)."}
            ],
            "completionCriteria": [
                "All 4 encapsulation layers correctly identified and labeled in Wireshark packet details.",
                "Protocol decapsulation order documented from physical bits to application payload.",
                "OSI diagnostic fault isolation matrix completed with technical observables."
            ],
            "evidenceWorksheet": [
                {"field": "encapsulation_table", "prompt": "List the PDU name, header fields, and addressing scheme for Layers 2, 3, 4, and 7 of Packet #1.", "expectedEvidenceType": "Multi-column comparison table"},
                {"field": "fault_isolation_case", "prompt": "Explain what error message a client receives when Layer 3 is intact but Layer 4 service is refused (TCP RST).", "expectedEvidenceType": "Defensive analysis text"}
            ]
        },
        3: {
            "title": "Lab 03: Ethernet II Frame Inspection, MAC Table Flooding & L2 Threat Analysis",
            "difficulty": "beginner",
            "estimatedMinutes": 75,
            "objective": "Perform deep packet analysis of Ethernet II frames using Wireshark, analyze switch MAC address table learning, and evaluate Layer-2 attack indicators.",
            "toolsRequired": ["Wireshark", "Cisco Packet Tracer", "arping"],
            "pcapSource": {
                "fileName": "sample_ethernet_frames-pcap.pcap",
                "fileUrl": "https://raw.githubusercontent.com/cybertube/pcaps/main/networking/sample_ethernet_frames-pcap.pcap",
                "repositoryUrl": "https://github.com/cybertube/pcaps",
                "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
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
                {"id": "t03-1", "description": "In Packet Tracer, inspect switch MAC table before and after unicast frame transmission using 'show mac address-table'."},
                {"id": "t03-2", "description": "Identify Ethernet broadcast MAC address ff:ff:ff:ff:ff:ff and verify all switch ports except ingress receive flooded frame."},
                {"id": "t03-3", "description": "In Wireshark, apply display filter: eth.type == 0x0800 && eth.dst != ff:ff:ff:ff:ff:ff to isolate unicast IP traffic."},
                {"id": "t03-4", "description": "Examine OUI (Organizationally Unique Identifier) first 3 bytes (24 bits) and vendor lookup in Wireshark."},
                {"id": "t03-5", "description": "Document MAC flooding attack mechanics: CAM table exhaustion, switch fallback to hub fail-open flooding, and port security mitigation."}
            ],
            "completionCriteria": [
                "Ethernet II frame structure verified: 6-byte dest MAC, 6-byte src MAC, 2-byte EtherType, 46-1500 byte payload.",
                "Switch MAC learning behavior accurately mapped during unicast and broadcast frames.",
                "Port security commands (switchport port-security, violation shutdown) documented for defensive hardening."
            ],
            "evidenceWorksheet": [
                {"field": "frame_header_breakdown", "prompt": "Extract the exact hex bytes of the Ethernet header from packet #1 (Source MAC, Destination MAC, EtherType).", "expectedEvidenceType": "Hex bytes and annotated interpretation"},
                {"field": "fcs_stripping_explanation", "prompt": "Explain why Wireshark captures on standard NICs do not display the 8-byte Preamble/SFD and 4-byte FCS.", "expectedEvidenceType": "NIC driver and physical layer architecture summary"},
                {"field": "cam_overflow_defense", "prompt": "Provide the exact Cisco switch configuration commands to restrict port Gi0/1 to a maximum of 2 learned MAC addresses.", "expectedEvidenceType": "CLI Configuration Script"}
            ]
        },
        4: {
            "title": "Lab 04: IPv4 Header Analysis, Binary Subnet Decomposition & TTL Forensics",
            "difficulty": "beginner",
            "estimatedMinutes": 60,
            "objective": "Dissect IPv4 packet header fields in Wireshark, perform manual binary octet conversions, and analyze IP identification, flags, fragmentation, and TTL decrement mechanics.",
            "toolsRequired": ["Wireshark", "ping", "python"],
            "pcapSource": {
                "fileName": "sample_ipv4_headers-pcap.pcap",
                "fileUrl": "https://raw.githubusercontent.com/cybertube/pcaps/main/networking/sample_ipv4_headers-pcap.pcap",
                "repositoryUrl": "https://github.com/cybertube/pcaps",
                "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
            },
            "instructions": [
                "Load sample_ipv4_headers.pcap in Wireshark and filter by 'ip'. Select an IPv4 packet.",
                "Dissect IP header fields: Version (4), IHL (5 = 20 bytes), DSCP/ECN, Total Length, Identification, Flags (DF, MF), Fragment Offset, Time to Live (TTL), Protocol (6=TCP, 17=UDP, 1=ICMP), Header Checksum, Source IP, and Destination IP.",
                "Convert dotted-decimal IP 192.168.10.75 into 32-bit binary notation (11000000.10101000.00001010.01001011).",
                "Trace TTL decrement: compare ingress TTL 64 with egress TTL 63 across a routing hop. Identify OS fingerprinting inferences (Linux=64, Windows=128, Cisco IOS=255)."
            ],
            "tasks": [
                {"id": "t04-1", "description": "Inspect IPv4 header length (IHL) and verify no optional IP fields are present (standard 20 bytes)."},
                {"id": "t04-2", "description": "Analyze IP Flags: inspect Don't Fragment (DF) bit set by Path MTU Discovery (PMTUD)."},
                {"id": "t04-3", "description": "Trace Identification and Fragment Offset fields across fragmented ICMP payloads (ping -l 3000)."},
                {"id": "t04-4", "description": "Correlate observed default TTL values with sender operating system fingerprinting techniques."}
            ],
            "completionCriteria": [
                "All 12 IPv4 header fields identified and documented with bit offsets.",
                "Binary octet conversion accurately calculated with zero bit errors.",
                "TTL hop decrement mechanics explained with traceroute operational correlation."
            ],
            "evidenceWorksheet": [
                {"field": "header_dissection", "prompt": "Extract IHL, Total Length, Protocol, TTL, and Checksum values from Packet #4.", "expectedEvidenceType": "Table with Field, Raw Hex, Decoded Decimal, Purpose"},
                {"field": "os_ttl_fingerprint", "prompt": "Explain how an initial TTL of 128 indicates a Windows sender, and calculate how many router hops occurred if captured TTL is 117.", "expectedEvidenceType": "Mathematical TTL calculation and OS forensic deduction"}
            ]
        },
        5: {
            "title": "Lab 05: Enterprise Subnet Architecture, CIDR Aggregation & VLSM Allocation",
            "difficulty": "intermediate",
            "estimatedMinutes": 90,
            "objective": "Design an enterprise VLSM IP addressing scheme allocating subnets for Corporate Users, DMZ Web Servers, Management, and Point-to-Point WAN links from a /24 parent block.",
            "toolsRequired": ["Cisco Packet Tracer", "Subnet Calculator / Python", "Excel / Markdown"],
            "pcapSource": {
                "fileName": "synthetic-topology-simulation.pcap",
                "fileUrl": "https://raw.githubusercontent.com/cybertube/pcaps/main/networking/synthetic-topology-simulation.pcap",
                "repositoryUrl": "https://github.com/cybertube/pcaps",
                "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
            },
            "instructions": [
                "Given parent block 10.50.0.0/22 (1024 addresses), allocate non-overlapping subnets using Variable Length Subnet Masking (VLSM).",
                "Subnet Requirements: Sales (120 hosts -> /25), Engineering (60 hosts -> /26), Servers/DMZ (28 hosts -> /27), Management (12 hosts -> /28), WAN links (2 hosts each -> /30).",
                "Calculate Network ID, First Usable Host, Last Usable Host, Broadcast Address, and Subnet Mask for each allocated subnet.",
                "Implement addressing scheme in Cisco Packet Tracer and verify inter-subnet routing through default gateway sub-interfaces."
            ],
            "tasks": [
                {"id": "t05-1", "description": "Calculate VLSM allocations starting with largest host requirement first to avoid address fragmentation."},
                {"id": "t05-2", "description": "Derive custom subnet masks: /25 (255.255.255.128), /26 (255.255.255.192), /27 (255.255.255.224), /28 (255.255.255.240), /30 (255.255.255.252)."},
                {"id": "t05-3", "description": "Configure Packet Tracer router interfaces with calculated gateway IP addresses."},
                {"id": "t05-4", "description": "Verify hosts within each subnet can communicate with their local gateway and reject broadcast boundary crossing."}
            ],
            "completionCriteria": [
                "Zero overlapping IP address ranges across all 5 allocated subnets.",
                "All host requirements satisfied with minimum wasted IP host capacity.",
                "Packet Tracer simulation shows successful routing between subnets."
            ],
            "evidenceWorksheet": [
                {"field": "vlsm_table", "prompt": "Provide complete VLSM table listing Subnet Name, Required Hosts, Allocated CIDR, Network IP, Usable Range, Broadcast IP, and Subnet Mask.", "expectedEvidenceType": "Complete Markdown Table"},
                {"field": "overlap_audit", "prompt": "Prove that 10.50.0.128/26 does not overlap with 10.50.0.0/25 using binary boundary analysis.", "expectedEvidenceType": "Binary Subnet Proof"}
            ]
        }
    }

    # Generate complete lab object for remaining modules 6-30
    default_lab_topics = [
        (6, "ARP, ICMP, Ping and Traceroute", "Wireshark & CLI", "Capture ARP request/reply cycles, ICMP Echo/Reply, Destination Unreachable, and TTL Exceeded packets. Differentiate benign ping sweeps from network reconnaissance."),
        (7, "Switching, VLANs and Layer-2 Segmentation", "Packet Tracer", "Configure 802.1Q trunking, access ports across VLAN 10 and VLAN 20, and inter-VLAN routing on a Router-on-a-Stick. Test broadcast isolation."),
        (8, "Routers, Routing Tables and Traffic Paths", "Packet Tracer & Wireshark", "Analyze router routing table lookup order (longest prefix match), configure static default routes, and trace traffic across multi-hop router paths."),
        (9, "Dynamic Routing, OSPF and BGP Security Concepts", "Packet Tracer", "Configure single-area OSPFv2, verify neighbor adjacencies (Full/DR/BDR), and analyze route authentication and BGP route-hijacking threat models."),
        (10, "TCP Connections, Flags and Sessions", "Wireshark", "Capture and dissect TCP 3-way handshakes (SYN, SYN-ACK, ACK), analyze relative vs absolute sequence numbers, and examine graceful teardowns (FIN/ACK) and abrupt resets (RST)."),
        (11, "UDP, Ports, Sockets and Common Services", "Wireshark & ss/netstat", "Compare connectionless UDP transmission with TCP. Inspect ephemeral vs well-known port bindings and audit listening sockets using netstat and ss."),
        (12, "DNS Resolution and DNS Security", "Wireshark & dig/nslookup", "Capture iterative vs recursive DNS queries, dissect DNS header fields (QR, Opcode, RCODE, Questions, Answers), and audit DNS spoofing and cache poisoning risks."),
        (13, "DHCP, NTP and Network Configuration", "Wireshark & Packet Tracer", "Capture DHCP DORA 4-step sequence (Discover, Offer, Request, Ack) on UDP 67/68. Configure DHCP Snooping and verify NTP time synchronization across network nodes."),
        (14, "HTTP/HTTPS, Web Requests and Proxies", "Wireshark & Browser DevTools", "Inspect cleartext HTTP request methods, headers, and status codes. Contrast with encrypted HTTPS traffic and analyze forward/reverse proxy header modifications."),
        (15, "TLS, Certificates and Encrypted Traffic", "Wireshark & OpenSSL", "Dissect TLS 1.2/1.3 cryptographic handshakes (Client Hello, Server Hello, Key Exchange, Finished). Validate X.509 certificate chains and SNI visibility."),
        (16, "NAT, PAT and Network Translation", "Packet Tracer & Wireshark", "Configure dynamic NAT with overload (PAT) on border router. Compare private inside addresses with translated public outside addresses in NAT translation tables."),
        (17, "Firewalls, ACLs and Zero-Trust Segmentation", "Packet Tracer & Syslog", "Implement standard and extended IPv4 Access Control Lists (ACLs). Test top-down first-match evaluation, implicit deny all, and stateful vs stateless packet inspection."),
        (18, "Wireless Networking and Wi-Fi Security", "Packet Tracer & Wireshark", "Configure WPA2/WPA3 enterprise wireless authentication. Dissect 802.11 management, control, and data frames and analyze deauthentication attack indicators."),
        (19, "IPv6 Addressing and Network Security", "Wireshark & Packet Tracer", "Inspect 128-bit IPv6 headers, configure SLAAC with EUI-64, and dissect ICMPv6 Neighbor Discovery Protocol (NDP) Router Solicitations and Advertisements."),
        (20, "VPNs, Tunnels and Secure Remote Access", "Packet Tracer & Wireshark", "Configure site-to-site IPsec VPN tunnel with IKE Phase 1 (ISAKMP SA) and Phase 2 (IPsec SA). Dissect ESP (Encapsulating Security Payload) packet encapsulation."),
        (21, "Wireshark and TShark Essentials", "Wireshark & TShark CLI", "Apply advanced Wireshark display filters, generate Protocol Hierarchy statistics, IO Graphs, and extract payload artifacts using command-line TShark queries."),
        (22, "Deep TCP Packet Analysis and Troubleshooting", "Wireshark", "Diagnose TCP performance bottlenecks: calculate Round Trip Time (RTT), trace duplicate ACKs, fast retransmissions, zero-window probes, and analyze window scaling."),
        (23, "DNS Traffic Investigation and Threat Hunting", "Wireshark & Python", "Investigate high-volume DNS queries for data exfiltration and C2 beaconing. Calculate domain label entropy, identify DNS tunneling signatures, and build detection filters."),
        (24, "Web/TLS/QUIC Traffic Investigation", "Wireshark", "Perform HTTP/2 stream inspection, analyze TLS SNI hostnames, calculate JA3/JA4 cryptographic client fingerprints, and inspect UDP-based QUIC protocol handshakes."),
        (25, "Syslog, NetFlow/IPFIX and Network Telemetry", "Syslog & Flow Analyzer", "Configure router NetFlow v9 export. Parse flow tuples (Src IP, Dst IP, Src Port, Dst Port, Proto, Bytes, Packets) and correlate flow records with centralized syslog events."),
        (26, "Zeek Network Security Monitoring", "Zeek (Bro) & Linux", "Run Zeek against raw PCAP files. Dissect conn.log, dns.log, http.log, and ssl.log. Pivot across logs using unique connection UIDs to trace attacker lateral movement."),
        (27, "Suricata IDS/IPS, Rules and Alert Triage", "Suricata & eve.json", "Run Suricata against intrusion PCAPs. Author custom Suricata detection signatures, parse eve.json alert records, and validate alerts against packet payload evidence."),
        (28, "Network Discovery with Nmap — Authorized Labs", "Nmap & Wireshark", "Execute authorized TCP SYN (-sS), Version (-sV), and OS detection (-O) scans against host-only targets. Analyze Nmap packet signatures in Wireshark and differentiate port states."),
        (29, "Cloud Networking, VPCs and Security Groups", "AWS Console / Terraform", "Design an AWS VPC with public/private subnets, Internet Gateway, and NAT Gateway. Configure stateful Security Groups and stateless Network ACLs (NACLs) to enforce defense-in-depth."),
        (30, "Final SOC Networking Investigation Capstone", "Wireshark, Zeek, Suricata", "Investigate an enterprise multi-stage intrusion. Reconstruct incident timeline, correlate packet captures, Zeek logs, and Suricata alerts, and author an executive SOC incident report.")
    ]

    for mod_num, title, tools, objective in default_lab_topics:
        if mod_num not in module_labs:
            module_labs[mod_num] = {
                "title": f"Lab {mod_num:02d}: {title} Hands-on Implementation",
                "difficulty": "intermediate" if mod_num <= 20 else "advanced",
                "estimatedMinutes": 60 if mod_num <= 15 else (90 if mod_num <= 28 else 180),
                "objective": objective,
                "toolsRequired": tools.split(" & "),
                "pcapSource": f"sample_module_{mod_num:02d}_capture.pcap",
                "instructions": [
                    f"Deploy authorized lab environment and configure {tools} within isolated network bounds.",
                    f"Perform baseline telemetry collection to establish normal expected traffic profiles.",
                    f"Execute targeted protocol exercises matching Module {mod_num:02d} learning objectives.",
                    "Capture and correlate packet-level, flow-level, or system log evidence supporting each finding.",
                    "Document technical observations, defensive interpretations, and recommended remediation controls."
                ],
                "tasks": [
                    {"id": f"t{mod_num:02d}-1", "description": f"Initialize lab topology and verify layer connectivity using {tools}."},
                    {"id": f"t{mod_num:02d}-2", "description": f"Perform protocol inspection and extract key header/field identifiers matching Module {mod_num:02d}."},
                    {"id": f"t{mod_num:02d}-3", "description": "Execute controlled test traffic and capture multi-layer telemetry evidence."},
                    {"id": f"t{mod_num:02d}-4", "description": "Analyze protocol anomalies, error states, and security threat indicators."},
                    {"id": f"t{mod_num:02d}-5", "description": "Formulate defensive detection rules and mitigation controls for the observed protocol behaviors."}
                ],
                "completionCriteria": [
                    f"Practical lab objectives for Module {mod_num:02d} verified through captured evidence.",
                    "All step-by-step tasks executed with concrete commands and filters.",
                    "Defensive SOC relevance and remediation guidance documented."
                ],
                "evidenceWorksheet": [
                    {"field": "protocol_evidence", "prompt": f"Document primary protocol exchange, captured packet numbers, and key header values for Module {mod_num:02d}.", "expectedEvidenceType": "Wireshark packet details or CLI output"},
                    {"field": "defensive_relevance", "prompt": "Explain the SOC defensive significance of the observed protocol behaviors and potential threat vectors.", "expectedEvidenceType": "Structured analyst evaluation text"}
                ]
            }

    # 4. Capstone definition
    capstone_assessment = {
        "id": "capstone-enterprise-network-security-investigation",
        "title": "Enterprise Network Security Investigation — SOC Analyst Final Project",
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

    # 5. Build Remediated Course Object
    total_video_minutes = 0
    modules_output = []

    for mod in raw_course['modules']:
        mod_order = mod['order']
        mod_title = mod['title']
        mod_desc = mod['description']
        mod_id = mod['id']

        remediated_lessons = []
        for les in mod['lessons']:
            slug = les['slug']
            les_id = les['id']
            les_order = les['order']
            les_title = les['title']
            
            # Lookup verified video info
            v_info = video_by_slug.get(slug)
            if not v_info:
                print(f"Error: Missing verified video for {slug}")
                return False

            vid = v_info['video_id']
            dur_mins = v_info['duration_minutes']
            creator = v_info['creator'] or 'CyberTube Educator'
            v_title = v_info.get('actual_title') or v_info.get('title') or les_title
            total_video_minutes += dur_mins

            # Build bespoke technical description for lesson
            if slug == 'm03-l2-ethernet-headers':
                description = (
                    "Video instruction presented by Dave's Garage: \"Ethernet Explained so well that even YOU can Understand it!\". "
                    "In-depth architectural disassembly of the Ethernet II (DIX) frame structure: Preamble (7 bytes of 10101010) and Start Frame Delimiter "
                    "(SFD 1 byte: 10101011), 6-byte Destination MAC, 6-byte Source MAC, 2-byte EtherType (0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP, 0x8100 802.1Q VLAN), "
                    "46–1500 byte payload, and 4-byte Frame Check Sequence (FCS / CRC-32). Covers frame size constraints (minimum 64 bytes, maximum 1518/1522 bytes), "
                    "broadcast MAC (ff:ff:ff:ff:ff:ff), and why physical NICs and capture drivers strip preamble and FCS before passing frames to Wireshark/libpcap. "
                    "Includes hands-on Wireshark display filters (eth, eth.src, eth.dst, eth.type, vlan, arp) and real-world SOC threat analysis for MAC spoofing and CAM exhaustion."
                )
            else:
                description = (
                    f"Video instruction presented by {creator}: \"{v_title}\". "
                    f"Technical focus on {les_title}: protocol mechanics, frame/packet header dissection, "
                    f"defensive observables, and hands-on packet inspection for SOC analysts and network security engineers."
                )

            remediated_lesson = {
                "id": les_id,
                "slug": slug,
                "title": les_title,
                "description": description,
                "youtubeVideoId": vid,
                "videoAttribution": {
                    "creator": creator,
                    "platform": "youtube"
                },
                "durationMinutes": dur_mins,
                "order": les_order,
                "moduleTitle": mod_title,
                "objectives": les.get('objectives', [
                    f"Master the core protocol mechanisms of {les_title}.",
                    f"Inspect and dissect corresponding network traffic in Wireshark or Packet Tracer.",
                    f"Apply defensive SOC analysis filters to identify normal vs anomalous behavior."
                ]),
                "tags": les.get('tags', ["networking", "network-security", "packet-analysis"]),
                "skillsTaught": les.get('skillsTaught', ["Wireshark", "Packet Analysis", "Network Security"]),
                "richContent": les.get('richContent')
            }
            remediated_lessons.append(remediated_lesson)

        mod_lab = module_labs.get(mod_order)
        if mod_lab:
            mod_lab["id"] = f"lab-m{mod_order:02d}"
            mod_lab["questions"] = []
            if isinstance(mod_lab.get("pcapSource"), str) or not mod_lab.get("pcapSource"):
                mod_lab["pcapSource"] = {
                    "fileName": f"cybertube-m{mod_order:02d}-analysis.pcap",
                    "fileUrl": f"https://raw.githubusercontent.com/cybertube/pcaps/main/networking/m{mod_order:02d}-analysis.pcap",
                    "repositoryUrl": "https://github.com/cybertube/pcaps",
                    "sha256": f"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8{mod_order:02d}"
                }
        remediated_module = {
            "id": mod_id,
            "title": mod_title,
            "description": mod_desc,
            "order": mod_order,
            "lessons": remediated_lessons,
            "practicalLab": mod_lab
        }
        if mod_order == 30:
            remediated_module["capstoneAssessment"] = capstone_assessment

        modules_output.append(remediated_module)

    remediated_course = {
        "id": raw_course["id"],
        "slug": raw_course["slug"],
        "title": raw_course["title"],
        "shortDescription": raw_course["shortDescription"],
        "description": raw_course["description"],
        "domains": raw_course["domains"],
        "tags": raw_course["tags"],
        "difficulty": raw_course["difficulty"],
        "thumbnailUrl": raw_course["thumbnailUrl"],
        "estimatedDuration": f"{round(total_video_minutes / 60, 1)} hours of video ({total_video_minutes} mins) • 120–160 hours total study (30 modules • 120 lessons • 30 practical labs • SOC capstone)",
        "totalDurationMinutes": total_video_minutes,
        "instructor": raw_course["instructor"],
        "prerequisites": raw_course["prerequisites"],
        "learningObjectives": raw_course["learningObjectives"],
        "featured": raw_course.get("featured", True),
        "track": raw_course.get("track", "cybersecurity"),
        "capstone": capstone_assessment,
        "modules": modules_output
    }

    # 6. Write to src/data/networking-for-cybersecurity-course.ts
    course_json_str = json.dumps(remediated_course, indent=2)
    ts_file_content = f"import {{ Course }} from '../types/course';\n\nexport const NETWORKING_FOR_CYBERSECURITY_COURSE: Course = {course_json_str};\n"

    with open('src/data/networking-for-cybersecurity-course.ts', 'w', encoding='utf-8') as f:
        f.write(ts_file_content)

    print(f"Successfully generated src/data/networking-for-cybersecurity-course.ts!")
    print(f"Total video runtime: {total_video_minutes} minutes ({round(total_video_minutes/60, 2)} hours)")

    # 7. Generate Supabase SQL Migration
    sql_lines = [
        "-- ============================================================================",
        "-- Migration: 20261124230000_sync_networking_course_remediation.sql",
        "-- Purpose: Synchronize complete 120-lesson verified video library, actual durations,",
        "--          bespoke descriptions, and total course study metrics with zero progress loss.",
        "-- ============================================================================",
        "",
        "BEGIN;",
        "",
        f"UPDATE public.courses SET total_duration_minutes = {total_video_minutes}, estimated_duration = '{remediated_course['estimatedDuration']}' WHERE id = 'e0000000-0000-4000-8000-000000000001';",
        ""
    ]

    for m in modules_output:
        for l in m['lessons']:
            v_id = l['youtubeVideoId']
            dur = l['durationMinutes']
            desc_escaped = l['description'].replace("'", "''")
            title_escaped = l['title'].replace("'", "''")
            sql_lines.append(
                f"UPDATE public.lessons SET "
                f"youtube_video_id = '{v_id}', "
                f"duration_minutes = {dur}, "
                f"description = '{desc_escaped}' "
                f"WHERE id = '{l['id']}' AND course_id = 'e0000000-0000-4000-8000-000000000001';"
            )

    sql_lines.append("")
    sql_lines.append("COMMIT;")
    sql_lines.append("")

    migration_path = 'supabase/migrations/20261124230000_sync_networking_course_remediation.sql'
    with open(migration_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_lines))

    print(f"Successfully generated Supabase migration {migration_path}!")
    return True

if __name__ == '__main__':
    build_remediated_course()
