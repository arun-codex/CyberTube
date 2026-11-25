BEGIN;
-- Lesson: m23-l3-resolver-anomalies (e0000000-0017-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'N7vGxbZsyzc',
  duration_minutes = 11,
  description = 'Video instruction presented by STAARKEN INFOSEC (Fortify Solutions): "DNS Tunneling Attack & Access Target Shell | Full Hands-On Ethical Hacking Lab". Technical focus on detecting DNS resolver anomalies, identifying high-entropy subdomain requests and abnormal TXT query volume, and uncovering DNS tunneling and covert data exfiltration channels in Wireshark.'
WHERE id = 'e0000000-0017-4000-8000-000000000003';
-- Lesson: m23-l4-triage-workflow (e0000000-0017-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'xqukCIPQ1wE',
  duration_minutes = 7,
  description = 'Video instruction presented by Mohd Maaz: "Detect DNS Beaconing with Splunk  Threat Hunting Tutorial". Technical focus on m23-l4-triage-workflow: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.'
WHERE id = 'e0000000-0017-4000-8000-000000000004';
-- Lesson: m24-l1-web-flow-reconstruction (e0000000-0018-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'Fn__yRYW6Wo',
  duration_minutes = 5,
  description = 'Video instruction presented by Chris Greer: "Extracting Files from PCAPs with Wireshark // Lesson 9 // Wireshark Tutorial". Technical focus on reconstructing HTTP and web application sessions from raw packet captures, extracting embedded files, images, and executables, and auditing web transaction headers.'
WHERE id = 'e0000000-0018-4000-8000-000000000001';
-- Lesson: m24-l2-encrypted-metadata (e0000000-0018-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'v0tgVm-QE9E',
  duration_minutes = 15,
  description = 'Video instruction presented by Security BSides London: "Visualising TLS Fingerprints With TMAP To Hunt Malicious Domains - Amanda Thomson". Technical focus on m24-l2-encrypted-metadata: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.'
WHERE id = 'e0000000-0018-4000-8000-000000000002';
-- Lesson: m24-l3-quic-basics (e0000000-0018-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'yodDbgoCnLM',
  duration_minutes = 28,
  description = 'Video instruction presented by David Bombal: "Decrypting TLS, HTTP/2 and QUIC with Wireshark". Technical focus on m24-l3-quic-basics: in-depth protocol analysis, packet dissection, defensive security implications, and hands-on investigation for SOC analysts and network engineers.'
WHERE id = 'e0000000-0018-4000-8000-000000000003';
-- Lesson: m24-l4-incident-report (e0000000-0018-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = '097y4P80WnI',
  duration_minutes = 12,
  description = 'Video instruction presented by Watchman: "Incident Report Writing (LEARN CYBER SECURITY TODAY!)". Technical focus on authoring forensic incident response reports, documenting network evidence timelines, presenting packet capture artifacts, and drafting executive defense summaries.'
WHERE id = 'e0000000-0018-4000-8000-000000000004';
-- Lesson: m25-l1-telemetry-sources (e0000000-0019-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'JSP-yOBRbrg',
  duration_minutes = 34,
  description = 'Video instruction presented by TechSky - Ethical Hacking: "How to Monitor Network Traffic (SOC Analyst Lab with TShark, Zeek & Suricata)". Technical focus on enterprise network telemetry data sources, comparing full packet capture (PCAP) with flow metadata, proxy logs, firewall events, and endpoint telemetry.'
WHERE id = 'e0000000-0019-4000-8000-000000000001';
-- Lesson: m25-l2-syslog-fields (e0000000-0019-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'RaQPSKQ4J5A',
  duration_minutes = 28,
  description = 'Video instruction presented by Jeremy''s IT Lab: "Free CCNA | Syslog | Day 41 | CCNA 200-301 Complete Course". Technical focus on Syslog protocol standards (RFC 3164 / RFC 5424), facility and severity levels (0-7), message structure formatting, and secure TLS syslog transport.'
WHERE id = 'e0000000-0019-4000-8000-000000000002';
-- Lesson: m25-l3-flow-records (e0000000-0019-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'lL7xRH_BpHU',
  duration_minutes = 6,
  description = 'Video instruction presented by TrainerTests: "NetFlow & IPFIX Explained: Troubleshooting Networks with Flow Data (Networking Basics)". Technical focus on NetFlow v5/v9, IPFIX, and sFlow architectures, flow cache generation, unidirectional session tracking, and bandwidth utilization telemetry.'
WHERE id = 'e0000000-0019-4000-8000-000000000003';
-- Lesson: m25-l4-correlation-basics (e0000000-0019-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'h2KfYmACu2s',
  duration_minutes = 74,
  description = 'Video instruction presented by CyberWarFare Labs : "Log Correlation & Attack Mapping: A SOC Analyst’s Playbook | Free Live Cybersecurity Workshop 2026". Technical focus on cross-telemetry event correlation in modern SIEM systems, joining firewall drops, IDS alerts, and flow logs to trace multi-stage attack paths.'
WHERE id = 'e0000000-0019-4000-8000-000000000004';
-- Lesson: m26-l1-zeek-architecture (e0000000-001a-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'e1cwKwshC9I',
  duration_minutes = 52,
  description = 'Video instruction presented by Hank Hackerson: "SOC Lvl 1 / EP.16a / Zeek Tutorial Pt.1 / Security Analyst Training". Technical focus on Zeek (formerly Bro) network security monitoring architecture, event engine parsing, policy script interpreter, and automated protocol dissection.'
WHERE id = 'e0000000-001a-4000-8000-000000000001';
-- Lesson: m26-l2-conn-log-basics (e0000000-001a-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'bznH1yMyjjo',
  duration_minutes = 13,
  description = 'Video instruction presented by John Hubbard: "12 Days of Defense - Day 2: How to use Zeek for PCAP Analysis". Technical focus on Zeek `conn.log` forensic fields, analyzing connection duration, byte counters (orig/resp bytes), connection state history flags (SF, S0, REJ, RSTO), and session triage.'
WHERE id = 'e0000000-001a-4000-8000-000000000002';
-- Lesson: m26-l3-protocol-logs (e0000000-001a-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = '-eLI0_OCEmk',
  duration_minutes = 18,
  description = 'Video instruction presented by Threat Hunter''s Daily: "Introduction to Zeek network security monitoring, conn.log and pivoting with Zeek UIDs". Technical focus on Zeek protocol log correlation, inspecting `http.log`, `dns.log`, `ssl.log`, and `files.log`, tracking file SHA-256 hashes, and pivoting on unique connection UIDs.'
WHERE id = 'e0000000-001a-4000-8000-000000000003';
-- Lesson: m26-l4-hunting-logic (e0000000-001a-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'Uvb2R8W0E-I',
  duration_minutes = 7,
  description = 'Video instruction presented by Rajneesh Gupta: "Splunk Basics: Zeek Connection Log Analysis". Technical focus on threat hunting with Zeek logs, writing custom Zeek scripts for behavioral anomaly detection, and querying Zeek telemetry in Splunk or ELK.'
WHERE id = 'e0000000-001a-4000-8000-000000000004';
-- Lesson: m27-l1-ids-vs-ips (e0000000-001b-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = '91i7InHVOso',
  duration_minutes = 11,
  description = 'Video instruction presented by HackerSploit: "Introduction To Suricata IDS". Technical focus on Suricata multi-threaded network threat detection engine, inspecting packet acquisition modules (AF_PACKET, PF_RING), and inline IPS drop capabilities.'
WHERE id = 'e0000000-001b-4000-8000-000000000001';
-- Lesson: m27-l2-rule-anatomy (e0000000-001b-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'd-t-8lJ2PII',
  duration_minutes = 17,
  description = 'Video instruction presented by Insane Cyber: "Writing Suricata Rules: Understanding The Basic Rule Format". Technical focus on Suricata rule syntax anatomy, action keywords (alert/drop/pass), protocol definitions, direction operators, and content matching keywords (`uricontent`, `pcre`, `classtype`).'
WHERE id = 'e0000000-001b-4000-8000-000000000002';
-- Lesson: m27-l3-eve-json-events (e0000000-001b-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'zUqHTf-jjeA',
  duration_minutes = 20,
  description = 'Video instruction presented by Maurice Gardner: "Examine alerts, logs, and rules with Suricata". Technical focus on Suricata `eve.json` unified event logging, parsing alert payloads, metadata tags, flow records, and streaming eve events to SIEM pipelines.'
WHERE id = 'e0000000-001b-4000-8000-000000000003';
-- Lesson: m27-l4-alert-validation (e0000000-001b-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = '0WgyiOxCFzE',
  duration_minutes = 75,
  description = 'Video instruction presented by SharkFest Wireshark Developer and User Conference: "SF20V - 18 Intrusion Analysis and Threat Hunting with Suricata (Josh Stroschein/Jack Mott)". Technical focus on Suricata intrusion alert triage, correlating eve.json alert records with raw packet captures in Wireshark, validating true positive exploits, and tuning detection signatures to eliminate false-positive alert fatigue.'
WHERE id = 'e0000000-001b-4000-8000-000000000004';
-- Lesson: m28-l1-discovery-basics (e0000000-001c-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = '2rRSDGNo_Uo',
  duration_minutes = 6,
  description = 'Video instruction presented by Chris Greer: "Getting Started with Nmap - Full Course with @davidbombal!!". Technical focus on network reconnaissance fundamentals, passive OSINT gathering versus active network scanning, ARP sweeps, and ICMP host discovery with Nmap.'
WHERE id = 'e0000000-001c-4000-8000-000000000001';
-- Lesson: m28-l2-port-state-interpretation (e0000000-001c-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'VFJLMOk6daQ',
  duration_minutes = 10,
  description = 'Video instruction presented by HackerSploit: "Nmap Tutorial For Beginners - 2 - Advanced Scanning". Technical focus on Nmap port scanning mechanics, interpreting port states (Open, Closed, Filtered, Unfiltered), and analyzing SYN scan (`-sS`) versus TCP Connect (`-sT`) packet responses.'
WHERE id = 'e0000000-001c-4000-8000-000000000002';
-- Lesson: m28-l3-service-identification (e0000000-001c-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'j3H7O-hBrI0',
  duration_minutes = 4,
  description = 'Video instruction presented by ACW360: "Part 7 — Version Detection & OS Fingerprinting: -sV & -O". Technical focus on active service version probing (`-sV`) and OS fingerprinting (`-O`), evaluating banner grabbing probes, and identifying vulnerable application versions.'
WHERE id = 'e0000000-001c-4000-8000-000000000003';
-- Lesson: m28-l4-defensive-visibility (e0000000-001c-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'Maec4f2gt2c',
  duration_minutes = 37,
  description = 'Video instruction presented by Plaintext Packets: "How NMAP Works and How to Detect Port Scans in Wireshark". Technical focus on detecting Nmap reconnaissance from the defensive perspective, identifying scanning footprints in Wireshark, and configuring firewall rate limiting to thwart reconnaissance.'
WHERE id = 'e0000000-001c-4000-8000-000000000004';
-- Lesson: m29-l1-virtual-networks (e0000000-001d-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = '7_NNlnH7sAg',
  duration_minutes = 10,
  description = 'Video instruction presented by Tiny Technical Tutorials: "Amazon/AWS VPC (Virtual Private Cloud) Basics | VPC Tutorial | AWS for Beginners". Technical focus on Cloud Virtual Private Cloud (VPC) architecture, software-defined networking (SDN) overlays, overlay encapsulation (VXLAN/GENEVE), and multi-tenant isolation.'
WHERE id = 'e0000000-001d-4000-8000-000000000001';
-- Lesson: m29-l2-ingress-and-egress (e0000000-001d-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = 'ksJWwkG_p4M',
  duration_minutes = 9,
  description = 'Video instruction presented by KnoDAX: "AWS VPC Routing | VPC Routing Tutorial | Understanding Route Tables, Internet Gateway, and Subnets". Technical focus on cloud network ingress and egress traffic control, routing tables, Internet Gateways (IGW), NAT Gateways, and managing perimeter cloud egress points.'
WHERE id = 'e0000000-001d-4000-8000-000000000002';
-- Lesson: m29-l3-security-groups-and-acls (e0000000-001d-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'rTs13yQq8A0',
  duration_minutes = 8,
  description = 'Video instruction presented by LearnITGuide Tutorials: "AWS Security Groups vs Network ACLs: Key Differences Explained 2026". Technical focus on cloud defense-in-depth security, contrasting stateful Security Groups applied at elastic network interfaces with stateless Network Access Control Lists (NACLs) at subnet boundaries.'
WHERE id = 'e0000000-001d-4000-8000-000000000003';
-- Lesson: m29-l4-cloud-network-evidence (e0000000-001d-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'noBOOD7uLJE',
  duration_minutes = 26,
  description = 'Video instruction presented by Cloud Security Masterclass: "AWS Security Labs | AWS VPC Flow Logs". Technical focus on cloud network forensic investigation, analyzing AWS/Azure VPC Flow Logs, tracking ACCEPT and REJECT events, and investigating cloud lateral movement.'
WHERE id = 'e0000000-001d-4000-8000-000000000004';
-- Lesson: m30-l1-scoping-and-timeline (e0000000-001e-4000-8000-000000000001)
UPDATE public.lessons
SET
  youtube_video_id = 'X3RGOPEhDw4',
  duration_minutes = 22,
  description = 'Video instruction presented by MyDFIR: "Cybersecurity SOC Analyst Lab - Web Investigation (PCAP)". Technical focus on scoping enterprise network security incidents, establishing investigative boundaries, correlating multi-sensor timestamps, and building forensic event timelines.'
WHERE id = 'e0000000-001e-4000-8000-000000000001';
-- Lesson: m30-l2-multi-source-analysis (e0000000-001e-4000-8000-000000000002)
UPDATE public.lessons
SET
  youtube_video_id = '0Ji16Q4zdGQ',
  duration_minutes = 9,
  description = 'Video instruction presented by root: "How zeek and kibana work in Security Onion.". Technical focus on multi-source network evidence corroboration, fusing raw PCAPs, Zeek logs, firewall alerts, and endpoint telemetry into a unified investigation narrative.'
WHERE id = 'e0000000-001e-4000-8000-000000000002';
-- Lesson: m30-l3-judgment-and-caveats (e0000000-001e-4000-8000-000000000003)
UPDATE public.lessons
SET
  youtube_video_id = 'M8yoYmiL7rA',
  duration_minutes = 24,
  description = 'Video instruction presented by Simply Cyber - Gerald Auger, PhD: "SOC Analyst Skills - Wireshark Malicious Traffic Analysis". Technical focus on analytical judgment in SOC investigations, evaluating evidence confidence levels, stating technical caveats, identifying anti-forensic indicators, and avoiding attribution bias.'
WHERE id = 'e0000000-001e-4000-8000-000000000003';
-- Lesson: m30-l4-communication-and-defense (e0000000-001e-4000-8000-000000000004)
UPDATE public.lessons
SET
  youtube_video_id = 'GVkyFvQVlPY',
  duration_minutes = 15,
  description = 'Video instruction presented by Motasem Hamdan: "How to Write a Professional Incident Response Report (DFIR Guide)". Technical focus on executive communication and technical incident defense, structuring professional SOC post-incident documentation, briefing leadership on business impact, and presenting containment proposals.'
WHERE id = 'e0000000-001e-4000-8000-000000000004';
COMMIT;
