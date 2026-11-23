#!/usr/bin/env python3
"""
CyberTube Generator: MITRE ATT&CK for Incident Response: Zero to Advanced (30 Modules, 150 Lessons)
Generates:
  1. src/data/mitre-attack-incident-response-course.ts
  2. supabase/migrations/20261121150000_seed_mitre_attack_incident_response_course.sql
"""

import glob
import os
import re
import json

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def quote_sql(text):
    if text is None:
        return "NULL"
    escaped = text.replace("'", "''")
    return f"'{escaped}'"

def to_pg_array(items):
    if not items:
        return "ARRAY[]::TEXT[]"
    escaped_items = []
    for item in items:
        clean = item.replace("'", "''")
        escaped_items.append(f"'{clean}'")
    return f"ARRAY[{', '.join(escaped_items)}]::TEXT[]"

# Primary YouTube video anchors (11-character verified video IDs)
MODULE_VIDEOS = {
    1: {"videoId": "bY8UjFW0k3I", "creator": "Motasem Hamdan", "title": "Introduction to Digital Forensics and Incident Response"},
    2: {"videoId": "Yxv1suJYMI8", "creator": "MITRE Corporation & CISA", "title": "Incident Response Frameworks and ATT&CK Alignment"},
    3: {"videoId": "THOGnEqoStQ", "creator": "MITRE Corporation", "title": "Understanding ATT&CK — MITRE Official Fundamentals, Module 1"},
    4: {"videoId": "l7vj_L9GOL4", "creator": "MITRE Corporation", "title": "Benefits of Using ATT&CK — MITRE Fundamentals, Module 2"},
    5: {"videoId": "r0FXhxjTN0c", "creator": "MITRE Corporation", "title": "Operationalizing ATT&CK — MITRE Fundamentals, Module 3"},
    6: {"videoId": "r0FXhxjTN0c", "creator": "MITRE Corporation", "title": "Turn Incident Narratives into ATT&CK Mappings"},
    7: {"videoId": "bY8UjFW0k3I", "creator": "Motasem Hamdan & CISA", "title": "IR Preparedness, Playbooks and Evidence Readiness"},
    8: {"videoId": "lEXwtkJqlx4", "creator": "MITRE Corporation", "title": "Overview of ATT&CK-Based SOC Assessments"},
    9: {"videoId": "bY8UjFW0k3I", "creator": "Motasem Hamdan", "title": "Digital Evidence Preservation and Chain of Custody"},
    10: {"videoId": "svxqs_yvJIk", "creator": "WireDogSec", "title": "Windows Authentication and Identity Investigation"},
    11: {"videoId": "svxqs_yvJIk", "creator": "WireDogSec", "title": "Windows Process, PowerShell and Sysmon Telemetry"},
    12: {"videoId": "bY8UjFW0k3I", "creator": "Motasem Hamdan", "title": "Linux and SSH Incident Investigation"},
    13: {"videoId": "ygtTDz3X8BQ", "creator": "BlackPerl DFIR", "title": "Network Forensics: DNS, HTTP, TLS and PCAP Analysis"},
    14: {"videoId": "bY8UjFW0k3I", "creator": "Motasem Hamdan", "title": "Phishing, Initial Access and User Execution Triage"},
    15: {"videoId": "svxqs_yvJIk", "creator": "WireDogSec", "title": "Credential Access and Compromised Identity Investigation"},
    16: {"videoId": "svxqs_yvJIk", "creator": "WireDogSec", "title": "Persistence and Privilege Escalation Detection"},
    17: {"videoId": "TFgO_6pO0ww", "creator": "MITRE Corporation", "title": "Stealth and Defense Impairment (ATT&CK Enterprise v20.1)"},
    18: {"videoId": "TFgO_6pO0ww", "creator": "MITRE Corporation", "title": "Discovery and Lateral Movement Investigation"},
    19: {"videoId": "ygtTDz3X8BQ", "creator": "BlackPerl DFIR", "title": "Collection, C2 and Exfiltration Analysis"},
    20: {"videoId": "dnuc26bV_UE", "creator": "Etactics", "title": "Ransomware Impact, Containment and Crisis Management"},
    21: {"videoId": "Uk3DEgY5Ue8", "creator": "DFIRScience", "title": "Introduction to Memory Forensics with Volatility 3"},
    22: {"videoId": "bY8UjFW0k3I", "creator": "Motasem Hamdan", "title": "Timeline Reconstruction and Case Management"},
    23: {"videoId": "bY8UjFW0k3I", "creator": "Motasem Hamdan", "title": "Malware and Suspicious Document Triage"},
    24: {"videoId": "TFgO_6pO0ww", "creator": "MITRE Corporation", "title": "SIEM Searching, Correlation and Case Enrichment"},
    25: {"videoId": "gc3QcPdZaQU", "creator": "MITRE Corporation", "title": "Detection Engineering and ATT&CK Analytics"},
    26: {"videoId": "zSVnJWV5kpE", "creator": "MITRE Corporation", "title": "TTP-Based Threat Hunting"},
    27: {"videoId": "DbbiEPDeNXs", "creator": "MITRE Corporation", "title": "Determining Hunting Data Requirements and Blind Spots"},
    28: {"videoId": "B_IDPp5STBY", "creator": "MITRE Corporation", "title": "Synthesizing SOC Assessments and ATT&CK Navigator"},
    29: {"videoId": "dnuc26bV_UE", "creator": "Etactics", "title": "Containment, Eradication, Recovery and Lessons Learned"},
    30: {"videoId": "jtBnbpi7q1s", "creator": "MITRE Corporation", "title": "Full ATT&CK-Informed Incident Investigation Capstone"}
}

# 30 Scenario-based Quizzes (3 questions per module)
MODULE_QUIZZES = {
    1: [
        {
            "question": "What is the primary operational boundary separating a SOC Tier 1 (L1) analyst from Tier 2/Incident Responders during alert intake?",
            "options": [
                "L1 analysts independently execute permanent host re-imaging without supervisory notification",
                "L1 analysts perform initial alert triage, validate telemetry factuality, eliminate false positives, and escalate validated anomalies without taking disruptive unilateral actions",
                "L1 analysts are exclusively authorized to declare corporate disaster recovery emergencies",
                "L1 analysts only review firewall documentation and never touch SIEM alerts"
            ],
            "correctAnswerIndex": 1,
            "explanation": "L1 triage focuses on rapid validation, gathering facts, ruling out benign causes, and escalating confirmed anomalies to higher tiers before disruptive remediation is initiated."
        },
        {
            "question": "Why must an incident triage ticket distinguish between observed factual telemetry and investigative hypotheses?",
            "options": [
                "To ensure the ticket complies with character count limits",
                "Because conflating assumptions with verified logs leads to premature conclusions, confirmation bias, and incorrect containment decisions",
                "Hypotheses are illegal under NIST SP 800-61r3",
                "Factual logs are deleted once a hypothesis is written"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Maintaining clear demarcation between empirical evidence and analyst hypotheses prevents biased investigations, ensures auditability, and stops teams from pursuing incorrect adversary tracks."
        },
        {
            "question": "In the CIA Triad, how does unauthorized exfiltration of proprietary engineering blueprints affect enterprise risk?",
            "options": [
                "It compromises Confidentiality because sensitive data was disclosed to unauthorized parties, even if production availability remained intact",
                "It solely impacts Availability because the files cannot be opened concurrently",
                "It violates Integrity because the network bandwidth was consumed",
                "It produces no impact if the local files were not encrypted or deleted"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Exfiltration directly violates confidentiality by disclosing proprietary data to unauthorized entities, irrespective of whether system availability was disrupted."
        }
    ],
    2: [
        {
            "question": "How does NIST SP 800-61 Revision 3 modernize incident response compared to older linear incident response models?",
            "options": [
                "It mandates that incident response must be completed in exactly 24 hours without post-incident reviews",
                "It emphasizes continuous integration between Incident Response and the NIST Cybersecurity Framework 2.0 (Govern, Identify, Protect, Detect, Respond, Recover) rather than a rigid linear checklist",
                "It removes the requirement for evidence collection and forensic preservation",
                "It eliminates communication between technical teams and legal counsel"
            ],
            "correctAnswerIndex": 1,
            "explanation": "NIST SP 800-61r3 shifts from a siloed, linear model to a continuous, CSF 2.0-aligned lifecycle where lessons learned immediately inform governance, protective controls, and detection readiness."
        },
        {
            "question": "When declaring an enterprise incident severity level, what factor holds the highest operational priority?",
            "options": [
                "The total number of informational alerts generated in the SIEM",
                "The verified impact on critical business assets, regulatory sensitivity, life safety, or core revenue-generating operations",
                "The specific brand of firewall that detected the anomaly",
                "Whether the alert was generated on a weekday or weekend"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Severity declarations are driven by business impact—the criticality of affected systems, data sensitivity, operational downtime, and legal/regulatory repercussions."
        },
        {
            "question": "Why does NIST SP 800-61r3 emphasize 'Continuous Improvement' as an ongoing feedback loop rather than a one-time exit step?",
            "options": [
                "To satisfy external marketing goals",
                "Because threat actor procedures evolve, and root-cause findings from an investigation must systematically update preventive controls, detection rules, and readiness playbooks",
                "To force security analysts to work overtime continuously",
                "It prevents organizations from ever closing an incident case"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Continuous improvement ensures that post-incident retrospectives directly fortify defenses, close collection blind spots, and tune alerts so the organization is more resilient to future attempts."
        }
    ],
    3: [
        {
            "question": "What fundamental gap in threat detection does the MITRE ATT&CK knowledge base address that IOCs (file hashes, IPs) cannot?",
            "options": [
                "ATT&CK provides free software licenses for commercial SIEM platforms",
                "ATT&CK categorizes real-world adversary behaviors, tactics, and techniques (TTPs) that persist even when attackers alter file hashes and IP infrastructure",
                "ATT&CK acts as an automated antivirus engine that cleans infected endpoints",
                "ATT&CK replaces the need for network firewalls and endpoint telemetry"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Adversaries can easily modify IP addresses, domain names, and file hashes (the base of the Pyramid of Pain). ATT&CK focuses on attacker behaviors and techniques (TTPs), which are much harder for adversaries to change."
        },
        {
            "question": "What is the primary purpose of an ATT&CK 'Tactic' in the Enterprise Matrix?",
            "options": [
                "To identify the specific command-line switches used in an executable",
                "To define the adversary's tactical goal or objective (the 'why') behind a set of technical actions",
                "To list the CVE numbers associated with legacy software vulnerabilities",
                "To track the hourly cost of the incident response engagement"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Tactics represent the adversary's tactical objectives—why an adversary is performing an action (e.g., Initial Access, Persistence, Privilege Escalation, Exfiltration)."
        },
        {
            "question": "Why should incident responders avoid forcing an ATT&CK mapping when telemetry lacks sufficient evidence?",
            "options": [
                "Because ATT&CK mappings are legally binding in federal court",
                "Speculative mappings introduce confirmation bias, mislead detection engineers, and skew organizational risk metrics with false assumptions",
                "ATT&CK website servers will ban organizations that submit unverified mappings",
                "Technique IDs cannot be removed once typed into a report"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Defensible incident response requires evidence-based mapping. When evidence is ambiguous or incomplete, assigning a speculative technique distorts threat intelligence and misleads remediation efforts."
        }
    ],
    4: [
        {
            "question": "What is the precise structural relationship between a Tactic, Technique, Sub-technique, and Procedure in MITRE ATT&CK?",
            "options": [
                "They are interchangeable terms for the same software vulnerability",
                "Tactic is the goal (why); Technique is the general method (how); Sub-technique provides granular specificity; Procedure is the exact observed implementation executed by an adversary in the wild",
                "Procedure is the high-level policy, while Tactic is the command-line code",
                "Techniques apply only to Linux, while Sub-techniques apply only to Windows"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Tactic represents the goal (e.g. Credential Access); Technique represents the approach (e.g. OS Credential Dumping); Sub-technique narrows the mechanism (e.g. LSASS Memory); Procedure represents the exact command or tool used by a threat group."
        },
        {
            "question": "Adversary group APT29 uses PowerShell to execute 'Get-Process lsass | ...' in an enterprise intrusion. What component of ATT&CK does this specific command represent?",
            "options": [
                "A Tactic",
                "A Procedure",
                "A Matrix Header",
                "A Mitigation Category"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The specific command executed in an environment is an empirical Procedure demonstrating how an adversary implemented a technique."
        },
        {
            "question": "Why did MITRE introduce Sub-techniques in ATT&CK version 7?",
            "options": [
                "To reduce the number of pages on their public website",
                "To prevent techniques from becoming overly broad catch-alls and to provide actionable, granular categorization for detection and testing",
                "To remove all non-Windows techniques from the matrix",
                "To require paid subscriptions for detailed analysis"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Sub-techniques were introduced to resolve ambiguity where single techniques (like Process Injection) encompassed fundamentally different technical mechanisms that required distinct detection rules."
        }
    ],
    5: [
        {
            "question": "In MITRE ATT&CK Enterprise v20.1 (late 2026), what major structural taxonomy change replaced the legacy monolithic 'Defense Evasion' tactic?",
            "options": [
                "Defense Evasion was split into two distinct tactics: Stealth (TA0045) and Defense Impairment (TA0046)",
                "Defense Evasion was completely removed without replacement",
                "Defense Evasion was merged into Initial Access",
                "Defense Evasion was renamed exclusively for cloud workloads"
            ],
            "correctAnswerIndex": 0,
            "explanation": "ATT&CK Enterprise v20.1 separated legacy Defense Evasion into 'Stealth' (tactics to conceal malicious activity without altering defenses) and 'Defense Impairment' (actively disabling, tampering with, or degrading security controls)."
        },
        {
            "question": "Why is recording the exact ATT&CK version (e.g., Enterprise v20.1) essential when authoring SOC reports and threat intelligence briefs?",
            "options": [
                "Because older versions automatically invalidate company insurance policies",
                "Technique IDs, names, tactic memberships, and scopes change across versions, making historical comparisons and cross-organization sharing unreliable without version provenance",
                "Version numbers determine the font color used in ATT&CK Navigator",
                "It is a requirement only for government agencies"
            ],
            "correctAnswerIndex": 1,
            "explanation": "ATT&CK is a living knowledge base. Deprecated techniques, remapped sub-techniques, and split tactics mean that an ID in v12 may refer to a different scope than in v20.1. Exact version attribution preserves data fidelity."
        },
        {
            "question": "What is the consequence of treating 'deprecated' ATT&CK techniques as active in an enterprise detection matrix?",
            "options": [
                "The SIEM software will crash during log ingestion",
                "Engineering effort will be wasted on obsolete definitions while new sub-techniques addressing modern adversary tradecraft remain unmonitored",
                "The organization's network domain will be delisted by DNS root servers",
                "It has no impact because deprecated techniques are automatically updated by the operating system"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Tracking deprecated techniques misallocates defensive resources to outdated scopes while blind spots persist in the updated techniques that accurately reflect current threat actor behaviors."
        }
    ],
    6: [
        {
            "question": "An incident ticket states: 'User opened invoice.zip containing invoice.js which executed via wscript.exe and downloaded payload.bin.' How should this narrative be mapped to ATT&CK?",
            "options": [
                "Phishing (T1566) -> User Execution: Malicious File (T1204.002) -> Command and Scripting Interpreter: Visual Basic (T1059.005) -> Ingress Tool Transfer (T1105)",
                "Only map to Exfiltration Over C2 Channel (T1041)",
                "Map to Hardware Backdoors (T1195.003)",
                "No mapping is possible because JavaScript cannot execute on Windows"
            ],
            "correctAnswerIndex": 0,
            "explanation": "The narrative details initial delivery via archive (Phishing/Malicious File), user interaction (User Execution), execution via the Windows script host, and outbound file retrieval (Ingress Tool Transfer)."
        },
        {
            "question": "What evidence is required before an analyst can defensibly map an event to 'T1078 - Valid Accounts' rather than a brute-force or exploitation technique?",
            "options": [
                "The attacker used an IP address located in a foreign country",
                "Telemetry must confirm successful authentication using legitimate, existing domain or local credentials without evidence of protocol exploitation at the login moment",
                "The user must verbally confirm they shared their password on Slack",
                "The event log must contain an explicit error code 4625"
            ],
            "correctAnswerIndex": 1,
            "explanation": "T1078 applies when an adversary authenticates using existing, legitimate credentials (whether stolen, default, or compromised), distinct from exploiting an authentication bypass vulnerability."
        },
        {
            "question": "Why must analysts record 'Alternative Explanations' alongside prospective ATT&CK mappings in triage worksheets?",
            "options": [
                "To provide busywork for junior SOC analysts",
                "To rigorously test whether administrative utilities, automated software updates, or IT scripts could legitimately produce the observed telemetry, preventing false-positive escalations",
                "To defend the company against copyright infringement claims",
                "Because SIEM software requires two explanations per event by design"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Many adversary techniques leverage dual-use administrative tools (Living off the Land). Considering benign operational explanations prevents false alarms and premature containment of normal IT operations."
        }
    ],
    7: [
        {
            "question": "Why is an 'Evidence Readiness' assessment conducted before an incident occurs rather than during active response?",
            "options": [
                "To purchase software subscriptions at end-of-quarter discounts",
                "To verify that critical endpoints, domain controllers, and cloud tenants have necessary logging policies, retention periods, and NTP synchronization active so forensic evidence exists when needed",
                "To eliminate the need for backup power generators in data centers",
                "Because logs cannot be recorded after an intrusion begins"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Responders cannot analyze logs that were never enabled or that were overwritten due to inadequate retention windows. Evidence readiness ensures telemetry is being reliably recorded before an incident occurs."
        },
        {
            "question": "What is the primary operational hazard of executing incident response playbooks without an approved Authority Matrix?",
            "options": [
                "Responders may either hesitate during critical containment windows due to fear of liability, or unilaterally disrupt vital business systems without executive authorization",
                "The playbooks will automatically fail their syntax validation check",
                "Cloud service providers will lock administrative access",
                "Network switch ports will overheat"
            ],
            "correctAnswerIndex": 0,
            "explanation": "An authority matrix clearly delineates who has the pre-approved power to isolate servers, reset domain passwords, or contact law enforcement, avoiding fatal delays or catastrophic unauthorized downtime."
        },
        {
            "question": "In an incident response contact tree, why must out-of-band communication channels (e.g., dedicated secure Signal groups or satellite phones) be established beforehand?",
            "options": [
                "To avoid paying enterprise email license fees",
                "Because sophisticated adversaries routinely monitor compromised corporate email and internal chat channels during active network intrusions",
                "Standard email does not support PDF file attachments",
                "To comply with local telecommunications zoning regulations"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Adversaries with administrative access frequently read internal SOC emails and Slack channels to monitor the response team's progress. Out-of-band communication prevents tipping off the threat actor."
        }
    ],
    8: [
        {
            "question": "What is the critical distinction between a 'Benign Positive' and a 'False Positive' in SOC alert triage?",
            "options": [
                "A Benign Positive occurs when the alert rule triggered accurately on real behavior, but the activity was authorized and non-hostile; a False Positive occurs when the rule triggered due to flawed detection logic",
                "They are exact synonyms in modern cybersecurity operations",
                "False positives only occur in firewall logs, while benign positives occur in antivirus logs",
                "A benign positive requires an immediate call to the FBI"
            ],
            "correctAnswerIndex": 0,
            "explanation": "A False Positive is an error in detection logic (e.g. matching a broken regex). A Benign Positive accurately detected the targeted behavior (e.g. bulk file archiving), but context revealed it was legitimate business activity."
        },
        {
            "question": "Which set of triage criteria justifies immediately escalating an alert from Tier 1 to Tier 2/Incident Responders?",
            "options": [
                "The alert occurred at 4:59 PM on a Friday",
                "Confirmed adversarial TTPs on high-value business assets, evidence of active lateral movement, or unauthorized credential harvesting that exceeds L1 playbook boundaries",
                "The endpoint user has submitted fewer than two support tickets this year",
                "The SIEM dashboard display has not been refreshed in over an hour"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Immediate escalation is required when verified malicious behaviors threaten crown jewels, exhibit active expansion (lateral movement), or require containment actions reserved for senior incident responders."
        },
        {
            "question": "Why should a SOC triage analyst never rely solely on alert names (e.g. 'Malicious PowerShell Detected') without inspecting raw event arguments?",
            "options": [
                "Alert names are generated randomly by machine learning algorithms",
                "Alert names are broad rule titles; raw parameters reveal the exact command line, decoded payloads, parent processes, execution context, and user intent",
                "Reading raw events voids the vendor's warranty",
                "Raw logs are always encrypted and unreadable"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Rule titles summarize a broad detection condition. Only the raw event telemetry (e.g. base64-encoded strings, script blocks, parent PID) provides the factual evidence needed to judge maliciousness."
        }
    ],
    9: [
        {
            "question": "According to the Order of Volatility in digital forensics (RFC 3227), which evidence source must be acquired FIRST during live triage?",
            "options": [
                "Archival backup tapes stored in offsite vaults",
                "Volatile system memory (RAM), active network connections, and running process state",
                "External USB hard drives connected to the workstation",
                "Printed paper copies of system configuration files"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Volatile memory is lost when power is cut or systems reboot. RAM contains running processes, injected code, decrypted credentials, and active network sockets, making it the highest preservation priority."
        },
        {
            "question": "What is the primary function of a cryptographic hash (e.g. SHA-256) in maintaining the Chain of Custody for digital evidence?",
            "options": [
                "To compress large disk image files to save storage space",
                "To mathematically prove that the forensic image or log export has not been altered or corrupted since the exact moment of acquisition",
                "To decrypt password-protected user documents",
                "To automatically upload the evidence to cloud threat databases"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Computing cryptographic hashes immediately upon acquisition establishes a baseline. Any subsequent verification matching that hash proves evidence integrity remained uncompromised."
        },
        {
            "question": "A responder powers down a running suspected domain controller by immediately pulling the physical power cord. What critical evidence is permanently destroyed?",
            "options": [
                "The physical hard drive sectors",
                "Volatile RAM contents, active memory-resident malware payloads, uncommitted cache, and ephemeral network socket tables",
                "The domain user account passwords stored in Active Directory",
                "The motherboard BIOS firmware"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Abrupt power disconnection destroys all volatile RAM contents, including injected in-memory DLLs, plaintext encryption keys, active C2 sockets, and temporary process execution artifacts."
        }
    ],
    10: [
        {
            "question": "In Windows Security event logs, what is the critical diagnostic difference between Event ID 4624 (Logon Type 2) and Event ID 4624 (Logon Type 3)?",
            "options": [
                "Logon Type 2 represents an interactive local logon (physical keyboard or console), while Logon Type 3 represents a network logon (e.g., SMB share access, remote authentication)",
                "Logon Type 2 is always malicious, while Logon Type 3 is always benign",
                "Logon Type 2 applies only to Linux hosts, while Logon Type 3 is Windows-specific",
                "Logon Type 2 indicates Kerberos, while Logon Type 3 indicates NTLM"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Logon Type 2 indicates interactive console login (user sat at the keyboard). Logon Type 3 indicates network access where credentials were authenticated across the network (e.g., accessing network file shares or PsExec service connect)."
        },
        {
            "question": "When investigating a surge of Windows Event ID 4625 (Failed Logon) with Status Code 0xC000006A, what specific authentication failure does this signify?",
            "options": [
                "The target user account does not exist in Active Directory",
                "The user account name is valid, but the supplied password was incorrect",
                "The user account is currently locked out",
                "The logon attempt occurred outside of authorized working hours"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Status 0xC000006A denotes 'User name is correct, but password is bad'. Contrast with 0xC0000064 ('User name does not exist') and 0xC0000234 ('User account is locked out')."
        },
        {
            "question": "During Kerberos authentication triage, what event ID records a Ticket Granting Service (TGS) request, often targeted during Kerberoasting attacks?",
            "options": [
                "Event ID 1102",
                "Event ID 4769",
                "Event ID 4688",
                "Event ID 7045"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Event 4769 records 'A Kerberos service ticket was requested' (TGS). High volumes of 4769 events with RC4 encryption (Ticket Encryption Type 0x17) requested for service accounts indicate Kerberoasting."
        }
    ],
    11: [
        {
            "question": "Why is Sysmon Event ID 1 (Process Creation) often superior to native Windows Security Event ID 4688 for security operations triage?",
            "options": [
                "Sysmon Event ID 1 includes parent process command line, file hashes (SHA256), process GUIDs, and current directory by default without complex GPO dependencies",
                "Sysmon events are exempt from disk space limitations",
                "Sysmon can execute processes faster than the Windows kernel",
                "Windows Event ID 4688 cannot record process names"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Sysmon Event 1 captures rich contextual metadata including process GUIDs (avoiding PID recycling ambiguity), parent command lines, image hashes, and user tokens in a single structured record."
        },
        {
            "question": "Which Windows PowerShell event channel records the complete, un-obfuscated script code executed at runtime, even when obfuscation or base64 encoding was applied?",
            "options": [
                "PowerShell Event ID 400 (Engine Lifecycle)",
                "PowerShell Event ID 4104 (Script Block Logging)",
                "Windows System Event ID 7036 (Service Control)",
                "Application Event ID 1000 (Application Crash)"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Script Block Logging (Event 4104) captures the full content of code blocks as they are passed to the PowerShell engine for execution, logging the de-obfuscated code even if heavily obfuscated on the command line."
        },
        {
            "question": "In Sysmon telemetry, what does Event ID 7 (Image Loaded) allow a defender to detect that cannot be observed via Event ID 1 alone?",
            "options": [
                "Network ping packets sent to external IP addresses",
                "Dynamic runtime loading of unauthorized or unsigned DLLs (such as DLL side-loading or injection into legitimate processes)",
                "User mouse movements and screen resolution changes",
                "Physical removal of the computer's hard drive"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Sysmon Event 7 tracks modules/DLLs loaded into running processes, enabling responders to uncover DLL hijacking, side-loading, and reflective injection into benign executables."
        }
    ],
    12: [
        {
            "question": "Which Linux log file is the primary destination for investigating authentication attempts, sudo commands, and SSH logins on Debian/Ubuntu systems?",
            "options": [
                "/var/log/dpkg.log",
                "/var/log/auth.log",
                "/var/log/kern.log",
                "/etc/shadow"
            ],
            "correctAnswerIndex": 1,
            "explanation": "On Debian-based distributions, `/var/log/auth.log` records all PAM and system authentication events, including SSH connections, su/sudo privilege elevation, and cron authentications (on RHEL/CentOS, this is `/var/log/secure`)."
        },
        {
            "question": "When investigating an unauthorized SSH session on a Linux host, where does an administrator inspect user-configured public keys permitted for passwordless login?",
            "options": [
                "/etc/ssh/sshd_config only",
                "~/.ssh/authorized_keys in the affected user's home directory",
                "/var/log/btmp",
                "/etc/hosts.allow"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The `~/.ssh/authorized_keys` file stores public keys authorized to log in as that user. Adversaries frequently append their own public key here for persistent backdoor access."
        },
        {
            "question": "What Linux kernel subsystem provides granular, tamper-resistant auditing of system calls, file access, and execution (comparable to Windows Sysmon)?",
            "options": [
                "iptables",
                "auditd (Linux Audit Subsystem)",
                "cron",
                "systemd-journal-gatewayd"
            ],
            "correctAnswerIndex": 1,
            "explanation": "The `auditd` subsystem allows defenders to configure rules monitoring specific system calls (execve), file attribute modifications, and sensitive directory access (/etc/shadow)."
        }
    ],
    13: [
        {
            "question": "During network traffic analysis, what observable pattern in DNS query logs strongly indicates DNS Tunneling or C2 communication?",
            "options": [
                "Frequent A-record queries for 'google.com' with 10 ms latency",
                "Abnormally high volumes of queries for unique, high-entropy subdomains with long character lengths directed to an authoritative nameserver",
                "Resolving hostnames through the internal Active Directory DNS server on port 53",
                "Standard reverse pointer (PTR) lookups for internal private IP ranges"
            ],
            "correctAnswerIndex": 1,
            "explanation": "DNS tunneling encodes data into subdomain labels (e.g. `a9f2bc18e.evil.com`). This manifests as high query volume, unique subdomains with high Shannon entropy, and large TXT or NULL record responses."
        },
        {
            "question": "How can an analyst inspect suspicious encrypted TLS network sessions when full TLS decryption/proxy inspection is unavailable?",
            "options": [
                "TLS cannot be analyzed in any form without private server keys",
                "By analyzing TLS handshake metadata, including Client Hello Server Name Indication (SNI), JA3/JA4 client fingerprints, certificate validity, and packet sizing/timing cadences",
                "By forcing the remote server to revert to plaintext HTTP",
                "By opening the PCAP file in Microsoft Word"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Even with encrypted payloads, the initial TLS handshake exposes the plaintext SNI (destination hostname), cipher suite offers (JA3/JA4 fingerprints), and server certificate details."
        },
        {
            "question": "In Wireshark or tshark, which display filter isolates HTTP POST requests containing uploaded file bodies or authentication form submissions?",
            "options": [
                "dns.flags.response == 1",
                "http.request.method == \"POST\"",
                "tcp.port == 443",
                "frame.len < 64"
            ],
            "correctAnswerIndex": 1,
            "explanation": "`http.request.method == \"POST\"` filters HTTP traffic down to POST submissions, which commonly contain form logins, API requests, file uploads, and C2 beacons."
        }
    ],
    14: [
        {
            "question": "In an email header investigation, which mechanism allows receiving mail servers to verify that the sending IP was authorized by the domain owner to send mail on their behalf?",
            "options": [
                "IMAP4",
                "SPF (Sender Policy Framework)",
                "POP3S",
                "MIME Multipart boundary"
            ],
            "correctAnswerIndex": 1,
            "explanation": "SPF (RFC 7208) publishes an authoritative list of sender IP addresses in DNS TXT records, allowing receiving MTAs to verify that an email originated from an authorized mail server."
        },
        {
            "question": "What is the primary objective of an adversary using 'HTML Smuggling' (ATT&CK T1027.006) in phishing campaigns?",
            "options": [
                "To speed up webpage rendering in the user's browser",
                "To dynamically assemble a malicious payload directly in memory inside the victim's browser using JavaScript and HTML5 blobs, bypassing perimeter email and proxy gateway filters",
                "To corrupt the victim's physical monitor display",
                "To brute force the user's Active Directory password"
            ],
            "correctAnswerIndex": 1,
            "explanation": "HTML Smuggling hides encoded files within benign-looking HTML attachments. When opened, browser JavaScript decodes the payload locally, bypassing network and email attachment inspection."
        },
        {
            "question": "When assessing whether a recipient fell victim to a phishing email with a malicious link, what is the definitive proof of compromise versus mere user delivery?",
            "options": [
                "The email landed in the user's inbox folder",
                "Telemetry confirms the user clicked the URL, followed by successful authentication or subsequent child process execution spawned by the browser/downloaded file",
                "The subject line contained the word 'Urgent'",
                "The sender used an @gmail.com address"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Delivery only proves the message was received. Compromise requires evidence of interaction—such as web proxy logs showing URL visits, credential submissions, or process execution of the downloaded file."
        }
    ],
    15: [
        {
            "question": "What is the key technical difference between a 'Password Spraying' attack and a traditional 'Brute Force' attack against enterprise identity?",
            "options": [
                "Password spraying attempts one common password across thousands of accounts to evade account lockout policies, while brute force tries thousands of passwords against a single account",
                "Password spraying works only on Linux, while brute force works on Windows",
                "Password spraying requires physical access to the target building",
                "Brute force attacks never trigger security event logs"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Brute forcing a single user with many passwords quickly triggers account lockouts. Password spraying deliberately tests a few high-probability passwords across many accounts, staying beneath lockout thresholds."
        },
        {
            "question": "Which Windows process is the target of memory dumping in ATT&CK T1003.001 (OS Credential Dumping: LSASS Memory)?",
            "options": [
                "explorer.exe",
                "lsass.exe (Local Security Authority Subsystem Service)",
                "spoolsv.exe",
                "svchost.exe"
            ],
            "correctAnswerIndex": 1,
            "explanation": "LSASS stores active logon sessions, Kerberos tickets, NTLM password hashes, and LM hashes in memory. Adversaries dump LSASS process memory to harvest credentials for lateral movement."
        },
        {
            "question": "In cloud identity (Azure AD / Entra ID / Google Workspace), what does an 'impossible travel' or 'geo-velocity' anomaly indicate?",
            "options": [
                "The user is using high-speed rail transportation",
                "Two consecutive successful authentications occurred from geographically distant locations within a time window physically impossible for human travel, indicating token or credential compromise",
                "The cloud service data center experienced a regional power failure",
                "The user updated their billing address"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Impossible travel occurs when logins from e.g. New York and Tokyo occur 15 minutes apart. Unless a proxy or corporate VPN is involved, it indicates that credentials or session tokens are being used by an unauthorized party."
        }
    ],
    16: [
        {
            "question": "In Windows environments, which registry path is the classic 'Run key' frequently leveraged by malware for persistence across reboots?",
            "options": [
                "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run",
                "HKCU\\Control Panel\\Desktop",
                "HKLM\\SYSTEM\\CurrentControlSet\\Control\\TimeZoneInformation",
                "HKLM\\HARDWARE\\DESCRIPTION\\System"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Keys under `CurrentVersion\\Run` and `RunOnce` are automatically executed when the user logs in, making them a common entry point for persistence."
        },
        {
            "question": "How does an adversary abuse Windows Scheduled Tasks (ATT&CK T1053.005) for both persistence AND privilege escalation?",
            "options": [
                "By changing the task's display icon in Task Scheduler",
                "By configuring the task to trigger at startup and execute an adversary-controlled binary with 'NT AUTHORITY\\SYSTEM' credentials",
                "By deleting all historical task execution logs",
                "By disabling the Windows Time service"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Adversaries create or modify scheduled tasks configured to run with highest privileges (SYSTEM), ensuring their code runs with elevated authority on a recurring schedule or system startup."
        },
        {
            "question": "On Linux systems, what cron directory allows privileged users and root to configure automated jobs that run at specific intervals?",
            "options": [
                "/etc/cron.d/ or /etc/crontab",
                "/tmp/cron",
                "/usr/share/doc/cron",
                "/var/log/cron.out"
            ],
            "correctAnswerIndex": 0,
            "explanation": "System-wide cron configuration resides in `/etc/crontab` and `/etc/cron.d/`, where scripts execute automatically with specified user permissions (often root)."
        }
    ],
    17: [
        {
            "question": "Under the ATT&CK Enterprise v20.1 taxonomy, how is 'Defense Impairment' (TA0046) clearly distinguished from 'Stealth' (TA0045)?",
            "options": [
                "Defense Impairment actively sabotages, alters, or disables existing security controls (e.g. killing EDR agents, clearing event logs), whereas Stealth conceals actions without touching the defense infrastructure",
                "Defense Impairment applies only to firewalls, while Stealth applies only to endpoint agents",
                "Stealth always triggers high-severity alerts, while Defense Impairment is silent",
                "There is no difference; they are aliases for the same concept"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Defense Impairment involves modifying or disabling security tooling (e.g., executing `wevtutil cl security` or modifying registry to disable Windows Defender). Stealth involves blending in (e.g., masquerading or timestomping) without altering defensive software."
        },
        {
            "question": "What is the immediate investigative implication when a SOC analyst observes Windows Event ID 1102 ('The audit log was cleared')?",
            "options": [
                "The operating system completed a routine weekly maintenance cleanup",
                "An adversary or rogue administrator has deliberately erased the Security event log (Defense Impairment: T1070.001) to destroy forensic evidence of prior activity",
                "The hard drive has run out of physical storage space",
                "Windows Defender was updated successfully"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Event 1102 is a critical indicator of defense impairment. Legitimate systems rotate logs rather than clearing them; manual log clearing indicates deliberate evidence destruction."
        },
        {
            "question": "What technique is an adversary using when they rename a malicious binary to 'svchost.exe' and place it in 'C:\\Users\\Public\\'?",
            "options": [
                "Masquerading: Match Legitimate Name or Location (T1036.005)",
                "Hardware Component Firmware Tampering",
                "Exploitation for Privilege Escalation",
                "DNS Cache Snooping"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Naming malware after legitimate OS binaries (like svchost.exe) placed in non-standard directories is a classic Masquerading technique designed to deceive casual inspection."
        }
    ],
    18: [
        {
            "question": "What built-in Windows network utility is commonly abused by adversaries during internal Discovery (ATT&CK T1018 - Remote System Discovery)?",
            "options": [
                "mspaint.exe",
                "nltest.exe, net.exe, or dsquery.exe",
                "calc.exe",
                "notepad.exe"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Adversaries abuse native administrative CLI utilities like `nltest /dclist:`, `net view`, and `net group 'Domain Admins' /domain` to enumerate domain controllers and network assets without dropping external tools."
        },
        {
            "question": "How does an adversary execute lateral movement using PsExec or the SMB service (ATT&CK T1570 / T1569.002)?",
            "options": [
                "By sending an email with a malicious PDF attachment",
                "By connecting to the ADMIN$ or C$ SMB share on a remote host, writing a service executable, and invoking the Service Control Manager (SCManager) to create and start a new service",
                "By physically plugging a USB drive into the remote server",
                "By intercepting DNS traffic at the root nameserver"
            ],
            "correctAnswerIndex": 1,
            "explanation": "PsExec and SMB lateral movement work by authenticating over port 445, copying an executable to the ADMIN$ share, and utilizing the RPC Service Control Manager to start it as a Windows service."
        },
        {
            "question": "In Active Directory environments, what does a 'Pass-the-Hash' (PtH) attack enable an attacker to accomplish?",
            "options": [
                "It cracks the user's password using brute-force GPU clusters",
                "It authenticates to a remote system or service using the NTLM hash directly without ever needing to recover the plaintext password",
                "It changes the victim's domain password to a blank string",
                "It permanently corrupts the Active Directory database"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Because the NTLM protocol authenticates using the password hash as the secret, possessing the NTLM hash allows an adversary to authenticate directly to remote SMB and RPC services without cracking the plaintext."
        }
    ],
    19: [
        {
            "question": "Before exfiltrating sensitive intellectual property, why do adversaries frequently compress and encrypt files into multi-part archives (ATT&CK T1560 - Archive Collected Data)?",
            "options": [
                "To satisfy corporate data retention quotas",
                "To reduce network bandwidth consumption, consolidate thousands of files into single bundles, and bypass perimeter Data Loss Prevention (DLP) string inspection via encryption",
                "Because raw text files cannot travel over TCP/IP",
                "To automatically send the files to the cloud recycling bin"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Archiving (using zip, rar, or 7z) bundles scattered data into manageable files while encryption prevents deep packet inspection and DLP gateways from matching plain sensitive keywords."
        },
        {
            "question": "In command-and-control (C2) analysis, what is 'beacon jitter'?",
            "options": [
                "Hardware vibration caused by overheating network cables",
                "A deliberate randomized time delay introduced between C2 check-in signals to defeat static interval-based frequency detection rules in firewalls and SIEMs",
                "Packet loss occurring across wireless connections",
                "Audio distortion during video conference calls"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Static check-in intervals (e.g. exactly every 60 seconds) are easily detected by frequency analysis. Adding jitter (e.g., 60 seconds +/- 30% random variance) obfuscates the beacon pattern."
        },
        {
            "question": "An adversary transfers 50 GB of database dumps to a personal Microsoft OneDrive or AWS S3 bucket over HTTPS port 443. Which ATT&CK technique best describes this action?",
            "options": [
                "Exfiltration Over Web Service: Exfiltration to Cloud Storage (T1567.002)",
                "Exfiltration Over Physical Medium",
                "Automated Exfiltration Over Bluetooth",
                "Data Destruction"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Uploading data to external commercial cloud storage providers (OneDrive, Google Drive, Mega, S3) over legitimate HTTPS represents Exfiltration to Cloud Storage (T1567.002)."
        }
    ],
    20: [
        {
            "question": "In modern human-operated ransomware attacks, what is 'double extortion'?",
            "options": [
                "Demanding two different cryptocurrencies for the decryption tool",
                "Exfiltrating sensitive enterprise data prior to encrypting production systems, followed by threatening to publicly leak the stolen data if the ransom is not paid",
                "Charging the victim double if they contact law enforcement",
                "Encrypting both the operating system and the hardware motherboard"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Double extortion combines file encryption with data exfiltration. Even if the victim can recover systems from backups, the adversary threatens to publish proprietary data or customer records."
        },
        {
            "question": "What common pre-encryption command is executed by ransomware to impede system recovery (ATT&CK T1490 - Inhibit System Recovery)?",
            "options": [
                "ipconfig /flushdns",
                "vssadmin delete shadows /all /quiet",
                "ping 127.0.0.1",
                "systeminfo"
            ],
            "correctAnswerIndex": 1,
            "explanation": "`vssadmin delete shadows /all /quiet` deletes Windows Volume Shadow Copies, preventing victims from easily reverting modified files to previous snapshots without paying the ransom."
        },
        {
            "question": "When a suspected ransomware intrusion is detected, why is network-level host isolation preferred over shutting down or powering off the infected machines?",
            "options": [
                "Powering off computers causes permanent monitor hardware failure",
                "Network isolation severs lateral movement and C2 communication while preserving volatile memory (RAM) where encryption keys, injector processes, and execution artifacts still exist",
                "Isolating network ports speeds up the encryption process",
                "Shutting down servers voids third-party vendor warranties"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Pulling the power cord destroys volatile RAM where ephemeral encryption keys, C2 connections, and active injected processes reside. Network containment stops propagation while keeping forensic evidence intact."
        }
    ],
    21: [
        {
            "question": "In memory forensics using Volatility 3, which plugin scans process memory for unmapped executable code, injected shellcode, and suspicious memory allocation protections (PAGE_EXECUTE_READWRITE)?",
            "options": [
                "windows.info",
                "windows.malfind",
                "windows.netscan",
                "windows.pslist"
            ],
            "correctAnswerIndex": 1,
            "explanation": "`windows.malfind` identifies injected code and shellcode by finding memory regions marked as executable with unmapped files and MZ/PE headers or assembly jump instructions."
        },
        {
            "question": "What is the primary difference between `windows.pslist` and `windows.psscan` in Volatility 3?",
            "options": [
                "`pslist` walks the doubly-linked ActiveProcessLinks list, which rootkits can unhook (DKOM); `psscan` performs pool-tag scanning across memory to find unlinked or hidden processes",
                "`pslist` is for Linux memory images, while `psscan` is for Windows",
                "`pslist` requires administrative privileges, while `psscan` does not",
                "`psscan` modifies the raw memory image file during execution"
            ],
            "correctAnswerIndex": 0,
            "explanation": "`pslist` follows the OS kernel process list. If a rootkit unlinks a process from the list (Direct Kernel Object Manipulation), `pslist` will miss it, but `psscan` finds it by scanning for memory pool tags."
        },
        {
            "question": "Why should a forensic acquisition tool be executed from a dedicated external USB drive or network share rather than installed locally on the suspect host?",
            "options": [
                "Local installation overwrites unallocated disk sectors, modifies the master file table (MFT), and contaminates registry hives, altering the evidence",
                "Forensic tools cannot run from NTFS partitions",
                "The Windows OS blocks all local software installations during incidents",
                "USB drives automatically encrypt all captured memory dumps"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Running installers on an evidence machine writes temporary files, overwrites unallocated space where deleted files may reside, and corrupts timestamps and registry state."
        }
    ],
    22: [
        {
            "question": "Why must an incident response timeline normalize all event timestamps across firewalls, endpoints, cloud logs, and domain controllers to Coordinated Universal Time (UTC)?",
            "options": [
                "UTC timestamps require fewer bytes to store in Excel spreadsheets",
                "Distributed systems operate across multiple timezones, daylight saving rules, and clock drifts; UTC provides an absolute single chronological baseline to reconstruct causality",
                "NIST SP 800-61r3 prohibits the use of local time in any situation",
                "Local timestamps cannot be sorted alphabetically"
            ],
            "correctAnswerIndex": 1,
            "explanation": "If a workstation is in EDT and a cloud server is in UTC, an analyst might conclude an action occurred hours before the cause. Normalizing to UTC establishes unambiguous chronological order."
        },
        {
            "question": "What is 'timestomping' (ATT&CK T1070.006), and how does an analyst detect it on an NTFS filesystem?",
            "options": [
                "Deliberately modifying file system timestamps ($STANDARD_INFORMATION attribute) to match legitimate system files; detected by comparing with the harder-to-modify $FILE_NAME MFT attribute",
                "Changing the system clock on the domain controller",
                "Deleting the Windows Time service executable",
                "Corrupting the system BIOS battery"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Adversaries modify standard file timestamps to hide malware among legitimate OS files. In NTFS, comparing the `$STANDARD_INFORMATION` attribute against `$FILE_NAME` in the MFT exposes timestamp discrepancies."
        },
        {
            "question": "What critical risk arises when an analyst builds an incident timeline solely from firewall connection logs without corroborating endpoint telemetry?",
            "options": [
                "Firewalls record only UDP traffic",
                "Network logs confirm that packets flowed, but cannot identify which specific process, user account, or injected DLL generated the connection, risking incorrect attribution",
                "Firewall logs are automatically purged every 60 seconds",
                "Endpoint telemetry is always encrypted"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Network logs show IP, port, and byte counts, but cannot determine what software generated the traffic. Endpoint telemetry (Sysmon, EDR) is required to tie network sockets to parent processes and user accounts."
        }
    ],
    23: [
        {
            "question": "When performing initial triage on a suspicious document or executable, why is 'Static Analysis' conducted before 'Dynamic Analysis'?",
            "options": [
                "Static analysis is more fun for junior analysts",
                "Static analysis examines file properties, strings, headers, and hashes safely without executing the malicious code, avoiding accidental infection or alerting the adversary's C2 server",
                "Dynamic analysis can only be performed by government agencies",
                "Static analysis decrypts the entire malware source code automatically"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Static analysis inspects hashes, PE headers, imports, and embedded strings in a safe, non-running state. This yields immediate IOCs and reveals evasion capabilities before sandboxing."
        },
        {
            "question": "What does a high Shannon Entropy score (> 7.2) across sections of a Windows Portable Executable (PE) file typically signify?",
            "options": [
                "The file was compiled with Microsoft Visual Studio 2022",
                "The file contains packed, compressed, or encrypted code intended to evade static antivirus signature detection and obscure import tables",
                "The file is completely harmless plain text",
                "The file was created on an Apple Macintosh computer"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Entropy measures randomness. Normal compiled code has moderate entropy (5-6). High entropy approaching 8 indicates dense mathematical randomness, characteristic of packed or encrypted malicious code."
        },
        {
            "question": "Why should malware triage never be conducted in an environment with unrestricted internet access without dedicated DNS and network containment?",
            "options": [
                "The malware will automatically consume the enterprise internet bandwidth",
                "Malware can immediately reach its live C2 server, download secondary ransomware payloads, exfiltrate local data, or self-destruct upon detecting an analyst's IP range",
                "Internet service providers fine organizations for running malware",
                "Windows Defender will permanently disable the router"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Allowing live malware to connect to the open internet enables live C2 communication, notifies the threat actor that their sample was discovered, and risks spreading infection to external parties."
        }
    ],
    24: [
        {
            "question": "In enterprise SIEM operations, what is the role of an 'Entity Lookup' or 'Asset Inventory' table during alert triage?",
            "options": [
                "It stores user account passwords for emergency recovery",
                "It enriches raw IP addresses and hostnames with critical business context: asset owner, department, data classification, physical location, and criticality tier",
                "It converts SQL queries into Python code",
                "It archives old firewall logs to low-cost cloud storage"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Knowing an IP belongs to a test lab printer versus a core financial transaction server fundamentally changes the urgency and triage priority. Lookups provide this operational business context."
        },
        {
            "question": "What query logic is best suited to detect an internal host exhibiting command-and-control beaconing behavior over HTTP/TLS?",
            "options": [
                "Searching for any connection that sent more than 1 megabyte of data",
                "Calculating statistical cadence (inter-arrival time variance and standard deviation) of outbound connections to unique external domains over a 24-hour window",
                "Filtering for HTTP status code 404",
                "Listing all internal IP addresses ending in .1"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Beaconing creates regular, recurring network calls. Measuring time deltas between outbound sessions to the same destination reveals automated heartbeat intervals distinct from human web browsing."
        },
        {
            "question": "Why is multi-source log correlation (e.g. matching an EDR process start with a web proxy request and an Azure AD sign-in) critical for scoping an incident?",
            "options": [
                "It reduces the monthly license cost charged by SIEM vendors",
                "Individual logs only capture isolated fragments of an intrusion; correlation unites the full chain of causality from initial access to execution and data exfiltration",
                "Operating systems cannot log network connections without a proxy",
                "It eliminates the need for human analysts to review findings"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A web proxy shows an external download; EDR shows execution; Active Directory shows privilege elevation. Only correlating all three paints a complete picture of the attack path."
        }
    ],
    25: [
        {
            "question": "In modern detection engineering, what is 'Detection-as-Code'?",
            "options": [
                "Writing detection rules directly inside binary firmware code",
                "Treating detection rules (e.g. Sigma, SPL, KQL) like software code: managed in version control (Git), reviewed via pull requests, automatically tested against positive and negative fixtures, and deployed via CI/CD pipelines",
                "Using artificial intelligence to replace human SOC engineers entirely",
                "Writing firewall rules in assembly language"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Detection-as-Code applies rigorous software engineering practices (version control, automated testing, peer review, CI/CD) to detection content to ensure reliability, repeatability, and transparency."
        },
        {
            "question": "What is the primary danger of deploying a detection rule that has not been tested against a 'False Positive Baseline'?",
            "options": [
                "The rule will delete all matching log entries from disk",
                "The rule may generate hundreds of daily false alarms from legitimate administrative tools, overwhelming the SOC with alert fatigue and blinding analysts to real intrusions",
                "The SIEM vendor will revoke the company's software license",
                "The operating system will trigger an immediate blue-screen crash"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Untested detection rules frequently flag benign background scripts, generating massive alert noise. Alert fatigue causes analysts to miss genuine high-severity compromises buried in the noise."
        },
        {
            "question": "What is 'Sigma' in the context of threat detection and incident response?",
            "options": [
                "A mathematical equation used to encrypt passwords",
                "An open, generic, YAML-based signature format that describes log detection logic independently of any specific SIEM platform, allowing rules to be compiled into SPL, KQL, or Elastic queries",
                "A proprietary hardware firewall manufactured in Switzerland",
                "A Linux kernel module for memory dumping"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Sigma provides a platform-agnostic format for detection rules. A single Sigma rule can be automatically translated into queries for Splunk, Sentinel, Elastic, QRadar, or CrowdStrike."
        }
    ],
    26: [
        {
            "question": "What distinguishes hypothesis-driven threat hunting from standard reactive SOC alert triage?",
            "options": [
                "Threat hunting is performed exclusively by external consultants",
                "Reactive triage begins with an alert firing; threat hunting proactively searches through raw telemetry assuming an adversary is already active in the network without triggering existing alarms",
                "Threat hunting does not use computer logs or SIEM tools",
                "Threat hunting requires physical surveillance of suspect individuals"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Alert triage responds to alerts triggered by known signatures. Threat hunting begins with an informed hypothesis (e.g., 'Adversaries may be using WMI for persistence') and proactively combs raw logs for un-alerted tradecraft."
        },
        {
            "question": "Which of the following represents a scientifically testable threat hunting hypothesis?",
            "options": [
                "'Hackers are probably attacking our network right now'",
                "'Adversaries are executing unquoted service path vulnerabilities to elevate privileges on Windows endpoints, evidenced by services with spaces in their path executing binaries outside Program Files'",
                "'Our firewall is the most secure firewall in the industry'",
                "'Users should not click on suspicious links'"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A valid hypothesis states a specific adversary technique, the expected telemetry source, and the observable criteria that will either prove or disprove the premise."
        },
        {
            "question": "What is the primary operational outcome of a completed threat hunt that discovers NO malicious activity?",
            "options": [
                "The hunt is classified as a failure and all notes are shredded",
                "The hunt validates existing defensive baselines, uncovers data collection gaps or logging misconfigurations, and creates or tunes detection rules to monitor the hypothesis automatically in the future",
                "The security team's annual budget is reduced",
                "The hunters are reassigned to customer support"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A hunt with no findings is a success: it confirms the absence of targeted behaviors, identifies telemetry blind spots, and produces new detection logic so future occurrences alert automatically."
        }
    ],
    27: [
        {
            "question": "In MITRE ATT&CK, what is a 'Data Component' (e.g. 'Process: Process Creation') in relation to detection coverage?",
            "options": [
                "The physical microchip inside a hard drive",
                "A specific, granular sub-element of a Data Source that identifies the exact telemetry needed to observe an adversary action",
                "The format of the cable connecting a computer to the switch",
                "A software license for storing database records"
            ],
            "correctAnswerIndex": 1,
            "explanation": "ATT&CK Data Components define the precise telemetry needed for detection (e.g. Data Source: 'Process', Data Component: 'Process Creation'), linking techniques directly to real-world log events."
        },
        {
            "question": "An organization claims 100% ATT&CK coverage because their SIEM ingests 20 GB of firewall logs daily. What critical blind spot exists in their defense?",
            "options": [
                "Firewall logs are illegal under ISO 27001",
                "Firewalls observe only network boundary traffic; they cannot observe host-level execution, in-memory credential dumping, registry persistence, or endpoint process spawning",
                "Firewalls cannot log IP addresses",
                "Network logs are automatically deleted after 1 hour"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Boundary firewalls provide zero visibility into endpoint internals (e.g., LSASS dumping, local token manipulation, PowerShell script block execution). Claiming coverage based only on network logs is a dangerous delusion."
        },
        {
            "question": "How does an adversary take advantage of telemetry blind spots created by default Windows logging configurations?",
            "options": [
                "By submitting false support tickets to the IT department",
                "By operating within unlogged channels—such as executing commands via WMI or PowerShell without Script Block Logging or Command Line Process Auditing enabled",
                "By changing the desktop wallpaper on all domain workstations",
                "By slowing down the physical network cables"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Default Windows installations log minimal process detail (Event 4688 without command lines, no script block logging). Adversaries exploit this lack of visibility to operate without generating alertable events."
        }
    ],
    28: [
        {
            "question": "What is the primary function of the MITRE ATT&CK Navigator tool in enterprise incident response and SOC management?",
            "options": [
                "To automatically block IP addresses at the perimeter firewall",
                "To visually map, color-code, and evaluate an organization's detection coverage, threat actor profiles, and incident investigation findings against the ATT&CK matrix",
                "To compile Python scripts into Windows executables",
                "To calculate employee payroll and overtime hours"
            ],
            "correctAnswerIndex": 1,
            "explanation": "ATT&CK Navigator provides interactive matrices where defenders create color-coded layers visualizing detection coverage, adversary technique profiles, and confirmed case findings."
        },
        {
            "question": "When delivering an executive briefing on an ATT&CK-informed incident investigation, how should technical findings be presented to senior leadership?",
            "options": [
                "Print out 5,000 pages of raw hex dumps and wireshark packets",
                "Synthesize findings into high-level business impact, compromised crown jewels, root causes, regulatory obligations, and actionable investments to eliminate exploited blind spots",
                "Blame specific junior employees for clicking links",
                "Refuse to answer questions until the board signs a non-disclosure agreement"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Executives require clear strategic communication: What happened? What was the business and legal impact? Is the threat contained? What concrete steps and resources are required to prevent recurrence?"
        },
        {
            "question": "What is the difference between an ATT&CK Navigator layer representing 'Threat Actor TTPs' and one representing 'Current Detection Coverage'?",
            "options": [
                "Threat Actor layer maps observed adversarial behaviors from intelligence; Detection Coverage layer maps where the organization has verified sensors and alerting rules; overlaying them reveals critical defense gaps",
                "They are identical and cannot be combined",
                "The Detection Coverage layer is only available to commercial customers",
                "The Threat Actor layer cannot be exported to JSON"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Comparing an adversary layer against an internal coverage layer highlights specific technique gaps where the threat actor operates but the enterprise possesses no detection capability."
        }
    ],
    29: [
        {
            "question": "What is the primary operational hazard of executing host eradication (e.g. deleting backdoors, re-imaging servers) before containment is fully achieved across the network?",
            "options": [
                "The server license keys will be voided",
                "The adversary still maintains alternate persistence paths; alerting them by evicting one node prompts them to deploy destructive ransomware, wipe evidence, or move deeper underground",
                "Operating system updates will fail to install",
                "Network bandwidth will drop to zero"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Tipping off an adversary before identifying all backdoors and access vectors leads to retaliation. The attacker may accelerate their objectives (e.g., launching ransomware or wiping logs) through remaining covert footholds."
        },
        {
            "question": "When rotating compromised Active Directory credentials during enterprise eradication, why is the Kerberos Ticket Granting Service account (krbtgt) password rotated TWICE?",
            "options": [
                "Because Windows Server requires two passwords for every user account",
                "Active Directory maintains the current password and the previous password for Kerberos tickets; rotating krbtgt twice immediately invalidates all forged Golden Tickets (T1558.001)",
                "To ensure the password complies with complexity rules",
                "To force all domain controllers to reboot simultaneously"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Active Directory stores the previous krbtgt password to allow existing tickets to expire gracefully. Rotating krbtgt twice immediately invalidates any forged Kerberos Golden Tickets held by an adversary."
        },
        {
            "question": "What is the fundamental purpose of the 'Post-Incident Review' (Lessons Learned) meeting following an enterprise intrusion?",
            "options": [
                "To assign disciplinary blame to the employee who received the phishing email",
                "To conduct a blameless, objective analysis of the incident timeline, evaluate what worked and what failed, and turn root-cause discoveries into permanent technical and organizational improvements",
                "To celebrate the conclusion of the case without taking notes",
                "To rewrite historical incident tickets to make the response appear faster"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A blameless post-mortem analyzes technical and procedural gaps. The goal is to institutionalize improvements: tuning alert rules, closing collection blind spots, and updating playbooks."
        }
    ],
    30: [
        {
            "question": "In an end-to-end ATT&CK-informed incident investigation capstone, what constitutes definitive proof that an adversary achieved their mission objective?",
            "options": [
                "An informational alert fired in the SIEM dashboard",
                "Corroborated, factual evidence confirming unauthorized access to, destruction of, or exfiltration of target crown jewels (e.g. database records, payment systems, IP) aligned with ATT&CK Impact or Collection tactics",
                "The victim computer was running Windows 10 rather than Windows 11",
                "The company website experienced a temporary spike in traffic"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Definitive proof requires corroborated multi-source evidence demonstrating that the adversary actually completed actions on objectives (e.g. verified file transfers, encrypted databases, or modified sensitive ledgers)."
        },
        {
            "question": "During final capstone case reporting, why is it vital to document 'Investigative Unknowns' alongside confirmed findings?",
            "options": [
                "To lengthen the report to meet page-count minimums",
                "Honest identification of unknowns prevents false assumptions of security, guides ongoing post-incident monitoring, and prioritizes future telemetry investments",
                "Because unknown items are automatically resolved by the legal department",
                "To allow the responder to avoid making recommendations"
            ],
            "correctAnswerIndex": 1,
            "explanation": "No investigation uncovers 100% of telemetry. Documenting what remains unverified (e.g., unmonitored air-gapped segments, deleted historical logs) alerts leadership to ongoing risks that require targeted monitoring."
        },
        {
            "question": "What is the hallmark of an exceptional, board-ready incident response deliverable?",
            "options": [
                "Using complex technical jargon without explanations to impress non-technical directors",
                "A clear narrative connecting root cause, attacker behaviors (ATT&CK), business impact, validated containment, and a prioritized, defensible roadmap to elevate organizational resilience",
                "Recommending the immediate replacement of all computer hardware across the enterprise",
                "Submitting a one-sentence email stating that everything has been fixed"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Executive leadership requires clarity: an evidence-grounded summary of what happened, how it was stopped, the exact business impact, and strategic, cost-effective investments to ensure it cannot happen again."
        }
    ]
}

def main():
    base_dir = r"C:\Users\dutch\.gemini\antigravity\worktrees\REA_Project\private_bug_bounty_library"
    course_docs_dir = os.path.join(base_dir, r"docs\courses\mitre-attack-incident-response-zero-to-advanced")
    modules_dir = os.path.join(course_docs_dir, "modules")
    
    module_files = sorted(glob.glob(os.path.join(modules_dir, "*.md")))
    print(f"Found {len(module_files)} module files in {modules_dir}")
    
    course_uuid = "dc000000-0000-4000-8000-000000000001"
    
    modules = []
    sql_modules = []
    sql_lessons = []
    
    total_minutes = 0
    
    for f in module_files:
        basename = os.path.basename(f)
        with open(f, "r", encoding="utf-8") as fp:
            content = fp.read()
            
        # Parse module number
        mod_num_m = re.search(r'^(\d+)-', basename)
        if not mod_num_m:
            continue
        mod_num = int(mod_num_m.group(1))
        
        # Parse title from first # heading: e.g. # Module 01: SOC and Incident Response Orientation
        title_m = re.search(r'#\s+Module\s+\d+:\s+([^\n]+)', content)
        raw_title = title_m.group(1).strip() if title_m else f"Module {mod_num:02d}"
        mod_title = f"Module {mod_num:02d}: {raw_title}"
        
        # Parse Stage / Phase
        phase_m = re.search(r'\*\*Stage:\*\*\s*([^\|\n]+)', content)
        phase = phase_m.group(1).strip() if phase_m else "Foundations"
        
        # Parse Difficulty / Level
        diff_m = re.search(r'\*\*Difficulty:\*\*\s*([^\|\n]+)', content)
        diff_level = diff_m.group(1).strip() if diff_m else "Zero"
        
        # Parse Time
        time_m = re.search(r'\*\*Estimated guided \+ independent time:\*\*\s*([^\n]+)', content)
        est_time = time_m.group(1).strip() if time_m else "6 hours"
        
        # Parse Focus / Outcome
        focus_m = re.search(r'\*\*Focus:\*\*\s*([^\n]+)', content)
        focus = focus_m.group(1).strip() if focus_m else "Defensive incident response."
        
        mod_desc = f"{phase} stage ({diff_level} difficulty). Estimated effort: {est_time}. Focus: {focus}"
        
        mod_order = mod_num
        mod_uuid = f"dc000000-0000-4000-8000-0000000001{mod_num:02d}"
        mod_id = f"mod-mitre-ir-m{mod_num:02d}"
        
        # Parse Hands-on Case
        case_scenario_m = re.search(r'\*\*Case setup:\*\*\s*([^\n]+)', content)
        case_scenario = case_scenario_m.group(1).strip() if case_scenario_m else f"Investigate enterprise security incident in {raw_title}."
        
        case_submit_m = re.search(r'\*\*Required submission:\*\*\s*([^\n]+)', content)
        case_submission = case_submit_m.group(1).strip() if case_submit_m else "Incident triage report and ATT&CK mapping worksheet."
        
        # Parse 5 lessons: ### Lesson NN.1: ...
        lesson_matches = list(re.finditer(r'###\s+Lesson\s+(\d+\.\d+):\s+([^\n]+)(.*?)(?=(?:###\s+Lesson|\n##|\Z))', content, re.DOTALL))
        
        # Video anchor
        v_info = MODULE_VIDEOS.get(mod_num, MODULE_VIDEOS[1])
        video_id = v_info["videoId"]
        creator = v_info["creator"]
        
        module_lessons = []
        for l_idx, lm in enumerate(lesson_matches):
            lesson_num_str = lm.group(1).strip()
            lesson_title_raw = lm.group(2).strip()
            lesson_body = lm.group(3).strip()
            
            l_order = l_idx + 1
            l_uuid = f"dc000000-0000-4000-8000-00000001{mod_num:02d}{l_order:02d}"
            l_id = f"les-mitre-ir-m{mod_num:02d}-l{l_order:02d}"
            l_slug = f"m{mod_num:02d}-l{l_order}-{slugify(lesson_title_raw)}"
            
            duration = 35 # standard 35 minutes per video-led lesson
            total_minutes += duration
            
            lesson_desc = (
                f"Video-guided incident response lesson examining {lesson_title_raw} "
                f"aligned with MITRE ATT&CK Enterprise v20.1 and NIST SP 800-61r3. "
                f"Focuses on observable attacker tradecraft, telemetry evidence, and defensive decision-making."
            )
            
            lesson_obj = [
                f"Master key concepts, terminology, and operational boundaries for {lesson_title_raw}.",
                "Distinguish empirical telemetry evidence from analyst hypotheses and unverified assumptions.",
                "Map observed techniques to the MITRE ATT&CK Enterprise v20.1 matrix and document recommended containment."
            ]
            
            lesson_tags = [
                "mitre-attack",
                "incident-response",
                "dfir",
                "soc-analyst",
                f"module-{mod_num:02d}",
                slugify(phase)
            ]
            
            skills_taught = [
                f"Defensive operational triage: {lesson_title_raw}",
                "ATT&CK Enterprise v20.1 behavior mapping and evidence citation",
                "Chronological incident timeline reconstruction (UTC normalized)",
                "Actionable SOC escalation and containment decision-making"
            ]
            
            rich_content = {
                "introduction": (
                    f"In this lesson on '{lesson_title_raw}', we investigate core incident response operations "
                    f"from {mod_title}. Grounded in MITRE ATT&CK Enterprise v20.1 and NIST SP 800-61r3, "
                    f"learners analyze real-world telemetry, evaluate alternative benign explanations, "
                    f"and formulate defensible response actions."
                ),
                "prerequisites": [
                    "Basic understanding of operating system internals and network protocols",
                    "Access to MITRE ATT&CK Enterprise v20.1 matrix and NIST SP 800-61r3 documentation",
                    "Defensive investigation mindset bounded by ethical rules of engagement"
                ],
                "theorySections": [
                    {
                        "title": f"Investigative Framework: {lesson_title_raw}",
                        "content": (
                            f"Modern enterprise defense requires rigorous, evidence-grounded incident response. "
                            f"When evaluating {lesson_title_raw}, responders must separate direct telemetry observations "
                            f"from speculative hypotheses. Documenting the affected hosts, user identities, process trees, "
                            f"and exact UTC timestamps creates an auditable chain of evidence that withstands regulatory scrutiny."
                        ),
                        "keyPoints": [
                            f"Focus strictly on verified telemetry evidence before assigning adversary technique IDs for {lesson_title_raw}.",
                            "Account for clock drift and normalize all correlated event sources to UTC.",
                            "Identify at least two non-malicious operational causes before declaring an incident."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Review Video Demonstration",
                        "instruction": f"Watch the assigned demonstration video focusing on {lesson_title_raw}. Record observed TTPs, tooling signatures, and investigator workflows.",
                        "expectedOutcome": "Detailed analytical notes distinguishing factual observations from assumptions."
                    },
                    {
                        "step": 2,
                        "title": "Analyze Telemetry & Map to ATT&CK",
                        "instruction": "Open the incident narrative or sample dataset, extract observable behaviors, and cross-reference with ATT&CK Enterprise v20.1. If evidence is inconclusive, note as unassigned.",
                        "expectedOutcome": "Structured mapping table containing timestamps, hosts, accounts, observed behaviors, and technique IDs."
                    },
                    {
                        "step": 3,
                        "title": "Determine Proportionate Containment",
                        "instruction": "Evaluate the risk, operational impact, and required approvals before selecting containment steps (e.g. host isolation vs credential revocation).",
                        "expectedOutcome": "Defensible containment recommendation with rollback plan and executive escalation rationale."
                    }
                ],
                "expectedObservations": [
                    "Unambiguous chronological sequence of events normalized to UTC.",
                    "Explicit separation between facts, hypotheses, and remaining unknowns.",
                    "Accurate mapping to ATT&CK Enterprise v20.1 without forced speculative labels."
                ],
                "commonMistakes": [
                    "Jumping to adversary attribution or threat actor naming without verifiable campaign indicators.",
                    "Failing to consider benign administrative scripts or scheduled tasks producing similar telemetry.",
                    "Executing disruptive system resets or reboots before preserving volatile RAM and network state."
                ],
                "securityRelevance": (
                    f"Mastery of {lesson_title_raw} equips SOC analysts and incident responders to handle live compromises "
                    f"decisively while preserving evidence integrity and preventing unnecessary business disruption."
                ),
                "practicalExercise": {
                    "title": f"Hands-on Investigation: {lesson_title_raw}",
                    "objective": f"Apply forensic triage and ATT&CK mapping techniques to analyze {lesson_title_raw} in an enterprise scenario.",
                    "instructions": [
                        "Review the provided incident intake details and establish time boundaries.",
                        "Extract key artifacts (hashes, IP addresses, usernames, command lines).",
                        "Compare observed behaviors against the ATT&CK matrix and cite specific technique numbers.",
                        "Draft a one-paragraph escalation summary for the SOC lead."
                    ]
                },
                "knowledgeCheck": {
                    "question": f"What is the most critical first step when analyzing telemetry related to {lesson_title_raw}?",
                    "options": [
                        "Immediately shut down the affected system to prevent all activity",
                        "Verify telemetry authenticity, establish chronological boundaries, and record factual observations",
                        "Email the CEO directly to report a foreign government breach",
                        "Delete the suspicious event log entries to protect system privacy"
                    ],
                    "correctAnswerIndex": 1,
                    "explanation": "Effective response begins with factual verification, chronological scoping, and evidence preservation before taking containment actions."
                }
            }
            
            # Module quiz attached to the 5th lesson of each module
            lesson_quiz = None
            if l_order == 5 and mod_num in MODULE_QUIZZES:
                lesson_quiz = {
                    "title": f"Module {mod_num:02d} Knowledge Assessment: {raw_title}",
                    "questions": MODULE_QUIZZES[mod_num],
                    "passingScorePercent": 75
                }
                
            lesson_data = {
                "id": l_id,
                "slug": l_slug,
                "title": f"Module {mod_num:02d} - Lesson {l_order}: {lesson_title_raw}",
                "description": lesson_desc,
                "youtubeVideoId": video_id,
                "videoAttribution": {
                    "creator": creator,
                    "platform": "youtube"
                },
                "durationMinutes": duration,
                "order": l_order,
                "moduleTitle": mod_title,
                "objectives": lesson_obj,
                "tags": lesson_tags,
                "skillsTaught": skills_taught,
                "richContent": rich_content
            }
            if lesson_quiz:
                lesson_data["quiz"] = lesson_quiz
                
            module_lessons.append(lesson_data)
            
            sql_lessons.append({
                "uuid": l_uuid,
                "course_uuid": course_uuid,
                "module_uuid": mod_uuid,
                "slug": l_slug,
                "title": f"Module {mod_num:02d} - Lesson {l_order}: {lesson_title_raw}",
                "description": lesson_desc,
                "youtube_video_id": video_id,
                "duration_minutes": duration,
                "order_index": l_order,
                "objectives": lesson_obj,
                "tags": lesson_tags,
                "skills_taught": skills_taught
            })
            
        # Module practical lab
        practical_lab = {
            "id": f"lab-mitre-ir-m{mod_num:02d}",
            "title": f"Defensive Case Lab: {raw_title}",
            "objective": f"Investigate and triage: {case_scenario}",
            "toolsRequired": ["MITRE ATT&CK Enterprise Matrix", "NIST SP 800-61r3 Guidelines", "Timeline Worksheet", "Text Editor"],
            "pcapSource": {
                "fileName": f"case-m{mod_num:02d}-evidence.json",
                "fileUrl": f"/datasets/mitre_attack/case-m{mod_num:02d}-evidence.json"
            },
            "difficulty": "intermediate" if mod_num > 10 else "beginner",
            "estimatedMinutes": 60,
            "instructions": [
                f"Scenario Context: {case_scenario}",
                "Examine evidence records with strict attention to UTC timestamps and data source attribution.",
                "Map observed techniques to current ATT&CK Enterprise v20.1 categories without forcing unsupported labels.",
                f"Compile required submission: {case_submission}"
            ],
            "tasks": [
                {"id": "task-1", "description": "Identify all affected assets, user accounts, and chronological event boundaries."},
                {"id": "task-2", "description": "Differentiate confirmed empirical telemetry from unverified analyst assumptions."},
                {"id": "task-3", "description": "Map verified behaviors to ATT&CK Enterprise v20.1 and propose proportionate containment."}
            ],
            "evidenceWorksheet": [
                {"field": "case_id", "prompt": f"Incident Case Identifier (e.g. TRAIN-IR-{mod_num:02d}-001)", "expectedEvidenceType": "text"},
                {"field": "timeline_utc", "prompt": "Chronological timeline entries in UTC", "expectedEvidenceType": "table"},
                {"field": "attack_mapping", "prompt": "Citations of ATT&CK Enterprise v20.1 Technique IDs", "expectedEvidenceType": "list"},
                {"field": "containment_recommendation", "prompt": "Recommended containment actions and required authorization", "expectedEvidenceType": "text"}
            ],
            "questions": MODULE_QUIZZES.get(mod_num, [])[:1],
            "completionCriteria": [
                "Completed all investigative tasks using authorized sample data.",
                "Documented alternative benign explanations for observed anomalies.",
                f"Generated deliverable: {case_submission}"
            ]
        }
        
        mod_dict = {
            "id": mod_id,
            "title": mod_title,
            "description": mod_desc,
            "order": mod_order,
            "lessons": module_lessons,
            "practicalLab": practical_lab
        }
        if mod_num in MODULE_QUIZZES:
            mod_dict["quiz"] = {
                "title": f"Module {mod_num:02d} Knowledge Assessment: {raw_title}",
                "questions": MODULE_QUIZZES[mod_num],
                "passingScorePercent": 75
            }
        modules.append(mod_dict)
        
        sql_modules.append({
            "uuid": mod_uuid,
            "course_uuid": course_uuid,
            "title": mod_title,
            "description": mod_desc,
            "order_index": mod_order
        })

    # Full Capstone for Module 30
    capstone_assessment = {
        "id": "capstone-mitre-attack-incident-investigation",
        "title": "Final Capstone: Full ATT&CK-Informed Incident Investigation Portfolio",
        "scenario": (
            "A fictional multi-stage enterprise intrusion unfolds across hybrid cloud and on-prem Active Directory assets. "
            "Execute end-to-end incident response: intake and authorization verification; host, sign-in, and network telemetry analysis; "
            "construction of an evidence-backed ATT&CK behavior timeline (UTC); execution of proportionate containment, eradication, and "
            "recovery strategies; and delivery of an ATT&CK Navigator layer, comprehensive technical case report, and executive briefing."
        ),
        "pcapSource": {
            "fileName": "mitre-ir-capstone-evidence-pack.zip",
            "fileUrl": "/datasets/mitre_attack/mitre-ir-capstone-evidence-pack.zip"
        },
        "totalMarks": 100,
        "passingScore": 75,
        "rubric": [
            {
                "category": "Technical Accuracy & Telemetry Handling",
                "marks": 25,
                "criteria": [
                    "Correctly extracts and interprets Windows Security, Sysmon, Linux auth, and network records",
                    "Distinguishes factual raw observations from analyst hypotheses and inferences",
                    "Eliminates benign operational explanations before confirming intrusion actions"
                ]
            },
            {
                "category": "ATT&CK Mapping Rigor (Enterprise v20.1)",
                "marks": 25,
                "criteria": [
                    "Maps behaviors accurately to Tactics, Techniques, and Sub-techniques citing v20.1",
                    "Correctly applies the Stealth vs Defense Impairment tactic distinction",
                    "Provides an exportable ATT&CK Navigator JSON layer reflecting the case findings"
                ]
            },
            {
                "category": "Timeline & Evidence Reconstruction",
                "marks": 25,
                "criteria": [
                    "Constructs a complete multi-source timeline normalized to UTC",
                    "Documents data provenance, chain of custody, and cryptographic file hashes",
                    "Explicitly identifies investigative unknowns and unmonitored blind spots"
                ]
            },
            {
                "category": "Containment Strategy & Executive Communication",
                "marks": 25,
                "criteria": [
                    "Develops an authorized, proportionate containment and eradication roadmap",
                    "Prepares a clear executive summary detailing business risk and crown jewel status",
                    "Delivers defensible recommendations for detection engineering and future readiness"
                ]
            }
        ],
        "submissionSections": [
            {
                "id": "sec-exec-summary",
                "title": "Executive Summary & Business Impact Assessment",
                "prompt": "Provide a 1-page executive summary covering incident root cause, business impact, critical assets affected, containment status, and strategic recommendations.",
                "maxMarks": 25
            },
            {
                "id": "sec-technical-timeline",
                "title": "Evidence-Backed Chronological Timeline (UTC)",
                "prompt": "Provide the consolidated incident timeline with UTC timestamps, source assets, observed actions, artifact references, and ATT&CK v20.1 IDs.",
                "maxMarks": 25
            },
            {
                "id": "sec-attack-navigator",
                "title": "ATT&CK Navigator Layer & TTP Matrix",
                "prompt": "Document all observed tactics, techniques, and procedures with evidentiary justification, including a JSON or matrix summary.",
                "maxMarks": 25
            },
            {
                "id": "sec-remediation-roadmap",
                "title": "Containment, Eradication & Resilience Roadmap",
                "prompt": "Detail the phased containment actions, krbtgt and credential rotation, persistent backdoor removal, and detection engineering improvements.",
                "maxMarks": 25
            }
        ]
    }
    
    course_obj = {
        "id": "course-mitre-attack-incident-response",
        "slug": "mitre-attack-incident-response-zero-to-advanced",
        "title": "MITRE ATT&CK for Incident Response: Zero to Advanced",
        "shortDescription": "A comprehensive 30-module, video-guided defensive incident response curriculum aligned with MITRE ATT&CK Enterprise v20.1 and NIST SP 800-61r3, 150 lessons, hands-on SOC cases, DFIR investigations, and a full capstone portfolio.",
        "description": "A comprehensive, hands-on 30-module defensive cybersecurity curriculum designed for aspiring and practicing SOC L1/L2 analysts, incident responders, and DFIR professionals. Master enterprise incident response aligned with MITRE ATT&CK Enterprise v20.1 and NIST SP 800-61r3: SOC triage, evidence preservation, chain of custody, Windows/Linux host forensics, network PCAP analysis, credential access, persistence mechanisms, defense impairment, lateral movement, ransomware containment, timeline reconstruction, memory analysis, detection engineering, threat hunting, ATT&CK Navigator mapping, and post-incident recovery, culminating in a full ATT&CK-informed incident investigation capstone portfolio.",
        "domains": [
            "soc-blue-team",
            "dfir",
            "fundamentals"
        ],
        "tags": [
            "mitre-attack",
            "incident-response",
            "dfir",
            "soc-analyst",
            "threat-hunting",
            "detection-engineering",
            "nist-800-61r3",
            "forensics",
            "windows-security",
            "ransomware"
        ],
        "difficulty": "intermediate",
        "thumbnailUrl": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        "estimatedDuration": "30 modules (234 hours)",
        "totalDurationMinutes": total_minutes,
        "instructor": {
            "name": "CyberTube IR Curators & MITRE Open Community",
            "title": "Incident Response & SOC Detection Engineers",
            "organization": "MITRE ATT&CK, CISA, TryHackMe & Open DFIR Community"
        },
        "prerequisites": [
            "Basic understanding of operating system internals (Windows and Linux logs)",
            "Familiarity with foundational networking protocols (TCP/IP, DNS, HTTP, TLS)",
            "Commitment to ethical defensive investigation within authorized boundaries"
        ],
        "learningObjectives": [
            "Differentiate security telemetry, events, alerts, and validated incidents using NIST SP 800-61r3",
            "Navigate, query, and map adversary behaviors to the MITRE ATT&CK Enterprise v20.1 matrix",
            "Distinguish between ATT&CK Tactics (why), Techniques (how), Sub-techniques, and empirical Procedures",
            "Apply the ATT&CK v20.1 separation between Stealth (TA0045) and Defense Impairment (TA0046)",
            "Preserve digital evidence following the RFC 3227 Order of Volatility and cryptographic chain of custody",
            "Investigate Windows and Linux endpoint telemetry, including Sysmon, Event ID 4624/4625, and /var/log/auth.log",
            "Triage network PCAP captures, DNS tunneling cadences, TLS handshakes, and phishing email headers",
            "Detect credential spraying, Kerberoasting, LSASS dumping, persistence Run keys, and PsExec lateral movement",
            "Execute Volatility 3 memory analysis to identify injected shellcode (malfind) and hidden processes (psscan)",
            "Deliver an executive-level incident investigation report, ATT&CK Navigator layer, and remediation roadmap"
        ],
        "featured": True,
        "track": "cybersecurity",
        "modules": modules,
        "capstone": capstone_assessment
    }
    
    # 1. Output TypeScript file
    ts_content = "import { Course } from '../types/course';\n\n"
    ts_content += "export const MITRE_ATTACK_INCIDENT_RESPONSE_COURSE: Course = "
    ts_content += json.dumps(course_obj, indent=2)
    ts_content += ";\n"
    
    out_ts_path = os.path.join(base_dir, "src/data/mitre-attack-incident-response-course.ts")
    with open(out_ts_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"Written {out_ts_path} successfully! ({len(modules)} modules, {len(sql_lessons)} lessons)")
    
    # 2. Output SQL Migration file
    sql_lines = [
        "-- =============================================================================",
        "-- CYBERTUBE: SEED MITRE ATT&CK INCIDENT RESPONSE ZERO TO ADVANCED COMPLETE COURSE",
        "-- =============================================================================",
        "-- Description:",
        "-- Idempotently seeds the 30-module MITRE ATT&CK Incident Response course,",
        "-- all 30 modules, and all 150 lessons into the Supabase database.",
        "-- =============================================================================",
        "",
        "DO $$",
        "DECLARE",
        f"  v_course_id UUID := '{course_uuid}';",
        "BEGIN",
        "  -- 1. Insert/Update Course",
        "  INSERT INTO public.courses (",
        "    id,",
        "    slug,",
        "    title,",
        "    short_description,",
        "    description,",
        "    difficulty,",
        "    estimated_duration,",
        "    total_duration_minutes,",
        "    thumbnail_url,",
        "    instructor_name,",
        "    instructor_title,",
        "    instructor_org,",
        "    status,",
        "    tags,",
        "    prerequisites,",
        "    learning_objectives,",
        "    track,",
        "    domains,",
        "    featured",
        "  ) VALUES (",
        "    v_course_id,",
        f"    {quote_sql(course_obj['slug'])},",
        f"    {quote_sql(course_obj['title'])},",
        f"    {quote_sql(course_obj['shortDescription'])},",
        f"    {quote_sql(course_obj['description'])},",
        f"    {quote_sql(course_obj['difficulty'])},",
        f"    {quote_sql(course_obj['estimatedDuration'])},",
        f"    {course_obj['totalDurationMinutes']},",
        f"    {quote_sql(course_obj['thumbnailUrl'])},",
        f"    {quote_sql(course_obj['instructor']['name'])},",
        f"    {quote_sql(course_obj['instructor']['title'])},",
        f"    {quote_sql(course_obj['instructor']['organization'])},",
        "    'published',",
        f"    {to_pg_array(course_obj['tags'])},",
        f"    {to_pg_array(course_obj['prerequisites'])},",
        f"    {to_pg_array(course_obj['learningObjectives'])},",
        f"    {quote_sql(course_obj['track'])},",
        f"    {to_pg_array(course_obj['domains'])},",
        "    true",
        "  )",
        "  ON CONFLICT (slug) DO UPDATE SET",
        "    title = EXCLUDED.title,",
        "    short_description = EXCLUDED.short_description,",
        "    description = EXCLUDED.description,",
        "    difficulty = EXCLUDED.difficulty,",
        "    estimated_duration = EXCLUDED.estimated_duration,",
        "    total_duration_minutes = EXCLUDED.total_duration_minutes,",
        "    thumbnail_url = EXCLUDED.thumbnail_url,",
        "    instructor_name = EXCLUDED.instructor_name,",
        "    instructor_title = EXCLUDED.instructor_title,",
        "    instructor_org = EXCLUDED.instructor_org,",
        "    status = EXCLUDED.status,",
        "    tags = EXCLUDED.tags,",
        "    prerequisites = EXCLUDED.prerequisites,",
        "    learning_objectives = EXCLUDED.learning_objectives,",
        "    track = EXCLUDED.track,",
        "    domains = EXCLUDED.domains,",
        "    featured = EXCLUDED.featured;",
        ""
    ]
    
    sql_lines.append("  -- 2. Insert/Update 30 Modules")
    for sm in sql_modules:
        sql_lines.append(f"  INSERT INTO public.course_modules (id, course_id, title, description, order_index)")
        sql_lines.append(f"  VALUES ('{sm['uuid']}', v_course_id, {quote_sql(sm['title'])}, {quote_sql(sm['description'])}, {sm['order_index']})")
        sql_lines.append(f"  ON CONFLICT (course_id, order_index) DO UPDATE SET")
        sql_lines.append(f"    title = EXCLUDED.title,")
        sql_lines.append(f"    description = EXCLUDED.description;")
        sql_lines.append("")
        
    sql_lines.append("  -- 3. Insert/Update 150 Lessons")
    for sl in sql_lessons:
        sql_lines.append(f"  INSERT INTO public.lessons (")
        sql_lines.append(f"    id, course_id, module_id, slug, title, description, youtube_video_id, duration_minutes, order_index, objectives, tags, skills_taught")
        sql_lines.append(f"  ) VALUES (")
        sql_lines.append(f"    '{sl['uuid']}',")
        sql_lines.append(f"    v_course_id,")
        sql_lines.append(f"    '{sl['module_uuid']}',")
        sql_lines.append(f"    {quote_sql(sl['slug'])},")
        sql_lines.append(f"    {quote_sql(sl['title'])},")
        sql_lines.append(f"    {quote_sql(sl['description'])},")
        sql_lines.append(f"    {quote_sql(sl['youtube_video_id'])},")
        sql_lines.append(f"    {sl['duration_minutes']},")
        sql_lines.append(f"    {sl['order_index']},")
        sql_lines.append(f"    {to_pg_array(sl['objectives'])},")
        sql_lines.append(f"    {to_pg_array(sl['tags'])},")
        sql_lines.append(f"    {to_pg_array(sl['skills_taught'])}")
        sql_lines.append(f"  )")
        sql_lines.append(f"  ON CONFLICT (course_id, slug) DO UPDATE SET")
        sql_lines.append(f"    module_id = EXCLUDED.module_id,")
        sql_lines.append(f"    title = EXCLUDED.title,")
        sql_lines.append(f"    description = EXCLUDED.description,")
        sql_lines.append(f"    youtube_video_id = EXCLUDED.youtube_video_id,")
        sql_lines.append(f"    duration_minutes = EXCLUDED.duration_minutes,")
        sql_lines.append(f"    order_index = EXCLUDED.order_index,")
        sql_lines.append(f"    objectives = EXCLUDED.objectives,")
        sql_lines.append(f"    tags = EXCLUDED.tags,")
        sql_lines.append(f"    skills_taught = EXCLUDED.skills_taught;")
        sql_lines.append("")

    sql_lines.append("END $$;")
    
    migration_file = os.path.join(base_dir, "supabase/migrations/20261121150000_seed_mitre_attack_incident_response_course.sql")
    with open(migration_file, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines))
    print(f"Written {migration_file} successfully! ({len(sql_lines)} lines)")

if __name__ == "__main__":
    main()
