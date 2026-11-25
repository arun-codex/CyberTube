// CyberTube IoT Cybersecurity & Ethical Hacking: Zero to Advanced Course
// 30 Modules • 120 Lessons • 120 Unique Verified YouTube Videos • 0 Duplicates • No Quizzes
// Source of Truth: Canonical Curriculum Specification + Verified Video Manifest + Hardware Catalog

import type { Course, CourseModule, Lesson, PracticalLab, CapstoneAssessment, KeyTerminologyItem, TheorySectionItem, StepByStepProcedureItem } from '../types/course';
import { IOT_VIDEO_MANIFEST, getVideoForLesson } from './iot/video-manifest';
import { HARDWARE_CATALOG, getLessonBOM } from './iot/hardware-catalog';
import { IOT_DIAGRAMS, getDiagramForModule } from './iot/diagrams';
import { IOT_PROJECTS, getProjectForModule } from './iot/projects';

type VideoSource = { title: string; url: string; videoId: string; creator: string; durationMinutes?: number };
type LessonSource = { title: string; activity: string; practice: string; check: string };
type ModuleSource = {
  title: string;
  phase: string;
  hours: number;
  aim: string;
  prereq: string;
  task: string;
  output: string;
  steps: string[];
  reading: { title: string; url: string }[];
  videos: VideoSource[];
  lessons: LessonSource[];
};

const RAW_MODULES: ModuleSource[] = [
  {
  "title": "Introduction to IoT & Cybersecurity",
  "phase": "Foundation",
  "hours": 4,
  "aim": "Establish a foundational understanding of IoT architectures, trust boundaries, physical safety impacts, and professional cybersecurity lab rules of engagement.",
  "prereq": "Basic computer literacy and terminal familiarity",
  "task": "Draw an end-to-end connected smart-room architecture diagram; identify trust boundaries and draft an authorized lab scope of work.",
  "output": "System architecture diagram + signed lab rules of engagement document",
  "steps": [
    "Review Module 01 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Draw an end-to-end connected smart-room architecture diagram; identify trust boundaries and draft an authorized lab scope of work..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: System architecture diagram + signed lab rules of engagement document."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "Introduction to IoT Hacking - 1.1 Getting Started",
      "url": "https://www.youtube.com/watch?v=jY51TKyOq7U",
      "videoId": "jY51TKyOq7U",
      "creator": "LufSec Cyber Security",
      "durationMinutes": 1
    },
    {
      "title": "IoT Security Problems | Internet of Things - IoT | Engineering Funda",
      "url": "https://www.youtube.com/watch?v=ijhU66n5Po8",
      "videoId": "ijhU66n5Po8",
      "creator": "Engineering Funda",
      "durationMinutes": 11
    },
    {
      "title": "Elements of IoT Security: Authentication, Access Control, Data Security, and Non-Repudiation",
      "url": "https://www.youtube.com/watch?v=qzre4NKO_LE",
      "videoId": "qzre4NKO_LE",
      "creator": "Engineering Funda",
      "durationMinutes": 10
    },
    {
      "title": "IoT Security Challenges | Internet of Things - IoT | Engineering Funda",
      "url": "https://www.youtube.com/watch?v=y1iDtMmc_iE",
      "videoId": "y1iDtMmc_iE",
      "creator": "Engineering Funda",
      "durationMinutes": 14
    }
  ],
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
  "title": "Electronic Components & Circuit Fundamentals",
  "phase": "Foundation",
  "hours": 4,
  "aim": "Master low-voltage DC electronics, multimeter measurements, breadboard construction, Ohm's law, and discrete component safety.",
  "prereq": "Module 01: Introduction to IoT & Cybersecurity",
  "task": "Construct a benchtop breadboard circuit with current-limiting resistor, LED, and push button; verify DC voltages with a multimeter.",
  "output": "Measured circuit voltage worksheet + verified breadboard schematic",
  "steps": [
    "Review Module 02 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Construct a benchtop breadboard circuit with current-limiting resistor, LED, and push button; verify DC voltages with a multimeter..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Measured circuit voltage worksheet + verified breadboard schematic."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "HOW TO USE A MULTIMETER \u2013 Measure Voltage, Current, Resistance and Continuity",
      "url": "https://www.youtube.com/watch?v=R1n4HSCTE9I",
      "videoId": "R1n4HSCTE9I",
      "creator": "LEARN ELECTRICS",
      "durationMinutes": 20
    },
    {
      "title": "Breadboarding tips",
      "url": "https://www.youtube.com/watch?v=PE-_rJqvDhQ",
      "videoId": "PE-_rJqvDhQ",
      "creator": "Ben Eater",
      "durationMinutes": 20
    },
    {
      "title": "Pull-up and pull-down resistors explained",
      "url": "https://www.youtube.com/watch?v=Z1_Ag3dxH34",
      "videoId": "Z1_Ag3dxH34",
      "creator": "Blueprint IoT",
      "durationMinutes": 7
    },
    {
      "title": "How a transistor works",
      "url": "https://www.youtube.com/watch?v=DXvAlwMAxiA",
      "videoId": "DXvAlwMAxiA",
      "creator": "Ben Eater",
      "durationMinutes": 11
    }
  ],
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
      "activity": "Analyze floating microcontroller input pins, digital CMOS logic thresholds (HIGH/LOW), and the function of 10k\u03a9 pull-up/pull-down resistors.",
      "practice": "Wire an active-low tactile push button with an external 10k\u03a9 pull-up resistor and measure the pin voltage in pressed and released states.",
      "check": "Pin voltage transitions cleanly between 3.3V (idle) and 0.0V (pressed) without floating intermediate voltages."
    },
    {
      "title": "Transistors, Switching Principles & Electrical Safety",
      "activity": "Understand bipolar junction transistors (NPN 2N2222) and logic-level N-channel MOSFETs as voltage-controlled switches; evaluate inductive flyback clamping.",
      "practice": "Wire an NPN transistor circuit driven by a low-current 3.3V signal to safely switch a 5V load with common ground.",
      "check": "Transistor saturates cleanly with base current limited by a 1k\u03a9 resistor; microcontroller pin is fully isolated from load current."
    }
  ]
},
  {
  "title": "ESP32 Programming & Hardware Architecture",
  "phase": "Foundation",
  "hours": 4,
  "aim": "Understand the ESP32 Tensilica Xtensa dual-core architecture, 3.3V pin limits, toolchain setup, boot strapping pins, and firmware compilation.",
  "prereq": "Module 02: Electronic Components & Circuit Fundamentals",
  "task": "Compile and flash a baseline versioned C++ firmware to ESP32 DevKit; log boot reason, MAC address, and build hash over Serial.",
  "output": "Clean firmware build + Serial bootloader output log with chip revision",
  "steps": [
    "Review Module 03 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Compile and flash a baseline versioned C++ firmware to ESP32 DevKit; log boot reason, MAC address, and build hash over Serial..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Clean firmware build + Serial bootloader output log with chip revision."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "Introduction to ESP32 - Getting Started",
      "url": "https://www.youtube.com/watch?v=xPlN_Tk3VLQ",
      "videoId": "xPlN_Tk3VLQ",
      "creator": "DroneBot Workshop",
      "durationMinutes": 48
    },
    {
      "title": "ESP32 Tutorial - How to use Serial Monitor (NEW Arduino IDE)",
      "url": "https://www.youtube.com/watch?v=wia2sUjNpwI",
      "videoId": "wia2sUjNpwI",
      "creator": "DIY TechRush",
      "durationMinutes": 8
    },
    {
      "title": "ESP32 Strapping Pins Explained: Why Your ESP32 Won't Boot (GPIO0, GPIO2, GPIO12)",
      "url": "https://www.youtube.com/watch?v=cjH3TL3GjA0",
      "videoId": "cjH3TL3GjA0",
      "creator": "Datasheet Decoded",
      "durationMinutes": 4
    },
    {
      "title": "Whiteboard Wednesday: Extracting Firmware from Microcontrollers",
      "url": "https://www.youtube.com/watch?v=A-nCPtt3H7s",
      "videoId": "A-nCPtt3H7s",
      "creator": "Rapid7",
      "durationMinutes": 4
    }
  ],
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
  "title": "GPIO, LEDs, Buttons & Local Controls",
  "phase": "Foundation",
  "hours": 4,
  "aim": "Program reliable digital inputs and outputs, hardware and software switch debouncing, GPIO interrupts, and fail-safe local alarm states.",
  "prereq": "Module 03: ESP32 Programming & Hardware Architecture",
  "task": "Construct a hardware button and dual-LED tamper indicator with non-blocking software debouncing and safe event logging.",
  "output": "Compilable debounce firmware + verified serial event log",
  "steps": [
    "Review Module 04 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Construct a hardware button and dual-LED tamper indicator with non-blocking software debouncing and safe event logging..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Compilable debounce firmware + verified serial event log."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "ESP32 Guide 2026",
      "url": "https://www.youtube.com/watch?v=CfIjInYch7U",
      "videoId": "CfIjInYch7U",
      "creator": "DroneBot Workshop",
      "durationMinutes": 45
    },
    {
      "title": "The Best Possible Cheap and Easy Switch Debounce and Noise Immunity Technique - Simply Put",
      "url": "https://www.youtube.com/watch?v=Y-c7lf7mGok",
      "videoId": "Y-c7lf7mGok",
      "creator": "Simply Put",
      "durationMinutes": 14
    },
    {
      "title": "#328 ESP32 Secrets: Interrupts, and Deep-Sleep under the Hood",
      "url": "https://www.youtube.com/watch?v=CJhWlfkf-5M",
      "videoId": "CJhWlfkf-5M",
      "creator": "Andreas Spiess",
      "durationMinutes": 19
    },
    {
      "title": "Fail Safe Embedded Linux: Designing for Power Resilience",
      "url": "https://www.youtube.com/watch?v=0sl7D2BjP34",
      "videoId": "0sl7D2BjP34",
      "creator": "Sergio Prado",
      "durationMinutes": 46
    }
  ],
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
  "title": "IoT Sensors & Data Integrity",
  "phase": "Foundation",
  "hours": 4,
  "aim": "Interface digital and analog environmental sensors, validate measurement ranges, detect anomalous sensor faults, and prevent corrupted telemetry injection.",
  "prereq": "Module 04: GPIO, LEDs, Buttons & Local Controls",
  "task": "Build an environmental monitor with DHT22/BME280 sensor; implement range validation, stuck-at fault detection, and timestamped telemetry logging.",
  "output": "Validated sensor monitoring firmware + simulated sensor anomaly log",
  "steps": [
    "Review Module 05 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Build an environmental monitor with DHT22/BME280 sensor; implement range validation, stuck-at fault detection, and timestamped telemetry logging..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Validated sensor monitoring firmware + simulated sensor anomaly log."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "ESP32 Tutorial - DHT11/DHT22 (Temperature and Humidity Sensor)",
      "url": "https://www.youtube.com/watch?v=K98h51XuqBE",
      "videoId": "K98h51XuqBE",
      "creator": "DIY TechRush",
      "durationMinutes": 7
    },
    {
      "title": "Why Is Your ESP32 ADC Inaccurate? | How to Fix ESP32 ADC Noise ?",
      "url": "https://www.youtube.com/watch?v=eVxCUg0IhqI",
      "videoId": "eVxCUg0IhqI",
      "creator": "Embedded Programmer",
      "durationMinutes": 15
    },
    {
      "title": "SensorTrust Demo",
      "url": "https://www.youtube.com/watch?v=vqPe6ztbGFo",
      "videoId": "vqPe6ztbGFo",
      "creator": "SANJAYKUMAR M",
      "durationMinutes": 3
    },
    {
      "title": "ESP32 Non Volatile Storage - FRAM, Flash & EEPROM",
      "url": "https://www.youtube.com/watch?v=x5ew5GjKLlQ",
      "videoId": "x5ew5GjKLlQ",
      "creator": "DroneBot Workshop",
      "durationMinutes": 40
    }
  ],
  "lessons": [
    {
      "title": "DHT22 & BME280 Environmental Sensor Interfacing",
      "activity": "Interface digital temperature and humidity sensors (DHT22 single-wire bus and BME280 I2C bus); parse timing signals and 16-bit calibration coefficients.",
      "practice": "Wire a DHT22/BME280 to ESP32 with 10k\u03a9 pull-up on data line; read and print calibrated temperature and relative humidity values.",
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
      "activity": "Implement defensive input validation algorithms on raw sensor telemetry: physical bound checks (-40\u00b0C to +80\u00b0C), rate-of-change delta limits, and checksum verification.",
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
  "title": "Transistors, MOSFETs, Actuators & Safety",
  "phase": "Foundation",
  "hours": 4,
  "aim": "Drive high-current actuators safely using transistors and MOSFETs, clamp inductive flyback spikes with diodes, and implement hardware watchdog timers.",
  "prereq": "Module 05: IoT Sensors & Data Integrity",
  "task": "Construct a safe transistor-driven buzzer and alert actuator stage with flyback diode, optical isolation, and a hardware watchdog timeout.",
  "output": "Actuator driver schematic + watchdog-hardened firmware",
  "steps": [
    "Review Module 06 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Construct a safe transistor-driven buzzer and alert actuator stage with flyback diode, optical isolation, and a hardware watchdog timeout..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Actuator driver schematic + watchdog-hardened firmware."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "Active, saturation, & cutoff state of NPN transistor | Class 12 (India) | Physics | Khan Academy",
      "url": "https://www.youtube.com/watch?v=cuOFG_ISHno",
      "videoId": "cuOFG_ISHno",
      "creator": "Khan Academy India - English",
      "durationMinutes": 12
    },
    {
      "title": "Flyback Diodes - Simply Put",
      "url": "https://www.youtube.com/watch?v=haUWO7BGYTE",
      "videoId": "haUWO7BGYTE",
      "creator": "Simply Put",
      "durationMinutes": 8
    },
    {
      "title": "MOSFETs and Transistors with Arduino",
      "url": "https://www.youtube.com/watch?v=IG5vw6P9iY4",
      "videoId": "IG5vw6P9iY4",
      "creator": "DroneBot Workshop",
      "durationMinutes": 41
    },
    {
      "title": "Watchdog Timer im ESP32 & Arduino Core | Effiziente Fehlerbehandlung",
      "url": "https://www.youtube.com/watch?v=j56oN03N5xI",
      "videoId": "j56oN03N5xI",
      "creator": "pixeledi Tech Hub",
      "durationMinutes": 12
    }
  ],
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
  "title": "IoT Networking Fundamentals",
  "phase": "Foundation",
  "hours": 4,
  "aim": "Connect IoT devices to IP networks, configure Wi-Fi stations, understand embedded DHCP/DNS/TCP/UDP operations, and enforce network segmentation.",
  "prereq": "Module 06: Transistors, MOSFETs, Actuators & Safety",
  "task": "Connect ESP32 to an isolated test wireless access point; document MAC/IP assignments, inspect DHCP/DNS traffic, and verify subnet isolation.",
  "output": "Network connectivity matrix + Wi-Fi station configuration log",
  "steps": [
    "Review Module 07 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Connect ESP32 to an isolated test wireless access point; document MAC/IP assignments, inspect DHCP/DNS traffic, and verify subnet isolation..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Network connectivity matrix + Wi-Fi station configuration log."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "Best Practices for Securing IoT System | IoT Security | Internet of Things - IoT | Engineering Funda",
      "url": "https://www.youtube.com/watch?v=7gwqO7MpNB0",
      "videoId": "7gwqO7MpNB0",
      "creator": "Engineering Funda",
      "durationMinutes": 10
    },
    {
      "title": "IoT Tomography Explained: Basics, Computational, Security, and Network Tomography",
      "url": "https://www.youtube.com/watch?v=e7vHlcEjT78",
      "videoId": "e7vHlcEjT78",
      "creator": "Engineering Funda",
      "durationMinutes": 9
    },
    {
      "title": "Nmap Tutorial For Beginners - 1 - What is Nmap?",
      "url": "https://www.youtube.com/watch?v=5MTZdN9TEO4",
      "videoId": "5MTZdN9TEO4",
      "creator": "HackerSploit",
      "durationMinutes": 13
    },
    {
      "title": "let\u2019s subnet your home network // You SUCK at subnetting // EP 6",
      "url": "https://www.youtube.com/watch?v=mJ_5qeqGOaI",
      "videoId": "mJ_5qeqGOaI",
      "creator": "NetworkChuck",
      "durationMinutes": 10
    }
  ],
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
  "title": "MQTT & Secure IoT Messaging",
  "phase": "Foundation",
  "hours": 4,
  "aim": "Implement publish-subscribe messaging with Eclipse Mosquitto, configure topic hierarchies, enforce user authentication and topic ACLs, and baseline telemetry.",
  "prereq": "Module 07: IoT Networking Fundamentals",
  "task": "Deploy an authenticated Eclipse Mosquitto broker; publish ESP32 sensor telemetry over topic tree and enforce strict read/write topic ACLs.",
  "output": "Mosquitto configuration + verified publisher/subscriber telemetry logs",
  "steps": [
    "Review Module 08 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Deploy an authenticated Eclipse Mosquitto broker; publish ESP32 sensor telemetry over topic tree and enforce strict read/write topic ACLs..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Mosquitto configuration + verified publisher/subscriber telemetry logs."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "What is MQTT and How It Works",
      "url": "https://www.youtube.com/watch?v=EIxdz-2rhLs",
      "videoId": "EIxdz-2rhLs",
      "creator": "Rui Santos",
      "durationMinutes": 4
    },
    {
      "title": "Simple ESP32 IoT Sensor Node Tutorial: WiFi Enabled MQTT Sensor Data Node",
      "url": "https://www.youtube.com/watch?v=x5A5S0hoyJ0",
      "videoId": "x5A5S0hoyJ0",
      "creator": "Learn Embedded Systems",
      "durationMinutes": 10
    },
    {
      "title": "How to configure an MQTT Mosquitto v2 broker and enable user authentication on Windows in 2022",
      "url": "https://www.youtube.com/watch?v=hyJhKWhxAxA",
      "videoId": "hyJhKWhxAxA",
      "creator": "AutomationStation",
      "durationMinutes": 11
    },
    {
      "title": "11. IOT Forensics: Capture Live MQTT Traffic",
      "url": "https://www.youtube.com/watch?v=RDyKIie75UM",
      "videoId": "RDyKIie75UM",
      "creator": "Atdhe Buja",
      "durationMinutes": 9
    }
  ],
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
  "title": "IoT HTTP, CoAP & API Security",
  "phase": "Foundation",
  "hours": 4,
  "aim": "Evaluate lightweight embedded web APIs, build a controlled local REST endpoint on ESP32, validate input parameters, and prevent injection attacks.",
  "prereq": "Module 08: MQTT & Secure IoT Messaging",
  "task": "Build a hardened read-only HTTP REST API on ESP32; implement input sanitization, rate limiting, and security response headers.",
  "output": "Hardened embedded REST server firmware + API security audit test report",
  "steps": [
    "Review Module 09 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Build a hardened read-only HTTP REST API on ESP32; implement input sanitization, rate limiting, and security response headers..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Hardened embedded REST server firmware + API security audit test report."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "CoAP - Constrained Application Protocol Explained: Basics, Layers, and Message Types",
      "url": "https://www.youtube.com/watch?v=zpKJuJs_zfg",
      "videoId": "zpKJuJs_zfg",
      "creator": "Engineering Funda",
      "durationMinutes": 10
    },
    {
      "title": "ESP32 Web Server Tutorial | Control LED Using HTTP & WiFi",
      "url": "https://www.youtube.com/watch?v=ZnaUBq_B3E4",
      "videoId": "ZnaUBq_B3E4",
      "creator": "MyTechLearner",
      "durationMinutes": 8
    },
    {
      "title": "Bearer Token Authentication for REST APIs",
      "url": "https://www.youtube.com/watch?v=6BPEQU53HgA",
      "videoId": "6BPEQU53HgA",
      "creator": "Ram N Java",
      "durationMinutes": 3
    },
    {
      "title": "Rate Limiting in ASP.NET Core & .NET 10 | Complete Guide | HTTP 429, Token Bucket, Sliding Window",
      "url": "https://www.youtube.com/watch?v=lsvMtw68D58",
      "videoId": "lsvMtw68D58",
      "creator": "CodeWithDikshit",
      "durationMinutes": 2
    }
  ],
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
  "title": "Secure Smart-Room Monitoring Project",
  "phase": "Foundation",
  "hours": 4,
  "aim": "Integrate discrete sensors, actuators, debounced controls, local dashboard, and hardened network messaging into Portfolio Project 1.",
  "prereq": "Modules 01\u201309 completion",
  "task": "Portfolio Project 1: Assemble and commission a functioning smart-room monitoring system with temperature/humidity sensor, LED/buzzer alert, local dashboard, and security threat model.",
  "output": "Portfolio Project 1 package: schematic, firmware repo, dashboard screenshot, and security threat review",
  "steps": [
    "Review Module 10 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Portfolio Project 1: Assemble and commission a functioning smart-room monitoring system with temperature/humidity sensor, LED/buzzer alert, local dashboard, and security threat model..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Portfolio Project 1 package: schematic, firmware repo, dashboard screenshot, and security threat review."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "Larnitech Smart Home System Architecture",
      "url": "https://www.youtube.com/watch?v=x2LUHX0zOgY",
      "videoId": "x2LUHX0zOgY",
      "creator": "Larnitech GmbH",
      "durationMinutes": 4
    },
    {
      "title": "MQTT with ESP32 and DHT22 using Wokwi | Display on Node-Red Dashboard",
      "url": "https://www.youtube.com/watch?v=fbQRF_IKuo4",
      "videoId": "fbQRF_IKuo4",
      "creator": "IoT Frontier",
      "durationMinutes": 13
    },
    {
      "title": "An Intro to KiCad \u2013 Part 9: Generate BOM and Order Parts | DigiKey",
      "url": "https://www.youtube.com/watch?v=I7GUiGoD1w8",
      "videoId": "I7GUiGoD1w8",
      "creator": "DigiKey",
      "durationMinutes": 7
    },
    {
      "title": "Node-Red with ESP32 | Control LED Tutorial",
      "url": "https://www.youtube.com/watch?v=N4uf23x4vmM",
      "videoId": "N4uf23x4vmM",
      "creator": "Ehab Magdy",
      "durationMinutes": 2
    }
  ],
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
},
  {
  "title": "UART, I2C & SPI Security",
  "phase": "Core",
  "hours": 6,
  "aim": "Analyze hardware serial bus protocols, sniff unencrypted serial debug outputs, scan I2C slave addresses, probe SPI chip-select lines, and disable production debug surfaces.",
  "prereq": "Module 10: Secure Smart-Room Monitoring Project",
  "task": "Connect an I2C OLED display or sensor and map active bus addresses; inspect UART serial traffic with 3.3V logic analyzer and document debug exposure risks.",
  "output": "I2C bus address scan report + UART debug port exposure audit",
  "steps": [
    "Review Module 11 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Connect an I2C OLED display or sensor and map active bus addresses; inspect UART serial traffic with 3.3V logic analyzer and document debug exposure risks..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: I2C bus address scan report + UART debug port exposure audit."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "UART Protocol - Universal Asynchronous Receiver Transmitter Protocol",
      "url": "https://www.youtube.com/watch?v=293VWAkwxqs",
      "videoId": "293VWAkwxqs",
      "creator": "Engineering Funda",
      "durationMinutes": 9
    },
    {
      "title": "How to efficiently debug I2C communication with a logic analyzer??",
      "url": "https://www.youtube.com/watch?v=9GHKuFoOnVc",
      "videoId": "9GHKuFoOnVc",
      "creator": "Fastbit Embedded Brain Academy",
      "durationMinutes": 3
    },
    {
      "title": "SPI Communication Protocol Explained!",
      "url": "https://www.youtube.com/watch?v=sIv6AFW-ONM",
      "videoId": "sIv6AFW-ONM",
      "creator": "EMBEDX",
      "durationMinutes": 2
    },
    {
      "title": "Every Hardware Protocol Explained For Beginners in 10 Mins | UART, RS232, SPI, I2C, CAN, USB & More",
      "url": "https://www.youtube.com/watch?v=iuAVSkAF9s4",
      "videoId": "iuAVSkAF9s4",
      "creator": "Learn with Whiteboard",
      "durationMinutes": 10
    }
  ],
  "lessons": [
    {
      "title": "UART Serial Communications, Baud Rates & Data Exposure",
      "activity": "Understand asynchronous serial framing (start bit, 8 data bits, parity, stop bit, baud rate); identify how unauthenticated root shells and plaintext logs leak over TX/RX pins.",
      "practice": "Connect a 3.3V USB-UART adapter to ESP32 TXD0/RXD0; observe bootloader output and interactive REPL console at 115200 baud.",
      "check": "Learner can identify UART pin connections (TX, RX, GND) and configure terminal emulator parameters to capture serial telemetry cleanly."
    },
    {
      "title": "I2C Bus Architecture, Address Probing & Clock Stretching",
      "activity": "Examine Inter-Integrated Circuit (I2C) master-slave communication on SDA and SCL lines with 4.7k\u03a9 pull-up resistors; understand 7-bit device addressing and bus collision.",
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
  "title": "Credentials, Device Identity & Secret Storage",
  "phase": "Core",
  "hours": 6,
  "aim": "Eliminate hardcoded credentials from firmware source, implement secure Non-Volatile Storage (NVS), generate per-device secrets, and design key rotation mechanisms.",
  "prereq": "Module 11: UART, I2C & SPI Security",
  "task": "Refactor a vulnerable firmware with hardcoded credentials to use encrypted NVS partition and unique per-device identity tokens.",
  "output": "Refactored firmware repo + secret storage security architecture diagram",
  "steps": [
    "Review Module 12 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Refactor a vulnerable firmware with hardcoded credentials to use encrypted NVS partition and unique per-device identity tokens..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Refactored firmware repo + secret storage security architecture diagram."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "How to reverse Router Firmware to extract router credentials|2024|Series-I",
      "url": "https://www.youtube.com/watch?v=WHs-iGG_Vww",
      "videoId": "WHs-iGG_Vww",
      "creator": "ShellXploit",
      "durationMinutes": 18
    },
    {
      "title": "ESP32 NVS Configuration Storage: Designing for Data Integrity, Power Loss, and Field Reliability",
      "url": "https://www.youtube.com/watch?v=p_zA3Bli2xs",
      "videoId": "p_zA3Bli2xs",
      "creator": "Learning By Tutorials",
      "durationMinutes": 2
    },
    {
      "title": "Secure Boot with ATECC608A",
      "url": "https://www.youtube.com/watch?v=cbOuo-wL2Ms",
      "videoId": "cbOuo-wL2Ms",
      "creator": "Microchip Technology, Inc.",
      "durationMinutes": 11
    },
    {
      "title": "AWS IoT Core Device Provisioning | Secure Device Provisioning | Course Introduction | Whizlabs",
      "url": "https://www.youtube.com/watch?v=Q59H6bhiYRI",
      "videoId": "Q59H6bhiYRI",
      "creator": "Whizlabs",
      "durationMinutes": 5
    }
  ],
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
  "title": "TLS, Certificates & Secure Messaging",
  "phase": "Core",
  "hours": 6,
  "aim": "Implement Transport Layer Security (TLS 1.2/1.3), establish a private certificate authority (CA), enforce strict X.509 certificate validation on ESP32, and prevent MITM attacks.",
  "prereq": "Module 12: Credentials, Device Identity & Secret Storage",
  "task": "Portfolio Project 2: Establish a verified TLS-secured MQTTS connection from ESP32 to Mosquitto broker on port 8883; verify rejection of self-signed rogue certificates.",
  "output": "Portfolio Project 2 package: OpenSSL CA scripts, TLS client firmware, and Wireshark PCAP proving encryption",
  "steps": [
    "Review Module 13 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Portfolio Project 2: Establish a verified TLS-secured MQTTS connection from ESP32 to Mosquitto broker on port 8883; verify rejection of self-signed rogue certificates..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Portfolio Project 2 package: OpenSSL CA scripts, TLS client firmware, and Wireshark PCAP proving encryption."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "TLS Handshake Explained - Computerphile",
      "url": "https://www.youtube.com/watch?v=86cQJ0MMses",
      "videoId": "86cQJ0MMses",
      "creator": "Computerphile",
      "durationMinutes": 17
    },
    {
      "title": "What is PKI (Public Key Infrastructure)? The most confusing question in cybersecurity!",
      "url": "https://www.youtube.com/watch?v=y72Udn5uJZk",
      "videoId": "y72Udn5uJZk",
      "creator": "IT k Funde",
      "durationMinutes": 11
    },
    {
      "title": "#232 How to secure our devices using SSL (ESP8266, ESP32, Tutorial)",
      "url": "https://www.youtube.com/watch?v=Wm1xKj4bKsY",
      "videoId": "Wm1xKj4bKsY",
      "creator": "Andreas Spiess",
      "durationMinutes": 17
    },
    {
      "title": "Man in The Middle Attack and SSLPinning | Ethical Hacking | Charles | iOS | Swift | Xcode",
      "url": "https://www.youtube.com/watch?v=HWJ3cCNdKKA",
      "videoId": "HWJ3cCNdKKA",
      "creator": "iCode",
      "durationMinutes": 25
    }
  ],
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
  "title": "Firmware Updates, Secure Boot & OTA",
  "phase": "Core",
  "hours": 6,
  "aim": "Master Over-The-Air (OTA) firmware update lifecycles, dual-partition flash layouts, cryptographic signature verification, anti-rollback protection, and recovery failover.",
  "prereq": "Module 13: TLS, Certificates & Secure Messaging",
  "task": "Build and deploy a signed dual-partition OTA firmware update; verify rollback mechanism upon simulated boot fault and prove anti-rollback enforcement.",
  "output": "OTA update deployment package + flash partition map and rollback verification log",
  "steps": [
    "Review Module 14 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Build and deploy a signed dual-partition OTA firmware update; verify rollback mechanism upon simulated boot fault and prove anti-rollback enforcement..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: OTA update deployment package + flash partition map and rollback verification log."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "#332 ESP32  OTA tutorial with tricks (incl. OTA debugging)",
      "url": "https://www.youtube.com/watch?v=1pwqS_NUG7Q",
      "videoId": "1pwqS_NUG7Q",
      "creator": "Andreas Spiess",
      "durationMinutes": 10
    },
    {
      "title": "OTA with the ESP32 (Over The Air)",
      "url": "https://www.youtube.com/watch?v=VyCG1MHdw3g",
      "videoId": "VyCG1MHdw3g",
      "creator": "Programming Electronics Academy",
      "durationMinutes": 9
    },
    {
      "title": "Secure Boot for Embedded Linux: Explained in Simple Words - Roy Jamil, Ac6",
      "url": "https://www.youtube.com/watch?v=HqiG6kvHhyQ",
      "videoId": "HqiG6kvHhyQ",
      "creator": "The Linux Foundation",
      "durationMinutes": 42
    },
    {
      "title": "ESP32 Flash Encryption Explained | Complete eFuse Guide + Automation Scripts",
      "url": "https://www.youtube.com/watch?v=GyAqlYea8wU",
      "videoId": "GyAqlYea8wU",
      "creator": "OrbitalObserver",
      "durationMinutes": 23
    }
  ],
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
  "title": "Wireshark for IoT Security",
  "phase": "Core",
  "hours": 6,
  "aim": "Capture, filter, and analyze IoT network traffic using Wireshark; baseline normal device communications, identify cleartext secrets, and detect anomalous network activity.",
  "prereq": "Module 14: Firmware Updates, Secure Boot & OTA",
  "task": "Portfolio Project 3: Capture an authorized IoT communication PCAP trace; baseline DNS/NTP/MQTT/TLS traffic, detect simulated beaconing anomalies, and document findings.",
  "output": "Portfolio Project 3 package: Annotated PCAP file, Wireshark filter library, and defensive anomaly report",
  "steps": [
    "Review Module 15 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Portfolio Project 3: Capture an authorized IoT communication PCAP trace; baseline DNS/NTP/MQTT/TLS traffic, detect simulated beaconing anomalies, and document findings..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Portfolio Project 3 package: Annotated PCAP file, Wireshark filter library, and defensive anomaly report."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "how Hackers SNiFF (capture) network traffic // MiTM attack",
      "url": "https://www.youtube.com/watch?v=-rSqbgI7oZM",
      "videoId": "-rSqbgI7oZM",
      "creator": "NetworkChuck",
      "durationMinutes": 19
    },
    {
      "title": "Mastering Wireshark 2 : DHCP Analysis",
      "url": "https://www.youtube.com/watch?v=CPKIZUjyS7s",
      "videoId": "CPKIZUjyS7s",
      "creator": "James Aguilar",
      "durationMinutes": 10
    },
    {
      "title": "CoAP IoT Protocol: CoAP Packet Analysis using Wireshark Packet Analyzer Part 3 of 3",
      "url": "https://www.youtube.com/watch?v=RfCbpUYcjdc",
      "videoId": "RfCbpUYcjdc",
      "creator": "Dev Insights",
      "durationMinutes": 14
    },
    {
      "title": "Day 13: Detect Command & Control (C2) Communication Using Wireshark | Practical SOC Investigation",
      "url": "https://www.youtube.com/watch?v=LRhNr--0E60",
      "videoId": "LRhNr--0E60",
      "creator": "Pooji SOC Talks",
      "durationMinutes": 12
    }
  ],
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
  "title": "IoT Threat Modeling",
  "phase": "Core",
  "hours": 6,
  "aim": "Apply structured threat modeling methodologies (STRIDE, OWASP IoT Top 10) to connected devices, map physical and logical attack surfaces, and prioritize mitigations.",
  "prereq": "Module 15: Wireshark for IoT Security",
  "task": "Produce a comprehensive STRIDE threat model and attack surface assessment for the Smart-Room Monitoring System built in Module 10.",
  "output": "STRIDE threat model matrix + prioritized defensive mitigation roadmap",
  "steps": [
    "Review Module 16 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Produce a comprehensive STRIDE threat model and attack surface assessment for the Smart-Room Monitoring System built in Module 10..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: STRIDE threat model matrix + prioritized defensive mitigation roadmap."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "STRIDE Threat Modeling Explained with Real Examples | Must-Know for Cybersecurity #shorts #cissp",
      "url": "https://www.youtube.com/watch?v=vcpUlGTf0_Q",
      "videoId": "vcpUlGTf0_Q",
      "creator": "Tech Explained ",
      "durationMinutes": 2
    },
    {
      "title": "Episode 10 | Embedded Software for IoT Devices | Firmware, 5G, Cybersecurity & Edge AI |",
      "url": "https://www.youtube.com/watch?v=EA5rARpGCwg",
      "videoId": "EA5rARpGCwg",
      "creator": "Tech Fibernet Academy ",
      "durationMinutes": 47
    },
    {
      "title": "Data Flow diagrams in Threat Modeling",
      "url": "https://www.youtube.com/watch?v=0FoesyawfPU",
      "videoId": "0FoesyawfPU",
      "creator": "Adam Shostack",
      "durationMinutes": 2
    },
    {
      "title": "Risk Assessment with examples | Risk Management | Software Engineering",
      "url": "https://www.youtube.com/watch?v=9GthPTi1Nqc",
      "videoId": "9GthPTi1Nqc",
      "creator": "Gate Smashers",
      "durationMinutes": 6
    }
  ],
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
  "title": "Wireless IoT Security",
  "phase": "Core",
  "hours": 6,
  "aim": "Analyze wireless IoT protocol security: Wi-Fi onboarding vulnerabilities, Bluetooth Low Energy (BLE) GATT attributes, pairing security, and Zigbee commissioning.",
  "prereq": "Module 16: IoT Threat Modeling",
  "task": "Audit wireless security for BLE and Wi-Fi IoT devices; inspect BLE GATT services, analyze Wi-Fi credential provisioning, and produce a wireless security checklist.",
  "output": "Wireless protocol security audit report + BLE GATT attack surface map",
  "steps": [
    "Review Module 17 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Audit wireless security for BLE and Wi-Fi IoT devices; inspect BLE GATT services, analyze Wi-Fi credential provisioning, and produce a wireless security checklist..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Wireless protocol security audit report + BLE GATT attack surface map."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "Krack Attacks (WiFi WPA2 Vulnerability) - Computerphile",
      "url": "https://www.youtube.com/watch?v=mYtvjijATa4",
      "videoId": "mYtvjijATa4",
      "creator": "Computerphile",
      "durationMinutes": 11
    },
    {
      "title": "Master BLE Basics in Just 10 Minutes: The Ultimate Guide!",
      "url": "https://www.youtube.com/watch?v=JSQhRyTKnW4",
      "videoId": "JSQhRyTKnW4",
      "creator": "Novel Bits",
      "durationMinutes": 9
    },
    {
      "title": "ZigBee Explained: Basics, Protocol Stack, Topologies, Devices, Advantages & Disadvantages",
      "url": "https://www.youtube.com/watch?v=lVr88JS-2rM",
      "videoId": "lVr88JS-2rM",
      "creator": "Engineering Funda",
      "durationMinutes": 11
    },
    {
      "title": "LoRaWAN Explained: Basics, Devices, Architecture, Components, Applications, and Advantages",
      "url": "https://www.youtube.com/watch?v=EAby2vOeLpc",
      "videoId": "EAby2vOeLpc",
      "creator": "Engineering Funda",
      "durationMinutes": 15
    }
  ],
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
  "title": "IoT Web & API Vulnerabilities",
  "phase": "Core",
  "hours": 6,
  "aim": "Assess embedded web administrative interfaces and IoT cloud APIs; test for Insecure Direct Object References (IDOR), command injection, authentication bypass, and CSRF.",
  "prereq": "Module 17: Wireless IoT Security",
  "task": "Conduct an authorized security assessment of an embedded IoT web interface; document discovered input validation and session vulnerabilities with remediation patches.",
  "output": "Web & API vulnerability assessment report + validated defensive patch code",
  "steps": [
    "Review Module 18 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Conduct an authorized security assessment of an embedded IoT web interface; document discovered input validation and session vulnerabilities with remediation patches..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Web & API vulnerability assessment report + validated defensive patch code."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "Automated Dynamic Fireware Analysis At Scale: A Case Study on Embedded Web Interfaces",
      "url": "https://www.youtube.com/watch?v=x-JcudXCvC0",
      "videoId": "x-JcudXCvC0",
      "creator": "Black Hat",
      "durationMinutes": 68
    },
    {
      "title": "Insecure Direct Object Reference (IDOR) Explained",
      "url": "https://www.youtube.com/watch?v=rloqMGcPMkI",
      "videoId": "rloqMGcPMkI",
      "creator": "PwnFunction",
      "durationMinutes": 8
    },
    {
      "title": "IoT/Hardware Hacking: Finding Command Injection Vulnerability on a Netgear Router.",
      "url": "https://www.youtube.com/watch?v=y2HTKqxs8cg",
      "videoId": "y2HTKqxs8cg",
      "creator": "Joe Burgess",
      "durationMinutes": 16
    },
    {
      "title": "Hardening, Segmentation and Sandboxing: Shrink What Attackers Can Reach | CompTIA Security+ SY0-801",
      "url": "https://www.youtube.com/watch?v=nSPdEAQLnR8",
      "videoId": "nSPdEAQLnR8",
      "creator": "DevOps Simplified",
      "durationMinutes": 6
    }
  ],
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
  "title": "Raspberry Pi & Embedded Linux Security",
  "phase": "Core",
  "hours": 6,
  "aim": "Harden embedded Linux gateways (Raspberry Pi, OpenWrt), configure SSH key-based authentication, enforce firewall service minimization, and audit system logs.",
  "prereq": "Module 18: IoT Web & API Vulnerabilities",
  "task": "Harden a Raspberry Pi / Linux IoT edge gateway: disable default accounts, configure UFW firewall, enforce SSH key authentication, and set up automated log monitoring.",
  "output": "Gateway baseline vs hardened audit worksheet + automated security audit script",
  "steps": [
    "Review Module 19 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Harden a Raspberry Pi / Linux IoT edge gateway: disable default accounts, configure UFW firewall, enforce SSH key authentication, and set up automated log monitoring..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Gateway baseline vs hardened audit worksheet + automated security audit script."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "my SUPER secure Raspberry Pi Router (wifi VPN travel router)",
      "url": "https://www.youtube.com/watch?v=jlHWnKVpygw",
      "videoId": "jlHWnKVpygw",
      "creator": "NetworkChuck",
      "durationMinutes": 31
    },
    {
      "title": "STOP Hackers Instantly! Linux SSH Hardening (No Passwords, Only Keys!)",
      "url": "https://www.youtube.com/watch?v=PLx7shQIq6I",
      "videoId": "PLx7shQIq6I",
      "creator": "CyberNova Academy",
      "durationMinutes": 30
    },
    {
      "title": "Linux Security - UFW Complete Guide (Uncomplicated Firewall)",
      "url": "https://www.youtube.com/watch?v=-CzvPjZ9hp8",
      "videoId": "-CzvPjZ9hp8",
      "creator": "HackerSploit",
      "durationMinutes": 28
    },
    {
      "title": "SSH Brute Force Protection With Fail2Ban",
      "url": "https://www.youtube.com/watch?v=Z0cDqF6HAxs",
      "videoId": "Z0cDqF6HAxs",
      "creator": "HackerSploit",
      "durationMinutes": 24
    }
  ],
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
  "title": "Firmware Extraction & Analysis",
  "phase": "Core",
  "hours": 6,
  "aim": "Acquire authorized firmware images legally, verify cryptographic integrity (SHA-256), inspect binary structures with hexdump and file utilities, and extract embedded filesystems using Binwalk.",
  "prereq": "Module 19: Raspberry Pi & Embedded Linux Security",
  "task": "Portfolio Project 4: Acquire an authorized vendor firmware image; verify chain of custody, perform binary component inventory with Binwalk, and extract filesystems for defensive analysis.",
  "output": "Portfolio Project 4 package: Firmware analysis report, component inventory spreadsheet, and extracted configuration artifacts",
  "steps": [
    "Review Module 20 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Portfolio Project 4: Acquire an authorized vendor firmware image; verify chain of custody, perform binary component inventory with Binwalk, and extract filesystems for defensive analysis..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Portfolio Project 4 package: Firmware analysis report, component inventory spreadsheet, and extracted configuration artifacts."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "Understanding SPI Flash Memory | FPGA Flash From the Ground Up \u2013 Part 1",
      "url": "https://www.youtube.com/watch?v=ohymUtYtUfY",
      "videoId": "ohymUtYtUfY",
      "creator": "FPGA Discovery (Learning How to Work with FPGAs)",
      "durationMinutes": 9
    },
    {
      "title": "Verify Integrity of a File or ISO with SHA\u2011256 in PowerShell | Windows | Linux",
      "url": "https://www.youtube.com/watch?v=8lA3NaCNdN8",
      "videoId": "8lA3NaCNdN8",
      "creator": "DevLinux",
      "durationMinutes": 2
    },
    {
      "title": "12. IOT Forensics: Firmware Extraction & Analysis Binwalk",
      "url": "https://www.youtube.com/watch?v=LjkG-tSIEjU",
      "videoId": "LjkG-tSIEjU",
      "creator": "Atdhe Buja",
      "durationMinutes": 6
    },
    {
      "title": "Inside a Router's Firmware: Hardcoded Passwords and Startup Script Leaks",
      "url": "https://www.youtube.com/watch?v=aAHpfiRVv1U",
      "videoId": "aAHpfiRVv1U",
      "creator": "Suit Up and Hack",
      "durationMinutes": 11
    }
  ],
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
  {
  "title": "Firmware Reverse Engineering",
  "phase": "Advanced",
  "hours": 8,
  "aim": "Decompile and analyze compiled embedded binaries using NSA Ghidra; trace control flow, analyze cryptographic functions, and identify vulnerable logic on sample binaries.",
  "prereq": "Module 20: Firmware Extraction & Analysis",
  "task": "Analyze an intentionally vulnerable compiled training binary in Ghidra; map main function call graphs, locate hardcoded credentials, and document software flaws.",
  "output": "Annotated Ghidra function map + reverse engineering vulnerability analysis report",
  "steps": [
    "Review Module 21 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Analyze an intentionally vulnerable compiled training binary in Ghidra; map main function call graphs, locate hardcoded credentials, and document software flaws..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Annotated Ghidra function map + reverse engineering vulnerability analysis report."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "Ghidra Tutorial for Beginners \u2014 Reverse Engineering Your First Program",
      "url": "https://www.youtube.com/watch?v=OFAxXXcLXbc",
      "videoId": "OFAxXXcLXbc",
      "creator": "Dungeons and Diving - Cyber",
      "durationMinutes": 12
    },
    {
      "title": "Reverse Engineering ARM - Introduction & Motivation",
      "url": "https://www.youtube.com/watch?v=bfuLNWCHfmE",
      "videoId": "bfuLNWCHfmE",
      "creator": "IronByte",
      "durationMinutes": 41
    },
    {
      "title": "Reverse Engineering Made EASY with Ghidra! \ud83d\udd0d | Beginner Tutorial",
      "url": "https://www.youtube.com/watch?v=4DpV0zdJEk0",
      "videoId": "4DpV0zdJEk0",
      "creator": "Cyber Ryan | Cyber Security",
      "durationMinutes": 2
    },
    {
      "title": "Ghidra Just Exposed a Critical IoT Vulnerability | CWE-321",
      "url": "https://www.youtube.com/watch?v=nrGNyvm_ocI",
      "videoId": "nrGNyvm_ocI",
      "creator": "Suit Up and Hack",
      "durationMinutes": 11
    }
  ],
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
  "title": "Firmware Emulation",
  "phase": "Advanced",
  "hours": 8,
  "aim": "Emulate foreign CPU architecture firmware dynamically using QEMU and Firmadyne; observe network services, inspect runtime memory, and correlate dynamic and static analysis.",
  "prereq": "Module 21: Firmware Reverse Engineering",
  "task": "Emulate a MIPS/ARM embedded Linux binary in QEMU user and system mode; observe listening services, capture runtime logs, and validate defensive patches.",
  "output": "QEMU emulation setup script + dynamic telemetry execution log",
  "steps": [
    "Review Module 22 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Emulate a MIPS/ARM embedded Linux binary in QEMU user and system mode; observe listening services, capture runtime logs, and validate defensive patches..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: QEMU emulation setup script + dynamic telemetry execution log."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "differences between QEMU and running on hardware #coding #programming #operatingsystem #hacking",
      "url": "https://www.youtube.com/watch?v=BgqiHTb0y14",
      "videoId": "BgqiHTb0y14",
      "creator": "offlinemark",
      "durationMinutes": 2
    },
    {
      "title": "Emulating ARM binaries using QEMU | Setting up our environment | ROP Emporium #0",
      "url": "https://www.youtube.com/watch?v=LZM7EA6bQF4",
      "videoId": "LZM7EA6bQF4",
      "creator": "RE Adventures",
      "durationMinutes": 6
    },
    {
      "title": "qemu/kvm bridge and NAT networking",
      "url": "https://www.youtube.com/watch?v=DYpaX4BnNlg",
      "videoId": "DYpaX4BnNlg",
      "creator": "Abstract programmer",
      "durationMinutes": 12
    },
    {
      "title": "Remote Debugging As The Superuser",
      "url": "https://www.youtube.com/watch?v=M-DG8PKH6-A",
      "videoId": "M-DG8PKH6-A",
      "creator": "Walter Schilling",
      "durationMinutes": 10
    }
  ],
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
  "title": "OWASP IoTGoat Security Testing",
  "phase": "Advanced",
  "hours": 8,
  "aim": "Deploy OWASP IoTGoat deliberately vulnerable firmware in an isolated lab; audit exposed services, analyze backdoor accounts, and document remediation strategies.",
  "prereq": "Module 22: Firmware Emulation",
  "task": "Deploy OWASP IoTGoat in an isolated VM; perform an authorized security assessment across web, network, and firmware attack surfaces and write an executive report.",
  "output": "OWASP IoTGoat security assessment report + developer remediation roadmap",
  "steps": [
    "Review Module 23 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Deploy OWASP IoTGoat in an isolated VM; perform an authorized security assessment across web, network, and firmware attack surfaces and write an executive report..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: OWASP IoTGoat security assessment report + developer remediation roadmap."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "IoT - Security Explained | Architecture, Challenges & OWASP Top 10 | CISSP |  Wiseman CyberSec",
      "url": "https://www.youtube.com/watch?v=Suq6Aj51rsc",
      "videoId": "Suq6Aj51rsc",
      "creator": "Wiseman CyberSec",
      "durationMinutes": 14
    },
    {
      "title": "IoT Goat - Part 1",
      "url": "https://www.youtube.com/watch?v=g-OMABi4xdg",
      "videoId": "g-OMABi4xdg",
      "creator": "roberto h",
      "durationMinutes": 14
    },
    {
      "title": "CVE-2017-14493 vulnerability with IoT goat",
      "url": "https://www.youtube.com/watch?v=wvBwywRGsMk",
      "videoId": "wvBwywRGsMk",
      "creator": "\u0110\u1ed9c H\u00e0nh",
      "durationMinutes": 3
    },
    {
      "title": "How FAST Can You Write a Pentest Report?",
      "url": "https://www.youtube.com/watch?v=OLsuAr7Xig4",
      "videoId": "OLsuAr7Xig4",
      "creator": "John Hammond",
      "durationMinutes": 12
    }
  ],
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
  "title": "Hardware Debugging & Interface Security",
  "phase": "Advanced",
  "hours": 8,
  "aim": "Identify physical hardware test points and debug headers (UART, JTAG, SWD), safely measure voltages with a multimeter, read non-sensitive boot logs, and design hardware lockdown.",
  "prereq": "Module 23: OWASP IoTGoat Security Testing",
  "task": "Conduct a physical inspection of an owned microcontroller development board; map test pads, verify 3.3V voltage safety, and draft a production hardware hardening checklist.",
  "output": "Hardware interface exposure map + production physical hardening checklist",
  "steps": [
    "Review Module 24 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Conduct a physical inspection of an owned microcontroller development board; map test pads, verify 3.3V voltage safety, and draft a production hardware hardening checklist..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Hardware interface exposure map + production physical hardening checklist."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "IoT Device Investigation \u2014 UART, JTAG, NVRAM, Modbus & SCADA (CHFI v10 Obj 15.2)",
      "url": "https://www.youtube.com/watch?v=Lg_H6wEhfdQ",
      "videoId": "Lg_H6wEhfdQ",
      "creator": "it-learn",
      "durationMinutes": 7
    },
    {
      "title": "How To Make A Breakout Board For Repair & Hardware Hacking | TUTORIAL",
      "url": "https://www.youtube.com/watch?v=PeH1VDdgaDo",
      "videoId": "PeH1VDdgaDo",
      "creator": "MKme Lab",
      "durationMinutes": 9
    },
    {
      "title": "Serial UART with STM32 Microcontroller-Transmit and Receive Data",
      "url": "https://www.youtube.com/watch?v=dEQwSl8mCFs",
      "videoId": "dEQwSl8mCFs",
      "creator": "BINARYUPDATES",
      "durationMinutes": 19
    },
    {
      "title": "The Embedded Exploitation Pipeline: From Hardware Pins to Root Shells",
      "url": "https://www.youtube.com/watch?v=jp2LruUba-U",
      "videoId": "jp2LruUba-U",
      "creator": "Medhat HUSSAIN",
      "durationMinutes": 6
    }
  ],
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
  "title": "IoT Malware & Botnet Investigation",
  "phase": "Advanced",
  "hours": 8,
  "aim": "Analyze historical IoT botnet architectures (Mirai, Gafgyt, Mozi), identify synthetic Command and Control (C2) telemetry in logs and PCAPs, and develop device containment playbooks.",
  "prereq": "Module 24: Hardware Debugging & Interface Security",
  "task": "Investigate a synthetic IoT botnet compromise scenario from prerecorded network and device telemetry; produce an incident analysis and containment playbook.",
  "output": "Botnet incident investigation report + device isolation and containment procedure",
  "steps": [
    "Review Module 25 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Investigate a synthetic IoT botnet compromise scenario from prerecorded network and device telemetry; produce an incident analysis and containment playbook..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Botnet incident investigation report + device isolation and containment procedure."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "USENIX Security \u201917 - Understanding the Mirai Botnet",
      "url": "https://www.youtube.com/watch?v=1pywzRTJDaY",
      "videoId": "1pywzRTJDaY",
      "creator": "USENIX",
      "durationMinutes": 29
    },
    {
      "title": "Botnets - Computerphile",
      "url": "https://www.youtube.com/watch?v=UVFmC178_Vs",
      "videoId": "UVFmC178_Vs",
      "creator": "Computerphile",
      "durationMinutes": 9
    },
    {
      "title": "Cybersecurity Lab: How To Investigate PCAPs for SOC Analysts",
      "url": "https://www.youtube.com/watch?v=0DuJnPxKfBg",
      "videoId": "0DuJnPxKfBg",
      "creator": "MyDFIR",
      "durationMinutes": 38
    },
    {
      "title": "CISA Cyber security Incident Response Playbooks - Episode 1 - Overview",
      "url": "https://www.youtube.com/watch?v=gWXgChC9ANg",
      "videoId": "gWXgChC9ANg",
      "creator": "Exterro",
      "durationMinutes": 8
    }
  ],
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
  "title": "IoT SOC Monitoring & SIEM",
  "phase": "Advanced",
  "hours": 8,
  "aim": "Architect security monitoring for IoT fleets, forward telemetry to SIEM platforms (Wazuh, Elastic), author Sigma detection rules for IoT threats, and tune alert fidelity.",
  "prereq": "Module 25: IoT Malware & Botnet Investigation",
  "task": "Portfolio Project 5: Deploy an IoT telemetry forwarding pipeline to a local SIEM/Wazuh; write and validate two custom Sigma detection rules for anomalous MQTT and network behavior.",
  "output": "Portfolio Project 5 package: Sigma detection rules, SIEM dashboard screenshot, and alert tuning validation log",
  "steps": [
    "Review Module 26 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Portfolio Project 5: Deploy an IoT telemetry forwarding pipeline to a local SIEM/Wazuh; write and validate two custom Sigma detection rules for anomalous MQTT and network behavior..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Portfolio Project 5 package: Sigma detection rules, SIEM dashboard screenshot, and alert tuning validation log."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "Telemetry Explained: Monitoring Remote Resources Like NASA!",
      "url": "https://www.youtube.com/watch?v=Jao_eT6ZeTk",
      "videoId": "Jao_eT6ZeTk",
      "creator": "Hitesh Choudhary",
      "durationMinutes": 2
    },
    {
      "title": "Installing the Wazuh agent to collect logs! #homelab #cybersecurity #itprojects",
      "url": "https://www.youtube.com/watch?v=NRDpq-toUz8",
      "videoId": "NRDpq-toUz8",
      "creator": "Cyberdarsh",
      "durationMinutes": 3
    },
    {
      "title": "Day 6 \u2013 Sigma Rules Explained: The Universal Language of Detection",
      "url": "https://www.youtube.com/watch?v=joGLIbt6JtI",
      "videoId": "joGLIbt6JtI",
      "creator": "SOCDemystified",
      "durationMinutes": 6
    },
    {
      "title": "True Positive vs False Positive Explained \ud83d\udea8 | SOC Analyst Alert Triage #shortsfeed",
      "url": "https://www.youtube.com/watch?v=BGksL1QHbk8",
      "videoId": "BGksL1QHbk8",
      "creator": "Cyber With Abhishek",
      "durationMinutes": 2
    }
  ],
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
  "title": "IoT Digital Forensics",
  "phase": "Advanced",
  "hours": 8,
  "aim": "Conduct forensically sound investigations of compromised IoT hardware and gateways, preserve volatile memory, verify cryptographic hashes, and reconstruct unified incident timelines.",
  "prereq": "Module 26: IoT SOC Monitoring & SIEM",
  "task": "Reconstruct a complete incident timeline from a synthetic multi-source IoT compromise scenario (device logs, DNS records, PCAP); author a defensible forensic report.",
  "output": "Unified incident timeline worksheet + formal digital forensics investigation report",
  "steps": [
    "Review Module 27 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Reconstruct a complete incident timeline from a synthetic multi-source IoT compromise scenario (device logs, DNS records, PCAP); author a defensible forensic report..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Unified incident timeline worksheet + formal digital forensics investigation report."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "15. IOT Forensics: Explore Disk Image & Timeline Analysis",
      "url": "https://www.youtube.com/watch?v=T7FnBQCciUk",
      "videoId": "T7FnBQCciUk",
      "creator": "Atdhe Buja",
      "durationMinutes": 14
    },
    {
      "title": "1. IOT Forensics: Chain of Custody",
      "url": "https://www.youtube.com/watch?v=Rji8IsYKYOI",
      "videoId": "Rji8IsYKYOI",
      "creator": "Atdhe Buja",
      "durationMinutes": 6
    },
    {
      "title": "2. IOT Forensics: Analyze Network Traffic",
      "url": "https://www.youtube.com/watch?v=it1yG5mAQE4",
      "videoId": "it1yG5mAQE4",
      "creator": "Atdhe Buja",
      "durationMinutes": 5
    },
    {
      "title": "How to Write a Digital Forensics Report That Holds Up to Scrutiny",
      "url": "https://www.youtube.com/watch?v=y4KtjevYZ7s",
      "videoId": "y4KtjevYZ7s",
      "creator": "Joshua Moses | Cybertrace Foundation",
      "durationMinutes": 11
    }
  ],
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
  "title": "Industrial IoT Cybersecurity",
  "phase": "Advanced",
  "hours": 8,
  "aim": "Examine Operational Technology (OT) and Industrial IoT (IIoT) architectures, understand the Purdue model, analyze Modbus/TCP communications in simulation, and design safety interlocks.",
  "prereq": "Module 27: IoT Digital Forensics",
  "task": "Model an industrial water treatment sensor network in an offline simulator; analyze Modbus/TCP telemetry, identify unauthenticated command risks, and design a passive monitoring architecture.",
  "output": "Purdue model architecture diagram + Modbus/TCP security assessment report",
  "steps": [
    "Review Module 28 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Model an industrial water treatment sensor network in an offline simulator; analyze Modbus/TCP telemetry, identify unauthenticated command risks, and design a passive monitoring architecture..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Purdue model architecture diagram + Modbus/TCP security assessment report."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "What Is the Purdue Model?",
      "url": "https://www.youtube.com/watch?v=Xf7WRpYABKQ",
      "videoId": "Xf7WRpYABKQ",
      "creator": "Industrial Defender",
      "durationMinutes": 3
    },
    {
      "title": "What is Modbus and How does it Work?",
      "url": "https://www.youtube.com/watch?v=txi2p5_OjKU",
      "videoId": "txi2p5_OjKU",
      "creator": "RealPars",
      "durationMinutes": 9
    },
    {
      "title": "NSM/threat hunting in OT/ICS/SCADA environments",
      "url": "https://www.youtube.com/watch?v=_w8usX9_daE",
      "videoId": "_w8usX9_daE",
      "creator": "Kaspersky",
      "durationMinutes": 20
    },
    {
      "title": "Safety Instrumented System Explained, SIF and SIL",
      "url": "https://www.youtube.com/watch?v=W2YUNnfATBY",
      "videoId": "W2YUNnfATBY",
      "creator": "RealPars",
      "durationMinutes": 16
    }
  ],
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
  "title": "Secure IoT Product Engineering",
  "phase": "Advanced",
  "hours": 8,
  "aim": "Integrate product security standards (NIST IR 8259, EU Cyber Resilience Act), generate Software Bill of Materials (SBOM), establish vulnerability disclosure policies, and execute release checklists.",
  "prereq": "Module 28: Industrial IoT Cybersecurity",
  "task": "Produce a commercial product security readiness assessment for an IoT device; generate an automated SBOM, draft a vulnerability disclosure policy, and complete a pre-release audit checklist.",
  "output": "Commercial product security readiness report + CycloneDX SBOM + release audit checklist",
  "steps": [
    "Review Module 29 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Produce a commercial product security readiness assessment for an IoT device; generate an automated SBOM, draft a vulnerability disclosure policy, and complete a pre-release audit checklist..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Commercial product security readiness report + CycloneDX SBOM + release audit checklist."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "Securable IoT \u2013 von Compliance bis Red Teaming. NIST IR 8259r1",
      "url": "https://www.youtube.com/watch?v=iQFicroA62Y",
      "videoId": "iQFicroA62Y",
      "creator": "VamiSec",
      "durationMinutes": 38
    },
    {
      "title": "Software Bill of Materials (SBOM) Explained: What It Is and Why It Matters for Security",
      "url": "https://www.youtube.com/watch?v=B-y4lXinVLU",
      "videoId": "B-y4lXinVLU",
      "creator": "Harness",
      "durationMinutes": 5
    },
    {
      "title": "\u201cCVE and AI Vulnerability Discovery\u201d Virtual Conference",
      "url": "https://www.youtube.com/watch?v=fV_X57aD188",
      "videoId": "fV_X57aD188",
      "creator": "CVE\u2122 Program",
      "durationMinutes": 187
    },
    {
      "title": "Come Reflect Act - CRA Compliance Checklist for IoT Devices",
      "url": "https://www.youtube.com/watch?v=AcyWSrSc3-0",
      "videoId": "AcyWSrSc3-0",
      "creator": "Tributech",
      "durationMinutes": 12
    }
  ],
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
  "title": "Final IoT Cybersecurity Capstone",
  "phase": "Capstone",
  "hours": 12,
  "aim": "Demonstrate comprehensive mastery across hardware, firmware, network security, threat modeling, SIEM detection, and professional reporting in the 100-mark Capstone Project.",
  "prereq": "Modules 01\u201329 completion",
  "task": "Portfolio Project 6 / 100-Mark Capstone: Build, harden, assess, and document a complete end-to-end connected IoT monitoring system with measured circuit CAD, firmware, PCAP, threat model, and SOC handoff.",
  "output": "Portfolio Project 6 Capstone Package: Comprehensive 100-mark portfolio submission with verified hardware netlist, hardened repository, PCAP trace, and executive presentation",
  "steps": [
    "Review Module 30 technical briefing, hardware pinouts, and electrical safety constraints.",
    "Assemble circuit or initialize software tools according to lab package: Portfolio Project 6 / 100-Mark Capstone: Build, harden, assess, and document a complete end-to-end connected IoT monitoring system with measured circuit CAD, firmware, PCAP, threat model, and SOC handoff..",
    "Record telemetry, verify low-voltage bounds (<=3.3V DC), and document findings.",
    "Complete practical deliverable: Portfolio Project 6 Capstone Package: Comprehensive 100-mark portfolio submission with verified hardware netlist, hardened repository, PCAP trace, and executive presentation."
  ],
  "reading": [
    {
      "title": "OWASP Internet of Things Project",
      "url": "https://owasp.org/projects/internet-of-things"
    },
    {
      "title": "OWASP IoT Security Testing Guide (ISTG)",
      "url": "https://owasp.org/owasp-istg/01_introduction/index.html"
    }
  ],
  "videos": [
    {
      "title": "IoT Architecture | Internet Of Things Architecture For Beginners | IoT Tutorial | Simplilearn",
      "url": "https://www.youtube.com/watch?v=KeaeuUcw02Q",
      "videoId": "KeaeuUcw02Q",
      "creator": "Simplilearn",
      "durationMinutes": 12
    },
    {
      "title": "Internet of Things (IoT) One Shot | Complete IoT in One Video",
      "url": "https://www.youtube.com/watch?v=JGg1bKRuXQw",
      "videoId": "JGg1bKRuXQw",
      "creator": "Gate Smashers",
      "durationMinutes": 67
    },
    {
      "title": "Enterprise IoT Pentesting - Intro to IoT Pentesting",
      "url": "https://www.youtube.com/watch?v=RkGR_Xv-2Mo",
      "videoId": "RkGR_Xv-2Mo",
      "creator": "Matt Brown",
      "durationMinutes": 14
    },
    {
      "title": "How To Write A Penetration Testing Report",
      "url": "https://www.youtube.com/watch?v=J34DnrX7dTo",
      "videoId": "J34DnrX7dTo",
      "creator": "HackerSploit",
      "durationMinutes": 37
    }
  ],
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
},
];

function makeModule(m: ModuleSource, index: number): CourseModule {
  const n = index + 1;
  const moduleNumber = String(n).padStart(2, '0');
  const moduleTitle = `Module ${moduleNumber}: ${m.title}`;

  const safeCriteria = [
    'Maintain strictly safe low-voltage DC bounds (<= 3.3V logic)',
    'Zero mains voltage exposure on breadboards or unisolated test pads',
    'All network testing confined to isolated, owned, or authorized lab scopes',
  ];

  const moduleProject = getProjectForModule(n);
  const moduleDiagram = getDiagramForModule(n);

  const pcapInfo = {
  "1": {
    "fileName": "iot-lab-m01-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m01-telemetry.pcap",
    "sha256": "f27ed13cb294e5b7b582265646bc89f24535964115cfea2369064665ae2a55db",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "2": {
    "fileName": "iot-lab-m02-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m02-telemetry.pcap",
    "sha256": "c20fd480a2f716ceca7f40ade2441211ac54b5dcdf9f5c07ce33a55bec980e5d",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "3": {
    "fileName": "iot-lab-m03-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m03-telemetry.pcap",
    "sha256": "20bf05419fc1a9f1770fd140a4509a0fa12f50f3dead5f5f33449f89cd72895f",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "4": {
    "fileName": "iot-lab-m04-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m04-telemetry.pcap",
    "sha256": "8f4f21ed12ec7fc8645238499f0ed67a8edaae5e75698c6d90cf06306c59dfa7",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "5": {
    "fileName": "iot-lab-m05-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m05-telemetry.pcap",
    "sha256": "86052e12537e608f4834482ff4068241ba46faa74ddd55867cb925bcbf4d060d",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "6": {
    "fileName": "iot-lab-m06-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m06-telemetry.pcap",
    "sha256": "f10961982dd5cfbc21440268e48405919769c4ce5e2b74a53c62a241a1a6e01f",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "7": {
    "fileName": "iot-lab-m07-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m07-telemetry.pcap",
    "sha256": "72e4eb1fe9db295b3c1b9e6e7e59439d9e97a3d67fa27a9ce34dbd6e6858d0fe",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "8": {
    "fileName": "iot-lab-m08-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m08-telemetry.pcap",
    "sha256": "da3ed37c9107ec66719072819d0901d6019fa55cc68a0f559fc1d92b49b67aec",
    "sizeBytes": 358,
    "packetCount": 3
  },
  "9": {
    "fileName": "iot-lab-m09-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m09-telemetry.pcap",
    "sha256": "45dc1933d7ea7c2303a38e643da124e25d314a0896f5ed0270bd1265548a3a77",
    "sizeBytes": 354,
    "packetCount": 3
  },
  "10": {
    "fileName": "iot-lab-m10-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m10-telemetry.pcap",
    "sha256": "5591e2e372d698fa9c6de487812014adfd74003d23d6f174571434aa0beb829b",
    "sizeBytes": 358,
    "packetCount": 3
  },
  "11": {
    "fileName": "iot-lab-m11-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m11-telemetry.pcap",
    "sha256": "e977363b06ccbf5d3e831781112912119f72dc6b078646ecb8364341716377f1",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "12": {
    "fileName": "iot-lab-m12-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m12-telemetry.pcap",
    "sha256": "ecf06083842518f35058a5451d632cdbbc0efb81dfccca2647b852eaeffb6644",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "13": {
    "fileName": "iot-lab-m13-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m13-telemetry.pcap",
    "sha256": "456e989c5eea06152b2bd367de5884eae425215b8c9ca22a827749d12e2cafb3",
    "sizeBytes": 358,
    "packetCount": 3
  },
  "14": {
    "fileName": "iot-lab-m14-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m14-telemetry.pcap",
    "sha256": "671026443e16b2d8b6b7e01991d8970de6ace47f2ae6c283f6668cbefe6457aa",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "15": {
    "fileName": "iot-lab-m15-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m15-telemetry.pcap",
    "sha256": "f640b22fd2afd6fd3b1e57aa57ee34d0a72fcf77a10c18375702e935bda5ee24",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "16": {
    "fileName": "iot-lab-m16-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m16-telemetry.pcap",
    "sha256": "3e05ba5146e31377ac999abd654c82b169e8a64def979277a52756b1cc7170a4",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "17": {
    "fileName": "iot-lab-m17-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m17-telemetry.pcap",
    "sha256": "29eb22b738b0c08ab6a1de6a686650ac43bc21b075f2f830aa527b25fc1d0243",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "18": {
    "fileName": "iot-lab-m18-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m18-telemetry.pcap",
    "sha256": "c30db1bc34964df82758de10b02e52c29a4ba136b0e1f4468d5f908833b22d82",
    "sizeBytes": 354,
    "packetCount": 3
  },
  "19": {
    "fileName": "iot-lab-m19-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m19-telemetry.pcap",
    "sha256": "e4efdb0cd7c1edee93f9a35bd5b6b7faf521178306df29d6ba3d1e7ee055a889",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "20": {
    "fileName": "iot-lab-m20-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m20-telemetry.pcap",
    "sha256": "a23f5f5d21fcc9d3c1cb6219faa1da12cdfff8199c3b7786d0ef348fe0ddc749",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "21": {
    "fileName": "iot-lab-m21-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m21-telemetry.pcap",
    "sha256": "e17ebb52ccb58650ef2af79115ef26b40b632db764fad3c82be31ccff1706657",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "22": {
    "fileName": "iot-lab-m22-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m22-telemetry.pcap",
    "sha256": "954a1db31daea7bdf6602c3319dcde7feeeef119b015f0f3b8c11effca970398",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "23": {
    "fileName": "iot-lab-m23-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m23-telemetry.pcap",
    "sha256": "f3b3efaefcfccbb19c102891bd564ad6d4d0acdc7b6bbfd24b7c209ed1ddd844",
    "sizeBytes": 354,
    "packetCount": 3
  },
  "24": {
    "fileName": "iot-lab-m24-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m24-telemetry.pcap",
    "sha256": "b253cfcfc5c212c1973b94ea827343596f26fbb90d07a048820c7b54712da8d9",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "25": {
    "fileName": "iot-lab-m25-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m25-telemetry.pcap",
    "sha256": "dfbc2bb2e2fe52a8ad254420578337ebb686a438d8927e5f37bacbd8fc5e0ca8",
    "sizeBytes": 242,
    "packetCount": 3
  },
  "26": {
    "fileName": "iot-lab-m26-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m26-telemetry.pcap",
    "sha256": "e0dfbb8b33ff7d76db8bbdd57ede0e27417fb6c21e4da7444b45f4e48e3ef074",
    "sizeBytes": 358,
    "packetCount": 3
  },
  "27": {
    "fileName": "iot-lab-m27-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m27-telemetry.pcap",
    "sha256": "40b7ae85940d1ff20ba5dff7444637faa502eca8dd2b45ee22b9d18ebe642f72",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "28": {
    "fileName": "iot-lab-m28-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m28-telemetry.pcap",
    "sha256": "20b571ea36ab5a53b24a670f17fdcee2e746da438ad690c1d2614757ed84b51f",
    "sizeBytes": 254,
    "packetCount": 3
  },
  "29": {
    "fileName": "iot-lab-m29-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m29-telemetry.pcap",
    "sha256": "135c5090d9b6dff7711e51446678ff73e942da718259721bc4a000980ae3ba19",
    "sizeBytes": 310,
    "packetCount": 3
  },
  "30": {
    "fileName": "iot-lab-m30-telemetry.pcap",
    "fileUrl": "/pcaps/iot/iot-lab-m30-telemetry.pcap",
    "sha256": "486199719144dddaa84296ff705069257b3ac05eea17c16aa0cfc78916f60925",
    "sizeBytes": 358,
    "packetCount": 3
  }
} as Record<string, { fileName: string; fileUrl: string; sha256: string; sizeBytes: number; packetCount: number }>;
  const curPcap = pcapInfo[String(n)];

  const moduleLab: PracticalLab = {
    id: `lab-iot-m${moduleNumber}`,
    title: `Practical Lab ${moduleNumber}: ${moduleProject ? moduleProject.title : m.title}`,
    objective: moduleProject ? moduleProject.objective : m.aim,
    toolsRequired: moduleProject ? moduleProject.toolsUsed : ['ESP32 DevKit', 'Digital Multimeter', 'Logic Analyzer'],
    pcapSource: {
      fileName: curPcap ? curPcap.fileName : `iot-lab-m${moduleNumber}-telemetry.pcap`,
      fileUrl: curPcap ? curPcap.fileUrl : `/pcaps/iot/iot-lab-m${moduleNumber}-telemetry.pcap`,
      sha256: curPcap ? curPcap.sha256 : undefined,
      repositoryUrl: 'https://github.com/cybertube/iot-security-labs',
    },
    difficulty: n <= 10 ? 'beginner' : (n <= 20 ? 'intermediate' : 'advanced'),
    estimatedMinutes: m.hours * 60,
    instructions: m.steps,
    tasks: m.steps.map((stepText, idx) => ({
      id: `task-${idx + 1}`,
      description: stepText,
      hint: `Refer to Module ${moduleNumber} diagrams and safety notes. Strictly maintain <=3.3V DC logic bounds.`,
    })),
    evidenceWorksheet: [
      {
        field: 'e1_hardware_and_wiring',
        prompt: 'Document verified circuit wiring, measured GPIO voltages, and component ratings with photos or Wokwi netlist.',
        expectedEvidenceType: 'Circuit schematic, pinout table, or multimeter DC voltage log',
      },
      {
        field: 'e2_telemetry_or_traffic',
        prompt: 'Capture live device telemetry, serial bootloader logs, or network packet captures demonstrating module functionality.',
        expectedEvidenceType: 'Timestamped UART serial log (115200 baud), Wireshark PCAP trace, or Ghidra decompilation snippet',
      },
      {
        field: 'e3_mitigation_and_detection',
        prompt: 'Propose a specific defensive control (preventive, detective, or responsive) and identify its false-positive edge case.',
        expectedEvidenceType: 'Hardened setting, firewall rule, ACL entry, or monitoring alert signature',
      },
    ],
    questions: [], // STRICT ZERO QUIZZES RULE
    completionCriteria: [
      ...safeCriteria,
      `Completed deliverable: ${m.output}`,
      'Verified adherence to safe electrical limits (<=3.3V logic)',
    ],
  };

  const lessons: Lesson[] = m.lessons.map((lesson, lessonIndex) => {
    const lessonGlobalOrder = index * 4 + lessonIndex + 1;
    const lessonNumber = String(lessonIndex + 1).padStart(2, '0');
    const lessonSlug = `m${moduleNumber}-l${lessonNumber}-${lesson.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    const lessonId = `les-iot-m${moduleNumber}-${lessonNumber}`;

    const videoEntry = getVideoForLesson(lessonGlobalOrder);
    const lessonBOM = getLessonBOM(lessonSlug);
    const bespokeContent = getBespokeLessonContent(n, lessonIndex + 1, lesson.title, lesson.activity, lesson.practice, lesson.check);

    return {
      id: lessonId,
      slug: lessonSlug,
      title: lesson.title,
      description: `${lesson.activity} Practice: ${lesson.practice}`,
      youtubeVideoId: videoEntry.videoId,
      durationMinutes: videoEntry.durationMinutes,
      estimatedStudyMinutes: videoEntry.estimatedStudyMinutes,
      order: lessonIndex + 1,
      objectives: [
        `Master concepts of ${lesson.title.toLowerCase()}`,
        `Apply defensive practices: ${lesson.practice}`,
        `Verify understanding: ${lesson.check}`,
        'Adhere to low-voltage 3.3V safety boundaries and ethical lab rules',
      ],
      tags: [
        'iot',
        `phase-${m.phase.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        `module-${moduleNumber}`,
        'hardware-security',
        'hands-on-lab',
        'no-quizzes',
      ],
      skillsTaught: [
        lesson.title,
        m.title,
        'Defensive IoT engineering',
        'Hardware pinout safety',
        'Network packet analysis',
      ],
      moduleTitle,
      videoAttribution: {
        creator: videoEntry.creator,
        channelUrl: `https://www.youtube.com/watch?v=${videoEntry.videoId}`,
        platform: 'YouTube',
        seriesTitle: videoEntry.topic,
        partNumber: lessonIndex + 1,
      },
      richContent: {
        introduction: bespokeContent.introduction,
        prerequisites: [m.prereq],
        keyTerminology: bespokeContent.keyTerminology,
        theorySections: bespokeContent.theorySections,
        stepByStepProcedures: bespokeContent.stepByStepProcedures,
        practicalExercise: {
          title: `Hands-On Lab: ${lesson.title}`,
          objective: `${lesson.activity} Implement, measure, and verify the defensive behavior of this component.`,
          instructions: bespokeContent.stepByStepProcedures.map((p) => `${p.step}. ${p.instruction}`),
          pcapReference: curPcap ? curPcap.fileName : undefined,
        },
        expectedObservations: bespokeContent.expectedObservations,
        commonMistakes: bespokeContent.commonMistakes,
        troubleshooting: bespokeContent.troubleshooting,
        securityRelevance: bespokeContent.securityRelevance,
        furtherReading: m.reading,
      },
    };
  });

  const moduleResult: CourseModule = {
    id: `mod-iot-${moduleNumber}`,
    title: moduleTitle,
    description: `${m.aim} Phase: ${m.phase}. Estimated time: ${m.hours} hours.`,
    order: n,
    lessons,
    practicalLab: moduleLab,
    quiz: undefined,
  };

  if (n === 30) {
    moduleResult.capstoneAssessment = IOT_CAPSTONE;
  }

  return moduleResult;
}


function getBespokeLessonContent(mOrder: number, lInM: number, lTitle: string, lActivity: string, lPractice: string, lCheck: string): {
  introduction: string;
  keyTerminology: KeyTerminologyItem[];
  theorySections: TheorySectionItem[];
  stepByStepProcedures: StepByStepProcedureItem[];
  expectedObservations: string[];
  commonMistakes: string[];
  troubleshooting: string[];
  securityRelevance: string;
} {
  let terms: KeyTerminologyItem[] = [];
  let proc: StepByStepProcedureItem[] = [];
  let obs: string[] = [];
  let mistakes: string[] = [];
  let troubleshooting: string[] = [];
  let securityRel = "";

  if (mOrder === 1 || mOrder === 16) {
    terms = [
      { term: 'Trust Boundary', definition: 'A boundary separating components with different levels of privilege or operational authority.' },
      { term: 'Attack Surface', definition: 'The sum of all exposed network ports, protocols, physical pins, and APIs accessible to an adversary.' },
      { term: 'STRIDE Matrix', definition: 'Threat classification model: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.' },
      { term: 'Data Flow Diagram', definition: 'Visual model showing data sources, processing nodes, persistent storage, and trust perimeters.' }
    ];
    proc = [
      { step: 1, title: 'Interface & Scope Mapping', instruction: `Map all logical and physical interfaces relevant to ${lTitle.toLowerCase()}, verifying authorized lab engagement scope.` },
      { step: 2, title: 'Boundary Demarcation', instruction: 'Demarcate network and hardware trust boundaries between sensor nodes, local gateway, and external cloud services.' },
      { step: 3, title: 'Threat Modeling & Control Verification', instruction: `Document threat vectors and mitigation controls: ${lPractice}; verify defensive security controls against STRIDE.` }
    ];
    obs = [
      `Clearly identified trust perimeter separating ${lTitle.toLowerCase()} components.`,
      'Threat model document populated with identified threats, likelihood, and defensive controls.',
      `Verification criteria satisfied: ${lCheck}.`
    ];
    mistakes = [
      'Assuming the local Wi-Fi router is an impenetrable boundary without internal network segmentation.',
      'Overlooking physical access risks such as exposed debug headers or unencrypted local storage.',
      'Failing to specify authentication requirements for local gateway-to-cloud telemetry channels.'
    ];
    troubleshooting = [
      'If boundaries overlap, use IP subnetting (VLANs) and physical casing perimeters to clearly partition assets.',
      'Confirm all external APIs enforce cryptographic authentication tokens.',
      'Ensure all sensitive credentials are kept off public repositories.'
    ];
    securityRel = `Rigorous architectural scoping for ${lTitle.toLowerCase()} prevents unauthenticated adversaries from traversing from compromised edge sensors into enterprise networks.`;
  } else if (mOrder === 2 || mOrder === 4 || mOrder === 6) {
    terms = [
      { term: "Ohm's Law", definition: 'Fundamental electrical relationship V = I * R governing voltage, current, and resistance in all DC circuits.' },
      { term: 'Current-Limiting Resistor', definition: 'A series resistor restricting current flow to safe diode ratings (10mA-20mA), preventing thermal runaway.' },
      { term: 'Pull-up / Pull-down', definition: 'A resistor tied to VCC or GND ensuring an input pin remains in a known binary state when a switch is open.' },
      { term: 'Flyback Diode', definition: 'A diode placed in reverse bias across an inductive load to clamp high-voltage inductive kickback spikes.' }
    ];
    proc = [
      { step: 1, title: 'Power Isolation & Component Placement', instruction: 'Disconnect power before inserting components into the MB-102 breadboard per wiring.json; double check polarities.' },
      { step: 2, title: 'Voltage & Rail Verification', instruction: 'Use digital multimeter in DC Volts mode to measure supply rail voltage (must be strictly <= 3.3V DC).' },
      { step: 3, title: 'Logic Validation & Measurement', instruction: `Execute test: ${lPractice}; verify logic state transitions with multimeter, status LED, and oscilloscope.` }
    ];
    obs = [
      'Multimeter measures 3.25V to 3.35V DC on the active supply rail.',
      `Forward drop across LED measures 1.8V to 2.1V; current remains within safe bounds: ${lCheck}.`,
      'Zero thermal heating or voltage drops observed during active switching.'
    ];
    mistakes = [
      'Connecting an LED directly across 3.3V without a current-limiting resistor, burning out the LED or GPIO pad.',
      'Connecting an inductive load (relay, motor) without a flyback diode, causing reverse voltage spikes to destroy the controller.',
      'Leaving an input pin floating without internal or external pull-up/pull-down, resulting in erratic false triggers.'
    ];
    troubleshooting = [
      'If the LED does not illuminate, check polarity: anode (long leg) to positive, cathode (flat rim) to ground.',
      'If voltage reads 0V, ensure the breadboard split power rails are properly bridged with jumper wires.',
      'If switch transitions trigger multiple times, increase software debounce delay to 20ms-50ms.'
    ];
    securityRel = `Hardware circuit stability in ${lTitle.toLowerCase()} protects embedded nodes from physical electrical manipulation, tampering, and power-glitch attacks.`;
  } else if (mOrder === 3 || mOrder === 5 || mOrder === 10 || mOrder === 11 || mOrder === 12 || mOrder === 14 || mOrder === 24) {
    terms = [
      { term: 'GPIO Logic Levels', definition: '3.3V signaling standard. ESP32 GPIO inputs cannot tolerate 5V signals directly without level shifting.' },
      { term: 'Non-Volatile Storage (NVS)', definition: 'Flash partition used to store configuration key-value pairs persistently across reboot cycles.' },
      { term: 'Logic Analyzer', definition: 'Test instrument recording high-speed digital transitions to decode hardware protocols (UART, I2C, SPI).' },
      { term: 'eFuses', definition: 'Hardware one-time programmable fuses on the ESP32 chip used to lock security settings and store encryption keys.' }
    ];
    proc = [
      { step: 1, title: 'Hardware Setup & Toolchain Config', instruction: 'Connect ESP32 DevKit to workstation via micro-USB data cable; configure serial port and set baud rate to 115200.' },
      { step: 2, title: 'Firmware & Protocol Execution', instruction: `Flash or execute protocol task: ${lPractice}; observe device boot sequence and pin states.` },
      { step: 3, title: 'Telemetry & Bus Signal Capture', instruction: 'Capture output in Serial Monitor or logic analyzer waveform window; verify against expected output.' }
    ];
    obs = [
      'Serial Monitor outputs clean boot telemetry at 115200 baud without framing errors.',
      `Bus signals or telemetry confirm expected values: ${lCheck}.`,
      'All measured signal voltages remain strictly at or below 3.3V DC.'
    ];
    mistakes = [
      'Connecting 5V sensor outputs directly to ESP32 pins without a level shifter, damaging the silicon.',
      'Setting terminal baud rate to 9600 instead of 115200, displaying garbled characters.',
      'Attempting to write to write-protected flash partitions or locked eFuses.'
    ];
    troubleshooting = [
      'If flashing fails with "A fatal error occurred", hold down the physical BOOT button while connecting.',
      'If I2C bus does not respond, ensure 4.7kΩ pull-up resistors are connected to 3.3V on SDA and SCL.',
      'If sensor reads NaN, verify sensor VCC is connected to 3.3V and signal pin mapping matches firmware definitions.'
    ];
    securityRel = `Firmware and bus defense in ${lTitle.toLowerCase()} prevents unauthorized physical bus sniffing, flash tampering, and memory extraction.`;
  } else if (mOrder === 7 || mOrder === 8 || mOrder === 9 || mOrder === 13 || mOrder === 15 || mOrder === 17 || mOrder === 28) {
    terms = [
      { term: 'MQTT Broker', definition: 'Central server dispatching messages between publishing nodes and subscribing clients based on topic filters.' },
      { term: 'Topic ACL', definition: 'Access Control List restricting which authenticated users can publish or subscribe to specific topic trees.' },
      { term: 'TLS 1.3 Transport', definition: 'Encrypted network layer providing mutual authentication and privacy over TCP port 8883.' },
      { term: 'Wireshark Filter', definition: 'Expression syntax used to isolate and dissect network protocol packets from a raw pcap stream.' }
    ];
    proc = [
      { step: 1, title: 'Interface & Service Initialization', instruction: `Select active network interface in Wireshark and start the local service for ${lTitle.toLowerCase()} (e.g. Mosquitto, embedded web server).` },
      { step: 2, title: 'Traffic Generation & Protocol Activity', instruction: `Transmit test traffic: ${lPractice}; observe network packets in real time.` },
      { step: 3, title: 'Packet Dissection & Cryptographic Verification', instruction: 'Apply Wireshark display filters (e.g. mqtt, http, coap, tls); inspect protocol headers, payloads, and TLS encryption.' }
    ];
    obs = [
      'Wireshark displays clean protocol handshakes without resets or retransmissions.',
      `Target protocol traffic captured and verified: ${lCheck}.`,
      'Encrypted payloads (TLS) or authenticated access control confirmed in packet headers.'
    ];
    mistakes = [
      'Publishing sensitive sensor telemetry or credentials over cleartext MQTT (port 1883) on untrusted networks.',
      'Leaving the Mosquitto broker configured with anonymous access allowed in production.',
      'Evaluating captured packets with TCP Checksum Offload enabled, mistaking local loopback artifacts for corrupted frames.'
    ];
    troubleshooting = [
      'If connection refused, verify broker service is running with "systemctl status mosquitto".',
      'If TLS connection fails, check certificate expiry dates and confirm client clock is synchronized via NTP.',
      'If no packets appear in Wireshark, verify traffic is routed through the captured network interface.'
    ];
    securityRel = `Network and protocol security in ${lTitle.toLowerCase()} prevents packet sniffing, MITM credential interception, and unauthorized telemetry injection.`;
  } else if (mOrder === 18 || mOrder === 19 || mOrder === 22 || mOrder === 23 || mOrder === 26) {
    terms = [
      { term: 'IDOR', definition: 'Insecure Direct Object Reference where an application accesses records using user-supplied IDs without validating ownership.' },
      { term: 'Command Injection', definition: 'Flaw permitting an attacker to execute arbitrary OS shell commands by supplying unsanitized input.' },
      { term: 'UFW Firewall', definition: 'Uncomplicated Firewall managing stateful packet filtering and default-deny policies on Linux gateways.' },
      { term: 'Fail2ban', definition: 'Log monitoring daemon that dynamically adds firewall drop rules for IP addresses attempting brute-force attacks.' }
    ];
    proc = [
      { step: 1, title: 'Terminal Access & Baseline Audit', instruction: `Connect to target gateway or server via SSH; inspect relevant configuration files and access logs for ${lTitle.toLowerCase()}.` },
      { step: 2, title: 'Defensive Security Testing', instruction: `Execute defensive test: ${lPractice}; observe server responses and system logs for unauthorized behavior.` },
      { step: 3, title: 'Hardening & Detection Enforcement', instruction: 'Apply hardening configuration (e.g. update sshd_config, add UFW firewall rule, or patch input validation); verify enforcement.' }
    ];
    obs = [
      'Security audit identifies exposed parameters or misconfigurations.',
      `Defensive countermeasure validated: ${lCheck}.`,
      'Unauthorized manipulation attempts are blocked (HTTP 401/403 or firewall drop) and logged.'
    ];
    mistakes = [
      'Enabling UFW with default deny before allowing the SSH management port, locking out the administrator.',
      'Passing unsanitized web form or API query strings directly to shell execution functions.',
      'Relying on hidden client-side HTML fields for access control enforcement.'
    ];
    troubleshooting = [
      'If locked out of SSH, use local keyboard/monitor to run "sudo ufw allow 2222/tcp".',
      'If Fail2ban does not ban after failed logins, verify log path in jail.local matches actual auth.log location.',
      'If API returns 500 error, inspect web server error log for stack traces and missing dependencies.'
    ];
    securityRel = `Web and OS hardening in ${lTitle.toLowerCase()} prevents remote gateway takeover, privilege escalation, and lateral movement.`;
  } else {
    // Modules 20, 21, 25, 27, 29, 30: Reverse Engineering, Forensics, Standards, Capstone
    terms = [
      { term: 'Binwalk', definition: 'Firmware extraction tool identifying embedded file systems, compressed archives, and executable code in binary blobs.' },
      { term: 'Ghidra Decompiler', definition: 'Static reverse engineering framework translating compiled machine code into readable C pseudocode.' },
      { term: 'Chain of Custody', definition: 'Documented, chronological trail accounting for the custody, control, analysis, and disposition of digital evidence.' },
      { term: 'Software Bill of Materials (SBOM)', definition: 'Formal, machine-readable inventory of software components, libraries, and dependencies in a firmware release.' }
    ];
    proc = [
      { step: 1, title: 'Evidence Isolation & Hash Verification', instruction: 'Confirm authorized scope and compute SHA-256 cryptographic hashes of all original artifacts before analysis.' },
      { step: 2, title: 'Deep Technical Analysis', instruction: `Execute reverse engineering / forensic analysis workflow: ${lPractice}; extract strings, functions, or audit checkpoints.` },
      { step: 3, title: 'Documentation & Defensive Remediation', instruction: 'Document technical observations in evidence-template.md, distinguishing verified facts from hypotheses with remediation steps.' }
    ];
    obs = [
      'Evidence file hashes match original manifests, proving data integrity was maintained.',
      `Analytical findings verified: ${lCheck}.`,
      'Report deliverables conform to international standards (NIST IR 8259, ISO/IEC 27037).'
    ];
    mistakes = [
      'Modifying original evidence files directly instead of analyzing verified bit-stream working copies.',
      'Assuming hardcoded strings in decompiled code are exploitable vulnerabilities without proving execution reachability.',
      'Failing to record exact tool versions, hashes, and timestamps in forensic investigative notes.'
    ];
    troubleshooting = [
      'If Binwalk fails to carve filesystems, check for non-standard compression headers or proprietary XOR encryption.',
      'If Ghidra displays undefined memory locations, configure base memory map to match microcontrollers flash offsets.',
      'If forensic hashes do not match, check for accidental file writes or automated editor metadata modifications.'
    ];
    securityRel = `Forensic rigor and standards compliance in ${lTitle.toLowerCase()} ensure evidence, penetration test findings, and audit reports withstand rigorous technical and legal review.`;
  }

  return {
    introduction: `${lActivity} In this video-guided lesson, you will master practical defensive techniques and rigorous verification for ${lTitle.toLowerCase()}.`,
    keyTerminology: terms,
    theorySections: [
      {
        title: `Technical Foundation: ${lTitle}`,
        content: `In production embedded systems and IoT infrastructure, ${lTitle.toLowerCase()} plays a foundational role in operational resilience and defense. Practitioners must understand the exact protocol mechanisms, electrical specifications, and attack vectors to design effective mitigations.`,
        keyPoints: [
          'Maintain strict adherence to safe operational envelopes (<= 3.3V DC logic, zero mains AC).',
          'Distinguish between theoretical security assumptions and measurable ground-truth telemetry.',
          'Design systems to fail securely in an uncompromised state upon hardware or communication fault.',
          'Document every technical observation with verifiable timestamps and cryptographic hashes.'
        ]
      },
      {
        title: `Security Analysis & Threat Scenarios: ${lTitle}`,
        content: `Security failures related to ${lTitle.toLowerCase()} frequently lead to unauthorized data exposure, lateral network movement, or physical actuator manipulation. By evaluating potential failure modes and threat actor objectives, defenders can implement multi-layered safeguards.`,
        keyPoints: [
          'Assess whether physical bus access, wireless proximity, or remote IP routing is required for exploitation.',
          'Implement least-privilege access and input sanitization at each architectural layer.',
          'Verify defensive controls using realistic test scenarios and automated validation scripts.',
          'Ensure logging mechanisms capture sufficient telemetry to enable forensic reconstruction.'
        ]
      }
    ],
    stepByStepProcedures: proc,
    expectedObservations: obs,
    commonMistakes: mistakes,
    troubleshooting,
    securityRelevance: securityRel
  };
}


const rubricEntries: [string, number][] = [
  ['System Architecture & Hardware BOM Scoping', 20],
  ['Firmware Hardening & Cryptographic Security (TLS/NVS)', 20],
  ['Network Protocol Baselines & Wireshark PCAP Evidence', 15],
  ['Hardware Safety, Pinout Accuracy & Multimeter Verification', 10],
  ['Incident Detection Engineering & Sigma Rules', 15],
  ['Forensic Timeline & Defensive Incident Analysis', 15],
  ['Technical Reproducibility & Engineering Documentation', 5],
];

export const IOT_CAPSTONE: CapstoneAssessment = {
  id: 'capstone-iot-cybersecurity-final',
  title: 'Portfolio Project 6: End-to-End Secure Smart-Device Capstone & SOC Handoff',
  scenario: 'Design, assemble, harden, and audit an end-to-end connected IoT monitoring system. Learners submit complete breadboard schematics, verified firmware source code, Wireshark PCAPs proving TLS encryption, an attack-surface threat model, and a formal SOC handoff briefing.',
  pcapSource: {
    fileName: 'iot-lab-m30-telemetry.pcap',
    fileUrl: '/pcaps/iot/iot-lab-m30-telemetry.pcap',
    sha256: '486199719144ddda56ffad782b7db5b1bfa6935ba5fb8be4628d77d7164ffbf8',
  },
  totalMarks: 100,
  passingScore: 75,
  rubric: rubricEntries.map(([category, marks]) => ({
    category,
    marks,
    criteria: [
      'All breadboard wiring strictly conforms to safe low-voltage DC limits (<= 3.3V logic)',
      'Cryptographic controls (TLS 1.3, encrypted NVS, Secure Boot) verified via packet captures and logs',
      'Executive report clearly distinguishes confirmed observations from theoretical hypotheses',
    ],
  })),
  submissionSections: rubricEntries.map(([title, maxMarks], i) => ({
    id: `iot-capstone-${i + 1}`,
    title,
    prompt: `Submit ${title.toLowerCase()} with safe evidence, test logs, circuit diagrams, and remediation guidance.`,
    maxMarks,
  })),
};

const totalRealVideoMinutes = IOT_VIDEO_MANIFEST.reduce((sum, v) => sum + v.durationMinutes, 0);

export const IOT_CYBERSECURITY_ZERO_TO_ADVANCED_COURSE: Course = {
  id: 'course-iot-cybersecurity-zero-to-advanced',
  slug: 'iot-cybersecurity-zero-to-advanced',
  title: 'IoT Cybersecurity & Ethical Hacking: Zero to Advanced',
  shortDescription: '30 modules • 120 video-guided lessons • 120 unique video tutorials • 30 practical labs • 6 portfolio milestones • Capstone. Zero quizzes.',
  description: 'Comprehensive 30-module, 120-lesson professional curriculum in IoT hardware security and ethical hacking. Features 120 distinct, verified YouTube video tutorials with measured runtimes, step-by-step breadboard and discrete circuit CAD, interactive Three.js 3D hardware inspection, 30 practical labs, and a 100-mark portfolio capstone. Covers low-voltage electronics, ESP32 firmware, MQTT/TLS cryptography, Ghidra reverse engineering, QEMU emulation, OWASP IoTGoat, hardware debug interfaces, and IoT SOC detection engineering. No quizzes.',
  domains: ['iot-embedded-security', 'soc-blue-team', 'dfir', 'network-security'],
  tags: ['iot', 'embedded-security', 'esp32', 'hardware-hacking', 'firmware', 'mqtt', 'tls', 'dfir', 'blue-team', 'no-quizzes'],
  difficulty: 'intermediate',
  thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  estimatedDuration: `${Math.round(totalRealVideoMinutes / 60)} hours of video tutorials • 190 total hands-on study & lab hours`,
  totalDurationMinutes: totalRealVideoMinutes,
  instructor: {
    name: 'CyberTube IoT Security Curriculum',
    title: 'Curated open videos, code CAD diagrams, and defensive lab guides',
    organization: 'CyberTube',
  },
  prerequisites: [
    'Basic computer literacy and terminal familiarity',
    'An isolated or personally owned, expressly authorized IoT training environment',
    'Strict adherence to low-voltage DC safety (<=3.3V logic) and legal lab boundaries',
  ],
  learningObjectives: [
    'Wire, measure, and safely control discrete electronic circuits with ESP32 microcontrollers',
    'Develop defensive firmware with debouncing, watchdog timers, and encrypted secret storage',
    'Secure IoT communications using Mosquitto topic ACLs, Wi-Fi segmentation, and Mutual TLS',
    'Extract and reverse engineer embedded firmware binaries using Ghidra, binwalk, and QEMU',
    'Safely audit hardware debug interfaces (UART, JTAG, SWD) with 3.3V logic analyzers',
    'Build automated IoT SOC detection rules for anomalous MQTT traffic and botnet telemetry',
    'Deliver an end-to-end secure connected monitoring capstone with defensible evidence',
  ],
  track: 'cybersecurity',
  featured: true,
  modules: RAW_MODULES.map(makeModule),
  capstone: IOT_CAPSTONE,
};

export const IOT_CYBERSECURITY_COURSE = IOT_CYBERSECURITY_ZERO_TO_ADVANCED_COURSE;
