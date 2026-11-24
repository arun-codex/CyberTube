# IoT Lab Safety & Authorization — Mandatory

## Always in scope
- OWASP IoTGoat / an intentionally vulnerable VM on a host-only or offline network.
- Firmware samples explicitly authorized for research; keep raw samples separate from extracted files.
- Synthetic PCAPs/logs, vendor documentation, and fictional architectures.
- A development board you own, after electrical safety verification, with a written test scope.

## Never in scope without formal permission and safety review
- Scanning public IoT IP addresses, internet-exposed cameras/routers, neighbors' Wi-Fi/BLE/Zigbee, or a vendor's cloud environment.
- Transmitting/replaying RF frames, attempting to control unknown devices, or interfering with communications.
- Any activity on operational medical, building automation, industrial, traffic, energy or safety-critical systems.
- Trying recovered credentials against real services, extracting private user data, or publishing secrets.

## Before each lab
1. Document owner, authorized asset, objective and in-scope network.
2. Prefer static inspection and passive traffic capture over active interaction.
3. Disable internet exposure for deliberately vulnerable systems; snapshot the VM.
4. Use disposable synthetic users, test secrets and lab-only devices.
5. Identify outage, electrical, privacy and physical-safety risks; stop if unknown.
6. Define evidence handling and rollback.

## After each lab
- Save only redacted evidence; preserve raw evidence only when needed and properly access-controlled.
- Restore clean snapshots and confirm no externally reachable services remain.
- Write factual observations, confidence, mitigations and detection opportunities.
- Report unexpected real vulnerabilities privately under a responsible disclosure process.

No real-world attack instructions are required to complete this course.
