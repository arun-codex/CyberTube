import os
import json

LABS_ROOT = os.path.join('docs', 'courses', 'iot-cybersecurity', 'labs')

# 1. Module 15: Wireshark Filters
m15_dir = os.path.join(LABS_ROOT, 'module-15')
with open(os.path.join(m15_dir, 'wireshark_display_filters.txt'), 'w', encoding='utf-8') as f:
    f.write("""# CyberTube Module 15: Wireshark Display Filters for IoT
# Display filters for baseline telemetry and anomaly detection

# 1. Isolate MQTT traffic
mqtt

# 2. Isolate MQTT CONNECT and PUBLISH messages only
mqtt.msgtype == 1 || mqtt.msgtype == 3

# 3. Detect unencrypted HTTP GET / POST from embedded nodes
http.request && ip.addr == 192.168.1.0/24

# 4. Filter for CoAP messages
coap

# 5. Detect DNS requests to external resolvers bypassing local gateway
dns && !ip.dst == 192.168.1.1

# 6. Detect anomalous TCP RST or SYN scans
tcp.flags.reset == 1 || (tcp.flags.syn == 1 && tcp.flags.ack == 0)
""")

# 2. Module 16: STRIDE Threat Matrix
m16_dir = os.path.join(LABS_ROOT, 'module-16')
stride_matrix = {
    "systemName": "CyberTube Smart-Room IoT Prototype",
    "threats": [
        {"id": "T1_SPOOFING", "category": "Spoofing", "target": "MQTT Broker", "description": "Attacker connects with forged client ID to impersonate sensor node.", "mitigation": "Enforce username/password or X.509 client certificate authentication."},
        {"id": "T2_TAMPERING", "category": "Tampering", "target": "DHT22 / BME280 Bus", "description": "Attacker clamps test leads to I2C lines to inject false temperature telemetry.", "mitigation": "Physical tamper enclosure and data anomaly filtering in firmware."},
        {"id": "T3_REPUDIATION", "category": "Repudiation", "target": "Actuator Commands", "description": "User denies issuing emergency fan cutoff command.", "mitigation": "Cryptographic command signing and immutable append-only syslog logging."},
        {"id": "T4_INFO_DISCLOSURE", "category": "Information Disclosure", "target": "Wi-Fi Airwaves", "description": "Cleartext MQTT/HTTP leaks room occupancy status.", "mitigation": "Enforce TLS 1.3 / MQTTS on port 8883."},
        {"id": "T5_DOS", "category": "Denial of Service", "target": "ESP32 IP Stack", "description": "TCP SYN flood exhausts ESP32 lwIP socket descriptors.", "mitigation": "Limit concurrent connections and rate-limit ingress packets at gateway."},
        {"id": "T6_ELEVATION", "category": "Elevation of Privilege", "target": "OTA Update Endpoint", "description": "Malicious unsigned binary flashed over OTA.", "mitigation": "Dual-slot OTA with RSA-3072 / ECDSA digital signature verification before flashing."}
    ]
}
with open(os.path.join(m16_dir, 'smartroom_threat_matrix.json'), 'w', encoding='utf-8') as f:
    json.dump(stride_matrix, f, indent=2)

# 3. Module 18: Web API Hardening
m18_dir = os.path.join(LABS_ROOT, 'module-18')
with open(os.path.join(m18_dir, 'synthetic_access.log'), 'w', encoding='utf-8') as f:
    f.write("""192.168.1.50 - - [25/Nov/2026:07:00:01 +0000] "GET /api/v1/telemetry HTTP/1.1" 200 45 "http://192.168.1.100/" "Mozilla/5.0"
192.168.1.50 - - [25/Nov/2026:07:00:05 +0000] "POST /api/v1/actuator?pin=2&state=1 HTTP/1.1" 200 18 "-" "cURL/8.5.0"
192.168.1.200 - - [25/Nov/2026:07:02:14 +0000] "GET /cgi-bin/system?cmd=cat%20/etc/passwd HTTP/1.1" 403 28 "-" "sqlmap/1.7"
192.168.1.200 - - [25/Nov/2026:07:02:18 +0000] "GET /api/v1/device/1/config HTTP/1.1" 401 32 "-" "Mozilla/5.0"
192.168.1.200 - - [25/Nov/2026:07:02:22 +0000] "GET /api/v1/device/2/config HTTP/1.1" 401 32 "-" "Mozilla/5.0"
""")

with open(os.path.join(m18_dir, 'defensive_api_filter.py'), 'w', encoding='utf-8') as f:
    f.write("""#!/usr/bin/env python3
# CyberTube Module 18: Defensive API Input Sanitizer & IDOR Validator

import re
import sys

ALLOWED_PINS = {2, 4, 21, 22, 25}
ALLOWED_STATES = {"0", "1"}

def sanitize_actuator_request(pin_param, state_param, authenticated_user_id, target_device_id):
    # 1. Access control / IDOR check
    if authenticated_user_id != target_device_id:
        return False, "403 Forbidden: Cross-tenant device access rejected"
        
    # 2. Pin whitelisting
    try:
        pin = int(pin_param)
        if pin not in ALLOWED_PINS:
            return False, f"400 Bad Request: Pin {pin} is not an authorized GPIO actuator"
    except ValueError:
        return False, "400 Bad Request: Invalid pin identifier"
        
    # 3. State validation
    if str(state_param) not in ALLOWED_STATES:
        return False, "400 Bad Request: State must be 0 or 1"
        
    return True, f"200 OK: Set GPIO {pin} to {state_param}"

if __name__ == '__main__':
    print("Testing defensive input sanitizer:")
    print(sanitize_actuator_request("2", "1", "user_101", "user_101"))
    print(sanitize_actuator_request("99", "1", "user_101", "user_101"))
    print(sanitize_actuator_request("2", "1", "user_101", "user_999"))
""")

# 4. Module 19: Linux Gateway Hardening
m19_dir = os.path.join(LABS_ROOT, 'module-19')
with open(os.path.join(m19_dir, 'sshd_config_hardened'), 'w', encoding='utf-8') as f:
    f.write("""# CyberTube Module 19: Production Hardened OpenSSH Server Config
Port 2222
Protocol 2
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PermitEmptyPasswords no
ChallengeResponseAuthentication no
UsePAM yes
X11Forwarding no
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
AllowUsers iotadmin
KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group-exchange-sha256
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com
""")

with open(os.path.join(m19_dir, 'ufw_hardening_rules.sh'), 'w', encoding='utf-8') as f:
    f.write("""#!/bin/bash
# CyberTube Module 19: UFW Gateway Hardening Script
set -e

echo "[*] Configuring default UFW firewall rules..."
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow hardened SSH port
sudo ufw allow 2222/tcp comment "Hardened SSH"

# Allow local Mosquitto MQTT only from internal IoT subnet
sudo ufw allow from 192.168.1.0/24 to any port 1883 proto tcp comment "Internal MQTT"
sudo ufw allow from 192.168.1.0/24 to any port 8883 proto tcp comment "Internal MQTTS"

echo "[*] Enabling UFW..."
sudo ufw --force enable
sudo ufw status verbose
""")

# 5. Module 25: Mirai Botnet Forensics & Rules
m25_dir = os.path.join(LABS_ROOT, 'module-25')
with open(os.path.join(m25_dir, 'suricata_mirai_detection.rules'), 'w', encoding='utf-8') as f:
    f.write("""# CyberTube Module 25: Suricata Detection Rules for Mirai C2 & Telnet Brute Force
alert tcp any any -> 192.168.1.0/24 23 (msg:"CYBERTUBE IOT Mirai Inbound Telnet Brute Force Attempt"; flow:to_server,established; content:"admin"; depth:16; sid:2026101; rev:1;)
alert tcp any any -> 192.168.1.0/24 23 (msg:"CYBERTUBE IOT Mirai Default Credential 7ujMko0vizxv"; flow:to_server,established; content:"7ujMko0vizxv"; sid:2026102; rev:1;)
alert tcp 192.168.1.0/24 any -> any 48101 (msg:"CYBERTUBE IOT Mirai Scanner C2 Check-in Port 48101"; flow:to_server; flags:S; threshold:type both, track by_src, count 5, seconds 10; sid:2026103; rev:1;)
""")

# 6. Module 26: SIEM & Sigma Rules
m26_dir = os.path.join(LABS_ROOT, 'module-26')
with open(os.path.join(m26_dir, 'sigma_iot_beaconing.yml'), 'w', encoding='utf-8') as f:
    f.write("""title: Suspicious IoT Gateway Periodic External C2 Beaconing
id: a874f631-54b2-4d51-9e23-74b8f01b3126
status: production
description: Detects an internal IoT sensor node communicating with high regularity to an external IP on non-standard ports.
references:
    - https://attack.mitre.org/techniques/T1071/
author: CyberTube Open Threat Intelligence Faculty
date: 2026-11-25
logsource:
    category: network_connection
    product: zeek
detection:
    selection:
        src_ip|startswith: '192.168.1.'
        dest_port:
            - 4444
            - 1337
            - 6667
            - 48101
    condition: selection
falsepositives:
    - Authorized remote management tunnels configured by systems engineering.
level: high
tags:
    - attack.command_and_control
    - attack.t1071
""")

# 7. Module 29: Compliance Checklist
m29_dir = os.path.join(LABS_ROOT, 'module-29')
nist_checklist = {
    "standard": "NIST IR 8259A / EN 303 645 Core IoT Capabilities",
    "evaluationDate": "2026-11-25",
    "capabilities": [
        {"id": "CAP-1-DEVICE-IDENTITY", "title": "Device Identification", "status": "COMPLIANT", "evidence": "Unique MAC address and burned SHA-256 device certificate in eFuse."},
        {"id": "CAP-2-CONFIGURATION", "title": "Device Configuration", "status": "COMPLIANT", "evidence": "Protected NVS encrypted partition for local configuration items."},
        {"id": "CAP-3-DATA-PROTECTION", "title": "Data Protection", "status": "COMPLIANT", "evidence": "TLS 1.3 encryption on external MQTT telemetry, zero cleartext passwords."},
        {"id": "CAP-4-INTERFACE-ACCESS", "title": "Logical Interface Access", "status": "COMPLIANT", "evidence": "Authentication required on all REST API and MQTT endpoints."},
        {"id": "CAP-5-SOFTWARE-UPDATE", "title": "Software Update", "status": "COMPLIANT", "evidence": "Dual-slot OTA with cryptographic signature validation before boot."},
        {"id": "CAP-6-CYBER-AWARENESS", "title": "Cybersecurity State Awareness", "status": "COMPLIANT", "evidence": "Firmware records boot reasons, fault interrupts, and auth failure counts."}
    ]
}
with open(os.path.join(m29_dir, 'nist_ir_8259_checklist.json'), 'w', encoding='utf-8') as f:
    json.dump(nist_checklist, f, indent=2)

# 8. Module 30: Capstone Pentest Report Template
m30_dir = os.path.join(LABS_ROOT, 'module-30')
with open(os.path.join(m30_dir, 'capstone_pentest_report_template.md'), 'w', encoding='utf-8') as f:
    f.write("""# Enterprise IoT Cybersecurity Penetration Test Report
**Target**: Smart-Room Monitoring Prototype & Gateway Enclave  
**Assessor**: _______________________________  
**Date**: 2026-11-25  
**Classification**: CONFIDENTIAL  

---

## 1. Executive Summary
- Brief statement of engagement scope, rules of engagement (ROE), and high-level findings.
- Total findings identified: Critical [ ], High [ ], Medium [ ], Low [ ], Informational [ ].

---

## 2. System Architecture & Attack Surface Analysis
- Map trust boundaries between the ESP32 node, Raspberry Pi gateway, and cloud broker.
- Hardware bus attack surface (UART, I2C, SPI, JTAG).
- Network and wireless attack surface (Wi-Fi, MQTT, HTTP, BLE).

---

## 3. Detailed Technical Findings
### Finding 1: [Title]
- **Severity**: Critical / High / Medium / Low
- **OWASP IoT Top 10 Mapping**: 
- **Affected Component**:
- **Proof of Concept (PoC)**:
```text
[Paste terminal commands, Wireshark filter, or serial log]
```
- **Root Cause Analysis**:
- **Remediation Recommendation**:

---

## 4. Hardware Safety & Electrical Verification
- Confirmation that all testing remained strictly within safe low-voltage DC bounds ($\le 3.3\\text{V}$).
- Multimeter measurements recorded: VCC = _____V, GND offset = _____mV.

---

## 5. Defensive Engineering & SOC Handoff
- Proposed Suricata / Sigma detection rules.
- Firmware hardening patch summary.
- Post-incident recovery checklist.
""")

print("Successfully enriched software and security lab packages!")
