-- Phase 2: Independent Semantic Audit & Production Database Synchronization
-- Target Course: Networking for Cybersecurity: Zero to Advanced
-- Migration: 20261125000000_phase2_networking_course_remediation.sql

BEGIN;

-- 1. Update Course Metadata with exact canonical duration (2652 minutes)
UPDATE public.courses
SET 
  total_duration_minutes = 2652,
  estimated_duration = '44.2 hours of video (2652 mins) • 120–160 hours total study (30 modules • 120 lessons • 30 practical labs • SOC capstone)',
  updated_at = NOW()
WHERE id = 'e0000000-0000-4000-8000-000000000001';

-- 2. Synchronize all 120 lessons with exact video IDs, titles, descriptions, and durations
-- Lesson: m01-l1-network-security-roles (e0000000-0001-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'CEKfFnHgQHw',
  duration_minutes = 51,
  description = 'Video instruction presented by ZeroDayVault - Cyber Panchayat: "SOC Analyst L1 Full Course (Day 1) | Complete Beginner Guide to Cyber Security". Technical focus on SOC Tier-1/2/3 operational responsibilities, incident triage lifecycles, and distinguishing administrative network management from defensive threat monitoring.',
  updated_at = NOW()
WHERE id = 'e0000000-0001-4000-8000-000000000001';

-- Lesson: m01-l2-networks-and-endpoints (e0000000-0001-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'H8W9oMNSuwo',
  duration_minutes = 30,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Network Devices | Day 1 | CCNA 200-301 Complete Course". Technical focus on endpoint architecture, network topology hardware, host networking interfaces, and baseline telemetry generated during normal workstation communications.',
  updated_at = NOW()
WHERE id = 'e0000000-0001-4000-8000-000000000002';

-- Lesson: m01-l3-safe-lab-environment (e0000000-0001-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'a1Im6GYaSno',
  duration_minutes = 15,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Packet Tracer Introduction | Day 1 Lab | CCNA 200-301 Complete Course". Technical focus on configuring isolated virtual network testbeds, host-only adapter sandboxing, and executing safe defensive traffic generation without external network exposure.',
  updated_at = NOW()
WHERE id = 'e0000000-0001-4000-8000-000000000003';

-- Lesson: m01-l4-evidence-workflow (e0000000-0001-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'UtDWApdO8Zk',
  duration_minutes = 10,
  description = 'Video instruction presented by Professor Messer: "Digital Forensics - CompTIA Security+ SY0-701 - 4.8". Technical focus on digital evidence acquisition, order of volatility from CPU registers to cold storage, cryptographic hash integrity verification (SHA-256), and establishing legally defensible chain of custody documentation for incident response.',
  updated_at = NOW()
WHERE id = 'e0000000-0001-4000-8000-000000000004';

-- Lesson: m02-l1-seven-osi-layers (e0000000-0002-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'LkolbURrtTs',
  duration_minutes = 13,
  description = 'Video instruction presented by Practical Networking: "OSI Model: A Practical Perspective - Networking Fundamentals - Lesson 2a". Technical focus on practical decomposition of the OSI 7-layer reference model, protocol data units (PDUs) at each boundary, and mapping attack surfaces to layer-specific vulnerabilities.',
  updated_at = NOW()
WHERE id = 'e0000000-0002-4000-8000-000000000001';

-- Lesson: m02-l2-tcp-ip-stack (e0000000-0002-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'yM-XNq9ADlI',
  duration_minutes = 43,
  description = 'Video instruction presented by Jeremy''s IT Lab: "How the TCP/IP Model Actually Works | CCNA Day 3". Technical focus on the four-layer DoD TCP/IP architecture, protocol suite interactions, RFC standards, and comparing theoretical OSI constructs with real-world operating system network stacks.',
  updated_at = NOW()
WHERE id = 'e0000000-0002-4000-8000-000000000002';

-- Lesson: m02-l3-encapsulation (e0000000-0002-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'YJGGYKAV4pA',
  duration_minutes = 27,
  description = 'Video instruction presented by Practical Networking: "How Data moves through the Internet - Networking Fundamentals". Technical focus on protocol encapsulation and decapsulation dynamics, tracking data payloads as headers and trailers are appended across physical, data link, internet, and transport boundaries.',
  updated_at = NOW()
WHERE id = 'e0000000-0002-4000-8000-000000000003';

-- Lesson: m02-l4-security-by-layer (e0000000-0002-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'CYhpEr8GFok',
  duration_minutes = 10,
  description = 'Video instruction presented by Cyber Gray Matter: "OSI Model Layer Attacks, Mitigation & Protocols | Cybersecurity Analyst Training 101". Technical focus on defense-in-depth architectural layering, evaluating security controls at Layer 2 (802.1X, port security), Layer 3 (ACLs, IPsec), Layer 4 (stateful firewalls), and Layer 7 (WAFs, DPI).',
  updated_at = NOW()
WHERE id = 'e0000000-0002-4000-8000-000000000004';

-- Lesson: m03-l1-physical-interfaces (e0000000-0003-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'ieTH5lVhNaY',
  duration_minutes = 36,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Interfaces and Cables | Day 2 | CCNA 200-301 Complete Course". Technical focus on Ethernet physical media standards, copper twisted-pair cabling, optical fiber transceivers, link negotiation, and physical layer signal integrity.',
  updated_at = NOW()
WHERE id = 'e0000000-0003-4000-8000-000000000001';

-- Lesson: m03-l2-ethernet-headers (e0000000-0003-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = '7vzjIv2l6wY',
  duration_minutes = 23,
  description = 'Video instruction presented by Dave''s Garage: "Ethernet Explained so well that even YOU can Understand it!". Technical focus on Ethernet II frame architecture, preamble synchronization, Start Frame Delimiter, 48-bit MAC addressing, EtherType protocol multiplexing, payload padding constraints, and Frame Check Sequence (CRC-32) error detection in Wireshark.',
  updated_at = NOW()
WHERE id = 'e0000000-0003-4000-8000-000000000002';

-- Lesson: m03-l3-switching-behavior (e0000000-0003-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'u2n762WG0Vo',
  duration_minutes = 38,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Ethernet LAN Switching (Part 1) | Day 5 | CCNA 200-301 Complete Course". Technical focus on Layer 2 switch forwarding logic, Content Addressable Memory (CAM) table population, MAC learning algorithms, and unknown unicast frame flooding behavior.',
  updated_at = NOW()
WHERE id = 'e0000000-0003-4000-8000-000000000003';

-- Lesson: m03-l4-layer-2-threats (e0000000-0003-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'ttLNYwt-aq0',
  duration_minutes = 8,
  description = 'Video instruction presented by Professor Messer: "MAC Flooding - CompTIA Network+ N10-009 - 4.2". Technical focus on Layer 2 attack vectors including MAC address table flooding, CAM overflow exhaustion, ARP cache spoofing, and switchport security mitigation controls.',
  updated_at = NOW()
WHERE id = 'e0000000-0003-4000-8000-000000000004';

-- Lesson: m04-l1-binary-and-dotted-decimal (e0000000-0004-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = '3ROdsfEUuhs',
  duration_minutes = 40,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | IPv4 Addressing (Part 1) | Day 7 | CCNA 200-301 Complete Course". Technical focus on binary math fundamentals for network security, 8-bit octet conversions, bitwise AND operations, and representing 32-bit IPv4 addresses in dotted-decimal format.',
  updated_at = NOW()
WHERE id = 'e0000000-0004-4000-8000-000000000001';

-- Lesson: m04-l2-ipv4-address-categories (e0000000-0004-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'JNNcyZ_VE2A',
  duration_minutes = 11,
  description = 'Video instruction presented by Professor Messer: "IPv4 Addressing - CompTIA Network+ N10-009 - 1.7". Technical focus on IPv4 address classification, RFC 1918 private address spaces, APIPA autoconfiguration, loopback ranges, and multicast/broadcast operational boundaries.',
  updated_at = NOW()
WHERE id = 'e0000000-0004-4000-8000-000000000002';

-- Lesson: m04-l3-ip-headers (e0000000-0004-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'aQB22y4liXA',
  duration_minutes = 30,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | IPv4 Header | Day 10 | CCNA 200-301 Complete Course". Technical focus on IPv4 packet header dissection, analyzing TTL expiration, TOS/DiffServ QoS fields, identification, fragmentation flags (DF/MF), and header checksum recalculation.',
  updated_at = NOW()
WHERE id = 'e0000000-0004-4000-8000-000000000003';

-- Lesson: m04-l4-host-addressing (e0000000-0004-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'e1jbvyMeS5I',
  duration_minutes = 10,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Configuring IP Addresses | Day 8 Lab | CCNA 200-301 Complete Course". Technical focus on network interface IP configuration, static versus dynamic address binding, default gateway routing parameters, and local host route table inspection.',
  updated_at = NOW()
WHERE id = 'e0000000-0004-4000-8000-000000000004';

-- Lesson: m05-l1-network-prefix (e0000000-0005-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'bQ8sdpGQu8c',
  duration_minutes = 29,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Subnetting (Part 1) | Day 13 | CCNA 200-301 Complete Course". Technical focus on Classless Inter-Domain Routing (CIDR) notation, subnet masks, prefix lengths, and calculating network and broadcast address boundaries from slash notation.',
  updated_at = NOW()
WHERE id = 'e0000000-0005-4000-8000-000000000001';

-- Lesson: m05-l2-subnet-math (e0000000-0005-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'cYQOMifDlKI',
  duration_minutes = 10,
  description = 'Video instruction presented by Professor Messer: "Calculating IPv4 Subnets and Hosts - CompTIA Network+ N10-009 - 1.7". Technical focus on rapid subnet calculation algorithms, determining usable host address capacity, octet-boundary borrow bits, and validating IP range allocations.',
  updated_at = NOW()
WHERE id = 'e0000000-0005-4000-8000-000000000002';

-- Lesson: m05-l3-vlsm-design (e0000000-0005-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'z-JqCedc9EI',
  duration_minutes = 24,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Subnetting (Part 3 - VLSM) | Day 15 | CCNA 200-301 Complete Course". Technical focus on Variable-Length Subnet Masking (VLSM) hierarchical design, optimizing address allocation across branch offices, and avoiding overlapping address space collisions.',
  updated_at = NOW()
WHERE id = 'e0000000-0005-4000-8000-000000000003';

-- Lesson: m05-l4-security-use-cases (e0000000-0005-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'YL0xh171m8w',
  duration_minutes = 12,
  description = 'Video instruction presented by Secure Terminus: "Your Network Is Flat | Segmentation Architecture Explained". Technical focus on network segmentation strategies, designing VLAN and subnet security boundaries, eliminating flat network attack surfaces, mitigating lateral attacker movement, and establishing zero-trust access control boundaries between enterprise zones.',
  updated_at = NOW()
WHERE id = 'e0000000-0005-4000-8000-000000000004';

-- Lesson: m06-l1-arp-resolution (e0000000-0006-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'gYN2qN11-wE',
  duration_minutes = 12,
  description = 'Video instruction presented by Practical Networking: "Everything Hosts do to speak on the Internet - Part 1 - Networking Fundamentals - Lesson 3". Technical focus on Address Resolution Protocol (ARP) mechanics, broadcast request frames, unicast replies, and local subnet IP-to-MAC hardware binding dynamics.',
  updated_at = NOW()
WHERE id = 'e0000000-0006-4000-8000-000000000001';

-- Lesson: m06-l2-icmp-messages (e0000000-0006-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = '5BahWbszVAY',
  duration_minutes = 8,
  description = 'Video instruction presented by Professor Messer: "Other Useful Protocols - CompTIA Network+ N10-009 - 1.4". Technical focus on Internet Control Message Protocol (ICMP) packet structures, Echo Request/Reply (Type 8/0), Destination Unreachable (Type 3) codes, and TTL Exceeded error telemetry.',
  updated_at = NOW()
WHERE id = 'e0000000-0006-4000-8000-000000000002';

-- Lesson: m06-l3-routing-path-discovery (e0000000-0006-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'up3bcBLZS74',
  duration_minutes = 9,
  description = 'Video instruction presented by PowerCert Animated Videos: "Traceroute (tracert) Explained - Network Troubleshooting". Technical focus on path discovery utilities, analyzing traceroute packet mechanics, incremental TTL expiration, ICMP Time Exceeded hop reporting, and round-trip delay analysis.',
  updated_at = NOW()
WHERE id = 'e0000000-0006-4000-8000-000000000003';

-- Lesson: m06-l4-detection-interpretation (e0000000-0006-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'Evb1x3FJjEo',
  duration_minutes = 8,
  description = 'Video instruction presented by Chris Greer: "Catch a MiTM ARP Poison Attack with Wireshark // Ethical Hacking". Technical focus on identifying network reconnaissance in packet captures, distinguishing benign ICMP monitoring from active ping sweeps, and detecting stealth host discovery probes.',
  updated_at = NOW()
WHERE id = 'e0000000-0006-4000-8000-000000000004';

-- Lesson: m07-l1-broadcast-domains (e0000000-0007-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'cjFzOnm6u1g',
  duration_minutes = 24,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | VLANs (Part 1) | Day 16 | CCNA 200-301 Complete Course". Technical focus on m07-l1-broadcast-domains: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0007-4000-8000-000000000001';

-- Lesson: m07-l2-access-trunk-ports (e0000000-0007-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'Jl9OOzNaBDU',
  duration_minutes = 40,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | VLANs (Part 2) | Day 17 | CCNA 200-301 Complete Course". Technical focus on m07-l2-access-trunk-ports: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0007-4000-8000-000000000002';

-- Lesson: m07-l3-inter-vlan-routing (e0000000-0007-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'OkPB028l2eE',
  duration_minutes = 33,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | VLANs (Part 3) | Day 18 | CCNA 200-301 Complete Course". Technical focus on m07-l3-inter-vlan-routing: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0007-4000-8000-000000000003';

-- Lesson: m07-l4-security-controls (e0000000-0007-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = '0W4JZIWtjLQ',
  duration_minutes = 23,
  description = 'Video instruction presented by NetworkChuck: "you NEED to learn Port Security…….RIGHT NOW!! // FREE CCNA // EP 14". Technical focus on m07-l4-security-controls: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0007-4000-8000-000000000004';

-- Lesson: m08-l1-forwarding-logic (e0000000-0008-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'AzXys5kxpAM',
  duration_minutes = 17,
  description = 'Video instruction presented by Practical Networking: "Everything Routers do - Part 1 - Networking Fundamentals - Lesson 5". Technical focus on m08-l1-forwarding-logic: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0008-4000-8000-000000000001';

-- Lesson: m08-l2-default-gateways (e0000000-0008-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'Ep-x_6kggKA',
  duration_minutes = 15,
  description = 'Video instruction presented by Practical Networking: "Everything Routers do - Part 2 - How Routers forward Packets - Networking Fundamentals - Lesson 5". Technical focus on m08-l2-default-gateways: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0008-4000-8000-000000000002';

-- Lesson: m08-l3-static-routes (e0000000-0008-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'cupc6Helc6Y',
  duration_minutes = 14,
  description = 'Video instruction presented by Network Direction: "Static route configuration | Network Fundamentals Part 18". Technical focus on m08-l3-static-routes: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0008-4000-8000-000000000003';

-- Lesson: m08-l4-security-telemetry (e0000000-0008-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'G8V7abxLHCs',
  duration_minutes = 31,
  description = 'Video instruction presented by M. Atoar Rahman: "The Observability Pipeline: Collecting, Buffering, Processing, Routing, and Storing Telemetry". Technical focus on enterprise routing telemetry architecture, streaming network metrics, monitoring route propagation anomalies, and buffering telemetry feeds for real-time security operations analysis.',
  updated_at = NOW()
WHERE id = 'e0000000-0008-4000-8000-000000000004';

-- Lesson: m09-l1-route-advertisement (e0000000-0009-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'xSTgb8JLkvs',
  duration_minutes = 45,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Dynamic Routing | Day 24 | CCNA 200-301 Complete Course". Technical focus on m09-l1-route-advertisement: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0009-4000-8000-000000000001';

-- Lesson: m09-l2-ospf-mechanics (e0000000-0009-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'pvuaoJ9YzoI',
  duration_minutes = 40,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | OSPF Part 1 | Day 26 | CCNA 200-301 Complete Course". Technical focus on Open Shortest Path First (OSPF) architecture, Link State Advertisements (LSAs), Dijkstra SPF algorithm computation, area hierarchies (Backbone Area 0), and link metrics.',
  updated_at = NOW()
WHERE id = 'e0000000-0009-4000-8000-000000000002';

-- Lesson: m09-l3-routing-integrity (e0000000-0009-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'O6tCoD5c_U0',
  duration_minutes = 16,
  description = 'Video instruction presented by Computerphile: "BGP: Border Gateway Protocol - Computerphile". Technical focus on m09-l3-routing-integrity: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0009-4000-8000-000000000003';

-- Lesson: m09-l4-soc-observables (e0000000-0009-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = '4wG8LcPzvss',
  duration_minutes = 30,
  description = 'Video instruction presented by DKNOG: "BGP Security - Hijack and Route Leak Detection". Technical focus on monitoring BGP routing anomalies, identifying unauthorized prefix hijackings, detecting AS-path manipulations, evaluating route leaks, and operationalizing RPKI Route Origin Authorization (ROA) alerts within a SOC.',
  updated_at = NOW()
WHERE id = 'e0000000-0009-4000-8000-000000000004';

-- Lesson: m10-l1-tcp-handshake (e0000000-000a-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'rmFX1V49K8U',
  duration_minutes = 61,
  description = 'Video instruction presented by David Bombal: "How TCP really works // Three-way handshake // TCP/IP Deep Dive". Technical focus on m10-l1-tcp-handshake: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000a-4000-8000-000000000001';

-- Lesson: m10-l2-tcp-flags (e0000000-000a-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = '4IMc3CaMhyY',
  duration_minutes = 8,
  description = 'Video instruction presented by Ben Eater: "TCP: Transmission control protocol | Networking tutorial (12 of 13)". Technical focus on m10-l2-tcp-flags: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000a-4000-8000-000000000002';

-- Lesson: m10-l3-reliability (e0000000-000a-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'JFch3ctY6nE',
  duration_minutes = 44,
  description = 'Video instruction presented by Practical Networking: "TCP - 12 simple ideas to explain the Transmission Control Protocol". Technical focus on m10-l3-reliability: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000a-4000-8000-000000000003';

-- Lesson: m10-l4-detection-implications (e0000000-000a-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = '0U1UISW_spY',
  duration_minutes = 10,
  description = 'Video instruction presented by Bikash''s Tech: "DAY 9 Wireshark : Why your TCP connections are failing: FIN vs RST". Technical focus on TCP anomaly detection in Wireshark, dissecting abrupt RST connection resets versus graceful FIN handshakes, identifying port scanning probes, and analyzing malicious connection teardown patterns.',
  updated_at = NOW()
WHERE id = 'e0000000-000a-4000-8000-000000000004';

-- Lesson: m11-l1-tcp-versus-udp (e0000000-000b-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'LIEACBqlntY',
  duration_minutes = 34,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | TCP & UDP | Day 30 | CCNA 200-301 Complete Course". Technical focus on m11-l1-tcp-versus-udp: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000b-4000-8000-000000000001';

-- Lesson: m11-l2-port-ranges (e0000000-000b-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'jX1pobYmZdE',
  duration_minutes = 20,
  description = 'Video instruction presented by Professor Messer: "Common Ports - CompTIA Network+ N10-009 - 1.4". Technical focus on m11-l2-port-ranges: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000b-4000-8000-000000000002';

-- Lesson: m11-l3-sockets-and-services (e0000000-000b-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = '9ird7Zcw1ZY',
  duration_minutes = 12,
  description = 'Video instruction presented by Steven Gordon: "Linux Networking: netstat, services, protocols (4 of 6)". Technical focus on network socket architecture, IP-port endpoint binding, inspecting active listening services with netstat and ss, and tracking socket connection state transitions from LISTEN to TIME_WAIT.',
  updated_at = NOW()
WHERE id = 'e0000000-000b-4000-8000-000000000003';

-- Lesson: m11-l4-suspicious-services (e0000000-000b-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'AQS0grHh1r0',
  duration_minutes = 23,
  description = 'Video instruction presented by Cyber Pathshala: "Find Open Ports Like a Hacker | Port Types, Services & Nmap Practical - 2026". Technical focus on m11-l4-suspicious-services: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000b-4000-8000-000000000004';

-- Lesson: m12-l1-resolver-workflow (e0000000-000c-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = '4C6eeQes4cs',
  duration_minutes = 30,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | DNS | Day 38 | CCNA 200-301 Complete Course". Technical focus on m12-l1-resolver-workflow: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000c-4000-8000-000000000001';

-- Lesson: m12-l2-dns-records (e0000000-000c-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'qAyVND44jaE',
  duration_minutes = 9,
  description = 'Video instruction presented by Professor Messer: "DNS Records - CompTIA Network+ N10-009 - 3.4". Technical focus on m12-l2-dns-records: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000c-4000-8000-000000000002';

-- Lesson: m12-l3-dns-traffic (e0000000-000c-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'fRRR0sU0BnY',
  duration_minutes = 9,
  description = 'Video instruction presented by Chris Greer: "Your First DNS Lookup—Captured and Explained". Technical focus on m12-l3-dns-traffic: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000c-4000-8000-000000000003';

-- Lesson: m12-l4-security-cases (e0000000-000c-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = '2QijB5GtNE4',
  duration_minutes = 7,
  description = 'Video instruction presented by Professor Messer: "ARP and DNS Poisoning - CompTIA Network+ N10-009 - 4.2". Technical focus on m12-l4-security-cases: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000c-4000-8000-000000000004';

-- Lesson: m13-l1-dhcp-dora (e0000000-000d-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'hzkleGAC2_Y',
  duration_minutes = 37,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | DHCP | Day 39 | CCNA 200-301 Complete Course". Technical focus on m13-l1-dhcp-dora: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000d-4000-8000-000000000001';

-- Lesson: m13-l2-dhcp-leases (e0000000-000d-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'b7fiXM3vO18',
  duration_minutes = 9,
  description = 'Video instruction presented by Professor Messer: "DHCP - CompTIA Network+ N10-009 - 3.4". Technical focus on m13-l2-dhcp-leases: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000d-4000-8000-000000000002';

-- Lesson: m13-l3-rogue-configuration-indicators (e0000000-000d-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'qYYeg2kz1yE',
  duration_minutes = 28,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | DHCP Snooping | Day 50 | CCNA 200-301 Complete Course". Technical focus on m13-l3-rogue-configuration-indicators: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000d-4000-8000-000000000003';

-- Lesson: m13-l4-ntp-and-timestamp-integrity (e0000000-000d-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'qGJaJx7OfUo',
  duration_minutes = 43,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | NTP | Day 37 | CCNA 200-301 Complete Course". Technical focus on m13-l4-ntp-and-timestamp-integrity: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000d-4000-8000-000000000004';

-- Lesson: m14-l1-http-conversation (e0000000-000e-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'JhpUch6lWMw',
  duration_minutes = 37,
  description = 'Video instruction presented by Hussein Nasser: "What are web servers and how do they work (with examples httpd and nodejs)". Technical focus on m14-l1-http-conversation: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000e-4000-8000-000000000001';

-- Lesson: m14-l2-sessions-and-cookies (e0000000-000e-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'sovAIX4doOE',
  duration_minutes = 69,
  description = 'Video instruction presented by Hussein Nasser: "HTTP Cookies Crash Course". Technical focus on m14-l2-sessions-and-cookies: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000e-4000-8000-000000000002';

-- Lesson: m14-l3-https-visibility (e0000000-000e-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = '06Kq50P01sI',
  duration_minutes = 17,
  description = 'Video instruction presented by Hussein Nasser: "Wiresharking TLS - What happens during TLS 1.2 and TLS 1.3 Handshake". Technical focus on m14-l3-https-visibility: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000e-4000-8000-000000000003';

-- Lesson: m14-l4-proxy-interpretation (e0000000-000e-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'SqqrOspasag',
  duration_minutes = 14,
  description = 'Video instruction presented by Hussein Nasser: "Proxy vs Reverse Proxy Server Explained". Technical focus on m14-l4-proxy-interpretation: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000e-4000-8000-000000000004';

-- Lesson: m15-l1-tls-trust-model (e0000000-000f-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'HMoFvRK4HUo',
  duration_minutes = 8,
  description = 'Video instruction presented by Practical Networking: "What is SSL & TLS ?   What is HTTPS ?   What is an SSL VPN? - Practical TLS". Technical focus on m15-l1-tls-trust-model: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000f-4000-8000-000000000001';

-- Lesson: m15-l2-tls-negotiation (e0000000-000f-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = '64geP_LAZ5U',
  duration_minutes = 6,
  description = 'Video instruction presented by Hussein Nasser: "The TLS Handshake Explained with Example (the Math)". Technical focus on m15-l2-tls-negotiation: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000f-4000-8000-000000000002';

-- Lesson: m15-l3-http-2-and-http-3 (e0000000-000f-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'GriONb4EfPY',
  duration_minutes = 10,
  description = 'Video instruction presented by Hussein Nasser: "HTTP/2 Critical Limitation that led to HTTP/3 & QUIC (Explained by Example)". Technical focus on comparing HTTP/2 stream multiplexing with HTTP/3 QUIC, analyzing Head-of-Line (HoL) blocking inherent in TCP transport during packet loss, and evaluating independent stream delivery over UDP.',
  updated_at = NOW()
WHERE id = 'e0000000-000f-4000-8000-000000000003';

-- Lesson: m15-l4-soc-troubleshooting (e0000000-000f-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'm3I-h9uSgj8',
  duration_minutes = 4,
  description = 'Video instruction presented by Chris Greer: "Let''s FIX a BROKEN TLS Handshake // with Wireshark". Technical focus on m15-l4-soc-troubleshooting: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-000f-4000-8000-000000000004';

-- Lesson: m16-l1-private-addressing (e0000000-0010-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = '2TZCfTgopeg',
  duration_minutes = 32,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | NAT (Part 1) | Day 44 | CCNA 200-301 Complete Course". Technical focus on m16-l1-private-addressing: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0010-4000-8000-000000000001';

-- Lesson: m16-l2-static-vs-dynamic-nat (e0000000-0010-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'vNs1xxiwGJs',
  duration_minutes = 15,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Dynamic NAT | Day 45 Lab | CCNA 200-301 Complete Course". Technical focus on m16-l2-static-vs-dynamic-nat: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0010-4000-8000-000000000002';

-- Lesson: m16-l3-pat-and-port-mapping (e0000000-0010-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'kILDNs4KjYE',
  duration_minutes = 30,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | NAT (part 2) | Day 45 | CCNA 200-301 Complete Course". Technical focus on m16-l3-pat-and-port-mapping: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0010-4000-8000-000000000003';

-- Lesson: m16-l4-soc-attribution (e0000000-0010-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'ZpTyTaKjzDc',
  duration_minutes = 53,
  description = 'Video instruction presented by WireDogSec: "Log Analysis with SIEM | TryHackMe | SOC Level 1 2025". Technical focus on correlating Network Address Translation (NAT) and firewall connection logs, mapping public-facing translation records back to internal host IP addresses, and attributing suspicious egress connections using ephemeral source port tracking.',
  updated_at = NOW()
WHERE id = 'e0000000-0010-4000-8000-000000000004';

-- Lesson: m17-l1-filtering-logic (e0000000-0011-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'z023_eRUtSo',
  duration_minutes = 47,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Standard ACLs | Day 34 | CCNA 200-301 Complete Course". Technical focus on m17-l1-filtering-logic: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0011-4000-8000-000000000001';

-- Lesson: m17-l2-rule-order (e0000000-0011-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'dUttKY_CNXE',
  duration_minutes = 41,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Extended ACLs | Day 35 | CCNA 200-301 Complete Course". Technical focus on m17-l2-rule-order: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0011-4000-8000-000000000002';

-- Lesson: m17-l3-network-zones (e0000000-0011-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'dqlzQXo1wqo',
  duration_minutes = 6,
  description = 'Video instruction presented by PowerCert Animated Videos: "What is a DMZ? (Demilitarized Zone)". Technical focus on m17-l3-network-zones: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0011-4000-8000-000000000003';

-- Lesson: m17-l4-firewall-investigations (e0000000-0011-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'JWGV8rNoZZY',
  duration_minutes = 27,
  description = 'Video instruction presented by InfoSec Pandey: "Day 22 | Firewall Logs Masterclass | Learn Firewall Log Analysis | Analyze Firewall Logs with Splunk". Technical focus on firewall log analysis, dissecting traffic, threat, and system events, querying blocked versus allowed connection sequences in Splunk, and investigating perimeter security policy violations.',
  updated_at = NOW()
WHERE id = 'e0000000-0011-4000-8000-000000000004';

-- Lesson: m18-l1-wireless-architecture (e0000000-0012-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'uX1h0F6wpBY',
  duration_minutes = 38,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Wireless Architectures | Day 56 | CCNA 200-301 Complete Course". Technical focus on m18-l1-wireless-architecture: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0012-4000-8000-000000000001';

-- Lesson: m18-l2-802-11-basics (e0000000-0012-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'zuYiktLqNYQ',
  duration_minutes = 36,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Wireless Fundamentals | Day 55 | CCNA 200-301 Complete Course". Technical focus on m18-l2-802-11-basics: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0012-4000-8000-000000000002';

-- Lesson: m18-l3-authentication (e0000000-0012-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'wHXKo9So5y8',
  duration_minutes = 34,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Wireless Security | Day 57 | CCNA 200-301 Complete Course". Technical focus on m18-l3-authentication: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0012-4000-8000-000000000003';

-- Lesson: m18-l4-wireless-monitoring (e0000000-0012-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = '0UFp3sSLxFI',
  duration_minutes = 4,
  description = 'Video instruction presented by Tall Paul Tech: "802.11 Association And Reassociation Frames". Technical focus on m18-l4-wireless-monitoring: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0012-4000-8000-000000000004';

-- Lesson: m19-l1-ipv6-representation (e0000000-0013-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'ZNuXyOXae5U',
  duration_minutes = 39,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | IPv6 Part 1 | Day 31 | CCNA 200-301 Complete Course". Technical focus on m19-l1-ipv6-representation: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0013-4000-8000-000000000001';

-- Lesson: m19-l2-ndp-and-icmpv6 (e0000000-0013-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'BrTMMOXFhDU',
  duration_minutes = 40,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | IPv6 Part 2 | Day 32 | CCNA 200-301 Complete Course". Technical focus on m19-l2-ndp-and-icmpv6: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0013-4000-8000-000000000002';

-- Lesson: m19-l3-dual-stack-paths (e0000000-0013-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'WSBEVFANMmc',
  duration_minutes = 19,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Configuring IPv6 (Part 3) | Day 33 Lab | CCNA 200-301 Complete Course". Technical focus on m19-l3-dual-stack-paths: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0013-4000-8000-000000000003';

-- Lesson: m19-l4-defensive-checks (e0000000-0013-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'IKyLbvLF8VQ',
  duration_minutes = 13,
  description = 'Video instruction presented by PyNet Labs: "IPv6 RA Guard Explained | Protect Against Rogue Router Advertisements". Technical focus on IPv6 security monitoring, analyzing rogue Router Advertisement (RA) attacks, preventing SLAAC-based man-in-the-middle exploits, and deploying switch-level IPv6 RA Guard and ND Inspection.',
  updated_at = NOW()
WHERE id = 'e0000000-0013-4000-8000-000000000004';

-- Lesson: m20-l1-vpn-use-cases (e0000000-0014-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'Rx8q7N-qZVc',
  duration_minutes = 20,
  description = 'Video instruction presented by The Confused Engineer 😜: "How VPN REALLY Works (Types, Architectures & Troubleshooting)". Technical focus on m20-l1-vpn-use-cases: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0014-4000-8000-000000000001';

-- Lesson: m20-l2-tunnel-endpoints (e0000000-0014-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'tm7i0zEitPQ',
  duration_minutes = 7,
  description = 'Video instruction presented by Professor Messer: "VPNs - CompTIA Network+ N10-009 - 3.5". Technical focus on m20-l2-tunnel-endpoints: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0014-4000-8000-000000000002';

-- Lesson: m20-l3-protocol-concepts (e0000000-0014-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'xTH1ZA_qUvA',
  duration_minutes = 6,
  description = 'Video instruction presented by PowerCert Animated Videos: "IPsec Explained". Technical focus on m20-l3-protocol-concepts: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0014-4000-8000-000000000003';

-- Lesson: m20-l4-soc-monitoring (e0000000-0014-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'o4TFyl-FeRI',
  duration_minutes = 36,
  description = 'Video instruction presented by Motasem Hamdan : "VPN Logs Investigation and Data Analytics With Elastic Stack | TryHackMe | Cyber Security". Technical focus on enterprise VPN log investigation, tracking authentication attempts, detecting credential stuffing and brute-force attacks, identifying impossible travel anomalies, and auditing remote access telemetry in SIEM.',
  updated_at = NOW()
WHERE id = 'e0000000-0014-4000-8000-000000000004';

-- Lesson: m21-l1-capture-safely (e0000000-0015-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'OU-A2EmVrKQ',
  duration_minutes = 16,
  description = 'Video instruction presented by Chris Greer: "Learn Wireshark! Tutorial for BEGINNERS". Technical focus on m21-l1-capture-safely: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0015-4000-8000-000000000001';

-- Lesson: m21-l2-capture-vs-display-filters (e0000000-0015-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'xO69Bl1R07E',
  duration_minutes = 4,
  description = 'Video instruction presented by HackerSploit: "Wireshark Tutorial for Beginners - Filters". Technical focus on m21-l2-capture-vs-display-filters: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0015-4000-8000-000000000002';

-- Lesson: m21-l3-statistics (e0000000-0015-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'ZNS115MPsO0',
  duration_minutes = 9,
  description = 'Video instruction presented by Chris Greer: "Reading PCAPs with Wireshark Statistics // Lesson 8 // Wireshark Tutorial". Technical focus on m21-l3-statistics: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0015-4000-8000-000000000003';

-- Lesson: m21-l4-tshark-workflow (e0000000-0015-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'HoYgPlmOZgo',
  duration_minutes = 13,
  description = 'Video instruction presented by David Bombal: "tshark and Termshark tutorial: Capture and view wireshark captures in a console". Technical focus on m21-l4-tshark-workflow: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0015-4000-8000-000000000004';

-- Lesson: m22-l1-handshake-timing (e0000000-0016-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'SllJu5MdkAg',
  duration_minutes = 10,
  description = 'Video instruction presented by Chris Greer: "Wireshark Tutorial - Lesson 7 // Using the Time Column". Technical focus on m22-l1-handshake-timing: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0016-4000-8000-000000000001';

-- Lesson: m22-l2-retransmissions (e0000000-0016-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'HTQLipAG27I',
  duration_minutes = 9,
  description = 'Video instruction presented by Chris Greer: "How TCP RETRANSMISSIONS Work // Analyzing Packet Loss". Technical focus on packet loss analysis in Wireshark, identifying TCP Fast Retransmissions versus RTO timeout retransmissions, duplicate ACKs, and measuring network packet delay.',
  updated_at = NOW()
WHERE id = 'e0000000-0016-4000-8000-000000000002';

-- Lesson: m22-l3-window-dynamics (e0000000-0016-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'NaEHwrRHfqk',
  duration_minutes = 9,
  description = 'Video instruction presented by Network Direction: "How TCP Handles Errors And Uses Windows | Network Fundamentals Part 9". Technical focus on m22-l3-window-dynamics: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0016-4000-8000-000000000003';

-- Lesson: m22-l4-incident-context (e0000000-0016-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 't5OJephyw8I',
  duration_minutes = 7,
  description = 'Video instruction presented by Chris Greer: "Troubleshooting with Wireshark - Analyzing TCP Resets". Technical focus on network incident analysis, troubleshooting network resets, determining whether TCP resets are caused by server crashes, firewall blocks, or active RST injection.',
  updated_at = NOW()
WHERE id = 'e0000000-0016-4000-8000-000000000004';

-- Lesson: m23-l1-dns-traffic-baseline (e0000000-0017-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = '3FPaTvCJojQ',
  duration_minutes = 18,
  description = 'Video instruction presented by Chris Greer: "How DNS Works Under the Hood (Packet by Packet)". Technical focus on m23-l1-dns-traffic-baseline: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0017-4000-8000-000000000001';

-- Lesson: m23-l2-long-and-encoded-labels (e0000000-0017-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'CaFo83TlpPM',
  duration_minutes = 12,
  description = 'Video instruction presented by Tom Olzak: "DNS Tunneling Identification and Defense". Technical focus on m23-l2-long-and-encoded-labels: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0017-4000-8000-000000000002';

-- Lesson: m23-l3-resolver-anomalies (e0000000-0017-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'N7vGxbZsyzc',
  duration_minutes = 11,
  description = 'Video instruction presented by STAARKEN INFOSEC (Fortify Solutions): "DNS Tunneling Attack & Access Target Shell | Full Hands-On Ethical Hacking Lab". Technical focus on detecting DNS resolver anomalies, identifying high-entropy subdomain requests and abnormal TXT query volume, and uncovering DNS tunneling and covert data exfiltration channels in Wireshark.',
  updated_at = NOW()
WHERE id = 'e0000000-0017-4000-8000-000000000003';

-- Lesson: m23-l4-triage-workflow (e0000000-0017-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'xqukCIPQ1wE',
  duration_minutes = 7,
  description = 'Video instruction presented by Mohd Maaz: "Detect DNS Beaconing with Splunk  Threat Hunting Tutorial". Technical focus on m23-l4-triage-workflow: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0017-4000-8000-000000000004';

-- Lesson: m24-l1-web-flow-reconstruction (e0000000-0018-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'Fn__yRYW6Wo',
  duration_minutes = 5,
  description = 'Video instruction presented by Chris Greer: "Extracting Files from PCAPs with Wireshark // Lesson 9 // Wireshark Tutorial". Technical focus on reconstructing HTTP and web application sessions from raw packet captures, extracting embedded files, images, and executables, and auditing web transaction headers.',
  updated_at = NOW()
WHERE id = 'e0000000-0018-4000-8000-000000000001';

-- Lesson: m24-l2-encrypted-metadata (e0000000-0018-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'v0tgVm-QE9E',
  duration_minutes = 15,
  description = 'Video instruction presented by Security BSides London: "Visualising TLS Fingerprints With TMAP To Hunt Malicious Domains - Amanda Thomson". Technical focus on m24-l2-encrypted-metadata: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0018-4000-8000-000000000002';

-- Lesson: m24-l3-quic-basics (e0000000-0018-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'yodDbgoCnLM',
  duration_minutes = 28,
  description = 'Video instruction presented by David Bombal: "Decrypting TLS, HTTP/2 and QUIC with Wireshark". Technical focus on m24-l3-quic-basics: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.',
  updated_at = NOW()
WHERE id = 'e0000000-0018-4000-8000-000000000003';

-- Lesson: m24-l4-incident-report (e0000000-0018-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = '097y4P80WnI',
  duration_minutes = 12,
  description = 'Video instruction presented by Watchman: "Incident Report Writing (LEARN CYBER SECURITY TODAY!)". Technical focus on authoring forensic incident response reports, documenting network evidence timelines, presenting packet capture artifacts, and drafting executive defense summaries.',
  updated_at = NOW()
WHERE id = 'e0000000-0018-4000-8000-000000000004';

-- Lesson: m25-l1-telemetry-sources (e0000000-0019-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'JSP-yOBRbrg',
  duration_minutes = 34,
  description = 'Video instruction presented by TechSky - Ethical Hacking: "How to Monitor Network Traffic (SOC Analyst Lab with TShark, Zeek & Suricata)". Technical focus on enterprise network telemetry data sources, comparing full packet capture (PCAP) with flow metadata, proxy logs, firewall events, and endpoint telemetry.',
  updated_at = NOW()
WHERE id = 'e0000000-0019-4000-8000-000000000001';

-- Lesson: m25-l2-syslog-fields (e0000000-0019-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'RaQPSKQ4J5A',
  duration_minutes = 28,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Syslog | Day 41 | CCNA 200-301 Complete Course". Technical focus on Syslog protocol standards (RFC 3164 / RFC 5424), facility and severity levels (0-7), message structure formatting, and secure TLS syslog transport.',
  updated_at = NOW()
WHERE id = 'e0000000-0019-4000-8000-000000000002';

-- Lesson: m25-l3-flow-records (e0000000-0019-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'lL7xRH_BpHU',
  duration_minutes = 6,
  description = 'Video instruction presented by TrainerTests: "NetFlow & IPFIX Explained: Troubleshooting Networks with Flow Data (Networking Basics)". Technical focus on NetFlow v5/v9, IPFIX, and sFlow architectures, flow cache generation, unidirectional session tracking, and bandwidth utilization telemetry.',
  updated_at = NOW()
WHERE id = 'e0000000-0019-4000-8000-000000000003';

-- Lesson: m25-l4-correlation-basics (e0000000-0019-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'h2KfYmACu2s',
  duration_minutes = 74,
  description = 'Video instruction presented by CyberWarFare Labs : "Log Correlation & Attack Mapping: A SOC Analyst’s Playbook | Free Live Cybersecurity Workshop 2026". Technical focus on cross-telemetry event correlation in modern SIEM systems, joining firewall drops, IDS alerts, and flow logs to trace multi-stage attack paths.',
  updated_at = NOW()
WHERE id = 'e0000000-0019-4000-8000-000000000004';

-- Lesson: m26-l1-zeek-architecture (e0000000-001a-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'e1cwKwshC9I',
  duration_minutes = 52,
  description = 'Video instruction presented by Hank Hackerson: "SOC Lvl 1 / EP.16a / Zeek Tutorial Pt.1 / Security Analyst Training". Technical focus on Zeek (formerly Bro) network security monitoring architecture, event engine parsing, policy script interpreter, and automated protocol dissection.',
  updated_at = NOW()
WHERE id = 'e0000000-001a-4000-8000-000000000001';

-- Lesson: m26-l2-conn-log-basics (e0000000-001a-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'bznH1yMyjjo',
  duration_minutes = 13,
  description = 'Video instruction presented by John Hubbard: "12 Days of Defense - Day 2: How to use Zeek for PCAP Analysis". Technical focus on Zeek `conn.log` forensic fields, analyzing connection duration, byte counters (orig/resp bytes), connection state history flags (SF, S0, REJ, RSTO), and session triage.',
  updated_at = NOW()
WHERE id = 'e0000000-001a-4000-8000-000000000002';

-- Lesson: m26-l3-protocol-logs (e0000000-001a-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = '-eLI0_OCEmk',
  duration_minutes = 18,
  description = 'Video instruction presented by Threat Hunter''s Daily: "Introduction to Zeek network security monitoring, conn.log and pivoting with Zeek UIDs". Technical focus on Zeek protocol log correlation, inspecting `http.log`, `dns.log`, `ssl.log`, and `files.log`, tracking file SHA-256 hashes, and pivoting on unique connection UIDs.',
  updated_at = NOW()
WHERE id = 'e0000000-001a-4000-8000-000000000003';

-- Lesson: m26-l4-hunting-logic (e0000000-001a-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'Uvb2R8W0E-I',
  duration_minutes = 7,
  description = 'Video instruction presented by Rajneesh Gupta: "Splunk Basics: Zeek Connection Log Analysis". Technical focus on threat hunting with Zeek logs, writing custom Zeek scripts for behavioral anomaly detection, and querying Zeek telemetry in Splunk or ELK.',
  updated_at = NOW()
WHERE id = 'e0000000-001a-4000-8000-000000000004';

-- Lesson: m27-l1-ids-vs-ips (e0000000-001b-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = '91i7InHVOso',
  duration_minutes = 11,
  description = 'Video instruction presented by HackerSploit: "Introduction To Suricata IDS". Technical focus on Suricata multi-threaded network threat detection engine, inspecting packet acquisition modules (AF_PACKET, PF_RING), and inline IPS drop capabilities.',
  updated_at = NOW()
WHERE id = 'e0000000-001b-4000-8000-000000000001';

-- Lesson: m27-l2-rule-anatomy (e0000000-001b-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'd-t-8lJ2PII',
  duration_minutes = 17,
  description = 'Video instruction presented by Insane Cyber: "Writing Suricata Rules: Understanding The Basic Rule Format". Technical focus on Suricata rule syntax anatomy, action keywords (alert/drop/pass), protocol definitions, direction operators, and content matching keywords (`uricontent`, `pcre`, `classtype`).',
  updated_at = NOW()
WHERE id = 'e0000000-001b-4000-8000-000000000002';

-- Lesson: m27-l3-eve-json-events (e0000000-001b-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'zUqHTf-jjeA',
  duration_minutes = 20,
  description = 'Video instruction presented by Maurice Gardner: "Examine alerts, logs, and rules with Suricata". Technical focus on Suricata `eve.json` unified event logging, parsing alert payloads, metadata tags, flow records, and streaming eve events to SIEM pipelines.',
  updated_at = NOW()
WHERE id = 'e0000000-001b-4000-8000-000000000003';

-- Lesson: m27-l4-alert-validation (e0000000-001b-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = '0WgyiOxCFzE',
  duration_minutes = 75,
  description = 'Video instruction presented by SharkFest Wireshark Developer and User Conference: "SF20V - 18 Intrusion Analysis and Threat Hunting with Suricata (Josh Stroschein/Jack Mott)". Technical focus on Suricata intrusion alert triage, correlating eve.json alert records with raw packet captures in Wireshark, validating true positive exploits, and tuning detection signatures to eliminate false-positive alert fatigue.',
  updated_at = NOW()
WHERE id = 'e0000000-001b-4000-8000-000000000004';

-- Lesson: m28-l1-discovery-basics (e0000000-001c-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = '2rRSDGNo_Uo',
  duration_minutes = 6,
  description = 'Video instruction presented by Chris Greer: "Getting Started with Nmap - Full Course with @davidbombal!!". Technical focus on network reconnaissance fundamentals, passive OSINT gathering versus active network scanning, ARP sweeps, and ICMP host discovery with Nmap.',
  updated_at = NOW()
WHERE id = 'e0000000-001c-4000-8000-000000000001';

-- Lesson: m28-l2-port-state-interpretation (e0000000-001c-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'VFJLMOk6daQ',
  duration_minutes = 10,
  description = 'Video instruction presented by HackerSploit: "Nmap Tutorial For Beginners - 2 - Advanced Scanning". Technical focus on Nmap port scanning mechanics, interpreting port states (Open, Closed, Filtered, Unfiltered), and analyzing SYN scan (`-sS`) versus TCP Connect (`-sT`) packet responses.',
  updated_at = NOW()
WHERE id = 'e0000000-001c-4000-8000-000000000002';

-- Lesson: m28-l3-service-identification (e0000000-001c-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'j3H7O-hBrI0',
  duration_minutes = 4,
  description = 'Video instruction presented by ACW360: "Part 7 — Version Detection & OS Fingerprinting: -sV & -O". Technical focus on active service version probing (`-sV`) and OS fingerprinting (`-O`), evaluating banner grabbing probes, and identifying vulnerable application versions.',
  updated_at = NOW()
WHERE id = 'e0000000-001c-4000-8000-000000000003';

-- Lesson: m28-l4-defensive-visibility (e0000000-001c-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'Maec4f2gt2c',
  duration_minutes = 37,
  description = 'Video instruction presented by Plaintext Packets: "How NMAP Works and How to Detect Port Scans in Wireshark". Technical focus on detecting Nmap reconnaissance from the defensive perspective, identifying scanning footprints in Wireshark, and configuring firewall rate limiting to thwart reconnaissance.',
  updated_at = NOW()
WHERE id = 'e0000000-001c-4000-8000-000000000004';

-- Lesson: m29-l1-virtual-networks (e0000000-001d-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = '7_NNlnH7sAg',
  duration_minutes = 10,
  description = 'Video instruction presented by Tiny Technical Tutorials: "Amazon/AWS VPC (Virtual Private Cloud) Basics | VPC Tutorial | AWS for Beginners". Technical focus on Cloud Virtual Private Cloud (VPC) architecture, software-defined networking (SDN) overlays, overlay encapsulation (VXLAN/GENEVE), and multi-tenant isolation.',
  updated_at = NOW()
WHERE id = 'e0000000-001d-4000-8000-000000000001';

-- Lesson: m29-l2-ingress-and-egress (e0000000-001d-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'ksJWwkG_p4M',
  duration_minutes = 9,
  description = 'Video instruction presented by KnoDAX: "AWS VPC Routing | VPC Routing Tutorial | Understanding Route Tables, Internet Gateway, and Subnets". Technical focus on cloud network ingress and egress traffic control, routing tables, Internet Gateways (IGW), NAT Gateways, and managing perimeter cloud egress points.',
  updated_at = NOW()
WHERE id = 'e0000000-001d-4000-8000-000000000002';

-- Lesson: m29-l3-security-groups-and-acls (e0000000-001d-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'rTs13yQq8A0',
  duration_minutes = 8,
  description = 'Video instruction presented by LearnITGuide Tutorials: "AWS Security Groups vs Network ACLs: Key Differences Explained 2026". Technical focus on cloud defense-in-depth security, contrasting stateful Security Groups applied at elastic network interfaces with stateless Network Access Control Lists (NACLs) at subnet boundaries.',
  updated_at = NOW()
WHERE id = 'e0000000-001d-4000-8000-000000000003';

-- Lesson: m29-l4-cloud-network-evidence (e0000000-001d-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'noBOOD7uLJE',
  duration_minutes = 26,
  description = 'Video instruction presented by Cloud Security Masterclass: "AWS Security Labs | AWS VPC Flow Logs". Technical focus on cloud network forensic investigation, analyzing AWS/Azure VPC Flow Logs, tracking ACCEPT and REJECT events, and investigating cloud lateral movement.',
  updated_at = NOW()
WHERE id = 'e0000000-001d-4000-8000-000000000004';

-- Lesson: m30-l1-scoping-and-timeline (e0000000-001e-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'X3RGOPEhDw4',
  duration_minutes = 22,
  description = 'Video instruction presented by MyDFIR: "Cybersecurity SOC Analyst Lab - Web Investigation (PCAP)". Technical focus on scoping enterprise network security incidents, establishing investigative boundaries, correlating multi-sensor timestamps, and building forensic event timelines.',
  updated_at = NOW()
WHERE id = 'e0000000-001e-4000-8000-000000000001';

-- Lesson: m30-l2-multi-source-analysis (e0000000-001e-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = '0Ji16Q4zdGQ',
  duration_minutes = 9,
  description = 'Video instruction presented by root: "How zeek and kibana work in Security Onion.". Technical focus on multi-source network evidence corroboration, fusing raw PCAPs, Zeek logs, firewall alerts, and endpoint telemetry into a unified investigation narrative.',
  updated_at = NOW()
WHERE id = 'e0000000-001e-4000-8000-000000000002';

-- Lesson: m30-l3-judgment-and-caveats (e0000000-001e-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'M8yoYmiL7rA',
  duration_minutes = 24,
  description = 'Video instruction presented by Simply Cyber - Gerald Auger, PhD: "SOC Analyst Skills - Wireshark Malicious Traffic Analysis". Technical focus on analytical judgment in SOC investigations, evaluating evidence confidence levels, stating technical caveats, identifying anti-forensic indicators, and avoiding attribution bias.',
  updated_at = NOW()
WHERE id = 'e0000000-001e-4000-8000-000000000003';

-- Lesson: m30-l4-communication-and-defense (e0000000-001e-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'GVkyFvQVlPY',
  duration_minutes = 15,
  description = 'Video instruction presented by Motasem Hamdan: "How to Write a Professional Incident Response Report (DFIR Guide)". Technical focus on executive communication and technical incident defense, structuring professional SOC post-incident documentation, briefing leadership on business impact, and presenting containment proposals.',
  updated_at = NOW()
WHERE id = 'e0000000-001e-4000-8000-000000000004';

COMMIT;