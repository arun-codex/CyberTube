from course_data.common import CAPSTONE

MODULE_08 = {
    "id": "mod-08-soc-forensics-capstone",
    "title": "Module 08: Final SOC Network Forensics Capstone",
    "description": "Synthesize your complete forensics skill set in an end-to-end enterprise incident investigation, evidence extraction, timeline reconstruction, and executive report.",
    "order": 9,
    "lessons": [
        {
            "id": "les-08-1-capstone-investigation",
            "slug": "operation-blackout-beacon-capstone",
            "title": "Capstone Investigation: Operation Blackout Beacon — Enterprise Intrusion Forensics",
            "description": "Final assessed capstone investigation. Perform end-to-end network triage on an enterprise intrusion capture, reconstruct the attack chain, carve the deployed malware payload, compute C2 beacon metrics, and author an executive report.",
            "durationMinutes": 120,
            "order": 1,
            "objectives": [
                "Execute the complete 5-phase forensic triage methodology on an unknown multi-stage intrusion capture",
                "Extract Indicators of Compromise (IOCs) including C2 IPs, domain infrastructure, and payload hashes",
                "Measure C2 beaconing interval, jitter distribution, and data exfiltration velocity",
                "Submit a comprehensive 6-part incident response report scored across the 100-mark assessment rubric"
            ],
            "tags": ["capstone", "enterprise-investigation", "soc-forensics", "incident-response", "assessment"],
            "skillsTaught": ["Full-scope intrusion analysis", "Evidence chain preservation", "Executive and technical reporting"],
            "richContent": {
                "introduction": "Welcome to the culmination of the Network Packet Analysis & Forensics Masterclass. In this assessed capstone, you step into the role of Lead Network Forensic Investigator responding to a major corporate security alert: Operation Blackout Beacon. Using all the techniques mastered across the curriculum — Protocol Hierarchy, display filter syntax, stream reassembly, object carving, C2 beacon timing analysis, and chain of custody documentation — you will analyze the evidence capture and deliver an authoritative investigation report.",
                "prerequisites": ["Modules 00 through 07 complete"],
                "keyTerminology": [
                    {"term": "Operation Blackout Beacon", "definition": "The formal code name of the simulated enterprise intrusion investigation assessed in this capstone."},
                    {"term": "100-Mark Rubric", "definition": "The multi-category assessment rubric measuring Triage (15), Protocol Investigation (15), Suspicious Activity (20), Evidence Preservation (15), Timeline (15), and Report Quality (20)."}
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
                    {"filter": "ip.addr == 10.0.4.152", "description": "Isolates all traffic to and from the primary victim host", "purpose": "Capstone investigation baseline"},
                    {"filter": "http or tls.handshake.type == 1", "description": "Filters for web session initiation and TLS client hellos", "purpose": "Map adversary external infrastructure"}
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
                    "options": ["50 marks", "60 marks", "75 marks", "90 marks"],
                    "correctAnswerIndex": 2,
                    "explanation": "The capstone requires a minimum passing threshold of 75 out of 100 marks across the six rubric criteria.",
                    "difficulty": "intermediate"
                },
                "summary": "Completing Operation Blackout Beacon certifies comprehensive practical competence in network packet analysis, forensic triage, and incident reporting.",
                "furtherReading": [
                    {"title": "Wireshark Foundation Documentation", "url": "https://www.wireshark.org/docs/"}
                ]
            }
        }
    ],
    "capstoneAssessment": CAPSTONE
}

