# Practical Lab 04: Debounced Pushbutton Tamper Switch & Local Alarm Event Log

## 1. Overview & Objective
This lab package provides the authoritative, reproducible engineering resources for **Module 04** of the CyberTube IoT Cybersecurity & Ethical Hacking course.
Learners complete hands-on activities adhering to low-voltage DC bounds ($\le 3.3\text{V}$) and authorized lab boundaries.

- **Module**: 04 / 30
- **Track**: IoT Cybersecurity & Embedded Defense
- **Primary Hardware**: ESP32 DevKit, Tactile Button, 10kΩ Resistor (Pull-down), 5mm Alarm LED, 220Ω Resistor
- **Required Tools**: Arduino IDE 2.x, Serial Plotter, Digital Multimeter
- **Operating Voltage**: 3.3V DC

---

## 2. Learning Competencies
1. Configure and verify circuit connections or software components according to the provided schematics and netlists.
2. Observe and record real-time telemetry, serial output, or network traces during standard operation.
3. Apply defensive security controls (input validation, rate limiting, encryption, access control, or fail-safe states).
4. Complete the evidence worksheet in `evidence-template.md` and verify against `expected-output.txt`.

---

## 3. Package Manifest
| File | Purpose |
|---|---|
| `BOM.json` | Bill of Materials with exact part numbers, values, and voltage ratings |
| `wiring.json` | Pin-to-pin netlist, GPIO mappings, and logic levels |
| `diagram.json` | Schematic visual mapping corresponding to CyberTube CAD |
| `expected-output.txt` | Ground-truth console, packet capture, or terminal telemetry |
| `troubleshooting.md` | Common electrical, toolchain, and configuration failure remedies |
| `evidence-template.md` | Student reporting template for lab sign-off |
| `verification-report.json` | Syntax and simulation verification manifest |

---

## 4. Electrical Safety & Lab Rules
> [!IMPORTANT]
> - All microcontroller GPIO connections operate strictly at **3.3V DC**. Never apply 5V signals directly to ESP32 pins.
> - Strictly **zero mains AC voltage** is used in any breadboard or prototyping setup.
> - Ensure a common ground (GND) reference between all interconnected boards and sensors.
> - All network and radio tests must be confined to private, owned, and authorized lab environments.

---

## 5. Execution Instructions
1. Review the component specifications in `BOM.json` and make connections per `wiring.json`.
2. Review code or configuration in this directory.
3. Verify observed output against `expected-output.txt`.
4. Fill out `evidence-template.md` with your measured values, terminal screenshots, or PCAP filters.
