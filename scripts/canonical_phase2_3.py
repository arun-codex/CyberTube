# Append Phase 2 (11-20) and Phase 3 (21-30) to CANONICAL_MODULES_DEF

PHASE_2_AND_3_MODULES = [
    # PHASE 2: Communication, Security & Firmware (11–20)
    {
        "order": 11,
        "title": "UART, I2C & SPI Security",
        "phase": "Core",
        "hours": 6,
        "aim": "Analyze hardware serial bus protocols, sniff unencrypted serial debug outputs, scan I2C slave addresses, probe SPI chip-select lines, and disable production debug surfaces.",
        "prereq": "Module 10: Secure Smart-Room Monitoring Project",
        "task": "Connect an I2C OLED display or sensor and map active bus addresses; inspect UART serial traffic with 3.3V logic analyzer and document debug exposure risks.",
        "output": "I2C bus address scan report + UART debug port exposure audit",
        "lessons": [
            {
                "title": "UART Serial Communications, Baud Rates & Data Exposure",
                "activity": "Understand asynchronous serial framing (start bit, 8 data bits, parity, stop bit, baud rate); identify how unauthenticated root shells and plaintext logs leak over TX/RX pins.",
                "practice": "Connect a 3.3V USB-UART adapter to ESP32 TXD0/RXD0; observe bootloader output and interactive REPL console at 115200 baud.",
                "check": "Learner can identify UART pin connections (TX, RX, GND) and configure terminal emulator parameters to capture serial telemetry cleanly."
            },
            {
                "title": "I2C Bus Architecture, Address Probing & Clock Stretching",
                "activity": "Examine Inter-Integrated Circuit (I2C) master-slave communication on SDA and SCL lines with 4.7kΩ pull-up resistors; understand 7-bit device addressing and bus collision.",
                "practice": "Run an I2C scanner firmware sketch on ESP32; detect attached peripheral addresses (e.g. 0x3C for OLED, 0x76 for BME280).",
                "check": "Scanner accurately detects attached hardware addresses without bus lockups or invalid ACK timeouts."
            },
            {
                "title": "SPI High-Speed Bus Architecture & Chip Select Sniffing",
                "activity": "Analyze Serial Peripheral Interface (SPI) full-duplex synchronous operation using MOSI, MISO, SCK, and active-low Chip Select (CS) lines up to 80MHz; evaluate eavesdropping risks.",
                "practice": "Probe SPI communication between ESP32 and an SPI flash memory chip or display module using a logic analyzer; decode transmitted byte stream.",
                "check": "Logic analyzer trace clearly captures clock transitions and decodes SPI data packets correlated with CS assertion."
            },
            {
                "title": "Hardware Bus Protection, MUX Lockdown & Debug Silencing",
                "activity": "Implement firmware-level countermeasures to secure exposed serial buses: disable runtime serial output in production builds, remap UART pins, and enforce password authentication on serial CLI.",
                "practice": "Configure conditional compilation macros (`#ifndef DEBUG`) to strip all `Serial.print` calls from release binaries and disable boot ROM serial logging.",
                "check": "Production firmware boots silently over TX pins; unauthorized terminal access yields no data leakage or command shell."
            }
        ]
    },
    {
        "order": 12,
        "title": "Credentials, Device Identity & Secret Storage",
        "phase": "Core",
        "hours": 6,
        "aim": "Eliminate hardcoded credentials from firmware source, implement secure Non-Volatile Storage (NVS), generate per-device secrets, and design key rotation mechanisms.",
        "prereq": "Module 11: UART, I2C & SPI Security",
        "task": "Refactor a vulnerable firmware with hardcoded credentials to use encrypted NVS partition and unique per-device identity tokens.",
        "output": "Refactored firmware repo + secret storage security architecture diagram",
        "lessons": [
            {
                "title": "Hardcoded Firmware Credentials & Static String Extraction",
                "activity": "Analyze the systemic risks of embedding plaintext Wi-Fi PSKs, MQTT passwords, and API secret tokens directly in C/C++ firmware headers; extract secrets from compiled binaries.",
                "practice": "Compile a test sketch with hardcoded credentials; run `strings` on the resulting `.bin` file to locate plaintext keys.",
                "check": "Learner demonstrates how easily static analysis exposes hardcoded credentials embedded in unencrypted firmware binaries."
            },
            {
                "title": "Non-Volatile Storage (NVS) & Encrypted Key-Value Partitions",
                "activity": "Explore the ESP32 NVS partition architecture; configure the NVS encryption feature using AES-XTS-256 keys stored in eFuse or external hardware secure element.",
                "practice": "Write and retrieve device configuration parameters (Wi-Fi credentials, device UUID) using the `Preferences.h` / `nvs_flash` API.",
                "check": "Configuration data persists reliably across power cycles; raw flash dumps show encrypted ciphertext rather than plaintext strings."
            },
            {
                "title": "Unique Per-Device Identities & Cloud Provisioning Tokens",
                "activity": "Design unique per-device cryptographic identities derived from factory MAC addresses, chip serial numbers, and cryptographic device certificates.",
                "practice": "Generate a unique device serial identifier and provisioning key hash during factory calibration routine.",
                "check": "Every provisioned device possesses a distinct identity; compromising one device key does not compromise the broader fleet."
            },
            {
                "title": "Credential Rotation, Revocation Lists & Negative Testing",
                "activity": "Implement a secure credential rotation protocol allowing cloud brokers to update device authentication tokens without firmware re-flashing; test revoked token rejection.",
                "practice": "Trigger an automated token rotation over secure channel; verify device switches to new secret and rejects connections using deprecated keys.",
                "check": "Device successfully authenticates with new credential; revoked credential receives immediate HTTP/MQTT 401 Unauthorized."
            }
        ]
    },
    {
        "order": 13,
        "title": "TLS, Certificates & Secure Messaging",
        "phase": "Core",
        "hours": 6,
        "aim": "Implement Transport Layer Security (TLS 1.2/1.3), establish a private certificate authority (CA), enforce strict X.509 certificate validation on ESP32, and prevent MITM attacks.",
        "prereq": "Module 12: Credentials, Device Identity & Secret Storage",
        "task": "Portfolio Project 2: Establish a verified TLS-secured MQTTS connection from ESP32 to Mosquitto broker on port 8883; verify rejection of self-signed rogue certificates.",
        "output": "Portfolio Project 2 package: OpenSSL CA scripts, TLS client firmware, and Wireshark PCAP proving encryption",
        "lessons": [
            {
                "title": "TLS Fundamentals, X.509 Certificates & Trust Chains",
                "activity": "Understand TLS handshake architecture, asymmetric key exchange (ECDHE), symmetric session encryption (AES-GCM), and hierarchical Public Key Infrastructure (Root CA -> Intermediate -> Leaf).",
                "practice": "Inspect certificate hierarchy, Subject Alternative Names (SAN), and expiration dates of an SSL certificate using OpenSSL CLI.",
                "check": "Learner can explain how root certificate validation prevents Man-In-The-Middle (MITM) traffic interception."
            },
            {
                "title": "Creating a Private Lab Certificate Authority (CA) & Broker Certs",
                "activity": "Use OpenSSL to generate a private 4096-bit Root CA, issue a broker certificate for `mosquitto.lab.local`, and configure Mosquitto for TLS listener on port 8883.",
                "practice": "Generate CA private key, CA certificate, broker CSR, and sign broker certificate with appropriate SAN IP and DNS extensions.",
                "check": "Mosquitto broker initializes on port 8883 with TLS active and successfully loads server private key and certificate chain."
            },
            {
                "title": "Enforcing Mutual Authentication & Root CA Verification in ESP32",
                "activity": "Embed the Root CA certificate into ESP32 firmware using `WiFiClientSecure`; configure strict certificate validation (`setCACert`), and enforce hostname verification.",
                "practice": "Connect ESP32 to `mqtts://broker.lab.local:8883`; verify successful TLS handshake and rejection of spoofed servers.",
                "check": "Client establishes encrypted session with legitimate broker; connection is aborted immediately if broker presents an untrusted certificate."
            },
            {
                "title": "Encrypted vs Plaintext Network Traces & MITM Verification",
                "activity": "Capture and compare network traffic in Wireshark for MQTT port 1883 (plaintext) vs port 8883 (TLS); verify application data is fully obfuscated.",
                "practice": "Record a PCAP file containing both unencrypted and TLS-encrypted MQTT messages; verify TLS payload appears as high-entropy `Application Data`.",
                "check": "PCAP analysis confirms that sensor telemetry, device credentials, and topic names cannot be read from the TLS stream."
            }
        ]
    },
    {
        "order": 14,
        "title": "Firmware Updates, Secure Boot & OTA",
        "phase": "Core",
        "hours": 6,
        "aim": "Master Over-The-Air (OTA) firmware update lifecycles, dual-partition flash layouts, cryptographic signature verification, anti-rollback protection, and recovery failover.",
        "prereq": "Module 13: TLS, Certificates & Secure Messaging",
        "task": "Build and deploy a signed dual-partition OTA firmware update; verify rollback mechanism upon simulated boot fault and prove anti-rollback enforcement.",
        "output": "OTA update deployment package + flash partition map and rollback verification log",
        "lessons": [
            {
                "title": "Flash Partition Layouts, Bootloader & OTA Dual-Slot Architecture",
                "activity": "Explore ESP32 partition tables (`partitions.csv`); understand factory, `ota_0`, `ota_1`, and `otadata` slots used for safe dual-bank A/B firmware swapping.",
                "practice": "Create a custom partition table allocating dual 1.5MB OTA app partitions and an encrypted NVS partition; flash to device.",
                "check": "Device boots from active slot; `esp_ota_get_running_partition` accurately identifies current boot partition address."
            },
            {
                "title": "Building & Deploying Safe Local Over-The-Air (OTA) Updates",
                "activity": "Implement an HTTP/HTTPS OTA update client in firmware (`esp_https_ota`); download new firmware images from an internal lab server and flash to the inactive slot.",
                "practice": "Build version 1.0.1 firmware; upload over local Wi-Fi to a running ESP32 node and observe the automated reboot into the updated partition.",
                "check": "Firmware writes completely to secondary partition, passes integrity checks, and executes cleanly upon system reboot."
            },
            {
                "title": "Cryptographic Signatures, Secure Boot & Anti-Rollback Protections",
                "activity": "Understand the critical difference between integrity hashes (SHA-256) and asymmetric cryptographic signatures (RSA-3072 / ECDSA); analyze anti-rollback security version counters.",
                "practice": "Sign a firmware image using a private signing key; simulate flashing an unsigned image and observe bootloader rejection.",
                "check": "Bootloader verifies digital signature before setting boot flag; unsigned or downgraded firmware is rejected and prevented from executing."
            },
            {
                "title": "Firmware Rollback Recovery, Provenance & Safe Brick Prevention",
                "activity": "Implement self-test diagnostic logic; if updated firmware fails to validate network or sensor health within 60 seconds, trigger `esp_ota_mark_app_invalid_rollback_and_reboot`.",
                "practice": "Flash a deliberately broken firmware update; observe automatic rollback to the previous known-good firmware slot.",
                "check": "Device automatically reverts to functional prior partition without physical technician intervention or device bricking."
            }
        ]
    },
    {
        "order": 15,
        "title": "Wireshark for IoT Security",
        "phase": "Core",
        "hours": 6,
        "aim": "Capture, filter, and analyze IoT network traffic using Wireshark; baseline normal device communications, identify cleartext secrets, and detect anomalous network activity.",
        "prereq": "Module 14: Firmware Updates, Secure Boot & OTA",
        "task": "Portfolio Project 3: Capture an authorized IoT communication PCAP trace; baseline DNS/NTP/MQTT/TLS traffic, detect simulated beaconing anomalies, and document findings.",
        "output": "Portfolio Project 3 package: Annotated PCAP file, Wireshark filter library, and defensive anomaly report",
        "lessons": [
            {
                "title": "Passive Packet Capture Methodologies in IoT Lab Networks",
                "activity": "Configure network traffic capture for embedded devices using managed switch port mirroring (SPAN), Wi-Fi monitor mode, or host-only virtual bridge interfaces.",
                "practice": "Set up a packet capture interface targeting the ESP32 IP address; capture complete device network initialization and DHCP lease renewal.",
                "check": "PCAP file captures complete bidirectional packet streams with accurate microsecond timestamps and zero dropped frames."
            },
            {
                "title": "Advanced Display Filters for IoT Protocols (DNS, NTP, MQTT, HTTP)",
                "activity": "Construct targeted Wireshark display filters (`mqtt.msgtype`, `dns.flags.response`, `http.request.method`) to isolate specific protocol conversations.",
                "practice": "Apply display filters to extract MQTT `CONNECT` packet parameters, keepalive timers, and DNS query response latencies.",
                "check": "Filter library isolates target traffic streams instantly without manual packet-by-packet scrolling."
            },
            {
                "title": "Establishing Normal Communication Baselines for Embedded Nodes",
                "activity": "Calculate statistical baselines for device network behavior: connection frequency, average packet size, destination IP/port distribution, and protocol ratios.",
                "practice": "Generate a 1-hour traffic summary report using `tshark` or Wireshark IO Graphs; identify regular heartbeat telemetry intervals.",
                "check": "Baseline profile clearly defines expected bandwidth, port usage (8883, 123, 53), and timing tolerance for the device."
            },
            {
                "title": "Detecting Telemetry Anomalies, Cleartext Leaks & Rogue Connections",
                "activity": "Analyze PCAP traces for indicators of compromise: unexpected outbound DNS queries, unencrypted credential strings, DNS tunneling, and irregular beaconing intervals.",
                "practice": "Inspect an unknown sample PCAP; identify an unencrypted HTTP POST sending device MAC and internal network configuration to an external IP.",
                "check": "Learner locates the exact frame containing the cleartext data leak and documents the offending packet headers and payload offset."
            }
        ]
    },
    {
        "order": 16,
        "title": "IoT Threat Modeling",
        "phase": "Core",
        "hours": 6,
        "aim": "Apply structured threat modeling methodologies (STRIDE, OWASP IoT Top 10) to connected devices, map physical and logical attack surfaces, and prioritize mitigations.",
        "prereq": "Module 15: Wireshark for IoT Security",
        "task": "Produce a comprehensive STRIDE threat model and attack surface assessment for the Smart-Room Monitoring System built in Module 10.",
        "output": "STRIDE threat model matrix + prioritized defensive mitigation roadmap",
        "lessons": [
            {
                "title": "Asset Inventory & Bill of Materials (BOM) Decomposition",
                "activity": "Catalog all physical, firmware, network, and data assets in an IoT deployment; decompose hardware sub-assemblies and third-party software dependencies.",
                "practice": "Create a complete asset inventory table for an IoT camera or smart thermostat, tracking sensitivity classification and replacement cost.",
                "check": "Inventory captures all hardware interfaces, memory chips, network services, and stored credentials without omissions."
            },
            {
                "title": "Mapping Attack Surfaces & Trust Boundaries",
                "activity": "Identify all points of external interaction: physical test points, radio interfaces (Wi-Fi, BLE), local network services, cloud APIs, and mobile app channels.",
                "practice": "Construct a data flow diagram (DFD) showing process nodes, data stores, external entities, and cross-boundary communication lines.",
                "check": "All trust boundaries (e.g. physical device casing, local LAN vs Internet, tenant isolation) are clearly demarcated."
            },
            {
                "title": "Applying STRIDE & OWASP IoT Top 10 to Embedded Systems",
                "activity": "Systematically evaluate each threat category: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege against IoT components.",
                "practice": "Map the 10 vulnerabilities of the OWASP IoT Top 10 (weak passwords, insecure ecosystem interfaces, insecure firmware) to specific DFD elements.",
                "check": "Each identified threat is linked to a concrete attack vector, impacted asset, and affected CIA/safety property."
            },
            {
                "title": "Risk Prioritization & Defensive Mitigation Engineering",
                "activity": "Score identified threats using DREAD or CVSS 3.1 criteria; translate high-priority risks into actionable hardware, firmware, and network defensive controls.",
                "practice": "Develop an engineering mitigation backlog ranking risks by exploitability, safety impact, and implementation cost.",
                "check": "Mitigation roadmap provides concrete technical recommendations (e.g. enable flash encryption, enforce TLS) rather than vague policies."
            }
        ]
    },
    {
        "order": 17,
        "title": "Wireless IoT Security",
        "phase": "Core",
        "hours": 6,
        "aim": "Analyze wireless IoT protocol security: Wi-Fi onboarding vulnerabilities, Bluetooth Low Energy (BLE) GATT attributes, pairing security, and Zigbee commissioning.",
        "prereq": "Module 16: IoT Threat Modeling",
        "task": "Audit wireless security for BLE and Wi-Fi IoT devices; inspect BLE GATT services, analyze Wi-Fi credential provisioning, and produce a wireless security checklist.",
        "output": "Wireless protocol security audit report + BLE GATT attack surface map",
        "lessons": [
            {
                "title": "Wi-Fi Provisioning Mechanisms & Rogue Access Point Risks",
                "activity": "Evaluate consumer IoT Wi-Fi onboarding methods: captive portals, SoftAP provisioning, Wi-Fi Protected Setup (WPS), and Bluetooth-assisted provisioning.",
                "practice": "Inspect an ESP32 captive portal provisioning flow; evaluate plaintext credential transmission risks and lack of server authentication.",
                "check": "Learner identifies weaknesses in unauthenticated provisioning SoftAPs and explains how an attacker within radio range can intercept credentials."
            },
            {
                "title": "Bluetooth Low Energy (BLE): Advertising, GATT & Bonding Security",
                "activity": "Analyze BLE 4.x/5.x protocol layers: Generic Access Profile (GAP) advertising packets, Generic Attribute Profile (GATT) services/characteristics, and pairing modes.",
                "practice": "Use a mobile BLE scanner app (nRF Connect) or `bluetoothctl` to discover nearby BLE devices, enumerate GATT services, and read characteristic permissions.",
                "check": "GATT service map identifies readable, writeable, and notify characteristics, noting which lack encryption or authorization requirements."
            },
            {
                "title": "Zigbee, 802.15.4 Mesh Networks & Key Commissioning",
                "activity": "Explore IEEE 802.15.4 and Zigbee 3.0 mesh architectures: Coordinator, Routers, End Devices, Trust Center, and the well-known default link key (`ZigBeeAlliance09`).",
                "practice": "Inspect a recorded Zigbee commissioning PCAP in Wireshark; trace network key delivery and explain over-the-air key exchange risks.",
                "check": "Learner explains how unencrypted or default link keys allow unauthorized devices to sniff the network key during commissioning."
            },
            {
                "title": "Wireless Threat Detection & RF Environment Hardening",
                "activity": "Identify wireless attack patterns: deauthentication flooding, rogue SoftAP evil twins, BLE unauthorized write attempts, and RF jamming indicators.",
                "practice": "Construct defensive rules for detecting high volumes of 802.11 deauthentication frames or unexpected BLE connection attempts.",
                "check": "Defensive checklist establishes wireless best practices: disable WPS, enforce WPA3, require BLE Secure Connections with Passkey, and isolate IoT VLANs."
            }
        ]
    },
    {
        "order": 18,
        "title": "IoT Web & API Vulnerabilities",
        "phase": "Core",
        "hours": 6,
        "aim": "Assess embedded web administrative interfaces and IoT cloud APIs; test for Insecure Direct Object References (IDOR), command injection, authentication bypass, and CSRF.",
        "prereq": "Module 17: Wireless IoT Security",
        "task": "Conduct an authorized security assessment of an embedded IoT web interface; document discovered input validation and session vulnerabilities with remediation patches.",
        "output": "Web & API vulnerability assessment report + validated defensive patch code",
        "lessons": [
            {
                "title": "Embedded Web Server Architectures & Authentication Flaws",
                "activity": "Examine lightweight embedded HTTP daemons (uHTTPd, Boa, Lighttpd, ESP32 WebServer); identify basic auth over HTTP, hardcoded session cookies, and missing CSRF tokens.",
                "practice": "Inspect browser network requests using browser DevTools; analyze session token entropy and evaluate logout cookie invalidation.",
                "check": "Learner can identify insecure session management patterns in embedded web consoles."
            },
            {
                "title": "Testing Insecure Direct Object References (IDOR) & Broken Access",
                "activity": "Analyze access control models in multi-device IoT management portals; test for IDOR where modifying device IDs or user IDs grants unauthorized access to other endpoints.",
                "practice": "Simulate an authorized lab web portal; modify device serial parameter in API request to verify server-side authorization enforcement.",
                "check": "Defensive testing confirms server strictly enforces ownership checks before returning or updating device telemetry."
            },
            {
                "title": "Command Injection in CGI Scripts & Embedded Endpoints",
                "activity": "Analyze vulnerable pattern where user input from web forms (e.g. ping diagnostic tool, NTP server configuration) is concatenated directly into system shell calls.",
                "practice": "Inspect a vulnerable CGI sample script; identify unsanitized `system()` or `popen()` calls and construct a parameterized defensive replacement.",
                "check": "Remediated code replaces shell concatenation with strict allowlists, input validation, and direct exec-family system calls."
            },
            {
                "title": "Remediation & Hardening: CSP, CORS & Modern API Defenses",
                "activity": "Implement modern application security controls on embedded web servers: Content Security Policy (CSP) headers, strict Cross-Origin Resource Sharing (CORS), and JSON schema validation.",
                "practice": "Configure security headers on an ESP32 web server; test resistance against cross-site scripting and unauthorized cross-origin requests.",
                "check": "Browser security headers are correctly parsed; unauthorized cross-origin API calls are blocked by browser security models."
            }
        ]
    },
    {
        "order": 19,
        "title": "Raspberry Pi & Embedded Linux Security",
        "phase": "Core",
        "hours": 6,
        "aim": "Harden embedded Linux gateways (Raspberry Pi, OpenWrt), configure SSH key-based authentication, enforce firewall service minimization, and audit system logs.",
        "prereq": "Module 18: IoT Web & API Vulnerabilities",
        "task": "Harden a Raspberry Pi / Linux IoT edge gateway: disable default accounts, configure UFW firewall, enforce SSH key authentication, and set up automated log monitoring.",
        "output": "Gateway baseline vs hardened audit worksheet + automated security audit script",
        "lessons": [
            {
                "title": "Embedded Linux Gateway Architecture, Processes & Daemons",
                "activity": "Explore embedded Linux operating system structure: init systems (systemd, sysvinit, procd), kernel modules, running background daemons, and listening network sockets.",
                "practice": "Enumerate listening ports (`ss -tulpn`), active services (`systemctl list-units`), and user accounts on an embedded Linux system.",
                "check": "Learner produces a complete inventory of active background services, listening network ports, and running process trees."
            },
            {
                "title": "SSH Hardening, Key-Based Authentication & User Isolation",
                "activity": "Harden remote administrative access: disable default credentials (`pi:raspberry`), change default SSH port, enforce Ed25519 public key authentication, and disable root login.",
                "practice": "Configure `/etc/ssh/sshd_config` with `PasswordAuthentication no` and `PermitRootLogin no`; test connection with SSH keypair.",
                "check": "SSH password logins are completely rejected; access is granted only to holders of authorized private keys."
            },
            {
                "title": "Service Minimization, Firewall Configuration (UFW/iptables) & Updates",
                "activity": "Apply system minimization: remove unnecessary packages (Telnet, FTP, legacy services), configure firewall default-deny incoming rules, and automate security updates.",
                "practice": "Configure UFW firewall allowing only incoming SSH from lab subnet and MQTT port 8883; verify blocked access on all other ports.",
                "check": "External port scan confirms only necessary service ports respond; all unauthorized connection attempts are dropped."
            },
            {
                "title": "System Log Monitoring, Fail2ban & Incident Recovery",
                "activity": "Configure log aggregation using `journalctl` and `rsyslog`; deploy Fail2ban to automatically ban IPs with repeated authentication failures, and test recovery procedures.",
                "practice": "Simulate brute-force SSH attempts from an isolated client; verify Fail2ban bans the IP and logs the security alert.",
                "check": "Failed attempts trigger automatic IP ban after 3 failures; administrative notification is logged to system journal."
            }
        ]
    },
    {
        "order": 20,
        "title": "Firmware Extraction & Analysis",
        "phase": "Core",
        "hours": 6,
        "aim": "Acquire authorized firmware images legally, verify cryptographic integrity (SHA-256), inspect binary structures with hexdump and file utilities, and extract embedded filesystems using Binwalk.",
        "prereq": "Module 19: Raspberry Pi & Embedded Linux Security",
        "task": "Portfolio Project 4: Acquire an authorized vendor firmware image; verify chain of custody, perform binary component inventory with Binwalk, and extract filesystems for defensive analysis.",
        "output": "Portfolio Project 4 package: Firmware analysis report, component inventory spreadsheet, and extracted configuration artifacts",
        "lessons": [
            {
                "title": "Firmware Acquisition Channels & Legal/Ethical Lab Scope",
                "activity": "Explore methods of acquiring firmware: direct vendor support downloads, OTA update capture, backup images from owned hardware, and open-source releases.",
                "practice": "Download an authorized vendor firmware update (e.g. OpenWrt, D-Link demo image); record download URL, release notes, and legal authorization.",
                "check": "Firmware origin is fully documented with verified vendor provenance and clear authorization for security research."
            },
            {
                "title": "Cryptographic Hashing, Verification & Chain of Custody",
                "activity": "Establish defensible evidence management: compute SHA-256 and SHA-512 hashes of acquired firmware images; compare with published vendor checksums; log chain of custody.",
                "practice": "Generate SHA-256 hash using `sha256sum` in Linux or `Get-FileHash` in PowerShell; create a cryptographic evidence custody record.",
                "check": "Computed hash matches vendor specification exactly, verifying the binary is authentic, unaltered, and uncorrupted."
            },
            {
                "title": "Binary Headers, Entropy Scanning & Hexdump Inspection",
                "activity": "Analyze binary structures using `file`, `strings`, `hexdump`, and entropy calculations; identify uncompressed bootloaders, compressed kernels, and encrypted flash partitions.",
                "practice": "Generate an entropy graph of a firmware image using `binwalk -E`; distinguish low-entropy code sections from high-entropy compressed/encrypted data.",
                "check": "Learner can identify common header magic bytes (e.g. `uImage`, `Squashfs`, `TRX`, `ELF`) and interpret entropy transitions."
            },
            {
                "title": "Filesystem Extraction with Binwalk (SquashFS, CramFS, JFFS2)",
                "activity": "Use Binwalk to automatically identify and extract embedded filesystems (SquashFS, CramFS, UBIFS, JFFS2); navigate extracted root directories (`/etc`, `/bin`, `/var`).",
                "practice": "Extract root filesystem using `binwalk -eM firmware.bin`; locate shadow password files, default configuration scripts, and web server roots.",
                "check": "Filesystem extracts completely without corruption; learner can browse extracted files and identify default passwords or configuration flaws."
            }
        ]
    },
    # PHASE 3: Advanced IoT Cybersecurity (21–30)
    {
        "order": 21,
        "title": "Firmware Reverse Engineering",
        "phase": "Advanced",
        "hours": 8,
        "aim": "Decompile and analyze compiled embedded binaries using NSA Ghidra; trace control flow, analyze cryptographic functions, and identify vulnerable logic on sample binaries.",
        "prereq": "Module 20: Firmware Extraction & Analysis",
        "task": "Analyze an intentionally vulnerable compiled training binary in Ghidra; map main function call graphs, locate hardcoded credentials, and document software flaws.",
        "output": "Annotated Ghidra function map + reverse engineering vulnerability analysis report",
        "lessons": [
            {
                "title": "CPU Architectures: ARM, MIPS, RISC-V & ELF Binary Fundamentals",
                "activity": "Examine embedded processor architectures (ARM Cortex-M, MIPS32/64, Xtensa, RISC-V), endianness (Big-Endian vs Little-Endian), and Executable and Linkable Format (ELF) structures.",
                "practice": "Inspect an ELF binary using `readelf -h -S -s`; identify architecture, entry point address, program headers, and symbol tables.",
                "check": "Learner correctly identifies CPU architecture, register conventions, and memory section mappings for target binaries."
            },
            {
                "title": "NSA Ghidra Setup, Architecture Configuration & Binary Import",
                "activity": "Set up Ghidra; configure Java runtime, create project workspaces, import raw firmware dumps or ELF binaries, and select correct processor and language definitions.",
                "practice": "Import an ARM/MIPS binary into Ghidra; run initial auto-analysis with decompiler, string discovery, and cross-reference modules enabled.",
                "check": "Ghidra disassembles binary into readable assembly code and displays decompiled C representations in the decompiler window."
            },
            {
                "title": "Tracing Control Flow, String Cross-References & Crypto Calls",
                "activity": "Navigate Ghidra's symbol tree; locate suspicious strings (passwords, URLs, backdoor commands), trace cross-references (`XREFs`) to calling functions, and inspect logic.",
                "practice": "Find a cryptographic initialization routine in decompiled C; identify hardcoded encryption keys, initialization vectors, or flawed RNG implementations.",
                "check": "Learner traces function call paths from user input handlers to internal logic branches and pinpoints vulnerable code blocks."
            },
            {
                "title": "Documenting Reverse Engineering Findings & Confidence Limits",
                "activity": "Structure reverse engineering documentation: clearly distinguish confirmed decompiled facts from speculative inferences; document remediation recommendations.",
                "practice": "Write an annotated vulnerability report for a discovered binary flaw, including function offset, disassembled instructions, decompiled C snippet, and fix.",
                "check": "Technical report is rigorous, reproducible, and provides concrete developer remediation guidance."
            }
        ]
    },
    {
        "order": 22,
        "title": "Firmware Emulation",
        "phase": "Advanced",
        "hours": 8,
        "aim": "Emulate foreign CPU architecture firmware dynamically using QEMU and Firmadyne; observe network services, inspect runtime memory, and correlate dynamic and static analysis.",
        "prereq": "Module 21: Firmware Reverse Engineering",
        "task": "Emulate a MIPS/ARM embedded Linux binary in QEMU user and system mode; observe listening services, capture runtime logs, and validate defensive patches.",
        "output": "QEMU emulation setup script + dynamic telemetry execution log",
        "lessons": [
            {
                "title": "QEMU Architecture: User-Mode vs Full-System Emulation in IoT",
                "activity": "Understand QEMU principles: user-mode emulation (`qemu-arm`, `qemu-mips`) for single binaries vs full-system emulation (`qemu-system-arm`) with virtual hardware peripherals.",
                "practice": "Configure QEMU user-mode with chroot on an extracted root filesystem; execute an embedded MIPS binary on an x86_64 host.",
                "check": "Foreign architecture binary executes successfully on host machine, resolving dynamic shared libraries from chroot environment."
            },
            {
                "title": "Emulating Foreign MIPS & ARM Architectures Safely",
                "activity": "Set up virtual network bridges (TAP interfaces) connecting QEMU system instances to an isolated host-only network; boot standard embedded Linux kernel images.",
                "practice": "Boot a MIPS kernel in QEMU system mode with an attached SquashFS rootfs; verify network interface initializes with static IP.",
                "check": "Virtual machine boots to functional Linux shell; host can ping the emulated gateway over isolated TAP bridge."
            },
            {
                "title": "Observing Runtime Services, Network Sockets & Dynamic Telemetry",
                "activity": "Observe running daemons inside the emulated environment: inspect opened listening ports (`netstat`), monitor file access (`lsof`), and trace system calls (`strace`).",
                "practice": "Attach `strace` to a running embedded web server in QEMU; observe file operations and socket read/write events during incoming HTTP requests.",
                "check": "System call trace reveals exact file descriptors, configuration files read, and execution parameters in real time."
            },
            {
                "title": "Correlating Dynamic Telemetry with Static Ghidra Findings",
                "activity": "Cross-reference dynamic observations (crash logs, memory addresses, open ports) with static disassembly in Ghidra; validate theoretical vulnerability hypotheses.",
                "practice": "Trigger an edge-case input in the emulated service; capture the crash segmentation fault register dump and correlate fault address with Ghidra disassembly.",
                "check": "Learner demonstrates full end-to-end correlation between static binary analysis and dynamic runtime behavior."
            }
        ]
    },
    {
        "order": 23,
        "title": "OWASP IoTGoat Security Testing",
        "phase": "Advanced",
        "hours": 8,
        "aim": "Deploy OWASP IoTGoat deliberately vulnerable firmware in an isolated lab; audit exposed services, analyze backdoor accounts, and document remediation strategies.",
        "prereq": "Module 22: Firmware Emulation",
        "task": "Deploy OWASP IoTGoat in an isolated VM; perform an authorized security assessment across web, network, and firmware attack surfaces and write an executive report.",
        "output": "OWASP IoTGoat security assessment report + developer remediation roadmap",
        "lessons": [
            {
                "title": "Deploying OWASP IoTGoat in an Isolated Virtual Environment",
                "activity": "Understand the architecture of OWASP IoTGoat (OpenWrt-based intentionally vulnerable firmware); import pre-built VM images into VirtualBox/QEMU on host-only networks.",
                "practice": "Boot IoTGoat VM, configure host-only networking, and verify connectivity to the administrative web console on 192.168.x.x.",
                "check": "IoTGoat instance runs fully isolated from production networks; learner can access web interface and local administrative console."
            },
            {
                "title": "Auditing Exposed Network Daemons, Services & Misconfigurations",
                "activity": "Conduct authorized security audit of IoTGoat: scan ports with Nmap, test for open Telnet, examine embedded Lighttpd configurations, and identify unauthenticated endpoints.",
                "practice": "Perform a non-intrusive service audit of IoTGoat listening ports; document banner versions, insecure cleartext protocols, and exposed interfaces.",
                "check": "Audit report identifies exact service misconfigurations without causing service crashes or destructive data loss."
            },
            {
                "title": "Documenting Web & Firmware Vulnerabilities Defensively",
                "activity": "Audit IoTGoat web interface and firmware: identify hardcoded backdoor credentials in `/etc/shadow`, insecure firmware update validation, and command execution flaws.",
                "practice": "Document three distinct vulnerabilities using industry-standard CVSS 3.1 scoring, explaining root causes and prerequisites.",
                "check": "Documentation adheres to professional defensive reporting standards, explaining impact without providing weaponized exploit scripts."
            },
            {
                "title": "Verification of Defensive Fixes & Developer Handoff",
                "activity": "Formulate technical remediation code patches for discovered IoTGoat flaws: enforce password hashing, disable telnet, restrict local web endpoints, and draft developer guidance.",
                "practice": "Apply configuration changes to IoTGoat to disable insecure services and re-scan to prove vulnerability remediation.",
                "check": "Re-test verifies that targeted vulnerabilities are completely eliminated while legitimate administrative functionality remains intact."
            }
        ]
    },
    {
        "order": 24,
        "title": "Hardware Debugging & Interface Security",
        "phase": "Advanced",
        "hours": 8,
        "aim": "Identify physical hardware test points and debug headers (UART, JTAG, SWD), safely measure voltages with a multimeter, read non-sensitive boot logs, and design hardware lockdown.",
        "prereq": "Module 23: OWASP IoTGoat Security Testing",
        "task": "Conduct a physical inspection of an owned microcontroller development board; map test pads, verify 3.3V voltage safety, and draft a production hardware hardening checklist.",
        "output": "Hardware interface exposure map + production physical hardening checklist",
        "lessons": [
            {
                "title": "Visual Inspection: Identifying UART, JTAG & SWD Pads on PCBs",
                "activity": "Inspect printed circuit board (PCB) layouts: identify common debug pin groupings, fiducial markers, unpopulated header pads, and traces running to microcontroller pins.",
                "practice": "Examine high-resolution PCB photographs and physical boards; locate probable UART (TX, RX), SWD (SWDIO, SWCLK), and JTAG (TDI, TDO, TCK, TMS) pads.",
                "check": "Learner correctly identifies probable debug interfaces by pad geometry, spacing, and ground plane orientation."
            },
            {
                "title": "Safe 3.3V Logic Probing & Multimeter Ground Verification",
                "activity": "Enforce electrical safety protocols when probing unknown hardware: verify ground continuity with a multimeter, measure logic voltage levels (ensuring <= 3.3V), and avoid short circuits.",
                "practice": "Measure DC voltage between suspected power/ground pads and known chassis ground before attaching any digital analysis probe.",
                "check": "Learner verifies that target pin voltage does not exceed 3.3V logic limits, preventing damage to testing adapters and host PCs."
            },
            {
                "title": "Reading Non-Sensitive Serial Boot Telemetry via 3.3V UART Adapters",
                "activity": "Connect a 3.3V USB-to-UART adapter to identified debug test pads; configure terminal baud rates to capture non-sensitive bootloader output and hardware diagnostic logs.",
                "practice": "Connect RX and GND probes to test board; cycle power to capture ROM boot messages and identify CPU clock rate and flash chip model.",
                "check": "Clean ASCII boot telemetry is captured without disrupting normal board operation or causing electrical transients."
            },
            {
                "title": "Production Hardware Lockdown, eFuse Configuration & Anti-Tamper",
                "activity": "Design hardware-level protection for production devices: blowing eFuses to permanently disable JTAG/UART bootloaders, removing test pad silkscreen, and applying potting compound.",
                "practice": "Review ESP32 eFuse configuration documentation (`espefuse.py`); document the permanent hardware irreversible bits (`DIS_PAD_JTAG`, `DIS_BOOT_REMAP`).",
                "check": "Hardware hardening specification outlines irreversible production fuse settings to prevent unauthorized physical bus access."
            }
        ]
    },
    {
        "order": 25,
        "title": "IoT Malware & Botnet Investigation",
        "phase": "Advanced",
        "hours": 8,
        "aim": "Analyze historical IoT botnet architectures (Mirai, Gafgyt, Mozi), identify synthetic Command and Control (C2) telemetry in logs and PCAPs, and develop device containment playbooks.",
        "prereq": "Module 24: Hardware Debugging & Interface Security",
        "task": "Investigate a synthetic IoT botnet compromise scenario from prerecorded network and device telemetry; produce an incident analysis and containment playbook.",
        "output": "Botnet incident investigation report + device isolation and containment procedure",
        "lessons": [
            {
                "title": "Mirai & IoT Botnet Historical Attack Chain Analysis",
                "activity": "Analyze historical Mirai botnet architecture: default credential scanning, loader daemons, memory-only execution, C2 domain resolution, and synchronized volumetric DDoS vectors.",
                "practice": "Deconstruct a documented Mirai attack timeline; trace the sequence from initial Telnet brute-force to C2 registration and attack command delivery.",
                "check": "Learner explains the economic and systemic factors that enabled large-scale IoT botnets (unsegmented networks, hardcoded vendor credentials)."
            },
            {
                "title": "Identifying Botnet Command & Control (C2) Telemetry in Logs",
                "activity": "Inspect synthetic firewall logs, DNS query records, and NetFlow telemetry for indicators of botnet activity: high-frequency port scanning, anomalous DNS requests, and unusual outbound connections.",
                "practice": "Analyze a 10,000-line DNS query log; identify an infected IoT device beaconing to a dynamic DNS C2 domain at regular intervals.",
                "check": "Learner accurately isolates infected device IP, C2 domain names, beaconing intervals, and initial compromise timestamp."
            },
            {
                "title": "Incident Response: Device Isolation & Containment Procedures",
                "activity": "Develop a standard operating procedure (SOP) for containing compromised IoT hardware: network segment isolation via VLAN ACLs, 802.1X port shutting, and preserving volatile memory.",
                "practice": "Draft an automated firewall isolation rule blocking all outbound traffic from an infected IP while preserving packet capture capabilities.",
                "check": "Containment protocol prevents lateral movement and external C2 communication while preserving evidence for forensic reconstruction."
            },
            {
                "title": "Remediation, Eradication & Re-Infection Prevention",
                "activity": "Formulate a permanent remediation strategy: factory firmware re-flashing from verified clean golden images, changing default credentials, closing management ports, and patch management.",
                "practice": "Create a re-commissioning checklist ensuring remediated hardware cannot be immediately re-infected upon reconnecting to the network.",
                "check": "Checklist addresses root causes (patching vulnerabilities, rotating credentials) rather than merely rebooting the device."
            }
        ]
    },
    {
        "order": 26,
        "title": "IoT SOC Monitoring & SIEM",
        "phase": "Advanced",
        "hours": 8,
        "aim": "Architect security monitoring for IoT fleets, forward telemetry to SIEM platforms (Wazuh, Elastic), author Sigma detection rules for IoT threats, and tune alert fidelity.",
        "prereq": "Module 25: IoT Malware & Botnet Investigation",
        "task": "Portfolio Project 5: Deploy an IoT telemetry forwarding pipeline to a local SIEM/Wazuh; write and validate two custom Sigma detection rules for anomalous MQTT and network behavior.",
        "output": "Portfolio Project 5 package: Sigma detection rules, SIEM dashboard screenshot, and alert tuning validation log",
        "lessons": [
            {
                "title": "Log Source Selection: Gateway, Broker, Network & Device Events",
                "activity": "Identify high-fidelity log sources across an IoT ecosystem: Mosquitto broker connection logs, DNS query logs, Linux gateway `auth.log`, and network flow records.",
                "practice": "Configure Mosquitto to log all client connections, disconnections, topic subscriptions, and access violations with UTC timestamps.",
                "check": "Broker generates structured log records capturing client ID, IP address, topic name, and authorization decision for all events."
            },
            {
                "title": "Forwarding Safe Lab Telemetry to Local SIEM / Wazuh Collector",
                "activity": "Configure log shippers (Fluentbit, Filebeat, Wazuh agent) to forward IoT gateway and broker telemetry to a centralized local SIEM collector; parse JSON payloads.",
                "practice": "Set up a lightweight log collector pipeline parsing Mosquitto logs and indexing events into structured searchable fields.",
                "check": "SIEM dashboard displays real-time ingestion of IoT events with indexed fields for `client_id`, `topic`, `status`, and `source_ip`."
            },
            {
                "title": "Writing & Validating Custom Sigma Detection Rules for IoT",
                "activity": "Understand Sigma generic detection rule syntax (title, logsource, detection logic, condition, falsepositives, level); write detection rules for IoT attack patterns.",
                "practice": "Author a Sigma rule to detect unauthorized MQTT wildcard subscriptions (`#`) by unapproved client IDs; validate rule against sample logs.",
                "check": "Sigma rule converts cleanly to SIEM query syntax and triggers alerts on simulated malicious events with zero missed detections."
            },
            {
                "title": "Alert Fidelity Tuning, False Positive Reduction & Escalation",
                "activity": "Tune detection logic to reduce alert fatigue: baseline normal operational spikes, add explicit whitelist exemptions, assign appropriate severity levels, and define escalation paths.",
                "practice": "Review 24 hours of simulated lab alerts; identify a noisy false-positive rule, adjust threshold conditions, and document triage procedure.",
                "check": "Tuned rule maintains 100% true-positive detection while reducing background false-positive alert volume by >90%."
            }
        ]
    },
    {
        "order": 27,
        "title": "IoT Digital Forensics",
        "phase": "Advanced",
        "hours": 8,
        "aim": "Conduct forensically sound investigations of compromised IoT hardware and gateways, preserve volatile memory, verify cryptographic hashes, and reconstruct unified incident timelines.",
        "prereq": "Module 26: IoT SOC Monitoring & SIEM",
        "task": "Reconstruct a complete incident timeline from a synthetic multi-source IoT compromise scenario (device logs, DNS records, PCAP); author a defensible forensic report.",
        "output": "Unified incident timeline worksheet + formal digital forensics investigation report",
        "lessons": [
            {
                "title": "Volatile vs Persistent Evidence Acquisition in Embedded Systems",
                "activity": "Examine order of volatility in embedded systems: volatile RAM, network state, running processes, vs persistent SPI flash memory and SD card partitions.",
                "practice": "Document a forensic acquisition protocol for an embedded Linux gateway, prioritizing RAM dumping and network connection capture before unpowering.",
                "check": "Acquisition procedure minimizes evidence alteration and documents volatile artifacts that would be destroyed by a power cycle."
            },
            {
                "title": "Cryptographic Evidence Hashing & Chain of Custody Maintenance",
                "activity": "Maintain strict legal chain of custody: generate forensic bit-stream images using `dd`, compute SHA-256 hashes immediately upon acquisition, and maintain written custody logs.",
                "practice": "Create a forensic image of an IoT SD card; generate verification hash and document evidence transfer log.",
                "check": "Forensic image hash matches source device hash exactly; custody log documents examiner, date, tool version, and storage location."
            },
            {
                "title": "Multi-Source Timeline Reconstruction: Normalizing to UTC",
                "activity": "Correlate disparate evidentiary sources with varying clock skews: normalize timestamps from gateway syslog, MQTT broker logs, DNS queries, and packet captures to UTC.",
                "practice": "Merge 50 log entries from three distinct sources into a single chronologically sorted timeline; adjust for known clock offset.",
                "check": "Unified timeline reconstructs the exact sequence of events from initial exploit delivery to lateral movement and data exfiltration."
            },
            {
                "title": "Forensic Report Writing, Fact-Inference Separation & Confidence",
                "activity": "Structure a defensible forensic technical report: executive summary, scope of inquiry, evidence inventory, technical timeline, confirmed facts vs professional inferences, and conclusions.",
                "practice": "Author a forensic report section clearly labeling verified hardware observations as facts and attribution hypotheses as inferences.",
                "check": "Report adheres to forensic standards, avoiding unsupported speculation while clearly articulating verifiable technical conclusions."
            }
        ]
    },
    {
        "order": 28,
        "title": "Industrial IoT Cybersecurity",
        "phase": "Advanced",
        "hours": 8,
        "aim": "Examine Operational Technology (OT) and Industrial IoT (IIoT) architectures, understand the Purdue model, analyze Modbus/TCP communications in simulation, and design safety interlocks.",
        "prereq": "Module 27: IoT Digital Forensics",
        "task": "Model an industrial water treatment sensor network in an offline simulator; analyze Modbus/TCP telemetry, identify unauthenticated command risks, and design a passive monitoring architecture.",
        "output": "Purdue model architecture diagram + Modbus/TCP security assessment report",
        "lessons": [
            {
                "title": "Purdue Model Architecture: Sensors, PLCs, Gateways, HMIs & Boundaries",
                "activity": "Analyze the Purdue Enterprise Reference Architecture (PERA): Level 0 (field devices/sensors), Level 1 (PLCs/RTUs), Level 2 (supervisory HMI/SCADA), Level 3 (manufacturing ops), and the IT/OT DMZ.",
                "practice": "Map industrial network components across Purdue levels; identify required firewalls, unidirectional security gateways (data diodes), and demilitarized zones.",
                "check": "Learner can articulate why field devices at Level 0/1 must never communicate directly with IT cloud services at Level 4/5."
            },
            {
                "title": "Modbus/TCP Protocol Fundamentals & Cleartext Command Risks",
                "activity": "Examine the Modbus/TCP protocol specification (port 502): transaction identifiers, unit IDs, function codes (Read Coils, Write Single Register), and total absence of authentication or encryption.",
                "practice": "Simulate a Modbus/TCP server and client in Python or Node-RED; inspect transmitted request/response packets in Wireshark.",
                "check": "PCAP analysis shows cleartext Modbus function codes and register values, demonstrating susceptibility to unauthorized command injection."
            },
            {
                "title": "Passive OT Network Monitoring, Change Control & Baseline Anomaly",
                "activity": "Evaluate passive monitoring strategies for sensitive industrial environments where active scanning can cause PLC crashes; baseline normal function code distributions.",
                "practice": "Configure a passive network inspection rule that flags any unexpected Modbus write commands (`FC05`, `FC06`, `FC16`) sent to critical safety registers.",
                "check": "Passive monitor detects unauthorized write operations instantly without transmitting any active packets onto the industrial network."
            },
            {
                "title": "Safety Instrumented Systems (SIS), SIL Ratings & Physical Fail-Safes",
                "activity": "Understand Safety Instrumented Systems (SIS), Safety Integrity Levels (SIL 1-4), hardwired emergency stop circuits, and mechanical interlocks that operate independently of software.",
                "practice": "Design an industrial physical safety cutoff circuit where an analog over-temperature switch disconnects power mechanically regardless of PLC state.",
                "check": "Safety design guarantees that compromised firmware or network attacks cannot disable physical emergency shutdown mechanisms."
            }
        ]
    },
    {
        "order": 29,
        "title": "Secure IoT Product Engineering",
        "phase": "Advanced",
        "hours": 8,
        "aim": "Integrate product security standards (NIST IR 8259, EU Cyber Resilience Act), generate Software Bill of Materials (SBOM), establish vulnerability disclosure policies, and execute release checklists.",
        "prereq": "Module 28: Industrial IoT Cybersecurity",
        "task": "Produce a commercial product security readiness assessment for an IoT device; generate an automated SBOM, draft a vulnerability disclosure policy, and complete a pre-release audit checklist.",
        "output": "Commercial product security readiness report + CycloneDX SBOM + release audit checklist",
        "lessons": [
            {
                "title": "IoT Security Standards: NIST IR 8259, EN 303 645 & EU Cyber Resilience Act",
                "activity": "Analyze international IoT regulatory baselines: NIST IR 8259 foundational capabilities (device identity, physical security, data protection), ETSI EN 303 645, and EU CRA requirements.",
                "practice": "Conduct a gap analysis of an existing IoT prototype against the NIST IR 8259 baseline criteria; document compliance gaps.",
                "check": "Compliance matrix provides clear pass/gap determinations for all foundational baseline capabilities."
            },
            {
                "title": "Software Bill of Materials (SBOM) Generation & Dependency Tracking",
                "activity": "Understand the critical role of Software Bill of Materials (SBOM) in securing embedded supply chains; explore formats (CycloneDX, SPDX) tracking open-source libraries and licenses.",
                "practice": "Generate an automated CycloneDX SBOM for an ESP32 firmware project using `syft` or `cdxgen`; identify third-party component versions.",
                "check": "Generated SBOM file lists all direct and transitive firmware dependencies with package names, versions, and license classifications."
            },
            {
                "title": "Coordinated Vulnerability Disclosure (CVD) & Security Contact Setup",
                "activity": "Establish a professional Coordinated Vulnerability Disclosure (CVD) policy; set up `security.txt` files, PGP security contact keys, bug bounty scoping, and patch release timelines.",
                "practice": "Draft a standard `security.txt` file and disclosure policy defining response SLAs (e.g. 7-day initial response, 90-day remediation).",
                "check": "`security.txt` follows RFC 9116 specifications, providing clear contact URIs, encryption keys, and policy links."
            },
            {
                "title": "Product Release Security Checklist & Pre-Production Gate Auditing",
                "activity": "Execute a pre-production release security checklist: verify debug interfaces disabled, eFuses blown, secure boot active, default passwords eliminated, and compliance verified.",
                "practice": "Perform a mock release gate review on an IoT build; sign off on verified security controls or block release with documented critical defects.",
                "check": "Release checklist provides unambiguous go/no-go criteria based on verifiable technical evidence."
            }
        ]
    },
    {
        "order": 30,
        "title": "Final IoT Cybersecurity Capstone",
        "phase": "Capstone",
        "hours": 12,
        "aim": "Demonstrate comprehensive mastery across hardware, firmware, network security, threat modeling, SIEM detection, and professional reporting in the 100-mark Capstone Project.",
        "prereq": "Modules 01–29 completion",
        "task": "Portfolio Project 6 / 100-Mark Capstone: Build, harden, assess, and document a complete end-to-end connected IoT monitoring system with measured circuit CAD, firmware, PCAP, threat model, and SOC handoff.",
        "output": "Portfolio Project 6 Capstone Package: Comprehensive 100-mark portfolio submission with verified hardware netlist, hardened repository, PCAP trace, and executive presentation",
        "lessons": [
            {
                "title": "System Architecture & Bill of Materials (BOM) Scoping",
                "activity": "Scope the complete capstone system: select sensors, microcontroller, actuator driver stage, network parameters, and local Mosquitto/dashboard infrastructure.",
                "practice": "Draft the final system architecture diagram, circuit netlist, and detailed Hardware BOM with component ratings and substitution guides.",
                "check": "Architecture specification establishes complete technical blueprint with unambiguous electrical and network requirements."
            },
            {
                "title": "Hardened Firmware & Cryptographic Channel Implementation",
                "activity": "Implement production-grade firmware: debounced inputs, sensor range validation, watchdog timers, encrypted NVS secret storage, and mutual TLS MQTTS messaging on port 8883.",
                "practice": "Compile and flash the hardened capstone firmware; verify continuous reliable telemetry transmission over encrypted TLS channel.",
                "check": "Firmware operates continuously with zero crashes; Wireshark confirms all network traffic is fully encrypted."
            },
            {
                "title": "Authorized Threat Assessment, PCAP Capture & Telemetry Recording",
                "activity": "Execute an authorized security audit of the assembled system: test physical tamper triggers, capture network baselines, simulate unauthorized topic access, and record evidence.",
                "practice": "Record a 5-minute verified PCAP trace and serial console log demonstrating normal operation, simulated attack detection, and safe failover.",
                "check": "Evidentiary artifacts capture verified system telemetry with synchronized UTC timestamps and clear observation markers."
            },
            {
                "title": "Executive Technical Report & SOC Handoff Presentation",
                "activity": "Deliver the final Capstone portfolio: compile technical findings, architecture diagrams, threat assessment matrix, SOC detection rules, and an executive briefing presentation.",
                "practice": "Complete the 100-mark capstone rubric documentation, summarizing achievements across functional build, security architecture, and defensive engineering.",
                "check": "Capstone portfolio meets or exceeds the 75/100 passing threshold across all seven evaluation categories with zero quiz reliance."
            }
        ]
    }
]
