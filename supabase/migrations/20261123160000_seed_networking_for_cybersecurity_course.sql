-- =============================================================================
-- CYBERTUBE: SEED NETWORKING FOR CYBERSECURITY ZERO TO ADVANCED COMPLETE COURSE
-- =============================================================================
-- Description:
-- Idempotently seeds the 30-module Networking for Cybersecurity course,
-- all 30 modules, and all 120 video lessons into the Supabase database.
-- Preserves all existing courses and user progress intact.
-- =============================================================================

DO $$
DECLARE
  v_course_id CONSTANT UUID := 'e0000000-0000-4000-8000-000000000001';
BEGIN
  -- 1. Insert/Update Course
  INSERT INTO public.courses (
    id, slug, title, short_description, description, difficulty,
    estimated_duration, total_duration_minutes, thumbnail_url,
    instructor_name, instructor_title, instructor_org, status,
    tags, prerequisites, learning_objectives, track, domains, featured
  ) VALUES (
    v_course_id,
    'networking-for-cybersecurity-zero-to-advanced',
    'Networking for Cybersecurity: Zero to Advanced',
    'A comprehensive 30-module, 120-lesson zero-to-advanced networking curriculum designed for SOC analysts, network defense, packet analysis, and security engineering.',
    'An intensive, video-first, 30-module professional networking curriculum designed specifically for SOC analysts, incident responders, network defenders, and blue team engineers. Spans from binary arithmetic, Ethernet, IPv4/IPv6, subnetting, and switching up through deep TCP stream analysis, DNS hunting, TLS decryption inspection, NetFlow, Zeek NSM, Suricata IDS/IPS, Nmap reconnaissance analysis, and cloud VPC architectures. Contains 120 video-guided lessons, zero quiz locks, hands-on Packet Tracer/Wireshark labs, and a complete SOC investigation capstone.',
    'beginner',
    '150–200 hours (30 modules • 120 lessons)',
    3600,
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    'CyberTube Open Networking Faculty',
    'Network Defense & SOC Educators',
    'Jeremy''s IT Lab, Practical Networking, Chris Greer & CyberTube',
    'published',
    ARRAY['networking', 'tcp-ip', 'osi-model', 'wireshark', 'subnetting', 'dns', 'tls', 'zeek', 'suricata', 'nmap', 'soc', 'blue-team', 'packet-analysis', 'cloud-networking']::TEXT[],
    ARRAY['Basic computer literacy and comfort with ordinary desktop computing', 'An isolated lab workspace (Cisco Packet Tracer, Wireshark, and a host-only virtual machine)', 'Dedication to complete hands-on packet inspection and defensive evidence documentation']::TEXT[],
    ARRAY['Map layered protocols across the 7-layer OSI model and 4-layer TCP/IP stack to identify attack surfaces', 'Calculate IPv4 subnets, CIDR blocks, VLSM schemes, and configure segmented Layer-2 VLANs', 'Trace TCP three-way handshakes, sequence numbers, flag permutations, and diagnose connection stalls', 'Dissect DNS queries, response codes, tunneling anomalies, and threat hunting patterns', 'Inspect TLS cryptographic handshakes, cipher negotiation, and certificate trust chains without compromising encryption', 'Capture and dissect live and offline traffic with Wireshark and automated TShark pipelines', 'Correlate multi-source telemetry across Syslog, NetFlow/IPFIX, Zeek NSM logs, and Suricata IDS/IPS alerts', 'Design and analyze zero-trust network boundaries, ACLs, stateful firewalls, and AWS VPC cloud security groups', 'Author a comprehensive, court-defensible SOC network incident investigation report in the final capstone']::TEXT[],
    'cybersecurity',
    ARRAY['network-security', 'soc-blue-team', 'fundamentals', 'dfir']::TEXT[],
    TRUE
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    difficulty = EXCLUDED.difficulty,
    estimated_duration = EXCLUDED.estimated_duration,
    total_duration_minutes = EXCLUDED.total_duration_minutes,
    thumbnail_url = EXCLUDED.thumbnail_url,
    instructor_name = EXCLUDED.instructor_name,
    instructor_title = EXCLUDED.instructor_title,
    instructor_org = EXCLUDED.instructor_org,
    status = EXCLUDED.status,
    tags = EXCLUDED.tags,
    prerequisites = EXCLUDED.prerequisites,
    learning_objectives = EXCLUDED.learning_objectives,
    track = EXCLUDED.track,
    domains = EXCLUDED.domains,
    featured = EXCLUDED.featured;

  -- 2. Insert/Update 30 Modules
  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0001-4000-8000-000000000000', v_course_id, 'Module 01: Orientation, Ethics and the Networking Lab', 'Beginner level (4–5 hours). Prerequisite: None beyond ordinary computer use. Set up a completely authorized lab and explain the role of networks in SOC defense. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 1)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0002-4000-8000-000000000000', v_course_id, 'Module 02: OSI and TCP/IP Models for SOC Analysts', 'Beginner level (4–5 hours). Prerequisite: Module 01 (recommended); prior prerequisite knowledge may be demonstrated. Map observed packet fields to OSI/TCP-IP layers and find likely fault or attack boundaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 2)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0003-4000-8000-000000000000', v_course_id, 'Module 03: Cables, Interfaces, Ethernet and MAC Addresses', 'Beginner level (4–5 hours). Prerequisite: Module 02 (recommended); prior prerequisite knowledge may be demonstrated. Interpret layer-2 frames and explain MAC-based communication and its limits. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 3)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0004-4000-8000-000000000000', v_course_id, 'Module 04: IPv4, Binary and Packet Headers', 'Beginner level (4–5 hours). Prerequisite: Module 03 (recommended); prior prerequisite knowledge may be demonstrated. Interpret IPv4 addresses, host ranges, reserved spaces and IP header fields. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 4)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0005-4000-8000-000000000000', v_course_id, 'Module 05: Subnetting, CIDR and VLSM', 'Beginner level (4–5 hours). Prerequisite: Module 04 (recommended); prior prerequisite knowledge may be demonstrated. Calculate subnets and use them to plan segmented networks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 5)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0006-4000-8000-000000000000', v_course_id, 'Module 06: ARP, ICMP, Ping and Traceroute', 'Beginner level (4–5 hours). Prerequisite: Module 05 (recommended); prior prerequisite knowledge may be demonstrated. Explain on-link reachability and diagnose IP/MAC resolution safely. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 6)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0007-4000-8000-000000000000', v_course_id, 'Module 07: Switching, VLANs and Layer-2 Segmentation', 'Intermediate level (5–7 hours). Prerequisite: Module 06 (recommended); prior prerequisite knowledge may be demonstrated. Configure VLANs and explain how segmentation changes attacker movement. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 7)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0008-4000-8000-000000000000', v_course_id, 'Module 08: Routers, Routing Tables and Traffic Paths', 'Intermediate level (5–7 hours). Prerequisite: Module 07 (recommended); prior prerequisite knowledge may be demonstrated. Trace a packet through gateways and routing decisions. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 8)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0009-4000-8000-000000000000', v_course_id, 'Module 09: Dynamic Routing, OSPF and BGP Security Concepts', 'Advanced level (6–8 hours). Prerequisite: Module 08 (recommended); prior prerequisite knowledge may be demonstrated. Recognize route advertisement, adjacency, route leak and hijack symptoms without executing attacks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 9)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-000a-4000-8000-000000000000', v_course_id, 'Module 10: TCP Connections, Flags and Sessions', 'Intermediate level (5–7 hours). Prerequisite: Module 09 (recommended); prior prerequisite knowledge may be demonstrated. Analyze the TCP state machine and normal handshake evidence. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 10)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-000b-4000-8000-000000000000', v_course_id, 'Module 11: UDP, Ports, Sockets and Common Services', 'Intermediate level (5–7 hours). Prerequisite: Module 10 (recommended); prior prerequisite knowledge may be demonstrated. Correlate ports, processes and network protocols with security events. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 11)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-000c-4000-8000-000000000000', v_course_id, 'Module 12: DNS Resolution and DNS Security', 'Intermediate level (5–7 hours). Prerequisite: Module 11 (recommended); prior prerequisite knowledge may be demonstrated. Interpret DNS queries, answers, caching and defensive DNS signals. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 12)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-000d-4000-8000-000000000000', v_course_id, 'Module 13: DHCP, NTP and Network Configuration', 'Intermediate level (5–7 hours). Prerequisite: Module 12 (recommended); prior prerequisite knowledge may be demonstrated. Understand network configuration provisioning and time synchronization as security dependencies. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 13)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-000e-4000-8000-000000000000', v_course_id, 'Module 14: HTTP/HTTPS, Web Requests and Proxies', 'Intermediate level (5–7 hours). Prerequisite: Module 13 (recommended); prior prerequisite knowledge may be demonstrated. Read requests, headers, status codes and proxy metadata relevant to web security. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 14)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-000f-4000-8000-000000000000', v_course_id, 'Module 15: TLS, Certificates and Encrypted Traffic', 'Intermediate level (5–7 hours). Prerequisite: Module 14 (recommended); prior prerequisite knowledge may be demonstrated. Interpret TLS handshakes and certificate failures without claiming encrypted payload visibility. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 15)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0010-4000-8000-000000000000', v_course_id, 'Module 16: NAT, PAT and Network Translation', 'Intermediate level (5–7 hours). Prerequisite: Module 15 (recommended); prior prerequisite knowledge may be demonstrated. Distinguish private/public endpoints and understand translation in security logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 16)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0011-4000-8000-000000000000', v_course_id, 'Module 17: Firewalls, ACLs and Zero-Trust Segmentation', 'Intermediate level (5–7 hours). Prerequisite: Module 16 (recommended); prior prerequisite knowledge may be demonstrated. Design and test minimal access policy while interpreting deny and allow logs. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 17)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0012-4000-8000-000000000000', v_course_id, 'Module 18: Wireless Networking and Wi-Fi Security', 'Intermediate level (5–7 hours). Prerequisite: Module 17 (recommended); prior prerequisite knowledge may be demonstrated. Understand 802.11, wireless authentication and common detection indicators. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 18)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0013-4000-8000-000000000000', v_course_id, 'Module 19: IPv6 Addressing and Network Security', 'Intermediate level (5–7 hours). Prerequisite: Module 18 (recommended); prior prerequisite knowledge may be demonstrated. Read IPv6 headers, address types, neighbor discovery and dual-stack risk. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 19)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0014-4000-8000-000000000000', v_course_id, 'Module 20: VPNs, Tunnels and Secure Remote Access', 'Intermediate level (5–7 hours). Prerequisite: Module 19 (recommended); prior prerequisite knowledge may be demonstrated. Differentiate tunneling and encryption and interpret remote-access security telemetry. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 20)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0015-4000-8000-000000000000', v_course_id, 'Module 21: Wireshark and TShark Essentials', 'Intermediate level (5–7 hours). Prerequisite: Module 20 (recommended); prior prerequisite knowledge may be demonstrated. Capture and filter permitted traffic and interpret protocol layers. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 21)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0016-4000-8000-000000000000', v_course_id, 'Module 22: Deep TCP Packet Analysis and Troubleshooting', 'Advanced level (6–8 hours). Prerequisite: Module 21 (recommended); prior prerequisite knowledge may be demonstrated. Understand timing, retransmission, loss and flow-control clues. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 22)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0017-4000-8000-000000000000', v_course_id, 'Module 23: DNS Traffic Investigation and Threat Hunting', 'Advanced level (6–8 hours). Prerequisite: Module 22 (recommended); prior prerequisite knowledge may be demonstrated. Analyze DNS network evidence and distinguish suspicious patterns from false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 23)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0018-4000-8000-000000000000', v_course_id, 'Module 24: Web/TLS/QUIC Traffic Investigation', 'Advanced level (6–8 hours). Prerequisite: Module 23 (recommended); prior prerequisite knowledge may be demonstrated. Investigate web connectivity and suspicious destination behavior using observable metadata. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 24)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-0019-4000-8000-000000000000', v_course_id, 'Module 25: Syslog, NetFlow/IPFIX and Network Telemetry', 'Advanced level (6–8 hours). Prerequisite: Module 24 (recommended); prior prerequisite knowledge may be demonstrated. Correlate network metadata logs and distinguish full packets from flow summaries. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 25)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-001a-4000-8000-000000000000', v_course_id, 'Module 26: Zeek Network Security Monitoring', 'Advanced level (6–8 hours). Prerequisite: Module 25 (recommended); prior prerequisite knowledge may be demonstrated. Read Zeek connection, DNS, HTTP and SSL/TLS logs for network investigations. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 26)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-001b-4000-8000-000000000000', v_course_id, 'Module 27: Suricata IDS/IPS, Rules and Alert Triage', 'Advanced level (6–8 hours). Prerequisite: Module 26 (recommended); prior prerequisite knowledge may be demonstrated. Interpret network IDS alerts, understand signatures and reduce false positives. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 27)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-001c-4000-8000-000000000000', v_course_id, 'Module 28: Network Discovery with Nmap — Authorized Labs', 'Advanced level (6–8 hours). Prerequisite: Module 27 (recommended); prior prerequisite knowledge may be demonstrated. Inventory owned systems and interpret TCP/UDP scanning results and their detection traces. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 28)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-001d-4000-8000-000000000000', v_course_id, 'Module 29: Cloud Networking, VPCs and Security Groups', 'Advanced level (6–8 hours). Prerequisite: Module 28 (recommended); prior prerequisite knowledge may be demonstrated. Interpret cloud virtual networking and common misconfiguration risks. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 29)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  INSERT INTO public.course_modules (id, course_id, title, description, order_index)
  VALUES ('e0000000-001e-4000-8000-000000000000', v_course_id, 'Module 30: Final SOC Networking Investigation Capstone', 'Advanced level (6–8 hours). Prerequisite: Module 29 (recommended); prior prerequisite knowledge may be demonstrated. Synthesize end-to-end network evidence in an incident-grade report. This module ties network behavior to what an SOC analyst can actually observe, validate, document, and report.', 30)
  ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

  -- 3. Insert/Update 120 Lessons
  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0001-4000-8000-000000000001', v_course_id, 'e0000000-0001-4000-8000-000000000000', 'm01-l1-network-security-roles', 'Module 01 - Lesson 1: Network security roles', 'Video lesson presented by CyberTube Instructor. Covers Module 01 - Lesson 1: Network security roles. Practice the concepts in your isolated lab environment.',
    'ewtDKmovou4', 30, 1,
    ARRAY['Explain the role of **Network security roles** in ordinary network behavior.', 'Demonstrate **Networks and endpoints** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Safe lab environment** as operational or security evidence.', 'Produce a defensible analyst write-up about **Evidence workflow**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-01', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 01 - Lesson 1: Network security roles', 'Network Security Engineering (Mod 01)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0001-4000-8000-000000000002', v_course_id, 'e0000000-0001-4000-8000-000000000000', 'm01-l2-networks-and-endpoints', 'Module 01 - Lesson 2: Networks and endpoints', 'Video lesson presented by CyberTube Instructor. Covers Module 01 - Lesson 2: Networks and endpoints. Practice the concepts in your isolated lab environment.',
    'H8W9oMNSuwo', 30, 2,
    ARRAY['Explain the role of **Network security roles** in ordinary network behavior.', 'Demonstrate **Networks and endpoints** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Safe lab environment** as operational or security evidence.', 'Produce a defensible analyst write-up about **Evidence workflow**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-01', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 01 - Lesson 2: Networks and endpoints', 'Network Security Engineering (Mod 01)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0001-4000-8000-000000000003', v_course_id, 'e0000000-0001-4000-8000-000000000000', 'm01-l3-safe-lab-environment', 'Module 01 - Lesson 3: Safe lab environment', 'Video lesson presented by CyberTube Instructor. Covers Module 01 - Lesson 3: Safe lab environment. Practice the concepts in your isolated lab environment.',
    'ewtDKmovou4', 30, 3,
    ARRAY['Explain the role of **Network security roles** in ordinary network behavior.', 'Demonstrate **Networks and endpoints** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Safe lab environment** as operational or security evidence.', 'Produce a defensible analyst write-up about **Evidence workflow**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-01', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 01 - Lesson 3: Safe lab environment', 'Network Security Engineering (Mod 01)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0001-4000-8000-000000000004', v_course_id, 'e0000000-0001-4000-8000-000000000000', 'm01-l4-evidence-workflow', 'Module 01 - Lesson 4: Evidence workflow', 'Video lesson presented by CyberTube Instructor. Covers Module 01 - Lesson 4: Evidence workflow. Practice the concepts in your isolated lab environment.',
    'H8W9oMNSuwo', 30, 4,
    ARRAY['Explain the role of **Network security roles** in ordinary network behavior.', 'Demonstrate **Networks and endpoints** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Safe lab environment** as operational or security evidence.', 'Produce a defensible analyst write-up about **Evidence workflow**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-01', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 01 - Lesson 4: Evidence workflow', 'Network Security Engineering (Mod 01)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0002-4000-8000-000000000001', v_course_id, 'e0000000-0002-4000-8000-000000000000', 'm02-l1-seven-osi-layers', 'Module 02 - Lesson 1: Seven OSI layers', 'Video lesson presented by CyberTube Instructor. Covers Module 02 - Lesson 1: Seven OSI layers. Practice the concepts in your isolated lab environment.',
    'LkolbURrtTs', 30, 1,
    ARRAY['Explain the role of **Seven OSI layers** in ordinary network behavior.', 'Demonstrate **TCP/IP stack** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Encapsulation** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security by layer**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-02', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 02 - Lesson 1: Seven OSI layers', 'Network Security Engineering (Mod 02)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0002-4000-8000-000000000002', v_course_id, 'e0000000-0002-4000-8000-000000000000', 'm02-l2-tcp-ip-stack', 'Module 02 - Lesson 2: TCP/IP stack', 'Video lesson presented by CyberTube Instructor. Covers Module 02 - Lesson 2: TCP/IP stack. Practice the concepts in your isolated lab environment.',
    '0aGqGKrRE0g', 30, 2,
    ARRAY['Explain the role of **Seven OSI layers** in ordinary network behavior.', 'Demonstrate **TCP/IP stack** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Encapsulation** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security by layer**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-02', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 02 - Lesson 2: TCP/IP stack', 'Network Security Engineering (Mod 02)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0002-4000-8000-000000000003', v_course_id, 'e0000000-0002-4000-8000-000000000000', 'm02-l3-encapsulation', 'Module 02 - Lesson 3: Encapsulation', 'Video lesson presented by CyberTube Instructor. Covers Module 02 - Lesson 3: Encapsulation. Practice the concepts in your isolated lab environment.',
    'LkolbURrtTs', 30, 3,
    ARRAY['Explain the role of **Seven OSI layers** in ordinary network behavior.', 'Demonstrate **TCP/IP stack** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Encapsulation** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security by layer**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-02', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 02 - Lesson 3: Encapsulation', 'Network Security Engineering (Mod 02)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0002-4000-8000-000000000004', v_course_id, 'e0000000-0002-4000-8000-000000000000', 'm02-l4-security-by-layer', 'Module 02 - Lesson 4: Security by layer', 'Video lesson presented by CyberTube Instructor. Covers Module 02 - Lesson 4: Security by layer. Practice the concepts in your isolated lab environment.',
    '0aGqGKrRE0g', 30, 4,
    ARRAY['Explain the role of **Seven OSI layers** in ordinary network behavior.', 'Demonstrate **TCP/IP stack** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Encapsulation** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security by layer**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-02', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 02 - Lesson 4: Security by layer', 'Network Security Engineering (Mod 02)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0003-4000-8000-000000000001', v_course_id, 'e0000000-0003-4000-8000-000000000000', 'm03-l1-physical-interfaces', 'Module 03 - Lesson 1: Physical interfaces', 'Video lesson presented by CyberTube Instructor. Covers Module 03 - Lesson 1: Physical interfaces. Practice the concepts in your isolated lab environment.',
    'u2n762WG0Vo', 30, 1,
    ARRAY['Explain the role of **Physical interfaces** in ordinary network behavior.', 'Demonstrate **Ethernet headers** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Switching behavior** as operational or security evidence.', 'Produce a defensible analyst write-up about **Layer-2 threats**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-03', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 03 - Lesson 1: Physical interfaces', 'Network Security Engineering (Mod 03)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0003-4000-8000-000000000002', v_course_id, 'e0000000-0003-4000-8000-000000000000', 'm03-l2-ethernet-headers', 'Module 03 - Lesson 2: Ethernet headers', 'Video lesson presented by CyberTube Instructor. Covers Module 03 - Lesson 2: Ethernet headers. Practice the concepts in your isolated lab environment.',
    'AhOU2eOpmX0', 30, 2,
    ARRAY['Explain the role of **Physical interfaces** in ordinary network behavior.', 'Demonstrate **Ethernet headers** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Switching behavior** as operational or security evidence.', 'Produce a defensible analyst write-up about **Layer-2 threats**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-03', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 03 - Lesson 2: Ethernet headers', 'Network Security Engineering (Mod 03)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0003-4000-8000-000000000003', v_course_id, 'e0000000-0003-4000-8000-000000000000', 'm03-l3-switching-behavior', 'Module 03 - Lesson 3: Switching behavior', 'Video lesson presented by CyberTube Instructor. Covers Module 03 - Lesson 3: Switching behavior. Practice the concepts in your isolated lab environment.',
    'G7GyWjJtjNs', 30, 3,
    ARRAY['Explain the role of **Physical interfaces** in ordinary network behavior.', 'Demonstrate **Ethernet headers** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Switching behavior** as operational or security evidence.', 'Produce a defensible analyst write-up about **Layer-2 threats**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-03', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 03 - Lesson 3: Switching behavior', 'Network Security Engineering (Mod 03)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0003-4000-8000-000000000004', v_course_id, 'e0000000-0003-4000-8000-000000000000', 'm03-l4-layer-2-threats', 'Module 03 - Lesson 4: Layer-2 threats', 'Video lesson presented by CyberTube Instructor. Covers Module 03 - Lesson 4: Layer-2 threats. Practice the concepts in your isolated lab environment.',
    'u2n762WG0Vo', 30, 4,
    ARRAY['Explain the role of **Physical interfaces** in ordinary network behavior.', 'Demonstrate **Ethernet headers** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Switching behavior** as operational or security evidence.', 'Produce a defensible analyst write-up about **Layer-2 threats**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-03', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 03 - Lesson 4: Layer-2 threats', 'Network Security Engineering (Mod 03)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0004-4000-8000-000000000001', v_course_id, 'e0000000-0004-4000-8000-000000000000', 'm04-l1-binary-and-dotted-decimal', 'Module 04 - Lesson 1: Binary and dotted decimal', 'Video lesson presented by CyberTube Instructor. Covers Module 04 - Lesson 1: Binary and dotted decimal. Practice the concepts in your isolated lab environment.',
    '3ROdsfEUuhs', 30, 1,
    ARRAY['Explain the role of **Binary and dotted decimal** in ordinary network behavior.', 'Demonstrate **IPv4 address categories** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **IP headers** as operational or security evidence.', 'Produce a defensible analyst write-up about **Host addressing**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-04', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 04 - Lesson 1: Binary and dotted decimal', 'Network Security Engineering (Mod 04)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0004-4000-8000-000000000002', v_course_id, 'e0000000-0004-4000-8000-000000000000', 'm04-l2-ipv4-address-categories', 'Module 04 - Lesson 2: IPv4 address categories', 'Video lesson presented by CyberTube Instructor. Covers Module 04 - Lesson 2: IPv4 address categories. Practice the concepts in your isolated lab environment.',
    'aQB22y4liXA', 30, 2,
    ARRAY['Explain the role of **Binary and dotted decimal** in ordinary network behavior.', 'Demonstrate **IPv4 address categories** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **IP headers** as operational or security evidence.', 'Produce a defensible analyst write-up about **Host addressing**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-04', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 04 - Lesson 2: IPv4 address categories', 'Network Security Engineering (Mod 04)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0004-4000-8000-000000000003', v_course_id, 'e0000000-0004-4000-8000-000000000000', 'm04-l3-ip-headers', 'Module 04 - Lesson 3: IP headers', 'Video lesson presented by CyberTube Instructor. Covers Module 04 - Lesson 3: IP headers. Practice the concepts in your isolated lab environment.',
    '3ROdsfEUuhs', 30, 3,
    ARRAY['Explain the role of **Binary and dotted decimal** in ordinary network behavior.', 'Demonstrate **IPv4 address categories** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **IP headers** as operational or security evidence.', 'Produce a defensible analyst write-up about **Host addressing**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-04', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 04 - Lesson 3: IP headers', 'Network Security Engineering (Mod 04)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0004-4000-8000-000000000004', v_course_id, 'e0000000-0004-4000-8000-000000000000', 'm04-l4-host-addressing', 'Module 04 - Lesson 4: Host addressing', 'Video lesson presented by CyberTube Instructor. Covers Module 04 - Lesson 4: Host addressing. Practice the concepts in your isolated lab environment.',
    'aQB22y4liXA', 30, 4,
    ARRAY['Explain the role of **Binary and dotted decimal** in ordinary network behavior.', 'Demonstrate **IPv4 address categories** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **IP headers** as operational or security evidence.', 'Produce a defensible analyst write-up about **Host addressing**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-04', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 04 - Lesson 4: Host addressing', 'Network Security Engineering (Mod 04)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0005-4000-8000-000000000001', v_course_id, 'e0000000-0005-4000-8000-000000000000', 'm05-l1-network-prefix', 'Module 05 - Lesson 1: Network prefix', 'Video lesson presented by CyberTube Instructor. Covers Module 05 - Lesson 1: Network prefix. Practice the concepts in your isolated lab environment.',
    'bQ8sdpGQu8c', 30, 1,
    ARRAY['Explain the role of **Network prefix** in ordinary network behavior.', 'Demonstrate **Subnet math** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **VLSM design** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security use cases**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-05', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 05 - Lesson 1: Network prefix', 'Network Security Engineering (Mod 05)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0005-4000-8000-000000000002', v_course_id, 'e0000000-0005-4000-8000-000000000000', 'm05-l2-subnet-math', 'Module 05 - Lesson 2: Subnet math', 'Video lesson presented by CyberTube Instructor. Covers Module 05 - Lesson 2: Subnet math. Practice the concepts in your isolated lab environment.',
    '3ROdsfEUuhs', 30, 2,
    ARRAY['Explain the role of **Network prefix** in ordinary network behavior.', 'Demonstrate **Subnet math** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **VLSM design** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security use cases**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-05', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 05 - Lesson 2: Subnet math', 'Network Security Engineering (Mod 05)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0005-4000-8000-000000000003', v_course_id, 'e0000000-0005-4000-8000-000000000000', 'm05-l3-vlsm-design', 'Module 05 - Lesson 3: VLSM design', 'Video lesson presented by CyberTube Instructor. Covers Module 05 - Lesson 3: VLSM design. Practice the concepts in your isolated lab environment.',
    'bQ8sdpGQu8c', 30, 3,
    ARRAY['Explain the role of **Network prefix** in ordinary network behavior.', 'Demonstrate **Subnet math** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **VLSM design** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security use cases**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-05', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 05 - Lesson 3: VLSM design', 'Network Security Engineering (Mod 05)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0005-4000-8000-000000000004', v_course_id, 'e0000000-0005-4000-8000-000000000000', 'm05-l4-security-use-cases', 'Module 05 - Lesson 4: Security use cases', 'Video lesson presented by CyberTube Instructor. Covers Module 05 - Lesson 4: Security use cases. Practice the concepts in your isolated lab environment.',
    '3ROdsfEUuhs', 30, 4,
    ARRAY['Explain the role of **Network prefix** in ordinary network behavior.', 'Demonstrate **Subnet math** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **VLSM design** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security use cases**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-05', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 05 - Lesson 4: Security use cases', 'Network Security Engineering (Mod 05)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0006-4000-8000-000000000001', v_course_id, 'e0000000-0006-4000-8000-000000000000', 'm06-l1-arp-resolution', 'Module 06 - Lesson 1: ARP resolution', 'Video lesson presented by CyberTube Instructor. Covers Module 06 - Lesson 1: ARP resolution. Practice the concepts in your isolated lab environment.',
    'gYN2qN11-wE', 30, 1,
    ARRAY['Explain the role of **ARP resolution** in ordinary network behavior.', 'Demonstrate **ICMP messages** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Routing path discovery** as operational or security evidence.', 'Produce a defensible analyst write-up about **Detection interpretation**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-06', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 06 - Lesson 1: ARP resolution', 'Network Security Engineering (Mod 06)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0006-4000-8000-000000000002', v_course_id, 'e0000000-0006-4000-8000-000000000000', 'm06-l2-icmp-messages', 'Module 06 - Lesson 2: ICMP messages', 'Video lesson presented by CyberTube Instructor. Covers Module 06 - Lesson 2: ICMP messages. Practice the concepts in your isolated lab environment.',
    'JI9Zm2tbUoE', 30, 2,
    ARRAY['Explain the role of **ARP resolution** in ordinary network behavior.', 'Demonstrate **ICMP messages** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Routing path discovery** as operational or security evidence.', 'Produce a defensible analyst write-up about **Detection interpretation**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-06', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 06 - Lesson 2: ICMP messages', 'Network Security Engineering (Mod 06)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0006-4000-8000-000000000003', v_course_id, 'e0000000-0006-4000-8000-000000000000', 'm06-l3-routing-path-discovery', 'Module 06 - Lesson 3: Routing path discovery', 'Video lesson presented by CyberTube Instructor. Covers Module 06 - Lesson 3: Routing path discovery. Practice the concepts in your isolated lab environment.',
    'gYN2qN11-wE', 30, 3,
    ARRAY['Explain the role of **ARP resolution** in ordinary network behavior.', 'Demonstrate **ICMP messages** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Routing path discovery** as operational or security evidence.', 'Produce a defensible analyst write-up about **Detection interpretation**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-06', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 06 - Lesson 3: Routing path discovery', 'Network Security Engineering (Mod 06)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0006-4000-8000-000000000004', v_course_id, 'e0000000-0006-4000-8000-000000000000', 'm06-l4-detection-interpretation', 'Module 06 - Lesson 4: Detection interpretation', 'Video lesson presented by CyberTube Instructor. Covers Module 06 - Lesson 4: Detection interpretation. Practice the concepts in your isolated lab environment.',
    'JI9Zm2tbUoE', 30, 4,
    ARRAY['Explain the role of **ARP resolution** in ordinary network behavior.', 'Demonstrate **ICMP messages** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Routing path discovery** as operational or security evidence.', 'Produce a defensible analyst write-up about **Detection interpretation**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-06', 'beginner', 'soc-analyst']::TEXT[], ARRAY['Module 06 - Lesson 4: Detection interpretation', 'Network Security Engineering (Mod 06)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0007-4000-8000-000000000001', v_course_id, 'e0000000-0007-4000-8000-000000000000', 'm07-l1-broadcast-domains', 'Module 07 - Lesson 1: Broadcast domains', 'Video lesson presented by CyberTube Instructor. Covers Module 07 - Lesson 1: Broadcast domains. Practice the concepts in your isolated lab environment.',
    'cjFzOnm6u1g', 30, 1,
    ARRAY['Explain the role of **Broadcast domains** in ordinary network behavior.', 'Demonstrate **Access/trunk ports** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Inter-VLAN routing** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security controls**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-07', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 07 - Lesson 1: Broadcast domains', 'Network Security Engineering (Mod 07)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0007-4000-8000-000000000002', v_course_id, 'e0000000-0007-4000-8000-000000000000', 'm07-l2-access-trunk-ports', 'Module 07 - Lesson 2: Access/trunk ports', 'Video lesson presented by CyberTube Instructor. Covers Module 07 - Lesson 2: Access/trunk ports. Practice the concepts in your isolated lab environment.',
    'G7GyWjJtjNs', 30, 2,
    ARRAY['Explain the role of **Broadcast domains** in ordinary network behavior.', 'Demonstrate **Access/trunk ports** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Inter-VLAN routing** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security controls**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-07', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 07 - Lesson 2: Access/trunk ports', 'Network Security Engineering (Mod 07)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0007-4000-8000-000000000003', v_course_id, 'e0000000-0007-4000-8000-000000000000', 'm07-l3-inter-vlan-routing', 'Module 07 - Lesson 3: Inter-VLAN routing', 'Video lesson presented by CyberTube Instructor. Covers Module 07 - Lesson 3: Inter-VLAN routing. Practice the concepts in your isolated lab environment.',
    'cjFzOnm6u1g', 30, 3,
    ARRAY['Explain the role of **Broadcast domains** in ordinary network behavior.', 'Demonstrate **Access/trunk ports** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Inter-VLAN routing** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security controls**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-07', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 07 - Lesson 3: Inter-VLAN routing', 'Network Security Engineering (Mod 07)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0007-4000-8000-000000000004', v_course_id, 'e0000000-0007-4000-8000-000000000000', 'm07-l4-security-controls', 'Module 07 - Lesson 4: Security controls', 'Video lesson presented by CyberTube Instructor. Covers Module 07 - Lesson 4: Security controls. Practice the concepts in your isolated lab environment.',
    'G7GyWjJtjNs', 30, 4,
    ARRAY['Explain the role of **Broadcast domains** in ordinary network behavior.', 'Demonstrate **Access/trunk ports** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Inter-VLAN routing** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security controls**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-07', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 07 - Lesson 4: Security controls', 'Network Security Engineering (Mod 07)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0008-4000-8000-000000000001', v_course_id, 'e0000000-0008-4000-8000-000000000000', 'm08-l1-forwarding-logic', 'Module 08 - Lesson 1: Forwarding logic', 'Video lesson presented by CyberTube Instructor. Covers Module 08 - Lesson 1: Forwarding logic. Practice the concepts in your isolated lab environment.',
    'AzXys5kxpAM', 30, 1,
    ARRAY['Explain the role of **Forwarding logic** in ordinary network behavior.', 'Demonstrate **Default gateways** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Static routes** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security telemetry**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-08', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 08 - Lesson 1: Forwarding logic', 'Network Security Engineering (Mod 08)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0008-4000-8000-000000000002', v_course_id, 'e0000000-0008-4000-8000-000000000000', 'm08-l2-default-gateways', 'Module 08 - Lesson 2: Default gateways', 'Video lesson presented by CyberTube Instructor. Covers Module 08 - Lesson 2: Default gateways. Practice the concepts in your isolated lab environment.',
    'Ep-x_6kggKA', 30, 2,
    ARRAY['Explain the role of **Forwarding logic** in ordinary network behavior.', 'Demonstrate **Default gateways** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Static routes** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security telemetry**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-08', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 08 - Lesson 2: Default gateways', 'Network Security Engineering (Mod 08)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0008-4000-8000-000000000003', v_course_id, 'e0000000-0008-4000-8000-000000000000', 'm08-l3-static-routes', 'Module 08 - Lesson 3: Static routes', 'Video lesson presented by CyberTube Instructor. Covers Module 08 - Lesson 3: Static routes. Practice the concepts in your isolated lab environment.',
    'aHwAm8GYbn8', 30, 3,
    ARRAY['Explain the role of **Forwarding logic** in ordinary network behavior.', 'Demonstrate **Default gateways** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Static routes** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security telemetry**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-08', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 08 - Lesson 3: Static routes', 'Network Security Engineering (Mod 08)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0008-4000-8000-000000000004', v_course_id, 'e0000000-0008-4000-8000-000000000000', 'm08-l4-security-telemetry', 'Module 08 - Lesson 4: Security telemetry', 'Video lesson presented by CyberTube Instructor. Covers Module 08 - Lesson 4: Security telemetry. Practice the concepts in your isolated lab environment.',
    'AzXys5kxpAM', 30, 4,
    ARRAY['Explain the role of **Forwarding logic** in ordinary network behavior.', 'Demonstrate **Default gateways** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Static routes** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security telemetry**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-08', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 08 - Lesson 4: Security telemetry', 'Network Security Engineering (Mod 08)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0009-4000-8000-000000000001', v_course_id, 'e0000000-0009-4000-8000-000000000000', 'm09-l1-route-advertisement', 'Module 09 - Lesson 1: Route advertisement', 'Video lesson presented by CyberTube Instructor. Covers Module 09 - Lesson 1: Route advertisement. Practice the concepts in your isolated lab environment.',
    'pvuaoJ9YzoI', 30, 1,
    ARRAY['Explain the role of **Route advertisement** in ordinary network behavior.', 'Demonstrate **OSPF mechanics** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Routing integrity** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC observables**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-09', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 09 - Lesson 1: Route advertisement', 'Network Security Engineering (Mod 09)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0009-4000-8000-000000000002', v_course_id, 'e0000000-0009-4000-8000-000000000000', 'm09-l2-ospf-mechanics', 'Module 09 - Lesson 2: OSPF mechanics', 'Video lesson presented by CyberTube Instructor. Covers Module 09 - Lesson 2: OSPF mechanics. Practice the concepts in your isolated lab environment.',
    'zmxLg4jV0ts', 30, 2,
    ARRAY['Explain the role of **Route advertisement** in ordinary network behavior.', 'Demonstrate **OSPF mechanics** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Routing integrity** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC observables**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-09', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 09 - Lesson 2: OSPF mechanics', 'Network Security Engineering (Mod 09)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0009-4000-8000-000000000003', v_course_id, 'e0000000-0009-4000-8000-000000000000', 'm09-l3-routing-integrity', 'Module 09 - Lesson 3: Routing integrity', 'Video lesson presented by CyberTube Instructor. Covers Module 09 - Lesson 3: Routing integrity. Practice the concepts in your isolated lab environment.',
    'pvuaoJ9YzoI', 30, 3,
    ARRAY['Explain the role of **Route advertisement** in ordinary network behavior.', 'Demonstrate **OSPF mechanics** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Routing integrity** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC observables**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-09', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 09 - Lesson 3: Routing integrity', 'Network Security Engineering (Mod 09)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0009-4000-8000-000000000004', v_course_id, 'e0000000-0009-4000-8000-000000000000', 'm09-l4-soc-observables', 'Module 09 - Lesson 4: SOC observables', 'Video lesson presented by CyberTube Instructor. Covers Module 09 - Lesson 4: SOC observables. Practice the concepts in your isolated lab environment.',
    'zmxLg4jV0ts', 30, 4,
    ARRAY['Explain the role of **Route advertisement** in ordinary network behavior.', 'Demonstrate **OSPF mechanics** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Routing integrity** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC observables**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-09', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 09 - Lesson 4: SOC observables', 'Network Security Engineering (Mod 09)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000a-4000-8000-000000000001', v_course_id, 'e0000000-000a-4000-8000-000000000000', 'm10-l1-tcp-handshake', 'Module 10 - Lesson 1: TCP handshake', 'Video lesson presented by CyberTube Instructor. Covers Module 10 - Lesson 1: TCP handshake. Practice the concepts in your isolated lab environment.',
    'rmFX1V49K8U', 30, 1,
    ARRAY['Explain the role of **TCP handshake** in ordinary network behavior.', 'Demonstrate **TCP flags** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Reliability** as operational or security evidence.', 'Produce a defensible analyst write-up about **Detection implications**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-10', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 10 - Lesson 1: TCP handshake', 'Network Security Engineering (Mod 10)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000a-4000-8000-000000000002', v_course_id, 'e0000000-000a-4000-8000-000000000000', 'm10-l2-tcp-flags', 'Module 10 - Lesson 2: TCP flags', 'Video lesson presented by CyberTube Instructor. Covers Module 10 - Lesson 2: TCP flags. Practice the concepts in your isolated lab environment.',
    'LIEACBqlntY', 30, 2,
    ARRAY['Explain the role of **TCP handshake** in ordinary network behavior.', 'Demonstrate **TCP flags** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Reliability** as operational or security evidence.', 'Produce a defensible analyst write-up about **Detection implications**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-10', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 10 - Lesson 2: TCP flags', 'Network Security Engineering (Mod 10)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000a-4000-8000-000000000003', v_course_id, 'e0000000-000a-4000-8000-000000000000', 'm10-l3-reliability', 'Module 10 - Lesson 3: Reliability', 'Video lesson presented by CyberTube Instructor. Covers Module 10 - Lesson 3: Reliability. Practice the concepts in your isolated lab environment.',
    'rmFX1V49K8U', 30, 3,
    ARRAY['Explain the role of **TCP handshake** in ordinary network behavior.', 'Demonstrate **TCP flags** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Reliability** as operational or security evidence.', 'Produce a defensible analyst write-up about **Detection implications**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-10', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 10 - Lesson 3: Reliability', 'Network Security Engineering (Mod 10)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000a-4000-8000-000000000004', v_course_id, 'e0000000-000a-4000-8000-000000000000', 'm10-l4-detection-implications', 'Module 10 - Lesson 4: Detection implications', 'Video lesson presented by CyberTube Instructor. Covers Module 10 - Lesson 4: Detection implications. Practice the concepts in your isolated lab environment.',
    'LIEACBqlntY', 30, 4,
    ARRAY['Explain the role of **TCP handshake** in ordinary network behavior.', 'Demonstrate **TCP flags** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Reliability** as operational or security evidence.', 'Produce a defensible analyst write-up about **Detection implications**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-10', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 10 - Lesson 4: Detection implications', 'Network Security Engineering (Mod 10)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000b-4000-8000-000000000001', v_course_id, 'e0000000-000b-4000-8000-000000000000', 'm11-l1-tcp-versus-udp', 'Module 11 - Lesson 1: TCP versus UDP', 'Video lesson presented by CyberTube Instructor. Covers Module 11 - Lesson 1: TCP versus UDP. Practice the concepts in your isolated lab environment.',
    'LIEACBqlntY', 30, 1,
    ARRAY['Explain the role of **TCP versus UDP** in ordinary network behavior.', 'Demonstrate **Port ranges** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Sockets and services** as operational or security evidence.', 'Produce a defensible analyst write-up about **Suspicious services**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-11', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 11 - Lesson 1: TCP versus UDP', 'Network Security Engineering (Mod 11)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000b-4000-8000-000000000002', v_course_id, 'e0000000-000b-4000-8000-000000000000', 'm11-l2-port-ranges', 'Module 11 - Lesson 2: Port ranges', 'Video lesson presented by CyberTube Instructor. Covers Module 11 - Lesson 2: Port ranges. Practice the concepts in your isolated lab environment.',
    'Xgwph7kERps', 30, 2,
    ARRAY['Explain the role of **TCP versus UDP** in ordinary network behavior.', 'Demonstrate **Port ranges** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Sockets and services** as operational or security evidence.', 'Produce a defensible analyst write-up about **Suspicious services**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-11', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 11 - Lesson 2: Port ranges', 'Network Security Engineering (Mod 11)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000b-4000-8000-000000000003', v_course_id, 'e0000000-000b-4000-8000-000000000000', 'm11-l3-sockets-and-services', 'Module 11 - Lesson 3: Sockets and services', 'Video lesson presented by CyberTube Instructor. Covers Module 11 - Lesson 3: Sockets and services. Practice the concepts in your isolated lab environment.',
    'LIEACBqlntY', 30, 3,
    ARRAY['Explain the role of **TCP versus UDP** in ordinary network behavior.', 'Demonstrate **Port ranges** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Sockets and services** as operational or security evidence.', 'Produce a defensible analyst write-up about **Suspicious services**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-11', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 11 - Lesson 3: Sockets and services', 'Network Security Engineering (Mod 11)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000b-4000-8000-000000000004', v_course_id, 'e0000000-000b-4000-8000-000000000000', 'm11-l4-suspicious-services', 'Module 11 - Lesson 4: Suspicious services', 'Video lesson presented by CyberTube Instructor. Covers Module 11 - Lesson 4: Suspicious services. Practice the concepts in your isolated lab environment.',
    'Xgwph7kERps', 30, 4,
    ARRAY['Explain the role of **TCP versus UDP** in ordinary network behavior.', 'Demonstrate **Port ranges** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Sockets and services** as operational or security evidence.', 'Produce a defensible analyst write-up about **Suspicious services**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-11', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 11 - Lesson 4: Suspicious services', 'Network Security Engineering (Mod 11)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000c-4000-8000-000000000001', v_course_id, 'e0000000-000c-4000-8000-000000000000', 'm12-l1-resolver-workflow', 'Module 12 - Lesson 1: Resolver workflow', 'Video lesson presented by CyberTube Instructor. Covers Module 12 - Lesson 1: Resolver workflow. Practice the concepts in your isolated lab environment.',
    '4C6eeQes4cs', 30, 1,
    ARRAY['Explain the role of **Resolver workflow** in ordinary network behavior.', 'Demonstrate **DNS records** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **DNS traffic** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security cases**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-12', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 12 - Lesson 1: Resolver workflow', 'Network Security Engineering (Mod 12)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000c-4000-8000-000000000002', v_course_id, 'e0000000-000c-4000-8000-000000000000', 'm12-l2-dns-records', 'Module 12 - Lesson 2: DNS records', 'Video lesson presented by CyberTube Instructor. Covers Module 12 - Lesson 2: DNS records. Practice the concepts in your isolated lab environment.',
    '3FPaTvCJojQ', 30, 2,
    ARRAY['Explain the role of **Resolver workflow** in ordinary network behavior.', 'Demonstrate **DNS records** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **DNS traffic** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security cases**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-12', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 12 - Lesson 2: DNS records', 'Network Security Engineering (Mod 12)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000c-4000-8000-000000000003', v_course_id, 'e0000000-000c-4000-8000-000000000000', 'm12-l3-dns-traffic', 'Module 12 - Lesson 3: DNS traffic', 'Video lesson presented by CyberTube Instructor. Covers Module 12 - Lesson 3: DNS traffic. Practice the concepts in your isolated lab environment.',
    '4C6eeQes4cs', 30, 3,
    ARRAY['Explain the role of **Resolver workflow** in ordinary network behavior.', 'Demonstrate **DNS records** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **DNS traffic** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security cases**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-12', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 12 - Lesson 3: DNS traffic', 'Network Security Engineering (Mod 12)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000c-4000-8000-000000000004', v_course_id, 'e0000000-000c-4000-8000-000000000000', 'm12-l4-security-cases', 'Module 12 - Lesson 4: Security cases', 'Video lesson presented by CyberTube Instructor. Covers Module 12 - Lesson 4: Security cases. Practice the concepts in your isolated lab environment.',
    '3FPaTvCJojQ', 30, 4,
    ARRAY['Explain the role of **Resolver workflow** in ordinary network behavior.', 'Demonstrate **DNS records** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **DNS traffic** as operational or security evidence.', 'Produce a defensible analyst write-up about **Security cases**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-12', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 12 - Lesson 4: Security cases', 'Network Security Engineering (Mod 12)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000d-4000-8000-000000000001', v_course_id, 'e0000000-000d-4000-8000-000000000000', 'm13-l1-dhcp-dora', 'Module 13 - Lesson 1: DHCP DORA', 'Video lesson presented by CyberTube Instructor. Covers Module 13 - Lesson 1: DHCP DORA. Practice the concepts in your isolated lab environment.',
    'hzkleGAC2_Y', 30, 1,
    ARRAY['Explain the role of **DHCP DORA** in ordinary network behavior.', 'Demonstrate **DHCP leases** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Rogue configuration indicators** as operational or security evidence.', 'Produce a defensible analyst write-up about **NTP and timestamp integrity**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-13', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 13 - Lesson 1: DHCP DORA', 'Network Security Engineering (Mod 13)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000d-4000-8000-000000000002', v_course_id, 'e0000000-000d-4000-8000-000000000000', 'm13-l2-dhcp-leases', 'Module 13 - Lesson 2: DHCP leases', 'Video lesson presented by CyberTube Instructor. Covers Module 13 - Lesson 2: DHCP leases. Practice the concepts in your isolated lab environment.',
    'cgMsoIQB9Wk', 30, 2,
    ARRAY['Explain the role of **DHCP DORA** in ordinary network behavior.', 'Demonstrate **DHCP leases** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Rogue configuration indicators** as operational or security evidence.', 'Produce a defensible analyst write-up about **NTP and timestamp integrity**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-13', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 13 - Lesson 2: DHCP leases', 'Network Security Engineering (Mod 13)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000d-4000-8000-000000000003', v_course_id, 'e0000000-000d-4000-8000-000000000000', 'm13-l3-rogue-configuration-indicators', 'Module 13 - Lesson 3: Rogue configuration indicators', 'Video lesson presented by CyberTube Instructor. Covers Module 13 - Lesson 3: Rogue configuration indicators. Practice the concepts in your isolated lab environment.',
    'hzkleGAC2_Y', 30, 3,
    ARRAY['Explain the role of **DHCP DORA** in ordinary network behavior.', 'Demonstrate **DHCP leases** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Rogue configuration indicators** as operational or security evidence.', 'Produce a defensible analyst write-up about **NTP and timestamp integrity**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-13', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 13 - Lesson 3: Rogue configuration indicators', 'Network Security Engineering (Mod 13)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000d-4000-8000-000000000004', v_course_id, 'e0000000-000d-4000-8000-000000000000', 'm13-l4-ntp-and-timestamp-integrity', 'Module 13 - Lesson 4: NTP and timestamp integrity', 'Video lesson presented by CyberTube Instructor. Covers Module 13 - Lesson 4: NTP and timestamp integrity. Practice the concepts in your isolated lab environment.',
    'cgMsoIQB9Wk', 30, 4,
    ARRAY['Explain the role of **DHCP DORA** in ordinary network behavior.', 'Demonstrate **DHCP leases** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Rogue configuration indicators** as operational or security evidence.', 'Produce a defensible analyst write-up about **NTP and timestamp integrity**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-13', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 13 - Lesson 4: NTP and timestamp integrity', 'Network Security Engineering (Mod 13)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000e-4000-8000-000000000001', v_course_id, 'e0000000-000e-4000-8000-000000000000', 'm14-l1-http-conversation', 'Module 14 - Lesson 1: HTTP conversation', 'Video lesson presented by CyberTube Instructor. Covers Module 14 - Lesson 1: HTTP conversation. Practice the concepts in your isolated lab environment.',
    'E5bSumTAHZE', 30, 1,
    ARRAY['Explain the role of **HTTP conversation** in ordinary network behavior.', 'Demonstrate **Sessions and cookies** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **HTTPS visibility** as operational or security evidence.', 'Produce a defensible analyst write-up about **Proxy interpretation**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-14', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 14 - Lesson 1: HTTP conversation', 'Network Security Engineering (Mod 14)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000e-4000-8000-000000000002', v_course_id, 'e0000000-000e-4000-8000-000000000000', 'm14-l2-sessions-and-cookies', 'Module 14 - Lesson 2: Sessions and cookies', 'Video lesson presented by CyberTube Instructor. Covers Module 14 - Lesson 2: Sessions and cookies. Practice the concepts in your isolated lab environment.',
    'ewtDKmovou4', 30, 2,
    ARRAY['Explain the role of **HTTP conversation** in ordinary network behavior.', 'Demonstrate **Sessions and cookies** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **HTTPS visibility** as operational or security evidence.', 'Produce a defensible analyst write-up about **Proxy interpretation**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-14', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 14 - Lesson 2: Sessions and cookies', 'Network Security Engineering (Mod 14)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000e-4000-8000-000000000003', v_course_id, 'e0000000-000e-4000-8000-000000000000', 'm14-l3-https-visibility', 'Module 14 - Lesson 3: HTTPS visibility', 'Video lesson presented by CyberTube Instructor. Covers Module 14 - Lesson 3: HTTPS visibility. Practice the concepts in your isolated lab environment.',
    'E5bSumTAHZE', 30, 3,
    ARRAY['Explain the role of **HTTP conversation** in ordinary network behavior.', 'Demonstrate **Sessions and cookies** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **HTTPS visibility** as operational or security evidence.', 'Produce a defensible analyst write-up about **Proxy interpretation**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-14', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 14 - Lesson 3: HTTPS visibility', 'Network Security Engineering (Mod 14)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000e-4000-8000-000000000004', v_course_id, 'e0000000-000e-4000-8000-000000000000', 'm14-l4-proxy-interpretation', 'Module 14 - Lesson 4: Proxy interpretation', 'Video lesson presented by CyberTube Instructor. Covers Module 14 - Lesson 4: Proxy interpretation. Practice the concepts in your isolated lab environment.',
    'ewtDKmovou4', 30, 4,
    ARRAY['Explain the role of **HTTP conversation** in ordinary network behavior.', 'Demonstrate **Sessions and cookies** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **HTTPS visibility** as operational or security evidence.', 'Produce a defensible analyst write-up about **Proxy interpretation**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-14', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 14 - Lesson 4: Proxy interpretation', 'Network Security Engineering (Mod 14)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000f-4000-8000-000000000001', v_course_id, 'e0000000-000f-4000-8000-000000000000', 'm15-l1-tls-trust-model', 'Module 15 - Lesson 1: TLS trust model', 'Video lesson presented by CyberTube Instructor. Covers Module 15 - Lesson 1: TLS trust model. Practice the concepts in your isolated lab environment.',
    'm3I-h9uSgj8', 30, 1,
    ARRAY['Explain the role of **TLS trust model** in ordinary network behavior.', 'Demonstrate **TLS negotiation** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **HTTP/2 and HTTP/3** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC troubleshooting**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-15', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 15 - Lesson 1: TLS trust model', 'Network Security Engineering (Mod 15)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000f-4000-8000-000000000002', v_course_id, 'e0000000-000f-4000-8000-000000000000', 'm15-l2-tls-negotiation', 'Module 15 - Lesson 2: TLS negotiation', 'Video lesson presented by CyberTube Instructor. Covers Module 15 - Lesson 2: TLS negotiation. Practice the concepts in your isolated lab environment.',
    'yodDbgoCnLM', 30, 2,
    ARRAY['Explain the role of **TLS trust model** in ordinary network behavior.', 'Demonstrate **TLS negotiation** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **HTTP/2 and HTTP/3** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC troubleshooting**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-15', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 15 - Lesson 2: TLS negotiation', 'Network Security Engineering (Mod 15)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000f-4000-8000-000000000003', v_course_id, 'e0000000-000f-4000-8000-000000000000', 'm15-l3-http-2-and-http-3', 'Module 15 - Lesson 3: HTTP/2 and HTTP/3', 'Video lesson presented by CyberTube Instructor. Covers Module 15 - Lesson 3: HTTP/2 and HTTP/3. Practice the concepts in your isolated lab environment.',
    'm3I-h9uSgj8', 30, 3,
    ARRAY['Explain the role of **TLS trust model** in ordinary network behavior.', 'Demonstrate **TLS negotiation** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **HTTP/2 and HTTP/3** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC troubleshooting**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-15', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 15 - Lesson 3: HTTP/2 and HTTP/3', 'Network Security Engineering (Mod 15)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-000f-4000-8000-000000000004', v_course_id, 'e0000000-000f-4000-8000-000000000000', 'm15-l4-soc-troubleshooting', 'Module 15 - Lesson 4: SOC troubleshooting', 'Video lesson presented by CyberTube Instructor. Covers Module 15 - Lesson 4: SOC troubleshooting. Practice the concepts in your isolated lab environment.',
    'yodDbgoCnLM', 30, 4,
    ARRAY['Explain the role of **TLS trust model** in ordinary network behavior.', 'Demonstrate **TLS negotiation** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **HTTP/2 and HTTP/3** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC troubleshooting**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-15', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 15 - Lesson 4: SOC troubleshooting', 'Network Security Engineering (Mod 15)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0010-4000-8000-000000000001', v_course_id, 'e0000000-0010-4000-8000-000000000000', 'm16-l1-private-addressing', 'Module 16 - Lesson 1: Private addressing', 'Video lesson presented by CyberTube Instructor. Covers Module 16 - Lesson 1: Private addressing. Practice the concepts in your isolated lab environment.',
    '2TZCfTgopeg', 30, 1,
    ARRAY['Explain the role of **Private addressing** in ordinary network behavior.', 'Demonstrate **Static vs dynamic NAT** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **PAT and port mapping** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC attribution**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-16', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 16 - Lesson 1: Private addressing', 'Network Security Engineering (Mod 16)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0010-4000-8000-000000000002', v_course_id, 'e0000000-0010-4000-8000-000000000000', 'm16-l2-static-vs-dynamic-nat', 'Module 16 - Lesson 2: Static vs dynamic NAT', 'Video lesson presented by CyberTube Instructor. Covers Module 16 - Lesson 2: Static vs dynamic NAT. Practice the concepts in your isolated lab environment.',
    'JI9Zm2tbUoE', 30, 2,
    ARRAY['Explain the role of **Private addressing** in ordinary network behavior.', 'Demonstrate **Static vs dynamic NAT** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **PAT and port mapping** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC attribution**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-16', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 16 - Lesson 2: Static vs dynamic NAT', 'Network Security Engineering (Mod 16)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0010-4000-8000-000000000003', v_course_id, 'e0000000-0010-4000-8000-000000000000', 'm16-l3-pat-and-port-mapping', 'Module 16 - Lesson 3: PAT and port mapping', 'Video lesson presented by CyberTube Instructor. Covers Module 16 - Lesson 3: PAT and port mapping. Practice the concepts in your isolated lab environment.',
    '2TZCfTgopeg', 30, 3,
    ARRAY['Explain the role of **Private addressing** in ordinary network behavior.', 'Demonstrate **Static vs dynamic NAT** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **PAT and port mapping** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC attribution**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-16', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 16 - Lesson 3: PAT and port mapping', 'Network Security Engineering (Mod 16)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0010-4000-8000-000000000004', v_course_id, 'e0000000-0010-4000-8000-000000000000', 'm16-l4-soc-attribution', 'Module 16 - Lesson 4: SOC attribution', 'Video lesson presented by CyberTube Instructor. Covers Module 16 - Lesson 4: SOC attribution. Practice the concepts in your isolated lab environment.',
    'JI9Zm2tbUoE', 30, 4,
    ARRAY['Explain the role of **Private addressing** in ordinary network behavior.', 'Demonstrate **Static vs dynamic NAT** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **PAT and port mapping** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC attribution**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-16', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 16 - Lesson 4: SOC attribution', 'Network Security Engineering (Mod 16)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0011-4000-8000-000000000001', v_course_id, 'e0000000-0011-4000-8000-000000000000', 'm17-l1-filtering-logic', 'Module 17 - Lesson 1: Filtering logic', 'Video lesson presented by CyberTube Instructor. Covers Module 17 - Lesson 1: Filtering logic. Practice the concepts in your isolated lab environment.',
    'z023_eRUtSo', 30, 1,
    ARRAY['Explain the role of **Filtering logic** in ordinary network behavior.', 'Demonstrate **Rule order** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Network zones** as operational or security evidence.', 'Produce a defensible analyst write-up about **Firewall investigations**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-17', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 17 - Lesson 1: Filtering logic', 'Network Security Engineering (Mod 17)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0011-4000-8000-000000000002', v_course_id, 'e0000000-0011-4000-8000-000000000000', 'm17-l2-rule-order', 'Module 17 - Lesson 2: Rule order', 'Video lesson presented by CyberTube Instructor. Covers Module 17 - Lesson 2: Rule order. Practice the concepts in your isolated lab environment.',
    'Xgwph7kERps', 30, 2,
    ARRAY['Explain the role of **Filtering logic** in ordinary network behavior.', 'Demonstrate **Rule order** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Network zones** as operational or security evidence.', 'Produce a defensible analyst write-up about **Firewall investigations**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-17', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 17 - Lesson 2: Rule order', 'Network Security Engineering (Mod 17)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0011-4000-8000-000000000003', v_course_id, 'e0000000-0011-4000-8000-000000000000', 'm17-l3-network-zones', 'Module 17 - Lesson 3: Network zones', 'Video lesson presented by CyberTube Instructor. Covers Module 17 - Lesson 3: Network zones. Practice the concepts in your isolated lab environment.',
    'z023_eRUtSo', 30, 3,
    ARRAY['Explain the role of **Filtering logic** in ordinary network behavior.', 'Demonstrate **Rule order** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Network zones** as operational or security evidence.', 'Produce a defensible analyst write-up about **Firewall investigations**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-17', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 17 - Lesson 3: Network zones', 'Network Security Engineering (Mod 17)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0011-4000-8000-000000000004', v_course_id, 'e0000000-0011-4000-8000-000000000000', 'm17-l4-firewall-investigations', 'Module 17 - Lesson 4: Firewall investigations', 'Video lesson presented by CyberTube Instructor. Covers Module 17 - Lesson 4: Firewall investigations. Practice the concepts in your isolated lab environment.',
    'Xgwph7kERps', 30, 4,
    ARRAY['Explain the role of **Filtering logic** in ordinary network behavior.', 'Demonstrate **Rule order** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Network zones** as operational or security evidence.', 'Produce a defensible analyst write-up about **Firewall investigations**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-17', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 17 - Lesson 4: Firewall investigations', 'Network Security Engineering (Mod 17)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0012-4000-8000-000000000001', v_course_id, 'e0000000-0012-4000-8000-000000000000', 'm18-l1-wireless-architecture', 'Module 18 - Lesson 1: Wireless architecture', 'Video lesson presented by CyberTube Instructor. Covers Module 18 - Lesson 1: Wireless architecture. Practice the concepts in your isolated lab environment.',
    'wHXKo9So5y8', 30, 1,
    ARRAY['Explain the role of **Wireless architecture** in ordinary network behavior.', 'Demonstrate **802.11 basics** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Authentication** as operational or security evidence.', 'Produce a defensible analyst write-up about **Wireless monitoring**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-18', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 18 - Lesson 1: Wireless architecture', 'Network Security Engineering (Mod 18)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0012-4000-8000-000000000002', v_course_id, 'e0000000-0012-4000-8000-000000000000', 'm18-l2-802-11-basics', 'Module 18 - Lesson 2: 802.11 basics', 'Video lesson presented by CyberTube Instructor. Covers Module 18 - Lesson 2: 802.11 basics. Practice the concepts in your isolated lab environment.',
    'ewtDKmovou4', 30, 2,
    ARRAY['Explain the role of **Wireless architecture** in ordinary network behavior.', 'Demonstrate **802.11 basics** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Authentication** as operational or security evidence.', 'Produce a defensible analyst write-up about **Wireless monitoring**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-18', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 18 - Lesson 2: 802.11 basics', 'Network Security Engineering (Mod 18)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0012-4000-8000-000000000003', v_course_id, 'e0000000-0012-4000-8000-000000000000', 'm18-l3-authentication', 'Module 18 - Lesson 3: Authentication', 'Video lesson presented by CyberTube Instructor. Covers Module 18 - Lesson 3: Authentication. Practice the concepts in your isolated lab environment.',
    'wHXKo9So5y8', 30, 3,
    ARRAY['Explain the role of **Wireless architecture** in ordinary network behavior.', 'Demonstrate **802.11 basics** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Authentication** as operational or security evidence.', 'Produce a defensible analyst write-up about **Wireless monitoring**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-18', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 18 - Lesson 3: Authentication', 'Network Security Engineering (Mod 18)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0012-4000-8000-000000000004', v_course_id, 'e0000000-0012-4000-8000-000000000000', 'm18-l4-wireless-monitoring', 'Module 18 - Lesson 4: Wireless monitoring', 'Video lesson presented by CyberTube Instructor. Covers Module 18 - Lesson 4: Wireless monitoring. Practice the concepts in your isolated lab environment.',
    'ewtDKmovou4', 30, 4,
    ARRAY['Explain the role of **Wireless architecture** in ordinary network behavior.', 'Demonstrate **802.11 basics** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Authentication** as operational or security evidence.', 'Produce a defensible analyst write-up about **Wireless monitoring**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-18', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 18 - Lesson 4: Wireless monitoring', 'Network Security Engineering (Mod 18)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0013-4000-8000-000000000001', v_course_id, 'e0000000-0013-4000-8000-000000000000', 'm19-l1-ipv6-representation', 'Module 19 - Lesson 1: IPv6 representation', 'Video lesson presented by CyberTube Instructor. Covers Module 19 - Lesson 1: IPv6 representation. Practice the concepts in your isolated lab environment.',
    'ZNuXyOXae5U', 30, 1,
    ARRAY['Explain the role of **IPv6 representation** in ordinary network behavior.', 'Demonstrate **NDP and ICMPv6** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Dual-stack paths** as operational or security evidence.', 'Produce a defensible analyst write-up about **Defensive checks**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-19', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 19 - Lesson 1: IPv6 representation', 'Network Security Engineering (Mod 19)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0013-4000-8000-000000000002', v_course_id, 'e0000000-0013-4000-8000-000000000000', 'm19-l2-ndp-and-icmpv6', 'Module 19 - Lesson 2: NDP and ICMPv6', 'Video lesson presented by CyberTube Instructor. Covers Module 19 - Lesson 2: NDP and ICMPv6. Practice the concepts in your isolated lab environment.',
    '0aGqGKrRE0g', 30, 2,
    ARRAY['Explain the role of **IPv6 representation** in ordinary network behavior.', 'Demonstrate **NDP and ICMPv6** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Dual-stack paths** as operational or security evidence.', 'Produce a defensible analyst write-up about **Defensive checks**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-19', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 19 - Lesson 2: NDP and ICMPv6', 'Network Security Engineering (Mod 19)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0013-4000-8000-000000000003', v_course_id, 'e0000000-0013-4000-8000-000000000000', 'm19-l3-dual-stack-paths', 'Module 19 - Lesson 3: Dual-stack paths', 'Video lesson presented by CyberTube Instructor. Covers Module 19 - Lesson 3: Dual-stack paths. Practice the concepts in your isolated lab environment.',
    'ZNuXyOXae5U', 30, 3,
    ARRAY['Explain the role of **IPv6 representation** in ordinary network behavior.', 'Demonstrate **NDP and ICMPv6** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Dual-stack paths** as operational or security evidence.', 'Produce a defensible analyst write-up about **Defensive checks**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-19', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 19 - Lesson 3: Dual-stack paths', 'Network Security Engineering (Mod 19)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0013-4000-8000-000000000004', v_course_id, 'e0000000-0013-4000-8000-000000000000', 'm19-l4-defensive-checks', 'Module 19 - Lesson 4: Defensive checks', 'Video lesson presented by CyberTube Instructor. Covers Module 19 - Lesson 4: Defensive checks. Practice the concepts in your isolated lab environment.',
    '0aGqGKrRE0g', 30, 4,
    ARRAY['Explain the role of **IPv6 representation** in ordinary network behavior.', 'Demonstrate **NDP and ICMPv6** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Dual-stack paths** as operational or security evidence.', 'Produce a defensible analyst write-up about **Defensive checks**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-19', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 19 - Lesson 4: Defensive checks', 'Network Security Engineering (Mod 19)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0014-4000-8000-000000000001', v_course_id, 'e0000000-0014-4000-8000-000000000000', 'm20-l1-vpn-use-cases', 'Module 20 - Lesson 1: VPN use cases', 'Video lesson presented by CyberTube Instructor. Covers Module 20 - Lesson 1: VPN use cases. Practice the concepts in your isolated lab environment.',
    'Rx8q7N-qZVc', 30, 1,
    ARRAY['Explain the role of **VPN use cases** in ordinary network behavior.', 'Demonstrate **Tunnel endpoints** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Protocol concepts** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC monitoring**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-20', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 20 - Lesson 1: VPN use cases', 'Network Security Engineering (Mod 20)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0014-4000-8000-000000000002', v_course_id, 'e0000000-0014-4000-8000-000000000000', 'm20-l2-tunnel-endpoints', 'Module 20 - Lesson 2: Tunnel endpoints', 'Video lesson presented by CyberTube Instructor. Covers Module 20 - Lesson 2: Tunnel endpoints. Practice the concepts in your isolated lab environment.',
    'ewtDKmovou4', 30, 2,
    ARRAY['Explain the role of **VPN use cases** in ordinary network behavior.', 'Demonstrate **Tunnel endpoints** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Protocol concepts** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC monitoring**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-20', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 20 - Lesson 2: Tunnel endpoints', 'Network Security Engineering (Mod 20)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0014-4000-8000-000000000003', v_course_id, 'e0000000-0014-4000-8000-000000000000', 'm20-l3-protocol-concepts', 'Module 20 - Lesson 3: Protocol concepts', 'Video lesson presented by CyberTube Instructor. Covers Module 20 - Lesson 3: Protocol concepts. Practice the concepts in your isolated lab environment.',
    'Rx8q7N-qZVc', 30, 3,
    ARRAY['Explain the role of **VPN use cases** in ordinary network behavior.', 'Demonstrate **Tunnel endpoints** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Protocol concepts** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC monitoring**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-20', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 20 - Lesson 3: Protocol concepts', 'Network Security Engineering (Mod 20)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0014-4000-8000-000000000004', v_course_id, 'e0000000-0014-4000-8000-000000000000', 'm20-l4-soc-monitoring', 'Module 20 - Lesson 4: SOC monitoring', 'Video lesson presented by CyberTube Instructor. Covers Module 20 - Lesson 4: SOC monitoring. Practice the concepts in your isolated lab environment.',
    'ewtDKmovou4', 30, 4,
    ARRAY['Explain the role of **VPN use cases** in ordinary network behavior.', 'Demonstrate **Tunnel endpoints** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Protocol concepts** as operational or security evidence.', 'Produce a defensible analyst write-up about **SOC monitoring**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-20', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 20 - Lesson 4: SOC monitoring', 'Network Security Engineering (Mod 20)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0015-4000-8000-000000000001', v_course_id, 'e0000000-0015-4000-8000-000000000000', 'm21-l1-capture-safely', 'Module 21 - Lesson 1: Capture safely', 'Video lesson presented by CyberTube Instructor. Covers Module 21 - Lesson 1: Capture safely. Practice the concepts in your isolated lab environment.',
    'OU-A2EmVrKQ', 30, 1,
    ARRAY['Explain the role of **Capture safely** in ordinary network behavior.', 'Demonstrate **Capture vs display filters** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Statistics** as operational or security evidence.', 'Produce a defensible analyst write-up about **TShark workflow**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-21', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 21 - Lesson 1: Capture safely', 'Network Security Engineering (Mod 21)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0015-4000-8000-000000000002', v_course_id, 'e0000000-0015-4000-8000-000000000000', 'm21-l2-capture-vs-display-filters', 'Module 21 - Lesson 2: Capture vs display filters', 'Video lesson presented by CyberTube Instructor. Covers Module 21 - Lesson 2: Capture vs display filters. Practice the concepts in your isolated lab environment.',
    'YJGGYKAV4pA', 30, 2,
    ARRAY['Explain the role of **Capture safely** in ordinary network behavior.', 'Demonstrate **Capture vs display filters** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Statistics** as operational or security evidence.', 'Produce a defensible analyst write-up about **TShark workflow**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-21', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 21 - Lesson 2: Capture vs display filters', 'Network Security Engineering (Mod 21)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0015-4000-8000-000000000003', v_course_id, 'e0000000-0015-4000-8000-000000000000', 'm21-l3-statistics', 'Module 21 - Lesson 3: Statistics', 'Video lesson presented by CyberTube Instructor. Covers Module 21 - Lesson 3: Statistics. Practice the concepts in your isolated lab environment.',
    'OU-A2EmVrKQ', 30, 3,
    ARRAY['Explain the role of **Capture safely** in ordinary network behavior.', 'Demonstrate **Capture vs display filters** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Statistics** as operational or security evidence.', 'Produce a defensible analyst write-up about **TShark workflow**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-21', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 21 - Lesson 3: Statistics', 'Network Security Engineering (Mod 21)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0015-4000-8000-000000000004', v_course_id, 'e0000000-0015-4000-8000-000000000000', 'm21-l4-tshark-workflow', 'Module 21 - Lesson 4: TShark workflow', 'Video lesson presented by CyberTube Instructor. Covers Module 21 - Lesson 4: TShark workflow. Practice the concepts in your isolated lab environment.',
    'YJGGYKAV4pA', 30, 4,
    ARRAY['Explain the role of **Capture safely** in ordinary network behavior.', 'Demonstrate **Capture vs display filters** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Statistics** as operational or security evidence.', 'Produce a defensible analyst write-up about **TShark workflow**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-21', 'intermediate', 'soc-analyst']::TEXT[], ARRAY['Module 21 - Lesson 4: TShark workflow', 'Network Security Engineering (Mod 21)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0016-4000-8000-000000000001', v_course_id, 'e0000000-0016-4000-8000-000000000000', 'm22-l1-handshake-timing', 'Module 22 - Lesson 1: Handshake timing', 'Video lesson presented by CyberTube Instructor. Covers Module 22 - Lesson 1: Handshake timing. Practice the concepts in your isolated lab environment.',
    'HTQLipAG27I', 30, 1,
    ARRAY['Explain the role of **Handshake timing** in ordinary network behavior.', 'Demonstrate **Retransmissions** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Window dynamics** as operational or security evidence.', 'Produce a defensible analyst write-up about **Incident context**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-22', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 22 - Lesson 1: Handshake timing', 'Network Security Engineering (Mod 22)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0016-4000-8000-000000000002', v_course_id, 'e0000000-0016-4000-8000-000000000000', 'm22-l2-retransmissions', 'Module 22 - Lesson 2: Retransmissions', 'Video lesson presented by CyberTube Instructor. Covers Module 22 - Lesson 2: Retransmissions. Practice the concepts in your isolated lab environment.',
    'rmFX1V49K8U', 30, 2,
    ARRAY['Explain the role of **Handshake timing** in ordinary network behavior.', 'Demonstrate **Retransmissions** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Window dynamics** as operational or security evidence.', 'Produce a defensible analyst write-up about **Incident context**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-22', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 22 - Lesson 2: Retransmissions', 'Network Security Engineering (Mod 22)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0016-4000-8000-000000000003', v_course_id, 'e0000000-0016-4000-8000-000000000000', 'm22-l3-window-dynamics', 'Module 22 - Lesson 3: Window dynamics', 'Video lesson presented by CyberTube Instructor. Covers Module 22 - Lesson 3: Window dynamics. Practice the concepts in your isolated lab environment.',
    'HTQLipAG27I', 30, 3,
    ARRAY['Explain the role of **Handshake timing** in ordinary network behavior.', 'Demonstrate **Retransmissions** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Window dynamics** as operational or security evidence.', 'Produce a defensible analyst write-up about **Incident context**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-22', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 22 - Lesson 3: Window dynamics', 'Network Security Engineering (Mod 22)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0016-4000-8000-000000000004', v_course_id, 'e0000000-0016-4000-8000-000000000000', 'm22-l4-incident-context', 'Module 22 - Lesson 4: Incident context', 'Video lesson presented by CyberTube Instructor. Covers Module 22 - Lesson 4: Incident context. Practice the concepts in your isolated lab environment.',
    'rmFX1V49K8U', 30, 4,
    ARRAY['Explain the role of **Handshake timing** in ordinary network behavior.', 'Demonstrate **Retransmissions** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Window dynamics** as operational or security evidence.', 'Produce a defensible analyst write-up about **Incident context**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-22', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 22 - Lesson 4: Incident context', 'Network Security Engineering (Mod 22)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0017-4000-8000-000000000001', v_course_id, 'e0000000-0017-4000-8000-000000000000', 'm23-l1-dns-traffic-baseline', 'Module 23 - Lesson 1: DNS traffic baseline', 'Video lesson presented by CyberTube Instructor. Covers Module 23 - Lesson 1: DNS traffic baseline. Practice the concepts in your isolated lab environment.',
    '3FPaTvCJojQ', 30, 1,
    ARRAY['Explain the role of **DNS traffic baseline** in ordinary network behavior.', 'Demonstrate **Long and encoded labels** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Resolver anomalies** as operational or security evidence.', 'Produce a defensible analyst write-up about **Triage workflow**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-23', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 23 - Lesson 1: DNS traffic baseline', 'Network Security Engineering (Mod 23)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0017-4000-8000-000000000002', v_course_id, 'e0000000-0017-4000-8000-000000000000', 'm23-l2-long-and-encoded-labels', 'Module 23 - Lesson 2: Long and encoded labels', 'Video lesson presented by CyberTube Instructor. Covers Module 23 - Lesson 2: Long and encoded labels. Practice the concepts in your isolated lab environment.',
    '7D_FapNrRUM', 30, 2,
    ARRAY['Explain the role of **DNS traffic baseline** in ordinary network behavior.', 'Demonstrate **Long and encoded labels** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Resolver anomalies** as operational or security evidence.', 'Produce a defensible analyst write-up about **Triage workflow**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-23', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 23 - Lesson 2: Long and encoded labels', 'Network Security Engineering (Mod 23)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0017-4000-8000-000000000003', v_course_id, 'e0000000-0017-4000-8000-000000000000', 'm23-l3-resolver-anomalies', 'Module 23 - Lesson 3: Resolver anomalies', 'Video lesson presented by CyberTube Instructor. Covers Module 23 - Lesson 3: Resolver anomalies. Practice the concepts in your isolated lab environment.',
    '3FPaTvCJojQ', 30, 3,
    ARRAY['Explain the role of **DNS traffic baseline** in ordinary network behavior.', 'Demonstrate **Long and encoded labels** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Resolver anomalies** as operational or security evidence.', 'Produce a defensible analyst write-up about **Triage workflow**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-23', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 23 - Lesson 3: Resolver anomalies', 'Network Security Engineering (Mod 23)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0017-4000-8000-000000000004', v_course_id, 'e0000000-0017-4000-8000-000000000000', 'm23-l4-triage-workflow', 'Module 23 - Lesson 4: Triage workflow', 'Video lesson presented by CyberTube Instructor. Covers Module 23 - Lesson 4: Triage workflow. Practice the concepts in your isolated lab environment.',
    '7D_FapNrRUM', 30, 4,
    ARRAY['Explain the role of **DNS traffic baseline** in ordinary network behavior.', 'Demonstrate **Long and encoded labels** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Resolver anomalies** as operational or security evidence.', 'Produce a defensible analyst write-up about **Triage workflow**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-23', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 23 - Lesson 4: Triage workflow', 'Network Security Engineering (Mod 23)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0018-4000-8000-000000000001', v_course_id, 'e0000000-0018-4000-8000-000000000000', 'm24-l1-web-flow-reconstruction', 'Module 24 - Lesson 1: Web flow reconstruction', 'Video lesson presented by CyberTube Instructor. Covers Module 24 - Lesson 1: Web flow reconstruction. Practice the concepts in your isolated lab environment.',
    'yodDbgoCnLM', 30, 1,
    ARRAY['Explain the role of **Web flow reconstruction** in ordinary network behavior.', 'Demonstrate **Encrypted metadata** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **QUIC basics** as operational or security evidence.', 'Produce a defensible analyst write-up about **Incident report**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-24', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 24 - Lesson 1: Web flow reconstruction', 'Network Security Engineering (Mod 24)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0018-4000-8000-000000000002', v_course_id, 'e0000000-0018-4000-8000-000000000000', 'm24-l2-encrypted-metadata', 'Module 24 - Lesson 2: Encrypted metadata', 'Video lesson presented by CyberTube Instructor. Covers Module 24 - Lesson 2: Encrypted metadata. Practice the concepts in your isolated lab environment.',
    'm3I-h9uSgj8', 30, 2,
    ARRAY['Explain the role of **Web flow reconstruction** in ordinary network behavior.', 'Demonstrate **Encrypted metadata** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **QUIC basics** as operational or security evidence.', 'Produce a defensible analyst write-up about **Incident report**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-24', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 24 - Lesson 2: Encrypted metadata', 'Network Security Engineering (Mod 24)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0018-4000-8000-000000000003', v_course_id, 'e0000000-0018-4000-8000-000000000000', 'm24-l3-quic-basics', 'Module 24 - Lesson 3: QUIC basics', 'Video lesson presented by CyberTube Instructor. Covers Module 24 - Lesson 3: QUIC basics. Practice the concepts in your isolated lab environment.',
    'yodDbgoCnLM', 30, 3,
    ARRAY['Explain the role of **Web flow reconstruction** in ordinary network behavior.', 'Demonstrate **Encrypted metadata** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **QUIC basics** as operational or security evidence.', 'Produce a defensible analyst write-up about **Incident report**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-24', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 24 - Lesson 3: QUIC basics', 'Network Security Engineering (Mod 24)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0018-4000-8000-000000000004', v_course_id, 'e0000000-0018-4000-8000-000000000000', 'm24-l4-incident-report', 'Module 24 - Lesson 4: Incident report', 'Video lesson presented by CyberTube Instructor. Covers Module 24 - Lesson 4: Incident report. Practice the concepts in your isolated lab environment.',
    'm3I-h9uSgj8', 30, 4,
    ARRAY['Explain the role of **Web flow reconstruction** in ordinary network behavior.', 'Demonstrate **Encrypted metadata** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **QUIC basics** as operational or security evidence.', 'Produce a defensible analyst write-up about **Incident report**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-24', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 24 - Lesson 4: Incident report', 'Network Security Engineering (Mod 24)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0019-4000-8000-000000000001', v_course_id, 'e0000000-0019-4000-8000-000000000000', 'm25-l1-telemetry-sources', 'Module 25 - Lesson 1: Telemetry sources', 'Video lesson presented by CyberTube Instructor. Covers Module 25 - Lesson 1: Telemetry sources. Practice the concepts in your isolated lab environment.',
    'JSP-yOBRbrg', 30, 1,
    ARRAY['Explain the role of **Telemetry sources** in ordinary network behavior.', 'Demonstrate **Syslog fields** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Flow records** as operational or security evidence.', 'Produce a defensible analyst write-up about **Correlation basics**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-25', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 25 - Lesson 1: Telemetry sources', 'Network Security Engineering (Mod 25)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0019-4000-8000-000000000002', v_course_id, 'e0000000-0019-4000-8000-000000000000', 'm25-l2-syslog-fields', 'Module 25 - Lesson 2: Syslog fields', 'Video lesson presented by CyberTube Instructor. Covers Module 25 - Lesson 2: Syslog fields. Practice the concepts in your isolated lab environment.',
    'e1cwKwshC9I', 30, 2,
    ARRAY['Explain the role of **Telemetry sources** in ordinary network behavior.', 'Demonstrate **Syslog fields** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Flow records** as operational or security evidence.', 'Produce a defensible analyst write-up about **Correlation basics**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-25', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 25 - Lesson 2: Syslog fields', 'Network Security Engineering (Mod 25)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0019-4000-8000-000000000003', v_course_id, 'e0000000-0019-4000-8000-000000000000', 'm25-l3-flow-records', 'Module 25 - Lesson 3: Flow records', 'Video lesson presented by CyberTube Instructor. Covers Module 25 - Lesson 3: Flow records. Practice the concepts in your isolated lab environment.',
    'JSP-yOBRbrg', 30, 3,
    ARRAY['Explain the role of **Telemetry sources** in ordinary network behavior.', 'Demonstrate **Syslog fields** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Flow records** as operational or security evidence.', 'Produce a defensible analyst write-up about **Correlation basics**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-25', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 25 - Lesson 3: Flow records', 'Network Security Engineering (Mod 25)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-0019-4000-8000-000000000004', v_course_id, 'e0000000-0019-4000-8000-000000000000', 'm25-l4-correlation-basics', 'Module 25 - Lesson 4: Correlation basics', 'Video lesson presented by CyberTube Instructor. Covers Module 25 - Lesson 4: Correlation basics. Practice the concepts in your isolated lab environment.',
    'e1cwKwshC9I', 30, 4,
    ARRAY['Explain the role of **Telemetry sources** in ordinary network behavior.', 'Demonstrate **Syslog fields** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Flow records** as operational or security evidence.', 'Produce a defensible analyst write-up about **Correlation basics**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-25', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 25 - Lesson 4: Correlation basics', 'Network Security Engineering (Mod 25)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001a-4000-8000-000000000001', v_course_id, 'e0000000-001a-4000-8000-000000000000', 'm26-l1-zeek-architecture', 'Module 26 - Lesson 1: Zeek architecture', 'Video lesson presented by CyberTube Instructor. Covers Module 26 - Lesson 1: Zeek architecture. Practice the concepts in your isolated lab environment.',
    'e1cwKwshC9I', 30, 1,
    ARRAY['Explain the role of **Zeek architecture** in ordinary network behavior.', 'Demonstrate **conn.log basics** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Protocol logs** as operational or security evidence.', 'Produce a defensible analyst write-up about **Hunting logic**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-26', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 26 - Lesson 1: Zeek architecture', 'Network Security Engineering (Mod 26)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001a-4000-8000-000000000002', v_course_id, 'e0000000-001a-4000-8000-000000000000', 'm26-l2-conn-log-basics', 'Module 26 - Lesson 2: conn.log basics', 'Video lesson presented by CyberTube Instructor. Covers Module 26 - Lesson 2: conn.log basics. Practice the concepts in your isolated lab environment.',
    'JSP-yOBRbrg', 30, 2,
    ARRAY['Explain the role of **Zeek architecture** in ordinary network behavior.', 'Demonstrate **conn.log basics** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Protocol logs** as operational or security evidence.', 'Produce a defensible analyst write-up about **Hunting logic**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-26', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 26 - Lesson 2: conn.log basics', 'Network Security Engineering (Mod 26)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001a-4000-8000-000000000003', v_course_id, 'e0000000-001a-4000-8000-000000000000', 'm26-l3-protocol-logs', 'Module 26 - Lesson 3: Protocol logs', 'Video lesson presented by CyberTube Instructor. Covers Module 26 - Lesson 3: Protocol logs. Practice the concepts in your isolated lab environment.',
    'e1cwKwshC9I', 30, 3,
    ARRAY['Explain the role of **Zeek architecture** in ordinary network behavior.', 'Demonstrate **conn.log basics** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Protocol logs** as operational or security evidence.', 'Produce a defensible analyst write-up about **Hunting logic**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-26', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 26 - Lesson 3: Protocol logs', 'Network Security Engineering (Mod 26)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001a-4000-8000-000000000004', v_course_id, 'e0000000-001a-4000-8000-000000000000', 'm26-l4-hunting-logic', 'Module 26 - Lesson 4: Hunting logic', 'Video lesson presented by CyberTube Instructor. Covers Module 26 - Lesson 4: Hunting logic. Practice the concepts in your isolated lab environment.',
    'JSP-yOBRbrg', 30, 4,
    ARRAY['Explain the role of **Zeek architecture** in ordinary network behavior.', 'Demonstrate **conn.log basics** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Protocol logs** as operational or security evidence.', 'Produce a defensible analyst write-up about **Hunting logic**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-26', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 26 - Lesson 4: Hunting logic', 'Network Security Engineering (Mod 26)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001b-4000-8000-000000000001', v_course_id, 'e0000000-001b-4000-8000-000000000000', 'm27-l1-ids-vs-ips', 'Module 27 - Lesson 1: IDS vs IPS', 'Video lesson presented by CyberTube Instructor. Covers Module 27 - Lesson 1: IDS vs IPS. Practice the concepts in your isolated lab environment.',
    'JSP-yOBRbrg', 30, 1,
    ARRAY['Explain the role of **IDS vs IPS** in ordinary network behavior.', 'Demonstrate **Rule anatomy** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **eve.json events** as operational or security evidence.', 'Produce a defensible analyst write-up about **Alert validation**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-27', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 27 - Lesson 1: IDS vs IPS', 'Network Security Engineering (Mod 27)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001b-4000-8000-000000000002', v_course_id, 'e0000000-001b-4000-8000-000000000000', 'm27-l2-rule-anatomy', 'Module 27 - Lesson 2: Rule anatomy', 'Video lesson presented by CyberTube Instructor. Covers Module 27 - Lesson 2: Rule anatomy. Practice the concepts in your isolated lab environment.',
    'e1cwKwshC9I', 30, 2,
    ARRAY['Explain the role of **IDS vs IPS** in ordinary network behavior.', 'Demonstrate **Rule anatomy** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **eve.json events** as operational or security evidence.', 'Produce a defensible analyst write-up about **Alert validation**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-27', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 27 - Lesson 2: Rule anatomy', 'Network Security Engineering (Mod 27)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001b-4000-8000-000000000003', v_course_id, 'e0000000-001b-4000-8000-000000000000', 'm27-l3-eve-json-events', 'Module 27 - Lesson 3: eve.json events', 'Video lesson presented by CyberTube Instructor. Covers Module 27 - Lesson 3: eve.json events. Practice the concepts in your isolated lab environment.',
    'JSP-yOBRbrg', 30, 3,
    ARRAY['Explain the role of **IDS vs IPS** in ordinary network behavior.', 'Demonstrate **Rule anatomy** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **eve.json events** as operational or security evidence.', 'Produce a defensible analyst write-up about **Alert validation**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-27', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 27 - Lesson 3: eve.json events', 'Network Security Engineering (Mod 27)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001b-4000-8000-000000000004', v_course_id, 'e0000000-001b-4000-8000-000000000000', 'm27-l4-alert-validation', 'Module 27 - Lesson 4: Alert validation', 'Video lesson presented by CyberTube Instructor. Covers Module 27 - Lesson 4: Alert validation. Practice the concepts in your isolated lab environment.',
    'e1cwKwshC9I', 30, 4,
    ARRAY['Explain the role of **IDS vs IPS** in ordinary network behavior.', 'Demonstrate **Rule anatomy** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **eve.json events** as operational or security evidence.', 'Produce a defensible analyst write-up about **Alert validation**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-27', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 27 - Lesson 4: Alert validation', 'Network Security Engineering (Mod 27)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001c-4000-8000-000000000001', v_course_id, 'e0000000-001c-4000-8000-000000000000', 'm28-l1-discovery-basics', 'Module 28 - Lesson 1: Discovery basics', 'Video lesson presented by CyberTube Instructor. Covers Module 28 - Lesson 1: Discovery basics. Practice the concepts in your isolated lab environment.',
    '2rRSDGNo_Uo', 30, 1,
    ARRAY['Explain the role of **Discovery basics** in ordinary network behavior.', 'Demonstrate **Port state interpretation** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Service identification** as operational or security evidence.', 'Produce a defensible analyst write-up about **Defensive visibility**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-28', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 28 - Lesson 1: Discovery basics', 'Network Security Engineering (Mod 28)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001c-4000-8000-000000000002', v_course_id, 'e0000000-001c-4000-8000-000000000000', 'm28-l2-port-state-interpretation', 'Module 28 - Lesson 2: Port state interpretation', 'Video lesson presented by CyberTube Instructor. Covers Module 28 - Lesson 2: Port state interpretation. Practice the concepts in your isolated lab environment.',
    'Xgwph7kERps', 30, 2,
    ARRAY['Explain the role of **Discovery basics** in ordinary network behavior.', 'Demonstrate **Port state interpretation** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Service identification** as operational or security evidence.', 'Produce a defensible analyst write-up about **Defensive visibility**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-28', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 28 - Lesson 2: Port state interpretation', 'Network Security Engineering (Mod 28)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001c-4000-8000-000000000003', v_course_id, 'e0000000-001c-4000-8000-000000000000', 'm28-l3-service-identification', 'Module 28 - Lesson 3: Service identification', 'Video lesson presented by CyberTube Instructor. Covers Module 28 - Lesson 3: Service identification. Practice the concepts in your isolated lab environment.',
    '2rRSDGNo_Uo', 30, 3,
    ARRAY['Explain the role of **Discovery basics** in ordinary network behavior.', 'Demonstrate **Port state interpretation** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Service identification** as operational or security evidence.', 'Produce a defensible analyst write-up about **Defensive visibility**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-28', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 28 - Lesson 3: Service identification', 'Network Security Engineering (Mod 28)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001c-4000-8000-000000000004', v_course_id, 'e0000000-001c-4000-8000-000000000000', 'm28-l4-defensive-visibility', 'Module 28 - Lesson 4: Defensive visibility', 'Video lesson presented by CyberTube Instructor. Covers Module 28 - Lesson 4: Defensive visibility. Practice the concepts in your isolated lab environment.',
    'Xgwph7kERps', 30, 4,
    ARRAY['Explain the role of **Discovery basics** in ordinary network behavior.', 'Demonstrate **Port state interpretation** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Service identification** as operational or security evidence.', 'Produce a defensible analyst write-up about **Defensive visibility**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-28', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 28 - Lesson 4: Defensive visibility', 'Network Security Engineering (Mod 28)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001d-4000-8000-000000000001', v_course_id, 'e0000000-001d-4000-8000-000000000000', 'm29-l1-virtual-networks', 'Module 29 - Lesson 1: Virtual networks', 'Video lesson presented by CyberTube Instructor. Covers Module 29 - Lesson 1: Virtual networks. Practice the concepts in your isolated lab environment.',
    'SX-vJqeBzOQ', 30, 1,
    ARRAY['Explain the role of **Virtual networks** in ordinary network behavior.', 'Demonstrate **Ingress and egress** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Security groups and ACLs** as operational or security evidence.', 'Produce a defensible analyst write-up about **Cloud network evidence**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-29', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 29 - Lesson 1: Virtual networks', 'Network Security Engineering (Mod 29)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001d-4000-8000-000000000002', v_course_id, 'e0000000-001d-4000-8000-000000000000', 'm29-l2-ingress-and-egress', 'Module 29 - Lesson 2: Ingress and egress', 'Video lesson presented by CyberTube Instructor. Covers Module 29 - Lesson 2: Ingress and egress. Practice the concepts in your isolated lab environment.',
    '2TZCfTgopeg', 30, 2,
    ARRAY['Explain the role of **Virtual networks** in ordinary network behavior.', 'Demonstrate **Ingress and egress** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Security groups and ACLs** as operational or security evidence.', 'Produce a defensible analyst write-up about **Cloud network evidence**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-29', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 29 - Lesson 2: Ingress and egress', 'Network Security Engineering (Mod 29)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001d-4000-8000-000000000003', v_course_id, 'e0000000-001d-4000-8000-000000000000', 'm29-l3-security-groups-and-acls', 'Module 29 - Lesson 3: Security groups and ACLs', 'Video lesson presented by CyberTube Instructor. Covers Module 29 - Lesson 3: Security groups and ACLs. Practice the concepts in your isolated lab environment.',
    'SX-vJqeBzOQ', 30, 3,
    ARRAY['Explain the role of **Virtual networks** in ordinary network behavior.', 'Demonstrate **Ingress and egress** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Security groups and ACLs** as operational or security evidence.', 'Produce a defensible analyst write-up about **Cloud network evidence**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-29', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 29 - Lesson 3: Security groups and ACLs', 'Network Security Engineering (Mod 29)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001d-4000-8000-000000000004', v_course_id, 'e0000000-001d-4000-8000-000000000000', 'm29-l4-cloud-network-evidence', 'Module 29 - Lesson 4: Cloud network evidence', 'Video lesson presented by CyberTube Instructor. Covers Module 29 - Lesson 4: Cloud network evidence. Practice the concepts in your isolated lab environment.',
    '2TZCfTgopeg', 30, 4,
    ARRAY['Explain the role of **Virtual networks** in ordinary network behavior.', 'Demonstrate **Ingress and egress** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Security groups and ACLs** as operational or security evidence.', 'Produce a defensible analyst write-up about **Cloud network evidence**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-29', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 29 - Lesson 4: Cloud network evidence', 'Network Security Engineering (Mod 29)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001e-4000-8000-000000000001', v_course_id, 'e0000000-001e-4000-8000-000000000000', 'm30-l1-scoping-and-timeline', 'Module 30 - Lesson 1: Scoping and timeline', 'Video lesson presented by CyberTube Instructor. Covers Module 30 - Lesson 1: Scoping and timeline. Practice the concepts in your isolated lab environment.',
    'JSP-yOBRbrg', 30, 1,
    ARRAY['Explain the role of **Scoping and timeline** in ordinary network behavior.', 'Demonstrate **Multi-source analysis** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Judgment and caveats** as operational or security evidence.', 'Produce a defensible analyst write-up about **Communication and defense**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-30', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 30 - Lesson 1: Scoping and timeline', 'Network Security Engineering (Mod 30)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001e-4000-8000-000000000002', v_course_id, 'e0000000-001e-4000-8000-000000000000', 'm30-l2-multi-source-analysis', 'Module 30 - Lesson 2: Multi-source analysis', 'Video lesson presented by CyberTube Instructor. Covers Module 30 - Lesson 2: Multi-source analysis. Practice the concepts in your isolated lab environment.',
    '3FPaTvCJojQ', 30, 2,
    ARRAY['Explain the role of **Scoping and timeline** in ordinary network behavior.', 'Demonstrate **Multi-source analysis** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Judgment and caveats** as operational or security evidence.', 'Produce a defensible analyst write-up about **Communication and defense**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-30', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 30 - Lesson 2: Multi-source analysis', 'Network Security Engineering (Mod 30)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001e-4000-8000-000000000003', v_course_id, 'e0000000-001e-4000-8000-000000000000', 'm30-l3-judgment-and-caveats', 'Module 30 - Lesson 3: Judgment and caveats', 'Video lesson presented by CyberTube Instructor. Covers Module 30 - Lesson 3: Judgment and caveats. Practice the concepts in your isolated lab environment.',
    'rmFX1V49K8U', 30, 3,
    ARRAY['Explain the role of **Scoping and timeline** in ordinary network behavior.', 'Demonstrate **Multi-source analysis** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Judgment and caveats** as operational or security evidence.', 'Produce a defensible analyst write-up about **Communication and defense**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-30', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 30 - Lesson 3: Judgment and caveats', 'Network Security Engineering (Mod 30)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

  INSERT INTO public.lessons (
    id, course_id, module_id, slug, title, description,
    youtube_video_id, duration_minutes, order_index,
    objectives, tags, skills_taught
  ) VALUES (
    'e0000000-001e-4000-8000-000000000004', v_course_id, 'e0000000-001e-4000-8000-000000000000', 'm30-l4-communication-and-defense', 'Module 30 - Lesson 4: Communication and defense', 'Video lesson presented by CyberTube Instructor. Covers Module 30 - Lesson 4: Communication and defense. Practice the concepts in your isolated lab environment.',
    'JSP-yOBRbrg', 30, 4,
    ARRAY['Explain the role of **Scoping and timeline** in ordinary network behavior.', 'Demonstrate **Multi-source analysis** using either a simulator, a permitted local system, or a sample PCAP.', 'Interpret **Judgment and caveats** as operational or security evidence.', 'Produce a defensible analyst write-up about **Communication and defense**, with uncertainty and limits stated.']::TEXT[], ARRAY['networking', 'module-30', 'advanced', 'soc-analyst']::TEXT[], ARRAY['Module 30 - Lesson 4: Communication and defense', 'Network Security Engineering (Mod 30)', 'Defensive Network Operations']::TEXT[]
  ) ON CONFLICT (course_id, slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    youtube_video_id = EXCLUDED.youtube_video_id,
    duration_minutes = EXCLUDED.duration_minutes,
    order_index = EXCLUDED.order_index,
    objectives = EXCLUDED.objectives,
    tags = EXCLUDED.tags,
    skills_taught = EXCLUDED.skills_taught;

END $$;