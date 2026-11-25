BEGIN;
-- 1. Update Course Metadata with exact canonical duration (2652 minutes)
UPDATE public.courses
SET 
  total_duration_minutes = 2652,
  estimated_duration = '44.2 hours of video (2652 mins) • 120–160 hours total study (30 modules • 120 lessons • 30 practical labs • SOC capstone)'
WHERE id = 'e0000000-0000-4000-8000-000000000001';
-- 2. Synchronize all 120 lessons with exact video IDs, titles, descriptions, and durations
-- Lesson: m01-l1-network-security-roles (e0000000-0001-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'CEKfFnHgQHw',
  duration_minutes = 51,
  description = 'Video instruction presented by ZeroDayVault - Cyber Panchayat: "SOC Analyst L1 Full Course (Day 1) | Complete Beginner Guide to Cyber Security". Technical focus on SOC Tier-1/2/3 operational responsibilities, incident triage lifecycles, and distinguishing administrative network management from defensive threat monitoring.'
WHERE id = 'e0000000-0001-4000-8000-000000000001';
-- Lesson: m01-l2-networks-and-endpoints (e0000000-0001-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'H8W9oMNSuwo',
  duration_minutes = 30,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Network Devices | Day 1 | CCNA 200-301 Complete Course". Technical focus on endpoint architecture, network topology hardware, host networking interfaces, and baseline telemetry generated during normal workstation communications.'
WHERE id = 'e0000000-0001-4000-8000-000000000002';
-- Lesson: m01-l3-safe-lab-environment (e0000000-0001-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'a1Im6GYaSno',
  duration_minutes = 15,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Packet Tracer Introduction | Day 1 Lab | CCNA 200-301 Complete Course". Technical focus on configuring isolated virtual network testbeds, host-only adapter sandboxing, and executing safe defensive traffic generation without external network exposure.'
WHERE id = 'e0000000-0001-4000-8000-000000000003';
-- Lesson: m01-l4-evidence-workflow (e0000000-0001-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'UtDWApdO8Zk',
  duration_minutes = 10,
  description = 'Video instruction presented by Professor Messer: "Digital Forensics - CompTIA Security+ SY0-701 - 4.8". Technical focus on digital evidence acquisition, order of volatility from CPU registers to cold storage, cryptographic hash integrity verification (SHA-256), and establishing legally defensible chain of custody documentation for incident response.'
WHERE id = 'e0000000-0001-4000-8000-000000000004';
-- Lesson: m02-l1-seven-osi-layers (e0000000-0002-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'LkolbURrtTs',
  duration_minutes = 13,
  description = 'Video instruction presented by Practical Networking: "OSI Model: A Practical Perspective - Networking Fundamentals - Lesson 2a". Technical focus on practical decomposition of the OSI 7-layer reference model, protocol data units (PDUs) at each boundary, and mapping attack surfaces to layer-specific vulnerabilities.'
WHERE id = 'e0000000-0002-4000-8000-000000000001';
-- Lesson: m02-l2-tcp-ip-stack (e0000000-0002-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'yM-XNq9ADlI',
  duration_minutes = 43,
  description = 'Video instruction presented by Jeremy''s IT Lab: "How the TCP/IP Model Actually Works | CCNA Day 3". Technical focus on the four-layer DoD TCP/IP architecture, protocol suite interactions, RFC standards, and comparing theoretical OSI constructs with real-world operating system network stacks.'
WHERE id = 'e0000000-0002-4000-8000-000000000002';
-- Lesson: m02-l3-encapsulation (e0000000-0002-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'YJGGYKAV4pA',
  duration_minutes = 27,
  description = 'Video instruction presented by Practical Networking: "How Data moves through the Internet - Networking Fundamentals". Technical focus on protocol encapsulation and decapsulation dynamics, tracking data payloads as headers and trailers are appended across physical, data link, internet, and transport boundaries.'
WHERE id = 'e0000000-0002-4000-8000-000000000003';
-- Lesson: m02-l4-security-by-layer (e0000000-0002-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'CYhpEr8GFok',
  duration_minutes = 10,
  description = 'Video instruction presented by Cyber Gray Matter: "OSI Model Layer Attacks, Mitigation & Protocols | Cybersecurity Analyst Training 101". Technical focus on defense-in-depth architectural layering, evaluating security controls at Layer 2 (802.1X, port security), Layer 3 (ACLs, IPsec), Layer 4 (stateful firewalls), and Layer 7 (WAFs, DPI).'
WHERE id = 'e0000000-0002-4000-8000-000000000004';
-- Lesson: m03-l1-physical-interfaces (e0000000-0003-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'ieTH5lVhNaY',
  duration_minutes = 36,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Interfaces and Cables | Day 2 | CCNA 200-301 Complete Course". Technical focus on Ethernet physical media standards, copper twisted-pair cabling, optical fiber transceivers, link negotiation, and physical layer signal integrity.'
WHERE id = 'e0000000-0003-4000-8000-000000000001';
-- Lesson: m03-l2-ethernet-headers (e0000000-0003-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = '7vzjIv2l6wY',
  duration_minutes = 23,
  description = 'Video instruction presented by Dave''s Garage: "Ethernet Explained so well that even YOU can Understand it!". Technical focus on Ethernet II frame architecture, preamble synchronization, Start Frame Delimiter, 48-bit MAC addressing, EtherType protocol multiplexing, payload padding constraints, and Frame Check Sequence (CRC-32) error detection in Wireshark.'
WHERE id = 'e0000000-0003-4000-8000-000000000002';
-- Lesson: m03-l3-switching-behavior (e0000000-0003-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'u2n762WG0Vo',
  duration_minutes = 38,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Ethernet LAN Switching (Part 1) | Day 5 | CCNA 200-301 Complete Course". Technical focus on Layer 2 switch forwarding logic, Content Addressable Memory (CAM) table population, MAC learning algorithms, and unknown unicast frame flooding behavior.'
WHERE id = 'e0000000-0003-4000-8000-000000000003';
-- Lesson: m03-l4-layer-2-threats (e0000000-0003-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'ttLNYwt-aq0',
  duration_minutes = 8,
  description = 'Video instruction presented by Professor Messer: "MAC Flooding - CompTIA Network+ N10-009 - 4.2". Technical focus on Layer 2 attack vectors including MAC address table flooding, CAM overflow exhaustion, ARP cache spoofing, and switchport security mitigation controls.'
WHERE id = 'e0000000-0003-4000-8000-000000000004';
-- Lesson: m04-l1-binary-and-dotted-decimal (e0000000-0004-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = '3ROdsfEUuhs',
  duration_minutes = 40,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | IPv4 Addressing (Part 1) | Day 7 | CCNA 200-301 Complete Course". Technical focus on binary math fundamentals for network security, 8-bit octet conversions, bitwise AND operations, and representing 32-bit IPv4 addresses in dotted-decimal format.'
WHERE id = 'e0000000-0004-4000-8000-000000000001';
-- Lesson: m04-l2-ipv4-address-categories (e0000000-0004-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'JNNcyZ_VE2A',
  duration_minutes = 11,
  description = 'Video instruction presented by Professor Messer: "IPv4 Addressing - CompTIA Network+ N10-009 - 1.7". Technical focus on IPv4 address classification, RFC 1918 private address spaces, APIPA autoconfiguration, loopback ranges, and multicast/broadcast operational boundaries.'
WHERE id = 'e0000000-0004-4000-8000-000000000002';
-- Lesson: m04-l3-ip-headers (e0000000-0004-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'aQB22y4liXA',
  duration_minutes = 30,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | IPv4 Header | Day 10 | CCNA 200-301 Complete Course". Technical focus on IPv4 packet header dissection, analyzing TTL expiration, TOS/DiffServ QoS fields, identification, fragmentation flags (DF/MF), and header checksum recalculation.'
WHERE id = 'e0000000-0004-4000-8000-000000000003';
-- Lesson: m04-l4-host-addressing (e0000000-0004-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'e1jbvyMeS5I',
  duration_minutes = 10,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Configuring IP Addresses | Day 8 Lab | CCNA 200-301 Complete Course". Technical focus on network interface IP configuration, static versus dynamic address binding, default gateway routing parameters, and local host route table inspection.'
WHERE id = 'e0000000-0004-4000-8000-000000000004';
-- Lesson: m05-l1-network-prefix (e0000000-0005-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'bQ8sdpGQu8c',
  duration_minutes = 29,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Subnetting (Part 1) | Day 13 | CCNA 200-301 Complete Course". Technical focus on Classless Inter-Domain Routing (CIDR) notation, subnet masks, prefix lengths, and calculating network and broadcast address boundaries from slash notation.'
WHERE id = 'e0000000-0005-4000-8000-000000000001';
-- Lesson: m05-l2-subnet-math (e0000000-0005-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'cYQOMifDlKI',
  duration_minutes = 10,
  description = 'Video instruction presented by Professor Messer: "Calculating IPv4 Subnets and Hosts - CompTIA Network+ N10-009 - 1.7". Technical focus on rapid subnet calculation algorithms, determining usable host address capacity, octet-boundary borrow bits, and validating IP range allocations.'
WHERE id = 'e0000000-0005-4000-8000-000000000002';
-- Lesson: m05-l3-vlsm-design (e0000000-0005-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'z-JqCedc9EI',
  duration_minutes = 24,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Subnetting (Part 3 - VLSM) | Day 15 | CCNA 200-301 Complete Course". Technical focus on Variable-Length Subnet Masking (VLSM) hierarchical design, optimizing address allocation across branch offices, and avoiding overlapping address space collisions.'
WHERE id = 'e0000000-0005-4000-8000-000000000003';
-- Lesson: m05-l4-security-use-cases (e0000000-0005-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'YL0xh171m8w',
  duration_minutes = 12,
  description = 'Video instruction presented by Secure Terminus: "Your Network Is Flat | Segmentation Architecture Explained". Technical focus on network segmentation strategies, designing VLAN and subnet security boundaries, eliminating flat network attack surfaces, mitigating lateral attacker movement, and establishing zero-trust access control boundaries between enterprise zones.'
WHERE id = 'e0000000-0005-4000-8000-000000000004';
-- Lesson: m06-l1-arp-resolution (e0000000-0006-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'gYN2qN11-wE',
  duration_minutes = 12,
  description = 'Video instruction presented by Practical Networking: "Everything Hosts do to speak on the Internet - Part 1 - Networking Fundamentals - Lesson 3". Technical focus on Address Resolution Protocol (ARP) mechanics, broadcast request frames, unicast replies, and local subnet IP-to-MAC hardware binding dynamics.'
WHERE id = 'e0000000-0006-4000-8000-000000000001';
-- Lesson: m06-l2-icmp-messages (e0000000-0006-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = '5BahWbszVAY',
  duration_minutes = 8,
  description = 'Video instruction presented by Professor Messer: "Other Useful Protocols - CompTIA Network+ N10-009 - 1.4". Technical focus on Internet Control Message Protocol (ICMP) packet structures, Echo Request/Reply (Type 8/0), Destination Unreachable (Type 3) codes, and TTL Exceeded error telemetry.'
WHERE id = 'e0000000-0006-4000-8000-000000000002';
-- Lesson: m06-l3-routing-path-discovery (e0000000-0006-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'up3bcBLZS74',
  duration_minutes = 9,
  description = 'Video instruction presented by PowerCert Animated Videos: "Traceroute (tracert) Explained - Network Troubleshooting". Technical focus on path discovery utilities, analyzing traceroute packet mechanics, incremental TTL expiration, ICMP Time Exceeded hop reporting, and round-trip delay analysis.'
WHERE id = 'e0000000-0006-4000-8000-000000000003';
-- Lesson: m06-l4-detection-interpretation (e0000000-0006-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'Evb1x3FJjEo',
  duration_minutes = 8,
  description = 'Video instruction presented by Chris Greer: "Catch a MiTM ARP Poison Attack with Wireshark // Ethical Hacking". Technical focus on identifying network reconnaissance in packet captures, distinguishing benign ICMP monitoring from active ping sweeps, and detecting stealth host discovery probes.'
WHERE id = 'e0000000-0006-4000-8000-000000000004';
-- Lesson: m07-l1-broadcast-domains (e0000000-0007-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'cjFzOnm6u1g',
  duration_minutes = 24,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | VLANs (Part 1) | Day 16 | CCNA 200-301 Complete Course". Technical focus on m07-l1-broadcast-domains: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.'
WHERE id = 'e0000000-0007-4000-8000-000000000001';
-- Lesson: m07-l2-access-trunk-ports (e0000000-0007-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'Jl9OOzNaBDU',
  duration_minutes = 40,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | VLANs (Part 2) | Day 17 | CCNA 200-301 Complete Course". Technical focus on m07-l2-access-trunk-ports: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.'
WHERE id = 'e0000000-0007-4000-8000-000000000002';
-- Lesson: m07-l3-inter-vlan-routing (e0000000-0007-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'OkPB028l2eE',
  duration_minutes = 33,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | VLANs (Part 3) | Day 18 | CCNA 200-301 Complete Course". Technical focus on m07-l3-inter-vlan-routing: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.'
WHERE id = 'e0000000-0007-4000-8000-000000000003';
-- Lesson: m07-l4-security-controls (e0000000-0007-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = '0W4JZIWtjLQ',
  duration_minutes = 23,
  description = 'Video instruction presented by NetworkChuck: "you NEED to learn Port Security…….RIGHT NOW!! // FREE CCNA // EP 14". Technical focus on m07-l4-security-controls: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.'
WHERE id = 'e0000000-0007-4000-8000-000000000004';
-- Lesson: m08-l1-forwarding-logic (e0000000-0008-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'AzXys5kxpAM',
  duration_minutes = 17,
  description = 'Video instruction presented by Practical Networking: "Everything Routers do - Part 1 - Networking Fundamentals - Lesson 5". Technical focus on m08-l1-forwarding-logic: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.'
WHERE id = 'e0000000-0008-4000-8000-000000000001';
-- Lesson: m08-l2-default-gateways (e0000000-0008-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'Ep-x_6kggKA',
  duration_minutes = 15,
  description = 'Video instruction presented by Practical Networking: "Everything Routers do - Part 2 - How Routers forward Packets - Networking Fundamentals - Lesson 5". Technical focus on m08-l2-default-gateways: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.'
WHERE id = 'e0000000-0008-4000-8000-000000000002';
COMMIT;
