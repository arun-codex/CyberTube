# CANONICAL CURRICULUM DEFINITIONS FOR 30 MODULES & 120 LESSONS
# Source of Truth: IOT_CyberTube_Complete_Redesign_Antigravity_Prompt.md

CANONICAL_MODULES_DEF = [
    # PHASE 1: IoT & Electronics Foundations (01–10)
    {
        "order": 1,
        "title": "Introduction to IoT & Cybersecurity",
        "phase": "Foundation",
        "hours": 4,
        "aim": "Establish a foundational understanding of IoT architectures, trust boundaries, physical safety impacts, and professional cybersecurity lab rules of engagement.",
        "prereq": "Basic computer literacy and terminal familiarity",
        "task": "Draw an end-to-end connected smart-room architecture diagram; identify trust boundaries and draft an authorized lab scope of work.",
        "output": "System architecture diagram + signed lab rules of engagement document",
        "lessons": [
            {
                "title": "Sensors, Actuators, Controllers & Cloud Architectures",
                "activity": "Distinguish physical sensors (temperature, motion), microcontrollers (ESP32), actuators (relays, buzzers), gateways, message brokers, and cloud backends.",
                "practice": "Classify 10 common IoT devices by hardware role, power source, and network connectivity method.",
                "check": "Learner can accurately identify the functional role and failure implications of each hardware component in an IoT topology."
            },
            {
                "title": "Device, Gateway, Broker & Cloud Trust Boundaries",
                "activity": "Trace physical and logical trust boundaries across device-to-gateway, gateway-to-broker, and broker-to-cloud communication channels.",
                "practice": "Mark cryptographic perimeters and unencrypted data paths across a residential smart-hub network diagram.",
                "check": "Learner can distinguish trusted from untrusted network segments and identify where encryption must be enforced."
            },
            {
                "title": "Insecure Data Paths & Physical Safety Impact",
                "activity": "Analyze how compromised sensor readings and rogue actuator commands can cause physical harm, property damage, or privacy invasion.",
                "practice": "Perform a physical hazard analysis for an automated industrial thermal cutoff switch and smart door lock.",
                "check": "Learner can articulate why IoT security failures have irreversible real-world physical consequences unlike traditional IT vulnerabilities."
            },
            {
                "title": "Authorized IoT Cybersecurity Lab Setup & Ethics",
                "activity": "Configure an isolated, authorized IoT security testing workstation adhering to ethical hacking rules of engagement and low-voltage safety limits.",
                "practice": "Set up a host-only virtual network, configure safe serial debugging tools, and document lab boundaries.",
                "check": "Workstation is fully isolated with documented rules of engagement and zero unauthorized network exposure."
            }
        ]
    },
    {
        "order": 2,
        "title": "Electronic Components & Circuit Fundamentals",
        "phase": "Foundation",
        "hours": 4,
        "aim": "Master low-voltage DC electronics, multimeter measurements, breadboard construction, Ohm's law, and discrete component safety.",
        "prereq": "Module 01: Introduction to IoT & Cybersecurity",
        "task": "Construct a benchtop breadboard circuit with current-limiting resistor, LED, and push button; verify DC voltages with a multimeter.",
        "output": "Measured circuit voltage worksheet + verified breadboard schematic",
        "lessons": [
            {
                "title": "Voltage, Current, Resistance & Safe Multimeter Measurements",
                "activity": "Learn DC voltage, current, ground reference, and how to measure DC volts, resistance, and continuity using a digital multimeter without shorting power rails.",
                "practice": "Measure forward voltage drops across red and green LEDs and verify resistor values using a digital multimeter.",
                "check": "Multimeter measurements match theoretical Ohm's Law calculations within 5% component tolerance."
            },
            {
                "title": "Breadboard Connectivity & LED Circuit Construction",
                "activity": "Understand breadboard internal terminal strip and power rail bus architecture; wire a discrete LED with series current-limiting resistor.",
                "practice": "Calculate required series resistance for a 3.3V supply and 2.0V forward-voltage LED at 10mA, then build and power the circuit.",
                "check": "Circuit illuminates reliably without overheating the resistor or exceeding 15mA continuous forward current."
            },
            {
                "title": "Pull-Up & Pull-Down Resistors, Switches & Logic Levels",
                "activity": "Analyze floating microcontroller input pins, digital CMOS logic thresholds (HIGH/LOW), and the function of 10kΩ pull-up/pull-down resistors.",
                "practice": "Wire an active-low tactile push button with an external 10kΩ pull-up resistor and measure the pin voltage in pressed and released states.",
                "check": "Pin voltage transitions cleanly between 3.3V (idle) and 0.0V (pressed) without floating intermediate voltages."
            },
            {
                "title": "Transistors, Switching Principles & Electrical Safety",
                "activity": "Understand bipolar junction transistors (NPN 2N2222) and logic-level N-channel MOSFETs as voltage-controlled switches; evaluate inductive flyback clamping.",
                "practice": "Wire an NPN transistor circuit driven by a low-current 3.3V signal to safely switch a 5V load with common ground.",
                "check": "Transistor saturates cleanly with base current limited by a 1kΩ resistor; microcontroller pin is fully isolated from load current."
            }
        ]
    },
    {
        "order": 3,
        "title": "ESP32 Programming & Hardware Architecture",
        "phase": "Foundation",
        "hours": 4,
        "aim": "Understand the ESP32 Tensilica Xtensa dual-core architecture, 3.3V pin limits, toolchain setup, boot strapping pins, and firmware compilation.",
        "prereq": "Module 02: Electronic Components & Circuit Fundamentals",
        "task": "Compile and flash a baseline versioned C++ firmware to ESP32 DevKit; log boot reason, MAC address, and build hash over Serial.",
        "output": "Clean firmware build + Serial bootloader output log with chip revision",
        "lessons": [
            {
                "title": "ESP32 Pinout, 3.3V Limits & Toolchain Setup",
                "activity": "Explore the ESP32 DevKit pinout, distinguishing input-only pins (GPIO 34-39), strapping pins, and power pins; set up Arduino IDE or ESP-IDF with USB-UART drivers.",
                "practice": "Install CP2102/CH340 drivers, configure board manager parameters in Arduino IDE, and verify board recognition.",
                "check": "Development environment compiles a blank sketch and communicates with the target ESP32 board over serial COM port."
            },
            {
                "title": "Compile, Flash & Serial Monitor Output",
                "activity": "Compile C++ sketches, upload binaries over USB at 115200 baud, and inspect UART Serial monitor boot logs and runtime diagnostics.",
                "practice": "Write and flash a sketch that prints chip core count, CPU frequency, and crystal oscillator frequency to the serial console.",
                "check": "Firmware compiles with zero warnings; serial monitor displays clear ASCII output at 115200 baud without baud-rate garbage."
            },
            {
                "title": "Boot Sequence, Reset Reasons & Hardware Debug Surfaces",
                "activity": "Analyze the ROM bootloader, first-stage bootloader, strapping pin logic levels (GPIO 0, 2, 12, 15), and hardware reset registers (`esp_reset_reason`).",
                "practice": "Capture serial boot banners during cold boot (power-on reset), software reset, and brownout reset conditions.",
                "check": "Learner can interpret ROM boot logs and accurately identify reset causes from register telemetry."
            },
            {
                "title": "Firmware Versioning, Build Provenance & Device Baseline",
                "activity": "Implement automated build metadata embedding (Git commit SHA, build timestamp, semantic version, target hardware variant) into firmware binaries.",
                "practice": "Compile versioning macros (`__DATE__`, `__TIME__`, `GIT_REV`) into an ESP32 firmware image and verify output during device initialization.",
                "check": "Boot banner displays unambiguous build provenance and device inventory metadata on every reboot."
            }
        ]
    },
    {
        "order": 4,
        "title": "GPIO, LEDs, Buttons & Local Controls",
        "phase": "Foundation",
        "hours": 4,
        "aim": "Program reliable digital inputs and outputs, hardware and software switch debouncing, GPIO interrupts, and fail-safe local alarm states.",
        "prereq": "Module 03: ESP32 Programming & Hardware Architecture",
        "task": "Construct a hardware button and dual-LED tamper indicator with non-blocking software debouncing and safe event logging.",
        "output": "Compilable debounce firmware + verified serial event log",
        "lessons": [
            {
                "title": "Digital Outputs, Current Drive & LED Indicator Control",
                "activity": "Configure ESP32 GPIO pins as outputs (`pinMode(OUTPUT)`, `digitalWrite`); observe drive current limits (12mA recommended, 40mA absolute maximum per pin).",
                "practice": "Write firmware to sequence green (normal) and red (alert) indicator LEDs with explicit state transitions.",
                "check": "LEDs toggle cleanly with current verified below 10mA per pin, avoiding voltage sag on the 3.3V regulator."
            },
            {
                "title": "Digital Inputs, Internal Pull-Ups & Software Debouncing",
                "activity": "Configure internal pull-up resistors (`INPUT_PULLUP`), understand mechanical switch contact bounce (10-50ms noise), and implement non-blocking `millis()` debouncing.",
                "practice": "Capture raw switch bounce on a logic analyzer or serial plotter, then implement a 50ms software debounce filter.",
                "check": "Each physical button press registers exactly one clean digital state change with zero bounce stutter."
            },
            {
                "title": "Hardware Interrupts vs Polling & Fault Handling",
                "activity": "Evaluate the architectural differences between polling loops and hardware interrupt service routines (`attachInterrupt`, `IRAM_ATTR`); prevent race conditions.",
                "practice": "Implement an edge-triggered falling interrupt for an emergency shutoff button using `volatile` state variables.",
                "check": "Interrupt fires within microseconds of physical contact; main execution loop remains non-blocking and responsive."
            },
            {
                "title": "Fail-Safe State Design & Local Tamper Event Logging",
                "activity": "Design fail-safe default states for connected outputs upon loss of signal, watchdog reset, or tamper detection; log timestamped security events to local memory.",
                "practice": "Simulate a cabinet enclosure tamper switch opening; trigger fail-safe lock mode and log event to circular memory buffer.",
                "check": "Outputs default to de-energized safe state immediately upon tamper; event log records timestamp and trigger reason."
            }
        ]
    },
    {
        "order": 5,
        "title": "IoT Sensors & Data Integrity",
        "phase": "Foundation",
        "hours": 4,
        "aim": "Interface digital and analog environmental sensors, validate measurement ranges, detect anomalous sensor faults, and prevent corrupted telemetry injection.",
        "prereq": "Module 04: GPIO, LEDs, Buttons & Local Controls",
        "task": "Build an environmental monitor with DHT22/BME280 sensor; implement range validation, stuck-at fault detection, and timestamped telemetry logging.",
        "output": "Validated sensor monitoring firmware + simulated sensor anomaly log",
        "lessons": [
            {
                "title": "DHT22 & BME280 Environmental Sensor Interfacing",
                "activity": "Interface digital temperature and humidity sensors (DHT22 single-wire bus and BME280 I2C bus); parse timing signals and 16-bit calibration coefficients.",
                "practice": "Wire a DHT22/BME280 to ESP32 with 10kΩ pull-up on data line; read and print calibrated temperature and relative humidity values.",
                "check": "Sensor returns valid ambient readings with verified CRC checksums on every measurement interval."
            },
            {
                "title": "Analog vs Digital Inputs & ESP32 ADC Caveats",
                "activity": "Examine analog-to-digital converter (ADC) resolution (12-bit, 0-4095), reference voltage, non-linear response curve below 0.1V and above 2.8V, and input attenuation settings.",
                "practice": "Read a resistive light sensor (LDR) divider on ADC1 (GPIO 32); calibrate raw ADC readings against measured voltage.",
                "check": "Learner avoids ADC2 while Wi-Fi is active and applies two-point calibration to compensate for non-linear ADC response."
            },
            {
                "title": "Data Integrity, Range Checking & Anomaly Filtering",
                "activity": "Implement defensive input validation algorithms on raw sensor telemetry: physical bound checks (-40°C to +80°C), rate-of-change delta limits, and checksum verification.",
                "practice": "Inject simulated frozen values and out-of-bounds spikes into sensor feed; verify defensive code flags anomalous readings.",
                "check": "Validation routine successfully discards out-of-bounds readings and raises an `INTEGRITY_FAULT` warning flag."
            },
            {
                "title": "Timestamped Telemetry Logging & Baseline Auditing",
                "activity": "Format validated sensor readings into structured JSON telemetry payloads with ISO-8601 timestamps and sequential message sequence IDs.",
                "practice": "Generate a rolling 50-entry telemetry buffer with moving average, standard deviation, and anomaly threshold markers.",
                "check": "Telemetry logs are consistently formatted, strictly monotonically sequenced, and parseable by automated ingest scripts."
            }
        ]
    },
    {
        "order": 6,
        "title": "Transistors, MOSFETs, Actuators & Safety",
        "phase": "Foundation",
        "hours": 4,
        "aim": "Drive high-current actuators safely using transistors and MOSFETs, clamp inductive flyback spikes with diodes, and implement hardware watchdog timers.",
        "prereq": "Module 05: IoT Sensors & Data Integrity",
        "task": "Construct a safe transistor-driven buzzer and alert actuator stage with flyback diode, optical isolation, and a hardware watchdog timeout.",
        "output": "Actuator driver schematic + watchdog-hardened firmware",
        "lessons": [
            {
                "title": "Transistors & MOSFETs as Low-Voltage Digital Switches",
                "activity": "Understand saturation mode in NPN bipolar transistors (2N2222) and logic-level N-channel MOSFETs (2N7000/IRLZ44N) for switching DC loads up to 500mA safely.",
                "practice": "Calculate base resistor value for 2N2222 given load current of 100mA and minimum hFE of 10; build the breadboard driver stage.",
                "check": "Collector-emitter voltage drops below 0.3V in saturation; microcontroller GPIO current remains safely under 3mA."
            },
            {
                "title": "Inductive Load Protection & Flyback Diode Clamping",
                "activity": "Analyze Lenz's Law and the high-voltage reverse inductive spike generated when de-energizing coils (buzzers, relays, small motors); wire parallel flyback diodes (1N4007).",
                "practice": "Observe voltage transient on an inductive coil upon switch open with and without a reverse-biased flyback clamping diode.",
                "check": "Flyback diode safely clamps back-EMF spike to within 0.7V of supply rail, preventing microcontroller latch-up or destruction."
            },
            {
                "title": "Driving Low-Voltage Buzzers & Fan Actuators Safely",
                "activity": "Wire discrete buzzers and 5V mini cooling fans to dedicated driver stages with common ground; enforce strict separation from sensitive 3.3V logic rails.",
                "practice": "Implement a PWM alarm tone generator on ESP32 driving a piezoelectric transducer through an NPN switching stage.",
                "check": "Buzzer generates clear audible alarm tones without creating noise or resets on the 3.3V microcontroller power rail."
            },
            {
                "title": "Hardware Watchdog Timers & Physical Fail-Safe Outputs",
                "activity": "Configure the ESP32 hardware watchdog timer (WDT) and Task Watchdog; ensure actuators automatically de-energize if firmware hangs or enters a deadlock.",
                "practice": "Write firmware with a 3-second watchdog timer; simulate an infinite loop and observe automatic reset and safe actuator de-energization.",
                "check": "Watchdog triggers chip reset within 3000ms of simulated hang; output pins immediately revert to safe de-energized state."
            }
        ]
    },
    {
        "order": 7,
        "title": "IoT Networking Fundamentals",
        "phase": "Foundation",
        "hours": 4,
        "aim": "Connect IoT devices to IP networks, configure Wi-Fi stations, understand embedded DHCP/DNS/TCP/UDP operations, and enforce network segmentation.",
        "prereq": "Module 06: Transistors, MOSFETs, Actuators & Safety",
        "task": "Connect ESP32 to an isolated test wireless access point; document MAC/IP assignments, inspect DHCP/DNS traffic, and verify subnet isolation.",
        "output": "Network connectivity matrix + Wi-Fi station configuration log",
        "lessons": [
            {
                "title": "Wi-Fi Station Onboarding, MAC Addressing & IP Assignment",
                "activity": "Configure ESP32 Wi-Fi station mode (`WiFi.begin`), manage Wi-Fi connection state machines, inspect device BSSID/MAC address, and acquire DHCP lease.",
                "practice": "Write firmware to connect to an authorized test SSID with exponential backoff on reconnection and static IP fallback.",
                "check": "Device successfully associates with AP, acquires IP lease, and logs assigned gateway, subnet mask, and DNS servers."
            },
            {
                "title": "Embedded IP Stacks: DHCP, DNS, TCP & UDP in Microcontrollers",
                "activity": "Examine the lightweight IP (lwIP) stack implemented in embedded firmware; trace packet encapsulation across Link, Internet, and Transport layers.",
                "practice": "Resolve a local hostname using embedded mDNS (`ESPmDNS`), send a UDP heartbeat broadcast, and measure network round-trip time.",
                "check": "Device responds to `<hostname>.local` name queries on the local subnet and delivers UDP packets with correct checksums."
            },
            {
                "title": "Mapping Device-to-Gateway & Cloud Traffic Flows",
                "activity": "Diagram network packet pathways from local ESP32 node through the access point, edge firewall, and upstream server; identify routing hops and gateways.",
                "practice": "Trace packet routes using `traceroute` and `ping` from workstation to ESP32; record TTL values and packet loss characteristics.",
                "check": "Complete network path is documented with IP subnets, VLAN tags, and port forwarding rules clearly demarcated."
            },
            {
                "title": "Test WLAN Lockdown, Isolation & Port Minimization",
                "activity": "Harden a dedicated IoT lab wireless access point: enable WPA2/WPA3-Personal, disable WPS and UPnP, configure client AP isolation, and close unused ports.",
                "practice": "Run an Nmap scan against the ESP32 IP from another client on the isolated network to verify client-to-client isolation.",
                "check": "Direct inter-station communication between wireless clients is blocked; device exposes only intentionally configured listening ports."
            }
        ]
    },
    {
        "order": 8,
        "title": "MQTT & Secure IoT Messaging",
        "phase": "Foundation",
        "hours": 4,
        "aim": "Implement publish-subscribe messaging with Eclipse Mosquitto, configure topic hierarchies, enforce user authentication and topic ACLs, and baseline telemetry.",
        "prereq": "Module 07: IoT Networking Fundamentals",
        "task": "Deploy an authenticated Eclipse Mosquitto broker; publish ESP32 sensor telemetry over topic tree and enforce strict read/write topic ACLs.",
        "output": "Mosquitto configuration + verified publisher/subscriber telemetry logs",
        "lessons": [
            {
                "title": "MQTT Architecture: Broker, Topics, QoS & Retained Messages",
                "activity": "Understand MQTT publish/subscribe architecture, topic hierarchies (`sensors/room1/temp`), Quality of Service levels (QoS 0, 1, 2), and retained message flags.",
                "practice": "Install Eclipse Mosquitto on lab workstation; subscribe to `#` wildcard using `mosquitto_sub` and publish test messages with `mosquitto_pub`.",
                "check": "Messages published to specific topics appear on the subscriber terminal with verified QoS delivery confirmation."
            },
            {
                "title": "Publishing ESP32 Sensor Telemetry to Local Mosquitto Broker",
                "activity": "Implement MQTT client functionality in ESP32 firmware using PubSubClient or AsyncMqttClient; publish formatted temperature/humidity telemetry every 5 seconds.",
                "practice": "Connect ESP32 to local Mosquitto broker on port 1883; publish structured JSON payloads containing sensor data and battery status.",
                "check": "Broker receives continuous telemetry stream; client handles unexpected broker disconnection with automatic reconnect logic."
            },
            {
                "title": "Broker Authentication, Password Hashing & Topic Access Control (ACLs)",
                "activity": "Disable anonymous broker access (`allow_anonymous false`), generate salted password hashes using `mosquitto_passwd`, and configure granular topic ACLs.",
                "practice": "Create an ACL rule permitting `device01` to write only to `devices/device01/telemetry` and read only `devices/device01/cmd`.",
                "check": "Device successfully publishes to permitted topic; attempts to publish to unauthorized root topics are strictly denied by broker."
            },
            {
                "title": "MQTT Traffic Baselining & Unauthorized Topic Detection",
                "activity": "Baseline normal MQTT publication frequency, topic scope, and payload sizes; identify rogue publishers and unauthorized topic snooping.",
                "practice": "Simulate an unauthorized rogue client attempting to subscribe to `#`; capture broker security log and alert on unexpected client ID.",
                "check": "Security log captures client authentication failures and unauthorized subscription attempts with accurate timestamps."
            }
        ]
    },
    {
        "order": 9,
        "title": "IoT HTTP, CoAP & API Security",
        "phase": "Foundation",
        "hours": 4,
        "aim": "Evaluate lightweight embedded web APIs, build a controlled local REST endpoint on ESP32, validate input parameters, and prevent injection attacks.",
        "prereq": "Module 08: MQTT & Secure IoT Messaging",
        "task": "Build a hardened read-only HTTP REST API on ESP32; implement input sanitization, rate limiting, and security response headers.",
        "output": "Hardened embedded REST server firmware + API security audit test report",
        "lessons": [
            {
                "title": "Protocol Comparison: CoAP vs HTTP vs MQTT in IoT",
                "activity": "Compare architectural trade-offs: CoAP (UDP-based binary REST with CBOR), HTTP/REST (stateless, text/JSON overhead), and MQTT (lightweight broker-mediated pub/sub).",
                "practice": "Measure bandwidth consumption, packet overhead, and battery power implications for sending 100 sensor readings across HTTP, MQTT, and CoAP.",
                "check": "Learner can justify the appropriate protocol choice based on network latency, constrained compute, and security requirements."
            },
            {
                "title": "Controlled Read-Only Local HTTP Endpoints on ESP32",
                "activity": "Implement an embedded HTTP web server on ESP32 (`WebServer.h`); expose dedicated read-only endpoints (`/api/status`, `/api/metrics`) in JSON format.",
                "practice": "Build an endpoint that returns device uptime, free heap memory, and sensor readings upon HTTP GET request.",
                "check": "Endpoint responds to valid GET requests with HTTP 200 OK and `Content-Type: application/json`; unsupported HTTP methods return 405 Method Not Allowed."
            },
            {
                "title": "API Input Validation, Query Parameter Sanitization & Headers",
                "activity": "Implement strict input validation on HTTP query parameters and JSON payloads: check length bounds, reject non-numeric inputs, and inject security headers.",
                "practice": "Configure `X-Content-Type-Options: nosniff` and `Access-Control-Allow-Origin` headers; reject oversized URI queries with HTTP 400 Bad Request.",
                "check": "Malformed queries and oversized payloads are discarded before parsing, preventing buffer overflows and heap exhaustion."
            },
            {
                "title": "Least Privilege, Endpoint Rate Limiting & Access Logging",
                "activity": "Apply principle of least privilege to embedded services: disable unneeded endpoints, implement a sliding-window IP rate limiter, and log client IP addresses.",
                "practice": "Simulate an automated HTTP flooding script; verify rate limiter throttles excessive requests with HTTP 429 Too Many Requests.",
                "check": "Device maintains responsive local sensor loop even during simulated HTTP request flooding; client IP addresses are logged over serial."
            }
        ]
    },
    {
        "order": 10,
        "title": "Secure Smart-Room Monitoring Project",
        "phase": "Foundation",
        "hours": 4,
        "aim": "Integrate discrete sensors, actuators, debounced controls, local dashboard, and hardened network messaging into Portfolio Project 1.",
        "prereq": "Modules 01–09 completion",
        "task": "Portfolio Project 1: Assemble and commission a functioning smart-room monitoring system with temperature/humidity sensor, LED/buzzer alert, local dashboard, and security threat model.",
        "output": "Portfolio Project 1 package: schematic, firmware repo, dashboard screenshot, and security threat review",
        "lessons": [
            {
                "title": "System Integration: Sensor, Transistor Actuator & Controller",
                "activity": "Integrate DHT22/BME280 sensor, debounced tamper button, status LEDs, and transistor-driven buzzer onto a common breadboard with ESP32 DevKit.",
                "practice": "Assemble full hardware netlist, verify common ground across all components, and power device from regulated 3.3V/5V USB supply.",
                "check": "Complete physical circuit operates reliably with zero voltage sags, brownout resets, or thermal throttling."
            },
            {
                "title": "Local Dashboard Construction with Node-RED / Lightweight UI",
                "activity": "Set up a local Node-RED dashboard or lightweight web interface connected to Mosquitto MQTT; visualize live sensor trends and alert states.",
                "practice": "Create dashboard UI nodes displaying real-time temperature, humidity gauge, tamper alarm status, and actuator control buttons.",
                "check": "Dashboard reflects physical sensor updates within 500ms; actuator controls on dashboard trigger physical hardware responses."
            },
            {
                "title": "Hardware Bill of Materials (BOM) & Network Inventory Documentation",
                "activity": "Compile a production-grade Hardware Bill of Materials (BOM) including part numbers, manufacturer, voltage tolerances, operating current, and network inventory.",
                "practice": "Document all physical parts, pin assignments (GPIO 2, 4, 16, 21, 22), MAC addresses, static IP allocations, and MQTT topic schemas.",
                "check": "Documentation contains zero missing parts or ambiguous pin connections; another engineer can reproduce the build identically."
            },
            {
                "title": "First Hardening Review, Safe Failover & Resilience Testing",
                "activity": "Conduct a comprehensive hardening audit of the integrated system: test power interruption recovery, network loss failover, watchdog resets, and unauthorized MQTT access.",
                "practice": "Disconnect Wi-Fi router during active operation; verify device continues local environmental monitoring and logs telemetry to offline buffer.",
                "check": "Device recovers gracefully upon network restoration, flushing offline buffer without data loss or actuator latch-up."
            }
        ]
    }
]
