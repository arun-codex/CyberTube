import glob
import os
import re
import json

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

MODULE_QUIZZES = {
    1: [
        {
            "question": "How is a raw security event fundamentally different from a security incident in a SOC?",
            "options": [
                "An event is a recorded factual occurrence in a log, whereas an incident is an evaluated event or set of events that threatens confidentiality, integrity, or availability and requires active response",
                "An event is generated only by network firewalls, whereas incidents come exclusively from Windows endpoints",
                "Events are always high severity, while incidents are informational logs",
                "An event requires an immediate server shutdown, while an incident can be ignored"
            ],
            "correctAnswerIndex": 0,
            "explanation": "A raw event is simply a recorded observation of system state (e.g., a logon attempt or firewall packet). An incident is a validated security occurrence with confirmed or suspected adverse impact requiring containment and mitigation."
        },
        {
            "question": "Why does a SIEM require accurate source timestamps normalized across all ingested telemetry?",
            "options": [
                "To reduce the disk space required to index the event payloads",
                "To construct an accurate chronological incident timeline and correlate events that occurred across different systems and timezones",
                "Because queries cannot run without Julian calendar dates",
                "To ensure that firewalls drop outdated TCP sessions"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Event timestamps must be accurately extracted and normalized (typically to UTC) so that analysts can correlate actions occurring across distributed systems in exact chronological order."
        },
        {
            "question": "What criteria should guide a Tier 1 (L1) SOC analyst when deciding whether to escalate an alert?",
            "options": [
                "Escalate every single alert immediately to Tier 3 without checking logs",
                "Escalate when triage evidence confirms suspicious behavior exceeding authorized baselines, scope spans multiple critical entities, or remediation requires higher-level authorization",
                "Only escalate alerts that have fewer than two log records",
                "Never escalate unless the client executive phones the SOC"
            ],
            "correctAnswerIndex": 1,
            "explanation": "L1 analysts escalate alerts when initial triage establishes factual anomalies, impacts critical assets, reveals spread, or requires specialized containment or forensics beyond L1 authorization."
        }
    ],
    2: [
        {
            "question": "What is the critical distinction between event time (_time) and ingestion time (_indextime) in a SIEM?",
            "options": [
                "Event time is when the activity actually occurred on the source system, while ingestion time is when the SIEM indexed the record",
                "Event time is measured in seconds, while ingestion time is measured in bytes",
                "Ingestion time is always earlier than event time",
                "They are always identical in every SIEM architecture"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Event time (_time) reflects when the source machine recorded the action; ingestion time (_indextime) reflects when the SIEM receiver/indexer received and stored it. Lag between them indicates forwarder delays or network latency."
        },
        {
            "question": "Why must an analyst interpret source IP address and user account identity together during triage?",
            "options": [
                "Because IP addresses and usernames are encrypted by default",
                "An IP address can be shared (DHCP, NAT, proxy) or spoofed, while a user account may be accessed from multiple locations; together they establish operational context",
                "Neither IP nor username can be filtered in search queries",
                "Splunk syntax requires both fields in every where clause"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Evaluating source IP without user context risks misattributing shared NAT gateways or dynamic DHCP leases; evaluating user without IP misses geo-velocity anomalies or internal lateral movement."
        },
        {
            "question": "What is a 'sourcetype' in Splunk?",
            "options": [
                "The physical hardware manufacturer of the server",
                "A default categorization that determines how Splunk formats and parses raw event data, timestamps, and field boundaries",
                "The user credentials used to log into the web interface",
                "The maximum disk quota allocated to a search index"
            ],
            "correctAnswerIndex": 1,
            "explanation": "In Splunk, sourcetype governs how incoming data streams are broken into distinct events, how timestamps are extracted, and how fields are parsed at search time."
        }
    ],
    3: [
        {
            "question": "Under what circumstance is a suspicious authentication alert considered benign or a false positive rather than an incident?",
            "options": [
                "When the affected host is a Linux server",
                "When investigation proves the failed logins stemmed from an expired password on a legitimate background scheduled task or service sync rather than an adversary",
                "Whenever the login fails fewer than 1,000 times",
                "When the alert occurs on a weekend"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A benign positive occurs when unusual telemetry triggers detection logic, but verified operational evidence (e.g. service account password change, misconfigured sync script) confirms no hostile intent or compromise."
        },
        {
            "question": "What specific investigative evidence justifies raising the severity of an alert from Low to High?",
            "options": [
                "An analyst receiving multiple emails from team members",
                "Evidence of successful authentication following brute-force, privileged account compromise, lateral movement, or execution of suspicious binaries on critical infrastructure",
                "The log file being formatted in JSON rather than CSV",
                "The event arriving during evening shift hours"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Severity escalates when evidence confirms threat progression (e.g. failed logins transitioning to success), involves tier-0 domain controllers or sensitive assets, or shows active adversary execution."
        },
        {
            "question": "Which set of details is mandatory in a professional SOC escalation note?",
            "options": [
                "Only the raw unparsed event log string",
                "Executive summary of observed activity, affected entities (host, user, IP), UTC timeline, pivot query evidence, MITRE technique, and recommended next containment checks",
                "A copy of the entire SIEM configuration file",
                "The analyst's personal opinion without timestamps"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A defensible handoff must include who/what/where/when, factual telemetry evidence, confidence level, rule context, and explicit containment suggestions for L2/IR."
        }
    ],
    4: [
        {
            "question": "What does Windows Security Event ID 4625 indicate in an audit log?",
            "options": [
                "A successful user logon session",
                "An account failed to log on, recording the target username, logon type, failure status code, and source workstation/IP",
                "A new user account was created in Active Directory",
                "The Windows Security event log was cleared"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Event ID 4625 records a failed logon attempt, providing essential forensic sub-status codes (e.g., 0xC000006A for bad password, 0xC0000064 for non-existent user)."
        },
        {
            "question": "Why is Sysmon (System Monitor) an enhancement to, rather than a replacement for, standard Windows Security event logs?",
            "options": [
                "Sysmon only records printer driver activity",
                "Standard Security logs record essential authentication (4624/4625) and audit policy changes, while Sysmon adds deep process lineage, network sockets, hash calculations, and driver loads",
                "Sysmon cannot run on 64-bit Windows systems",
                "Windows Security logs cannot be exported to SIEM"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Standard Windows logs provide authoritative logon, privilege, and object access auditing. Sysmon supplements these with granular process creation (ID 1 with hashes and CLI), network connections (ID 3), and file creations (ID 11)."
        },
        {
            "question": "Why might event IDs differ between logging providers for similar security events?",
            "options": [
                "Because different vendors and OS subsystems define their own proprietary event schemas and telemetry taxonomies",
                "Because Microsoft changes event IDs randomly on each reboot",
                "Because event IDs are generated from the hash of the hostname",
                "Because firewalls do not support numbers above 1000"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Each provider (e.g., Microsoft-Windows-Security-Auditing vs Microsoft-Windows-Sysmon vs CrowdStrike) maintains its own event manifest and ID taxonomy, making normalization in SIEM essential."
        }
    ],
    5: [
        {
            "question": "What does a DNS response code (RCODE) of NXDOMAIN signify in network telemetry?",
            "options": [
                "The queried domain name does not exist according to authoritative DNS resolvers",
                "The domain name was successfully resolved to an IPv4 address",
                "The DNS server crashed due to an overload",
                "The request was blocked by an endpoint antivirus driver"
            ],
            "correctAnswerIndex": 0,
            "explanation": "NXDOMAIN (Non-Existent Domain) indicates the queried domain is not registered or resolved. High bursts of NXDOMAIN can indicate DGA (Domain Generation Algorithm) malware communication or typo-squatting attempts."
        },
        {
            "question": "Why is an HTTP 404 response code alone insufficient evidence to confirm an ongoing web application attack?",
            "options": [
                "HTTP 404 can only be generated by database engines",
                "Legitimate users and search indexers frequently encounter broken links, missing assets, or changed URLs; attack confirmation requires inspecting payload paths, scan cadence, and method patterns",
                "A 404 code proves that the server was completely compromised",
                "Web servers never log 404 status codes"
            ],
            "correctAnswerIndex": 1,
            "explanation": "404 simply means resource not found. Attackers scanning for vulnerabilities generate clusters of 404s, but so do broken images or retired endpoints. Analysts must look at path patterns (e.g., /admin, /.env, /wp-login) and request volume."
        },
        {
            "question": "What is the primary investigation value of examining the destination port in firewall flow logs?",
            "options": [
                "It reveals the exact plaintext content of the transmission",
                "It helps infer the network service or protocol (e.g., 53 for DNS, 443 for HTTPS, 3389 for RDP) and identify traffic over non-standard ports",
                "It proves which employee sent the packet",
                "Destination port determines the physical cable used"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Destination port indicates the expected application protocol (e.g. port 80/443 for web, 22 for SSH). Sockets connecting to unusual ports (e.g. port 4444 or 443 with non-TLS traffic) warrant deep inspection."
        }
    ],
    6: [
        {
            "question": "What is the primary responsibility of an Indexer component in Splunk architecture?",
            "options": [
                "Displaying dashboards and running UI themes",
                "Transforming raw incoming data into events, parsing timestamps, storing compressed data in directories (buckets), and executing searches across those buckets",
                "Providing DNS lookup services to network routers",
                "Writing PowerShell scripts for endpoints"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Splunk Indexers receive data, parse it into structured events, write events into time-partitioned directories called buckets, and scan these buckets when searches run."
        },
        {
            "question": "What security risk occurs if a lab or enterprise Splunk web console is exposed directly to the public Internet without access controls?",
            "options": [
                "The web console automatically converts all CSV files into XML",
                "Adversaries can brute-force credentials, access indexed confidential enterprise logs, or leverage administrator privileges to execute remote code on the search head",
                "The search head license will immediately terminate",
                "All log forwarders will redirect traffic to Google"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Exposing admin management ports (e.g. 8000, 8089) invites brute-force and remote code execution attacks via administrative scripted inputs and full visibility into organizational telemetry."
        },
        {
            "question": "Why is data retention planning vital when designing a SIEM storage architecture?",
            "options": [
                "Because unconstrained data ingestion will exhaust storage disks, potentially halting log indexing or causing unbudgeted cloud infrastructure expenses",
                "Because Splunk deletes the oldest event every 60 seconds by default",
                "Data retention only applies to paper printouts of logs",
                "Regulations mandate that all logs must be deleted within 24 hours"
            ],
            "correctAnswerIndex": 0,
            "explanation": "SIEM storage must balance compliance requirements (e.g., 90 days hot, 1 year cold) against physical disk capacity and cloud ingestion costs to prevent out-of-memory or frozen-bucket data loss."
        }
    ],
    7: [
        {
            "question": "Why is precise sourcetype naming critical during Splunk ingestion?",
            "options": [
                "Sourcetype names are restricted to three characters only",
                "It enables search-time field extractions, CIM compliance, and accurate parser rules to be applied consistently to identical data formats",
                "Without a sourcetype, Splunk will reject all incoming network traffic",
                "Sourcetype determines the physical server room where data resides"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Consistent sourcetypes (e.g. WinEventLog:Security, access_combined, cisco:asa) allow Splunk to apply the correct timestamp formats, regex extractions, and data model mappings across searches."
        },
        {
            "question": "What is the consequence if a SIEM incorrectly parses event timestamps during ingestion?",
            "options": [
                "Events will be indexed under incorrect time boundaries, causing time-range searches to miss critical evidence or skew chronological correlation",
                "The operating system of the indexer will change its timezone",
                "All user passwords in the log will be exposed",
                "The SIEM software will refuse to launch"
            ],
            "correctAnswerIndex": 0,
            "explanation": "If timestamps fail to parse or default to index time, events appear at the wrong point on the timeline. Time-scoped incident searches will fail to return relevant entries."
        },
        {
            "question": "How can an analyst detect partial or incomplete log ingestion from a monitored forwarder?",
            "options": [
                "By comparing historical event count baselines and checking internal forwarder metrics (such as tailing processor metrics in _internal)",
                "By opening the file in Notepad on the desktop",
                "Partial ingestion is impossible in modern networking",
                "By pinging the forwarder host"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Monitoring ingestion rates against historical baselines and querying index=_internal for forwarder connection drops or tailing errors surfaces data pipeline disruptions."
        }
    ],
    8: [
        {
            "question": "What is the performance impact of setting an unbounded time range (e.g. 'All Time') in a Splunk search?",
            "options": [
                "The search executes faster because no time filtering is needed",
                "The indexer must scan all historical buckets on disk, resulting in severe search degradation, disk I/O spikes, and slower results",
                "Splunk will automatically cancel all other user searches",
                "It has no impact on system performance"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Splunk indexes data into time-partitioned buckets. Specifying a precise time window allows the indexer to examine only relevant buckets, drastically reducing disk reads and search duration."
        },
        {
            "question": "Why should search queries always specify target indexes (e.g., index=soc_lab or index=windows)?",
            "options": [
                "To restrict search execution to the specific index buckets holding that data, avoiding costly full-cluster scans across default and audit indexes",
                "Because Splunk syntax returns an error without an index parameter",
                "Index names define the visual color of the search graph",
                "Indexes encrypt the search string"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Omitting the index causes Splunk to search all default user indexes, wasting resources scanning unrelated datasets. Scoping by index is rule #1 of performant SPL."
        },
        {
            "question": "How does the SPL 'table' command differ fundamentally from the 'stats' command?",
            "options": [
                "Table aggregates data mathematically, while stats lists raw strings",
                "Table merely formats and projects specified fields row-by-row without reducing rows, whereas stats aggregates and computes summary metrics across rows",
                "Table only works on Windows event logs",
                "Stats can only be used at the beginning of a search pipeline"
            ],
            "correctAnswerIndex": 1,
            "explanation": "'table field1, field2' is a projection command that presents raw records with selected columns. 'stats count, sum(bytes) by user' transforms raw records into statistical summary rows."
        }
    ],
    9: [
        {
            "question": "Why can a rigid, fixed-count threshold (e.g., 'alert if failures > 10 in 5 minutes') produce false positives in production?",
            "options": [
                "Because computers cannot count higher than 10",
                "Legitimate enterprise systems, batch sync jobs, or large user pools can generate benign bursts exceeding arbitrary static limits; dynamic baselines and behavioral ratios provide better fidelity",
                "Fixed thresholds require hardware dongles",
                "Only external hackers trigger counts above 10"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Static thresholds ignore organizational context: an enterprise mail server or single misconfigured script can generate 50 failures in seconds. Behavioral ratios and anomaly baselines reduce alert fatigue."
        },
        {
            "question": "What does the SPL function 'dc(src_ip)' calculate?",
            "options": [
                "The domain controller IP address",
                "The distinct count (number of unique) source IP addresses observed in the grouped dataset",
                "The direct connection speed in megabits",
                "The distance between source and destination IP"
            ],
            "correctAnswerIndex": 1,
            "explanation": "In Splunk, 'dc()' stands for distinct count. 'stats dc(src_ip) by user' reveals how many distinct IP addresses attempted to authenticate as that user account."
        },
        {
            "question": "What is the danger of evaluating baseline anomalies using an overly narrow historical time window (e.g., only 2 hours)?",
            "options": [
                "Sparse baseline windows fail to capture diurnal cycles (business hours vs night), weekend patterns, and periodic scheduled automation, leading to frequent false alarms",
                "The indexer will run out of memory",
                "Narrow time windows are rejected by SPL syntax",
                "Overly narrow windows cause permanent database corruption"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Effective baselining requires sufficient historical context (e.g. 7–30 days) to accommodate normal daily rhythms, shift changes, weekly backups, and maintenance cycles."
        }
    ],
    10: [
        {
            "question": "What is the primary SOC use case for the SPL 'coalesce()' function?",
            "options": [
                "Combining multiple potential field names (e.g., src_ip, client_ip, c_ip) into a single normalized field by returning the first non-null value",
                "Encrypting user passwords before indexing",
                "Merging two physical hard drives into a RAID volume",
                "Deleting duplicate events from disk"
            ],
            "correctAnswerIndex": 0,
            "explanation": "'coalesce(fieldA, fieldB, fieldC)' checks arguments from left to right and assigns the first existing non-null value, providing a clean method to normalize disparate vendor field names at search time."
        },
        {
            "question": "What risk arises from using overly permissive regular expressions (e.g. '.*') in SPL 'rex' field extractions?",
            "options": [
                "Permissive regexes can cause catastrophic backtracking, exhaust CPU resources on the search head, and extract incorrect trailing text when log formatting varies",
                "It immediately shuts down the forwarder daemon",
                "Overly permissive regex causes Splunk to switch to Python 2",
                "Regular expressions are not allowed in defensive investigations"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Unbounded wildcards (like .*) cause heavy regex engine backtracking across long log lines and capture unintended trailing tokens when event structures deviate."
        },
        {
            "question": "Why must original raw security log payloads (_raw) remain immutable and unmodified when building field extractions?",
            "options": [
                "Modifying logs breaks SIEM pricing tier calculations",
                "Forensic integrity and legal admissibility require the original evidentiary record to be preserved exactly as generated by the source system",
                "Because _raw is stored in read-only optical discs",
                "Windows logs cannot be parsed if _raw is altered"
            ],
            "correctAnswerIndex": 1,
            "explanation": "In DFIR and SOC operations, the original raw event is primary evidence. Field extractions and normalization must occur at search time or in separate indexed metadata, never overwriting original telemetry."
        }
    ],
    11: [
        {
            "question": "Why is correlating multi-source events based solely on IP address frequently unreliable in enterprise networks?",
            "options": [
                "Because IP addresses cannot be stored in databases",
                "Dynamic host configuration (DHCP), NAT boundaries, and mobile VPN endpoints cause IP addresses to be reassigned to different devices over time",
                "IP addresses only exist during business hours",
                "Routers change their IP address on every packet"
            ],
            "correctAnswerIndex": 1,
            "explanation": "IP reuse across DHCP lease expirations and egress NAT gateways means an IP at 10:00 AM may belong to a completely different device or user by 11:00 AM unless combined with temporal windows and hostname/MAC resolution."
        },
        {
            "question": "Why should analysts prefer 'stats' aggregation over the 'join' command for large datasets in Splunk?",
            "options": [
                "Join operations in Splunk have strict memory and subsearch execution limits (e.g. 50,000 subsearch rows), whereas stats scales linearly across distributed indexers",
                "Join commands can only be executed by administrators",
                "Stats runs exclusively in the cloud",
                "Join command was deprecated in Splunk 6"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Splunk's 'join' command executes subsearches subject to hard limits (maxout/subsearch caps) and forces centralized processing on the search head. 'stats' distributes aggregation across all indexers efficiently."
        },
        {
            "question": "What is the purpose of enrichment lookups (e.g., asset databases, threat intel lists) in SIEM triage?",
            "options": [
                "To add contextual attributes (such as business criticality, department, device owner, or threat reputation) to raw events without modifying the source logs",
                "To translate English log text into foreign languages",
                "To increase the size of the event to meet licensing minimums",
                "To automatically block all incoming traffic from enriched subnets"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Enrichment links static or external contextual data (e.g. VIP status, server role, asset tier, known TOR exit node) to raw events, giving analysts immediate context to gauge impact and severity."
        }
    ],
    12: [
        {
            "question": "Why is an alert panel showing zero events not necessarily an indicator of perfect security health?",
            "options": [
                "Because zero events often signifies broken ingestion pipelines, stopped forwarders, network routing failures, or misconfigured search filters rather than absent threats",
                "Because an empty dashboard automatically triggers a critical alert",
                "Zero events indicates that the search head has rebooted",
                "Every company has at least 1,000 confirmed breaches per hour"
            ],
            "correctAnswerIndex": 0,
            "explanation": "'Silence in the logs' frequently indicates silent logging failures—an agent crash, expired certificate, or network drop. Verifying log ingestion volume and freshness is essential before assuming all is clear."
        },
        {
            "question": "Which visualization type is best suited for displaying the distribution of authentication failures across top 10 targeted user accounts?",
            "options": [
                "A geographic world map",
                "A horizontal bar chart or sorted summary table",
                "A scatter plot with radial logarithmic lines",
                "A 3D surface plot"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Categorical rankings (such as top targeted accounts or top talker IPs) are best conveyed via clean, descending horizontal bar charts or clear tabular layouts with count metrics."
        },
        {
            "question": "How should an analyst validate that dashboard drilldown filters are functioning correctly?",
            "options": [
                "By clicking through multiple categories and verifying that the destination search or view inherits the exact clicked entity, token, and time window without dropping criteria",
                "By refreshing the browser repeatedly",
                "By checking if the monitor display cable is securely connected",
                "By printing the dashboard to PDF"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Validating drilldowns requires verifying token passing: clicking an item must pass the exact selected entity value and time range into the resulting query without syntax errors or unbounded time expansion."
        }
    ],
    13: [
        {
            "question": "What is 'alert fatigue' and what operational danger does it pose to a SOC?",
            "options": [
                "Physical tiredness experienced by computer monitors left on overnight",
                "A condition where analysts are overwhelmed by high volumes of low-fidelity or noisy alerts, causing them to miss genuine security incidents or perform superficial triage",
                "A software error where Splunk stops indexing after 100 alerts",
                "A network protocol failure between SIEM and ticketing systems"
            ],
            "correctAnswerIndex": 1,
            "explanation": "When detection rules trigger dozens of false or benign alarms daily, analysts suffer cognitive overload and desensitization, inevitably leading to missed intrusions and burned-out teams."
        },
        {
            "question": "What is a 'false negative' in security detection engineering?",
            "options": [
                "When a security alert fires on legitimate administrative activity",
                "When a genuine adversary activity or compromise occurs but fails to trigger any alert or detection rule in the SIEM",
                "When the SIEM search returns an error syntax code",
                "When an analyst closes a ticket as resolved"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A false negative is an undetected attack. Detection engineering strives to balance high detection rates (low false negatives) against rule specificity to avoid overwhelming noise (low false positives)."
        },
        {
            "question": "Why must every production SOC alert be accompanied by a documented analyst runbook or triage guide?",
            "options": [
                "Because SIEM software will refuse to save a scheduled alert without an attached PDF",
                "To ensure consistent, repeatable evidence collection, define specific false-positive validation steps, and clarify escalation and containment boundaries across all shifts",
                "So that junior analysts are forbidden from asking questions",
                "To comply with printer manufacturer guidelines"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Runbooks ensure that any analyst on any shift follows an authorized, consistent checklist: how to verify the alert, what pivots to execute, which benign causes to eliminate, and who to contact."
        }
    ],
    14: [
        {
            "question": "What characteristic telemetry pattern distinguishes password spraying from a traditional brute-force attack?",
            "options": [
                "Password spraying targets a few common passwords across many accounts with low frequency per account, whereas brute force attempts many passwords against a single account",
                "Password spraying only targets Linux SSH daemons",
                "Brute-force attacks always originate from within the local subnet",
                "Password spraying never generates Event ID 4625"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Traditional brute force focuses on one target with high velocity (causing account lockout). Password spraying stealthily tests one or two common passwords (e.g. 'Winter2026!') across hundreds of usernames to stay below lockout thresholds."
        },
        {
            "question": "Why do service accounts require specialized triage criteria when evaluating authentication failures?",
            "options": [
                "Service accounts do not generate Windows event records",
                "Service accounts often have automated scheduled jobs running across multiple servers; an expired password or misconfigured service can generate hundreds of rapid failures without adversary involvement",
                "Service accounts are always controlled by external threat actors",
                "Service accounts can only authenticate via HTTP"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Automated services running on dozens of hosts with cached credentials will trigger massive failure spikes upon password rotation. Analysts check process names and service configurations before calling an attack."
        },
        {
            "question": "What key piece of evidence should an analyst confirm before recommending an emergency user account lockout or credential reset?",
            "options": [
                "Whether the user is currently attending a company meeting",
                "Evidence of subsequent successful authentication from an anomalous IP/location following the failure burst, or concurrent unauthorized actions during the session",
                "Checking whether the username contains more than 8 characters",
                "Verifying that the employee's workstation is running Windows 11 Home"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A failed login burst alone merely proves attempts were made. If a subsequent successful logon occurs from the anomalous IP, or if subsequent lateral movement is observed, account takeover is strongly indicated."
        }
    ],
    15: [
        {
            "question": "How can legitimate business software generate network traffic patterns that resemble command-and-control (C2) beacons?",
            "options": [
                "Through routine cloud telemetry, health pings, software update checks, and NTP time synchronization operating on regular polling intervals",
                "Legitimate software never connects to the internet periodically",
                "Only malware uses port 443 for communication",
                "Antivirus software actively masquerades as ransomware"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Cloud agents, telemetry, and keep-alive polls check in periodically (e.g., every 60s). Threat hunting queries calculate interval variance (jitter) and examine TLS certificates, user agents, and domain reputation to distinguish benign keep-alives from C2."
        },
        {
            "question": "Why are elevated HTTP 404 response rates not always an indicator of vulnerability scanning or web compromise?",
            "options": [
                "Because 404 status codes only apply to FTP servers",
                "Web applications frequently retire old product pages, redesign API paths, or host missing asset links that trigger 404s during normal browsing and spidering",
                "HTTP 404 means the web server has been encrypted",
                "404 responses are automatically blocked by cloud proxies"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Broken image links, stale search engine indexes, and client-side single page app routing errors generate routine 404s. Analysts look for focused exploitation paths (e.g., /../../etc/passwd, phpmyadmin, web-inf)."
        },
        {
            "question": "Why is the top-level domain (TLD) alone (such as .xyz or .top) insufficient evidence to classify a domain as malicious?",
            "options": [
                "Because all TLDs are owned by Microsoft",
                "Legitimate organizations, startups, and cost-conscious companies register domains across diverse generic TLDs; domain age, entropy, query frequency, and threat intelligence context must be evaluated",
                "TLDs cannot be parsed in SIEM searches",
                "DNS servers convert all TLDs to .com before logging"
            ],
            "correctAnswerIndex": 1,
            "explanation": "While cheap gTLDs are favored by some threat actors, thousands of benign sites also use them. Triage requires evaluating domain registration date (WHOIS age), lexical randomness, and client context."
        }
    ],
    16: [
        {
            "question": "In digital forensics and incident response, what is the distinction between observed evidence and an investigative hypothesis?",
            "options": [
                "Observed evidence is factual data explicitly recorded in telemetry; an investigative hypothesis is an informed theory proposed to explain the events and must be tested against further evidence",
                "An investigative hypothesis is legally binding proof of a crime",
                "Observed evidence is created by the analyst, while hypotheses are logged by the operating system",
                "There is no difference between them in a SOC"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Observed evidence is objective (e.g., 'process powershell.exe launched with encoded command at 14:02 UTC'). The hypothesis (e.g., 'attacker used phishing attachment for initial execution') requires validation against parent process trees and disk artifacts."
        },
        {
            "question": "Why is matching a file hash against a threat intelligence feed insufficient as the sole basis for closing an investigation?",
            "options": [
                "Because file hashes change every time a file is downloaded",
                "Adversaries can alter file hashes trivially by appending a single byte (hash polymorphism), and benign administrative tools can share attributes; process context and execution behavior must be analyzed",
                "Hashes are only used in cryptography, not incident response",
                "Antivirus engines ignore file hashes"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Adversaries constantly recompile or pad binaries to produce unique hashes that evade static hash feeds. Conversely, legitimate dual-use tools (e.g. PsExec, vssadmin) have benign hashes but can be used maliciously."
        },
        {
            "question": "What containment action must never be taken on a production domain controller without senior leadership authorization?",
            "options": [
                "Writing a search query in Splunk",
                "Abruptly isolating, shutting down, or wiping the primary domain controller, which could disrupt identity services and cause enterprise-wide business outages",
                "Checking the Windows Security event log for Event ID 4624",
                "Exporting CSV audit logs for evidence preservation"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Taking destructive or disruptive containment steps on mission-critical tier-0 infrastructure (like DC isolation) can halt company-wide authentication, email, and manufacturing. Incident commanders and stakeholders must authorize high-impact actions."
        }
    ],
    17: [
        {
            "question": "Why should a calculated risk score in Splunk Enterprise Security be treated as prioritization guidance rather than proof of compromise?",
            "options": [
                "Because risk scores are generated randomly by indexers",
                "Risk scores aggregate weighted anomalies across entities to help analysts prioritize high-risk investigations; benign composite behaviors can still accumulate scores without indicating a true breach",
                "Risk scores can never exceed 100",
                "Enterprise Security disables all alerts when risk scoring is enabled"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Risk-Based Alerting (RBA) scores quantify suspicious activity volume against an entity over time. While an elevated score surfaces candidates for review, human triage must confirm whether the contributing events constitute malicious behavior."
        },
        {
            "question": "What is the primary objective of Splunk's Common Information Model (CIM)?",
            "options": [
                "To standardize field names and schemas (e.g., src, dest, user, action) across heterogeneous technologies so shared detection searches and data models can run universally",
                "To replace Windows Event Viewer with a web page",
                "To eliminate the need for indexers",
                "To automatically block unauthorized network packets at the kernel level"
            ],
            "correctAnswerIndex": 0,
            "explanation": "CIM normalizes diverse vendor telemetry (Palo Alto, Windows, Cisco, AWS) into standardized models (Authentication, Network_Traffic, Endpoint), allowing one correlation search to cover all sources."
        },
        {
            "question": "How does Splunk Enterprise Security (ES) differ from standard core Splunk?",
            "options": [
                "Core Splunk cannot ingest CSV files, while ES can",
                "ES is a premium security analytics solution built on top of Splunk, providing notable event workflows, threat intelligence frameworks, asset/identity correlation, and Risk-Based Alerting",
                "Core Splunk is designed exclusively for network switches",
                "ES is a command-line tool that replaces SPL with SQL"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Core Splunk is the foundational data and search platform. Splunk ES is an integrated security suite providing incident review dashboards, correlation searches, threat intel frameworks, and SOC workflow automation."
        }
    ],
    18: [
        {
            "question": "What quality makes a threat hunting hypothesis scientifically falsifiable?",
            "options": [
                "It uses at least three colors in the presentation slide",
                "It defines a specific, measurable pattern of behavior, required telemetry sources, and clear observational criteria that will either confirm or disprove the premise",
                "It assumes that all employees are active adversaries",
                "It can only be executed by external third-party auditors"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A falsifiable hypothesis states: 'If adversary technique X occurred, we will observe specific telemetry signature Y in log source Z during window W.' If that signature is absent after verifying ingestion health, the hypothesis is disproven."
        },
        {
            "question": "How can unmonitored endpoints or missing log sources create dangerous 'false confidence' during a threat hunt?",
            "options": [
                "Queries return zero hits, leading hunters to conclude an adversary is absent when in reality the adversary is operating within telemetry blind spots",
                "The search head will display an error message in red",
                "Missing logs automatically trigger antivirus quarantines",
                "False confidence only occurs in cloud-native SIEMs"
            ],
            "correctAnswerIndex": 0,
            "explanation": "If key endpoints (e.g. unmanaged laptops, legacy servers) lack forwarders or process creation auditing, queries searching for malicious activity return no results, giving a misleading impression of security."
        },
        {
            "question": "Why are automated positive and negative test fixtures essential when publishing detection rules as code?",
            "options": [
                "To ensure the detection syntax fires on synthetic attack telemetry (positive test) while remaining silent on normal baseline operational traffic (negative test)",
                "To increase the execution time of searches on indexers",
                "Because Git repositories refuse to store YAML files without unit tests",
                "To prove that the detection engineer is working full time"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Detection-as-code requires testing: positive tests verify that known technique signatures trigger the rule as expected; negative tests confirm that benign production-like traffic does not cause false-positive noise."
        }
    ],
    19: [
        {
            "question": "Why can an experimental cloud SIEM training lab incur unexpected financial charges even when using a 'free trial' subscription?",
            "options": [
                "Because Microsoft charges for each character typed in the search bar",
                "Free trials often exclude specific high-throughput ingestion tiers, retain billing for underlying storage/egress once trial limits expire, or incur charges if resources are left running",
                "Cloud providers charge users every time a dashboard is viewed",
                "Trials only apply to Windows XP installations"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Cloud SIEM pricing is dominated by data ingestion volume (GB/day) and retention storage. Ingesting high-volume logs or leaving test VMs running beyond trial credits results in credit card charges unless strict budgets are set."
        },
        {
            "question": "What is the architectural relationship between Microsoft Sentinel and Azure Log Analytics?",
            "options": [
                "Log Analytics is a competing third-party product that Sentinel replaces",
                "Sentinel is a cloud-native SIEM/SOAR solution built directly on top of Azure Log Analytics workspaces, which provide the underlying storage, ingestion, and KQL query engine",
                "Log Analytics is used only for billing invoices",
                "Sentinel runs on Linux workstations while Log Analytics runs in Azure"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Azure Log Analytics workspace is the data tier that stores tables and executes KQL queries. Microsoft Sentinel is the security layer enabled on that workspace, adding analytics rules, incident management, and SOAR."
        },
        {
            "question": "Why should administrative RBAC permissions in Microsoft Sentinel follow the principle of least privilege?",
            "options": [
                "To prevent unauthorized or junior users from accidentally modifying detection rules, disabling data connectors, viewing sensitive incident data, or deploying costly resources",
                "Because Azure permissions can only be granted to one person at a time",
                "To ensure that all queries take exactly 5 seconds to run",
                "Least privilege is an optional feature only used in government labs"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Role-Based Access Control (e.g., Microsoft Sentinel Reader vs Responder vs Contributor) protects operational integrity, prevents accidental deletion of analytics rules, and restricts access to confidential telemetry."
        }
    ],
    20: [
        {
            "question": "What is the role of a Data Collection Rule (DCR) in the Azure Monitor Agent (AMA) architecture?",
            "options": [
                "It specifies which events, performance counters, or syslog streams to collect from endpoints, how to filter them at the agent, and which Log Analytics workspace to send them to",
                "It automatically changes Windows passwords every 30 days",
                "It encrypts the hard disk using BitLocker",
                "It replaces the need for network routers in Azure"
            ],
            "correctAnswerIndex": 0,
            "explanation": "DCRs define the collection policy: which event IDs to capture, XPath queries for filtering out noise at the source, and destination workspaces, providing centralized collection control without editing local config files."
        },
        {
            "question": "How does an analyst verify in Sentinel that a newly configured data connector is actively delivering logs?",
            "options": [
                "By running a KQL query on the destination table (e.g., SecurityEvent | summarize max(TimeGenerated)) to confirm recent timestamps and active record counts",
                "By rebooting the entire Azure subscription",
                "By checking if the connector icon is green in the portal",
                "By opening an incognito browser tab"
            ],
            "correctAnswerIndex": 0,
            "explanation": "While UI status badges can be delayed, querying the actual table with KQL (inspecting `TimeGenerated > ago(1h)`) and reviewing ingestion latency proves that live records are successfully reaching the workspace."
        },
        {
            "question": "What is the Common Event Format (CEF) and why is it frequently used for firewall and appliance ingestion?",
            "options": [
                "A proprietary binary format created by Apple",
                "An open, standardized log format running over Syslog that structures vendor security events into predictable prefix fields and key-value extension pairs",
                "A protocol used exclusively for audio streaming",
                "A method for compressing hard drives"
            ],
            "correctAnswerIndex": 1,
            "explanation": "CEF (Common Event Format) standardizes syslog headers and key-value pairs (e.g., src=192.0.2.1 dst=198.51.100.5 act=blocked), enabling firewalls and security appliances to be parsed consistently into Sentinel's CommonSecurityLog table."
        }
    ],
    21: [
        {
            "question": "Which KQL operator is used to filter rows based on specific boolean criteria?",
            "options": [
                "project",
                "where",
                "summarize",
                "order by"
            ],
            "correctAnswerIndex": 1,
            "explanation": "In Kusto Query Language (KQL), the 'where' operator filters tabular rows based on predicate conditions (e.g., `where EventID == 4625 and TimeGenerated > ago(1d)`)."
        },
        {
            "question": "Why should SOC analysts always include an explicit time window filter (e.g. 'TimeGenerated > ago(7d)') near the top of KQL queries?",
            "options": [
                "KQL queries will fail with a syntax error without it",
                "It enables the query engine to prune unneeded storage partitions, drastically accelerating query performance and reducing compute costs",
                "Because timestamps are deleted after 7 days in Sentinel",
                "To prevent other analysts from seeing the query"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Log Analytics partitions data by TimeGenerated. Placing a tight time filter at the start limits the volume of data scanned, ensuring fast execution and efficient resource usage."
        },
        {
            "question": "How does the KQL 'summarize' operator differ from the 'project' operator?",
            "options": [
                "Summarize aggregates rows to produce calculated metrics (like count, dcount, avg) grouped by specified columns, whereas project selects and renames specific columns without aggregating rows",
                "Summarize deletes rows from the table, while project adds new rows",
                "Project only works on numbers, while summarize only works on strings",
                "They are exact synonyms in KQL"
            ],
            "correctAnswerIndex": 0,
            "explanation": "'project Account, Computer, IPAddress' chooses which columns to display. 'summarize FailedLogins=count() by Account' aggregates multiple records into a grouped summary row."
        }
    ],
    22: [
        {
            "question": "What is a 'join key' in KQL multi-table correlation?",
            "options": [
                "A cryptographic SSH private key",
                "The common column or attribute shared between two tables (such as Computer, Account, or IPAddress) used to match and join corresponding records",
                "The primary password of the database administrator",
                "The first letter of the table name"
            ],
            "correctAnswerIndex": 1,
            "explanation": "In KQL, the join key is the common attribute specified in `$left.Key == $right.Key` that dictates how records from the left and right tables are linked."
        },
        {
            "question": "What is the primary risk of using an 'inner' join when correlating security event tables in KQL?",
            "options": [
                "Inner join drops records from both tables that do not have a matching key in the opposing dataset, potentially concealing critical forensic context",
                "Inner join converts all table data into hexadecimal",
                "Inner join is prohibited by Microsoft security standards",
                "Inner join crashes the browser interface"
            ],
            "correctAnswerIndex": 0,
            "explanation": "An inner join discards any row that lacks an exact match on the other side. If one source log arrived late or used a slightly different hostname format, evidence can silently vanish from the results."
        },
        {
            "question": "What is the primary benefit of the Advanced SIEM Information Model (ASIM) in Microsoft Sentinel?",
            "options": [
                "It enables analysts to write source-agnostic queries and analytics rules that work across diverse vendor products through standardized parsers and schemas",
                "It eliminates the need to pay for Log Analytics storage",
                "It automatically blocks all phishing emails without rules",
                "It translates KQL into C++"
            ],
            "correctAnswerIndex": 0,
            "explanation": "ASIM normalizes disparate sources (e.g. Infoblox, Windows DNS, Azure DNS) into unified schemas (like _Im_Dns), enabling a single analytic rule to detect threats regardless of which vendor generated the log."
        }
    ],
    23: [
        {
            "question": "How should a detection engineer configure an analytics rule to account for upstream log ingestion latency (delayed logs)?",
            "options": [
                "Set the query frequency to every 10 seconds",
                "Configure a lookback period (query period) that is larger than the query frequency (e.g., run every 1 hour, look back 2 hours) to capture events that arrived late",
                "Delete delayed events automatically upon arrival",
                "Change the computer's system clock"
            ],
            "correctAnswerIndex": 1,
            "explanation": "If a log source has a 15-minute delivery delay, a rule running every 15 minutes looking back only 15 minutes will miss events. Setting a 30-to-60 minute lookback window catches late-arriving telemetry."
        },
        {
            "question": "Why is accurate 'Entity Mapping' crucial when configuring Sentinel scheduled analytics rules?",
            "options": [
                "Entity mapping converts events into video animations",
                "It maps query output fields (e.g. Account, IP, Host) to standardized Sentinel entities, enabling automatic incident correlation, entity graph visualization, and UEBA profiling",
                "Entity mapping is only needed for accounting purposes",
                "It prevents users from logging in on mobile devices"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Mapping fields to entities (Account, Host, IP, URL) allows Sentinel to stitch separate alerts involving the same entities into unified incidents, populate the investigation graph, and trigger playbooks."
        },
        {
            "question": "How does an active Sentinel analytics rule fundamentally differ from an ad-hoc KQL query run in the Logs blade?",
            "options": [
                "Analytics rules run automatically on a defined schedule, evaluate threshold logic, generate actionable incidents/alerts, and trigger automated response playbooks",
                "Ad-hoc queries are saved permanently in the Azure blockchain",
                "Analytics rules cannot query tables with more than 100 rows",
                "There is no difference between them"
            ],
            "correctAnswerIndex": 0,
            "explanation": "An ad-hoc query is an interactive search run manually by an analyst. An analytics rule is a scheduled, automated background monitor that evaluates detection criteria and generates manageable incidents."
        }
    ],
    24: [
        {
            "question": "During an incident investigation, what evidence indicates lateral movement or threat spread across an environment?",
            "options": [
                "Multiple users reading the same company intranet news article",
                "The same compromised user account or source IP establishing remote sessions (SMB, RDP, WinRM) or executing unusual commands on multiple internal endpoints in sequence",
                "A printer running out of toner in two different offices",
                "Workstations downloading standard Windows updates"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Lateral movement is evidenced by sequential administrative connections (e.g. port 445/3389/5985), pass-the-hash patterns, or new service installations spreading from one host to internal peers."
        },
        {
            "question": "How should a SOC analyst handle multiple concurrent alerts that share identical entity attributes (e.g., same host and user within 15 minutes)?",
            "options": [
                "Close each alert individually without reviewing the others",
                "Investigate them together as contributing signals of a single coherent incident to understand the complete attack lifecycle and avoid fragmented tickets",
                "Delete all alerts except the oldest one",
                "Ignore all alerts until next week"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Attacks generate multiple signals across stages (phishing -> execution -> C2 -> lateral movement). Correlating related alerts into a single incident provides full context and prevents duplicate work."
        },
        {
            "question": "What information is essential when documenting case bookmarks during an active investigation in Sentinel?",
            "options": [
                "The analyst's lunch order details",
                "The specific query, exact event timestamps, observed entities, and an objective technical explanation of why that specific record represents key evidence in the incident timeline",
                "A screenshot of the desktop wallpaper",
                "Only the Azure subscription billing ID"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Bookmarks capture specific historical log records, freezing key evidence with analyst annotations so teammates and incident responders can immediately review the underlying data."
        }
    ],
    25: [
        {
            "question": "Why do commercial and open-source threat intelligence (CTI) indicator feeds generate substantial false positives if used for automated blocking without filtering?",
            "options": [
                "Because CTI feeds are intentionally generated by threat actors",
                "Indicators (such as IP addresses and domains) can expire, be sinkholed, point to shared content delivery networks (CDNs) or cloud hosting, or be reassigned to legitimate businesses",
                "Because firewalls cannot read threat intelligence feeds",
                "Indicators only apply to physical locks"
            ],
            "correctAnswerIndex": 1,
            "explanation": "IP addresses in threat feeds are ephemeral; a cloud IP used by malware yesterday might host a legitimate SaaS platform today. Blindly blocking or alerting without confidence filtering creates chaos."
        },
        {
            "question": "When should threat intelligence indicators of compromise (IoCs) expire or be deactivated in a SIEM?",
            "options": [
                "Indicators should never expire and remain active forever",
                "When their validity period elapses, the indicator is proven obsolete/sinkholed, or threat telemetry confirms the adversary infrastructure has been dismantled",
                "Indicators must be deleted every 24 hours regardless of status",
                "Only after an operating system reinstallation"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Threat intelligence requires lifecycle management. Stale indicators degrade detection performance, increase false alarms, and clutter investigation queues."
        },
        {
            "question": "How can an indicator match on a shared multi-tenant cloud hosting IP (e.g., Cloudflare, AWS CloudFront) lead to false-positive escalation?",
            "options": [
                "The cloud hosting provider will delete the customer's account",
                "Thousands of completely benign websites and business services share the same edge IP address; an alert firing on IP alone will misidentify normal web traffic as malicious communication",
                "Shared IPs cause physical damage to network routers",
                "Multi-tenant hosting is illegal in cybersecurity"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Content delivery networks and reverse proxies route millions of benign sites through shared IP pools. Matching solely on IP without inspecting SNI, HTTP host header, or full URL triggers false alerts."
        }
    ],
    26: [
        {
            "question": "Why can statistically rare user activity flagged by User and Entity Behavior Analytics (UEBA) be completely legitimate?",
            "options": [
                "Because computers cannot accurately calculate statistics",
                "Employees take on new project roles, travel to new time zones, use new administrative tools, or participate in authorized disaster recovery drills outside standard baselines",
                "UEBA algorithms only flag activities during holidays",
                "Rare activity is always a confirmed nation-state attack"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Statistical anomaly does not equal maliciousness. An executive traveling internationally or a sysadmin running an annual audit will diverge sharply from normal peer baselines legitimately."
        },
        {
            "question": "What is the primary operational role of User and Entity Behavior Analytics (UEBA) in a modern SIEM?",
            "options": [
                "To replace human analysts entirely with automated scripts",
                "To build baseline profiles of normal user and peer-group behavior and highlight anomalous deviations (e.g. unusual login times, high data egress, first-time resource access)",
                "To monitor employee productivity and keyboard typing speed",
                "To automatically reboot slow computers"
            ],
            "correctAnswerIndex": 1,
            "explanation": "UEBA models standard activity patterns across users and devices, calculating risk scores when actions deviate significantly from personal baselines or organizational peer groups."
        },
        {
            "question": "What must never be stored in plaintext within an interactive Sentinel investigation Jupyter notebook?",
            "options": [
                "KQL queries used during the investigation",
                "Sensitive production API secrets, service principal passwords, or personal identifying data (PII) subject to data protection regulations",
                "Timestamps and hostnames",
                "Chart formatting options"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Notebooks are often shared among team members or committed to repositories. Hardcoding Azure management tokens, passwords, or raw sensitive PII creates major security and compliance risks."
        }
    ],
    27: [
        {
            "question": "When should an automated SOAR playbook require explicit human approval before executing an action?",
            "options": [
                "Only when sending a notification email to the analyst",
                "Whenever the response action is high-impact, disruptive, or irreversible (such as blocking a corporate firewall gateway, disabling executive accounts, or isolating critical production servers)",
                "Human approval is never required in automated security operations",
                "Only for low-severity informational alerts"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Disruptive actions that can shut down business workflows or isolate servers must require human-in-the-loop authorization to prevent automated outages caused by false positives."
        },
        {
            "question": "What does 'idempotence' mean in the context of security orchestration and response playbooks?",
            "options": [
                "The playbook can only be executed by one user at a time",
                "The property that running the playbook multiple times with the same inputs produces the same result without unintended side effects or duplicate actions",
                "The playbook executes in less than one millisecond",
                "The playbook is written in pure Python"
            ],
            "correctAnswerIndex": 1,
            "explanation": "An idempotent playbook safely handles duplicate triggers: if an account is already locked or a firewall rule already exists, re-executing does not produce errors or corrupt state."
        },
        {
            "question": "Why should API credentials and secrets used by SOAR playbooks be stored in managed secret vaults (e.g., Azure Key Vault) rather than hardcoded in workflow definitions?",
            "options": [
                "Hardcoded credentials can be viewed by anyone with read access to the playbook, risk accidental exposure in logs, and cannot be rotated without breaking workflow code",
                "Because Key Vault increases the execution speed of the playbook",
                "Playbooks will crash if they contain more than 10 letters of text",
                "Cloud regulations require all playbooks to be anonymous"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Centralized secret management enables auditable access, automated key rotation, and granular access policies without exposing credentials in plaintext playbook definitions."
        }
    ],
    28: [
        {
            "question": "Why might a syntactically valid detection rule (SPL or KQL) fail to detect real adversary activity in production?",
            "options": [
                "Because the query language was written in capital letters",
                "Underlying schema changes (renamed fields), missing data pipelines, adversary evasion techniques (command obfuscation), or incorrect assumption of field values",
                "Syntactically valid rules never fail to detect attacks",
                "Because the rule was written in a text editor"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A rule may parse cleanly, but if the endpoint agent changed `ProcessCommandLine` to `CommandLine`, or if the adversary used Base64 encoding to bypass plain string matching, the rule fails silently."
        },
        {
            "question": "What is the primary advantage of authoring detection rules in the open-source Sigma format?",
            "options": [
                "Sigma rules can be converted into executable malware",
                "Sigma provides a generic, platform-agnostic rule standard that can be automatically translated into vendor-specific query languages (SPL, KQL, Elastic, QRadar)",
                "Sigma rules eliminate the need for logging agents",
                "Sigma was developed by the United Nations"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Sigma is the 'YARA for log files'—a standardized YAML representation of detection logic that automated compilers (like pySigma) convert into SPL, KQL, or other target SIEM syntaxes."
        },
        {
            "question": "Why is version control and a tested rollback plan mandatory in a detection engineering lifecycle?",
            "options": [
                "To ensure that if an updated detection rule floods the SOC with thousands of false alerts or consumes excessive search head compute, it can be instantly rolled back to the previous stable version",
                "Because cloud SIEMs delete rules that are not stored in Git",
                "To prevent analysts from viewing previous rule changes",
                "Rollback is only used when purchasing new hardware"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Managing detections as code with Git ensures full auditability, peer review approval, and the ability to immediately revert breaking rule changes that threaten SOC operations."
        }
    ],
    29: [
        {
            "question": "Why can a silent data pipeline failure be significantly more perilous to an enterprise than a flood of noisy alerts?",
            "options": [
                "Because missing data causes the computer monitor to flicker",
                "When data ingestion silently fails, entire security monitoring blind spots emerge where real intrusions, ransomware, and exfiltration occur completely undetected by the SIEM",
                "Data pipeline failures automatically delete the backup files",
                "Noisy alerts are more dangerous in all situations"
            ],
            "correctAnswerIndex": 1,
            "explanation": "A noisy alert still prompts investigation; silent data drops blind the SOC. Adversaries operating in unmonitored blind spots can dwell and execute without encountering any alarms."
        },
        {
            "question": "What is the economic and operational purpose of configuring data ingestion tiers (e.g., Analytics vs Basic/Auxiliary Logs) in Microsoft Sentinel?",
            "options": [
                "To allocate high-volume, low-security telemetry (such as raw firewall flows) to lower-cost storage tiers while reserving full interactive analytics and alerting for high-value security events",
                "To prevent users from searching data older than 24 hours",
                "To charge extra fees for each search executed",
                "Tiers only determine the visual theme of the portal"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Ingestion tiers allow organizations to store high-volume verbose data (NetFlow, VPC logs) at fraction of the cost for historical compliance, while routing high-fidelity security events to the interactive Analytics tier."
        },
        {
            "question": "Why should external API integrations interacting with a SIEM be granted strictly read-only scopes whenever possible?",
            "options": [
                "To prevent an external system or compromised API key from tampering with, deleting, or disabling critical detection rules, workspace configurations, or archived security telemetry",
                "Because read-only APIs consume less network bandwidth",
                "Cloud providers charge double for write permissions",
                "Write permissions are only supported on Linux servers"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Applying least privilege to API service principals protects against compromised third-party tokens being used by attackers to delete audit logs or deactivate defensive detection rules."
        }
    ],
    30: [
        {
            "question": "What critical body of evidence distinguishes a true multi-stage security incident from isolated benign system anomalies?",
            "options": [
                "The number of characters in the user's password",
                "Corroborating chronological evidence across multiple distinct log sources (e.g. initial authentication burst, followed by process execution, followed by abnormal DNS beacons or outbound network traffic)",
                "The incident being reported by an executive",
                "The event arriving from an IP address ending in .1"
            ],
            "correctAnswerIndex": 1,
            "explanation": "An isolated error is noise; an incident connects dots along the MITRE ATT&CK kill chain—e.g. failed logons -> successful logon -> encoded PowerShell -> C2 domain lookup -> lateral connection."
        },
        {
            "question": "How does a cross-platform detection engineer validate query equivalence between an SPL search and a KQL analytics rule?",
            "options": [
                "By running both queries against identical normalized test datasets and verifying that both produce the exact same entity counts, timestamp boundaries, and alert triggers without false discrepancies",
                "By checking that both queries have the same number of words",
                "By translating both queries into Python",
                "Query equivalence cannot be tested"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Validating cross-platform detections requires running both queries against verified synthetic or controlled test data to confirm matching detection sensitivity, entity extraction, and threshold behavior."
        },
        {
            "question": "What specific investigative finding in a capstone case should immediately trigger emergency escalation to incident response leads?",
            "options": [
                "A user forgetting their password once on a Monday morning",
                "Factual evidence of active process injection, ransomware staging, unauthorized credential dumping, or command execution from an anomalous external remote session",
                "A routine automated vulnerability scan during scheduled maintenance",
                "A workstation running low on temporary disk space"
            ],
            "correctAnswerIndex": 1,
            "explanation": "Immediate emergency escalation is required when evidence demonstrates active adversary execution, privilege escalation, credential theft (e.g. LSASS dumping), or preparations for ransomware deployment."
        }
    ]
}

def main():
    base_dir = r"C:\Users\dutch\.gemini\antigravity\worktrees\REA_Project\private_bug_bounty_library"
    modules_dir = os.path.join(base_dir, r"docs\courses\siem_zero_to_advanced\modules")
    
    module_files = sorted(glob.glob(os.path.join(modules_dir, "M*.md")))
    print(f"Found {len(module_files)} module files in {modules_dir}")
    
    course_uuid = "da000000-0000-4000-8000-000000000001"
    
    modules = []
    sql_modules = []
    sql_lessons = []
    
    total_minutes = 0
    
    for f in module_files:
        basename = os.path.basename(f)
        with open(f, "r", encoding="utf-8") as fp:
            content = fp.read()
            
        # Parse module number
        mod_num_m = re.search(r'M(\d+)_', basename)
        if not mod_num_m:
            continue
        mod_num = int(mod_num_m.group(1))
        
        # Parse title
        title_m = re.search(r'#\s+Module\s+\d+\s+—\s+([^\n]+)', content)
        raw_title = title_m.group(1).strip() if title_m else f"Module {mod_num:02d}"
        mod_title = f"Module {mod_num:02d} — {raw_title}"
        
        # Parse Track, Time, Level, Outcome
        track_m = re.search(r'\*\*Track:\*\*\s*([^\n]+)', content)
        track = track_m.group(1).strip() if track_m else "Foundation"
        
        time_m = re.search(r'\*\*Estimated learner time:\*\*\s*([^\n]+)', content)
        est_time = time_m.group(1).strip() if time_m else "4 hours"
        
        level_m = re.search(r'\*\*Level:\*\*\s*([^\n]+)', content)
        level = level_m.group(1).strip() if level_m else "Intermediate"
        
        outcome_m = re.search(r'## Outcome\s*\n\s*([^\n]+)', content)
        outcome = outcome_m.group(1).strip() if outcome_m else "Master security analysis techniques."
        
        mod_desc = f"{track} level track ({level}). Estimated effort: {est_time}. Outcome: {outcome}"
        
        mod_order = mod_num
        mod_uuid = f"da000000-0000-4000-8000-0000000001{mod_num:02d}"
        mod_id = f"mod-siem-m{mod_num:02d}"
        
        # Parse lessons
        # ### 01.1 What SIEM collects and why
        lesson_matches = list(re.finditer(r'###\s+(\d+\.\d+)\s+([^\n]+)(.*?)(?=(?:###|\n##|\Z))', content, re.DOTALL))
        
        # Parse YouTube video lessons
        yt_section_m = re.search(r'## YouTube video lessons \(required\)\s*\n\s*(.*?)(?=\n\n\*\*Video coverage|\n\n##)', content, re.DOTALL)
        yt_items = []
        if yt_section_m:
            raw_yt = yt_section_m.group(1).strip()
            # - **[Title](url)** — description
            for line in raw_yt.split("\n"):
                line = line.strip()
                if not line: continue
                m = re.search(r'\[([^\]]+)\]\((https?://(?:www\.)?youtube\.com/watch\?v=([a-zA-Z0-9_-]+)[^\)]*)\)(?:\s*—\s*(.*))?', line)
                if m:
                    yt_items.append({
                        "title": m.group(1).strip(),
                        "url": m.group(2).strip(),
                        "videoId": m.group(3).strip(),
                        "desc": m.group(4).strip() if m.group(4) else ""
                    })
        
        # Parse Guided SOC Lab
        lab_m = re.search(r'## Guided SOC lab\s*\n\s*\*\*Scenario:\*\*\s*([^\n]+)(.*?)(?=## Exit criteria|## Knowledge check)', content, re.DOTALL)
        scenario = ""
        lab_steps = []
        submit_evidence = ""
        if lab_m:
            scenario = lab_m.group(1).strip()
            lab_body = lab_m.group(2).strip()
            # Steps
            steps_m = re.search(r'\*\*Steps\*\*\s*\n\s*(.*?)(?=\*\*Submit as evidence:\*\*|\Z)', lab_body, re.DOTALL)
            if steps_m:
                for s in steps_m.group(1).strip().split("\n"):
                    s = s.strip()
                    if s:
                        lab_steps.append(re.sub(r'^\d+\.\s*', '', s))
            ev_m = re.search(r'\*\*Submit as evidence:\*\*\s*([^\n]+)', lab_body)
            if ev_m:
                submit_evidence = ev_m.group(1).strip()
                
        # Parse Exit criteria
        exit_crit = []
        exit_m = re.search(r'## Exit criteria / checklist\s*\n\s*(.*?)(?=## Knowledge check)', content, re.DOTALL)
        if exit_m:
            for line in exit_m.group(1).strip().split("\n"):
                line = line.strip()
                if line.startswith("- [ ]") or line.startswith("- [x]"):
                    exit_crit.append(line.replace("- [ ]", "").replace("- [x]", "").strip())
        if not exit_crit:
            exit_crit = [
                "Watched the assigned YouTube demonstrations and took detailed notes.",
                "Completed each lesson's post-video explanation and investigation prompt.",
                "Followed the lab steps using synthetic authorized telemetry.",
                "Saved the listed deliverables with timestamps and data source attribution."
            ]

        # Process each lesson in this module
        module_lessons = []
        for l_idx, lm in enumerate(lesson_matches):
            lesson_num_str = lm.group(1).strip() # e.g. "01.1"
            lesson_title_raw = lm.group(2).strip()
            lesson_body = lm.group(3).strip()
            
            l_order = l_idx + 1
            l_uuid = f"da000000-0000-4000-8000-00000001{mod_num:02d}{l_order:02d}"
            l_id = f"les-siem-m{mod_num:02d}-l{l_order:02d}"
            l_slug = f"m{mod_num:02d}-l{l_order}-{slugify(lesson_title_raw)}"
            
            # Map assigned video
            # If 2 videos: l1, l2 -> v0; l3, l4 -> v1
            # If 3 videos: l1 -> v0; l2, l3 -> v1; l4 -> v2
            assigned_yt = None
            if yt_items:
                if len(yt_items) == 1:
                    assigned_yt = yt_items[0]
                elif len(yt_items) == 2:
                    assigned_yt = yt_items[0] if l_order <= 2 else yt_items[1]
                elif len(yt_items) >= 3:
                    if l_order == 1:
                        assigned_yt = yt_items[0]
                    elif l_order in (2, 3):
                        assigned_yt = yt_items[1]
                    else:
                        assigned_yt = yt_items[2]
            
            video_id = assigned_yt["videoId"] if assigned_yt else "wY3I4kC532U"
            video_creator = assigned_yt["title"].split("—")[-1].strip() if assigned_yt and "—" in assigned_yt["title"] else "SOC Educator"
            
            # Duration: default 35 mins per lesson
            duration = 35
            total_minutes += duration
            
            lesson_title = f"Module {mod_num:02d} - Lesson {l_order}: {lesson_title_raw}"
            lesson_desc = f"Hands-on video-guided lesson exploring {lesson_title_raw}. Master essential SIEM concepts, SPL/KQL correlation patterns, and SOC defense workflows."
            
            objectives = [
                f"Master core competencies for {lesson_title_raw}.",
                "Analyze synthetic and live defensive event streams without overcalling compromise.",
                "Execute and evaluate detection logic against known false-positive baselines."
            ]
            
            tags = ["siem", "soc-analyst", track.lower(), f"module-{mod_num:02d}"]
            if "splunk" in mod_title.lower() or "spl" in mod_title.lower():
                tags.extend(["splunk", "spl"])
            if "sentinel" in mod_title.lower() or "kql" in mod_title.lower():
                tags.extend(["microsoft-sentinel", "kql"])
            if "hunting" in mod_title.lower():
                tags.append("threat-hunting")
            if "alerting" in mod_title.lower() or "detection" in mod_title.lower():
                tags.append("detection-engineering")
                
            skills_taught = [
                f"Defensive operational triage: {lesson_title_raw}",
                "Log normalization and timestamp boundary validation",
                "Telemetry-driven hypothesis formulation and testing",
                "Concise L1/L2 incident escalation documentation"
            ]
            
            # Rich Content
            rich_content = {
                "introduction": f"In this lesson ({lesson_title_raw}), we analyze core defensive techniques from {mod_title}. Follow along with the demonstration, observe event generation across sample telemetry, and practice evidence-first triage.",
                "prerequisites": [
                    "Access to SIEM training lab (Splunk or Microsoft Sentinel)",
                    "Synthetic datasets (auth_events.csv, dns_events.csv, web_events.csv)"
                ],
                "theorySections": [
                    {
                        "title": f"Investigation Framework: {lesson_title_raw}",
                        "content": f"Security operations centers process millions of raw records daily. In {lesson_title_raw}, the analyst must isolate genuine anomalies from ambient administrative noise using structured search filters, temporal joins, and behavioral baselines.",
                        "keyPoints": [
                            f"Focus on factual telemetry evidence before drawing adversarial hypotheses for {lesson_title_raw}.",
                            "Account for dynamic host identifiers, DHCP reallocations, and clock drift.",
                            "Document remaining evidence blind spots in your analyst notes."
                        ]
                    }
                ],
                "stepByStepProcedures": [
                    {
                        "step": 1,
                        "title": "Review Video Demonstration",
                        "instruction": f"Watch the assigned lesson video, noting specific query operators, UI workflows, and command parameters demonstrated for {lesson_title_raw}.",
                        "expectedOutcome": "Detailed notes on query filters and investigation pivots."
                    },
                    {
                        "step": 2,
                        "title": "Query & Filter Sample Telemetry",
                        "instruction": "Open your SIEM search interface or load the synthetic dataset, executing the scoped query to inspect target fields and timestamps.",
                        "expectedOutcome": "Tabular results showing timestamps, entity keys, and event actions."
                    },
                    {
                        "step": 3,
                        "title": "Evaluate Alternative Explanations",
                        "instruction": "Identify at least two non-malicious operational causes (such as scheduled tasks, network maintenance, or expired service credentials) that could produce the observed pattern.",
                        "expectedOutcome": "Balanced triage notes distinguishing benign positives from genuine attacks."
                    }
                ],
                "expectedObservations": [
                    "Clean separation between factual raw logs and analytical hypotheses.",
                    "Consistent timestamps normalized to UTC across correlated records.",
                    "Calculated failure-to-success ratios highlighting true anomalies."
                ],
                "commonMistakes": [
                    "Asserting system compromise based on an isolated threshold breach.",
                    "Failing to specify time range boundaries in queries, causing slow unconstrained scans.",
                    "Recommending disruptive server containment without managerial authorization."
                ],
                "securityRelevance": f"Mastery of {lesson_title_raw} prevents alert fatigue and ensures defensible, audit-safe incident response in enterprise SOC environments.",
                "practicalExercise": {
                    "title": f"Hands-on Lab Exercise: {lesson_title_raw}",
                    "objective": f"Apply {lesson_title_raw} to the module scenario using authorized synthetic datasets.",
                    "instructions": [
                        f"1. Before watching: write down your existing knowledge and target question about {lesson_title_raw}.",
                        "2. Actively take notes on command syntax and UI investigation steps.",
                        "3. Summarize findings in your analyst worksheet with one real-world SOC example and one operational limitation."
                    ]
                },
                "summary": f"{lesson_title_raw} establishes essential rigor for defensive practitioners, bridging raw log syntax with professional incident triage and escalation standards.",
                "furtherReading": [
                    {
                        "title": "Splunk Official Free Training",
                        "url": "https://www.splunk.com/en_us/training/free-courses/overview.html",
                        "description": "Self-paced training modules for core Splunk concepts and SPL."
                    },
                    {
                        "title": "Microsoft Sentinel 21-Part Skill-Up Training",
                        "url": "https://learn.microsoft.com/en-us/azure/sentinel/skill-up-resources",
                        "description": "Official deep reference covering workspaces, connectors, KQL, and analytics."
                    },
                    {
                        "title": "MITRE ATT&CK Enterprise Matrix",
                        "url": "https://attack.mitre.org/",
                        "description": "Comprehensive knowledge base of adversary tactics and techniques based on real-world observations."
                    }
                ]
            }
            
            lesson_obj = {
                "id": l_id,
                "slug": l_slug,
                "title": lesson_title,
                "description": lesson_desc,
                "youtubeVideoId": video_id,
                "videoAttribution": {
                    "creator": video_creator,
                    "platform": "youtube"
                },
                "durationMinutes": duration,
                "order": l_order,
                "moduleTitle": mod_title,
                "objectives": objectives,
                "tags": tags,
                "skillsTaught": skills_taught,
                "richContent": rich_content
            }
            
            module_lessons.append(lesson_obj)
            
            sql_lessons.append({
                "uuid": l_uuid,
                "module_uuid": mod_uuid,
                "slug": l_slug,
                "title": lesson_title,
                "description": lesson_desc,
                "youtube_video_id": video_id,
                "duration_minutes": duration,
                "order_index": l_order,
                "objectives": objectives,
                "tags": tags,
                "skills_taught": skills_taught
            })
            
        # Practical lab object
        tasks = []
        for idx, step_text in enumerate(lab_steps):
            tasks.append({
                "id": f"task-{mod_num:02d}-{idx+1}",
                "description": step_text,
                "hint": "Refer to the module's theory notes and use synthetic sample data from /datasets/siem/.",
                "filterSuggestion": "index=soc_lab | head 50" if "Splunk" in track or "Foundation" in track else "SecurityEvent | take 50"
            })
        if not tasks:
            tasks = [
                {"id": f"task-{mod_num:02d}-1", "description": "Inspect sample events and normalize timestamps.", "hint": "Ensure all event times are represented in UTC."},
                {"id": f"task-{mod_num:02d}-2", "description": "Formulate testable query filters.", "hint": "Scope by index and explicit time range."},
                {"id": f"task-{mod_num:02d}-3", "description": "Document triage findings and evidence handoff.", "hint": "Include who, what, when, and next checks."}
            ]
            
        practical_lab = {
            "id": f"lab-siem-m{mod_num:02d}",
            "title": f"Guided SOC Lab: {raw_title}",
            "objective": outcome,
            "toolsRequired": ["Splunk or Microsoft Sentinel", "Text Editor or Spreadsheet", "Synthetic CSV Datasets"],
            "pcapSource": {
                "fileName": "synthetic-siem-datasets.zip",
                "fileUrl": "/datasets/siem/auth_events.csv"
            },
            "difficulty": "beginner" if "Beginner" in level else "intermediate" if "Intermediate" in level else "advanced",
            "estimatedMinutes": 60,
            "instructions": lab_steps if lab_steps else [
                "Load authorized training datasets into your lab workspace.",
                "Execute the target investigation queries.",
                "Record findings in your analyst handoff worksheet."
            ],
            "tasks": tasks,
            "evidenceWorksheet": [
                {
                    "field": "investigation_scenario",
                    "prompt": f"Document the scenario and evidence required for {raw_title}.",
                    "expectedEvidenceType": "text"
                },
                {
                    "field": "query_deliverable",
                    "prompt": "Provide the saved SPL or KQL queries used during your investigation.",
                    "expectedEvidenceType": "code"
                },
                {
                    "field": "analyst_handoff",
                    "prompt": f"Write your evidence-based SOC handoff memo ({submit_evidence or 'Summary of observed telemetry, confidence, and recommended next checks'}).",
                    "expectedEvidenceType": "text"
                }
            ],
            "questions": [
                {
                    "question": f"What primary telemetry evidence supports your conclusion in {raw_title}?",
                    "options": [
                        "Factual timestamps, normalized entity identities, and observed action codes in the ingested logs",
                        "A subjective feeling that an attack occurred",
                        "The color of the SIEM dashboard",
                        "A news article about a breach at another company"
                    ],
                    "correctAnswerIndex": 0,
                    "explanation": "Defensible SOC analysis relies exclusively on factual telemetry records with verified timestamps and normalized entity keys."
                }
            ],
            "completionCriteria": exit_crit
        }
        
        # Module quiz
        q_data = MODULE_QUIZZES.get(mod_num, [])
        quiz = {
            "title": f"Knowledge Check: {mod_title}",
            "passingScorePercent": 67,
            "questions": [
                {
                    "question": q["question"],
                    "options": q["options"],
                    "correctAnswerIndex": q["correctAnswerIndex"],
                    "explanation": q["explanation"],
                    "difficulty": "beginner" if "Beginner" in level else "intermediate" if "Intermediate" in level else "advanced"
                }
                for q in q_data
            ]
        }
        
        mod_obj = {
            "id": mod_id,
            "title": mod_title,
            "description": mod_desc,
            "order": mod_order,
            "lessons": module_lessons,
            "practicalLab": practical_lab,
            "quiz": quiz
        }
        
        # Module 30 Capstone
        if mod_num == 30:
            capstone = {
                "id": "capstone-siem-cross-platform-portfolio",
                "title": "Final Capstone: Splunk and Microsoft Sentinel Cross-Platform SOC Portfolio",
                "scenario": "Execute end-to-end defensive triage and detection engineering of a multi-stage fictional incident using both SPL and KQL. Correlate authentication failures, unusual DNS query cadences, suspicious HTTP POST volumes, and abnormal process execution. Construct a multi-source chronological timeline, design testable detection rules with positive/negative fixtures, evaluate false-positive controls, map behaviors to MITRE ATT&CK, and compile a 5–8 page executive and technical SOC case report.",
                "pcapSource": {
                    "fileName": "siem-capstone-datasets.zip",
                    "fileUrl": "/datasets/siem/auth_events.csv"
                },
                "totalMarks": 100,
                "passingScore": 75,
                "rubric": [
                    {
                        "category": "Telemetry Inventory, Parsing and Time Handling",
                        "marks": 15,
                        "criteria": [
                            "Comprehensive inventory of auth, DNS, web, and endpoint sources with parsed fields and time zones",
                            "All timestamps normalized to UTC with ingestion delay and time skew accounted for"
                        ]
                    },
                    {
                        "category": "SPL and KQL Analytical Correctness",
                        "marks": 20,
                        "criteria": [
                            "At least two performant SPL queries and two equivalent KQL queries correctly answering who, what, when, and where",
                            "Proper use of index/table scoping, time boundaries, aggregation, and null handling"
                        ]
                    },
                    {
                        "category": "Multi-Source Incident Timeline & Confidence",
                        "marks": 15,
                        "criteria": [
                            "Chronological UTC timeline linking authentication, DNS, web, and host activity",
                            "Clear distinction between observed factual evidence and investigative hypotheses with confidence levels"
                        ]
                    },
                    {
                        "category": "Detection Logic, Test Cases & False Positives",
                        "marks": 20,
                        "criteria": [
                            "Production-grade detection rule specifications with threshold, lookback window, and entity mapping",
                            "Documented positive and negative test cases with at least three plausible benign alternative explanations"
                        ]
                    },
                    {
                        "category": "MITRE ATT&CK Mapping Linked to Evidence",
                        "marks": 10,
                        "criteria": [
                            "Explicit mapping to ATT&CK tactics and techniques citing concrete observed log records",
                            "No unsupported assertions or generic technique claims without evidence"
                        ]
                    },
                    {
                        "category": "Safety, Reproducibility & Limitations",
                        "marks": 10,
                        "criteria": [
                            "Strict adherence to safe non-destructive defensive analysis using synthetic telemetry",
                            "Honest identification of unmonitored blind spots and telemetry gaps"
                        ]
                    },
                    {
                        "category": "L1 Triage Handoff & Executive Reporting",
                        "marks": 10,
                        "criteria": [
                            "Concise executive summary for leadership and detailed technical detection engineering appendix",
                            "Clear, actionable escalation handoff note with prioritized containment recommendations"
                        ]
                    }
                ],
                "submissionSections": [
                    {
                        "id": "sec-telemetry-inventory",
                        "title": "Telemetry Inventory & Ingestion Schema",
                        "prompt": "Provide your data dictionary detailing auth_events, dns_events, web_events, timestamp extraction format, and normalization steps.",
                        "maxMarks": 15
                    },
                    {
                        "id": "sec-cross-platform-queries",
                        "title": "SPL and KQL Cross-Platform Investigation Queries",
                        "prompt": "Submit at least two SPL queries and two equivalent KQL queries with execution rationale and output analysis.",
                        "maxMarks": 20
                    },
                    {
                        "id": "sec-incident-timeline",
                        "title": "Multi-Source Incident Timeline & Entity Correlation",
                        "prompt": "Submit your chronological UTC timeline linking the user, host, IP addresses, and actions with factual vs inferred labels.",
                        "maxMarks": 15
                    },
                    {
                        "id": "sec-detection-engineering",
                        "title": "Detection Rules, Test Fixtures & False-Positive Review",
                        "prompt": "Provide the detection specification (SPL and KQL), positive/negative test results, and analysis of three benign explanations.",
                        "maxMarks": 20
                    },
                    {
                        "id": "sec-mitre-mapping",
                        "title": "MITRE ATT&CK Technique Mapping & Telemetry Gaps",
                        "prompt": "Map observed actions to ATT&CK techniques with cited log proof and document data sources not present.",
                        "maxMarks": 10
                    },
                    {
                        "id": "sec-safety-reproducibility",
                        "title": "Safety Statement & Lab Reproducibility Guide",
                        "prompt": "Document ethical boundaries, non-destructive lab procedures, and reproducibility steps.",
                        "maxMarks": 10
                    },
                    {
                        "id": "sec-executive-handoff",
                        "title": "Executive Summary & Tier 1 Handoff Memo",
                        "prompt": "Provide your 1-page L1 triage handoff note and concise executive summary ready for SOC leadership.",
                        "maxMarks": 10
                    }
                ]
            }
            mod_obj["capstoneAssessment"] = capstone
            
        modules.append(mod_obj)
        
        sql_modules.append({
            "uuid": mod_uuid,
            "title": mod_title,
            "description": mod_desc,
            "order_index": mod_order
        })

    course_data = {
        "id": "course-siem-zero-to-advanced",
        "slug": "siem-zero-to-advanced",
        "title": "SIEM for Cybersecurity: Zero to Advanced",
        "shortDescription": "A 30-module, video-guided SIEM operations and detection engineering curriculum with Splunk and Microsoft Sentinel, 120 lessons, hands-on SOC labs, SPL, KQL, threat hunting, and an end-to-end capstone portfolio.",
        "description": "A comprehensive, hands-on 30-module defensive cybersecurity curriculum designed for aspiring and practicing SOC L1/L2 analysts, threat hunters, and detection engineers. Master enterprise SIEM architecture across both Splunk and Microsoft Sentinel: raw log ingestion, parsing, normalization, and search; production SPL commands (stats, eval, timechart, rex, coalesce) and KQL syntax (where, summarize, project, join, make-series, ASIM); authentication anomalies and brute-force triage; DNS tunneling and rare domain analysis; web proxy and firewall flow correlation; ransomware and endpoint DFIR tracing; Splunk Enterprise Security risk-based alerting (RBA); Microsoft Sentinel data connectors, analytics rules, incident graphs, UEBA, and hunting notebooks; approval-aware SOAR playbooks; detection-as-code and Sigma rule lifecycles; SIEM ingestion health, performance optimization, and cloud cost management; culminating in an end-to-end cross-platform SOC capstone portfolio project.",
        "domains": ["soc-blue-team", "dfir", "fundamentals"],
        "tags": [
            "siem",
            "splunk",
            "microsoft-sentinel",
            "soc-analyst",
            "kql",
            "spl",
            "detection-engineering",
            "threat-hunting",
            "incident-response",
            "soar"
        ],
        "difficulty": "intermediate",
        "thumbnailUrl": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        "estimatedDuration": "30 modules (148 hours)",
        "totalDurationMinutes": total_minutes,
        "instructor": {
            "name": "CyberTube SIEM Curators & Open SOC Community",
            "title": "SIEM & SOC Detection Engineers",
            "organization": "Splunk, Microsoft Security Community, TryHackMe & Soft Mania"
        },
        "prerequisites": [
            "Basic understanding of operating system concepts (Windows and Linux logs)",
            "Familiarity with foundational networking protocols (TCP/IP, DNS, HTTP)",
            "Commitment to ethical defensive investigation and authorized lab telemetry"
        ],
        "learningObjectives": [
            "Differentiate security telemetry, events, alerts, and incidents in a SOC operating model",
            "Ingest, parse, normalize, and query diverse logs in Splunk and Microsoft Sentinel",
            "Write production-grade SPL and KQL queries for triage, statistical analysis, and detection",
            "Investigate authentication anomalies, credential spraying, DNS tunneling, web exploitation, and ransomware",
            "Construct multi-source incident timelines and execute hypothesis-driven threat hunts",
            "Map detections and investigative findings to the MITRE ATT&CK Enterprise matrix",
            "Design risk-based alerting (RBA) models and ASIM-normalized analytics rules",
            "Build, tune, and test detection rules with measured false-positive controls",
            "Design safe, approval-aware SOAR playbooks and automation workflows",
            "Complete an end-to-end cross-platform SOC capstone report in both SPL and KQL"
        ],
        "featured": True,
        "track": "cybersecurity",
        "modules": modules
    }
    
    # Write TS Course file
    ts_content = "import { Course } from '../types/course';\n\n"
    ts_content += f"export const SIEM_ZERO_TO_ADVANCED_COURSE: Course = {json.dumps(course_data, indent=2)};\n\n"
    ts_content += "SIEM_ZERO_TO_ADVANCED_COURSE.capstone = SIEM_ZERO_TO_ADVANCED_COURSE.modules[29]?.capstoneAssessment;\n"
    
    out_ts_path = os.path.join(base_dir, "src/data/siem-zero-to-advanced-course.ts")
    with open(out_ts_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"Written {out_ts_path} successfully! ({len(modules)} modules, {len(sql_lessons)} lessons)")

    # Build SQL migration
    def quote_sql(val):
        if val is None:
            return "NULL"
        val_str = str(val).replace("'", "''")
        return f"'{val_str}'"
        
    def to_pg_array(arr):
        if not arr:
            return "'{}'::TEXT[]"
        escaped = []
        for x in arr:
            x_clean = str(x).replace("'", "''")
            escaped.append(f"'{x_clean}'")
        return f"ARRAY[{', '.join(escaped)}]::TEXT[]"

    sql_lines = [
        "-- =============================================================================",
        "-- CYBERTUBE: SEED SIEM ZERO TO ADVANCED COMPLETE COURSE",
        "-- =============================================================================",
        "-- Description:",
        "-- Idempotently seeds the 30-module SIEM Zero to Advanced course,",
        "-- all 30 modules, and all 120 video lessons into the Supabase database.",
        "-- =============================================================================",
        "",
        "DO $$",
        f"DECLARE",
        f"  v_course_id CONSTANT UUID := '{course_uuid}';",
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
        "    'siem-zero-to-advanced',",
        f"    {quote_sql(course_data['title'])},",
        f"    {quote_sql(course_data['shortDescription'])},",
        f"    {quote_sql(course_data['description'])},",
        "    'intermediate',",
        f"    {quote_sql(course_data['estimatedDuration'])},",
        f"    {total_minutes},",
        f"    {quote_sql(course_data['thumbnailUrl'])},",
        f"    {quote_sql(course_data['instructor']['name'])},",
        f"    {quote_sql(course_data['instructor']['title'])},",
        f"    {quote_sql(course_data['instructor']['organization'])},",
        "    'published',",
        f"    {to_pg_array(course_data['tags'])},",
        f"    {to_pg_array(course_data['prerequisites'])},",
        f"    {to_pg_array(course_data['learningObjectives'])},",
        "    'cybersecurity',",
        f"    {to_pg_array(course_data['domains'])},",
        "    TRUE",
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
        
    sql_lines.append("  -- 3. Insert/Update 120 Lessons")
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
    
    migration_file = os.path.join(base_dir, "supabase/migrations/20261120000000_seed_siem_zero_to_advanced_course.sql")
    with open(migration_file, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines))
    print(f"Written {migration_file} successfully! ({len(sql_lines)} lines)")

if __name__ == "__main__":
    main()
